---
name: verify
description: Build/launch/drive recipe to verify WebDev Academy changes end-to-end in a real browser.
---

# Verifying WebDev Academy changes

Static site, no build step. Everything below was proven working on this machine.

## Launch

```bash
# port 5500 is often taken by an OLD copy of the app — always check first:
curl -s http://localhost:5500/js/app.js | grep -c "<some new symbol>"   # 0 = stale server, use another port
PORT=5510 node serve.js   # run from repo root, in background
```

## Drive (headless browser)

No Playwright in this repo. Use `playwright-core` + system Edge from a scratchpad
(`npm i playwright-core`, then `chromium.launch({ channel: "msedge", headless: true })`).
**Never touch the sibling `MecWise.Azure.PlayWright/` folder.**

Key facts for driving:

- **Block service workers** (`newContext({ serviceWorkers: "block" })`) — the SW
  auto-reloads the page when a new version takes control, which breaks scripts mid-run.
- **Hash routing**: navigate with `page.evaluate(() => location.hash = "#/...")`, not goto.
- **Login**: `window.Auth.openModal("login")`, fill `input[name=email]` /
  `input[name=password]`, click `.auth-form button[type=submit]`, wait for `#user-chip`.
- **Firebase is LIVE** (js/firebase-config.js): signup creates real Auth accounts and
  cloud-sync writes real rows under `sync/<email>`, plus `stats/leaderboard/<uid>`.
  Reuse the throwaway pattern: create one test account, and DELETE afterwards —
  sync rows one-by-one (rules only allow row-level writes; keys contain `::`, parse
  the shallow JSON properly), leaderboard entry by uid, and the Auth account via
  `accounts:signInWithPassword` → `accounts:delete` with the web apiKey.
- **After login, wait ~2-3s** for the cloud pull before asserting on progress/deck state.
- Course/quiz data is in `window.APP_DATA.COURSES` (not a bare `COURSES` global).
  Free courses have `free: true`; enroll via the `[data-enroll]` button on `#/course/<id>`.
- Lesson quiz: check radios `.q-block[data-q=N] input[name=qN][value=<answer>]`,
  click `[data-check-quiz]`; passing marks the lesson complete.

## Flows worth driving

- Home feed cards (`.daily-card`) render per login/progress state.
- `#/review` Daily Review: pass a quiz first, then session → finish → localStorage
  `wda_srs::<uid>` schedule (due dates, reps, ease) is the ground truth.
- Burmese: click `#lang-toggle`, re-visit the page, confirm strings render.
- Console errors: attach `page.on("console"/"pageerror")` — the app should be clean.
