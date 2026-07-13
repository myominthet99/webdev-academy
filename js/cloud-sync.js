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
    "wda_srs",          /* spaced-repetition review deck    */
    "wda_streak",       /* day streak                       */
    "wda_last",         /* resume position                  */
    "wda_comments",     /* lesson discussions               */
    "wda_lesson_time",  /* time tracking                    */
    "wda_custom_courses", /* admin-created courses          */
    "wda_reviews",      /* course reviews                   */
  ];
  const shouldSync = (k) => typeof k === "string" && SYNC_PREFIXES.some((p) => k.indexOf(p) === 0);
  /* Firebase paths may not contain . # $ [ ] / — swap them for commas.
     (Percent-encoding does NOT work: the server decodes %2E back to "."
     and rejects the path.) Original keys are stored inside each row (k),
     so the encoding never needs to be reversed. */
  const encKey = (k) => String(k).replace(/[.#$\[\]\/%]/g, ",");

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

  /* Most keys are namespaced "...::<uid>", but uid is RANDOM PER BROWSER —
     the same email gets a different uid on every device. Cloud rows use the
     device-independent marker "::@me" instead, translated back to the local
     uid on pull. (Without this, progress synced from one phone could never
     be read on another — the restore landed under a uid nobody used.) */
  const myId = () => {
    const u = window.Auth && window.Auth.current ? window.Auth.current() : null;
    return u ? String(u.id) : null;
  };
  const UID_RE = /::(u_[a-z0-9]+|guest)$/;
  /* local key → cloud key; null = not this account's data, don't sync */
  const toCloudKey = (k) => {
    const id = myId();
    if (!id) return null;
    if (k.slice(-(id.length + 2)) === "::" + id) return k.slice(0, k.length - id.length) + "@me";
    if (UID_RE.test(k)) return null; /* guest bucket or another account on this browser */
    return k; /* global key (e.g. wda_custom_courses) */
  };
  /* cloud key → local key; also adopts legacy rows written by old versions
     (suffixed with some other device's random uid) */
  const fromCloudKey = (k) => {
    const id = myId();
    if (!id) return null;
    if (k.slice(-5) === "::@me") return k.slice(0, k.length - 3) + id;
    const m = k.match(UID_RE);
    if (m) return m[1] === "guest" ? null : k.slice(0, k.length - m[1].length) + id;
    return k;
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
        const ck = toCloudKey(k);
        if (!ck) return; /* another account's (or guest) bucket — never upload */
        fb.set(fb.ref(fb.db, base + "/" + encKey(ck)), { k: ck, v: batch[k], t: Date.now() })
          .catch(() => { pending[k] = batch[k]; }); /* keep for retry on the next write */
      });
    }).catch(() => { Object.assign(pending, batch); });
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
      /* Newest row wins per logical key — canonical "@me" rows and legacy
         per-device rows can describe the same key */
      const best = Object.create(null);
      Object.values(val).forEach((row) => {
        if (!row || typeof row.k !== "string" || typeof row.v !== "string" || !shouldSync(row.k)) return;
        const lk = fromCloudKey(row.k);
        if (!lk) return;
        const ts = Number(row.t) || 0;
        if (!best[lk] || ts >= best[lk].t) best[lk] = { v: row.v, t: ts };
      });
      Object.keys(best).forEach((lk) => origSet.call(localStorage, lk, best[lk].v));
      /* let the app re-read its in-memory state, then re-render */
      window.dispatchEvent(new Event("wda-cloud-pull"));
      window.dispatchEvent(new Event("hashchange"));
    }).catch(() => { lastPulledFor = null; });
  }
  /* seed the cloud with everything already in this browser */
  function pushAll() {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      /* only this account's rows — never seed the cloud with the guest
         bucket or other accounts sharing this browser */
      if (k && shouldSync(k) && toCloudKey(k)) pending[k] = localStorage.getItem(k);
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
