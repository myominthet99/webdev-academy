/* =====================================================================
   WebDev Academy — Firebase configuration (ONE place to enable cloud)
   ---------------------------------------------------------------------
   HOW TO ENABLE (free, ~5 minutes):
   1. Go to https://console.firebase.google.com/ → "Add project"
      (free Spark plan is fine, Analytics not needed).
   2. Build → Realtime Database → Create Database → start in TEST MODE.
   3. Project settings (⚙ icon) → Your apps → Web app (</>) → register.
   4. Copy the firebaseConfig object it shows you and paste it below,
      replacing `null`. Make sure it includes `databaseURL`.

   Example:
   window.FIREBASE_CONFIG = {
     apiKey: "AIza...",
     authDomain: "your-app.firebaseapp.com",
     databaseURL: "https://your-app-default-rtdb.firebaseio.com",
     projectId: "your-app",
     storageBucket: "your-app.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abc123",
   };

   What turns on when this is set:
   • Community chat syncs across ALL devices in real time
   • Learning progress, notes, bookmarks, comments and quiz scores
     follow the user to any device (log in with the same email)

   ⚠ Test mode rules are open to the public — tighten them before
     sharing the site widely (Firebase Console → Realtime Database →
     Rules).
   ===================================================================== */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBUZO8zrCbJuR9HoJqhZeYtzQAGg6fc6JY",
  authDomain: "webdev-academy-872f9.firebaseapp.com",
  databaseURL: "https://webdev-academy-872f9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webdev-academy-872f9",
  storageBucket: "webdev-academy-872f9.firebasestorage.app",
  messagingSenderId: "573326380843",
  appId: "1:573326380843:web:54be6fce1d8e67fcf2bf6e",
};
