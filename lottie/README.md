# Lottie animations

Optional. The site works completely without this folder.

## The rule

The player (`js/vendor/lottie_light.min.js`, 164 KB, MIT) is **lazy-loaded**:
it downloads only the first time an animation actually plays, and it is
deliberately **not** in the service worker precache list in `sw.js`.

A student who never finishes a lesson never downloads a byte of it. Keep it
that way — do not add it to `ASSETS` in `sw.js`, and do not load it at boot.

## Using one

```js
playLottie(document.getElementById("mount"), "lottie/celebrate.json");
```

`playLottie` resolves `false` and does nothing if the player, the file, or
the network is unavailable, or if the user has `prefers-reduced-motion`.
**Callers must always have a CSS/emoji fallback already on screen** — Lottie
is a bonus, never a requirement. See `showCelebration()` in `js/app.js`.

## Ready-made slots — the shopping list

These filenames are **already wired in the app**. Download a matching `.json`
from lottiefiles.com, save it here under the exact name, and the screen
upgrades automatically — no code change. Until then the emoji fallback shows.

| Save as | Plays on | LottieFiles search to use |
| --- | --- | --- |
| `celebrate.json` | Lesson-complete overlay (✅ already here) | "success celebration badge particle burst" |
| `quiz-pass.json` | Quiz passed result line (🎉) | "correct checkmark green tick micro-interaction" |
| `quiz-fail.json` | Quiz failed result line (📚) | "wrong answer shake cross icon red" |
| `trophy.json` | Mock-interview finish (🏆) | "trophy level up reward gamification" |
| `certificate.json` | Certificate page, above the buttons (🎓) | "certificate graduation diploma ribbon" |
| `streak.json` | Home streak-at-risk nudge (🔥, loops) | "streak fire flame day counter" |

Tip: add "minimal", "flat" or "vector" to those searches to get clean UI
animations that stay small.

## Adding your own

Download a `.json` from lottiefiles.com and drop it here.

**Check the licence for each animation individually.** LottieFiles' free tier
mixes licences: some are free for any use, some require attribution, some are
personal-use only. This is a public site, so "free to download" is not the
same as "free to use here".

Keep files small — under ~50 KB. Every KB is paid for by a student on mobile
data.

`celebrate.json` was hand-authored for this repo. No attribution needed.
