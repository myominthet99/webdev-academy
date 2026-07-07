/* =====================================================================
   WebDev Academy — free AI helper (Google Gemini free tier)

   The key comes from a FREE https://aistudio.google.com/apikey account.
   It is stored in Firebase at stats/aiConfig — NOT in this public repo,
   because Google scans public GitHub code and may disable exposed keys.
   To change it:  PUT {"key":"...","model":"gemini-2.5-flash"}
   to <databaseURL>/stats/aiConfig.json

   This powers the ✨ AI buttons in the course creator (admin) and the
   @ai bot in the community chat. Without a key those features simply
   show a "not set up yet" hint — nothing breaks.
   ===================================================================== */
(function () {
  "use strict";

  const AI_CONFIG = {
    apiKey: "", /* loaded from Firebase below (or paste one here to override) */
    model: "gemini-2.5-flash", /* fast + generous free-tier limits */
  };

  /* Fetch the key from Firebase at boot so it never sits in the repo */
  if (!AI_CONFIG.apiKey && window.FIREBASE_CONFIG && FIREBASE_CONFIG.databaseURL) {
    fetch(FIREBASE_CONFIG.databaseURL + "/stats/aiConfig.json")
      .then((r) => r.json())
      .then((v) => {
        if (v && v.key) {
          AI_CONFIG.apiKey = v.key;
          if (v.model) AI_CONFIG.model = v.model;
        }
      })
      .catch(() => {});
  }

  const ready = () => !!AI_CONFIG.apiKey;

  /* Gemini wraps answers in ```html fences — strip them for direct use */
  function stripFences(text) {
    let out = String(text || "").trim();
    const m = out.match(/^```[a-zA-Z]*\s*\n([\s\S]*?)\n?```$/);
    if (m) out = m[1].trim();
    return out;
  }

  /* One-shot completion → Promise<string>.
     opts: { system, maxTokens, temperature } */
  function complete(prompt, opts) {
    opts = opts || {};
    if (!ready()) return Promise.reject(new Error("no-key"));
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      AI_CONFIG.model + ":generateContent?key=" + encodeURIComponent(AI_CONFIG.apiKey);
    const body = {
      contents: [{ role: "user", parts: [{ text: String(prompt) }] }],
      generationConfig: {
        temperature: opts.temperature == null ? 0.7 : opts.temperature,
        maxOutputTokens: opts.maxTokens || 2048,
      },
    };
    if (opts.system) body.systemInstruction = { parts: [{ text: opts.system }] };
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((r) => {
        if (!r.ok)
          return r.json().catch(() => ({})).then((e) => {
            const msg = (e && e.error && e.error.message) || "HTTP " + r.status;
            throw new Error(msg);
          });
        return r.json();
      })
      .then((data) => {
        const cand = data && data.candidates && data.candidates[0];
        const parts = (cand && cand.content && cand.content.parts) || [];
        const text = parts.map((p) => p.text || "").join("").trim();
        if (!text) throw new Error("empty reply");
        return text;
      });
  }

  window.AI = { ready: ready, complete: complete, stripFences: stripFences };
})();
