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
      nav_howto: "How-To",
      howto_title: "How-To Guides",
      howto_sub: "Short copy-paste recipes for everyday web-dev tasks — tap Try it to run each one in the Playground.",
      howto_home_sub: "Quick recipes — center a div, make a form, and more",
      howto_none: "Nothing here yet.",
      ht_all: "All",
      ht_try: "Try it",
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
      run_here: "Run here",
      run_hide: "Hide",
      run_edit_hint: "Edit the code — the result updates live",
      run_result: "Result",
      action_title: "Your turn",
      action_task_code: "Open the Playground and rebuild this lesson's example from memory — then change one thing and run it.",
      action_task_reflect: "In one sentence (in your notes below), write the most important thing you learned in this lesson.",
      action_mark: "✓ I did it!",
      action_done: "Done",
      action_praise: "Nice work — that's how it sticks",
      poll_title: "How well did you get this lesson?",
      poll_confusing: "Confusing",
      poll_ok: "OK",
      poll_gotit: "Got it!",
      poll_total: "{n} students voted",
      poll_first: "Be the first to vote 👆",
      pg_save: "Save",
      pg_snippets: "My snippets",
      pg_download: "Download",
      pg_name_prompt: "Snippet name?",
      pg_page_sub: "Write HTML, CSS or JavaScript on the left — see the result and console output instantly. Your work auto-saves in this browser.",
      nav_tools: "Tools",
      nav_gallery: "Gallery",
      gal_title: "🖼️ Course Gallery",
      gal_sub: "Browse every course visually — tap any card to open it.",
      gal_all: "All courses",
      map_title: "Full Lesson Map",
      map_view: "Full lesson map",
      start_title: "🧭 Find My Course",
      start_sub: "Answer 3 quick questions — we'll pick the perfect starting course for you.",
      start_q1: "What's your goal?",
      start_g_job: "💼 Get a developer job",
      start_g_web: "🌐 Build my own website",
      start_g_ai: "🤖 AI & automation",
      start_g_data: "📊 Data & office skills",
      start_q2: "Your experience level?",
      start_x_new: "🆕 Total beginner",
      start_x_some: "📗 I know some HTML/CSS",
      start_x_pro: "💪 Comfortable with code",
      start_q3: "How much time do you have?",
      start_t_low: "⏳ 15–30 min/day",
      start_t_mid: "🕐 About 1 hour/day",
      start_t_high: "🚀 2+ hours/day",
      start_reco: "Your perfect starting course",
      start_also: "Also great for you",
      start_tip_low: "💡 Tip: set your weekly goal to 3 lessons — small steps win.",
      start_tip_mid: "💡 Tip: set your weekly goal to 5 lessons — a steady pace.",
      start_tip_high: "💡 Tip: set your weekly goal to 10 lessons — fast track!",
      start_link: "Not sure where to start? Take the 1-minute quiz",
      ev_title: "Upcoming events",
      ev_activity: "Recent activity",
      ev_join: "Join",
      ev_none: "No events scheduled yet — check back soon!",
      ev_today: "Today",
      ev_tomorrow: "Tomorrow",
      ev_min_ago: "m ago",
      ev_hr_ago: "h ago",
      ev_day_ago: "d ago",
      ev_studied: "was studying",
      ev_help: "Schedule live calls, Q&A sessions or challenges — students see them on the Community page.",
      ev_create: "Add event",
      ev_err: "Could not save — publish the updated firebase-rules.json first.",
      bt_title: "Quiz Battle",
      bt_sub: "Challenge a friend to a live 5-question race — faster correct answers score more!",
      bt_create: "Create a battle",
      bt_or: "or",
      bt_join_ph: "CODE",
      bt_join: "Join",
      bt_how: "How it works",
      bt_how1: "Create a battle and share the code with a friend",
      bt_how2: "Both answer the same 5 questions — correct = 100 pts, speed bonus up to +50",
      bt_how3: "Winner gets +30 XP, loser +10, draw +15 — everyone levels up!",
      bt_login: "Log in to battle — your score goes on the leaderboard!",
      rep_title: "Reports",
      rep_banned: "Banned accounts",
      rep_in: "in",
      rep_by: "reported by",
      rep_delmsg: "Delete message",
      rep_ban: "Ban author",
      rep_dismiss: "Dismiss",
      rep_none: "No reports — the community is behaving!",
      rep_unban: "Unban",
      rep_noban: "No banned accounts.",
      bt_waiting: "Waiting for your opponent…",
      bt_share: "Share this code with a friend to start",
      bt_invite_chat: "Invite via chat",
      bt_chat_invite: "Who dares to battle me? Code: {code} →",
      bt_full: "This battle already has 2 players",
      bt_q: "Question",
      bt_pts: "pts",
      bt_wait_opp: "You finished! Waiting for your opponent…",
      bt_win: "You win!",
      bt_lose: "Good fight — keep practicing!",
      bt_draw: "It's a draw!",
      bt_again: "Battle again",
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
      case_share: "Share a case study",
      case_tag: "Case study",
      case_title_ph: "Title — what's the problem?",
      case_desc_ph: "Describe it: what you tried, what happened, what you expected…",
      case_shot: "Screenshot",
      case_post: "Post case",
      case_need: "Case needs a title and a description!",
      case_max: "Max 4 screenshots per case.",
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
      dash_trend: "Activity — last 14 days",
      dash_active_today: "Active today",
      dash_active7: "This week",
      dash_views14: "Views (14d)",
      push_enable: "Get notifications",
      push_on: "Notifications on!",
      push_not_ready: "Notifications aren't switched on by the site owner yet — coming soon!",
      push_denied: "Your browser blocked notifications — allow them in site settings to subscribe.",
      push_title: "Push notifications",
      push_help: "Send a notification to every subscribed student (needs the one-time FCM setup: VAPID key below + FCM_SA / PUSH_SECRET secrets in the Cloudflare worker).",
      push_send: "Send to all",
      push_secret_ask: "Enter your PUSH_SECRET (the one you set in the Cloudflare worker):",
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
      tutor_recap: "Key takeaways",
      tutor_diagram: "Diagram",
      tutor_realworld: "Real example",
      tutor_story: "Story",
      tutor_free_left: "{n} free explanations left today",
      tutor_free_out: "You've used today's free explanations — come back tomorrow, or unlock unlimited.",
      tutor_more: "Unlock unlimited tutor + examples & practice",
      chat_ai_premium: "@ai is for Premium members — see the ⭐ Premium page",
      cert_download: "Download image",
      cert_share_fb: "📘 Share on Facebook",
      cert_share_chat: "📣 Share to class chat",
      cert_shared: "Shared!",
      cert_chat_msg: 'I completed "{c}" and earned my certificate! 🎉',
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
      review_sub: "Questions from quizzes you've passed come back as flashcards — timed to return right before you'd forget them.",
      rv_stat_due: "due today",
      rv_stat_cards: "cards",
      rv_stat_streak: "day streak",
      rv_empty: "Pass any lesson quiz and its questions become flashcards here — each one comes back right before you'd forget it.",
      rv_take_quiz: "Take your next quiz",
      rv_done_title: "All caught up!",
      rv_done_sub: "Your next card returns on {d}. Come back tomorrow to keep the habit going.",
      rv_ahead: "Practice ahead",
      rv_ahead_note: "Extra practice — doesn't change the schedule or earn XP.",
      rv_ready: "{n} card(s) due today. A few minutes now locks them into long-term memory.",
      rv_today_count: "{n} reviewed today",
      rv_start: "Start review · {n} cards",
      rv_new: "New",
      rv_next: "Next",
      rv_wrong_note: "Study the green answer — this card will come back tomorrow.",
      rv_finish: "Session complete!",
      rv_streak_kept: "Today counts toward your study streak.",
      rv_more: "Review {n} more",
      rv_ai_title: "AI Challenge",
      rv_ai_sub: "Fresh AI-written questions from all your finished lessons.",
      rv_home_due: "{n} cards ready to review",
      rv_home_done: "Memory trained today",
      rv_home_none: "All caught up — nothing due",
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
      classroom_assign: "Assign to Google Classroom",
      classroom_short: "Classroom",
      classroom_hint: "Teachers: post this to your class in one tap.",
      soon_badge: "More coming soon",
      soon_note: "🚧 This is a starter course — it covers the essentials now, and more lessons are being added. Completing it still counts toward your streak, XP and certificate!",
      hours_content: "hours of content",
      lessons_quizzes: "lessons & quizzes",
      pace: "Learn at your own pace",
      saved_auto: "Progress saved automatically",

      lesson_word: "Lesson",
      lesson_read_below: "Read the full lesson below 👇",
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
      chat_report: "Report",
      chat_report_confirm: "Report this message to the moderators?",
      chat_reported: "Reported — a moderator will review it. Thank you!",
      chat_block: "Block",
      chat_block_confirm: "Block {n}? You won't see their messages anymore (you can unblock any time).",
      chat_blocked_n: "{n} blocked",
      chat_ban: "Ban (admin)",
      chat_ban_confirm: "Ban {n} from posting everywhere? Their account will be refused by the server.",
      chat_unban_confirm: "{n} is already banned. Remove the ban?",
      chat_banned: "{n} is banned",
      chat_unbanned: "{n} unbanned",
      chat_you_banned: "Your account has been banned from posting. Contact a moderator if you think this is a mistake.",
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
      chat_voice: "Voice message",
      chat_recording: "Recording… tap ⏹ to send (max 30s)",
      chat_voice_long: "Voice note too long — keep it under 30 seconds.",
      chat_mic_unsupported: "Voice notes aren't supported in this browser.",
      chat_mic_denied: "Microphone permission was denied.",
      chat_new_msgs: "New messages",
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
      nav_howto: "How-To",
      howto_title: "How-To လမ်းညွှန်များ",
      howto_sub: "နေ့စဉ်သုံး web-dev အလုပ်များအတွက် copy-paste လုပ်လို့ရတဲ့ recipe တိုတိုများ — Try it နှိပ်ပြီး Playground မှာ စမ်းကြည့်ပါ။",
      howto_home_sub: "recipe အမြန် — div အလယ်ချ၊ ဖောင်ပြုလုပ်၊ အစရှိသဖြင့်",
      howto_none: "ဘာမှ မရှိသေးပါ။",
      ht_all: "အားလုံး",
      ht_try: "စမ်းကြည့်",
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
      run_here: "ဒီမှာ Run မယ်",
      run_hide: "ဖျောက်ရန်",
      run_edit_hint: "ကုဒ်ကို ပြင်ကြည့်ပါ — ရလဒ် ချက်ချင်း ပြောင်းသည်",
      run_result: "ရလဒ်",
      action_title: "သင့်အလှည့်",
      action_task_code: "Playground ဖွင့်ပြီး ဒီသင်ခန်းစာရဲ့ နမူနာကို အာဂုံဆောင်ပြန်ဆောက်ကြည့်ပါ — ပြီးရင် တစ်ခုပြောင်းပြီး run ကြည့်ပါ။",
      action_task_reflect: "အောက်က notes မှာ — ဒီသင်ခန်းစာက အရေးအကြီးဆုံး သင်ယူခဲ့တာကို စာတစ်ကြောင်းနဲ့ ရေးပါ။",
      action_mark: "✓ လုပ်ပြီးပါပြီ!",
      action_done: "ပြီးပါပြီ",
      action_praise: "တော်တယ် — ဒီလိုမှ စွဲမြဲမှာ",
      poll_title: "ဒီသင်ခန်းစာ ဘယ်လောက် နားလည်လဲ?",
      poll_confusing: "ရှုပ်တယ်",
      poll_ok: "ရတယ်",
      poll_gotit: "နားလည်ပြီ!",
      poll_total: "ကျောင်းသား {n} ဦး မဲပေးပြီး",
      poll_first: "ပထမဆုံး မဲပေးလိုက်ပါ 👆",
      pg_save: "သိမ်းရန်",
      pg_snippets: "ကျွန်ုပ်၏ ကုဒ်များ",
      pg_download: "ဒေါင်းလုဒ်",
      pg_name_prompt: "ကုဒ်အမည် ပေးပါ?",
      pg_page_sub: "ဘယ်ဘက်တွင် HTML, CSS သို့မဟုတ် JavaScript ရေးပါ — ရလဒ်နှင့် console ကို ချက်ချင်းမြင်ရမည်။ သင့်ကုဒ်ကို ဤဘရောက်ဇာတွင် အလိုအလျောက်သိမ်းသည်။",
      nav_tools: "ကိရိယာများ",
      nav_gallery: "ပြခန်း",
      gal_title: "🖼️ သင်တန်း ပြခန်း",
      gal_sub: "သင်တန်းအားလုံးကို ပုံနဲ့ လှည့်ကြည့်ပါ — ကတ်တစ်ခုကို နှိပ်ပြီး ဝင်ကြည့်နိုင်ပါတယ်။",
      gal_all: "သင်တန်းအားလုံး",
      map_title: "သင်ခန်းစာ မြေပုံ အပြည့်အစုံ",
      map_view: "သင်ခန်းစာ မြေပုံ ကြည့်ရန်",
      start_title: "🧭 ကျွန်ုပ်၏ သင်တန်းရှာရန်",
      start_sub: "မေးခွန်း ၃ ခု ဖြေပါ — သင့်အတွက် အသင့်တော်ဆုံး စတင်ရမည့် သင်တန်းကို ရွေးပေးပါမည်။",
      start_q1: "သင့်ရည်မှန်းချက်က ဘာလဲ?",
      start_g_job: "💼 Developer အလုပ် ရချင်တယ်",
      start_g_web: "🌐 ကိုယ်ပိုင် website ဆောက်ချင်တယ်",
      start_g_ai: "🤖 AI နှင့် automation",
      start_g_data: "📊 ဒေတာနှင့် ရုံးသုံး ကျွမ်းကျင်မှု",
      start_q2: "သင့်အတွေ့အကြုံ အဆင့်?",
      start_x_new: "🆕 လုံးဝ အစပြုသူ",
      start_x_some: "📗 HTML/CSS နည်းနည်း သိတယ်",
      start_x_pro: "💪 ကုဒ်ရေးတာ ကျွမ်းကျင်ပြီ",
      start_q3: "တစ်နေ့ အချိန်ဘယ်လောက် ပေးနိုင်လဲ?",
      start_t_low: "⏳ ၁၅–၃၀ မိနစ်",
      start_t_mid: "🕐 ၁ နာရီခန့်",
      start_t_high: "🚀 ၂ နာရီအထက်",
      start_reco: "သင့်အတွက် အသင့်တော်ဆုံး သင်တန်း",
      start_also: "သင့်အတွက် ကောင်းသော အခြားရွေးချယ်စရာ",
      start_tip_low: "💡 အကြံ: တစ်ပတ်ရည်မှန်းချက်ကို သင်ခန်းစာ ၃ ခု ထားပါ — ခြေလှမ်းငယ်များက အောင်မြင်စေသည်။",
      start_tip_mid: "💡 အကြံ: တစ်ပတ်ရည်မှန်းချက်ကို သင်ခန်းစာ ၅ ခု ထားပါ — မှန်မှန်သွားပါ။",
      start_tip_high: "💡 အကြံ: တစ်ပတ်ရည်မှန်းချက်ကို သင်ခန်းစာ ၁၀ ခု ထားပါ — အမြန်လမ်းကြောင်း!",
      start_link: "ဘယ်ကစရမလဲ မသေချာဘူးလား? ၁ မိနစ် စစ်ဆေးမေးခွန်း ဖြေကြည့်ပါ",
      ev_title: "လာမည့် ပွဲအစီအစဉ်များ",
      ev_activity: "လတ်တလော လှုပ်ရှားမှုများ",
      ev_join: "ပါဝင်ရန်",
      ev_none: "ပွဲအစီအစဉ် မရှိသေးပါ — မကြာခင် ပြန်စစ်ကြည့်ပါ!",
      ev_today: "ဒီနေ့",
      ev_tomorrow: "မနက်ဖြန်",
      ev_min_ago: " မိနစ်အကြာက",
      ev_hr_ago: " နာရီအကြာက",
      ev_day_ago: " ရက်အကြာက",
      ev_studied: "စာလေ့လာနေခဲ့သည်",
      ev_help: "Live ခေါ်ဆိုမှုများ၊ Q&A များ၊ စိန်ခေါ်မှုများကို စီစဉ်ပါ — ကျောင်းသားများက Community စာမျက်နှာတွင် မြင်ရပါမည်။",
      ev_create: "ပွဲ ထည့်ရန်",
      ev_err: "မသိမ်းနိုင်ပါ — firebase-rules.json အသစ်ကို အရင် publish လုပ်ပါ။",
      bt_title: "Quiz တိုက်ပွဲ",
      bt_sub: "သူငယ်ချင်းကို စိန်ခေါ်ပါ — မေးခွန်း ၅ ခု အပြိုင်ဖြေ၊ မြန်မြန်မှန်လေ အမှတ်များလေ!",
      bt_create: "တိုက်ပွဲ ဖန်တီးရန်",
      bt_or: "သို့မဟုတ်",
      bt_join_ph: "ကုဒ်",
      bt_join: "ဝင်ရန်",
      bt_how: "ဘယ်လိုကစားရမလဲ",
      bt_how1: "တိုက်ပွဲဖန်တီးပြီး ကုဒ်ကို သူငယ်ချင်းဆီ မျှဝေပါ",
      bt_how2: "နှစ်ယောက်လုံး တူညီသော မေးခွန်း ၅ ခု ဖြေရမည် — မှန်လျှင် ၁၀၀ မှတ် + အမြန်ဆု +၅၀ အထိ",
      bt_how3: "အနိုင်ရသူ +30 XP၊ ရှုံးသူ +10၊ သရေ +15 — အားလုံး တိုးတက်တယ်!",
      bt_login: "Battle ကစားရန် လော့ဂ်အင်ဝင်ပါ — သင့်ရမှတ် leaderboard ပေါ်တက်မည်!",
      rep_title: "တိုင်ကြားချက်များ",
      rep_banned: "ပိတ်ထားသော အကောင့်များ",
      rep_in: "နေရာ",
      rep_by: "တိုင်ကြားသူ",
      rep_delmsg: "စာကို ဖျက်ရန်",
      rep_ban: "ရေးသူကို ပိတ်ရန်",
      rep_dismiss: "ပယ်ရန်",
      rep_none: "တိုင်ကြားချက် မရှိပါ — အသိုင်းအဝိုင်း ကောင်းမွန်နေပါသည်!",
      rep_unban: "ပြန်ဖွင့်ရန်",
      rep_noban: "ပိတ်ထားသော အကောင့် မရှိပါ။",
      bt_waiting: "ပြိုင်ဘက်ကို စောင့်နေသည်…",
      bt_share: "စတင်ရန် ဒီကုဒ်ကို သူငယ်ချင်းဆီ ပို့ပါ",
      bt_invite_chat: "Chat မှ ဖိတ်ရန်",
      bt_chat_invite: "ငါနဲ့ တိုက်ရဲသလား? ကုဒ်: {code} →",
      bt_full: "ဒီတိုက်ပွဲမှာ ကစားသမား ၂ ယောက် ပြည့်နေပါပြီ",
      bt_q: "မေးခွန်း",
      bt_pts: "မှတ်",
      bt_wait_opp: "သင်ပြီးပါပြီ! ပြိုင်ဘက်ကို စောင့်နေသည်…",
      bt_win: "သင် နိုင်ပါပြီ!",
      bt_lose: "ကောင်းကောင်း တိုက်ခဲ့တယ် — ဆက်လေ့ကျင့်ပါ!",
      bt_draw: "သရေ ကျပါပြီ!",
      bt_again: "ထပ်တိုက်မယ်",
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
      case_share: "Case study မျှဝေရန်",
      case_tag: "Case study",
      case_title_ph: "ခေါင်းစဉ် — ပြဿနာက ဘာလဲ?",
      case_desc_ph: "ရှင်းပြပါ- ဘာစမ်းခဲ့လဲ၊ ဘာဖြစ်လဲ၊ ဘာဖြစ်သင့်လဲ…",
      case_shot: "Screenshot",
      case_post: "Case တင်ရန်",
      case_need: "Case အတွက် ခေါင်းစဉ်နှင့် ဖော်ပြချက် လိုသည်!",
      case_max: "Case တစ်ခုလျှင် screenshot ၄ ပုံအထိသာ။",
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
      dash_trend: "လှုပ်ရှားမှု — နောက်ဆုံး ၁၄ ရက်",
      dash_active_today: "ယနေ့ တက်ကြွ",
      dash_active7: "ဒီအပတ်",
      dash_views14: "ကြည့်ရှုမှု (၁၄ရက်)",
      push_enable: "အသိပေးချက် ရယူရန်",
      push_on: "အသိပေးချက် ဖွင့်ပြီး!",
      push_not_ready: "ဆိုက်ပိုင်ရှင်က အသိပေးချက်စနစ် မဖွင့်ရသေးပါ — မကြာမီ လာမည်!",
      push_denied: "Browser က အသိပေးချက်ကို ပိတ်ထားသည် — site settings တွင် ခွင့်ပြုပါ။",
      push_title: "Push အသိပေးချက်များ",
      push_help: "Subscribe လုပ်ထားသော ကျောင်းသားအားလုံးထံ အသိပေးချက် ပို့ပါ (တစ်ကြိမ်တည်း FCM setup လိုသည်)။",
      push_send: "အားလုံးထံ ပို့ရန်",
      push_secret_ask: "PUSH_SECRET ထည့်ပါ (Cloudflare worker တွင် သတ်မှတ်ထားသည့်အတိုင်း)-",
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
      tutor_recap: "အဓိက မှတ်သားစရာ",
      tutor_diagram: "ပုံကြမ်း",
      tutor_realworld: "လက်တွေ့ဥပမာ",
      tutor_story: "ပုံပြင်",
      tutor_free_left: "ယနေ့ အခမဲ့ ရှင်းပြချက် {n} ကြိမ် ကျန်သည်",
      tutor_free_out: "ယနေ့ အခမဲ့ ရှင်းပြချက်များ ကုန်သွားပြီ — မနက်ဖြန်ပြန်လာပါ (သို့) အကန့်အသတ်မဲ့ ဖွင့်ပါ။",
      tutor_more: "အကန့်အသတ်မဲ့ tutor + နမူနာ၊ လေ့ကျင့်ခန်း ဖွင့်ရန်",
      chat_ai_premium: "@ai သည် Premium အသင်းဝင်များအတွက် ဖြစ်သည် — ⭐ Premium စာမျက်နှာကို ကြည့်ပါ",
      cert_download: "ပုံ ဒေါင်းလုဒ်",
      cert_share_fb: "📘 Facebook တွင် မျှဝေရန်",
      cert_share_chat: "📣 အတန်း chat သို့ မျှဝေရန်",
      cert_shared: "မျှဝေပြီးပါပြီ!",
      cert_chat_msg: '"{c}" သင်တန်းကို ပြီးဆုံးပြီး လက်မှတ် ရရှိပါပြီ! 🎉',
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
      review_sub: "အောင်ပြီးသော quiz မေးခွန်းများ flashcard အဖြစ် ပြန်လာမည် — မေ့ခါနီးအချိန်နှင့် တိုက်ဆိုင်အောင် ချိန်ကိုက်ထားသည်။",
      rv_stat_due: "ယနေ့ ပြန်လှန်ရန်",
      rv_stat_cards: "ကတ် စုစုပေါင်း",
      rv_stat_streak: "ရက်ဆက် streak",
      rv_empty: "သင်ခန်းစာ quiz တစ်ခုကို အောင်လိုက်သည်နှင့် ထိုမေးခွန်းများ ဤနေရာတွင် flashcard ဖြစ်လာမည် — မေ့ခါနီးအချိန်တွင် တစ်ခုချင်း ပြန်လာမည်။",
      rv_take_quiz: "နောက် quiz ကို ဖြေမည်",
      rv_done_title: "အားလုံး ပြန်လှန်ပြီးပါပြီ!",
      rv_done_sub: "နောက်ကတ် {d} တွင် ပြန်ရောက်မည်။ အလေ့အကျင့်မပျက် မနက်ဖြန် ပြန်လာပါ။",
      rv_ahead: "ကြိုတင် လေ့ကျင့်မည်",
      rv_ahead_note: "အပိုလေ့ကျင့်ခန်းသာ — အချိန်ဇယားနှင့် XP မပြောင်းပါ။",
      rv_ready: "ယနေ့ ပြန်လှန်ရန် ကတ် {n} ခု ရှိသည်။ ယခု မိနစ်အနည်းငယ်က ရေရှည်မှတ်ဉာဏ်ထဲ သိမ်းပေးမည်။",
      rv_today_count: "ယနေ့ {n} ခု ပြန်လှန်ပြီး",
      rv_start: "စတင် ပြန်လှန်မည် · ကတ် {n} ခု",
      rv_new: "အသစ်",
      rv_next: "ရှေ့ဆက်",
      rv_wrong_note: "အစိမ်းရောင် အဖြေကို လေ့လာပါ — ဤကတ် မနက်ဖြန် ပြန်လာမည်။",
      rv_finish: "ဤအကြိမ် ပြီးပါပြီ!",
      rv_streak_kept: "ယနေ့ လေ့လာမှုသည် streak ထဲ ရေတွက်ပါသည်။",
      rv_more: "နောက်ထပ် {n} ခု ပြန်လှန်မည်",
      rv_ai_title: "AI စိန်ခေါ်မှု",
      rv_ai_sub: "ပြီးဆုံးထားသော သင်ခန်းစာအားလုံးမှ AI ရေးသော မေးခွန်းအသစ်များ။",
      rv_home_due: "ပြန်လှန်ရန် ကတ် {n} ခု အသင့်ရှိသည်",
      rv_home_done: "ယနေ့ မှတ်ဉာဏ် လေ့ကျင့်ပြီးပါပြီ",
      rv_home_none: "အားလုံးပြီးပြီ — ယနေ့ ပြန်လှန်စရာ မကျန်ပါ",
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
      classroom_assign: "Google Classroom သို့ တာဝန်ပေးရန်",
      classroom_short: "Classroom",
      classroom_hint: "ဆရာများ: သင့်အတန်းသို့ တစ်ချက်နှိပ်ရုံဖြင့် တင်ပါ။",
      soon_badge: "ထပ်လာမည်",
      soon_note: "🚧 ဤသည်မှာ အစပြုသင်တန်းဖြစ်သည် — ယခု အခြေခံအချက်များပါဝင်ပြီး သင်ခန်းစာများ ထပ်ထည့်နေပါသည်။ ပြီးဆုံးအောင်လုပ်လျှင် streak, XP နှင့် လက်မှတ်အတွက် ရေတွက်ပါသည်!",
      hours_content: "နာရီ အကြောင်းအရာ",
      lessons_quizzes: "သင်ခန်းစာနှင့် မေးခွန်း",
      pace: "ကိုယ်ပိုင်နှုန်းဖြင့် သင်ယူပါ",
      saved_auto: "တိုးတက်မှုကို အလိုအလျောက်သိမ်းဆည်းသည်",

      lesson_word: "သင်ခန်းစာ",
      lesson_read_below: "သင်ခန်းစာ အပြည့်အစုံကို အောက်တွင် ဖတ်ပါ 👇",
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
      chat_report: "တိုင်ကြားရန်",
      chat_report_confirm: "ဤစာကို စောင့်ကြည့်သူများထံ တိုင်ကြားမလား?",
      chat_reported: "တိုင်ကြားပြီးပါပြီ — စောင့်ကြည့်သူက စစ်ဆေးပေးပါမည်။ ကျေးဇူးတင်ပါသည်!",
      chat_block: "ပိတ်ရန်",
      chat_block_confirm: "{n} ကို ပိတ်မလား? သူ့စာများ မမြင်ရတော့ပါ (အချိန်မရွေး ပြန်ဖွင့်နိုင်သည်)။",
      chat_blocked_n: "{n} ဦး ပိတ်ထားသည်",
      chat_ban: "Ban (အက်ဒမင်)",
      chat_ban_confirm: "{n} ကို နေရာတိုင်းတွင် စာတင်ခွင့် ပိတ်မလား? သူ့အကောင့်ကို ဆာဗာက ငြင်းပယ်ပါမည်။",
      chat_unban_confirm: "{n} သည် ပိတ်ထားပြီးသား ဖြစ်သည်။ ပြန်ဖွင့်ပေးမလား?",
      chat_banned: "{n} ကို ပိတ်လိုက်ပါပြီ",
      chat_unbanned: "{n} ကို ပြန်ဖွင့်ပေးပါပြီ",
      chat_you_banned: "သင့်အကောင့်ကို စာတင်ခွင့် ပိတ်ထားပါသည်။ မှားယွင်းသည်ဟု ထင်ပါက စောင့်ကြည့်သူကို ဆက်သွယ်ပါ။",
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
      chat_voice: "အသံ မက်ဆေ့ချ်",
      chat_recording: "အသံသွင်းနေသည်… ပို့ရန် ⏹ နှိပ်ပါ (အများဆုံး ၃၀ စက္ကန့်)",
      chat_voice_long: "အသံ ရှည်လွန်းသည် — ၃၀ စက္ကန့်အောက် ထားပါ။",
      chat_mic_unsupported: "ဤ browser တွင် အသံမက်ဆေ့ချ် မရပါ။",
      chat_mic_denied: "မိုက်ခရိုဖုန်း ခွင့်ပြုချက် ငြင်းပယ်ခံရသည်။",
      chat_new_msgs: "မက်ဆေ့ချ်အသစ်များ",
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
      /* ---- Zero to Hero (34 lessons, fully bilingual) ---- */
      "z-mindset": {
        title: "သင် ကုဒ်ရေးတတ်လာနိုင်ပါသည်",
        content: `
<h3>🎯 ကုဒ်ရေးခြင်းအကြောင်း အမှန်တရား</h3>
<p>ဘယ်သူမှ developer အဖြစ် မွေးဖွားလာခြင်း မဟုတ်ပါ။ သင်လေးစားသော သူရဲကောင်းတိုင်း ယခုသင်ရှိနေသည့်နေရာ — သုည — မှ စတင်ခဲ့ကြသည်။ ကုဒ်ရေးခြင်းသည် မှော်ပညာမဟုတ်၊ သင်္ချာပါရမီလည်း မလိုပါ — နေ့စဉ် အနည်းငယ်စီ လုပ်ရင်း တတ်လာသော <strong>လက်မှုပညာ</strong> ဖြစ်သည်။</p>
<h3>📝 ဤသင်တန်း အလုပ်လုပ်ပုံ</h3>
<ul>
  <li><strong>အဆင့် ၈ ဆင့်</strong> — တစ်ဆင့်ချင်းက နောက်တစ်ဆင့်ကို ဖွင့်ပေးသည်။ မသင်ရသေးသည့်အရာ တစ်ခုမှ မမေးပါ။</li>
  <li><strong>စစ်ဆေးမှုများ</strong> — quiz နှင့် ကုဒ်ကို အလိုအလျောက်စစ်သော လေ့ကျင့်ခန်းများက နောက်တစ်ဆင့် အသင့်ဖြစ်ကြောင်း သက်သေပြသည်။</li>
  <li><strong>ပရောဂျက်များ</strong> — အဆင့်တိုင်းတွင် တကယ်တည်ဆောက်မည်- ကိုယ်ရေးအကျဉ်းစာမျက်နှာ → စတိုင်လုပ်ထားသော portfolio → interactive app → တိုက်ရိုက်ဝဘ်ဆိုက်။</li>
  <li>တနင်္ဂနွေ ၅ နာရီထက် <strong>တစ်နေ့ မိနစ် ၂၀-၃၀</strong> က ပိုကောင်းသည်။ သင့် 🔥 streak သည် အကောင်းဆုံးမိတ်ဆွေ။</li>
</ul>
<div class="callout tip"><strong>အဆင့် ၀ တာဝန်-</strong> အသံထွက်ပြောလိုက်ပါ- "လာမည့်ရက်သတ္တပတ်အနည်းငယ်အတွင်း ကျွန်ုပ့်ကိုယ်ပိုင်ဝဘ်ဆိုက် အင်တာနက်ပေါ်ရောက်မည်။" ဒါဟာ အားပေးစကားမဟုတ် — ဒီသင်တန်းရဲ့ အဆင့် ၄ အစီအစဉ် အတိအကျပါ။</div>`,
      },
      "z-how-web": {
        title: "ဝဘ်ဆိုက်များ တကယ်အလုပ်လုပ်ပုံ",
        content: `
<h3>🎯 ၁၀ စက္ကန့်အနှစ်ချုပ်</h3>
<p>ဝဘ်ဆိုက်ဆိုသည်မှာ <strong>server</strong> ဟုခေါ်သော ကွန်ပျူတာပေါ်ရှိ <strong>ဖိုင်များ</strong> (စာသားများ!) သာဖြစ်သည်။ သင့် browser က ၎င်းတို့ကို ဒေါင်းလုဒ်လုပ်ပြီး စာမျက်နှာအဖြစ် ဆွဲပြသည်။</p>
<div class="flow">
  <div class="flow-box">🧑 သင်<br><small>လိပ်စာရိုက်ပြီး<br>Enter နှိပ်သည်</small></div>
  <div class="flow-arrow" data-label="request"></div>
  <div class="flow-box alt">🖥️ Server<br><small>ဖိုင်များကို သိမ်းထားသော<br>ကွန်ပျူတာ</small></div>
  <div class="flow-arrow" data-label="response"></div>
  <div class="flow-box warn">🎨 Browser<br><small>ဖိုင်များကိုဖတ်ပြီး<br>စာမျက်နှာ ဆွဲပြသည်</small></div>
</div>
<h3>📝 စာမျက်နှာတိုင်း၏ ဘာသာစကား ၃ မျိုး</h3>
<ul>
  <li><strong>HTML</strong> — အရိုးစု 🦴- ခေါင်းစီး၊ စာပိုဒ်၊ ပုံ၊ ခလုတ်များ။ (အဆင့် ၁)</li>
  <li><strong>CSS</strong> — အသားအရေနှင့် အဝတ်အစား 🎨- အရောင်၊ အရွယ်အစား၊ နေရာချထားမှု။ (အဆင့် ၂)</li>
  <li><strong>JavaScript</strong> — ကြွက်သားများ 💪- တုံ့ပြန်မှု၊ ယုတ္တိ၊ အသက်။ (အဆင့် ၃)</li>
</ul>
<p>ဤ academy တစ်ခုလုံးသည်လည်း ဤသုံးမျိုးဖြင့်သာ တည်ဆောက်ထားသည်။ အဆင့် ၃ ရောက်လျှင် ၎င်း၏ကုဒ်ကို ဖတ်နားလည်နိုင်မည်။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> ကွန်ပျူတာတွင် F12 နှိပ်ပြီး Elements tab ကိုကြည့်ပါ — သင်သင်ယူတော့မည့် တကယ့် HTML ကို မြင်ရမည်။ ဖုန်းသုံးနေလျှင် အဆင့် ၁ သို့ တန်းသွားလိုက်ပါ!</div>`,
      },
      "z-tools": {
        title: "သင့် အခမဲ့ကိရိယာအစုံ",
        content: `
<h3>🎯 လိုအပ်သမျှ အကုန် ၀ ကျပ်</h3>
<ul>
  <li><strong>ဤ academy ၏ 🧪 Playground</strong> — HTML/CSS/JS ရေးပြီး ရလဒ်ကို ချက်ချင်းမြင်ရသည်။ ဖုန်းတိုင်းတွင် ရသည်။ အဆင့် ၁–၃ အတွက် သင့်အဓိကကိရိယာ။</li>
  <li><strong>Browser</strong> — Chrome, Edge သို့ Firefox။ ကွန်ပျူတာတွင် <code>F12</code> = DevTools၊ developer ၏ ဓာတ်မှန်စက်။</li>
  <li><strong>VS Code</strong> (ကွန်ပျူတာရသောအခါ) — professional အားလုံးနီးပါး သုံးသော အခမဲ့ editor။</li>
  <li><strong>GitHub အကောင့်</strong> (အဆင့် ၄) — အခမဲ့ ကုဒ်သိုလှောင်ရုံ + <strong>အခမဲ့ ဝဘ်ဆိုက် hosting</strong>။ ဟုတ်ပါသည်၊ အခမဲ့!</li>
</ul>
<h3>📝 ဖုန်းဖြင့် သင်ယူသူများ — သင့်လမ်းကြောင်း တကယ်ရှိသည်</h3>
<p>အဆင့် ၀–၃ ကို ဖုန်းတစ်လုံးတည်းနှင့် Playground ဖြင့် အပြီးသင်နိုင်သည်။ အဆင့် ၄–၇ အတွက် အရင်ဖတ်ထားပြီး ကွန်ပျူတာအချိန်ရသောအခါ (ကျောင်း lab၊ အင်တာနက်ဆိုင်၊ သူငယ်ချင်းလက်ပ်တော့) လက်တွေ့လုပ်ပါ။ မြန်မာ developer အများအပြား ဤလမ်းအတိုင်း စတင်ခဲ့ကြသည်။</p>
<div class="callout tip"><strong>အဆင့် ၀ စစ်ဆေးမှု-</strong> 🧪 Playground ကိုဖွင့်ပြီး <code>Hello, hero!</code> ဟုရိုက်ကာ preview တွင် ပေါ်လာသည်ကို ကြည့်ပါ။ ပြီးပြီလား? Developer ကိရိယာကို စတင်အသုံးပြုပြီးပြီ — 🦸 ခရီးစဉ် စပါပြီ!</div>`,
      },
      "z-html1": {
        title: "HTML — Tag များသည် အရာအားလုံး",
        content: `
<h3>🎯 ဝဘ်ဆိုက်တိုင်း၏နောက်ကွယ်က ပုံစံ</h3>
<p>HTML သည် အကြောင်းအရာကို အဓိပ္ပာယ်ပေးသော <strong>tag</strong> များဖြင့် ထုပ်ပိုးသည်-</p>
<pre><code>&lt;h1&gt;My Tea Shop&lt;/h1&gt;          ← ခေါင်းစီးကြီး
&lt;p&gt;Best laphet yay in town.&lt;/p&gt; ← စာပိုဒ်</code></pre>
<div class="flow">
  <div class="flow-box">&lt;tag&gt;<br><small>အဖွင့်</small></div>
  <div class="flow-arrow" data-label="ထုပ်ပိုးသည်"></div>
  <div class="flow-box alt">အကြောင်းအရာ<br><small>သင့်စာသား</small></div>
  <div class="flow-arrow" data-label="ပိတ်သည်"></div>
  <div class="flow-box">&lt;/tag&gt;<br><small>အပိတ် (/ သတိပြုပါ)</small></div>
</div>
<h3>💻 စာမျက်နှာအပြည့်အစုံ — Playground တွင် ရိုက်ကြည့်ပါ</h3>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, I am learning HTML!&lt;/h1&gt;
    &lt;p&gt;This is my very first web page.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<h3>📝 စတင်သုံး tag အစုံ</h3>
<ul>
  <li><code>&lt;h1&gt;</code>…<code>&lt;h6&gt;</code> — ခေါင်းစီးများ၊ အကြီးမှ အသေး</li>
  <li><code>&lt;p&gt;</code> — စာပိုဒ် · <code>&lt;br&gt;</code> — စာကြောင်းသစ် (အပိတ်မလို)</li>
  <li><code>&lt;strong&gt;</code> — <strong>စာလုံးမည်း</strong> · <code>&lt;em&gt;</code> — <em>စောင်း</em></li>
</ul>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> h1 (သင့်နာမည်)၊ h2 (သင့်မြို့) နှင့် သင်အကြိုက်ဆုံးအစားအစာအကြောင်း စာပိုဒ်နှစ်ပိုဒ်ပါသော စာမျက်နှာ တည်ဆောက်ပါ။ စကားလုံးတစ်လုံးကို bold လုပ်ပါ။</div>`,
      },
      "z-html2": {
        title: "Link, ပုံနှင့် Attribute များ",
        content: `
<h3>🎯 Attribute = tag ထဲက ဆက်တင်များ</h3>
<pre><code>&lt;a href="https://google.com"&gt;Search here&lt;/a&gt;
&lt;img src="cat.jpg" alt="A sleepy cat"&gt;</code></pre>
<p><code>href</code> က link ဘယ်သွားမလဲ ပြောသည်၊ <code>src</code> က ပုံဘယ်ဖိုင်လဲ ပြောသည်၊ <code>alt</code> က ပုံမပေါ်လျှင် ပြသမည့် ဖော်ပြချက် (screen reader များလည်း ဖတ်သည်)။</p>
<h3>📝 ဝဘ်၏ စွမ်းအားထူး- link</h3>
<ul>
  <li>ပြင်ပဝဘ်ဆိုက်သို့- <code>href="https://..."</code></li>
  <li>သင့်ကိုယ်ပိုင် နောက်စာမျက်နှာသို့- <code>href="menu.html"</code></li>
  <li>Tab အသစ်ဖွင့်ရန်- <code>target="_blank"</code> ထည့်ပါ</li>
</ul>
<h3>💻 လေ့ကျင့်ရန် အခမဲ့ပုံများ</h3>
<pre><code>&lt;img src="https://picsum.photos/300/200" alt="Random photo"&gt;</code></pre>
<p>picsum.photos က ကြိုက်သည့်အရွယ် နမူနာပုံများ ပေးသည် — သင်ယူစဉ် အလွန်အသုံးဝင်သည်။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> "ကျွန်ုပ်အကြိုက်ဆုံးများ" စာမျက်နှာ — ကြိုက်သောဆိုက် ၃ ခုသို့ link နှင့် ပုံ ၂ ပုံ။ Bonus- link တစ်ခုကို tab အသစ်ဖွင့်အောင် လုပ်ပါ။</div>`,
      },
      "z-html3": {
        title: "List, ခလုတ်နှင့် Form များ",
        content: `
<h3>🎯 တကယ့်အကြောင်းအရာအတွက် ဖွဲ့စည်းပုံ</h3>
<h3>💻 List များ — menu, အဆင့်များ, feature များ</h3>
<pre><code>&lt;ul&gt;              ← အမှတ်စက်
  &lt;li&gt;Milk tea&lt;/li&gt;
  &lt;li&gt;Coffee&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;              ← နံပါတ်စဉ်
  &lt;li&gt;Boil water&lt;/li&gt;
  &lt;li&gt;Add tea&lt;/li&gt;
&lt;/ol&gt;</code></pre>
<h3>💻 ခလုတ်နှင့် input — app များ စတင်ရာ</h3>
<pre><code>&lt;input type="text" placeholder="Your name"&gt;
&lt;button&gt;Order now&lt;/button&gt;</code></pre>
<p>အခုတော့ ဘာမှမလုပ်သေးပါ — ၎င်းတို့ကို အသက်သွင်းခြင်းသည် အဆင့် ၃ ရှိ JavaScript ၏ အလုပ်ဖြစ်သည်။ သို့သော် သင်သုံးဖူးသော app တိုင်း ဤအပိုင်းအစများဖြင့် ဆောက်ထားသည်။</p>
<h3>📝 &lt;div&gt; ဖြင့် အုပ်စုဖွဲ့ခြင်း</h3>
<p><code>&lt;div&gt;</code> သည် အရာများကို အုပ်စုဖွဲ့ရန် မမြင်ရသောသေတ္တာ — card တစ်ခု၊ header တစ်ခု၊ section တစ်ခု။ အဆင့် ၂ တွင် CSS က ဤသေတ္တာများကို လှပသော layout များအဖြစ် ပြောင်းပေးမည်။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> လက်ဖက်ရည်ဆိုင် menu စာမျက်နှာ — h1 ဆိုင်နာမည်၊ သောက်စရာ ၄ မျိုးပါ ul၊ ဝယ်သူနာမည်အတွက် input နှင့် "Order" ခလုတ်။</div>`,
      },
      "z-ex-html": {
        title: "စစ်ဆေးမှု- ကိုယ်ရေးအကျဉ်း စာမျက်နှာ တည်ဆောက်ပါ",
        content: `
<h3>🦸 အဆင့် ၁ လေ့ကျင့်ခန်း</h3>
<p>သင့် HTML စွမ်းအားကို သက်သေပြပါ! အောက်ပါအားလုံးပါသော စာမျက်နှာလေး တည်ဆောက်ပါ-</p>
<ul>
  <li>သင့်နာမည်ပါ <code>&lt;h1&gt;</code></li>
  <li>ကြိုက်သောဝဘ်ဆိုက်သို့ link (<code>href</code> ပါသော <code>&lt;a&gt;</code>)</li>
  <li>ဝါသနာ <strong>၂ ခု</strong> အနည်းဆုံးပါသော <code>&lt;ul&gt;</code> list</li>
</ul>
<p><strong>▶ Run &amp; Check</strong> နှိပ်ပါ — စစ်ဆေးစက်က ဘာလိုနေသေးလဲ အတိအကျပြောမည်။ အောင်လျှင် အဆင့် ၁ တံဆိပ် အိတ်ထဲရောက်ပြီ! 🥇</p>`,
      },
      "z-quiz1": {
        title: "အဆင့် ၁ Quiz — HTML",
        questions: [
          { q: "မှန်ကန်သော ခေါင်းစီးက ဘယ်ဟာလဲ?", options: ["&lt;heading&gt;Hi&lt;/heading&gt;", "&lt;h1&gt;Hi&lt;/h1&gt;", "&lt;head&gt;Hi&lt;/head&gt;", "(h1) Hi (h1)"] },
          { q: "Link ၏ သွားမည့်နေရာကို ဘယ်မှာထည့်သလဲ?", options: ["src", "alt", "href", "link"] },
          { q: "ပုံပေါ်က alt က ဘာလုပ်သလဲ?", options: ["ပုံကို ချဲ့သည်", "ပုံမပေါ်လျှင် ဖော်ပြချက်ပြသည်", "ဘောင်ထည့်သည်", "ဘာမှမလုပ်ပါ"] },
          { q: "အမှတ်စက် list = ?", options: ["&lt;ol&gt;", "&lt;li&gt; များပါသော &lt;ul&gt;", "&lt;list&gt;", "&lt;bullets&gt;"] },
          { q: "&lt;div&gt; ကို ဘာအတွက်သုံးသလဲ?", options: ["ကိန်းစားခြင်း", "အကြောင်းအရာများကို သေတ္တာတစ်ခုအဖြစ် အုပ်စုဖွဲ့ခြင်း", "စာလုံးမည်းလုပ်ခြင်း", "ဗီဒီယိုများ"] },
        ],
      },
      "z-css1": {
        title: "CSS — Selector, အရောင်နှင့် စာသား",
        content: `
<h3>🎯 CSS တစ်ခုလုံးကို အုပ်စိုးသော ပုံစံတစ်ခု</h3>
<div class="flow">
  <div class="flow-box">ဘယ်သူ<br><small>selector-<br>h1, .card, #menu</small></div>
  <div class="flow-arrow" data-label="{"></div>
  <div class="flow-box alt">ဘာကို<br><small>property-<br>color, font-size</small></div>
  <div class="flow-arrow" data-label=":"></div>
  <div class="flow-box warn">တန်ဖိုး<br><small>purple, 20px,<br>center</small></div>
</div>
<h3>💻 စာမျက်နှာထဲ &lt;style&gt; tag ထည့်ပါ</h3>
<pre><code>&lt;style&gt;
  h1   { color: purple; }
  p    { font-size: 18px; color: #444; }
  .special { background: gold; }   /* class="special" */
&lt;/style&gt;</code></pre>
<h3>📝 ရာသက်ပန်သုံးမည့် selector ၃ မျိုး</h3>
<ul>
  <li><code>h1</code> — h1 tag အားလုံး</li>
  <li><code>.card</code> — <code>class="card"</code> ပါသမျှအားလုံး (ပြန်သုံးနိုင်သော အလုပ်သမား!)</li>
  <li><code>#menu</code> — <code>id="menu"</code> ပါသော တစ်ခုတည်းသော element</li>
</ul>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> အဆင့် ၁ ကိုယ်ရေးအကျဉ်းစာမျက်နှာကို စတိုင်လုပ်ပါ- h1 ခရမ်းရောင်၊ စာပိုဒ်များ 18px၊ ဝါသနာတစ်ခုကို <code>class="special"</code> ပေးပြီး ရွှေရောင်နောက်ခံ။</div>`,
      },
      "z-css2": {
        title: "Box Model — အရာအားလုံးသည် သေတ္တာ",
        content: `
<h3>🎯 CSS ၏ အရေးကြီးဆုံး အယူအဆ</h3>
<p>Element တိုင်းသည် အလွှာလေးလွှာပါသော လေးထောင့်သေတ္တာဖြစ်သည်-</p>
<div class="flow">
  <div class="flow-box">📄 Content<br><small>စာသား/ပုံ</small></div>
  <div class="flow-arrow" data-label="ထုပ်ပိုးသည်"></div>
  <div class="flow-box alt">🛋️ Padding<br><small>ဘောင်အတွင်းဘက်<br>နေရာလွတ်</small></div>
  <div class="flow-arrow" data-label="ပြီးလျှင်"></div>
  <div class="flow-box alt">🖼️ Border<br><small>မြင်ရသောအနား</small></div>
  <div class="flow-arrow" data-label="ပြီးလျှင်"></div>
  <div class="flow-box warn">🌌 Margin<br><small>အပြင်ဘက် နေရာလွတ် —<br>အခြားသေတ္တာများကို တွန်းသည်</small></div>
</div>
<h3>💻 သင့်ပထမဆုံး လှပသော card</h3>
<pre><code>.card {
  background: white;
  padding: 20px;              /* အတွင်း အသက်ရှူနေရာ */
  border: 1px solid #ddd;
  border-radius: 12px;        /* ထောင့်ဝိုင်း */
  margin: 16px;               /* အိမ်နီးချင်းများနှင့် အကွာ */
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
}</code></pre>
<p>ဘာကိုမဆို <code>&lt;div class="card"&gt;…&lt;/div&gt;</code> ဖြင့်ထုပ်လိုက်လျှင် ချက်ချင်း professional ကျသွားသည်။ ဤ class ပုံစံတစ်ခုတည်းက ခေတ်သစ်ဝဘ်တစ်ဝက်ကို မောင်းနှင်နေသည်။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> ဝါသနာတစ်ခုစီကို .card ဖြစ်အောင်လုပ်ပါ။ padding 10px နှင့် 30px ကွာခြားချက်ကို ခံစားကြည့်ပါ။</div>`,
      },
      "z-css3": {
        title: "Flexbox — ဘာကိုမဆို စီစဉ်ပါ",
        content: `
<h3>🎯 Layout ကိရိယာ</h3>
<p>မိဘသေတ္တာပေါ် <code>display: flex</code> တင်လိုက်လျှင် ကလေးများ တစ်တန်းတည်းစီသွားပြီး ပင်မ property နှစ်ခုဖြင့် ထိန်းချုပ်နိုင်သည်-</p>
<pre><code>.row {
  display: flex;
  justify-content: space-between;  /* ↔ ဘေးတိုက် ဖြန့်ခြင်း */
  align-items: center;             /* ↕ ဒေါင်လိုက် ချိန်ခြင်း */
  gap: 12px;                       /* ကြားအကွာအဝေး */
}</code></pre>
<h3>📝 ယခုပိုင်ဆိုင်သွားသော layout ၃ မျိုး</h3>
<ul>
  <li><strong>Navbar</strong> — logo ဘယ်၊ link များညာ- <code>justify-content: space-between</code></li>
  <li><strong>အလယ်တည့်တည့်</strong> — <code>justify-content: center; align-items: center</code> (interview ဂန္ထဝင်!)</li>
  <li><strong>Card တန်း</strong> — <code>flex-wrap: wrap</code> ထည့်လျှင် ဖန်သားပြင်ကျဉ်းတွင် နောက်တစ်ကြောင်းသို့ ကိုယ်တိုင်ဆင်းသည်</li>
</ul>
<h3>💻 Card တန်း စမ်းကြည့်ပါ</h3>
<pre><code>&lt;div class="row"&gt;
  &lt;div class="card"&gt;One&lt;/div&gt;
  &lt;div class="card"&gt;Two&lt;/div&gt;
  &lt;div class="card"&gt;Three&lt;/div&gt;
&lt;/div&gt;</code></pre>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> ဝါသနာ card များကို gap 12px + flex-wrap ဖြင့် flex တန်းစီပါ။ Preview ကို ကျဉ်း-ကျယ် ဆွဲကြည့်ပါ — တန်းပြောင်းသွားတာ ကြည့်ပါ!</div>`,
      },
      "z-css4": {
        title: "Responsive — ဆိုက်တစ်ခု၊ ဖန်သားပြင်တိုင်း",
        content: `
<h3>🎯 သင့်အသုံးပြုသူအများစုသည် ဖုန်းပေါ်မှာ</h3>
<p><strong>Media query</strong> သည် သတ်မှတ်ချက်ကိုက်မှသာ CSS ကို အသက်ဝင်စေသည်-</p>
<pre><code>/* ဖုန်းများ (ဖန်သားပြင်သေး) */
@media (max-width: 600px) {
  .row  { flex-direction: column; }  /* card များ ထပ်ဆင့်စီ */
  h1    { font-size: 24px; }         /* ခေါင်းစီး သေးအောင် */
}</code></pre>
<div class="flow">
  <div class="flow-box">💻 ဖန်သားပြင်ကျယ်<br><small>card များ တစ်တန်းတည်း</small></div>
  <div class="flow-arrow" data-label="max-width: 600px"></div>
  <div class="flow-box warn">📱 ဖုန်း<br><small>card အတူတူ —<br>ဒေါင်လိုက် ထပ်စီ</small></div>
</div>
<h3>📝 Responsive စတင်သူအစုံ</h3>
<ul>
  <li><code>&lt;head&gt;</code> ထဲ <strong>အမြဲ</strong> ထည့်ပါ- <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> — မထည့်လျှင် ဖုန်းက desktop ယောင်ဆောင်သည်။</li>
  <li>သေတ္တာကြီးများအတွက် px သေထက် <strong>%</strong> နှင့် <strong>max-width</strong> — <code>img { max-width: 100%; }</code> က ပုံကျော်ထွက်ခြင်းကို ထာဝရတားသည်။</li>
  <li>ဖုန်းအတွက် <strong>အရင်</strong> ဒီဇိုင်းဆွဲပြီး ကြီးသောဖန်သားပြင်အတွက် media query ထပ်ထည့်ပါ — ပြောင်းပြန်ထက် လွယ်သည်။</li>
</ul>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> အထက်ပါ media query ကို သင့်စာမျက်နှာထဲထည့်ပြီး preview ကျဉ်း-ကျယ် ဆွဲကြည့်ပါ — သင့်ပထမဆုံး responsive ဆိုက်! (ဖုန်းစောင်းကြည့်လျှင် ဤ academy လည်း ဒီအတိုင်း လုပ်သည်။)</div>`,
      },
      "z-quiz2": {
        title: "အဆင့် ၂ Quiz — CSS",
        questions: [
          { q: "CSS တွင် .card က ဘာကိုရွေးသလဲ?", options: ["&lt;card&gt; tag", "class=\"card\" ပါသမျှအားလုံး", "id card", "ဘာမှမရွေးပါ"] },
          { q: "Border အတွင်းဘက် နေရာလွတ်ကို ဘာခေါ်သလဲ?", options: ["margin", "padding", "gap", "spacing"] },
          { q: "Flexbox ဖြင့် အလယ်တည့်တည့်ချရန်-", options: ["text-align: middle", "justify-content: center; align-items: center", "position: center", "margin: center"] },
          { q: "@media (max-width: 600px) က ဘယ်အခါ အလုပ်လုပ်သလဲ?", options: ["600px ထက်ကျယ်လျှင်", "600px နှင့်အောက် ကျဉ်းလျှင်", "အမြဲတမ်း", "desktop တွင်သာ"] },
          { q: "img { max-width: 100%; } က ဘာကိုတားသလဲ?", options: ["ပုံဝါးခြင်း", "ဖန်သားပြင်သေးတွင် ပုံများ ဘောင်ကျော်ထွက်ခြင်း", "နှေးကွေးခြင်း", "မူပိုင်ခွင့်ပြဿနာ"] },
        ],
      },
      "z-js1": {
        title: "Variable နှင့် အမျိုးအစားများ",
        content: `
<h3>🎯 Program = ဒေတာ + ဆုံးဖြတ်ချက်</h3>
<p>JavaScript သည် ဒေတာကို <strong>variable</strong> များထဲ သိမ်းသည်-</p>
<pre><code>&lt;script&gt;
  const shopName = "Shwe Tea";   // စာသား (string) — မပြောင်းရ
  let price = 1500;              // ကိန်း — ပြောင်းနိုင်သည်
  let isOpen = true;             // true/false (boolean)

  console.log(shopName, price, isOpen);
&lt;/script&gt;</code></pre>
<h3>📝 အစပြုသူကို ကယ်တင်သော စည်းမျဉ်းများ</h3>
<ul>
  <li><code>const</code> = ပြန်မသတ်မှတ်ရ။ <code>let</code> = ရသည်။ const ဖြင့်စပြီး လိုမှသာ let သုံးပါ။</li>
  <li>String များ quote ဝတ်သည်- <code>"hello"</code>။ ကိန်းများ မဝတ်ပါ- <code>1500</code>။</li>
  <li><code>console.log(...)</code> — console သို့ ရိုက်ထုတ်ခြင်း၊ သင့် #1 debug ကိရိယာ။ Playground ၏ console panel တွင် ချက်ချင်းမြင်ရသည်။</li>
</ul>
<h3>💻 သင်္ချာက အလိုလို အလုပ်လုပ်သည်</h3>
<pre><code>let cups = 3;
let total = cups * price;        // 4500
console.log("Total: " + total + " Ks");</code></pre>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> သင့်နာမည်၊ အသက်နှင့် အကြိုက်ဆုံးကိန်းအတွက် variable သုံးခုလုပ်ပြီး + ဖြင့်ဆက်ကာ စာကြောင်းတစ်ကြောင်း log ထုတ်ပါ။</div>`,
      },
      "z-js2": {
        title: "Function နှင့် Event — အလုပ်လုပ်သော ခလုတ်များ",
        content: `
<h3>🎯 နောက်ဆုံးတော့ — ခလုတ်ကို အလုပ်လုပ်ခိုင်းမည်</h3>
<pre><code>&lt;button id="hello-btn"&gt;Say hello&lt;/button&gt;

&lt;script&gt;
  function sayHello() {
    alert("Mingalaba! 🎉");
  }

  document.getElementById("hello-btn")
          .addEventListener("click", sayHello);
&lt;/script&gt;</code></pre>
<div class="flow">
  <div class="flow-box">👆 Event<br><small>အသုံးပြုသူ<br>ခလုတ်နှိပ်သည်</small></div>
  <div class="flow-arrow" data-label="ဖြစ်စေသည်"></div>
  <div class="flow-box alt">⚙️ Function<br><small>သင့်လုပ်ငန်းစဉ်<br>ချက်ပြုတ်နည်း</small></div>
  <div class="flow-arrow" data-label="ပြောင်းသည်"></div>
  <div class="flow-box warn">🎨 စာမျက်နှာ<br><small>alert, စာသားသစ်,<br>အရောင်သစ်…</small></div>
</div>
<h3>📝 စာကြောင်းလို ဖတ်ပါ</h3>
<p>"id <em>hello-btn</em> ပါသော element ကိုရှာပြီး <em>click</em> ကြားလျှင် <em>sayHello</em> ကို run ပါ။" — ဝဘ်ပေါ်က like, menu, dark mode အားလုံး ဤပုံစံအတိုင်းပင်။</p>
<h3>💻 Function များ ပါဝင်ပစ္စည်း လက်ခံသည်</h3>
<pre><code>function greet(name) {
  alert("Hello, " + name + "!");
}
greet("Aung");   // Hello, Aung!
greet("Su");     // Hello, Su!</code></pre>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> ဆိုင်နာမည် alert ထုတ်သော ခလုတ်တစ်ခုနှင့် သူငယ်ချင်းနာမည် နှစ်မျိုးဖြင့် နှစ်ကြိမ်ခေါ်သော greet(name) function။</div>`,
      },
      "z-js3": {
        title: "DOM — စာမျက်နှာကို တိုက်ရိုက်ပြောင်းပါ",
        content: `
<h3>🎯 alert() က ကလေးအဆင့် — စာမျက်နှာကိုယ်တိုင် ပြောင်းမည်</h3>
<pre><code>&lt;h1 id="title"&gt;My Shop&lt;/h1&gt;
&lt;button id="btn"&gt;Night mode&lt;/button&gt;

&lt;script&gt;
  const title = document.getElementById("title");
  const btn = document.getElementById("btn");

  btn.addEventListener("click", () =&gt; {
    title.textContent = "My Shop 🌙";          // စာသားပြောင်း
    document.body.style.background = "#222";   // စတိုင်ပြောင်း
    document.body.style.color = "white";
  });
&lt;/script&gt;</code></pre>
<h3>📝 သင့် DOM ကိရိယာအစုံ</h3>
<ul>
  <li><code>document.getElementById("x")</code> — element ကို ဆွဲယူ</li>
  <li><code>el.textContent = "..."</code> — စာသားပြောင်း</li>
  <li><code>el.style.background = "..."</code> — စတိုင်ပြောင်း</li>
  <li><code>el.classList.toggle("dark")</code> — pro နည်း- CSS class ကို ဖွင့်/ပိတ်</li>
</ul>
<p>ဤ academy ၏ 🌙 dark-mode ခလုတ် ဘယ်လိုအလုပ်လုပ်လဲ — အခုနားလည်သွားပြီ။ တကယ်ပါ။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> mood စာမျက်နှာ- 😀 ခလုတ်က နောက်ခံဝါ + ခေါင်းစီးပျော်၊ 😴 က နောက်ခံမည်း + ခေါင်းစီးအိပ်ချင်။</div>`,
      },
      "z-js4": {
        title: "ဆုံးဖြတ်ချက်နှင့် Loop များ",
        content: `
<h3>🎯 if/else — တွေးတတ်သော program</h3>
<pre><code>let age = 15;

if (age &gt;= 18) {
  console.log("You can vote!");
} else {
  console.log("Not yet — " + (18 - age) + " years to go.");
}</code></pre>
<h3>🎯 Loop — ထပ်ခါထပ်ခါ မရေးပါနှင့်</h3>
<pre><code>const menu = ["Milk tea", "Coffee", "Juice"];

for (const drink of menu) {
  console.log("We serve: " + drink);
}</code></pre>
<h3>💻 ပေါင်းစပ်ခြင်း- order စစ်ဆေးစက်</h3>
<pre><code>const order = 3;
let total = order * 1500;

if (total &gt; 4000) {
  console.log("Big order! Free cookie 🍪");
}
console.log("Pay: " + total + " Ks");</code></pre>
<p>အခြေအနေ + loop + variable = တကယ့်စီးပွားရေး စည်းမျဉ်းများကို ရေးနိုင်ပြီ။ ဒါက programming ပဲ — ကျန်တာက ဝေါဟာရသာ။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> သူငယ်ချင်း ၄ ယောက်စာရင်းကို loop ပတ်ပြီး နာမည်စာလုံး ၄ လုံးထက်ရှည်လျှင် "VIP"၊ မဟုတ်လျှင် "Regular" ဟု log ထုတ်ပါ။</div>`,
      },
      "z-ex-js": {
        title: "စစ်ဆေးမှု- Click Counter",
        content: `
<h3>🦸 အဆင့် ၃ လေ့ကျင့်ခန်း</h3>
<p>ဂန္ထဝင် ပထမ app- <strong>click counter</strong>။ ခလုတ်တစ်ခုနှင့် ကိန်းတစ်လုံး — နှိပ်တိုင်း ဖန်သားပြင်ပေါ်က ကိန်း ၁ တိုးရမည်။</p>
<ul>
  <li>ခလုတ် (<code>id="btn"</code>) နှင့် counter (<code>id="count"</code>) ကို ထားပါ</li>
  <li>ကိန်းတိုးပြီး စာသား update လုပ်သော click listener ထည့်ပါ</li>
</ul>
<p>အရိပ်အမြွက်- <code>let clicks = 0;</code> ထားပါ → click တိုင်း <code>clicks = clicks + 1;</code> → ပြီးလျှင် <code>count.textContent = clicks;</code></p>
<p>စစ်ဆေးစက်က သင့်ခလုတ်ကို နှစ်ကြိမ်နှိပ်ပြီး <strong>2</strong> မြင်ရမယ်လို့ မျှော်လင့်သည်။ 🤖</p>`,
      },
      "z-quiz3": {
        title: "အဆင့် ၃ Quiz — JavaScript",
        questions: [
          { q: "ဘယ် variable က ပြန်သတ်မှတ်လို့ မရသလဲ?", options: ["let", "var", "const", "static"] },
          { q: "addEventListener(\"click\", fn) ၏ အဓိပ္ပာယ်-", options: ["ချက်ချင်းနှိပ်သည်", "element နှိပ်ခံရတိုင်း fn ကို run သည်", "element ကိုဖျက်သည်", "စတိုင်လုပ်သည်"] },
          { q: "Element ၏ စာသားကို ပြောင်းရန်-", options: ["el.text()", "el.textContent = \"...\"", "el.html", "el.write()"] },
          { q: "if (total > 4000) { ... } က ဘယ်အခါ run သလဲ?", options: ["အမြဲတမ်း", "total က 4000 ထက်ကြီးလျှင်", "total က 4000 နှင့်ညီလျှင်", "ဘယ်တော့မှ"] },
          { q: "for (const x of list) က ဘာလုပ်သလဲ?", options: ["list ကိုဖျက်သည်", "list ထဲက item တစ်ခုစီအတွက် block ကို တစ်ကြိမ်စီ run သည်", "list ကို စီသည်", "function ဖန်တီးသည်"] },
        ],
      },
      "z-git": {
        title: "Git — သင့်ကုဒ်အတွက် Save Point များ",
        content: `
<h3>🎯 ဂိမ်း save point လို — ပရောဂျက်များအတွက်</h3>
<p><strong>Git</strong> သည် ပရောဂျက်၏ snapshot (<strong>commit</strong>) များကို မှတ်တမ်းတင်သည်။ တစ်ခုခုပျက်သွားလား? အချိန်နောက်ပြန်သွားပါ။ အလုပ်ရှင်တိုင်း မျှော်လင့်သော #1 ကိရိယာ — အစမှာတော့ ရိုးရှင်းပါသည်-</p>
<pre><code>git init                     # ဤ folder ကို စတင်မှတ်တမ်းတင် (တစ်ကြိမ်သာ)
git add .                    # ပြောင်းလဲမှုအားလုံး ပြင်ဆင်
git commit -m "Add menu page"  # message ပါ snapshot
git log --oneline            # သမိုင်းကို ကြည့်ပါ</code></pre>
<div class="flow">
  <div class="flow-box">✍️ ဖိုင်ပြင်</div>
  <div class="flow-arrow" data-label="git add"></div>
  <div class="flow-box alt">📦 Staged<br><small>နောက် snapshot အတွက်<br>ရွေးထားပြီး</small></div>
  <div class="flow-arrow" data-label="git commit"></div>
  <div class="flow-box warn">📚 သမိုင်း<br><small>message ပါ<br>ထာဝရ save point</small></div>
</div>
<h3>📝 Commit message အလေ့အကျင့်</h3>
<p>ပြောင်းလဲမှုက <strong>ဘာလုပ်လဲ</strong> ရေးပါ- "Add order form", "Fix menu prices"။ အနာဂတ်သင်ကိုယ်တိုင် (နှင့် အဖွဲ့သားတိုင်း) က ပရောဂျက်၏ ဒိုင်ယာရီလို ဖတ်ကြသည်။</p>
<div class="callout"><strong>ဖုန်းသုံးသူလား?</strong> command များကို ဝေါဟာရလို အရင်ဖတ်ထားပါ — ပထမဆုံး ကွန်ပျူတာအချိန်တွင် ရိုက်ကြည့်လျှင် ကြောက်စရာမဟုတ်တော့ဘဲ ရင်းနှီးနေမည်။</div>
<div class="callout tip"><strong>စမ်းကြည့်ပါ (ကွန်ပျူတာ)-</strong> folder တစ်ခုလုပ်ပြီး သင့်ကိုယ်ရေးအကျဉ်းစာမျက်နှာထည့်ကာ ပထမဆုံး commit နှစ်ခု လုပ်ပါ။ ပထမဆုံး <code>git log</code> ရဲ့ ခံစားချက်က ဘာနဲ့မှ မတူပါ။</div>`,
      },
      "z-github": {
        title: "GitHub — Cloud ထဲက သင့်ကုဒ်",
        content: `
<h3>🎯 စက်ထဲ Git + အွန်လိုင်း GitHub = ဘေးကင်းမှု + မြင်နိုင်မှု</h3>
<pre><code># သင့် folder ကို GitHub repo နှင့် ချိတ်ပါ (တစ်ကြိမ်သာ)
git remote add origin https://github.com/YOU/my-site.git
git push -u origin main      # commit များ တင်ပါ

# နောက်ပိုင်း commit အသစ်တိုင်း
git push</code></pre>
<h3>📝 GitHub က သင့်အလုပ်အကိုင်အတွက် ဘာကြောင့်အရေးကြီးလဲ</h3>
<ul>
  <li><strong>Backup</strong> — လက်ပ်တော့သေလည်း ကုဒ်ရှင်သည်။</li>
  <li><strong>Portfolio</strong> — အလုပ်ရှင်များ CV မတိုင်မီ သင့် GitHub ကို ဖွင့်ကြည့်ကြသည်။ အစိမ်းရောင်ကွက်များ = တကယ်တည်ဆောက်နေကြောင်း သက်သေ။</li>
  <li><strong>ပူးပေါင်းဆောင်ရွက်မှု</strong> — pull request သည် ကမ္ဘာ့ dev အဖွဲ့တိုင်း အလုပ်လုပ်ပုံ။</li>
  <li><strong>အခမဲ့ hosting</strong> — နောက်သင်ခန်းစာတွင် repo ကို တိုက်ရိုက်ဝဘ်ဆိုက် ဖြစ်အောင်လုပ်မည်။</li>
</ul>
<h3>💡 Profile လှည့်ကွက်</h3>
<p>သင့် username အတိုင်း အမည်တူ repo ဖန်တီးပါ — ၎င်း၏ README သည် သင့် profile စာမျက်နှာ ဖြစ်လာသည်။ နာမည်၊ သင်ယူနေသောအရာနှင့် ပရောဂျက် link များ ထည့်ပါ။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> ဒီနေ့ပဲ GitHub အကောင့် ဖွင့်ပါ (အခမဲ့၊ ဖုန်းနှင့်ရသည်) — ပထမဆုံး အစိမ်းရောင်ကွက်စိုက်ရန် ဤ academy ၏ repo ကို star လုပ်ပါ။ 🌱</div>`,
      },
      "z-deploy": {
        title: "LIVE တင်ခြင်း — သင့်ဆိုက် အင်တာနက်ပေါ်",
        content: `
<h3>🎯 သူရဲကောင်း အခိုက်အတန့်</h3>
<p>GitHub Pages သည် သင့်ဝဘ်ဆိုက်ကို <code>yourname.github.io</code> တွင် အခမဲ့ host ပေးသည်။ ဤ academy ကိုယ်တိုင် ၎င်းပေါ်တွင် run နေသည်!</p>
<div class="flow">
  <div class="flow-box">📁 သင့် repo<br><small>index.html + ဖိုင်များ</small></div>
  <div class="flow-arrow" data-label="Settings → Pages"></div>
  <div class="flow-box alt">⚙️ Pages ဖွင့်ပါ<br><small>branch: main —<br>dropdown တစ်ခု၊ Save</small></div>
  <div class="flow-arrow" data-label="~၁ မိနစ်"></div>
  <div class="flow-box warn">🌍 LIVE<br><small>yourname.github.io —<br>ကမ္ဘာတစ်ဝန်း ဝင်ကြည့်နိုင်</small></div>
</div>
<h3>📝 အဆင့်အတိအကျ</h3>
<ol>
  <li>ပင်မဖိုင်နာမည် အတိအကျ <code>index.html</code> ဖြစ်သော repo ကို push လုပ်ပါ။</li>
  <li>Repo → <strong>Settings → Pages</strong> → Source: <strong>main</strong> branch → Save။</li>
  <li>~၁ မိနစ်စောင့် → သင့် URL ပေါ်လာမည်။ ဖုန်းဖြင့်ဖွင့်ပါ။ သူငယ်ချင်းကို ပို့ပါ။ ခံစားပါ။ 🥹</li>
</ol>
<h3>💡 ယခုမှစ၍</h3>
<p><code>git push</code> တိုင်း သင့် live ဆိုက် တစ်မိနစ်အတွင်း အလိုအလျောက် update ဖြစ်သည် — professional များသုံးသော deploy လုပ်ငန်းစဉ် အတိအကျ (ဤ academy လည်း တစ်နေ့ အကြိမ်များစွာ ဤအတိုင်း ship သည်)။</p>
<div class="callout tip"><strong>အဆင့် ၄ စစ်ဆေးမှု-</strong> အဆင့် ၁–၃ ကိုယ်ရေးအကျဉ်းစာမျက်နှာကို LIVE တင်ပါ။ URL ကို နေ့တိုင်းမြင်ရမည့်နေရာမှာ ကပ်ထားပါ။ သင်သည် အင်တာနက်ကို သုံးရုံမဟုတ်တော့ — အင်တာနက်ပေါ်မှာ ရှိနေပြီ။</div>`,
      },
      "z-quiz4": {
        title: "အဆင့် ၄ Quiz — Ship It",
        questions: [
          { q: "Commit ဆိုတာ…", options: ["ဖျက်လိုက်သောဖိုင်", "message ပါ ပရောဂျက် snapshot", "GitHub အကောင့်", "CSS rule"] },
          { q: "မှန်ကန်သော အစီအစဉ်-", options: ["commit → add → edit", "edit → git add → git commit", "push → edit → add", "init → push → add"] },
          { q: "git push က ဘာလုပ်သလဲ?", options: ["သမိုင်းကိုဖျက်သည်", "commit များကို GitHub သို့တင်သည်", "ဖိုင်နာမည်ပြောင်းသည်", "ဝဘ်ဆိုက်ကို run သည်"] },
          { q: "GitHub Pages က ပေးသည်မှာ…", options: ["အခကြေး server", "yourname.github.io တွင် အခမဲ့ hosting", "$50 domain", "ဘာမှမပေးပါ"] },
          { q: "Pages အလုပ်လုပ်ရန် ပင်မဖိုင်နာမည်-", options: ["home.html", "index.html", "main.html", "page.html"] },
        ],
      },
      "z-json": {
        title: "JSON — App များ ဒေတာလဲလှယ်ပုံ",
        content: `
<h3>🎯 ကမ္ဘာသုံး ဒေတာပုံစံ</h3>
<p>App များ စကားပြောသောအခါ (သင့်စာမျက်နှာ ↔ server) <strong>JSON</strong> ပို့ကြသည် — JavaScript object နှင့်တူသော စာသား-</p>
<pre><code>{
  "name": "Shwe Tea",
  "rating": 4.8,
  "open": true,
  "menu": ["Milk tea", "Coffee", "Juice"]
}</code></pre>
<h3>📝 JavaScript ဖြင့် JSON ဖတ်ခြင်း</h3>
<pre><code>const shop = {
  name: "Shwe Tea",
  menu: ["Milk tea", "Coffee"]
};

console.log(shop.name);        // Shwe Tea
console.log(shop.menu[0]);     // Milk tea (list များ 0 မှစသည်!)</code></pre>
<h3>📝 လှုပ်ရှားမှု နှစ်ခု</h3>
<ul>
  <li><strong>Dot</strong> ဖြင့် object ထဲဝင်ခြင်း- <code>shop.name</code>, <code>shop.owner.phone</code></li>
  <li><strong>Index</strong> ဖြင့် list ထဲဝင်ခြင်း- <code>menu[0]</code> = ပထမ item</li>
</ul>
<p>နောက်သင်ခန်းစာက API အဖြေတိုင်းသည် ဤအတိုင်းသာ — object နှင့် list များ ထပ်ဆင့်ထားခြင်း။ dot နှင့် index တတ်လျှင် ဘယ် API မဆို ဖတ်နိုင်သည်။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> သင့်အိပ်မက်ဆိုင်ကို ဖော်ပြသော JSON object (နာမည်၊ မြို့၊ menu ၃ ခု၊ open true/false) ဆောက်ပြီး တစ်ခုချင်း log ထုတ်ပါ။</div>`,
      },
      "z-fetch": {
        title: "fetch() — အင်တာနက်မှ တိုက်ရိုက်ဒေတာ",
        content: `
<h3>🎯 သင့်စာမျက်နှာက API ကို ခေါ်သည်</h3>
<pre><code>fetch("https://open.er-api.com/v6/latest/USD")
  .then((res) =&gt; res.json())
  .then((data) =&gt; {
    console.log("1 USD =", data.rates.MMK, "Ks");
  })
  .catch(() =&gt; console.log("Network problem — try again"));</code></pre>
<div class="flow">
  <div class="flow-box">📱 သင့်စာမျက်နှာ<br><small>fetch(url)</small></div>
  <div class="flow-arrow" data-label="request"></div>
  <div class="flow-box alt">🌐 API server<br><small>ငွေလဲနှုန်း၊ ရာသီဥတု၊<br>ဆိုရိုးစကား…</small></div>
  <div class="flow-arrow" data-label="JSON ပြန်လာ"></div>
  <div class="flow-box warn">✨ ပြသခြင်း<br><small>textContent = data…</small></div>
</div>
<h3>📝 ပုံစံကို တစ်ကြိမ်ဖတ်၊ ထာဝရသုံး</h3>
<ol>
  <li><code>fetch(url)</code> — request ပို့</li>
  <li><code>.then(res =&gt; res.json())</code> — JSON ဖြည်</li>
  <li><code>.then(data =&gt; { ... })</code> — ဒေတာကို သုံး (dot + index!)</li>
  <li><code>.catch(...)</code> — ချို့ယွင်းမှုကို ယဉ်ကျေးစွာကိုင်တွယ် (network တွေ ပျက်တတ်သည်၊ သူရဲကောင်းများ ကြိုပြင်ထားသည်)</li>
</ol>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> ငွေလဲနှုန်းကုဒ်ကို Playground တွင် run ပါ။ ပြီးလျှင် နှုန်းကို စာမျက်နှာပေါ်တင်ပါ- ခေါင်းစီးတစ်ခု၏ textContent အဖြစ် ထည့်ပါ။</div>`,
      },
      "z-app": {
        title: "ပရောဂျက်- တိုက်ရိုက်ဒေတာ Mini App",
        content: `
<h3>🦸 အဆင့် ၅ ပရောဂျက် — တကယ့် app ဆောက်မည်</h3>
<p><strong>Daily Inspiration</strong> app- ခလုတ်တစ်ချက်နှိပ်လျှင် အခမဲ့ API မှ အကြံဉာဏ်တစ်ခု ဆွဲယူပြီး လှပစွာပြသသည်။</p>
<h3>💻 App အပြည့်အစုံ (copy မကူးဘဲ ရိုက်ပါ — ၃ ဆ ပိုတတ်သည်)</h3>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
  &lt;style&gt;
    body { font-family: sans-serif; display: flex; flex-direction: column;
           align-items: center; padding: 40px 16px; background: #f4f0fa; }
    .card { background: white; padding: 24px; border-radius: 14px;
            max-width: 420px; text-align: center;
            box-shadow: 0 6px 20px rgba(0,0,0,.1); }
    button { margin-top: 16px; padding: 10px 22px; border: none;
             border-radius: 8px; background: #a435f0; color: white;
             font-size: 15px; cursor: pointer; }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class="card"&gt;
    &lt;h2&gt;✨ Daily Inspiration&lt;/h2&gt;
    &lt;p id="quote"&gt;Press the button!&lt;/p&gt;
    &lt;button id="go"&gt;Inspire me&lt;/button&gt;
  &lt;/div&gt;
  &lt;script&gt;
    const quote = document.getElementById("quote");
    document.getElementById("go").addEventListener("click", () =&gt; {
      quote.textContent = "Loading…";
      fetch("https://api.adviceslip.com/advice")
        .then((r) =&gt; r.json())
        .then((data) =&gt; { quote.textContent = "“" + data.slip.advice + "”"; })
        .catch(() =&gt; { quote.textContent = "No internet — try again!"; });
    });
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<h3>📝 ကြည့်ပါ — အဆင့်တိုင်းကို သုံးနေသည်</h3>
<p>HTML ဖွဲ့စည်းပုံ (အဆင့်၁) + card စတိုင်နှင့် viewport (အဆင့်၂) + event, DOM နှင့် fetch (အဆင့်၃+၅)။ "ကျွမ်းကျင်မှုများ ထပ်ဆင့်သည်" ဆိုတာ ဒါပါပဲ။</p>
<div class="callout tip"><strong>သူရဲကောင်းလှုပ်ရှားမှု-</strong> ဤ app ကို GitHub သို့ push ပြီး Pages ဖြင့် deploy လုပ်ပါ။ တကယ့် API ဒေတာပါသော LIVE app — portfolio ပစ္စည်း #2၊ "၃ လ bootcamp" ကျောင်းသားအများစုမှာတောင် မရှိသေးပါ။</div>`,
      },
      "z-quiz5": {
        title: "အဆင့် ၅ Quiz — ဒေတာနှင့် API",
        questions: [
          { q: "JSON ဆိုတာ…", options: ["programming ဘာသာစကား", "app များ ဒေတာလဲလှယ်ရာတွင်သုံးသော စာသားပုံစံ", "database", "browser"] },
          { q: "menu[0] က ဘာပေးသလဲ?", options: ["နောက်ဆုံး item", "ပထမဆုံး item", "item သုည", "error"] },
          { q: "fetch ပုံစံထဲက res.json() က…", options: ["request ပို့သည်", "အဖြေကို သုံးလို့ရသောဒေတာအဖြစ် ဖြည်သည်", "စာမျက်နှာဆွဲသည်", "error ဖမ်းသည်"] },
          { q: ".catch() ရှိရသည့်အကြောင်းမှာ…", options: ["အလှဆင်ရန်", "network တစ်ခါတရံပျက်တတ်ပြီး app က ယဉ်ကျေးစွာ ကိုင်တွယ်ရမည်", "JSON ကလိုအပ်သည်", "ခလုတ်များက တောင်းဆိုသည်"] },
          { q: "data.rates.MMK က ဘာဖတ်သလဲ?", options: ["list index", "rates object ထဲက MMK field", "CSS class", "git branch"] },
        ],
      },
      "z-backend": {
        title: "Server များ တကယ်ဘာလုပ်သလဲ",
        content: `
<h3>🎯 App တိုင်း၏ အခြားတစ်ဝက်</h3>
<p>သင့်စာမျက်နှာများ browser ထဲ run သည် (<strong>frontend</strong>)။ ဒါပေမဲ့ အကောင့်၊ order နှင့် chat message တွေ ဘယ်မှာနေလဲ? <strong>Backend</strong> — server ပေါ်တွင် ၂၄ နာရီ run နေသော program တစ်ခုပေါ်မှာ။</p>
<div class="flow">
  <div class="flow-box">📱 Frontend<br><small>သင့် HTML/CSS/JS —<br>မြင်ရသောအရာ</small></div>
  <div class="flow-arrow" data-label="fetch / JSON"></div>
  <div class="flow-box alt">⚙️ Backend<br><small>စည်းမျဉ်းနှင့်ယုတ္တိ-<br>"password မှန်လား?"</small></div>
  <div class="flow-arrow" data-label="ဖတ်/ရေး"></div>
  <div class="flow-box warn">🗄️ Database<br><small>ထာဝရမှတ်ဉာဏ်-<br>user, order, message</small></div>
</div>
<h3>📝 ပုံပြင်တစ်ပုဒ်၊ အလွှာသုံးလွှာ</h3>
<p>ဤ academy တွင် chat message ပို့သည်- <em>frontend</em> က သင့်စာသားကိုယူ → <em>backend</em> (Firebase) က ခွင့်ပြုပြီး မျှဝေ → <em>database</em> က သိမ်းထားသဖြင့် သင့်သူငယ်ချင်း မနက်ဖြန်လည်း မြင်ရသည်။ သင်သုံးသော app တိုင်း — အလွှာသုံးလွှာ အတူတူ။</p>
<h3>💡 အဆင့် ၆ က "လှမ်းကြည့်ခြင်း" ဖြစ်ရသည့်အကြောင်း</h3>
<p>အန္တရာယ်ရှိလောက်အောင်တတ်ရန် backend ကို ကျွမ်းကျင်စရာမလို — <strong>မြေပုံ</strong> လိုသည်။ မြေပုံရှိလျှင် Full Stack Developer သင်တန်း (သင့်နောက်တစ်ဆင့်) သည် တောအုပ်မဟုတ်ဘဲ ရင်းနှီးသောမြေ ဖြစ်နေမည်။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> နေ့စဉ်သုံး app ၂ ခုရွေးပါ။ တစ်ခုစီအတွက် frontend လုပ်တာတစ်ခု၊ backend စည်းမျဉ်းတစ်ခု၊ database မှတ်ထားတာတစ်ခု ပြောပါ။</div>`,
      },
      "z-node": {
        title: "Node နှင့် Express — ၂၀ ကြောင်း",
        content: `
<h3>🎯 Browser အပြင်ဘက်က JavaScript</h3>
<p><strong>Node.js</strong> သည် JS ကို server ပေါ် run စေသည်။ <strong>Express</strong> က API ဆောက်ခြင်းကို လွယ်ကူစေသည်။ ဤသည်မှာ တကယ်အလုပ်လုပ်သော API-</p>
<pre><code>const express = require("express");
const app = express();

const menu = ["Milk tea", "Coffee", "Juice"];

app.get("/api/menu", (req, res) =&gt; {
  res.json(menu);                    // JSON ဖြင့် ပြန်ဖြေ!
});

app.listen(3000, () =&gt; {
  console.log("API running on http://localhost:3000");
});</code></pre>
<h3>📝 အဆင့် ၅ မျက်လုံးဖြင့် ဖတ်ပါ</h3>
<p>fetch() ဖြင့် API ခေါ်ခဲ့တာ မှတ်မိလား? <strong>ဒါက အဲဒီဖုန်းခေါ်ဆိုမှုရဲ့ တစ်ဖက်ခြမ်း။</strong> တစ်ယောက်က <code>/api/menu</code> ကို fetch လုပ်လျှင် သင့်ကုဒ်က JSON ဖြင့်ဖြေသည်။ client-server လျှို့ဝှက်ချက်တစ်ခုလုံး ၁၂ ကြောင်းဖြင့် ပြေလည်သွားပြီ။</p>
<h3>💡 နေရာတိုင်း ဘာသာစကားတစ်ခုတည်း</h3>
<p>const, function, arrow နှင့် JSON ကို သိပြီးသား — <strong>အတူတူသော JavaScript</strong> က server ပေါ်မှာလည်း အလုပ်လုပ်သည်။ ဒါကြောင့် web developer များ Node ကို ချစ်ကြသည်- ဘာသာစကားတစ်ခု၊ နှစ်ဖက်စလုံး။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> Full Stack သင်တန်း အပိုင်း ၄ တွင် ဤကုဒ်အတိအကျကို တစ်ဆင့်ချင်း လက်တွေ့လုပ်သည်။ ယခုတော့- စာကြောင်းတစ်ကြောင်းစီ ဘာလုပ်လဲ အသံထွက်ရှင်းပြပါ — ရှင်းပြနိုင်လျှင် အဆင့် ၆ အောင်ပြီ။</div>`,
      },
      "z-db": {
        title: "Database — ထာဝရမှတ်ဉာဏ်",
        content: `
<h3>🎯 Variable များ မေ့သည်။ Database များ မှတ်သည်။</h3>
<p>Server ပြန်စလျှင် variable များ ပျောက်သည်။ တကယ့်ဒေတာ — အကောင့်၊ order၊ progress — သည် <strong>database</strong> ထဲနေသည်။</p>
<h3>📝 မိသားစုကြီး နှစ်ခု</h3>
<ul>
  <li><strong>SQL</strong> (MySQL, PostgreSQL, SQLite) — စည်းကမ်းရှိသော Excel လို row/column ဇယားများ။ SQL ဘာသာစကား ပြောသည်-</li>
</ul>
<pre><code>SELECT name, total FROM orders
WHERE total &gt; 4000
ORDER BY total DESC;</code></pre>
<ul>
  <li><strong>NoSQL</strong> (MongoDB, Firebase) — ပြောင်းလွယ်သော JSON ပုံစံ document များ။ ဤ academy ၏ chat နှင့် progress sync သည် Firebase — သင်တစ်ချိန်လုံး သုံးနေခဲ့သော NoSQL database!</li>
</ul>
<h3>📝 ဘယ်ဟာရွေးမလဲ (ရိုးသားသောအဖြေ)</h3>
<p>ဆက်နွယ်မှုရှိသော ဒေတာတင်းကျပ် (order ↔ customer) → SQL။ ပြောင်းလွယ်သောပုံစံ / တိုက်ရိုက် sync → NoSQL။ အလုပ်အကိုင်အများစုက <strong>နှစ်မျိုးလုံး</strong> အခြေခံလိုသည် — ဤ academy ၏ SQL နှင့် database သင်တန်းများက ပိုနက်နက်သွားသည်။</p>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> အထက်ပါ SQL ကို အင်္ဂလိပ်စာလို ဖတ်ပါ။ ပြီးလျှင် "total 2000 အောက် ဝယ်သူနာမည်များ၊ အနည်းဆုံးအရင်" query ကို စာရွက်ပေါ်ရေးပါ — SQL ကို တစ်ဝက်တတ်ပြီးသား ဖြစ်နေလိမ့်မည်။</div>`,
      },
      "z-portfolio": {
        title: "ယုံကြည်မှုရသော Portfolio",
        content: `
<h3>🎯 သင့် portfolio သည် သင့် CV ဖြစ်ပြီ</h3>
<p>ကိုယ်တိုင်သင်ယူသော developer အတွက် portfolio က စကားပြောပေးသည်။ သတင်းကောင်း- ပါဝင်ရမည့်အရာများကို ဤသင်တန်းထဲမှာ ဆောက်ပြီးသား!</p>
<h3>📝 ပရောဂျက် ၃ ခု portfolio (အကုန်ရှိပြီးသား!)</h3>
<ol>
  <li><strong>ကိုယ်ရေးအကျဉ်း/လုပ်ငန်း စာမျက်နှာ</strong> (အဆင့် ၁–၂) — အချောသတ်ပါ- ပုံအစစ်၊ responsive၊ card သန့်သန့်။</li>
  <li><strong>Interactive app</strong> (အဆင့် ၃ counter → ချဲ့ပါ- tip တွက်စက် သို့ quiz ဂိမ်း)။</li>
  <li><strong>တိုက်ရိုက်ဒေတာ app</strong> (အဆင့် ၅) — API များက အထင်ကြီးစေသည်။</li>
</ol>
<h3>📝 Interview နှစ်ဆတိုးစေသော တင်ဆက်မှုစည်းမျဉ်းများ</h3>
<ul>
  <li>အားလုံး GitHub Pages ပေါ်မှာ LIVE — link က screenshot ကို ၁၀၀-၀ နိုင်သည်။</li>
  <li>Repo တိုင်း README- ဘာလုပ်လဲ၊ screenshot၊ live link၊ ဘာသင်ခဲ့လဲ၊ ဘာပြင်ချင်လဲ။ ရေးသားချက်က <strong>တွေးခေါ်မှု</strong> ကိုပြသည် — အလုပ်ခန့်ခံရသည်မှာ တွေးခေါ်မှု။</li>
  <li>ပရောဂျက် ၃ ခုလုံး link ချိတ်ထားသော စာမျက်နှာတစ်ခု = portfolio ဆိုက် — ပရောဂျက် #4 အလကား။</li>
  <li>ရိုးသားမှုက အတုထက်သာသည်- သေးသော်လည်း စစ်မှန်သော ၃ ခု &gt; ကူးချထားသော ကြီးကြီးတစ်ခု။ Interview မေးခွန်းများကို စစ်မှန်သောအလုပ်သာ ခံနိုင်သည်။</li>
</ul>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> Inspiration app အတွက် README ကို အခုရေးပါ — ၅ ကြောင်း- ဘာလဲ၊ ဘယ်လိုလဲ၊ live link၊ အခက်ဆုံး bug၊ နောက် feature။</div>`,
      },
      "z-money": {
        title: "ပထမဝင်ငွေ — Freelance နှင့် ဒေသတွင်းအလုပ်",
        content: `
<h3>🎯 ပထမဆုံး developer ငွေရလမ်းများ</h3>
<div class="flow">
  <div class="flow-box">🏪 ဒေသဆိုင်များ<br><small>menu စာမျက်နှာ၊ order form၊<br>Facebook → တကယ့်ဝဘ်ဆိုက်</small></div>
  <div class="flow-arrow" data-label="သို့"></div>
  <div class="flow-box alt">🌏 အွန်လိုင်း freelance<br><small>Upwork / Fiverr —<br>သေးသော fixed-price အလုပ်များ</small></div>
  <div class="flow-arrow" data-label="သို့"></div>
  <div class="flow-box warn">💼 Junior အလုပ်<br><small>ဒေသတွင်း သို့ remote —<br>portfolio + GitHub က တံခါးဖွင့်သည်</small></div>
</div>
<h3>📝 ဒေသတွင်း-အရင် နည်းဗျူဟာ (မြန်မာအတွက် အထူးကောင်း)</h3>
<ol>
  <li>ကိုယ်တိုင်သိသော ဆိုင်/ဝန်ဆောင်မှု တစ်ခုရွေးပါ။ သူတို့အတွက် one-page ဆိုက် <strong>အခမဲ့</strong> ဆောက်ပေးပါ (သင့်အတွက် တကယ့်ပရောဂျက် + testimonial)။</li>
  <li>Before/after ကို မြန်မာလို Facebook တင်ပါ- "X အတွက် ဒါဆောက်ပေးခဲ့တယ် — လိုချင်လား?"</li>
  <li>နောက်တစ်ခုများ အခကြေးဖြင့်- landing page (ဒေသတွင်း ~၅သောင်း–၁.၅သိန်း Ks စ)၊ order form၊ လစဉ်ထိန်းသိမ်းခ (ထပ်ခါထပ်ခါဝင်ငွေ!)။</li>
</ol>
<h3>📝 အွန်လိုင်း freelance ရှင်သန်ရေးစည်းမျဉ်းများ</h3>
<ul>
  <li>သေးသော fixed-price အလုပ်ဖြင့်စပါ ("ဖုန်း layout ပြင်ပေးပါ") — အစပိုင်းတွင် review က ငွေထက်အရေးကြီးသည်။</li>
  <li>မြန်မြန်ဖြေ၊ ပိုပြောပြ၊ တစ်ရက်စောပြီးအပ်ပါ။ ⭐ rating များ streak လို ပွားသည်။</li>
  <li>အလုပ် ၃ ခုပြီးတိုင်း ဈေးတိုးပါ။ ထာဝရဈေးပေါက ထောင်ချောက်ဖြစ်သည်။</li>
</ul>
<div class="callout tip"><strong>စမ်းကြည့်ပါ-</strong> ဒီအပတ် ဆိုင်ရှင်တစ်ယောက်ကို ပို့မည့် message တစ်စောင် ရေးပါ — တိုတို၊ ဖော်ရွေပြီး live portfolio link ပါပါစေ။ ပို့လိုက်ခြင်းက အဆင့် ၇ ရဲ့ တကယ့်စစ်ဆေးမှု။</div>`,
      },
      "z-next": {
        title: "ဒီကနေ သင့်သူရဲကောင်းလမ်းပြမြေပုံ",
        content: `
<h3>🎉 နောက်ပြန်လှည့်ကြည့်ပါ</h3>
<p>အဆင့် ၀ တုန်းက ဖုန်းတစ်လုံးနှင့် စူးစမ်းချင်စိတ်သာ ရှိခဲ့သည်။ ယခု သင်- စာမျက်နှာဆောက်တတ် (၁)၊ responsive စတိုင်တတ် (၂)၊ program ရေးတတ် (၃)၊ version ထိန်း + <strong>DEPLOY</strong> တတ် (၄)၊ တိုက်ရိုက်ဒေတာဆွဲတတ် (၅)၊ server/database နားလည် (၆)၊ ငွေရနည်းသိ (၇)။ ဒါ "အစပြုသူ" မဟုတ်တော့ပါ — <strong>junior developer ဖြစ်လာနေပြီ</strong>။ 🦸</p>
<h3>📝 နောက် quest ရွေးပါ (အားလုံး ဤ academy ထဲမှာ)</h3>
<ul>
  <li><strong>🥞 Full Stack Developer</strong> — သဘာဝကျသော နောက်တစ်ပိုင်း- တကယ့် server, database, app အပြည့်အစုံ။</li>
  <li><strong>⚡ n8n Automation & AI Agents</strong> — ၂၀၂၆ ရဲ့ အမြန်ဆုံး freelance ဝင်ငွေ skill။</li>
  <li><strong>☁️ Cloud (အခမဲ့)</strong> → <strong>♾️ DevOps</strong> — infrastructure အလုပ်အကိုင်လမ်းကြောင်း။</li>
  <li><strong>🤖 Agentic AI Engineering</strong> — လူတိုင်းခန့်နေသောနယ်ပယ်။</li>
</ul>
<h3>📝 သင့်ကို သယ်သွားမည့် အလေ့အကျင့်များ</h3>
<ol>
  <li>🔥 Streak ဆက်ထိန်းပါ — တစ်နေ့ မိနစ် ၃၀၊ ထာဝရ။ ပုံမှန်လုပ်ခြင်းသည် ပါရမီ။</li>
  <li>🏗️ ပရောဂျက်တစ်ခု အမြဲလက်ထဲရှိပါစေ။ Tutorial က သင်ပေးသည်၊ ပရောဂျက်က ပြောင်းလဲပေးသည်။</li>
  <li>📢 လူသိအောင်ဆောက်ပါ — အပတ်စဉ် progress တင်ပါ။ အနာဂတ် client နှင့် အလုပ်ရှင်များ တိတ်တဆိတ် ကြည့်နေကြသည်။</li>
</ol>
<div class="callout tip"><strong>ဘွဲ့ယူခြင်း-</strong> အောက်က final exam အောင်ပါ၊ Zero to Hero certificate 🎓 ယူပါ၊ live portfolio link နှင့်အတူ တင်ပါ — ပြီးလျှင် အရှိန်ရှိနေချိန်မှာပဲ နောက် quest ကို ဒီနေ့ စာရင်းသွင်းပါ။</div>`,
      },
      "z-final": {
        title: "နောက်ဆုံးစာမေးပွဲ — Zero to Hero",
        questions: [
          { q: "ဝဘ်စာမျက်နှာတိုင်း၏ ဘာသာစကား ၃ မျိုးမှာ…", options: ["Python, SQL, C++", "HTML (ဖွဲ့စည်းပုံ), CSS (စတိုင်), JavaScript (လှုပ်ရှားမှု)", "Node, Express, MongoDB", "Word, Excel, PowerPoint"] },
          { q: "ဖုန်းတွင် flex card များ ဒေါင်လိုက်ထပ်စီရန်…", options: ["ပိုကြီးသော server", "@media (max-width: ...) { .row { flex-direction: column; } }", "div များ ပိုထည့်ခြင်း", "git push"] },
          { q: "အလုပ်လုပ်သောခလုတ်၏ event ပုံစံ…", options: ["style.background", "getElementById + addEventListener(\"click\", fn)", "fetch().then()", "SELECT * FROM buttons"] },
          { q: "ဆိုက်ကို အခမဲ့ live တင်နည်း…", options: ["server ဝယ်ခြင်း", "GitHub Pages (repo → Settings → Pages)", "Google ကို email ပို့ခြင်း", "USB stick"] },
          { q: "fetch ပုံစံ အစီအစဉ်…", options: ["catch → then → fetch", "fetch(url) → res.json() → ဒေတာသုံး → catch", "json → fetch → then", "add → commit → push"] },
          { q: "ထာဝရ app ဒေတာ (အကောင့်၊ order) ဘယ်မှာနေသလဲ…", options: ["let variable များ", "Database", "CSS", "URL"] },
          { q: "အားအကောင်းဆုံး ပထမ portfolio…", options: ["ကူးချထားသော ပရောဂျက်ကြီးတစ်ခု", "LIVE ဖြစ်ပြီး ရိုးသား README ပါသော ပရောဂျက်သေး ၃ ခု", "Certificate များသာ", "Logo တစ်ခု"] },
          { q: "ဤသင်တန်းပြီးနောက် အကောင်းဆုံးအလေ့အကျင့်…", options: ["စိတ်ဓာတ်တက်ချိန်စောင့်ခြင်း", "တစ်နေ့ မိနစ် ၃၀ + ပရောဂျက်တစ်ခု အမြဲလက်ထဲ", "မဆောက်ဘဲ ဖတ်ခြင်း", "သင်တန်း ၁၀ ခု တစ်ပြိုင်နက်စခြင်း"] },
        ],
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
