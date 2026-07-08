/* =====================================================================
   WebDev Academy — free AI relay (Cloudflare Worker) with FAILOVER

   Gemini is geo-blocked in Myanmar and its free tier is ~15 req/min.
   This worker relays browser AI requests and now falls back automatically:
     1. Try Google Gemini  (env.GEMINI_KEY)  — best Burmese
     2. If Gemini is rate-limited / errors → Groq (env.GROQ_KEY) — free,
        fast, much higher limits. Groq's OpenAI-style request+response are
        converted to/from Gemini's shape, so the website needs NO changes.

   SETUP:
     • Secret GEMINI_KEY = your Gemini key (already set)
     • Secret GROQ_KEY   = your Groq key (console.groq.com → API Keys)
       Cloudflare → your Worker → Settings → Variables and Secrets →
       Add → Type: Secret → Name: GROQ_KEY → Value: gsk_...
   ===================================================================== */
export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    const json = (obj, status) =>
      new Response(JSON.stringify(obj), { status, headers: Object.assign({ "Content-Type": "application/json" }, cors) });
    const textOf = (parts) => (parts || []).map((p) => (p && p.text) || "").join("");

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: { message: "POST only" } }, 405);

    let payload;
    try { payload = await request.json(); }
    catch (e) { return json({ error: { message: "bad JSON" } }, 400); }

    const model = String(payload.model || "gemini-2.5-flash").replace(/[^a-zA-Z0-9.\-]/g, "");
    const body = payload.body || {};

    /* 1) Gemini first (best Burmese) */
    if (env.GEMINI_KEY) {
      try {
        const g = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + env.GEMINI_KEY,
          { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
        );
        if (g.ok) return new Response(await g.text(), { status: 200, headers: Object.assign({ "Content-Type": "application/json" }, cors) });
        /* not ok (429 rate-limit, 5xx…) → fall through to Groq */
      } catch (e) { /* network error → fall through */ }
    }

    /* 2) Groq fallback — convert Gemini request → OpenAI chat, and the
          reply back into Gemini's shape so js/ai.js parses it unchanged */
    if (env.GROQ_KEY) {
      try {
        const sys = textOf(body.systemInstruction && body.systemInstruction.parts);
        const user = (body.contents || []).map((c) => textOf(c.parts)).filter(Boolean).join("\n\n");
        const cfg = body.generationConfig || {};
        const messages = [];
        if (sys) messages.push({ role: "system", content: sys });
        messages.push({ role: "user", content: user || "Hello" });

        const gr = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": "Bearer " + env.GROQ_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: messages,
            max_tokens: cfg.maxOutputTokens || 2048,
            temperature: cfg.temperature == null ? 0.7 : cfg.temperature,
          }),
        });
        const gj = await gr.json().catch(() => ({}));
        if (gr.ok && gj.choices && gj.choices[0] && gj.choices[0].message) {
          const out = gj.choices[0].message.content || "";
          return json({ candidates: [{ content: { parts: [{ text: out }] } }] }, 200);
        }
        return json(gj && gj.error ? gj : { error: { message: "Groq failed" } }, gr.status || 502);
      } catch (e) {
        return json({ error: { message: "AI temporarily unavailable — please try again" } }, 502);
      }
    }

    return json({ error: { message: "No AI provider configured" } }, 500);
  },
};
