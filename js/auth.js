/* =====================================================================
   WebDev Academy — REAL authentication (Firebase Authentication)
   ---------------------------------------------------------------------
   Real accounts managed by Google/Firebase: email+password (with a real
   verification email and real password-reset email) and Google sign-in.
   Sessions persist across reloads and the user id (uid) is the SAME on
   every device, so progress follows the account everywhere.

   Requires (one-time, in the Firebase console → Authentication):
     • Sign-in method: enable Email/Password and Google
     • Settings → Authorized domains: add your site's domain

   The public API (window.Auth) is unchanged, so app.js / chat.js /
   cloud-sync.js keep working — but login/signup/etc. now return Promises.
   ===================================================================== */
(function () {
  "use strict";

  const I18N = window.I18N;
  const cfg = window.FIREBASE_CONFIG;

  /* ============ CONFIG ============ */
  const ADMIN_EMAILS = ["mmtboy90@gmail.com"]; /* always-admin emails */
  /* ================================ */

  const listeners = [];
  let modalEl = null;
  let modalMode = "login";
  let resetStep = "request"; /* "request" (send email) → "complete" (paste link) */

  const lang = () => (localStorage.getItem("wda_lang") === "my" ? "my" : "en");
  const t = (k) => (I18N.ui[lang()] && I18N.ui[lang()][k]) || I18N.ui.en[k] || k;
  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  /* ---------------- Firebase Auth (lazy-loaded SDK) ---------------- */
  let auth = null, fa = null, initP = null, authReady = false;
  let currentUser = null;

  function ensureAuth() {
    if (auth) return Promise.resolve();
    if (!cfg || !cfg.apiKey) return Promise.reject(new Error("no-firebase"));
    if (!initP) {
      initP = (async () => {
        const appMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
        fa = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");
        let application;
        try { application = appMod.getApp("wda-auth"); }
        catch (e) { application = appMod.initializeApp(cfg, "wda-auth"); }
        auth = fa.getAuth(application);
        /* fires on boot (session restore), and on every login/logout */
        fa.onAuthStateChanged(auth, (fu) => {
          currentUser = mapUser(fu);
          authReady = true;
          notify();
        });
      })();
    }
    return initP;
  }

  function mapUser(fu) {
    if (!fu) return null;
    const pid = (fu.providerData && fu.providerData[0] && fu.providerData[0].providerId) || "password";
    const u = {
      id: fu.uid,
      name: fu.displayName || (fu.email ? fu.email.split("@")[0] : "User"),
      email: (fu.email || "").toLowerCase(),
      picture: fu.photoURL || "",
      provider: pid === "google.com" ? "google" : "local",
      emailVerified: !!fu.emailVerified,
    };
    u.admin = isAdminUser(u);
    return u;
  }
  function isAdminUser(u) {
    return !!u && ADMIN_EMAILS.indexOf((u.email || "").toLowerCase()) >= 0;
  }
  function current() { return currentUser; }
  const isAdmin = () => isAdminUser(current());
  function notify() {
    listeners.forEach((cb) => { try { cb(currentUser); } catch (e) {} });
    renderAuthArea();
  }

  /* map Firebase error codes to friendly, translated messages */
  function mapErr(e) {
    const code = (e && e.code) || "";
    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return null; /* user cancelled */
    const M = {
      "auth/email-already-in-use": "auth_err_exists",
      "auth/invalid-email": "auth_err_email",
      "auth/weak-password": "auth_err_shortpass",
      "auth/user-not-found": "auth_err_notfound",
      "auth/wrong-password": "auth_err_wrongpass",
      "auth/invalid-credential": "auth_err_wrongpass",
      "auth/invalid-login-credentials": "auth_err_wrongpass",
      "auth/network-request-failed": "auth_err_network",
      "auth/too-many-requests": "auth_err_toomany",
      "auth/popup-blocked": "auth_err_popup",
      "auth/account-exists-with-different-credential": "auth_err_diffcred",
      "auth/operation-not-allowed": "auth_err_notenabled",
      "auth/unauthorized-domain": "auth_err_domain",
    };
    return M[code] ? t(M[code]) : ((e && e.message) || t("auth_err_required"));
  }

  /* ---------------- auth actions (all return Promises) ---------------- */
  async function signup(name, email, password) {
    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();
    if (!name || !email || !password) return { error: t("auth_err_required") };
    if (!validEmail(email)) return { error: t("auth_err_email") };
    if (password.length < 6) return { error: t("auth_err_shortpass") };
    try {
      await ensureAuth();
      const cred = await fa.createUserWithEmailAndPassword(auth, email, password);
      try { await fa.updateProfile(cred.user, { displayName: name }); } catch (e) {}
      try { await fa.sendEmailVerification(cred.user); } catch (e) {}
      currentUser = mapUser(auth.currentUser);
      notify();
      return { ok: true, verifySent: true };
    } catch (e) { return { error: mapErr(e) }; }
  }

  async function login(email, password) {
    email = (email || "").trim().toLowerCase();
    if (!email || !password) return { error: t("auth_err_required") };
    try {
      await ensureAuth();
      await fa.signInWithEmailAndPassword(auth, email, password);
      return { ok: true };
    } catch (e) { return { error: mapErr(e) }; }
  }

  async function google() {
    try {
      await ensureAuth();
      const provider = new fa.GoogleAuthProvider();
      await fa.signInWithPopup(auth, provider);
      return { ok: true };
    } catch (e) {
      const msg = mapErr(e);
      return msg == null ? { cancelled: true } : { error: msg };
    }
  }

  async function logout() {
    try { await ensureAuth(); await fa.signOut(auth); } catch (e) {}
  }

  async function updateProfile(name) {
    name = (name || "").trim();
    if (!name) return { error: t("auth_err_required") };
    if (!auth || !auth.currentUser) return { error: t("auth_err_required") };
    try {
      await fa.updateProfile(auth.currentUser, { displayName: name });
      currentUser = mapUser(auth.currentUser);
      notify();
      return { ok: true };
    } catch (e) { return { error: mapErr(e) }; }
  }

  async function changePassword(currentPass, newPass) {
    const u = current();
    if (!u || !auth || !auth.currentUser) return { error: t("auth_err_required") };
    if (u.provider !== "local") return { error: t("auth_google_account_note") };
    if (!newPass || newPass.length < 6) return { error: t("auth_err_shortpass") };
    try {
      const cred = fa.EmailAuthProvider.credential(u.email, currentPass || "");
      await fa.reauthenticateWithCredential(auth.currentUser, cred);
      await fa.updatePassword(auth.currentUser, newPass);
      return { ok: true };
    } catch (e) {
      const code = (e && e.code) || "";
      if (code === "auth/wrong-password" || code === "auth/invalid-credential")
        return { error: t("auth_err_wrong_current") };
      return { error: mapErr(e) };
    }
  }

  /* real reset email (signature changed: email only, no new password) */
  async function resetPassword(email) {
    email = (email || "").trim().toLowerCase();
    if (!email) return { error: t("auth_err_required") };
    if (!validEmail(email)) return { error: t("auth_err_email") };
    try {
      await ensureAuth();
      await fa.sendPasswordResetEmail(auth, email);
      return { ok: true, sent: true };
    } catch (e) {
      /* don't reveal whether the email exists — treat not-found as "sent" */
      if ((e && e.code) === "auth/user-not-found") return { ok: true, sent: true };
      return { error: mapErr(e) };
    }
  }

  /* Finish a reset from a pasted link — works even when the link's page
     (firebaseapp.com) is blocked, because we call the REST API directly
     (identitytoolkit.googleapis.com), which is reachable. */
  async function completeReset(pastedLink, newPass) {
    const m = String(pastedLink || "").match(/[?&]oobCode=([^&\s]+)/);
    if (!m) return { error: t("reset_no_code") };
    if (!newPass || newPass.length < 6) return { error: t("auth_err_shortpass") };
    const code = decodeURIComponent(m[1]);
    const key = (cfg && cfg.apiKey) || "";
    try {
      const r = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=" + encodeURIComponent(key),
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ oobCode: code, newPassword: newPass }) }
      );
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        const code2 = (j.error && j.error.message) || "";
        return { error: (code2 === "INVALID_OOB_CODE" || code2 === "EXPIRED_OOB_CODE") ? t("reset_bad_code") : (code2 || t("auth_err_required")) };
      }
      return { ok: true };
    } catch (e) { return { error: t("auth_err_network") }; }
  }

  async function resendVerification() {
    if (!auth || !auth.currentUser) return { error: t("auth_err_required") };
    try { await fa.sendEmailVerification(auth.currentUser); return { ok: true }; }
    catch (e) { return { error: mapErr(e) }; }
  }

  /* ---------------- Google button icon ---------------- */
  const gIcon =
    '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">' +
    '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
    '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
    '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
    '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

  function renderGoogleSlot(slot, errBox) {
    slot.innerHTML = "";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-google";
    btn.innerHTML = gIcon + "<span>" + t("auth_google") + "</span>";
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      const res = await google();
      btn.disabled = false;
      if (res && res.error) { if (errBox) { errBox.textContent = res.error; errBox.hidden = false; } }
      else if (res && res.ok) closeModal();
    });
    slot.appendChild(btn);
  }

  /* ---------------- modal ---------------- */
  function onEsc(e) { if (e.key === "Escape") closeModal(); }

  function buildModal() {
    modalEl = document.createElement("div");
    modalEl.className = "modal-overlay";
    modalEl.id = "auth-modal";
    modalEl.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true">' +
      '  <button class="modal-close" type="button" aria-label="Close">&times;</button>' +
      '  <div class="auth-tabs">' +
      '    <button class="auth-tab" data-mode="login" type="button"></button>' +
      '    <button class="auth-tab" data-mode="signup" type="button"></button>' +
      '  </div>' +
      '  <div id="auth-body"></div>' +
      '</div>';
    document.body.appendChild(modalEl);
    modalEl.addEventListener("click", (e) => { if (e.target === modalEl) closeModal(); });
    modalEl.querySelector(".modal-close").addEventListener("click", closeModal);
    modalEl.querySelectorAll(".auth-tab").forEach((tab) =>
      tab.addEventListener("click", () => { modalMode = tab.dataset.mode; renderModalBody(); })
    );
  }

  function openModal(mode) {
    modalMode = mode || "login";
    if (modalMode === "reset") resetStep = "request";
    if (!modalEl) buildModal();
    renderModalBody();
    modalEl.classList.add("open");
    document.addEventListener("keydown", onEsc);
  }
  function closeModal() {
    if (modalEl) {
      modalEl.classList.remove("open");
      document.removeEventListener("keydown", onEsc);
    }
  }

  function bindSwitches(body) {
    body.querySelectorAll("[data-switch]").forEach((a) =>
      a.addEventListener("click", () => { modalMode = a.dataset.switch; renderModalBody(); })
    );
    body.querySelectorAll("[data-reset-step]").forEach((a) =>
      a.addEventListener("click", () => { resetStep = a.dataset.resetStep; renderModalBody(); })
    );
  }

  function renderModalBody() {
    if (!modalEl) return;
    const isSignup = modalMode === "signup";
    const isReset = modalMode === "reset";
    const tabs = modalEl.querySelector(".auth-tabs");
    if (tabs) tabs.style.display = isReset ? "none" : "flex";
    modalEl.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.textContent = tab.dataset.mode === "login" ? t("auth_login") : t("auth_signup");
      tab.classList.toggle("active", tab.dataset.mode === modalMode);
    });
    const body = modalEl.querySelector("#auth-body");

    /* ----- password reset, step 2: paste the link + set new password ----- */
    if (isReset && resetStep === "complete") {
      body.innerHTML =
        '<h2 class="auth-title">' + t("reset_set_title") + "</h2>" +
        '<p class="auth-note" style="text-align:left;margin-bottom:12px">' + t("reset_paste_help") + "</p>" +
        '<div class="auth-err" hidden></div><div class="auth-ok" hidden></div>' +
        '<form class="auth-form" novalidate>' +
        "<label>" + t("reset_paste_label") + '</label>' +
        '<textarea name="link" rows="3" placeholder="https://...oobCode=..." style="width:100%;padding:10px;border:1px solid var(--line);border-radius:8px;font-size:12px;font-family:inherit"></textarea>' +
        "<label>" + t("auth_new_password") + '</label><input name="pw" type="password" autocomplete="new-password">' +
        "<label>" + t("reset_confirm") + '</label><input name="pw2" type="password" autocomplete="new-password">' +
        '<button class="btn btn-primary btn-block" type="submit">' + t("reset_set_btn") + "</button>" +
        "</form>" +
        '<p class="auth-switch"><a data-reset-step="request">← ' + t("reset_back_email") + "</a></p>" +
        '<p class="auth-switch"><a data-switch="login">' + t("auth_back_login") + "</a></p>";
      const form = body.querySelector(".auth-form");
      const errBox = body.querySelector(".auth-err");
      const okBox = body.querySelector(".auth-ok");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        errBox.hidden = true; okBox.hidden = true;
        const d = new FormData(form);
        if (d.get("pw") !== d.get("pw2")) { errBox.textContent = t("reset_mismatch"); errBox.hidden = false; return; }
        const btn = form.querySelector("button[type=submit]");
        btn.disabled = true;
        const res = await completeReset(d.get("link"), d.get("pw"));
        btn.disabled = false;
        if (res && res.error) { errBox.textContent = res.error; errBox.hidden = false; }
        else { okBox.textContent = t("reset_done"); okBox.hidden = false; form.reset(); }
      });
      bindSwitches(body);
      return;
    }

    /* ----- password reset, step 1: send the email ----- */
    if (isReset) {
      body.innerHTML =
        '<h2 class="auth-title">' + t("auth_reset_title") + "</h2>" +
        '<p class="auth-note" style="text-align:left;margin-bottom:14px">' + t("auth_reset_desc") + "</p>" +
        '<div class="auth-err" hidden></div>' +
        '<div class="auth-ok" hidden></div>' +
        '<form class="auth-form" novalidate>' +
        "<label>" + t("auth_email") + '</label><input name="email" type="email" autocomplete="email">' +
        '<button class="btn btn-primary btn-block" type="submit">' + t("auth_reset_btn") + "</button>" +
        "</form>" +
        '<p class="auth-switch" style="margin-top:12px"><a data-reset-step="complete">' + t("reset_have_link") + " →</a></p>" +
        '<p class="auth-switch"><a data-switch="login">' + t("auth_back_login") + "</a></p>";
      const form = body.querySelector(".auth-form");
      const errBox = body.querySelector(".auth-err");
      const okBox = body.querySelector(".auth-ok");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        errBox.hidden = true; okBox.hidden = true;
        const btn = form.querySelector("button[type=submit]");
        btn.disabled = true;
        const res = await resetPassword(new FormData(form).get("email"));
        btn.disabled = false;
        if (res && res.error) { errBox.textContent = res.error; errBox.hidden = false; }
        else {
          /* move straight to the paste step so the user knows what's next */
          okBox.textContent = t("auth_reset_sent"); okBox.hidden = false;
          setTimeout(() => { resetStep = "complete"; renderModalBody(); }, 1600);
        }
      });
      bindSwitches(body);
      return;
    }

    /* ----- login / signup view ----- */
    body.innerHTML =
      '<h2 class="auth-title">' + (isSignup ? t("auth_signup_title") : t("auth_login_title")) + "</h2>" +
      '<div class="auth-err" hidden></div>' +
      '<div class="auth-ok" hidden></div>' +
      '<div class="google-slot"></div>' +
      '<div class="auth-divider"><span>' + t("auth_or") + "</span></div>" +
      '<form class="auth-form" novalidate>' +
      (isSignup ? "<label>" + t("auth_name") + '</label><input name="name" type="text" autocomplete="name">' : "") +
      "<label>" + t("auth_email") + '</label><input name="email" type="email" autocomplete="email">' +
      "<label>" + t("auth_password") + '</label><input name="password" type="password" autocomplete="' +
      (isSignup ? "new-password" : "current-password") + '">' +
      '<button class="btn btn-primary btn-block" type="submit">' +
      (isSignup ? t("auth_signup_btn") : t("auth_login_btn")) + "</button>" +
      "</form>" +
      (isSignup ? "" : '<p class="auth-switch" style="margin:10px 0 0"><a data-switch="reset">' + t("auth_forgot") + "</a></p>") +
      '<p class="auth-switch">' + (isSignup ? t("auth_have_account") : t("auth_no_account")) +
      ' <a data-switch="' + (isSignup ? "login" : "signup") + '">' +
      (isSignup ? t("auth_switch_login") : t("auth_switch_signup")) + "</a></p>";

    const errBox = body.querySelector(".auth-err");
    const okBox = body.querySelector(".auth-ok");
    renderGoogleSlot(body.querySelector(".google-slot"), errBox);

    const form = body.querySelector(".auth-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errBox.hidden = true; okBox.hidden = true;
      const data = new FormData(form);
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      const res = isSignup
        ? await signup(data.get("name"), data.get("email"), data.get("password"))
        : await login(data.get("email"), data.get("password"));
      btn.disabled = false;
      if (res && res.error) { errBox.textContent = res.error; errBox.hidden = false; }
      else if (res && res.ok) {
        if (res.verifySent) {
          /* keep the modal open briefly to show the "check your email" note */
          okBox.textContent = t("auth_verify_sent"); okBox.hidden = false;
          setTimeout(closeModal, 2500);
        } else closeModal();
      }
    });
    bindSwitches(body);
  }

  /* ---------------- header area ---------------- */
  function renderAuthArea() {
    const area = document.getElementById("auth-area");
    if (!area) return;
    const u = current();
    if (!u) {
      area.innerHTML = '<button class="btn-login" id="open-login" type="button">' + t("auth_login") + "</button>";
      area.querySelector("#open-login").addEventListener("click", () => openModal("login"));
      return;
    }
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const label = (u.name || u.email || "?").trim();
    const initial = label.charAt(0).toUpperCase();
    const first = label.split(" ")[0];
    area.innerHTML =
      '<div class="user-chip" id="user-chip" tabindex="0">' +
      (u.picture
        ? '<img class="avatar" src="' + esc(u.picture) + '" alt="" referrerpolicy="no-referrer">'
        : '<span class="avatar">' + esc(initial) + "</span>") +
      '<span class="user-name">' + esc(first) + "</span>" +
      '<span class="caret">▾</span>' +
      '<div class="user-menu" hidden>' +
      '<div class="user-menu-head"><div class="um-name">' + esc(u.name || "") +
      (u.admin ? ' <span class="role-badge">' + t("role_admin") + "</span>" : "") +
      '</div><div class="um-email">' + esc(u.email || "") +
      (!u.emailVerified && u.provider === "local" ? ' <span class="verify-flag" title="' + esc(t("auth_unverified")) + '">•</span>' : "") +
      "</div></div>" +
      '<a href="#/account" class="user-menu-item">' + t("auth_account") + "</a>" +
      '<a href="#/my-learning" class="user-menu-item">' + t("nav_mylearning") + "</a>" +
      (u.admin ? '<a href="#/admin" class="user-menu-item">' + t("admin") + "</a>" : "") +
      '<button class="user-menu-item logout" type="button">' + t("auth_logout") + "</button>" +
      "</div></div>";

    const chip = area.querySelector("#user-chip");
    const menu = area.querySelector(".user-menu");
    chip.addEventListener("click", (e) => {
      if (e.target.closest(".user-menu-item")) return;
      menu.hidden = !menu.hidden;
    });
    area.querySelector(".logout").addEventListener("click", () => { menu.hidden = true; logout(); });
  }

  /* close the user menu when clicking elsewhere */
  document.addEventListener("click", (e) => {
    const area = document.getElementById("auth-area");
    if (!area) return;
    const chip = area.querySelector("#user-chip");
    const menu = area.querySelector(".user-menu");
    if (menu && !menu.hidden && chip && !chip.contains(e.target)) menu.hidden = true;
  });

  /* ---------------- expose + boot ---------------- */
  window.Auth = {
    current,
    isAdmin,
    login,
    signup,
    google,
    logout,
    updateProfile,
    changePassword,
    resetPassword,
    completeReset,
    resendVerification,
    openModal,
    ready: () => authReady,
    onChange: (cb) => listeners.push(cb),
    refresh: () => {
      renderAuthArea();
      if (modalEl && modalEl.classList.contains("open")) renderModalBody();
    },
  };

  renderAuthArea();          /* logged-out header until Firebase restores the session */
  ensureAuth().catch(() => { authReady = true; notify(); });
})();
