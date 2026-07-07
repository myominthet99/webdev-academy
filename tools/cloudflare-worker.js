/* =====================================================================
   WebDev Academy — free AI relay (Cloudflare Worker)

   Gemini is geo-blocked in Myanmar, so browsers there cannot call
   Google directly. This tiny worker runs on Cloudflare (free plan,
   100k requests/day), relays the request to Google from a supported
   region, and keeps the Gemini API key secret.

   SETUP (one time, ~5 minutes):
     1. Sign up free at https://dash.cloudflare.com
     2. Workers & Pages → Create → Create Worker → name: wda-ai → Deploy
     3. Click "Edit code", replace everything with THIS file → Deploy
     4. Worker → Settings → Variables and Secrets →
        Add → Type: Secret → Name: GEMINI_KEY → Value: your AQ.… key
     5. Copy the worker URL (https://wda-ai.<something>.workers.dev)
        and store it in Firebase:  stats/aiConfig = {"proxyUrl": "<url>"}
   ===================================================================== */
export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST")
      return new Response(JSON.stringify({ error: { message: "POST only" } }), { status: 405, headers: cors });

    let payload;
    try { payload = await request.json(); }
    catch (e) { return new Response(JSON.stringify({ error: { message: "bad JSON" } }), { status: 400, headers: cors }); }

    const model = String(payload.model || "gemini-2.5-flash").replace(/[^a-zA-Z0-9.\-]/g, "");
    const upstream = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" + model +
        ":generateContent?key=" + env.GEMINI_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.body || {}),
      }
    );
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: Object.assign({ "Content-Type": "application/json" }, cors),
    });
  },
};
