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

  /* ============ Firebase config (optional) ============
     Leave null to use the local backend. Paste your Firebase web config
     object to enable real cross-device chat. See README for steps. */
  const FIREBASE_CONFIG = null;
  /* ==================================================== */

  /* Moderation: add lowercase words to auto-mask (e.g. ["darn"]). */
  const BADWORDS = [];

  const lang = () => (localStorage.getItem("wda_lang") === "my" ? "my" : "en");
  const t = (k) => (I18N.ui[lang()] && I18N.ui[lang()][k]) || I18N.ui.en[k] || k;
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- state ---------------- */
  let open = false, unread = 0;
  let room = "community", roomLabel = null;
  let roomCache = [], primed = false, unsub = null;
  let sendTimes = [], typingUsers = new Set(), searchQuery = "";
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
  const localSave = (r, msgs) => localStorage.setItem(roomKey(r), JSON.stringify(msgs.slice(-MAX)));

  const localBackend = {
    _handlers: {},
    subscribe(r, cb) { this._handlers[r] = cb; cb(localLoad(r)); return () => { if (this._handlers[r] === cb) delete this._handlers[r]; }; },
    _emit(r) { const cb = this._handlers[r]; if (cb) cb(localLoad(r)); },
    add(r, msg) { const m = localLoad(r); m.push(msg); localSave(r, m); this._emit(r); broadcast(r); },
    del(r, ref) { const m = localLoad(r).filter((x) => x.id !== ref); localSave(r, m); this._emit(r); broadcast(r); },
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
          ref: dbMod.ref, push: dbMod.push, remove: dbMod.remove,
          onValue: dbMod.onValue, query: dbMod.query, limitToLast: dbMod.limitToLast,
        };
      })();
    }
    return fbInit;
  }
  const firebaseBackend = {
    subscribe(r, cb) {
      let off = () => {};
      ensureFb().then(() => {
        const q = fb.query(fb.ref(fb.db, "rooms/" + r + "/messages"), fb.limitToLast(MAX));
        off = fb.onValue(q, (snap) => {
          const val = snap.val() || {};
          const msgs = Object.keys(val)
            .map((k) => Object.assign({ _key: k }, val[k]))
            .sort((a, b) => a.ts - b.ts);
          cb(msgs);
        });
      });
      return () => { try { off(); } catch (e) {} };
    },
    add(r, msg) { ensureFb().then(() => fb.push(fb.ref(fb.db, "rooms/" + r + "/messages"), msg)); },
    del(r, ref) { ensureFb().then(() => fb.remove(fb.ref(fb.db, "rooms/" + r + "/messages/" + ref))); },
  };

  const backend = FIREBASE_CONFIG ? firebaseBackend : localBackend;

  /* ---------------- DOM ---------------- */
  function build() {
    const wrap = document.createElement("div");
    wrap.id = "chat-widget";
    wrap.innerHTML =
      '<button id="chat-fab" class="chat-fab" type="button" aria-label="Chat">💬' +
      '<span class="chat-badge" hidden>0</span></button>' +
      '<div id="chat-panel" class="chat-panel" hidden>' +
      '  <div class="chat-head"><span class="chat-title"></span>' +
      '    <span id="chat-presence" class="chat-presence"></span>' +
      '    <input id="chat-search" type="text" class="chat-search" placeholder="🔍 Search..." style="display:none">' +
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
    searchEl.addEventListener("input", (e) => { searchQuery = e.target.value.toLowerCase(); if (open) renderList(); });
    setTitle();
  }

  function setTitle() {
    const el = panel && panel.querySelector(".chat-title");
    if (el) el.textContent = roomLabel || t("chat_title");
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
      const inp = footEl.querySelector("input.chat-form input");
      if (inp) inp.focus();
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
    const filtered = searchQuery
      ? roomCache.filter((m) => (m.text || "").toLowerCase().includes(searchQuery) || (m.name || "").toLowerCase().includes(searchQuery))
      : roomCache;
    if (!filtered.length) { listEl.innerHTML = '<div class="chat-empty">' + (searchQuery ? "No messages match" : t("chat_empty")) + "</div>"; return; }
    listEl.innerHTML = filtered
      .map((msg) => {
        const mine = u && msg.userId === u.id;
        const ref = esc(msg._key || msg.id);
        const isPinned = msg.pinned;
        const text = (msg.editedText || msg.text || "");
        const reactions = msg.reactions || {};
        const reactionHtml = Object.entries(reactions).map(([emoji, users]) =>
          `<span class="chat-reaction" title="${users.join(', ')}">${emoji} ${users.length}</span>`
        ).join("");
        return (
          '<div class="chat-msg ' + (mine ? "mine" : "") + (isPinned ? " pinned" : "") + '">' +
          (isPinned ? '<span class="chat-pin" title="Pinned">📌</span>' : "") +
          (mine ? "" : '<span class="chat-avatar">' + esc(msg.initial || "?") + "</span>") +
          '<div class="chat-bubble">' +
          (mine ? "" : '<div class="chat-name">' + esc(msg.name || "") + "</div>") +
          '<div class="chat-text">' + esc(text) + (msg.editedText ? ' <span class="chat-edited">(edited)</span>' : "") + "</div>" +
          (reactionHtml ? '<div class="chat-reactions">' + reactionHtml + '</div>' : "") +
          '<div class="chat-meta"><span class="chat-time">' + fmtTime(msg.ts) + "</span>" +
          '<div class="chat-actions">' +
          '<button class="chat-react" data-react="' + ref + '" title="React">😊</button>' +
          (mine ? '<button class="chat-edit" data-edit="' + ref + '" title="Edit">✏️</button>' : "") +
          (mine || (u && u.admin) ? '<button class="chat-pin" data-pin="' + ref + '" title="' + (isPinned ? "Unpin" : "Pin") + '">' + (isPinned ? "📌" : "📌") + '</button>' : "") +
          (mine ? '<button class="chat-del" data-del="' + ref + '" title="' + esc(t("chat_delete")) + '">🗑</button>' : "") +
          "</div></div></div>"
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
  }
  function scrollBottom() { if (listEl) listEl.scrollTop = listEl.scrollHeight; }

  function renderFoot() {
    if (!footEl) return;
    const u = me();
    if (!u) {
      footEl.innerHTML = '<button class="btn btn-primary btn-block" id="chat-login" type="button">' + t("chat_login") + "</button>";
      footEl.querySelector("#chat-login").addEventListener("click", () => { if (window.Auth) window.Auth.openModal("login"); });
      return;
    }
    footEl.innerHTML =
      '<form class="chat-form" id="chat-form">' +
      '<input type="text" maxlength="500" placeholder="' + esc(t("chat_placeholder")) + '" autocomplete="off">' +
      '<button class="chat-send" type="submit" aria-label="Send">➤</button></form>';
    const form = footEl.querySelector("#chat-form");
    const inp = form.querySelector("input");
    inp.addEventListener("input", () => { broadcastTyping(); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      send(inp.value);
      inp.value = "";
      inp.focus();
    });
  }

  /* ---------------- actions ---------------- */
  function send(text) {
    text = (text || "").trim();
    if (!text) return;
    const u = me();
    if (!u) return;
    if (!rateOk()) return;
    text = moderate(text.slice(0, 500));
    const label = (u.name || u.email || "?").trim();
    backend.add(room, {
      id: "m_" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
      userId: u.id,
      name: label.split(" ")[0],
      initial: label.charAt(0).toUpperCase(),
      text: text,
      ts: Date.now(),
    });
  }

  function del(ref) {
    const u = me();
    if (!u) return;
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg || msg.userId !== u.id) return; // only your own
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
    backend.add(room, msg);
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
    if (!msg.reactions[emoji].includes(u.id)) {
      msg.reactions[emoji].push(u.id);
    } else {
      msg.reactions[emoji] = msg.reactions[emoji].filter(id => id !== u.id);
      if (msg.reactions[emoji].length === 0) delete msg.reactions[emoji];
    }
    backend.add(room, msg);
  }

  function togglePin(ref) {
    const u = me();
    if (!u) return;
    const msg = roomCache.find((m) => (m._key || m.id) === ref);
    if (!msg) return;
    if (msg.userId !== u.id && !u.admin) return;
    msg.pinned = !msg.pinned;
    backend.add(room, msg);
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
      else if (delta > 0) { unread += delta; renderBadge(); }
    });
  }

  function setRoom(id, label) {
    id = id || "community";
    if (id === room) { if (label !== roomLabel) { roomLabel = label; setTitle(); } return; }
    room = id; roomLabel = label || null; unread = 0; renderBadge(); setTitle();
    markPresence(room);
    subscribeRoom();
    if (open) { renderList(); renderPresence(); }
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
