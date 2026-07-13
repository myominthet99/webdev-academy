---
name: WebDev Academy
colors:
  primary: "#a435f0"
  primary-dark: "#8710d8"
  ink: "#1c1d1f"
  navy: "#2d2f31"
  muted: "#6a6f73"
  line: "#e4e8eb"
  bg: "#f7f9fa"
  surface: "#ffffff"
  surface-2: "#f7f9fa"
  star: "#e59819"
  green: "#16794c"
  success: "#1a7f43"
  success-bg: "#e9f9ef"
  danger: "#c0392b"
  warn: "#a86400"
  warn-bg: "#fff4e0"
typography:
  body:
    fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Myanmar Text", "Padauk", "Noto Sans Myanmar", sans-serif
    fontSize: 16px
    lineHeight: 1.5
  section-title:
    fontFamily: "{typography.body.fontFamily}"
    fontSize: 24px
    fontWeight: 700
  question:
    fontFamily: "{typography.body.fontFamily}"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.5
  small-label:
    fontFamily: "{typography.body.fontFamily}"
    fontSize: 13px
    fontWeight: 700
  code:
    fontFamily: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace
    fontSize: 14px
rounded:
  sm: 8px
  md: 10px
  lg: 12px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 22px
  xl: 32px
components:
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: 22px 24px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  chip:
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.surface-2}"
  quiz-option:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
---

## Overview

WebDev Academy is a Udemy-inspired learning platform for Myanmar teenagers
learning to code. The UI is friendly, dense-but-tidy, and emoji-forward:
every feature leads with one emoji glyph (🧠 review, 🎯 daily challenge,
⚔️ battle, 🫂 community) instead of icon fonts. It is a zero-dependency
static site — all styling lives in `css/styles.css` as plain CSS with
custom properties; there is no build step, no CSS framework.

Two hard rules govern all new UI:

1. **Use the CSS variables, never raw hex.** Light and dark themes are the
   same stylesheet; `[data-theme="dark"]` re-points the variables. Any
   hard-coded color breaks one of the two themes.
2. **Reuse the existing component classes** (`.panel`, `.btn`, `.chip`,
   `.qc-opt`, `.daily-card`, `.progress`, `.stat`) before inventing new
   ones. New classes should be feature-prefixed (e.g. `.srs-*`, `.bt-*`).

## Colors

- **Primary (#a435f0):** Udemy-style purple. Drives all interaction —
  primary buttons, active nav, progress bars, focused stats. Hover state is
  `primary-dark` (#8710d8).
- **Ink (#1c1d1f):** Core text. Always via `var(--ink)` so dark theme can
  flip it to `#e6e7e9`.
- **Muted (#6a6f73):** Captions, metadata, helper text (`.muted` class).
- **Line (#e4e8eb):** All borders and dividers (`var(--line)`).
- **Bg / Surface / Surface-2:** Page background, cards, and inset fields.
  Panels sit on `surface` with a `line` border; inputs and quiz options sit
  on `surface-2`.
- **Green (#16794c) / success pair:** Correct answers, pass states, earned
  XP. Quiz feedback uses `success` text on `success-bg`.
- **Danger (#c0392b):** Wrong answers (border + shake animation), never
  large fills.
- **Star (#e59819):** Ratings only.

## Typography

One system font stack everywhere, with Myanmar fallbacks (`Myanmar Text`,
`Padauk`, `Noto Sans Myanmar`) baked in — the app is fully bilingual
(English/Burmese via `js/i18n.js`).

- Burmese mode (`body.lang-my`) raises line-height to 1.7 (1.9 in long-form
  reader prose). Never set a tight fixed height on text containers.
- Headings are bold weights of the body stack, no display font.
  `.section-title` (24px) + `.section-sub` (muted) introduce every page.
- Code samples use the monospace stack inside `.reader pre` blocks.
- All user-facing strings go through `t("key")` with an entry in BOTH the
  `en` and `my` dictionaries in `js/i18n.js` — never hard-code copy.

## Layout

- Single `.container` column, `max-width` per page type: reading/quiz pages
  560–680px, catalogs and dashboards wider grids.
- Pages are stacks of `.panel` blocks separated by 22px margins.
- Home page is a feed: nudge banners, then `.daily-card` action rows
  (icon | text | button), then course card grids (`.grid`).
- Mobile gets a fixed bottom tab bar (`#tabbar`); desktop gets the sticky
  top bar. New routes must map to a tab in `router()`.

## Elevation & Depth

Almost flat. Cards use `--card-shadow` (two soft layers) only where they
are clickable; static panels rely on the 1px `line` border. No z-depth
games beyond the sticky topbar and chat widget.

## Shapes

- Default radius 10px (`--radius`) for panels and cards.
- Fully-rounded pills (999px) for chips, badges, progress bars, and the
  language toggle.
- Quiz options are 12px-rounded full-width rows with a 2px border that
  recolors on hover (purple), correct (green), wrong (red + shake).

## Components

- **`.panel`** — the universal card: surface bg, line border, 22×24 padding.
- **`.btn`** — variants: `btn-primary` (purple fill), `btn-outline`
  (surface + ink border), `btn-ghost` (transparent + purple border);
  sizes: default and `btn-sm`; `btn-block` for full width.
- **`.daily-card`** — home-feed action row: emoji `.dc-ic`, stacked
  `.dc-txt` (bold title + muted sub), trailing small button. Add `.done`
  when the action is completed for the day.
- **`.qc-opt`** — tappable quiz answer; add `.right` / `.wrong` after
  answering, then disable all options.
- **`.progress`** — purple fill bar in a pill track; pair with a percent
  width on the inner `span`.
- **`.stat`** — big number over a small muted label (hero badges,
  `.srs-stats` review header).
- **`.chip`** — pill link for categories and tools.

## Do's and Don'ts

- **Do** award XP through `addBonusXp()` + `pushLeaderboard()` and show it
  as `+N XP` — XP amounts are part of the visual language (green, bold).
- **Do** keep every screen usable logged-out where possible; gate with the
  login modal (`window.Auth.openModal`), not dead ends.
- **Do** write celebratory microcopy with one emoji (🎉, 🔥, 💪) — the
  audience is teenagers; keep it warm, never corporate.
- **Don't** hard-code colors, fonts, or English strings in markup.
- **Don't** add external assets (fonts, icon sets, CSS libs) — the site
  must stay self-contained and offline-friendly (service worker).
- **Don't** use `alert()`/`confirm()` for feedback — inline `.tl-status`
  lines or toasts. (Exception: destructive/irreversible moderation actions —
  block, ban, report — use a `confirm()` guard on purpose.)
- **Do** send the Firebase login token on every cloud write: use
  `authFetch()` in [js/app.js](js/app.js) and `withAuth()` in
  [js/chat.js](js/chat.js), never a bare `fetch()` to the database. The
  security rules ([firebase-rules.json](firebase-rules.json)) reject
  unauthenticated writes and cross-account reads — a plain `fetch` will 401.
