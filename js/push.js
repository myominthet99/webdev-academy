/* =====================================================================
   WebDev Academy — Web push notifications (Firebase Cloud Messaging)
   ---------------------------------------------------------------------
   Flow: a user taps "Enable notifications" → browser permission →
   FCM token (needs the VAPID key stored at stats/pushConfig.vapid) →
   token saved to stats/pushTokens/<token> so the admin's push sender
   (Cloudflare worker /push route) can fan out messages.
   Everything no-ops gracefully until the owner finishes the console
   setup (VAPID key + worker secrets).
   ===================================================================== */
(function () {
  "use strict";

  const cfg = window.FIREBASE_CONFIG;
  const base = cfg && cfg.databaseURL;

  async function enable() {
    if (!base) throw new Error("no-firebase");
    if (!("Notification" in window) || !("serviceWorker" in navigator)) throw new Error("unsupported");

    const perm = await Notification.requestPermission();
    if (perm !== "granted") throw new Error("denied");

    /* the VAPID key is published by the admin at stats/pushConfig */
    const pc = await fetch(base + "/stats/pushConfig.json").then((r) => r.json()).catch(() => null);
    if (!pc || !pc.vapid) throw new Error("not-configured");

    const [{ initializeApp }, msgMod] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js"),
    ]);
    const app = initializeApp(cfg, "wda-push");
    const messaging = msgMod.getMessaging(app);

    const reg = await navigator.serviceWorker.register("firebase-messaging-sw.js");
    const token = await msgMod.getToken(messaging, { vapidKey: pc.vapid, serviceWorkerRegistration: reg });
    if (!token) throw new Error("no-token");

    await fetch(base + "/stats/pushTokens/" + encodeURIComponent(token) + ".json", {
      method: "PUT",
      body: JSON.stringify({ ts: Date.now() }),
    });
    try { localStorage.setItem("wda_push_on", "1"); } catch (e) {}

    /* foreground messages → gentle in-app notification */
    msgMod.onMessage(messaging, (payload) => {
      const n = (payload && payload.notification) || {};
      try { new Notification(n.title || "WebDev Academy", { body: n.body || "", icon: "icon.svg" }); } catch (e) {}
    });
    return token;
  }

  window.Push = {
    enable: enable,
    enabled: () => { try { return localStorage.getItem("wda_push_on") === "1" && Notification.permission === "granted"; } catch (e) { return false; } },
    supported: () => "Notification" in window && "serviceWorker" in navigator,
  };
})();
