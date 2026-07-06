/* =====================================================================
   WebDev Academy — Google Analytics (GA4)
   ---------------------------------------------------------------------
   HOW TO ENABLE (free, ~3 minutes):
   1. Go to https://analytics.google.com/ → Admin (⚙) → Create Property
      (name: WebDev Academy, timezone: Myanmar).
   2. Add a data stream → Web → https://mm-webdev-academy.netlify.app
   3. Copy the "Measurement ID" (looks like G-XXXXXXXXXX) and paste it
      below, then redeploy.

   What you get:
   • Visitors per day, country, device
   • Most-viewed pages AND most-viewed lessons (lesson_view event with
     course/lesson ids — see Reports → Engagement → Events)
   • Where students drop off (page paths track every hash route)
   ===================================================================== */
const GA_MEASUREMENT_ID = ""; // <-- paste your G-XXXXXXXXXX here

(function () {
  "use strict";
  if (!GA_MEASUREMENT_ID) return; /* analytics disabled until configured */

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  /* manual page_views — this is a hash-routed SPA, auto tracking misses it */
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  function pageview() {
    const hash = location.hash || "#/";
    const path = "/" + hash.replace(/^#\/?/, "");
    gtag("event", "page_view", {
      page_title: document.title,
      page_location: location.origin + location.pathname + hash,
      page_path: path,
    });
    /* Which lessons are most viewed → Reports → Engagement → Events */
    const parts = hash.replace(/^#\/?/, "").split("/");
    if (parts[0] === "learn" && parts[1] && parts[2]) {
      gtag("event", "lesson_view", { course_id: parts[1], lesson_id: parts[2] });
    } else if (parts[0] === "course" && parts[1]) {
      gtag("event", "course_view", { course_id: parts[1] });
    }
  }
  window.addEventListener("hashchange", pageview);
  pageview();
})();
