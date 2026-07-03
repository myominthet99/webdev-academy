/* =====================================================================
   WebDev Academy — cloud sync (Firebase Realtime Database)
   ---------------------------------------------------------------------
   Does nothing unless window.FIREBASE_CONFIG is set (js/firebase-config.js).

   Strategy: the whole app already persists everything to localStorage.
   This module mirrors the learning-related keys to Firebase per user:
   • On boot / login: pull the user's cloud snapshot into localStorage,
     then re-render so progress appears.
   • On every local write (localStorage.setItem is wrapped): push the
     changed key to the cloud, debounced. Last write wins.

   Users are keyed by lowercase email, so logging in with the same email
   on another device restores progress there. Chat has its own Firebase
   backend in chat.js and is NOT handled here.
   ===================================================================== */
(function () {
  "use strict";
  const cfg = window.FIREBASE_CONFIG;
  if (!cfg) return; /* cloud disabled — pure localStorage mode */

  /* Keys worth syncing (prefix match). Device prefs (theme/lang), chat,
     and account records (wda_users has password hashes) stay local. */
  const SYNC_PREFIXES = [
    "wda_state_v1",     /* enrollments + completed lessons  */
    "wda_notes",        /* lesson notes                     */
    "wda_bookmarks",    /* bookmarked lessons               */
    "wda_quiz",         /* quiz best scores                 */
    "wda_streak",       /* day streak                       */
    "wda_last",         /* resume position                  */
    "wda_comments",     /* lesson discussions               */
    "wda_lesson_time",  /* time tracking                    */
    "wda_custom_courses", /* admin-created courses          */
    "wda_reviews",      /* course reviews                   */
  ];
  const shouldSync = (k) => typeof k === "string" && SYNC_PREFIXES.some((p) => k.indexOf(p) === 0);
  /* Firebase paths may not contain . # $ [ ] / */
  const encKey = (k) => encodeURIComponent(k).replace(/\./g, "%2E");

  let fb = null, fbInit = null;
  function ensureFb() {
    if (fb) return Promise.resolve();
    if (!fbInit) {
      fbInit = (async () => {
        const appMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
        const dbMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
        /* named app: chat.js owns the default app with the same config */
        const application = appMod.initializeApp(cfg, "wda-cloud-sync");
        fb = { db: dbMod.getDatabase(application), ref: dbMod.ref, set: dbMod.set, get: dbMod.get };
      })();
    }
    return fbInit;
  }

  const userPath = () => {
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    if (!u || !u.email) return null; /* guests stay local-only */
    return "sync/" + encKey(String(u.email).toLowerCase());
  };

  /* ---------- push: wrap localStorage.setItem, debounce uploads ---------- */
  const origSet = Storage.prototype.setItem;
  const pending = Object.create(null);
  let flushTimer = null;
  Storage.prototype.setItem = function (k, v) {
    origSet.call(this, k, v);
    if (this === window.localStorage && shouldSync(k)) {
      pending[k] = String(v);
      clearTimeout(flushTimer);
      flushTimer = setTimeout(flush, 800);
    }
  };
  function flush() {
    const base = userPath();
    if (!base) return; /* not logged in — keep local until they are */
    const batch = Object.assign({}, pending);
    for (const k in pending) delete pending[k];
    ensureFb().then(() => {
      Object.keys(batch).forEach((k) => {
        fb.set(fb.ref(fb.db, base + "/" + encKey(k)), { k, v: batch[k], t: Date.now() })
          .catch(() => {});
      });
    }).catch(() => {});
  }

  /* ---------- pull: on boot + on login, cloud → localStorage ---------- */
  let lastPulledFor = null;
  function pull() {
    const base = userPath();
    if (!base || base === lastPulledFor) return;
    lastPulledFor = base;
    ensureFb().then(() => fb.get(fb.ref(fb.db, base))).then((snap) => {
      const val = snap && snap.val && snap.val();
      if (!val) { pushAll(); return; } /* first device: seed the cloud */
      Object.values(val).forEach((row) => {
        if (row && typeof row.k === "string" && typeof row.v === "string" && shouldSync(row.k)) {
          origSet.call(localStorage, row.k, row.v);
        }
      });
      /* re-render the current view with the restored data */
      window.dispatchEvent(new Event("hashchange"));
    }).catch(() => { lastPulledFor = null; });
  }
  /* seed the cloud with everything already in this browser */
  function pushAll() {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && shouldSync(k)) pending[k] = localStorage.getItem(k);
    }
    flush();
  }

  /* boot + react to login/logout */
  function boot() {
    pull();
    if (window.Auth && window.Auth.onChange) {
      window.Auth.onChange(() => { lastPulledFor = null; pull(); });
    }
  }
  if (document.readyState === "complete" || document.readyState === "interactive") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
