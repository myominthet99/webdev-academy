/* WebDev Academy — background push handler (Firebase Cloud Messaging).
   Registered by js/push.js when a user enables notifications. */
self.window = self; /* firebase-config.js assigns to window.* */
importScripts("js/firebase-config.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

if (self.FIREBASE_CONFIG) {
  firebase.initializeApp(self.FIREBASE_CONFIG);
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    const n = (payload && payload.notification) || {};
    const d = (payload && payload.data) || {};
    self.registration.showNotification(n.title || "WebDev Academy", {
      body: n.body || "",
      icon: "icon.svg",
      badge: "icon.svg",
      data: { url: d.url || "./" },
    });
  });
  self.addEventListener("notificationclick", (e) => {
    e.notification.close();
    const url = (e.notification.data && e.notification.data.url) || "./";
    e.waitUntil(clients.openWindow(url));
  });
}
