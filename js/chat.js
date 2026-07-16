/* =====================================================================
   WebDev Academy — community group chat (client-side, per-room)
   ---------------------------------------------------------------------
   • Per-room chat: a global "Community" room + one room per course.
   • Delete your own messages; simple moderation (rate limit + word mask).
   • Two backends:
       - LOCAL (default): localStorage, synced across tabs of the same
         browser via BroadcastChannel / storage events.
       - FIREBASE (optional): real cross-device sync. Paste your config
         into FIREBASE_CONFIG below to switch — the UI is identical.
   ===================================================================== */
(function () {
  "use strict";

  const I18N = window.I18N;
  const KEY = "wda_chat_v1";
  const MAX = 200;
  const BUILD = "v20"; /* shown in the chat header — bump with releases */

  /* Crisp inline SVG icons (emoji buttons render differently on every
     Android brand — these look identical everywhere) */
  const ICON = (name) => {
    const P = {
      chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.38 8.38 0 0 1 12.5 3h.5a8.48 8.48 0 0 1 8 8Z"/>',
      reply: '<polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>',
      smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
      edit: '<path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
      pin: '<path d="M12 17v5"/><path d="M9 11V6a3 3 0 0 1 6 0v5l2 3H7Z"/>',
      trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
      send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
      camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/><circle cx="12" cy="13" r="4"/>',
      video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
      x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      expand: '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>',
      caseb: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>',
      bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><line x1="12" y1="8" x2="12" y2="4"/><circle cx="12" cy="3" r="1"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9 17h6"/>',
      mic: '<path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
      sparkle: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="M18 16.5 18.7 18.3 20.5 19 18.7 19.7 18 21.5 17.3 19.7 15.5 19 17.3 18.3 18 16.5Z"/>',
      translate: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
      list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
      clip: '<path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
      file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/>',
      down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
      play: '<polygon points="6 3 20 12 6 21 6 3"/>',
      pause: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    };
    return '<svg class="ci" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || "") + "</svg>";
  };

  /* ============ Firebase config (optional) ============
     Configured centrally in js/firebase-config.js — paste your config
     there to enable real cross-device chat. See README for steps. */
  const FIREBASE_CONFIG = window.FIREBASE_CONFIG || null;
  /* ==================================================== */

  /* Moderation: add lowercase words to auto-mask (e.g. ["darn"]). */
  const BADWORDS = [];

  const lang = () => (localStorage.getItem("wda_lang") === "my" ? "my" : "en");
  const t = (k) => (I18N.ui[lang()] && I18N.ui[lang()][k]) || I18N.ui.en[k] || k;
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Message formatting: escape, then code blocks, links, and @mentions */
  function formatText(text) {
    let s = esc(text);
    /* ```multi-line code``` and `inline code` */
    s = s.replace(/```([\s\S]+?)```/g, (m, c) => '<pre class="chat-code">' + c.trim() + "</pre>");
    s = s.replace(/`([^`\n]+)`/g, '<code class="chat-icode">$1</code>');
    /* clickable links (trailing punctuation left out of the href) */
    s = s.replace(/https?:\/\/[^\s]+/g, (url) => {
      const trimmed = url.replace(/[.,!?)\]]+$/, "");
      const tail = url.slice(trimmed.length);
      return '<a href="' + trimmed + '" target="_blank" rel="noopener" class="chat-link">' + trimmed + "</a>" + tail;
    });
    /* @mentions; highlight mentions of me. Only match after whitespace or
       start of a tag — an @ inside a URL (https://esm.sh/react@18) must not
       get a <span> injected into the middle of the href attribute. */
    const u = me();
    const myName = u ? String(u.name || u.email || "").split(/[\s@]/)[0].toLowerCase() : null;
    s = s.replace(/(^|[\s>])@([\w.-]+)/g, (m, pre, name) => {
      const isMe = myName && name.toLowerCase() === myName;
      return pre + '<span class="chat-mention' + (isMe ? " me" : "") + '">@' + name + "</span>";
    });
    return s;
  }
  function mentionsMe(text) {
    const u = me();
    if (!u) return false;
    const myName = String(u.name || u.email || "").split(/[\s@]/)[0].toLowerCase();
    if (!myName) return false;
    const m = String(text || "").match(/@([\w.-]+)/g);
    return !!m && m.some((tok) => tok.slice(1).toLowerCase() === myName);
  }

  /* ---------------- state ---------------- */
  let open = false, unread = 0;
  let room = "community", roomLabel = null;
  let roomCache = [], primed = false, unsub = null;
  let sendTimes = [], typingUsers = new Set(), searchQuery = "";
  let replyTo = null; /* { name, text } while composing a reply */
  let fab, panel, listEl, footEl, badgeEl, searchEl, presenceEl;
  let activeUsers = new Map(); /* room -> Set of user IDs */

  let bc = null;
  try { bc = new BroadcastChannel("wda_chat"); } catch (e) { bc = null; }

  const me = () => (window.Auth && window.Auth.current ? window.Auth.current() : null);
  const roomKey = (r) => KEY + "::" + r;
  const presenceKey = (r) => KEY + "::presence::" + r;

  /* Presence tracking */
  const loadPresence = (r) => { try { return JSON.parse(localStorage.getItem(presenceKey(r)) || "{}"); } catch (e) { return {}; } };
  const savePresence = (r, p) => localStorage.setItem(presenceKey(r), JSON.stringify(p));
  const markPresence = (r) => {
    const u = me();
    if (!u) return;
    const p = loadPresence(r);
    p[u.id] = { name: u.name || u.email, ts: Date.now() };
    savePresence(r, p);
    if (bc) bc.postMessage({ type: "presence", room: r, userId: u.id });
  };
  const getActiveUsers = (r) => {
    const p = loadPresence(r);
    const now = Date.now();
    const active = {};
    Object.entries(p).forEach(([id, data]) => {
      if (now - data.ts < 60000) active[id] = data; /* 60 sec timeout */
      else delete p[id];
    });
    savePresence(r, p);
    return active;
  };

  /* 🚫 block list: {userId: name} — their messages are hidden on THIS
     account's devices (key is synced by cloud-sync). Blocking is personal;
     admin ⛔ bans are global and enforced by the security rules. */
  const blkKey = () => "wda_blk::" + ((me() && me().id) || "guest");
  const loadBlocked = () => { try { return JSON.parse(localStorage.getItem(blkKey())) || {}; } catch (e) { return {}; } };
  const toggleBlock = (uid, name) => {
    const b = loadBlocked();
    if (b[uid]) delete b[uid]; else b[uid] = String(name || "?").slice(0, 40);
    try { localStorage.setItem(blkKey(), JSON.stringify(b)); } catch (e) {}
  };

  /* ---------------- CLOUD presence & typing (真 cross-device) ----------------
     Written under rooms/<room>/presence|typing so the existing "rooms"
     database rule covers them. Heartbeat while the panel is open; a poll
     renders who's online (60s window) and who's typing (6s window). */
  const cloudUrl = (r, node, id) =>
    FIREBASE_CONFIG.databaseURL + "/rooms/" + encodeURIComponent(r) + "/" + node +
    (id ? "/" + encodeURIComponent(id) : "") + ".json";
  let hbTimer = null, liveTimer = null, lastTypingPut = 0;
  function heartbeat() {
    const u = me();
    if (!u || !FIREBASE_CONFIG) return;
    withAuth(cloudUrl(room, "presence", u.id)).then((url) => fetch(url, {
      method: "PUT",
      body: JSON.stringify({ name: (u.name || u.email || "?").split(" ")[0], ts: Date.now() }),
    })).catch(() => {});
  }
  function cloudTypingPing() {
    const u = me();
    if (!u || !FIREBASE_CONFIG) return;
    const now = Date.now();
    if (now - lastTypingPut < 2500) return; /* throttle writes */
    lastTypingPut = now;
    withAuth(cloudUrl(room, "typing", u.id)).then((url) => fetch(url, {
      method: "PUT",
      body: JSON.stringify({ name: (u.name || u.email || "?").split(" ")[0], ts: now }),
    })).catch(() => {});
  }
  function pollLive() {
    if (!FIREBASE_CONFIG || !open) return;
    const u = me();
    fetch(cloudUrl(room, "presence"))
      .then((r) => r.json())
      .then((val) => {
        if (!open) return;
        const now = Date.now();
        const users = Object.values(val || {}).filter((x) => x && now - x.ts < 60000);
        renderPresenceCloud(users);
      }).catch(() => {});
    fetch(cloudUrl(room, "typing"))
      .then((r) => r.json())
      .then((val) => {
        if (!open) return;
        const now = Date.now();
        typingUsers = new Set(
          Object.entries(val || {})
            .filter(([id, x]) => x && now - x.ts < 6000 && (!u || id !== u.id))
            .map(([, x]) => x.name)
        );
        renderTyping();
      }).catch(() => {});
  }
  function startLive() {
    if (!FIREBASE_CONFIG) return;
    heartbeat(); pollLive();
    clearInterval(hbTimer); clearInterval(liveTimer);
    hbTimer = setInterval(heartbeat, 25000);
    liveTimer = setInterval(pollLive, 5000);
  }
  function stopLive() {
    clearInterval(hbTimer); clearInterval(liveTimer);
    hbTimer = liveTimer = null;
    const u = me();
    if (u && FIREBASE_CONFIG) withAuth(cloudUrl(room, "presence", u.id)).then((url) => fetch(url, { method: "DELETE" })).catch(() => {});
  }
  function renderPresenceCloud(users) {
    if (!presenceEl) return;
    if (!users.length) { presenceEl.innerHTML = ""; return; }
    const names = users.slice(0, 2).map((x) => esc(x.name)).join(", ");
    const more = users.length > 2 ? " +" + (users.length - 2) : "";
    presenceEl.innerHTML = '<span class="chat-online" title="' +
      esc(users.map((x) => x.name).join(", ")) + '">' + users.length + " 🟢 " + names + more + "</span>";
  }

  /* Photos: downscale + JPEG-compress on a canvas so images fit happily
     inside Realtime Database messages (~100-200 KB base64). */
  function compressImage(file, cb) {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const max = 800;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      let data = canvas.toDataURL("image/jpeg", 0.7);
      if (data.length > 200000) data = canvas.toDataURL("image/jpeg", 0.45);
      cb(data.length > 350000 ? null : data);
    };
    img.onerror = () => { URL.revokeObjectURL(url); cb(null); };
    img.src = url;
  }
  function showImageFull(src) {
    const box = document.createElement("div");
    box.className = "chat-lightbox";
    const im = document.createElement("img");
    im.src = src;
    box.appendChild(im);
    box.addEventListener("click", () => box.remove());
    document.body.appendChild(box);
  }

  /* New-message alert: short beep + flashing tab title until refocused */
  function beep() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = 880; g.gain.value = 0.05;
      o.start(); o.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  }
  let titleTimer = null;
  const baseTitle = document.title;
  function flashTitle() {
    if (titleTimer) return;
    let on = false;
    titleTimer = setInterval(() => { document.title = (on = !on) ? "💬 New message!" : baseTitle; }, 1200);
    const stop = () => {
      clearInterval(titleTimer); titleTimer = null; document.title = baseTitle;
      window.removeEventListener("focus", stop);
    };
    window.addEventListener("focus", stop);
  }

  /* Transient status line (errors, info) shown in the chat panel */
  let statusTimer = null;
  function showStatus(text) {
    const el = document.getElementById("chat-typing");
    if (!el) return;
    el.textContent = text;
    el.hidden = false;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { el.hidden = true; }, 4000);
  }

  /* ---------------- moderation ---------------- */
  function moderate(text) {
    let out = text;
    BADWORDS.forEach((w) => {
      const re = new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
      out = out.replace(re, (m) => m[0] + "*".repeat(Math.max(1, m.length - 1)));
    });
    return out;
  }
  function rateOk() {
    const now = Date.now();
    sendTimes = sendTimes.filter((ts) => now - ts < 10000);
    if (sendTimes.length >= 8) return false; // >8 msgs / 10s = spam
    sendTimes.push(now);
    return true;
  }

  /* ================= backends ================= */
  const localLoad = (r) => { try { return JSON.parse(localStorage.getItem(roomKey(r))) || []; } catch (e) { return []; } };
  const localSave = (r, msgs) => {
    /* photos are big base64 strings — a full localStorage must not crash send() */
    try { localStorage.setItem(roomKey(r), JSON.stringify(msgs.slice(-MAX))); }
    catch (e) { try { localStorage.setItem(roomKey(r), JSON.stringify(msgs.slice(-20).map((m) => { const c = Object.assign({}, m); delete c.img; return c; }))); } catch (e2) {} }
  };

  const localBackend = {
    _handlers: {},
    subscribe(r, cb) { this._handlers[r] = cb; cb(localLoad(r)); return () => { if (this._handlers[r] === cb) delete this._handlers[r]; }; },
    _emit(r) { const cb = this._handlers[r]; if (cb) cb(localLoad(r)); },
    add(r, msg) { const m = localLoad(r); m.push(msg); localSave(r, m); this._emit(r); broadcast(r); return Promise.resolve(); },
    update(r, msg) { const m = localLoad(r); const i = m.findIndex((x) => x.id === msg.id); if (i >= 0) m[i] = msg; localSave(r, m); this._emit(r); broadcast(r); return Promise.resolve(); },
    del(r, ref) { const m = localLoad(r).filter((x) => x.id !== ref); localSave(r, m); this._emit(r); broadcast(r); return Promise.resolve(); },
    /* write one nested field, e.g. "reactions/👍" or "pinned" (null = remove) */
    setPath(r, ref, path, val) {
      const m = localLoad(r);
      const msg = m.find((x) => x.id === ref);
      if (msg) {
        const seg = path.split("/");
        let o = msg;
        for (let i = 0; i < seg.length - 1; i++) o = o[seg[i]] = o[seg[i]] || {};
        if (val == null) delete o[seg[seg.length - 1]]; else o[seg[seg.length - 1]] = val;
        localSave(r, m); this._emit(r); broadcast(r);
      }
      return Promise.resolve();
    },
  };
  function broadcast(r) { if (bc) { try { bc.postMessage({ type: "msg", room: r }); } catch (e) {} } }
  function incoming(evtRoom) { if (localBackend._handlers[evtRoom]) localBackend._emit(evtRoom); }
  if (bc) bc.onmessage = (e) => { if (e && e.data && e.data.type === "msg") incoming(e.data.room); };
  else window.addEventListener("storage", (e) => {
    if (e.key && e.key.indexOf(KEY + "::") === 0) incoming(e.key.slice((KEY + "::").length));
  });

  /* Authenticated REST writes: security rules require a logged-in user, so
     every PUT/POST/DELETE carries the Firebase idToken as ?auth= */
  const idTok = () => (window.Auth && window.Auth.idToken ? window.Auth.idToken() : Promise.resolve(null));
  const withAuth = (url) => idTok().then((tk) =>
    url + (tk ? (url.indexOf("?") >= 0 ? "&" : "?") + "auth=" + encodeURIComponent(tk) : ""));

  /* Firebase backend (only used when FIREBASE_CONFIG is set).
     Reuses auth.js's "wda-auth" app so the database SDK sends the signed-in
     user's token automatically — required by the security rules. */
  let fb = null, fbInit = null;
  function ensureFb() {
    if (fb) return Promise.resolve();
    if (!fbInit) {
      fbInit = (async () => {
        const appMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
        const dbMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
        let app;
        try { app = appMod.getApp("wda-auth"); }
        catch (e) { app = appMod.initializeApp(FIREBASE_CONFIG, "wda-auth"); }
        fb = {
          db: dbMod.getDatabase(app),
          ref: dbMod.ref, push: dbMod.push, remove: dbMod.remove, set: dbMod.set,
          onValue: dbMod.onValue, query: dbMod.query, limitToLast: dbMod.limitToLast,
        };
      })();
    }
    return fbInit;
  }
  /* strip _key and any undefined values (Firebase rejects undefined) */
  const cleanMsg = (msg) => { const c = JSON.parse(JSON.stringify(msg)); delete c._key; return c; };
  const mapSnap = (val) =>
    Object.keys(val || {})
      .map((k) => Object.assign({ _key: k }, val[k]))
      .sort((a, b) => a.ts - b.ts);

  const firebaseBackend = {
    subscribe(r, cb) {
      let off = () => {};
      ensureFb().then(() => {
        const q = fb.query(fb.ref(fb.db, "rooms/" + r + "/messages"), fb.limitToLast(MAX));
        off = fb.onValue(q, (snap) => cb(mapSnap(snap.val())), degradeToRest);
      }).catch(degradeToRest);
      return () => { try { off(); } catch (e) {} };
    },
    add(r, msg) { return ensureFb().then(() => fb.push(fb.ref(fb.db, "rooms/" + r + "/messages"), cleanMsg(msg))); },
    update(r, msg) {
      if (!msg._key) return this.add(r, msg);
      return ensureFb().then(() => fb.set(fb.ref(fb.db, "rooms/" + r + "/messages/" + msg._key), cleanMsg(msg)));
    },
    del(r, ref) { return ensureFb().then(() => fb.remove(fb.ref(fb.db, "rooms/" + r + "/messages/" + ref))); },
    setPath(r, ref, path, val) {
      return ensureFb().then(() => fb.set(fb.ref(fb.db, "rooms/" + r + "/messages/" + ref + "/" + path), val == null ? null : val));
    },
  };

  /* REST fallback: plain HTTPS polling — works even where the Firebase SDK
     or its websocket is blocked (some mobile networks, proxies, old browsers). */
  const restUrl = (r, key) =>
    FIREBASE_CONFIG.databaseURL + "/rooms/" + encodeURIComponent(r) + "/messages" + (key ? "/" + key : "") + ".json";
  const restBackend = {
    _cbs: {},
    subscribe(r, cb) {
      this._cbs[r] = cb;
      const poll = () => {
        if (this._cbs[r] !== cb) return;
        fetch(restUrl(r)).then((res) => res.json()).then((val) => {
          if (this._cbs[r] === cb) cb(mapSnap(val));
        }).catch(() => {});
      };
      poll();
      const id = setInterval(poll, 4000);
      this._poll = poll;
      return () => { clearInterval(id); if (this._cbs[r] === cb) delete this._cbs[r]; };
    },
    _refresh() { if (this._poll) this._poll(); },
    add(r, msg) {
      return withAuth(restUrl(r)).then((u) => fetch(u, { method: "POST", body: JSON.stringify(cleanMsg(msg)) }))
        .then((res) => { if (!res.ok) throw new Error("send failed"); this._refresh(); });
    },
    update(r, msg) {
      if (!msg._key) return this.add(r, msg);
      return withAuth(restUrl(r, msg._key)).then((u) => fetch(u, { method: "PUT", body: JSON.stringify(cleanMsg(msg)) }))
        .then((res) => { if (!res.ok) throw new Error("update failed"); this._refresh(); });
    },
    del(r, ref) {
      return withAuth(restUrl(r, ref)).then((u) => fetch(u, { method: "DELETE" }))
        .then((res) => { if (!res.ok) throw new Error("delete failed"); this._refresh(); });
    },
    setPath(r, ref, path, val) {
      return withAuth(restUrl(r, ref + "/" + path)).then((u) =>
        fetch(u, { method: "PUT", body: JSON.stringify(val == null ? null : val) }))
        .then((res) => { if (!res.ok) throw new Error("update failed"); this._refresh(); });
    },
  };

  let backend = FIREBASE_CONFIG ? firebaseBackend : localBackend;
  let restMode = false;
  function degradeToRest() {
    if (restMode || !FIREBASE_CONFIG) return;
    restMode = true;
    backend = restBackend;
    setTitle(); /* refresh the mode badge */
    subscribeRoom(); /* re-subscribe through the REST poller */
  }

  /* ---------------- DOM ---------------- */
  function build() {
    const wrap = document.createElement("div");
    wrap.id = "chat-widget";
    wrap.innerHTML =
      '<button id="chat-fab" class="chat-fab" type="button" aria-label="Chat">' + ICON("chat") +
      '<span class="chat-badge" hidden>0</span></button>' +
      '<div id="chat-panel" class="chat-panel" hidden>' +
      '  <div class="chat-head"><span class="chat-title"></span>' +
      '    <span id="chat-ver" class="chat-ver" title="build · backend"></span>' +
      '    <span id="chat-presence" class="chat-presence"></span>' +
      '    <input id="chat-search" type="text" class="chat-search" placeholder="🔍 Search..." style="display:none">' +
      '    <button class="chat-call" id="chat-call" type="button" aria-label="Video call" title="' + esc(t("call_title")) + '">' + ICON("video") + "</button>" +
      '    <button class="chat-full" id="chat-full" type="button" aria-label="Fullscreen" title="Fullscreen">' + ICON("expand") + "</button>" +
      '    <button class="chat-close" type="button" aria-label="Close">' + ICON("x") + "</button></div>" +
      '  <div class="chat-list" id="chat-list"></div>' +
      '  <button id="chat-jump" class="chat-jump" type="button" hidden>⬇ <b id="chat-jumpn" hidden></b></button>' +
      '  <div id="chat-typing" class="chat-typing" hidden></div>' +
      '  <div class="chat-foot" id="chat-foot"></div>' +
      "</div>";
    document.body.appendChild(wrap);
    fab = wrap.querySelector("#chat-fab");
    panel = wrap.querySelector("#chat-panel");
    listEl = wrap.querySelector("#chat-list");
    footEl = wrap.querySelector("#chat-foot");
    badgeEl = wrap.querySelector(".chat-badge");
    searchEl = wrap.querySelector("#chat-search");
    presenceEl = wrap.querySelector("#chat-presence");
    fab.addEventListener("click", () => setOpen(!open));
    wrap.querySelector(".chat-close").addEventListener("click", () => setOpen(false));
    /* 📹 jump to the current room's video study call */
    wrap.querySelector("#chat-call").addEventListener("click", () => {
      setOpen(false);
      location.hash = "#/call/" + encodeURIComponent(room);
    });
    /* fullscreen mode toggle — remembered across sessions */
    const fullBtn = wrap.querySelector("#chat-full");
    const applyFull = (on) => {
      panel.classList.toggle("full", on);
      fullBtn.innerHTML = ICON("expand");
      fullBtn.title = on ? "Exit fullscreen" : "Fullscreen";
      try { localStorage.setItem("wda_chat_full", on ? "1" : ""); } catch (e) {}
      if (open) scrollBottom();
    };
    fullBtn.addEventListener("click", () => applyFull(!panel.classList.contains("full")));
    if (localStorage.getItem("wda_chat_full") === "1") applyFull(true);
    searchEl.addEventListener("input", (e) => { searchQuery = e.target.value.toLowerCase(); if (open) renderList(); });
    /* ⬇ jump-to-bottom chip: appears when scrolled up; counts new arrivals */
    jumpEl = wrap.querySelector("#chat-jump");
    jumpEl.addEventListener("click", () => { newWhileUp = 0; scrollBottom(); updateJump(); });
    listEl.addEventListener("scroll", () => {
      if (nearBottom()) { newWhileUp = 0; markSeen(); }
      updateJump();
    }, { passive: true });
    setTitle();
  }

  function setTitle() {
    const el = panel && panel.querySelector(".chat-title");
    if (el) el.textContent = roomLabel || t("chat_title");
    const ver = panel && panel.querySelector("#chat-ver");
    if (ver) ver.textContent = BUILD + (FIREBASE_CONFIG ? (restMode ? "⚡" : "☁") : "💾");
  }

  function renderPresence() {
    if (!presenceEl) return;
    const active = getActiveUsers(room);
    const count = Object.keys(active).length;
    if (count > 0) {
      const names = Object.values(active).slice(0, 2).map(u => u.name.split(" ")[0]).join(", ");
      const more = Object.keys(active).length > 2 ? ` +${Object.keys(active).length - 2}` : "";
      presenceEl.innerHTML = `<span class="chat-online" title="${Object.values(active).map(u => u.name).join(', ')}">${count} 🟢 ${names}${more}</span>`;
    } else {
      presenceEl.innerHTML = "";
    }
  }

  function setOpen(v) {
    open = v;
    if (panel) panel.hidden = !open;
    if (fab) fab.classList.toggle("active", open);
    if (searchEl) searchEl.style.display = v ? "block" : "none";
    if (open) {
      unread = 0; renderBadge(); renderList(); renderFoot(); renderPresence(); scrollBottom();
      markPresence(room);
      startLive(); /* cloud presence + typing */
      const inp = footEl.querySelector("#chat-form textarea");
      if (inp) inp.focus();
    } else {
      stopLive();
    }
  }

  function renderBadge() {
    if (!badgeEl) return;
    if (unread > 0) { badgeEl.textContent = unread > 99 ? "99+" : String(unread); badgeEl.hidden = false; }
    else badgeEl.hidden = true;
    if (fab) fab.classList.toggle("pulse", unread > 0);
  }

  function fmtTime(ts) {
    const d = new Date(ts);
    let h = d.getHours(); let m = d.getMinutes();
    const ap = h < 12 ? "AM" : "PM";
    h = h % 12 || 12; m = (m < 10 ? "0" : "") + m;
    return h + ":" + m + " " + ap;
  }

  function renderList() {
    if (!listEl) return;
    const u = me();
    /* Room indicator: make it obvious when you're NOT in the global room,
       with a one-tap way back (messages live per room). */
    const roomBar = room === "community" ? "" :
      '<div class="chat-roombar"><span>📚 ' + esc(roomLabel || room) + "</span>" +
      '<button id="chat-to-community" type="button">🌐 ' + t("chat_go_community") + "</button></div>";
    /* 🚫 blocked-users bar: who you've muted, with one-tap unblock */
    const blocked = u ? loadBlocked() : {};
    const blockedN = Object.keys(blocked).length;
    const blockedBar = blockedN
      ? '<div class="chat-blockedbar"><span>🚫 ' + esc(t("chat_blocked_n").replace("{n}", blockedN)) + "</span>" +
        Object.entries(blocked).map(([id, nm]) =>
          '<button type="button" data-unblock="' + esc(id) + '">' + esc(nm) + " ✕</button>").join("") +
        "</div>"
      : "";
    const wireRoomBar = () => {
      const b = listEl.querySelector("#chat-to-community");
      if (b) b.addEventListener("click", () => setRoom("community", null));
      listEl.querySelectorAll("[data-unblock]").forEach((ub) =>
        ub.addEventListener("click", () => { toggleBlock(ub.getAttribute("data-unblock")); renderList(); }));
    };
    const filtered = (searchQuery
      ? roomCache.filter((m) => (m.text || "").toLowerCase().includes(searchQuery) || (m.name || "").toLowerCase().includes(searchQuery))
      : roomCache).filter((m) => !blocked[m.userId]);
    if (!filtered.length) {
      listEl.innerHTML = roomBar + blockedBar + '<div class="chat-empty">' + (searchQuery ? "No messages match" : t("chat_empty")) + "</div>";
      wireRoomBar();
      return;
    }
    let newDivDone = false;
    listEl.innerHTML = roomBar + blockedBar + filtered
      .map((msg, i) => {
        const mine = u && msg.userId === u.id && !msg.bot;
        const ref = esc(msg._key || msg.id);
        /* "New messages" divider: first message from others that arrived
           after this reader's last visit to the room */
        let newDiv = "";
        if (!newDivDone && seenAtOpen && !mine && msg.ts > seenAtOpen) {
          newDivDone = true;
          newDiv = '<div class="chat-newdiv"><span>' + esc(t("chat_new_msgs")) + "</span></div>";
        }
        const isPinned = msg.pinned;
        const text = (msg.editedText || msg.text || "");
        /* day separator when the calendar date changes */
        const prev = filtered[i - 1];
        const daySep = (!prev || new Date(prev.ts).toDateString() !== new Date(msg.ts).toDateString())
          ? '<div class="chat-day"><span>' + esc(new Date(msg.ts).toLocaleDateString(lang() === "my" ? "my-MM" : "en-US", { month: "short", day: "numeric" })) + "</span></div>"
          : "";
        const reactions = msg.reactions || {};
        const reactionHtml = Object.entries(reactions).map(([emoji, users]) => {
          const list = Array.isArray(users) ? users : Object.values(users || {});
          return `<span class="chat-reaction" title="${esc(list.join(', '))}">${esc(emoji)} ${list.length}</span>`;
        }).join("");
        /* 🔥 a message the room is loving (3+ total reactions) is Trending */
        const totalReactions = Object.values(reactions).reduce((n, users) =>
          n + (Array.isArray(users) ? users.length : Object.values(users || {}).length), 0);
        const trending = totalReactions >= 3;
        const mentioned = !mine && mentionsMe(text);
        /* Messenger-style grouping: same sender within 5 min → tighter
           spacing, avatar and name shown only on the first of the run */
        const grouped = !daySep && prev && prev.userId === msg.userId &&
          !!prev.bot === !!msg.bot && (msg.ts - prev.ts) < 300000;
        return (
          daySep + newDiv +
          '<div class="chat-msg ' + (mine ? "mine" : "") + (msg.bot ? " bot" : "") + (isPinned ? " pinned" : "") + (mentioned ? " mentioned" : "") + (grouped ? " grouped" : "") + '">' +
          (isPinned ? '<span class="chat-pin" title="Pinned">📌</span>' : "") +
          (mine ? "" : '<span class="chat-avatar' + (msg.bot ? " botav" : "") + (grouped ? " ghost" : "") + '">' + (grouped ? "" : (msg.bot ? ICON("bot") : esc(msg.initial || "?"))) + "</span>") +
          '<div class="chat-bubble' + (msg.caseStudy ? " case" : "") + (msg.caseStudy && msg.solved ? " solved" : "") + (msg.sticker ? " sticker" : "") + '">' +
          (mine || grouped ? "" : '<div class="chat-name">' + esc(msg.name || "") + "</div>") +
          (msg.caseStudy
            ? '<div class="case-tag' + (msg.solved ? " solved" : "") + '">' + ICON("caseb") + " " + esc(t("case_tag")) +
              '<span class="case-status">' + (msg.solved ? "✅ " + esc(t("case_solved")) : "🟣 " + esc(t("case_open"))) + "</span></div>" +
              '<div class="case-heading">' + esc(String(msg.caseTitle || "").slice(0, 80)) + "</div>"
            : "") +
          (msg.reply ? '<div class="chat-quote">↩ <b>' + esc(msg.reply.name || "") + "</b> " + esc(String(msg.reply.text || "").slice(0, 80)) + "</div>" : "") +
          (function () {
            /* multi-screenshot gallery (imgs array) with single-img fallback;
               Firebase may hand arrays back as objects — normalize */
            let list = Array.isArray(msg.imgs) ? msg.imgs
              : (msg.imgs && typeof msg.imgs === "object" ? Object.values(msg.imgs) : null);
            if (!list || !list.length) list = msg.img ? [msg.img] : [];
            if (!list.length) return "";
            return '<div class="chat-gallery' + (list.length > 1 ? " multi" : "") + '">' +
              list.slice(0, 4).map((s) => '<img class="chat-img" loading="lazy" src="' + esc(String(s)) + '" alt="photo">').join("") + "</div>";
          })() +
          (msg.aud ? '<div class="chat-aud"><button type="button" data-aud="' + ref + '">' + ICON("play") + "</button><span class=\"aud-bar\"><i></i></span><span class=\"aud-dur\">" + (Number(msg.dur) ? Number(msg.dur) + "s" : "🎤") + "</span></div>" : "") +
          (msg.file && /^data:/.test(String(msg.file))
            ? '<a class="chat-file" href="' + esc(String(msg.file)) + '" download="' + esc(String(msg.fileName || "file")) + '">' +
              ICON("file") + '<span class="chat-file-n"><b>' + esc(String(msg.fileName || "file")) + "</b>" +
              '<i>' + fileKB(msg.file) + " KB</i></span>" + ICON("down") + "</a>"
            : "") +
          (text ? '<div class="chat-text">' + formatText(text) + (msg.editedText ? ' <span class="chat-edited">(edited)</span>' : "") + "</div>" : "") +
          (reactionHtml ? '<div class="chat-reactions">' + reactionHtml + (trending ? '<span class="msg-trending">🔥 ' + esc(t("chat_trending")) + '</span>' : "") + '</div>' : "") +
          '<div class="chat-meta"><span class="chat-time">' + fmtTime(msg.ts) + "</span>" +
          '<div class="chat-actions">' +
          '<button class="chat-replybtn" data-reply="' + ref + '" title="' + esc(t("chat_reply")) + '">' + ICON("reply") + "</button>" +
          (text && window.AI && window.AI.ready()
            ? '<button class="chat-tr" data-tr="' + ref + '" title="' + esc(t("chat_translate")) + '">' + ICON("translate") + "</button>" : "") +
          '<button class="chat-react" data-react="' + ref + '" title="React">' + ICON("smile") + "</button>" +
          (!mine && !msg.bot ? '<button class="chat-report" data-report="' + ref + '" title="' + esc(t("chat_report")) + '">🚩</button>' : "") +
          (!mine && !msg.bot && msg.userId ? '<button class="chat-block" data-block="' + esc(msg.userId) + '" data-bname="' + esc((msg.name || "?")) + '" title="' + esc(t("chat_block")) + '">🚫</button>' : "") +
          (!mine && msg.userId && u && u.admin ? '<button class="chat-banbtn" data-ban="' + esc(msg.userId) + '" data-bname="' + esc((msg.name || "?")) + '" title="' + esc(t("chat_ban")) + '">⛔</button>' : "") +
          (mine ? '<button class="chat-edit" data-edit="' + ref + '" title="Edit">' + ICON("edit") + "</button>" : "") +
          (msg.caseStudy && (mine || (u && u.admin)) ? '<button class="chat-solve" data-solve="' + ref + '" title="' + esc(msg.solved ? t("case_reopen") : t("case_mark_solved")) + '">' + (msg.solved ? "↩" : "✅") + "</button>" : "") +
          (mine || (u && u.admin) ? '<button class="chat-pin" data-pin="' + ref + '" title="' + (isPinned ? "Unpin" : "Pin") + '">' + ICON("pin") + "</button>" : "") +
          (mine || (u && u.admin) ? '<button class="chat-del" data-del="' + ref + '" title="' + esc(t("chat_delete")) + '">' + ICON("trash") + "</button>" : "") +
          "</div></div></div></div>"
        );
      })
      .join("");
    listEl.querySelectorAll("[data-del]").forEach((b) =>
      b.addEventListener("click", () => del(b.getAttribute("data-del")))
    );
    listEl.querySelectorAll("[data-edit]").forEach((b) =>
      b.addEventListener("click", () => edit(b.getAttribute("data-edit")))
    );
    listEl.querySelectorAll("[data-react]").forEach((b) =>
      b.addEventListener("click", () => showReactionPicker(b.getAttribute("data-react"), b))
    );
    listEl.querySelectorAll("[data-pin]").forEach((b) =>
      b.addEventListener("click", () => togglePin(b.getAttribute("data-pin")))
    );
    listEl.querySelectorAll("[data-solve]").forEach((b) =>
      b.addEventListener("click", () => toggleSolved(b.getAttribute("data-solve")))
    );
    listEl.querySelectorAll("[data-tr]").forEach((b) =>
      b.addEventListener("click", () => translateMsg(b.getAttribute("data-tr"), b))
    );
    listEl.querySelectorAll("[data-report]").forEach((b) =>
      b.addEventListener("click", () => report(b.getAttribute("data-report")))
    );
    listEl.querySelectorAll("[data-block]").forEach((b) =>
      b.addEventListener("click", () => {
        const name = b.getAttribute("data-bname") || "?";
        if (!confirm(t("chat_block_confirm").replace("{n}", name))) return;
        toggleBlock(b.getAttribute("data-block"), name);
        renderList();
      })
    );
    listEl.querySelectorAll("[data-ban]").forEach((b) =>
      b.addEventListener("click", () => toggleBan(b.getAttribute("data-ban"), b.getAttribute("data-bname") || "?"))
    );
    listEl.querySelectorAll("[data-reply]").forEach((b) =>
      b.addEventListener("click", () => {
        const msg = roomCache.find((m) => (m._key || m.id) === b.getAttribute("data-reply"));
        if (!msg) return;
        replyTo = { name: msg.name || "?", text: ((msg.caseTitle ? "📋 " + msg.caseTitle + " · " : "") + ((msg.editedText || msg.text) || (msg.img ? "📷 photo" : ""))).slice(0, 80) };
        updateReplyBar();
        const inp = footEl && footEl.querySelector("#chat-form textarea");
        if (inp) inp.focus();
      })
    );
    listEl.querySelectorAll(".chat-img").forEach((im) =>
      im.addEventListener("click", () => showImageFull(im.src))
    );
    listEl.querySelectorAll("[data-aud]").forEach((b) =>
      b.addEventListener("click", () => {
        const key = b.getAttribute("data-aud");
        const m = roomCache.find((x) => (x._key || x.id) === key);
        if (m && m.aud) toggleVoice(key, m.aud, b);
      })
    );
    /* touch devices have no hover — tapping a bubble reveals its actions */
    listEl.querySelectorAll(".chat-bubble").forEach((bb) =>
      bb.addEventListener("click", (e) => {
        if (e.target.closest("button, a, img")) return;
        const msg = bb.closest(".chat-msg");
        const was = msg.classList.contains("show-actions");
        listEl.querySelectorAll(".chat-msg.show-actions").forEach((m) => m.classList.remove("show-actions"));
        if (!was) msg.classList.add("show-actions");
      })
    );
    wireRoomBar();
  }

  function updateReplyBar() {
    const bar = footEl && footEl.querySelector("#chat-replybar");
    if (!bar) return;
    if (replyTo) {
      bar.hidden = false;
      bar.innerHTML = "↩ <b>" + esc(replyTo.name) + ":</b> " + esc(replyTo.text) +
        ' <button id="chat-replycancel" type="button">✕</button>';
      bar.querySelector("#chat-replycancel").addEventListener("click", () => {
        replyTo = null;
        updateReplyBar();
      });
    } else {
      bar.hidden = true;
      bar.innerHTML = "";
    }
  }
  function scrollBottom() { if (listEl) { listEl.scrollTop = listEl.scrollHeight; markSeen(); } }
  /* ---- UX pack: near-bottom detection, jump chip, seen tracking ---- */
  let jumpEl = null, newWhileUp = 0, seenAtOpen = 0;
  const nearBottom = () => !listEl || (listEl.scrollHeight - listEl.scrollTop - listEl.clientHeight) < 140;
  function markSeen() {
    const last = roomCache[roomCache.length - 1];
    if (last && last.ts) { try { localStorage.setItem("wda_chat_seen::" + room, String(last.ts)); } catch (e) {} }
  }
  function loadSeen() {
    seenAtOpen = Number(localStorage.getItem("wda_chat_seen::" + room)) || 0;
  }
  function updateJump() {
    if (!jumpEl) return;
    const up = !nearBottom();
    jumpEl.hidden = !up;
    const n = jumpEl.querySelector("#chat-jumpn");
    if (n) { n.hidden = !newWhileUp; n.textContent = newWhileUp ? String(newWhileUp) : ""; }
  }
  /* one shared audio element so two voice notes never play at once */
  let audioEl = null, audioKey = "";
  function toggleVoice(key, src, btn) {
    if (audioEl && audioKey === key && !audioEl.paused) { audioEl.pause(); btn.innerHTML = ICON("play"); return; }
    if (audioEl) { audioEl.pause(); document.querySelectorAll(".chat-aud button").forEach((b) => { b.innerHTML = ICON("play"); }); }
    audioEl = new Audio(src);
    audioKey = key;
    btn.innerHTML = ICON("pause");
    audioEl.addEventListener("ended", () => { btn.innerHTML = ICON("play"); });
    audioEl.play().catch(() => { btn.innerHTML = ICON("play"); });
  }

  /* Free accounts can READ the chat but only paying students may write.
     Premium status loads async — re-render the composer when it flips. */
  const isPaying = () => !!(window.WDA && window.WDA.isPaying && window.WDA.isPaying());
  let lastPaying = null;
  window.addEventListener("hashchange", () => {
    const p = isPaying();
    if (lastPaying !== null && p !== lastPaying) renderFoot();
  });

  function renderFoot() {
    if (!footEl) return;
    const u = me();
    if (!u) {
      lastPaying = null;
      footEl.innerHTML = '<button class="btn btn-primary btn-block" id="chat-login" type="button">' + t("chat_login") + "</button>";
      footEl.querySelector("#chat-login").addEventListener("click", () => { if (window.Auth) window.Auth.openModal("login"); });
      return;
    }
    lastPaying = isPaying();
    if (!lastPaying) {
      footEl.innerHTML =
        '<div class="chat-locked">🔒 ' + esc(t("chat_premium_only")) +
        ' <a href="#/premium" class="btn btn-primary btn-sm">⭐ ' + esc(t("prem_go")) + "</a></div>";
      return;
    }
    footEl.innerHTML =
      '<div id="chat-replybar" class="chat-replybar" hidden></div>' +
      '<div id="stick-tray" class="stick-tray" hidden>' +
      ["🎉", "🔥", "👍", "❤️", "😂", "🤯", "💪", "🏆", "🙏", "😴", "☕", "🚀"].map((s) =>
        '<button type="button" data-stick="' + s + '">' + s + "</button>").join("") +
      "</div>" +
      '<div id="case-form" class="case-form" hidden>' +
      '  <div class="case-form-head">' + ICON("caseb") + " <b>" + esc(t("case_share")) + '</b><button type="button" id="case-cancel" class="chat-close-mini">' + ICON("x") + "</button></div>" +
      '  <input id="case-title" maxlength="80" placeholder="' + esc(t("case_title_ph")) + '">' +
      '  <textarea id="case-desc" rows="3" maxlength="400" placeholder="' + esc(t("case_desc_ph")) + '"></textarea>' +
      '  <div class="case-form-foot">' +
      '    <label class="btn-mini">' + ICON("camera") + " " + esc(t("case_shot")) + '<input id="case-file" type="file" accept="image/*" multiple hidden></label>' +
      '    <span id="case-thumbs" class="case-thumbs"></span>' +
      '    <button type="button" id="case-post" class="btn-mini primary">' + ICON("send") + " " + esc(t("case_post")) + "</button>" +
      "  </div></div>" +
      /* One-pill composer: the extras hide behind + so the box stays calm */
      '<form class="chat-form" id="chat-form">' +
      '<div class="sum-panel" id="sum-panel" hidden></div>' +
      '<div class="chat-tray" id="chat-tray" hidden>' +
      '<button type="button" class="chat-casebtn" id="chat-sum" title="' + esc(t("sum_title")) + '">' + ICON("list") + "</button>" +
      '<button type="button" class="chat-casebtn" id="chat-case" title="' + esc(t("case_share")) + '">' + ICON("caseb") + "</button>" +
      '<label class="chat-photo" title="' + esc(t("chat_photo")) + '">' + ICON("camera") + '<input type="file" accept="image/*" hidden></label>' +
      '<label class="chat-photo" id="chat-filebtn" title="' + esc(t("file_attach")) + '">' + ICON("clip") +
        '<input type="file" id="chat-file" accept=".pdf,.txt,.csv,.md,.json,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx" hidden></label>' +
      '<button type="button" class="chat-photo chat-stick" id="chat-stick" title="Sticker">😊</button>' +
      "</div>" +
      /* ✨ Polish: appears once there's something worth improving */
      '<div class="polish-menu" id="polish-menu" hidden>' +
      [["fix", "polish_fix"], ["en", "polish_en"], ["my", "polish_my"],
       ["pro", "polish_pro"], ["casual", "polish_casual"]]
        .map(([k, key]) => '<button type="button" data-polish="' + k + '">' + esc(t(key)) + "</button>").join("") +
      "</div>" +
      '<div class="chat-pill">' +
      '<button type="button" class="chat-plus" id="chat-plus" aria-expanded="false" aria-label="' + esc(t("chat_more")) + '" title="' + esc(t("chat_more")) + '">+</button>' +
      '<textarea rows="1" maxlength="500" placeholder="' + esc(t("chat_placeholder") + (window.AI && window.AI.ready() ? " · @ai 🤖" : "")) + '"></textarea>' +
      '<button type="button" class="chat-polish" id="chat-polish" hidden aria-expanded="false" title="' + esc(t("polish_title")) + '" aria-label="' + esc(t("polish_title")) + '">' + ICON("sparkle") + "</button>" +
      '<button type="button" class="chat-photo chat-mic" id="chat-mic" title="' + esc(t("chat_voice")) + '">' + ICON("mic") + "</button>" +
      '<button class="chat-send" type="submit" aria-label="Send">' + ICON("send") + "</button>" +
      "</div></form>";
    const form = footEl.querySelector("#chat-form");
    const inp = form.querySelector("textarea");
    const file = form.querySelector('input[type="file"]');

    /* 📋 case study composer: title + description + up to 4 screenshots */
    const caseForm = footEl.querySelector("#case-form");
    let caseImgs = [];
    const paintThumbs = () => {
      const box = footEl.querySelector("#case-thumbs");
      box.innerHTML = caseImgs.map((s, i) =>
        '<span class="case-thumb"><img src="' + s + '" alt=""><button type="button" data-rmimg="' + i + '">×</button></span>').join("");
      box.querySelectorAll("[data-rmimg]").forEach((b) =>
        b.addEventListener("click", () => { caseImgs.splice(Number(b.getAttribute("data-rmimg")), 1); paintThumbs(); }));
    };
    /* ✨ Polish — clean up the draft before sending. Shows at 4+ words, like
       Viber's. Rewrites the textarea in place; never sends by itself. */
    const POLISH = {
      fix: "Fix ONLY the spelling and grammar of this chat message. Keep the same language, meaning and tone. Do not add anything.",
      en: "Translate this chat message into natural, friendly English.",
      my: "Translate this chat message into natural, friendly Burmese (Myanmar script).",
      pro: "Rewrite this chat message in a polite, professional tone. Keep the same language and meaning.",
      casual: "Rewrite this chat message in a warm, casual tone. Keep the same language and meaning.",
    };
    const polishBtn = footEl.querySelector("#chat-polish");
    const polishMenu = footEl.querySelector("#polish-menu");
    const updatePolish = () => {
      const words = (inp.value || "").trim().split(/\s+/).filter(Boolean).length;
      const show = !!(window.AI && window.AI.ready()) && words >= 4;
      polishBtn.hidden = !show;
      if (!show) { polishMenu.hidden = true; polishBtn.setAttribute("aria-expanded", "false"); }
    };
    inp.addEventListener("input", updatePolish);
    polishBtn.addEventListener("click", () => {
      const open = polishMenu.hidden;
      polishMenu.hidden = !open;
      polishBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    polishMenu.querySelectorAll("[data-polish]").forEach((b) =>
      b.addEventListener("click", () => {
        const text = (inp.value || "").trim();
        if (!text) return;
        const kind = b.getAttribute("data-polish");
        polishMenu.hidden = true;
        polishBtn.setAttribute("aria-expanded", "false");
        polishBtn.classList.add("busy");
        showStatus("✨ " + t("polish_working"));
        window.AI.complete(POLISH[kind] + " Reply with ONLY the message itself — no quotes, no notes, no explanation.\n\n" + text, { maxTokens: 400 })
          .then((res) => {
            let out = String(res || "").trim();
            if (window.AI.stripFences) out = window.AI.stripFences(out);
            out = out.replace(/^["'“”]+|["'“”]+$/g, "").trim();
            if (!out) throw new Error("empty");
            inp.value = out.slice(0, 500);
            inp.dispatchEvent(new Event("input"));
            inp.focus();
            showStatus("");
          })
          .catch(() => showStatus("⚠ " + t("polish_fail")))
          .finally(() => polishBtn.classList.remove("busy"));
      })
    );

    /* 📎 Attach a small file. Hard limits, because every student downloads
       this on every chat open — it lives inside the message, not in a blob
       store. Type allowlist keeps executables/HTML out of a teen chat. */
    footEl.querySelector("#chat-file").addEventListener("change", (e) => {
      const f = (e.target.files || [])[0];
      e.target.value = "";
      if (!f) return;
      if (!FILE_OK.test(f.name)) { showStatus("⚠ " + t("file_type")); return; }
      if (f.size > FILE_MAX) {
        showStatus("⚠ " + t("file_big").replace("{n}", Math.round(f.size / 1024)));
        return;
      }
      showStatus("⏳ " + t("file_reading"));
      const r = new FileReader();
      r.onload = () => {
        const data = String(r.result || "");
        if (data.length > 300000) { showStatus("⚠ " + t("file_type")); return; } /* base64 overhead guard */
        send("", null, { file: data, fileName: f.name.slice(0, 100), fileType: f.type || "" });
        showStatus("");
      };
      r.onerror = () => showStatus("⚠ " + t("file_fail"));
      r.readAsDataURL(f);
    });

    /* 📋 Catch me up — summarise the recent conversation into bullets.
       Reads roomCache (already on the client), so no new backend. Private:
       the summary is rendered for this reader only and never sent. */
    const sumBtn = footEl.querySelector("#chat-sum");
    const sumPanel = footEl.querySelector("#sum-panel");
    sumBtn.addEventListener("click", () => {
      if (!sumPanel.hidden) { sumPanel.hidden = true; return; } /* toggle */
      if (!(window.AI && window.AI.ready())) { showStatus("⚠ " + t("sum_noai")); return; }
      const msgs = roomCache.filter((m) => (m.text || "").trim() && !m.sticker).slice(-60);
      if (msgs.length < 3) { showStatus("⚠ " + t("sum_thin")); return; }
      sumPanel.hidden = false;
      sumPanel.innerHTML = '<div class="sum-head"><b>📋 ' + esc(t("sum_title")) + "</b>" +
        '<button type="button" class="chat-close-mini" id="sum-x">' + ICON("x") + "</button></div>" +
        '<p class="muted" style="margin:0">' + esc(t("sum_working")) + "</p>";
      sumPanel.querySelector("#sum-x").addEventListener("click", () => { sumPanel.hidden = true; });

      const transcript = msgs.map((m) =>
        (m.bot ? "AI Bot" : String(m.name || "?")) + ": " + String(m.editedText || m.text).slice(0, 300)
      ).join("\n");
      const prompt =
        "You are catching a student up on their class chat. Summarise the conversation below in 3-6 short bullet points: " +
        "the main topics, any decisions, and any question that is still unanswered. " +
        (lang() === "my" ? "Reply in simple Burmese (keep technical words like HTML/CSS in English). " : "Reply in simple English. ") +
        "Start each bullet with '- '. No preamble, no title, bullets only.\n\n" + transcript;

      window.AI.complete(prompt, { maxTokens: 500 })
        .then((res) => {
          let out = String(res || "").trim();
          if (window.AI.stripFences) out = window.AI.stripFences(out);
          if (!out) throw new Error("empty");
          const items = out.split("\n").map((l) => l.replace(/^\s*[-•*]\s*/, "").trim()).filter(Boolean);
          sumPanel.innerHTML = '<div class="sum-head"><b>📋 ' + esc(t("sum_title")) + "</b>" +
            '<span class="sum-n">' + msgs.length + " " + esc(t("sum_msgs")) + "</span>" +
            '<button type="button" class="chat-close-mini" id="sum-x2">' + ICON("x") + "</button></div>" +
            "<ul>" + items.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
            '<p class="sum-foot">' + esc(t("sum_private")) + "</p>";
          sumPanel.querySelector("#sum-x2").addEventListener("click", () => { sumPanel.hidden = true; });
        })
        .catch(() => {
          sumPanel.innerHTML = '<div class="sum-head"><b>📋 ' + esc(t("sum_title")) + "</b></div>" +
            '<p class="muted" style="margin:0">⚠ ' + esc(t("sum_fail")) + "</p>";
        });
    });

    /* + reveals the extras (case study, photo, sticker) and turns into an × */
    const plusBtn = footEl.querySelector("#chat-plus");
    const trayEl = footEl.querySelector("#chat-tray");
    plusBtn.addEventListener("click", () => {
      const open = trayEl.hidden;
      trayEl.hidden = !open;
      plusBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    footEl.querySelector("#chat-case").addEventListener("click", () => {
      caseForm.hidden = !caseForm.hidden;
      if (!caseForm.hidden) footEl.querySelector("#case-title").focus();
    });
    footEl.querySelector("#case-cancel").addEventListener("click", () => { caseForm.hidden = true; });
    footEl.querySelector("#case-file").addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []).slice(0, 4 - caseImgs.length);
      e.target.value = "";
      if (!files.length) { if (caseImgs.length >= 4) showStatus("⚠ " + t("case_max")); return; }
      showStatus("⏳ …");
      let pending = files.length;
      files.forEach((f) => compressImage(f, (data) => {
        if (data && caseImgs.length < 4) caseImgs.push(data);
        if (--pending === 0) { paintThumbs(); showStatus(""); }
      }));
    });
    footEl.querySelector("#case-post").addEventListener("click", () => {
      const title = (footEl.querySelector("#case-title").value || "").trim().slice(0, 80);
      const desc = (footEl.querySelector("#case-desc").value || "").trim();
      if (!title || !desc) { showStatus("⚠ " + t("case_need")); return; }
      const extra = { caseStudy: true, caseTitle: title };
      if (caseImgs.length > 1) extra.imgs = caseImgs.slice(0, 4);
      send(desc, caseImgs[0] || null, extra);
      caseImgs = [];
      paintThumbs();
      footEl.querySelector("#case-title").value = "";
      footEl.querySelector("#case-desc").value = "";
      caseForm.hidden = true;
    });
    const doSend = () => {
      send(inp.value);
      inp.value = "";
      inp.style.height = "auto";
      inp.focus();
    };
    inp.addEventListener("input", () => {
      broadcastTyping(); cloudTypingPing();
      inp.style.height = "auto";
      inp.style.height = Math.min(inp.scrollHeight, 90) + "px";
    });
    /* Enter sends, Shift+Enter makes a new line (for ```code blocks```) */
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); doSend(); }
    });
    form.addEventListener("submit", (e) => { e.preventDefault(); doSend(); });
    file.addEventListener("change", () => {
      const f = file.files && file.files[0];
      file.value = "";
      if (!f) return;
      showStatus("⏳ …");
      compressImage(f, (data) => {
        if (!data) { showStatus("⚠ " + t("chat_img_err")); return; }
        send(inp.value, data);
        inp.value = "";
      });
    });

    /* 😊 sticker tray: one tap sends a big emoji (older clients see plain text) */
    const tray = footEl.querySelector("#stick-tray");
    footEl.querySelector("#chat-stick").addEventListener("click", () => { tray.hidden = !tray.hidden; });
    tray.querySelectorAll("[data-stick]").forEach((b) =>
      b.addEventListener("click", () => { send(b.getAttribute("data-stick"), null, { sticker: true }); tray.hidden = true; })
    );

    /* 🎤 voice notes: tap to record (30s cap), tap again to send */
    const micBtn = footEl.querySelector("#chat-mic");
    let rec = null, recChunks = [], recT0 = 0, recTimer = null;
    const stopRec = () => { if (rec && rec.state !== "inactive") rec.stop(); clearTimeout(recTimer); };
    micBtn.addEventListener("click", () => {
      if (rec && rec.state === "recording") { stopRec(); return; }
      if (!(navigator.mediaDevices && window.MediaRecorder)) { showStatus("⚠ " + t("chat_mic_unsupported")); return; }
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus"
          : MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4" : "";
        rec = new MediaRecorder(stream, mime ? { mimeType: mime, audioBitsPerSecond: 32000 } : undefined);
        recChunks = []; recT0 = Date.now();
        rec.addEventListener("dataavailable", (e) => { if (e.data && e.data.size) recChunks.push(e.data); });
        rec.addEventListener("stop", () => {
          stream.getTracks().forEach((tr) => tr.stop());
          micBtn.classList.remove("recording");
          micBtn.innerHTML = ICON("mic");
          showStatus("");
          const dur = Math.round((Date.now() - recT0) / 1000);
          const blob = new Blob(recChunks, { type: rec.mimeType || "audio/webm" });
          if (dur < 1 || !blob.size) return;
          if (blob.size > 400000) { showStatus("⚠ " + t("chat_voice_long")); return; }
          const fr = new FileReader();
          fr.onload = () => send("", null, { aud: String(fr.result), dur: dur });
          fr.readAsDataURL(blob);
        });
        rec.start();
        micBtn.classList.add("recording");
        micBtn.innerHTML = "⏹";
        showStatus("🎤 " + t("chat_recording"));
        recTimer = setTimeout(stopRec, 30000);
      }).catch(() => { showStatus("⚠ " + t("chat_mic_denied")); });
    });
    updateReplyBar();
  }

  /* ---------------- actions ---------------- */
  /* Attachments are base64 inside the message, so they are downloaded by
     every student on every chat open. That is why the cap is small and
     strict — see FILE_MAX. Anything bigger needs Firebase Storage. */
  const FILE_MAX = 200 * 1024;                       /* 200 KB on disk */
  const FILE_OK = /\.(pdf|txt|csv|md|json|zip|docx?|xlsx?|pptx?)$/i;
  const fileKB = (dataUrl) => Math.max(1, Math.round(String(dataUrl || "").length * 0.75 / 1024));

  function send(text, img, extra) {
    text = (text || "").trim();
    if (!text && !img && !(extra && (extra.aud || extra.file))) return;
    const u = me();
    if (!u) { showStatus(t("chat_login")); return; }
    if (!isPaying()) { showStatus("🔒 " + t("chat_premium_only")); return; }
    if (!rateOk()) { showStatus("⚠ " + t("chat_slow_down")); return; }
    text = moderate(text.slice(0, 500));
    const label = (u.name || u.email || "?").trim();
    const msg = {
      id: "m_" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
      userId: u.id,
      name: label.split(" ")[0],
      initial: label.charAt(0).toUpperCase(),
      text: text,
      ts: Date.now(),
    };
    if (img) msg.img = img;
    if (extra) Object.assign(msg, extra); /* e.g. case studies: {caseStudy, caseTitle} */
    if (replyTo) { msg.reply = { name: replyTo.name, text: replyTo.text }; replyTo = null; updateReplyBar(); }
    Promise.resolve(backend.add(room, msg)).catch(() => {
      /* a rules rejection may mean this account is banned — say so plainly */
      if (FIREBASE_CONFIG) {
        withAuth(FIREBASE_CONFIG.databaseURL + "/banned/" + encodeURIComponent(u.id) + ".json")
          .then((url) => fetch(url)).then((r) => r.json())
          .then((b) => showStatus(b ? "⛔ " + t("chat_you_banned") : "⚠ " + t("chat_send_err")))
          .catch(() => showStatus("⚠ " + t("chat_send_err")));
      } else showStatus("⚠ " + t("chat_send_err"));
    });
    /* @ai → the sender's browser asks the free AI and posts the bot's reply */
    if (/(^|\s)@ai\b/i.test(text)) askAiBot(text.replace(/(^|\s)@ai\b/gi, " ").trim(), msg);
  }

  /* ---------------- AI bot (free Gemini via js/ai.js) ---------------- */
  function askAiBot(question, userMsg) {
    if (window.WDA && window.WDA.isPremium && !window.WDA.isPremium()) { showStatus("⭐ " + t("chat_ai_premium")); return; }
    if (!window.AI) { showStatus("🤖 " + t("chat_ai_nokey")); return; }
    if (!question) question = "Say hello and explain how you can help.";
    showStatus("🤖 " + t("chat_ai_thinking"));
    /* capture the room NOW — the user may switch rooms while the AI thinks,
       and the answer must land next to its question */
    const askedRoom = room;
    const ctx = roomCache.slice(-8)
      .map((m) => (m.bot ? "AI Bot" : (m.name || "?")) + ": " + String(m.editedText || m.text || "").slice(0, 160))
      .join("\n");
    window.AI.complete(
      "Recent chat messages:\n" + ctx + "\n\nNow answer " + (userMsg.name || "the student") + "'s question:\n" + question,
      {
        system:
          "You are the friendly AI helper in WebDev Academy's community chat — a free web-development school for Myanmar students. " +
          "Answer coding and learning questions in under 120 words, in simple English (reply in Burmese if the student wrote Burmese). " +
          "Put code inside ```code fences```. If the question is not about learning or coding, reply kindly in one short sentence. " +
          "If an image is attached (a code screenshot, error message or exercise), read it carefully and explain step by step.",
        maxTokens: 2048,
        image: userMsg.img || null, /* 📷 photo questions — Gemini reads the screenshot */
      }
    ).then((reply) => {
      const bot = {
        id: "m_" + Date.now().toString(36) + "ai",
        /* posted from the asker's browser with the asker's auth — rules
           require userId === auth.uid; bot:true keeps the bot styling */
        userId: userMsg.userId,
        name: "AI Bot",
        initial: "🤖",
        bot: true,
        text: String(reply).slice(0, 1200),
        ts: Date.now(),
        reply: { name: userMsg.name, text: String(userMsg.text || "").slice(0, 80) },
      };
      Promise.resolve(backend.add(askedRoom, bot)).catch(() => showStatus("⚠ " + t("chat_send_err")));
    }).catch((err) => {
      const m = (err && err.message) || String(err);
      showStatus(m === "no-key" ? "🤖 " + t("chat_ai_nokey") : "⚠ AI: " + m);
    });
  }

  function del(ref) {
    const u = me();
    if (!u) return;
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg || (msg.userId !== u.id && !u.admin)) return; // your own, or admin
    backend.del(room, ref);
  }

  /* 🚩 report a message → reports/ queue, reviewed in the admin dashboard */
  function report(ref) {
    const u = me();
    if (!u) { if (window.Auth) window.Auth.openModal("login"); return; }
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg) return;
    if (!confirm(t("chat_report_confirm"))) return;
    if (!FIREBASE_CONFIG) { showStatus("🚩 " + t("chat_reported")); return; }
    const payload = {
      room: room, msg: String(msg._key || msg.id),
      uid: String(msg.userId || ""), name: String(msg.name || "").slice(0, 40),
      text: String(msg.editedText || msg.text || (msg.img ? "📷 photo" : msg.aud ? "🎤 voice" : "")).slice(0, 200),
      by: u.id, byName: (u.name || u.email || "?").split(" ")[0].slice(0, 40), ts: Date.now(),
    };
    withAuth(FIREBASE_CONFIG.databaseURL + "/reports.json")
      .then((url) => fetch(url, { method: "POST", body: JSON.stringify(payload) }))
      .then((r) => { if (!r.ok) throw new Error("report failed"); showStatus("🚩 " + t("chat_reported")); })
      .catch(() => showStatus("⚠ " + t("chat_send_err")));
  }

  /* ⛔ admin ban/unban: rules refuse every write from a uid in banned/ */
  function toggleBan(uid, name) {
    const u = me();
    if (!u || !u.admin || !FIREBASE_CONFIG || !uid) return;
    withAuth(FIREBASE_CONFIG.databaseURL + "/banned/" + encodeURIComponent(uid) + ".json").then((url) =>
      fetch(url).then((r) => r.json()).then((cur) => {
        if (cur) {
          if (!confirm(t("chat_unban_confirm").replace("{n}", name))) return;
          return fetch(url, { method: "DELETE" }).then((r2) => {
            if (!r2.ok) throw new Error("unban failed");
            showStatus("✓ " + t("chat_unbanned").replace("{n}", name));
          });
        }
        if (!confirm(t("chat_ban_confirm").replace("{n}", name))) return;
        return fetch(url, { method: "PUT", body: JSON.stringify({ name: String(name || "?").slice(0, 40), by: u.id, ts: Date.now() }) })
          .then((r2) => {
            if (!r2.ok) throw new Error("ban failed");
            showStatus("⛔ " + t("chat_banned").replace("{n}", name));
          });
      })
    ).catch(() => showStatus("⚠ " + t("chat_send_err")));
  }

  function edit(ref) {
    const u = me();
    if (!u) return;
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg || msg.userId !== u.id) return;
    const newText = prompt("Edit message:", msg.editedText || msg.text);
    if (newText === null) return;
    const text = (newText || "").trim().slice(0, 500);
    if (!text) return;
    msg.editedText = moderate(text);
    msg.editTs = Date.now();
    Promise.resolve(backend.update(room, msg)).catch(() => showStatus("⚠ " + t("chat_send_err")));
  }

  /* Messenger-style floating reaction pill, anchored to the message */
  function showReactionPicker(ref, anchor) {
    const old = document.querySelector(".react-pill");
    if (old) old.remove();
    const emojis = ['👍', '❤️', '😂', '🎉', '🔥', '👏'];
    const pill = document.createElement("div");
    pill.className = "react-pill";
    pill.innerHTML = emojis.map((e) => '<button type="button" data-emoji="' + e + '">' + e + "</button>").join("");
    document.body.appendChild(pill);
    const r = anchor && anchor.getBoundingClientRect
      ? anchor.getBoundingClientRect()
      : { top: innerHeight / 2, bottom: innerHeight / 2, left: innerWidth / 2, width: 0 };
    const pw = pill.offsetWidth, ph = pill.offsetHeight;
    let top = r.top - ph - 8;
    if (top < 8) top = r.bottom + 8;
    const left = Math.min(Math.max(8, r.left + r.width / 2 - pw / 2), innerWidth - pw - 8);
    pill.style.top = top + "px";
    pill.style.left = left + "px";
    pill.addEventListener("click", (e) => {
      const b = e.target.closest("[data-emoji]");
      if (b) { addReaction(ref, b.getAttribute("data-emoji")); pill.remove(); }
    });
    setTimeout(() => {
      document.addEventListener("click", function close(e) {
        if (!pill.contains(e.target)) { pill.remove(); document.removeEventListener("click", close); }
      });
    }, 0);
  }

  function addReaction(ref, emoji) {
    const u = me();
    if (!u) return;
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg) return;
    if (!msg.reactions) msg.reactions = {};
    if (!msg.reactions[emoji]) msg.reactions[emoji] = [];
    /* Firebase can deserialize arrays as objects — normalize first */
    if (!Array.isArray(msg.reactions[emoji])) msg.reactions[emoji] = Object.values(msg.reactions[emoji] || {});
    if (!msg.reactions[emoji].includes(u.id)) {
      msg.reactions[emoji].push(u.id);
    } else {
      msg.reactions[emoji] = msg.reactions[emoji].filter(id => id !== u.id);
      if (msg.reactions[emoji].length === 0) delete msg.reactions[emoji];
    }
    /* write ONLY this emoji's list — the security rules let anyone react but
       only the author rewrite the whole message node */
    const list = msg.reactions[emoji];
    Promise.resolve(backend.setPath(room, ref, "reactions/" + emoji, list && list.length ? list : null))
      .catch(() => showStatus("⚠ " + t("chat_send_err")));
  }

  /* 🌐 Translate a message you RECEIVED. Direction is detected from the
     text itself (Myanmar script U+1000–109F), so there's nothing to pick:
     Burmese → English, anything else → Burmese. Shown inline, toggleable,
     and never sent anywhere — it's only rendered for the reader. */
  const hasMyanmar = (s) => /[က-႟]/.test(String(s || ""));
  function translateMsg(ref, btn) {
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg) return;
    const src = String(msg.editedText || msg.text || "").trim();
    if (!src || !(window.AI && window.AI.ready())) return;
    const bubble = btn.closest(".chat-bubble");
    if (!bubble) return;
    const existing = bubble.querySelector(".chat-trans");
    if (existing) { existing.remove(); btn.classList.remove("on"); return; } /* toggle off */

    const toEnglish = hasMyanmar(src);
    const box = document.createElement("div");
    box.className = "chat-trans";
    box.innerHTML = '<span class="chat-trans-lbl">' + (toEnglish ? "🇬🇧 EN" : "🇲🇲 MY") + "</span> " + esc(t("chat_translating"));
    const textEl = bubble.querySelector(".chat-text");
    if (textEl) textEl.insertAdjacentElement("afterend", box); else bubble.appendChild(box);
    btn.classList.add("on");

    const prompt = (toEnglish
      ? "Translate this chat message from Burmese (Myanmar) into natural English."
      : "Translate this chat message into natural Burmese (Myanmar script).") +
      " Keep technical words (HTML, CSS, JavaScript, tag names, code) in English. Reply with ONLY the translation — no quotes, no notes.\n\n" + src;

    window.AI.complete(prompt, { maxTokens: 400 })
      .then((res) => {
        let out = String(res || "").trim();
        if (window.AI.stripFences) out = window.AI.stripFences(out);
        out = out.replace(/^["'“”]+|["'“”]+$/g, "").trim();
        if (!out) throw new Error("empty");
        box.innerHTML = '<span class="chat-trans-lbl">' + (toEnglish ? "🇬🇧 EN" : "🇲🇲 MY") + "</span> " + esc(out);
      })
      .catch(() => {
        box.innerHTML = '<span class="chat-trans-lbl">⚠️</span> ' + esc(t("chat_trans_fail"));
      });
  }

  function togglePin(ref) {
    const u = me();
    if (!u) return;
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg) return;
    if (msg.userId !== u.id && !u.admin) return;
    msg.pinned = !msg.pinned;
    Promise.resolve(backend.setPath(room, ref, "pinned", msg.pinned ? true : null))
      .catch(() => showStatus("⚠ " + t("chat_send_err")));
  }

  /* ✅ author (or admin) marks a case study solved / re-opens it */
  function toggleSolved(ref) {
    const u = me();
    if (!u) return;
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg || !msg.caseStudy) return;
    if (msg.userId !== u.id && !u.admin) return;
    msg.solved = !msg.solved;
    Promise.resolve(backend.setPath(room, ref, "solved", msg.solved ? true : null))
      .catch(() => showStatus("⚠ " + t("chat_send_err")));
  }

  /* Broadcast typing status */
  let typingTimer;
  function broadcastTyping() {
    if (bc) {
      try { bc.postMessage({ type: "typing", room: room, user: me()?.name || "?" }); } catch (e) {}
    }
  }

  function renderTyping() {
    const typingEl = panel && panel.querySelector("#chat-typing");
    if (!typingEl) return;
    if (typingUsers.size > 0) {
      const names = Array.from(typingUsers).slice(0, 2).join(", ");
      const more = typingUsers.size > 2 ? " +" + (typingUsers.size - 2) : "";
      typingEl.innerHTML = esc(names + more) + ' <span class="tdots"><i></i><i></i><i></i></span>';
      typingEl.hidden = false;
    } else {
      typingEl.hidden = true;
    }
  }

  /* Handle typing and presence from other tabs */
  if (bc) {
    bc.onmessage = (e) => {
      if (!e || !e.data) return;
      if (e.data.type === "msg") incoming(e.data.room);
      else if (e.data.type === "typing") {
        typingUsers.add(e.data.user);
        renderTyping();
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => { typingUsers.clear(); renderTyping(); }, 2000);
      }
      else if (e.data.type === "presence" && e.data.room === room && open) {
        renderPresence();
      }
    };
  }

  /* ---------------- room subscription ---------------- */
  function subscribeRoom() {
    if (unsub) { try { unsub(); } catch (e) {} }
    roomCache = []; primed = false;
    loadSeen();
    unsub = backend.subscribe(room, (msgs) => {
      const delta = msgs.length - roomCache.length;
      roomCache = msgs;
      if (!primed) { primed = true; if (open) { renderList(); scrollBottom(); } return; }
      if (open) {
        /* only auto-scroll when the reader is already at the bottom —
           never yank them away from older messages they're reading */
        const stick = nearBottom();
        renderList();
        if (stick) scrollBottom();
        else if (delta > 0) { newWhileUp += delta; updateJump(); }
      }
      else if (delta > 0) { unread += delta; renderBadge(); beep(); flashTitle(); }
    });
  }

  function setRoom(id, label) {
    id = id || "community";
    if (id === room) { if (label !== roomLabel) { roomLabel = label; setTitle(); } return; }
    room = id; roomLabel = label || null; unread = 0; newWhileUp = 0; renderBadge(); setTitle();
    markPresence(room);
    subscribeRoom();
    if (open) { renderList(); renderPresence(); startLive(); }
  }

  /* re-render on auth change (login/logout) */
  if (window.Auth && window.Auth.onChange) {
    window.Auth.onChange(() => { renderFoot(); if (open) renderList(); });
  }

  window.Chat = {
    open: () => setOpen(true),
    setRoom: setRoom,
    refresh: () => { setTitle(); renderFoot(); if (open) renderList(); },
    post: send,
  };

  build();
  renderFoot();
  subscribeRoom();
})();
