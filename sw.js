/* WebDev Academy — service worker (offline app shell)
   Strategy: NETWORK-FIRST for same-origin requests — users always get
   fresh code when online; the cache is only an offline fallback.
   Still bump CACHE per release so stale precaches get purged. */
const CACHE = "wda-v107";
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/firebase-config.js",
  "./js/analytics.js",
  "./js/data-core.js",
  "./js/data-content.js",
  "./js/i18n.js",
  "./js/auth.js",
  "./js/ai.js",
  "./js/push.js",
  "./js/app.js",
  "./js/chat.js",
  "./js/cloud-sync.js",
  "./manifest.json",
  "./icon.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Only handle same-origin requests; let CDN/video/Google/Firebase go to network.
  if (url.origin !== location.origin) return;
  // Network-first: phones rarely get a hard refresh, and the old cache-first
  // strategy left them stuck running outdated JS forever.
  e.respondWith(
    fetch(req)
      .then((res) => {
        /* only cache good responses — a transient 404/500 must not
           overwrite a working cached copy */
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => {
          if (hit) return hit;
          /* index.html fallback is only correct for page navigations —
             serving HTML as a script/style breaks the page worse */
          if (req.mode === "navigate") return caches.match("./index.html");
          return Response.error();
        })
      )
  );
});
