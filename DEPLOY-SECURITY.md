# 🔐 Security upgrade — deploy checklist (chat v20)

This release closes real holes: before it, **anyone with the database URL could
post/delete any chat message, grant themselves Premium for free, and read every
student's progress by email.** The client now sends the Firebase login token on
every write, and [firebase-rules.json](firebase-rules.json) enforces auth.

> ⚠️ **The rules and the client must ship together.** If you publish the new
> rules but serve the old JS (or vice-versa), writes will fail for real users.
> Deploy the code first, confirm it's live, then publish the rules.

## 0. One-time: this admin email is hard-coded in the rules

The rules grant admin power to **`mmtboy90@gmail.com`** (matching `ADMIN_EMAILS`
in [js/auth.js](js/auth.js)). If you change the admin, update BOTH files — search
`mmtboy90@gmail.com` in `firebase-rules.json` (it appears in several rules).

## 1. Deploy the site code

Push the updated `js/*.js`, `css/styles.css`, `sw.js` (cache bumped to `v114`)
as usual (GitHub Pages / Netlify). Load the site, hard-refresh, and confirm the
chat header shows **`v20☁`**. Everything still works on the OLD rules at this
point, because the old rules are permissive — this step is safe on its own.

## 2. TEST the rules in the simulator BEFORE publishing

Firebase Console → **Realtime Database → Rules → Rules Playground**. The rules
are security-critical and a mistake locks out real students, so verify these
cases (Authenticated = a normal student uid; Admin = the admin email token):

| Location | Auth | Expect |
|---|---|---|
| `rooms/community/messages/x` (write, `userId` = my uid) | student | ✅ allow |
| `rooms/community/messages/x` (write, `userId` = someone else) | student | ❌ deny |
| `rooms/community/messages/x` (delete, message I don't own) | student | ❌ deny |
| any message (delete) | admin | ✅ allow |
| `premium/<any>` (write) | student | ❌ deny |
| `premium/<my emailkey>` (read) | student | ✅ allow |
| `premium/<other emailkey>` (read) | student | ❌ deny |
| `banned/<uid>` (write) | admin | ✅ allow |
| any message (write) when `banned/<my uid>` exists | that student | ❌ deny |
| `sync/<my emailkey>/x` (read/write) | student | ✅ allow |
| `sync/<other emailkey>/x` (read) | student | ❌ deny |
| `reports/x` (write, `by` = my uid) | student | ✅ allow |
| `reports` (read) | student | ❌ deny |
| `reports` (read) | admin | ✅ allow |

## 3. Publish the rules

Paste `firebase-rules.json` into the Rules editor → **Publish**.

## 4. Smoke-test on the LIVE site (2 accounts)

1. Student A logs in → post a message → ✅ appears.
2. Student A → 🚩 report B's message; 🚫 block B (B's messages vanish for A only).
3. Admin opens **#/admin/reports** → sees the report → **Delete message** and/or
   **Ban author** → banned account can no longer post (they see "banned" notice).
4. Try the old attack: in a logged-out console,
   `fetch(DB+'/premium/whoever,gmail,com.json',{method:'PUT',body:'{"since":1}'})`
   → must now return **401**, not 200.

## What each data path requires now

- **chat messages** — author (by uid) or admin to write/delete; anyone signed-in
  may add a reaction (`reactions/<emoji>` subpath) or, for the author/admin, pin.
  Banned uids are refused everywhere.
- **premium / payments / sync** — only the owning account (by email) or admin.
  Payment claims can only be created in `status:"pending"` (you approve them).
- **leaderboard / reviews** — write only your own uid's row.
- **reports** — any signed-in user can file; only admin can read/clear.
- **banned** — only admin writes; enforced by every `rooms/.../messages` write.

## Notes / limitations

- **Block** (🚫) is personal and client-side (synced across your own devices via
  the `wda_blk` key). **Ban** (⛔) is global and server-enforced.
- A banned user's OLD messages stay until an admin deletes them; the ban only
  blocks new writes.
- The email→key mapping in the rules mirrors `emailKey()` in the app
  (`. # $ [ ] / %` → `,`). If you ever change that function, change the rules.
- Rules can't be unit-tested from this repo without deploying to a Firebase
  project — hence the simulator step (#2). The client half (tokens attached to
  every write) was verified in a real browser.
