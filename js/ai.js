/* =====================================================================
   WebDev Academy — free AI helper (Google Gemini free tier)

   Config lives in Firebase at stats/aiConfig (NOT in this public repo —
   Google scans GitHub and may disable exposed keys):
     { "proxyUrl": "https://....workers.dev" }   ← preferred
     { "key": "AQ....", "model": "gemini-2.5-flash" }  ← direct mode

   WHY A PROXY: Google blocks the Gemini API in some countries
   (including Myanmar) by the CALLER's location. A free Cloudflare
   Worker (see tools/cloudflare-worker.js) relays requests from a
   supported region and keeps the API key completely secret.
   Direct mode still works from supported countries.

   This powers the ✨ AI buttons in the course creator (admin), the
   @ai bot in the community chat, and the 🎓 AI Tutor on lessons.
   Without config those features just show a "not set up yet" hint.
   ===================================================================== */
(function () {
  "use strict";

  const AI_CONFIG = {
    proxyUrl: "", /* Cloudflare Worker URL (key stays inside the worker) */
    apiKey: "",   /* direct mode only — loaded from Firebase below */
    model: "gemini-2.5-flash", /* fast + generous free-tier limits */
  };

  /* Fetch the config from Firebase so secrets never sit in the repo.
     complete() awaits this, and re-fetches once if the boot attempt failed
     (flaky mobile connections must not disable AI for the whole session). */
  let cfgPromise = null;
  function loadConfig() {
    if (AI_CONFIG.proxyUrl || AI_CONFIG.apiKey) return Promise.resolve();
    if (cfgPromise) return cfgPromise;
    if (!(window.FIREBASE_CONFIG && FIREBASE_CONFIG.databaseURL)) return Promise.resolve();
    cfgPromise = fetch(FIREBASE_CONFIG.databaseURL + "/stats/aiConfig.json")
      .then((r) => r.json())
      .then((v) => {
        if (!v) return;
        if (v.proxyUrl) AI_CONFIG.proxyUrl = v.proxyUrl;
        if (v.key) AI_CONFIG.apiKey = v.key;
        if (v.model) AI_CONFIG.model = v.model;
      })
      .catch(() => { cfgPromise = null; /* allow a retry on next use */ });
    return cfgPromise;
  }
  loadConfig();

  const ready = () => !!(AI_CONFIG.proxyUrl || AI_CONFIG.apiKey);

  /* Gemini wraps answers in ```html fences — strip them for direct use
     (labels like c++, html5 and single-line fences included) */
  function stripFences(text) {
    let out = String(text || "").trim();
    const m = out.match(/^```[^\n`]*\n?([\s\S]*?)\n?```$/);
    if (m) out = m[1].trim();
    return out;
  }

  /* One-shot completion → Promise<string>.
     opts: { system, maxTokens, temperature } */
  function complete(prompt, opts) {
    opts = opts || {};
    return loadConfig().then(() => {
      if (!ready()) throw new Error("no-key");
      return completeNow(prompt, opts);
    });
  }
  function completeNow(prompt, opts) {
    const body = {
      contents: [{ role: "user", parts: [{ text: String(prompt) }] }],
      generationConfig: {
        temperature: opts.temperature == null ? 0.7 : opts.temperature,
        maxOutputTokens: opts.maxTokens || 2048,
      },
    };
    if (opts.system) body.systemInstruction = { parts: [{ text: opts.system }] };
    const req = AI_CONFIG.proxyUrl
      ? fetch(AI_CONFIG.proxyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: AI_CONFIG.model, body: body }),
        })
      : fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/" +
            AI_CONFIG.model + ":generateContent?key=" + encodeURIComponent(AI_CONFIG.apiKey),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
    return req
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
