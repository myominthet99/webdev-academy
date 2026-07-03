# Course videos

Drop your training video files in this folder (e.g. `intro.mp4`), then point a
lesson at it from `js/data.js` using the **5th argument** of `video(...)`:

```js
video(
  "my-lesson",              // unique id
  "Lesson title",           // title
  "8 min",                  // duration label
  `<p>Written notes…</p>`,  // HTML shown under the player
  "videos/intro.mp4"        // ← the video source (this is the new part)
)
```

## Supported sources

| Source        | Example value                                   |
|---------------|-------------------------------------------------|
| Local file    | `"videos/intro.mp4"`                            |
| YouTube       | `"https://youtu.be/dQw4w9WgXcQ"` (or watch URL) |
| Vimeo         | `"https://vimeo.com/76979871"`                  |

## Tips
- Use **MP4 (H.264 video + AAC audio)** — it plays in every modern browser.
- Keep files reasonably small; large files stream slowly over the network.
- **Git note:** committing big video files bloats the repository. For anything
  large, host it on YouTube/Vimeo/a CDN and use the URL form instead of adding
  the file here.
- No video src on a lesson? The player just shows the placeholder + written
  notes — existing lessons keep working unchanged.
