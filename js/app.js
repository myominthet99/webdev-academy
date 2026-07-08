/* =====================================================================
   WebDev Academy — SPA router, views, progress tracking, i18n (EN + MY)
   ===================================================================== */
(function () {
  "use strict";

  const { CATEGORIES } = window.APP_DATA;
  const BUILTIN_COURSES = window.APP_DATA.COURSES;
  const I18N = window.I18N;
  const app = document.getElementById("app");
  const LANG_KEY = "wda_lang";
  const THEME_KEY = "wda_theme";
  const CUSTOM_KEY = "wda_custom_courses";
  const REVIEW_PREFIX = "wda_reviews";

  /* Community group links shown in the footer — paste your invite URLs
     here (leave "" to hide a platform). */
  const COMMUNITY_LINKS = {
    telegram: "",   // e.g. "https://t.me/yourgroup"
    discord: "",    // e.g. "https://discord.gg/yourinvite"
    facebook: "",   // e.g. "https://facebook.com/groups/yourgroup"
  };

  /* Premium membership — students scan your KBZPay QR, you approve in
     Admin. Save your QR image (KBZPay app → My QR) as kbzpay-qr.png in
     the project root, and set the price below. */
  const PAYMENT_CONFIG = {
    method: "KBZPay",
    qrImage: "kbzpay-qr.jpg",   // QR image file in the project folder ("" to hide)
    accountName: "Myo Min Thet (******0610)",
    phone: "",                  // optional fallback if no QR image
    price: 50000,               // current (promotion) price in Kyat
    listPrice: 100000,          // regular price shown crossed out ("" or 0 to hide)
  };

  /* ---------------- Courses (built-in + admin-created) ---------------- */
  const COURSES = []; // mutated in place so all closures see updates
  function loadCustomCourses() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || []; } catch (e) { return []; }
  }
  function saveCustomCourses(list) { localStorage.setItem(CUSTOM_KEY, JSON.stringify(list)); }
  function syncCourses() {
    COURSES.length = 0;
    /* built-in courses get generated cover art (tools/gen-covers.js) */
    BUILTIN_COURSES.forEach((c) => COURSES.push(c.image ? c : Object.assign({}, c, { image: "covers/" + c.id + ".svg" })));
    loadCustomCourses().forEach((c) => COURSES.push(Object.assign({ custom: true }, c)));
  }
  syncCourses();

  /* ---------------- Language ---------------- */
  let lang = localStorage.getItem(LANG_KEY) === "my" ? "my" : "en";

  const t = (key) =>
    (I18N.ui[lang] && I18N.ui[lang][key]) || I18N.ui.en[key] || key;

  const catName = (cat) => (lang === "my" && I18N.cat.my[cat]) || cat;
  const levelName = (lvl) => (lang === "my" && I18N.level.my[lvl]) || lvl;
  /* A course is free (guest-accessible) unless explicitly marked free: false */
  const isFree = (c) => c.free !== false;
  const priceText = (c) => (isFree(c) ? t("price_free") : t("price_premium"));
  const priceTag = (c) => (isFree(c) ? t("price_free") : "🔒 " + t("price_premium"));

  /* Course field with Myanmar override + English fallback */
  function cf(course, field) {
    if (lang === "my") {
      const ov = I18N.content.courses[course.id];
      if (ov && ov[field] != null) return ov[field];
    }
    return course[field];
  }
  function secName(course, idx) {
    if (lang === "my") {
      const arr = I18N.content.sections[course.id];
      if (arr && arr[idx] != null) return arr[idx];
    }
    return course.sections[idx].title;
  }
  function lf(lesson, field) {
    if (lang === "my") {
      const ov = I18N.content.lessons[lesson.id];
      if (ov && ov[field] != null) return ov[field];
    }
    return lesson[field];
  }
  /* Quiz questions with Myanmar text but English answer index */
  function getQuestions(lesson) {
    const en = lesson.questions;
    if (lang === "my") {
      const ov = I18N.content.lessons[lesson.id];
      if (ov && ov.questions) {
        return en.map((q, i) => ({
          q: (ov.questions[i] && ov.questions[i].q) || q.q,
          options: (ov.questions[i] && ov.questions[i].options) || q.options,
          answer: q.answer,
        }));
      }
    }
    return en;
  }

  /* ---------------- State (persisted in localStorage) ---------------- */
  const STORE_PREFIX = "wda_state_v1";
  /* Progress is namespaced per signed-in account (or "guest" when logged out). */
  function storeKey() {
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    return STORE_PREFIX + "::" + (u ? u.id : "guest");
  }
  /* One-time migration: move pre-accounts progress into the guest bucket */
  (function migrateLegacy() {
    const legacy = localStorage.getItem(STORE_PREFIX);
    if (legacy && !localStorage.getItem(STORE_PREFIX + "::guest")) {
      localStorage.setItem(STORE_PREFIX + "::guest", legacy);
    }
  })();
  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(storeKey())) || { enrolled: [], completed: {} };
    } catch (e) {
      return { enrolled: [], completed: {} };
    }
  }
  function saveState() {
    localStorage.setItem(storeKey(), JSON.stringify(state));
    updateStreak();
  }
  let state = loadState();

  /* ---------------- Per-user extras (notes, bookmarks, resume, quiz scores, streak) ---------------- */
  const uid = () => { const u = window.Auth && window.Auth.current ? window.Auth.current() : null; return u ? u.id : "guest"; };
  const ns = (prefix) => prefix + "::" + uid();
  const jget = (key, def) => { try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? def : v; } catch (e) { return def; } };
  const jset = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  const loadNotes = () => jget(ns("wda_notes"), {});
  const saveNote = (lessonId, text) => { const n = loadNotes(); if (text) n[lessonId] = text; else delete n[lessonId]; jset(ns("wda_notes"), n); };
  const loadComments = (lessonId) => {
    try {
      const c = jget(ns("wda_comments::" + lessonId), []);
      return Array.isArray(c) ? c : [];
    } catch (e) {
      return [];
    }
  };
  const saveComment = (lessonId, author, text) => {
    if (!author || !text) return; // Validate input
    try {
      const c = loadComments(lessonId);
      const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
      c.push({ id, author: author.trim(), text: text.trim(), ts: Date.now() });
      jset(ns("wda_comments::" + lessonId), c);
    } catch (e) {
      console.error("Failed to save comment:", e);
    }
  };
  const deleteComment = (lessonId, commentId) => {
    try {
      const c = loadComments(lessonId);
      const idx = c.findIndex((x) => String(x.id) === String(commentId));
      if (idx >= 0) {
        c.splice(idx, 1);
        jset(ns("wda_comments::" + lessonId), c);
      }
    } catch (e) {
      console.error("Failed to delete comment:", e);
    }
  };
  const loadBookmarks = () => jget(ns("wda_bookmarks"), []);
  const isBookmarked = (id) => loadBookmarks().indexOf(id) >= 0;
  const toggleBookmark = (id) => { const b = loadBookmarks(); const i = b.indexOf(id); if (i >= 0) b.splice(i, 1); else b.push(id); jset(ns("wda_bookmarks"), b); };
  const setLast = (courseId, lessonId) => jset(ns("wda_last"), { courseId, lessonId, ts: Date.now() });
  const getLast = () => jget(ns("wda_last"), null);
  const loadQuizScores = () => jget(ns("wda_quiz"), {});
  const saveQuizScore = (id, score, total) => { const q = loadQuizScores(); const p = q[id]; if (!p || score > p.score) q[id] = { score, total, ts: Date.now() }; jset(ns("wda_quiz"), q); };

  /* Day-streak: bumped when a lesson is completed */
  function bumpDayStreak() {
    const key = ns("wda_streak");
    const s = jget(key, { last: "", count: 0 });
    let today;
    try { today = new Date().toISOString().slice(0, 10); } catch (e) { return; }
    if (s.last === today) return;
    const y = new Date(Date.now() - 86400000);
    let yStr; try { yStr = y.toISOString().slice(0, 10); } catch (e) { yStr = ""; }
    s.count = s.last === yStr ? (s.count || 0) + 1 : 1;
    s.last = today;
    jset(key, s);
  }
  const dayStreak = () => jget(ns("wda_streak"), { count: 0 }).count || 0;

  /* Time tracking: track when lesson is opened and calculate total spent per course */
  const loadTimeSpent = () => jget(ns("wda_time_spent"), {});
  const loadLessonTime = (lessonId) => jget(ns("wda_lesson_time::" + lessonId), { opened: null, total: 0 });
  const startLessonTimer = (lessonId) => {
    const t = loadLessonTime(lessonId);
    /* Only set opened if not already tracking (prevent reset on re-render) */
    if (!t.opened) {
      t.opened = Date.now();
      jset(ns("wda_lesson_time::" + lessonId), t);
    }
  };
  const endLessonTimer = (lessonId) => {
    const t = loadLessonTime(lessonId);
    if (t.opened) {
      const elapsed = Math.floor((Date.now() - t.opened) / 1000);
      const capped = Math.min(elapsed, 43200); /* 12 hour max per session */
      if (elapsed > 43200) console.warn(`Session time for ${lessonId} capped at 12 hours`);
      t.total += capped;
      t.opened = null;
    }
    jset(ns("wda_lesson_time::" + lessonId), t);
  };
  const getTotalTimeSpent = (courseId) => {
    try {
      let total = 0;
      const c = courseById(courseId);
      if (!c) return 0;
      const lessons = lessonsOf(c);
      if (!Array.isArray(lessons)) return 0;
      lessons.forEach((x) => {
        if (x && x.lesson && x.lesson.id) {
          const t = loadLessonTime(x.lesson.id);
          total += Number(t.total) || 0;
        }
      });
      return Math.max(0, total);
    } catch (e) {
      console.error("Error calculating time spent:", e);
      return 0;
    }
  };
  const formatTime = (seconds) => {
    const s = Number(seconds) || 0;
    if (!isFinite(s)) return "0s";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m`;
    return `${Math.max(0, Math.floor(s))}s`;
  };

  /* Progress transcript export */
  function exportTranscript() {
    const u = loggedIn() ? window.Auth.current() : null;
    const userName = u ? (u.name || u.email) : "Guest";
    let text = `WebDev Academy — Learning Transcript\n`;
    text += `═══════════════════════════════════════\n`;
    text += `Student: ${userName}\n`;
    text += `Exported: ${new Date().toLocaleString()}\n\n`;

    let totalCompleted = 0, totalTime = 0;
    COURSES.filter((c) => isEnrolled(c.id)).forEach((c) => {
      const pct = progressPct(c);
      const completed = completedCount(c);
      const total = totalLessons(c);
      const time = getTotalTimeSpent(c.id);
      totalCompleted += completed;
      totalTime += time;

      text += `${cf(c, "title")}\n`;
      text += `─────────────────────────────────────────\n`;
      text += `Progress: ${completed}/${total} lessons (${pct}%)\n`;
      text += `Time Spent: ${formatTime(time)}\n`;
      text += `Status: ${pct === 100 ? "✓ Completed" : pct > 0 ? "In Progress" : "Not started"}\n\n`;
    });

    text += `\nSummary\n`;
    text += `═══════════════════════════════════════\n`;
    text += `Total Lessons Completed: ${totalCompleted}\n`;
    text += `Total Time Spent: ${formatTime(totalTime)}\n`;
    text += `Courses Enrolled: ${COURSES.filter((c) => isEnrolled(c.id)).length}\n`;
    text += `Courses Completed: ${COURSES.filter((c) => progressPct(c) === 100 && isEnrolled(c.id)).length}\n`;
    text += `Learning Streak: ${dayStreak()} days\n`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "webdev-academy-transcript.txt";
    a.click(); URL.revokeObjectURL(url);
  }

  /* ---------------- Backup / restore (import & export) ---------------- */
  const EXPORT_SKIP = (k) => k === "wda_users" || k === "wda_session" || k.indexOf("wda_chat") === 0;
  function exportData() {
    const out = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || k.indexOf("wda_") !== 0 || EXPORT_SKIP(k)) continue;
      out[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify({ app: "WebDevAcademy", version: 1, data: out }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "webdev-academy-backup.json";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  function importData(file, done) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        const data = obj && obj.data ? obj.data : obj;
        Object.keys(data).forEach((k) => { if (k.indexOf("wda_") === 0 && !EXPORT_SKIP(k)) localStorage.setItem(k, data[k]); });
        done(true);
      } catch (e) { done(false); }
    };
    r.readAsText(file);
  }

  /* Catalog filter (not persisted) */
  const filter = { category: "All", query: "", level: "All", price: "All", sort: "popular" };

  /* Auth gating: run action now if logged in, else open login and resume after */
  let pendingAction = null;
  function loggedIn() {
    return !!(window.Auth && window.Auth.current && window.Auth.current());
  }
  function requireAuth(action) {
    if (loggedIn()) action();
    else if (window.Auth) { pendingAction = action; window.Auth.openModal("login"); }
    else action();
  }

  /* ---------------- Data helpers ---------------- */
  const courseById = (id) => COURSES.find((c) => c.id === id);

  function lessonsOf(course) {
    const list = [];
    course.sections.forEach((sec, si) =>
      sec.lessons.forEach((l) => list.push({ section: sec.title, sectionIdx: si, lesson: l }))
    );
    return list;
  }
  const totalLessons = (course) => lessonsOf(course).length;

  const completedSet = (courseId) => new Set(state.completed[courseId] || []);
  function completedCount(course) {
    const done = completedSet(course.id);
    return lessonsOf(course).filter((x) => done.has(x.lesson.id)).length;
  }
  function progressPct(course) {
    const total = totalLessons(course);
    return total ? Math.round((completedCount(course) / total) * 100) : 0;
  }
  const isEnrolled = (id) => state.enrolled.includes(id);

  function markComplete(courseId, lessonId, done) {
    const set = new Set(state.completed[courseId] || []);
    if (done) set.add(lessonId);
    else set.delete(lessonId);
    state.completed[courseId] = [...set];
    if (done) bumpDayStreak();
    saveState();
    if (typeof pushLeaderboard === "function") pushLeaderboard();
  }
  function enroll(courseId) {
    if (!isEnrolled(courseId)) {
      state.enrolled.push(courseId);
      saveState();
    }
  }

  /* ---------------- Formatting ---------------- */
  const fmt = (n) => n.toLocaleString("en-US");
  function stars(rating) {
    const full = Math.round(rating);
    let s = "";
    for (let i = 0; i < 5; i++) s += i < full ? "★" : "☆";
    return `<span class="stars">${s}</span>`;
  }
  const lessonIcon = (type) =>
    type === "quiz" ? "❓" : type === "article" ? "📄" : "▶";

  /* Build a real player from a lesson's video src (file / YouTube / Vimeo). */
  /* ---------------- Local video store (IndexedDB) ----------------
     Lets admins upload video files from their computer. Files are stored
     as Blobs in IndexedDB (localStorage is far too small for video) and
     referenced from lessons with an "idb:<key>" src. */
  const VideoStore = {
    _db: null,
    open() {
      if (this._db) return Promise.resolve(this._db);
      return new Promise((res, rej) => {
        const req = indexedDB.open("wda_videos", 1);
        req.onupgradeneeded = () => req.result.createObjectStore("videos");
        req.onsuccess = () => { this._db = req.result; res(this._db); };
        req.onerror = () => rej(req.error);
      });
    },
    put(key, blob) {
      return this.open().then((db) => new Promise((res, rej) => {
        const tx = db.transaction("videos", "readwrite");
        tx.objectStore("videos").put(blob, key);
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      }));
    },
    get(key) {
      return this.open().then((db) => new Promise((res, rej) => {
        const tx = db.transaction("videos", "readonly");
        const rq = tx.objectStore("videos").get(key);
        rq.onsuccess = () => res(rq.result || null);
        rq.onerror = () => rej(rq.error);
      }));
    },
  };
  function hydrateIdbVideos() {
    app.querySelectorAll("video[data-idb-src]").forEach((v) => {
      const key = v.getAttribute("data-idb-src");
      VideoStore.get(key)
        .then((blob) => { if (blob) v.src = URL.createObjectURL(blob); })
        .catch(() => {});
    });
  }

  /* Copy + W3Schools-style "Try it yourself" buttons on every code block */
  function codeTextOf(pre) {
    const code = pre.querySelector("code");
    if (code) return code.innerText;
    const clone = pre.cloneNode(true);
    clone.querySelectorAll(".copy-btn, .try-btn").forEach((b) => b.remove());
    return clone.innerText;
  }
  function addCopyButtons() {
    app.querySelectorAll(".reader pre").forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.textContent = "📋 " + t("copy_code");
      btn.addEventListener("click", () => {
        const text = codeTextOf(pre);
        const done = () => { btn.textContent = "✓ " + t("copied"); setTimeout(() => { btn.textContent = "📋 " + t("copy_code"); }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
        } else fallbackCopy(text, done);
      });
      pre.appendChild(btn);

      /* W3Schools-style green button below every example */
      const tryBtn = document.createElement("button");
      tryBtn.className = "try-yourself-btn";
      tryBtn.type = "button";
      tryBtn.textContent = t("try_yourself") + " »";
      tryBtn.addEventListener("click", () => openPlayground(codeTextOf(pre)));
      pre.insertAdjacentElement("afterend", tryBtn);
    });
  }

  /* Live playground: edit on the left, live result on the right, real
     console output below — code runs inside a sandboxed iframe via srcdoc.
     Console shim posts log/warn/error (and runtime errors) back to us. */
  const PG_SHIM =
    "<script>(function(){" +
    'function send(type,args){try{parent.postMessage({__pg:true,type:type,text:args.map(function(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}).join(" ")},"*")}catch(e){}}' +
    '["log","warn","error","info"].forEach(function(m){var o=console[m];console[m]=function(){send(m,[].slice.call(arguments));try{o.apply(console,arguments)}catch(e){}}});' +
    'window.onerror=function(msg,src,line){send("error",[msg+" (line "+line+")"]);};' +
    "})();</scr" + "ipt>";

  /* Ready-made starter examples students can load and tinker with */
  const PG_EXAMPLES = [
    { name: "📄 HTML page", code: "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>My Page</h1>\n<p>Hello, world!</p>\n<button>Click me</button>\n\n</body>\n</html>" },
    { name: "🎨 Styled card (CSS)", code: "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { font-family: sans-serif; background:#f4f1ea; }\n  .card { background:#fff; max-width:260px; margin:30px auto; padding:20px;\n          border-radius:14px; box-shadow:0 6px 20px rgba(0,0,0,.12); }\n  .card h2 { color:#654ea3; margin:0 0 6px; }\n</style>\n</head>\n<body>\n  <div class=\"card\">\n    <h2>Tea Shop</h2>\n    <p>The best laphet yay in town.</p>\n  </div>\n</body>\n</html>" },
    { name: "✨ Button animation", code: "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body{display:grid;place-items:center;height:100vh;margin:0;background:#1a1a2e}\n  button{padding:14px 28px;font-size:18px;border:none;border-radius:10px;color:#fff;\n         background:#654ea3;cursor:pointer;transition:transform .2s, box-shadow .2s}\n  button:hover{transform:translateY(-4px) scale(1.05);box-shadow:0 10px 24px rgba(101,78,163,.6)}\n</style>\n</head>\n<body>\n  <button>Hover me!</button>\n</body>\n</html>" },
    { name: "🔢 Click counter (JS)", code: "<!DOCTYPE html>\n<html>\n<body style=\"font-family:sans-serif;text-align:center;padding:40px\">\n\n<h1 id=\"count\">0</h1>\n<button id=\"btn\">+1</button>\n\n<script>\n  let n = 0;\n  const out = document.querySelector(\"#count\");\n  document.querySelector(\"#btn\").addEventListener(\"click\", function () {\n    n = n + 1;\n    out.textContent = n;\n  });\n<\/script>\n\n</body>\n</html>" },
    { name: "🌈 Color changer (JS)", code: "<!DOCTYPE html>\n<html>\n<body style=\"font-family:sans-serif;text-align:center;padding:40px\">\n\n<h2>Tap the button!</h2>\n<button id=\"btn\">Random color</button>\n\n<script>\n  document.querySelector(\"#btn\").addEventListener(\"click\", function () {\n    const c = \"#\" + Math.floor(Math.random()*16777215).toString(16);\n    document.body.style.background = c;\n    console.log(\"New color: \" + c);\n  });\n<\/script>\n\n</body>\n</html>" },
    { name: "📝 Form", code: "<!DOCTYPE html>\n<html>\n<body style=\"font-family:sans-serif;padding:30px\">\n\n<h2>Contact us</h2>\n<form id=\"f\">\n  <input name=\"name\" placeholder=\"Your name\" required>\n  <button>Send</button>\n</form>\n<p id=\"out\"></p>\n\n<script>\n  document.querySelector(\"#f\").addEventListener(\"submit\", function (e) {\n    e.preventDefault();\n    document.querySelector(\"#out\").textContent = \"Thank you, \" + e.target.name.value + \"!\";\n  });\n<\/script>\n\n</body>\n</html>" },
  ];
  /* URL-safe base64 of playground code for share links — only [A-Za-z0-9-_]
     so it never contains "/" (which the hash router splits on) */
  function pgEncode(code) {
    try { return btoa(unescape(encodeURIComponent(code))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
    catch (e) { return ""; }
  }
  function pgDecode(enc) {
    try {
      let b = String(enc).replace(/-/g, "+").replace(/_/g, "/");
      while (b.length % 4) b += "=";
      return decodeURIComponent(escape(atob(b)));
    } catch (e) { return null; }
  }

  function buildRunnableDoc(code) {
    if (/<html[\s>]/i.test(code)) {
      /* full document: inject the console shim right after <head> if possible */
      return code.replace(/<head([^>]*)>/i, "<head$1>" + PG_SHIM) || code;
    }
    const hasTag = /<\w+[^>]*>/.test(code);
    const looksCss = !hasTag && /[{}]/.test(code) && /[a-z-]+\s*:/i.test(code) &&
      !/\b(function|const|let|var|console|=>)\b/.test(code);
    let body;
    if (hasTag) {
      body = code;
    } else if (looksCss) {
      body = "<style>" + code + "</style>" +
        "<h3>Heading</h3><p>Paragraph text to style.</p><button>Button</button>" +
        '<div class="card">A div with class "card"</div>';
    } else {
      /* JavaScript: output appears in the console panel below the result */
      body = "<p style='color:#888;font-size:13px'>JavaScript ran — see the Console panel ⬇</p>" +
        "<script>" + code.replace(/<\/script/gi, "<\\/script") + "</scr" + "ipt>";
    }
    return "<!DOCTYPE html><html><head><meta charset=\"utf-8\">" + PG_SHIM +
      "<style>body{font-family:system-ui,sans-serif;padding:14px;line-height:1.5}</style>" +
      "</head><body>" + body + "</body></html>";
  }

  /* Snippet storage */
  const loadSnippets = () => jget("wda_pg_snippets", []);
  const saveSnippets = (s) => jset("wda_pg_snippets", s);

  let pgConsoleEl = null; /* the active playground's console panel */
  window.addEventListener("message", (e) => {
    if (!e.data || !e.data.__pg || !pgConsoleEl) return;
    const line = document.createElement("div");
    line.className = "pg-line " + (e.data.type || "log");
    line.textContent = (e.data.type === "error" ? "✖ " : e.data.type === "warn" ? "⚠ " : "» ") + e.data.text;
    pgConsoleEl.appendChild(line);
    pgConsoleEl.scrollTop = pgConsoleEl.scrollHeight;
  });

  /* Builds the full playground UI inside `mount`. Used by both the modal
     (lesson examples) and the standalone #/playground page. */
  function buildPlayground(mount, initialCode) {
    mount.innerHTML = `
      <div class="pg-head">
        <div class="pg-tools">
          <button class="btn btn-primary btn-sm" data-pg-run>▶ ${t("pg_run")}</button>
          <button class="btn btn-outline btn-sm" data-pg-check>✔ ${t("pg_check")}</button>
          <label class="pg-auto"><input type="checkbox" data-pg-auto checked> ${t("pg_auto")}</label>
          <select class="pg-snippets" data-pg-examples>
            <option value="">💡 ${t("pg_examples")}</option>
            ${PG_EXAMPLES.map((x, i) => `<option value="${i}">${escapeHtml(x.name)}</option>`).join("")}
          </select>
          <select class="pg-snippets" data-pg-snippets></select>
          <button class="btn btn-outline btn-sm" data-pg-save>💾 ${t("pg_save")}</button>
          <button class="btn btn-outline btn-sm" data-pg-del title="${escapeHtml(t("pg_del_snippet"))}">🗑</button>
          <button class="btn btn-outline btn-sm" data-pg-clear title="${escapeHtml(t("pg_clear"))}">🧹</button>
          <button class="btn btn-outline btn-sm" data-pg-share title="${escapeHtml(t("pg_share"))}">🔗</button>
          <button class="btn btn-outline btn-sm" data-pg-dl>⬇ ${t("pg_download")}</button>
          <span class="pg-seg">
            <button type="button" data-pg-font="-" title="${escapeHtml(t("pg_smaller"))}">A−</button>
            <button type="button" data-pg-font="+" title="${escapeHtml(t("pg_bigger"))}">A+</button>
          </span>
          <span class="pg-seg pg-viewctl">
            <button type="button" data-pg-view="code" title="${escapeHtml(t("pg_view_code"))}">&lt;/&gt;</button>
            <button type="button" data-pg-view="split" class="on" title="${escapeHtml(t("pg_view_split"))}">⇔</button>
            <button type="button" data-pg-view="preview" title="${escapeHtml(t("pg_view_preview"))}">👁</button>
          </span>
        </div>
        <span data-pg-extra></span>
      </div>
      <div class="pg-body">
        <textarea class="pg-code" spellcheck="false"></textarea>
        <iframe class="pg-result" sandbox="allow-scripts" title="Result"></iframe>
      </div>
      <div class="pg-check-panel" data-pg-check-panel hidden></div>
      <div class="pg-console-wrap">
        <div class="pg-console-head">${t("pg_console")}</div>
        <div class="pg-console" data-pg-console></div>
      </div>`;

    const ta = mount.querySelector(".pg-code");
    const frame = mount.querySelector(".pg-result");
    const auto = mount.querySelector("[data-pg-auto]");
    const consoleEl = mount.querySelector("[data-pg-console]");
    const sel = mount.querySelector("[data-pg-snippets]");
    const body = mount.querySelector(".pg-body");
    ta.value = initialCode || "";
    pgConsoleEl = consoleEl;

    /* editor font size (persisted) */
    let fontPx = Math.min(22, Math.max(11, Number(localStorage.getItem("wda_pg_font")) || 14));
    const applyFont = () => { ta.style.fontSize = fontPx + "px"; };
    applyFont();
    mount.querySelectorAll("[data-pg-font]").forEach((b) =>
      b.addEventListener("click", () => {
        fontPx = Math.min(22, Math.max(11, fontPx + (b.getAttribute("data-pg-font") === "+" ? 2 : -2)));
        localStorage.setItem("wda_pg_font", fontPx);
        applyFont();
      })
    );

    /* view toggle: code / split / preview (great on phones) */
    mount.querySelectorAll("[data-pg-view]").forEach((b) =>
      b.addEventListener("click", () => {
        const v = b.getAttribute("data-pg-view");
        body.classList.remove("view-code", "view-preview");
        if (v === "code") body.classList.add("view-code");
        else if (v === "preview") body.classList.add("view-preview");
        mount.querySelectorAll("[data-pg-view]").forEach((x) => x.classList.toggle("on", x === b));
      })
    );

    /* load a ready-made example */
    const examplesSel = mount.querySelector("[data-pg-examples]");
    if (examplesSel) examplesSel.addEventListener("change", () => {
      const ex = PG_EXAMPLES[Number(examplesSel.value)];
      if (ex) { ta.value = ex.code; run(); ta.focus(); }
      examplesSel.value = "";
    });

    /* clear the editor */
    mount.querySelector("[data-pg-clear]").addEventListener("click", () => {
      if (!ta.value.trim() || confirm(t("pg_clear_confirm"))) { ta.value = ""; run(); ta.focus(); }
    });

    /* share: copy a link that reopens the playground with this code */
    mount.querySelector("[data-pg-share]").addEventListener("click", (e) => {
      const enc = pgEncode(ta.value);
      if (!enc) return;
      const link = location.origin + location.pathname + "#/playground/" + enc;
      const btn = e.currentTarget;
      const done = () => { const o = btn.textContent; btn.textContent = "✓ " + t("copied"); setTimeout(() => { btn.textContent = o; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(link).then(done).catch(() => fallbackCopy(link, done));
      else fallbackCopy(link, done);
    });

    const run = () => {
      consoleEl.innerHTML = "";
      pgConsoleEl = consoleEl;
      frame.srcdoc = buildRunnableDoc(ta.value);
      try { localStorage.setItem("wda_pg_last", ta.value); } catch (e) {}
    };

    /* editor niceties: Tab inserts spaces, Ctrl+Enter runs, auto-run debounce */
    let timer;
    ta.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); return; }
      if (e.key === "Tab") {
        e.preventDefault();
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + "  " + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 2;
      }
    });
    ta.addEventListener("input", () => {
      if (!auto.checked) return;
      clearTimeout(timer);
      timer = setTimeout(run, 600);
    });

    mount.querySelector("[data-pg-run]").addEventListener("click", run);

    /* ✔ AI code check — a friendly review of the student's code (premium) */
    const checkPanel = mount.querySelector("[data-pg-check-panel]");
    const checkBtn = mount.querySelector("[data-pg-check]");
    const showCheck = (html) => { checkPanel.hidden = false; checkPanel.innerHTML = html; };
    checkBtn.addEventListener("click", () => {
      if (!window.AI) { showCheck('<p class="muted">' + escapeHtml(t("ai_no_key")) + "</p>"); return; }
      if (window.WDA && window.WDA.isPremium && !window.WDA.isPremium()) {
        showCheck('<p class="muted">🔒 ' + escapeHtml(t("pg_check_premium")) + '</p><a class="btn btn-primary btn-sm" href="#/premium">⭐ ' + t("prem_go") + "</a>");
        return;
      }
      const code = ta.value.trim();
      if (!code) { showCheck('<p class="muted">' + escapeHtml(t("pg_check_empty")) + "</p>"); return; }
      const old = checkBtn.textContent;
      checkBtn.disabled = true;
      checkBtn.textContent = "✔ " + t("ai_working");
      showCheck('<p class="muted">⏳ ' + escapeHtml(t("pg_check_working")) + "</p>");
      window.AI.complete(
        "Review this beginner's web code (HTML/CSS/JavaScript). Code:\n```\n" + code.slice(0, 6000) + "\n```",
        {
          system:
            "You are a kind coding teacher at WebDev Academy for Myanmar teenagers learning web development. Review the student's code in simple English (or Burmese if they wrote comments in Burmese). Output plain HTML only (no markdown): start with one <p> of encouragement, then <h4>✅ What's good</h4> + a short <ul>, then <h4>🔧 How to improve</h4> + a short <ul> (each item: the problem and the fix, with <code> for code bits). If there is a bug, point to it kindly. Keep it under 250 words. Be positive.",
          maxTokens: 2000,
          temperature: 0.5,
        }
      ).then((html) => showCheck('<div class="reader">' + window.AI.stripFences(html) + "</div>"))
        .catch((err) => {
          const m = (err && err.message) || String(err);
          showCheck('<p class="muted">' + (m === "no-key" ? escapeHtml(t("ai_no_key")) : "⚠ AI: " + escapeHtml(m)) + "</p>");
        })
        .finally(() => { checkBtn.disabled = false; checkBtn.textContent = old; });
    });

    /* download as a standalone .html file */
    mount.querySelector("[data-pg-dl]").addEventListener("click", () => {
      const blob = new Blob([buildRunnableDoc(ta.value)], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "playground.html"; a.click();
      URL.revokeObjectURL(url);
    });

    /* snippets: save / load / delete via localStorage */
    function refreshSnippets(selected) {
      const items = loadSnippets();
      sel.innerHTML = `<option value="">📁 ${t("pg_snippets")} (${items.length})</option>` +
        items.map((x, i) => `<option value="${i}" ${selected === i ? "selected" : ""}>${escapeHtml(x.name)}</option>`).join("");
    }
    mount.querySelector("[data-pg-save]").addEventListener("click", () => {
      const name = prompt(t("pg_name_prompt"));
      if (!name || !name.trim()) return;
      const items = loadSnippets();
      items.push({ name: name.trim().slice(0, 40), code: ta.value, ts: Date.now() });
      saveSnippets(items);
      refreshSnippets(items.length - 1);
    });
    sel.addEventListener("change", () => {
      const items = loadSnippets();
      const it = items[Number(sel.value)];
      if (it) { ta.value = it.code; run(); }
    });
    mount.querySelector("[data-pg-del]").addEventListener("click", () => {
      const i = Number(sel.value);
      if (sel.value === "" || isNaN(i)) return;
      const items = loadSnippets();
      items.splice(i, 1);
      saveSnippets(items);
      refreshSnippets();
    });
    refreshSnippets();

    run();
    return { run, ta };
  }

  function openPlayground(code) {
    const existing = document.querySelector("[data-playground]");
    if (existing) existing.remove();
    const wrap = document.createElement("div");
    wrap.setAttribute("data-playground", "1");
    wrap.className = "playground-overlay";
    wrap.innerHTML = `<div class="playground"></div>`;
    document.body.appendChild(wrap);
    const inner = wrap.querySelector(".playground");
    buildPlayground(inner, code);
    const extra = inner.querySelector("[data-pg-extra]");
    extra.innerHTML = `<button class="btn btn-outline btn-sm" data-pg-close>✕</button>`;
    extra.querySelector("[data-pg-close]").addEventListener("click", () => wrap.remove());
    wrap.addEventListener("click", (e) => { if (e.target === wrap) wrap.remove(); });
  }

  /* Standalone playground page (#/playground[/<sharedCode>]) */
  function renderPlayground(shared) {
    const fromShare = shared ? pgDecode(shared) : null;
    const starter = fromShare || localStorage.getItem("wda_pg_last") ||
      "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n\n<script>\nconsole.log(\"Hello from the console!\");\n<\/script>\n\n</body>\n</html>";
    app.innerHTML = `
      <div class="container" style="max-width:1100px">
        <h2 class="section-title">🧪 ${t("pg_title")}</h2>
        <p class="section-sub">${t("pg_page_sub")}</p>
        <div class="playground pg-page" id="pg-mount"></div>
      </div>`;
    buildPlayground(document.getElementById("pg-mount"), starter);
    window.scrollTo(0, 0);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    ta.remove();
  }

  function videoEmbed(src, title) {
    const safe = escapeHtml(title || "");
    if (src.indexOf("idb:") === 0) {
      return `<video class="video-frame" controls preload="metadata" playsinline data-idb-src="${escapeHtml(src.slice(4))}"></video>`;
    }
    let m = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
    if (m) {
      return `<iframe class="video-frame" src="https://www.youtube.com/embed/${m[1]}" title="${safe}"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    }
    m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) {
      return `<iframe class="video-frame" src="https://player.vimeo.com/video/${m[1]}" title="${safe}"
        frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    }
    return `<video class="video-frame" controls preload="metadata" playsinline><source src="${escapeHtml(src)}"></video>`;
  }

  function updateStreak() {
    /* the 🔥 pill shows the DAY STREAK (it used to show lifetime lessons,
       which contradicted the fire icon) */
    const el = document.getElementById("streak-count");
    if (el) el.textContent = dayStreak();
  }

  /* Highlight search term in text */
  function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background:rgba(165,53,240,.2);font-weight:600">$1</mark>');
  }

  /* ---------------- Real trending (Firebase view stats) ----------------
     Each course-page visit atomically increments a per-day counter in
     RTDB (stats/courses/<id>/<YYYY-MM-DD>). Trending = most real views
     in the last 7 days; falls back to the static list when there's no
     data or no Firebase. Needs "stats" allowed in the database rules. */
  const statsBase = () => (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.databaseURL) || null;
  const dateKey = (offset) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);

  /* 📢 Site-wide announcement banner: the admin posts one message
     (stats/announcement); every student sees it until they dismiss it. */
  function loadAnnouncement() {
    const base = statsBase();
    const bar = document.getElementById("announce-bar");
    if (!base || !bar) return;
    fetch(base + "/stats/announcement.json").then((r) => r.json()).then((a) => {
      if (!a || !a.text || !String(a.text).trim()) { bar.hidden = true; bar.innerHTML = ""; return; }
      const ts = String(a.ts || "");
      if (localStorage.getItem("wda_announce_dismiss") === ts) { bar.hidden = true; return; }
      bar.innerHTML = '<span class="announce-text">📢 ' + escapeHtml(String(a.text).slice(0, 300)) + "</span>" +
        '<button class="announce-x" type="button" aria-label="Dismiss">✕</button>';
      bar.hidden = false;
      bar.querySelector(".announce-x").addEventListener("click", () => {
        localStorage.setItem("wda_announce_dismiss", ts);
        bar.hidden = true;
      });
    }).catch(() => {});
  }
  function trackCourseView(courseId) {
    const base = statsBase();
    if (!base) return;
    fetch(base + "/stats/courses/" + encodeURIComponent(courseId) + "/" + dateKey(0) + ".json", {
      method: "PUT",
      body: JSON.stringify({ ".sv": { "increment": 1 } }),
    }).catch(() => {});
  }
  function fetchTrending(cb) {
    const base = statsBase();
    if (!base) return;
    fetch(base + "/stats/courses.json")
      .then((r) => r.json())
      .then((val) => {
        if (!val) return;
        const week = [];
        for (let i = 0; i < 7; i++) week.push(dateKey(i));
        const totals = Object.entries(val)
          .map(([id, days]) => ({
            id,
            views: week.reduce((s, d) => s + (Number(days && days[d]) || 0), 0),
          }))
          .filter((x) => x.views > 0)
          .sort((a, b) => b.views - a.views);
        if (totals.length) cb(totals);
      })
      .catch(() => {});
  }

  /* ---------------- Leaderboard (Firebase stats path) ----------------
     Whenever progress changes, the signed-in user's totals are published
     to stats/leaderboard/<uid>; the leaderboard page ranks everyone. */
  function computeMyStats() {
    let lessons = 0, coursesDone = 0;
    COURSES.forEach((c) => {
      const cc = completedCount(c), tot = totalLessons(c);
      lessons += cc;
      if (tot > 0 && cc === tot && isEnrolled(c.id)) coursesDone++;
    });
    const qs = loadQuizScores();
    const passes = Object.values(qs).filter((q) => q.score >= Math.ceil(q.total * 0.6)).length;
    const xp = lessons * 10 + passes * 5;
    return { lessons, coursesDone, xp, level: Math.floor(xp / 100) + 1 };
  }
  function pushLeaderboard() {
    const base = statsBase();
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    if (!base || !u) return;
    const s = computeMyStats();
    if (s.lessons === 0) return; /* nothing to rank yet */
    fetch(base + "/stats/leaderboard/" + encodeURIComponent(u.id) + ".json", {
      method: "PUT",
      body: JSON.stringify({
        name: (u.name || u.email || "?").split(" ")[0],
        xp: s.xp, lessons: s.lessons, courses: s.coursesDone,
        streak: dayStreak(), ts: Date.now(),
      }),
    }).catch(() => {});
  }
  function renderLeaderboard() {
    app.innerHTML = `
      <div class="container" style="max-width:680px">
        <h2 class="section-title">🏆 ${t("lb_title")}</h2>
        <p class="section-sub">${t("lb_sub")}</p>
        <div id="lb-list"><div class="empty"><h2>⏳</h2></div></div>
      </div>`;
    const base = statsBase();
    const mount = document.getElementById("lb-list");
    if (!base) { mount.innerHTML = `<div class="empty"><h2>${t("lb_offline")}</h2></div>`; return; }
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    fetch(base + "/stats/leaderboard.json")
      .then((r) => r.json())
      .then((val) => {
        /* Coerce every field to a safe type — the DB is world-writable, so
           a crafted row must never reach innerHTML as markup */
        const rows = Object.entries(val || {})
          .map(([id, x]) => ({
            id,
            name: String((x && x.name) || "?").slice(0, 40),
            xp: Number(x && x.xp) || 0,
            lessons: Number(x && x.lessons) || 0,
            courses: Number(x && x.courses) || 0,
            streak: Number(x && x.streak) || 0,
          }))
          .filter((x) => x.xp > 0)
          .sort((a, b) => b.xp - a.xp)
          .slice(0, 20);
        if (!rows.length) {
          mount.innerHTML = `<div class="empty"><h2>${t("lb_empty")}</h2><p>${t("lb_empty_sub")}</p></div>`;
          return;
        }
        const medal = (i) => (i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`);
        mount.innerHTML = `
          <div class="lb-table">
            ${rows.map((x, i) => `
              <div class="lb-row ${u && x.id === u.id ? "me" : ""}">
                <span class="lb-rank">${medal(i)}</span>
                <span class="lb-name">${escapeHtml(x.name || "?")}${u && x.id === u.id ? ` <em>(${t("lb_you")})</em>` : ""}</span>
                <span class="lb-stat">⚡ ${x.xp} XP</span>
                <span class="lb-stat">📗 ${x.lessons}</span>
                <span class="lb-stat">🎓 ${x.courses || 0}</span>
                <span class="lb-stat">🔥 ${x.streak || 0}</span>
              </div>`).join("")}
          </div>
          <p class="muted" style="font-size:12px">${t("lb_note")}</p>`;
      })
      .catch(() => { mount.innerHTML = `<div class="empty"><h2>${t("lb_offline")}</h2></div>`; });
    window.scrollTo(0, 0);
  }

  /* ---------------- Premium membership (KBZPay manual approval) ----------------
     premium/<emailKey> = { since } marks a paying member (admin-granted).
     payments/ holds submitted claims awaiting admin review. */
  /* Firebase paths forbid . # $ [ ] / — swap them for commas (one-way is fine) */
  const emailKey = (e) => String(e || "").toLowerCase().replace(/[.#$\[\]\/%]/g, ",");
  let premiumStatus = false;
  let premiumChecked = false; /* true once the membership lookup finished */
  function isPremiumUser() {
    return premiumStatus || (window.Auth && window.Auth.isAdmin && window.Auth.isAdmin());
  }
  /* chat.js gates the @ai bot on premium too */
  window.WDA = window.WDA || {};
  window.WDA.isPremium = isPremiumUser;
  function refreshPremium() {
    const base = statsBase();
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    if (!base || !u || !u.email) { premiumStatus = false; premiumChecked = true; return; }
    premiumChecked = false;
    fetch(base + "/premium/" + emailKey(u.email) + ".json")
      .then((r) => r.json())
      .then((v) => {
        const was = premiumStatus;
        const first = !premiumChecked;
        premiumStatus = !!v;
        premiumChecked = true;
        /* re-render once the answer is in, so deep-linked premium lessons load */
        if (premiumStatus !== was || first) window.dispatchEvent(new Event("hashchange"));
      })
      .catch(() => { premiumChecked = true; window.dispatchEvent(new Event("hashchange")); });
  }

  function renderPremium() {
    const u = loggedIn() ? window.Auth.current() : null;
    const premiumCourses = COURSES.filter((c) => !isFree(c));
    app.innerHTML = `
      <div class="container" style="max-width:620px">
        <h2 class="section-title">⭐ ${t("prem_title")}</h2>
        <p class="section-sub">${t("prem_sub")}</p>
        <div class="panel">
          ${PAYMENT_CONFIG.listPrice && PAYMENT_CONFIG.listPrice > PAYMENT_CONFIG.price
            ? `<div class="prem-promo-badge">🎉 ${t("prem_promo")} −${Math.round((1 - PAYMENT_CONFIG.price / PAYMENT_CONFIG.listPrice) * 100)}%</div>`
            : ""}
          <div class="prem-price">
            ${PAYMENT_CONFIG.listPrice && PAYMENT_CONFIG.listPrice > PAYMENT_CONFIG.price ? `<s class="prem-oldprice">${fmt(PAYMENT_CONFIG.listPrice)} Ks</s> ` : ""}
            ${fmt(PAYMENT_CONFIG.price)} Ks <span class="muted">· ${t("prem_once")}</span>
          </div>
          <ul class="learn-grid" style="grid-template-columns:1fr">
            <li>${premiumCourses.length} ${t("prem_benefit_courses")}</li>
            <li>${t("prem_benefit_future")}</li>
            <li>${t("prem_benefit_cert")}</li>
          </ul>
        </div>
        <div id="prem-state"><div class="empty"><h2>⏳</h2></div></div>
      </div>`;
    const mount = document.getElementById("prem-state");

    if (!u) {
      mount.innerHTML = `<div class="panel"><p>${t("prem_login_first")}</p>
        <button class="btn btn-primary" id="prem-login">${t("auth_login")}</button></div>`;
      mount.querySelector("#prem-login").addEventListener("click", () => window.Auth.openModal("login"));
      return;
    }
    if (isPremiumUser()) {
      mount.innerHTML = `<div class="panel"><h2>🎉 ${t("prem_active")}</h2><p class="muted">${t("prem_active_sub")}</p>
        <a class="btn btn-primary" href="#/courses">${t("browse_courses")}</a></div>`;
      return;
    }
    const base = statsBase();
    if (!base) { mount.innerHTML = `<div class="panel"><p>${t("lb_offline")}</p></div>`; return; }

    /* pending claim already submitted? Claims are keyed by the user's own
       email key, so we fetch ONE row — never the whole collection (other
       people's emails/phones must not download to every visitor) */
    fetch(base + "/payments/" + emailKey(u.email) + ".json").then((r) => r.json()).then((p) => {
      const mine = p && p.status === "pending" ? [p] : [];
      if (mine.length) {
        mount.innerHTML = `<div class="panel"><h2>⏳ ${t("prem_pending")}</h2><p class="muted">${t("prem_pending_sub")}</p></div>`;
        return;
      }
      mount.innerHTML = `
        <div class="panel">
          <h2>${t("prem_how")}</h2>
          ${PAYMENT_CONFIG.qrImage ? `
          <div class="prem-qr">
            <img src="${escapeHtml(PAYMENT_CONFIG.qrImage)}" alt="${escapeHtml(PAYMENT_CONFIG.method)} QR"
                 onerror="this.parentElement.innerHTML='<p class=muted>QR coming soon</p>'">
            ${PAYMENT_CONFIG.accountName ? `<div class="prem-qr-name">${escapeHtml(PAYMENT_CONFIG.accountName)}</div>` : ""}
          </div>` : ""}
          <ol style="line-height:2">
            <li>${PAYMENT_CONFIG.qrImage
              ? `${t("prem_step1_qr")} <strong>${escapeHtml(PAYMENT_CONFIG.method)}</strong> → ${t("prem_step1")} <strong>${fmt(PAYMENT_CONFIG.price)} Ks</strong>`
              : `${t("prem_step1")} <strong>${fmt(PAYMENT_CONFIG.price)} Ks</strong> → <strong>${escapeHtml(PAYMENT_CONFIG.method)}</strong>: <strong>${escapeHtml(PAYMENT_CONFIG.phone)}</strong> (${escapeHtml(PAYMENT_CONFIG.accountName)})`}</li>
            <li>${t("prem_step2")}</li>
            <li>${t("prem_step3")}</li>
          </ol>
          <form id="prem-form" class="auth-form">
            <label>${t("prem_phone_label")}</label>
            <input name="phone" type="tel" required placeholder="09...">
            <label>${t("prem_txn_label")}</label>
            <input name="txn" type="text" required placeholder="${escapeHtml(t("prem_txn_ph"))}">
            <div class="auth-err" hidden></div>
            <button class="btn btn-primary btn-block" type="submit" style="margin-top:14px">${t("prem_submit")}</button>
          </form>
        </div>`;
      const form = mount.querySelector("#prem-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const phone = form.phone.value.trim(), txn = form.txn.value.trim();
        if (!phone || !txn) return;
        fetch(base + "/payments/" + emailKey(u.email) + ".json", {
          method: "PUT", /* one claim per account, keyed by email */
          body: JSON.stringify({
            email: u.email.toLowerCase(), name: u.name || "",
            phone, txn, ts: Date.now(), status: "pending",
          }),
        }).then((r) => {
          if (!r.ok) throw new Error("post failed");
          renderPremium(); /* shows the pending state */
        }).catch(() => {
          const err = form.querySelector(".auth-err");
          err.hidden = false; err.textContent = t("chat_send_err");
        });
      });
    }).catch(() => { mount.innerHTML = `<div class="panel"><p>${t("lb_offline")}</p></div>`; });
    window.scrollTo(0, 0);
  }

  /* ---------------- Course card (shared) ---------------- */
  function courseCard(c) {
    const enrolled = isEnrolled(c.id);
    const pct = progressPct(c);
    const q = filter.query.trim().toLowerCase();
    const highlightedTitle = q ? highlightText(cf(c, "title"), filter.query) : cf(c, "title");
    return `
      <a class="card" href="#/course/${c.id}">
        <div class="card-thumb" style="background:${c.color}${c.image ? `;background-image:url('${escapeHtml(c.image)}');background-size:cover;background-position:center` : ""}">
          <span class="lvl">${levelName(c.level)}</span>
          ${c.image ? "" : `<span>${c.icon}</span>`}
        </div>
        <div class="card-body">
          <h3 class="card-title">${highlightedTitle}</h3>
          <p class="card-inst">${c.instructor}</p>
          <div class="rating">
            <b>${c.rating.toFixed(1)}</b> ${stars(c.rating)}
            <span class="muted">(${fmt(c.ratings)})</span>
          </div>
          <div class="card-meta">${c.hours} ${t("hrs")} · ${totalLessons(c)} ${t("lessons_word")} · ${fmt(c.students)} ${t("students")}</div>
          ${enrolled
            ? `<div style="margin-top:10px">
                 <div class="progress thin"><span style="width:${pct}%"></span></div>
                 <div class="card-meta">${pct}% ${t("pct_complete_word")}</div>
               </div>`
            : ""}
          <div class="card-foot">
            <span class="price ${isFree(c) ? "" : "premium"}">${priceTag(c)}</span>
            ${enrolled ? `<span class="badge-enrolled">${t("enrolled")}</span>` : `<span class="muted">${catName(c.category)}</span>`}
          </div>
        </div>
      </a>`;
  }

  /* ---------------- View: Home ---------------- */
  function renderHome() {
    const featured = COURSES.slice(0, 4);
    /* Trending: most-enrolled courses not already shown in Featured */
    const trending = COURSES.filter((c) => featured.indexOf(c) === -1)
      .sort((a, b) => (b.students || 0) - (a.students || 0))
      .slice(0, 3);
    app.innerHTML = `
      <section class="hero">
        <div class="hero-float" aria-hidden="true">
          <span style="left:5%;top:16%;animation-duration:9s">&lt;/&gt;</span>
          <span style="left:87%;top:10%;animation-duration:12s">{ }</span>
          <span style="left:74%;top:76%;animation-duration:8s">⚡</span>
          <span style="left:12%;top:80%;animation-duration:11s">🎨</span>
          <span style="left:44%;top:6%;animation-duration:10s">✨</span>
        </div>
        <div class="container">
          <div>
            <h1>${t("hero_h1")}</h1>
            <p>${t("hero_p")}</p>
            <a class="btn btn-primary" href="#/course/webdev-bootcamp">${t("hero_cta1")}</a>
            <a class="btn btn-outline" href="#/courses" style="margin-left:10px">${t("hero_cta2")}</a>
            <div class="hero-badges">
              <div class="stat"><strong>${COURSES.length}</strong><span>${t("stat_courses")}</span></div>
              <div class="stat"><strong>${COURSES.reduce((a, c) => a + totalLessons(c), 0)}</strong><span>${t("stat_lessons")}</span></div>
              <div class="stat"><strong>4.7★</strong><span>${t("stat_rating")}</span></div>
            </div>
          </div>
          <div class="hero-art">
<div class="cline"><span class="cm">&lt;!-- your first page --&gt;</span></div>
<div class="cline"><span class="tag">&lt;h1&gt;</span>Hello, world!<span class="tag">&lt;/h1&gt;</span></div>
<div class="cline"><span class="tag">&lt;p&gt;</span>I am learning to code.<span class="tag">&lt;/p&gt;</span></div>
<div class="cline"><span class="tag">&lt;button</span> <span class="attr">onclick=</span><span class="str">"party()"</span><span class="tag">&gt;</span>🎉<span class="tag">&lt;/button&gt;</span></div>
<div class="cline">&nbsp;</div>
<div class="cline"><span class="cm">// bring it to life</span></div>
<div class="cline"><span class="attr">const</span> party = () =&gt; alert(<span class="str">"You built this!"</span>);<span class="caret-blink"></span></div>
          </div>
        </div>
      </section>

      <div class="container">
        ${resumeBanner()}
        <h2 class="section-title">${t("featured")}</h2>
        <p class="section-sub">${t("featured_sub")}</p>
        <div class="grid">${featured.map(courseCard).join("")}</div>

        ${trending.length ? `
        <h2 class="section-title">🔥 ${t("trending")}</h2>
        <p class="section-sub" id="trending-sub">${t("trending_sub")}</p>
        <div class="grid" id="trending-grid">${trending.map(courseCard).join("")}</div>` : ""}

        <h2 class="section-title">${t("browse_topic")}</h2>
        <p class="section-sub">${t("browse_sub")}</p>
        <div class="chips">
          ${CATEGORIES.filter((c) => c !== "All")
            .map((cat) => `<a class="chip" href="#/courses" data-cat="${cat}">${catName(cat)}</a>`)
            .join("")}
        </div>
      </div>`;

    app.querySelectorAll(".chip[data-cat]").forEach((chip) =>
      chip.addEventListener("click", () => {
        filter.category = chip.dataset.cat;
        filter.query = "";
      })
    );

    /* Upgrade Trending with REAL view data once it arrives */
    fetchTrending((totals) => {
      const grid = document.getElementById("trending-grid");
      const sub = document.getElementById("trending-sub");
      if (!grid) return;
      const real = totals
        .map((x) => ({ course: courseById(x.id), views: x.views }))
        .filter((x) => x.course)
        .slice(0, 3);
      if (!real.length) return;
      grid.innerHTML = real.map((x) => courseCard(x.course)).join("");
      if (sub) sub.textContent = t("trending_live_sub");
    });
  }

  /* ---------------- View: Catalog ---------------- */
  function renderCatalog() {
    const q = filter.query.trim().toLowerCase();
    let list = COURSES.filter((c) => filter.category === "All" || c.category === filter.category);
    if (q) {
      list = list.filter((c) =>
        (c.title + " " + c.subtitle + " " + c.category + " " + c.instructor + " " +
          (cf(c, "title") || "") + " " + (cf(c, "subtitle") || ""))
          .toLowerCase()
          .includes(q)
      );
    }
    if (filter.level !== "All") list = list.filter((c) => c.level === filter.level);
    if (filter.price !== "All") list = list.filter((c) => (filter.price === "Free" ? isFree(c) : !isFree(c)));
    if (filter.sort === "rating") list = list.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (filter.sort === "az") list = list.slice().sort((a, b) => cf(a, "title").localeCompare(cf(b, "title")));
    else list = list.slice().sort((a, b) => (b.students || 0) - (a.students || 0)); // popular

    const sub =
      `${list.length} ${t("courses_word")}` +
      (q ? ` · “${escapeHtml(filter.query)}”` : "") +
      (filter.category !== "All" ? ` · ${catName(filter.category)}` : "");

    const levels = ["All", "Beginner", "Intermediate", "All Levels"];
    const opt = (v, cur, label) => `<option value="${v}" ${v === cur ? "selected" : ""}>${label}</option>`;

    app.innerHTML = `
      <div class="container">
        <h2 class="section-title">${t("all_courses")}</h2>
        <p class="section-sub">${sub}</p>
        <div class="chips">
          ${CATEGORIES.map(
            (cat) =>
              `<button class="chip ${cat === filter.category ? "active" : ""}" data-cat="${cat}">${catName(cat)}</button>`
          ).join("")}
        </div>
        <div class="filters">
          <label>${t("filter_level")}
            <select data-f="level">${levels.map((l) => opt(l, filter.level, l === "All" ? t("opt_all") : levelName(l))).join("")}</select>
          </label>
          <label>${t("filter_price")}
            <select data-f="price">${["All", "Free", "Premium"].map((p) => opt(p, filter.price, p === "All" ? t("opt_all") : p === "Free" ? t("price_free") : t("price_premium"))).join("")}</select>
          </label>
          <label>${t("filter_sort")}
            <select data-f="sort">${[["popular", t("sort_popular")], ["rating", t("sort_rating")], ["az", t("sort_az")]].map(([v, l]) => opt(v, filter.sort, l)).join("")}</select>
          </label>
        </div>
        <p class="muted" style="font-size:13px;margin:2px 0 0">🔒 ${t("guest_free_note")}</p>
        ${
          list.length
            ? `<div class="grid">${list.map(courseCard).join("")}</div>`
            : `<div class="empty"><h2>${t("no_courses")}</h2><p>${t("no_courses_sub")}</p></div>`
        }
      </div>`;

    app.querySelectorAll(".chip[data-cat]").forEach((chip) =>
      chip.addEventListener("click", () => {
        filter.category = chip.dataset.cat;
        renderCatalog();
      })
    );
    app.querySelectorAll("select[data-f]").forEach((sel) =>
      sel.addEventListener("change", () => {
        filter[sel.dataset.f] = sel.value;
        renderCatalog();
      })
    );
  }

  /* ---------------- View: Course detail ---------------- */
  function renderCourse(id) {
    const c = courseById(id);
    if (!c) return renderNotFound();
    trackCourseView(c.id);
    const enrolled = isEnrolled(c.id);
    const pct = progressPct(c);
    const flat = lessonsOf(c);
    const firstFlat = flat[0]; /* imported/malformed course may be empty */
    const firstLesson = firstFlat ? firstFlat.lesson.id : "";
    const done = completedSet(c.id);
    const quizCount = flat.filter((x) => x.lesson.type === "quiz").length;
    const contentCount = flat.length - quizCount;
    const isBeg = c.level === "Beginner" || c.category === "Kids";
    const reqs = isBeg ? [t("req_none"), t("req_device")] : [t("req_basics"), t("req_device")];
    const audience = isBeg
      ? [t("who_1_beg"), t("who_2")]
      : [t("who_1_adv").replace("{cat}", catName(c.category)), t("who_2")];

    const curriculum = c.sections
      .map((sec, si) => {
        const rows = sec.lessons
          .map((l) => {
            const isDone = done.has(l.id);
            return `
              <div class="lesson-row ${isDone ? "done" : ""}">
                <span class="ic">${isDone ? '<span class="check">✓</span>' : lessonIcon(l.type)}</span>
                <span class="ttl">${lf(l, "title")}</span>
                <span class="dur">${l.duration}</span>
              </div>`;
          })
          .join("");
        return `
          <div class="acc-section ${si === 0 ? "open" : ""}">
            <button class="acc-head" data-acc>
              <span>${secName(c, si)} <span class="meta">· ${sec.lessons.length} ${t("lessons_word")}</span></span>
              <span class="caret">▾</span>
            </button>
            <div class="acc-body">${rows}</div>
          </div>`;
      })
      .join("");

    /* a premium course lets a logged-in non-member read the first few
       lessons free before the paywall — invite them to start the preview */
    const canPreview = !isFree(c) && loggedIn() && !isPremiumUser() && firstLesson;
    const enrollLabel =
      !isFree(c) && !loggedIn() ? t("login_to_enroll")
      : !isFree(c) && !isPremiumUser() ? "⭐ " + t("prem_go")
      : `${t("enroll_now")} ${priceText(c)}`;
    const cta = enrolled
      ? `<a class="btn btn-primary btn-block" href="#/learn/${c.id}/${firstLesson}">${pct > 0 ? t("continue_learning") : t("start_course")}</a>`
      : canPreview
      ? `<a class="btn btn-primary btn-block" href="#/learn/${c.id}/${firstLesson}">🎁 ${t("preview_start")}</a>
         <a class="btn btn-outline btn-block" style="margin-top:8px" href="#/premium">⭐ ${t("prem_go")}</a>`
      : `<button class="btn btn-primary btn-block" data-enroll="${c.id}">${enrollLabel}</button>`;

    app.innerHTML = `
      <section class="detail-hero">
        <div class="container">
          <div>
            <div class="crumbs"><a href="#/courses">${t("nav_courses")}</a> › ${catName(c.category)}</div>
            <h1>${cf(c, "title")}</h1>
            <p class="lead">${cf(c, "subtitle")}</p>
            <div class="detail-meta">
              <span class="rating"><b>${c.rating.toFixed(1)}</b> ${stars(c.rating)} (${fmt(c.ratings)} ${t("ratings")})</span>
              <span>· ${fmt(c.students)} ${t("students")}</span>
              <span>· ${t("created_by")} <strong>${c.instructor}</strong></span>
            </div>
            <div class="detail-badges">
              <span class="dbadge">🎯 ${levelName(c.level)}</span>
              <span class="dbadge">🌐 English + မြန်မာ</span>
              <span class="dbadge">📲 ${t("inc_offline")}</span>
              <span class="dbadge">🎓 ${t("inc_cert")}</span>
            </div>
          </div>

          <aside class="buybox">
            <div class="thumb" style="background:${c.color}${c.image ? `;background-image:url('${escapeHtml(c.image)}');background-size:cover;background-position:center` : ""}">${c.image ? "" : c.icon}</div>
            <div class="pad">
              <div class="price ${isFree(c) ? "" : "premium"}">${priceTag(c)}</div>
              ${enrolled && pct > 0 ? `<div class="progress" style="margin-bottom:14px"><span style="width:${pct}%"></span></div><div class="muted" style="margin-bottom:14px">${pct}% ${t("pct_complete_word")} · ⏱ ${formatTime(getTotalTimeSpent(c.id))}</div>` : ""}
              ${cta}
              ${enrolled && pct === 100 ? `<a class="btn btn-ghost btn-block" style="margin-top:10px" href="#/certificate/${c.id}">🎓 ${t("cert_view")}</a>` : ""}
              <div class="includes-title">${t("includes_title")}</div>
              <ul class="includes">
                <li>📚 ${contentCount} ${t("lessons_word")}${quizCount ? ` · ❓ ${quizCount} ${t("quizzes_word")}` : ""}</li>
                <li>⏱ ${c.hours} ${t("hours_content")}</li>
                <li>🎓 ${t("inc_cert")}</li>
                <li>📲 ${t("inc_offline")}</li>
                <li>🌐 ${t("inc_bilingual")}</li>
                <li>♾️ ${t("inc_lifetime")}</li>
                ${enrolled ? `<li>✅ ${formatTime(getTotalTimeSpent(c.id))} ${t("spent")}</li>` : ""}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section class="detail-body">
        <div class="container">
          <div>
            <div class="panel">
              <h2>${t("what_learn")}</h2>
              <ul class="learn-grid">${cf(c, "whatYouLearn").map((x) => `<li>${x}</li>`).join("")}</ul>
            </div>
            <div class="panel two-col">
              <div>
                <h2>${t("requirements")}</h2>
                <ul class="req-list">${reqs.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
              </div>
              <div>
                <h2>${t("who_for")}</h2>
                <ul class="req-list">${audience.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
              </div>
            </div>
            <div class="panel">
              <h2>${t("description")}</h2>
              <p>${cf(c, "description")}</p>
            </div>
            <div class="panel">
              <h2>${t("course_content")}</h2>
              <p class="muted" style="margin-top:-6px">${c.sections.length} ${t("sections_word")} · ${totalLessons(c)} ${t("lessons_word")} · ${c.hours} ${t("hours_word")}</p>
              <div class="accordion">${curriculum}</div>
            </div>
            ${reviewsPanel(c)}
          </div>

          <aside>
            <div class="panel">
              <h2>${t("instructor")}</h2>
              <div class="instructor-card">
                <span class="instructor-avatar">${escapeHtml((c.instructor || "?").charAt(0).toUpperCase())}</span>
                <div><strong>${escapeHtml(c.instructor)}</strong><br><span class="muted" style="font-size:13px">${catName(c.category)} ${t("instructor_role")}</span></div>
              </div>
              <p class="muted" style="margin-top:12px">${t("instructor_bio")}</p>
            </div>
            <div class="panel">
              <h2>${t("share_course")}</h2>
              <button class="btn btn-outline btn-block" id="course-share" type="button">🔗 ${t("cert_copy")}</button>
            </div>
          </aside>
        </div>
      </section>`;

    app.querySelectorAll("[data-acc]").forEach((h) =>
      h.addEventListener("click", () => h.parentElement.classList.toggle("open"))
    );
    const enrollBtn = app.querySelector("[data-enroll]");
    if (enrollBtn) {
      enrollBtn.addEventListener("click", () => {
        const go = () => {
          enroll(c.id);
          location.hash = `#/learn/${c.id}/${firstLesson}`;
        };
        if (isFree(c)) go();
        else requireAuth(() => { if (isPremiumUser()) go(); else location.hash = "#/premium"; });
      });
    }
    const shareBtn = app.querySelector("#course-share");
    if (shareBtn) shareBtn.addEventListener("click", () => {
      const link = location.origin + location.pathname + "#/course/" + c.id;
      const done = () => { shareBtn.textContent = "✓ " + t("cert_copied"); };
      if (navigator.clipboard) navigator.clipboard.writeText(link).then(done).catch(() => fallbackCopy(link, done));
      else fallbackCopy(link, done);
    });
    wireReviews(c);
    window.scrollTo(0, 0);
  }

  /* ---------------- View: Learn / player ---------------- */
  /* 🎓 AI Tutor on the lesson page — context-aware Q&A about the open
     lesson (free Gemini via js/ai.js). Small chat log, quick-question
     chips, short in-memory history for follow-ups. */
  function wireAiTutor(course, lesson) {
    const box = app.querySelector("#ai-tutor");
    if (!box) return;
    const log = box.querySelector(".tutor-log");
    const form = box.querySelector(".tutor-form");
    if (!form) return; /* premium-locked panel — nothing to wire */
    const inp = form.querySelector("input");
    const history = [];
    /* plain-text lesson body for context (tags stripped, capped) */
    const tmp = document.createElement("div");
    tmp.innerHTML = lesson.type === "quiz" ? "" : (lf(lesson, "content") || "");
    const lessonText = (tmp.textContent || "").replace(/\s+/g, " ").trim().slice(0, 4000);

    /* render the AI's markdown-ish reply safely: escape, then code blocks */
    const fmt = (s) => {
      let out = escapeHtml(String(s));
      out = out.replace(/```([\s\S]*?)```/g, (m, code) => "<pre><code>" + code.replace(/^[a-zA-Z]+\n/, "").trim() + "</code></pre>");
      out = out.replace(/`([^`\n]+)`/g, "<code>$1</code>");
      out = out.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
      return out.replace(/\n/g, "<br>");
    };
    const bubble = (who, html) => {
      log.hidden = false;
      const d = document.createElement("div");
      d.className = "tutor-msg " + who;
      d.innerHTML = html;
      log.appendChild(d);
      d.scrollIntoView({ block: "nearest" });
      return d;
    };
    const ask = (question, displayText) => {
      if (!window.AI) { bubble("bot", escapeHtml(t("ai_no_key"))); return; }
      bubble("me", escapeHtml(displayText || question));
      const wait = bubble("bot", "⏳ " + escapeHtml(t("tutor_thinking")));
      const convo = history.slice(-6).map((h) => (h.me ? "Student" : "Tutor") + ": " + h.text).join("\n");
      history.push({ me: true, text: question.slice(0, 300) });
      window.AI.complete(
        'The student is reading the lesson "' + lesson.title + '" in the course "' + course.title + '".\n' +
          (lessonText ? "Lesson text:\n" + lessonText + "\n" : "") +
          (convo ? "\nConversation so far:\n" + convo + "\n" : "") +
          "\nStudent asks: " + question,
        {
          system:
            "You are the patient AI tutor of WebDev Academy, helping Myanmar teenagers (ages 12-18) learn web development. " +
            "Use very simple English; if the student writes Burmese or asks for Burmese, answer in Burmese but keep technical words (HTML, CSS, tag names) in English. " +
            "Keep answers under 150 words unless showing code. Put code inside ```fences```. Be encouraging.",
          maxTokens: 2500,
        }
      ).then((reply) => {
        history.push({ me: false, text: String(reply).slice(0, 500) });
        wait.innerHTML = fmt(reply);
      }).catch((err) => {
        const m = (err && err.message) || String(err);
        wait.innerHTML = m === "no-key" ? escapeHtml(t("ai_no_key")) : "⚠ AI: " + escapeHtml(m);
      });
    };
    const chipQs = {
      simple: "Explain this lesson in very simple words, like I am 12 years old.",
      burmese: "Explain the main idea of this lesson in Burmese (Myanmar language). Keep technical words in English.",
      example: "Show me one more small code example for this lesson, different from the one in the lesson, and explain it briefly.",
      practice: "Give me one small practice exercise for this lesson. Do not show the solution — encourage me to try first.",
    };
    box.querySelectorAll("[data-tq]").forEach((b) =>
      b.addEventListener("click", () => ask(chipQs[b.getAttribute("data-tq")], b.textContent.trim()))
    );
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = inp.value.trim();
      if (!q) return;
      inp.value = "";
      ask(q);
    });
  }

  const PREVIEW_LESSONS = 2; /* free taste of a premium course before the paywall */

  function renderLearn(courseId, lessonId) {
    const c = courseById(courseId);
    if (!c) return renderNotFound();

    const flat = lessonsOf(c);
    let idx = flat.findIndex((x) => x.lesson.id === lessonId);
    if (idx === -1) idx = 0;

    const locked = !isFree(c) && !isPremiumUser();
    let previewMode = false;
    if (locked) {
      /* wait for Firebase to restore the session before deciding to redirect
         a (possibly logged-in) user hitting a premium deep link */
      if (window.Auth && window.Auth.ready && !window.Auth.ready()) {
        app.innerHTML = `<div class="container"><div class="empty"><h2>⏳</h2><p class="muted">${t("prem_checking")}</p></div></div>`;
        return;
      }
      if (!loggedIn()) {
        pendingAction = () => { location.hash = `#/learn/${courseId}/${lessonId}`; };
        location.hash = `#/course/${courseId}`;
        window.Auth.openModal("login");
        return;
      }
      /* Membership lookup may still be in flight on a hard reload — wait for
         it instead of bouncing a paying member to the premium page */
      if (!premiumChecked) {
        app.innerHTML = `<div class="container"><div class="empty"><h2>⏳</h2><p class="muted">${t("prem_checking")}</p></div></div>`;
        return;
      }
      /* free preview: the first PREVIEW_LESSONS are open; deeper lessons paywall */
      if (idx >= PREVIEW_LESSONS) { location.hash = "#/premium"; return; }
      previewMode = true;
    }
    if (!isEnrolled(c.id)) enroll(c.id);

    const current = flat[idx].lesson;
    /* in preview, the "next" lesson is only reachable if it's still free */
    const nextLocked = previewMode && (idx + 1) >= PREVIEW_LESSONS;
    const done = completedSet(c.id);
    const pct = progressPct(c);

    /* sidebar (in preview, lessons past the free window show a 🔒) */
    let sidebar = "";
    let flatN = 0;
    c.sections.forEach((sec, si) => {
      sidebar += `<div class="side-sec-title">${secName(c, si)}</div>`;
      sec.lessons.forEach((l) => {
        const isDone = done.has(l.id);
        const lLocked = previewMode && flatN >= PREVIEW_LESSONS;
        flatN++;
        sidebar += lLocked
          ? `<a class="side-lesson locked" href="#/premium" title="${escapeHtml(t("preview_locked"))}">
               <span class="s-check">🔒</span>
               <span class="s-ttl">${lf(l, "title")}</span>
               <span class="s-dur">${l.duration}</span>
             </a>`
          : `<button class="side-lesson ${l.id === current.id ? "active" : ""}" data-goto="${l.id}">
               <span class="s-check ${isDone ? "" : "todo"}">${isDone ? "✓" : "○"}</span>
               <span class="s-ttl">${lf(l, "title")}</span>
               <span class="s-dur">${l.duration}</span>
             </button>`;
      });
    });

    /* main content */
    const body =
      current.type === "quiz" ? renderQuizHtml(current) : lf(current, "content") || "<p>—</p>";

    const prev = idx > 0 ? flat[idx - 1].lesson.id : null;
    const next = idx < flat.length - 1 ? flat[idx + 1].lesson.id : null;
    const isDoneNow = done.has(current.id);
    const secTitle = secName(c, flat[idx].sectionIdx);
    setLast(courseId, current.id);

    app.innerHTML = `
      <div class="learn-wrap">
        <div class="player-main">
          <div class="stage${current.type === "video" && current.src ? " has-video" : ""}">
            ${
              current.type === "video" && current.src
                ? videoEmbed(current.src, lf(current, "title"))
                : `<div class="stage-title">${lf(current, "title")}</div>
                   <div class="play-btn">▶</div>
                   <div class="stage-label">${secTitle} · ${t("lesson_word")} ${idx + 1} / ${flat.length}</div>`
            }
          </div>
          <div class="reader">
            <div class="muted" style="font-size:13px"><a href="#/course/${c.id}">← ${cf(c, "title")}</a></div>
            <h1>${lf(current, "title")}</h1>
            <p class="lesson-sub">${secTitle} · ${current.duration} · ⏱ ${t("spent")}: <span id="time-spent">${formatTime(loadLessonTime(current.id).total)}</span></p>
            ${previewMode ? `<div class="preview-banner">🎁 ${t("preview_free").replace("{n}", PREVIEW_LESSONS)} · <a href="#/premium">⭐ ${t("preview_unlock")}</a></div>` : ""}
            ${body}
            <div class="ai-tutor" id="ai-tutor">
              <div class="notes-head"><strong>🎓 ${t("tutor_title")}</strong> <span class="muted" style="font-size:12px">${t("tutor_sub")}</span></div>
              ${isPremiumUser()
                ? `<div class="tutor-chips">
                     <button type="button" data-tq="simple">💡 ${t("tutor_simple")}</button>
                     <button type="button" data-tq="burmese">🇲🇲 ${t("tutor_burmese")}</button>
                     <button type="button" data-tq="example">💻 ${t("tutor_example")}</button>
                     <button type="button" data-tq="practice">🏋️ ${t("tutor_practice")}</button>
                   </div>
                   <div class="tutor-log" hidden></div>
                   <form class="tutor-form">
                     <input type="text" maxlength="300" placeholder="${escapeHtml(t("tutor_ph"))}">
                     <button class="btn btn-primary btn-sm" type="submit">${t("tutor_ask")}</button>
                   </form>`
                : `<p class="muted" style="margin:8px 0">🔒 ${t("tutor_premium")}</p>
                   <a class="btn btn-primary btn-sm" href="#/premium">⭐ ${t("prem_go")}</a>`}
            </div>
            <div class="notes">
              <div class="notes-head"><strong>${t("notes_title")}</strong> <span class="notes-status" id="notes-status"></span></div>
              <textarea id="lesson-notes" placeholder="${escapeHtml(t("notes_placeholder"))}">${escapeHtml(loadNotes()[current.id] || "")}</textarea>
            </div>
            <div id="comments-section" style="margin-top:32px;border-top:1px solid var(--line);padding-top:20px">
              <div class="notes-head"><strong>${t("comments_title")}</strong></div>
              ${loggedIn() ? `
                <div style="margin-bottom:20px">
                  <input id="comment-input" type="text" placeholder="${escapeHtml(t("comment_placeholder"))}" style="width:100%;padding:8px;border:1px solid var(--line);border-radius:4px;font-family:inherit">
                  <button id="comment-btn" class="btn btn-primary btn-sm" style="margin-top:8px">${t("comment_post")}</button>
                </div>
              ` : `<p class="muted">${t("comment_login")}</p>`}
              <div id="comments-list">
                ${loadComments(current.id).map((cmt) => `
                  <div style="margin-bottom:16px;padding:12px;background:var(--surface-2);border-radius:4px">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                      <strong style="font-size:13px">${escapeHtml(cmt.author)}</strong>
                      <span style="font-size:12px;color:var(--muted)">${new Date(cmt.ts).toLocaleDateString(lang === "en" ? "en-US" : "my-MM", { month: "short", day: "numeric" })}</span>
                    </div>
                    <p style="margin:0;font-size:14px">${escapeHtml(cmt.text)}</p>
                  </div>
                `).join("")}
              </div>
            </div>
            <div class="lesson-nav">
              <div>
                ${prev ? `<a class="btn btn-outline btn-sm" href="#/learn/${c.id}/${prev}">${t("previous")}</a>` : ""}
              </div>
              <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
                <button class="btn btn-outline btn-sm" data-trylesson>🧪 ${t("pg_title")}</button>
                <button class="btn btn-outline btn-sm" data-bookmark>${isBookmarked(current.id) ? "★ " + t("bookmarked") : "☆ " + t("bookmark")}</button>
                ${
                  current.type !== "quiz"
                    ? `<button class="btn ${isDoneNow ? "btn-ghost" : "btn-dark"} btn-sm" data-complete>
                         ${isDoneNow ? t("completed") : t("mark_complete")}
                       </button>`
                    : ""
                }
                ${
                  nextLocked
                    ? `<a class="btn btn-primary btn-sm" href="#/premium">🔒 ${t("preview_unlock")}</a>`
                    : next
                    ? `<a class="btn btn-primary btn-sm" data-next href="#/learn/${c.id}/${next}">${t("next_lesson")}</a>`
                    : `<a class="btn btn-primary btn-sm" href="#/course/${c.id}">${t("finish")}</a>`
                }
              </div>
            </div>
          </div>
        </div>

        <aside class="player-side">
          <div class="side-head">
            <h3>${cf(c, "title")}</h3>
            <div class="progress thin"><span style="width:${pct}%"></span></div>
            <div class="muted" style="font-size:13px;margin-top:6px">${completedCount(c)} / ${flat.length} ${t("complete_word")} · ${pct}%</div>
          </div>
          ${sidebar}
        </aside>
      </div>`;

    hydrateIdbVideos();
    addCopyButtons();
    wireAiTutor(c, current);

    app.querySelectorAll("[data-goto]").forEach((b) =>
      b.addEventListener("click", () => {
        location.hash = `#/learn/${c.id}/${b.dataset.goto}`;
      })
    );

    const nt = app.querySelector("#lesson-notes");
    if (nt) {
      let tmr;
      nt.addEventListener("input", () => {
        clearTimeout(tmr);
        tmr = setTimeout(() => {
          saveNote(current.id, nt.value.trim());
          const st = app.querySelector("#notes-status");
          if (st) { st.textContent = t("notes_saved"); setTimeout(() => { if (st) st.textContent = ""; }, 1500); }
        }, 400);
      });
    }
    const bm = app.querySelector("[data-bookmark]");
    if (bm) bm.addEventListener("click", () => { toggleBookmark(current.id); renderLearn(courseId, lessonId); });

    /* Per-lesson demo: open the playground with this lesson's first code
       example, or a starter document when the lesson has none */
    const tl = app.querySelector("[data-trylesson]");
    if (tl) tl.addEventListener("click", () => {
      const firstPre = app.querySelector(".reader pre");
      const starter = "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n\n</body>\n</html>";
      openPlayground(firstPre ? codeTextOf(firstPre) : starter);
    });

    const commentBtn = app.querySelector("#comment-btn");
    const commentInput = app.querySelector("#comment-input");
    if (commentBtn && commentInput) {
      commentBtn.addEventListener("click", () => {
        const text = commentInput.value.trim();
        if (!text) return;
        const user = loggedIn() ? window.Auth.current() : null;
        const author = user ? (user.name || user.email) : "Anonymous";
        saveComment(current.id, author, text);
        commentInput.value = "";
        renderLearn(courseId, lessonId);
      });
      commentInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") commentBtn.click();
      });
    }

    const completeBtn = app.querySelector("[data-complete]");
    if (completeBtn) {
      completeBtn.addEventListener("click", () => {
        markComplete(c.id, current.id, !done.has(current.id));
        renderLearn(courseId, lessonId);
      });
    }

    const nextBtn = app.querySelector("[data-next]");
    if (nextBtn && current.type !== "quiz") {
      nextBtn.addEventListener("click", () => markComplete(c.id, current.id, true));
    }

    if (current.type === "quiz") wireQuiz(current, c);

    /* Time tracking: start timer for this lesson */
    startLessonTimer(current.id);

    /* Clean up the previous lesson's timers AND commit its elapsed time —
       lesson→lesson navigation used to tear the poll down before it could
       save, silently losing the session's minutes */
    if (window._lessonTimerCleanup) window._lessonTimerCleanup();

    let timeDisplay = setInterval(() => {
      const el = app.querySelector("#time-spent");
      if (el) el.textContent = formatTime(loadLessonTime(current.id).total);
    }, 1000);

    /* Stop + save when the user navigates away (any route change) */
    const originalHash = location.hash;
    let committed = false;
    const commitTime = () => {
      if (!committed) { committed = true; endLessonTimer(current.id); }
      clearInterval(timer);
      clearInterval(timeDisplay);
    };
    const timer = setInterval(() => {
      if (location.hash !== originalHash) commitTime();
    }, 500);
    window._lessonTimerCleanup = commitTime;

    window.scrollTo(0, 0);
  }

  /* ---------------- Quiz rendering ---------------- */
  function renderQuizHtml(lesson) {
    const questions = getQuestions(lesson);
    const qs = questions
      .map(
        (q, qi) => `
        <div class="q-block" data-q="${qi}">
          <div class="q">${qi + 1}. ${q.q}</div>
          ${q.options
            .map(
              (opt, oi) =>
                `<label class="q-opt" data-opt="${oi}">
                   <input type="radio" name="q${qi}" value="${oi}"> <span>${opt}</span>
                 </label>`
            )
            .join("")}
        </div>`
      )
      .join("");
    const best = loadQuizScores()[lesson.id];
    return `
      <div class="quiz">
        <p>${t("quiz_intro_a")} ${questions.length} ${t("quiz_intro_b")}${best ? ` <strong>· ${t("quiz_best")}: ${best.score}/${best.total}</strong>` : ""}</p>
        ${qs}
        <div id="quiz-result"></div>
        <button class="btn btn-primary" data-check-quiz>${t("check_answers")}</button>
      </div>`;
  }

  function wireQuiz(lesson, course) {
    const btn = app.querySelector("[data-check-quiz]");
    if (!btn) return;
    const questions = getQuestions(lesson);
    btn.addEventListener("click", () => {
      let score = 0;
      questions.forEach((q, qi) => {
        const block = app.querySelector(`.q-block[data-q="${qi}"]`);
        const picked = block.querySelector(`input[name="q${qi}"]:checked`);
        block.querySelectorAll(".q-opt").forEach((o) => o.classList.remove("correct", "wrong"));
        /* guard: a bad answer index (e.g. AI-authored) must not crash the quiz */
        const correctEl = block.querySelector(`.q-opt[data-opt="${q.answer}"]`);
        if (correctEl) correctEl.classList.add("correct");
        if (picked) {
          const pickedIdx = Number(picked.value);
          if (pickedIdx === q.answer) score++;
          else {
            const wrongEl = block.querySelector(`.q-opt[data-opt="${pickedIdx}"]`);
            if (wrongEl) wrongEl.classList.add("wrong");
          }
        }
      });
      const total = questions.length;
      const passed = score >= Math.ceil(total * 0.6);
      saveQuizScore(lesson.id, score, total);
      const res = document.getElementById("quiz-result");
      res.innerHTML = `
        <div class="quiz-result">${passed ? "🎉" : "📚"} ${t("you_scored")} ${score} / ${total}.
          ${passed ? t("passed_msg") : t("fail_msg")}</div>`;
      if (passed) {
        markComplete(course.id, lesson.id, true);
        res.innerHTML += `<p class="muted">${t("marked_complete")}</p>`;
        const bar = app.querySelector(".player-side .progress span");
        if (bar) bar.style.width = progressPct(course) + "%";
        const active = app.querySelector(".side-lesson.active .s-check");
        if (active) {
          active.textContent = "✓";
          active.classList.remove("todo");
        }
      }
      res.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* Resume-where-you-left-off banner */
  function resumeBanner() {
    const last = getLast();
    if (!last) return "";
    const c = courseById(last.courseId);
    if (!c) return "";
    const found = lessonsOf(c).find((x) => x.lesson.id === last.lessonId);
    if (!found) return "";
    return `<a class="resume-banner" href="#/learn/${c.id}/${last.lessonId}">
      <div><span class="muted" style="font-size:13px">${t("resume_title")}</span>
        <div class="rb-title">${cf(c, "title")} — ${lf(found.lesson, "title")}</div></div>
      <span class="btn btn-primary btn-sm">${t("continue")}</span>
    </a>`;
  }

  /* Dashboard stats + badges (gamification) */
  function statsHeader() {
    let lessons = 0, coursesDone = 0, totalTime = 0;
    COURSES.forEach((c) => {
      const cc = completedCount(c), tot = totalLessons(c);
      lessons += cc;
      if (tot > 0 && cc === tot && isEnrolled(c.id)) coursesDone++;
      if (isEnrolled(c.id)) totalTime += getTotalTimeSpent(c.id);
    });
    const qs = loadQuizScores();
    const passes = Object.values(qs).filter((q) => q.score >= Math.ceil(q.total * 0.6)).length;
    const perfect = Object.values(qs).some((q) => q.total > 0 && q.score === q.total);
    const xp = lessons * 10 + passes * 5;
    const level = Math.floor(xp / 100) + 1;
    const bilingual = localStorage.getItem("wda_bilingual") === "1";
    const streak = dayStreak();
    const badges = [
      { key: "badge_first_lesson", earned: lessons >= 1, icon: "👣" },
      { key: "badge_ten_lessons", earned: lessons >= 10, icon: "📚" },
      { key: "badge_fifty_lessons", earned: lessons >= 50, icon: "🚀" },
      { key: "badge_first_course", earned: coursesDone >= 1, icon: "🎓" },
      { key: "badge_five_courses", earned: coursesDone >= 5, icon: "🏆" },
      { key: "badge_streak3", earned: streak >= 3, icon: "🔥" },
      { key: "badge_streak7", earned: streak >= 7, icon: "⚡" },
      { key: "badge_streak30", earned: streak >= 30, icon: "💎" },
      { key: "badge_quiz_ace", earned: perfect, icon: "🧠" },
      { key: "badge_bilingual", earned: bilingual, icon: "🌐" },
    ];
    const stat = (v, l) => `<div class="dstat"><b>${v}</b><span>${l}</span></div>`;
    return `
      <div class="dash">
        <div class="dash-stats">
          ${stat(level, t("stat_level"))}${stat(xp, t("stat_xp"))}${stat(lessons, t("stat_completed"))}
          ${stat(coursesDone, t("stat_courses_done"))}${stat("🔥 " + streak, t("stat_streak"))}${stat(formatTime(totalTime), "⏱ " + t("spent"))}
        </div>
        <div class="badges">
          ${badges.map((b) => `<div class="badge ${b.earned ? "on" : ""}" title="${b.earned ? t(b.key) : t("badge_locked")}"><span>${b.earned ? b.icon : "🔒"}</span><small>${t(b.key)}</small></div>`).join("")}
        </div>
      </div>`;
  }

  function bookmarksSection() {
    const ids = loadBookmarks();
    if (!ids.length) return "";
    const items = [];
    COURSES.forEach((c) => lessonsOf(c).forEach((x) => { if (ids.indexOf(x.lesson.id) >= 0) items.push({ c, l: x.lesson }); }));
    if (!items.length) return "";
    return `
      <h3 class="section-title">${t("bookmarks_title")}</h3>
      <div class="mylist">
        ${items.map(({ c, l }) => `
          <div class="myrow">
            <a class="mthumb" style="background:${c.color}" href="#/learn/${c.id}/${l.id}">🔖</a>
            <div><h3>${lf(l, "title")}</h3><p class="muted">${cf(c, "title")}</p></div>
            <a class="btn btn-primary btn-sm" href="#/learn/${c.id}/${l.id}">${t("continue")}</a>
          </div>`).join("")}
      </div>`;
  }

  function recommendedSection() {
    const completed = [];
    COURSES.forEach((c) => {
      const pct = progressPct(c);
      if (pct === 100 && isEnrolled(c.id)) completed.push(c);
    });
    if (!completed.length) return "";
    const recommendations = [];
    completed.forEach((c) => {
      COURSES.forEach((candidate) => {
        if (candidate.id !== c.id && !isEnrolled(candidate.id) && candidate.category === c.category) {
          if (!recommendations.find((x) => x.id === candidate.id)) recommendations.push(candidate);
        }
      });
    });
    if (!recommendations.length) return "";
    const top3 = recommendations.slice(0, 3);
    return `
      <h3 class="section-title">${t("recommended_title")}</h3>
      <div class="grid">${top3.map(courseCard).join("")}</div>`;
  }

  /* ---------------- View: Global search (courses + inside lessons) ---------------- */
  function stripHtml(html) {
    return String(html || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'").replace(/&amp;/g, "&")
      .replace(/\s+/g, " ").trim();
  }
  function renderSearch(query) {
    const q = (query || "").trim();
    const ql = q.toLowerCase();
    if (!ql) { location.hash = "#/courses"; return; }
    filter.query = q; /* so courseCard highlights matches */

    const courseHits = COURSES.filter((c) =>
      (c.title + " " + c.subtitle + " " + c.category + " " + c.instructor +
        " " + (cf(c, "title") || "") + " " + (cf(c, "subtitle") || ""))
        .toLowerCase().includes(ql)
    );

    const MAXL = 30;
    const lessonHits = [];
    COURSES.forEach((c) => {
      c.sections.forEach((sec) => sec.lessons.forEach((l) => {
        const title = lf(l, "title") || l.title || "";
        const body = stripHtml(lf(l, "content") || l.content || "") +
          (l.questions ? " " + l.questions.map((x) => x.q).join(" ") : "");
        const inTitle = title.toLowerCase().includes(ql);
        const idx = body.toLowerCase().indexOf(ql);
        if (inTitle || idx >= 0) {
          let snippet;
          if (idx >= 0) {
            const start = Math.max(0, idx - 60);
            snippet = (start > 0 ? "…" : "") + body.slice(start, idx + ql.length + 90) + "…";
          } else {
            snippet = body.slice(0, 140) + (body.length > 140 ? "…" : "");
          }
          lessonHits.push({ c, l, title, snippet });
        }
      }));
    });

    const mark = (s) => highlightText(escapeHtml(s), q);
    const lessonRows = lessonHits.slice(0, MAXL).map(({ c, l, title, snippet }) => `
      <a class="search-hit" href="#/learn/${c.id}/${l.id}">
        <div class="sh-title">${lessonIcon(l.type)} ${mark(title)}</div>
        <div class="sh-course">${escapeHtml(cf(c, "title"))} · ${catName(c.category)}</div>
        <div class="sh-snippet">${mark(snippet)}</div>
      </a>`).join("");

    app.innerHTML = `
      <div class="container" style="max-width:860px">
        <h2 class="section-title">🔍 ${t("search_results")} — “${escapeHtml(q)}”</h2>
        <p class="section-sub">${courseHits.length} ${t("courses_word")} · ${lessonHits.length} ${t("lessons_word")}</p>
        ${courseHits.length ? `<h3 class="section-title" style="font-size:19px">${t("nav_courses")}</h3><div class="grid">${courseHits.map(courseCard).join("")}</div>` : ""}
        ${lessonHits.length ? `<h3 class="section-title" style="font-size:19px">${t("search_in_lessons")}</h3><div class="search-hits">${lessonRows}</div>
          ${lessonHits.length > MAXL ? `<p class="muted">${t("search_more")}</p>` : ""}` : ""}
        ${!courseHits.length && !lessonHits.length ? `<div class="empty"><h2>${t("no_courses")}</h2><p>${t("no_courses_sub")}</p></div>` : ""}
      </div>`;
    window.scrollTo(0, 0);
  }

  /* ---------------- View: Learning Roadmap ---------------- */
  function renderRoadmap() {
    /* Order courses along the natural learning path */
    const order = ["Kids", "Fundamentals", "HTML", "CSS", "JavaScript", "Responsive", "Frontend", "Backend", "Databases", "Programming", "AI", "Tools", "Career"];
    const oi = (c) => { const i = order.indexOf(c.category); return i === -1 ? 98 : i; };
    const list = COURSES.slice().sort(
      (a, b) => (oi(a) - oi(b)) || ((a.level === "Beginner" ? 0 : 1) - (b.level === "Beginner" ? 0 : 1))
    );
    const steps = list.map((c, i) => {
      const pct = progressPct(c);
      const enrolled = isEnrolled(c.id);
      const status = pct === 100 ? "done" : pct > 0 ? "active" : "todo";
      const label = pct === 100 ? t("review") : pct > 0 ? t("continue") : t("start");
      return `
        <div class="road-step ${status}">
          <div class="road-marker">${pct === 100 ? "✓" : i + 1}</div>
          <div class="road-card">
            <div class="road-head">
              <span class="road-icon" style="background:${c.color}">${c.icon}</span>
              <div>
                <h3>${cf(c, "title")}</h3>
                <p class="muted">${levelName(c.level)} · ${c.hours} ${t("hours_word")} · ${totalLessons(c)} ${t("lessons_word")}</p>
              </div>
            </div>
            ${enrolled && pct > 0 ? `<div class="progress thin"><span style="width:${pct}%"></span></div><div class="muted" style="font-size:12px;margin-top:4px">${pct}% ${t("pct_complete_word")}</div>` : ""}
            <a class="btn ${pct === 100 ? "btn-ghost" : "btn-primary"} btn-sm" href="#/course/${c.id}" style="margin-top:10px">${label}</a>
          </div>
        </div>`;
    }).join("");
    app.innerHTML = `
      <div class="container" style="max-width:720px">
        <h2 class="section-title">🗺️ ${t("roadmap_title")}</h2>
        <p class="section-sub">${t("roadmap_sub")}</p>
        <div class="roadmap">${steps}</div>
      </div>`;
    window.scrollTo(0, 0);
  }

  /* ---------------- View: My Learning ---------------- */
  /* ---------------- AI Daily Review Quiz ---------------- */
  /* Gather the lessons this student has already completed (skip quizzes). */
  function collectCompletedLessons() {
    const out = [];
    COURSES.forEach((c) => {
      const done = completedSet(c.id);
      if (!done.size) return;
      lessonsOf(c).forEach((x) => {
        if (x.lesson.type !== "quiz" && done.has(x.lesson.id))
          out.push({ course: cf(c, "title"), title: lf(x.lesson, "title") });
      });
    });
    return out;
  }

  function renderReview() {
    if (!loggedIn()) { location.hash = "#/"; if (window.Auth) window.Auth.openModal("login"); return; }
    app.innerHTML = `
      <div class="container" style="max-width:680px">
        <h2 class="section-title">🧠 ${t("review_title")}</h2>
        <p class="section-sub">${t("review_sub")}</p>
        <div id="review-body"></div>
      </div>`;
    const mount = document.getElementById("review-body");
    if (!isPremiumUser()) {
      mount.innerHTML = `<div class="panel"><p class="muted" style="margin:0 0 10px">🔒 ${t("review_premium")}</p><a class="btn btn-primary" href="#/premium">⭐ ${t("prem_go")}</a></div>`;
      return;
    }
    if (!window.AI) { mount.innerHTML = `<div class="panel"><p class="muted">${escapeHtml(t("ai_no_key"))}</p></div>`; return; }
    const done = collectCompletedLessons();
    if (done.length < 3) {
      mount.innerHTML = `<div class="empty"><h2>📚</h2><p>${t("review_need")}</p><a class="btn btn-primary" href="#/courses">${t("browse_courses")}</a></div>`;
      return;
    }
    mount.innerHTML = `<div class="panel">
      <p>${t("review_ready").replace("{n}", done.length)}</p>
      <button class="btn btn-primary" id="review-start">✨ ${t("review_start")}</button>
    </div>`;
    document.getElementById("review-start").addEventListener("click", () => startReview(mount, done));
    window.scrollTo(0, 0);
  }

  function startReview(mount, done) {
    /* pick up to 6 completed lessons at random for today's set */
    const pick = done.slice().sort(() => Math.random() - 0.5).slice(0, 6);
    const list = pick.map((x) => "- " + x.title + " (from " + x.course + ")").join("\n");
    mount.innerHTML = `<div class="panel"><p class="muted">⏳ ${t("review_making")}</p></div>`;
    window.AI.complete(
      "A student has completed these web-development lessons:\n" + list +
        '\n\nCreate 5 multiple-choice review questions testing the key ideas from these lessons. Reply with ONLY a JSON array, no markdown: [{"q":"question","options":["a","b","c","d"],"answer":0}] where answer is the index (0-3) of the correct option.',
      {
        system: "You are a kind quiz-maker for Myanmar teenagers learning web development. Use simple, clear English. Keep questions fair — not too hard, not trick questions.",
        maxTokens: 2000, temperature: 0.6,
      }
    ).then((raw) => {
      let qs;
      try { qs = JSON.parse(window.AI.stripFences(raw)); } catch (e) { throw new Error(t("ai_bad_reply")); }
      if (!Array.isArray(qs) || !qs.length) throw new Error(t("ai_bad_reply"));
      renderReviewQuiz(mount, qs);
    }).catch((err) => {
      const m = (err && err.message) || String(err);
      mount.innerHTML = `<div class="panel"><p class="muted" style="margin:0 0 10px">${m === "no-key" ? escapeHtml(t("ai_no_key")) : "⚠ AI: " + escapeHtml(m)}</p><button class="btn btn-outline btn-sm" id="review-retry">${t("review_start")}</button></div>`;
      const r = document.getElementById("review-retry");
      if (r) r.addEventListener("click", () => renderReview());
    });
  }

  function renderReviewQuiz(mount, qs) {
    qs = qs.map((q) => ({
      q: String(q.q || ""),
      options: (q.options || []).slice(0, 4).map(String),
      answer: Math.min(3, Math.max(0, Number(q.answer) || 0)),
    })).filter((q) => q.q && q.options.length >= 2).slice(0, 8);
    if (!qs.length) { mount.innerHTML = `<div class="panel"><p class="muted">${escapeHtml(t("ai_bad_reply"))}</p></div>`; return; }
    const html = qs.map((q, qi) => `
      <div class="q-block" data-q="${qi}">
        <div class="q">${qi + 1}. ${escapeHtml(q.q)}</div>
        ${q.options.map((opt, oi) =>
          `<label class="q-opt" data-opt="${oi}"><input type="radio" name="rq${qi}" value="${oi}"> <span>${escapeHtml(opt)}</span></label>`).join("")}
      </div>`).join("");
    mount.innerHTML = `<div class="quiz">${html}
      <div id="review-result"></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-primary" id="review-check">${t("check_answers")}</button>
        <button class="btn btn-outline" id="review-again">🔄 ${t("review_again")}</button>
      </div></div>`;
    document.getElementById("review-check").addEventListener("click", () => {
      let score = 0;
      qs.forEach((q, qi) => {
        const block = mount.querySelector(`.q-block[data-q="${qi}"]`);
        const picked = block.querySelector(`input[name="rq${qi}"]:checked`);
        block.querySelectorAll(".q-opt").forEach((o) => o.classList.remove("correct", "wrong"));
        const correctEl = block.querySelector(`.q-opt[data-opt="${q.answer}"]`);
        if (correctEl) correctEl.classList.add("correct");
        if (picked) {
          const pi = Number(picked.value);
          if (pi === q.answer) score++;
          else { const w = block.querySelector(`.q-opt[data-opt="${pi}"]`); if (w) w.classList.add("wrong"); }
        }
      });
      const pct = Math.round((score / qs.length) * 100);
      mount.querySelector("#review-result").innerHTML =
        `<div class="quiz-score ${pct >= 60 ? "pass" : "fail"}">${pct >= 60 ? "🎉" : "💪"} ${t("review_score").replace("{s}", score).replace("{t}", qs.length)}</div>`;
      bumpDayStreak(); /* reviewing counts as studying today */
      saveState();
    });
    document.getElementById("review-again").addEventListener("click", () => renderReview());
    window.scrollTo(0, 0);
  }

  function renderMyLearning() {
    const mine = COURSES.filter((c) => isEnrolled(c.id));
    const rows = mine
      .map((c) => {
        const pct = progressPct(c);
        const flat = lessonsOf(c);
        const done = completedSet(c.id);
        const nextLesson = (flat.find((x) => !done.has(x.lesson.id)) || flat[0]).lesson.id;
        const label = pct === 100 ? t("review") : pct > 0 ? t("continue") : t("start");
        const timeSpent = getTotalTimeSpent(c.id);
        return `
          <div class="myrow">
            <a class="mthumb" style="background:${c.color}" href="#/course/${c.id}">${c.icon}</a>
            <div>
              <h3>${cf(c, "title")}</h3>
              <p class="muted">${completedCount(c)} / ${flat.length} ${t("lessons_word")} · ${pct}% ${t("pct_complete_word")} · ⏱ ${formatTime(timeSpent)}</p>
              <div class="progress thin"><span style="width:${pct}%"></span></div>
            </div>
            <a class="btn btn-primary btn-sm" href="#/learn/${c.id}/${nextLesson}">${label}</a>
          </div>`;
      })
      .join("");
    app.innerHTML = `
      <div class="container">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h2 class="section-title">${t("dash_title")}</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn btn-outline btn-sm" href="#/review">🧠 ${t("review_title")}</a>
            <a class="btn btn-outline btn-sm" href="#/leaderboard">🏆 ${t("lb_title")}</a>
          </div>
        </div>
        ${statsHeader()}
        <h2 class="section-title">${t("my_learning")}</h2>
        ${
          mine.length
            ? `<p class="section-sub">${mine.length} ${t("enrolled_word")} · ${t("keep_going")}</p><div class="mylist">${rows}</div>`
            : `<div class="empty"><h2>${t("empty_title")}</h2><p>${t("empty_sub")}</p><a class="btn btn-primary" href="#/courses">${t("browse_courses")}</a></div>`
        }
        ${bookmarksSection()}
        ${recommendedSection()}
      </div>`;
  }

  function renderNotFound() {
    app.innerHTML = `
      <div class="container"><div class="empty">
        <h2>${t("notfound")}</h2>
        <a class="btn btn-primary" href="#/">${t("back_home")}</a>
      </div></div>`;
  }

  /* ---------------- View: My Account ---------------- */
  function renderAccount(flash) {
    const u = loggedIn() ? window.Auth.current() : null;
    if (!u) {
      location.hash = "#/";
      if (window.Auth) window.Auth.openModal("login");
      return;
    }
    const isLocal = u.provider === "local";
    app.innerHTML = `
      <div class="container" style="max-width:640px">
        <h2 class="section-title">${t("auth_account_title")}</h2>
        ${flash ? `<div class="account-flash">✓ ${flash}</div>` : ""}
        <div class="panel">
          <h2>${t("auth_display_name")}</h2>
          <form id="profile-form" class="auth-form">
            <label>${t("auth_display_name")}</label>
            <input name="name" type="text" value="${escapeHtml(u.name || "")}">
            <label>${t("auth_email")}</label>
            <input type="email" value="${escapeHtml(u.email || "")}" disabled>
            <div class="auth-err" hidden></div>
            <button class="btn btn-primary" type="submit" style="margin-top:16px">${t("auth_save_changes")}</button>
          </form>
        </div>
        ${
          isLocal
            ? `<div class="panel">
                 <h2>${t("auth_change_password")}</h2>
                 <form id="password-form" class="auth-form">
                   <label>${t("auth_current_password")}</label>
                   <input name="current" type="password" autocomplete="current-password">
                   <label>${t("auth_new_password")}</label>
                   <input name="next" type="password" autocomplete="new-password">
                   <div class="auth-err" hidden></div>
                   <button class="btn btn-dark" type="submit" style="margin-top:16px">${t("auth_update_password")}</button>
                 </form>
               </div>`
            : `<div class="panel"><p class="muted">${t("auth_google_account_note")}</p></div>`
        }
        <div class="panel">
          <h2>${t("data_title")}</h2>
          <p class="muted">${t("data_desc")}</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
            <button class="btn btn-outline btn-sm" id="transcript-export" type="button">${t("transcript_export")}</button>
            <button class="btn btn-outline btn-sm" id="data-export" type="button">${t("data_export")}</button>
            <label class="btn btn-outline btn-sm" style="cursor:pointer;margin:0">${t("data_import")}
              <input type="file" id="data-import" accept="application/json" hidden></label>
            <span id="data-msg" class="muted"></span>
          </div>
        </div>
      </div>`;

    const texp = app.querySelector("#transcript-export");
    if (texp) texp.addEventListener("click", exportTranscript);
    const exp = app.querySelector("#data-export");
    if (exp) exp.addEventListener("click", exportData);
    const imp = app.querySelector("#data-import");
    if (imp) imp.addEventListener("change", () => {
      const f = imp.files && imp.files[0];
      if (!f) return;
      importData(f, (ok) => {
        const msg = app.querySelector("#data-msg");
        if (msg) msg.textContent = ok ? t("data_imported") : t("data_import_err");
        if (ok) setTimeout(() => location.reload(), 900);
      });
    });

    const pf = app.querySelector("#profile-form");
    pf.addEventListener("submit", (e) => {
      e.preventDefault();
      const err = pf.querySelector(".auth-err");
      Promise.resolve(window.Auth.updateProfile(new FormData(pf).get("name"))).then((res) => {
        if (res && res.error) { err.textContent = res.error; err.hidden = false; }
        else renderAccount(t("auth_profile_saved"));
      });
    });
    const cpf = app.querySelector("#password-form");
    if (cpf) {
      cpf.addEventListener("submit", (e) => {
        e.preventDefault();
        const d = new FormData(cpf);
        const err = cpf.querySelector(".auth-err");
        Promise.resolve(window.Auth.changePassword(d.get("current"), d.get("next"))).then((res) => {
          if (res && res.error) { err.textContent = res.error; err.hidden = false; }
          else renderAccount(t("auth_password_updated"));
        });
      });
    }
    window.scrollTo(0, 0);
  }

  /* ---------------- Reviews ---------------- */
  const reviewsKey = (id) => REVIEW_PREFIX + "::" + id;
  function loadReviews(id) { try { return JSON.parse(localStorage.getItem(reviewsKey(id))) || []; } catch (e) { return []; } }
  function saveReviews(id, list) { localStorage.setItem(reviewsKey(id), JSON.stringify(list)); }
  function reviewAvg(id) { const l = loadReviews(id); return l.length ? l.reduce((a, r) => a + r.rating, 0) / l.length : null; }
  function addReview(id, rating, text) {
    const u = loggedIn() ? window.Auth.current() : null;
    if (!u) return;
    const list = loadReviews(id);
    const label = (u.name || u.email || "?").trim();
    const rev = {
      userId: u.id, name: label.split(" ")[0], initial: label.charAt(0).toUpperCase(),
      rating: Math.max(1, Math.min(5, rating | 0)), text: (text || "").slice(0, 600), ts: Date.now(),
    };
    const i = list.findIndex((r) => r.userId === u.id);
    if (i >= 0) list[i] = rev; else list.push(rev);
    saveReviews(id, list);
  }

  function reviewsPanel(c) {
    const list = loadReviews(c.id);
    const avg = reviewAvg(c.id);
    const u = loggedIn() ? window.Auth.current() : null;
    const mine = u ? list.find((r) => r.userId === u.id) : null;
    const items = list.length
      ? list.slice().sort((a, b) => b.ts - a.ts).map((r) => `
          <div class="review">
            <span class="chat-avatar">${escapeHtml(r.initial || "?")}</span>
            <div>
              <div class="review-head"><strong>${escapeHtml(r.name || "")}</strong> ${stars(r.rating)}</div>
              ${r.text ? `<div class="review-text">${escapeHtml(r.text)}</div>` : ""}
            </div>
          </div>`).join("")
      : `<p class="muted">${t("reviews_none")}</p>`;
    const form = u
      ? `<form id="review-form" class="review-form">
           <div class="review-stars" id="review-stars" data-val="${mine ? mine.rating : 0}">
             ${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="rstar" data-star="${n}">★</button>`).join("")}
           </div>
           <textarea name="text" rows="2" placeholder="${escapeHtml(t("reviews_placeholder"))}">${mine ? escapeHtml(mine.text || "") : ""}</textarea>
           <button class="btn btn-primary btn-sm" type="submit">${t("reviews_submit")}</button>
         </form>`
      : `<button class="btn btn-outline btn-sm" id="review-login">${t("reviews_login")}</button>`;
    return `
      <div class="panel">
        <h2>${t("reviews_title")}${avg ? ` <span class="muted" style="font-size:15px">— ${avg.toFixed(1)}★ (${list.length} ${t("reviews_word")})</span>` : ""}</h2>
        ${form}
        <div class="review-list">${items}</div>
      </div>`;
  }
  function wireReviews(c) {
    const box = app.querySelector("#review-stars");
    if (box) {
      const paint = (v) => box.querySelectorAll(".rstar").forEach((b, i) => b.classList.toggle("on", i < v));
      paint(Number(box.dataset.val || 0));
      box.querySelectorAll(".rstar").forEach((b) =>
        b.addEventListener("click", () => { box.dataset.val = b.dataset.star; paint(Number(b.dataset.star)); }));
    }
    const form = app.querySelector("#review-form");
    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      const rating = Number(app.querySelector("#review-stars").dataset.val || 0);
      if (!rating) return;
      addReview(c.id, rating, new FormData(form).get("text"));
      renderCourse(c.id);
    });
    const rl = app.querySelector("#review-login");
    if (rl) rl.addEventListener("click", () => { if (window.Auth) window.Auth.openModal("login"); });
  }

  /* ---------------- View: Certificate ---------------- */
  /* Draw the certificate on a canvas so students can download a PNG
     (phones can't print — an image is shareable on Facebook etc.) */
  function drawCertPng(name, courseTitle, meta, dateStr, certId) {
    const W = 1400, H = 990;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const x = cv.getContext("2d");
    const FAM = "Georgia, 'Myanmar Text', 'Padauk', serif";
    const fit = (text, style, base, maxW) => {
      let size = base;
      x.font = style + " " + size + "px " + FAM;
      while (x.measureText(text).width > maxW && size > 20) {
        size -= 2;
        x.font = style + " " + size + "px " + FAM;
      }
    };
    x.fillStyle = "#fffdf7"; x.fillRect(0, 0, W, H);
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#654ea3"); g.addColorStop(1, "#eaafc8");
    x.strokeStyle = g; x.lineWidth = 18; x.strokeRect(24, 24, W - 48, H - 48);
    x.strokeStyle = "#d9cff2"; x.lineWidth = 2; x.strokeRect(48, 48, W - 96, H - 96);
    x.textAlign = "center";
    x.fillStyle = "#654ea3"; x.font = "bold 34px " + FAM;
    x.fillText("</> WebDev Academy", W / 2, 135);
    x.fillStyle = "#1a1a2e"; fit(t("cert_title"), "bold", 62, W - 260);
    x.fillText(t("cert_title"), W / 2, 245);
    x.fillStyle = "#777"; x.font = "26px " + FAM;
    x.fillText(t("cert_intro"), W / 2, 325);
    x.fillStyle = "#654ea3"; fit(name, "italic bold", 74, W - 300);
    x.fillText(name, W / 2, 435);
    x.strokeStyle = "#eaafc8"; x.lineWidth = 3;
    x.beginPath(); x.moveTo(W / 2 - 330, 465); x.lineTo(W / 2 + 330, 465); x.stroke();
    x.fillStyle = "#777"; x.font = "26px " + FAM;
    x.fillText(t("cert_completed"), W / 2, 528);
    x.fillStyle = "#1a1a2e"; fit(courseTitle, "bold", 46, W - 260);
    x.fillText(courseTitle, W / 2, 600);
    x.fillStyle = "#8a8a99"; x.font = "24px " + FAM;
    x.fillText(meta, W / 2, 660);
    x.fillText(dateStr, W / 2, 800);
    x.fillStyle = "#b0b0bd"; x.font = "18px " + FAM;
    x.fillText(t("cert_id") + ": " + certId + " · myominthet99.github.io/webdev-academy", W / 2, 860);
    x.beginPath(); x.arc(W - 190, H - 195, 66, 0, Math.PI * 2);
    x.fillStyle = "#654ea3"; x.fill();
    x.fillStyle = "#fff"; x.font = "bold 60px Arial";
    x.fillText("✓", W - 190, H - 174);
    return cv;
  }

  function renderCertificate(courseId) {
    const c = courseById(courseId);
    if (!c) return renderNotFound();
    if (progressPct(c) < 100) {
      app.innerHTML = `<div class="container"><div class="empty">
        <h2>${t("cert_locked")}</h2>
        <a class="btn btn-primary" href="#/course/${c.id}">${t("cert_back")}</a></div></div>`;
      return;
    }
    const u = loggedIn() ? window.Auth.current() : null;
    const name = u ? (u.name || u.email) : "Guest";
    const certId = "WDA-" + (function (s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36).toUpperCase(); })((u ? u.id : "guest") + "|" + c.id);
    let dateStr;
    try { dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); }
    catch (e) { dateStr = ""; }
    app.innerHTML = `
      <div class="container cert-wrap">
        <div class="cert" id="cert">
          <div class="cert-brand">&lt;/&gt; WebDev Academy</div>
          <div class="cert-h">${t("cert_title")}</div>
          <p class="cert-line">${t("cert_intro")}</p>
          <div class="cert-name">${escapeHtml(name)}</div>
          <p class="cert-line">${t("cert_completed")}</p>
          <div class="cert-course">${escapeHtml(cf(c, "title"))}</div>
          <div class="cert-date">${dateStr}</div>
          <div class="cert-id">${t("cert_id")}: ${certId}</div>
          <div class="cert-seal">✓</div>
        </div>
        <div class="cert-actions no-print">
          <a class="btn btn-outline" href="#/course/${c.id}">${t("cert_back")}</a>
          <button class="btn btn-outline" id="cert-copy" type="button">${t("cert_copy")}</button>
          <button class="btn btn-outline" id="cert-print" type="button">${t("cert_print")}</button>
          <button class="btn btn-primary" id="cert-dl" type="button">⬇ ${t("cert_download")}</button>
        </div>
      </div>`;
    const p = app.querySelector("#cert-print");
    if (p) p.addEventListener("click", () => window.print());
    const dl = app.querySelector("#cert-dl");
    if (dl) dl.addEventListener("click", () => {
      const meta = totalLessons(c) + " " + t("lessons_word") + " · " + c.hours + " " + t("hours_content");
      const cv = drawCertPng(name, cf(c, "title"), meta, dateStr, certId);
      const a = document.createElement("a");
      a.href = cv.toDataURL("image/png");
      a.download = "WebDevAcademy-Certificate-" + c.id + ".png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
    const cp = app.querySelector("#cert-copy");
    if (cp) cp.addEventListener("click", () => {
      const link = location.origin + location.pathname + "#/certificate/" + c.id;
      const ok = () => { cp.textContent = t("cert_copied"); };
      if (navigator.clipboard) navigator.clipboard.writeText(link).then(ok).catch(ok);
      else ok();
    });
    window.scrollTo(0, 0);
  }

  /* ---------------- View: Admin (create/manage courses) ---------------- */
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "course";

  /* Standard lesson skeleton: Intro → Summary → Example → Practice */
  const LESSON_TEMPLATE = `<h3>🎯 Intro</h3>
<p>What this lesson covers and why it matters.</p>

<h3>📝 Summary</h3>
<ul>
  <li>Key point 1</li>
  <li>Key point 2</li>
  <li>Key point 3</li>
</ul>

<h3>💻 Example</h3>
<pre><code>&lt;!-- paste your example code here (escape < as &amp;lt;) --&gt;</code></pre>

<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> describe the exercise the student should complete before moving on.</div>`;
  function qRowHtml(q) {
    q = q || {};
    const opts = q.options || ["", "", "", ""];
    return `<div class="q-row">
      <input name="qtext" placeholder="${escapeHtml(t("admin_question"))}" value="${q.q ? escapeHtml(q.q) : ""}">
      ${[0, 1, 2, 3].map((i) => `<input name="qopt" placeholder="${escapeHtml(t("admin_option"))} ${i + 1}" value="${opts[i] ? escapeHtml(opts[i]) : ""}">`).join("")}
      <label class="q-correct">${t("admin_correct")}
        <select name="qcorrect">${[1, 2, 3, 4].map((n) => `<option value="${n - 1}" ${q.answer === n - 1 ? "selected" : ""}>${n}</option>`).join("")}</select>
      </label>
      <button type="button" class="chat-del" data-rm-q>🗑</button>
    </div>`;
  }
  function lessonRowHtml(l) {
    l = l || {};
    const type = l.type || "video";
    const types = [["video", t("type_video")], ["article", t("type_article")], ["quiz", t("type_quiz")]];
    return `<div class="admin-lesson" data-type="${type}">
      <input type="hidden" name="lid" value="${l.id ? escapeHtml(l.id) : ""}">
      <div class="admin-row">
        <input name="ltitle" placeholder="${escapeHtml(t("admin_ltitle"))}" value="${l.title ? escapeHtml(l.title) : ""}">
        <select name="ltype">${types.map(([v, lab]) => `<option value="${v}" ${type === v ? "selected" : ""}>${lab}</option>`).join("")}</select>
        <input name="ldur" placeholder="e.g. 8 min" value="${l.duration && l.duration !== "Quiz" ? escapeHtml(l.duration) : ""}">
        <span class="admin-move">
          <button type="button" class="mv" data-move="up" title="Move up">▲</button>
          <button type="button" class="mv" data-move="down" title="Move down">▼</button>
        </span>
      </div>
      <div class="lesson-av">
        <div class="video-src-row">
          <input name="lvideo" placeholder="${escapeHtml(t("admin_lvideo"))}" value="${l.src ? escapeHtml(l.src) : ""}">
          <label class="btn btn-outline btn-sm upload-btn">📁 ${t("admin_upload_video")}
            <input type="file" accept="video/*" hidden data-video-file></label>
          <span class="upload-status muted"></span>
        </div>
        <div class="admin-toolbar">
          <button type="button" data-fmt="h3" title="Heading">H3</button>
          <button type="button" data-fmt="b" title="Bold"><b>B</b></button>
          <button type="button" data-fmt="code" title="Inline code">&lt;/&gt;</button>
          <button type="button" data-fmt="pre" title="Code block">▤</button>
          <button type="button" data-fmt="tip" title="Tip box">💡</button>
          <button type="button" data-fmt="ul" title="Bullet list">≡</button>
          <span class="tb-gap"></span>
          <button type="button" class="btn btn-outline btn-sm" data-ai>✨ ${t("admin_ai_write")}</button>
          <button type="button" class="btn btn-outline btn-sm" data-template>📋 ${t("admin_use_template")}</button>
          <button type="button" class="btn btn-outline btn-sm" data-preview>👁 ${t("admin_preview")}</button>
        </div>
        <textarea name="lnotes" rows="6" placeholder="${escapeHtml(t("admin_lnotes"))}">${l.content && l.content !== "<p></p>" ? escapeHtml(l.content) : ""}</textarea>
        <div class="reader lesson-preview" hidden></div>
      </div>
      <div class="lesson-quiz">
        <div class="q-list">${(l.questions || []).map(qRowHtml).join("") || qRowHtml()}</div>
        <button type="button" class="btn btn-outline btn-sm" data-add-q>${t("admin_add_question")}</button>
      </div>
      <button type="button" class="chat-del admin-rm-lesson" data-rm-lesson>🗑</button>
    </div>`;
  }
  function sectionBlockHtml(sec) {
    sec = sec || {};
    return `<div class="admin-section">
      <div class="admin-row">
        <input name="stitle" placeholder="${escapeHtml(t("admin_section"))}" value="${sec.title ? escapeHtml(sec.title) : ""}">
        <span class="admin-move">
          <button type="button" class="mv" data-sec-move="up" title="Move up">▲</button>
          <button type="button" class="mv" data-sec-move="down" title="Move down">▼</button>
        </span>
        <button type="button" class="chat-del" data-rm-section>🗑</button>
      </div>
      <div class="admin-lessons">${(sec.lessons || []).map(lessonRowHtml).join("") || lessonRowHtml()}</div>
      <button type="button" class="btn btn-outline btn-sm" data-add-lesson>${t("admin_addlesson")}</button>
    </div>`;
  }
  /* Admin: review KBZPay payment claims, grant/revoke premium */
  function renderAdminPayments() {
    const base = statsBase();
    app.innerHTML = `
      <div class="container" style="max-width:760px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h2 class="section-title">💳 ${t("admin_payments")}</h2>
          <a class="btn btn-outline btn-sm" href="#/admin/dashboard">📊 ${t("dash_admin_title")}</a>
        </div>
        <div id="pay-list"><div class="empty"><h2>⏳</h2></div></div>
      </div>`;
    const mount = document.getElementById("pay-list");
    if (!base) { mount.innerHTML = `<div class="empty"><h2>${t("lb_offline")}</h2></div>`; return; }
    fetch(base + "/payments.json").then((r) => r.json()).then((val) => {
      const rows = Object.entries(val || {})
        .map(([key, p]) => Object.assign({ key }, p))
        .sort((a, b) => (b.ts || 0) - (a.ts || 0));
      if (!rows.length) {
        mount.innerHTML = `<div class="empty"><h2>${t("admin_no_payments")}</h2></div>`;
        return;
      }
      mount.innerHTML = rows.map((p) => `
        <div class="panel" style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;align-items:center">
            <div>
              <strong>${escapeHtml(p.name || "?")}</strong> · ${escapeHtml(p.email || "")}<br>
              <span class="muted" style="font-size:13px">KBZPay: ${escapeHtml(p.phone || "")} · ${t("prem_txn_label")}: ${escapeHtml(p.txn || "")} · ${new Date(p.ts || 0).toLocaleString()}</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              ${p.status === "pending"
                ? `<button class="btn btn-primary btn-sm" data-approve="${escapeHtml(p.key)}" data-email="${escapeHtml(p.email || "")}">✓ ${t("admin_approve")}</button>
                   <button class="btn btn-outline btn-sm" data-reject="${escapeHtml(p.key)}">✕ ${t("admin_reject")}</button>`
                : `<span class="role-badge" style="background:${p.status === "approved" ? "var(--green)" : "#888"}">${escapeHtml(p.status)}</span>`}
            </div>
          </div>
        </div>`).join("");
      const setStatus = (key, status) =>
        fetch(base + "/payments/" + encodeURIComponent(key) + "/status.json", { method: "PUT", body: JSON.stringify(status) });
      mount.querySelectorAll("[data-approve]").forEach((b) =>
        b.addEventListener("click", () => {
          const email = b.getAttribute("data-email");
          fetch(base + "/premium/" + emailKey(email) + ".json", {
            method: "PUT",
            body: JSON.stringify({ since: Date.now(), by: (window.Auth.current() || {}).email || "admin" }),
          })
            .then(() => setStatus(b.getAttribute("data-approve"), "approved"))
            .then(() => renderAdminPayments())
            .catch(() => alert(t("chat_send_err")));
        })
      );
      mount.querySelectorAll("[data-reject]").forEach((b) =>
        b.addEventListener("click", () => {
          setStatus(b.getAttribute("data-reject"), "rejected").then(() => renderAdminPayments()).catch(() => {});
        })
      );
    }).catch(() => { mount.innerHTML = `<div class="empty"><h2>${t("lb_offline")}</h2></div>`; });
  }

  /* Admin dashboard: one page of stats pulled from Firebase — students,
     premium members, pending payments, most-popular courses, top learners */
  function renderAdminDashboard() {
    const base = statsBase();
    app.innerHTML = `
      <div class="container" style="max-width:900px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h2 class="section-title">📊 ${t("dash_admin_title")}</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn btn-outline btn-sm" href="#/admin">✏️ ${t("admin_title")}</a>
            <a class="btn btn-outline btn-sm" href="#/admin/payments">💳 ${t("admin_payments")}</a>
          </div>
        </div>
        <div id="dash-body"><div class="empty"><h2>⏳</h2></div></div>
      </div>`;
    const mount = document.getElementById("dash-body");
    if (!base) { mount.innerHTML = `<div class="empty"><h2>${t("lb_offline")}</h2></div>`; return; }
    Promise.all([
      fetch(base + "/stats/leaderboard.json").then((r) => r.json()).catch(() => ({})),
      fetch(base + "/stats/courses.json").then((r) => r.json()).catch(() => ({})),
      fetch(base + "/payments.json").then((r) => r.json()).catch(() => ({})),
      fetch(base + "/premium.json").then((r) => r.json()).catch(() => ({})),
      fetch(base + "/stats/announcement.json").then((r) => r.json()).catch(() => null),
    ]).then(([lb, courses, payments, premium, announce]) => {
      const students = Object.values(lb || {}).filter((x) => x && (Number(x.xp) || 0) > 0);
      const active = students.filter((x) => (Number(x.streak) || 0) > 0).length;
      const premMembers = Object.keys(premium || {}).length;
      const payArr = Object.values(payments || {}).filter(Boolean);
      const pending = payArr.filter((p) => p.status === "pending").length;
      const approved = payArr.filter((p) => p.status === "approved").length;
      /* revenue estimate from approved claims × current promo price */
      const revenue = approved * (PAYMENT_CONFIG.price || 0);

      /* most popular courses by total views across all days */
      const pop = Object.entries(courses || {}).map(([cid, days]) => {
        const views = Object.values(days || {}).reduce((a, n) => a + (Number(n) || 0), 0);
        const c = courseById(cid);
        return { cid, title: c ? c.title : cid, icon: c ? c.icon : "📘", views };
      }).filter((x) => x.views > 0).sort((a, b) => b.views - a.views).slice(0, 8);

      const topStudents = students.slice().sort((a, b) => (Number(b.xp) || 0) - (Number(a.xp) || 0)).slice(0, 8);

      const card = (icon, num, label) =>
        `<div class="adash-card"><div class="adash-ic">${icon}</div><div class="adash-num">${num}</div><div class="adash-lbl">${label}</div></div>`;

      mount.innerHTML = `
        <div class="adash-grid">
          ${card("👥", students.length, t("dash_students"))}
          ${card("🔥", active, t("dash_active"))}
          ${card("⭐", premMembers, t("dash_members"))}
          ${card("⏳", pending, t("dash_pending"))}
          ${card("✅", approved, t("dash_approved"))}
          ${card("💰", fmt(revenue) + " Ks", t("dash_revenue"))}
        </div>
        ${pending ? `<div style="margin:10px 0"><a class="btn btn-primary btn-sm" href="#/admin/payments">💳 ${t("dash_review_pending").replace("{n}", pending)}</a></div>` : ""}
        <div class="panel">
          <h3>📢 ${t("ann_title")}</h3>
          <p class="muted" style="margin:0 0 8px;font-size:13px">${t("ann_help")}</p>
          <textarea id="ann-text" rows="2" maxlength="300" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:8px;font-family:inherit">${escapeHtml((announce && announce.text) || "")}</textarea>
          <div style="display:flex;gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap">
            <button class="btn btn-primary btn-sm" id="ann-post">${t("ann_post")}</button>
            <button class="btn btn-outline btn-sm" id="ann-clear">${t("ann_clear")}</button>
            <span class="muted" id="ann-status" style="font-size:13px"></span>
          </div>
        </div>
        <div class="adash-cols">
          <div class="panel">
            <h3>🔥 ${t("dash_popular")}</h3>
            ${pop.length ? `<div class="adash-list">${pop.map((c) =>
              `<div class="adash-row"><a href="#/course/${c.cid}"><span>${c.icon}</span> ${escapeHtml(c.title)}</a><b>${c.views} ${t("dash_views")}</b></div>`).join("")}</div>`
              : `<p class="muted">${t("dash_none")}</p>`}
          </div>
          <div class="panel">
            <h3>🏆 ${t("dash_top_students")}</h3>
            ${topStudents.length ? `<div class="adash-list">${topStudents.map((s, i) =>
              `<div class="adash-row"><span>${i + 1}. ${escapeHtml(String(s.name || "?").slice(0, 30))}</span><b>⚡ ${Number(s.xp) || 0} · 📗 ${Number(s.lessons) || 0}</b></div>`).join("")}</div>`
              : `<p class="muted">${t("dash_none")}</p>`}
          </div>
        </div>
        <p class="muted" style="font-size:12px">${t("dash_note")}</p>`;

      /* announcement post/clear */
      const annStatus = document.getElementById("ann-status");
      const setAnn = (body, msg) =>
        fetch(base + "/stats/announcement.json", { method: "PUT", body: JSON.stringify(body) })
          .then((r) => { if (!r.ok) throw new Error("write"); if (annStatus) annStatus.textContent = msg; loadAnnouncement(); })
          .catch(() => { if (annStatus) annStatus.textContent = t("ann_err"); });
      const postBtn = document.getElementById("ann-post");
      if (postBtn) postBtn.addEventListener("click", () => {
        const text = (document.getElementById("ann-text").value || "").trim().slice(0, 300);
        if (!text) { if (annStatus) annStatus.textContent = t("ann_empty"); return; }
        setAnn({ text, ts: Date.now() }, "✓ " + t("ann_posted"));
      });
      const clearBtn = document.getElementById("ann-clear");
      if (clearBtn) clearBtn.addEventListener("click", () => {
        document.getElementById("ann-text").value = "";
        setAnn(null, "✓ " + t("ann_cleared"));
      });
    }).catch(() => { mount.innerHTML = `<div class="empty"><h2>${t("lb_offline")}</h2></div>`; });
    window.scrollTo(0, 0);
  }

  function renderAdmin(editId) {
    if (!loggedIn()) { location.hash = "#/"; if (window.Auth) window.Auth.openModal("login"); return; }
    if (!(window.Auth && window.Auth.isAdmin && window.Auth.isAdmin())) {
      app.innerHTML = `
        <div class="container"><div class="empty">
          <h2>🔒 ${t("admin_only")}</h2>
          <p>${t("admin_only_sub")}</p>
          <a class="btn btn-primary" href="#/">${t("back_home")}</a>
        </div></div>`;
      return;
    }
    if (editId === "dashboard") return renderAdminDashboard();
    if (editId === "payments") return renderAdminPayments();
    const custom = loadCustomCourses();
    const editing = editId ? custom.find((c) => c.id === editId) : null;
    const cats = CATEGORIES.filter((c) => c !== "All");
    const levels = ["Beginner", "Intermediate", "All Levels"];
    const initialSections = editing && editing.sections && editing.sections.length ? editing.sections : [{ title: "Lessons", lessons: [] }];
    app.innerHTML = `
      <div class="container" style="max-width:860px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h2 class="section-title">${t("admin_title")}</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn btn-outline btn-sm" href="#/admin/dashboard">📊 ${t("dash_admin_title")}</a>
            <a class="btn btn-outline btn-sm" href="#/admin/payments">💳 ${t("admin_payments")}</a>
          </div>
        </div>
        <div class="panel">
          <form id="admin-form" class="auth-form">
            <label>${t("admin_ftitle")}</label>
            <input name="title" value="${editing ? escapeHtml(editing.title) : ""}">
            <label>${t("admin_fsub")}</label>
            <input name="subtitle" value="${editing ? escapeHtml(editing.subtitle || "") : ""}">
            <div class="admin-row">
              <div><label>${t("admin_fcat")}</label>
                <select name="category">${cats.map((x) => `<option ${editing && editing.category === x ? "selected" : ""}>${x}</option>`).join("")}</select></div>
              <div><label>${t("admin_flevel")}</label>
                <select name="level">${levels.map((x) => `<option ${editing && editing.level === x ? "selected" : ""}>${x}</option>`).join("")}</select></div>
              <div><label>${t("admin_ficon")}</label>
                <input name="icon" maxlength="4" value="${editing ? escapeHtml(editing.icon || "📘") : "📘"}"></div>
            </div>
            <div class="admin-row">
              <div><label>${t("admin_finst")}</label>
                <input name="instructor" value="${editing ? escapeHtml(editing.instructor || "") : ""}" placeholder="${escapeHtml((window.Auth.current() || {}).name || "")}"></div>
              <div><label>${t("admin_fhours")}</label>
                <input name="hours" type="number" min="1" step="0.5" value="${editing && editing.hours ? editing.hours : ""}"></div>
              <div><label>${t("admin_colors")}</label>
                <span class="admin-colors">
                  <input name="color1" type="color" value="${(editing && (String(editing.color).match(/#[0-9a-fA-F]{6}/g) || [])[0]) || "#654ea3"}">
                  <input name="color2" type="color" value="${(editing && (String(editing.color).match(/#[0-9a-fA-F]{6}/g) || [])[1]) || "#eaafc8"}">
                </span></div>
            </div>
            <div class="card-prev" id="card-prev"><span id="card-prev-icon"></span><b id="card-prev-title"></b></div>
            <label>${t("admin_image")}</label>
            <input name="image" value="${editing && editing.image ? escapeHtml(editing.image) : ""}">
            <label>${t("admin_fdesc")}</label>
            <textarea name="description" rows="3">${editing ? escapeHtml(editing.description || "") : ""}</textarea>
            <label>${t("admin_flearn")}</label>
            <textarea name="learn" rows="3" placeholder="${escapeHtml(t("admin_flearn_ph"))}">${editing && editing.whatYouLearn ? escapeHtml(editing.whatYouLearn.join("\n")) : ""}</textarea>
            <label class="admin-check"><input type="checkbox" name="free" ${!editing || editing.free !== false ? "checked" : ""}> ${t("admin_ffree")}</label>
            <h3 style="margin:18px 0 6px">${t("admin_lessons")}</h3>
            <div id="admin-sections">${initialSections.map(sectionBlockHtml).join("")}</div>
            <button type="button" class="btn btn-outline btn-sm" id="add-section">${t("admin_add_section")}</button>
            <div class="auth-err" hidden></div>
            <div style="margin-top:18px"><button class="btn btn-primary" type="submit">${t("admin_save")}</button></div>
          </form>
        </div>
        <h3 class="section-title">${t("admin_your")}</h3>
        ${custom.length
          ? `<div class="mylist">${custom.map((c) => `
              <div class="myrow">
                <a class="mthumb" style="background:${c.color || "#654ea3"}" href="#/course/${c.id}">${c.icon || "📘"}</a>
                <div><h3>${escapeHtml(c.title)}</h3><p class="muted">${(c.sections || []).reduce((a, s) => a + s.lessons.length, 0)} ${t("lessons_word")}</p></div>
                <div style="display:flex;gap:8px">
                  <a class="btn btn-outline btn-sm" href="#/admin/${c.id}">${t("admin_edit")}</a>
                  <button class="btn btn-ghost btn-sm" data-del-course="${c.id}">${t("admin_delete")}</button>
                </div>
              </div>`).join("")}</div>`
          : `<p class="muted">${t("admin_none")}</p>`}
      </div>`;

    const form = app.querySelector("#admin-form");
    const sectionsC = app.querySelector("#admin-sections");
    app.querySelector("#add-section").addEventListener("click", () => sectionsC.insertAdjacentHTML("beforeend", sectionBlockHtml()));

    form.addEventListener("click", (e) => {
      const al = e.target.closest("[data-add-lesson]");
      if (al) { al.previousElementSibling.insertAdjacentHTML("beforeend", lessonRowHtml()); return; }
      const rl = e.target.closest("[data-rm-lesson]");
      if (rl) { const box = rl.closest(".admin-lessons"); if (box.querySelectorAll(".admin-lesson").length > 1) rl.closest(".admin-lesson").remove(); return; }
      const rs = e.target.closest("[data-rm-section]");
      if (rs) { if (sectionsC.querySelectorAll(".admin-section").length > 1) rs.closest(".admin-section").remove(); return; }
      const aq = e.target.closest("[data-add-q]");
      if (aq) { aq.previousElementSibling.insertAdjacentHTML("beforeend", qRowHtml()); return; }
      const rq = e.target.closest("[data-rm-q]");
      if (rq) { const list = rq.closest(".q-list"); if (list.querySelectorAll(".q-row").length > 1) rq.closest(".q-row").remove(); return; }
      const tp = e.target.closest("[data-template]");
      if (tp) {
        const ta = tp.closest(".lesson-av").querySelector('textarea[name="lnotes"]');
        if (ta && (!ta.value.trim() || confirm(t("admin_template_confirm")))) ta.value = LESSON_TEMPLATE;
        return;
      }
      /* ✨ AI: draft the lesson from the course + lesson titles (free Gemini) */
      const aiBtn = e.target.closest("[data-ai]");
      if (aiBtn) {
        if (!window.AI) { alert(t("ai_no_key")); return; }
        const row = aiBtn.closest(".admin-lesson");
        const ta = row.querySelector('textarea[name="lnotes"]');
        const ltitle = row.querySelector('input[name="ltitle"]').value.trim();
        const ltype = row.querySelector('select[name="ltype"]').value;
        const ctitle = form.querySelector('input[name="title"]').value.trim();
        if (!ltitle) { alert(t("ai_need_title")); return; }
        if (ltype !== "quiz" && ta.value.trim() && !confirm(t("admin_template_confirm"))) return;
        const oldLabel = aiBtn.textContent;
        aiBtn.disabled = true;
        aiBtn.textContent = "✨ " + t("ai_working");
        const sys =
          "You write lessons for WebDev Academy, a free web-development school for Myanmar teenagers (ages 12-18, English is their second language). Use short sentences and simple English.";
        const done = () => { aiBtn.disabled = false; aiBtn.textContent = oldLabel; };
        const aiErr = (err) => {
          const m = (err && err.message) || String(err);
          alert(m === "no-key" ? t("ai_no_key") : "AI: " + m);
        };
        if (ltype === "quiz") {
          window.AI.complete(
            'Course: "' + (ctitle || "Web Development") + '". Create 5 multiple-choice quiz questions for the lesson "' + ltitle +
              '". Reply with ONLY a JSON array, no markdown: [{"q":"question text","options":["a","b","c","d"],"answer":0}] where answer is the index (0-3) of the correct option.',
            { system: sys, maxTokens: 2048, temperature: 0.5 }
          ).then((raw) => {
            let qs;
            try { qs = JSON.parse(window.AI.stripFences(raw)); } catch (err) { throw new Error(t("ai_bad_reply")); }
            if (!Array.isArray(qs) || !qs.length) throw new Error(t("ai_bad_reply"));
            const list = row.querySelector(".q-list");
            list.innerHTML = qs.slice(0, 10).map((q) =>
              qRowHtml({
                q: String(q.q || ""),
                options: (q.options || []).slice(0, 4).map(String),
                /* clamp to a valid option index — models sometimes return 4+ */
                answer: Math.min(3, Math.max(0, Number(q.answer) || 0)),
              })
            ).join("");
          }).catch(aiErr).finally(done);
        } else {
          window.AI.complete(
            'Course: "' + (ctitle || "Web Development") + '". Write the lesson "' + ltitle + '".' +
              (ltype === "video" ? " This lesson accompanies a video — write supporting notes the student reads after watching." : "") +
              ' Output plain HTML only (no markdown, no <html> or <body>). Allowed tags: <h3>, <p>, <ul>, <li>, <strong>, <code>, <pre><code>, and <div class="callout tip">. ' +
              'Structure: short intro paragraph, then "🔑 Key Points" (h3 + bullet list), then "💻 Example" (h3 + code block with a short explanation), then a practice task inside <div class="callout tip"><strong>Try it yourself:</strong> ...</div>. Keep it 250-450 words.',
            { system: sys, maxTokens: 3000 }
          ).then((html) => {
            ta.value = window.AI.stripFences(html);
            const box = row.querySelector(".lesson-preview");
            box.hidden = false;
            box.innerHTML = ta.value;
          }).catch(aiErr).finally(done);
        }
        return;
      }
      /* formatting toolbar: wrap the selection in HTML */
      const fmt = e.target.closest("[data-fmt]");
      if (fmt) {
        const ta = fmt.closest(".lesson-av").querySelector('textarea[name="lnotes"]');
        const wraps = {
          h3: ["<h3>", "</h3>\n"],
          b: ["<strong>", "</strong>"],
          code: ["<code>", "</code>"],
          pre: ["\n<pre><code>", "</code></pre>\n"],
          tip: ['\n<div class="callout tip"><strong>Tip:</strong> ', "</div>\n"],
          ul: ["\n<ul>\n  <li>", "</li>\n</ul>\n"],
        };
        const w = wraps[fmt.getAttribute("data-fmt")];
        if (ta && w) {
          const s = ta.selectionStart, en = ta.selectionEnd;
          const sel = ta.value.slice(s, en) || "text";
          ta.value = ta.value.slice(0, s) + w[0] + sel + w[1] + ta.value.slice(en);
          ta.focus();
          ta.selectionStart = s + w[0].length;
          ta.selectionEnd = s + w[0].length + sel.length;
        }
        return;
      }
      /* live preview of the lesson HTML */
      const pv = e.target.closest("[data-preview]");
      if (pv) {
        const av = pv.closest(".lesson-av");
        const box = av.querySelector(".lesson-preview");
        const ta = av.querySelector('textarea[name="lnotes"]');
        box.hidden = !box.hidden;
        if (!box.hidden) box.innerHTML = ta.value || "<p class='muted'>(empty)</p>";
        return;
      }
      /* reorder lessons and sections */
      const mv = e.target.closest("[data-move]");
      if (mv) {
        const row = mv.closest(".admin-lesson");
        if (mv.getAttribute("data-move") === "up" && row.previousElementSibling)
          row.parentElement.insertBefore(row, row.previousElementSibling);
        else if (mv.getAttribute("data-move") === "down" && row.nextElementSibling)
          row.parentElement.insertBefore(row.nextElementSibling, row);
        return;
      }
      const sm = e.target.closest("[data-sec-move]");
      if (sm) {
        const sec = sm.closest(".admin-section");
        if (sm.getAttribute("data-sec-move") === "up" && sec.previousElementSibling)
          sec.parentElement.insertBefore(sec, sec.previousElementSibling);
        else if (sm.getAttribute("data-sec-move") === "down" && sec.nextElementSibling)
          sec.parentElement.insertBefore(sec.nextElementSibling, sec);
        return;
      }
    });

    /* live course-card preview (icon + gradient + title) */
    const prevBox = app.querySelector("#card-prev");
    function updateCardPrev() {
      const v = (n) => form.querySelector('[name="' + n + '"]').value;
      prevBox.style.background = "linear-gradient(135deg," + v("color1") + "," + v("color2") + ")";
      app.querySelector("#card-prev-icon").textContent = v("icon") || "📘";
      app.querySelector("#card-prev-title").textContent = v("title") || t("admin_ftitle");
    }
    form.addEventListener("input", (e) => {
      if (["title", "icon", "color1", "color2"].indexOf(e.target.name) >= 0) updateCardPrev();
    });
    updateCardPrev();
    form.addEventListener("change", (e) => {
      if (e.target.name === "ltype") e.target.closest(".admin-lesson").dataset.type = e.target.value;

      /* Video file upload → saved to IndexedDB, src field set to idb:<key> */
      const fi = e.target.closest("[data-video-file]");
      if (fi) {
        const f = fi.files && fi.files[0];
        if (!f) return;
        const row = fi.closest(".video-src-row");
        const status = row.querySelector(".upload-status");
        if (f.size > 500 * 1024 * 1024) { if (status) status.textContent = t("admin_upload_toobig"); return; }
        if (status) status.textContent = "⏳ " + t("admin_uploading");
        const key = "v_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        VideoStore.put(key, f)
          .then(() => {
            row.querySelector('input[name="lvideo"]').value = "idb:" + key;
            if (status) status.textContent = "✓ " + f.name;
          })
          .catch(() => { if (status) status.textContent = t("admin_upload_err"); });
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const err = form.querySelector(".auth-err");
      const val = (n) => form.querySelector('[name="' + n + '"]').value.trim();
      const title = val("title");
      const sections = [...sectionsC.querySelectorAll(".admin-section")].map((sec, si) => {
        const stitle = sec.querySelector('[name="stitle"]').value.trim() || "Section " + (si + 1);
        const lessons = [...sec.querySelectorAll(".admin-lesson")].map((row, li) => {
          const g = (n) => { const el = row.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ""; };
          const lt = g("ltitle");
          if (!lt) return null;
          const type = row.querySelector('[name="ltype"]').value;
          /* keep the existing lesson id when editing so students don't lose
             their completion marks; only brand-new rows get a fresh id */
          const lid = g("lid") || "cl_" + Date.now().toString(36) + si + "_" + li;
          const base = { id: lid, title: lt, duration: g("ldur") || (type === "quiz" ? "Quiz" : type === "video" ? "Video" : "Lesson"), type };
          if (type === "quiz") {
            const questions = [...row.querySelectorAll(".q-row")].map((qr) => {
              const qtext = qr.querySelector('[name="qtext"]').value.trim();
              const opts = [...qr.querySelectorAll('[name="qopt"]')].map((o) => o.value.trim());
              if (!qtext || opts.filter(Boolean).length < 2) return null;
              return { q: qtext, options: opts, answer: Number(qr.querySelector('[name="qcorrect"]').value) || 0 };
            }).filter(Boolean);
            if (!questions.length) return null;
            base.questions = questions;
          } else {
            const vid = g("lvideo");
            base.type = vid ? "video" : "article";
            base.content = g("lnotes") || "<p></p>";
            if (vid) base.src = vid;
          }
          return base;
        }).filter(Boolean);
        return lessons.length ? { title: stitle, lessons } : null;
      }).filter(Boolean);
      const nLessons = sections.reduce((a, s) => a + s.lessons.length, 0);
      if (!title || !nLessons) { err.textContent = t("admin_need_title"); err.hidden = false; return; }
      const u = window.Auth.current();
      const id = editing ? editing.id : slug(title) + "-" + Date.now().toString(36);
      const course = {
        id, title, subtitle: val("subtitle"),
        instructor: val("instructor") || (u && (u.name || u.email)) || "You",
        category: val("category"), level: val("level"),
        rating: editing ? editing.rating || 0 : 0,
        ratings: editing ? editing.ratings || 0 : 0,
        students: editing ? editing.students || 0 : 0,
        hours: Number(val("hours")) || Math.max(1, nLessons),
        price: form.querySelector('[name="free"]').checked ? "Free" : "Premium",
        free: form.querySelector('[name="free"]').checked,
        color: "linear-gradient(135deg," + val("color1") + "," + val("color2") + ")",
        icon: val("icon") || "📘",
        image: val("image") || undefined,
        description: val("description") || val("subtitle"),
        whatYouLearn: val("learn").split("\n").map((s) => s.trim()).filter(Boolean),
        sections,
      };
      const list = loadCustomCourses().filter((c) => c.id !== id);
      list.push(course);
      saveCustomCourses(list);
      syncCourses();
      location.hash = "#/course/" + id;
    });

    app.querySelectorAll("[data-del-course]").forEach((b) =>
      b.addEventListener("click", () => {
        if (!window.confirm(t("admin_deleteq"))) return;
        saveCustomCourses(loadCustomCourses().filter((c) => c.id !== b.getAttribute("data-del-course")));
        syncCourses();
        renderAdmin();
      }));
    window.scrollTo(0, 0);
  }

  /* ---------------- Router ---------------- */
  function router() {
    const raw = (location.hash || "#/").replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean);

    /* Point the chat at this course's room, or the global community room */
    if (window.Chat && window.Chat.setRoom) {
      if ((parts[0] === "course" || parts[0] === "learn") && parts[1]) {
        const rc = courseById(parts[1]);
        window.Chat.setRoom(parts[1], rc ? `${t("chat_course_room")}: ${cf(rc, "title")}` : null);
      } else {
        window.Chat.setRoom("community", null);
      }
    }

    if (parts.length === 0) renderHome();
    else if (parts[0] === "courses") renderCatalog();
    else if (parts[0] === "search") renderSearch(decodeURIComponent(parts[1] || ""));
    else if (parts[0] === "playground") renderPlayground(parts[1]);
    else if (parts[0] === "leaderboard") renderLeaderboard();
    else if (parts[0] === "review") renderReview();
    else if (parts[0] === "premium") renderPremium();
    else if (parts[0] === "roadmap") renderRoadmap();
    else if (parts[0] === "my-learning") renderMyLearning();
    else if (parts[0] === "account") renderAccount();
    else if (parts[0] === "admin") renderAdmin(parts[1]);
    else if (parts[0] === "certificate" && parts[1]) renderCertificate(parts[1]);
    else if (parts[0] === "course" && parts[1]) renderCourse(parts[1]);
    else if (parts[0] === "learn" && parts[1] && parts[2]) renderLearn(parts[1], parts[2]);
    else renderNotFound();
  }

  /* ---------------- Static header/footer text ---------------- */
  function applyChrome() {
    document.body.classList.toggle("lang-my", lang === "my");
    document.documentElement.lang = lang === "my" ? "my" : "en";
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    set("nav-courses", t("nav_courses"));
    set("nav-roadmap", t("nav_roadmap"));
    set("nav-playground", t("nav_playground"));
    set("nav-mylearning", t("nav_mylearning"));
    set("footer-tag", t("footer_tag"));
    set("footer-saved", t("footer_saved"));

    /* Community group links in the footer (config at top of this file) */
    const links = Object.entries(COMMUNITY_LINKS).filter(([, v]) => v);
    let comm = document.getElementById("footer-community");
    if (links.length) {
      if (!comm) {
        comm = document.createElement("div");
        comm.id = "footer-community";
        const inner = document.querySelector(".footer-inner");
        if (inner) inner.appendChild(comm);
      }
      const icons = { telegram: "✈️ Telegram", discord: "🎮 Discord", facebook: "📘 Facebook" };
      comm.innerHTML = t("community_join") + " " + links
        .map(([k, v]) => `<a href="${escapeHtml(v)}" target="_blank" rel="noopener" class="community-link">${icons[k] || k}</a>`)
        .join(" ");
    } else if (comm) comm.remove();
    const search = document.getElementById("search-input");
    if (search) search.placeholder = t("search_ph");
    const toggle = document.getElementById("lang-toggle");
    if (toggle) toggle.textContent = lang === "en" ? "မြန်မာ" : "EN";
  }

  /* Keyboard shortcuts - prevent duplicate listeners in SPA re-renders */
  if (!window._keyboardShortcutsInitialized) {
    window._keyboardShortcutsInitialized = true;
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const el = document.activeElement;
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
    if (e.key === "ArrowRight") {
      const btn = document.querySelector("[data-next]");
      if (btn) {
        e.preventDefault();
        btn.click();
      }
    } else if (e.key === "ArrowLeft") {
      const prev = document.querySelector(".lesson-nav a:first-child");
      if (prev && prev.href) {
        e.preventDefault();
        location.hash = prev.href.split("#")[1] || prev.href;
      }
    } else if (e.key === "b" || e.key === "B") {
      const bm = document.querySelector("[data-bookmark]");
      if (bm) {
        e.preventDefault();
        bm.click();
      }
    } else if (e.key === "m" || e.key === "M") {
      const btn = document.querySelector("[data-complete]");
      if (btn) {
        e.preventDefault();
        btn.click();
      }
    } else if (e.key === "?" || e.key === "h" || e.key === "H") {
      e.preventDefault();
      showShortcutsModal();
    }
  });
  } /* end keyboard shortcuts guard */

  function showShortcutsModal() {
    /* Remove existing modal if any */
    const existing = document.querySelector('[data-shortcuts-modal]');
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.setAttribute('data-shortcuts-modal', '1');
    modal.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:1000";
    modal.innerHTML = `
      <div style="background:var(--surface);padding:24px;border-radius:10px;max-width:400px;box-shadow:0 4px 20px rgba(0,0,0,.2)">
        <h2 style="margin-top:0">${t("shortcuts_title")}</h2>
        <ul style="list-style:none;padding:0;margin:0">
          <li style="margin-bottom:12px"><kbd style="background:var(--surface-2);padding:4px 8px;border-radius:4px;font-family:monospace">→</kbd> ${t("shortcut_next")}</li>
          <li style="margin-bottom:12px"><kbd style="background:var(--surface-2);padding:4px 8px;border-radius:4px;font-family:monospace">←</kbd> ${t("shortcut_prev")}</li>
          <li style="margin-bottom:12px"><kbd style="background:var(--surface-2);padding:4px 8px;border-radius:4px;font-family:monospace">B</kbd> ${t("shortcut_bookmark")}</li>
          <li style="margin-bottom:12px"><kbd style="background:var(--surface-2);padding:4px 8px;border-radius:4px;font-family:monospace">M</kbd> ${t("shortcut_complete")}</li>
          <li style="margin-bottom:12px"><kbd style="background:var(--surface-2);padding:4px 8px;border-radius:4px;font-family:monospace">?</kbd> ${t("shortcut_help")}</li>
        </ul>
        <button class="btn btn-primary" style="margin-top:16px;width:100%" onclick="this.closest('[data-shortcuts-modal]').remove()">${t("close_modal")}</button>
      </div>
    `;
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }

  /* ---------------- Theme (light / dark) ---------------- */
  let theme = localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) { btn.textContent = theme === "dark" ? "☀️" : "🌙"; btn.title = t("theme_toggle"); }
  }
  const _themeBtn = document.getElementById("theme-toggle");
  if (_themeBtn) {
    _themeBtn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, theme);
      applyTheme();
    });
  }

  /* ---------------- Search (global: courses + inside lessons) ---------------- */
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("search-input").value.trim();
    if (!q) return;
    filter.category = "All";
    const target = "#/search/" + encodeURIComponent(q);
    if (location.hash === target) renderSearch(q);
    else location.hash = target;
  });

  /* ---------------- Language toggle ---------------- */
  document.getElementById("lang-toggle").addEventListener("click", () => {
    lang = lang === "en" ? "my" : "en";
    localStorage.setItem(LANG_KEY, lang);
    localStorage.setItem("wda_bilingual", "1"); // earns the "Bilingual" badge
    applyChrome();
    if (window.Auth && window.Auth.refresh) window.Auth.refresh();
    if (window.Chat && window.Chat.refresh) window.Chat.refresh();
    router();
  });

  /* ---------------- Utils ---------------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );
  }

  /* ---------------- Boot ---------------- */
  /* Reload this account's progress and re-render whenever auth changes. */
  refreshPremium(); /* fetch membership status for the current session */
  if (window.Auth && window.Auth.onChange) {
    window.Auth.onChange(function () {
      state = loadState();
      updateStreak();
      refreshPremium();
      if (loggedIn() && pendingAction) {
        const act = pendingAction;
        pendingAction = null;
        act();
      } else {
        pendingAction = null;
        router();
      }
    });
  }
  window.addEventListener("hashchange", router);
  applyTheme();
  applyChrome();
  updateStreak();
  router();
  loadAnnouncement();

  /* 📲 PWA install: show an Install button when the browser offers it
     (Android/desktop Chrome). iOS has no such event — users add via Share. */
  let deferredInstall = null;
  const installBtn = document.getElementById("install-btn");
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstall = e;
    if (installBtn && localStorage.getItem("wda_install_dismiss") !== "1") {
      installBtn.textContent = "📲 " + t("install_app");
      installBtn.hidden = false;
    }
  });
  if (installBtn) installBtn.addEventListener("click", async () => {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    let outcome = "dismissed";
    try { outcome = (await deferredInstall.userChoice).outcome; } catch (e) {}
    deferredInstall = null;
    installBtn.hidden = true;
    if (outcome !== "accepted") localStorage.setItem("wda_install_dismiss", "1");
  });
  window.addEventListener("appinstalled", () => { if (installBtn) installBtn.hidden = true; });
})();
