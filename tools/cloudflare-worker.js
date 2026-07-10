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

   🔔 PUSH SENDER (route: POST /push) — sends FCM notifications to every
   saved token in stats/pushTokens. Extra setup:
     • Secret FCM_SA     = the FULL service-account JSON (Firebase console
       → Project settings → Service accounts → Generate new private key)
     • Secret PUSH_SECRET = any long random password you invent; the admin
       dashboard asks for it once and sends it as X-Push-Secret
   ===================================================================== */
export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Push-Secret",
    };
    const json = (obj, status) =>
      new Response(JSON.stringify(obj), { status, headers: Object.assign({ "Content-Type": "application/json" }, cors) });
    const textOf = (parts) => (parts || []).map((p) => (p && p.text) || "").join("");

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: { message: "POST only" } }, 405);

    /* ---------------- 🔔 /push — admin notification fan-out ---------------- */
    if (new URL(request.url).pathname === "/push") {
      if (!env.FCM_SA || !env.PUSH_SECRET) return json({ error: { message: "push not configured (FCM_SA / PUSH_SECRET secrets missing)" } }, 500);
      if (request.headers.get("X-Push-Secret") !== env.PUSH_SECRET) return json({ error: { message: "bad secret" } }, 403);

      let p;
      try { p = await request.json(); } catch (e) { return json({ error: { message: "bad JSON" } }, 400); }
      const title = String(p.title || "").slice(0, 80);
      const bodyTxt = String(p.body || "").slice(0, 200);
      const url = String(p.url || "https://myominthet99.github.io/webdev-academy/");
      if (!title || !bodyTxt) return json({ error: { message: "title and body required" } }, 400);

      const sa = JSON.parse(env.FCM_SA);

      /* mint an OAuth2 token from the service account (RS256 JWT) */
      const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      const enc = (obj) => b64url(new TextEncoder().encode(JSON.stringify(obj)));
      const now = Math.floor(Date.now() / 1000);
      const unsigned = enc({ alg: "RS256", typ: "JWT" }) + "." + enc({
        iss: sa.client_email, scope: "https://www.googleapis.com/auth/firebase.messaging",
        aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
      });
      const pem = sa.private_key.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
      const keyData = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
      const key = await crypto.subtle.importKey("pkcs8", keyData, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
      const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
      const jwt = unsigned + "." + b64url(sig);

      const tokRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + jwt,
      });
      const tok = await tokRes.json();
      if (!tok.access_token) return json({ error: { message: "oauth failed" } }, 502);

      /* fan out to every saved token (read from the public RTDB) */
      const dbUrl = "https://" + sa.project_id + "-default-rtdb.asia-southeast1.firebasedatabase.app";
      const tokens = Object.keys(await fetch(dbUrl + "/stats/pushTokens.json").then((r) => r.json()).catch(() => null) || {});
      let sent = 0, dead = 0;
      for (const t of tokens.slice(0, 500)) {
        const res = await fetch("https://fcm.googleapis.com/v1/projects/" + sa.project_id + "/messages:send", {
          method: "POST",
          headers: { "Authorization": "Bearer " + tok.access_token, "Content-Type": "application/json" },
          body: JSON.stringify({ message: {
            token: decodeURIComponent(t),
            notification: { title: title, body: bodyTxt },
            data: { url: url },
            webpush: { fcm_options: { link: url } },
          } }),
        });
        if (res.ok) sent++;
        else if (res.status === 404 || res.status === 400) {
          dead++;
          await fetch(dbUrl + "/stats/pushTokens/" + t + ".json", { method: "DELETE" }).catch(() => {});
        }
      }
      return json({ sent: sent, removed: dead, total: tokens.length }, 200);
    }

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
