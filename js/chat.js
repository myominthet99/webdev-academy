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
  const BUILD = "v15"; /* shown in the chat header — bump with releases */

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
    fetch(cloudUrl(room, "presence", u.id), {
      method: "PUT",
      body: JSON.stringify({ name: (u.name || u.email || "?").split(" ")[0], ts: Date.now() }),
    }).catch(() => {});
  }
  function cloudTypingPing() {
    const u = me();
    if (!u || !FIREBASE_CONFIG) return;
    const now = Date.now();
    if (now - lastTypingPut < 2500) return; /* throttle writes */
    lastTypingPut = now;
    fetch(cloudUrl(room, "typing", u.id), {
      method: "PUT",
      body: JSON.stringify({ name: (u.name || u.email || "?").split(" ")[0], ts: now }),
    }).catch(() => {});
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
    if (u && FIREBASE_CONFIG) fetch(cloudUrl(room, "presence", u.id), { method: "DELETE" }).catch(() => {});
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
  };
  function broadcast(r) { if (bc) { try { bc.postMessage({ type: "msg", room: r }); } catch (e) {} } }
  function incoming(evtRoom) { if (localBackend._handlers[evtRoom]) localBackend._emit(evtRoom); }
  if (bc) bc.onmessage = (e) => { if (e && e.data && e.data.type === "msg") incoming(e.data.room); };
  else window.addEventListener("storage", (e) => {
    if (e.key && e.key.indexOf(KEY + "::") === 0) incoming(e.key.slice((KEY + "::").length));
  });

  /* Firebase backend (only used when FIREBASE_CONFIG is set) */
  let fb = null, fbInit = null;
  function ensureFb() {
    if (fb) return Promise.resolve();
    if (!fbInit) {
      fbInit = (async () => {
        const appMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
        const dbMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
        const app = appMod.initializeApp(FIREBASE_CONFIG);
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
      return fetch(restUrl(r), { method: "POST", body: JSON.stringify(cleanMsg(msg)) })
        .then((res) => { if (!res.ok) throw new Error("send failed"); this._refresh(); });
    },
    update(r, msg) {
      if (!msg._key) return this.add(r, msg);
      return fetch(restUrl(r, msg._key), { method: "PUT", body: JSON.stringify(cleanMsg(msg)) })
        .then((res) => { if (!res.ok) throw new Error("update failed"); this._refresh(); });
    },
    del(r, ref) {
      return fetch(restUrl(r, ref), { method: "DELETE" })
        .then((res) => { if (!res.ok) throw new Error("delete failed"); this._refresh(); });
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
      '<button id="chat-fab" class="chat-fab" type="button" aria-label="Chat">💬' +
      '<span class="chat-badge" hidden>0</span></button>' +
      '<div id="chat-panel" class="chat-panel" hidden>' +
      '  <div class="chat-head"><span class="chat-title"></span>' +
      '    <span id="chat-ver" class="chat-ver" title="build · backend"></span>' +
      '    <span id="chat-presence" class="chat-presence"></span>' +
      '    <input id="chat-search" type="text" class="chat-search" placeholder="🔍 Search..." style="display:none">' +
      '    <button class="chat-call" id="chat-call" type="button" aria-label="Video call" title="' + esc(t("call_title")) + '">📹</button>' +
      '    <button class="chat-full" id="chat-full" type="button" aria-label="Fullscreen" title="Fullscreen">⛶</button>' +
      '    <button class="chat-close" type="button" aria-label="Close">&times;</button></div>' +
      '  <div class="chat-list" id="chat-list"></div>' +
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
      fullBtn.textContent = on ? "🗗" : "⛶";
      try { localStorage.setItem("wda_chat_full", on ? "1" : ""); } catch (e) {}
      if (open) scrollBottom();
    };
    fullBtn.addEventListener("click", () => applyFull(!panel.classList.contains("full")));
    if (localStorage.getItem("wda_chat_full") === "1") applyFull(true);
    searchEl.addEventListener("input", (e) => { searchQuery = e.target.value.toLowerCase(); if (open) renderList(); });
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
    const wireRoomBar = () => {
      const b = listEl.querySelector("#chat-to-community");
      if (b) b.addEventListener("click", () => setRoom("community", null));
    };
    const filtered = searchQuery
      ? roomCache.filter((m) => (m.text || "").toLowerCase().includes(searchQuery) || (m.name || "").toLowerCase().includes(searchQuery))
      : roomCache;
    if (!filtered.length) {
      listEl.innerHTML = roomBar + '<div class="chat-empty">' + (searchQuery ? "No messages match" : t("chat_empty")) + "</div>";
      wireRoomBar();
      return;
    }
    listEl.innerHTML = roomBar + filtered
      .map((msg, i) => {
        const mine = u && msg.userId === u.id;
        const ref = esc(msg._key || msg.id);
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
        const mentioned = !mine && mentionsMe(text);
        return (
          daySep +
          '<div class="chat-msg ' + (mine ? "mine" : "") + (msg.bot ? " bot" : "") + (isPinned ? " pinned" : "") + (mentioned ? " mentioned" : "") + '">' +
          (isPinned ? '<span class="chat-pin" title="Pinned">📌</span>' : "") +
          (mine ? "" : '<span class="chat-avatar">' + esc(msg.initial || "?") + "</span>") +
          '<div class="chat-bubble">' +
          (mine ? "" : '<div class="chat-name">' + esc(msg.name || "") + "</div>") +
          (msg.reply ? '<div class="chat-quote">↩ <b>' + esc(msg.reply.name || "") + "</b> " + esc(String(msg.reply.text || "").slice(0, 80)) + "</div>" : "") +
          (msg.img ? '<img class="chat-img" loading="lazy" src="' + esc(msg.img) + '" alt="photo">' : "") +
          (text ? '<div class="chat-text">' + formatText(text) + (msg.editedText ? ' <span class="chat-edited">(edited)</span>' : "") + "</div>" : "") +
          (reactionHtml ? '<div class="chat-reactions">' + reactionHtml + '</div>' : "") +
          '<div class="chat-meta"><span class="chat-time">' + fmtTime(msg.ts) + "</span>" +
          '<div class="chat-actions">' +
          '<button class="chat-replybtn" data-reply="' + ref + '" title="' + esc(t("chat_reply")) + '">↩</button>' +
          '<button class="chat-react" data-react="' + ref + '" title="React">😊</button>' +
          (mine ? '<button class="chat-edit" data-edit="' + ref + '" title="Edit">✏️</button>' : "") +
          (mine || (u && u.admin) ? '<button class="chat-pin" data-pin="' + ref + '" title="' + (isPinned ? "Unpin" : "Pin") + '">' + (isPinned ? "📌" : "📌") + '</button>' : "") +
          (mine || (u && u.admin) ? '<button class="chat-del" data-del="' + ref + '" title="' + esc(t("chat_delete")) + '">🗑</button>' : "") +
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
      b.addEventListener("click", () => showReactionPicker(b.getAttribute("data-react")))
    );
    listEl.querySelectorAll("[data-pin]").forEach((b) =>
      b.addEventListener("click", () => togglePin(b.getAttribute("data-pin")))
    );
    listEl.querySelectorAll("[data-reply]").forEach((b) =>
      b.addEventListener("click", () => {
        const msg = roomCache.find((m) => (m._key || m.id) === b.getAttribute("data-reply"));
        if (!msg) return;
        replyTo = { name: msg.name || "?", text: ((msg.editedText || msg.text) || (msg.img ? "📷 photo" : "")).slice(0, 80) };
        updateReplyBar();
        const inp = footEl && footEl.querySelector("#chat-form textarea");
        if (inp) inp.focus();
      })
    );
    listEl.querySelectorAll(".chat-img").forEach((im) =>
      im.addEventListener("click", () => showImageFull(im.src))
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
  function scrollBottom() { if (listEl) listEl.scrollTop = listEl.scrollHeight; }

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
      '<form class="chat-form" id="chat-form">' +
      '<label class="chat-photo" title="' + esc(t("chat_photo")) + '">📷<input type="file" accept="image/*" hidden></label>' +
      '<textarea rows="1" maxlength="500" placeholder="' + esc(t("chat_placeholder") + (window.AI && window.AI.ready() ? " · @ai 🤖" : "")) + '"></textarea>' +
      '<button class="chat-send" type="submit" aria-label="Send">➤</button></form>';
    const form = footEl.querySelector("#chat-form");
    const inp = form.querySelector("textarea");
    const file = form.querySelector('input[type="file"]');
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
    updateReplyBar();
  }

  /* ---------------- actions ---------------- */
  function send(text, img) {
    text = (text || "").trim();
    if (!text && !img) return;
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
    if (replyTo) { msg.reply = { name: replyTo.name, text: replyTo.text }; replyTo = null; updateReplyBar(); }
    Promise.resolve(backend.add(room, msg)).catch(() => showStatus("⚠ " + t("chat_send_err")));
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
          "Put code inside ```code fences```. If the question is not about learning or coding, reply kindly in one short sentence.",
        maxTokens: 2048,
      }
    ).then((reply) => {
      const bot = {
        id: "m_" + Date.now().toString(36) + "ai",
        userId: "wda-ai-bot",
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

  function showReactionPicker(ref) {
    const emojis = ['👍', '❤️', '😂', '🎉', '🔥', '👏', '🤔', '😢'];
    const menu = document.createElement("div");
    menu.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;z-index:9999";
    menu.innerHTML = `<div style="background:var(--surface);padding:12px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.2)">
      ${emojis.map(e => `<button style="background:none;border:none;font-size:24px;cursor:pointer;padding:4px" data-emoji="${e}">${e}</button>`).join("")}
    </div>`;
    emojis.forEach((emoji) => {
      menu.querySelector(`[data-emoji="${emoji}"]`).addEventListener("click", () => {
        addReaction(ref, emoji);
        menu.remove();
      });
    });
    menu.addEventListener("click", (e) => { if (e.target === menu) menu.remove(); });
    document.body.appendChild(menu);
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
    Promise.resolve(backend.update(room, msg)).catch(() => showStatus("⚠ " + t("chat_send_err")));
  }

  function togglePin(ref) {
    const u = me();
    if (!u) return;
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg) return;
    if (msg.userId !== u.id && !u.admin) return;
    msg.pinned = !msg.pinned;
    Promise.resolve(backend.update(room, msg)).catch(() => showStatus("⚠ " + t("chat_send_err")));
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
      const more = typingUsers.size > 2 ? ` +${typingUsers.size - 2}` : "";
      typingEl.textContent = `${names}${more} is typing...`;
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
    unsub = backend.subscribe(room, (msgs) => {
      const delta = msgs.length - roomCache.length;
      roomCache = msgs;
      if (!primed) { primed = true; if (open) { renderList(); scrollBottom(); } return; }
      if (open) { renderList(); scrollBottom(); }
      else if (delta > 0) { unread += delta; renderBadge(); beep(); flashTitle(); }
    });
  }

  function setRoom(id, label) {
    id = id || "community";
    if (id === room) { if (label !== roomLabel) { roomLabel = label; setTitle(); } return; }
    room = id; roomLabel = label || null; unread = 0; renderBadge(); setTitle();
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
