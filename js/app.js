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
    price: 100000,              // current (promotion) price in Kyat
    listPrice: 200000,          // regular price shown crossed out ("" or 0 to hide)
    coursePrice: 15000,         // buy ONE premium course only (1 course = 1 premium)
    listCoursePrice: 30000,     // crossed-out single-course price (0 to hide)
  };

  /* ---------------- Courses (built-in + admin-created) ---------------- */
  const COURSES = []; // mutated in place so all closures see updates
  function loadCustomCourses() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || []; } catch (e) { return []; }
  }
  function saveCustomCourses(list) { localStorage.setItem(CUSTOM_KEY, JSON.stringify(list)); }
  /* Courses the admin built and published — fetched from the cloud so every
     student sees them. Before this they lived only in the author's own
     localStorage, which meant nobody else could ever open them. */
  let cloudCourses = [];
  function syncCourses() {
    COURSES.length = 0;
    /* built-in courses get generated cover art (tools/gen-covers.js) */
    BUILTIN_COURSES.forEach((c) => COURSES.push(c.image ? c : Object.assign({}, c, { image: "covers/" + c.id + ".svg" })));
    /* the author's local copy wins over the published one, so their
       in-progress edits are what they see */
    const local = loadCustomCourses();
    const seen = new Set(local.map((c) => c.id));
    local.forEach((c) => COURSES.push(Object.assign({ custom: true }, c)));
    cloudCourses.forEach((c) => { if (!seen.has(c.id)) COURSES.push(Object.assign({ custom: true, published: true }, c)); });
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
    if (lesson[field] != null) return lesson[field]; /* custom/admin courses keep inline fields */
    /* built-in lesson bodies live in the lazy content bundle (data-content.js) */
    if (window.APP_CONTENT) {
      const b = window.APP_CONTENT[lesson.id];
      if (b) {
        if (field === "content") return b.c;
        if (field === "starter") return b.s;
        if (field === "check") return b.k;
      }
    }
    return undefined;
  }

  /* Lazy loader for the lesson-content bundle: the app boots on the light
     core catalog; bodies download once, on demand (or after idle). */
  let contentLoading = null;
  function loadContent() {
    if (window.APP_CONTENT) return Promise.resolve();
    if (contentLoading) return contentLoading;
    contentLoading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "js/data-content.js";
      s.onload = () => resolve();
      s.onerror = () => { contentLoading = null; reject(new Error("content-load")); };
      document.head.appendChild(s);
    });
    return contentLoading;
  }
  /* prefetch quietly a few seconds after boot so lessons open instantly */
  setTimeout(() => { loadContent().catch(() => {}); }, 4000);
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
  /* Quiz text is stored inconsistently — some options raw ("<main>"), some
     pre-escaped ("&lt;main&gt;"). Decode entities first, then escape, so both
     display as literal text instead of being parsed as real elements. */
  function qsafe(s) {
    const ta = document.createElement("textarea");
    ta.innerHTML = String(s == null ? "" : s);
    return escapeHtml(ta.value);
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

  /* Bonus XP earned outside lessons (daily challenge, code exercises) */
  const bonusXp = () => Number(jget(ns("wda_xtra"), 0)) || 0;
  const addBonusXp = (n) => jset(ns("wda_xtra"), bonusXp() + n);

  /* 🎯 "Your turn" action step: mark a lesson's action done (once → +5 XP). */
  const loadActions = () => jget(ns("wda_actions"), {});
  const isActionDone = (id) => !!loadActions()[id];
  const markActionDone = (id) => {
    const a = loadActions();
    if (a[id]) return false;
    a[id] = Date.now(); jset(ns("wda_actions"), a); addBonusXp(5); return true;
  };

  /* 📊 lesson confidence poll: one vote per lesson per account (local guard). */
  const pollVoted = (id) => jget(ns("wda_pollv::" + id), null);
  const setPollVoted = (id, opt) => jset(ns("wda_pollv::" + id), opt);

  /* Free AI comprehension aids (Simpler / Burmese) are open to every student
     but capped per day for non-paying users, so cost stays bounded while the
     "understand any lesson" promise still holds. Premium = unlimited. */
  const AI_FREE_DAILY = 5;
  const aiFreeKey = () => ns("wda_ai_free::" + todayKey());
  const aiFreeUsed = () => Number(jget(aiFreeKey(), 0)) || 0;
  const aiFreeLeft = () => Math.max(0, AI_FREE_DAILY - aiFreeUsed());
  const aiFreeInc = () => jset(aiFreeKey(), aiFreeUsed() + 1);

  /* Day-streak: bumped when a lesson is completed */
  /* ---------------- Study motivation ---------------- */
  const MOTIV = [
    { en: "Every expert was once a beginner who refused to quit.", my: "ကျွမ်းကျင်သူတိုင်းသည် အရှုံးမပေးခဲ့သော အစပြုသူတစ်ဦး ဖြစ်ခဲ့ဖူးသည်။" },
    { en: "30 minutes a day beats 5 hours on Sunday. Consistency is the talent.", my: "တစ်နေ့ မိနစ် ၃၀ သည် တနင်္ဂနွေ ၅ နာရီထက် သာသည်။ ပုံမှန်လုပ်ခြင်းသည် ပါရမီဖြစ်သည်။" },
    { en: "The code you write today is the job you get tomorrow.", my: "ယနေ့ရေးသော ကုဒ်သည် မနက်ဖြန် ရမည့်အလုပ် ဖြစ်သည်။" },
    { en: "Bugs are not failures — they are lessons in disguise.", my: "Bug များသည် ရှုံးနိမ့်မှုမဟုတ် — ရုပ်ဖျက်ထားသော သင်ခန်းစာများသာ ဖြစ်သည်။" },
    { en: "You don't need to be great to start. You need to start to be great.", my: "စတင်ရန် တော်နေစရာမလိုပါ။ တော်လာရန် စတင်ဖို့သာ လိုသည်။" },
    { en: "One lesson today keeps the doubt away.", my: "ယနေ့ သင်ခန်းစာတစ်ခုက သံသယကို ဝေးစေသည်။" },
    { en: "Your only competition is who you were yesterday.", my: "သင့်ပြိုင်ဘက်တစ်ဦးတည်းမှာ မနေ့က သင်ကိုယ်တိုင်သာ ဖြစ်သည်။" },
    { en: "Slow progress is still progress. Keep the streak alive!", my: "နှေးသောတိုးတက်မှုသည်လည်း တိုးတက်မှုပင်။ Streak ကို ဆက်ထိန်းပါ!" },
    { en: "Dream in Burmese, code in JavaScript, succeed in both.", my: "မြန်မာလို အိပ်မက်မက်ပြီး JavaScript နဲ့ ကုဒ်ရေးကာ နှစ်ခုလုံးမှာ အောင်မြင်ပါစေ။" },
    { en: "The best time to start was yesterday. The second best is right now.", my: "စတင်ရန် အကောင်းဆုံးအချိန်သည် မနေ့က ဖြစ်သည်။ ဒုတိယအကောင်းဆုံးမှာ ယခုပင်။" },
    { en: "Great developers are not born — they are built, lesson by lesson.", my: "တော်သော developer များသည် မွေးရာပါမဟုတ် — သင်ခန်းစာတစ်ခုချင်းဖြင့် တည်ဆောက်ယူရသည်။" },
    { en: "Fall in love with the process, and the results will follow.", my: "လုပ်ငန်းစဉ်ကို ချစ်တတ်လာလျှင် ရလဒ်များက နောက်ကလိုက်လာမည်။" },
    { en: "Ask questions. Every senior developer was once afraid to ask too.", my: "မေးခွန်းမေးပါ။ Senior developer တိုင်းလည်း တစ်ချိန်က မေးရမှာ ကြောက်ခဲ့ဖူးသည်။" },
    { en: "A little code every day becomes a career every year.", my: "နေ့စဉ် ကုဒ်အနည်းငယ်သည် နှစ်စဉ် အသက်မွေးဝမ်းကျောင်း ဖြစ်လာသည်။" },
  ];
  const motivPick = (seedStr) => {
    let h = 7;
    for (const ch of seedStr) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
    return MOTIV[h % MOTIV.length];
  };
  const motivText = (m) => (lang === "my" ? m.my : m.en);

  /* Weekly study goal: lessons completed this week vs a self-set target */
  function weekKey() {
    const d = new Date();
    const day = (d.getDay() + 6) % 7; /* Monday = 0 */
    const mon = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day);
    return mon.getFullYear() + "-" + String(mon.getMonth() + 1).padStart(2, "0") + "-" + String(mon.getDate()).padStart(2, "0");
  }
  const weekCount = () => { const w = jget(ns("wda_week"), {}); return w.wk === weekKey() ? (Number(w.n) || 0) : 0; };
  const bumpWeek = () => { const wk = weekKey(); jset(ns("wda_week"), { wk, n: weekCount() + 1 }); };

  /* Mirror this device's streak state onto its push-token row so the worker's
     scheduled sender can remind only students whose streak is about to break.
     (Needs login — the pushTokens write is auth-gated by the rules.) */
  function updatePushMeta() {
    const base = statsBase();
    const tk = window.Push && window.Push.token ? window.Push.token() : "";
    if (!base || !tk || !loggedIn()) return;
    const s = jget(ns("wda_streak"), { last: "", count: 0 });
    authFetch(base + "/stats/pushTokens/" + encodeURIComponent(tk) + ".json", {
      method: "PUT",
      body: JSON.stringify({
        ts: Date.now(), streak: Number(s.count) || 0, last: String(s.last || ""),
        tz: new Date().getTimezoneOffset(), lang: lang,
      }),
    }).catch(() => {});
  }
  window.addEventListener("wda-push-enabled", updatePushMeta);

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
    updatePushMeta(); /* keep the reminder sender's view of the streak current */
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
  /* starter-size courses get an honest "more coming soon" badge */
  const isStarterCourse = (course) => totalLessons(course) < 6;

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
    if (done) { bumpDayStreak(); bumpWeek(); }
    saveState();
    if (typeof pushLeaderboard === "function") pushLeaderboard();
    if (done) { setTimeout(maybeToastBadges, 500); trackLessonDone(courseId, lessonId); }
  }
  /* Anonymous lesson-completion counter — the only way to see WHERE students
     stop. Same fire-and-forget server-increment pattern as trackCourseView;
     no user id is sent, so it can't identify anyone. */
  function trackLessonDone(courseId, lessonId) {
    const base = statsBase();
    if (!base) return;
    fetch(base + "/stats/funnel/" + encodeURIComponent(courseId) + "/" + encodeURIComponent(lessonId) + ".json", {
      method: "PUT",
      body: JSON.stringify({ ".sv": { increment: 1 } }),
    }).catch(() => {});
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
    type === "quiz" ? "❓" : type === "exercise" ? "🏋️" : type === "article" ? "📄" : "▶";

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

      /* ▶ Run here — an editable live preview right inside the lesson, so
         students tinker without leaving the page (only for runnable code) */
      if (looksRunnable(codeTextOf(pre))) {
        const runBtn = document.createElement("button");
        runBtn.className = "run-here-btn";
        runBtn.type = "button";
        runBtn.textContent = "▶ " + t("run_here");
        runBtn.addEventListener("click", () => toggleInlineRun(pre, runBtn));
        pre.insertAdjacentElement("afterend", runBtn); /* sits before the Try-yourself button */
      }
    });
  }

  /* Is this code block something the browser can actually render? Skip shell
     commands, file trees and plain prose so "Run" only appears where useful. */
  function looksRunnable(code) {
    const c = String(code || "").trim();
    if (c.length < 3) return false;
    const first = (c.split("\n")[0] || "").trim();
    if (/^(\$|#\s|>|npm |npx |yarn |git |cd |sudo |pip |python |node |mkdir |ls\b|cat |curl |echo )/i.test(first)) return false;
    if (/<\w+[^>]*>/.test(c)) return true;                                   /* HTML */
    if (/\{[^}]*[a-z-]+\s*:/i.test(c)) return true;                          /* CSS  */
    if (/\b(function|const|let|var|document|console|alert|=>)\b/.test(c)) return true; /* JS */
    return false;
  }

  /* Toggle an inline editable runner beneath a lesson code block. */
  function toggleInlineRun(pre, btn) {
    if (pre._ilr) { pre._ilr.remove(); pre._ilr = null; btn.textContent = "▶ " + t("run_here"); return; }
    const panel = document.createElement("div");
    panel.className = "ilr";
    panel.innerHTML =
      '<div class="ilr-head">✏️ ' + escapeHtml(t("run_edit_hint")) + "</div>" +
      '<textarea class="ilr-code" spellcheck="false"></textarea>' +
      '<div class="ilr-preview-label">' + escapeHtml(t("run_result")) + "</div>" +
      '<iframe class="ilr-frame" sandbox="allow-scripts" title="result"></iframe>';
    /* place it after the button row (Run + Try-yourself) */
    let anchor = pre.nextElementSibling;
    while (anchor && anchor.nextElementSibling &&
      (anchor.nextElementSibling.classList.contains("try-yourself-btn") || anchor.nextElementSibling.classList.contains("run-here-btn"))) {
      anchor = anchor.nextElementSibling;
    }
    (anchor || pre).insertAdjacentElement("afterend", panel);
    pre._ilr = panel;
    const ta = panel.querySelector(".ilr-code");
    const frame = panel.querySelector(".ilr-frame");
    ta.value = codeTextOf(pre);
    const run = () => { frame.srcdoc = buildRunnableDoc(ta.value); };
    run();
    let deb;
    ta.addEventListener("input", () => { clearTimeout(deb); deb = setTimeout(run, 450); });
    btn.textContent = "▼ " + t("run_hide");
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

  /* 📚 Google Classroom — open Google's "Share to Classroom" dialog so a
     teacher can assign this course/lesson URL to their class. No API key,
     no backend, no OAuth: it just opens classroom.google.com/share. */
  function shareToClassroom(hash, title) {
    const url = location.origin + location.pathname + hash;
    let share = "https://classroom.google.com/share?url=" + encodeURIComponent(url);
    if (title) share += "&title=" + encodeURIComponent(String(title).slice(0, 120));
    window.open(share, "wda-classroom", "width=600,height=640,noopener,noreferrer");
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

  /* ===================== 🚀 Build & Showcase =====================
     Capstone projects: build in the Playground → submit → AI code review →
     saved to a shareable portfolio. Portfolio lives in localStorage and is
     mirrored to Firebase under a stable anonymous handle for the public page. */
  const PROJECTS = [
    { id: "p-profile", course: "html-deep-dive", ic: "🙋", title: "Build Your Profile Page",
      brief: `<p>Build a simple <strong>personal profile page</strong> about yourself.</p>
        <p>Include:</p><ul><li>A heading with your name (<code>&lt;h1&gt;</code>)</li>
        <li>A short paragraph about you</li><li>A list of 3 skills you're learning</li>
        <li>A link to something you like</li></ul>
        <div class="callout tip">Make it yours — colors, an emoji, anything. This is your first portfolio piece!</div>`,
      starter: "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { font-family: sans-serif; max-width: 600px; margin: 40px auto; }\n</style>\n</head>\n<body>\n\n  <h1>Your Name</h1>\n  <!-- build your profile here -->\n\n</body>\n</html>" },
    { id: "p-card", course: "css-mastery", ic: "🎴", title: "A Beautiful Profile Card",
      brief: `<p>Design a polished <strong>profile card</strong> with CSS.</p><ul>
        <li>Rounded corners and a soft shadow</li><li>A name and a one-line bio</li>
        <li>Nice colors and spacing</li></ul>`,
      starter: "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { display:grid; place-items:center; height:100vh; background:#f4f1ea; margin:0; }\n  .card {\n    /* style your card */\n  }\n</style>\n</head>\n<body>\n  <div class=\"card\">\n    <h2>Your Name</h2>\n    <p>Learning to code 🚀</p>\n  </div>\n</body>\n</html>" },
    { id: "p-todo", course: "js-essentials", ic: "✅", title: "A To-Do List App",
      brief: `<p>Build a working <strong>to-do list</strong> with JavaScript.</p><ul>
        <li>An input box and an "Add" button</li><li>Clicking Add puts the text in the list</li>
        <li>Bonus: click an item to remove it</li></ul>`,
      starter: "<!DOCTYPE html>\n<html>\n<body style=\"font-family:sans-serif;max-width:400px;margin:30px auto\">\n\n  <h2>My To-Do List</h2>\n  <input id=\"task\" placeholder=\"What to do?\">\n  <button id=\"add\">Add</button>\n  <ul id=\"list\"></ul>\n\n  <script>\n    // wire the Add button to add tasks to #list\n\n  <\/script>\n</body>\n</html>" },
    { id: "p-landing", course: "webdev-bootcamp", ic: "🚀", title: "A Product Landing Page",
      brief: `<p>Build a one-page <strong>landing page</strong> for any product or idea.</p><ul>
        <li>A big headline and a short tagline</li><li>3 feature points</li>
        <li>A call-to-action button, styled with CSS</li></ul>`,
      starter: "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { font-family: sans-serif; margin:0; text-align:center; }\n  .hero { padding:60px 20px; background:#a435f0; color:#fff; }\n  button { padding:12px 26px; border:0; border-radius:8px; font-size:16px; cursor:pointer; }\n</style>\n</head>\n<body>\n  <div class=\"hero\">\n    <h1>Your Product</h1>\n    <p>Your tagline here</p>\n    <button>Get Started</button>\n  </div>\n  <!-- add 3 feature points below -->\n</body>\n</html>" },
    { id: "p-tip", course: "js-essentials", ic: "🧮", title: "A Tip Calculator",
      brief: `<p>Build a <strong>tip calculator</strong>.</p><ul>
        <li>An input for the bill amount</li><li>A button to calculate 10% tip</li>
        <li>Show the tip and the total</li></ul>`,
      starter: "<!DOCTYPE html>\n<html>\n<body style=\"font-family:sans-serif;max-width:360px;margin:30px auto\">\n  <h2>Tip Calculator</h2>\n  <input id=\"bill\" type=\"number\" placeholder=\"Bill amount\">\n  <button id=\"calc\">Calculate 10%</button>\n  <p id=\"out\"></p>\n  <script>\n    // read #bill, compute the tip + total, show in #out\n\n  <\/script>\n</body>\n</html>" },
    { id: "p-quiz", course: "webdev-bootcamp", ic: "❓", title: "A Mini Quiz",
      brief: `<p>Build a <strong>one-question quiz</strong>.</p><ul>
        <li>Show a question and 3 answer buttons</li><li>The right one says "Correct!"</li>
        <li>A wrong one says "Try again"</li></ul>`,
      starter: "<!DOCTYPE html>\n<html>\n<body style=\"font-family:sans-serif;max-width:420px;margin:30px auto;text-align:center\">\n  <h3>What does HTML stand for?</h3>\n  <button>Hyper Text Markup Language</button>\n  <button>Hot Tea Made Late</button>\n  <button>How To Make Lunch</button>\n  <p id=\"result\"></p>\n  <script>\n    // add click handlers that set #result\n\n  <\/script>\n</body>\n</html>" },
  ];
  const projectFor = (courseId) => PROJECTS.find((p) => p.course === courseId);

  const loadPortfolio = () => jget(ns("wda_portfolio"), []);
  const savePortfolioItem = (item) => {
    const p = loadPortfolio();
    const i = p.findIndex((x) => x.id === item.id);
    if (i >= 0) p[i] = item; else p.push(item);
    jset(ns("wda_portfolio"), p);
  };
  /* stable handle for the public portfolio URL. When logged in this is the
     Firebase uid, so security rules can enforce owner-only writes; offline it
     falls back to a random local id (no cloud sync happens offline anyway). */
  const myHandle = () => {
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    if (u && u.id) return u.id;
    let h = jget(ns("wda_handle"), null);
    if (!h) { h = "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); jset(ns("wda_handle"), h); }
    return h;
  };
  const fmtReview = (s) => escapeHtml(String(s || ""))
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");
  function reviewPrompt(code, proj) {
    return "You are a warm, encouraging coding mentor at WebDev Academy, a free coding school for Myanmar students. A beginner just submitted their project: \"" + proj.title + "\". " +
      (lang === "my" ? "Reply in simple Burmese (keep code terms like HTML/CSS in English). " : "Reply in simple, encouraging English. ") +
      "In UNDER 120 words: (1) one genuine thing they did WELL, (2) one or two specific, kind suggestions to improve, (3) one short encouraging closing line. Be specific to THEIR code. Do NOT rewrite their whole project.\n\nTheir code:\n" +
      String(code).slice(0, 4000);
  }
  /* mirror one submitted project to Firebase for the public portfolio +
     community showcase pages */
  function syncPortfolio(item) {
    const base = statsBase();
    if (!base || !loggedIn()) return;
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    const by = u ? String(u.name || u.email || "").split(" ")[0] : "";
    authFetch(base + "/portfolio/" + encodeURIComponent(myHandle()) + "/" + encodeURIComponent(item.id) + ".json", {
      method: "PUT",
      body: JSON.stringify({
        title: String(item.title || "").slice(0, 80), ic: item.ic || "🚀",
        code: String(item.code || "").slice(0, 100000), review: String(item.review || "").slice(0, 4000),
        course: String(item.course || "").slice(0, 60), by: by.slice(0, 40), ts: item.ts || Date.now(),
      }),
    }).catch(() => {});
  }

  function renderProject(id) {
    const proj = PROJECTS.find((p) => p.id === id);
    if (!proj) return renderNotFound();
    const c = courseById(proj.course);
    const saved = loadPortfolio().find((x) => x.id === proj.id);
    app.innerHTML = `
      <div class="container" style="max-width:1100px">
        <div class="crumbs">${c ? `<a href="#/course/${c.id}">${cf(c, "title")}</a> › ` : ""}🚀 ${t("proj_word")}</div>
        <h2 class="section-title">${proj.ic} ${escapeHtml(proj.title)}</h2>
        <div class="panel proj-brief">${proj.brief}</div>
        <div class="playground pg-page" id="proj-pg"></div>
        <div class="tl-row" style="margin-top:12px">
          <button class="btn btn-primary" id="proj-submit">🚀 ${t("proj_submit")}</button>
          <a class="btn btn-outline" href="#/portfolio">📁 ${t("portfolio_mine")}</a>
          <span class="muted" id="proj-status" style="font-size:13px"></span>
        </div>
        <div id="proj-review"></div>
      </div>`;
    buildPlayground(document.getElementById("proj-pg"), (saved && saved.code) || proj.starter);
    document.getElementById("proj-submit").addEventListener("click", () => {
      if (!loggedIn()) { requireAuth(() => renderProject(id)); return; }
      const code = (document.querySelector("#proj-pg .pg-code") || {}).value || "";
      const item = { id: proj.id, title: proj.title, ic: proj.ic, course: c ? cf(c, "title") : "", code: code, ts: Date.now() };
      const rv = document.getElementById("proj-review");
      const done = () => { savePortfolioItem(item); syncPortfolio(item); addBonusXp(20); pushLeaderboard(); };
      if (window.AI && window.AI.ready()) {
        rv.innerHTML = `<div class="panel"><p class="muted">🤖 ${escapeHtml(t("proj_reviewing"))}</p></div>`;
        window.AI.complete(reviewPrompt(code, proj), { maxTokens: 600 }).then((res) => {
          let txt = String(res || "").trim(); if (window.AI.stripFences) txt = window.AI.stripFences(txt);
          item.review = txt; done();
          rv.innerHTML = `<div class="panel proj-review"><h3 style="margin-top:0">🤖 ${t("proj_feedback")} <span class="srs-xp">+20 XP</span></h3>
            <div class="reader">${fmtReview(txt)}</div>
            <a class="btn btn-primary btn-sm" href="#/portfolio">📁 ${t("proj_saved_go")}</a></div>`;
          rv.scrollIntoView({ block: "nearest" });
        }).catch(() => {
          done();
          rv.innerHTML = `<div class="panel"><p class="tl-status ok">✓ ${t("proj_saved")}</p><a class="btn btn-primary btn-sm" href="#/portfolio">📁 ${t("portfolio_mine")}</a></div>`;
        });
      } else {
        done();
        rv.innerHTML = `<div class="panel"><p class="tl-status ok">✓ ${t("proj_saved")} · +20 XP</p><a class="btn btn-primary btn-sm" href="#/portfolio">📁 ${t("portfolio_mine")}</a></div>`;
      }
    });
    window.scrollTo(0, 0);
  }

  function renderPortfolio(handle) {
    const own = !handle;
    app.innerHTML = `
      <div class="container" style="max-width:760px">
        <h2 class="section-title">📁 ${own ? t("portfolio_mine") : t("portfolio_title")}</h2>
        <p class="section-sub">${t("portfolio_sub")}</p>
        ${own ? `<div class="tl-row" style="margin-bottom:14px">
          <button class="btn btn-outline btn-sm" id="pf-share">🔗 ${t("portfolio_share")}</button>
          <a class="btn btn-outline btn-sm" href="#/showcase">🌟 ${t("showcase_browse")}</a>
          <span class="muted" id="pf-share-status" style="font-size:12px;overflow-wrap:anywhere"></span></div>` : ""}
        <div id="pf-list"><p class="muted">⏳</p></div>
        ${own ? `<div class="panel" style="margin-top:16px"><h3 style="margin-top:0">🚀 ${t("proj_pick")}</h3>
          <div class="chips">${PROJECTS.map((p) => `<a class="chip" href="#/project/${p.id}">${p.ic} ${escapeHtml(p.title)}</a>`).join("")}</div></div>` : ""}
      </div>`;
    const list = document.getElementById("pf-list");
    const draw = (items) => {
      if (!items.length) {
        list.innerHTML = `<div class="empty"><h2>📁</h2><p>${own ? t("portfolio_empty") : t("portfolio_empty_pub")}</p>
          ${own ? `<a class="btn btn-primary" href="#/project/${PROJECTS[0].id}">🚀 ${t("portfolio_start")}</a>` : ""}</div>`;
        return;
      }
      list.innerHTML = items.map((it, i) => `
        <div class="panel pf-item">
          <div class="pf-head"><span class="pf-ic">${it.ic || "🚀"}</span>
            <div><b>${escapeHtml(it.title || "Project")}</b>${it.course ? `<div class="muted" style="font-size:12px">${escapeHtml(it.course)}</div>` : ""}</div></div>
          ${it.review ? `<div class="pf-review reader">${fmtReview(String(it.review).slice(0, 600))}</div>` : ""}
          <div class="tl-row">
            <button class="btn btn-outline btn-sm" data-pf-run="${i}">▶ ${t("proj_run")}</button>
            ${own ? `<a class="btn btn-outline btn-sm" href="#/project/${escapeHtml(it.id)}">✏️ ${t("proj_edit")}</a>` : ""}
          </div>
        </div>`).join("");
      list.querySelectorAll("[data-pf-run]").forEach((b) => b.addEventListener("click", () => {
        const it = items[Number(b.getAttribute("data-pf-run"))];
        if (it && it.code) openPlayground(it.code);
      }));
    };
    if (own) {
      draw(loadPortfolio().slice().sort((a, b) => (b.ts || 0) - (a.ts || 0)));
      const sh = document.getElementById("pf-share");
      if (sh) sh.addEventListener("click", () => {
        const link = location.origin + location.pathname + "#/portfolio/" + myHandle();
        const st = document.getElementById("pf-share-status");
        const done = () => { if (st) st.textContent = "✓ " + link; };
        if (navigator.clipboard) navigator.clipboard.writeText(link).then(done).catch(() => fallbackCopy(link, done)); else fallbackCopy(link, done);
        /* make sure the current portfolio is mirrored before sharing */
        loadPortfolio().forEach(syncPortfolio);
      });
    } else {
      const base = statsBase();
      if (!base) { draw([]); return; }
      fetch(base + "/portfolio/" + encodeURIComponent(handle) + ".json").then((r) => r.json()).then((val) => {
        const items = Object.entries(val || {}).map(([id, v]) => Object.assign({ id }, v)).sort((a, b) => (b.ts || 0) - (a.ts || 0));
        draw(items);
      }).catch(() => draw([]));
    }
    window.scrollTo(0, 0);
  }

  /* 📓 Smart Notebook — every note the student has written, in one place.
     Notes are already saved per lesson; this makes them findable again. */
  function collectNotes() {
    const notes = loadNotes();
    const out = [];
    COURSES.forEach((c) =>
      c.sections.forEach((s) =>
        s.lessons.forEach((l) => {
          const text = (notes[l.id] || "").trim();
          if (text) out.push({ cid: c.id, course: cf(c, "title"), icon: c.icon, lid: l.id, lesson: lf(l, "title") || l.title || l.id, section: s.title, text: text });
        })
      )
    );
    return out;
  }
  function renderNotes() {
    const all = collectNotes();
    app.innerHTML = `
      <div class="container" style="max-width:720px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h2 class="section-title">📓 ${t("nb_title")}</h2>
          ${all.length ? `<button class="btn btn-outline btn-sm" id="nb-export">⬇️ ${t("nb_export")}</button>` : ""}
        </div>
        <p class="section-sub">${t("nb_sub")}</p>
        ${all.length ? `<input id="nb-search" class="nb-search" type="search" placeholder="${escapeHtml(t("nb_search"))}" aria-label="${escapeHtml(t("nb_search"))}">` : ""}
        <div id="nb-list"></div>
      </div>`;
    const list = document.getElementById("nb-list");
    const draw = (items) => {
      if (!all.length) {
        list.innerHTML = `<div class="empty"><h2>📓</h2><p>${t("nb_empty")}</p><a class="btn btn-primary" href="#/courses">${t("browse_courses")}</a></div>`;
        return;
      }
      if (!items.length) { list.innerHTML = `<div class="empty"><h2>🔍</h2><p>${t("nb_none")}</p></div>`; return; }
      list.innerHTML = items.map((n) => `
        <div class="panel nb-item">
          <div class="nb-head">
            <span class="nb-ic">${n.icon || "📘"}</span>
            <div><b>${n.lesson}</b><div class="muted" style="font-size:12px">${n.course}</div></div>
          </div>
          <div class="nb-text">${escapeHtml(n.text)}</div>
          <a class="btn btn-outline btn-sm" href="#/learn/${n.cid}/${n.lid}">↗ ${t("nb_open")}</a>
        </div>`).join("");
    };
    draw(all);
    const search = document.getElementById("nb-search");
    if (search) search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      draw(!q ? all : all.filter((n) =>
        (n.text + " " + n.lesson + " " + n.course).toLowerCase().indexOf(q) >= 0));
    });
    const ex = document.getElementById("nb-export");
    if (ex) ex.addEventListener("click", () => {
      const txt = all.map((n) => "## " + n.course + " — " + n.lesson + "\n\n" + n.text + "\n").join("\n---\n\n");
      const blob = new Blob(["# " + t("nb_title") + "\n\n" + txt], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "my-notes.txt";
      a.click();
      URL.revokeObjectURL(a.href);
    });
    window.scrollTo(0, 0);
  }

  /* 🌟 Community Showcase — every student's submitted projects in one gallery.
     Reads the public `portfolio` tree (all handles) and shows the newest. */
  function collectShowcase(all) {
    const items = [];
    Object.entries(all || {}).forEach(([uid, projs]) => {
      Object.entries(projs || {}).forEach(([pid, v]) => {
        if (v && v.code) items.push(Object.assign({ uid, pid }, v));
      });
    });
    return items.sort((a, b) => (b.ts || 0) - (a.ts || 0));
  }
  function showcaseCard(it, i) {
    return `<div class="panel sc-card">
        ${it.trending ? `<span class="sc-badge">🔥 ${t("trending_word")}</span>` : ""}
        <div class="sc-thumb" data-thumb="${i}" title="${t("proj_run")}">
          <iframe class="sc-frame" sandbox="allow-scripts" scrolling="no" tabindex="-1" title="preview"></iframe>
          <span class="sc-thumb-ic">${it.ic || "🚀"}</span>
        </div>
        <div class="sc-body">
          <b>${escapeHtml(it.title || "Project")}</b>
          ${it.by ? `<div class="muted sc-by">${t("by_word")} ${escapeHtml(it.by)}</div>` : ""}
          ${it.course ? `<div class="muted" style="font-size:12px">${escapeHtml(it.course)}</div>` : ""}
          <div class="tl-row" style="margin-top:8px">
            <button class="btn btn-outline btn-sm" data-sc-run="${i}">▶ ${t("proj_run")}</button>
            <a class="btn btn-ghost btn-sm" href="#/portfolio/${encodeURIComponent(it.uid)}">📁</a>
            <span class="muted sc-runs" style="font-size:12px;margin-left:auto">${it.hot ? "▶ " + it.hot : ""}</span>
          </div>
        </div>
      </div>`;
  }
  /* Render a scaled, non-interactive live preview of each project into its card
     thumbnail — lazily (as it scrolls into view) and sandboxed (no same-origin,
     so untrusted student code can't touch the page). */
  function wireShowcaseThumbs(grid, items, openFn) {
    const paint = (thumb) => {
      const it = items[Number(thumb.getAttribute("data-thumb"))];
      const frame = thumb.querySelector(".sc-frame");
      if (!it || !frame || frame.dataset.done) return;
      frame.dataset.done = "1";
      const w = thumb.clientWidth || 240;
      frame.style.transform = "scale(" + (w / 1000).toFixed(4) + ")";
      try { frame.srcdoc = buildRunnableDoc(String(it.code || "")); thumb.classList.add("ready"); } catch (e) {}
    };
    grid.querySelectorAll(".sc-thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const it = items[Number(thumb.getAttribute("data-thumb"))];
        if (it && it.code && openFn) openFn(it, thumb);
      });
    });
    if (typeof IntersectionObserver === "function") {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((en) => { if (en.isIntersecting) { paint(en.target); obs.unobserve(en.target); } });
      }, { rootMargin: "200px" });
      grid.querySelectorAll(".sc-thumb").forEach((th) => io.observe(th));
    } else {
      grid.querySelectorAll(".sc-thumb").forEach(paint);
    }
  }
  /* best-effort public popularity counter (like stats/courses): each time a
     showcase project is opened it ticks up; the most-run ones become 🔥 Trending. */
  function bumpHot(key) {
    const base = statsBase();
    if (!base) return;
    const url = base + "/stats/showcase/" + encodeURIComponent(key) + ".json";
    fetch(url).then((r) => r.json()).then((n) => fetch(url, { method: "PUT", body: JSON.stringify((Number(n) || 0) + 1) })).catch(() => {});
  }
  function renderShowcase(sort) {
    sort = sort === "new" ? "new" : "hot";
    app.innerHTML = `
      <div class="container" style="max-width:960px">
        <h2 class="section-title">🌟 ${t("showcase_title")}</h2>
        <p class="section-sub">${t("showcase_sub")}</p>
        <div class="chips" style="margin:2px 0 14px;align-items:center">
          <button class="chip ${sort === "hot" ? "active" : ""}" data-sc-sort="hot">🔥 ${t("trending_word")}</button>
          <button class="chip ${sort === "new" ? "active" : ""}" data-sc-sort="new">🆕 ${t("newest_word")}</button>
          <a class="btn btn-primary btn-sm" href="#/portfolio" style="margin-left:auto">🚀 ${t("showcase_build")}</a>
        </div>
        <div id="sc-grid"><div class="empty"><h2>⏳</h2></div></div>
      </div>`;
    app.querySelectorAll("[data-sc-sort]").forEach((b) => b.addEventListener("click", () => renderShowcase(b.getAttribute("data-sc-sort"))));
    const grid = document.getElementById("sc-grid");
    const empty = () => { grid.innerHTML = `<div class="empty"><h2>🌟</h2><p>${t("showcase_empty")}</p><a class="btn btn-primary" href="#/portfolio">🚀 ${t("showcase_build")}</a></div>`; };
    const base = statsBase();
    if (!base) { empty(); return; }
    Promise.all([
      fetch(base + "/portfolio.json").then((r) => r.json()).catch(() => null),
      fetch(base + "/stats/showcase.json").then((r) => r.json()).catch(() => ({})),
    ]).then(([all, hot]) => {
      hot = hot || {};
      const items = collectShowcase(all);
      items.forEach((it) => { it.hot = Number(hot[it.uid + "::" + it.pid]) || 0; });
      const maxHot = items.reduce((m, it) => Math.max(m, it.hot), 0);
      const thresh = Math.max(2, Math.ceil(maxHot * 0.5));
      items.forEach((it) => { it.trending = it.hot >= thresh; });
      if (sort === "hot") items.sort((a, b) => (b.hot - a.hot) || ((b.ts || 0) - (a.ts || 0)));
      else items.sort((a, b) => (b.ts || 0) - (a.ts || 0));
      const top = items.slice(0, 60);
      if (!top.length) { empty(); return; }
      grid.innerHTML = `<div class="sc-grid">${top.map(showcaseCard).join("")}</div>`;
      const openProj = (it, cardEl) => {
        if (!it || !it.code) return;
        openPlayground(it.code);
        bumpHot(it.uid + "::" + it.pid);
        it.hot += 1;
        const cnt = cardEl && cardEl.querySelector(".sc-runs");
        if (cnt) cnt.textContent = "▶ " + it.hot;
      };
      grid.querySelectorAll("[data-sc-run]").forEach((b) => b.addEventListener("click", () => {
        openProj(top[Number(b.getAttribute("data-sc-run"))], b.closest(".sc-card"));
      }));
      wireShowcaseThumbs(grid, top, (it, thumb) => openProj(it, thumb.closest(".sc-card")));
    }).catch(empty);
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
  /* The security rules require a login token on cloud writes (and private
     reads) — same fetch, with ?auth=<idToken> appended when signed in. */
  const authFetch = (url, opts) =>
    (window.Auth && window.Auth.idToken ? window.Auth.idToken() : Promise.resolve(null))
      .then((tk) => fetch(url + (tk ? (url.indexOf("?") >= 0 ? "&" : "?") + "auth=" + encodeURIComponent(tk) : ""), opts));
  const dateKey = (offset) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);

  /* ---- Published (admin-built) courses ---------------------------------
     Read is public so students get them; writes are admin-only (rules). */
  function loadCloudCourses() {
    const base = statsBase();
    if (!base) return;
    fetch(base + "/customCourses.json").then((r) => r.json()).then((val) => {
      const list = Object.values(val || {}).filter((c) => c && c.id && Array.isArray(c.sections));
      if (!list.length) return;
      cloudCourses = list;
      syncCourses();
      router(); /* re-render so published courses appear without a reload */
    }).catch(() => {});
  }
  const isAdminUser = () => !!(window.Auth && window.Auth.isAdmin && window.Auth.isAdmin());
  function publishCourse(course) {
    const base = statsBase();
    if (!base || !isAdminUser()) return Promise.resolve();
    return authFetch(base + "/customCourses/" + encodeURIComponent(course.id) + ".json", {
      method: "PUT", body: JSON.stringify(course),
    }).catch(() => {});
  }
  function unpublishCourse(id) {
    const base = statsBase();
    if (!base || !isAdminUser()) return Promise.resolve();
    cloudCourses = cloudCourses.filter((c) => c.id !== id);
    return authFetch(base + "/customCourses/" + encodeURIComponent(id) + ".json", { method: "DELETE" }).catch(() => {});
  }

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
      bar.innerHTML = '<span class="announce-ic">📢</span><span class="announce-text">' + escapeHtml(String(a.text).slice(0, 300)) + "</span>" +
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
    const xp = lessons * 10 + passes * 5 + bonusXp();
    return { lessons, coursesDone, xp, level: Math.floor(xp / 100) + 1 };
  }
  function pushLeaderboard() {
    const base = statsBase();
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    if (!base || !u) return;
    const s = computeMyStats();
    if (s.lessons === 0) return; /* nothing to rank yet */
    authFetch(base + "/stats/leaderboard/" + encodeURIComponent(u.id) + ".json", {
      method: "PUT",
      body: JSON.stringify({
        name: (u.name || u.email || "?").split(" ")[0],
        xp: s.xp, lessons: s.lessons, courses: s.coursesDone,
        streak: dayStreak(), ts: Date.now(),
      }),
    }).catch(() => {});
  }
  function renderLeaderboard(tab) {
    tab = tab === "week" ? "week" : "all";
    app.innerHTML = `
      <div class="container" style="max-width:680px">
        <h2 class="section-title">🏆 ${t("lb_title")}</h2>
        <p class="section-sub">${t("lb_sub")}</p>
        <div class="chips" style="margin-bottom:14px">
          <button class="chip ${tab === "all" ? "active" : ""}" data-lb-tab="all">🌍 ${t("lb_all")}</button>
          <button class="chip ${tab === "week" ? "active" : ""}" data-lb-tab="week">📅 ${t("lb_week")}</button>
        </div>
        <div id="lb-list"><div class="empty"><h2>⏳</h2></div></div>
      </div>`;
    app.querySelectorAll("[data-lb-tab]").forEach((b) =>
      b.addEventListener("click", () => renderLeaderboard(b.getAttribute("data-lb-tab")))
    );
    const base = statsBase();
    const mount = document.getElementById("lb-list");
    if (!base) { mount.innerHTML = `<div class="empty"><h2>${t("lb_offline")}</h2></div>`; return; }
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    /* SoloLearn-style colorful avatar: name → stable hue */
    const avColor = (name) => {
      let h = 0;
      for (const ch of name) h = (h * 33 + ch.charCodeAt(0)) % 360;
      return `hsl(${h},62%,48%)`;
    };
    const av = (x, cls) =>
      `<span class="lb-av ${cls || ""}" style="background:${avColor(x.name)}">${escapeHtml(x.name.charAt(0).toUpperCase())}</span>`;
    fetch(base + "/stats/leaderboard.json")
      .then((r) => r.json())
      .then((val) => {
        /* Coerce every field to a safe type — the DB is world-writable, so
           a crafted row must never reach innerHTML as markup */
        const weekAgo = Date.now() - 7 * 86400000;
        let rows = Object.entries(val || {})
          .map(([id, x]) => ({
            id,
            name: String((x && x.name) || "?").slice(0, 40),
            xp: Number(x && x.xp) || 0,
            lessons: Number(x && x.lessons) || 0,
            courses: Number(x && x.courses) || 0,
            streak: Number(x && x.streak) || 0,
            ts: Number(x && x.ts) || 0,
          }))
          .filter((x) => x.xp > 0)
          .sort((a, b) => b.xp - a.xp);
        if (tab === "week") rows = rows.filter((x) => x.ts >= weekAgo);
        if (!rows.length) {
          mount.innerHTML = `<div class="empty"><h2>${t("lb_empty")}</h2><p>${t("lb_empty_sub")}</p></div>`;
          return;
        }
        const myRank = u ? rows.findIndex((x) => x.id === u.id) : -1;
        const top3 = rows.slice(0, 3);
        const rest = rows.slice(3, 20);
        /* podium: 2nd — 1st — 3rd */
        const podOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
        const podCls = top3.length >= 2 ? ["second", "first", "third"] : ["first"];
        const podium = `
          <div class="podium">
            ${podOrder.map((x, k) => `
              <div class="pod ${podCls[k] || ""} ${u && x.id === u.id ? "me" : ""}">
                ${podCls[k] === "first" ? '<div class="pod-crown">👑</div>' : ""}
                ${av(x, "big")}
                <div class="pod-name">${escapeHtml(x.name)}</div>
                <div class="pod-xp">⚡ ${x.xp}</div>
                <div class="pod-block">${podCls[k] === "first" ? "1" : podCls[k] === "second" ? "2" : "3"}</div>
              </div>`).join("")}
          </div>`;
        const rowHtml = (x, rank) => `
          <div class="lb-row ${u && x.id === u.id ? "me" : ""}">
            <span class="lb-rank">${rank}</span>
            ${av(x)}
            <span class="lb-name">${escapeHtml(x.name)}${u && x.id === u.id ? ` <em>(${t("lb_you")})</em>` : ""}
              <span class="lb-sub">📗 ${x.lessons} · 🎓 ${x.courses} · 🔥 ${x.streak}</span></span>
            <span class="lb-lvl">Lv ${Math.floor(x.xp / 100) + 1}</span>
            <span class="lb-xp">⚡ ${x.xp}</span>
          </div>`;
        mount.innerHTML = `
          ${myRank >= 0 ? `<div class="lb-me-banner">${t("lb_yourrank")}: <b>#${myRank + 1}</b> / ${rows.length} · ⚡ ${rows[myRank].xp} XP</div>` : ""}
          ${podium}
          <div class="lb-table">
            ${rest.map((x, i) => rowHtml(x, i + 4)).join("")}
            ${myRank >= 20 ? `<div class="lb-dots">···</div>` + rowHtml(rows[myRank], myRank + 1) : ""}
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
  let premiumCoursesMap = {}; /* single-course purchases: courseId -> true */
  let premiumChecked = false; /* true once the membership lookup finished */
  function isPremiumUser() {
    return premiumStatus || (window.Auth && window.Auth.isAdmin && window.Auth.isAdmin());
  }
  /* all-access members get every course; others may own individual ones */
  function hasCourseAccess(courseId) {
    return isPremiumUser() || !!premiumCoursesMap[courseId];
  }
  /* chat.js gates the @ai bot on premium too */
  window.WDA = window.WDA || {};
  window.WDA.isPremium = isPremiumUser;
  /* chat is for paying students: all-access OR at least one bought course */
  window.WDA.isPaying = () => isPremiumUser() || Object.keys(premiumCoursesMap).length > 0;
  function refreshPremium() {
    const base = statsBase();
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    if (!base || !u || !u.email) { premiumStatus = false; premiumCoursesMap = {}; premiumChecked = true; return; }
    premiumChecked = false;
    authFetch(base + "/premium/" + emailKey(u.email) + ".json")
      .then((r) => r.json())
      .then((v) => {
        const was = premiumStatus;
        const first = !premiumChecked;
        /* membership shapes: true / {since,by} (admin) / {until,via}
           (promo, expires) / {courses:{cid:true}} (single purchases) —
           and combinations of the object forms */
        if (!v) {
          premiumStatus = false; premiumCoursesMap = {};
        } else if (v === true) {
          premiumStatus = true; premiumCoursesMap = {};
        } else {
          premiumCoursesMap = v.courses || {};
          const hasAllGrant = !!(v.since || v.by || v.until || v.via);
          const expired = v.until && v.until <= Date.now();
          premiumStatus = hasAllGrant && !expired;
        }
        premiumChecked = true;
        /* re-render once the answer is in, so deep-linked premium lessons load */
        if (premiumStatus !== was || first) window.dispatchEvent(new Event("hashchange"));
      })
      .catch(() => { premiumChecked = true; window.dispatchEvent(new Event("hashchange")); });
  }

  function renderPremium(courseId) {
    const u = loggedIn() ? window.Auth.current() : null;
    const premiumCourses = COURSES.filter((c) => !isFree(c));
    /* "1 course = 1 premium": #/premium/<courseId> sells just that course */
    const target = courseId ? courseById(courseId) : null;
    const single = target && !isFree(target) ? target : null;
    const price = single ? (PAYMENT_CONFIG.coursePrice || PAYMENT_CONFIG.price) : PAYMENT_CONFIG.price;
    const listPrice = single ? PAYMENT_CONFIG.listCoursePrice : PAYMENT_CONFIG.listPrice;
    app.innerHTML = `
      <div class="container" style="max-width:620px">
        <h2 class="section-title">${single ? "🎫 " + t("prem_one_title") : "⭐ " + t("prem_title")}</h2>
        <p class="section-sub">${single ? cf(single, "title") : t("prem_sub")}</p>
        <div class="panel">
          ${listPrice && listPrice > price
            ? `<div class="prem-promo-badge">🎉 ${t("prem_promo")} −${Math.round((1 - price / listPrice) * 100)}%</div>`
            : ""}
          <div class="prem-price">
            ${listPrice && listPrice > price ? `<s class="prem-oldprice">${fmt(listPrice)} Ks</s> ` : ""}
            ${fmt(price)} Ks <span class="muted">· ${t("prem_once")}</span>
          </div>
          <ul class="learn-grid" style="grid-template-columns:1fr">
            ${single ? `
              <li>${single.icon} ${cf(single, "title")} — ${totalLessons(single)} ${t("lessons_word")}</li>
              <li>${t("prem_benefit_cert")}</li>
              <li>${t("inc_lifetime")}</li>` : `
              <li>${premiumCourses.length} ${t("prem_benefit_courses")}</li>
              <li>${t("prem_benefit_future")}</li>
              <li>${t("prem_benefit_cert")}</li>`}
          </ul>
          ${single ? `<a class="btn btn-outline btn-block" href="#/premium">⭐ ${t("prem_or_all")} · ${fmt(PAYMENT_CONFIG.price)} Ks</a>` : ""}
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
    if (single ? hasCourseAccess(single.id) : isPremiumUser()) {
      mount.innerHTML = `<div class="panel"><h2>🎉 ${single ? "✓ " + t("purchased") : t("prem_active")}</h2><p class="muted">${t("prem_active_sub")}</p>
        <a class="btn btn-primary" href="${single ? "#/course/" + single.id : "#/courses"}">${single ? t("start_course") : t("browse_courses")}</a></div>`;
      return;
    }
    const base = statsBase();
    if (!base) { mount.innerHTML = `<div class="panel"><p>${t("lb_offline")}</p></div>`; return; }
    /* course claims get their own slot so they never clobber an
       all-access claim (and vice versa) */
    const claimKey = emailKey(u.email) + (single ? "," + single.id : "");

    /* pending claim already submitted? Claims are keyed by the user's own
       email key, so we fetch ONE row — never the whole collection (other
       people's emails/phones must not download to every visitor) */
    /* 🎟️ promo code redemption — shared by both states below */
    const redeemHtml = `
      <div class="panel">
        <h2>🎟️ ${t("redeem_title")}</h2>
        <div class="tl-row">
          <input class="tl-in" id="redeem-code" placeholder="${escapeHtml(t("redeem_ph"))}" style="flex:1;min-width:140px;text-transform:uppercase" maxlength="24">
          <button class="btn btn-primary" id="redeem-btn">${t("redeem_btn")}</button>
        </div>
        <div class="tl-status" id="redeem-status"></div>
      </div>`;
    const wireRedeem = () => {
      const btn = document.getElementById("redeem-btn");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const status = document.getElementById("redeem-status");
        const code = (document.getElementById("redeem-code").value || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
        if (!code) return;
        status.className = "tl-status"; status.textContent = "⏳";
        authFetch(base + "/stats/promo/" + code + ".json")
          .then((r) => r.json())
          .then((v) => {
            if (!v || !v.days || (v.max && (Number(v.used) || 0) >= Number(v.max))) throw new Error("invalid");
            const until = Date.now() + Number(v.days) * 864e5;
            return authFetch(base + "/stats/promo/" + code + "/used.json", {
              method: "PUT", body: JSON.stringify((Number(v.used) || 0) + 1),
            }).then(() => authFetch(base + "/premium/" + emailKey(u.email) + ".json", {
              method: "PATCH", /* merge — must not wipe single-course purchases */
              body: JSON.stringify({ until, via: code, ts: Date.now() }),
            })).then((r) => {
              if (!r.ok) throw new Error("write");
              premiumStatus = true; premiumChecked = true;
              status.className = "tl-status ok";
              status.textContent = t("redeem_ok").replace("{d}", new Date(until).toLocaleDateString());
              setTimeout(() => renderPremium(), 1400);
            });
          })
          .catch(() => { status.className = "tl-status bad"; status.textContent = t("redeem_invalid"); });
      });
    };

    authFetch(base + "/payments/" + claimKey + ".json").then((r) => r.json()).then((p) => {
      const mine = p && p.status === "pending" ? [p] : [];
      if (mine.length) {
        mount.innerHTML = `<div class="panel"><h2>⏳ ${t("prem_pending")}</h2><p class="muted">${t("prem_pending_sub")}</p></div>` + redeemHtml;
        wireRedeem();
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
              ? `${t("prem_step1_qr")} <strong>${escapeHtml(PAYMENT_CONFIG.method)}</strong> → ${t("prem_step1")} <strong>${fmt(price)} Ks</strong>`
              : `${t("prem_step1")} <strong>${fmt(price)} Ks</strong> → <strong>${escapeHtml(PAYMENT_CONFIG.method)}</strong>: <strong>${escapeHtml(PAYMENT_CONFIG.phone)}</strong> (${escapeHtml(PAYMENT_CONFIG.accountName)})`}</li>
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
        </div>` + redeemHtml;
      wireRedeem();
      const form = mount.querySelector("#prem-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const phone = form.phone.value.trim(), txn = form.txn.value.trim();
        if (!phone || !txn) return;
        authFetch(base + "/payments/" + claimKey + ".json", {
          method: "PUT", /* one claim per account (per course for singles) */
          body: JSON.stringify(Object.assign({
            email: u.email.toLowerCase(), name: u.name || "",
            phone, txn, ts: Date.now(), status: "pending",
          }, single ? { courseId: single.id, courseTitle: single.title } : {})),
        }).then((r) => {
          if (!r.ok) throw new Error("post failed");
          renderPremium(courseId); /* shows the pending state */
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
          ${isStarterCourse(c) ? `<span class="soon-badge">🚧 ${t("soon_badge")}</span>` : ""}
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

  /* ---------------- View: Course gallery (visual showcase) ---------------- */
  function renderGallery() {
    const tile = (c) => `
      <a class="gal-tile" href="#/course/${c.id}">
        <span class="gt-bg" style="background:${c.color}${c.image ? `;background-image:url('${escapeHtml(c.image)}')` : ""}">${c.image ? "" : c.icon}</span>
        <span class="gt-scrim"></span>
        <span class="gt-chip ${isFree(c) ? "free" : ""}">${isFree(c) ? t("price_free") : "⭐ " + t("price_premium")}</span>
        <span class="gt-info">
          <span class="gt-title">${cf(c, "title")}</span>
          <span class="gt-meta">${totalLessons(c)} ${t("lessons_word")} · ${c.hours} ${t("hrs")} · ${levelName(c.level)}</span>
        </span>
      </a>`;
    const fresh = NEW_COURSE_IDS.map(courseById).filter(Boolean);
    const rest = COURSES.filter((c) => fresh.indexOf(c) === -1);
    app.innerHTML = `
      <div class="container">
        <h1 class="tool-h">${t("gal_title")}</h1>
        <p class="section-sub">${t("gal_sub")}</p>
        <h2 class="gal-h2">${t("new_title")}</h2>
        <div class="gal-grid feat">${fresh.map(tile).join("")}</div>
        <h2 class="gal-h2">${t("gal_all")} (${rest.length})</h2>
        <div class="gal-grid">${rest.map(tile).join("")}</div>
      </div>`;
    window.scrollTo(0, 0);
  }

  /* ---------------- View: Course map — infographic lesson flow ---------------- */
  function renderCourseMap(courseId) {
    const c = courseById(courseId);
    if (!c) return renderNotFound();
    const canAll = isFree(c) || hasCourseAccess(c.id);
    const done = completedSet(c.id);
    const PALETTE = ["#7b2ff7", "#0ea5e9", "#f59e0b", "#10b981", "#ef4444", "#d946ef"];
    const typeIc = (l) => l.type === "video" ? "🎬" : l.type === "quiz" ? "❓" : l.type === "exercise" ? "🏋️" : "📖";
    let n = 0;
    const secs = (c.sections || []).map((s, si) => {
      const col = PALETTE[si % PALETTE.length];
      const rows = (s.lessons || []).map((l) => {
        n++;
        const locked = !canAll && n > PREVIEW_LESSONS;
        const isDone = done.has(l.id);
        const href = locked ? "#/premium/" + c.id : "#/learn/" + c.id + "/" + l.id;
        return `<a class="cmap-lesson${isDone ? " done" : ""}${locked ? " locked" : ""}" href="${href}">
          <span class="cm-n" style="background:${col}">${n}</span>
          <span class="cm-ic">${typeIc(l)}</span>
          <span class="cm-t">${lf(l, "title")}</span>
          <span class="cm-d">${isDone ? "✅" : locked ? "🔒" : escapeHtml(l.duration || "")}</span>
        </a>`;
      }).join("");
      return `<div class="cmap-sec" style="--sc:${col}">
        <div class="cmap-head"><span class="cm-step">${si + 1}</span> ${secName(c, si)}</div>
        ${rows}
      </div>${si < c.sections.length - 1 ? '<div class="cmap-arrow">▼</div>' : ""}`;
    }).join("");
    app.innerHTML = `
      <div class="container" style="max-width:760px">
        <div class="muted" style="font-size:13px"><a href="#/course/${c.id}">← ${cf(c, "title")}</a></div>
        <h1 class="tool-h">🗺️ ${t("map_title")}</h1>
        <p class="section-sub">${c.icon} ${cf(c, "title")} · ${totalLessons(c)} ${t("lessons_word")} · ⏱ ${c.hours} ${t("hrs")} · ${progressPct(c)}% ${t("pct_complete_word")}</p>
        <div class="cmap">${secs}</div>
      </div>`;
    window.scrollTo(0, 0);
  }

  /* ---------------- View: Find-my-course starter quiz ---------------- */
  /* 👋 First-run onboarding — a short, dismissible welcome that explains how
     the app works (learn → run code → habit → certificate) and sets a weekly
     goal, so new students aren't dropped into XP/streaks/chat with no context.
     Shown once per device (wda_onboarded). */
  const ONB_CARDS = [
    { ic: "👋", tk: "onb1_t", bk: "onb1_b" },
    { ic: "🏃", tk: "onb2_t", bk: "onb2_b" },
    { ic: "🔥", tk: "onb3_t", bk: "onb3_b", goal: true },
    { ic: "🎓", tk: "onb4_t", bk: "onb4_b", cta: true },
  ];
  function maybeOnboard() {
    try { if (localStorage.getItem("wda_onboarded")) return; } catch (e) { return; }
    renderOnboarding();
  }
  function finishOnboard(dest) {
    try { localStorage.setItem("wda_onboarded", "1"); } catch (e) {}
    const ov = document.querySelector(".onb-overlay");
    if (ov) ov.remove();
    if (dest) location.hash = dest;
  }
  function renderOnboarding() {
    if (document.querySelector(".onb-overlay")) return;
    let i = 0;
    const wrap = document.createElement("div");
    wrap.className = "onb-overlay";
    document.body.appendChild(wrap);
    const draw = () => {
      const c = ONB_CARDS[i];
      const last = i === ONB_CARDS.length - 1;
      wrap.innerHTML = `
        <div class="onb-card">
          <button class="onb-skip" type="button">${t("onb_skip")}</button>
          <div class="onb-ic">${c.ic}</div>
          <h2>${t(c.tk)}</h2>
          <p>${t(c.bk)}</p>
          ${c.goal ? `<div class="onb-goal">
            <div class="muted" style="font-size:13px;margin-bottom:6px">${t("onb_goal_q")}</div>
            <div class="tl-row" style="justify-content:center">
              ${[3, 5, 10].map((g) => `<button class="btn btn-outline btn-sm" data-goal="${g}">${g} ${t("lessons_word")}</button>`).join("")}
            </div></div>` : ""}
          <div class="onb-dots">${ONB_CARDS.map((_, k) => `<span class="${k === i ? "on" : ""}"></span>`).join("")}</div>
          ${c.cta
            ? `<div class="onb-cta">
                 <a class="btn btn-primary btn-block" href="#/start" data-onb-go>🧭 ${t("onb_cta_quiz")}</a>
                 <a class="btn btn-outline btn-block" style="margin-top:8px" href="#/courses" data-onb-go>📚 ${t("onb_cta_browse")}</a>
               </div>`
            : `<button class="btn btn-primary btn-block onb-next" type="button">${t("onb_next")} →</button>`}
        </div>`;
      wrap.querySelector(".onb-skip").addEventListener("click", () => finishOnboard(null));
      const next = wrap.querySelector(".onb-next");
      if (next) next.addEventListener("click", () => { i++; draw(); });
      wrap.querySelectorAll("[data-goal]").forEach((b) => b.addEventListener("click", () => {
        jset(ns("wda_goal"), Number(b.getAttribute("data-goal")));
        wrap.querySelectorAll("[data-goal]").forEach((x) => x.classList.remove("btn-primary"));
        b.classList.add("btn-primary");
        setTimeout(() => { i++; draw(); }, 250);
      }));
      wrap.querySelectorAll("[data-onb-go]").forEach((b) => b.addEventListener("click", (e) => {
        e.preventDefault();
        finishOnboard(b.getAttribute("href"));
      }));
    };
    draw();
  }

  function renderStart() {
    const PICKS = {
      job: { new: "zero-to-hero", some: "webdev-bootcamp", pro: "fullstack", alts: ["git-basics", "dev-career"] },
      web: { new: "web-basics", some: "webdev-bootcamp", pro: "react-basics", alts: ["css-mastery", "responsive-design"] },
      ai: { new: "n8n-automation", some: "ai-engineering", pro: "ai-engineering", alts: ["python-basics", "cloud-computing"] },
      data: { new: "excel-basics", some: "sql-basics", pro: "python-basics", alts: ["rdbms-basics", "dsa-basics"] },
    };
    const q = (key, title, opts) => `
      <div class="panel start-q" data-q="${key}">
        <h3>${title}</h3>
        <div class="tl-chips">${opts.map(([v, label]) => `<button class="chip" data-v="${v}" type="button">${label}</button>`).join("")}</div>
      </div>`;
    app.innerHTML = `
      <div class="container" style="max-width:760px">
        <h1 class="tool-h">${t("start_title")}</h1>
        <p class="section-sub">${t("start_sub")}</p>
        ${q("goal", t("start_q1"), [["job", t("start_g_job")], ["web", t("start_g_web")], ["ai", t("start_g_ai")], ["data", t("start_g_data")]])}
        ${q("exp", t("start_q2"), [["new", t("start_x_new")], ["some", t("start_x_some")], ["pro", t("start_x_pro")]])}
        ${q("time", t("start_q3"), [["low", t("start_t_low")], ["mid", t("start_t_mid")], ["high", t("start_t_high")]])}
        <div id="start-result"></div>
      </div>`;
    const ans = {};
    app.querySelectorAll(".start-q").forEach((panel) => {
      panel.addEventListener("click", (e) => {
        const b = e.target.closest("[data-v]");
        if (!b) return;
        panel.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === b));
        ans[panel.dataset.q] = b.dataset.v;
        if (ans.goal && ans.exp && ans.time) {
          const conf = PICKS[ans.goal];
          const main = courseById(conf[ans.exp]) || courseById(conf.new);
          const alts = conf.alts.map(courseById).filter((x) => x && x !== main).slice(0, 2);
          const tip = ans.time === "low" ? t("start_tip_low") : ans.time === "high" ? t("start_tip_high") : t("start_tip_mid");
          const box = document.getElementById("start-result");
          box.innerHTML = `
            <h2 class="gal-h2">🎯 ${t("start_reco")}</h2>
            <div class="grid" style="grid-template-columns:1fr">${courseCard(main)}</div>
            <div class="callout tip" style="margin:14px 0">${tip}</div>
            <h2 class="gal-h2">${t("start_also")}</h2>
            <div class="grid">${alts.map(courseCard).join("")}</div>`;
          box.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
    window.scrollTo(0, 0);
  }

  /* ---------------- View: Home ---------------- */
  /* Courses to spotlight in the home "New & trending" strip */
  const NEW_COURSE_IDS = ["zero-to-hero", "n8n-automation", "ai-engineering", "cloud-computing"];

  function renderHome() {
    const featured = COURSES.slice(0, 4);
    const fresh = NEW_COURSE_IDS.map(courseById).filter(Boolean);
    /* Trending: most-enrolled courses not already shown in Featured */
    const trending = COURSES.filter((c) => featured.indexOf(c) === -1 && fresh.indexOf(c) === -1)
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
            <div style="margin-top:12px"><a class="hero-quiz" href="#/start">🧭 ${t("start_link")}</a></div>
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
        ${streakNudge()}
        ${dailyHomeCard()}
        ${reviewHomeCard()}
        ${howtoHomeCard()}
        ${communityHomeCard()}
        ${motivHomeCard()}
        ${resumeBanner()}
        ${fresh.length ? `
        <h2 class="section-title">🆕 ${t("new_title")}</h2>
        <p class="section-sub">${t("new_sub")}</p>
        <div class="grid">${fresh.map(courseCard).join("")}</div>` : ""}

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

        <h2 class="section-title">🧰 ${t("tools_title")}</h2>
        <p class="section-sub">${t("tools_sub")}</p>
        <div class="chips">
          ${TOOLS.map((tl) => `<a class="chip" href="#/tools/${tl.id}">${tl.ic} ${t("tool_" + tl.id)}</a>`).join("")}
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
    const exCount = flat.filter((x) => x.lesson.type === "exercise").length;
    const contentCount = flat.length - quizCount;
    const isBeg = c.level === "Beginner" || c.category === "Kids";
    const reqs = isBeg ? [t("req_none"), t("req_device")] : [t("req_basics"), t("req_device")];
    const audience = isBeg
      ? [t("who_1_beg"), t("who_2")]
      : [t("who_1_adv").replace("{cat}", catName(c.category)), t("who_2")];

    /* resume at the first lesson not yet completed */
    const firstOpen = flat.find((x) => !done.has(x.lesson.id));
    const resumeLesson = firstOpen ? firstOpen.lesson.id : firstLesson;
    const resumeSec = firstOpen ? c.sections.findIndex((s) => s.lessons.some((l) => l.id === firstOpen.lesson.id)) : 0;

    /* curriculum rows link straight into the player; premium courses show
       🎁 on the free-preview lessons and 🔒 (→ premium page) past them */
    const premLocked = !isFree(c) && !hasCourseAccess(c.id);
    let flatIdx = 0;
    const curriculum = c.sections
      .map((sec, si) => {
        let doneInSec = 0;
        const rows = sec.lessons
          .map((l) => {
            const isDone = done.has(l.id);
            if (isDone) doneInSec++;
            const lLocked = premLocked && flatIdx >= PREVIEW_LESSONS;
            const isPrev = premLocked && flatIdx < PREVIEW_LESSONS;
            flatIdx++;
            return `
              <a class="lesson-row ${isDone ? "done" : ""} ${lLocked ? "locked" : ""}"
                 href="${lLocked ? "#/premium" : `#/learn/${c.id}/${l.id}`}">
                <span class="ic">${isDone ? '<span class="check">✓</span>' : lLocked ? "🔒" : lessonIcon(l.type)}</span>
                <span class="ttl">${lf(l, "title")}${isPrev ? ` <span class="prev-chip">🎁 ${t("lesson_preview")}</span>` : ""}</span>
                <span class="dur">${l.duration}</span>
              </a>`;
          })
          .join("");
        const prog = enrolled && doneInSec
          ? ` · <span class="sec-done">✓ ${doneInSec}/${sec.lessons.length}</span>`
          : ` · ${sec.lessons.length} ${t("lessons_word")}`;
        return `
          <div class="acc-section ${si === 0 || (enrolled && pct > 0 && si === resumeSec) ? "open" : ""}">
            <button class="acc-head" data-acc>
              <span>${secName(c, si)} <span class="meta">${prog}</span></span>
              <span class="caret">▾</span>
            </button>
            <div class="acc-body">${rows}</div>
          </div>`;
      })
      .join("");

    /* a premium course lets a logged-in non-member read the first few
       lessons free before the paywall — invite them to start the preview */
    const canPreview = !isFree(c) && loggedIn() && !hasCourseAccess(c.id) && firstLesson;
    const enrollLabel =
      !isFree(c) && !loggedIn() ? t("login_to_enroll")
      : !isFree(c) && !hasCourseAccess(c.id) ? "⭐ " + t("prem_go")
      : `${t("enroll_now")} ${priceText(c)}`;
    const cta = enrolled
      ? `<a class="btn btn-primary btn-block" href="#/learn/${c.id}/${pct > 0 ? resumeLesson : firstLesson}">${pct > 0 ? t("continue_learning") : t("start_course")}</a>`
      : canPreview
      ? `<a class="btn btn-primary btn-block" href="#/learn/${c.id}/${firstLesson}">🎁 ${t("preview_start")}</a>
         <a class="btn btn-outline btn-block" style="margin-top:8px" href="#/premium">⭐ ${t("prem_go")}</a>`
      : `<button class="btn btn-primary btn-block" data-enroll="${c.id}">${enrollLabel}</button>`;
    /* 1 course = 1 premium: cheaper single-course unlock */
    const buyOne = premLocked && PAYMENT_CONFIG.coursePrice
      ? `<a class="btn btn-ghost btn-block" style="margin-top:8px" href="#/premium/${c.id}">🎫 ${t("buy_course")} · ${fmt(PAYMENT_CONFIG.coursePrice)} Ks</a>`
      : "";
    /* mobile: keep the main action reachable while scrolling the long page */
    const stickyAction = enrolled
      ? `<a class="btn btn-primary" href="#/learn/${c.id}/${pct > 0 ? resumeLesson : firstLesson}">${pct > 0 ? t("continue_learning") : t("start_course")}</a>`
      : canPreview
      ? `<a class="btn btn-primary" href="#/learn/${c.id}/${firstLesson}">🎁 ${t("preview_start")}</a>`
      : premLocked && PAYMENT_CONFIG.coursePrice
      ? `<a class="btn btn-primary" href="#/premium/${c.id}">🎫 ${fmt(PAYMENT_CONFIG.coursePrice)} Ks</a>`
      : `<button class="btn btn-primary" data-enroll="${c.id}">${enrollLabel}</button>`;

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
              ${isStarterCourse(c) ? `<span class="dbadge soon">🚧 ${t("soon_badge")}</span>` : ""}
            </div>
          </div>

          <aside class="buybox">
            <div class="course-gal peek">
              <span class="cg-count" id="cg-count">1/4</span>
              <div class="cg-track" id="cg-track">
                <div class="cg-slide" style="background:${c.color}${c.image ? `;background-image:url('${escapeHtml(c.image)}');background-size:cover;background-position:center` : ""}">${c.image ? "" : c.icon}</div>
                <div class="cg-slide"><img id="cg-map" alt="Course structure"></div>
                <div class="cg-slide"><img id="cg-learn" alt="What you'll learn"></div>
                <div class="cg-slide"><img id="cg-stats" alt="Course overview"></div>
              </div>
              <div class="cg-dots" id="cg-dots"><i class="on"></i><i></i><i></i><i></i></div>
            </div>
            <div class="pad">
              <div class="price ${isFree(c) ? "" : "premium"}">${priceTag(c)}</div>
              ${enrolled && pct > 0 ? `<div class="progress" style="margin-bottom:14px"><span style="width:${pct}%"></span></div><div class="muted" style="margin-bottom:14px">${pct}% ${t("pct_complete_word")} · ⏱ ${formatTime(getTotalTimeSpent(c.id))}</div>` : ""}
              ${cta}${buyOne}
              <a class="btn btn-outline btn-block" style="margin-top:10px" href="#/map/${c.id}">🗺️ ${t("map_view")}</a>
              ${projectFor(c.id) ? `<a class="btn btn-outline btn-block" style="margin-top:10px" href="#/project/${projectFor(c.id).id}">🚀 ${t("course_project")}</a>` : ""}
              ${!isFree(c) && !isPremiumUser() && premiumCoursesMap[c.id] ? `<div class="tl-status ok" style="text-align:center">✓ ${t("purchased")}</div>` : ""}
              ${enrolled && pct === 100 ? `<a class="btn btn-ghost btn-block" style="margin-top:10px" href="#/certificate/${c.id}">🎓 ${t("cert_view")}</a>` : ""}
              <div class="includes-title">${t("includes_title")}</div>
              <ul class="includes">
                <li>📚 ${contentCount} ${t("lessons_word")}${quizCount ? ` · ❓ ${quizCount} ${t("quizzes_word")}` : ""}${exCount ? ` · 🏋️ ${exCount} ${t("exercises_word")}` : ""}</li>
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
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <h2 style="margin:0">${t("what_learn")}</h2>
                <button class="btn btn-outline btn-sm" id="course-simple">💡 ${t("simple_points")}</button>
              </div>
              <div id="course-simple-out"></div>
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
              ${isStarterCourse(c) ? `<div class="callout">${t("soon_note")}</div>` : ""}
              <div class="accordion">${curriculum}</div>
            </div>
            ${reviewsPanel(c)}
            <div class="panel">
              <h2>💬 ${t("faq_title")}</h2>
              <div class="accordion">
                ${[1, 2, 3, 4].map((i) => `
                  <div class="acc-section">
                    <button class="acc-head" data-acc>
                      <span>${t("faq_q" + i)}</span><span class="caret">▾</span>
                    </button>
                    <div class="acc-body faq-a">${t("faq_a" + i)}</div>
                  </div>`).join("")}
              </div>
            </div>
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
              <h2>🎓 ${t("cert_teaser_title")}</h2>
              <div class="cert-teaser">
                <div class="ct-brand">&lt;/&gt; WebDev Academy</div>
                <div class="ct-cert">CERTIFICATE</div>
                <div class="ct-name">${escapeHtml((loggedIn() && window.Auth.current() && window.Auth.current().name) || t("cert_your_name"))}</div>
                <div class="ct-course">${cf(c, "title")}</div>
              </div>
              ${pct === 100
                ? `<a class="btn btn-primary btn-block" style="margin-top:12px" href="#/certificate/${c.id}">🎓 ${t("cert_view")}</a>`
                : `<p class="muted" style="margin-top:10px;font-size:13px">${t("cert_teaser_note")}${enrolled && pct > 0 ? ` (${pct}%)` : ""}</p>`}
            </div>
            <div class="panel">
              <h2>${t("share_course")}</h2>
              <button class="btn btn-classroom btn-block" id="course-classroom" type="button">📚 ${t("classroom_assign")}</button>
              <p class="muted" style="font-size:12px;margin:6px 0 10px">${t("classroom_hint")}</p>
              <a class="btn btn-primary btn-block" target="_blank" rel="noopener"
                 href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.origin + location.pathname + "#/course/" + c.id)}">📘 ${t("share_fb")}</a>
              <button class="btn btn-outline btn-block" id="course-share" type="button" style="margin-top:8px">🔗 ${t("cert_copy")}</button>
            </div>
          </aside>
        </div>
      </section>

      ${(() => {
        /* same category first; small categories fill up with same-level,
           then most-popular courses so the strip never sits empty */
        const related = COURSES.filter((x) => x.id !== c.id && x.category === c.category).slice(0, 3);
        const sameCat = related.length;
        const fill = (pool) => pool.forEach((x) => {
          if (related.length < 3 && x.id !== c.id && related.indexOf(x) === -1) related.push(x);
        });
        fill(COURSES.filter((x) => x.level === c.level));
        fill(COURSES.slice().sort((a, b) => (b.students || 0) - (a.students || 0)));
        const title = sameCat >= 3
          ? t("related_title").replace("{cat}", catName(c.category))
          : t("related_generic");
        return related.length ? `
          <div class="container related-wrap">
            <h2 class="section-title">${title}</h2>
            <div class="grid">${related.map(courseCard).join("")}</div>
          </div>` : "";
      })()}

      <div class="course-stickybar">
        <div class="csb-info">
          <b>${priceTag(c)}</b>
          <span class="muted">${enrolled && pct > 0 ? pct + "% ✓" : "⭐ " + c.rating.toFixed(1) + " · " + totalLessons(c) + " " + t("lessons_word")}</span>
        </div>
        ${stickyAction}
      </div>`;

    app.querySelectorAll("[data-acc]").forEach((h) =>
      h.addEventListener("click", () => h.parentElement.classList.toggle("open"))
    );
    /* both the buybox button and the mobile sticky bar can carry data-enroll */
    app.querySelectorAll("[data-enroll]").forEach((enrollBtn) =>
      enrollBtn.addEventListener("click", () => {
        const go = () => {
          enroll(c.id);
          location.hash = `#/learn/${c.id}/${firstLesson}`;
        };
        if (isFree(c)) go();
        else requireAuth(() => { if (hasCourseAccess(c.id)) go(); else location.hash = "#/premium"; });
      })
    );
    const gcBtn = app.querySelector("#course-classroom");
    if (gcBtn) gcBtn.addEventListener("click", () => shareToClassroom("#/course/" + c.id, cf(c, "title")));

    /* 💡 "Simple points" — a free, freeCodeCamp-plain explainer of the course
       in the student's language, generated once then cached per course. */
    const simpleBtn = app.querySelector("#course-simple");
    const simpleOut = app.querySelector("#course-simple-out");
    const drawSimple = (txt) => {
      const items = String(txt).split("\n").map((l) => l.replace(/^\s*[-*•]\s*/, "").trim()).filter(Boolean).slice(0, 6);
      if (!items.length) { simpleOut.innerHTML = ""; return; }
      simpleOut.innerHTML = `<div class="callout tip" style="margin:12px 0 4px">
        <strong>💡 ${t("simple_points")}</strong>
        <ul style="margin:6px 0 0;padding-left:20px">${items.map((x) => `<li style="margin:4px 0">${escapeHtml(x)}</li>`).join("")}</ul></div>`;
    };
    if (simpleBtn && simpleOut) {
      const key = ns("wda_csimple::" + lang + "::" + c.id);
      const cached = jget(key, null);
      if (cached) drawSimple(cached);
      simpleBtn.addEventListener("click", () => {
        const have = jget(key, null);
        if (have) { drawSimple(have); simpleOut.scrollIntoView({ block: "nearest" }); return; }
        if (!(window.AI && window.AI.ready())) { simpleOut.innerHTML = `<p class="muted" style="margin:8px 0 0">${escapeHtml(t("ai_no_key"))}</p>`; return; }
        simpleBtn.disabled = true;
        simpleOut.innerHTML = `<p class="muted" style="margin:8px 0 0">💡 ${escapeHtml(t("tutor_thinking"))}</p>`;
        const learns = (cf(c, "whatYouLearn") || []).join("; ");
        window.AI.complete(
          "Explain the coding course \"" + cf(c, "title") + "\" (" + cf(c, "subtitle") + ") to a total beginner, " +
          (lang === "my" ? "in simple Burmese — keep technical words (HTML, CSS…) in English. " : "in very simple English. ") +
          "Give 3 to 5 short bullet points: what you'll be able to DO after it and why it matters. Dead simple, no jargon, like freeCodeCamp. " +
          "Start each line with '- '. The course covers: " + learns,
          { maxTokens: 500 }
        ).then((res) => {
          let txt = String(res || "").trim();
          if (window.AI.stripFences) txt = window.AI.stripFences(txt);
          jset(key, txt);
          drawSimple(txt);
          simpleBtn.disabled = false;
        }).catch((e) => {
          simpleOut.innerHTML = `<p class="muted" style="margin:8px 0 0">⚠ ${escapeHtml((e && e.message) || "AI")}</p>`;
          simpleBtn.disabled = false;
        });
      });
    }
    const shareBtn = app.querySelector("#course-share");
    if (shareBtn) shareBtn.addEventListener("click", () => {
      const link = location.origin + location.pathname + "#/course/" + c.id;
      const done = () => { shareBtn.textContent = "✓ " + t("cert_copied"); };
      if (navigator.clipboard) navigator.clipboard.writeText(link).then(done).catch(() => fallbackCopy(link, done));
      else fallbackCopy(link, done);
    });
    /* 🖼️ gallery: generate the two branded slides + wire the dots */
    try {
      const gl = document.getElementById("cg-learn");
      const gs = document.getElementById("cg-stats");
      const gm = document.getElementById("cg-map");
      if (gl && gs) { gl.src = drawCourseSlide(c, "learn"); gs.src = drawCourseSlide(c, "stats"); }
      if (gm) gm.src = drawCourseSlide(c, "map");
      const track = document.getElementById("cg-track");
      const dots = document.getElementById("cg-dots");
      const cnt = document.getElementById("cg-count");
      if (track && dots) track.addEventListener("scroll", () => {
        const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
        dots.querySelectorAll("i").forEach((d, di) => d.classList.toggle("on", di === i));
        if (cnt) cnt.textContent = (i + 1) + "/" + track.children.length;
      }, { passive: true });
    } catch (e) {}
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
    const form = box.querySelector(".tutor-form"); /* present only for full-tutor users */
    const inp = form ? form.querySelector("input") : null;
    const history = [];
    /* full tutor = premium or paid course; free students get the two
       comprehension chips (Simpler / Burmese), capped per day */
    const fullTutor = isPremiumUser() || (!isFree(course) && hasCourseAccess(course.id));
    const freeChips = { simple: 1, burmese: 1, recap: 1, diagram: 1, realworld: 1, story: 1 };
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
      if (!window.AI) { bubble("bot", escapeHtml(t("ai_no_key"))); return Promise.resolve(null); }
      bubble("me", escapeHtml(displayText || question));
      const wait = bubble("bot", "⏳ " + escapeHtml(t("tutor_thinking")));
      const convo = history.slice(-6).map((h) => (h.me ? "Student" : "Tutor") + ": " + h.text).join("\n");
      history.push({ me: true, text: question.slice(0, 300) });
      return window.AI.complete(
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
        return reply;
      }).catch((err) => {
        const m = (err && err.message) || String(err);
        wait.innerHTML = m === "no-key" ? escapeHtml(t("ai_no_key")) : "⚠ AI: " + escapeHtml(m);
        return null;
      });
    };
    const chipQs = {
      recap: "List the 3 most important things a beginner should remember from this lesson, as exactly 3 short bullet points. Start each line with '- '. Keep each bullet under 14 words. No intro, no code — just the 3 bullets.",
      diagram: "Draw a simple text mind-map / diagram (ASCII art) of the key parts of this lesson and how they connect. Use indentation with ├─ └─ branches and → arrows. Put the WHOLE diagram inside one ``` code block and add nothing outside it. Keep it small, clear and beginner-friendly.",
      simple: "Re-explain this whole lesson in very simple English, like I am 12 years old. Use short sentences and one everyday real-life analogy to make the main idea click.",
      burmese: "Re-explain this whole lesson in simple Burmese (Myanmar language), step by step, so a beginner truly understands. Keep technical words (HTML, CSS, tag names, code) in English. Use short sentences.",
      realworld: "Give ONE short, concrete real-world example of how the main idea of this lesson is used in a real website, app or everyday situation. 2-3 simple sentences a teenager can relate to.",
      story: "Explain the main idea of this lesson as a very short, fun story (3-4 sentences): a character has a problem, then solves it using this lesson's idea. Keep it simple and friendly.",
      example: "Show me one more small code example for this lesson, different from the one in the lesson, and explain it briefly.",
      practice: "Give me one small practice exercise for this lesson. Do not show the solution — encourage me to try first.",
    };
    /* These aids are stable per lesson, so cache the first result (per lesson
       AND language) — re-opening is instant and spends no free-use credit. */
    const CACHED = { recap: 1, diagram: 1, realworld: 1, story: 1 };
    const langHint = lang === "my" ? " Reply in simple Burmese; keep technical words (HTML, CSS, tag names, code) in English." : "";
    const cacheKeyFor = (kind) => ns("wda_aicache::" + kind + "::" + lang + "::" + lesson.id);
    const updateFreeLeft = () => {
      const el = box.querySelector("#tutor-free-left");
      if (el) el.textContent = t("tutor_free_left").replace("{n}", aiFreeLeft());
    };
    box.querySelectorAll("[data-tq]").forEach((b) =>
      b.addEventListener("click", () => {
        const kind = b.getAttribute("data-tq");
        const label = b.textContent.trim();
        /* cached aids: serve instantly (no AI call, no credit spent) */
        if (CACHED[kind]) {
          const cached = jget(cacheKeyFor(kind), null);
          if (cached) { bubble("me", escapeHtml(label)); bubble("bot", fmt(cached)); return; }
        }
        /* free students: the comprehension chips are capped per day */
        if (!fullTutor && freeChips[kind]) {
          if (aiFreeLeft() <= 0) {
            bubble("bot", "🔒 " + escapeHtml(t("tutor_free_out")) +
              ' <a href="#/premium">⭐ ' + escapeHtml(t("prem_go")) + "</a>");
            return;
          }
          aiFreeInc();
          updateFreeLeft();
        }
        const p = ask(chipQs[kind] + (CACHED[kind] ? langHint : ""), label);
        if (CACHED[kind] && p) p.then((reply) => { if (reply) jset(cacheKeyFor(kind), reply); });
      })
    );
    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = inp.value.trim();
      if (!q) return;
      inp.value = "";
      ask(q);
    });
  }

  const PREVIEW_LESSONS = 2; /* free taste of a premium course before the paywall */

  /* 🎉 SoloLearn-style celebration when a lesson is completed:
     confetti + XP + streak, then continue */
  function showCelebration(nextHash) {
    const old = document.querySelector(".cele-overlay");
    if (old) old.remove();
    const colors = ["#a435f0", "#654ea3", "#eaafc8", "#3bb78f", "#ffd166", "#ff6b6b"];
    const confetti = Array.from({ length: 40 }, (_, i) => {
      const left = Math.random() * 100;
      const delay = (Math.random() * 0.5).toFixed(2);
      const dur = (1.7 + Math.random() * 1.5).toFixed(2);
      const size = Math.round(7 + Math.random() * 7);
      const rot = Math.round(Math.random() * 360);
      return `<i style="left:${left}%;width:${size}px;height:${Math.round(size * .45)}px;background:${colors[i % colors.length]};animation-delay:${delay}s;animation-duration:${dur}s;transform:rotate(${rot}deg)"></i>`;
    }).join("");
    const wrap = document.createElement("div");
    wrap.className = "cele-overlay";
    wrap.innerHTML = `
      <div class="cele-confetti" aria-hidden="true">${confetti}</div>
      <div class="cele-card">
        <div class="cele-emoji">🎉</div>
        <h2>${t("cele_done")}</h2>
        <div class="cele-xp">+10 XP</div>
        <div class="cele-streak">🔥 ${dayStreak()} ${t("stat_streak")}</div>
        <div class="cele-quote">${motivText(MOTIV[Math.floor(Math.random() * MOTIV.length)])}</div>
        <button class="btn btn-primary btn-block" id="cele-next">${nextHash ? t("next_lesson") : t("finish")} →</button>
      </div>`;
    document.body.appendChild(wrap);
    const go = () => {
      wrap.remove();
      if (nextHash) location.hash = nextHash;
      else window.dispatchEvent(new Event("hashchange"));
    };
    wrap.querySelector("#cele-next").addEventListener("click", go);
    wrap.addEventListener("click", (e) => { if (e.target === wrap) go(); });
  }

  /* SoloLearn-style Step Mode: split an article's HTML into bite-sized
     cards at each <h3> heading. Returns an array of HTML strings. */
  function splitLessonSteps(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const groups = [];
    let cur = [];
    [...tmp.childNodes].forEach((n) => {
      if (n.nodeType === 1 && n.tagName === "H3" && cur.length) { groups.push(cur); cur = [n]; }
      else cur.push(n);
    });
    if (cur.length) groups.push(cur);
    return groups
      .map((nodes) => {
        const d = document.createElement("div");
        nodes.forEach((n) => d.appendChild(n));
        return d.innerHTML;
      })
      .filter((s) => s.replace(/\s|&nbsp;/g, "").length > 0);
  }

  /* 📊 lesson confidence poll — how well students felt they understood.
     Votes go to stats/polls/<lessonId> (one pushed record each); results are
     tallied client-side. One vote per account (local guard). Also gives the
     admin a signal for which lessons confuse students. */
  const POLL_OPTS = [
    { v: 0, emoji: "😕", key: "poll_confusing" },
    { v: 1, emoji: "😐", key: "poll_ok" },
    { v: 2, emoji: "😀", key: "poll_gotit" },
  ];
  function wireLessonPoll(lessonId) {
    const body = document.getElementById("poll-body");
    if (!body) return;
    const base = statsBase();
    const already = pollVoted(lessonId);

    const renderResults = (counts, myOpt) => {
      const total = counts.reduce((a, b) => a + b, 0) || 0;
      body.innerHTML = POLL_OPTS.map((o) => {
        const n = counts[o.v] || 0;
        const pct = total ? Math.round((n / total) * 100) : 0;
        return `<div class="poll-row ${myOpt === o.v ? "mine" : ""}">
            <span class="poll-lbl">${o.emoji} ${t(o.key)}</span>
            <span class="poll-bar"><i style="width:${pct}%"></i></span>
            <span class="poll-pct">${pct}%</span>
          </div>`;
      }).join("") +
      `<p class="muted" style="font-size:12px;margin:8px 0 0">${total ? t("poll_total").replace("{n}", total) : t("poll_first")}</p>`;
    };

    const showVoting = () => {
      body.innerHTML = `<div class="poll-opts">${POLL_OPTS.map((o) =>
        `<button type="button" class="poll-opt" data-poll="${o.v}">${o.emoji}<span>${t(o.key)}</span></button>`).join("")}</div>`;
      body.querySelectorAll("[data-poll]").forEach((b) => b.addEventListener("click", () => {
        const opt = Number(b.getAttribute("data-poll"));
        setPollVoted(lessonId, opt);
        /* optimistic: show my vote immediately, then load real tallies */
        renderResults(tallyWith({}, opt), opt);
        if (base) {
          authFetch(base + "/stats/polls/" + encodeURIComponent(lessonId) + ".json",
            { method: "POST", body: JSON.stringify({ o: opt, ts: Date.now() }) })
            .then(() => loadTally(opt)).catch(() => {});
        }
      }));
    };

    const tallyWith = (val, myOpt) => {
      const counts = [0, 0, 0];
      Object.values(val || {}).forEach((r) => { const o = r && Number(r.o); if (o >= 0 && o <= 2) counts[o]++; });
      /* make sure my own just-cast vote shows even before the server echoes it */
      if (myOpt != null && !Object.keys(val || {}).length) counts[myOpt]++;
      return counts;
    };
    const loadTally = (myOpt) => {
      if (!base) { renderResults(tallyWith({}, myOpt), myOpt); return; }
      fetch(base + "/stats/polls/" + encodeURIComponent(lessonId) + ".json")
        .then((r) => r.json())
        .then((val) => renderResults(tallyWith(val, myOpt), myOpt))
        .catch(() => renderResults(tallyWith({}, myOpt), myOpt));
    };

    if (already != null) loadTally(already);
    else showVoting();
  }

  function renderLearn(courseId, lessonId) {
    /* stop any auto-play narration from a previous render */
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
    const c = courseById(courseId);
    if (!c) return renderNotFound();
    /* lesson bodies live in the lazy bundle — fetch once, then continue */
    if (!window.APP_CONTENT) {
      app.innerHTML = `<div class="container"><div class="empty"><h2>⏳</h2><p class="muted">${t("prem_checking")}</p></div></div>`;
      loadContent().then(() => renderLearn(courseId, lessonId)).catch(() => renderNotFound());
      return;
    }

    const flat = lessonsOf(c);
    let idx = flat.findIndex((x) => x.lesson.id === lessonId);
    if (idx === -1) idx = 0;

    const locked = !isFree(c) && !hasCourseAccess(c.id);
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

    /* main content — articles default to SoloLearn-style Step Mode (small
       cards with a progress bar) when they have 2+ sections */
    let steps = null;
    if (current.type === "article") {
      const all = splitLessonSteps(lf(current, "content") || "");
      if (all.length >= 2) steps = all;
    }
    const useSteps = !!steps && localStorage.getItem("wda_lesson_mode") !== "full";

    /* ⚡ SoloLearn-style quick check: weave one tappable question into the
       cards, picked deterministically from this course's own quiz bank */
    let qc = null, qcIndex = -1;
    if (useSteps) {
      const bank = flat
        .filter((x) => x.lesson.type === "quiz")
        .flatMap((x) => x.lesson.questions || [])
        .filter((q) => q && q.q && (q.options || []).length >= 2);
      if (bank.length) {
        let h = 0;
        for (const ch of current.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
        qc = bank[h % bank.length];
        qcIndex = Math.min(steps.length, Math.max(1, Math.ceil(steps.length / 2)));
        steps.splice(qcIndex, 0, `
          <div class="qc">
            <div class="qc-tag">⚡ ${t("qc_title")}</div>
            <div class="qc-q">${qsafe(qc.q)}</div>
            <div class="qc-opts">
              ${qc.options.map((o, i) => `<button type="button" class="qc-opt" data-qc-opt="${i}">${qsafe(o)}</button>`).join("")}
            </div>
            <div class="qc-fb" hidden></div>
          </div>`);
      }
    }
    const body =
      current.type === "quiz" ? renderQuizHtml(current)
      : current.type === "exercise" ? renderExerciseHtml(current)
      : useSteps
      ? `<div class="steps-wrap">
           <div class="steps-head">
             <span class="muted" style="font-size:13px">${t("step_word")} <b id="step-num">1</b> / ${steps.length}</span>
             <span style="display:flex;gap:6px;flex-wrap:wrap">
               <button class="btn btn-primary btn-sm" id="step-play">▶ ${t("autoplay")}</button>
               <button class="btn btn-outline btn-sm" id="step-voice" title="${escapeHtml(t("voice_read"))}">${localStorage.getItem("wda_voice") === "1" ? "🔊" : "🔇"}</button>
               <button class="btn btn-outline btn-sm" data-lesson-mode="full">📄 ${t("full_view")}</button>
             </span>
           </div>
           <div class="progress thin"><span id="steps-bar" style="width:${Math.round(100 / steps.length)}%"></span></div>
           <div class="step-card" id="step-card"></div>
           <div class="steps-nav">
             <button class="btn btn-outline" id="step-back" disabled>←</button>
             <button class="btn btn-primary" id="step-next">${t("next_step")} →</button>
           </div>
         </div>`
      : (steps
          ? `<div class="steps-head" style="justify-content:flex-end"><button class="btn btn-outline btn-sm" data-lesson-mode="steps">🃏 ${t("step_mode")}</button></div>`
          : "") + (lf(current, "content") || "<p>—</p>");

    const prev = idx > 0 ? flat[idx - 1].lesson.id : null;
    const next = idx < flat.length - 1 ? flat[idx + 1].lesson.id : null;
    const isDoneNow = done.has(current.id);
    const secTitle = secName(c, flat[idx].sectionIdx);
    setLast(courseId, current.id);

    /* ⚡ full-view self-check: the same retrieval question Step Mode weaves in,
       so students reading in full view also get one check before moving on */
    let fullQc = null;
    if (!useSteps && (current.type === "article" || current.type === "video")) {
      const bank = flat.filter((x) => x.lesson.type === "quiz")
        .flatMap((x) => x.lesson.questions || [])
        .filter((q) => q && q.q && (q.options || []).length >= 2);
      if (bank.length) { let h = 0; for (const ch of current.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0; fullQc = bank[h % bank.length]; }
    }
    const fullQcHtml = fullQc
      ? `<div class="qc qc-standalone" id="full-qc">
           <div class="qc-tag">⚡ ${t("qc_title")}</div>
           <div class="qc-q">${qsafe(fullQc.q)}</div>
           <div class="qc-opts">${fullQc.options.map((o, i) => `<button type="button" class="qc-opt" data-qc-opt="${i}">${qsafe(o)}</button>`).join("")}</div>
           <div class="qc-fb" hidden></div>
         </div>`
      : "";

    /* 🎯 "Your turn" action step + 📊 confidence poll (article/video lessons) */
    const teachLesson = current.type === "article" || current.type === "video";
    const lessonHasCode = /<pre[\s>]/i.test(lf(current, "content") || "");
    const actDone = isActionDone(current.id);
    const actionHtml = teachLesson
      ? `<div class="action-step" id="action-step">
           <div class="as-head">🎯 <strong>${t("action_title")}</strong></div>
           <p class="as-task">${lessonHasCode ? t("action_task_code") : t("action_task_reflect")}</p>
           <div class="tl-row">
             ${lessonHasCode ? `<button class="btn btn-outline btn-sm" data-action-pg>🧪 ${t("pg_title")}</button>` : ""}
             <button class="btn ${actDone ? "btn-ghost" : "btn-primary"} btn-sm" id="action-done" ${actDone ? "disabled" : ""}>
               ${actDone ? "✓ " + t("action_done") : t("action_mark")}</button>
           </div>
         </div>`
      : "";
    const myVote = pollVoted(current.id);
    const pollHtml = teachLesson
      ? `<div class="lesson-poll" id="lesson-poll">
           <div class="as-head">📊 <strong>${t("poll_title")}</strong></div>
           <div id="poll-body"></div>
         </div>`
      : "";

    app.innerHTML = `
      <div class="learn-wrap">
        <div class="player-main">
          <div class="stage${current.type === "video" && current.src ? " has-video" : ""}">
            ${
              current.type === "video" && current.src
                ? videoEmbed(current.src, lf(current, "title"))
                : /* no video file — show the course art as an example image,
                     never a dead play button */
                  `${c.image ? `<span class="stage-cover" style="background-image:url('${escapeHtml(c.image)}')"></span><span class="stage-scrim"></span>` : ""}
                   <div class="stage-title">${lf(current, "title")}</div>
                   <div class="stage-center">
                     ${c.image ? "" : `<span class="stage-ic">${c.icon || "📚"}</span>`}
                     <span class="si-note">📖 ${t("lesson_read_below")}</span>
                     ${current.type === "video" ? `<a class="btn btn-youtube btn-sm" target="_blank" rel="noopener" style="margin-top:10px"
                        href="https://www.youtube.com/results?search_query=${encodeURIComponent(lf(current, "title") + " " + c.category + " tutorial")}">🎥 ${t("watch_video")}</a>` : ""}
                   </div>
                   <div class="stage-label">${secTitle} · ${t("lesson_word")} ${idx + 1} / ${flat.length}</div>`
            }
          </div>
          <div class="reader">
            <div class="muted" style="font-size:13px"><a href="#/course/${c.id}">← ${cf(c, "title")}</a></div>
            <h1>${lf(current, "title")}</h1>
            <p class="lesson-sub">${secTitle} · ${current.duration} · ⏱ ${t("spent")}: <span id="time-spent">${formatTime(loadLessonTime(current.id).total)}</span></p>
            ${previewMode ? `<div class="preview-banner">🎁 ${t("preview_free").replace("{n}", PREVIEW_LESSONS)} · <a href="#/premium">⭐ ${t("preview_unlock")}</a></div>` : ""}
            ${body}
            ${fullQcHtml}
            ${actionHtml}
            ${pollHtml}
            <div class="ai-tutor" id="ai-tutor">
              <div class="notes-head"><strong>🎓 ${t("tutor_title")}</strong> <span class="muted" style="font-size:12px">${t("tutor_sub")}</span></div>
              ${(() => {
                const fullTutor = isPremiumUser() || (!isFree(c) && hasCourseAccess(c.id));
                /* Simpler + Burmese are FREE for everyone — the core
                   "understand any lesson" aid. Examples, practice and
                   free-text Q&A stay Premium. */
                return `<div class="tutor-chips">
                     <button type="button" data-tq="recap">🎯 ${t("tutor_recap")}</button>
                     <button type="button" data-tq="diagram">🗺️ ${t("tutor_diagram")}</button>
                     <button type="button" data-tq="simple">💡 ${t("tutor_simple")}</button>
                     <button type="button" data-tq="burmese">🇲🇲 ${t("tutor_burmese")}</button>
                     <button type="button" data-tq="realworld">📖 ${t("tutor_realworld")}</button>
                     <button type="button" data-tq="story">🎭 ${t("tutor_story")}</button>
                     ${fullTutor ? `
                     <button type="button" data-tq="example">💻 ${t("tutor_example")}</button>
                     <button type="button" data-tq="practice">🏋️ ${t("tutor_practice")}</button>` : ""}
                   </div>
                   <div class="tutor-log" hidden></div>
                   ${fullTutor
                     ? `<form class="tutor-form">
                          <input type="text" maxlength="300" placeholder="${escapeHtml(t("tutor_ph"))}">
                          <button class="btn btn-primary btn-sm" type="submit">${t("tutor_ask")}</button>
                        </form>`
                     : `<p class="muted tutor-upsell" style="margin:10px 0 0;font-size:12.5px">
                          <span id="tutor-free-left">${t("tutor_free_left").replace("{n}", aiFreeLeft())}</span> ·
                          <a href="#/premium">⭐ ${t("tutor_more")}</a>
                        </p>`}`;
              })()}
            </div>
            <div class="notes">
              <div class="notes-head"><strong>${t("notes_title")}</strong> <span class="notes-status" id="notes-status"></span><a class="nb-link" href="#/notes">📓 ${t("nb_all")}</a></div>
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
                <button class="btn btn-outline btn-sm" data-classroom title="${escapeHtml(t("classroom_assign"))}">📚 ${t("classroom_short")}</button>
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

    /* full-view self-check: tap an answer → instant feedback (one attempt state) */
    const fqEl = app.querySelector("#full-qc");
    if (fqEl && fullQc) {
      fqEl.addEventListener("click", (e) => {
        const opt = e.target.closest("[data-qc-opt]");
        if (!opt || fqEl.dataset.done) return;
        const fb = fqEl.querySelector(".qc-fb");
        if (Number(opt.getAttribute("data-qc-opt")) === Number(fullQc.answer)) {
          fqEl.dataset.done = "1";
          opt.classList.add("right");
          fqEl.querySelectorAll(".qc-opt").forEach((b) => { b.disabled = true; });
          if (fb) { fb.hidden = false; fb.className = "qc-fb ok"; fb.textContent = "✅ " + t("qc_correct"); }
        } else {
          opt.classList.add("wrong");
          setTimeout(() => opt.classList.remove("wrong"), 500);
          if (fb) { fb.hidden = false; fb.className = "qc-fb no"; fb.textContent = "❌ " + t("qc_wrong"); }
        }
      });
    }

    /* 🎯 action step: open playground for the "do it" task + mark done (+XP) */
    const apg = app.querySelector("[data-action-pg]");
    if (apg) apg.addEventListener("click", () => {
      const firstPre = app.querySelector(".reader pre");
      openPlayground(firstPre ? codeTextOf(firstPre) : "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Your turn!</h1>\n\n</body>\n</html>");
    });
    const adBtn = app.querySelector("#action-done");
    if (adBtn) adBtn.addEventListener("click", () => {
      if (markActionDone(current.id)) {
        adBtn.className = "btn btn-ghost btn-sm";
        adBtn.disabled = true;
        adBtn.textContent = "✓ " + t("action_done");
        const step = app.querySelector("#action-step");
        if (step) { const m = document.createElement("p"); m.className = "tl-status ok"; m.style.margin = "8px 0 0";
          m.textContent = "🎉 " + t("action_praise") + " · +5 XP"; step.appendChild(m); }
        setTimeout(maybeToastBadges, 300);
        pushLeaderboard();
      }
    });

    /* 📊 confidence poll: vote once, then see the class results */
    wireLessonPoll(current.id);

    /* Step Mode wiring: show one card at a time with progress + nav */
    app.querySelectorAll("[data-lesson-mode]").forEach((b) =>
      b.addEventListener("click", () => {
        localStorage.setItem("wda_lesson_mode", b.getAttribute("data-lesson-mode"));
        renderLearn(courseId, lessonId);
      })
    );
    if (useSteps) {
      const card = app.querySelector("#step-card");
      const backB = app.querySelector("#step-back");
      const nextB = app.querySelector("#step-next");
      const numEl = app.querySelector("#step-num");
      const barEl = app.querySelector("#steps-bar");
      let si = 0;
      let qcOk = !qc; /* quick-check answered? (true when there is none) */
      const isDoneAlready = () => completedSet(c.id).has(current.id);
      const show = (i, dir) => {
        si = Math.max(0, Math.min(steps.length - 1, i));
        card.innerHTML = steps[si];
        /* SoloLearn-style swipe: forward slides in from the right,
           back slides in from the left */
        card.classList.remove("step-in", "step-in-back");
        void card.offsetWidth; /* restart the entrance animation */
        card.classList.add(dir === "back" ? "step-in-back" : "step-in");
        numEl.textContent = si + 1;
        barEl.style.width = Math.round(((si + 1) / steps.length) * 100) + "%";
        backB.disabled = si === 0;
        nextB.innerHTML = si === steps.length - 1
          ? (next ? "✓ " + t("step_finish") : "✓ " + t("mark_complete"))
          : t("next_step") + " →";
        /* the quick-check gates Next until it's answered correctly */
        nextB.disabled = si === qcIndex && !qcOk;
        addCopyButtons();
        card.scrollIntoView({ block: "nearest" });
      };

      /* answer taps on the quick-check card (delegated — card re-renders) */
      card.addEventListener("click", (e) => {
        const opt = e.target.closest("[data-qc-opt]");
        if (!opt || qcOk || si !== qcIndex) return;
        const fb = card.querySelector(".qc-fb");
        if (Number(opt.getAttribute("data-qc-opt")) === Number(qc.answer)) {
          qcOk = true;
          opt.classList.add("right");
          card.querySelectorAll(".qc-opt").forEach((b) => { b.disabled = true; });
          if (fb) { fb.hidden = false; fb.className = "qc-fb ok"; fb.textContent = "✅ " + t("qc_correct"); }
          nextB.disabled = false;
          setTimeout(() => { if (si === qcIndex) show(si + 1); }, 950);
        } else {
          opt.classList.add("wrong");
          setTimeout(() => opt.classList.remove("wrong"), 500);
          if (fb) { fb.hidden = false; fb.className = "qc-fb no"; fb.textContent = "❌ " + t("qc_wrong"); }
        }
      });
      /* ▶ Auto-play: the lesson plays itself like a short video — cards
         advance on a timer, or (🔊) after the browser's built-in voice
         finishes reading the card aloud. No video files needed. */
      const playB = app.querySelector("#step-play");
      const voiceB = app.querySelector("#step-voice");
      let playing = false, autoTimer = null;
      const voiceOn = () => localStorage.getItem("wda_voice") === "1";
      const speakText = () => {
        const d = card.cloneNode(true);
        d.querySelectorAll("pre, .copy-btn").forEach((n) => n.remove()); /* don't read code aloud */
        return (d.textContent || "").replace(/\s+/g, " ").trim();
      };
      const readingDelay = () => Math.min(22000, 3500 + speakText().split(" ").length * 190);
      const stopAuto = () => {
        playing = false;
        clearTimeout(autoTimer);
        autoTimer = null;
        try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
        if (playB) playB.innerHTML = "▶ " + t("autoplay");
      };
      const advance = () => {
        if (!playing) return;
        if (si < steps.length - 1) { show(si + 1); playStep(); }
        else stopAuto();
      };
      const playStep = () => {
        if (!playing) return;
        /* auto-play stops at the quick-check — the student must answer */
        if (si === qcIndex && !qcOk) { stopAuto(); return; }
        if (voiceOn() && window.speechSynthesis) {
          try {
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(speakText());
            u.lang = "en-US";
            u.rate = 1;
            u.onend = () => { if (playing) autoTimer = setTimeout(advance, 700); };
            u.onerror = () => { if (playing) autoTimer = setTimeout(advance, readingDelay()); };
            speechSynthesis.speak(u);
            return;
          } catch (e) {}
        }
        autoTimer = setTimeout(advance, readingDelay());
      };
      if (playB) playB.addEventListener("click", () => {
        if (playing) { stopAuto(); return; }
        playing = true;
        playB.innerHTML = "⏸ " + t("pause");
        playStep();
      });
      if (voiceB) voiceB.addEventListener("click", () => {
        const on = !voiceOn();
        localStorage.setItem("wda_voice", on ? "1" : "0");
        voiceB.textContent = on ? "🔊" : "🔇";
        if (playing) { try { speechSynthesis.cancel(); } catch (e) {} clearTimeout(autoTimer); playStep(); }
      });
      /* any navigation stops the playback + narration */
      window.addEventListener("hashchange", stopAuto, { once: true });

      backB.addEventListener("click", () => { stopAuto(); show(si - 1, "back"); });
      nextB.addEventListener("click", () => {
        if (si < steps.length - 1) { stopAuto(); show(si + 1); return; }
        stopAuto();
        /* last card: complete the lesson and celebrate 🎉 */
        const wasNew = !isDoneAlready();
        if (wasNew) markComplete(c.id, current.id, true);
        const dest = next ? `#/learn/${c.id}/${next}` : null;
        if (wasNew) showCelebration(dest);
        else if (dest) location.hash = dest;
        else renderLearn(courseId, lessonId);
      });
      show(0);
    }

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

    const gcLesson = app.querySelector("[data-classroom]");
    if (gcLesson) gcLesson.addEventListener("click", () =>
      shareToClassroom("#/learn/" + c.id + "/" + current.id, cf(c, "title") + " — " + lf(current, "title")));

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
        const marking = !done.has(current.id);
        markComplete(c.id, current.id, marking);
        if (marking) showCelebration(next ? `#/learn/${c.id}/${next}` : null);
        else renderLearn(courseId, lessonId);
      });
    }

    const nextBtn = app.querySelector("[data-next]");
    if (nextBtn && current.type !== "quiz") {
      nextBtn.addEventListener("click", () => markComplete(c.id, current.id, true));
    }

    if (current.type === "quiz") wireQuiz(current, c);
    if (current.type === "exercise") wireExercise(current, c);

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
          <div class="q">${qi + 1}. ${qsafe(q.q)}</div>
          ${q.options
            .map(
              (opt, oi) =>
                `<label class="q-opt" data-opt="${oi}">
                   <input type="radio" name="q${qi}" value="${oi}"> <span>${qsafe(opt)}</span>
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

  /* ---------------- Auto-checked code exercises ----------------
     The student's code runs in a sandboxed iframe; the lesson's hidden
     check script inspects the result and posts pass/fail back to us. */
  let exRunSeq = 0;
  function renderExerciseHtml(lesson) {
    return `
      <div class="exercise">
        <div class="reader">${lf(lesson, "content") || ""}</div>
        <div class="ex-head">
          <span>💻 ${t("ex_editor")}</span>
          <button class="btn btn-outline btn-sm" id="ex-reset">↺ ${t("ex_reset")}</button>
        </div>
        <textarea id="ex-code" class="tl-ta" rows="12" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea>
        <div class="tl-row">
          <button class="btn btn-primary" id="ex-run">▶ ${t("ex_run")}</button>
          <span class="tl-status" id="ex-status"></span>
        </div>
        <iframe id="ex-frame" class="ex-frame" sandbox="allow-scripts" title="preview"></iframe>
      </div>`;
  }
  function wireExercise(lesson, course) {
    const ta = document.getElementById("ex-code");
    const frame = document.getElementById("ex-frame");
    const status = document.getElementById("ex-status");
    if (!ta || !frame) return;
    const saved = jget(ns("wda_ex_code"), {});
    const starter = lf(lesson, "starter") || "";
    ta.value = saved[lesson.id] != null ? saved[lesson.id] : starter;
    document.getElementById("ex-reset").addEventListener("click", () => { ta.value = starter; });

    let timer = null;
    const onMsg = (e) => {
      const d = e.data;
      if (!d || !d.__ex || d.run !== exRunSeq) return;
      clearTimeout(timer);
      if (d.pass) {
        status.className = "tl-status ok";
        status.textContent = "✅ " + t("ex_pass");
        const done = jget(ns("wda_ex"), {});
        const firstPass = !done[lesson.id];
        if (firstPass) {
          done[lesson.id] = Date.now();
          jset(ns("wda_ex"), done);
          addBonusXp(15);
        }
        const already = completedSet(course.id).has(lesson.id);
        if (!already) {
          markComplete(course.id, lesson.id, true);
          const flat = lessonsOf(course);
          const i = flat.findIndex((x) => x.lesson.id === lesson.id);
          const nx = i >= 0 && i < flat.length - 1 ? `#/learn/${course.id}/${flat[i + 1].lesson.id}` : null;
          showCelebration(nx);
        }
        pushLeaderboard();
        setTimeout(maybeToastBadges, 600);
      } else {
        status.className = "tl-status bad";
        status.textContent = "✗ " + t("ex_fail") + " " + (d.msg || "");
      }
    };
    window.addEventListener("message", onMsg);
    window.addEventListener("hashchange", () => window.removeEventListener("message", onMsg), { once: true });

    document.getElementById("ex-run").addEventListener("click", () => {
      const code = ta.value;
      const store = jget(ns("wda_ex_code"), {});
      store[lesson.id] = code;
      jset(ns("wda_ex_code"), store);
      const run = ++exRunSeq;
      status.className = "tl-status";
      status.textContent = "⏳";
      const shim =
        '<script>window.__exDone=function(p,m){try{parent.postMessage({__ex:1,run:' + run +
        ',pass:!!p,msg:String(m||"")},"*")}catch(e){}};' +
        'window.addEventListener("error",function(e){window.__exDone(false,e.message)});</scr' + 'ipt>';
      const check =
        '<script>setTimeout(function(){try{' + (lf(lesson, "check") || "__exDone(false, 'no check')") +
        '}catch(e){__exDone(false,e.message)}},60);</scr' + 'ipt>';
      frame.srcdoc = code + shim + check;
      timer = setTimeout(() => {
        if (status.textContent === "⏳") {
          status.className = "tl-status bad";
          status.textContent = "✗ " + t("ex_timeout");
        }
      }, 3000);
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
  function earnedBadgesList() {
    let lessons = 0, coursesDone = 0;
    COURSES.forEach((c) => {
      const cc = completedCount(c), tot = totalLessons(c);
      lessons += cc;
      if (tot > 0 && cc === tot && isEnrolled(c.id)) coursesDone++;
    });
    const qs = loadQuizScores();
    const perfect = Object.values(qs).some((q) => q.total > 0 && q.score === q.total);
    const bilingual = localStorage.getItem("wda_bilingual") === "1";
    const streak = dayStreak();
    const daily = jget(ns("wda_daily"), {});
    const exDone = Object.keys(jget(ns("wda_ex"), {})).length;
    return [
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
      { key: "badge_daily3", earned: (Number(daily.streak) || 0) >= 3, icon: "🎯" },
      { key: "badge_exercise", earned: exDone >= 1, icon: "🏋️" },
    ];
  }

  /* Small slide-in toast when a badge is newly earned */
  function showBadgeToast(b) {
    const el = document.createElement("div");
    el.className = "badge-toast";
    el.innerHTML = `<span class="bt-ic">${b.icon}</span><div><b>🏅 ${t("badge_earned")}</b><br><span>${t(b.key)}</span></div>`;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add("out"), 2800);
    setTimeout(() => el.remove(), 3400);
  }
  function maybeToastBadges() {
    const seen = jget(ns("wda_badges_seen"), []);
    const earned = earnedBadgesList().filter((b) => b.earned);
    const fresh = earned.filter((b) => seen.indexOf(b.key) === -1);
    if (!fresh.length) return;
    jset(ns("wda_badges_seen"), earned.map((b) => b.key));
    /* a returning user's very first check would flood — swallow it silently */
    if (!seen.length && fresh.length > 1) return;
    fresh.slice(0, 2).forEach((b, i) => setTimeout(() => showBadgeToast(b), i * 1700));
  }

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
    const xp = lessons * 10 + passes * 5 + bonusXp();
    const level = Math.floor(xp / 100) + 1;
    const inLvl = xp % 100;
    const streak = dayStreak();
    const badges = earnedBadgesList();
    const stat = (v, l) => `<div class="dstat"><b>${v}</b><span>${l}</span></div>`;
    return `
      <div class="dash">
        <div class="dash-stats">
          ${stat(level, t("stat_level"))}${stat(xp, t("stat_xp"))}${stat(lessons, t("stat_completed"))}
          ${stat(coursesDone, t("stat_courses_done"))}${stat("🔥 " + streak, t("stat_streak"))}${stat(formatTime(totalTime), "⏱ " + t("spent"))}
        </div>
        <div class="lvl-line">
          <span class="lvl-chip">Lv ${level}</span>
          <div class="progress thin" style="flex:1"><span style="width:${inLvl}%"></span></div>
          <span class="muted" style="font-size:12px">${t("lvl_next").replace("{n}", 100 - inLvl).replace("{l}", level + 1)}</span>
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
    /* searching inside lesson bodies needs the lazy content bundle */
    if (!window.APP_CONTENT) {
      app.innerHTML = `<div class="container"><div class="empty"><h2>🔍</h2><p class="muted">⏳</p></div></div>`;
      loadContent().then(() => renderSearch(query)).catch(() => renderNotFound());
      return;
    }
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

  /* ---------------- Daily Review: spaced repetition (SM-2 lite) ----------------
     Every question from a quiz the user has PASSED becomes a flashcard.
     Cards store only a reference (lessonId::questionIndex) — the text stays
     in data-core.js, so Burmese overrides and content edits keep working.
     Deck lives in wda_srs::<uid> and is mirrored to the cloud. */
  const srsLoad = () => { const d = jget(ns("wda_srs"), {}); if (!d.cards) d.cards = {}; if (!d.days) d.days = {}; return d; };
  const srsSave = (d) => jset(ns("wda_srs"), d);

  /* every quiz lesson the user has completed (= passed), with its course */
  function srsSources() {
    const out = [];
    COURSES.forEach((c) => {
      const done = completedSet(c.id);
      if (!done.size) return;
      c.sections.forEach((s) => s.lessons.forEach((l) => {
        if (l.type === "quiz" && Array.isArray(l.questions) && done.has(l.id)) out.push({ course: c, lesson: l });
      }));
    });
    return out;
  }

  /* every quiz question in the catalog, passed or not — used to resolve
     cards and to prune ones whose question was removed in a content edit */
  function srsCatalog() {
    const map = {};
    COURSES.forEach((c) => c.sections.forEach((s) => s.lessons.forEach((l) => {
      if (l.type === "quiz" && Array.isArray(l.questions))
        l.questions.forEach((q, qi) => { map[l.id + "::" + qi] = { course: c, lesson: l }; });
    })));
    return map;
  }

  /* add cards for newly passed quizzes; saves only when something changed
     (home calls this every render). Prune ONLY questions gone from the
     catalog — NEVER cards missing from completedSet: right after login the
     local completion state can lag the cloud copy, and deleting on that
     stale view would wipe (and re-upload) an empty deck. */
  function srsSyncDeck(deck) {
    const catalog = srsCatalog();
    let changed = false;
    srsSources().forEach((src) => src.lesson.questions.forEach((q, qi) => {
      const id = src.lesson.id + "::" + qi;
      if (!deck.cards[id]) { deck.cards[id] = { due: todayKey(), iv: 0, ease: 2.5, reps: 0, lapses: 0 }; changed = true; }
    }));
    Object.keys(deck.cards).forEach((id) => { if (!catalog[id]) { delete deck.cards[id]; changed = true; } });
    if (changed) srsSave(deck);
    return catalog;
  }

  const srsDueIds = (deck) => {
    const today = todayKey();
    return Object.keys(deck.cards).filter((id) => deck.cards[id].due <= today)
      .sort((a, b) => (deck.cards[a].due < deck.cards[b].due ? -1 : 1));
  };

  /* one answer → new schedule. Correct: 1d → 3d → iv×ease. Wrong: back to 1d. */
  function srsGrade(card, ok) {
    if (ok) {
      card.reps = (card.reps || 0) + 1;
      card.iv = card.reps === 1 ? 1 : card.reps === 2 ? 3 : Math.max(4, Math.round((card.iv || 1) * card.ease));
      card.ease = Math.min(2.8, (card.ease || 2.5) + 0.05);
    } else {
      card.reps = 0;
      card.lapses = (card.lapses || 0) + 1;
      card.ease = Math.max(1.3, (card.ease || 2.5) - 0.2);
      card.iv = 1;
    }
    card.due = todayKey(card.iv);
  }

  const SRS_SESSION = 10;   /* cards per session */
  const SRS_XP_CAP = 20;    /* max review XP per day (parity with daily challenge) */

  /* resolve a card id back to its (translated) question + labels */
  function srsCardView(id, avail) {
    const src = avail[id];
    if (!src) return null;
    const qi = Number(id.split("::").pop());
    const q = getQuestions(src.lesson)[qi];
    if (!q) return null;
    return { q, course: cf(src.course, "title"), lesson: lf(src.lesson, "title") };
  }

  function reviewHomeCard() {
    if (!loggedIn()) return "";
    const deck = srsLoad();
    srsSyncDeck(deck);
    if (!Object.keys(deck.cards).length) return ""; /* no quiz passed yet — don't nag */
    const due = srsDueIds(deck).length;
    const doneToday = (deck.days[todayKey()] || {}).n > 0;
    const idle = !due && doneToday;
    return `
      <a class="daily-card ${idle ? "done" : ""}" href="#/review">
        <span class="dc-ic">🧠</span>
        <div class="dc-txt"><b>${t("review_title")}</b><span class="muted">${
          due ? t("rv_home_due").replace("{n}", due) : doneToday ? t("rv_home_done") : t("rv_home_none")
        }</span></div>
        <span class="btn ${due ? "btn-primary" : "btn-outline"} btn-sm">${due ? due + " 🔁" : "✓"}</span>
      </a>`;
  }

  function renderReview() {
    if (!loggedIn()) { location.hash = "#/"; if (window.Auth) window.Auth.openModal("login"); return; }
    const deck = srsLoad();
    const avail = srsSyncDeck(deck);
    const total = Object.keys(deck.cards).length;
    const due = srsDueIds(deck);
    const today = deck.days[todayKey()] || { n: 0, xp: 0 };

    app.innerHTML = `
      <div class="container" style="max-width:680px">
        <h2 class="section-title">🧠 ${t("review_title")}</h2>
        <p class="section-sub">${t("review_sub")}</p>
        <div class="srs-stats">
          <div class="stat"><strong>${due.length}</strong><span>${t("rv_stat_due")}</span></div>
          <div class="stat"><strong>${total}</strong><span>${t("rv_stat_cards")}</span></div>
          <div class="stat"><strong>🔥 ${dayStreak()}</strong><span>${t("rv_stat_streak")}</span></div>
        </div>
        <div id="review-body"></div>
        <div id="review-ai"></div>
      </div>`;
    const mount = document.getElementById("review-body");

    if (!total) {
      /* no cards yet — point at the nearest untaken quiz */
      let firstQuiz = null;
      COURSES.forEach((c) => { if (firstQuiz || !isEnrolled(c.id)) return;
        const done = completedSet(c.id);
        c.sections.forEach((s) => s.lessons.forEach((l) => {
          if (!firstQuiz && l.type === "quiz" && !done.has(l.id)) firstQuiz = { c, l };
        }));
      });
      mount.innerHTML = `<div class="empty"><h2>🃏</h2><p>${t("rv_empty")}</p>
        ${firstQuiz
          ? `<a class="btn btn-primary" href="#/learn/${firstQuiz.c.id}/${firstQuiz.l.id}">📝 ${t("rv_take_quiz")}</a>`
          : `<a class="btn btn-primary" href="#/courses">${t("browse_courses")}</a>`}</div>`;
    } else if (!due.length) {
      /* caught up — show when the next card comes back */
      const next = Object.values(deck.cards).map((c) => c.due).sort()[0];
      mount.innerHTML = `<div class="panel" style="text-align:center">
        <h2 style="font-size:40px;margin:6px 0">🌱</h2>
        <h3 style="margin:0 0 6px">${t("rv_done_title")}</h3>
        <p class="muted" style="margin:0 0 14px">${t("rv_done_sub").replace("{d}", next || todayKey(1))}</p>
        <button class="btn btn-outline btn-sm" id="rv-ahead">💪 ${t("rv_ahead")}</button>
        <p class="muted" style="font-size:12px;margin:8px 0 0">${t("rv_ahead_note")}</p></div>`;
      const ah = document.getElementById("rv-ahead");
      if (ah) ah.addEventListener("click", () => {
        const soon = Object.keys(deck.cards).sort((a, b) => (deck.cards[a].due < deck.cards[b].due ? -1 : 1)).slice(0, SRS_SESSION);
        srsSession(mount, soon, avail, true);
      });
    } else {
      mount.innerHTML = `<div class="panel" style="text-align:center">
        <p style="margin:4px 0 12px">${t("rv_ready").replace("{n}", due.length)}${today.n ? " · " + t("rv_today_count").replace("{n}", today.n) : ""}</p>
        <button class="btn btn-primary" id="rv-start">🔁 ${t("rv_start").replace("{n}", Math.min(SRS_SESSION, due.length))}</button>
      </div>`;
      document.getElementById("rv-start").addEventListener("click", () => srsSession(mount, due.slice(0, SRS_SESSION), avail, false));
    }

    /* ✨ AI-written custom quiz stays as the Premium extra */
    const aiMount = document.getElementById("review-ai");
    const done = collectCompletedLessons();
    if (window.AI && done.length >= 3) {
      aiMount.innerHTML = `<div class="panel">
        <h3 style="margin-top:0">✨ ${t("rv_ai_title")} ${isPremiumUser() ? "" : "🔒"}</h3>
        <p class="muted" style="margin:4px 0 10px;font-size:13.5px">${t("rv_ai_sub")}</p>
        ${isPremiumUser()
          ? `<button class="btn btn-outline btn-sm" id="review-start">✨ ${t("review_start")}</button>`
          : `<a class="btn btn-outline btn-sm" href="#/premium">⭐ ${t("prem_go")}</a>`}</div>`;
      const b = document.getElementById("review-start");
      if (b) b.addEventListener("click", () => startReview(aiMount, done));
    }
    window.scrollTo(0, 0);
  }

  /* one flashcard at a time: answer → instant feedback → next */
  function srsSession(mount, ids, avail, dry) {
    const deck = srsLoad();
    const cards = ids.map((id) => ({ id, view: srsCardView(id, avail) })).filter((x) => x.view);
    if (!cards.length) { renderReview(); return; }
    let i = 0, correct = 0;

    const finish = () => {
      let gained = 0;
      if (!dry) {
        const day = deck.days[todayKey()] || { n: 0, xp: 0 };
        gained = Math.max(0, Math.min(correct * 2, SRS_XP_CAP - (day.xp || 0)));
        day.n = (day.n || 0) + cards.length;
        day.xp = (day.xp || 0) + gained;
        deck.days[todayKey()] = day;
        srsSave(deck);
        if (gained) { addBonusXp(gained); pushLeaderboard(); setTimeout(maybeToastBadges, 400); }
        bumpDayStreak(); /* reviewing counts as studying today */
        saveState();
      }
      const moreDue = srsDueIds(deck).length;
      mount.innerHTML = `<div class="panel" style="text-align:center">
        <h2 style="font-size:40px;margin:6px 0">${correct === cards.length ? "🏆" : correct >= cards.length * 0.6 ? "🎉" : "💪"}</h2>
        <h3 style="margin:0 0 4px">${t("rv_finish")}</h3>
        <p style="margin:0 0 4px">${t("review_score").replace("{s}", correct).replace("{t}", cards.length)}
          ${gained ? ` · <b class="srs-xp">+${gained} XP</b>` : ""}</p>
        <p class="muted" style="margin:0 0 14px;font-size:13px">🔥 ${t("rv_streak_kept")}</p>
        <div class="tl-row" style="justify-content:center">
          ${moreDue && !dry ? `<button class="btn btn-primary btn-sm" id="rv-more">🔁 ${t("rv_more").replace("{n}", Math.min(SRS_SESSION, moreDue))}</button>` : ""}
          <a class="btn btn-outline btn-sm" href="#/">${t("tab_home")}</a>
        </div></div>`;
      const more = document.getElementById("rv-more");
      if (more) more.addEventListener("click", () => renderReview());
    };

    const show = () => {
      if (i >= cards.length) { finish(); return; }
      const { id, view } = cards[i];
      const card = deck.cards[id] || { reps: 0 };
      mount.innerHTML = `<div class="panel srs-card">
        <div class="srs-top">
          <span>${i + 1} / ${cards.length}${card.reps === 0 ? ` · <span class="srs-new">🆕 ${t("rv_new")}</span>` : ""}</span>
          <span class="muted">${correct} ✓</span>
        </div>
        <div class="progress" style="margin:8px 0 14px"><span style="width:${Math.round((i / cards.length) * 100)}%"></span></div>
        <div class="srs-src">📚 ${escapeHtml(view.course)} › ${escapeHtml(view.lesson)}</div>
        <div class="qc-q" style="font-size:17px;margin:10px 0 12px">${qsafe(view.q.q)}</div>
        <div class="qc-opts">${view.q.options.map((o, oi) => `<button type="button" class="qc-opt" data-i="${oi}">${qsafe(o)}</button>`).join("")}</div>
        <div id="srs-fb" style="margin-top:12px"></div></div>`;
      mount.querySelectorAll(".qc-opt").forEach((b) => b.addEventListener("click", () => {
        if (mount.dataset.lock) return;
        mount.dataset.lock = "1";
        const pick = Number(b.getAttribute("data-i"));
        const ok = pick === view.q.answer;
        if (ok) correct++;
        b.classList.add(ok ? "right" : "wrong");
        if (!ok) { const r = mount.querySelector(`.qc-opt[data-i="${view.q.answer}"]`); if (r) r.classList.add("right"); }
        mount.querySelectorAll(".qc-opt").forEach((o) => { o.disabled = true; });
        if (!dry) { srsGrade(deck.cards[id], ok); srsSave(deck); }
        const next = () => { delete mount.dataset.lock; i++; show(); };
        if (ok) { setTimeout(next, 900); }
        else {
          /* wrong → let them study the correct answer, advance on tap */
          document.getElementById("srs-fb").innerHTML =
            `<div class="tl-status">💡 ${t("rv_wrong_note")}</div>
             <button class="btn btn-primary btn-sm" id="srs-next" style="margin-top:8px">${t("rv_next")} →</button>`;
          document.getElementById("srs-next").addEventListener("click", next);
        }
      }));
      window.scrollTo(0, 0);
    };
    show();
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

  /* 🎯 weekly goal card: pick a target, watch the bar fill */
  function goalCard() {
    const goal = Number(jget(ns("wda_goal"), 0)) || 0;
    if (!goal) {
      return `
        <div class="panel goal-card">
          <h3 style="margin-top:0">🎯 ${t("goal_title")}</h3>
          <p class="muted" style="margin:4px 0 10px;font-size:13.5px">${t("goal_sub")}</p>
          <div class="tl-row">${[3, 5, 10].map((g) =>
            `<button class="btn btn-outline btn-sm" data-goal="${g}">${g} ${t("lessons_word")}</button>`).join("")}</div>
        </div>`;
    }
    const n = weekCount();
    const pct = Math.min(100, Math.round((n / goal) * 100));
    const doneAll = n >= goal;
    return `
      <div class="panel goal-card">
        <h3 style="margin-top:0;display:flex;justify-content:space-between;align-items:center">🎯 ${t("goal_title")}
          <button class="btn btn-outline btn-sm" data-goal="0">${t("goal_change")}</button></h3>
        <div class="progress" style="margin:10px 0"><span style="width:${pct}%"></span></div>
        <p class="${doneAll ? "tl-status ok" : "muted"}" style="margin:0;font-size:13.5px">
          ${doneAll ? "🎉 " + t("goal_done") : t("goal_progress").replace("{n}", n).replace("{g}", goal)}</p>
      </div>`;
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
            <a class="btn btn-outline btn-sm" href="#/notes">📓 ${t("nb_title")}</a>
            <a class="btn btn-outline btn-sm" href="#/portfolio">📁 ${t("portfolio_mine")}</a>
            <a class="btn btn-outline btn-sm" href="#/showcase">🌟 ${t("showcase_title")}</a>
            <a class="btn btn-outline btn-sm" href="#/leaderboard">🏆 ${t("lb_title")}</a>
          </div>
        </div>
        ${statsHeader()}
        ${goalCard()}
        <h2 class="section-title">${t("my_learning")}</h2>
        ${
          mine.length
            ? `<p class="section-sub">${mine.length} ${t("enrolled_word")} · ${t("keep_going")}</p><div class="mylist">${rows}</div>`
            : `<div class="ml-empty">
                <div class="ml-empty-art" aria-hidden="true"><span>📘</span><span>🎬</span><span>📝</span></div>
                <h2>${t("ml_first_title")}</h2>
                <p class="muted">${t("ml_first_sub")}</p>
                <div class="ml-cats">
                  ${CATEGORIES.filter((c) => c !== "All")
                    .map((cat) => `<a class="ml-cat" href="#/courses" data-cat="${cat}"><span>${catName(cat)}</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg></a>`)
                    .join("")}
                </div>
                <a class="btn btn-primary btn-block" href="#/courses">${t("browse_courses")}</a>
              </div>`
        }
        ${bookmarksSection()}
        ${recommendedSection()}
      </div>`;
    app.querySelectorAll("[data-goal]").forEach((b) =>
      b.addEventListener("click", () => {
        jset(ns("wda_goal"), Number(b.getAttribute("data-goal")) || 0);
        renderMyLearning();
      })
    );
    /* first-run category list — same filter the home chips use */
    app.querySelectorAll(".ml-cat[data-cat]").forEach((a) =>
      a.addEventListener("click", () => {
        filter.category = a.dataset.cat;
        filter.query = "";
      })
    );
  }

  function renderNotFound() {
    app.innerHTML = `
      <div class="container"><div class="empty">
        <h2>${t("notfound")}</h2>
        <a class="btn btn-primary" href="#/">${t("back_home")}</a>
      </div></div>`;
  }

  /* ---------------- View: Student Tools (free utilities) ---------------- */
  const TOOLS = [
    { id: "cheats", ic: "📜" },
    { id: "color", ic: "🎨" },
    { id: "gradient", ic: "🌈" },
    { id: "shadow", ic: "📦" },
    { id: "json", ic: "🧾" },
    { id: "regex", ic: "🔍" },
    { id: "units", ic: "📏" },
    { id: "case", ic: "🔠" },
    { id: "count", ic: "🧮" },
    { id: "lorem", ic: "📄" },
    { id: "typing", ic: "⌨️" },
    { id: "timer", ic: "⏱️" },
  ];

  function tlCopy(btn, text) {
    const old = btn.textContent;
    const done = () => { btn.textContent = "✓ " + t("copied"); setTimeout(() => { btn.textContent = old; }, 1200); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  /* Buttons with data-copy="#selector" copy that element's text/value */
  function wireCopyBtns() {
    app.querySelectorAll("[data-copy]").forEach((b) =>
      b.addEventListener("click", () => {
        const el = document.querySelector(b.getAttribute("data-copy"));
        if (!el) return;
        tlCopy(b, el.tagName === "TEXTAREA" || el.tagName === "INPUT" ? el.value : el.textContent);
      })
    );
  }

  /* ---------------- How-To: short copy-paste web-dev recipes ----------------
     Each guide shows an explanation + code (tap to copy) + a "Try it" button
     that opens the snippet in the Playground (buildRunnableDoc wraps CSS/JS). */
  const HOWTO_CATS = [
    { id: "layout", ic: "🎨", en: "Layout & CSS", my: "Layout နဲ့ CSS" },
    { id: "forms", ic: "📝", en: "Forms & Buttons", my: "ဖောင်နဲ့ ခလုတ်" },
    { id: "html", ic: "🔤", en: "HTML basics", my: "HTML အခြေခံ" },
    { id: "js", ic: "⚡", en: "JavaScript", my: "JavaScript" },
  ];
  const HOWTOS = [
    { cat: "layout", id: "center-div", q: "Center a div (flexbox)", qMy: "Div ကို အလယ်ချ (flexbox)",
      a: "Make the parent a flex container, then center on both axes.",
      aMy: "မိဘ element ကို flex ဖြစ်စေပြီး ဘေးနှစ်ဖက်လုံး အလယ်ချပါ။",
      code: `<div style="display:flex; justify-content:center; align-items:center; height:180px; border:2px dashed #a435f0">
  <div style="padding:16px; background:#a435f0; color:#fff; border-radius:8px">I'm centered!</div>
</div>` },
    { cat: "layout", id: "center-grid", q: "Center anything (grid)", qMy: "Grid နဲ့ အလယ်ချ",
      a: "One line with grid — place-items centers content perfectly.",
      aMy: "Grid တစ်ကြောင်းတည်း — place-items က အလယ်ချပေးတယ်။",
      code: `<div style="display:grid; place-items:center; height:180px; border:2px dashed #16794c">
  <p>Perfectly centered ✅</p>
</div>` },
    { cat: "layout", id: "responsive-row", q: "Responsive row of cards", qMy: "Card များ တန်းစီ (responsive)",
      a: "flex-wrap lets cards drop to the next line on small screens.",
      aMy: "flex-wrap က မျက်နှာပြင်သေးရင် card တွေ အောက်တန်းဆင်းပေးတယ်။",
      code: `<div style="display:flex; flex-wrap:wrap; gap:12px">
  <div style="flex:1 1 140px; padding:16px; background:#eee; border-radius:8px">Card 1</div>
  <div style="flex:1 1 140px; padding:16px; background:#eee; border-radius:8px">Card 2</div>
  <div style="flex:1 1 140px; padding:16px; background:#eee; border-radius:8px">Card 3</div>
</div>` },
    { cat: "layout", id: "card-shadow", q: "Card with a shadow", qMy: "အရိပ်ပါ Card",
      a: "Rounded corners + a soft box-shadow = a modern card.",
      aMy: "ထောင့်ကွေး + box-shadow ပျော့ပျော့ = ခေတ်မီ card။",
      code: `<div style="max-width:260px; padding:20px; border-radius:12px; box-shadow:0 4px 14px rgba(0,0,0,.15); font-family:sans-serif">
  <h3 style="margin:0 0 6px">Card title</h3>
  <p style="margin:0; color:#666">A clean card with a soft shadow.</p>
</div>` },
    { cat: "forms", id: "basic-form", q: "A basic form", qMy: "အခြေခံ ဖောင်",
      a: "Wrap inputs in a <form>; give each input a matching <label>.",
      aMy: "input တွေကို <form> ထဲထည့်ပြီး input တိုင်းမှာ <label> တွဲပါ။",
      code: `<form style="display:flex; flex-direction:column; gap:10px; max-width:280px; font-family:sans-serif">
  <label>Name
    <input type="text" placeholder="Your name" style="width:100%; padding:8px">
  </label>
  <label>Email
    <input type="email" placeholder="you@email.com" style="width:100%; padding:8px">
  </label>
  <button type="submit">Send</button>
</form>` },
    { cat: "forms", id: "styled-button", q: "A nice button", qMy: "လှတဲ့ ခလုတ်",
      a: "Padding, rounded corners and a hover color make a button pop.",
      aMy: "padding, ထောင့်ကွေး, hover အရောင် — ခလုတ်ကို လှစေတယ်။",
      code: `<button onmouseover="this.style.background='#8710d8'" onmouseout="this.style.background='#a435f0'"
  style="padding:12px 22px; border:0; border-radius:999px; background:#a435f0; color:#fff; font-size:15px; font-weight:700; cursor:pointer">
  Click me
</button>` },
    { cat: "forms", id: "required-field", q: "Require a field", qMy: "ဖြည့်ရမည့် ကွက်လပ်",
      a: "Add required — the browser blocks submit until it's filled.",
      aMy: "required ထည့်ပါ — မဖြည့်မချင်း submit မရဘူး။",
      code: `<form>
  <input type="text" required placeholder="This is required">
  <button type="submit">Try to submit empty</button>
</form>` },
    { cat: "forms", id: "select-menu", q: "A dropdown menu", qMy: "Dropdown menu",
      a: "<select> with <option>s makes a native dropdown.",
      aMy: "<select> နဲ့ <option> တွေက dropdown ဖြစ်တယ်။",
      code: `<label>Pick a course:
  <select style="padding:8px">
    <option>HTML</option>
    <option>CSS</option>
    <option>JavaScript</option>
  </select>
</label>` },
    { cat: "html", id: "image-alt", q: "Add an image (with alt)", qMy: "ပုံထည့် (alt နဲ့)",
      a: "Always give alt text — for accessibility and when the image fails to load.",
      aMy: "alt စာသား အမြဲထည့်ပါ — အသုံးပြုသူအားလုံးအတွက်နဲ့ ပုံ error ဖြစ်ရင်။",
      code: `<img src="https://picsum.photos/240/140" alt="A random placeholder photo" style="border-radius:8px">` },
    { cat: "html", id: "link-newtab", q: "Link that opens a new tab", qMy: "Tab အသစ်ဖွင့်တဲ့ link",
      a: "target=_blank opens a new tab; rel=noopener keeps it safe.",
      aMy: "target=_blank က tab အသစ်ဖွင့်တယ်; rel=noopener က လုံခြုံစေတယ်။",
      code: `<a href="https://developer.mozilla.org" target="_blank" rel="noopener">Open MDN in a new tab ↗</a>` },
    { cat: "html", id: "list", q: "A bulleted list", qMy: "အစက်ပြ စာရင်း",
      a: "<ul> for bullets, <ol> for numbers; each item is an <li>.",
      aMy: "<ul> အစက်, <ol> နံပါတ်; item တစ်ခုချင်း <li>။",
      code: `<ul>
  <li>Learn HTML</li>
  <li>Learn CSS</li>
  <li>Learn JavaScript</li>
</ul>` },
    { cat: "html", id: "table", q: "A simple table", qMy: "ရိုးရှင်း table",
      a: "<tr> is a row, <th> a header cell, <td> a data cell.",
      aMy: "<tr> အတန်း, <th> ခေါင်းစဉ်ကွက်, <td> ဒေတာကွက်။",
      code: `<table border="1" cellpadding="8" style="border-collapse:collapse">
  <tr><th>Course</th><th>Level</th></tr>
  <tr><td>HTML</td><td>Beginner</td></tr>
  <tr><td>JavaScript</td><td>Intermediate</td></tr>
</table>` },
    { cat: "js", id: "click-change", q: "Button changes text", qMy: "ခလုတ်နှိပ်ရင် စာပြောင်း",
      a: "Listen for a click, then update the element's textContent.",
      aMy: "click ကို နားထောင်ပြီး element ရဲ့ textContent ကို ပြောင်းပါ။",
      code: `<p id="msg">Tap the button 👇</p>
<button onclick="document.getElementById('msg').textContent = 'You clicked it! 🎉'">
  Click me
</button>` },
    { cat: "js", id: "show-hide", q: "Show / hide an element", qMy: "element ပြ/ဖျောက်",
      a: "Toggle the hidden property on every click.",
      aMy: "click တိုင်း hidden ကို ပြောင်းပါ။",
      code: `<button onclick="var b=document.getElementById('box'); b.hidden=!b.hidden">Toggle</button>
<div id="box" style="margin-top:10px; padding:16px; background:#a435f0; color:#fff">Peekaboo! 👀</div>` },
    { cat: "js", id: "input-value", q: "Read what the user typed", qMy: "user ရိုက်တာ ဖတ်",
      a: "Grab the input by id and read its .value.",
      aMy: "input ကို id နဲ့ယူပြီး .value ဖတ်ပါ။",
      code: `<input id="name" placeholder="Type your name">
<button onclick="alert('Hi, ' + document.getElementById('name').value + '!')">Greet me</button>` },
    { cat: "js", id: "loop-list", q: "Loop through a list", qMy: "list ကို loop",
      a: "forEach runs your code once for every item in the array.",
      aMy: "forEach က array ထဲက item တိုင်းအတွက် code ကို run ပေးတယ်။",
      code: `<ul id="out"></ul>
<script>
  var courses = ["HTML", "CSS", "JavaScript"];
  courses.forEach(function (c) {
    document.getElementById("out").innerHTML += "<li>" + c + "</li>";
  });
<\/script>` },
  ];

  function renderHowto(catId) {
    const cat = catId ? HOWTO_CATS.find((c) => c.id === catId) : null;
    if (catId && !cat) return renderNotFound();
    const catName = (c) => (lang === "my" ? c.my : c.en);
    const gq = (g) => (lang === "my" && g.qMy ? g.qMy : g.q);
    const ga = (g) => (lang === "my" && g.aMy ? g.aMy : g.a);
    const cats = cat ? [cat] : HOWTO_CATS;

    const chips = `<div class="chips" style="margin-bottom:16px">
      <a class="chip ${!cat ? "active" : ""}" href="#/howto">✨ ${t("ht_all")}</a>
      ${HOWTO_CATS.map((c) => `<a class="chip ${cat && cat.id === c.id ? "active" : ""}" href="#/howto/${c.id}">${c.ic} ${catName(c)}</a>`).join("")}
    </div>`;

    const sections = cats.map((c) => {
      const gs = HOWTOS.filter((g) => g.cat === c.id);
      if (!gs.length) return "";
      return `<h3 class="section-title" style="font-size:19px">${c.ic} ${catName(c)}</h3>` +
        gs.map((g) => `
          <div class="panel howto-card" data-ht="${g.id}">
            <button type="button" class="howto-head">
              <span>${escapeHtml(gq(g))}</span><span class="howto-caret">▾</span>
            </button>
            <div class="howto-body" hidden>
              <p class="muted" style="margin:6px 0 10px">${escapeHtml(ga(g))}</p>
              <pre class="howto-code"><code>${escapeHtml(g.code)}</code></pre>
              <div class="tl-row">
                <button class="btn btn-outline btn-sm howto-copy" type="button">📋 ${t("tl_copy")}</button>
                <a class="btn btn-primary btn-sm" href="#/playground/${pgEncode(g.code)}">▶ ${t("ht_try")}</a>
              </div>
            </div>
          </div>`).join("");
    }).join("");

    app.innerHTML = `
      <div class="container" style="max-width:760px">
        <h2 class="section-title">💡 ${t("howto_title")}</h2>
        <p class="section-sub">${t("howto_sub")}</p>
        ${chips}
        ${sections || `<div class="empty"><p>${t("howto_none")}</p></div>`}
      </div>`;

    app.querySelectorAll(".howto-card").forEach((card) => {
      const head = card.querySelector(".howto-head");
      const body = card.querySelector(".howto-body");
      head.addEventListener("click", () => {
        const wasOpen = !body.hidden;
        body.hidden = wasOpen;
        card.classList.toggle("open", !wasOpen);
      });
      const copy = card.querySelector(".howto-copy");
      if (copy) copy.addEventListener("click", () => tlCopy(copy, card.querySelector("code").textContent));
    });
    window.scrollTo(0, 0);
  }

  /* home-feed discovery card for How-To */
  function howtoHomeCard() {
    return `
      <a class="daily-card" href="#/howto">
        <span class="dc-ic">💡</span>
        <div class="dc-txt"><b>${t("howto_title")}</b><span class="muted">${t("howto_home_sub")}</span></div>
        <span class="btn btn-outline btn-sm">→</span>
      </a>`;
  }

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }
  function shadeHex(hex, f) {
    const mix = (c) => Math.max(0, Math.min(255, Math.round(f >= 0 ? c + (255 - c) * f : c * (1 + f))));
    return "#" + hexToRgb(hex).map((c) => mix(c).toString(16).padStart(2, "0")).join("");
  }

  function renderTools(toolId) {
    const tool = TOOLS.find((x) => x.id === toolId);
    if (toolId && !tool) return renderNotFound();

    if (!tool) {
      app.innerHTML = `
        <div class="container">
          <h1 class="tool-h">🧰 ${t("tools_title")}</h1>
          <p class="section-sub">${t("tools_sub")}</p>
          <div class="grid tools-grid">
            ${TOOLS.map((tl) => `
              <a class="card tool-card" href="#/tools/${tl.id}">
                <div class="tool-ic">${tl.ic}</div>
                <h3>${t("tool_" + tl.id)}</h3>
                <p>${t("tool_" + tl.id + "_d")}</p>
              </a>`).join("")}
          </div>
        </div>`;
      return;
    }

    app.innerHTML = `
      <div class="container tool-wrap">
        <a class="tool-back" href="#/tools">${t("tool_back")}</a>
        <h1 class="tool-h">${tool.ic} ${t("tool_" + tool.id)}</h1>
        <p class="section-sub">${t("tool_" + tool.id + "_d")}</p>
        <div class="tool-body">${toolBody(tool.id)}</div>
      </div>`;
    wireTool(tool.id);
    wireCopyBtns();
  }

  /* 📜 cheat sheets — plain strings on purpose: rows may contain backticks
     and dollar-brace sequences that must display literally */
  const CHEATS = {
    html: [
      { g: "🏗️ Document structure" },
      { c: '<!DOCTYPE html>', d: "HTML5 doctype — always the first line" },
      { c: '<html lang="en"> … </html>', d: "Root element wrapping everything" },
      { c: '<head> title, meta, styles </head>', d: "Invisible page info" },
      { c: '<title>My Page</title>', d: "Text in the browser tab" },
      { c: '<body> visible content </body>', d: "Everything visitors see" },
      { c: '<!-- note to self -->', d: "Comment — invisible to visitors" },
      { g: "✍️ Text & headings" },
      { c: '<h1>Main Heading</h1> … <h6>', d: "Headings big → small (one h1 per page)" },
      { c: '<p>This is a paragraph.</p>', d: "Paragraph" },
      { c: '<strong>Important!</strong>', d: "Bold = strong importance" },
      { c: '<em>Please read.</em>', d: "Italic = emphasis" },
      { c: 'Sentence one.<br>Sentence two.', d: "Line break (void — no closing tag)" },
      { c: '<hr>', d: "Horizontal divider line" },
      { c: '<blockquote>Quoted text…</blockquote>', d: "Quotation from another source" },
      { c: '<code>alert()</code>', d: "Inline code styling (monospace)" },
      { g: "🔗 Links & images" },
      { c: '<a href="https://example.com">Visit Us</a>', d: 'Link — add target="_blank" for a new tab' },
      { c: '<img src="cat.jpg" alt="A cat">', d: "Image — alt text = accessibility (void)" },
      { g: "📋 Lists" },
      { c: '<ul><li>Item</li></ul>', d: "Bulleted list" },
      { c: '<ol><li>Step 1</li></ol>', d: "Numbered list" },
      { g: "📊 Tables" },
      { c: '<table><tr><td>Cell</td></tr></table>', d: "Table → row → data cell" },
      { c: '<th>Header</th>', d: "Header cell (bold + centered)" },
      { c: '<thead> … </thead><tbody> … </tbody>', d: "Group header rows vs data rows" },
      { g: "📝 Forms & input" },
      { c: '<form action="/submit" method="post"> … </form>', d: "Form container" },
      { c: '<label for="name">Name:</label><input id="name">', d: "Label linked to its input (tap label = focus)" },
      { c: '<input type="text">', d: "Also: password, email, number, date, file, submit" },
      { c: '<input type="checkbox"> · <input type="radio" name="grp">', d: "Ticks & choices — radios share a name to group" },
      { c: '<textarea rows="4"></textarea>', d: "Multi-line text box" },
      { c: '<select><option value="1">Option One</option></select>', d: "Dropdown list + its options" },
      { c: '<button type="button">Click</button>', d: 'Button — inside a form the default is type="submit"' },
      { g: "🧭 Semantic layout (HTML5)" },
      { c: '<header> <nav> <main>', d: "Intro/nav areas · main = unique content, one per page" },
      { c: '<article> <section> <aside>', d: "Self-contained post · themed group · sidebar" },
      { c: '<footer>', d: "Copyright, contact, sitemap" },
      { c: '<div class="card"> … </div>', d: "Generic box when no semantic tag fits" },
      { g: "🏷️ Global attributes (any tag)" },
      { c: 'id="unique-box"', d: "Unique name — one element only (CSS/JS hooks)" },
      { c: 'class="alert-text"', d: "Reusable name for many elements" },
      { c: 'style="color: blue;"', d: "Inline CSS (prefer a stylesheet)" },
      { c: 'title="More info"', d: "Tooltip shown on hover" },
      { c: 'lang="fr" · hidden', d: "Content language · hide the element" },
      { g: "⚡ Pro" },
      { c: '<meta name="viewport" content="width=device-width, initial-scale=1">', d: "Phones render properly (always include!)" },
      { c: '<input type="email" required minlength="3">', d: "Free browser validation" },
      { c: '<details><summary>More</summary>…</details>', d: "Zero-JS accordion" },
      { c: '<dialog id="m">…</dialog> + m.showModal()', d: "Native modal" },
      { c: '<img loading="lazy" …>', d: "Load images only when scrolled near" },
      { c: 'data-id="7" → el.dataset.id', d: "Custom data attributes" },
      { c: 'aria-label="Close menu"', d: "Name icon-only buttons for screen readers" },
    ],
    css: [
      { g: "🎯 Selectors" },
      { c: 'h1 { } · .card { } · #menu { }', d: "Tag / class / id selectors" },
      { c: 'nav a { } · .card > p { }', d: "Inside (descendant) / direct child" },
      { c: 'a:hover · input:focus · li:first-child', d: "State & position pseudo-classes" },
      { c: 'input[type="text"] { }', d: "Select by attribute" },
      { g: "🎨 Colors & text" },
      { c: 'color: purple; background: #f7f9fa;', d: "Text & background colors" },
      { c: 'font-size: 18px; font-weight: 700;', d: "Size & boldness" },
      { c: 'font-family: "Segoe UI", sans-serif;', d: "Font with fallback" },
      { c: 'text-align: center; line-height: 1.6;', d: "Alignment & readable spacing" },
      { g: "📦 Box model" },
      { c: 'padding: 16px; margin: 16px;', d: "Space inside / outside" },
      { c: 'border: 1px solid #ddd; border-radius: 12px;', d: "Edge + round corners" },
      { c: 'box-shadow: 0 4px 12px rgba(0,0,0,.1);', d: "Soft card shadow" },
      { c: 'width: 100%; max-width: 720px;', d: "Fluid but never too wide" },
      { c: '* { box-sizing: border-box; }', d: "Width includes padding (sanity!)" },
      { g: "🧲 Layout — Flex & Grid" },
      { c: 'display: flex; gap: 12px;', d: "Row layout with spacing" },
      { c: 'justify-content: center; align-items: center;', d: "The perfect center" },
      { c: 'flex-wrap: wrap;', d: "Let flex items flow to next line" },
      { c: 'display: grid; grid-template-columns: 1fr 2fr;', d: "Two columns, 1:2 ratio" },
      { c: 'grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));', d: "Responsive grid, no media queries" },
      { g: "📱 Responsive" },
      { c: '@media (max-width: 600px) { … }', d: "Phone-only styles" },
      { c: 'img { max-width: 100%; height: auto; }', d: "Unbreakable images" },
      { g: "✨ Effects" },
      { c: 'transition: all .2s ease;', d: "Smooth hover changes" },
      { c: '.btn:hover { filter: brightness(1.1); }', d: "Hover state" },
      { g: "⚡ Pro" },
      { c: ':root { --brand: #a435f0; } · color: var(--brand);', d: "CSS variables — theme in one place" },
      { c: 'font-size: clamp(16px, 2.5vw, 22px);', d: "Fluid type: min, preferred, max" },
      { c: 'aspect-ratio: 16 / 9; object-fit: cover;', d: "Perfect thumbnails, no stretching" },
      { c: 'transform: translateY(-3px) scale(1.02);', d: "Move/scale without reflow" },
      { c: '@keyframes pop { from {opacity:0} to {opacity:1} }', d: "Define an animation" },
      { c: 'animation: pop .3s ease both;', d: "…and run it" },
      { c: 'li:nth-child(odd) { background: #f7f7f9; }', d: "Zebra stripes & patterns" },
      { c: '.card::before { content: ""; … }', d: "Decorations without extra HTML" },
      { c: '@media (prefers-color-scheme: dark) { … }', d: "Respect the user's dark mode" },
      { c: 'gap: 12px;', d: "Spacing for flex AND grid — drop margins" },
      { c: 'position: sticky; top: 0;', d: "Sticky headers" },
    ],
    js: [
      { g: "📦 Variables & functions" },
      { c: 'const name = "Su"; let xp = 0;', d: "Variables (const = fixed)" },
      { c: '`Hello, ${name}!`', d: "Template string" },
      { c: 'const add = (a, b) => a + b;', d: "Arrow function" },
      { g: "🔀 Logic" },
      { c: 'if (xp >= 100) { … } else { … }', d: "Decision" },
      { c: 'xp >= 100 ? "Pro" : "Rookie"', d: "One-line if (ternary)" },
      { c: 'a === b · a !== b', d: "Always compare with THREE = (strict)" },
      { g: "🔁 Loops & arrays" },
      { c: 'for (const item of list) { … }', d: "Loop a list" },
      { c: 'list.push(x) · list.pop()', d: "Add to end / remove from end" },
      { c: 'list.map(x => x * 2)', d: "Transform every item" },
      { c: 'list.filter(x => x > 10)', d: "Keep matching items" },
      { c: 'list.find(x => x.id === 7)', d: "First match (or undefined)" },
      { c: 'list.includes("tea")', d: "Contains?" },
      { g: "🖱️ DOM & events" },
      { c: 'document.querySelector("#btn")', d: "Grab an element" },
      { c: 'el.addEventListener("click", fn)', d: "React to events" },
      { c: 'el.textContent = "Done";', d: "Change text safely" },
      { c: 'el.classList.toggle("dark")', d: "Flip a CSS class" },
      { c: 'document.createElement("li") → parent.append(el)', d: "Make + attach a new element" },
      { g: "🌐 Data & timing" },
      { c: 'fetch(url).then(r => r.json()).then(data => …)', d: "Get JSON from an API" },
      { c: 'JSON.parse(text) · JSON.stringify(obj)', d: "Text ↔ object" },
      { c: 'setTimeout(fn, 1000) · setInterval(fn, 1000)', d: "Run later / repeat (ms)" },
      { g: "⚡ Pro" },
      { c: 'const { name, xp } = student;', d: "Destructuring — unpack fields" },
      { c: 'const copy = { ...obj, xp: 100 };', d: "Spread: clone + tweak" },
      { c: 'const res = await fetch(url); const data = await res.json();', d: "async/await — fetch without .then chains" },
      { c: 'try { … } catch (e) { … }', d: "Handle failures gracefully" },
      { c: 'user?.profile?.phone', d: "Optional chaining — no null crashes" },
      { c: 'const qty = input ?? 1;', d: "Default only when null/undefined" },
      { c: 'list.reduce((sum, n) => sum + n, 0)', d: "Fold a list into one value" },
      { c: 'list.sort((a, b) => b.xp - a.xp)', d: "Sort objects (descending)" },
      { c: 'localStorage.setItem("k", JSON.stringify(v))', d: "Save across visits" },
      { c: 'el.closest(".card")', d: "Walk up to the matching parent" },
      { c: 'new Date().toISOString().slice(0, 10)', d: "Today as YYYY-MM-DD" },
      { c: 'crypto.randomUUID()', d: "Unique id, built in" },
    ],
    git: [
      { g: "🚀 Getting started" },
      { c: 'git init', d: "Start tracking this folder" },
      { c: 'git clone URL', d: "Copy a repo from GitHub" },
      { g: "📝 Everyday cycle" },
      { c: 'git status', d: "What changed?" },
      { c: 'git add .', d: "Stage all changes" },
      { c: 'git commit -m "Add menu page"', d: "Save a snapshot" },
      { c: 'git push', d: "Upload to GitHub" },
      { c: 'git pull', d: "Download teammates' work" },
      { g: "🌿 Branches" },
      { c: 'git branch', d: "List branches (* = current)" },
      { c: 'git checkout -b feature/login', d: "New branch + switch" },
      { c: 'git checkout main', d: "Switch back" },
      { c: 'git merge feature/login', d: "Bring branch in" },
      { g: "🕰️ History & undo" },
      { c: 'git log --oneline', d: "History at a glance" },
      { c: 'git restore file.css', d: "Discard uncommitted edits" },
      { c: 'git revert abc123', d: "Safely cancel a commit" },
      { c: 'git stash · git stash pop', d: "Pocket changes, restore later" },
      { g: "⚡ Pro" },
      { c: 'git diff --staged', d: "Review exactly what you're about to commit" },
      { c: 'git commit --amend', d: "Fix the last commit (before pushing!)" },
      { c: 'git cherry-pick abc123', d: "Copy one commit onto this branch" },
      { c: 'git rebase main', d: "Replay your branch on fresh main (local branches)" },
      { c: 'git reflog', d: "The undo log — recovers 'lost' commits" },
      { c: 'git bisect start', d: "Binary-search history for the breaking commit" },
      { c: 'git tag v1.0 · git push --tags', d: "Mark releases" },
      { c: 'git remote -v', d: "Where does this repo push/pull?" },
      { c: 'git log --oneline --graph --all', d: "Branch picture in the terminal" },
      { c: 'git blame file.js', d: "Who last touched each line (be kind)" },
    ],
    sql: [
      { g: "🔍 Reading data" },
      { c: 'SELECT name, total FROM orders;', d: "Read columns" },
      { c: "WHERE total > 4000 AND city = 'Yangon'", d: "Filter rows" },
      { c: 'ORDER BY total DESC LIMIT 10;', d: "Top 10" },
      { c: "WHERE name LIKE 'Mya%'", d: "Starts with" },
      { c: 'WHERE id IN (1, 2, 3) · BETWEEN 10 AND 20', d: "Sets & ranges" },
      { g: "✏️ Writing data" },
      { c: "INSERT INTO orders (item, qty) VALUES ('Tea', 2);", d: "Add a row" },
      { c: "UPDATE orders SET status = 'paid' WHERE id = 7;", d: "Change (WHERE or doom!)" },
      { c: 'DELETE FROM orders WHERE id = 7;', d: "Remove (same warning!)" },
      { g: "🔗 Joins" },
      { c: 'JOIN customers c ON c.id = o.customer_id', d: "Combine tables" },
      { c: 'LEFT JOIN … WHERE o.id IS NULL', d: "Find the missing ones" },
      { g: "📊 Grouping & counting" },
      { c: 'GROUP BY city HAVING SUM(total) > 100000', d: "Pivot + filter groups" },
      { c: 'COUNT(*) · SUM(total) · AVG(total)', d: "Aggregates" },
      { g: "🏗️ Structure" },
      { c: 'CREATE TABLE users (id INT PRIMARY KEY, name TEXT);', d: "New table" },
      { c: 'CREATE INDEX idx ON orders(customer_id);', d: "Speed up lookups" },
      { g: "⚡ Pro" },
      { c: 'SELECT … WHERE id IN (SELECT … )', d: "Subquery — query inside a query" },
      { c: "CASE WHEN total > 10000 THEN 'VIP' ELSE 'normal' END", d: "if/else inside SELECT" },
      { c: 'ROW_NUMBER() OVER (PARTITION BY city ORDER BY total DESC)', d: "Window function: rank within groups" },
      { c: 'SELECT … UNION SELECT …', d: "Stack two result sets" },
      { c: 'WHERE EXISTS (SELECT 1 FROM …)', d: "Fast 'has at least one' check" },
      { c: 'COALESCE(phone, email, "no contact")', d: "First non-null value" },
      { c: 'BEGIN; … COMMIT; (or ROLLBACK;)', d: "All-or-nothing transactions" },
      { c: 'EXPLAIN SELECT …', d: "Did it scan or use the index?" },
      { c: 'INSERT … ON CONFLICT (id) DO UPDATE …', d: "Upsert (Postgres)" },
    ],
    terminal: [
      { g: "🧭 Navigate" },
      { c: 'pwd', d: "Where am I?" },
      { c: 'ls  (dir on Windows)', d: "List files" },
      { c: 'cd projects · cd ..', d: "Enter folder / go up" },
      { g: "📁 Files & folders" },
      { c: 'mkdir my-site', d: "New folder" },
      { c: 'touch notes.txt', d: "New empty file" },
      { c: 'cp a.txt b.txt · mv old.txt new.txt', d: "Copy / move-rename" },
      { c: 'rm file.txt', d: "Delete (no recycle bin!)" },
      { c: 'cat file.txt', d: "Show file contents" },
      { g: "🔍 Search & help" },
      { c: 'grep "error" log.txt', d: "Search inside files" },
      { c: 'command --help', d: "Every command explains itself" },
      { c: 'clear · history', d: "Clean screen / past commands" },
      { g: "🏃 Run programs" },
      { c: 'node app.js', d: "Run a JS file" },
      { c: 'npm install · npm run dev', d: "Install deps / run scripts" },
      { c: 'Ctrl + C', d: "Stop the running program" },
      { g: "⚡ Pro" },
      { c: 'cmd1 | cmd2', d: "Pipe: output of one feeds the next" },
      { c: 'cmd > file.txt · cmd >> file.txt', d: "Write / append output to a file" },
      { c: 'cmd1 && cmd2', d: "Run 2 only if 1 succeeded" },
      { c: 'curl -s https://api.example.com/data', d: "Fetch a URL from the terminal" },
      { c: 'ssh user@server-ip', d: "Log into a remote server" },
      { c: 'tar -czf backup.tar.gz folder/', d: "Zip a folder (and -xzf to unzip)" },
      { c: 'ps · kill PID', d: "List processes / stop one" },
      { c: 'which node', d: "Where does this command live?" },
      { c: 'history | grep git', d: "Find that command you ran last week" },
      { c: 'chmod +x deploy.sh · ./deploy.sh', d: "Make a script runnable, run it" },
    ],
    regex: [
      { g: "🧱 Building blocks" },
      { c: '.', d: "Any single character" },
      { c: 'a* · a+ · a?', d: "0+, 1+, 0-or-1 of a" },
      { c: '[abc] · [a-z] · [^0-9]', d: "One of / range / NOT these" },
      { c: '^start · end$', d: "Anchors: begins / ends with" },
      { c: '\\d \\w \\s', d: "Digit / word char / whitespace" },
      { c: 'a{2,4}', d: "2 to 4 of a" },
      { c: '(cat|dog)', d: "Group + OR" },
      { c: '\\.', d: "Escape specials: . * + ? ( ) [ ]" },
      { c: '/pattern/gi', d: "Flags: g all matches, i ignore case" },
      { g: "📌 Real examples" },
      { c: '\\d{2}:\\d{2}', d: "Example: matches 09:45" },
      { c: '^09\\d{7,9}$', d: "Example: Myanmar phone shape" },
      { c: '[\\w.]+@[\\w.]+\\.[a-z]{2,}', d: "Example: rough email" },
      { g: "⚡ Pro" },
      { c: 'a+? · a*?', d: "Lazy: match as LITTLE as possible" },
      { c: '(?:abc)', d: "Group without capturing" },
      { c: '(?<name>\\d+)', d: "Named group → match.groups.name" },
      { c: '(\\w+) \\1', d: "Backreference: the same text again" },
      { c: '\\d(?= Ks)', d: "Lookahead: digit only if followed by ' Ks'" },
      { c: '(?<!09)\\d{7}', d: "Negative lookbehind: not preceded by 09" },
      { c: '\\btea\\b', d: "Word boundary: 'tea' but not 'team'" },
      { c: 'text.replace(/(\\d+)/g, "[$1]")', d: "Use captures in JS replacements" },
    ],
    markdown: [
      { g: "✍️ Text basics" },
      { c: '# H1 · ## H2 · ### H3', d: "Headings" },
      { c: '**bold** · *italic*', d: "Emphasis" },
      { c: '- item  /  1. item', d: "Bullet / numbered lists" },
      { c: '> quoted wisdom', d: "Blockquote" },
      { c: '---', d: "Horizontal line" },
      { g: "🔗 Links & media" },
      { c: '[text](https://url)', d: "Link" },
      { c: '![alt](image.png)', d: "Image" },
      { g: "💻 Code" },
      { c: '`inline code`', d: "Code in a sentence" },
      { c: '```js … ```', d: "Code block (with language!)" },
      { g: "📊 Extras" },
      { c: '| a | b |  +  |---|---|', d: "Table header + divider" },
      { c: '- [ ] todo · - [x] done', d: "Task list (GitHub)" },
      { g: "⚡ Pro" },
      { c: '<details><summary>Spoiler</summary>hidden</details>', d: "Collapsible section (GitHub READMEs)" },
      { c: '[![CI](badge.svg)](link)', d: "Clickable status badge" },
      { c: '[Jump](#section-name)', d: "Anchor link inside the doc" },
      { c: '  - nested item (2 spaces)', d: "Nested lists" },
      { c: 'Line ends with 2 spaces  ', d: "Forced line break" },
      { c: '~~crossed out~~', d: "Strikethrough" },
      { c: '> [!NOTE] · > [!WARNING]', d: "GitHub alert boxes" },
      { c: '```diff  + added  - removed  ```', d: "Diff highlighting in code blocks" },
    ],
  };
  const CHEAT_TABS = [
    ["html", "HTML"], ["css", "CSS"], ["js", "JavaScript"], ["git", "Git"],
    ["sql", "SQL"], ["terminal", "Terminal"], ["regex", "Regex"], ["markdown", "Markdown"],
  ];

  function toolBody(id) {
    switch (id) {
      case "cheats": return `
        <div class="chips" id="ch-tabs" style="margin-top:0">
          ${CHEAT_TABS.map(([k, label], i) => `<button class="chip ${i === 0 ? "active" : ""}" data-sheet="${k}">${label}</button>`).join("")}
        </div>
        <div id="ch-rows"></div>`;
      case "color": return `
        <div class="tl-row">
          <input type="color" id="cp-in" value="#a435f0" class="tl-color-big">
          <div style="flex:1;min-width:200px">
            <div class="tl-out"><span>HEX</span><code id="cp-hex"></code><button class="btn btn-outline btn-sm" data-copy="#cp-hex">📋</button></div>
            <div class="tl-out"><span>RGB</span><code id="cp-rgb"></code><button class="btn btn-outline btn-sm" data-copy="#cp-rgb">📋</button></div>
            <div class="tl-out"><span>HSL</span><code id="cp-hsl"></code><button class="btn btn-outline btn-sm" data-copy="#cp-hsl">📋</button></div>
          </div>
        </div>
        <div class="tl-lab">${t("tl_shades")}</div>
        <div class="tl-swatches" id="cp-shades"></div>`;

      case "gradient": return `
        <div class="tl-row">
          <label class="tl-mini">1 <input type="color" id="gr-a" value="#a435f0"></label>
          <label class="tl-mini">2 <input type="color" id="gr-b" value="#38bdf8"></label>
        </div>
        <div class="tl-lab">${t("tl_angle")} <span id="gr-av">135°</span></div>
        <input type="range" class="tl-range" id="gr-ang" min="0" max="360" value="135">
        <div class="tl-preview" id="gr-prev"></div>
        <div class="tl-out"><code id="gr-css"></code><button class="btn btn-primary btn-sm" data-copy="#gr-css">📋 ${t("tl_copy")}</button></div>`;

      case "shadow": return `
        <div class="tl-shadow-stage"><div class="tl-shadow-box" id="sh-box"></div></div>
        <div class="tl-cols">
          <div><div class="tl-lab">X <span id="sh-xv"></span></div><input type="range" class="tl-range" id="sh-x" min="-50" max="50" value="0"></div>
          <div><div class="tl-lab">Y <span id="sh-yv"></span></div><input type="range" class="tl-range" id="sh-y" min="-50" max="50" value="10"></div>
          <div><div class="tl-lab">Blur <span id="sh-bv"></span></div><input type="range" class="tl-range" id="sh-b" min="0" max="100" value="28"></div>
          <div><div class="tl-lab">Spread <span id="sh-sv"></span></div><input type="range" class="tl-range" id="sh-s" min="-50" max="50" value="0"></div>
          <div><div class="tl-lab">Opacity <span id="sh-ov"></span></div><input type="range" class="tl-range" id="sh-o" min="0" max="100" value="25"></div>
          <div><div class="tl-lab">Color</div><input type="color" id="sh-c" value="#000000"></div>
        </div>
        <div class="tl-out"><code id="sh-css"></code><button class="btn btn-primary btn-sm" data-copy="#sh-css">📋 ${t("tl_copy")}</button></div>`;

      case "json": return `
        <textarea class="tl-ta" id="js-in" rows="10" placeholder="${t("tl_json_ph")}"></textarea>
        <div class="tl-row">
          <button class="btn btn-primary btn-sm" id="js-fmt">${t("tl_format")}</button>
          <button class="btn btn-outline btn-sm" id="js-min">${t("tl_minify")}</button>
          <button class="btn btn-outline btn-sm" data-copy="#js-in">📋 ${t("tl_copy")}</button>
          <button class="btn btn-outline btn-sm" id="js-clr">${t("tl_clear")}</button>
        </div>
        <div class="tl-status" id="js-status"></div>`;

      case "regex": return `
        <div class="tl-row">
          <input class="tl-in" id="rx-p" style="flex:3;min-width:160px" placeholder="${t("tl_pattern")}  e.g. [a-z]+@[a-z]+\\.com">
          <input class="tl-in" id="rx-f" style="flex:1;min-width:60px" value="gi" placeholder="${t("tl_flags")}">
        </div>
        <textarea class="tl-ta" id="rx-t" rows="5" placeholder="${t("tl_test_text")}">Email me at mya@gmail.com or ko.aung@yahoo.com today!</textarea>
        <div class="tl-status" id="rx-n"></div>
        <div class="rx-out" id="rx-out"></div>`;

      case "units": return `
        <div class="tl-lab">${t("tl_base")}</div>
        <div class="tl-row"><input class="tl-in" id="u-base" type="number" value="16" min="1" style="width:110px"></div>
        <div class="tl-cols">
          <div><div class="tl-lab">px → rem</div>
            <div class="tl-row"><input class="tl-in" id="u-px" type="number" value="24" style="width:110px"><code id="u-px-out" class="tl-big"></code></div></div>
          <div><div class="tl-lab">rem → px</div>
            <div class="tl-row"><input class="tl-in" id="u-rem" type="number" value="1.5" step="0.25" style="width:110px"><code id="u-rem-out" class="tl-big"></code></div></div>
        </div>
        <div class="rx-out" id="u-table" style="white-space:normal"></div>`;

      case "case": return `
        <textarea class="tl-ta" id="cs-in" rows="3" placeholder="my student portfolio page">my student portfolio page</textarea>
        <div id="cs-out"></div>`;

      case "count": return `
        <textarea class="tl-ta" id="ct-in" rows="8" placeholder="${t("tl_test_text")}"></textarea>
        <div class="tl-stats">
          <div class="tl-stat"><strong id="ct-w">0</strong><span>${t("tl_words")}</span></div>
          <div class="tl-stat"><strong id="ct-c">0</strong><span>${t("tl_chars")}</span></div>
          <div class="tl-stat"><strong id="ct-cn">0</strong><span>${t("tl_chars_ns")}</span></div>
          <div class="tl-stat"><strong id="ct-l">0</strong><span>${t("tl_lines")}</span></div>
          <div class="tl-stat"><strong id="ct-r">0 ${t("tl_min")}</strong><span>${t("tl_read")}</span></div>
        </div>`;

      case "lorem": return `
        <div class="tl-row">
          <label class="tl-lab" style="margin:0">${t("tl_paras")}</label>
          <select class="tl-in" id="lo-n"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option></select>
          <button class="btn btn-primary btn-sm" id="lo-go">${t("tl_generate")}</button>
          <button class="btn btn-outline btn-sm" data-copy="#lo-out">📋 ${t("tl_copy")}</button>
        </div>
        <div class="rx-out" id="lo-out" style="white-space:normal;font-family:inherit"></div>`;

      case "typing": return `
        <div class="type-target" id="tt-target"></div>
        <textarea class="tl-ta" id="tt-in" rows="3" placeholder="${t("tl_type_here")}" autocapitalize="off" autocomplete="off" spellcheck="false"></textarea>
        <div class="tl-status">${t("tl_start_typing")}</div>
        <div class="tl-stats">
          <div class="tl-stat"><strong id="tt-wpm">0</strong><span>${t("tl_wpm")}</span></div>
          <div class="tl-stat"><strong id="tt-acc">100%</strong><span>${t("tl_acc")}</span></div>
          <div class="tl-stat"><strong id="tt-time">0s</strong><span>⏱</span></div>
        </div>
        <div class="tl-row" style="margin-top:12px"><button class="btn btn-outline btn-sm" id="tt-new">🔄 ${t("tl_new_text")}</button></div>`;

      case "timer": return `
        <div class="pomo-mode" id="pm-mode"></div>
        <div class="pomo-time" id="pm-time">25:00</div>
        <div class="pomo-btns">
          <button class="btn btn-primary" id="pm-start">▶ ${t("tl_start")}</button>
          <button class="btn btn-outline" id="pm-reset">${t("tl_reset")}</button>
        </div>
        <div class="pomo-btns">
          <button class="btn btn-outline btn-sm" id="pm-focus">🎯 ${t("tl_focus")} 25:00</button>
          <button class="btn btn-outline btn-sm" id="pm-break">☕ ${t("tl_break")} 5:00</button>
        </div>
        <div class="pomo-sessions" id="pm-count"></div>`;
    }
    return "";
  }

  function wireTool(id) {
    const $ = (sel) => document.querySelector(sel);

    if (id === "cheats") {
      const rows = $("#ch-rows");
      const paint = (sheet) => {
        rows.innerHTML = (CHEATS[sheet] || []).map((r) => r.g
          ? `<div class="ch-group">${escapeHtml(r.g)}</div>`
          : `
          <div class="tl-out ch-row">
            <code>${escapeHtml(r.c)}</code>
            <span class="ch-desc">${escapeHtml(r.d)}</span>
            <button class="btn btn-outline btn-sm" data-cpc title="${escapeHtml(t("tl_copy"))}">📋</button>
          </div>`).join("");
      };
      $("#ch-tabs").addEventListener("click", (e) => {
        const b = e.target.closest("[data-sheet]");
        if (!b) return;
        document.querySelectorAll("#ch-tabs .chip").forEach((x) => x.classList.toggle("active", x === b));
        paint(b.getAttribute("data-sheet"));
      });
      rows.addEventListener("click", (e) => {
        const b = e.target.closest("[data-cpc]");
        if (b) tlCopy(b, b.parentElement.querySelector("code").textContent);
      });
      paint("html");
    }

    if (id === "color") {
      const inp = $("#cp-in");
      const update = () => {
        const hex = inp.value;
        const [r, g, b] = hexToRgb(hex);
        const [h, s, l] = rgbToHsl(r, g, b);
        $("#cp-hex").textContent = hex;
        $("#cp-rgb").textContent = `rgb(${r}, ${g}, ${b})`;
        $("#cp-hsl").textContent = `hsl(${h}, ${s}%, ${l}%)`;
        $("#cp-shades").innerHTML = [-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6]
          .map((f) => { const c = shadeHex(hex, f); return `<button class="tl-swatch" data-hex="${c}" title="${c}" style="background:${c}"></button>`; })
          .join("");
      };
      inp.addEventListener("input", update);
      $("#cp-shades").addEventListener("click", (e) => {
        const b = e.target.closest("[data-hex]");
        if (b) { inp.value = b.dataset.hex; update(); }
      });
      update();
    }

    if (id === "gradient") {
      const upd = () => {
        const css = `linear-gradient(${$("#gr-ang").value}deg, ${$("#gr-a").value} 0%, ${$("#gr-b").value} 100%)`;
        $("#gr-av").textContent = $("#gr-ang").value + "°";
        $("#gr-prev").style.background = css;
        $("#gr-css").textContent = "background: " + css + ";";
      };
      ["#gr-a", "#gr-b", "#gr-ang"].forEach((s) => $(s).addEventListener("input", upd));
      upd();
    }

    if (id === "shadow") {
      const upd = () => {
        const x = $("#sh-x").value, y = $("#sh-y").value, bl = $("#sh-b").value, sp = $("#sh-s").value, op = $("#sh-o").value;
        const [r, g, b] = hexToRgb($("#sh-c").value);
        const css = `${x}px ${y}px ${bl}px ${sp}px rgba(${r}, ${g}, ${b}, ${(op / 100).toFixed(2)})`;
        $("#sh-xv").textContent = x + "px"; $("#sh-yv").textContent = y + "px";
        $("#sh-bv").textContent = bl + "px"; $("#sh-sv").textContent = sp + "px";
        $("#sh-ov").textContent = op + "%";
        $("#sh-box").style.boxShadow = css;
        $("#sh-css").textContent = "box-shadow: " + css + ";";
      };
      ["#sh-x", "#sh-y", "#sh-b", "#sh-s", "#sh-o", "#sh-c"].forEach((s) => $(s).addEventListener("input", upd));
      upd();
    }

    if (id === "json") {
      const ta = $("#js-in"), st = $("#js-status");
      const run = (space) => {
        if (!ta.value.trim()) { st.textContent = ""; return; }
        try {
          ta.value = JSON.stringify(JSON.parse(ta.value), null, space);
          st.textContent = t("tl_valid"); st.className = "tl-status ok";
        } catch (e) {
          st.textContent = t("tl_invalid") + e.message; st.className = "tl-status bad";
        }
      };
      $("#js-fmt").addEventListener("click", () => run(2));
      $("#js-min").addEventListener("click", () => run(0));
      $("#js-clr").addEventListener("click", () => { ta.value = ""; st.textContent = ""; });
    }

    if (id === "regex") {
      const run = () => {
        const pat = $("#rx-p").value, text = $("#rx-t").value, out = $("#rx-out"), n = $("#rx-n");
        if (!pat) { out.innerHTML = escapeHtml(text); n.textContent = ""; return; }
        let re;
        try {
          let flags = $("#rx-f").value.replace(/[^gimsuy]/g, "");
          if (flags.indexOf("g") < 0) flags += "g";
          re = new RegExp(pat, flags);
        } catch (e) { n.textContent = "✗ " + e.message; n.className = "tl-status bad"; return; }
        let html = "", last = 0, count = 0;
        for (const m of text.matchAll(re)) {
          if (count >= 500) break;
          html += escapeHtml(text.slice(last, m.index)) + "<mark>" + (m[0] ? escapeHtml(m[0]) : "∅") + "</mark>";
          last = m.index + m[0].length;
          count++;
        }
        html += escapeHtml(text.slice(last));
        $("#rx-out").innerHTML = html;
        n.textContent = count + " " + t("tl_matches"); n.className = "tl-status " + (count ? "ok" : "");
      };
      ["#rx-p", "#rx-f", "#rx-t"].forEach((s) => $(s).addEventListener("input", run));
      run();
    }

    if (id === "units") {
      const upd = () => {
        const base = parseFloat($("#u-base").value) || 16;
        const px = parseFloat($("#u-px").value) || 0;
        const rem = parseFloat($("#u-rem").value) || 0;
        $("#u-px-out").textContent = "= " + parseFloat((px / base).toFixed(4)) + "rem";
        $("#u-rem-out").textContent = "= " + parseFloat((rem * base).toFixed(2)) + "px";
        $("#u-table").innerHTML = [12, 14, 16, 18, 20, 24, 32, 48]
          .map((p) => `<span class="u-cell"><strong>${p}px</strong> = ${parseFloat((p / base).toFixed(4))}rem</span>`)
          .join(" ");
      };
      ["#u-base", "#u-px", "#u-rem"].forEach((s) => $(s).addEventListener("input", upd));
      upd();
    }

    if (id === "case") {
      const inp = $("#cs-in"), out = $("#cs-out");
      const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);
      const upd = () => {
        const s = inp.value;
        const words = s.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^A-Za-z0-9က-႟]+/).filter(Boolean);
        const rows = [
          ["UPPERCASE", s.toUpperCase()],
          ["lowercase", s.toLowerCase()],
          ["Title Case", s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase())],
          ["camelCase", words.map((w, i) => (i ? cap(w.toLowerCase()) : w.toLowerCase())).join("")],
          ["snake_case", words.join("_").toLowerCase()],
          ["kebab-case", words.join("-").toLowerCase()],
        ];
        out.innerHTML = rows.map(([lab, val]) =>
          `<div class="tl-out"><span style="width:76px">${lab}</span><code>${escapeHtml(val)}</code><button class="btn btn-outline btn-sm" data-cpc>📋</button></div>`).join("");
      };
      inp.addEventListener("input", upd);
      out.addEventListener("click", (e) => {
        const b = e.target.closest("[data-cpc]");
        if (b) tlCopy(b, b.parentElement.querySelector("code").textContent);
      });
      upd();
    }

    if (id === "count") {
      const ta = $("#ct-in");
      const upd = () => {
        const s = ta.value;
        const words = s.trim() ? s.trim().split(/\s+/).length : 0;
        $("#ct-w").textContent = words;
        $("#ct-c").textContent = s.length;
        $("#ct-cn").textContent = s.replace(/\s/g, "").length;
        $("#ct-l").textContent = s ? s.split("\n").length : 0;
        $("#ct-r").textContent = Math.max(words ? 1 : 0, Math.ceil(words / 200)) + " " + t("tl_min");
      };
      ta.addEventListener("input", upd);
      upd();
    }

    if (id === "lorem") {
      const POOL = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
        "Nisi ut aliquip ex ea commodo consequat in pariatur.",
        "Qui officia deserunt mollit anim id est laborum et dolorum.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
      ];
      const gen = () => {
        const n = parseInt($("#lo-n").value, 10) || 2;
        const paras = [];
        for (let p = 0; p < n; p++) {
          const cnt = 3 + Math.floor(Math.random() * 3);
          const parts = [];
          for (let i = 0; i < cnt; i++) parts.push(POOL[Math.floor(Math.random() * POOL.length)]);
          paras.push(parts.join(" "));
        }
        $("#lo-out").innerHTML = paras.map((x) => "<p>" + x + "</p>").join("");
      };
      $("#lo-go").addEventListener("click", gen);
      gen();
    }

    if (id === "typing") {
      const TEXTS = [
        'const message = "Hello, world!";',
        "let total = price * quantity;",
        "for (let i = 0; i < 10; i++) console.log(i);",
        "function add(a, b) { return a + b; }",
        'if (score >= 80) alert("You passed!");',
        "The quick brown fox jumps over the lazy dog.",
        "Practice a little every day and you will improve fast.",
        'document.querySelector("h1").textContent = "Done";',
      ];
      const ta = $("#tt-in"), tgt = $("#tt-target");
      let target = "", start = 0, done = false;
      const paint = () => {
        const typed = ta.value;
        tgt.innerHTML = target.split("").map((ch, i) => {
          const cls = i >= typed.length ? "" : typed[i] === ch ? "ok" : "bad";
          return `<span class="${cls}">${escapeHtml(ch)}</span>`;
        }).join("");
      };
      const fresh = () => {
        target = TEXTS[Math.floor(Math.random() * TEXTS.length)];
        start = 0; done = false;
        ta.value = ""; ta.disabled = false; ta.focus();
        $("#tt-wpm").textContent = "0"; $("#tt-acc").textContent = "100%"; $("#tt-time").textContent = "0s";
        paint();
      };
      ta.addEventListener("input", () => {
        if (done) return;
        if (!start) start = Date.now();
        paint();
        const typed = ta.value;
        const secs = Math.max(1, (Date.now() - start) / 1000);
        let good = 0;
        for (let i = 0; i < typed.length && i < target.length; i++) if (typed[i] === target[i]) good++;
        $("#tt-wpm").textContent = Math.round((typed.length / 5) / (secs / 60));
        $("#tt-acc").textContent = (typed.length ? Math.round((good / typed.length) * 100) : 100) + "%";
        $("#tt-time").textContent = Math.round(secs) + "s";
        if (typed.length >= target.length) { done = true; ta.disabled = true; }
      });
      $("#tt-new").addEventListener("click", fresh);
      fresh();
    }

    if (id === "timer") {
      const LENGTHS = { focus: 25 * 60, break: 5 * 60 };
      let mode = "focus", left = LENGTHS.focus, tid = null;
      const today = new Date().toISOString().slice(0, 10);
      const readCount = () => {
        try { const s = JSON.parse(localStorage.getItem("wda_pomo")); return s && s.d === today ? s.n : 0; } catch (e) { return 0; }
      };
      const beep = () => {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.frequency.value = 880; g.gain.value = 0.15;
          o.start(); o.stop(ctx.currentTime + 0.35);
        } catch (e) {}
      };
      const paint = () => {
        const m = Math.floor(left / 60), s = left % 60;
        $("#pm-time").textContent = m + ":" + String(s).padStart(2, "0");
        $("#pm-mode").textContent = mode === "focus" ? "🎯 " + t("tl_focus") : "☕ " + t("tl_break");
        $("#pm-count").textContent = t("tl_sessions") + ": " + readCount();
      };
      const stop = () => {
        if (tid) { clearInterval(tid); tid = null; }
        /* may run from hashchange after the page was re-rendered */
        const b = $("#pm-start");
        if (b) b.textContent = "▶ " + t("tl_start");
      };
      const setMode = (m) => { mode = m; left = LENGTHS[m]; stop(); paint(); };
      const tick = () => {
        left--;
        if (left <= 0) {
          beep();
          if (mode === "focus") {
            localStorage.setItem("wda_pomo", JSON.stringify({ d: today, n: readCount() + 1 }));
            setMode("break");
          } else setMode("focus");
          return;
        }
        paint();
      };
      $("#pm-start").addEventListener("click", () => {
        if (tid) { stop(); return; }
        tid = setInterval(tick, 1000);
        $("#pm-start").textContent = "⏸ " + t("pause");
      });
      $("#pm-reset").addEventListener("click", () => setMode(mode));
      $("#pm-focus").addEventListener("click", () => setMode("focus"));
      $("#pm-break").addEventListener("click", () => setMode("break"));
      window.addEventListener("hashchange", stop, { once: true });
      paint();
    }
  }

  /* ---------------- View: Daily Challenge ---------------- */
  /* Same question for everyone, picked deterministically from the whole
     catalog's quiz bank by today's LOCAL date. One try per day, +20 XP. */
  function todayKey(offsetDays) {
    const d = new Date(Date.now() + (offsetDays || 0) * 864e5);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function dailyQuestion() {
    const bank = [];
    COURSES.forEach((c) => c.sections.forEach((s) => s.lessons.forEach((l) => {
      if (l.type === "quiz" && Array.isArray(l.questions)) l.questions.forEach((q) => bank.push(q));
    })));
    if (!bank.length) return null;
    const date = todayKey();
    let h = 0;
    for (const ch of date) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return bank[h % bank.length];
  }
  /* ---------------- View: Quiz Battle — 1v1 realtime race ----------------
     Uses the open rooms/ path (messages as a tiny event log), so it works
     with the CURRENT database rules. Questions derive deterministically
     from the battle code — both players compute the same quiz locally. */
  function battleQuestions(code) {
    const bank = [];
    COURSES.forEach((c) => c.sections.forEach((s) => s.lessons.forEach((l) => {
      if (l.type === "quiz" && Array.isArray(l.questions)) l.questions.forEach((q) => bank.push(q));
    })));
    let x = 7;
    for (const ch of code) x = ((x * 33) ^ ch.charCodeAt(0)) >>> 0;
    const qs = [], used = {};
    while (qs.length < 5 && qs.length < bank.length) {
      x ^= x << 13; x ^= x >>> 17; x ^= x << 5; x >>>= 0;
      const i = x % bank.length;
      if (!used[i]) { used[i] = 1; qs.push(bank[i]); }
    }
    return qs;
  }
  function battleMe() {
    const u = loggedIn() ? window.Auth.current() : null;
    let gid = sessionStorage.getItem("wda_battle_id");
    if (!gid) { gid = "p_" + Math.random().toString(36).slice(2, 8); sessionStorage.setItem("wda_battle_id", gid); }
    return { id: u ? u.id : gid, name: u ? String(u.name || u.email).split(" ")[0].slice(0, 16) : "Player-" + gid.slice(-3) };
  }
  function renderBattle(code) {
    /* the security rules only accept battle events from signed-in players */
    if (!loggedIn()) {
      app.innerHTML = `<div class="container" style="max-width:560px"><div class="empty"><h2>⚔️</h2><p>${t("bt_login")}</p></div></div>`;
      requireAuth(() => { window.dispatchEvent(new Event("hashchange")); });
      return;
    }
    const base = statsBase();
    if (!code) {
      /* lobby: create or join */
      app.innerHTML = `
        <div class="container" style="max-width:560px">
          <h1 class="tool-h">⚔️ ${t("bt_title")}</h1>
          <p class="section-sub">${t("bt_sub")}</p>
          <div class="panel" style="text-align:center">
            <button class="btn btn-primary btn-block" id="bt-create">🎮 ${t("bt_create")}</button>
            <div class="muted" style="margin:14px 0 8px">— ${t("bt_or")} —</div>
            <div class="tl-row" style="justify-content:center">
              <input class="tl-in" id="bt-code" placeholder="${t("bt_join_ph")}" maxlength="6" style="width:140px;text-transform:uppercase;text-align:center;font-weight:800;letter-spacing:3px">
              <button class="btn btn-outline" id="bt-join">${t("bt_join")}</button>
            </div>
          </div>
          <div class="panel"><h3>📖 ${t("bt_how")}</h3><ul class="req-list">
            <li>${t("bt_how1")}</li><li>${t("bt_how2")}</li><li>${t("bt_how3")}</li>
          </ul></div>
        </div>`;
      document.getElementById("bt-create").addEventListener("click", () => {
        const c = Math.random().toString(36).replace(/[^a-z0-9]/g, "").slice(2, 7).toUpperCase();
        location.hash = "#/battle/" + c;
      });
      const go = () => {
        const v = (document.getElementById("bt-code").value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (v) location.hash = "#/battle/" + v;
      };
      document.getElementById("bt-join").addEventListener("click", go);
      document.getElementById("bt-code").addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      window.scrollTo(0, 0);
      return;
    }

    code = code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
    if (!base) { app.innerHTML = `<div class="container"><div class="empty"><h2>${t("lb_offline")}</h2></div></div>`; return; }
    const me = battleMe();
    const qs = battleQuestions(code);
    const url = base + "/rooms/" + encodeURIComponent("battle::" + code) + "/messages.json";
    const post = (obj) => authFetch(url, { method: "POST", body: JSON.stringify(Object.assign({ ts: Date.now() }, obj)) }).catch(() => {});
    let joined = false, shownAt = 0, finishedDrawn = false, lastSig = "";

    app.innerHTML = `
      <div class="container" style="max-width:620px">
        <h1 class="tool-h">⚔️ ${t("bt_title")} <span class="bt-codechip">${code}</span></h1>
        <div id="bt-arena"><div class="empty"><h2>⏳</h2></div></div>
      </div>`;
    const arena = document.getElementById("bt-arena");

    const draw = (msgs) => {
      const list = Object.values(msgs || {}).filter(Boolean).sort((a, b) => (a.ts || 0) - (b.ts || 0));
      const joins = [];
      list.forEach((m) => { if (m.type === "join" && m.u && !joins.some((j) => j.u === m.u)) joins.push(m); });
      if (!joined && !joins.some((j) => j.u === me.id)) { joined = true; post({ type: "join", u: me.id, name: me.name }); }
      const players = joins.slice(0, 2);
      const opp = players.find((p) => p.u !== me.id);
      const iAmIn = players.some((p) => p.u === me.id);
      if (!iAmIn && players.length >= 2) {
        arena.innerHTML = `<div class="empty"><h2>😢 ${t("bt_full")}</h2><a class="btn btn-primary" href="#/battle">← ${t("bt_title")}</a></div>`;
        return true;
      }
      if (players.length < 2) {
        const share = location.origin + location.pathname + "#/battle/" + code;
        arena.innerHTML = `
          <div class="panel" style="text-align:center">
            <h2 style="margin:6px 0">${t("bt_waiting")}</h2>
            <div class="bt-bigcode">${code}</div>
            <p class="muted">${t("bt_share")}</p>
            <div class="tl-row" style="justify-content:center">
              <button class="btn btn-outline btn-sm" id="bt-copy">🔗 ${t("tl_copy")}</button>
              <button class="btn btn-outline btn-sm" id="bt-chat">💬 ${t("bt_invite_chat")}</button>
            </div>
            <p class="bt-pulse" style="margin-top:14px">🕐</p>
          </div>`;
        const cb = document.getElementById("bt-copy");
        if (cb) cb.addEventListener("click", () => {
          const done = () => { cb.textContent = "✓ " + t("copied"); };
          if (navigator.clipboard) navigator.clipboard.writeText(share).then(done).catch(done); else done();
        });
        const ch = document.getElementById("bt-chat");
        if (ch) ch.addEventListener("click", () => {
          if (window.Chat && window.Chat.post) {
            window.Chat.setRoom("community", null);
            window.Chat.post("⚔️ " + t("bt_chat_invite").replace("{code}", code) + " " + share);
            window.Chat.open();
            ch.textContent = "✓";
          }
        });
        return false;
      }
      /* battle on: my answers vs theirs */
      const ans = { mine: [], theirs: [] };
      list.forEach((m) => {
        if (m.type !== "ans" || typeof m.i !== "number") return;
        if (m.u === me.id) ans.mine[m.i] = m;
        else if (opp && m.u === opp.u) ans.theirs[m.i] = m;
      });
      const score = (arr) => arr.reduce((s, a) => s + (a && a.ok ? 100 + Math.max(0, 50 - Math.floor((a.ms || 9999) / 200)) : 0), 0);
      const myDone = ans.mine.filter(Boolean).length, opDone = ans.theirs.filter(Boolean).length;
      const myScore = score(ans.mine), opScore = score(ans.theirs);
      const head = `
        <div class="panel bt-head">
          <div class="bt-side"><b>🙋 ${escapeHtml(me.name)}</b><div class="progress thin"><span style="width:${myDone * 20}%"></span></div><span class="bt-pts">${myScore} ${t("bt_pts")}</span></div>
          <span class="bt-vs">VS</span>
          <div class="bt-side"><b>${escapeHtml(opp.name || "?")}</b><div class="progress thin"><span style="width:${opDone * 20}%"></span></div><span class="bt-pts">${opScore} ${t("bt_pts")}</span></div>
        </div>`;
      if (myDone >= qs.length && opDone >= qs.length) {
        if (finishedDrawn) return true;
        finishedDrawn = true;
        const win = myScore > opScore, draw2 = myScore === opScore;
        const xp = win ? 30 : draw2 ? 15 : 10;
        const awardKey = ns("wda_battle_xp::" + code);
        if (!localStorage.getItem(awardKey)) { localStorage.setItem(awardKey, "1"); addBonusXp(xp); }
        arena.innerHTML = head + `
          <div class="panel" style="text-align:center">
            <h2 style="font-size:40px;margin:8px 0">${win ? "🏆" : draw2 ? "🤝" : "💪"}</h2>
            <h2>${win ? t("bt_win") : draw2 ? t("bt_draw") : t("bt_lose")}</h2>
            <p class="muted">${myScore} — ${opScore} · +${xp} XP</p>
            <a class="btn btn-primary" href="#/battle">🔁 ${t("bt_again")}</a>
            <a class="btn btn-outline" href="#/community">🫂 ${t("comm_title")}</a>
          </div>`;
        return true;
      }
      if (myDone >= qs.length) {
        arena.innerHTML = head + `<div class="panel" style="text-align:center"><h3>⌛ ${t("bt_wait_opp")}</h3><p class="bt-pulse">🕐</p></div>`;
        return false;
      }
      const q = qs[myDone];
      const sig = code + ":" + myDone + ":" + opDone + ":" + opScore;
      if (sig === lastSig) return false; /* nothing changed — don't re-render mid-question */
      lastSig = sig;
      if (!shownAt || !arena.querySelector(".bt-q")) shownAt = Date.now();
      arena.innerHTML = head + `
        <div class="panel bt-q">
          <p class="muted" style="margin:0 0 6px">${t("bt_q")} ${myDone + 1} / ${qs.length}</p>
          <h3 style="margin-top:0">${qsafe(q.q)}</h3>
          ${q.options.map((o, i) => `<button class="qc-opt" data-i="${i}">${qsafe(o)}</button>`).join("")}
        </div>`;
      shownAt = Date.now();
      arena.querySelectorAll(".qc-opt").forEach((b) => b.addEventListener("click", () => {
        if (arena.dataset.lock) return;
        arena.dataset.lock = "1";
        const i = Number(b.getAttribute("data-i"));
        const ok = i === q.answer;
        b.classList.add(ok ? "right" : "wrong");
        if (!ok) { const r = arena.querySelector(`.qc-opt[data-i="${q.answer}"]`); if (r) r.classList.add("right"); }
        post({ type: "ans", u: me.id, i: myDone, ok: ok, ms: Date.now() - shownAt });
        setTimeout(() => { delete arena.dataset.lock; lastSig = ""; tick(); }, 900);
      }));
      return false;
    };

    let stop = false;
    const tick = () => {
      if (stop) return;
      fetch(url).then((r) => r.json()).then((msgs) => { if (!stop && draw(msgs)) stop = true; }).catch(() => {});
    };
    tick();
    const iv = setInterval(tick, 1500);
    window.addEventListener("hashchange", () => { stop = true; clearInterval(iv); }, { once: true });
    window.scrollTo(0, 0);
  }

  function dailyHomeCard() {
    const st = jget(ns("wda_daily"), {});
    const done = st.date === todayKey();
    return `
      <a class="daily-card ${done ? "done" : ""}" href="#/daily">
        <span class="dc-ic">🎯</span>
        <div class="dc-txt"><b>${t("daily_title")}</b><span class="muted">${done ? t("daily_done_short") : t("daily_cta")}</span></div>
        <span class="btn ${done ? "btn-outline" : "btn-primary"} btn-sm">${done ? "✓" : "+20 XP"}</span>
      </a>`;
  }
  function renderDaily() {
    const q = dailyQuestion();
    if (!q) return renderNotFound();
    const date = todayKey();
    const st = jget(ns("wda_daily"), {});
    const answered = st.date === date;
    const hoursLeft = Math.max(1, Math.ceil((new Date(todayKey(1) + "T00:00:00") - Date.now()) / 36e5));

    const optHtml = (highlight) => q.options.map((o, i) => {
      let cls = "qc-opt";
      if (highlight) {
        if (i === q.answer) cls += " right";
        else if (answered && st.picked === i) cls += " wrong";
      }
      return `<button type="button" class="${cls}" data-daily-opt="${i}" ${highlight ? "disabled" : ""}>${qsafe(o)}</button>`;
    }).join("");

    app.innerHTML = `
      <div class="container" style="max-width:620px">
        <h2 class="section-title">🎯 ${t("daily_title")}</h2>
        <p class="section-sub">${t("daily_sub")}</p>
        <div class="panel daily-panel">
          <div class="daily-meta">
            <span>📅 ${date}</span>
            <span>🔥 ${t("daily_streak")}: <b>${Number(st.streak) || 0}</b></span>
          </div>
          <div class="qc-q" style="font-size:17px">${qsafe(q.q)}</div>
          <div class="qc-opts" id="daily-opts">${optHtml(answered)}</div>
          <div class="tl-status" id="daily-fb">${answered
            ? (st.correct ? "✅ " + t("daily_correct") : "❌ " + t("daily_wrong")) + " · " + t("daily_back").replace("{h}", hoursLeft)
            : "💡 " + t("daily_hint")}</div>
        </div>
        <p style="text-align:center"><a class="btn btn-outline btn-sm" href="#/leaderboard">🏆 ${t("lb_title")}</a></p>
      </div>`;

    if (answered) return;
    document.getElementById("daily-opts").addEventListener("click", (e) => {
      const b = e.target.closest("[data-daily-opt]");
      if (!b) return;
      const cur = jget(ns("wda_daily"), {});
      if (cur.date === date) return; /* double-click guard */
      const picked = Number(b.getAttribute("data-daily-opt"));
      const correct = picked === q.answer;
      const streak = correct
        ? ((cur.date === todayKey(-1) && cur.correct) ? (Number(cur.streak) || 0) + 1 : 1)
        : 0;
      jset(ns("wda_daily"), { date, picked, correct, streak });
      if (correct) {
        addBonusXp(20);
        pushLeaderboard();
        setTimeout(maybeToastBadges, 400);
      }
      renderDaily();
    });
  }

  /* ---------------- View: Community ---------------- */
  /* daily motivation quote + streak-at-risk nudge for the home page */
  function motivHomeCard() {
    return `<div class="motiv-card">💪 <em>“${motivText(motivPick(todayKey()))}”</em></div>`;
  }
  function streakNudge() {
    const s = jget(ns("wda_streak"), { last: "", count: 0 });
    if (!s.count) return "";
    let yStr;
    try { yStr = new Date(Date.now() - 864e5).toISOString().slice(0, 10); } catch (e) { return ""; }
    /* studied yesterday but not yet today → streak is at risk */
    if (s.last !== yStr) return "";
    return `<div class="streak-nudge">🔥 ${t("nudge_streak").replace("{n}", s.count)}</div>`;
  }

  function communityHomeCard() {
    return `
      <a class="daily-card comm-card" href="#/community">
        <span class="dc-ic">🫂</span>
        <div class="dc-txt"><b>${t("comm_title")}</b><span class="muted">${t("comm_home_sub")}</span></div>
        <span class="btn btn-outline btn-sm">💬</span>
      </a>`;
  }
  function renderCommunity() {
    app.innerHTML = `
      <div class="container" style="max-width:720px">
        <h2 class="section-title">🫂 ${t("comm_title")}</h2>
        <p class="section-sub">${t("comm_sub")}</p>

        <div class="panel comm-cta">
          <div style="flex:1;min-width:220px">
            <h3 style="margin:0 0 4px">💬 ${t("comm_chat_title")}</h3>
            <p class="muted" style="margin:0;font-size:13.5px">${t("comm_chat_sub")}</p>
            <p class="tl-status" id="comm-online"></p>
          </div>
          <span style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-primary" id="comm-open">💬 ${t("comm_open")}</button>
            <a class="btn btn-outline" href="#/battle">⚔️ ${t("bt_title")}</a>
            <a class="btn btn-outline" href="#/call/community">📹 ${t("call_start")}</a>
            ${window.Push && window.Push.supported() && !(window.Push.enabled())
              ? `<button class="btn btn-outline" id="comm-push">🔔 ${t("push_enable")}</button>` : ""}
          </span>
        </div>

        <div class="panel">
          <h3>📅 ${t("ev_title")}</h3>
          <div id="comm-events"><p class="muted">⏳</p></div>
        </div>

        <div class="panel">
          <h3>🏆 ${t("comm_top_week")}</h3>
          <div id="comm-top" class="adash-list"><p class="muted">⏳</p></div>
          <a class="btn btn-outline btn-sm" style="margin-top:10px" href="#/leaderboard">🏆 ${t("lb_title")} →</a>
        </div>

        <div class="panel">
          <h3>⚡ ${t("ev_activity")}</h3>
          <div id="comm-activity" class="adash-list"><p class="muted">⏳</p></div>
        </div>

        <div class="panel">
          <h3>📚 ${t("comm_rooms")}</h3>
          <p class="muted" style="font-size:13px;margin-top:0">${t("comm_rooms_sub")}</p>
          <div class="chips">
            ${COURSES.filter((c) => !isFree(c)).map((c) =>
              `<a class="chip" href="#/course/${c.id}">${c.icon} ${cf(c, "title")}</a>`).join("")}
          </div>
        </div>

        <div class="panel">
          <h3>📜 ${t("comm_rules")}</h3>
          <ul class="req-list">
            <li>${t("comm_rule1")}</li>
            <li>${t("comm_rule2")}</li>
            <li>${t("comm_rule3")}</li>
            <li>${t("comm_rule4")}</li>
          </ul>
        </div>
      </div>`;

    document.getElementById("comm-open").addEventListener("click", () => {
      if (window.Chat) { window.Chat.setRoom("community", null); window.Chat.open(); }
    });
    const pushBtn = document.getElementById("comm-push");
    if (pushBtn) pushBtn.addEventListener("click", () => {
      pushBtn.disabled = true;
      pushBtn.textContent = "🔔 …";
      window.Push.enable()
        .then(() => { pushBtn.textContent = "🔔 ✓ " + t("push_on"); })
        .catch((e) => {
          pushBtn.disabled = false;
          pushBtn.textContent = "🔔 " + t("push_enable");
          const m = (e && e.message) || "";
          alert(m === "not-configured" ? t("push_not_ready") : m === "denied" ? t("push_denied") : t("chat_send_err"));
        });
    });

    const base = statsBase();
    if (!base) return;
    /* who's online (presence heartbeats, 60s window — same rule as the widget) */
    fetch(base + "/rooms/community/presence.json").then((r) => r.json()).then((val) => {
      const el = document.getElementById("comm-online");
      if (!el) return;
      const now = Date.now();
      const users = Object.values(val || {}).filter((x) => x && now - x.ts < 60000);
      el.className = "tl-status " + (users.length ? "ok" : "");
      el.textContent = users.length
        ? "🟢 " + users.length + " " + t("comm_online") + ": " +
          users.slice(0, 5).map((x) => x.name).join(", ") + (users.length > 5 ? " +" + (users.length - 5) : "")
        : "💤 " + t("comm_quiet");
    }).catch(() => {});
    /* this week's most active learners + recent-activity feed */
    fetch(base + "/stats/leaderboard.json").then((r) => r.json()).then((lb) => {
      const el = document.getElementById("comm-top");
      const week = Date.now() - 7 * 864e5;
      const all = Object.values(lb || {}).filter((x) => x && (Number(x.xp) || 0) > 0);
      if (el) {
        const rows = all
          .filter((x) => (Number(x.ts) || 0) >= week)
          .sort((a, b) => (Number(b.xp) || 0) - (Number(a.xp) || 0))
          .slice(0, 5);
        el.innerHTML = rows.length
          ? rows.map((s, i) =>
              `<div class="adash-row"><span>${["🥇", "🥈", "🥉", "4.", "5."][i]} ${escapeHtml(String(s.name || "?").slice(0, 24))}</span><b>⚡ ${Number(s.xp) || 0} · 🔥 ${Number(s.streak) || 0}</b></div>`).join("")
          : `<p class="muted">${t("comm_be_first")}</p>`;
      }
      /* recent activity: latest study sessions, newest first */
      const act = document.getElementById("comm-activity");
      if (act) {
        const ago = (ts) => {
          const m = Math.max(1, Math.round((Date.now() - ts) / 60000));
          if (m < 60) return m + t("ev_min_ago");
          const h = Math.round(m / 60);
          if (h < 24) return h + t("ev_hr_ago");
          return Math.round(h / 24) + t("ev_day_ago");
        };
        const recent = all
          .filter((x) => Number(x.ts) > 0)
          .sort((a, b) => Number(b.ts) - Number(a.ts))
          .slice(0, 6);
        act.innerHTML = recent.length
          ? recent.map((s) =>
              `<div class="adash-row"><span>📖 ${escapeHtml(String(s.name || "?").slice(0, 24))} ${t("ev_studied")}</span><b class="muted">${ago(Number(s.ts))}</b></div>`).join("")
          : `<p class="muted">${t("comm_be_first")}</p>`;
      }
    }).catch(() => {});
    /* upcoming events (admin-created, stats/events) */
    fetch(base + "/stats/events.json").then((r) => r.json()).then((evs) => {
      const el = document.getElementById("comm-events");
      if (!el) return;
      const now = Date.now();
      const list = Object.values(evs || {})
        .filter((e) => e && e.t && Number(e.ts) > now - 2 * 3600e3)
        .sort((a, b) => Number(a.ts) - Number(b.ts))
        .slice(0, 6);
      const dayLabel = (ts) => {
        const d = new Date(Number(ts));
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const diff = Math.floor((d - today) / 864e5);
        const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        if (diff === 0) return t("ev_today") + " " + time;
        if (diff === 1) return t("ev_tomorrow") + " " + time;
        return d.toLocaleDateString([], { month: "short", day: "numeric" }) + " " + time;
      };
      el.innerHTML = list.length
        ? list.map((e) => `
            <div class="adash-row ev-row">
              <span>📌 <b>${escapeHtml(lang === "my" && e.my ? e.my : e.t)}</b><br><small class="muted">🗓 ${dayLabel(e.ts)}</small></span>
              ${e.link ? `<a class="btn btn-primary btn-sm" href="${escapeHtml(e.link)}">${t("ev_join")}</a>` : ""}
            </div>`).join("")
        : `<p class="muted">${t("ev_none")}</p>`;
    }).catch(() => {});
    window.scrollTo(0, 0);
  }

  /* ---------------- View: Video study call (FaceTime-style) ----------------
     Free group video rooms via the public Jitsi Meet server — no backend,
     no cost, works in mobile browsers. Room names are deterministic per
     academy room but salted so outsiders can't guess them. */
  function callRoomName(roomId) {
    const seed = roomId + "::wda-2026";
    let h = 0;
    for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return "WDA-" + roomId.replace(/[^a-zA-Z0-9-]/g, "") + "-" + h.toString(36).slice(0, 5);
  }
  function renderCall(roomId) {
    roomId = roomId || "community";
    const course = courseById(roomId);
    const label = course ? cf(course, "title") : t("comm_title");

    if (!loggedIn()) {
      location.hash = "#/community";
      if (window.Auth) window.Auth.openModal("login");
      return;
    }
    /* same rule as chat: paying students (any course or all-access) */
    if (!premiumChecked && !(window.Auth && window.Auth.isAdmin && window.Auth.isAdmin())) {
      app.innerHTML = `<div class="container"><div class="empty"><h2>⏳</h2><p class="muted">${t("prem_checking")}</p></div></div>`;
      return;
    }
    if (!window.WDA.isPaying()) {
      app.innerHTML = `
        <div class="container"><div class="empty">
          <h2>📹 ${t("call_title")}</h2>
          <p>${t("call_locked")}</p>
          <a class="btn btn-primary" href="#/premium">⭐ ${t("prem_go")}</a>
          <a class="btn btn-outline" style="margin-left:8px" href="#/community">← ${t("comm_title")}</a>
        </div></div>`;
      return;
    }

    const u = window.Auth.current();
    const room = callRoomName(roomId);
    const name = encodeURIComponent('"' + String(u.name || "Student").replace(/"/g, "") + '"');
    const src = "https://meet.jit.si/" + room + "#userInfo.displayName=" + name;
    app.innerHTML = `
      <div class="call-wrap">
        <div class="call-bar">
          <span>📹 <b>${escapeHtml(label)}</b> · ${t("call_room")}</span>
          <span style="display:flex;gap:8px">
            <a class="btn btn-outline btn-sm" href="${src.replace(/"/g, "&quot;")}" target="_blank" rel="noopener">↗ ${t("call_newtab")}</a>
            <a class="btn btn-outline btn-sm" href="#/community">✕ ${t("call_leave")}</a>
          </span>
        </div>
        <iframe class="call-frame" src="${src.replace(/"/g, "&quot;")}"
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                title="Video call"></iframe>
        <p class="muted call-tip">💡 ${t("call_tip")}</p>
      </div>`;
    /* tell the room's chat so classmates can join */
    if (window.Chat && window.Chat.post) {
      try {
        const invited = sessionStorage.getItem("wda_call_invited::" + roomId);
        if (!invited) {
          sessionStorage.setItem("wda_call_invited::" + roomId, "1");
          window.Chat.setRoom(roomId === "community" ? "community" : roomId, course ? cf(course, "title") : null);
          window.Chat.post(t("call_invite"));
        }
      } catch (e) {}
    }
    window.scrollTo(0, 0);
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

  /* Reviews are CLOUD-shared (stats/reviews/<course>/<uid>) so every
     student sees real ratings — one review per account, editable. */
  function reviewsPanel() {
    return `<div class="panel" id="reviews-panel"><h2>${t("reviews_title")}</h2><p class="muted" id="reviews-wait">⏳</p></div>`;
  }
  function wireReviews(c) {
    const mount = document.getElementById("reviews-panel");
    const base = statsBase();
    if (!mount) return;
    if (!base) { const w = document.getElementById("reviews-wait"); if (w) w.textContent = t("lb_offline"); return; }
    const u = loggedIn() ? window.Auth.current() : null;

    const draw = (data) => {
      if (!document.getElementById("reviews-panel")) return; /* navigated away */
      const list = Object.entries(data || {})
        .map(([uid, r]) => Object.assign({ uid }, r))
        .filter((r) => r && Number(r.r) >= 1)
        .sort((a, b) => (b.ts || 0) - (a.ts || 0));
      const avg = list.length ? list.reduce((a, r) => a + Number(r.r), 0) / list.length : 0;
      const mine = u && data ? data[u.id] : null;
      const items = list.length
        ? list.slice(0, 30).map((r) => `
            <div class="review">
              <span class="chat-avatar">${escapeHtml(String(r.initial || "?").slice(0, 2))}</span>
              <div>
                <div class="review-head"><strong>${escapeHtml(String(r.name || "").slice(0, 40))}</strong> ${stars(Number(r.r) || 0)}</div>
                ${r.text ? `<div class="review-text">${escapeHtml(String(r.text).slice(0, 300))}</div>` : ""}
              </div>
            </div>`).join("")
        : `<p class="muted">${t("reviews_none")}</p>`;
      const form = u
        ? `<form id="review-form" class="review-form">
             <div class="review-stars" id="review-stars" data-val="${mine ? Number(mine.r) || 0 : 0}">
               ${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="rstar" data-star="${n}">★</button>`).join("")}
             </div>
             <textarea name="text" rows="2" maxlength="300" placeholder="${escapeHtml(t("reviews_placeholder"))}">${mine ? escapeHtml(mine.text || "") : ""}</textarea>
             <button class="btn btn-primary btn-sm" type="submit">${t("reviews_submit")}</button>
             <span class="tl-status" id="review-status"></span>
           </form>`
        : `<button class="btn btn-outline btn-sm" id="review-login">${t("reviews_login")}</button>`;
      mount.innerHTML = `
        <h2>${t("reviews_title")}${avg ? ` <span class="muted" style="font-size:15px">— ${avg.toFixed(1)}★ (${list.length} ${t("reviews_word")})</span>` : ""}</h2>
        ${form}
        <div class="review-list">${items}</div>`;

      const box = mount.querySelector("#review-stars");
      if (box) {
        const paint = (v) => box.querySelectorAll(".rstar").forEach((b, i) => b.classList.toggle("on", i < v));
        paint(Number(box.dataset.val || 0));
        box.querySelectorAll(".rstar").forEach((b) =>
          b.addEventListener("click", () => { box.dataset.val = b.dataset.star; paint(Number(b.dataset.star)); }));
      }
      const formEl = mount.querySelector("#review-form");
      if (formEl) formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const rating = Number(mount.querySelector("#review-stars").dataset.val || 0);
        const status = mount.querySelector("#review-status");
        if (!rating) { status.className = "tl-status bad"; status.textContent = "★?"; return; }
        status.className = "tl-status"; status.textContent = "⏳";
        authFetch(base + "/stats/reviews/" + c.id + "/" + encodeURIComponent(u.id) + ".json", {
          method: "PUT",
          body: JSON.stringify({
            r: rating,
            text: String(new FormData(formEl).get("text") || "").slice(0, 300),
            name: String(u.name || "").slice(0, 40) || "Student",
            initial: String(u.name || "S").charAt(0).toUpperCase(),
            ts: Date.now(),
          }),
        }).then((res) => {
          if (!res.ok) throw new Error("write");
          load(); /* redraw with the fresh list */
        }).catch(() => { status.className = "tl-status bad"; status.textContent = t("reviews_err"); });
      });
      const rl = mount.querySelector("#review-login");
      if (rl) rl.addEventListener("click", () => { if (window.Auth) window.Auth.openModal("login"); });
    };

    const load = () =>
      fetch(base + "/stats/reviews/" + c.id + ".json")
        .then((r) => r.json())
        .then(draw)
        .catch(() => { const w = document.getElementById("reviews-wait"); if (w) w.textContent = t("lb_offline"); });
    load();
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
          <button class="btn btn-primary" id="cert-fb" type="button">${t("cert_share_fb")}</button>
          <button class="btn btn-outline" id="cert-chat" type="button">${t("cert_share_chat")}</button>
        </div>
      </div>`;
    const certMeta = totalLessons(c) + " " + t("lessons_word") + " · " + c.hours + " " + t("hours_content");
    const p = app.querySelector("#cert-print");
    if (p) p.addEventListener("click", () => window.print());
    const dl = app.querySelector("#cert-dl");
    if (dl) dl.addEventListener("click", () => {
      const cv = drawCertPng(name, cf(c, "title"), certMeta, dateStr, certId);
      const a = document.createElement("a");
      a.href = cv.toDataURL("image/png");
      a.download = "WebDevAcademy-Certificate-" + c.id + ".png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
    const fb = app.querySelector("#cert-fb");
    if (fb) fb.addEventListener("click", () => {
      const link = location.origin + location.pathname;
      const quote = t("cert_chat_msg").replace("{c}", cf(c, "title")) + " — " + link;
      window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(link) +
        "&quote=" + encodeURIComponent(quote), "_blank", "noopener");
    });
    const sc = app.querySelector("#cert-chat");
    if (sc) sc.addEventListener("click", () => {
      if (!window.Chat || !window.Chat.post) return;
      const cv = drawCertPng(name, cf(c, "title"), certMeta, dateStr, certId);
      /* downscale to a chat-friendly JPEG so the message stays light */
      const small = document.createElement("canvas");
      const ratio = 800 / cv.width;
      small.width = 800; small.height = Math.round(cv.height * ratio);
      small.getContext("2d").drawImage(cv, 0, 0, small.width, small.height);
      window.Chat.post("🎓 " + t("cert_chat_msg").replace("{c}", cf(c, "title")), small.toDataURL("image/jpeg", .82));
      sc.textContent = "✓ " + t("cert_shared");
      window.Chat.open();
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
    authFetch(base + "/payments.json").then((r) => r.json()).then((val) => {
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
              <strong>${escapeHtml(p.name || "?")}</strong> · ${escapeHtml(p.email || "")}
              <span class="lb-lvl" style="margin-left:6px">${p.courseId ? "🎫 " + escapeHtml(p.courseTitle || p.courseId) : "⭐ " + t("prem_all_label")}</span><br>
              <span class="muted" style="font-size:13px">KBZPay: ${escapeHtml(p.phone || "")} · ${t("prem_txn_label")}: ${escapeHtml(p.txn || "")} · ${new Date(p.ts || 0).toLocaleString()}</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              ${p.status === "pending"
                ? `<button class="btn btn-primary btn-sm" data-approve="${escapeHtml(p.key)}" data-email="${escapeHtml(p.email || "")}" data-course="${escapeHtml(p.courseId || "")}">✓ ${t("admin_approve")}</button>
                   <button class="btn btn-outline btn-sm" data-reject="${escapeHtml(p.key)}">✕ ${t("admin_reject")}</button>`
                : `<span class="role-badge" style="background:${p.status === "approved" ? "var(--green)" : "#888"}">${escapeHtml(p.status)}</span>`}
            </div>
          </div>
        </div>`).join("");
      const setStatus = (key, status) =>
        authFetch(base + "/payments/" + encodeURIComponent(key) + "/status.json", { method: "PUT", body: JSON.stringify(status) });
      mount.querySelectorAll("[data-approve]").forEach((b) =>
        b.addEventListener("click", () => {
          const email = b.getAttribute("data-email");
          const cid = b.getAttribute("data-course");
          /* single-course claim → grant just that course; otherwise grant
             all-access. PATCH/child-PUT so grants never wipe each other. */
          const grant = cid
            ? authFetch(base + "/premium/" + emailKey(email) + "/courses/" + cid + ".json", {
                method: "PUT", body: "true",
              })
            : authFetch(base + "/premium/" + emailKey(email) + ".json", {
                method: "PATCH",
                body: JSON.stringify({ since: Date.now(), by: (window.Auth.current() || {}).email || "admin" }),
              });
          grant
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

  /* 🚩 Reports & bans: review what students flagged in the chat.
     Delete the message, ban the author (rules refuse a banned uid's
     writes everywhere), or dismiss the report. */
  function renderAdminReports() {
    const base = statsBase();
    app.innerHTML = `
      <div class="container" style="max-width:860px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h2 class="section-title">🚩 ${t("rep_title")}</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn btn-outline btn-sm" href="#/admin/dashboard">📊 ${t("dash_admin_title")}</a>
            <a class="btn btn-outline btn-sm" href="#/admin/students">👥 ${t("stu_title")}</a>
            <a class="btn btn-outline btn-sm" href="#/admin/insights">📉 ${t("ins_title")}</a>
            <a class="btn btn-outline btn-sm" href="#/admin/payments">💳 ${t("admin_payments")}</a>
          </div>
        </div>
        <div id="rep-list" class="panel"><p class="muted">⏳</p></div>
        <h3 class="section-title" style="font-size:19px">⛔ ${t("rep_banned")}</h3>
        <div id="ban-list" class="panel"><p class="muted">⏳</p></div>
      </div>`;
    if (!base) { document.getElementById("rep-list").innerHTML = `<p class="muted">${t("lb_offline")}</p>`; return; }

    const load = () => {
      authFetch(base + "/reports.json").then((r) => r.json()).then((val) => {
        const list = Object.entries(val || {}).map(([k, v]) => Object.assign({ _k: k }, v)).sort((a, b) => (b.ts || 0) - (a.ts || 0));
        const mount = document.getElementById("rep-list");
        if (!mount) return;
        mount.innerHTML = list.length ? list.map((r) => `
          <div class="rep-row">
            <div class="rep-txt">
              <b>${escapeHtml(r.name || "?")}</b>
              <span class="muted">· ${t("rep_in")} ${escapeHtml(r.room || "?")} · ${t("rep_by")} ${escapeHtml(r.byName || "?")} · ${new Date(r.ts || 0).toLocaleString()}</span>
              <div class="rep-quote">${escapeHtml(r.text || "")}</div>
            </div>
            <div class="tl-row">
              <button class="btn btn-outline btn-sm" data-rep-delmsg="${escapeHtml(r._k)}">🗑 ${t("rep_delmsg")}</button>
              <button class="btn btn-outline btn-sm" data-rep-ban="${escapeHtml(r._k)}">⛔ ${t("rep_ban")}</button>
              <button class="btn btn-ghost btn-sm" data-rep-dismiss="${escapeHtml(r._k)}">✓ ${t("rep_dismiss")}</button>
            </div>
          </div>`).join("") : `<p class="muted" style="margin:0">🎉 ${t("rep_none")}</p>`;
        const byKey = (k) => list.find((x) => x._k === k);
        mount.querySelectorAll("[data-rep-delmsg]").forEach((b) => b.addEventListener("click", () => {
          const r = byKey(b.getAttribute("data-rep-delmsg"));
          if (!r || !r.room || !r.msg) return;
          authFetch(base + "/rooms/" + encodeURIComponent(r.room) + "/messages/" + encodeURIComponent(r.msg) + ".json", { method: "DELETE" })
            .then(() => authFetch(base + "/reports/" + r._k + ".json", { method: "DELETE" }))
            .then(load).catch(() => alert(t("chat_send_err")));
        }));
        mount.querySelectorAll("[data-rep-ban]").forEach((b) => b.addEventListener("click", () => {
          const r = byKey(b.getAttribute("data-rep-ban"));
          if (!r || !r.uid) return;
          authFetch(base + "/banned/" + encodeURIComponent(r.uid) + ".json", {
            method: "PUT",
            body: JSON.stringify({ name: String(r.name || "?").slice(0, 40), by: (window.Auth.current() || {}).id || "admin", ts: Date.now() }),
          }).then(load).catch(() => alert(t("chat_send_err")));
        }));
        mount.querySelectorAll("[data-rep-dismiss]").forEach((b) => b.addEventListener("click", () => {
          authFetch(base + "/reports/" + b.getAttribute("data-rep-dismiss") + ".json", { method: "DELETE" }).then(load).catch(() => {});
        }));
      }).catch(() => { const m = document.getElementById("rep-list"); if (m) m.innerHTML = `<p class="muted">${t("lb_offline")}</p>`; });

      authFetch(base + "/banned.json").then((r) => r.json()).then((val) => {
        const mount = document.getElementById("ban-list");
        if (!mount) return;
        const rows = Object.entries(val || {});
        mount.innerHTML = rows.length ? rows.map(([uid, v]) => `
          <div class="rep-row">
            <div class="rep-txt"><b>${escapeHtml((v && v.name) || "?")}</b> <span class="muted">${new Date((v && v.ts) || 0).toLocaleDateString()}</span></div>
            <button class="btn btn-outline btn-sm" data-unban="${escapeHtml(uid)}">✓ ${t("rep_unban")}</button>
          </div>`).join("") : `<p class="muted" style="margin:0">${t("rep_noban")}</p>`;
        mount.querySelectorAll("[data-unban]").forEach((b) => b.addEventListener("click", () => {
          authFetch(base + "/banned/" + encodeURIComponent(b.getAttribute("data-unban")) + ".json", { method: "DELETE" }).then(load).catch(() => {});
        }));
      }).catch(() => {});
    };
    load();
    window.scrollTo(0, 0);
  }

  /* Admin dashboard: one page of stats pulled from Firebase — students,
     premium members, pending payments, most-popular courses, top learners */
  /* shared canvas helpers (course gallery slides, admin image cards) */
  function rrPath(x2, x, y, w, h, r) {
    x2.beginPath();
    x2.moveTo(x + r, y);
    x2.arcTo(x + w, y, x + w, y + h, r);
    x2.arcTo(x + w, y + h, x, y + h, r);
    x2.arcTo(x, y + h, x, y, r);
    x2.arcTo(x, y, x + w, y, r);
    x2.closePath();
  }
  function wrapCanvas(x2, text, maxW) {
    const words = String(text).split(" ");
    const lines = [];
    let line = "";
    for (const w of words) {
      const tl = line ? line + " " + w : w;
      if (x2.measureText(tl).width > maxW && line) { lines.push(line); line = w; }
      else line = tl;
    }
    if (line) lines.push(line);
    return lines;
  }
  /* 🖼️ auto-generated branded slides for the course-page gallery */
  function drawCourseSlide(c, kind) {
    const W = 800, H = 450;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const x = cv.getContext("2d");
    const FAM = '"Segoe UI", "Myanmar Text", "Padauk", sans-serif';
    if (kind === "map") {
      /* blueprint-style structure diagram: dark navy, glowing boxes,
         one cascading box per course section */
      x.fillStyle = "#0b1322"; x.fillRect(0, 0, W, H);
      const rg = x.createRadialGradient(W / 2, H / 2, 60, W / 2, H / 2, 520);
      rg.addColorStop(0, "rgba(70,140,255,.12)"); rg.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = rg; x.fillRect(0, 0, W, H);
      x.fillStyle = "rgba(120,170,255,.07)";
      for (let gx = 20; gx < W; gx += 40) for (let gy = 20; gy < H; gy += 40) x.fillRect(gx, gy, 2, 2);
      /* keep everything inside y 80..375 — the gallery window center-crops
         the 16:9 canvas, so edges are not safe */
      const cap = (cf(c, "title") || "").toUpperCase();
      x.font = "600 17px " + FAM; x.textAlign = "center";
      const cw = Math.min(W - 80, x.measureText(cap).width + 48);
      x.strokeStyle = "rgba(140,190,255,.45)"; x.lineWidth = 1.5;
      rrPath(x, (W - cw) / 2, 80, cw, 32, 8); x.stroke();
      x.fillStyle = "#bcd6ff"; x.fillText(cap, W / 2, 102);
      const secs = (c.sections || []).slice(0, 4);
      const extra = (c.sections || []).length - secs.length;
      const rowH = 46, gap = 10, startY = 130;
      x.textAlign = "left";
      secs.forEach((s, i) => {
        const ix = 90 + i * 24, iy = startY + i * (rowH + gap), iw = W - 180 - i * 24;
        if (i > 0) { /* glowing elbow connector from the previous box */
          x.strokeStyle = "rgba(110,180,255,.5)"; x.lineWidth = 1.5;
          x.beginPath(); x.moveTo(ix - 12, iy - gap - rowH / 2); x.lineTo(ix - 12, iy + rowH / 2); x.lineTo(ix, iy + rowH / 2); x.stroke();
        }
        x.save();
        x.shadowColor = "rgba(80,160,255,.8)"; x.shadowBlur = 14;
        x.fillStyle = "rgba(22,44,78,.6)"; x.strokeStyle = "rgba(150,200,255,.75)"; x.lineWidth = 1.6;
        rrPath(x, ix, iy, iw, rowH, 10); x.fill(); x.stroke();
        x.restore();
        x.fillStyle = "#e8f2ff"; x.font = "bold 20px " + FAM;
        x.fillText(wrapCanvas(x, (i + 1) + ". " + secName(c, i), iw - 150)[0], ix + 16, iy + 30);
        const nls = (s.lessons || []).length;
        x.fillStyle = "#8fb8e8"; x.font = "14px " + FAM; x.textAlign = "right";
        x.fillText(nls + (lang === "my" ? " ခန်း" : " lessons"), ix + iw - 14, iy + 29);
        x.textAlign = "left";
      });
      if (extra > 0) {
        x.fillStyle = "#7fa8d8"; x.font = "italic 16px " + FAM; x.textAlign = "center";
        x.fillText(lang === "my" ? "+ နောက်ထပ် အပိုင်း " + extra + " ပိုင်း…" : "+ " + extra + " more sections…", W / 2, 372);
      }
      x.fillStyle = "rgba(220,235,255,.55)"; x.font = "22px " + FAM;
      x.fillText("✦", W - 56, 356); x.fillText("✦", 40, 128);
      return cv.toDataURL("image/png");
    }
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#7b2ff7"); g.addColorStop(1, "#c86dd7");
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    const rad = x.createRadialGradient(W * .2, 0, 0, W * .2, 0, W * .8);
    rad.addColorStop(0, "rgba(255,255,255,.2)"); rad.addColorStop(.6, "rgba(255,255,255,0)");
    x.fillStyle = rad; x.fillRect(0, 0, W, H);
    x.fillStyle = "#fff";
    if (kind === "learn") {
      x.textAlign = "left";
      x.font = "bold 36px " + FAM;
      x.fillText(lang === "my" ? "✅ သင်ယူရမည့်အရာများ" : "✅ What you'll learn", 48, 78);
      x.font = "27px " + FAM;
      let y = 142;
      (cf(c, "whatYouLearn") || c.whatYouLearn || []).slice(0, 3).forEach((item) => {
        wrapCanvas(x, "•  " + item, W - 110).slice(0, 2).forEach((ln) => { x.fillText(ln, 52, y); y += 40; });
        y += 14;
      });
    } else {
      x.textAlign = "center";
      x.font = "92px " + FAM;
      x.fillText(c.icon, W / 2, 152);
      x.font = "bold 36px " + FAM;
      wrapCanvas(x, cf(c, "title"), W - 120).slice(0, 2).forEach((ln, i) => x.fillText(ln, W / 2, 230 + i * 46));
      x.font = "27px " + FAM;
      x.fillText("📚 " + totalLessons(c) + (lang === "my" ? " သင်ခန်းစာ" : " lessons") + "   ·   ⏱ " + c.hours + "h", W / 2, 344);
      x.fillText("🌐 EN + မြန်မာ   ·   🎓 Certificate", W / 2, 392);
    }
    return cv.toDataURL("image/png");
  }

  /* tiny dependency-free SVG bar chart for the admin dashboard */
  function chartBars(pairs, h) {
    h = h || 110;
    const w = 560;
    const max = Math.max(1, ...pairs.map((p) => p[1]));
    const bw = w / pairs.length;
    return '<svg viewBox="0 0 ' + w + " " + (h + 22) + '" class="adash-chart" role="img">' +
      pairs.map(([lab, v], i) => {
        const bh = Math.max(v ? 3 : 0, Math.round((v / max) * h));
        return '<rect x="' + (i * bw + 3).toFixed(1) + '" y="' + (h - bh) + '" width="' + (bw - 6).toFixed(1) + '" height="' + bh + '" rx="3" class="bar"/>' +
          (v ? '<text x="' + (i * bw + bw / 2).toFixed(1) + '" y="' + (h - bh - 4) + '" class="val">' + v + "</text>" : "") +
          (i % 2 ? '<text x="' + (i * bw + bw / 2).toFixed(1) + '" y="' + (h + 14) + '" class="lab">' + lab + "</text>" : "");
      }).join("") + "</svg>";
  }

  /* 👥 Students — who is actually learning, and who has gone quiet.
     Built from stats/leaderboard, which every signed-in student already
     writes; no new tracking and no new rules needed. */
  function renderAdminStudents() {
    app.innerHTML = `
      <div class="container" style="max-width:900px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h2 class="section-title">👥 ${t("stu_title")}</h2>
          <a class="btn btn-outline btn-sm" href="#/admin/dashboard">📊 ${t("dash_admin_title")}</a>
        </div>
        <p class="section-sub">${t("stu_sub")}</p>
        <div id="stu-body"><div class="empty"><h2>⏳</h2></div></div>
      </div>`;
    const body = document.getElementById("stu-body");
    const base = statsBase();
    if (!base) { body.innerHTML = `<div class="empty"><h2>👥</h2><p>${t("lb_offline")}</p></div>`; return; }
    fetch(base + "/stats/leaderboard.json").then((r) => r.json()).then((val) => {
      const rows = Object.entries(val || {}).map(([uid, d]) => Object.assign({ uid: uid }, d))
        .sort((a, b) => (b.ts || 0) - (a.ts || 0));
      if (!rows.length) { body.innerHTML = `<div class="empty"><h2>👥</h2><p>${t("stu_none")}</p></div>`; return; }
      const DAY = 86400000;
      const now = Date.now();
      const daysAgo = (ts) => Math.floor((now - (ts || 0)) / DAY);
      const quiet = rows.filter((r) => daysAgo(r.ts) >= 7).length;
      const done = rows.filter((r) => (r.courses || 0) > 0).length;
      const when = (ts) => {
        const d = daysAgo(ts);
        return d <= 0 ? t("stu_today") : d === 1 ? t("stu_yesterday") : t("stu_days").replace("{n}", d);
      };
      body.innerHTML = `
        <div class="stu-cards">
          <div class="panel stu-stat"><b>${rows.length}</b><span>${t("stu_total")}</span></div>
          <div class="panel stu-stat ${done === 0 ? "bad" : ""}"><b>${done} / ${rows.length}</b><span>${t("stu_finished")}</span></div>
          <div class="panel stu-stat ${quiet ? "warn" : ""}"><b>${quiet}</b><span>${t("stu_quiet")}</span></div>
        </div>
        ${done === 0 ? `<div class="ins-cliff">⚠️ ${t("stu_nobody")}</div>` : ""}
        <div class="panel" style="padding:6px 0;overflow-x:auto">
          <table class="stu-table">
            <thead><tr>
              <th>${t("stu_name")}</th><th>${t("stu_lessons")}</th><th>XP</th>
              <th>${t("stu_courses")}</th><th>🔥</th><th>${t("stu_last")}</th>
            </tr></thead>
            <tbody>
              ${rows.map((r) => `<tr class="${daysAgo(r.ts) >= 7 ? "quiet" : ""}">
                <td><b>${escapeHtml(String(r.name || "?"))}</b></td>
                <td>${r.lessons || 0}</td>
                <td>${r.xp || 0}</td>
                <td>${r.courses || 0}</td>
                <td>${r.streak || 0}</td>
                <td>${when(r.ts)}${daysAgo(r.ts) >= 7 ? " ⚠️" : ""}</td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>`;
    }).catch(() => { body.innerHTML = `<div class="empty"><h2>👥</h2><p>${t("stu_none")}</p></div>`; });
    window.scrollTo(0, 0);
  }

  /* 📉 Insights — where do students actually stop?
     Reads the anonymous stats/funnel counters and turns them into a
     drop-off view per course. This is the question the app could never
     answer before: completion was only ever stored on the device. */
  function renderAdminInsights() {
    app.innerHTML = `
      <div class="container" style="max-width:900px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h2 class="section-title">📉 ${t("ins_title")}</h2>
          <a class="btn btn-outline btn-sm" href="#/admin/dashboard">📊 ${t("dash_admin_title")}</a>
        </div>
        <p class="section-sub">${t("ins_sub")}</p>
        <div id="ins-body"><div class="empty"><h2>⏳</h2></div></div>
      </div>`;
    const body = document.getElementById("ins-body");
    const base = statsBase();
    if (!base) { body.innerHTML = `<div class="empty"><h2>📉</h2><p>${t("lb_offline")}</p></div>`; return; }
    fetch(base + "/stats/funnel.json").then((r) => r.json()).then((all) => {
      all = all || {};
      const rows = COURSES.map((c) => {
        const counts = all[c.id] || {};
        const flat = lessonsOf(c);
        const steps = flat.map((x) => ({ id: x.lesson.id, title: lf(x.lesson, "title") || x.lesson.title, n: Number(counts[x.lesson.id]) || 0 }));
        const started = steps.length ? steps[0].n : 0;
        const finished = steps.length ? steps[steps.length - 1].n : 0;
        return { c, steps, started, finished, total: steps.reduce((a, s) => a + s.n, 0) };
      }).filter((r) => r.total > 0).sort((a, b) => b.started - a.started);

      if (!rows.length) {
        body.innerHTML = `<div class="panel"><h3 style="margin-top:0">${t("ins_none")}</h3><p class="muted">${t("ins_none_sub")}</p></div>`;
        return;
      }
      body.innerHTML = rows.map((r) => {
        const max = Math.max(1, r.started);
        /* biggest single drop between consecutive lessons = the cliff */
        let cliff = null;
        for (let i = 1; i < r.steps.length; i++) {
          const lost = r.steps[i - 1].n - r.steps[i].n;
          if (lost > 0 && (!cliff || lost > cliff.lost)) cliff = { lost: lost, at: r.steps[i], prev: r.steps[i - 1] };
        }
        const pct = r.started ? Math.round((r.finished / r.started) * 100) : 0;
        return `<div class="panel ins-course">
          <div class="ins-head">
            <span class="ins-ic">${r.c.icon || "📘"}</span>
            <div><b>${cf(r.c, "title")}</b>
              <div class="muted" style="font-size:12px">${r.started} ${t("ins_started")} · ${r.finished} ${t("ins_finished")} · <b>${pct}%</b> ${t("ins_completion")}</div>
            </div>
          </div>
          ${cliff ? `<div class="ins-cliff">⚠️ ${t("ins_cliff")} <b>${cliff.at.title}</b> — ${t("ins_lost").replace("{n}", cliff.lost)}</div>` : ""}
          <div class="ins-bars">
            ${r.steps.map((s) => `<div class="ins-row" title="${s.title}">
              <span class="ins-lbl">${s.title}</span>
              <span class="ins-bar"><i style="width:${Math.round((s.n / max) * 100)}%"></i></span>
              <span class="ins-n">${s.n}</span>
            </div>`).join("")}
          </div>
        </div>`;
      }).join("");
    }).catch(() => { body.innerHTML = `<div class="empty"><h2>📉</h2><p>${t("ins_none_sub")}</p></div>`; });
    window.scrollTo(0, 0);
  }

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
      authFetch(base + "/payments.json").then((r) => r.json()).catch(() => ({})),
      authFetch(base + "/premium.json").then((r) => r.json()).catch(() => ({})),
      fetch(base + "/stats/announcement.json").then((r) => r.json()).catch(() => null),
      authFetch(base + "/stats/promo.json").then((r) => r.json()).catch(() => null),
    ]).then(([lb, courses, payments, premium, announce, promos]) => {
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

      /* 📈 activity: course views per day (14d, all courses combined) +
         active-student counts from leaderboard heartbeat timestamps */
      const days = [];
      for (let i = 13; i >= 0; i--) days.push(dateKey(i));
      const perDay = days.map((d) => {
        let n = 0;
        Object.values(courses || {}).forEach((cd) => { n += Number(cd && cd[d]) || 0; });
        return [d.slice(5).replace("-", "/"), n];
      });
      const activeToday = students.filter((x) => (Number(x.ts) || 0) >= new Date(dateKey(0) + "T00:00:00").getTime()).length;
      const active7 = students.filter((x) => (Number(x.ts) || 0) >= Date.now() - 7 * 864e5).length;

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
          <h3>📈 ${t("dash_trend")}</h3>
          <div class="tl-row" style="margin:0 0 4px">
            <span class="lb-lvl">🟢 ${t("dash_active_today")}: <b>${activeToday}</b></span>
            <span class="lb-lvl">📅 ${t("dash_active7")}: <b>${active7}</b></span>
            <span class="lb-lvl">👁 ${t("dash_views14")}: <b>${perDay.reduce((a, p) => a + p[1], 0)}</b></span>
          </div>
          ${chartBars(perDay)}
        </div>
        <div class="panel">
          <h3>🔔 ${t("push_title")}</h3>
          <p class="muted" style="margin:0 0 8px;font-size:13px">${t("push_help")}</p>
          <div class="tl-row">
            <input class="tl-in" id="push-vapid" placeholder="VAPID key (Web Push certificate) — save once" style="flex:1;min-width:180px">
            <button class="btn btn-outline btn-sm" id="push-savevapid">💾</button>
          </div>
          <div class="tl-row">
            <input class="tl-in" id="push-t" placeholder="Title" maxlength="80" style="flex:1;min-width:120px">
            <input class="tl-in" id="push-b" placeholder="Message" maxlength="200" style="flex:2;min-width:180px">
            <button class="btn btn-primary btn-sm" id="push-send">🔔 ${t("push_send")}</button>
            <span class="muted" id="push-status" style="font-size:13px"></span>
          </div>
        </div>
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
        <div class="panel">
          <h3>🎟️ ${t("promo_title")}</h3>
          <p class="muted" style="margin:0 0 8px;font-size:13px">${t("promo_help")}</p>
          <div class="tl-row">
            <input class="tl-in" id="pc-code" placeholder="LAUNCH20" style="flex:1;min-width:120px;text-transform:uppercase" maxlength="24">
            <input class="tl-in" id="pc-days" type="number" value="30" min="1" style="width:76px" title="${t("promo_days")}"> ${t("promo_days")}
            <input class="tl-in" id="pc-max" type="number" value="20" min="1" style="width:76px" title="${t("promo_uses")}"> ${t("promo_uses")}
            <button class="btn btn-primary btn-sm" id="pc-create">${t("promo_create")}</button>
            <span class="muted" id="pc-status" style="font-size:13px"></span>
          </div>
          <div class="adash-list" id="pc-list">
            ${Object.entries(promos || {}).map(([code, v]) => v ? `
              <div class="adash-row">
                <span><b>${escapeHtml(code)}</b> · ${Number(v.days) || 0} ${t("promo_days")}</span>
                <b>${Number(v.used) || 0}/${Number(v.max) || 0} ${t("promo_uses")}
                  <button class="btn btn-outline btn-sm" data-pc-del="${escapeHtml(code)}" style="margin-left:8px">🗑</button></b>
              </div>` : "").join("") || `<p class="muted">${t("dash_none")}</p>`}
          </div>
        </div>
        <div class="panel">
          <h3>📅 ${t("ev_title")}</h3>
          <p class="muted" style="margin:0 0 8px;font-size:13px">${t("ev_help")}</p>
          <div class="tl-row">
            <input class="tl-in" id="ev-t" placeholder="Live Q&amp;A with Sayar" style="flex:1;min-width:150px" maxlength="80">
            <input class="tl-in" id="ev-my" placeholder="မြန်မာခေါင်းစဉ် (optional)" style="flex:1;min-width:150px" maxlength="120">
            <input class="tl-in" id="ev-ts" type="datetime-local" style="width:190px">
            <input class="tl-in" id="ev-link" placeholder="#/call/community" style="width:160px" maxlength="200">
            <button class="btn btn-primary btn-sm" id="ev-create">${t("ev_create")}</button>
            <span class="muted" id="ev-status" style="font-size:13px"></span>
          </div>
          <div class="adash-list" id="ev-list"><p class="muted">⏳</p></div>
        </div>
        <div class="panel">
          <h3 style="display:flex;justify-content:space-between;align-items:center;gap:8px">📣 ${t("cc_title")}
            <a class="btn btn-primary btn-sm" href="#/admin/content">🚀 ${t("cc_title")} 2.0 →</a></h3>
          <p class="muted" style="margin:0 0 8px;font-size:13px">${t("cc_help")}</p>
          <div class="tl-row">
            <select class="tl-in" id="cc-course" style="flex:1;min-width:180px">
              <option value="">🎉 ${t("cc_general")}</option>
              ${COURSES.map((c) => `<option value="${c.id}">${c.icon} ${escapeHtml(c.title)}</option>`).join("")}
            </select>
            <button class="btn btn-primary btn-sm" id="cc-gen">${t("cc_generate")}</button>
            <button class="btn btn-outline btn-sm" id="cc-ai">✨ ${t("cc_ai")}</button>
            <button class="btn btn-outline btn-sm" id="cc-copy">📋 ${t("tl_copy")}</button>
            <span class="muted" id="cc-status" style="font-size:13px"></span>
          </div>
          <textarea id="cc-out" rows="10" style="width:100%;margin-top:8px;padding:12px;border:1px solid var(--line);border-radius:10px;font-family:inherit;font-size:13.5px;line-height:1.7" placeholder="${t("cc_ph")}"></textarea>
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
        authFetch(base + "/stats/announcement.json", { method: "PUT", body: JSON.stringify(body) })
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

      /* 🔔 push: save VAPID + send via the worker's /push route */
      fetch(base + "/stats/pushConfig.json").then((r) => r.json()).then((pc) => {
        const el = document.getElementById("push-vapid");
        if (el && pc && pc.vapid) el.value = pc.vapid;
      }).catch(() => {});
      const pushStatus = document.getElementById("push-status");
      const pv = document.getElementById("push-savevapid");
      if (pv) pv.addEventListener("click", () => {
        const v = (document.getElementById("push-vapid").value || "").trim();
        if (!v) return;
        authFetch(base + "/stats/pushConfig.json", { method: "PUT", body: JSON.stringify({ vapid: v.slice(0, 200) }) })
          .then((r) => { pushStatus.textContent = r.ok ? "✓" : t("promo_err"); })
          .catch(() => { pushStatus.textContent = t("promo_err"); });
      });
      const ps = document.getElementById("push-send");
      if (ps) ps.addEventListener("click", () => {
        const title = (document.getElementById("push-t").value || "").trim();
        const bodyTxt = (document.getElementById("push-b").value || "").trim();
        if (!title || !bodyTxt) { pushStatus.textContent = "?"; return; }
        let secret = localStorage.getItem("wda_push_secret") || "";
        if (!secret) {
          secret = prompt(t("push_secret_ask")) || "";
          if (!secret) return;
          localStorage.setItem("wda_push_secret", secret);
        }
        pushStatus.textContent = "⏳";
        const proxy = (window.AI && window.AI.proxyUrl && window.AI.proxyUrl()) || "https://curly-wildflower-d23b.mmtboy90.workers.dev/";
        fetch(proxy.replace(/\/$/, "") + "/push", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Push-Secret": secret },
          body: JSON.stringify({ title, body: bodyTxt, url: "https://myominthet99.github.io/webdev-academy/" }),
        }).then((r) => r.json()).then((res) => {
          if (res && typeof res.sent === "number") pushStatus.textContent = "✓ " + res.sent + "/" + res.total;
          else { if (res && res.error) localStorage.removeItem("wda_push_secret"); pushStatus.textContent = "⚠ " + ((res.error && res.error.message) || "?"); }
        }).catch(() => { pushStatus.textContent = "⚠"; });
      });

      /* 📣 FB content creator: template post per course (MM+EN), AI polish */
      const ccOut = document.getElementById("cc-out");
      const ccStatus = document.getElementById("cc-status");
      const SITE = "https://myominthet99.github.io/webdev-academy/";
      const fbPostFor = (course) => {
        if (!course) {
          return "🎓 မြန်မာလူငယ်တွေအတွက် အခမဲ့ Web Development သင်တန်း — WebDev Academy!\n\n" +
            "✅ သင်တန်း " + COURSES.length + " ခု · သင်ခန်းစာ " + COURSES.reduce((a, c) => a + totalLessons(c), 0) + " ခု\n" +
            "✅ English + မြန်မာ နှစ်ဘာသာ\n" +
            "✅ AI Tutor 🤖 · Certificate 🎓 · Community chat 💬\n" +
            "✅ ဖုန်းထဲမှာတင် code ရေးလို့ရ — app install လည်းရ 📲\n\n" +
            "စာရင်းသွင်းစရာမလိုဘဲ ချက်ချင်းစသင်လို့ရ 👇\n👉 " + SITE + "\n\n" +
            "Share ပေးကြပါဦးနော် 🙏\n#WebDevAcademy #LearnToCode #Myanmar #FreeCourse";
        }
        const mm = (I18N.content && I18N.content.courses && I18N.content.courses[course.id]) || {};
        const learns = (mm.whatYouLearn || course.whatYouLearn || []).slice(0, 3);
        const freeTxt = isFree(course)
          ? "💯 လုံးဝ အခမဲ့ — စာရင်းသွင်းစရာမလို!"
          : "🎫 ဒီသင်တန်းတစ်ခုတည်း " + fmt(PAYMENT_CONFIG.coursePrice) + " Ks (သို့) အားလုံးရ Premium " + fmt(PAYMENT_CONFIG.price) + " Ks";
        return "🔥 သင်တန်းအသစ် — " + (mm.title || course.title) + "\n" +
          (mm.subtitle || course.subtitle) + "\n\n" +
          learns.map((x) => "✅ " + x).join("\n") +
          "\n\n📚 သင်ခန်းစာ " + totalLessons(course) + " ခု · 🌐 EN + မြန်မာ · 🎓 Certificate ပါ\n" +
          freeTxt + "\n\n👉 " + SITE + "#/course/" + course.id + "\n\n" +
          "#WebDevAcademy #LearnToCode #Myanmar #" + String(course.category).replace(/\s+/g, "");
      };
      const ccGen = document.getElementById("cc-gen");
      if (ccGen) ccGen.addEventListener("click", () => {
        const c = courseById(document.getElementById("cc-course").value);
        ccOut.value = fbPostFor(c || null);
        ccStatus.textContent = "";
      });
      const ccCopy = document.getElementById("cc-copy");
      if (ccCopy) ccCopy.addEventListener("click", () => {
        if (!ccOut.value) return;
        const done = () => { ccStatus.textContent = "✓ " + t("copied"); setTimeout(() => { ccStatus.textContent = ""; }, 1500); };
        if (navigator.clipboard) navigator.clipboard.writeText(ccOut.value).then(done).catch(() => fallbackCopy(ccOut.value, done));
        else fallbackCopy(ccOut.value, done);
      });
      const ccAi = document.getElementById("cc-ai");
      if (ccAi) ccAi.addEventListener("click", () => {
        if (!ccOut.value) { ccStatus.textContent = t("cc_gen_first"); return; }
        if (!(window.AI && window.AI.ready())) { ccStatus.textContent = t("chat_ai_nokey"); return; }
        ccStatus.textContent = "✨ …";
        window.AI.complete(
          "You write viral Burmese Facebook posts for a Myanmar coding school. " +
          "Rewrite the following post to be more engaging and shareable: keep it in Burmese, keep ALL links and hashtags exactly, " +
          "keep it under 120 words, use emojis naturally, end with a question that invites comments. Reply with ONLY the post text.\n\n" +
          ccOut.value
        ).then((res) => {
          ccOut.value = String(res || "").trim() || ccOut.value;
          ccStatus.textContent = "✨ ✓";
        }).catch((e) => { ccStatus.textContent = "⚠ " + ((e && e.message) || "AI"); });
      });

      /* 🎟️ promo codes: create + delete */
      const pcStatus = document.getElementById("pc-status");
      const pcCreate = document.getElementById("pc-create");
      if (pcCreate) pcCreate.addEventListener("click", () => {
        const code = (document.getElementById("pc-code").value || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
        const days = Math.max(1, Number(document.getElementById("pc-days").value) || 30);
        const max = Math.max(1, Number(document.getElementById("pc-max").value) || 20);
        if (!code) { pcStatus.textContent = "?"; return; }
        authFetch(base + "/stats/promo/" + code + ".json", {
          method: "PUT",
          body: JSON.stringify({ days, max, used: 0, ts: Date.now() }),
        }).then((r) => {
          if (!r.ok) throw new Error("write");
          pcStatus.textContent = "✓ " + t("promo_created");
          renderAdminDashboard();
        }).catch(() => { pcStatus.textContent = t("promo_err"); });
      });
      const pcList = document.getElementById("pc-list");
      if (pcList) pcList.addEventListener("click", (e) => {
        const b = e.target.closest("[data-pc-del]");
        if (!b) return;
        authFetch(base + "/stats/promo/" + b.getAttribute("data-pc-del") + ".json", { method: "DELETE" })
          .then(() => renderAdminDashboard())
          .catch(() => {});
      });

      /* 📅 community events: list + create + delete */
      const evList = document.getElementById("ev-list");
      const evStatus = document.getElementById("ev-status");
      const loadEvents = () => fetch(base + "/stats/events.json").then((r) => r.json()).then((evs) => {
        if (!evList) return;
        const rows = Object.entries(evs || {}).filter(([, v]) => v && v.t)
          .sort((a, b) => Number(a[1].ts) - Number(b[1].ts));
        evList.innerHTML = rows.length
          ? rows.map(([k, v]) => `
              <div class="adash-row">
                <span>📌 <b>${escapeHtml(v.t)}</b> · ${new Date(Number(v.ts)).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}${Number(v.ts) < Date.now() ? " ⏳" : ""}</span>
                <b><button class="btn btn-outline btn-sm" data-ev-del="${escapeHtml(k)}">🗑</button></b>
              </div>`).join("")
          : `<p class="muted">${t("dash_none")}</p>`;
      }).catch(() => {});
      loadEvents();
      const evCreate = document.getElementById("ev-create");
      if (evCreate) evCreate.addEventListener("click", () => {
        const tt = (document.getElementById("ev-t").value || "").trim();
        const my = (document.getElementById("ev-my").value || "").trim();
        const when = Date.parse(document.getElementById("ev-ts").value || "");
        const link = (document.getElementById("ev-link").value || "").trim();
        if (!tt || !when) { evStatus.textContent = "?"; return; }
        const body = { t: tt, ts: when, created: Date.now() };
        if (my) body.my = my;
        if (link) body.link = link;
        authFetch(base + "/stats/events.json", { method: "POST", body: JSON.stringify(body) })
          .then((r) => { if (!r.ok) throw new Error("write"); evStatus.textContent = "✓"; loadEvents(); })
          .catch(() => { evStatus.textContent = t("ev_err"); });
      });
      if (evList) evList.addEventListener("click", (e) => {
        const b = e.target.closest("[data-ev-del]");
        if (!b) return;
        authFetch(base + "/stats/events/" + b.getAttribute("data-ev-del") + ".json", { method: "DELETE" })
          .then(() => loadEvents()).catch(() => {});
      });
    }).catch(() => { mount.innerHTML = `<div class="empty"><h2>${t("lb_offline")}</h2></div>`; });
    window.scrollTo(0, 0);
  }

  /* ---------------- Admin: Content creator v2 ----------------
     Marketing text factory: 7 post types × MM/EN/both × FB/Telegram,
     with one-click copy and AI polish. */
  function renderContentCreator() {
    const SITE = "https://myominthet99.github.io/webdev-academy/";
    let studentCount = null; /* real count from the leaderboard, when it arrives */

    const TYPES = [
      { id: "codetip", ic: "💡", label: "Code tip (shareable — from How-To)" },
      { id: "quizday", ic: "🧠", label: "Quiz of the day (engagement)" },
      { id: "course", ic: "🎓", label: "Course promo" },
      { id: "general", ic: "🏫", label: "Academy promo" },
      { id: "promo", ic: "🎁", label: "Promo code" },
      { id: "milestone", ic: "📊", label: "Milestone brag" },
      { id: "tip", ic: "💡", label: "Daily tip / quote" },
      { id: "challenge", ic: "🎯", label: "Challenge teaser" },
      { id: "ask", ic: "🙏", label: "Review / testimonial ask" },
      { id: "week", ic: "📅", label: "Weekly calendar (7 posts at once)" },
      { id: "tiktok", ic: "🎬", label: "TikTok / Reels script (AI)" },
      { id: "lesson", ic: "📚", label: "Course lesson (AI writes it)" },
      { id: "flowchart", ic: "🔀", label: "Flow chart diagram (AI)" },
      { id: "cheatsheet", ic: "📜", label: "Cheat sheet (AI)" },
    ];
    const AI_KINDS = ["lesson", "flowchart", "cheatsheet", "tiktok"];

    app.innerHTML = `
      <div class="container" style="max-width:760px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <h2 class="section-title">📣 ${t("cc_title")} 2.0</h2>
          <a class="btn btn-outline btn-sm" href="#/admin/dashboard">📊 ${t("dash_admin_title")}</a>
        </div>
        <p class="section-sub" style="margin-top:-6px">💡 Lead with teaching content (Code tip / Quiz) — value people share, with a soft link back. Ads convert worse than useful posts.</p>
        <div class="panel">
          <div class="tl-row">
            <select class="tl-in" id="cc2-type" style="flex:1;min-width:170px">
              ${TYPES.map((x) => `<option value="${x.id}">${x.ic} ${x.label}</option>`).join("")}
            </select>
            <select class="tl-in" id="cc2-lang" style="width:130px">
              <option value="mm">🇲🇲 မြန်မာ</option>
              <option value="en">🇬🇧 English</option>
              <option value="both">🌐 Both</option>
            </select>
            <select class="tl-in" id="cc2-platform" style="width:130px">
              <option value="fb">📘 Facebook</option>
              <option value="tg">✈️ Telegram</option>
            </select>
          </div>
          <div class="tl-row" id="cc2-course-row">
            <select class="tl-in" id="cc2-course" style="flex:1">
              ${COURSES.map((c) => `<option value="${c.id}">${c.icon} ${escapeHtml(c.title)}</option>`).join("")}
            </select>
          </div>
          <div class="tl-row" id="cc2-promo-row" hidden>
            <input class="tl-in" id="cc2-code" placeholder="LAUNCH20" style="flex:1;min-width:110px;text-transform:uppercase" maxlength="24">
            <input class="tl-in" id="cc2-days" type="number" value="30" min="1" style="width:76px"> ${t("promo_days")}
            <input class="tl-in" id="cc2-uses" type="number" value="20" min="1" style="width:76px"> ${t("promo_uses")}
          </div>
          <div class="tl-row" id="cc2-lesson-row" hidden>
            <input class="tl-in" id="cc2-lesson-title" placeholder="Lesson title, e.g. CSS Grid in 15 Minutes" style="flex:2;min-width:200px" maxlength="80">
            <a class="btn btn-outline btn-sm" href="#/admin" title="Open the course editor to paste the result">✏️ ${t("admin_title")}</a>
          </div>
          <div class="tl-row">
            <button class="btn btn-primary" id="cc2-gen">⚡ ${t("cc_generate")}</button>
            <button class="btn btn-outline" id="cc2-ai">✨ ${t("cc_ai")}</button>
            <button class="btn btn-outline" id="cc2-copy">📋 ${t("tl_copy")}</button>
            <span class="muted" id="cc2-status" style="font-size:13px"></span>
          </div>
          <textarea id="cc2-out" rows="13" style="width:100%;margin-top:8px;padding:12px;border:1px solid var(--line);border-radius:10px;font-family:inherit;font-size:13.5px;line-height:1.75" placeholder="${t("cc_ph")}"></textarea>
        </div>

        <div class="panel">
          <h3>🖼️ Image card <span class="muted" style="font-size:12px;font-weight:400">— 1080×1080 branded PNG for Facebook/TikTok (image posts reach far more people)</span></h3>
          <div class="tl-row">
            <select class="tl-in" id="img-kind" style="min-width:170px">
              <option value="codetip">💡 Code tip card</option>
              <option value="quiz">🧠 Quiz card</option>
              <option value="quote">💬 Quote of the day</option>
              <option value="course">🎓 Selected course</option>
              <option value="custom">✍️ Custom text</option>
            </select>
            <input class="tl-in" id="img-custom" placeholder="Custom text…" maxlength="120" style="flex:1;min-width:160px">
            <button class="btn btn-primary btn-sm" id="img-gen">🖼️ ${t("cc_generate")}</button>
            <a class="btn btn-outline btn-sm" id="img-dl" hidden download="webdev-academy-card.png">⬇ PNG</a>
          </div>
          <img id="img-prev" class="cc-imgprev" hidden alt="card preview">
        </div>

        <div class="panel">
          <h3>🎨 ${t("aimg_title")} <span class="muted" style="font-size:12px;font-weight:400">— ${t("aimg_sub")}</span></h3>
          <div class="tl-row">
            <input class="tl-in" id="aimg-p" placeholder="${escapeHtml(t("aimg_ph"))}" maxlength="200" style="flex:1;min-width:200px">
            <button class="btn btn-primary btn-sm" id="aimg-gen">🎨 ${t("cc_generate")}</button>
            <a class="btn btn-outline btn-sm" id="aimg-dl" hidden target="_blank" rel="noopener">⬇ ${t("tl_copy") === "Copy" ? "Save" : "သိမ်း"}</a>
          </div>
          <div class="chips" style="margin-top:8px">
            ${["a friendly cartoon laptop learning to code",
               "a Myanmar teenager coding on a phone, flat illustration",
               "colorful HTML CSS JavaScript logos, minimal",
               "a rocket launching, coding success, vibrant"].map((p) =>
              `<button type="button" class="chip" data-aimg="${escapeHtml(p)}">${escapeHtml(p.split(",")[0])}</button>`).join("")}
          </div>
          <div id="aimg-status" class="muted" style="font-size:13px;margin-top:6px"></div>
          <img id="aimg-prev" class="cc-imgprev" hidden alt="AI image">
        </div>
      </div>`;

    const $ = (s) => document.getElementById(s);
    const nLessons = COURSES.reduce((a, c) => a + totalLessons(c), 0);

    /* teaching-content sources: real How-To recipes + the quiz bank, so posts
       teach something people want to share (not just "join my course" ads) */
    const quizBank = [];
    COURSES.forEach((c) => c.sections.forEach((s) => s.lessons.forEach((l) => {
      if (l.type === "quiz" && Array.isArray(l.questions))
        l.questions.forEach((q) => { if (q && q.q && (q.options || []).length >= 2) quizBank.push(q); });
    })));
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const pickHowto = () => (typeof HOWTOS !== "undefined" && HOWTOS.length ? rand(HOWTOS) : null);
    const pickQuiz = () => (quizBank.length ? rand(quizBank) : null);
    let teachTip = pickHowto();
    let teachQuiz = pickQuiz();
    const decodeEnt = (s) => String(s == null ? "" : s).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

    const buildPost = () => {
      const type = $("cc2-type").value;
      const langSel = $("cc2-lang").value;
      const platform = $("cc2-platform").value;
      const c = courseById($("cc2-course").value) || COURSES[0];
      const mmc = (I18N.content && I18N.content.courses && I18N.content.courses[c.id]) || {};
      const learns = (mmc.whatYouLearn || c.whatYouLearn || []).slice(0, 3);
      const learnsEn = (c.whatYouLearn || []).slice(0, 3);
      const students = studentCount ? studentCount + "+" : "များစွာသော";
      const code = ($("cc2-code").value || "LAUNCH20").toUpperCase();
      const days = Number($("cc2-days").value) || 30;
      const uses = Number($("cc2-uses").value) || 20;
      const quote = motivPick(todayKey());
      const dq = dailyQuestion();
      const courseLink = SITE + "#/course/" + c.id;
      const priceMm = isFree(c)
        ? "💯 လုံးဝ အခမဲ့!"
        : "🎫 ဒီသင်တန်းတစ်ခုတည်း " + fmt(PAYMENT_CONFIG.coursePrice) + " Ks · အားလုံးရ Premium " + fmt(PAYMENT_CONFIG.price) + " Ks";
      const priceEn = isFree(c)
        ? "💯 Completely FREE!"
        : "🎫 This course alone: " + fmt(PAYMENT_CONFIG.coursePrice) + " Ks · All-access: " + fmt(PAYMENT_CONFIG.price) + " Ks";

      const T = {
        course: {
          mm: "🔥 သင်တန်းအသစ် — " + (mmc.title || c.title) + "\n" + (mmc.subtitle || c.subtitle) + "\n\n" +
            learns.map((x) => "✅ " + x).join("\n") +
            "\n\n📚 သင်ခန်းစာ " + totalLessons(c) + " ခု · 🌐 EN + မြန်မာ · 🎓 Certificate ပါ\n" + priceMm +
            "\n\n👉 " + courseLink + "\n\n#WebDevAcademy #LearnToCode #Myanmar",
          en: "🔥 New course: " + c.title + "\n" + c.subtitle + "\n\n" +
            learnsEn.map((x) => "✅ " + x).join("\n") +
            "\n\n📚 " + totalLessons(c) + " lessons · 🌐 EN + Myanmar · 🎓 Certificate included\n" + priceEn +
            "\n\n👉 " + courseLink + "\n\n#WebDevAcademy #LearnToCode #Myanmar",
        },
        general: {
          mm: "🎓 မြန်မာလူငယ်တွေအတွက် Web Development သင်တန်း — WebDev Academy!\n\n" +
            "✅ သင်တန်း " + COURSES.length + " ခု · သင်ခန်းစာ " + nLessons + " ခု\n" +
            "✅ English + မြန်မာ နှစ်ဘာသာ\n✅ AI Tutor 🤖 · Certificate 🎓 · Community 💬 · ဗီဒီယို study call 📹\n" +
            "✅ ဖုန်းထဲမှာတင် code ရေးလို့ရ — app install လည်းရ 📲\n\n" +
            "စာရင်းသွင်းစရာမလိုဘဲ ချက်ချင်းစသင်လို့ရ 👇\n👉 " + SITE + "\n\nShare ပေးကြပါဦးနော် 🙏\n#WebDevAcademy #LearnToCode #Myanmar #FreeCourse",
          en: "🎓 WebDev Academy — the bilingual coding school built for Myanmar youth!\n\n" +
            "✅ " + COURSES.length + " courses · " + nLessons + " lessons\n✅ English + မြန်မာ\n" +
            "✅ AI tutor 🤖 · certificates 🎓 · community chat 💬 · video study calls 📹\n" +
            "✅ Learn and CODE entirely on your phone 📲\n\nStart free, no signup 👇\n👉 " + SITE + "\n\n#WebDevAcademy #LearnToCode #Myanmar",
        },
        promo: {
          mm: "🎁 PROMO CODE: " + code + "\n\nPremium ကို " + days + " ရက် အခမဲ့သုံးလို့ရမယ့် ကုဒ်! ပထမဆုံး " + uses + " ယောက်အတွက်ပဲနော် 🏃💨\n\n" +
            "အသုံးပြုနည်း-\n1️⃣ " + SITE + " မှာ အကောင့်ဝင်ပါ\n2️⃣ ⭐ Premium စာမျက်နှာ → 🎟️ \"Promo ကုဒ် ရှိပါသလား?\"\n3️⃣ " + code + " ရိုက်ထည့်ပြီး လဲလှယ်ပါ — ပြီးပြီ! 🎉\n\n" +
            "👉 " + SITE + "#/premium\n\n#WebDevAcademy #FreePremium #Myanmar",
          en: "🎁 PROMO CODE: " + code + "\n\n" + days + " days of FREE Premium — first " + uses + " students only! 🏃💨\n\n" +
            "How: log in at " + SITE + " → ⭐ Premium page → 🎟️ redeem " + code + " → done! 🎉\n\n👉 " + SITE + "#/premium\n\n#WebDevAcademy #FreePremium",
        },
        milestone: {
          mm: "🎉 WebDev Academy မှာ အခုဆို —\n\n📚 သင်တန်း " + COURSES.length + " ခု\n📖 သင်ခန်းစာ " + nLessons + " ခု\n👩‍💻 ကျောင်းသား " + students + " ယောက် အတူသင်ယူနေပြီ!\n\n" +
            "သင်ရော ပါပြီလား? Leaderboard 🏆 မှာ သင့်နာမည် မြင်ချင်ပြီ 😎\n👉 " + SITE + "\n\n#WebDevAcademy #Milestone #Myanmar",
          en: "🎉 WebDev Academy today —\n\n📚 " + COURSES.length + " courses\n📖 " + nLessons + " lessons\n👩‍💻 " + (studentCount ? studentCount + "+" : "a growing crowd of") + " students learning together!\n\n" +
            "Are you on the leaderboard yet? 🏆\n👉 " + SITE + "\n\n#WebDevAcademy #Milestone",
        },
        tip: {
          mm: "💡 ဒီနေ့ အားဆေး —\n\n“" + quote.my + "”\n\nဒီနေ့ သင်ခန်းစာတစ်ခု ပြီးအောင်လုပ်ပြီး streak 🔥 ကို ဆက်ထိန်းလိုက်ပါ။ မိနစ် ၂၀ ပဲ လိုတယ်!\n👉 " + SITE + "\n\n#WebDevAcademy #DailyMotivation #Myanmar",
          en: "💡 Today's fuel —\n\n“" + quote.en + "”\n\nFinish ONE lesson today and keep the streak alive 🔥 20 minutes is enough.\n👉 " + SITE + "\n\n#WebDevAcademy #DailyMotivation",
        },
        challenge: {
          mm: "🎯 ဒီနေ့ Daily Challenge မေးခွန်း —\n\n“" + (dq ? dq.q.replace(/&lt;/g, "<").replace(/&gt;/g, ">") : "…") + "”\n\n" +
            "အဖြေသိလား? Comment မှာ မဖြေနဲ့ဦးနော် 😉 App ထဲမှာ ဖြေပြီး +20 XP နဲ့ challenge streak 🔥 ယူသွားပါ!\n👉 " + SITE + "#/daily\n\n#WebDevAcademy #DailyChallenge #Myanmar",
          en: "🎯 Today's Daily Challenge —\n\n“" + (dq ? dq.q.replace(/&lt;/g, "<").replace(/&gt;/g, ">") : "…") + "”\n\n" +
            "Know it? Don't answer in the comments 😉 — answer in the app for +20 XP!\n👉 " + SITE + "#/daily\n\n#WebDevAcademy #DailyChallenge",
        },
        ask: {
          mm: "🙏 WebDev Academy နဲ့ သင်ယူနေတဲ့ ကျောင်းသားတွေရေ —\n\nသင်ဘာသင်ခန်းစာ အကြိုက်ဆုံးလဲ? Comment မှာ မျှဝေပေးပါဦး 👇\n\n" +
            "ပြီးရင် သင်တန်းစာမျက်နှာမှာ ⭐ review လေးရေးခဲ့ပေးပါနော် — သင်လိုပဲ စလေ့လာမယ့် သူငယ်ချင်းတွေအတွက် အကြီးမားဆုံး အကူအညီပါ 💜\n👉 " + SITE + "\n\n#WebDevAcademy #StudentVoice",
          en: "🙏 WebDev Academy students —\n\nWhat's your favorite lesson so far? Tell us in the comments 👇\n\n" +
            "And if the academy helped you, leave a ⭐ review on any course page — it's the biggest gift to the next learner 💜\n👉 " + SITE + "\n\n#WebDevAcademy #StudentVoice",
        },
      };

      const tgClean = (out) => platform === "tg"
        ? "📢 " + out.split("\n").filter((l) => !l.trim().startsWith("#")).join("\n").trim()
        : out;

      /* 💡 Code tip — a real, useful snippet from the How-To library, with a
         soft CTA. Value-first content people actually share. */
      if (type === "codetip") {
        const h = teachTip || (teachTip = pickHowto());
        if (!h) return "No How-To recipes found.";
        const mk = (en) =>
          "💡 " + (en ? h.q : (h.qMy || h.q)) + "\n\n" +
          (en ? h.a : (h.aMy || h.a)) + "\n\n" + h.code + "\n\n" +
          (en ? "▶ Try it live + more free tips 👉 " : "▶ တိုက်ရိုက်စမ်း + tip အများကြီး 👉 ") + SITE + "#/howto";
        let out = langSel === "both" ? mk(false) + "\n\n———\n\n" + mk(true) : mk(langSel === "en");
        out += "\n\n#WebDevAcademy #CodeTip #LearnToCode #Myanmar";
        return tgClean(out);
      }

      /* 🧠 Quiz of the day — asks a real question (answer hidden) to pull
         comments/engagement, then sends them to the app to check. */
      if (type === "quizday") {
        const q = teachQuiz || (teachQuiz = pickQuiz());
        if (!q) return "No quiz questions found.";
        const opts = (q.options || []).map((o, i) => String.fromCharCode(65 + i) + ") " + decodeEnt(o)).join("\n");
        const mk = (en) =>
          (en ? "🧠 Quiz of the day!\n\n" : "🧠 ဒီနေ့ Quiz!\n\n") + decodeEnt(q.q) + "\n\n" + opts + "\n\n" +
          (en ? "Drop your answer in the comments 👇 (no peeking!) then check it free 👉 "
              : "အဖြေကို comment မှာ ရေးပါ 👇 (မခိုးကြည့်နဲ့နော်) ပြီးရင် app မှာ အခမဲ့ စစ်ကြည့် 👉 ") + SITE + "#/daily";
        let out = langSel === "both" ? mk(false) + "\n\n———\n\n" + mk(true) : mk(langSel === "en");
        out += "\n\n#WebDevAcademy #CodingQuiz #Myanmar";
        return tgClean(out);
      }

      /* 📅 a whole week of posts in one generation */
      if (type === "week") {
        const langOf = (p) => (langSel === "both" ? p.mm + "\n\n— EN —\n" + p.en : p[langSel] || p.mm);
        const dayTip = (offset) => {
          const m = motivPick(todayKey(offset));
          return langSel === "en"
            ? "💡 Today's fuel —\n\n“" + m.en + "”\n\nFinish ONE lesson today 🔥\n👉 " + SITE
            : "💡 ဒီနေ့ အားဆေး —\n\n“" + m.my + "”\n\nဒီနေ့ သင်ခန်းစာတစ်ခု ပြီးအောင်လုပ်လိုက်ပါ 🔥\n👉 " + SITE;
        };
        const caseAsk = langSel === "en"
          ? "📋 STUCK ON A BUG?\n\nPost it as a CASE STUDY in our community chat — title, what you tried, and screenshots. Classmates + our AI tutor will help you crack it!\n👉 " + SITE + "#/community"
          : "📋 Bug နဲ့ တစ်နေနေပြီလား?\n\nCommunity chat ထဲမှာ CASE STUDY အဖြစ် တင်လိုက်ပါ — ခေါင်းစဉ်၊ စမ်းခဲ့တာတွေနဲ့ screenshot များ။ သူငယ်ချင်းတွေနဲ့ AI tutor က ကူဖြေရှင်းပေးမယ်!\n👉 " + SITE + "#/community";
        const sep = "\n\n━━━━━━━━━━━━━━\n\n";
        return "📅 CONTENT CALENDAR — " + todayKey() + " week\n(post one per day — challenge post: regenerate on the day for that day's question)" + sep +
          "📌 MONDAY\n\n" + dayTip(0) + sep +
          "📌 TUESDAY\n\n" + langOf(T.challenge) + sep +
          "📌 WEDNESDAY\n\n" + langOf(T.course) + sep +
          "📌 THURSDAY\n\n" + caseAsk + sep +
          "📌 FRIDAY\n\n" + langOf(T.milestone) + sep +
          "📌 SATURDAY\n\n" + langOf(T.ask) + sep +
          "📌 SUNDAY\n\n" + langOf(T.general);
      }

      const pick = T[type] || T.general;
      let out = langSel === "both" ? pick.mm + "\n\n———\n\n" + pick.en : pick[langSel] || pick.mm;
      if (platform === "tg") {
        /* Telegram: no hashtags, add a channel-style header */
        out = "📢 " + out.split("\n").filter((l) => !l.trim().startsWith("#")).join("\n").trim();
      }
      return out;
    };

    const syncRows = () => {
      const type = $("cc2-type").value;
      $("cc2-course-row").hidden = type !== "course" && type !== "lesson";
      $("cc2-promo-row").hidden = type !== "promo";
      $("cc2-lesson-row").hidden = AI_KINDS.indexOf(type) === -1;
      $("cc2-lesson-title").placeholder =
        type === "flowchart" ? "Topic, e.g. how a fetch request travels"
        : type === "cheatsheet" ? "Topic, e.g. Flexbox properties"
        : "Lesson title, e.g. CSS Grid in 15 Minutes";
    };
    $("cc2-type").addEventListener("change", syncRows);
    syncRows();

    /* 📚🔀📜 AI writers — house-style HTML for the course editor */
    const STYLE_COMMON =
      "NEVER use backtick characters or the dollar-brace template syntax. " +
      "Inside <pre><code> escape every < as &lt; and > as &gt;. " +
      "Reply with ONLY the HTML (no markdown fences, no explanations).";
    const FLOW_SPEC =
      'a flow diagram with this EXACT structure: <div class="flow"> containing 3 to 6 step boxes ' +
      '<div class="flow-box">emoji Title<br><small>one-line note</small></div> ' +
      '(use class "flow-box alt" for middle/highlight steps and "flow-box warn" for the final/result box), ' +
      'each pair of boxes separated by <div class="flow-arrow" data-label="short verb"></div>. ';
    const generateAI = (kind) => {
      const title = ($("cc2-lesson-title").value || "").trim();
      if (!title) { $("cc2-status").textContent = "Topic/title first!"; return; }
      if (!(window.AI && window.AI.ready())) { $("cc2-status").textContent = t("chat_ai_nokey"); return; }
      const c = courseById($("cc2-course").value) || COURSES[0];
      const inMM = $("cc2-lang").value === "mm";
      const langRule = inMM
        ? "Write all prose in Burmese (keep code and technical terms in English). "
        : "Write in simple, warm English. ";
      let prompt;
      if (kind === "tiktok") {
        prompt = "You write a short (25-35s) vertical TikTok/Reels script for a Myanmar coding school (WebDev Academy), " +
          "as a scene-by-scene shot list a beginner can film on a phone. Topic: \"" + title + "\" (course: \"" + c.title + "\").\n" +
          "Use 5-6 scenes. Scene 1 is a 1.5s HOOK, the last scene is a CTA (the course is FREE at WebDev Academy — link in bio). " +
          "For EACH scene write EXACTLY on its own lines:\n" +
          "SCENE n (time) — what to film\nCAPTION EN: short on-screen text\nCAPTION MM: the same caption in Burmese\n" +
          "SAY: one spoken line under 12 words (" + (inMM ? "in casual Burmese" : "in casual English") + ")\n" +
          "After all scenes, add ONE line 'THUMBNAIL: <a short vivid description for the cover image>' " +
          "then a final line of 5 hashtags. " + STYLE_COMMON.replace("HTML", "text");
      } else if (kind === "flowchart") {
        prompt = "You create teaching diagrams for WebDev Academy, a beginner coding school. " + langRule +
          "Output ONLY " + FLOW_SPEC +
          "The diagram must explain: \"" + title + "\". Keep box titles under 4 words and notes under 8 words. " + STYLE_COMMON;
      } else if (kind === "cheatsheet") {
        prompt = "You write cheat sheets for WebDev Academy, a beginner coding school. " + langRule +
          "Write a cheat-sheet lesson body in HTML about \"" + title + "\": " +
          "start with one <h3>🎯 line saying what it covers; then 2-3 <h3>📝 grouped sections, " +
          "each followed by a <ul> where EVERY <li> is: <code>the exact syntax/command</code> — short plain description. " +
          "12 to 20 items total, ordered from most-used to advanced. " +
          "End with <div class=\"callout tip\"><strong>Try it yourself:</strong> one small practice task.</div>. " + STYLE_COMMON;
      } else {
        prompt = "You write lessons for WebDev Academy, a beginner-friendly bilingual coding school for Myanmar youth. " +
          "Write the full lesson body HTML for a lesson titled \"" + title + "\" in the course \"" + c.title + "\". " + langRule +
          "STYLE RULES (follow exactly): " +
          "1) 3 to 5 sections, each starting with <h3> plus a fitting emoji (🎯 goal first, 💻 for code, 📝 for lists). " +
          "2) Short paragraphs and <ul>/<ol> lists; friendly, encouraging tone; a Myanmar-flavored example (tea shop, kyat prices) where natural. " +
          "3) One or two <pre><code> examples. " +
          "4) Optionally ONE diagram: " + FLOW_SPEC +
          "5) End with <div class=\"callout tip\"><strong>Try it yourself:</strong> a small concrete practice task.</div>. " + STYLE_COMMON;
      }
      const ic = kind === "flowchart" ? "🔀" : kind === "cheatsheet" ? "📜" : kind === "tiktok" ? "🎬" : "📚";
      $("cc2-status").textContent = ic + " ✨ …";
      window.AI.complete(prompt).then((res) => {
        let out = String(res || "").trim();
        if (window.AI.stripFences) out = window.AI.stripFences(out);
        $("cc2-out").value = out;
        $("cc2-status").textContent = out ? ic + " ✓ — paste into ✏️ " + t("admin_title") : t("ai_bad_reply");
        /* 🎬 → 🖼️: prefill the free thumbnail prompt from the script's
           THUMBNAIL: line so a cover image is one tap away */
        if (kind === "tiktok" && out) {
          const m = out.match(/THUMBNAIL:\s*(.+)/i);
          const ap = $("aimg-p");
          if (ap) {
            ap.value = (m ? m[1].trim() : (title + ", coding, vibrant flat illustration")).slice(0, 200);
            $("cc2-status").textContent += " · 🖼️ " + t("vid_thumb_ready");
          }
        }
      }).catch((e) => { $("cc2-status").textContent = "⚠ " + ((e && e.message) || "AI"); });
    };

    $("cc2-gen").addEventListener("click", () => {
      const type = $("cc2-type").value;
      if (AI_KINDS.indexOf(type) >= 0) return generateAI(type);
      /* fresh pick each time so re-tapping Generate gives variety */
      if (type === "codetip") teachTip = pickHowto();
      if (type === "quizday") teachQuiz = pickQuiz();
      $("cc2-out").value = buildPost();
      $("cc2-status").textContent = type === "codetip" || type === "quizday" ? "↻ " + t("cc_generate") : "";
    });
    $("cc2-copy").addEventListener("click", () => {
      const v = $("cc2-out").value;
      if (!v) return;
      const done = () => { $("cc2-status").textContent = "✓ " + t("copied"); setTimeout(() => { $("cc2-status").textContent = ""; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(v).then(done).catch(() => fallbackCopy(v, done));
      else fallbackCopy(v, done);
    });
    $("cc2-ai").addEventListener("click", () => {
      const v = $("cc2-out").value;
      if (!v) { $("cc2-status").textContent = t("cc_gen_first"); return; }
      if (!(window.AI && window.AI.ready())) { $("cc2-status").textContent = t("chat_ai_nokey"); return; }
      $("cc2-status").textContent = "✨ …";
      const langSel = $("cc2-lang").value;
      window.AI.complete(
        "You write viral social posts for a Myanmar coding school. Rewrite the post below in THREE different versions: " +
        "VERSION 1 energetic and bold, VERSION 2 warm and friendly, VERSION 3 curious (opens with a question). " +
        (langSel === "en" ? "Keep them in English" : "Keep them in Burmese" + (langSel === "both" ? " and English (keep both sections)" : "")) +
        ", keep ALL links exactly in each, each under 110 words, natural emojis, each ends inviting comments. " +
        "Separate the three with a line containing only: ===\nReply ONLY with the three posts.\n\n" + v
      ).then((res) => {
        const out = String(res || "").trim();
        $("cc2-out").value = out
          ? "✨ PICK YOUR FAVORITE (delete the others before posting):\n\n" + out
          : v;
        $("cc2-status").textContent = "✨ 3 ✓";
      }).catch((e) => { $("cc2-status").textContent = "⚠ " + ((e && e.message) || "AI"); });
    });

    /* 🖼️ branded 1080×1080 share-card generator (canvas, offline, free) */
    const FAM = '"Segoe UI", "Myanmar Text", "Padauk", sans-serif';
    const rr = (x2, x, y, w, h, r) => {
      x2.beginPath();
      x2.moveTo(x + r, y);
      x2.arcTo(x + w, y, x + w, y + h, r);
      x2.arcTo(x + w, y + h, x, y + h, r);
      x2.arcTo(x, y + h, x, y, r);
      x2.arcTo(x, y, x + w, y, r);
      x2.closePath();
    };
    const wrapText = (x2, text, maxW) => {
      const words = String(text).split(" ");
      const lines = [];
      let line = "";
      for (const w of words) {
        const tl = line ? line + " " + w : w;
        if (x2.measureText(tl).width > maxW && line) { lines.push(line); line = w; }
        else line = tl;
      }
      if (line) lines.push(line);
      return lines;
    };
    const drawShareCard = (kind) => {
      const S = 1080;
      const cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      const x = cv.getContext("2d");
      /* brand gradient background + glow */
      const g = x.createLinearGradient(0, 0, S, S);
      g.addColorStop(0, "#7b2ff7"); g.addColorStop(.6, "#a435f0"); g.addColorStop(1, "#c86dd7");
      x.fillStyle = g; x.fillRect(0, 0, S, S);
      const rad = x.createRadialGradient(S * .25, S * .1, 0, S * .25, S * .1, S * .9);
      rad.addColorStop(0, "rgba(255,255,255,.22)"); rad.addColorStop(.55, "rgba(255,255,255,0)");
      x.fillStyle = rad; x.fillRect(0, 0, S, S);
      /* brand */
      x.fillStyle = "rgba(255,255,255,.18)"; rr(x, 70, 62, 96, 96, 22); x.fill();
      x.fillStyle = "#fff"; x.font = "bold 44px Consolas, monospace"; x.textAlign = "center";
      x.fillText("</>", 118, 126);
      x.textAlign = "left"; x.font = "bold 42px " + FAM;
      x.fillText("WebDev Academy", 190, 124);
      x.textAlign = "center";

      if (kind === "codetip") {
        /* 💡 a real code snippet on a dark panel — the shareable teaching card */
        const h = teachTip || (teachTip = pickHowto());
        const title = h ? ($("cc2-lang").value === "en" ? h.q : (h.qMy || h.q)) : "Code tip";
        x.fillStyle = "#fff"; x.font = "bold 54px " + FAM;
        let y = 300;
        wrapText(x, "💡 " + title, S - 150).slice(0, 2).forEach((l) => { x.fillText(l, S / 2, y); y += 68; });
        const panelY = y + 24, panelBottom = S - 180, panelH = panelBottom - panelY;
        x.fillStyle = "rgba(15,17,19,.94)"; rr(x, 90, panelY, S - 180, panelH, 22); x.fill();
        x.textAlign = "left"; x.fillStyle = "#e6e7e9"; x.font = "27px Consolas, monospace";
        const maxLines = Math.max(4, Math.floor((panelH - 70) / 37));
        (h ? h.code.split("\n") : []).slice(0, maxLines).forEach((l, i) => {
          const line = l.length > 44 ? l.slice(0, 43) + "…" : l;
          x.fillText(line, 122, panelY + 54 + i * 37);
        });
        x.textAlign = "center";
      } else if (kind === "quiz") {
        /* 🧠 a real question + options; answer hidden to drive comments */
        const q = teachQuiz || (teachQuiz = pickQuiz());
        x.font = "84px " + FAM; x.fillText("🧠", S / 2, 250);
        x.fillStyle = "#fff"; x.font = "bold 46px " + FAM;
        let y = 340;
        wrapText(x, q ? decodeEnt(q.q) : "Quiz", S - 170).slice(0, 4).forEach((l) => { x.fillText(l, S / 2, y); y += 60; });
        x.textAlign = "left"; x.font = "38px " + FAM; x.fillStyle = "rgba(255,255,255,.96)";
        y += 26;
        (q ? q.options : []).slice(0, 4).forEach((o, i) => {
          x.fillText(String.fromCharCode(65 + i) + ")  " + decodeEnt(o), 150, y); y += 66;
        });
        x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "bold 34px " + FAM;
        x.fillText("👇 Answer in the comments", S / 2, Math.min(y + 34, S - 200));
      } else if (kind === "course") {
        const c = courseById($("cc2-course").value) || COURSES[0];
        const mmc = (I18N.content && I18N.content.courses && I18N.content.courses[c.id]) || {};
        x.font = "150px " + FAM;
        x.fillText(c.icon, S / 2, 400);
        x.font = "bold 62px " + FAM;
        let y = 505;
        wrapText(x, ($("cc2-lang").value === "en" ? c.title : (mmc.title || c.title)), S - 180).slice(0, 3).forEach((l) => { x.fillText(l, S / 2, y); y += 78; });
        x.font = "38px " + FAM; x.fillStyle = "rgba(255,255,255,.88)";
        wrapText(x, ($("cc2-lang").value === "en" ? c.subtitle : (mmc.subtitle || c.subtitle)), S - 200).slice(0, 3).forEach((l) => { x.fillText(l, S / 2, y + 8); y += 54; });
        x.font = "bold 40px " + FAM; x.fillStyle = "#fff";
        x.fillText("📚 " + totalLessons(c) + "  ·  🌐 EN + မြန်မာ  ·  🎓", S / 2, y + 70);
      } else {
        const m = motivPick(todayKey());
        const txt = kind === "custom" ? ($("img-custom").value || "").trim() || "Learn to code. Free. On your phone." : ($("cc2-lang").value === "en" ? m.en : m.my);
        x.font = "170px " + FAM;
        x.fillText("💪", S / 2, 360);
        x.font = "bold 58px " + FAM;
        const lines = wrapText(x, "“" + txt + "”", S - 170).slice(0, 6);
        let y = 500 - (lines.length - 3) * 20;
        lines.forEach((l) => { x.fillText(l, S / 2, y); y += 86; });
      }
      /* footer pill */
      x.fillStyle = "rgba(255,255,255,.2)"; rr(x, S / 2 - 330, S - 140, 660, 76, 38); x.fill();
      x.fillStyle = "#fff"; x.font = "bold 34px " + FAM;
      x.fillText("myominthet99.github.io/webdev-academy", S / 2, S - 90);
      return cv.toDataURL("image/png");
    };
    $("img-gen").addEventListener("click", () => {
      const url = drawShareCard($("img-kind").value);
      const prev = $("img-prev"), dl = $("img-dl");
      prev.src = url; prev.hidden = false;
      dl.href = url; dl.hidden = false;
    });

    /* 🎨 free AI image via Pollinations.ai — no API key, no cost, no geo-block.
       The image IS the URL, so we just point an <img> at it. */
    let aimgSeed = 1;
    const genAImg = () => {
      const p = ($("aimg-p").value || "").trim();
      if (!p) { $("aimg-status").textContent = t("aimg_need"); return; }
      const prompt = p + ", clean, high quality, for a coding school";
      const url = "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt) +
        "?width=1024&height=1024&nologo=true&seed=" + (aimgSeed++);
      const prev = $("aimg-prev"), dl = $("aimg-dl"), st = $("aimg-status");
      st.textContent = "🎨 " + t("aimg_making");
      prev.hidden = true;
      prev.onload = () => { prev.hidden = false; st.textContent = "✓ " + t("aimg_done"); dl.href = url; dl.hidden = false; };
      prev.onerror = () => { st.textContent = "⚠ " + t("chat_send_err"); };
      prev.src = url;
    };
    $("aimg-gen").addEventListener("click", genAImg);
    $("aimg-p").addEventListener("keydown", (e) => { if (e.key === "Enter") genAImg(); });
    document.querySelectorAll("[data-aimg]").forEach((b) =>
      b.addEventListener("click", () => { $("aimg-p").value = b.getAttribute("data-aimg"); genAImg(); }));

    /* real student count for the milestone post */
    const base = statsBase();
    if (base) fetch(base + "/stats/leaderboard.json").then((r) => r.json()).then((lb) => {
      studentCount = Object.values(lb || {}).filter((x) => x && (Number(x.xp) || 0) > 0).length || null;
    }).catch(() => {});
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
    if (editId === "reports") return renderAdminReports();
    if (editId === "insights") return renderAdminInsights();
    if (editId === "students") return renderAdminStudents();
    if (editId === "content") return renderContentCreator();
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
            <a class="btn btn-outline btn-sm" href="#/admin/reports">🚩 ${t("rep_title")}</a>
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
      publishCourse(course);   /* make it real for students, not just this browser */
      location.hash = "#/course/" + id;
    });

    app.querySelectorAll("[data-del-course]").forEach((b) =>
      b.addEventListener("click", () => {
        if (!window.confirm(t("admin_deleteq"))) return;
        const delId = b.getAttribute("data-del-course");
        saveCustomCourses(loadCustomCourses().filter((c) => c.id !== delId));
        unpublishCourse(delId);
        syncCourses();
        renderAdmin();
      }));
    window.scrollTo(0, 0);
  }

  /* ---------------- Router ---------------- */
  function router() {
    const raw = (location.hash || "#/").replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean);

    /* highlight the matching bottom tab (mobile app bar) */
    const tabOf =
      !parts[0] ? "home"
      : ["courses", "course", "learn", "search", "roadmap", "map"].indexOf(parts[0]) >= 0 ? "courses"
      : parts[0] === "playground" ? "playground"
      : parts[0] === "tools" ? "tools"
      : parts[0] === "howto" ? "tools"
      : parts[0] === "gallery" ? "gallery"
      : parts[0] === "daily" ? "home"
      : ["my-learning", "review", "leaderboard", "account", "certificate", "community", "call", "battle"].indexOf(parts[0]) >= 0 ? "me"
      : "";
    document.querySelectorAll("#tabbar a").forEach((a) =>
      a.classList.toggle("active", a.getAttribute("data-tab") === tabOf)
    );

    /* highlight the matching top-nav pill */
    const navOf =
      ["courses", "course", "learn", "search", "map"].indexOf(parts[0]) >= 0 ? "nav-courses"
      : parts[0] === "gallery" ? "nav-gallery"
      : ["showcase", "portfolio", "project"].indexOf(parts[0]) >= 0 ? "nav-showcase"
      : parts[0] === "roadmap" ? "nav-roadmap"
      : parts[0] === "howto" ? "nav-howto"
      : parts[0] === "tools" ? "nav-tools"
      : parts[0] === "playground" ? "nav-playground"
      : parts[0] === "my-learning" ? "nav-mylearning"
      : "";
    document.querySelectorAll(".topnav a").forEach((a) =>
      a.classList.toggle("active", a.id === navOf)
    );

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
    else if (parts[0] === "tools") renderTools(parts[1]);
    else if (parts[0] === "howto") renderHowto(parts[1]);
    else if (parts[0] === "project" && parts[1]) renderProject(parts[1]);
    else if (parts[0] === "portfolio") renderPortfolio(parts[1]);
    else if (parts[0] === "showcase") renderShowcase();
    else if (parts[0] === "notes") renderNotes();
    else if (parts[0] === "gallery") renderGallery();
    else if (parts[0] === "map" && parts[1]) renderCourseMap(parts[1]);
    else if (parts[0] === "start") renderStart();
    else if (parts[0] === "battle") renderBattle(parts[1]);
    else if (parts[0] === "daily") renderDaily();
    else if (parts[0] === "community") renderCommunity();
    else if (parts[0] === "call") renderCall(parts[1]);
    else if (parts[0] === "leaderboard") renderLeaderboard();
    else if (parts[0] === "review") renderReview();
    else if (parts[0] === "premium") renderPremium(parts[1]);
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
      if (!el) return;
      /* FB-style nav links keep their icon span — write the label span only */
      const lbl = el.querySelector(".nv-lbl");
      (lbl || el).textContent = text;
    };
    const chatBtn = document.getElementById("chat-nav-btn");
    if (chatBtn && !chatBtn.dataset.wired) {
      chatBtn.dataset.wired = "1";
      chatBtn.addEventListener("click", () => { if (window.Chat) window.Chat.open(); });
    }
    set("nav-courses", t("nav_courses"));
    set("nav-roadmap", t("nav_roadmap"));
    set("nav-howto", t("nav_howto"));
    set("nav-playground", t("nav_playground"));
    set("nav-tools", t("nav_tools"));
    set("nav-gallery", t("nav_gallery"));
    set("nav-showcase", t("nav_showcase"));
    set("nav-mylearning", t("nav_mylearning"));
    set("tab-home", t("tab_home"));
    set("tab-courses", t("nav_courses"));
    set("tab-play", t("nav_playground"));
    set("tab-tools", t("nav_tools"));
    set("tab-gallery", t("nav_gallery"));
    set("tab-me", t("tab_me"));
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
  /* Cloud-sync just restored this account's rows into localStorage —
     re-read the in-memory copy before its hashchange re-render, or every
     view (and the SRS deck sync) would run on stale, empty progress. */
  window.addEventListener("wda-cloud-pull", () => { state = loadState(); updateStreak(); });
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
  loadCloudCourses();
  maybeOnboard(); /* first-run welcome (once per device) */
  setTimeout(updatePushMeta, 3000); /* refresh streak state for push reminders */

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
