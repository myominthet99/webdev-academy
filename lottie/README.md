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

## The slots — all present & hand-authored

Every slot below is **wired in the app AND filled** with a small, original
animation hand-authored for this repo (2–6 KB each). No attribution needed,
no licence to track. To restyle one, just edit its `.json` and re-save — the
screen upgrades with no code change. Delete one and the emoji fallback shows.

| File | Plays on | What it is |
| --- | --- | --- |
| `celebrate.json` | Lesson-complete overlay | Gold star + expanding purple ring |
| `quiz-pass.json` | Quiz passed result line (was 🎉) | Green disc + drawn white check |
| `quiz-fail.json` | Quiz failed result line (was 📚) | Red disc + white cross with a shake |
| `trophy.json` | Mock-interview finish (was 🏆) | Gold star pop, ring burst + sparkles |
| `certificate.json` | Certificate page (was 🎓) | Purple seal + gold rosette + check |
| `streak.json` | Home streak-at-risk nudge (was 🔥, loops) | Flickering two-tone flame |

Colors match the design system on purpose (green = success, red = danger,
purple = brand, gold = reward), so they read as one set.

## Adding or replacing one

Hand-author a small file (see any existing one as a template — they're plain
shape layers with keyframed transforms), or download a `.json` from
lottiefiles.com and drop it here under the wired name.

**If you download:** check the licence for each animation individually.
LottieFiles' free tier mixes licences — some are free for any use, some
require attribution, some are personal-use only. This is a public site, so
"free to download" is not the same as "free to use here". The hand-authored
files above avoid this entirely.

Keep files small — under ~50 KB. Every KB is paid for by a student on mobile
data. (These are all well under 6 KB.)
