/* =====================================================================
   WebDev Academy — free AI relay (Cloudflare Worker) with FAILOVER
                     + push notifications (manual + scheduled streak reminders)

   Gemini is geo-blocked in Myanmar and its free tier is ~15 req/min.
   This worker relays browser AI requests and falls back automatically:
     1. Try Google Gemini  (env.GEMINI_KEY)  — best Burmese
     2. If Gemini is rate-limited / errors → Groq (env.GROQ_KEY) — free,
        fast, much higher limits (OpenAI-style request/response converted
        to/from Gemini's shape, so the website needs NO changes).

   SETUP (AI):
     • Secret GEMINI_KEY = your Gemini key
     • Secret GROQ_KEY   = your Groq key (console.groq.com → API Keys)

   🔔 PUSH — TWO ways to notify:
     • POST /push  — admin fan-out to EVERY saved token (dashboard button)
     • scheduled() — a CRON trigger that sends a "keep your streak!" reminder
       only to students whose streak is about to break (studied yesterday,
       not yet today) at ~7pm in their own timezone.
   PUSH SETUP:
     • Secret FCM_SA      = the FULL service-account JSON (Firebase console
       → Project settings → Service accounts → Generate new private key).
       The worker uses it to authenticate BOTH FCM sends AND its Realtime
       Database reads/writes (the security rules require it).
     • Secret PUSH_SECRET = any long random password; the admin dashboard
       asks for it once and sends it as X-Push-Secret (guards /push).
     • CRON: Cloudflare → your Worker → Settings → Triggers → Cron Triggers
       → add  0 * * * *  (hourly). The reminder logic self-limits to one
       send per student per day (at their local 7pm).
   ===================================================================== */

/* Mint a Google OAuth2 access token from the service account. Scoped for
   BOTH Cloud Messaging and the Realtime Database, so the same token sends
   pushes AND authenticates DB REST calls as admin (bypassing the rules). */
async function saAccessToken(env) {
  const sa = JSON.parse(env.FCM_SA);
  const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const enc = (obj) => b64url(new TextEncoder().encode(JSON.stringify(obj)));
  const now = Math.floor(Date.now() / 1000);
  const unsigned = enc({ alg: "RS256", typ: "JWT" }) + "." + enc({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/firebase.messaging https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
  });
  const pem = sa.private_key.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const keyData = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", keyData, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
  const jwt = unsigned + "." + b64url(sig);
  const tokRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + jwt,
  });
  const tok = await tokRes.json();
  if (!tok.access_token) throw new Error("oauth failed");
  return {
    access: tok.access_token,
    projectId: sa.project_id,
    dbUrl: "https://" + sa.project_id + "-default-rtdb.asia-southeast1.firebasedatabase.app",
  };
}

/* Send one FCM message. Returns the raw fetch Response. */
function fcmSend(access, projectId, token, title, body, url) {
  return fetch("https://fcm.googleapis.com/v1/projects/" + projectId + "/messages:send", {
    method: "POST",
    headers: { "Authorization": "Bearer " + access, "Content-Type": "application/json" },
    body: JSON.stringify({ message: {
      token: token,
      notification: { title: title, body: body },
      data: { url: url },
      webpush: { fcm_options: { link: url } },
    } }),
  });
}

const SITE = "https://myominthet99.github.io/webdev-academy/";

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Push-Secret",
    };
    const json = (obj, status) =>
      new Response(JSON.stringify(obj), { status, headers: Object.assign({ "Content-Type": "application/json" }, cors) });
    const textOf = (parts) => (parts || []).map((p) => (p && p.text) || "").join("");

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: { message: "POST only" } }, 405);

    /* ---------------- 🔔 /push — admin notification fan-out ---------------- */
    if (new URL(request.url).pathname === "/push") {
      if (!env.FCM_SA || !env.PUSH_SECRET) return json({ error: { message: "push not configured (FCM_SA / PUSH_SECRET secrets missing)" } }, 500);
      if (request.headers.get("X-Push-Secret") !== env.PUSH_SECRET) return json({ error: { message: "bad secret" } }, 403);

      let p;
      try { p = await request.json(); } catch (e) { return json({ error: { message: "bad JSON" } }, 400); }
      const title = String(p.title || "").slice(0, 80);
      const bodyTxt = String(p.body || "").slice(0, 200);
      const url = String(p.url || SITE);
      if (!title || !bodyTxt) return json({ error: { message: "title and body required" } }, 400);

      let auth;
      try { auth = await saAccessToken(env); } catch (e) { return json({ error: { message: "oauth failed" } }, 502); }
      const { access, projectId, dbUrl } = auth;

      /* read every saved token (authenticated as admin) and fan out */
      const all = await fetch(dbUrl + "/stats/pushTokens.json?access_token=" + access).then((r) => r.json()).catch(() => null) || {};
      const tokens = Object.keys(all);
      let sent = 0, dead = 0;
      for (const t of tokens.slice(0, 500)) {
        const res = await fcmSend(access, projectId, decodeURIComponent(t), title, bodyTxt, url);
        if (res.ok) sent++;
        else if (res.status === 404 || res.status === 400) {
          dead++;
          await fetch(dbUrl + "/stats/pushTokens/" + t + ".json?access_token=" + access, { method: "DELETE" }).catch(() => {});
        }
      }
      return json({ sent: sent, removed: dead, total: tokens.length }, 200);
    }

    /* ------- 🔔 /notify — drain the mention/reply queue (no secret) -------
       The website writes shape-validated rows to RTDB /notify (auth-gated,
       banned users can't) and pings this route. We read the queue as admin,
       send an FCM to every push token owned by each target uid, and delete
       the rows. Rows older than 15 min are dropped unsent, so a spammed
       ping can never replay old notifications. */
    if (new URL(request.url).pathname === "/notify") {
      if (!env.FCM_SA) return json({ error: { message: "push not configured" } }, 500);
      let auth;
      try { auth = await saAccessToken(env); } catch (e) { return json({ error: { message: "oauth failed" } }, 502); }
      const { access, projectId, dbUrl } = auth;

      const q = await fetch(dbUrl + "/notify.json?access_token=" + access).then((r) => r.json()).catch(() => null) || {};
      const ids = Object.keys(q);
      if (!ids.length) return json({ sent: 0 }, 200);

      /* index tokens by owner uid (uid is written by the site on enable) */
      const all = await fetch(dbUrl + "/stats/pushTokens.json?access_token=" + access).then((r) => r.json()).catch(() => null) || {};
      const byUid = {};
      for (const tk of Object.keys(all)) {
        const m = all[tk];
        if (m && m.uid) (byUid[m.uid] = byUid[m.uid] || []).push({ tk: tk, lang: m.lang });
      }

      let sent = 0;
      const now = Date.now();
      for (const id of ids.slice(0, 50)) {
        const it = q[id] || {};
        /* consume the row first — every path below deletes it exactly once */
        await fetch(dbUrl + "/notify/" + id + ".json?access_token=" + access, { method: "DELETE" }).catch(() => {});
        if (!it.to || !it.ts || now - Number(it.ts) > 15 * 60 * 1000) continue;
        const room = String(it.room || "community");
        const url = SITE + (room !== "community" ? "#/course/" + encodeURIComponent(room) : "#/community");
        for (const rec of (byUid[it.to] || []).slice(0, 5)) {
          const my = rec.lang === "my";
          const from = String(it.from || "?").slice(0, 40);
          const title = it.type === "reply"
            ? (my ? "↩ " + from + " က ပြန်ဖြေထားပါတယ်" : "↩ " + from + " replied to you")
            : (my ? "💬 " + from + " က သင့်ကို ခေါ်ထားပါတယ်" : "💬 " + from + " mentioned you");
          const res = await fcmSend(access, projectId, decodeURIComponent(rec.tk), title, String(it.text || "").slice(0, 140), url);
          if (res.ok) sent++;
          else if (res.status === 404 || res.status === 400)
            await fetch(dbUrl + "/stats/pushTokens/" + rec.tk + ".json?access_token=" + access, { method: "DELETE" }).catch(() => {});
        }
      }
      return json({ sent: sent }, 200);
    }

    /* ---------------- 🤖 AI relay (Gemini → Groq failover) ---------------- */
    let payload;
    try { payload = await request.json(); }
    catch (e) { return json({ error: { message: "bad JSON" } }, 400); }

    const model = String(payload.model || "gemini-2.5-flash").replace(/[^a-zA-Z0-9.\-]/g, "");
    const body = payload.body || {};

    /* 1) Gemini first (best Burmese) */
    if (env.GEMINI_KEY) {
      try {
        const g = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + env.GEMINI_KEY,
          { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
        );
        if (g.ok) return new Response(await g.text(), { status: 200, headers: Object.assign({ "Content-Type": "application/json" }, cors) });
        /* not ok (429 rate-limit, 5xx…) → fall through to Groq */
      } catch (e) { /* network error → fall through */ }
    }

    /* 2) Groq fallback — convert Gemini request → OpenAI chat, and the
          reply back into Gemini's shape so js/ai.js parses it unchanged */
    if (env.GROQ_KEY) {
      try {
        const sys = textOf(body.systemInstruction && body.systemInstruction.parts);
        const user = (body.contents || []).map((c) => textOf(c.parts)).filter(Boolean).join("\n\n");
        const cfg = body.generationConfig || {};
        const messages = [];
        if (sys) messages.push({ role: "system", content: sys });
        messages.push({ role: "user", content: user || "Hello" });

        const gr = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": "Bearer " + env.GROQ_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: messages,
            max_tokens: cfg.maxOutputTokens || 2048,
            temperature: cfg.temperature == null ? 0.7 : cfg.temperature,
          }),
        });
        const gj = await gr.json().catch(() => ({}));
        if (gr.ok && gj.choices && gj.choices[0] && gj.choices[0].message) {
          const out = gj.choices[0].message.content || "";
          return json({ candidates: [{ content: { parts: [{ text: out }] } }] }, 200);
        }
        return json(gj && gj.error ? gj : { error: { message: "Groq failed" } }, gr.status || 502);
      } catch (e) {
        return json({ error: { message: "AI temporarily unavailable — please try again" } }, 502);
      }
    }

    return json({ error: { message: "No AI provider configured" } }, 500);
  },

  /* ---------------- 🔥 scheduled — daily streak reminders ----------------
     Runs on the CRON trigger (set it to hourly: 0 * * * *). For each saved
     token it reminds ONLY students whose streak is alive but at risk
     (studied yesterday, not yet today) and only at ~7pm in their own
     timezone, so it self-limits to one gentle nudge per student per day. */
  async scheduled(event, env, ctx) {
    if (!env.FCM_SA) return;
    let auth;
    try { auth = await saAccessToken(env); } catch (e) { return; }
    const { access, projectId, dbUrl } = auth;

    const all = await fetch(dbUrl + "/stats/pushTokens.json?access_token=" + access).then((r) => r.json()).catch(() => null) || {};
    const now = new Date();
    const yUTC = new Date(now.getTime() - 86400000).toISOString().slice(0, 10);
    const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString().slice(0, 10);
    const jobs = [];
    const kill = (tk, res) => {
      if (res.status === 404 || res.status === 400)
        return fetch(dbUrl + "/stats/pushTokens/" + tk + ".json?access_token=" + access, { method: "DELETE" }).catch(() => {});
    };

    for (const tk of Object.keys(all)) {
      const m = all[tk];
      if (!m || typeof m !== "object") continue;
      /* local wall-clock from the stored getTimezoneOffset() (minutes to add
         to local → UTC): local = UTC − offset */
      const tz = Number(m.tz) || 0;
      const localNow = new Date(now.getTime() - tz * 60000);
      const localHour = localNow.getUTCHours();
      const localDow = localNow.getUTCDay(); /* 0 = Sunday */
      const streak = Number(m.streak) || 0;
      const my = m.lang === "my";

      /* 🔥 daily streak reminder — 19:00 local, only if the streak is at risk
         (studied yesterday, not yet today). One nudge per student per day. */
      if (m.last === yUTC && localHour === 19) {
        const title = my ? "🔥 Streak ကို ဆက်ထိန်းပါ!" : "🔥 Keep your streak alive!";
        const body = my
          ? (streak > 1 ? streak + " ရက်ဆက် streak မပျက်အောင် ဒီနေ့ သင်ခန်းစာတစ်ခု လုပ်လိုက်ပါ!" : "ဒီနေ့ သင်ခန်းစာတစ်ခုနဲ့ streak စလိုက်ပါ!")
          : (streak > 1 ? "Do one lesson today so your " + streak + "-day streak doesn't break!" : "Do one lesson today to keep your streak going!");
        jobs.push(fcmSend(access, projectId, decodeURIComponent(tk), title, body, SITE + "#/").then((res) => kill(tk, res)).catch(() => {}));
      }

      /* 📊 weekly recap — Sunday 18:00 local, to anyone who studied in the
         last 7 days. Points at #/recap. One send per student per week. */
      if (localDow === 0 && localHour === 18 && m.last && m.last >= weekAgo) {
        const title = my ? "📊 သင့်တစ်ပတ်တာ — WebDev Academy" : "📊 Your week on WebDev Academy";
        const body = my
          ? (streak > 0 ? "🔥 " + streak + " ရက် streak! သင့် recap ကြည့်ပြီး ဆက်လုပ်ပါ။" : "သင့်တစ်ပတ်တာ recap ကြည့်ပြီး နောက်တစ်ဆင့် ဆက်တက်ပါ!")
          : (streak > 0 ? "🔥 " + streak + "-day streak! Open your recap and keep it going." : "See your week's recap and pick your next step!");
        jobs.push(fcmSend(access, projectId, decodeURIComponent(tk), title, body, SITE + "#/recap").then((res) => kill(tk, res)).catch(() => {}));
      }
    }
    ctx.waitUntil(Promise.allSettled(jobs));
  },
};
