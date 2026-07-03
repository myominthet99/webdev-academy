/* =====================================================================
   WebDev Academy — client-side auth (email/password + Google)
   ---------------------------------------------------------------------
   NOTE: This is a front-end-only demo. Accounts live in this browser's
   localStorage — there is NO server. Passwords are hashed but this is
   NOT real security; don't use real passwords. Progress is stored per
   account (see app.js storeKey()).

   To enable REAL "Continue with Google":
     1. Create an OAuth 2.0 Client ID (type: Web) at
        https://console.cloud.google.com/apis/credentials
     2. Add your origin (e.g. http://localhost:5500) to
        "Authorized JavaScript origins".
     3. Paste the Client ID into GOOGLE_CLIENT_ID below.
   With no Client ID, the Google button runs in demo mode.
   ===================================================================== */
(function () {
  "use strict";

  const I18N = window.I18N;

  /* ============ CONFIG ============ */
  const GOOGLE_CLIENT_ID = ""; // <-- paste your Google OAuth Client ID here
  /* Emails listed here are always admins. The very first account created
     in this browser also becomes admin automatically. */
  const ADMIN_EMAILS = ["mmtboy90@gmail.com"];
  /* ================================ */

  const USERS_KEY = "wda_users";
  const SESSION_KEY = "wda_session";
  const listeners = [];
  let session = localStorage.getItem(SESSION_KEY) || null;
  let modalEl = null;
  let modalMode = "login";

  const lang = () => (localStorage.getItem("wda_lang") === "my" ? "my" : "en");
  const t = (k) => (I18N.ui[lang()] && I18N.ui[lang()][k]) || I18N.ui.en[k] || k;

  /* ---------------- store helpers ---------------- */
  const loadUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; }
    catch (e) { return {}; }
  };
  const saveUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));
  function hash(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) + h) + s.charCodeAt(i); h |= 0; }
    return "h" + (h >>> 0).toString(16);
  }
  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const genId = () => "u_" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);

  /* ---------------- core API ---------------- */
  function isAdminUser(u) {
    if (!u) return false;
    if (u.role === "admin") return true;
    return ADMIN_EMAILS.indexOf((u.email || "").toLowerCase()) >= 0;
  }
  function current() {
    if (!session) return null;
    const users = loadUsers();
    const u = Object.values(users).find((x) => x.id === session) || null;
    if (u) u.admin = isAdminUser(u);
    return u;
  }
  const isAdmin = () => isAdminUser(current());
  function notify() {
    const u = current();
    listeners.forEach((cb) => { try { cb(u); } catch (e) {} });
    renderAuthArea();
  }

  function signup(name, email, password) {
    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();
    if (!name || !email || !password) return { error: t("auth_err_required") };
    if (!validEmail(email)) return { error: t("auth_err_email") };
    if (password.length < 6) return { error: t("auth_err_shortpass") };
    const users = loadUsers();
    if (users[email]) return { error: t("auth_err_exists") };
    const role = Object.keys(users).length === 0 ? "admin" : "user"; /* first account = admin */
    users[email] = { id: genId(), name, email, pass: hash(password), provider: "local", role };
    saveUsers(users);
    session = users[email].id;
    localStorage.setItem(SESSION_KEY, session);
    notify();
    return { ok: true };
  }

  function login(email, password) {
    email = (email || "").trim().toLowerCase();
    if (!email || !password) return { error: t("auth_err_required") };
    const users = loadUsers();
    const user = users[email];
    if (!user) return { error: t("auth_err_notfound") };
    if (user.provider === "local" && user.pass !== hash(password)) return { error: t("auth_err_wrongpass") };
    session = user.id;
    localStorage.setItem(SESSION_KEY, session);
    notify();
    return { ok: true };
  }

  function loginWithProfile(p) {
    const email = (p.email || "").trim().toLowerCase();
    if (!email) return;
    const users = loadUsers();
    if (!users[email]) {
      const role = Object.keys(users).length === 0 ? "admin" : "user"; /* first account = admin */
      users[email] = { id: genId(), name: p.name || email, email, provider: p.provider || "google", picture: p.picture || "", role };
    } else if (p.picture) {
      users[email].picture = p.picture;
    }
    saveUsers(users);
    session = users[email].id;
    localStorage.setItem(SESSION_KEY, session);
    notify();
  }

  function logout() {
    session = null;
    localStorage.removeItem(SESSION_KEY);
    notify();
  }

  function updateProfile(name) {
    const u = current();
    if (!u) return { error: t("auth_err_required") };
    name = (name || "").trim();
    if (!name) return { error: t("auth_err_required") };
    const users = loadUsers();
    users[u.email].name = name;
    saveUsers(users);
    notify();
    return { ok: true };
  }

  function changePassword(currentPass, newPass) {
    const u = current();
    if (!u) return { error: t("auth_err_required") };
    if (u.provider !== "local") return { error: t("auth_google_account_note") };
    const users = loadUsers();
    if (users[u.email].pass !== hash(currentPass || "")) return { error: t("auth_err_wrong_current") };
    if (!newPass || newPass.length < 6) return { error: t("auth_err_shortpass") };
    users[u.email].pass = hash(newPass);
    saveUsers(users);
    notify();
    return { ok: true };
  }

  function resetPassword(email, newPass) {
    email = (email || "").trim().toLowerCase();
    if (!email || !newPass) return { error: t("auth_err_required") };
    if (!validEmail(email)) return { error: t("auth_err_email") };
    if (newPass.length < 6) return { error: t("auth_err_shortpass") };
    const users = loadUsers();
    const rec = users[email];
    if (!rec || rec.provider !== "local") return { error: t("auth_err_reset_notfound") };
    rec.pass = hash(newPass);
    saveUsers(users);
    session = rec.id;
    localStorage.setItem(SESSION_KEY, session);
    notify();
    return { ok: true };
  }

  /* ---------------- Google ---------------- */
  function b64urlDecode(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = str.length % 4;
    if (pad) str += "=".repeat(4 - pad);
    const json = decodeURIComponent(
      atob(str).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    return JSON.parse(json);
  }
  function handleGoogleCredential(resp) {
    try {
      const p = b64urlDecode(resp.credential.split(".")[1]);
      loginWithProfile({ name: p.name, email: p.email, picture: p.picture, provider: "google" });
      closeModal();
    } catch (e) { /* ignore malformed token */ }
  }
  const googleReady = () =>
    !!(GOOGLE_CLIENT_ID && window.google && window.google.accounts && window.google.accounts.id);
  function ensureGoogleInit() {
    if (!googleReady()) return false;
    try {
      window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleGoogleCredential });
      return true;
    } catch (e) { return false; }
  }
  const gIcon =
    '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">' +
    '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
    '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
    '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
    '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

  function renderGoogleSlot(slot) {
    slot.innerHTML = "";
    if (ensureGoogleInit()) {
      try {
        window.google.accounts.id.renderButton(slot, { theme: "outline", size: "large", text: "continue_with", width: 340 });
        return;
      } catch (e) { /* fall through to demo */ }
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-google";
    btn.innerHTML = gIcon + "<span>" + t("auth_google") + "</span>";
    btn.addEventListener("click", () => {
      loginWithProfile({ name: "Google User", email: "demo.user@gmail.com", provider: "google" });
    });
    slot.appendChild(btn);
    const note = document.createElement("div");
    note.className = "auth-note";
    note.textContent = t("auth_google_demo_note");
    slot.appendChild(note);
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

    /* ----- password reset view ----- */
    if (isReset) {
      body.innerHTML =
        '<h2 class="auth-title">' + t("auth_reset_title") + "</h2>" +
        '<p class="auth-note" style="text-align:left;margin-bottom:14px">' + t("auth_reset_desc") + "</p>" +
        '<div class="auth-err" hidden></div>' +
        '<form class="auth-form" novalidate>' +
        "<label>" + t("auth_email") + '</label><input name="email" type="email" autocomplete="email">' +
        "<label>" + t("auth_new_password") + '</label><input name="password" type="password" autocomplete="new-password">' +
        '<button class="btn btn-primary btn-block" type="submit">' + t("auth_reset_btn") + "</button>" +
        "</form>" +
        '<p class="auth-switch"><a data-switch="login">' + t("auth_back_login") + "</a></p>";
      const form = body.querySelector(".auth-form");
      const errBox = body.querySelector(".auth-err");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const d = new FormData(form);
        const res = resetPassword(d.get("email"), d.get("password"));
        if (res && res.error) { errBox.textContent = res.error; errBox.hidden = false; }
        else closeModal();
      });
      bindSwitches(body);
      return;
    }

    /* ----- login / signup view ----- */
    body.innerHTML =
      '<h2 class="auth-title">' + (isSignup ? t("auth_signup_title") : t("auth_login_title")) + "</h2>" +
      '<div class="auth-err" hidden></div>' +
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

    renderGoogleSlot(body.querySelector(".google-slot"));

    const form = body.querySelector(".auth-form");
    const errBox = body.querySelector(".auth-err");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const res = isSignup
        ? signup(data.get("name"), data.get("email"), data.get("password"))
        : login(data.get("email"), data.get("password"));
      if (res && res.error) { errBox.textContent = res.error; errBox.hidden = false; }
      else closeModal();
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
    const label = (u.name || u.email || "?").trim();
    const initial = label.charAt(0).toUpperCase();
    const first = label.split(" ")[0];
    area.innerHTML =
      '<div class="user-chip" id="user-chip" tabindex="0">' +
      (u.picture
        ? '<img class="avatar" src="' + u.picture + '" alt="" referrerpolicy="no-referrer">'
        : '<span class="avatar">' + initial + "</span>") +
      '<span class="user-name">' + first + "</span>" +
      '<span class="caret">▾</span>' +
      '<div class="user-menu" hidden>' +
      '<div class="user-menu-head"><div class="um-name">' + (u.name || "") +
      (u.admin ? ' <span class="role-badge">' + t("role_admin") + "</span>" : "") +
      '</div><div class="um-email">' + (u.email || "") + "</div></div>" +
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
    logout,
    updateProfile,
    changePassword,
    resetPassword,
    openModal,
    onChange: (cb) => listeners.push(cb),
    refresh: () => {
      renderAuthArea();
      if (modalEl && modalEl.classList.contains("open")) renderModalBody();
    },
  };

  renderAuthArea();
})();
