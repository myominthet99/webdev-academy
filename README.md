# WebDev Academy 🎓

A **Udemy-style learning platform** for a web-development course, built as a self-contained single-page app with **plain HTML, CSS, and JavaScript** — no build step, no dependencies.

## ✨ Features

- **Home page** with hero, featured courses, and topic chips
- **Course catalog** with category filtering and a working search bar
- **Course detail pages** — ratings, what-you'll-learn, instructor, and an expandable curriculum (accordion)
- **Lesson player** — video-style stage, readable lesson content with syntax-highlighted code, and a curriculum sidebar with completion checkmarks
- **Interactive quizzes** that grade your answers and auto-complete the lesson when you pass
- **Daily Review (spaced repetition)** — every question from a quiz you pass becomes a flashcard that comes back right before you'd forget it (1d → 3d → longer, SM-2 style). Earns XP, keeps your streak, syncs across devices. `#/review`
- **Progress tracking** — enroll, mark lessons complete, per-course progress bars, and a "My Learning" dashboard
- **Persistence** — everything saves to the browser's `localStorage`, so your progress survives refreshes (no account needed)
- **Real content** — a full *Complete Web Development Bootcamp* (HTML, CSS, JavaScript, responsive design, a final project) plus 4 more courses

## ▶️ How to run

It's just static files. Any of these work:

1. **Double-click `index.html`** to open it in your browser, **or**
2. Serve the folder (recommended, avoids any browser file restrictions):

   ```bash
   # Python 3
   python -m http.server 5500
   # then open http://localhost:5500

   # or, with Node
   npx serve .
   ```

3. In **VS Code**, right-click `index.html` → **Open with Live Server**.

## 🔐 Login (accounts)

Click **Log in** (top-right) to create an account or sign in. There are two ways:

- **Email + password** — a self-contained account stored in this browser.
- **Continue with Google** — real Google Sign-In once configured (see below); otherwise it runs in a built-in **demo mode**.

Progress (enrollments + completed lessons) is saved **per account**, so different users on the same browser keep separate progress. Logged out, you still get a shared "guest" bucket.

> ⚠️ **Demo only, not real security.** There is no server — accounts and (hashed) passwords live in `localStorage`. Don't use a real password.

### Enable real Google sign-in
1. Create an **OAuth 2.0 Client ID** (type: *Web application*) at [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
2. Add your origin (e.g. `http://localhost:5500`) under **Authorized JavaScript origins**.
3. Paste the Client ID into `GOOGLE_CLIENT_ID` at the top of [js/auth.js](js/auth.js).

## 🚀 Deploy (go live)

This is a **static site with hash-based routing**, so it runs on any static host with **zero configuration** — no build step, no server rewrites.

**Easiest — Netlify Drop (no account, ~30 seconds):**
1. Open <https://app.netlify.com/drop>
2. Drag the whole `WebDevAcademy` folder (or `WebDevAcademy-deploy.zip`) onto the page.
3. You get a live HTTPS URL instantly (e.g. `https://your-name.netlify.app`).

**GitHub Pages (free, needs a GitHub account):**
1. Create a new repo and push the **contents** of `WebDevAcademy/` to it.
2. Repo **Settings → Pages → Deploy from a branch → `main` / root**.
3. Site appears at `https://<user>.github.io/<repo>/`.

**Vercel:** import the repo, framework preset **Other**, no build command, output dir = root.

Notes:
- Serve over **HTTPS** so video, Google sign-in, and (optional) Firebase all work.
- For real Google login, add your deployed origin to the OAuth **Authorized JavaScript origins** (see the Login section).

## 💬 Community chat

A 💬 bubble (bottom-right) opens a group chat. Features:
- **Per-room:** a global **Community** room, plus a separate room for each course (the chat follows you onto a course/lesson page).
- **Delete your own messages** (🗑 on your bubbles) — with an ownership guard.
- **Moderation:** 🚩 report a message (goes to an admin queue at `#/admin/reports`), 🚫 block a user (hides their messages on your account, synced across your devices), and ⛔ admin ban (server-enforced — a banned account can't post anywhere). Plus an anti-spam rate limit and a word-mask hook (`BADWORDS` in [js/chat.js](js/chat.js)).
- **Server-enforced security:** every cloud write carries the user's Firebase login token, and [firebase-rules.json](firebase-rules.json) enforces that you can only edit your own messages, read your own progress/premium, and that Premium can't be self-granted. **When deploying, follow [DEPLOY-SECURITY.md](DEPLOY-SECURITY.md)** — the rules and site code must ship together.
- You must be **logged in** to post.

By default it uses **localStorage** and syncs live **between tabs of the same browser** (open two tabs, log in as two accounts, and chat). There is no server, so it does **not** sync across different devices — for that, enable Firebase below.

### Enable real cross-device chat + cloud progress sync (Firebase)
1. Go to the [Firebase Console](https://console.firebase.google.com/) → **Add project** (free "Spark" plan is fine).
2. **Build → Realtime Database → Create Database** → start in **test mode** (you can tighten rules later).
3. Project settings (⚙) → **Your apps → Web (`</>`)** → register the app → copy the **`firebaseConfig`** object.
4. Paste it into **one file**: [js/firebase-config.js](js/firebase-config.js), replacing `null`:
   ```js
   window.FIREBASE_CONFIG = {
     apiKey: "…", authDomain: "…", databaseURL: "https://…firebaseio.com",
     projectId: "…", storageBucket: "…", messagingSenderId: "…", appId: "…",
   };
   ```
5. Save & redeploy. Two things turn on automatically:
   - **Chat** syncs across every device in real time.
   - **Cloud progress sync** ([js/cloud-sync.js](js/cloud-sync.js)): enrollments, completed lessons, notes, bookmarks, quiz scores, comments, reviews and admin-created courses follow each user (keyed by login email) to any device.

> The `databaseURL` field is required for Realtime Database. Tighten the security rules before going public (e.g. require auth, validate message shape).

## 📁 Structure

```
WebDevAcademy/
├─ index.html        App shell (header, search, footer)
├─ css/styles.css    All styling (Udemy-inspired theme)
└─ js/
   ├─ data.js        Course catalog + lesson content & quizzes
   ├─ i18n.js        English + Myanmar translations
   ├─ auth.js        Login / signup / Google (client-side accounts)
   └─ app.js         Router, views, progress tracking, quiz logic
```

## 🧩 Add your own course

Open `js/data.js` and push a new object onto `COURSES`. Each course has `sections`, and each section has `lessons` created with the `video()`, `article()`, or `quiz()` helpers. Code samples inside lesson HTML must be HTML-escaped (`&lt;` for `<`, `&gt;` for `>`).

---

Tip: reset all progress by running `localStorage.removeItem('wda_state_v1')` in the browser console.
