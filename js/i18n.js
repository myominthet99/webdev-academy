/* =====================================================================
   WebDev Academy — bilingual strings (English + Myanmar / မြန်မာ)
   - ui:      interface strings, keyed by language
   - cat/level: localized category & level names
   - content: Myanmar overrides for course/section/lesson data, keyed by id
              (anything missing falls back to the English source in data.js)
   ===================================================================== */
window.I18N = {
  ui: {
    en: {
      nav_courses: "Courses",
      nav_roadmap: "Roadmap",
      nav_mylearning: "My Learning",
      roadmap_title: "Learning Roadmap",
      roadmap_sub: "Follow this path from your first HTML tag to a finished project.",
      copy_code: "Copy",
      copied: "Copied",
      try_yourself: "Try it Yourself",
      pg_title: "Try it Yourself",
      pg_run: "Run",
      nav_playground: "Playground",
      pg_auto: "Auto-run",
      pg_console: "Console",
      pg_check: "Check my code",
      pg_check_premium: "AI code review is a Premium feature.",
      pg_check_empty: "Write some code first, then I'll review it.",
      pg_check_working: "The AI teacher is reading your code…",
      pg_examples: "Examples",
      pg_del_snippet: "Delete snippet",
      pg_clear: "Clear",
      pg_clear_confirm: "Clear all the code?",
      pg_share: "Copy a share link",
      pg_smaller: "Smaller text",
      pg_bigger: "Bigger text",
      pg_view_code: "Code only",
      pg_view_split: "Split view",
      pg_view_preview: "Preview only",
      preview_free: "Free preview — the first {n} lessons of this course are free",
      preview_unlock: "Unlock the full course",
      preview_start: "Start free preview",
      preview_locked: "Unlock with Premium",
      step_word: "Step",
      step_mode: "Step mode",
      full_view: "Full view",
      next_step: "Next",
      step_finish: "Finish & continue",
      autoplay: "Play",
      pause: "Pause",
      voice_read: "Read aloud (English voice)",
      cele_done: "Lesson complete!",
      tab_home: "Home",
      tab_me: "Me",
      qc_title: "Quick check",
      qc_correct: "Correct! Moving on…",
      qc_wrong: "Not quite — try again!",
      pg_save: "Save",
      pg_snippets: "My snippets",
      pg_download: "Download",
      pg_name_prompt: "Snippet name?",
      pg_page_sub: "Write HTML, CSS or JavaScript on the left — see the result and console output instantly. Your work auto-saves in this browser.",
      nav_tools: "Tools",
      tools_title: "Student Tools",
      tools_sub: "Free helper tools every coder uses daily — no login needed.",
      tool_back: "← All tools",
      tool_cheats: "Cheat Sheets", tool_cheats_d: "HTML, CSS, JS, Git, SQL & more — every command you forget, one tap away.",
      tool_color: "Color Picker", tool_color_d: "Pick a color — get HEX, RGB and HSL codes plus shades.",
      tool_gradient: "Gradient Maker", tool_gradient_d: "Blend two colors into ready-to-use CSS.",
      tool_shadow: "Shadow Maker", tool_shadow_d: "Design box-shadows with live sliders.",
      tool_json: "JSON Formatter", tool_json_d: "Pretty-print, minify and validate JSON.",
      tool_regex: "Regex Tester", tool_regex_d: "Test regular expressions with live match highlighting.",
      tool_units: "px ⇄ rem Converter", tool_units_d: "Convert pixel sizes to rem/em and back.",
      tool_case: "Case Converter", tool_case_d: "UPPER, lower, camelCase, snake_case and more.",
      tool_count: "Word Counter", tool_count_d: "Characters, words, lines and reading time.",
      tool_lorem: "Lorem Ipsum", tool_lorem_d: "Placeholder text for your page designs.",
      tool_typing: "Typing Speed Test", tool_typing_d: "How fast can you type code? Test your WPM!",
      tool_timer: "Study Timer", tool_timer_d: "Pomodoro focus timer — 25 min work, 5 min break.",
      tl_copy: "Copy",
      tl_generate: "Generate",
      tl_format: "Format",
      tl_minify: "Minify",
      tl_clear: "Clear",
      tl_valid: "✓ Valid JSON",
      tl_invalid: "✗ Invalid: ",
      tl_json_ph: "Paste JSON here…",
      tl_pattern: "Pattern",
      tl_flags: "Flags",
      tl_test_text: "Type or paste text here…",
      tl_matches: "matches",
      tl_base: "Base font size (px)",
      tl_shades: "Shades",
      tl_angle: "Angle",
      tl_words: "Words",
      tl_chars: "Characters",
      tl_chars_ns: "No spaces",
      tl_lines: "Lines",
      tl_read: "Reading time",
      tl_min: "min",
      tl_paras: "Paragraphs",
      tl_start_typing: "The timer starts on your first keystroke.",
      tl_type_here: "Type the text above…",
      tl_wpm: "WPM",
      tl_acc: "Accuracy",
      tl_new_text: "New sentence",
      tl_focus: "Focus",
      tl_break: "Break",
      tl_start: "Start",
      tl_reset: "Reset",
      tl_sessions: "Focus sessions today",
      lesson_preview: "Preview",
      faq_title: "Frequently asked questions",
      faq_q1: "Is this course really free?",
      faq_a1: "Most courses are 100% free. Premium courses let you try the first 2 lessons free before joining Premium.",
      faq_q2: "Can I learn on my phone?",
      faq_a2: "Yes! Everything works on any phone. You can even tap 📲 Install to add it as an app and keep learning offline.",
      faq_q3: "Do I get a certificate?",
      faq_a3: "Yes — complete 100% of the lessons and you can download a certificate with your name on it.",
      faq_q4: "Is it available in Myanmar language?",
      faq_a4: "Yes — tap the မြန်မာ button at the top to switch the whole site to Burmese anytime.",
      cert_teaser_title: "Earn this certificate",
      cert_teaser_note: "Finish all lessons to unlock your personal certificate.",
      cert_your_name: "Your Name",
      related_title: "More {cat} courses",
      related_generic: "You may also like",
      new_title: "New & trending",
      new_sub: "Fresh courses in the hottest 2026 skills — AI agents, n8n automation, cloud and DevOps.",
      daily_title: "Daily Challenge",
      daily_sub: "One question every day — same for everyone. Answer correctly for bonus XP!",
      daily_streak: "Challenge streak",
      daily_correct: "Correct! +20 XP",
      daily_wrong: "Not this time!",
      daily_back: "Next challenge in {h}h",
      daily_cta: "Answer today's question — one try only!",
      daily_done_short: "Done for today — come back tomorrow!",
      daily_hint: "You get ONE try per day. Choose carefully!",
      badge_earned: "Badge earned!",
      badge_daily3: "Challenger — 3-day challenge streak",
      badge_exercise: "Code Athlete — first exercise passed",
      lvl_next: "{n} XP to level {l}",
      promo_title: "Promo codes",
      promo_help: "Create codes and share them in your posts — students redeem them for free Premium days.",
      promo_create: "Create",
      promo_created: "Code created!",
      promo_err: "Could not save — publish the updated firebase-rules.json first.",
      promo_days: "days",
      promo_uses: "uses",
      redeem_title: "Have a promo code?",
      redeem_ph: "e.g. LAUNCH20",
      redeem_btn: "Redeem",
      redeem_ok: "🎉 Premium unlocked until {d}! Enjoy!",
      redeem_invalid: "Code invalid or already fully used.",
      ex_editor: "Your code",
      ex_run: "Run & Check",
      ex_reset: "Reset code",
      ex_pass: "Passed! Great job!",
      ex_fail: "Not yet —",
      ex_timeout: "No result — check your code for mistakes.",
      buy_course: "Buy this course only",
      prem_one_title: "Unlock one course",
      prem_or_all: "Get ALL premium courses instead",
      prem_all_label: "All-access",
      purchased: "Purchased — this course is yours!",
      chat_premium_only: "Chat is for Premium students. Unlock any course (or go Premium) to join the conversation!",
      comm_title: "Community",
      comm_sub: "Learn together — ask, answer, celebrate wins. Heroes help heroes.",
      comm_home_sub: "Chat, top learners & study rooms",
      comm_chat_title: "Community chat",
      comm_chat_sub: "One global room, plus a study room inside every premium course. Everyone can read — paying students can write.",
      comm_open: "Open chat",
      comm_online: "online now",
      comm_quiet: "Quiet right now — be the first to say mingalaba!",
      comm_top_week: "Top learners this week",
      comm_be_first: "No activity yet this week — your name could be here tonight!",
      comm_rooms: "Course study rooms",
      comm_rooms_sub: "Open any premium course — the chat automatically switches to that course's own room.",
      comm_rules: "Community guidelines",
      comm_rule1: "Be kind — everyone here started at zero.",
      comm_rule2: "Ask freely — there are no stupid questions, only future experts.",
      comm_rule3: "Share your wins AND your bugs — both help others learn.",
      comm_rule4: "No spam, no disrespect — admins keep this a safe space.",
      call_title: "Video study call",
      call_start: "Start video call",
      call_room: "study room",
      call_locked: "Video study calls are for Premium students — unlock any course (or go Premium) to join face-to-face study sessions!",
      call_newtab: "Open in new tab",
      call_leave: "Leave",
      call_tip: "Allow camera & microphone when the browser asks. Share the same page with a classmate — everyone in this room meets in the same call. Works best on Chrome.",
      call_invite: "📹 I started a video study call — tap the 📹 button in the chat header to join!",
      share_fb: "Share on Facebook",
      exercises_word: "exercises",
      nudge_streak: "Your {n}-day streak is waiting — one lesson today keeps the fire alive!",
      goal_title: "Weekly goal",
      goal_sub: "How many lessons this week? Small goals win big careers.",
      goal_change: "Change",
      goal_progress: "{n} of {g} lessons this week — keep going!",
      goal_done: "Weekly goal reached — you're unstoppable!",
      reviews_err: "Could not save yet — the database rules need to be published first.",
      cc_title: "Content creator",
      cc_help: "Pick a course (or General promo) → Generate a ready-to-post Facebook text → ✨ lets the AI polish it.",
      cc_general: "General promo (whole academy)",
      cc_generate: "Generate",
      cc_ai: "AI polish",
      cc_ph: "Your Facebook post will appear here…",
      cc_gen_first: "Generate a post first.",
      community_join: "Join our community:",
      admin_use_template: "Insert lesson template",
      admin_template_confirm: "Replace the current content with the standard template?",
      admin_ai_write: "AI write",
      ai_no_key: "AI is not set up yet. Get a FREE key at aistudio.google.com/apikey and paste it in js/ai.js",
      ai_need_title: "Type the lesson title first — the AI writes from it.",
      ai_working: "writing…",
      ai_bad_reply: "The AI reply could not be read — please try again.",
      chat_ai_nokey: "AI is not set up yet or could not connect — please try again (admin: check the AI settings)",
      prem_checking: "Checking your membership…",
      chat_ai_thinking: "AI is thinking…",
      tutor_title: "AI Tutor",
      tutor_sub: "Ask about this lesson — the AI knows what you are reading",
      tutor_simple: "Explain simply",
      tutor_burmese: "မြန်မာလို ရှင်းပြပါ",
      tutor_example: "More examples",
      tutor_practice: "Practice task",
      tutor_ph: "Ask the AI tutor anything about this lesson…",
      tutor_ask: "Ask",
      tutor_thinking: "Thinking…",
      tutor_premium: "The AI Tutor is for Premium members.",
      chat_ai_premium: "@ai is for Premium members — see the ⭐ Premium page",
      cert_download: "Download image",
      badge_fifty_lessons: "50 lessons",
      badge_five_courses: "5 courses",
      badge_streak3: "3-day streak",
      badge_streak7: "7-day streak",
      badge_streak30: "30-day streak",
      admin_preview: "Preview",
      admin_finst: "Instructor name",
      admin_fhours: "Hours (auto if empty)",
      admin_colors: "Card colors",
      admin_flearn: "What students will learn",
      admin_flearn_ph: "One point per line…",
      search_ph: "Search for HTML, CSS, JavaScript…",
      footer_tag: "a demo learning platform. Built with plain HTML, CSS & JavaScript.",
      footer_saved: "Your progress is saved in this browser (localStorage). No account needed.",

      hero_h1: "Learn to build the web.",
      hero_p: "Master HTML, CSS, and JavaScript with hands-on lessons, real code examples, and quizzes — all in one free, self-paced course library.",
      hero_cta1: "Start the Bootcamp →",
      hero_cta2: "Browse all courses",
      stat_courses: "Courses",
      stat_lessons: "Lessons",
      stat_rating: "Avg rating",
      featured: "Featured courses",
      featured_sub: "Hand-picked paths to get you building fast.",
      trending: "Trending now",
      trending_sub: "The most popular courses students are taking right now.",
      trending_live_sub: "Based on real student views in the last 7 days. 🔴 Live",
      search_results: "Search results",
      search_in_lessons: "Inside lessons",
      lb_title: "Leaderboard",
      lb_sub: "Top learners across the academy — earn XP by completing lessons and passing quizzes.",
      lb_you: "you",
      lb_all: "All time",
      lb_week: "This week",
      lb_yourrank: "Your rank",
      lb_empty: "No rankings yet",
      lb_empty_sub: "Complete a lesson while logged in to appear here!",
      lb_offline: "Leaderboard needs the cloud connection.",
      lb_note: "⚡ XP = lessons ×10 + quiz passes ×5 · updates when you complete lessons · top 20 shown",
      prem_title: "Go Premium",
      prem_sub: "Unlock every premium course with a one-time membership.",
      prem_once: "one-time payment",
      prem_benefit_courses: "premium courses unlocked forever",
      prem_benefit_future: "All future premium courses included",
      prem_benefit_cert: "Certificates for every completed course",
      prem_login_first: "Log in (or create a free account) first — your membership attaches to your account email.",
      prem_active: "You are a Premium member!",
      prem_active_sub: "All premium courses are unlocked on any device where you log in with this email.",
      prem_pending: "Payment submitted — awaiting approval",
      prem_pending_sub: "The admin will verify your KBZPay transfer and unlock your account, usually within a few hours.",
      prem_how: "How to pay",
      prem_step1: "Send",
      prem_step1_qr: "Scan the QR code with",
      prem_promo: "PROMOTION",
      prem_step2: "In the KBZPay note, write your account email.",
      prem_step3: "Fill in this form so the admin can match your transfer:",
      prem_phone_label: "KBZPay phone number you paid from",
      prem_txn_label: "Transaction ID",
      prem_txn_ph: "last 6 digits or the note you wrote",
      prem_submit: "I have paid — submit for review",
      prem_go: "Go Premium",
      admin_payments: "Payments",
      admin_approve: "Approve",
      admin_reject: "Reject",
      admin_no_payments: "No payment claims yet.",
      dash_admin_title: "Dashboard",
      dash_students: "Students",
      dash_active: "Active (streak)",
      dash_members: "Premium members",
      dash_pending: "Pending payments",
      dash_approved: "Approved",
      dash_revenue: "Revenue (est.)",
      dash_review_pending: "Review {n} pending payment(s)",
      dash_popular: "Most popular courses",
      dash_views: "views",
      dash_top_students: "Top students",
      dash_none: "No data yet.",
      dash_note: "Live from the cloud. Students appear here once they earn XP; revenue is an estimate (approved claims × current price).",
      review_title: "Daily Review",
      review_sub: "Fresh questions from lessons you've already finished — keep your memory strong.",
      review_premium: "The AI Daily Review is a Premium feature.",
      review_need: "Finish at least 3 lessons first, then come back for your review quiz.",
      review_ready: "You've completed {n} lessons. Ready for today's review?",
      review_start: "Start today's review",
      review_making: "The AI is writing your review questions…",
      review_score: "You scored {s} / {t}",
      review_again: "New questions",
      ann_title: "Announcement banner",
      ann_help: "Post one message that every student sees at the top of the site (e.g. news, a new course, a holiday notice).",
      ann_post: "Post to everyone",
      ann_clear: "Clear",
      ann_posted: "Posted!",
      ann_cleared: "Cleared",
      ann_empty: "Type a message first.",
      ann_err: "Could not save — did you update the database rules?",
      search_more: "Showing the first 30 lesson matches — refine your search for more precise results.",
      browse_topic: "Browse by topic",
      browse_sub: "Jump straight to what you want to learn.",

      all_courses: "All courses",
      courses_word: "courses",
      no_courses: "No courses found",
      no_courses_sub: "Try another topic or clear your search.",

      students: "students",
      lessons_word: "lessons",
      hrs: "hrs",
      enrolled: "Enrolled",
      pct_complete_word: "complete",

      ratings: "ratings",
      created_by: "Created by",
      enroll_now: "Enroll now — it's",
      continue_learning: "Continue learning",
      start_course: "Start course",
      what_learn: "What you'll learn",
      description: "Description",
      course_content: "Course content",
      sections_word: "sections",
      hours_word: "hours",
      instructor: "Instructor",
      instructor_bio: "Senior developer & educator with a knack for making hard ideas click. Thousands of students have shipped their first sites with these lessons.",
      instructor_role: "instructor",
      includes_title: "This course includes:",
      quizzes_word: "quizzes",
      inc_cert: "Certificate of completion",
      inc_offline: "Works offline",
      inc_bilingual: "English + Myanmar",
      inc_lifetime: "Lifetime access — learn at your own pace",
      requirements: "Requirements",
      req_none: "No prior coding experience needed — just curiosity.",
      req_device: "A phone or computer with a web browser.",
      req_basics: "Comfortable with basic HTML, CSS & JavaScript (try our beginner courses first if you're new).",
      who_for: "Who this course is for",
      who_1_beg: "Complete beginners who learn best by building real things.",
      who_1_adv: "Learners ready to go beyond the basics in {cat}.",
      who_2: "Students in Myanmar who want clear, bilingual, hands-on lessons.",
      share_course: "Share this course",
      soon_badge: "More coming soon",
      soon_note: "🚧 This is a starter course — it covers the essentials now, and more lessons are being added. Completing it still counts toward your streak, XP and certificate!",
      hours_content: "hours of content",
      lessons_quizzes: "lessons & quizzes",
      pace: "Learn at your own pace",
      saved_auto: "Progress saved automatically",

      lesson_word: "Lesson",
      mark_complete: "Mark complete",
      completed: "✓ Completed",
      next_lesson: "Next lesson →",
      previous: "← Previous",
      finish: "Finish 🎓",
      complete_word: "complete",

      quiz_intro_a: "Answer all",
      quiz_intro_b: "questions, then check your results. You can retake it anytime.",
      check_answers: "Check answers",
      you_scored: "You scored",
      passed_msg: "Passed — nice work!",
      fail_msg: "Review the lesson and try again.",
      marked_complete: "Lesson marked complete. Scroll down for the next lesson.",

      my_learning: "My Learning",
      enrolled_word: "enrolled courses",
      keep_going: "Keep going!",
      continue: "Continue",
      start: "Start",
      review: "Review",
      empty_title: "You haven't enrolled in anything yet",
      empty_sub: "Pick a course and your progress will show up here.",
      browse_courses: "Browse courses",

      notfound: "Page not found",
      back_home: "Back home",

      auth_login: "Log in",
      auth_logout: "Log out",
      auth_signup: "Sign up",
      auth_login_title: "Log in to your account",
      auth_signup_title: "Create your account",
      auth_name: "Full name",
      auth_email: "Email",
      auth_password: "Password",
      auth_login_btn: "Log in",
      auth_signup_btn: "Create account",
      auth_or: "or",
      auth_google_hint: "Tip: email + password works on every network. Google sign-in may not work on some networks in Myanmar.",
      install_app: "Install",
      auth_google: "Continue with Google",
      auth_have_account: "Already have an account?",
      auth_no_account: "Don't have an account?",
      auth_switch_login: "Log in",
      auth_switch_signup: "Sign up",
      auth_err_required: "Please fill in all fields.",
      auth_err_email: "Enter a valid email address.",
      auth_err_exists: "An account with this email already exists.",
      auth_err_notfound: "No account found — check your email or sign up.",
      auth_err_wrongpass: "Incorrect password.",
      auth_err_useprovider: "This account uses Google — please press the Google sign-in button.",
      auth_err_shortpass: "Password must be at least 6 characters.",
      auth_google_demo_note: "Demo mode — add a Google Client ID in js/auth.js for real sign-in.",
      auth_account: "My account",
      auth_account_title: "My Account",
      auth_display_name: "Display name",
      auth_save_changes: "Save changes",
      auth_profile_saved: "Profile updated.",
      auth_change_password: "Change password",
      auth_current_password: "Current password",
      auth_new_password: "New password",
      auth_update_password: "Update password",
      auth_password_updated: "Password updated.",
      auth_err_wrong_current: "Current password is incorrect.",
      auth_google_account_note: "You're signed in with Google — there's no password to manage here.",
      auth_forgot: "Forgot password?",
      auth_reset_title: "Reset your password",
      auth_reset_desc: "Enter your email and we'll send you a link to reset your password.",
      auth_reset_btn: "Send reset link",
      auth_reset_sent: "Sent! Check your email (and spam) — then come to the next step to paste the link.",
      reset_set_title: "Set your new password",
      reset_paste_help: "The reset link may not open on your network — no problem. Open the email we sent, COPY the whole link (long-press → Copy link), and paste it below.",
      reset_paste_label: "Paste your reset link here",
      reset_confirm: "Confirm new password",
      reset_set_btn: "Set new password",
      reset_have_link: "I already have my reset link",
      reset_back_email: "Back to send email",
      reset_no_code: "That doesn't look like a reset link — please copy the WHOLE link from the email.",
      reset_bad_code: "This link has expired or was already used. Go back and send a new one.",
      reset_mismatch: "The two passwords don't match.",
      reset_done: "✅ Password changed! Go back to log in with your new password.",
      auth_verify_sent: "Account created! Check your email for a verification link.",
      auth_unverified: "Email not verified yet",
      auth_back_login: "← Back to log in",
      auth_err_reset_notfound: "No email/password account found for that address.",
      auth_err_network: "Network problem — check your internet and try again.",
      auth_err_toomany: "Too many attempts. Please wait a minute and try again.",
      auth_err_popup: "The Google sign-in window was blocked — allow popups and try again.",
      auth_err_diffcred: "This email already has an account with a different sign-in method.",
      auth_err_notenabled: "This sign-in method is not enabled yet (admin: enable it in Firebase).",
      auth_err_domain: "This website is not authorized for login yet (admin: add the domain in Firebase).",
      auth_login_required: "Please log in to enroll.",
      price_free: "Free",
      price_premium: "Premium",
      login_to_enroll: "Log in to enroll",
      guest_free_note: "Free courses are open to everyone — no account needed. Premium courses require a free login.",
      chat_title: "Community chat",
      chat_empty: "No messages yet — say hello! 👋",
      chat_login: "Log in to chat",
      chat_placeholder: "Write a message…",
      chat_delete: "Delete",
      chat_course_room: "Course chat",
      chat_edit_tooltip: "Edit",
      chat_react_tooltip: "React",
      chat_pin_tooltip: "Pin",
      chat_online: "online",
      chat_send_err: "Could not send — check your internet connection and try again.",
      chat_cloud_err: "Cloud chat is unreachable right now.",
      chat_slow_down: "You're sending too fast — wait a few seconds.",
      chat_go_community: "Community",
      chat_reply: "Reply",
      chat_photo: "Send a photo",
      chat_img_err: "Couldn't process that image — try a smaller one.",
      role_admin: "Admin",
      admin_only: "Admins only",
      admin_only_sub: "Only admin accounts can create and edit courses. Ask your administrator for access.",

      theme_toggle: "Toggle light / dark",

      cert_view: "View certificate",
      cert_title: "Certificate of Completion",
      cert_intro: "This certifies that",
      cert_completed: "has successfully completed",
      cert_print: "Download / Print",
      cert_back: "Back to course",
      cert_congrats: "🎉 Course complete!",
      cert_locked: "Complete all lessons to unlock your certificate.",

      reviews_title: "Ratings & reviews",
      reviews_none: "No reviews yet — be the first!",
      reviews_your_rating: "Your rating",
      reviews_placeholder: "Share what you thought…",
      reviews_submit: "Post review",
      reviews_login: "Log in to leave a review",
      reviews_word: "reviews",

      filter_level: "Level",
      filter_price: "Price",
      filter_sort: "Sort by",
      sort_popular: "Most popular",
      sort_rating: "Top rated",
      sort_az: "A–Z",
      opt_all: "All",

      admin: "Create course",
      admin_title: "Create / manage courses",
      admin_your: "Your courses",
      admin_none: "You haven't created any courses yet.",
      admin_ftitle: "Course title",
      admin_fsub: "Subtitle",
      admin_fcat: "Category",
      admin_flevel: "Level",
      admin_fdesc: "Description",
      admin_ficon: "Icon (emoji or text)",
      admin_ffree: "Free (guests can access)",
      admin_lessons: "Lessons",
      admin_ltitle: "Lesson title",
      admin_lvideo: "Video URL (optional)",
      admin_lnotes: "Lesson content — write your article/notes here (plain text or HTML)",
      admin_upload_video: "Upload video",
      admin_uploading: "Saving video…",
      admin_upload_toobig: "File too large (max 500 MB)",
      admin_upload_err: "Could not save the video in this browser.",
      admin_addlesson: "+ Add lesson",
      admin_save: "Save course",
      admin_saved: "Course saved!",
      admin_delete: "Delete",
      admin_deleteq: "Delete this course?",
      admin_edit: "Edit",
      admin_need_title: "Please enter a course title and at least one lesson.",
      admin_yours_badge: "Yours",
      admin_ltype: "Type",
      type_video: "Video",
      type_article: "Article",
      type_quiz: "Quiz",
      admin_add_question: "+ Add question",
      admin_question: "Question",
      admin_option: "Option",
      admin_correct: "Correct answer",
      admin_add_section: "+ Add section",
      admin_section: "Section title",
      admin_image: "Thumbnail image URL (optional)",

      notes_title: "Your notes",
      notes_placeholder: "Type private notes for this lesson…",
      notes_saved: "Saved ✓",
      bookmark: "Bookmark",
      bookmarked: "Bookmarked",
      spent: "Time spent",
      comments_title: "Discussion",
      comment_placeholder: "Ask a question or share your thoughts…",
      comment_post: "Post",
      comment_login: "Log in to join the discussion.",
      resume_title: "Jump back in",
      bookmarks_title: "Bookmarked lessons",
      bookmarks_none: "No bookmarks yet — tap Bookmark on any lesson.",
      recommended_title: "Recommended for you",

      shortcuts_title: "Keyboard Shortcuts",
      shortcut_next: "Next lesson",
      shortcut_prev: "Previous lesson",
      shortcut_bookmark: "Toggle bookmark",
      shortcut_complete: "Mark complete",
      shortcut_help: "Show this help",
      close_modal: "Close",

      quiz_best: "Best",

      dash_title: "Your dashboard",
      stat_xp: "XP",
      stat_level: "Level",
      stat_completed: "Lessons done",
      stat_courses_done: "Courses done",
      stat_certs: "Certificates",
      stat_streak: "Day streak",
      badges_title: "Badges",
      badge_first_lesson: "First steps",
      badge_first_course: "Finisher",
      badge_ten_lessons: "Getting serious",
      badge_quiz_ace: "Quiz ace",
      badge_bilingual: "Bilingual",
      badge_locked: "Locked",

      data_title: "Backup & restore",
      data_desc: "Download all your progress, notes, and created courses as a file — or restore from one.",
      transcript_export: "📋 Export transcript",
      data_export: "Export my data",
      data_import: "Import data",
      data_imported: "Data imported — reloading…",
      data_import_err: "That file couldn't be read.",

      cert_id: "Certificate ID",
      cert_copy: "Copy share link",
      cert_copied: "Link copied!",
    },
    my: {
      nav_courses: "သင်တန်းများ",
      nav_roadmap: "လမ်းကြောင်း",
      nav_mylearning: "ကျွန်ုပ်၏သင်ယူမှု",
      roadmap_title: "သင်ယူမှု လမ်းကြောင်း",
      roadmap_sub: "ပထမဆုံး HTML tag မှ ပရောဂျက်တစ်ခုပြီးမြောက်သည်အထိ ဤလမ်းကြောင်းအတိုင်း လျှောက်လှမ်းပါ။",
      copy_code: "ကူးရန်",
      copied: "ကူးပြီး",
      try_yourself: "ကိုယ်တိုင် စမ်းကြည့်ပါ",
      pg_title: "ကိုယ်တိုင် စမ်းကြည့်ပါ",
      pg_run: "Run",
      nav_playground: "စမ်းသပ်ခန်း",
      pg_auto: "အလိုအလျောက် Run",
      pg_console: "Console",
      pg_check: "ကုဒ်စစ်ပါ",
      pg_check_premium: "AI ကုဒ်စစ်ဆေးခြင်းသည် Premium လုပ်ဆောင်ချက်ဖြစ်သည်။",
      pg_check_empty: "ကုဒ်အနည်းငယ် အရင်ရေးပါ၊ ပြီးရင် ကျွန်တော်စစ်ပေးမည်။",
      pg_check_working: "AI ဆရာက သင့်ကုဒ်ကို ဖတ်နေသည်…",
      pg_examples: "နမူနာများ",
      pg_del_snippet: "ကုဒ်ဖျက်ရန်",
      pg_clear: "ရှင်းရန်",
      pg_clear_confirm: "ကုဒ်အားလုံး ရှင်းမလား?",
      pg_share: "မျှဝေလင့်ခ် ကူးရန်",
      pg_smaller: "စာ ငယ်ရန်",
      pg_bigger: "စာ ကြီးရန်",
      pg_view_code: "ကုဒ်သာ",
      pg_view_split: "နှစ်ခွဲ",
      pg_view_preview: "ရလဒ်သာ",
      preview_free: "အခမဲ့ စမ်းကြည့်ခြင်း — ဤသင်တန်း၏ ပထမ {n} သင်ခန်းစာ အခမဲ့",
      preview_unlock: "သင်တန်းအပြည့် ဖွင့်ရန်",
      preview_start: "အခမဲ့ စမ်းကြည့်ရန်",
      preview_locked: "Premium ဖြင့် ဖွင့်ရန်",
      step_word: "အဆင့်",
      step_mode: "အဆင့်လိုက်ကြည့်ရန်",
      full_view: "အပြည့်ကြည့်ရန်",
      next_step: "ရှေ့သို့",
      step_finish: "ပြီးပြီ — ဆက်သွားရန်",
      autoplay: "ဖွင့်ရန်",
      pause: "ရပ်ရန်",
      voice_read: "အသံဖြင့် ဖတ်ပြရန် (အင်္ဂလိပ်အသံ)",
      cele_done: "သင်ခန်းစာ ပြီးပါပြီ!",
      tab_home: "ပင်မ",
      tab_me: "ကျွန်ုပ်",
      qc_title: "အမြန်စစ်ဆေးမှု",
      qc_correct: "မှန်ပါသည်! ဆက်သွားမည်…",
      qc_wrong: "မမှန်သေးပါ — ထပ်စမ်းပါ!",
      pg_save: "သိမ်းရန်",
      pg_snippets: "ကျွန်ုပ်၏ ကုဒ်များ",
      pg_download: "ဒေါင်းလုဒ်",
      pg_name_prompt: "ကုဒ်အမည် ပေးပါ?",
      pg_page_sub: "ဘယ်ဘက်တွင် HTML, CSS သို့မဟုတ် JavaScript ရေးပါ — ရလဒ်နှင့် console ကို ချက်ချင်းမြင်ရမည်။ သင့်ကုဒ်ကို ဤဘရောက်ဇာတွင် အလိုအလျောက်သိမ်းသည်။",
      nav_tools: "ကိရိယာများ",
      tools_title: "ကျောင်းသားသုံး ကိရိယာများ",
      tools_sub: "coder တိုင်း နေ့စဉ်သုံးသော အခမဲ့ ကိရိယာများ — login မလိုပါ။",
      tool_back: "← ကိရိယာအားလုံး",
      tool_cheats: "Cheat Sheet များ", tool_cheats_d: "HTML, CSS, JS, Git, SQL — မေ့တတ်သော command တိုင်း တစ်ချက်နှိပ်ရုံ။",
      tool_color: "အရောင်ရွေးကိရိယာ", tool_color_d: "အရောင်ရွေးပါ — HEX, RGB, HSL ကုဒ်နှင့် အနုအရင့်များ ရယူပါ။",
      tool_gradient: "Gradient ဖန်တီးကိရိယာ", tool_gradient_d: "အရောင်နှစ်ရောင် ရောစပ်ပြီး CSS ကုဒ် ချက်ချင်းရယူပါ။",
      tool_shadow: "Shadow ဖန်တီးကိရိယာ", tool_shadow_d: "Slider များဖြင့် box-shadow ဒီဇိုင်းဆွဲပါ။",
      tool_json: "JSON ပြင်ဆင်ကိရိယာ", tool_json_d: "JSON ကို လှပအောင်ပြင်၊ ချုံ့၊ စစ်ဆေးပါ။",
      tool_regex: "Regex စမ်းသပ်ကိရိယာ", tool_regex_d: "Regular expression များကို အရောင်ခြယ်ပြသမှုဖြင့် စမ်းပါ။",
      tool_units: "px ⇄ rem ပြောင်းကိရိယာ", tool_units_d: "Pixel အရွယ်အစားကို rem/em သို့ အပြန်အလှန် ပြောင်းပါ။",
      tool_case: "စာလုံးပုံစံ ပြောင်းကိရိယာ", tool_case_d: "UPPER, lower, camelCase, snake_case စသည်ဖြင့် ပြောင်းပါ။",
      tool_count: "စကားလုံး ရေတွက်ကိရိယာ", tool_count_d: "စာလုံး၊ စကားလုံး၊ စာကြောင်းနှင့် ဖတ်ချိန် တွက်ပါ။",
      tool_lorem: "Lorem Ipsum", tool_lorem_d: "ဒီဇိုင်းအတွက် နမူနာစာသား ထုတ်ပါ။",
      tool_typing: "စာရိုက်နှုန်း စမ်းသပ်မှု", tool_typing_d: "ကုဒ်ကို ဘယ်လောက်မြန်မြန် ရိုက်နိုင်လဲ? WPM စမ်းကြည့်ပါ!",
      tool_timer: "စာကျက်ချိန် တိုင်မာ", tool_timer_d: "Pomodoro နည်း — ၂၅ မိနစ် အာရုံစိုက်၊ ၅ မိနစ် နားပါ။",
      tl_copy: "ကူးယူရန်",
      tl_generate: "ထုတ်ရန်",
      tl_format: "ပြင်ရန်",
      tl_minify: "ချုံ့ရန်",
      tl_clear: "ရှင်းရန်",
      tl_valid: "✓ JSON မှန်ကန်သည်",
      tl_invalid: "✗ မှားနေသည်: ",
      tl_json_ph: "JSON ကို ဤနေရာတွင် ကူးထည့်ပါ…",
      tl_pattern: "Pattern",
      tl_flags: "Flags",
      tl_test_text: "စာသား ရိုက်ထည့်ပါ…",
      tl_matches: "ခု တွေ့သည်",
      tl_base: "အခြေခံ font size (px)",
      tl_shades: "အရောင် အနုအရင့်",
      tl_angle: "ထောင့်",
      tl_words: "စကားလုံး",
      tl_chars: "စာလုံး",
      tl_chars_ns: "space မပါ",
      tl_lines: "စာကြောင်း",
      tl_read: "ဖတ်ချိန်",
      tl_min: "မိနစ်",
      tl_paras: "စာပိုဒ်အရေအတွက်",
      tl_start_typing: "ပထမဆုံးစာလုံး ရိုက်လိုက်သည်နှင့် အချိန်စမည်။",
      tl_type_here: "အပေါ်ကစာသားကို ရိုက်ပါ…",
      tl_wpm: "WPM",
      tl_acc: "တိကျမှု",
      tl_new_text: "စာသားအသစ်",
      tl_focus: "အာရုံစိုက်ချိန်",
      tl_break: "နားချိန်",
      tl_start: "စတင်ရန်",
      tl_reset: "ပြန်စရန်",
      tl_sessions: "ယနေ့ ပြီးသော အာရုံစိုက်ချိန်",
      lesson_preview: "အစမ်း",
      faq_title: "မေးလေ့ရှိသော မေးခွန်းများ",
      faq_q1: "ဒီသင်တန်း တကယ် အခမဲ့လား?",
      faq_a1: "သင်တန်းအများစုသည် ၁၀၀% အခမဲ့ဖြစ်သည်။ Premium သင်တန်းများတွင် ပထမ သင်ခန်းစာ ၂ ခုကို အခမဲ့ စမ်းကြည့်နိုင်သည်။",
      faq_q2: "ဖုန်းနဲ့ သင်ယူလို့ရလား?",
      faq_a2: "ရပါသည်! ဖုန်းတိုင်းတွင် အလုပ်လုပ်သည်။ 📲 Install ကိုနှိပ်၍ app အဖြစ်ထည့်ပြီး offline လည်း သင်ယူနိုင်သည်။",
      faq_q3: "အောင်လက်မှတ် ရမလား?",
      faq_a3: "ရပါသည် — သင်ခန်းစာ ၁၀၀% ပြီးအောင်လုပ်လျှင် သင့်နာမည်ပါသော အောင်လက်မှတ်ကို ဒေါင်းလုဒ်လုပ်နိုင်သည်။",
      faq_q4: "မြန်မာဘာသာနဲ့ ရလား?",
      faq_a4: "ရပါသည် — အပေါ်က မြန်မာ ခလုတ်ကိုနှိပ်၍ ဆိုက်တစ်ခုလုံးကို မြန်မာဘာသာသို့ အချိန်မရွေး ပြောင်းနိုင်သည်။",
      cert_teaser_title: "ဤအောင်လက်မှတ်ကို ရယူပါ",
      cert_teaser_note: "သင်ခန်းစာအားလုံး ပြီးအောင်လုပ်လျှင် သင့်ကိုယ်ပိုင် အောင်လက်မှတ် ရမည်။",
      cert_your_name: "သင့်နာမည်",
      related_title: "နောက်ထပ် {cat} သင်တန်းများ",
      related_generic: "သင် ကြိုက်နှစ်သက်နိုင်သော သင်တန်းများ",
      new_title: "အသစ်နှင့် ခေတ်စားနေသော",
      new_sub: "၂၀၂၆ အလိုအပ်ဆုံး skill များ — AI agents, n8n automation, cloud နှင့် DevOps သင်တန်းအသစ်များ။",
      daily_title: "နေ့စဉ် စိန်ခေါ်မှု",
      daily_sub: "နေ့တိုင်း မေးခွန်းတစ်ခု — လူတိုင်းအတွက် အတူတူ။ မှန်လျှင် XP ဆုရမည်!",
      daily_streak: "စိန်ခေါ်မှု streak",
      daily_correct: "မှန်ပါသည်! +20 XP",
      daily_wrong: "ဒီတစ်ခါ မမှန်ပါ!",
      daily_back: "နောက်စိန်ခေါ်မှု {h} နာရီအတွင်း",
      daily_cta: "ယနေ့မေးခွန်းကို ဖြေပါ — တစ်ကြိမ်သာ!",
      daily_done_short: "ယနေ့အတွက် ပြီးပါပြီ — မနက်ဖြန် ပြန်လာပါ!",
      daily_hint: "တစ်နေ့ တစ်ကြိမ်သာ ဖြေနိုင်သည်။ သေချာစဉ်းစားပါ!",
      badge_earned: "တံဆိပ် ရရှိပြီ!",
      badge_daily3: "စိန်ခေါ်သူ — ၃ ရက်ဆက် စိန်ခေါ်မှုအောင်",
      badge_exercise: "ကုဒ်အားကစားသမား — ပထမဆုံး လေ့ကျင့်ခန်းအောင်",
      lvl_next: "Level {l} အထိ {n} XP လိုသည်",
      promo_title: "Promo ကုဒ်များ",
      promo_help: "ကုဒ်များဖန်တီးပြီး post များတွင် မျှဝေပါ — ကျောင်းသားများက အခမဲ့ Premium ရက်များအတွက် လဲလှယ်နိုင်သည်။",
      promo_create: "ဖန်တီးရန်",
      promo_created: "ကုဒ် ဖန်တီးပြီးပါပြီ!",
      promo_err: "မသိမ်းနိုင်ပါ — firebase-rules.json အသစ်ကို အရင် publish လုပ်ပါ။",
      promo_days: "ရက်",
      promo_uses: "ကြိမ်",
      redeem_title: "Promo ကုဒ် ရှိပါသလား?",
      redeem_ph: "ဥပမာ LAUNCH20",
      redeem_btn: "လဲလှယ်ရန်",
      redeem_ok: "🎉 {d} အထိ Premium ရရှိပါပြီ!",
      redeem_invalid: "ကုဒ် မမှန်ပါ သို့မဟုတ် အသုံးပြုမှု ပြည့်သွားပါပြီ။",
      ex_editor: "သင့်ကုဒ်",
      ex_run: "Run နှင့် စစ်ဆေးရန်",
      ex_reset: "ကုဒ် ပြန်စရန်",
      ex_pass: "အောင်ပါပြီ! အရမ်းကောင်းပါသည်!",
      ex_fail: "မအောင်သေးပါ —",
      ex_timeout: "ရလဒ်မရပါ — ကုဒ်ထဲ အမှားရှိမရှိ စစ်ပါ။",
      buy_course: "ဤသင်တန်းတစ်ခုတည်း ဝယ်ရန်",
      prem_one_title: "သင်တန်းတစ်ခု ဖွင့်ရန်",
      prem_or_all: "Premium သင်တန်းအားလုံး ရယူရန်",
      prem_all_label: "အားလုံးရ Premium",
      purchased: "ဝယ်ပြီးပါပြီ — ဤသင်တန်းသည် သင့်ပိုင်ဖြစ်သည်!",
      chat_premium_only: "Chat သည် Premium ကျောင်းသားများအတွက် ဖြစ်သည်။ သင်တန်းတစ်ခု ဝယ်ခြင်း (သို့) Premium ရယူပြီး ပါဝင်ပါ!",
      comm_title: "အသိုင်းအဝိုင်း",
      comm_sub: "အတူတူ သင်ယူကြမယ် — မေးမယ်၊ ဖြေမယ်၊ အောင်မြင်မှုတွေ အတူဆင်နွှဲမယ်။",
      comm_home_sub: "Chat၊ ထိပ်တန်းကျောင်းသားများနှင့် စာကျက်ခန်းများ",
      comm_chat_title: "အသိုင်းအဝိုင်း chat",
      comm_chat_sub: "ပင်မခန်းတစ်ခု + premium သင်တန်းတိုင်းတွင် ကိုယ်ပိုင်စာကျက်ခန်း။ အားလုံးဖတ်နိုင်သည် — ဝယ်ယူထားသော ကျောင်းသားများ ရေးနိုင်သည်။",
      comm_open: "Chat ဖွင့်ရန်",
      comm_online: "ယခု အွန်လိုင်း",
      comm_quiet: "ယခု တိတ်ဆိတ်နေသည် — မင်္ဂလာပါလို့ အရင်ဆုံးပြောလိုက်ပါ!",
      comm_top_week: "ဒီအပတ် ထိပ်တန်းကျောင်းသားများ",
      comm_be_first: "ဒီအပတ် လှုပ်ရှားမှုမရှိသေးပါ — ဒီည သင့်နာမည် ဒီမှာရောက်နိုင်သည်!",
      comm_rooms: "သင်တန်း စာကျက်ခန်းများ",
      comm_rooms_sub: "Premium သင်တန်းတစ်ခုကို ဖွင့်လိုက်ပါ — chat သည် ထိုသင်တန်း၏ ခန်းသို့ အလိုအလျောက် ပြောင်းသည်။",
      comm_rules: "အသိုင်းအဝိုင်း စည်းမျဉ်းများ",
      comm_rule1: "ကြင်နာပါ — ဤနေရာရှိ လူတိုင်း သုညမှ စတင်ခဲ့ကြသည်။",
      comm_rule2: "လွတ်လပ်စွာ မေးပါ — မိုက်မဲသောမေးခွန်း မရှိပါ၊ အနာဂတ်ကျွမ်းကျင်သူများသာ ရှိသည်။",
      comm_rule3: "အောင်မြင်မှုရော bug တွေပါ မျှဝေပါ — နှစ်ခုလုံးက သူတစ်ပါးကို ကူညီသည်။",
      comm_rule4: "Spam မလုပ်ပါနှင့်၊ မရိုင်းပါနှင့် — admin များက ဤနေရာကို ဘေးကင်းအောင် ထိန်းသည်။",
      call_title: "ဗီဒီယို စာကျက်ခေါ်ဆိုမှု",
      call_start: "ဗီဒီယိုခေါ်ဆိုမှု စတင်ရန်",
      call_room: "စာကျက်ခန်း",
      call_locked: "ဗီဒီယို စာကျက်ခေါ်ဆိုမှုများသည် Premium ကျောင်းသားများအတွက် ဖြစ်သည် — သင်တန်းတစ်ခုဝယ်ခြင်း (သို့) Premium ရယူပြီး မျက်နှာချင်းဆိုင် စာကျက်ပါ!",
      call_newtab: "Tab အသစ်တွင် ဖွင့်ရန်",
      call_leave: "ထွက်ရန်",
      call_tip: "Browser က မေးလျှင် ကင်မရာနှင့် မိုက်ခရိုဖုန်း ခွင့်ပြုပါ။ ဤစာမျက်နှာကို သူငယ်ချင်းနှင့် မျှဝေပါ — ဤခန်းရှိလူတိုင်း တူညီသောခေါ်ဆိုမှုတွင် တွေ့ကြမည်။ Chrome တွင် အကောင်းဆုံး အလုပ်လုပ်သည်။",
      call_invite: "📹 ဗီဒီယို စာကျက်ခေါ်ဆိုမှု စတင်လိုက်ပြီ — ပါဝင်ရန် chat ခေါင်းစီးရှိ 📹 ခလုတ်ကို နှိပ်ပါ!",
      share_fb: "Facebook တွင် မျှဝေရန်",
      exercises_word: "လေ့ကျင့်ခန်း",
      nudge_streak: "သင့် {n} ရက် streak စောင့်နေသည် — ယနေ့ သင်ခန်းစာတစ်ခုက မီးကို ဆက်တောက်စေမည်!",
      goal_title: "အပတ်စဉ် ပန်းတိုင်",
      goal_sub: "ဒီအပတ် သင်ခန်းစာ ဘယ်နှစ်ခုလဲ? ပန်းတိုင်သေးသေးက အောင်မြင်မှုကြီးကြီး ရစေသည်။",
      goal_change: "ပြောင်းရန်",
      goal_progress: "ဒီအပတ် {g} ခုမှ {n} ခု ပြီးပြီ — ဆက်သွားပါ!",
      goal_done: "အပတ်စဉ်ပန်းတိုင် ရောက်ပြီ — သင်ကို ဘယ်သူမှ မတားနိုင်တော့ပါ!",
      reviews_err: "မသိမ်းနိုင်သေးပါ — database rules ကို အရင် publish လုပ်ရန် လိုသည်။",
      cc_title: "Content ဖန်တီးကိရိယာ",
      cc_help: "သင်တန်းရွေး (သို့ အထွေထွေကြော်ငြာ) → Facebook post စာသား ထုတ် → ✨ ဖြင့် AI က ပိုကောင်းအောင် ပြင်ပေးမည်။",
      cc_general: "အထွေထွေကြော်ငြာ (Academy တစ်ခုလုံး)",
      cc_generate: "ထုတ်ရန်",
      cc_ai: "AI ဖြင့်ပြင်ရန်",
      cc_ph: "သင့် Facebook post ဒီမှာ ပေါ်လာမည်…",
      cc_gen_first: "အရင် Generate နှိပ်ပါ။",
      community_join: "အသိုင်းအဝိုင်းသို့ ဝင်ရန်:",
      admin_use_template: "သင်ခန်းစာပုံစံ ထည့်ရန်",
      admin_template_confirm: "လက်ရှိအကြောင်းအရာကို စံပုံစံဖြင့် အစားထိုးမလား?",
      admin_ai_write: "AI ဖြင့်ရေးရန်",
      ai_no_key: "AI မသတ်မှတ်ရသေးပါ။ aistudio.google.com/apikey မှ အခမဲ့ key ယူပြီး js/ai.js တွင် ထည့်ပါ",
      ai_need_title: "သင်ခန်းစာခေါင်းစဉ်ကို အရင်ရိုက်ပါ — AI က ၎င်းမှစ၍ ရေးပေးမည်။",
      ai_working: "ရေးနေသည်…",
      ai_bad_reply: "AI ၏အဖြေကို ဖတ်၍မရပါ — ထပ်စမ်းကြည့်ပါ။",
      chat_ai_nokey: "AI မသတ်မှတ်ရသေးပါ သို့မဟုတ် ချိတ်ဆက်၍မရပါ — ထပ်စမ်းကြည့်ပါ (admin: AI settings ကိုစစ်ပါ)",
      prem_checking: "အသင်းဝင်အခြေအနေ စစ်ဆေးနေသည်…",
      chat_ai_thinking: "AI စဉ်းစားနေသည်…",
      tutor_title: "AI ဆရာ",
      tutor_sub: "ဒီသင်ခန်းစာအကြောင်း မေးပါ — သင်ဖတ်နေသည့်အရာကို AI သိသည်",
      tutor_simple: "ရိုးရှင်းစွာ ရှင်းပြပါ",
      tutor_burmese: "မြန်မာလို ရှင်းပြပါ",
      tutor_example: "နမူနာ ထပ်ပြပါ",
      tutor_practice: "လေ့ကျင့်ခန်း ပေးပါ",
      tutor_ph: "ဒီသင်ခန်းစာအကြောင်း AI ဆရာကို မေးပါ…",
      tutor_ask: "မေးရန်",
      tutor_thinking: "စဉ်းစားနေသည်…",
      tutor_premium: "AI ဆရာသည် Premium အသင်းဝင်များအတွက် ဖြစ်သည်။",
      chat_ai_premium: "@ai သည် Premium အသင်းဝင်များအတွက် ဖြစ်သည် — ⭐ Premium စာမျက်နှာကို ကြည့်ပါ",
      cert_download: "ပုံ ဒေါင်းလုဒ်",
      badge_fifty_lessons: "သင်ခန်းစာ ၅၀",
      badge_five_courses: "သင်တန်း ၅ ခု",
      badge_streak3: "၃ ရက် ဆက်တိုက်",
      badge_streak7: "၇ ရက် ဆက်တိုက်",
      badge_streak30: "ရက် ၃၀ ဆက်တိုက်",
      admin_preview: "အစမ်းကြည့်ရန်",
      admin_finst: "ဆရာအမည်",
      admin_fhours: "နာရီ (မထည့်လျှင် အလိုအလျောက်)",
      admin_colors: "ကတ်အရောင်များ",
      admin_flearn: "စာသင်သားများ သင်ယူရမည့်အရာ",
      admin_flearn_ph: "တစ်ကြောင်းလျှင် တစ်ချက်…",
      search_ph: "HTML, CSS, JavaScript ရှာဖွေရန်…",
      footer_tag: "သရုပ်ပြ သင်ယူမှုပလက်ဖောင်း။ HTML, CSS နှင့် JavaScript ဖြင့် တည်ဆောက်ထားသည်။",
      footer_saved: "သင့်တိုးတက်မှုကို ဤဘရောက်ဇာ (localStorage) တွင် သိမ်းဆည်းထားသည်။ အကောင့်လိုအပ်ခြင်းမရှိပါ။",

      hero_h1: "ဝဘ်ဆိုက်တည်ဆောက်နည်း သင်ယူပါ။",
      hero_p: "လက်တွေ့သင်ခန်းစာများ၊ ကုဒ်နမူနာများနှင့် စစ်ဆေးမေးခွန်းများဖြင့် HTML, CSS နှင့် JavaScript ကို အခမဲ့၊ ကိုယ်ပိုင်နှုန်းဖြင့် လေ့လာပါ။",
      hero_cta1: "Bootcamp စတင်ရန် →",
      hero_cta2: "သင်တန်းအားလုံးကြည့်ရန်",
      stat_courses: "သင်တန်းများ",
      stat_lessons: "သင်ခန်းစာများ",
      stat_rating: "ပျမ်းမျှအဆင့်",
      featured: "အထူးသင်တန်းများ",
      featured_sub: "မြန်မြန်စတင်နိုင်ရန် ရွေးချယ်ထားသော လမ်းကြောင်းများ။",
      trending: "လူကြိုက်များနေသော",
      trending_sub: "ယခုအချိန်တွင် စာသင်သားများ အများဆုံးတက်ရောက်နေသော သင်တန်းများ။",
      trending_live_sub: "လွန်ခဲ့သော ၇ ရက်အတွင်း စာသင်သားအစစ်များ ကြည့်ရှုမှုအပေါ် အခြေခံသည်။ 🔴 Live",
      search_results: "ရှာဖွေမှုရလဒ်များ",
      search_in_lessons: "သင်ခန်းစာများအတွင်း",
      lb_title: "အဆင့်ဇယား",
      lb_sub: "အကယ်ဒမီတစ်ခုလုံး၏ ထိပ်တန်းစာသင်သားများ — သင်ခန်းစာပြီးဆုံး၍ XP ရယူပါ။",
      lb_you: "သင်",
      lb_all: "စုစုပေါင်း",
      lb_week: "ဤအပတ်",
      lb_yourrank: "သင့်အဆင့်",
      lb_empty: "အဆင့်များ မရှိသေးပါ",
      lb_empty_sub: "အကောင့်ဝင်ပြီး သင်ခန်းစာတစ်ခုပြီးဆုံးပါက ဤနေရာတွင် ပေါ်လာမည်!",
      lb_offline: "အဆင့်ဇယားအတွက် Cloud ချိတ်ဆက်မှု လိုအပ်သည်။",
      lb_note: "⚡ XP = သင်ခန်းစာ ×၁၀ + စာမေးပွဲအောင် ×၅ · ထိပ်တန်း ၂၀ ဦးပြသည်",
      prem_title: "Premium အသင်းဝင်ရန်",
      prem_sub: "တစ်ကြိမ်တည်းပေးချေမှုဖြင့် premium သင်တန်းအားလုံး ဖွင့်လှစ်ပါ။",
      prem_once: "တစ်ကြိမ်တည်း ပေးချေမှု",
      prem_benefit_courses: "premium သင်တန်းများ ထာဝရဖွင့်လှစ်",
      prem_benefit_future: "နောင်လာမည့် premium သင်တန်းအားလုံး ပါဝင်",
      prem_benefit_cert: "ပြီးဆုံးသောသင်တန်းတိုင်းအတွက် အောင်လက်မှတ်",
      prem_login_first: "ဦးစွာ အကောင့်ဝင်ပါ (သို့) အခမဲ့အကောင့်ဖွင့်ပါ — အသင်းဝင်မှုသည် သင့်အီးမေးလ်နှင့် ချိတ်ဆက်ပါသည်။",
      prem_active: "သင်သည် Premium အသင်းဝင် ဖြစ်ပါပြီ!",
      prem_active_sub: "ဤအီးမေးလ်ဖြင့်ဝင်သည့် မည်သည့်စက်တွင်မဆို premium သင်တန်းအားလုံး ဖွင့်ပြီးဖြစ်သည်။",
      prem_pending: "ပေးချေမှု တင်သွင်းပြီး — အတည်ပြုချက် စောင့်ဆိုင်းနေသည်",
      prem_pending_sub: "အက်မင်မှ သင့် KBZPay လွှဲပြောင်းမှုကို စစ်ဆေးပြီး နာရီအနည်းငယ်အတွင်း ဖွင့်ပေးပါမည်။",
      prem_how: "ပေးချေနည်း",
      prem_step1: "ပေးပို့ရန်",
      prem_step1_qr: "QR ကုဒ်ကို စကင်ဖတ်ပါ —",
      prem_promo: "ပရိုမိုးရှင်း",
      prem_step2: "KBZPay note တွင် သင့်အကောင့်အီးမေးလ် ရေးပါ။",
      prem_step3: "အက်မင်စစ်ဆေးနိုင်ရန် ဤဖောင်ကို ဖြည့်ပါ:",
      prem_phone_label: "ပေးချေခဲ့သော KBZPay ဖုန်းနံပါတ်",
      prem_txn_label: "ငွေလွှဲ ID",
      prem_txn_ph: "နောက်ဆုံး ၆ လုံး သို့မဟုတ် note",
      prem_submit: "ပေးချေပြီးပါပြီ — စစ်ဆေးရန် တင်သွင်းမည်",
      prem_go: "Premium ဝင်ရန်",
      admin_payments: "ပေးချေမှုများ",
      admin_approve: "အတည်ပြုရန်",
      admin_reject: "ငြင်းပယ်ရန်",
      admin_no_payments: "ပေးချေမှု တောင်းဆိုချက် မရှိသေးပါ။",
      dash_admin_title: "ဒက်ရှ်ဘုတ်",
      dash_students: "ကျောင်းသားများ",
      dash_active: "တက်ကြွ (streak)",
      dash_members: "Premium အသင်းဝင်",
      dash_pending: "ဆိုင်းငံ့ ပေးချေမှု",
      dash_approved: "အတည်ပြုပြီး",
      dash_revenue: "ဝင်ငွေ (ခန့်မှန်း)",
      dash_review_pending: "ဆိုင်းငံ့ ပေးချေမှု {n} ခု စစ်ဆေးရန်",
      dash_popular: "လူကြိုက်အများဆုံး သင်တန်းများ",
      dash_views: "ကြည့်ရှုမှု",
      dash_top_students: "ထိပ်တန်း ကျောင်းသားများ",
      dash_none: "ဒေတာ မရှိသေးပါ။",
      dash_note: "Cloud မှ တိုက်ရိုက်။ ကျောင်းသားများသည် XP ရရှိမှသာ ဤနေရာတွင် ပေါ်လာမည်။ ဝင်ငွေမှာ ခန့်မှန်းချက် (အတည်ပြုပြီး × လက်ရှိစျေးနှုန်း) ဖြစ်သည်။",
      review_title: "နေ့စဉ် ပြန်လှန်လေ့ကျင့်ခန်း",
      review_sub: "ပြီးဆုံးပြီးသား သင်ခန်းစာများမှ မေးခွန်းအသစ်များ — မှတ်ဉာဏ်ကို ခိုင်မာစေပါ။",
      review_premium: "AI နေ့စဉ်ပြန်လှန်လေ့ကျင့်ခန်းသည် Premium လုပ်ဆောင်ချက်ဖြစ်သည်။",
      review_need: "သင်ခန်းစာ ၃ ခုအနည်းဆုံး အရင်ပြီးအောင်လုပ်ပြီးမှ ပြန်လာပါ။",
      review_ready: "သင် သင်ခန်းစာ {n} ခု ပြီးပါပြီ။ ယနေ့ပြန်လှန်ရန် အဆင်သင့်လား?",
      review_start: "ယနေ့ ပြန်လှန်ရန် စတင်ပါ",
      review_making: "AI က သင့်မေးခွန်းများ ရေးနေသည်…",
      review_score: "သင် {s} / {t} ရမှတ်ရသည်",
      review_again: "မေးခွန်းအသစ်",
      ann_title: "ကြေညာချက် ဘန်နာ",
      ann_help: "ကျောင်းသားတိုင်း ဆိုဒ်ထိပ်တွင်မြင်ရမည့် စာတစ်ကြောင်း တင်ပါ (ဥပမာ သတင်း၊ သင်တန်းအသစ်၊ အားလပ်ရက်)။",
      ann_post: "အားလုံးကို တင်ရန်",
      ann_clear: "ရှင်းရန်",
      ann_posted: "တင်ပြီးပါပြီ!",
      ann_cleared: "ရှင်းပြီးပါပြီ",
      ann_empty: "စာအရင်ရိုက်ပါ။",
      ann_err: "မသိမ်းနိုင်ပါ — database rules ကို update လုပ်ပြီးပြီလား?",
      search_more: "ပထမ သင်ခန်းစာရလဒ် ၃၀ ကိုပြထားသည် — ပိုတိကျရန် ရှာဖွေမှုကို ပြင်ဆင်ပါ။",
      browse_topic: "ခေါင်းစဉ်အလိုက် ရှာဖွေရန်",
      browse_sub: "သင်လေ့လာလိုသည်ကို တိုက်ရိုက်ရွေးပါ။",

      all_courses: "သင်တန်းအားလုံး",
      courses_word: "သင်တန်း",
      no_courses: "သင်တန်းမတွေ့ပါ",
      no_courses_sub: "အခြားခေါင်းစဉ်တစ်ခု စမ်းကြည့်ပါ သို့မဟုတ် ရှာဖွေမှုကိုရှင်းလင်းပါ။",

      students: "ကျောင်းသား",
      lessons_word: "သင်ခန်းစာ",
      hrs: "နာရီ",
      enrolled: "စာရင်းသွင်းပြီး",
      pct_complete_word: "ပြီးစီး",

      ratings: "အဆင့်သတ်မှတ်ချက်",
      created_by: "ဖန်တီးသူ",
      enroll_now: "ယခုစာရင်းသွင်းရန် —",
      continue_learning: "ဆက်လက်သင်ယူရန်",
      start_course: "သင်တန်းစတင်ရန်",
      what_learn: "သင်လေ့လာရမည့်အရာများ",
      description: "ဖော်ပြချက်",
      course_content: "သင်တန်းအကြောင်းအရာ",
      sections_word: "အခန်း",
      hours_word: "နာရီ",
      instructor: "သင်ကြားသူ",
      instructor_bio: "ခက်ခဲသောအကြောင်းအရာများကို နားလည်လွယ်အောင် သင်ကြားပေးသည့် အတွေ့အကြုံရင့် developer နှင့် ဆရာ။ ကျောင်းသားထောင်ပေါင်းများစွာ ဤသင်ခန်းစာများဖြင့် ၎င်းတို့၏ ပထမဆုံးဝဘ်ဆိုက်များကို တည်ဆောက်ခဲ့ကြသည်။",
      instructor_role: "သင်ကြားသူ",
      includes_title: "ဤသင်တန်းတွင် ပါဝင်သည်-",
      quizzes_word: "မေးခွန်း",
      inc_cert: "ပြီးဆုံးလက်မှတ်",
      inc_offline: "အင်တာနက်မလိုဘဲ အလုပ်လုပ်သည်",
      inc_bilingual: "အင်္ဂလိပ် + မြန်မာ",
      inc_lifetime: "တစ်သက်တာ သုံးခွင့် — ကိုယ်ပိုင်နှုန်းဖြင့် သင်ယူပါ",
      requirements: "လိုအပ်ချက်များ",
      req_none: "ကုဒ်ရေးဖူးရန် မလိုပါ — စိတ်ဝင်စားမှုသာ လိုသည်။",
      req_device: "ဝဘ်ဘရောက်ဇာပါသော ဖုန်း သို့မဟုတ် ကွန်ပျူတာ။",
      req_basics: "အခြေခံ HTML, CSS & JavaScript ကျွမ်းကျင်ရန် (အသစ်ဆိုလျှင် အခြေခံသင်တန်းများ အရင်တက်ပါ)။",
      who_for: "ဤသင်တန်းသည် မည်သူ့အတွက်နည်း",
      who_1_beg: "လက်တွေ့တည်ဆောက်ရင်း သင်ယူလိုသော အစပြုသူများ။",
      who_1_adv: "{cat} တွင် အခြေခံကျော်လွန်ရန် အသင့်ဖြစ်သူများ။",
      who_2: "ရှင်းလင်းသော၊ နှစ်ဘာသာ၊ လက်တွေ့သင်ခန်းစာများ လိုချင်သည့် မြန်မာကျောင်းသားများ။",
      share_course: "ဤသင်တန်းကို မျှဝေရန်",
      soon_badge: "ထပ်လာမည်",
      soon_note: "🚧 ဤသည်မှာ အစပြုသင်တန်းဖြစ်သည် — ယခု အခြေခံအချက်များပါဝင်ပြီး သင်ခန်းစာများ ထပ်ထည့်နေပါသည်။ ပြီးဆုံးအောင်လုပ်လျှင် streak, XP နှင့် လက်မှတ်အတွက် ရေတွက်ပါသည်!",
      hours_content: "နာရီ အကြောင်းအရာ",
      lessons_quizzes: "သင်ခန်းစာနှင့် မေးခွန်း",
      pace: "ကိုယ်ပိုင်နှုန်းဖြင့် သင်ယူပါ",
      saved_auto: "တိုးတက်မှုကို အလိုအလျောက်သိမ်းဆည်းသည်",

      lesson_word: "သင်ခန်းစာ",
      mark_complete: "ပြီးစီးအဖြစ်မှတ်ရန်",
      completed: "✓ ပြီးစီးပြီး",
      next_lesson: "နောက်သင်ခန်းစာ →",
      previous: "← ယခင်",
      finish: "ပြီးဆုံး 🎓",
      complete_word: "ပြီးစီး",

      quiz_intro_a: "မေးခွန်း",
      quiz_intro_b: "ခုလုံးဖြေဆိုပြီး ရလဒ်ကိုစစ်ဆေးပါ။ အချိန်မရွေး ပြန်ဖြေနိုင်သည်။",
      check_answers: "အဖြေစစ်ရန်",
      you_scored: "သင့်ရမှတ်",
      passed_msg: "အောင်မြင်ပါသည် — တော်ပါပေတယ်!",
      fail_msg: "သင်ခန်းစာကိုပြန်လေ့လာပြီး ထပ်ကြိုးစားပါ။",
      marked_complete: "သင်ခန်းစာကို ပြီးစီးအဖြစ်မှတ်လိုက်ပါပြီ။ နောက်သင်ခန်းစာအတွက် အောက်သို့ဆွဲချပါ။",

      my_learning: "ကျွန်ုပ်၏သင်ယူမှု",
      enrolled_word: "စာရင်းသွင်းထားသောသင်တန်း",
      keep_going: "ဆက်ကြိုးစားပါ!",
      continue: "ဆက်လုပ်ရန်",
      start: "စတင်ရန်",
      review: "ပြန်လည်သုံးသပ်ရန်",
      empty_title: "သင်ဘာမှ စာရင်းမသွင်းရသေးပါ",
      empty_sub: "သင်တန်းတစ်ခုရွေးပါ၊ သင့်တိုးတက်မှု ဤနေရာတွင်ပေါ်လာပါမည်။",
      browse_courses: "သင်တန်းများကြည့်ရန်",

      notfound: "စာမျက်နှာ မတွေ့ပါ",
      back_home: "မူလသို့ပြန်ရန်",

      auth_login: "အကောင့်ဝင်ရန်",
      auth_logout: "ထွက်ရန်",
      auth_signup: "အကောင့်ဖွင့်ရန်",
      auth_login_title: "သင့်အကောင့်သို့ ဝင်ရောက်ပါ",
      auth_signup_title: "သင့်အကောင့်ဖန်တီးပါ",
      auth_name: "အမည်အပြည့်အစုံ",
      auth_email: "အီးမေးလ်",
      auth_password: "စကားဝှက်",
      auth_login_btn: "ဝင်ရောက်ရန်",
      auth_signup_btn: "အကောင့်ဖန်တီးရန်",
      auth_or: "သို့မဟုတ်",
      auth_google_hint: "အကြံပြုချက်: အီးမေးလ် + စကားဝှက်သည် ကွန်ရက်တိုင်းတွင် အလုပ်လုပ်သည်။ Google ဝင်ရောက်ခြင်းသည် မြန်မာနိုင်ငံ အချို့ကွန်ရက်များတွင် အလုပ်မလုပ်နိုင်ပါ။",
      install_app: "ထည့်သွင်းရန်",
      auth_google: "Google ဖြင့် ဆက်လက်ဝင်ရောက်ရန်",
      auth_have_account: "အကောင့်ရှိပြီးသားလား?",
      auth_no_account: "အကောင့်မရှိသေးဘူးလား?",
      auth_switch_login: "ဝင်ရောက်ရန်",
      auth_switch_signup: "အကောင့်ဖွင့်ရန်",
      auth_err_required: "အကွက်အားလုံးဖြည့်ပါ။",
      auth_err_email: "မှန်ကန်သော အီးမေးလ်လိပ်စာထည့်ပါ။",
      auth_err_exists: "ဤအီးမေးလ်ဖြင့် အကောင့်ရှိပြီးသားဖြစ်သည်။",
      auth_err_notfound: "အကောင့်မတွေ့ပါ — အီးမေးလ်ကိုစစ်ပါ သို့မဟုတ် အကောင့်ဖွင့်ပါ။",
      auth_err_wrongpass: "စကားဝှက် မမှန်ပါ။",
      auth_err_useprovider: "ဤအကောင့်သည် Google ဖြင့်ဖွင့်ထားသည် — Google ခလုတ်ဖြင့် ဝင်ပါ။",
      auth_err_shortpass: "စကားဝှက်သည် အနည်းဆုံး စာလုံး ၆ လုံးရှိရမည်။",
      auth_google_demo_note: "စမ်းသပ်မုဒ် — အစစ်အမှန်ဝင်ရန် js/auth.js တွင် Google Client ID ထည့်ပါ။",
      auth_account: "ကျွန်ုပ်၏အကောင့်",
      auth_account_title: "ကျွန်ုပ်၏အကောင့်",
      auth_display_name: "ဖော်ပြအမည်",
      auth_save_changes: "ပြောင်းလဲမှုသိမ်းရန်",
      auth_profile_saved: "ပရိုဖိုင် အပ်ဒိတ်ပြီးပါပြီ။",
      auth_change_password: "စကားဝှက်ပြောင်းရန်",
      auth_current_password: "လက်ရှိစကားဝှက်",
      auth_new_password: "စကားဝှက်အသစ်",
      auth_update_password: "စကားဝှက်အပ်ဒိတ်ရန်",
      auth_password_updated: "စကားဝှက် အပ်ဒိတ်ပြီးပါပြီ။",
      auth_err_wrong_current: "လက်ရှိစကားဝှက် မမှန်ပါ။",
      auth_google_account_note: "သင်သည် Google ဖြင့်ဝင်ရောက်ထားသည် — ဤနေရာတွင် စီမံရန် စကားဝှက်မရှိပါ။",
      auth_forgot: "စကားဝှက်မေ့နေပါသလား?",
      auth_reset_title: "သင့်စကားဝှက်ကို ပြန်လည်သတ်မှတ်ရန်",
      auth_reset_desc: "သင့်အီးမေးလ်ကိုထည့်ပါ၊ စကားဝှက်ပြန်သတ်မှတ်ရန် လင့်ခ်ပို့ပေးပါမည်။",
      auth_reset_btn: "ပြန်သတ်မှတ်လင့်ခ် ပို့ရန်",
      auth_reset_sent: "ပို့ပြီးပါပြီ! အီးမေးလ် (နှင့် spam) ကိုစစ်ပါ — ပြီးရင် နောက်တစ်ဆင့်တွင် လင့်ခ်ကို paste လုပ်ပါ။",
      reset_set_title: "စကားဝှက်အသစ် သတ်မှတ်ပါ",
      reset_paste_help: "ပြန်သတ်မှတ်လင့်ခ်သည် သင့်ကွန်ရက်တွင် ပွင့်မလာနိုင်ပါ — ပြဿနာမရှိပါ။ ကျွန်ုပ်တို့ပို့သည့် အီးမေးလ်ကိုဖွင့်၍ လင့်ခ်တစ်ခုလုံးကို COPY (ဖိထား → Copy link) လုပ်ပြီး အောက်တွင် paste လုပ်ပါ။",
      reset_paste_label: "သင့်ပြန်သတ်မှတ်လင့်ခ်ကို ဤနေရာတွင် paste လုပ်ပါ",
      reset_confirm: "စကားဝှက်အသစ် အတည်ပြုပါ",
      reset_set_btn: "စကားဝှက်အသစ် သတ်မှတ်ရန်",
      reset_have_link: "ကျွန်ုပ်တွင် ပြန်သတ်မှတ်လင့်ခ် ရှိပြီးသား",
      reset_back_email: "အီးမေးလ်ပို့ရန်သို့ ပြန်သွားရန်",
      reset_no_code: "ဤသည်မှာ ပြန်သတ်မှတ်လင့်ခ် မဟုတ်ပါ — အီးမေးလ်မှ လင့်ခ်တစ်ခုလုံးကို ကူးယူပါ။",
      reset_bad_code: "ဤလင့်ခ် သက်တမ်းကုန်သွားပြီ သို့မဟုတ် သုံးပြီးဖြစ်သည်။ အသစ်တစ်ခု ပြန်ပို့ပါ။",
      reset_mismatch: "စကားဝှက်နှစ်ခု မတူပါ။",
      reset_done: "✅ စကားဝှက် ပြောင်းပြီးပါပြီ! စကားဝှက်အသစ်ဖြင့် ပြန်ဝင်ပါ။",
      auth_verify_sent: "အကောင့်ဖွင့်ပြီးပါပြီ! အတည်ပြုလင့်ခ်အတွက် သင့်အီးမေးလ်ကိုစစ်ပါ။",
      auth_unverified: "အီးမေးလ် အတည်မပြုရသေးပါ",
      auth_back_login: "← ဝင်ရောက်ရန်သို့ ပြန်သွားရန်",
      auth_err_reset_notfound: "ထိုလိပ်စာအတွက် အီးမေးလ်/စကားဝှက် အကောင့်မတွေ့ပါ။",
      auth_err_network: "ကွန်ရက်ပြဿနာ — အင်တာနက်စစ်ပြီး ထပ်စမ်းပါ။",
      auth_err_toomany: "ကြိုးစားမှုများနေသည်။ တစ်မိနစ်စောင့်ပြီး ထပ်စမ်းပါ။",
      auth_err_popup: "Google ဝင်ရောက်ရန် window ကို ပိတ်ဆို့ထားသည် — popup ခွင့်ပြုပြီး ထပ်စမ်းပါ။",
      auth_err_diffcred: "ဤအီးမေးလ်တွင် အခြားဝင်ရောက်နည်းဖြင့် အကောင့်ရှိပြီးသားဖြစ်သည်။",
      auth_err_notenabled: "ဤဝင်ရောက်နည်း မဖွင့်ရသေးပါ (admin: Firebase တွင်ဖွင့်ပါ)။",
      auth_err_domain: "ဤဝဘ်ဆိုဒ်ကို ဝင်ရောက်ရန် ခွင့်မပြုရသေးပါ (admin: Firebase တွင် domain ထည့်ပါ)။",
      auth_login_required: "စာရင်းသွင်းရန် အကောင့်ဝင်ပါ။",
      price_free: "အခမဲ့",
      price_premium: "ပရီမီယမ်",
      login_to_enroll: "စာရင်းသွင်းရန် အကောင့်ဝင်ပါ",
      guest_free_note: "အခမဲ့သင်တန်းများကို လူတိုင်းအသုံးပြုနိုင်သည် — အကောင့်မလို။ ပရီမီယမ်သင်တန်းများအတွက် အခမဲ့အကောင့်ဝင်ရန်လိုသည်။",
      chat_title: "အသိုင်းအဝိုင်း ချက်တ်",
      chat_empty: "မက်ဆေ့ဂျ်မရှိသေးပါ — နှုတ်ဆက်လိုက်ပါ! 👋",
      chat_login: "ချက်တ်ရန် အကောင့်ဝင်ပါ",
      chat_placeholder: "မက်ဆေ့ဂျ်ရေးပါ…",
      chat_delete: "ဖျက်ရန်",
      chat_course_room: "သင်တန်း ချက်တ်",
      chat_edit_tooltip: "ပြင်ဆင်ရန်",
      chat_react_tooltip: "ကျေးဇူးတင်ရန်",
      chat_pin_tooltip: "ပင်မထားရန်",
      chat_online: "အွန်လိုင်း",
      chat_send_err: "ပို့၍မရပါ — အင်တာနက်ချိတ်ဆက်မှုစစ်ပြီး ထပ်ကြိုးစားပါ။",
      chat_cloud_err: "ယခုအချိန်တွင် Cloud ချက်တ်သို့ ချိတ်ဆက်၍မရပါ။",
      chat_slow_down: "အလွန်မြန်နေသည် — စက္ကန့်အနည်းငယ်စောင့်ပါ။",
      chat_go_community: "အသိုင်းအဝိုင်း",
      chat_reply: "ပြန်စာ",
      chat_photo: "ဓာတ်ပုံပို့ရန်",
      chat_img_err: "ဓာတ်ပုံကို လုပ်ဆောင်၍မရပါ — ပိုသေးသောပုံ စမ်းကြည့်ပါ။",
      role_admin: "အက်မင်",
      admin_only: "အက်မင်များသာ",
      admin_only_sub: "အက်မင်အကောင့်များသာ သင်တန်းများ ဖန်တီး/ပြင်ဆင်နိုင်ပါသည်။",

      theme_toggle: "အလင်း / အမှောင် ပြောင်းရန်",

      cert_view: "လက်မှတ်ကြည့်ရန်",
      cert_title: "ပြီးဆုံးကြောင်း လက်မှတ်",
      cert_intro: "ဤလက်မှတ်သည် အောက်ပါသူအား အသိအမှတ်ပြုသည်",
      cert_completed: "အောက်ပါသင်တန်းကို အောင်မြင်စွာ ပြီးဆုံးခဲ့သည်",
      cert_print: "ဒေါင်းလုဒ် / ပရင့်ထုတ်ရန်",
      cert_back: "သင်တန်းသို့ ပြန်သွားရန်",
      cert_congrats: "🎉 သင်တန်းပြီးဆုံးပါပြီ!",
      cert_locked: "လက်မှတ်ရရှိရန် သင်ခန်းစာအားလုံးကို ပြီးအောင်လုပ်ပါ။",

      reviews_title: "အဆင့်သတ်မှတ်ချက်နှင့် သုံးသပ်ချက်များ",
      reviews_none: "သုံးသပ်ချက်မရှိသေးပါ — ပထမဆုံးဖြစ်လိုက်ပါ!",
      reviews_your_rating: "သင့်အဆင့်သတ်မှတ်ချက်",
      reviews_placeholder: "သင့်ထင်မြင်ချက်ကို မျှဝေပါ…",
      reviews_submit: "သုံးသပ်ချက်တင်ရန်",
      reviews_login: "သုံးသပ်ချက်ရေးရန် အကောင့်ဝင်ပါ",
      reviews_word: "သုံးသပ်ချက်",

      filter_level: "အဆင့်",
      filter_price: "စျေးနှုန်း",
      filter_sort: "စီရန်",
      sort_popular: "လူကြိုက်အများဆုံး",
      sort_rating: "အဆင့်အမြင့်ဆုံး",
      sort_az: "A–Z",
      opt_all: "အားလုံး",

      admin: "သင်တန်းဖန်တီးရန်",
      admin_title: "သင်တန်းများ ဖန်တီး / စီမံရန်",
      admin_your: "သင့်သင်တန်းများ",
      admin_none: "သင်တန်းဖန်တီးထားခြင်း မရှိသေးပါ။",
      admin_ftitle: "သင်တန်းခေါင်းစဉ်",
      admin_fsub: "ခေါင်းစဉ်ခွဲ",
      admin_fcat: "အမျိုးအစား",
      admin_flevel: "အဆင့်",
      admin_fdesc: "ဖော်ပြချက်",
      admin_ficon: "အိုင်ကွန် (emoji သို့မဟုတ် စာသား)",
      admin_ffree: "အခမဲ့ (ဧည့်သည်များ ဝင်ရောက်နိုင်သည်)",
      admin_lessons: "သင်ခန်းစာများ",
      admin_ltitle: "သင်ခန်းစာခေါင်းစဉ်",
      admin_lvideo: "ဗီဒီယို URL (မထည့်လည်းရ)",
      admin_lnotes: "သင်ခန်းစာအကြောင်းအရာ — ဤနေရာတွင် ရေးပါ (စာသား သို့မဟုတ် HTML)",
      admin_upload_video: "ဗီဒီယိုတင်ရန်",
      admin_uploading: "ဗီဒီယိုသိမ်းနေသည်…",
      admin_upload_toobig: "ဖိုင်ကြီးလွန်းသည် (အများဆုံး 500 MB)",
      admin_upload_err: "ဤဘရောက်ဇာတွင် ဗီဒီယိုသိမ်း၍မရပါ။",
      admin_addlesson: "+ သင်ခန်းစာထည့်ရန်",
      admin_save: "သင်တန်းသိမ်းရန်",
      admin_saved: "သင်တန်းသိမ်းပြီးပါပြီ!",
      admin_delete: "ဖျက်ရန်",
      admin_deleteq: "ဤသင်တန်းကို ဖျက်မလား?",
      admin_edit: "ပြင်ရန်",
      admin_need_title: "သင်တန်းခေါင်းစဉ်နှင့် အနည်းဆုံး သင်ခန်းစာတစ်ခု ထည့်ပါ။",
      admin_yours_badge: "သင့်ဟာ",
      admin_ltype: "အမျိုးအစား",
      type_video: "ဗီဒီယို",
      type_article: "ဆောင်းပါး",
      type_quiz: "မေးခွန်း",
      admin_add_question: "+ မေးခွန်းထည့်ရန်",
      admin_question: "မေးခွန်း",
      admin_option: "ရွေးချယ်စရာ",
      admin_correct: "အဖြေမှန်",
      admin_add_section: "+ အခန်းထည့်ရန်",
      admin_section: "အခန်းခေါင်းစဉ်",
      admin_image: "ပုံ URL (မထည့်လည်းရ)",

      notes_title: "သင့်မှတ်စုများ",
      notes_placeholder: "ဤသင်ခန်းစာအတွက် ကိုယ်ပိုင်မှတ်စုရေးပါ…",
      notes_saved: "သိမ်းပြီး ✓",
      bookmark: "မှတ်သားရန်",
      bookmarked: "မှတ်သားပြီး",
      spent: "ကြာချိန်",
      comments_title: "ဆွေးနွေး",
      comment_placeholder: "မေးခွန်းများမေးခြင်း သို့မဟုတ် သင်၏အတွေးအခေါ်များဝေမျှပါ…",
      comment_post: "ပို့ရန်",
      comment_login: "ဆွေးနွေးမှုတွင်ဆိုင်းဖြူ့ရန် ကျေးဇူးပြု၍ အကောင့်သို့ဝင်ပါ။",
      resume_title: "ဆက်လက်လေ့လာရန်",
      bookmarks_title: "မှတ်သားထားသော သင်ခန်းစာများ",
      bookmarks_none: "မှတ်သားထားခြင်းမရှိသေးပါ — သင်ခန်းစာတွင် မှတ်သားရန် ကိုနှိပ်ပါ။",
      recommended_title: "သင့်အတွက် အကြံပြုထားသည်",

      shortcuts_title: "ကီးဘုတ် အတိုကျ",
      shortcut_next: "နောက်သင်ခန်းစာ",
      shortcut_prev: "ယခင်သင်ခန်းစာ",
      shortcut_bookmark: "မှတ်သားခြင်း ပြောင်းလဲရန်",
      shortcut_complete: "ပြီးဆုံးခြင်းကို မှတ်သားရန်",
      shortcut_help: "ဤအကူအညီကိုပြပါ",
      close_modal: "ပိတ်ရန်",

      quiz_best: "အမြင့်ဆုံး",

      dash_title: "သင့်ဒက်ရှ်ဘုတ်",
      stat_xp: "XP",
      stat_level: "အဆင့်",
      stat_completed: "ပြီးသောသင်ခန်းစာ",
      stat_courses_done: "ပြီးသောသင်တန်း",
      stat_certs: "လက်မှတ်များ",
      stat_streak: "ဆက်တိုက်ရက်",
      badges_title: "တံဆိပ်များ",
      badge_first_lesson: "ပထမခြေလှမ်း",
      badge_first_course: "ပြီးမြောက်သူ",
      badge_ten_lessons: "အားထုတ်လာပြီ",
      badge_quiz_ace: "မေးခွန်းကျွမ်းကျင်သူ",
      badge_bilingual: "ဘာသာနှစ်မျိုး",
      badge_locked: "သော့ခတ်ထား",

      data_title: "အရန်သိမ်း & ပြန်ယူ",
      data_desc: "သင့်တိုးတက်မှု၊ မှတ်စုများနှင့် ဖန်တီးထားသောသင်တန်းများအားလုံးကို ဖိုင်အဖြစ်ဒေါင်းလုဒ်လုပ်ပါ — သို့မဟုတ် ပြန်လည်ရယူပါ။",
      transcript_export: "📋 မှတ်တမ်းထုတ်ယူရန်",
      data_export: "ဒေတာထုတ်ယူရန်",
      data_import: "ဒေတာသွင်းရန်",
      data_imported: "ဒေတာသွင်းပြီး — ပြန်လည်ဖွင့်နေသည်…",
      data_import_err: "ထိုဖိုင်ကို ဖတ်၍မရပါ။",

      cert_id: "လက်မှတ်နံပါတ်",
      cert_copy: "မျှဝေလင့်ခ်ကူးရန်",
      cert_copied: "လင့်ခ်ကူးပြီး!",
    },
  },

  cat: {
    my: {
      All: "အားလုံး",
      Fundamentals: "အခြေခံ",
      HTML: "HTML",
      CSS: "CSS",
      JavaScript: "JavaScript",
      Responsive: "Responsive",
      Career: "အသက်မွေးဝမ်းကြောင်း",
    },
  },
  level: {
    my: {
      Beginner: "အခြေခံ",
      Intermediate: "အလယ်အလတ်",
      "All Levels": "အဆင့်အားလုံး",
    },
  },
  price: {
    my: { Free: "အခမဲ့" },
  },

  content: {
    /* ---- course metadata (Myanmar) ---- */
    courses: {
      "zero-to-hero": {
        title: "Web Developer — သုညမှ သူရဲကောင်းသို့",
        subtitle: "လမ်းညွှန်ပြည့်ခရီးစဉ် — တစ်ကြောင်းမှမရေးဖူးသူမှ တိုက်ရိုက်တင်ထားသော portfolio၊ တကယ့်ပရောဂျက်များနှင့် ပထမဆုံးဝင်ငွေအထိ။",
        description:
          "သင်တန်းတစ်ခုတည်းနှင့် ခရီးစဉ်တစ်ခုလုံး။ အဆင့် ၈ ဆင့်က သင့်ကို လုံးဝသုည — အတွေ့အကြုံမရှိ၊ ဖုန်း သို့မဟုတ် လက်ပ်တော့တစ်လုံးသာ — မှ သူရဲကောင်းအဆင့်သို့ ပို့ဆောင်ပေးမည်- အင်တာနက်ပေါ်ရှိ တကယ့်ဝဘ်ဆိုက်၊ portfolio ထဲက တကယ့်ပရောဂျက်များနှင့် ပထမဆုံး developer ဝင်ငွေအစီအစဉ်။ အဆင့်တိုင်း၏အဆုံးတွင် စစ်ဆေးမှုရှိသည် (quiz သို့မဟုတ် ကုဒ်ကို အလိုအလျောက်စစ်ပေးသော လေ့ကျင့်ခန်း)။",
        whatYouLearn: [
          "HTML ဖြင့် တကယ့်စာမျက်နှာများ တည်ဆောက်ပြီး CSS ဖြင့် စတိုင်လုပ်ကာ JavaScript ဖြင့် အသက်သွင်းခြင်း",
          "ဖုန်း၊ တက်ဘလက်၊ လက်ပ်တော့ အားလုံးတွင် လှပသော ဆိုက်များ ပြုလုပ်ခြင်း",
          "Git နှင့် GitHub ကို ပရော်ဖက်ရှင်နယ်လို အသုံးပြုပြီး ဆိုက်ကို အခမဲ့ တိုက်ရိုက်တင်ခြင်း",
          "API များမှ တိုက်ရိုက်ဒေတာယူပြီး ဒေတာအခြေခံ mini app တည်ဆောက်ခြင်း",
          "Server နှင့် database များ၏ အလုပ်လုပ်ပုံကို နားလည်ခြင်း (full stack သို့ တံတား)",
          "ကျွမ်းကျင်မှုကို ဝင်ငွေအဖြစ်ပြောင်းခြင်း — portfolio၊ freelance နှင့် ပထမဆုံးအလုပ်",
        ],
      },
      "fullstack": {
        title: "Full Stack Developer",
        subtitle: "ပထမဆုံး HTML tag မှ server နှင့် database ပါသော app အပြည့်အစုံအထိ ခရီးစဉ်တစ်ခုတည်း။",
      },
      "n8n-automation": {
        title: "n8n Automation နှင့် AI Agent များ",
        subtitle: "အလိုအလျောက်စနစ်များနှင့် AI agent များကို မြင်ကွင်းဖြင့် တည်ဆောက်ပါ — app, API နှင့် LLM များကို ကုဒ်အပိုမလိုဘဲ ချိတ်ဆက်ပါ။",
      },
      "ai-engineering": {
        title: "Agentic AI အင်ဂျင်နီယာပညာ",
        subtitle: "Prompt ထက်ကျော်လွန်ပါ — LangChain, RAG, vector database, agent နှင့် MCP ဖြင့် ကိုယ်ပိုင်ဆုံးဖြတ်နိုင်သော AI စနစ်များ တည်ဆောက်ပါ။",
      },
      "cloud-computing": {
        title: "Cloud Computing အခြေခံများ",
        subtitle: "AWS, Azure နှင့် Google Cloud ကို သုညမှ နားလည်ပါ — compute, storage, networking, serverless နှင့် certification လမ်းပြမြေပုံ။",
      },
      "devops": {
        title: "DevOps, Docker နှင့် Kubernetes",
        subtitle: "ပရော်ဖက်ရှင်နယ်လို software ကို ထုပ်ပိုး၊ ပို့ဆောင်၊ အလိုအလျောက်လုပ်၊ စောင့်ကြည့်ပါ — container, CI/CD pipeline နှင့် orchestration။",
      },
      "html-deep-dive": {
        title: "HTML နက်နက်နဲနဲ — Semantic Markup, Form နှင့် Table များ",
        subtitle: "သန့်ရှင်းပြီး ပရော်ဖက်ရှင်နယ်ကျသော HTML ရေးပါ — ဝဘ်ဆိုက်ကောင်းတိုင်း၏ အရိုးစုဖြစ်သည်။",
      },
      "python-basics": {
        title: "အစပြုသူများအတွက် Python",
        subtitle: "ကမ္ဘာ့အဖော်ရဆုံး programming ဘာသာစကား — သုညမှ တကယ့် script များရေးသည်အထိ။",
      },
      "java-basics": {
        title: "Java အခြေခံများ",
        subtitle: "Android app နှင့် လုပ်ငန်းကြီးစနစ်များနောက်ကွယ်က ဘာသာစကား — နေရာတိုင်းတွင် ရှိသည်။",
      },
      "c-basics": {
        title: "C Programming အခြေခံများ",
        subtitle: "Operating system များကို မောင်းနှင်သော ဂန္ထဝင်ဘာသာစကား — ကွန်ပျူတာ တကယ်အလုပ်လုပ်ပုံကို သင်ပေးသည်။",
      },
      "cpp-basics": {
        title: "C++ အခြေခံများ",
        subtitle: "C ၏ စွမ်းအားပြည့် ဆက်ခံသူ — game engine, ငွေကြေးနှင့် မြန်နှုန်းမြင့် software များ၏ ဘာသာစကား။",
      },
      "csharp-basics": {
        title: "C# အခြေခံများ",
        subtitle: "Microsoft ၏ ဘက်စုံကောင်းဘာသာစကား — desktop app, .NET web API နှင့် Unity game များ။",
      },
      "kotlin-basics": {
        title: "Kotlin အခြေခံများ",
        subtitle: "Android ၏ ခေတ်မီဘာသာစကား — ကျစ်လျစ်၊ ဘေးကင်းပြီး ရေးရပျော်သည်။",
      },
      "r-basics": {
        title: "ဒေတာခွဲခြမ်းစိတ်ဖြာမှုအတွက် R",
        subtitle: "ကိန်းဂဏန်းတွက်၊ dataset အနှစ်ချုပ်၊ chart ဆွဲ — စာရင်းအင်းပညာရှင်၏ ဘာသာစကား။",
      },
      "dsa-basics": {
        title: "Data Structure နှင့် Algorithm များ",
        subtitle: "Interview မေးခွန်းတိုင်းနှင့် မြန်ဆန်သော program တိုင်း၏ နောက်ကွယ်က တွေးခေါ်နည်းများ။",
      },
      "git-basics": {
        title: "Git နှင့် GitHub အခြေခံများ",
        subtitle: "Version control သည် developer ၏ စွမ်းအားထူး — အလုပ်ဘယ်တော့မှ မပျောက်၊ မည်သူနှင့်မဆို ပူးပေါင်းနိုင်။",
      },
      "docker-basics": {
        title: "Docker အခြေခံများ",
        subtitle: "ကျွန်တော့စက်မှာတော့ ရတယ် ပြဿနာ — ဖြေရှင်းပြီး။ App များကို နေရာတိုင်းမောင်းနိုင်သော container ထဲ ထုပ်ပိုးပါ။",
      },
      "excel-basics": {
        title: "အစပြုသူများအတွက် Excel",
        subtitle: "ကမ္ဘာ့အသုံးအများဆုံး ဒေတာကိရိယာ — အလုပ်နှင့်ပညာရေးအတွက် formula, function နှင့် chart များ။",
      },
      "react-basics": {
        title: "React အခြေခံများ",
        subtitle: "အလိုအပ်ဆုံး frontend library — ပြန်သုံးနိုင်သော component များဖြင့် UI တည်ဆောက်ပါ။",
      },
      "vue-basics": {
        title: "Vue.js အခြေခံများ",
        subtitle: "တစ်ဆင့်ချင်းတိုးနိုင်သော framework — သင်ရလွယ်ပြီး ရလဒ်စွမ်းအားကြီးသည်။",
      },
      "jquery-basics": {
        title: "jQuery အမြန်စတင်ခြင်း",
        subtitle: "ဆိုက်သန်းချီတွင် ရှိနေဆဲ — DOM ကို တစ်ကြောင်းတည်းဖြင့် ရွေး၊ စတိုင်လုပ်၊ လှုပ်ရှားစေပါ။",
      },
      "bootstrap-basics": {
        title: "Bootstrap နှင့် CSS Framework များ",
        subtitle: "အသင့်သုံး component များဖြင့် ချောမွေ့ responsive စာမျက်နှာများကို နာရီပိုင်းအတွင်း ထုတ်ပါ။",
      },
      "node-express": {
        title: "Node.js နှင့် Express",
        subtitle: "Server ပေါ်က JavaScript — တကယ့် app များကို မောင်းနှင်သော API များ တည်ဆောက်ပါ။",
      },
      "php-basics": {
        title: "ဝဘ်အတွက် PHP",
        subtitle: "ဝဘ်အများစုကို မောင်းနှင်နေသော ဘာသာစကား — WordPress, Laravel နှင့် ဆိုက်သန်းပေါင်းများစွာ။",
      },
      "django-basics": {
        title: "Django အခြေခံများ",
        subtitle: "Python ၏ အစုံပါ web framework — admin panel နှင့် database အသင့်ပါပြီး။",
      },
      "laravel-basics": {
        title: "Laravel အခြေခံများ",
        subtitle: "PHP ၏ အလှဆုံး framework — ရှင်းလင်းသော routing, Eloquent ORM နှင့် artisan မှော်ပညာ။",
      },
      "sql-basics": {
        title: "SQL အခြေခံများ",
        subtitle: "မေးခွန်းမေး၊ အဖြေရ — ဒေတာ၏ ကမ္ဘာသုံးဘာသာစကား။",
      },
      "rdbms-basics": {
        title: "MySQL နှင့် PostgreSQL လက်တွေ့",
        subtitle: "အင်တာနက်အများစု၏နောက်ကွယ်က database နှစ်ခု — တပ်ဆင်၊ ချိတ်ဆက်၊ ပရောလို အလုပ်လုပ်ပါ။",
      },
      "mongodb-basics": {
        title: "MongoDB အခြေခံများ",
        subtitle: "ထိပ်တန်း NoSQL database — ဒေတာကို ပြောင်းလွယ်သော JSON ပုံစံ document များအဖြစ် သိမ်းပါ။",
      },
      "ai-for-kids": {
        title: "အစပြုသူများအတွက် AI — သင့်ပထမဆုံး AI ကို လေ့ကျင့်ပါ (အသက် ၁၀+)",
        subtitle: "ကုဒ်မလိုပါ! တကယ့် AI ကို မြင်တတ်၊ ကြားတတ်၊ တွေးတတ်အောင် သင်ပေးပြီး chatbot များကို ပညာရှိစွာ သုံးတတ်လာပါ။",
      },
      "scratch-kids": {
        title: "Scratch — ပထမဆုံး Game များ ရေးပါ (အသက် ၈+)",
        subtitle: "ရောင်စုံတုံးများ ဆက်စပ်ပြီး game, ပုံပြင်နှင့် animation များ လုပ်ပါ — ကမ္ဘာ့အကြိုက်ဆုံး ပထမဆုံး coding ဘာသာစကား။",
      },
      "gamedev-kids": {
        title: "Game ဖန်တီးခြင်း — Roblox, Arcade နှင့် micro:bit (အသက် ၁၀+)",
        subtitle: "Roblox တွင် 3D ကမ္ဘာများ၊ browser ထဲ retro game များ တည်ဆောက်ပြီး အိတ်ဆောင်စက်ရုပ်လေးကို program လုပ်ပါ။",
      },
      "webdev-bootcamp": {
        title: "ပြည့်စုံသော ဝဘ်ဒီဗလော့ပ်မန့် Bootcamp",
        subtitle: "လုံးဝအစပြုသူမှ HTML, CSS နှင့် JavaScript ဖြင့် တကယ့်ဝဘ်ဆိုက်များ တည်ဆောက်နိုင်သည်အထိ။",
        description:
          "ဝဘ်ဒီဗလော့ပါတစ်ယောက်ဖြစ်ရန် သင်လိုအပ်သည့် တစ်ခုတည်းသောသင်တန်းဖြစ်သည်။ ဝဘ်လုပ်ဆောင်ပုံ၏ အခြေခံအကျဆုံးမှစတင်ပြီး HTML တွင် ခိုင်မာသောအခြေခံတည်ဆောက်ကာ CSS ဖြင့် လှပသောစာမျက်နှာများစတိုင်လုပ်ကာ JavaScript ဖြင့် အသက်သွင်းပြီး — ဂုဏ်ယူပြသနိုင်သည့် portfolio ပရောဂျက်တစ်ခုဖြင့် အဆုံးသတ်ပါလိမ့်မည်။",
        whatYouLearn: [
          "HTML5 နှင့် CSS3 ဖြင့် responsive ဝဘ်ဆိုက်များကို အစမှတည်ဆောက်ခြင်း",
          "ဝဘ်နှင့် ဘရောက်ဇာများ အမှန်တကယ်လုပ်ဆောင်ပုံကို နားလည်ခြင်း",
          "Flexbox နှင့် CSS Grid ဖြင့် ခေတ်မီ layout ကို ကျွမ်းကျင်ခြင်း",
          "တကယ့် JavaScript ရေးခြင်း- variable, function, array နှင့် object များ",
          "DOM ကိုကိုင်တွယ်ပြီး အသုံးပြုသူ event များကို တုံ့ပြန်ခြင်း",
          "ကိုယ်ပိုင် portfolio ပရောဂျက်တစ်ခု အပြီးတည်ဆောက်ခြင်း",
        ],
      },
      "web-basics": {
        title: "ဝဘ်အခြေခံ — သင့်ပထမဆုံးဝဘ်ဆိုက်ကို တည်ဆောက်ပါ",
        subtitle: "အစပြုသူများအတွက် ပြည့်စုံသောသင်တန်း — ဝဘ်လုပ်ဆောင်ပုံကို နားလည်ပြီး HTML, CSS နှင့် JavaScript ဖြင့် တကယ့်စာမျက်နှာတစ်ခု တည်ဆောက်ပါ။",
        description:
          "ကုဒ်ရေးဖူးခြင်းမရှိဘူးလား? ဒီကနေစပါ။ ဤသင်တန်းသည် ဝဘ်လုပ်ဆောင်ပုံကို ရိုးရှင်းစွာရှင်းပြပြီး သင့်ပထမဆုံးဝဘ်ဆိုက်ကို အဆင့်ဆင့် လက်တွေ့တည်ဆောက်ပြသည်။ အတွေ့အကြုံမလိုအပ်ပါ — သင်တန်းပြီးဆုံးချိန်တွင် HTML, CSS နှင့် JavaScript ဖြင့်ပြုလုပ်ထားသော တကယ့်ဝဘ်စာမျက်နှာတစ်ခု သင့်လက်ထဲရှိနေပါလိမ့်မည်။",
        whatYouLearn: [
          "ဝဘ်ဆိုက်များနှင့် ဘရောက်ဇာများ လုပ်ဆောင်ပုံကို နားလည်ခြင်း",
          "ပထမဆုံး HTML စာမျက်နှာကို အစမှရေးခြင်း",
          "CSS ဖြင့် ရောင်စဉ်၊ ဖောင့်နှင့် နေရာချထားမှုများ စတိုင်လုပ်ခြင်း",
          "JavaScript ဖြင့် ရိုးရှင်းသော interactivity ထည့်ခြင်း",
          "link, ပုံနှင့် စာရင်းများကို မှန်ကန်စွာအသုံးပြုခြင်း",
          "အားလုံးကိုပေါင်းစပ်ပြီး ပြီးပြည့်စုံသောဝဘ်စာမျက်နှာတစ်ခု တည်ဆောက်ခြင်း",
        ],
      },
      "css-mastery": {
        title: "CSS ကျွမ်းကျင်မှု — Flexbox, Grid နှင့် Animation များ",
        subtitle: "ရှုပ်ထွေးသော stylesheet များမှ pixel-perfect, animation ပါဝင်သော responsive layout များအထိ တိုးတက်အောင်လုပ်ပါ။",
        description:
          "ခေတ်မီ CSS သည် အားကောင်းပြီး ပျော်စရာကောင်းသည်။ ဤအထူးပြုသင်တန်းတွင် Flexbox, Grid, custom property, transition နှင့် keyframe animation များကို ကျွမ်းကျင်အောင်လေ့လာရမည် — ပရော်ဖက်ရှင်နယ်ဆန်သော interface များအတွက် ကိရိယာအစုံ။",
        whatYouLearn: [
          "Grid နှင့် Flexbox ဖြင့် ရှုပ်ထွေးသော layout များတည်ဆောက်ခြင်း",
          "ထိန်းသိမ်းရလွယ်သော theme များအတွက် CSS variable များအသုံးပြုခြင်း",
          "ချောမွေ့သော transition နှင့် keyframe animation များ ဖန်တီးခြင်း",
          "ခေတ်မီနည်းစနစ်များဖြင့် မည်သည့်အရာကိုမဆို responsive ဖြစ်စေခြင်း",
        ],
      },
      "js-essentials": {
        title: "အစပြုသူများအတွက် JavaScript အခြေခံ",
        subtitle: "သင့်ပထမဆုံး JavaScript ကုဒ်ကို ရေးရန် ဖော်ရွေသော လက်တွေ့လမ်းကြောင်း။",
        description:
          "ယခင်ပရိုဂရမ်းမင်းအတွေ့အကြုံ မလိုအပ်ပါ။ variable, function, loop များနှင့် ဝဘ်စာမျက်နှာများကို interactive ဖြစ်စေနည်းကို — လက်တွေ့ကျသော အဆင့်ငယ်တစ်ခုစီဖြင့် လေ့လာပါ။",
        whatYouLearn: [
          "JavaScript ကို ယုံကြည်မှုဖြင့် ရေးပြီး debug လုပ်ခြင်း",
          "flow ကိုထိန်းချုပ်ရန် loop နှင့် conditional များအသုံးပြုခြင်း",
          "DOM ဖြင့် စာမျက်နှာကို ကိုင်တွယ်ခြင်း",
          "ရိုးရှင်းသော interactive ပရောဂျက်တစ်ခု တည်ဆောက်ခြင်း",
        ],
      },
      "responsive-design": {
        title: "စနေ၊ တနင်္ဂနွေအတွင်း Responsive ဝဘ်ဒီဇိုင်း",
        subtitle: "ဖုန်း၊ တက်ဘလက်နှင့် ကွန်ပျူတာအားလုံးတွင် ဆိုက်တိုင်း ချောမွေ့စွာမြင်ရအောင်လုပ်ပါ။",
        description:
          "responsive ဒီဇိုင်းဆိုင်ရာ မြန်ဆန်ပြီး လက်တွေ့ကျသောသင်တန်း- media query, fluid grid, relative unit များနှင့် mobile-first တွေးခေါ်မှု။ အာရုံစိုက်ထားသော စနေတနင်္ဂနွေအတွက် အထူးသင့်တော်သည်။",
        whatYouLearn: [
          "Mobile-first စဉ်းစားခြင်း",
          "Media query များကို ထိရောက်စွာအသုံးပြုခြင်း",
          "လိုက်လျောညီထွေ ပြောင်းလွယ်သော layout များ တည်ဆောက်ခြင်း",
          "မှန်ကန်သော CSS unit များ ရွေးချယ်ခြင်း",
        ],
      },
      "dev-career": {
        title: "သင့်ပထမဆုံး ဝဘ်ဒီဗလော့ပါ အလုပ်ရရှိရန်",
        subtitle: "Portfolio, résumé, GitHub နှင့် အင်တာဗျူးပြင်ဆင်မှု — အလုပ်၏ ကုဒ်မဟုတ်သောအပိုင်း။",
        description:
          "ကုဒ်ကောင်းရုံဖြင့် မလုံလောက်ပါ — အလုပ်ရရှိရမည်။ ထူးခြားသော portfolio တစ်ခုတည်ဆောက်ခြင်း၊ စစ်ဆေးမှုကိုကျော်ဖြတ်နိုင်သော résumé ရေးခြင်း၊ GitHub ကို ကျွမ်းကျင်သူတစ်ယောက်ကဲ့သို့သုံးခြင်းနှင့် နည်းပညာအင်တာဗျူးများကို ကိုင်တွယ်ခြင်းတို့ကို လေ့လာပါ။",
        whatYouLearn: [
          "ပြန်ခေါ်မှုရရှိစေသော portfolio တစ်ခု တည်ဆောက်ခြင်း",
          "ATS ကိုကျော်ဖြတ်နိုင်သော developer résumé ရေးခြင်း",
          "GitHub တွင် ပရောဂျက်များကို ပရော်ဖက်ရှင်နယ်ဆန်စွာ တင်ပြခြင်း",
          "အသုံးများသော နည်းပညာအင်တာဗျူးများအတွက် ပြင်ဆင်ခြင်း",
        ],
      },
    },

    /* ---- section titles (Myanmar), by course id → index ---- */
    sections: {
      "web-basics": [
        "ကြိုဆိုခြင်းနှင့် ဝဘ်လုပ်ဆောင်ပုံ",
        "HTML အခြေခံ — ဖွဲ့စည်းပုံနှင့် အကြောင်းအရာ",
        "CSS အခြေခံ — လှပအောင်ပြုလုပ်ခြင်း",
        "JavaScript အခြေခံ — Interactivity ထည့်ခြင်း",
        "သင့်ပထမဆုံးဝဘ်ဆိုက်ကို တည်ဆောက်ပါ",
      ],
      "webdev-bootcamp": [
        "စတင်ခြင်း",
        "HTML အခြေခံများ",
        "CSS ဖြင့် စတိုင်လုပ်ခြင်း",
        "JavaScript ပရိုဂရမ်းမင်း",
        "နောက်ဆုံးပရောဂျက်",
      ],
      "css-mastery": ["ခေတ်မီ CSS အခြေခံများ"],
      "js-essentials": ["ပထမခြေလှမ်းများ"],
      "responsive-design": ["Responsive အခြေခံ"],
      "dev-career": ["အလုပ်အတွက် အသင့်ဖြစ်အောင်"],
    },

    /* ---- lessons (Myanmar): title + content, or quiz questions ---- */
    lessons: {
      "wb-welcome": {
        title: "ဝဘ်အခြေခံမှ ကြိုဆိုပါသည်",
        content: `
<p>ကြိုဆိုပါသည်! 👋 ကုဒ်တစ်ကြောင်းမှ မရေးဖူးသေးလျှင် သင်သည် အမှန်တကယ် မှန်ကန်သောနေရာသို့ ရောက်ရှိနေပါသည်။</p>
<p>ဤသင်တန်းတိုလေးပြီးဆုံးချိန်တွင် ခေါင်းစဉ်၊ စတိုင်ထားသောစာသား၊ ပုံ၊ စာရင်းနှင့် နှိပ်လိုက်သောအခါ တကယ်လုပ်ဆောင်သည့် ခလုတ်တစ်ခုပါဝင်သော <strong>တကယ့်ဝဘ်စာမျက်နှာတစ်ခု</strong> ကို သင်တည်ဆောက်ပြီးဖြစ်ပါလိမ့်မည်။</p>
<h3>ဤသင်တန်းကို မည်သို့လေ့လာမည်နည်း</h3>
<ul>
  <li>အစီအစဉ်အတိုင်းသွားပါ။ သင်ခန်းစာတိုင်းသည် အရင်တစ်ခုအပေါ်တွင် တည်ဆောက်ထားသည်။</li>
  <li>နမူနာများကို ကိုယ်တိုင်ရိုက်ပါ — ဖတ်ရုံမဟုတ်ဘဲ။ ကိုယ်တိုင်လုပ်ခြင်းက အရေးကြီးသည်။</li>
  <li>နားလည်မှုကိုစစ်ဆေးရန် မေးခွန်းများဖြေပါ။</li>
  <li>တိုးတက်မှုကို ခြေရာခံရန် သင်ခန်းစာများကို ပြီးစီးအဖြစ်မှတ်ပါ။</li>
</ul>
<div class="callout tip">ကုဒ်သင်ယူနေစဉ် "မိုက်မဲသောမေးခွန်း" ဟူ၍မရှိပါ။ လူတိုင်း သင်ရှိနေသည့်နေရာမှ စတင်ခဲ့ကြသည်။</div>`,
      },
      "wb-how": {
        title: "ဝဘ်ဆိုက်များ လုပ်ဆောင်ပုံ",
        content: `
<p>တစ်ခုခုမတည်ဆောက်မီ ဝဘ်ဆိုက်တစ်ခုဖွင့်လိုက်သည့်အခါ အမှန်တကယ်ဘာဖြစ်သွားသည်ကို ရှင်းလင်းကြပါစို့။</p>
<h3>အမြန်စကားပြောဆိုမှုတစ်ခု</h3>
<ol>
  <li>သင်သည် <code>example.com</code> ကဲ့သို့လိပ်စာတစ်ခုကို <strong>ဘရောက်ဇာ</strong> (Chrome, Edge, Safari…) ထဲရိုက်ထည့်သည်။</li>
  <li>ဘရောက်ဇာသည် <strong>ဆာဗာ</strong> (အင်တာနက်ပေါ်ရှိ ကွန်ပျူတာတစ်လုံး) ထံ ထိုစာမျက်နှာကို တောင်းဆိုသည်။</li>
  <li>ဆာဗာသည် ဖိုင်အချို့ — အများအားဖြင့် <strong>HTML</strong>, <strong>CSS</strong> နှင့် <strong>JavaScript</strong> ကို ပြန်ပို့သည်။</li>
  <li>သင့်ဘရောက်ဇာသည် ထိုဖိုင်များကိုဖတ်ပြီး သင်မြင်ရသောစာမျက်နှာကို <em>ရေးဆွဲ</em> သည်။</li>
</ol>
<h3>အဓိကအချက်</h3>
<p>ဝဘ်ဆိုက်တစ်ခုသည် အမှန်တွင် သင့်ဘရောက်ဇာက ပြသတတ်သော စာသားဖိုင်များ၏ အစုအဝေးတစ်ခုသာဖြစ်သည်။ ဒါပါပဲ! ဆိုက်တစ်ခုတည်ဆောက်သည့်အခါ သင်သည် ထိုစာသားဖိုင်များကို ရေးနေခြင်းဖြစ်သည်။</p>
<div class="callout"><strong>Client နှင့် Server:</strong> "client" သည် အရာများတောင်းဆိုနေသော သင့်ဘရောက်ဇာဖြစ်သည်။ "server" သည် ပြန်ဖြေပေးသော ကွန်ပျူတာဖြစ်သည်။ ဤအပြန်အလှန်သည် စက္ကန့်ပိုင်းအတွင်း ဖြစ်ပွားသည်။</div>`,
      },
      "wb-frontback": {
        title: "Front-End နှင့် Back-End",
        content: `
<p>ဤဝေါဟာရနှစ်ခုကို မကြာခဏကြားရပါလိမ့်မည်။ ရိုးရှင်းသောရှင်းလင်းချက်ဖြစ်သည်။</p>
<h3>Front-end — သင်မြင်နိုင်သောအရာ</h3>
<p>ဘရောက်ဇာတွင်ပေါ်လာသမျှ — စာသား၊ ခလုတ်များ၊ ရောင်စဉ်များ၊ အပြင်အဆင်၊ animation များ။ ၎င်းကို ကျွန်ုပ်တို့လေ့လာမည့် ဘာသာစကားသုံးမျိုးဖြင့် တည်ဆောက်သည်-</p>
<ul>
  <li><strong>HTML</strong> — ဖွဲ့စည်းပုံနှင့် အကြောင်းအရာ</li>
  <li><strong>CSS</strong> — အသွင်အပြင်နှင့် အပြင်အဆင်</li>
  <li><strong>JavaScript</strong> — interactivity</li>
</ul>
<h3>Back-end — နောက်ကွယ်မှအရာများ</h3>
<p>သင်မမြင်ရသော ဆာဗာ၊ ဒေတာဘေ့စ်နှင့် logic — အကောင့်သိမ်းဆည်းခြင်း သို့မဟုတ် ငွေပေးချေမှုစီမံခြင်းကဲ့သို့။</p>
<div class="callout tip">ဤသင်တန်းသည် ၁၀၀% <strong>front-end</strong> ဖြစ်သည်။ စတင်ရန်အသင့်တော်ဆုံးနေရာဖြစ်ပြီး သင့်ရလဒ်ကို ချက်ချင်းမြင်ရသည်။</div>`,
      },
      "wb-tools": {
        title: "သင်လိုအပ်သောကိရိယာများ",
        content: `
<p>သတင်းကောင်း- ပြင်ဆင်မှုသည် အခမဲ့ဖြစ်ပြီး ငါးမိနစ်သာကြာသည်။</p>
<h3>၁။ ကုဒ်တည်းဖြတ်ကိရိယာ (code editor)</h3>
<p>ဤနေရာတွင် ကုဒ်ရေးသည်။ <strong>Visual Studio Code</strong> သည် လူကြိုက်အများဆုံး၊ အခမဲ့ရွေးချယ်မှုဖြစ်သည်။ ၎င်းကို install လုပ်ပြီး သင်သိမ်းလိုက်သည့်အခါ စာမျက်နှာ အလိုအလျောက်ပြန်လည်ဖွင့်ပေးရန် <em>Live Server</em> extension ကိုထည့်ပါ။</p>
<h3>၂။ ဝဘ်ဘရောက်ဇာ</h3>
<p>သင့်တွင်ရှိပြီးသားဖြစ်သည်! Chrome, Edge သို့မဟုတ် Firefox အားလုံးအဆင်ပြေသည်။</p>
<h3>၃။ ပထမဆုံးဖိုင်ဖန်တီးပါ</h3>
<p>သင့်ပရောဂျက်အတွက် folder တစ်ခုလုပ်ပြီး ၎င်းအတွင်း <code>index.html</code> ဟုအမည်ပေးထားသောဖိုင်တစ်ခုဖန်တီးပါ။ ၎င်းသည် ဝဘ်ဆိုက်၏ ပင်မစာမျက်နှာအတွက် ရိုးရာအမည်ဖြစ်သည်။</p>
<pre><code>my-website/
  index.html   &larr; သင့်စာမျက်နှာ
  style.css    &larr; သင့်စတိုင်များ (နောက်မှ)
  script.js    &larr; သင့် JavaScript (နောက်မှ)</code></pre>
<div class="callout">စာမျက်နှာကို ကြည့်ရန် <code>index.html</code> ကို နှစ်ချက်နှိပ်ပါ — ဘရောက်ဇာတွင်ပွင့်လာသည်။ သို့မဟုတ် အလိုအလျောက်ပြန်ဖွင့်ရန် Live Server ကိုသုံးပါ။</div>`,
      },
      "wb-first-page": {
        title: "သင့်ပထမဆုံး HTML စာမျက်နှာ",
        content: `
<p>HTML (HyperText Markup Language) သည် စာမျက်နှာ၏ <strong>ဖွဲ့စည်းပုံ</strong> ကိုဖော်ပြသည်။ ပြည့်စုံသောစာမျက်နှာတစ်ခုရေးကြပါစို့။</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Website&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, world!&lt;/h1&gt;
    &lt;p&gt;This is my very first web page.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<h3>အစိတ်အပိုင်းတစ်ခုစီ၏အဓိပ္ပာယ်</h3>
<ul>
  <li><code>&lt;!DOCTYPE html&gt;</code> — "ဤသည်မှာ ခေတ်မီ HTML စာမျက်နှာဖြစ်သည်" ဟုဆိုသည်။</li>
  <li><code>&lt;head&gt;</code> — စာမျက်နှာခေါင်းစဉ်ကဲ့သို့ ဖုံးကွယ်ထားသောအချက်အလက် (ဘရောက်ဇာ tab တွင်ပြသည်)။</li>
  <li><code>&lt;body&gt;</code> — မြင်နိုင်သောအကြောင်းအရာ။</li>
</ul>
<h3>Tag များသည် အတွဲလိုက်လာသည်</h3>
<pre><code>&lt;p&gt;This is content&lt;/p&gt;
 ^tag အဖွင့်    ^tag အပိတ် (/ ကိုသတိပြုပါ)</code></pre>
<div class="callout tip">ဤအရာကို <code>index.html</code> အဖြစ်သိမ်းပြီးဖွင့်ကြည့်ပါ — သင်ဝဘ်စာမျက်နှာတစ်ခုကို အစမှတည်ဆောက်လိုက်ပြီ! 🎉</div>`,
      },
      "wb-text": {
        title: "ခေါင်းစဉ်၊ စာပိုဒ်နှင့် စာသား",
        content: `
<h3>ခေါင်းစဉ်များ (Headings)</h3>
<p>ခေါင်းစဉ်များသည် <code>&lt;h1&gt;</code> (အကြီးဆုံး / အရေးအကြီးဆုံး) မှ <code>&lt;h6&gt;</code> အထိရှိသည်။ စာမျက်နှာ၏ ပင်မခေါင်းစဉ်အတွက် <code>&lt;h1&gt;</code> တစ်ခုသုံးပါ။</p>
<pre><code>&lt;h1&gt;My Blog&lt;/h1&gt;
&lt;h2&gt;My First Post&lt;/h2&gt;
&lt;h3&gt;A subsection&lt;/h3&gt;</code></pre>
<h3>စာပိုဒ်များနှင့် အလေးပေးမှု</h3>
<pre><code>&lt;p&gt;This is a paragraph of text.&lt;/p&gt;
&lt;p&gt;You can make words &lt;strong&gt;bold&lt;/strong&gt;
   or &lt;em&gt;italic&lt;/em&gt; for emphasis.&lt;/p&gt;</code></pre>
<div class="callout">ခေါင်းစဉ်များသည် "စာလုံးကြီးများ" သာမဟုတ်ပါ — ၎င်းတို့သည် search engine များနှင့် screen reader များ အားကိုးသော အကြမ်းဖျင်းမူဘောင်တစ်ခုကို စာမျက်နှာအား ပေးသည်။ အစီအစဉ်တကျသုံးပါ။</div>`,
      },
      "wb-links": {
        title: "Link များနှင့် Navigation",
        content: `
<p>Link များသည် ဝဘ်ကို <em>ဝဘ်</em> ဖြစ်စေသောအရာဖြစ်သည်။ ၎င်းတို့သည် <code>href</code> ("hypertext reference") attribute ပါသော anchor tag <code>&lt;a&gt;</code> ကိုသုံးသည်။</p>
<pre><code>&lt;a href="https://wikipedia.org"&gt;Visit Wikipedia&lt;/a&gt;

&lt;!-- သင့်ဆိုက်အတွင်း အခြားစာမျက်နှာသို့ link --&gt;
&lt;a href="about.html"&gt;About Me&lt;/a&gt;

&lt;!-- tab အသစ်တွင်ဖွင့်ရန် --&gt;
&lt;a href="https://google.com" target="_blank"&gt;Google&lt;/a&gt;</code></pre>
<h3>Attribute ဆိုတာဘာလဲ?</h3>
<p><strong>Attribute</strong> သည် tag အဖွင့်အတွင်းရှိ ထပ်ဆောင်းအချက်အလက်ဖြစ်ပြီး <code>name="value"</code> အဖြစ်ရေးသည်။ ဤတွင် <code>href</code> နှင့် <code>target</code> သည် attribute များဖြစ်သည်။</p>
<div class="callout tip">Link ၏စာသားသည် မည်သည့်နေရာသို့သွားမည်ကို ဖော်ပြသင့်သည်။ "ဒီမှာနှိပ်ပါ" သည် အထောက်အကူမပြု၊ "စာရွက်စာတမ်းများဖတ်ပါ" သည် ရှင်းလင်းသည်။</div>`,
      },
      "wb-images": {
        title: "ပုံများနှင့် မီဒီယာ",
        content: `
<p><code>&lt;img&gt;</code> tag ဖြင့် ပုံများထည့်ပါ။ ၎င်းသည် <strong>self-closing</strong> ဖြစ်သည် — <code>&lt;/img&gt;</code> မရှိပါ။</p>
<pre><code>&lt;img src="photo.jpg" alt="A golden retriever puppy" width="400"&gt;</code></pre>
<h3>သိထားရမည့်အချက်သုံးချက်</h3>
<ul>
  <li><code>src</code> — ပုံဖိုင်၏တည်နေရာ (ဖိုင်အမည် သို့မဟုတ် URL အပြည့်)။</li>
  <li><code>alt</code> — စာသားဖော်ပြချက်၊ screen reader များက ဖတ်ပြပြီး ပုံမပေါ်သည့်အခါ ပြသည်။</li>
  <li><code>width</code> / <code>height</code> — pixel ဖြင့် အရွယ်အစား (မထည့်လည်းရသည်)။</li>
</ul>
<div class="callout"><strong>alt စာသားကို အမြဲကောင်းစွာရေးပါ။</strong> ၎င်းသည် ပုံကိုမမြင်နိုင်သူများအတွက် သင့်ဆိုက်ကို အသုံးပြုနိုင်စေသည် — SEO အတွက်လည်းကောင်းသည်။</div>`,
      },
      "wb-lists": {
        title: "စာရင်းများ",
        content: `
<p>နေ့စဉ်သုံးစာရင်းအမျိုးအစားနှစ်မျိုး-</p>
<pre><code>&lt;!-- အစက်ဖြင့်စာရင်း --&gt;
&lt;ul&gt;
  &lt;li&gt;Milk&lt;/li&gt;
  &lt;li&gt;Eggs&lt;/li&gt;
  &lt;li&gt;Bread&lt;/li&gt;
&lt;/ul&gt;

&lt;!-- နံပါတ်ဖြင့်စာရင်း --&gt;
&lt;ol&gt;
  &lt;li&gt;Preheat the oven&lt;/li&gt;
  &lt;li&gt;Mix the batter&lt;/li&gt;
  &lt;li&gt;Bake for 20 minutes&lt;/li&gt;
&lt;/ol&gt;</code></pre>
<p><code>&lt;ul&gt;</code> = <em>unordered</em> (အစက်များ)၊ <code>&lt;ol&gt;</code> = <em>ordered</em> (နံပါတ်များ)။ item တစ်ခုစီသည် <code>&lt;li&gt;</code> ("list item") အတွင်းရှိသည်။</p>
<div class="callout tip">Navigation menu များကို များသောအားဖြင့် link များပါသော <code>&lt;ul&gt;</code> အဖြစ်တည်ဆောက်သည် — သတိထားမိလျှင် စာရင်းများသည် နေရာတိုင်းတွင်ရှိသည်။</div>`,
      },
      "wb-html-quiz": {
        title: "မေးခွန်း- HTML အခြေခံ",
        questions: [
          {
            q: "စာမျက်နှာပေါ်တွင် အမှန်တကယ်မြင်ရသော အကြောင်းအရာကို မည်သည့် tag က ကိုင်ထားသနည်း?",
            options: ["&lt;head&gt;", "&lt;title&gt;", "&lt;body&gt;", "&lt;meta&gt;"],
          },
          {
            q: "Link တစ်ခုကို ဘယ်ကိုသွားရမည်ဟု မည်သည့် attribute က ပြောသနည်း?",
            options: ["src", "href", "link", "goto"],
          },
          {
            q: "အစက်ဖြင့်စာရင်း (bulleted list) ကို မည်သည့် tag က ဖန်တီးသနည်း?",
            options: ["&lt;ol&gt;", "&lt;li&gt;", "&lt;ul&gt;", "&lt;list&gt;"],
          },
          {
            q: "ပုံတစ်ခု၏ alt attribute သည် ဘာအတွက်နည်း?",
            options: [
              "ပုံကိုပိုကြီးအောင်လုပ်ရန်",
              "အသုံးပြုနိုင်စွမ်း (accessibility) အတွက်နှင့် ပုံမပေါ်သည့်အခါ ပြရန်စာသား",
              "ပုံအောက်တွင် စာတန်းထည့်ရန်",
              "မလိုအပ်ပါ",
            ],
          },
        ],
      },
      "wb-css-add": {
        title: "သင့်စာမျက်နှာသို့ CSS ထည့်ခြင်း",
        content: `
<p>CSS (Cascading Style Sheets) သည် သင့်စာမျက်နှာ၏ <strong>အသွင်အပြင်</strong> — ရောင်စဉ်၊ ဖောင့်၊ နေရာချထားမှု၊ အပြင်အဆင် — ကိုထိန်းချုပ်သည်။</p>
<h3>အကြံပြုနည်း- သီးခြားဖိုင်တစ်ခု</h3>
<p><code>style.css</code> ဖန်တီးပြီး သင့် HTML <code>&lt;head&gt;</code> အတွင်း ချိတ်ဆက်ပါ-</p>
<pre><code>&lt;head&gt;
  &lt;link rel="stylesheet" href="style.css"&gt;
&lt;/head&gt;</code></pre>
<h3>CSS rule တစ်ခုကို ဖတ်ပုံ</h3>
<pre><code>h1 {
  color: navy;
  font-size: 40px;
}
/*  ^selector   ^property: value; */</code></pre>
<p>၎င်းက "&lt;h1&gt; တိုင်းကိုရှာပြီး navy ရောင်နှင့် 40px ဖြစ်စေပါ" ဟုဆိုသည်။</p>
<div class="callout"><strong>Selector</strong> များသည် <em>ဘာ</em> ကိုစတိုင်လုပ်မည်ကို ရွေးသည်။ အသုံးများသည်များ- <code>h1</code> (tag ဖြင့်)၊ <code>.intro</code> (class ဖြင့်)၊ <code>#header</code> (id ဖြင့်)။</div>`,
      },
      "wb-css-color": {
        title: "ရောင်စဉ်များနှင့် နောက်ခံများ",
        content: `
<pre><code>body {
  background-color: #f4f4f4;   /* light gray page */
  color: #222;                  /* dark text */
}
.button {
  background-color: #a435f0;    /* purple */
  color: white;
}</code></pre>
<h3>ရောင်စဉ်တစ်ခုရေးနည်းများ</h3>
<ul>
  <li><strong>အမည်-</strong> <code>red</code>, <code>navy</code>, <code>tomato</code></li>
  <li><strong>Hex-</strong> <code>#a435f0</code> (လက်တွေ့တွင်အသုံးများ)</li>
  <li><strong>RGB-</strong> <code>rgb(164, 53, 240)</code></li>
</ul>
<div class="callout tip">coolors.co ကဲ့သို့ အခမဲ့ palette ကိရိယာများဖြင့် လိုက်ဖက်သောရောင်စဉ်များရွေးကြည့်ပါ။</div>`,
      },
      "wb-css-text": {
        title: "စာသားနှင့် ဖောင့်များ",
        content: `
<pre><code>body {
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;      /* space between lines */
}
h1 {
  font-weight: bold;
  text-align: center;
}</code></pre>
<h3>Font stack များ</h3>
<p>ဖောင့်များစွာကို အရန်အဖြစ်စာရင်းပြုပါ။ ဘရောက်ဇာသည် ၎င်းတွင်ရှိသောပထမဆုံးဖောင့်ကိုသုံးပြီး <code>sans-serif</code> ကဲ့သို့ generic family တစ်ခုဖြင့်အဆုံးသတ်သည်။</p>
<div class="callout">သက်တောင့်သက်သာဖတ်ရသောစာသားသည် <code>16px</code> ခန့်ဖြစ်ပြီး <code>line-height</code> <code>1.5</code>–<code>1.6</code> ရှိသည်။ ကျဉ်းကျပ်သောစာသားသည် ဖတ်ရခက်သည်။</div>`,
      },
      "wb-css-box": {
        title: "နေရာချထားမှုနှင့် Box Model",
        content: `
<p>element တိုင်းသည် လေးထောင့် <strong>box</strong> တစ်ခုဖြစ်သည်။ ၎င်း၏အလွှာများကိုနားလည်ခြင်းသည် နေရာချထားမှုကိုထိန်းချုပ်ရန် အဓိကသော့ချက်ဖြစ်သည်။</p>
<ul>
  <li><strong>content</strong> — စာသား သို့မဟုတ် ပုံ ကိုယ်တိုင်</li>
  <li><strong>padding</strong> — box <em>အတွင်း</em>၊ content ပတ်လည်ရှိ နေရာလွတ်</li>
  <li><strong>border</strong> — အနားသတ်မျဉ်း</li>
  <li><strong>margin</strong> — box <em>အပြင်</em> ရှိ နေရာလွတ်၊ အခြား element များကို တွန်းဖယ်သည်</li>
</ul>
<pre><code>.card {
  padding: 20px;                 /* breathing room inside */
  border: 1px solid #ddd;        /* thin gray edge */
  margin: 16px;                  /* gap around the card */
  border-radius: 8px;            /* rounded corners */
}</code></pre>
<div class="callout tip">အရွယ်အစားများ သဘာဝကျစေရန် သင့် CSS ၏ထိပ်တွင် ဤအရာကိုထည့်ပါ-<br><code>* { box-sizing: border-box; }</code></div>`,
      },
      "wb-css-flex": {
        title: "Flexbox ဖြင့် ရိုးရှင်းသောအပြင်အဆင်များ",
        content: `
<p>item များကို ဘေးချင်းယှဉ်ထားရန် (navigation bar ကဲ့သို့) <strong>Flexbox</strong> ကိုသုံးပါ။</p>
<pre><code>.navbar {
  display: flex;
  justify-content: space-between; /* push items apart */
  align-items: center;            /* line them up */
  gap: 16px;                      /* space between items */
}</code></pre>
<h3>မည်သည့်အရာကိုမဆို အလယ်ဗဟိုချခြင်း</h3>
<pre><code>.hero {
  display: flex;
  justify-content: center;  /* horizontal center */
  align-items: center;      /* vertical center */
  height: 300px;
}</code></pre>
<div class="callout">Flexbox သည် CSS တစ်ခုလုံးတွင် အသုံးဝင်ဆုံးအရာများထဲမှတစ်ခုဖြစ်သည်။ စာကြောင်းသုံးကြောင်းသာဖြင့် ယခင်ကအလုပ်ရှုပ်ခဲ့သောအကြောင်းအရာကို အလယ်ဗဟိုချနိုင်သည်။</div>`,
      },
      "wb-css-quiz": {
        title: "မေးခွန်း- CSS အခြေခံ",
        questions: [
          {
            q: "External stylesheet ကို မည်သို့ချိတ်ဆက်သနည်း?",
            options: [
              "&lt;style src=\"style.css\"&gt;",
              "&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;",
              "&lt;css href=\"style.css\"&gt;",
              "&lt;script src=\"style.css\"&gt;",
            ],
          },
          {
            q: "Box model တွင် border ၏ အပြင်ဘက်တွင် နေရာလွတ်ထည့်သော အလွှာသည် အဘယ်နည်း?",
            options: ["padding", "margin", "content", "outline"],
          },
          {
            q: "Item များကို တစ်တန်းတည်းစီပြီး နေရာချထားနိုင်စေသော property သည်?",
            options: ["display: block", "display: flex", "text-align", "float"],
          },
          {
            q: "မည်သည်က hex ရောင်စဉ်ဖြစ်သနည်း?",
            options: ["rgb(0,0,0)", "navy", "#a435f0", "color: blue"],
          },
        ],
      },
      "wb-js-add": {
        title: "JavaScript ထည့်ခြင်း",
        content: `
<p>JavaScript သည် စာမျက်နှာတစ်ခုကို <strong>အလုပ်လုပ်စေသည်</strong> — click များကိုတုံ့ပြန်ခြင်း၊ အကြောင်းအရာပြောင်းလဲခြင်း၊ အသုံးပြုသူကိုတုံ့ပြန်ခြင်း။</p>
<p>၎င်းကို <code>&lt;/body&gt;</code> tag အပိတ်မတိုင်မီ ချက်ချင်းထည့်ပါ-</p>
<pre><code>  &lt;script src="script.js"&gt;&lt;/script&gt;
&lt;/body&gt;</code></pre>
<p><code>script.js</code> တွင် စမ်းကြည့်ပါ-</p>
<pre><code>console.log("Hello from JavaScript!");
alert("The page is alive!");</code></pre>
<div class="callout tip">သင့်ဘရောက်ဇာတွင် <strong>F12</strong> ကိုနှိပ်ပြီး <em>Console</em> tab ကိုဖွင့်ကာ <code>console.log</code> output ကိုကြည့်ပါ — developer များ ၎င်းတို့ကုဒ်လုပ်ဆောင်ပုံကိုစစ်ဆေးသည့်နည်းဖြစ်သည်။</div>`,
      },
      "wb-js-vars": {
        title: "Variable များနှင့် Value များ",
        content: `
<p><strong>Variable</strong> တစ်ခုသည် value တစ်ခုသိမ်းဆည်းသော အမည်ရှိသေတ္တာတစ်ခုဖြစ်သည်။</p>
<pre><code>const name = "Sara";     // string (စာသား)
let age = 25;            // number (ဂဏန်း)
let isLearning = true;   // boolean (true / false)</code></pre>
<ul>
  <li>value မပြောင်းလဲမည်ဆိုလျှင် <code>const</code> ကိုသုံးပါ။</li>
  <li>ပြောင်းလဲမည်ဆိုလျှင် <code>let</code> ကိုသုံးပါ။</li>
</ul>
<h3>အသုံးပြုနည်း</h3>
<pre><code>console.log("Hi, " + name);   // Hi, Sara
age = age + 1;                // now 26</code></pre>
<div class="callout">Variable များကို သေတ္တာများပေါ်ရှိ label များအဖြစ်တွေးပါ။ label (name) သည်တူညီနေသည်၊ <code>let</code> သေတ္တာအတွင်းမှအရာကိုပြောင်းနိုင်သည်၊ သို့သော် <code>const</code> ကိုမပြောင်းနိုင်ပါ။</div>`,
      },
      "wb-js-click": {
        title: "Click များကို တုံ့ပြန်ခြင်း",
        content: `
<p>ဒီနေရာမှာ ပျော်စရာဖြစ်လာသည် — ခလုတ်တစ်ခုကို တကယ်တစ်ခုခုလုပ်စေခြင်း။</p>
<h3>HTML</h3>
<pre><code>&lt;button id="myBtn"&gt;Click me&lt;/button&gt;
&lt;p id="output"&gt;Nothing yet.&lt;/p&gt;</code></pre>
<h3>JavaScript</h3>
<pre><code>const button = document.querySelector("#myBtn");
const output = document.querySelector("#output");

button.addEventListener("click", () =&gt; {
  output.textContent = "You clicked the button!";
});</code></pre>
<p>ပုံစံသည် အမြဲတမ်း- <strong>element တစ်ခုရှာ → event ကိုစောင့်ကြည့် → တစ်ခုခုပြောင်းလဲ။</strong> interactive ဆိုက်တိုင်းသည် ဤအကြံအစည်ပေါ်တွင် တည်ဆောက်ထားသည်။</p>
<div class="callout tip"><code>querySelector</code> သည် CSS-style selector များကိုသုံးသည်- <code>"#id"</code>, <code>".class"</code>, <code>"tag"</code>။ selector များကို တစ်ကြိမ်သင်ယူပြီး CSS နှင့် JavaScript နှစ်ခုလုံးတွင်သုံးပါ။</div>`,
      },
      "wb-js-quiz": {
        title: "မေးခွန်း- JavaScript အခြေခံ",
        questions: [
          {
            q: "မပြောင်းလဲသင့်သော value ကို မည်သည့် keyword က ကြေညာသနည်း?",
            options: ["let", "const", "var", "value"],
          },
          {
            q: "&lt;script&gt; tag ကို ပုံမှန်အားဖြင့် ဘယ်နေရာတွင်ထားသင့်သနည်း?",
            options: [
              "&lt;title&gt; ထဲတွင်",
              "&lt;/body&gt; အပိတ် tag မတိုင်မီ",
              "စာပိုဒ်တိုင်းထဲတွင်",
              "မည်သည့်နေရာမဆို အဆင်ပြေသည်",
            ],
          },
          {
            q: "အသုံးပြုသူ တစ်ခုခုကိုနှိပ်သည့်အခါ ကုဒ်ကို run စေသော method သည်?",
            options: ["querySelector", "addEventListener", "console.log", "textContent"],
          },
        ],
      },
      "wb-project": {
        title: "ပရောဂျက်- သင့်ပထမဆုံးဝဘ်စာမျက်နှာ",
        content: `
<p>အားလုံးကို ရိုးရှင်းပြီးပြည့်စုံသောစာမျက်နှာတစ်ခုတွင်ပေါင်းစပ်ကြပါစို့- ကိုယ်ရေးအကျဉ်း "intro card" တစ်ခု။</p>
<h3>၁။ HTML (index.html)</h3>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;About Me&lt;/title&gt;
    &lt;link rel="stylesheet" href="style.css"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div class="card"&gt;
      &lt;h1&gt;Hi, I'm Alex 👋&lt;/h1&gt;
      &lt;p&gt;I'm learning web development.&lt;/p&gt;
      &lt;ul&gt;
        &lt;li&gt;☕ Coffee lover&lt;/li&gt;
        &lt;li&gt;🎸 Guitar player&lt;/li&gt;
      &lt;/ul&gt;
      &lt;button id="btn"&gt;Say hello&lt;/button&gt;
      &lt;p id="msg"&gt;&lt;/p&gt;
    &lt;/div&gt;
    &lt;script src="script.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<h3>၂။ CSS (style.css)</h3>
<pre><code>* { box-sizing: border-box; }

body {
  font-family: "Segoe UI", Arial, sans-serif;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  padding: 40px;
}
.card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
  text-align: center;
  max-width: 360px;
}
button {
  background: #a435f0;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
}</code></pre>
<h3>၃။ JavaScript (script.js)</h3>
<pre><code>const btn = document.querySelector("#btn");
const msg = document.querySelector("#msg");

btn.addEventListener("click", () =&gt; {
  msg.textContent = "Thanks for visiting! 🎉";
});</code></pre>
<div class="callout tip"><strong>စမ်းကြည့်ပြီး သင့်ဟာဖြစ်အောင်လုပ်ပါ-</strong> အမည်၊ ရောင်စဉ်များနှင့် စာရင်း item များကိုပြောင်းပါ။ <code>&lt;img&gt;</code> ဖြင့် ဓာတ်ပုံတစ်ပုံထည့်ပါ။ ဒါ သင့်စာမျက်နှာ ဖြစ်ပြီ!</div>
<h3>🎓 သင်အောင်မြင်ပြီ</h3>
<p>အဓိကဘာသာစကားသုံးမျိုးလုံးကိုသုံးပြီး တကယ့် interactive ဝဘ်စာမျက်နှာတစ်ခုကို သင်တည်ဆောက်လိုက်ပြီ။ ၁၀၀% သို့ရောက်ရန် ဤသင်ခန်းစာကို ပြီးစီးအဖြစ်မှတ်ပါ။ နောက်တစ်ဆင့်အနေဖြင့် ပိုနက်ရှိုင်းစွာလေ့လာရန် <strong>ပြည့်စုံသောဝဘ်ဒီဗလော့ပ်မန့် Bootcamp</strong> သို့ဆက်သွားပါ!</p>`,
      },
      "wbx-html": {
        title: "လေ့ကျင့်ခန်း- ကိုယ်ရေးအကျဉ်း စာမျက်နှာလေး တည်ဆောက်ပါ",
        content: `
<h3>🏋️ သင့်တာဝန်</h3>
<p>အောက်ပါ သုံးမျိုးလုံး ပါဝင်သော HTML စာမျက်နှာလေး ရေးပါ-</p>
<ul>
  <li>သင့်နာမည်ပါသော <code>&lt;h1&gt;</code> ခေါင်းစီး</li>
  <li>မိမိအကြောင်း <code>&lt;p&gt;</code> စာပိုဒ်</li>
  <li>ကြိုက်ရာစာသားပါသော <code>&lt;button&gt;</code></li>
</ul>
<p><strong>▶ Run &amp; Check</strong> ကိုနှိပ်ပါ — စစ်ဆေးစက်က ဘာလိုနေသေးလဲ ပြောပြမည်။ အောင်လျှင် <strong>+15 XP</strong> နှင့် သင်ခန်းစာပြီးဆုံး! 🎉</p>`,
      },
      "wbx-css": {
        title: "လေ့ကျင့်ခန်း- Box ကို စတိုင်လုပ်ပါ",
        content: `
<h3>🏋️ သင့်တာဝန်</h3>
<p>စာမျက်နှာတွင် <code>id="box"</code> ပါသော box တစ်ခုရှိသည်။ <code>&lt;style&gt;</code> tag ထဲမှ CSS ဖြင့်-</p>
<ul>
  <li><strong>အနီရောင်</strong> ဖြစ်အောင် — <code>background-color: red;</code></li>
  <li><strong>ထောင့်ဝိုင်း</strong> ဖြစ်အောင် — <code>border-radius</code> ကို <code>16px</code> သို့မဟုတ် ပိုကြီးအောင် ထားပါ</li>
</ul>
<p>CSS ပုံစံကို သတိရပါ- <code>#box { property: value; }</code></p>`,
      },
      "wbx-js": {
        title: "လေ့ကျင့်ခန်း- add() function ရေးပါ",
        content: `
<h3>🏋️ သင့်တာဝန်</h3>
<p><code>&lt;script&gt;</code> tag ထဲတွင် ကိန်းနှစ်လုံးပေါင်းပြီး <strong>return</strong> ပြန်ပေးသော <code>add</code> function ရေးပါ-</p>
<pre><code>add(2, 3)   → 5 ပြန်ရမည်
add(10, 20) → 30 ပြန်ရမည်</code></pre>
<p>ပုံစံ- <code>function add(a, b) { return ...; }</code>။ စစ်ဆေးစက်က ကိန်းအမျိုးမျိုးဖြင့် စမ်းမည် — အဖြေသေ ထည့်၍မရပါ! 😄</p>`,
      },

      /* ===== The Complete Web Development Bootcamp (Myanmar) ===== */
      "intro-what": {
        title: "ဝဘ်ဒီဗလော့ပ်မန့် ဆိုတာဘာလဲ?",
        content: `
<p>ကြိုဆိုပါသည်! <strong>ဝဘ်ဒီဗလော့ပ်မန့်</strong> သည် လူများ ဘရောက်ဇာတွင်အသုံးပြုသောအရာများ — ရိုးရှင်းသောကိုယ်ရေးစာမျက်နှာမှ သင်ယခုဖတ်နေသည့်အက်ပ်များအထိ — ကို တည်ဆောက်သည့် အတတ်ပညာဖြစ်သည်။</p>
<h3>အဓိကဘာသာစကားသုံးမျိုး</h3>
<ul>
  <li><strong>HTML</strong> — <em>ဖွဲ့စည်းပုံ</em> နှင့် အကြောင်းအရာ (ခေါင်းစဉ်၊ စာသား၊ ပုံ၊ ခလုတ်များ)။</li>
  <li><strong>CSS</strong> — <em>အသွင်အပြင်</em> (ရောင်စဉ်၊ နေရာချထားမှု၊ layout, ဖောင့်များ)။</li>
  <li><strong>JavaScript</strong> — <em>အပြုအမူ</em> (click, form, animation, logic)။</li>
</ul>
<p>အထောက်အကူဖြစ်သောဥပမာ- ဝဘ်စာမျက်နှာတစ်ခုသည် အိမ်တစ်လုံးဆိုပါက HTML သည် အုတ်မြစ်နှင့်အခန်းများ၊ CSS သည် ဆေးသုတ်ခြင်းနှင့်ပရိဘောဂ၊ JavaScript သည် အရာများကို <em>လုပ်ဆောင်</em> စေသည့် လျှပ်စစ်ဖြစ်သည်။</p>
<div class="callout tip"><strong>Front-end နှင့် back-end:</strong> Front-end သည် အသုံးပြုသူ၏ဘရောက်ဇာတွင် လည်ပတ်သည် (အထက်ပါဘာသာစကားသုံးမျိုး)။ Back-end သည် နောက်ကွယ်ရှိ ဆာဗာ၊ ဒေတာဘေ့စ်နှင့် logic ဖြစ်သည်။ ဤသင်တန်းသည် front-end ကိုအာရုံစိုက်သည် — စတင်ရန်အကောင်းဆုံးနေရာ။</div>
<p>ဤသင်တန်းအဆုံးတွင် တကယ့်ဝဘ်စာမျက်နှာများကို ဖတ်နိုင်၊ ရေးနိုင်၊ ယုံကြည်မှုဖြင့်တည်ဆောက်နိုင်ပါလိမ့်မည်။ စကြပါစို့!</p>`,
      },
      "intro-web": {
        title: "ဝဘ် လုပ်ဆောင်ပုံ",
        content: `
<p>ဆိုက်တစ်ခုကိုဝင်ကြည့်တိုင်း သင့် <strong>ဘရောက်ဇာ</strong> (client) နှင့် <strong>ဆာဗာ</strong> အကြား အမြန်စကားပြောဆိုမှုတစ်ခု ဖြစ်ပွားသည်။</p>
<h3>Request/response စက်ဝန်း</h3>
<ol>
  <li><code>https://example.com</code> ကဲ့သို့ URL တစ်ခုကိုရိုက်ပြီး Enter နှိပ်သည်။</li>
  <li>DNS သည် domain အမည်ကို <strong>IP address</strong> (ဆာဗာအတွက် ဖုန်းနံပါတ်ကဲ့သို့) အဖြစ်ပြောင်းသည်။</li>
  <li>သင့်ဘရောက်ဇာသည် ထိုဆာဗာထံ <strong>HTTP request</strong> တစ်ခုပို့သည်။</li>
  <li>ဆာဗာသည် ဖိုင်များဖြင့်ပြန်ဖြေသည်- HTML, CSS, JavaScript, ပုံများ။</li>
  <li>ဘရောက်ဇာသည် ထိုဖိုင်များကို သင်မြင်ရသောစာမျက်နှာအဖြစ် <em>render</em> လုပ်သည်။</li>
</ol>
<h3>အဓိကဝေါဟာရများ</h3>
<ul>
  <li><strong>HTTP/HTTPS</strong> — ဘရောက်ဇာနှင့်ဆာဗာပြောဆိုသော protocol။ HTTPS သည် ကုဒ်ဝှက်ထားသော လုံခြုံသည့်ဗားရှင်း။</li>
  <li><strong>URL</strong> — ဝဘ်ပေါ်ရှိ resource တစ်ခု၏လိပ်စာ။</li>
  <li><strong>Client</strong> — request ပြုသောဘရောက်ဇာ။ <strong>Server</strong> — ၎င်းတို့ကိုဖြေကြားသောစက်။</li>
</ul>
<div class="callout">စက်ဝန်းတစ်ခုလုံးသည် ပုံမှန်အားဖြင့် စက္ကန့်အပိုင်းအစသာကြာသည် — သို့သော် ၎င်းကိုနားလည်ခြင်းသည် နောက်ပိုင်း debugging ကို <em>များစွာ</em> လွယ်ကူစေသည်။</div>`,
      },
      "intro-setup": {
        title: "သင့်ကိရိယာများ ပြင်ဆင်ခြင်း",
        content: `
<p>စတင်တည်ဆောက်ရန် အခမဲ့အရာနှစ်ခုသာလိုအပ်သည်။</p>
<h3>၁။ Code editor</h3>
<p><strong>Visual Studio Code</strong> သည် လူကြိုက်အများဆုံးဖြစ်သည်။ အခမဲ့၊ မြန်ဆန်ပြီး extension ကောင်းများရှိသည်။ သင်သိမ်းသည့်အခါ စာမျက်နှာအလိုအလျောက်ပြန်ဖွင့်ရန် "Live Server" extension ကိုထည့်ပါ။</p>
<h3>၂။ ခေတ်မီဘရောက်ဇာ</h3>
<p>Chrome, Edge သို့မဟုတ် Firefox အားလုံးအဆင်ပြေသည်။ <strong>DevTools</strong> ကိုကျွမ်းဝင်အောင်လုပ်ပါ — မည်သည့်စာမျက်နှာကိုမဆို right-click နှိပ်ပြီး <em>Inspect</em> ကိုရွေးပါ။</p>
<h3>သင့်ပထမဆုံးဖိုင်</h3>
<p><code>index.html</code> ဟုအမည်ပေးထားသောဖိုင်တစ်ခုဖန်တီးပြီး ဤအရာကိုကူးထည့်ပါ-</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, world!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>ဘရောက်ဇာတွင်ဖွင့်ကြည့်ပါ — သင်ဝဘ်စာမျက်နှာတစ်ခုတည်ဆောက်လိုက်ပြီ။ 🎉</p>
<div class="callout tip"><strong>အကြံပြုချက်-</strong> <code>index.html</code> သည် ဆိုက်၏ပင်မစာမျက်နှာအတွက် ရိုးရာအမည်ဖြစ်သည်။ ဆာဗာများက အလိုအလျောက်ဖွင့်သည်။</div>`,
      },
      "html-structure": {
        title: "HTML စာရွက်စာတမ်း ဖွဲ့စည်းပုံ",
        content: `
<p>HTML စာမျက်နှာတိုင်းသည် တူညီသောအရိုးစုကို မျှဝေသုံးသည်။ တစ်ကြိမ်သင်ယူလိုက်လျှင် နေရာတိုင်းတွင်မှတ်မိပါလိမ့်မည်။</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- Everything the user sees goes here --&gt;
    &lt;h1&gt;Welcome&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<h3>အစိတ်အပိုင်းတစ်ခုစီ၏အဓိပ္ပာယ်</h3>
<ul>
  <li><code>&lt;!DOCTYPE html&gt;</code> — ခေတ်မီ HTML5 ကိုသုံးရန် ဘရောက်ဇာကိုပြောသည်။</li>
  <li><code>&lt;head&gt;</code> — metadata- title, character set, CSS link များ။ စာမျက်နှာတွင်မပြပါ။</li>
  <li><code>&lt;body&gt;</code> — မြင်နိုင်သောအကြောင်းအရာ။</li>
</ul>
<h3>Element တစ်ခု၏ဖွဲ့စည်းပုံ</h3>
<p>Element တစ်ခုတွင် ပုံမှန်အားဖြင့် <strong>tag အဖွင့်</strong>၊ <strong>အကြောင်းအရာ</strong> အနည်းငယ်နှင့် <strong>tag အပိတ်</strong> ရှိသည်-</p>
<pre><code>&lt;p&gt;This is the content&lt;/p&gt;
   ^opening         ^closing</code></pre>
<div class="callout tip">Nested element များကို indent လုပ်ပါ။ ကုန်ကျစရာမရှိဘဲ သင့် HTML ကို တစ်ချက်ကြည့်ရုံဖြင့်ဖတ်ရလွယ်စေသည်။</div>`,
      },
      "html-text": {
        title: "စာသား၊ Link နှင့် ပုံများ",
        content: `
<h3>ခေါင်းစဉ်နှင့် စာပိုဒ်များ</h3>
<p>ခေါင်းစဉ်များသည် <code>&lt;h1&gt;</code> (အရေးအကြီးဆုံး) မှ <code>&lt;h6&gt;</code> အထိရှိသည်။ စာမျက်နှာတစ်ခုလျှင် <code>&lt;h1&gt;</code> တစ်ခုသုံးပါ။</p>
<pre><code>&lt;h1&gt;Main title&lt;/h1&gt;
&lt;h2&gt;A section&lt;/h2&gt;
&lt;p&gt;Regular body text goes in a paragraph.&lt;/p&gt;
&lt;strong&gt;Bold&lt;/strong&gt; and &lt;em&gt;italic&lt;/em&gt; add emphasis.</code></pre>
<h3>Link များ</h3>
<p>Anchor tag <code>&lt;a&gt;</code> သည် ဦးတည်ရာအတွက် <code>href</code> attribute ကိုသုံးသည်-</p>
<pre><code>&lt;a href="https://example.com"&gt;Visit Example&lt;/a&gt;
&lt;a href="about.html"&gt;About page&lt;/a&gt;
&lt;a href="#contact"&gt;Jump to a section&lt;/a&gt;</code></pre>
<h3>ပုံများ</h3>
<p>ပုံများသည် <em>self-closing</em> ဖြစ်သည် — tag အပိတ်မရှိ။ accessibility အတွက် <code>alt</code> စာသားကို အမြဲထည့်ပါ-</p>
<pre><code>&lt;img src="cat.jpg" alt="A sleeping orange cat" width="400"&gt;</code></pre>
<div class="callout"><strong>Attribute</strong> များသည် tag အဖွင့်အတွင်းရှိ ထပ်ဆောင်းအချက်အလက်ဖြစ်ပြီး <code>name="value"</code> အဖြစ်ရေးသည်။ <code>src</code>, <code>href</code>, <code>alt</code> အားလုံးသည် attribute များဖြစ်သည်။</div>`,
      },
      "html-lists": {
        title: "စာရင်း၊ ဇယားနှင့် ဖွဲ့စည်းပုံ",
        content: `
<h3>စာရင်းများ</h3>
<pre><code>&lt;ul&gt;                    &lt;!-- unordered (bullets) --&gt;
  &lt;li&gt;HTML&lt;/li&gt;
  &lt;li&gt;CSS&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;                    &lt;!-- ordered (numbers) --&gt;
  &lt;li&gt;Wake up&lt;/li&gt;
  &lt;li&gt;Write code&lt;/li&gt;
&lt;/ol&gt;</code></pre>
<h3>ဇယားများ</h3>
<pre><code>&lt;table&gt;
  &lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Role&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Sara&lt;/td&gt;&lt;td&gt;Instructor&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;</code></pre>
<h3>Semantic ဖွဲ့စည်းပုံ</h3>
<p>ခေတ်မီ HTML သည် ဤကဲ့သို့ tag များဖြင့် layout ကို အဓိပ္ပာယ်ပေးသည်-</p>
<pre><code>&lt;header&gt;...&lt;/header&gt;
&lt;nav&gt;...&lt;/nav&gt;
&lt;main&gt;
  &lt;section&gt;...&lt;/section&gt;
  &lt;article&gt;...&lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;...&lt;/footer&gt;</code></pre>
<div class="callout tip">Semantic tag များသည် screen reader, SEO နှင့် အခြား developer များ သင့်စာမျက်နှာကိုနားလည်ရန်ကူညီသည်။ အဓိပ္ပာယ်ရှိသော tag ရှိလျှင် ယေဘုယျ <code>&lt;div&gt;</code> များထက် ၎င်းတို့ကို ဦးစားပေးပါ။</div>`,
      },
      "html-forms": {
        title: "Form နှင့် Input များ",
        content: `
<p>Form များသည် အသုံးပြုသူများထံမှ input ကိုစုဆောင်းသည်။ အခြေခံများ-</p>
<pre><code>&lt;form&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input type="email" id="email" name="email" placeholder="you@site.com"&gt;

  &lt;label for="msg"&gt;Message&lt;/label&gt;
  &lt;textarea id="msg" name="message"&gt;&lt;/textarea&gt;

  &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;</code></pre>
<h3>အသုံးများသော input အမျိုးအစားများ</h3>
<ul>
  <li><code>text</code>, <code>email</code>, <code>password</code>, <code>number</code></li>
  <li><code>checkbox</code>, <code>radio</code>, <code>date</code>, <code>range</code></li>
</ul>
<div class="callout tip"><code>&lt;input&gt;</code> ကို <code>for</code>/<code>id</code> ကိုက်ညီစွာသုံးပြီး <code>&lt;label&gt;</code> နှင့်အမြဲတွဲပါ။ label ကိုနှိပ်လျှင် field ကို focus လုပ်သည် — screen reader များကလည်း မှန်ကန်စွာကြေညာသည်။</div>`,
      },
      "html-quiz": {
        title: "မေးခွန်း- HTML အခြေခံများ",
        questions: [
          {
            q: "စာမျက်နှာ၏ မြင်နိုင်သောအကြောင်းအရာကို မည်သည့် tag က ကိုင်ထားသနည်း?",
            options: ["&lt;head&gt;", "&lt;body&gt;", "&lt;title&gt;", "&lt;meta&gt;"],
          },
          {
            q: "Link တစ်ခု၏ ဦးတည်ရာကို မည်သည့် attribute က သတ်မှတ်သနည်း?",
            options: ["src", "link", "href", "to"],
          },
          {
            q: "နံပါတ်စာရင်းကို မည်သည့် element က ဖန်တီးသနည်း?",
            options: ["&lt;ul&gt;", "&lt;li&gt;", "&lt;ol&gt;", "&lt;list&gt;"],
          },
          {
            q: "ပုံများပေါ်ရှိ alt attribute သည် အဘယ်ကြောင့်အရေးကြီးသနည်း?",
            options: [
              "ပုံများပိုမြန်မြန် load ဖြစ်စေသည်",
              "screen reader များအတွက်နှင့် ပုံမပေါ်သည့်အခါ စာသားပေးသည်",
              "မဖြစ်မနေလိုအပ်ပြီး မရှိလျှင်စာမျက်နှာ load မဖြစ်ပါ",
              "ပုံအရွယ်အစားကိုပြောင်းသည်",
            ],
          },
        ],
      },
      "css-selectors": {
        title: "Selector များနှင့် Box Model",
        content: `
<h3>CSS ထည့်နည်းသုံးမျိုး</h3>
<p>အကောင်းဆုံးနည်းမှာ <code>&lt;head&gt;</code> တွင်ချိတ်ဆက်ထားသော external stylesheet ဖြစ်သည်-</p>
<pre><code>&lt;link rel="stylesheet" href="styles.css"&gt;</code></pre>
<h3>Selector များ</h3>
<pre><code>h1        { color: navy; }      /* by tag    */
.intro    { font-size: 18px; }  /* by class  */
#hero     { padding: 40px; }    /* by id     */
a:hover   { color: purple; }    /* on hover  */</code></pre>
<h3>Box Model</h3>
<p>Element တိုင်းသည် အလွှာလေးခုဖြင့်ပြုလုပ်ထားသော box တစ်ခုဖြစ်သည်၊ အတွင်းမှအပြင်သို့-</p>
<ul>
  <li><strong>content</strong> — စာသား သို့မဟုတ် ပုံ</li>
  <li><strong>padding</strong> — box အတွင်း၊ content ပတ်လည်ရှိ နေရာလွတ်</li>
  <li><strong>border</strong> — အနားသတ်</li>
  <li><strong>margin</strong> — box <em>အပြင်</em>၊ ၎င်းနှင့်အိမ်နီးချင်းများကြားရှိ နေရာလွတ်</li>
</ul>
<pre><code>.card {
  padding: 16px;
  border: 1px solid #ddd;
  margin: 12px;
}</code></pre>
<div class="callout tip">သင့် CSS ၏ထိပ်တွင် <code>* { box-sizing: border-box; }</code> ကိုထည့်ပါ။ ၎င်းသည် width တွင် padding နှင့် border ပါဝင်စေသည် — များစွာပိုသဘာဝကျသည်။</div>`,
      },
      "css-colors": {
        title: "ရောင်စဉ်၊ ဖောင့်နှင့် စာသား",
        content: `
<h3>ရောင်စဉ်များ</h3>
<pre><code>color: red;                 /* named        */
color: #a435f0;             /* hex          */
color: rgb(164, 53, 240);   /* rgb          */
background: rgba(0,0,0,.5);  /* with alpha   */</code></pre>
<h3>Typography</h3>
<pre><code>body {
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #1c1d1f;
}
h1 { font-weight: 700; letter-spacing: -0.5px; }</code></pre>
<div class="callout">အရန်ဖောင့်များကို အမြဲပေးပါ။ ပထမဖောင့်မရရှိပါက ဘရောက်ဇာသည် နောက်တစ်ခုကိုစမ်းသည်။ <code>sans-serif</code> သို့မဟုတ် <code>serif</code> ဖြင့်အဆုံးသတ်ခြင်းသည် ဖတ်နိုင်သောအရာတစ်ခုကို အာမခံသည်။</div>`,
      },
      "css-flexbox": {
        title: "Flexbox Layout",
        content: `
<p><strong>Flexbox</strong> သည် item များကို အတန်း သို့မဟုတ် ကော်လံအဖြစ်စီပြီး ၎င်းတို့ကြားနေရာကိုခွဲဝေသည် — navbar, card နှင့် အလယ်ဗဟိုချရန်အတွက် ကောင်းမွန်သည်။</p>
<pre><code>.navbar {
  display: flex;
  justify-content: space-between; /* horizontal spacing */
  align-items: center;            /* vertical alignment */
  gap: 16px;
}</code></pre>
<h3>ဝင်ရိုးနှစ်ခု</h3>
<ul>
  <li><code>justify-content</code> သည် <strong>main axis</strong> (အတန်း = အလျားလိုက်) ကိုထိန်းချုပ်သည်။</li>
  <li><code>align-items</code> သည် <strong>cross axis</strong> (အတန်း = ဒေါင်လိုက်) ကိုထိန်းချုပ်သည်။</li>
</ul>
<h3>ပြီးပြည့်စုံသော အလယ်ဗဟိုချခြင်း</h3>
<pre><code>.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}</code></pre>
<div class="callout tip">ရိုးရာ "div ကိုအလယ်ချ" ပြဿနာသည် Flexbox သုံးကြောင်းဖြစ်သည်။ ၎င်းသည် CSS တစ်ခုလုံးတွင် အသုံးဝင်ဆုံးကျွမ်းကျင်မှုများထဲမှတစ်ခုဖြစ်သည်။</div>`,
      },
      "css-grid": {
        title: "CSS Grid",
        content: `
<p>Flexbox သည် တစ်ဖက်မြင်ဖြစ်သော်လည်း <strong>Grid</strong> သည် အတိုင်းအတာနှစ်ခု — အတန်း <em>နှင့်</em> ကော်လံ — ကိုကိုင်တွယ်သဖြင့် စာမျက်နှာအပြည့် layout များအတွက် သင့်လျော်သည်။</p>
<pre><code>.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 20px;
}</code></pre>
<h3>တစ်ကြောင်းတည်းဖြင့် responsive grid</h3>
<pre><code>.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}</code></pre>
<p>၎င်းသည် အနည်းဆုံး 240px ကော်လံများကို အံဝင်သမျှအလိုအလျောက်ထည့်ပြီး wrap လုပ်သည် — media query မလိုပါ။</p>
<div class="callout">Component များ (ခလုတ်အတန်း) အတွက် <strong>Flexbox</strong>၊ စာမျက်နှာအဆင့် layout (sidebar + content) အတွက် <strong>Grid</strong> ကိုသုံးပါ။</div>`,
      },
      "css-responsive": {
        title: "Responsive ဒီဇိုင်းနှင့် Media Query",
        content: `
<p>Responsive ဒီဇိုင်းဆိုသည်မှာ သင့်ဆိုက်သည် ဖုန်း၊ တက်ဘလက်နှင့် ကွန်ပျူတာများတွင် လှပစွာမြင်ရခြင်းဖြစ်သည်။ အဓိကကိရိယာမှာ <strong>media query</strong> ဖြစ်သည်။</p>
<pre><code>/* Default = mobile styles */
.container { grid-template-columns: 1fr; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { grid-template-columns: 1fr 1fr; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { grid-template-columns: 1fr 1fr 1fr; }
}</code></pre>
<h3>Mobile-first</h3>
<p>ဖန်သားပြင်သေးသေးများအတွက် အခြေခံစတိုင်များကိုရေးပြီး <code>min-width</code> query များဖြင့် ကြီးသောဖန်သားပြင်များအတွက် ရှုပ်ထွေးမှုကို <em>ထပ်ထည့်</em> ပါ။ ၎င်းသည် CSS ကိုပိုရိုးရှင်းစေသည်။</p>
<div class="callout tip">သင့် <code>&lt;head&gt;</code> တွင် ဤ tag ကိုမမေ့ပါနှင့်၊ မဟုတ်ပါက mobile ဘရောက်ဇာများသည် ၎င်းတို့၏အကျယ်ကို လိမ်ညာပါလိမ့်မည်-<br><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></div>`,
      },
      "css-quiz": {
        title: "မေးခွန်း- CSS",
        questions: [
          {
            q: "Box model တွင် border ၏ အပြင်ဘက်ရှိ အလွှာသည် အဘယ်နည်း?",
            options: ["padding", "content", "margin", "outline"],
          },
          {
            q: "တစ်ဖက်မြင် item အတန်းအတွက် အကောင်းဆုံး display value သည်?",
            options: ["grid", "flex", "block", "inline"],
          },
          {
            q: "class \"intro\" ပါသော element အားလုံးကို မည်သို့ရွေးသနည်း?",
            options: ["#intro", ".intro", "intro", "*intro"],
          },
          {
            q: "Media query သည် သင့်ကို ဘာလုပ်စေသနည်း?",
            options: [
              "ဗီဒီယိုဖွင့်ရန်",
              "ဖန်သားပြင်အရွယ်အစား သို့မဟုတ် စက်ပစ္စည်းအင်္ဂါရပ်များအပေါ်မူတည်၍ စတိုင်များအသုံးပြုရန်",
              "ဖောင့်များပိုမြန်မြန် load ရန်",
              "JavaScript ထည့်ရန်",
            ],
          },
        ],
      },
      "js-vars": {
        title: "Variable နှင့် Data Type များ",
        content: `
<p>JavaScript သည် စာမျက်နှာများကို interactive ဖြစ်စေသည်။ <strong>Variable</strong> များ — value များအတွက် အမည်ပေးထားသောသိုလှောင်ရာများ — ဖြင့်စတင်ပါ။</p>
<pre><code>let score = 10;        // can be reassigned
const name = "Sara";   // cannot be reassigned
let isReady = true;    // boolean</code></pre>
<p>ပုံမှန်အားဖြင့် <code>const</code> ကို ဦးစားပေးပါ၊ value ပြောင်းလဲမည်ဆိုမှသာ <code>let</code> ကိုသုံးပါ။ ဟောင်းသော <code>var</code> ကိုရှောင်ပါ။</p>
<h3>အဓိက data type များ</h3>
<ul>
  <li><strong>String</strong> — စာသား- <code>"hello"</code></li>
  <li><strong>Number</strong> — <code>42</code>, <code>3.14</code></li>
  <li><strong>Boolean</strong> — <code>true</code> / <code>false</code></li>
  <li><strong>Array</strong> — စာရင်း- <code>[1, 2, 3]</code></li>
  <li><strong>Object</strong> — key/value အတွဲများ- <code>{ name: "Sara" }</code></li>
</ul>
<pre><code>console.log("Hello, " + name); // Hello, Sara</code></pre>
<div class="callout tip"><code>console.log()</code> သည် ဘရောက်ဇာ၏ DevTools console သို့ print လုပ်သည် — debugging အတွက် သင့်အကောင်းဆုံးမိတ်ဆွေ။</div>`,
      },
      "js-functions": {
        title: "Function နှင့် Logic",
        content: `
<h3>Function များ</h3>
<p>Function တစ်ခုသည် ပြန်သုံးနိုင်သော logic ကိုထုပ်ပိုးသည်-</p>
<pre><code>function greet(name) {
  return "Hi, " + name + "!";
}
greet("Sara"); // "Hi, Sara!"</code></pre>
<p>ခေတ်မီ <strong>arrow function</strong> syntax သည် ပိုတိုတောင်းသည်-</p>
<pre><code>const add = (a, b) =&gt; a + b;
add(2, 3); // 5</code></pre>
<h3>ဆုံးဖြတ်ချက်ချခြင်း</h3>
<pre><code>const hour = 14;
if (hour &lt; 12) {
  console.log("Good morning");
} else if (hour &lt; 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}</code></pre>
<div class="callout">Function များသည် ပရိုဂရမ်တိုင်း၏ တည်ဆောက်မှုအုတ်မြစ်များဖြစ်သည်။ ကုဒ်တစ်ခုတည်းကို နှစ်ကြိမ်ရေးမိလျှင် ၎င်းကို function တစ်ခုအဖြစ်ထုပ်ပါ။</div>`,
      },
      "js-arrays": {
        title: "Array နှင့် Object များ",
        content: `
<h3>Array များ</h3>
<pre><code>const skills = ["HTML", "CSS", "JS"];
skills.length;        // 3
skills[0];            // "HTML"
skills.push("React"); // add to end</code></pre>
<h3>Loop ပတ်ခြင်း</h3>
<pre><code>skills.forEach(skill =&gt; {
  console.log(skill);
});</code></pre>
<h3>Object များ</h3>
<pre><code>const course = {
  title: "Web Dev Bootcamp",
  hours: 21.5,
  free: true
};
course.title;      // "Web Dev Bootcamp"
course["hours"];   // 21.5</code></pre>
<div class="callout tip">Array များသည် အစီအစဉ်ရှိစာရင်းများ၊ object များသည် property များ၏ label တပ်အိတ်များဖြစ်သည်။ ၎င်းတို့ပေါင်းစပ်ပြီး သင်တွေ့ကြုံရမည့် data အားလုံးနီးပါးကို ပုံဖော်နိုင်သည်။</div>`,
      },
      "js-dom": {
        title: "DOM ကိုကိုင်တွယ်ခြင်း",
        content: `
<p><strong>DOM</strong> (Document Object Model) သည် သင့် HTML ၏ JavaScript live ကိုယ်စားပြုမှုဖြစ်သည်။ ၎င်းကို ချက်ချင်းဖတ်နိုင်၊ ပြောင်းလဲနိုင်သည်။</p>
<pre><code>// Find an element
const title = document.querySelector("h1");

// Change its text and style
title.textContent = "Updated with JavaScript!";
title.style.color = "purple";

// Create and add a new element
const p = document.createElement("p");
p.textContent = "I was added dynamically.";
document.body.appendChild(p);</code></pre>
<div class="callout"><code>querySelector</code> သည် CSS selector များနှင့်တူညီသော syntax ကိုသုံးသည်- <code>"#id"</code>, <code>".class"</code>, <code>"tag"</code>။ CSS selector များကို တစ်ကြိမ်သင်ယူပြီး နေရာတိုင်းတွင်သုံးပါ။</div>`,
      },
      "js-events": {
        title: "Event နှင့် Interactivity",
        content: `
<p>Event များသည် သင့်ကုဒ်ကို အသုံးပြုသူအား တုံ့ပြန်စေသည် — click, စာရိုက်ခြင်း, form တင်သွင်းခြင်း။</p>
<pre><code>const button = document.querySelector("#myBtn");

button.addEventListener("click", () =&gt; {
  alert("You clicked me!");
});</code></pre>
<h3>ရိုးရှင်းသော counter တစ်ခု</h3>
<pre><code>let count = 0;
const display = document.querySelector("#count");

document.querySelector("#plus").addEventListener("click", () =&gt; {
  count++;
  display.textContent = count;
});</code></pre>
<p>၎င်းသည် interactivity ၏အနှစ်သာရဖြစ်သည်- <em>event ကိုစောင့်ကြည့် → စာမျက်နှာကို update လုပ်</em>။ to-do အက်ပ်များမှ game များအထိ ဤ loop ပေါ်တွင်တည်ဆောက်ထားသည်။</p>
<div class="callout tip">အသုံးများသော event များ- <code>click</code>, <code>input</code>, <code>submit</code>, <code>keydown</code>, <code>mouseover</code>။</div>`,
      },
      "js-quiz": {
        title: "မေးခွန်း- JavaScript",
        questions: [
          {
            q: "ပြန်လည်သတ်မှတ်ခြင်းမပြုသင့်သော value ကို မည်သည့် keyword က ကြေညာသနည်း?",
            options: ["let", "var", "const", "def"],
          },
          {
            q: "document.querySelector(\".btn\") သည် ဘာကိုရွေးသနည်း?",
            options: [
              "id \"btn\" ပါသော element",
              "class \"btn\" ပါသော ပထမဆုံး element",
              "&lt;btn&gt; tag အားလုံး",
              "ဘာမှမဟုတ် — မမှန်ကန်ပါ",
            ],
          },
          {
            q: "Array တစ်ခု၏အဆုံးသို့ item တစ်ခုကို မည်သို့ထည့်သနည်း?",
            options: ["array.add()", "array.push()", "array.append()", "array.end()"],
          },
          {
            q: "အသုံးပြုသူလုပ်ဆောင်ချက်ကိုတုံ့ပြန်၍ ကုဒ်ကို run စေသော method သည်?",
            options: ["addEventListener", "console.log", "querySelector", "createElement"],
          },
        ],
      },
      "project-portfolio": {
        title: "ပရောဂျက်- သင့် Portfolio ဆိုက်ကိုတည်ဆောက်ပါ",
        content: `
<p>အားလုံးကို အလုပ်ရှင်များအားပြသနိုင်သည့် တကယ့် single-page <strong>portfolio</strong> တစ်ခုတွင်ပေါင်းစပ်ရန် အချိန်တန်ပြီ။</p>
<h3>အစီအစဉ်</h3>
<ol>
  <li><strong>ဖွဲ့စည်းပုံ (HTML)-</strong> သင့်အမည်နှင့် nav ပါသော header, "About" အပိုင်း, "Projects" grid နှင့် ဆက်သွယ်ရန် footer။</li>
  <li><strong>စတိုင် (CSS)-</strong> ရောင်စဉ် theme, Flexbox navbar နှင့် project များအတွက် responsive Grid။</li>
  <li><strong>Interactivity (JS)-</strong> dark-mode toggle နှင့် "back to top" ခလုတ်။</li>
</ol>
<h3>အစပြု skeleton</h3>
<pre><code>&lt;header&gt;
  &lt;h1&gt;Your Name&lt;/h1&gt;
  &lt;nav&gt;
    &lt;a href="#about"&gt;About&lt;/a&gt;
    &lt;a href="#projects"&gt;Projects&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;section id="about"&gt;
    &lt;h2&gt;About me&lt;/h2&gt;
    &lt;p&gt;A short bio...&lt;/p&gt;
  &lt;/section&gt;

  &lt;section id="projects"&gt;
    &lt;h2&gt;Projects&lt;/h2&gt;
    &lt;div class="grid"&gt;&lt;!-- project cards --&gt;&lt;/div&gt;
  &lt;/section&gt;
&lt;/main&gt;</code></pre>
<h3>JS တွင် Dark-mode toggle</h3>
<pre><code>const toggle = document.querySelector("#theme");
toggle.addEventListener("click", () =&gt; {
  document.body.classList.toggle("dark");
});</code></pre>
<div class="callout tip"><strong>စိန်ခေါ်မှု-</strong> local တွင်အလုပ်လုပ်ပြီးသည်နှင့် GitHub Pages သို့မဟုတ် Netlify ဖြင့် အခမဲ့ publish လုပ်ပြီး link ကို သင့် résumé တွင်ထည့်ပါ။ သင်ယခု ဝဘ်ဒီဗလော့ပါတစ်ယောက်ဖြစ်ပြီ။ 🚀</div>
<h3>နောက်တစ်ဆင့် ဘယ်သွားမလဲ</h3>
<ul>
  <li>Version control အတွက် <strong>Git &amp; GitHub</strong> ကိုသင်ယူပါ။</li>
  <li>ကြီးသောအက်ပ်များတည်ဆောက်ရန် <strong>React</strong> ကဲ့သို့ framework တစ်ခုရွေးပါ။</li>
  <li>တကယ့် data များ load ရန် <strong>Fetch API</strong> ကိုလေ့လာပါ။</li>
</ul>
<p>Bootcamp ပြီးဆုံးသည့်အတွက် ဂုဏ်ယူပါသည် — ၁၀၀% ရရှိရန် ဤသင်ခန်းစာကို ပြီးစီးအဖြစ်မှတ်ပါ! 🎓</p>`,
      },

      /* ===== CSS Mastery (Myanmar) ===== */
      "cm-vars": {
        title: "CSS Custom Properties (Variable များ)",
        content: `
<p>Custom property များသည် ပြန်သုံးနိုင်သော value များကို သတ်မှတ်ခွင့်ပေးသည် — theming အတွက် ပြီးပြည့်စုံသည်။</p>
<pre><code>:root {
  --brand: #a435f0;
  --gap: 16px;
}
.button { background: var(--brand); padding: var(--gap); }</code></pre>
<div class="callout tip"><code>:root</code> ရှိ variable တစ်ခုကိုပြောင်းလိုက်ရုံဖြင့် နေရာတိုင်းတွင် update ဖြစ်သည် — dark mode နှင့် design system များ၏ အခြေခံ။</div>`,
      },
      "cm-transitions": {
        title: "Transition နှင့် Animation များ",
        content: `
<h3>Transition များ</h3>
<pre><code>.card {
  transition: transform .2s ease, box-shadow .2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,.15);
}</code></pre>
<h3>Keyframe animation များ</h3>
<pre><code>@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: .4; }
}
.badge { animation: pulse 1.5s infinite; }</code></pre>
<div class="callout">သိမ်မွေ့သောလှုပ်ရှားမှုသည် အာရုံကိုလမ်းညွှန်သည်။ UI feedback အတွက် ကြာချိန်တိုတိုထားပါ (150–300ms)။</div>`,
      },
      "cm-quiz": {
        title: "မေးခွန်း- ခေတ်မီ CSS",
        questions: [
          {
            q: "Global CSS variable များကို ပုံမှန်အားဖြင့် ဘယ်နေရာတွင် ကြေညာသနည်း?",
            options: [":root", "body", "@media", "*"],
          },
          {
            q: "Hover လုပ်သည့်အခါ ပြောင်းလဲမှုများကို ချောမွေ့စွာ animate လုပ်သော property သည်?",
            options: ["animation", "transition", "transform", "keyframes"],
          },
        ],
      },

      /* ===== JavaScript Essentials (Myanmar) ===== */
      "je-hello": {
        title: "သင့်ပထမဆုံး Script",
        content: `
<p>JavaScript ကို စာမျက်နှာသို့ <code>&lt;/body&gt;</code> tag အပိတ်မတိုင်မီ ချက်ချင်းထည့်ပါ-</p>
<pre><code>&lt;script src="app.js"&gt;&lt;/script&gt;</code></pre>
<p><code>app.js</code> တွင်-</p>
<pre><code>console.log("Hello from JavaScript!");
alert("The page is alive!");</code></pre>
<div class="callout tip">DevTools (F12) → Console tab ကိုဖွင့်ပြီး သင့် log များကိုကြည့်ပါ။</div>`,
      },
      "je-loops": {
        title: "Loop များ",
        content: `
<p>Loop များသည် copy-paste မလုပ်ဘဲ အလုပ်ကို ထပ်ခါထပ်ခါလုပ်သည်။</p>
<pre><code>for (let i = 1; i &lt;= 5; i++) {
  console.log("Line " + i);
}

const fruits = ["apple", "pear", "kiwi"];
for (const fruit of fruits) {
  console.log(fruit);
}</code></pre>
<div class="callout">Array များကို သပ်ရပ်စွာဖြတ်သန်းရန် <code>for...of</code> loop ကိုသုံးပါ။</div>`,
      },
      "je-quiz": {
        title: "မေးခွန်း- JS အခြေခံ",
        questions: [
          {
            q: "Developer console သို့ စာသားကို ဘာက print လုပ်သနည်း?",
            options: ["print()", "console.log()", "echo()", "log.console()"],
          },
          {
            q: "for loop ကို ဘာအတွက်သုံးသနည်း...",
            options: [
              "Element များကို စတိုင်လုပ်ရန်",
              "ကုဒ်တစ်စုကို ထပ်ခါလုပ်ရန်",
              "Variable တစ်ခုသတ်မှတ်ရန်",
              "စာမျက်နှာ load ရန်",
            ],
          },
        ],
      },

      /* ===== Responsive Web Design (Myanmar) ===== */
      "rd-units": {
        title: "Relative Unit များ- rem, em, %, vw",
        content: `
<p>Pixel အသေများသည် အရွယ်အလိုက်မချဲ့ပါ။ Relative unit များက ချဲ့သည်။</p>
<ul>
  <li><code>rem</code> — root font size နှင့်ဆက်စပ် (နေရာချထားမှုနှင့် စာလုံးအတွက်ကောင်း)။</li>
  <li><code>%</code> — parent ၏အရွယ်အစားနှင့်ဆက်စပ်။</li>
  <li><code>vw</code>/<code>vh</code> — viewport အကျယ်/အမြင့်၏ 1%။</li>
</ul>
<pre><code>h1 { font-size: 2.5rem; }
.hero { padding: 5vw; }
.col { width: 50%; }</code></pre>
<div class="callout tip">နေရာချထားမှုနှင့် font size များကို <code>rem</code> ဖြင့်သတ်မှတ်ပါ၊ ထို့ကြောင့် UI တစ်ခုလုံးသည် root value တစ်ခုနှင့်အတူ အရွယ်အလိုက်ချဲ့သည်။</div>`,
      },
      "rd-media": {
        title: "အလုပ်လုပ်သော Breakpoint များ",
        content: `
<pre><code>/* mobile first */
.grid { grid-template-columns: 1fr; }

@media (min-width: 600px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}</code></pre>
<div class="callout">Breakpoint များကို content ကဆုံးဖြတ်ပါစေ။ သင့်ဘရောက်ဇာကို resize လုပ်ပြီး layout ကျဉ်းကျပ်လာသည့်အခါတိုင်း တစ်ခုထည့်ပါ။</div>`,
      },
      "rd-quiz": {
        title: "မေးခွန်း- Responsive",
        questions: [
          {
            q: "Viewport အကျယ်၏ 1% ဖြစ်သော unit သည်?",
            options: ["rem", "vw", "em", "px"],
          },
          {
            q: "\"Mobile-first\" ဆိုသည်မှာ သင်...",
            options: [
              "ဖုန်းများကိုသာ support လုပ်သည်",
              "ဖန်သားပြင်သေးများအတွက် အခြေခံစတိုင်ရေးပြီး ကြီးလာအောင်တိုးမြှင့်သည်",
              "Desktop ကို ဦးစွာဒီဇိုင်းလုပ်သည်",
              "Mobile တွင် content ဖုံးကွယ်သည်",
            ],
          },
        ],
      },

      /* ===== Land Your First Web Developer Job (Myanmar) ===== */
      "dc-portfolio": {
        title: "ထူးခြားသော Portfolio တစ်ခု",
        content: `
<p>အလုပ်ခန့်သူများသည် portfolio တစ်ခုအပေါ် စက္ကန့်ပိုင်းသာအချိန်ပေးသည်။ ၎င်းတို့ကို တန်ဖိုးရှိအောင်လုပ်ပါ။</p>
<ul>
  <li><strong>တကယ့်ပရောဂျက် ၃–၄ ခု</strong> ဖြင့် ဦးဆောင်ပါ၊ တစ်ခုစီတွင် live link နှင့် source code ပါစေ။</li>
  <li>ပရောဂျက်တိုင်းအတွက်- ဘာလုပ်သည်၊ သင်ဘာတည်ဆောက်ခဲ့သည်၊ သုံးထားသည့် tech။</li>
  <li>ဒီဇိုင်းကို သန့်ရှင်း၊ မြန်ဆန်၊ responsive ဖြစ်အောင်ထားပါ — ၎င်းသည် အလုပ်နမူနာတစ်ခု <em>ဖြစ်သည်</em>။</li>
</ul>
<div class="callout tip">ကောင်းမွန်စွာပြီးမြောက်သော ပရောဂျက်တစ်ခုသည် တစ်ဝက်တစ်ပျက်ပရောဂျက်ဆယ်ခုထက်သာသည်။ နက်နဲမှုသည် ပရော်ဖက်ရှင်နယ်ဆန်မှုကိုပြသည်။</div>`,
      },
      "dc-github": {
        title: "GitHub ကို ပရော်ဖက်ရှင်နယ်ဆန်စွာအသုံးပြုခြင်း",
        content: `
<p>သင့် GitHub သည် အများသုံး résumé တစ်ခုဖြစ်သည်။ အလုပ်ရှင်များ <em>ကြည့်မည်</em> မှာသေချာသည်။</p>
<ul>
  <li>Screenshot များနှင့် setup အဆင့်များပါသော ရှင်းလင်းသည့် <strong>README</strong> ဖိုင်များရေးပါ။</li>
  <li>အဓိပ္ပာယ်ရှိသော message များဖြင့် မကြာခဏ commit လုပ်ပါ။</li>
  <li>သင့်အကောင်းဆုံး repository များကို profile တွင် pin လုပ်ပါ။</li>
</ul>
<pre><code># A good commit message
git commit -m "Add dark-mode toggle to portfolio header"</code></pre>
<div class="callout">အစိမ်းရောင်စတုရန်းများသည် ပန်းတိုင်မဟုတ်ပါ — ကောင်းစွာမှတ်တမ်းတင်ထားသော ပရောဂျက်အနည်းငယ်သည် ဆူညံသံနံရံတစ်ခုထက်သာသည်။</div>`,
      },
      "dc-quiz": {
        title: "မေးခွန်း- အသက်မွေးဝမ်းကြောင်း",
        questions: [
          {
            q: "Junior portfolio တစ်ခုတွင် အရေးအကြီးဆုံးအရာသည် အဘယ်နည်း?",
            options: [
              "ဖြစ်နိုင်သမျှ ပရောဂျက်များများ",
              "Live link ပါသော ကောင်းမွန်သည့် ပရောဂျက်အနည်းငယ်",
              "လှပသော animation intro",
              "သင့် GPA",
            ],
          },
          {
            q: "ကောင်းသော commit message သည်...",
            options: [
              "အလွတ်ထားခြင်း",
              "\"update\"",
              "ရှင်းလင်းပြီး ဘာပြောင်းလဲသည်ကို ဖော်ပြခြင်း",
              "ရက်စွဲသာ",
            ],
          },
        ],
      },
    },
  },
};
