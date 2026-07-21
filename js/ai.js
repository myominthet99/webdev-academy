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
  function buildBody(prompt, opts) {
    const parts = [{ text: String(prompt) }];
    /* optional image (data URL) — Gemini is multimodal, so photo questions
       ("explain this error screenshot") work through the same endpoint */
    if (opts.image) {
      const m = String(opts.image).match(/^data:([^;]+);base64,(.+)$/);
      if (m) parts.push({ inlineData: { mimeType: m[1], data: m[2] } });
    }
    const body = {
      contents: [{ role: "user", parts: parts }],
      generationConfig: {
        temperature: opts.temperature == null ? 0.7 : opts.temperature,
        maxOutputTokens: opts.maxTokens || 2048,
      },
    };
    /* Gemini 2.5+ silently "thinks" before answering by default — seconds of
       dead air a tutor chat doesn't need. Off unless a caller opts in via
       opts.thinkingBudget. Older models reject the field, hence the guard. */
    if (/2\.5|gemini-3/.test(AI_CONFIG.model)) {
      body.generationConfig.thinkingConfig = {
        thinkingBudget: opts.thinkingBudget == null ? 0 : opts.thinkingBudget,
      };
    }
    if (opts.system) body.systemInstruction = { parts: [{ text: opts.system }] };
    return body;
  }
  function parseFull(data) {
    const cand = data && data.candidates && data.candidates[0];
    const parts = (cand && cand.content && cand.content.parts) || [];
    const text = parts.map((p) => p.text || "").join("").trim();
    if (!text) throw new Error("empty reply");
    return text;
  }
  function throwHttp(r) {
    return r.json().catch(() => ({})).then((e) => {
      const msg = (e && e.error && e.error.message) || "HTTP " + r.status;
      throw new Error(msg);
    });
  }
  function completeNow(prompt, opts) {
    const body = buildBody(prompt, opts);
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
      .then((r) => (r.ok ? r.json() : throwHttp(r)))
      .then(parseFull);
  }

  /* Streaming completion: onDelta(textSoFar) fires as tokens arrive, the
     Promise resolves with the final text. Degrades gracefully everywhere:
     a worker that predates the `stream` flag replies with plain JSON and we
     deliver it in one shot; any mid-stream failure retries as a one-shot. */
  function stream(prompt, opts, onDelta) {
    opts = opts || {};
    onDelta = onDelta || function () {};
    return loadConfig().then(() => {
      if (!ready()) throw new Error("no-key");
      return streamNow(prompt, opts, onDelta).catch(() =>
        completeNow(prompt, opts).then((text) => { onDelta(text); return text; })
      );
    });
  }
  function streamNow(prompt, opts, onDelta) {
    const body = buildBody(prompt, opts);
    const req = AI_CONFIG.proxyUrl
      ? fetch(AI_CONFIG.proxyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: AI_CONFIG.model, body: body, stream: true }),
        })
      : fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/" +
            AI_CONFIG.model + ":streamGenerateContent?alt=sse&key=" + encodeURIComponent(AI_CONFIG.apiKey),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
    return req.then((r) => {
      if (!r.ok) return throwHttp(r);
      const ct = r.headers.get("Content-Type") || "";
      if (ct.indexOf("text/event-stream") === -1 || !r.body) {
        /* old worker (no stream support) or provider fallback → one JSON blob */
        return r.json().then(parseFull).then((text) => { onDelta(text); return text; });
      }
      const reader = r.body.getReader();
      const dec = new TextDecoder();
      let buf = "", full = "";
      const pump = () =>
        reader.read().then((step) => {
          if (step.done) {
            if (!full.trim()) throw new Error("empty reply");
            return full.trim();
          }
          buf += dec.decode(step.value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop();
          for (let i = 0; i < lines.length; i++) {
            const s = lines[i].trim();
            if (s.indexOf("data:") !== 0) continue;
            const payload = s.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            let j;
            try { j = JSON.parse(payload); } catch (e) { continue; }
            if (j.error) throw new Error(j.error.message || "AI error");
            const cand = j.candidates && j.candidates[0];
            const parts = (cand && cand.content && cand.content.parts) || [];
            const t = parts.map((p) => p.text || "").join("");
            if (t) { full += t; onDelta(full); }
          }
          return pump();
        });
      return pump();
    });
  }

  window.AI = { ready: ready, complete: complete, stream: stream, stripFences: stripFences,
    /* the chat pings <worker>/notify to deliver mention/reply pushes */
    proxyUrl: () => AI_CONFIG.proxyUrl };
})();
