/* =====================================================================
   WebDev Academy — course catalog & lesson content
   All lesson HTML is pre-escaped so code samples render as text.
   ===================================================================== */

const CATEGORIES = ["All", "Fundamentals", "HTML", "CSS", "JavaScript", "Frontend", "Backend", "Programming", "Databases", "Tools", "Responsive", "Career"];

/* Small helpers to keep the data compact.
   video(): the optional 5th argument `src` attaches a real video —
   a local file ("videos/intro.mp4"), a YouTube URL, or a Vimeo URL.
   Without it, the player shows a placeholder and just the written notes. */
function video(id, title, duration, content, src) {
  return { id, title, duration, type: "video", content, src };
}
function article(id, title, duration, content) {
  return { id, title, duration, type: "article", content };
}
function quiz(id, title, questions) {
  return { id, title, duration: "Quiz", type: "quiz", questions };
}

const COURSES = [
  {
    id: "webdev-bootcamp",
    title: "The Complete Web Development Bootcamp",
    subtitle: "Go from total beginner to building real websites with HTML, CSS & JavaScript.",
    instructor: "Sara Mitchell",
    category: "JavaScript",
    level: "Beginner",
    rating: 4.8,
    ratings: 128450,
    students: 812340,
    hours: 21.5,
    price: "Free",
    free: false,
    color: "linear-gradient(135deg,#7b2ff7,#f107a3)",
    icon: "&lt;/&gt;",
    description:
      "This is the only course you need to become a web developer. You'll start with the absolute basics of how the web works, then build a strong foundation in HTML, style beautiful pages with CSS, and bring them to life with JavaScript — finishing with a portfolio project you can show off.",
    whatYouLearn: [
      "Build responsive websites from scratch with HTML5 & CSS3",
      "Understand how the web and browsers actually work",
      "Master modern layout with Flexbox and CSS Grid",
      "Write real JavaScript: variables, functions, arrays & objects",
      "Manipulate the DOM and respond to user events",
      "Ship a personal portfolio project",
    ],
    sections: [
      {
        title: "Getting Started",
        lessons: [
          article("intro-what", "What is Web Development?", "6 min", `
<p>Welcome! <strong>Web development</strong> is the craft of building things people use in a browser — from a simple personal page to apps like the one you're reading right now.</p>
<h3>The three core languages</h3>
<ul>
  <li><strong>HTML</strong> — the <em>structure</em> and content (headings, text, images, buttons).</li>
  <li><strong>CSS</strong> — the <em>presentation</em> (colors, spacing, layout, fonts).</li>
  <li><strong>JavaScript</strong> — the <em>behavior</em> (clicks, forms, animation, logic).</li>
</ul>
<p>A helpful analogy: if a web page were a house, HTML is the framing and rooms, CSS is the paint and furniture, and JavaScript is the electricity that makes things <em>do</em> something.</p>
<div class="callout tip"><strong>Front-end vs back-end:</strong> Front-end is what runs in the user's browser (the three languages above). Back-end is the server, database, and logic behind the scenes. This course focuses on the front-end — the best place to start.</div>
<p>By the end of this course you'll be able to read, write, and confidently build real web pages. Let's go!</p>`),
          article("intro-web", "How the Web Works", "8 min", `
<p>Every time you visit a site, a quick conversation happens between your <strong>browser</strong> (the client) and a <strong>server</strong>.</p>
<h3>The request/response cycle</h3>
<ol>
  <li>You type a URL like <code>https://example.com</code> and hit Enter.</li>
  <li>DNS translates the domain name into an <strong>IP address</strong> (like a phone number for the server).</li>
  <li>Your browser sends an <strong>HTTP request</strong> to that server.</li>
  <li>The server responds with files: HTML, CSS, JavaScript, images.</li>
  <li>The browser <em>renders</em> those files into the page you see.</li>
</ol>
<h3>Key vocabulary</h3>
<ul>
  <li><strong>HTTP/HTTPS</strong> — the protocol browsers and servers speak. HTTPS is the encrypted, secure version.</li>
  <li><strong>URL</strong> — the address of a resource on the web.</li>
  <li><strong>Client</strong> — the browser making requests. <strong>Server</strong> — the machine answering them.</li>
</ul>
<div class="callout">The whole cycle usually takes a fraction of a second — but understanding it makes debugging <em>much</em> easier later.</div>`),
          article("intro-setup", "Setting Up Your Tools", "7 min", `
<p>You only need two free things to start building.</p>
<h3>1. A code editor</h3>
<p><strong>Visual Studio Code</strong> is the most popular choice. It's free, fast, and has great extensions. Install the "Live Server" extension so your page auto-refreshes as you save.</p>
<h3>2. A modern browser</h3>
<p>Chrome, Edge, or Firefox all work. Get comfortable with the <strong>DevTools</strong> — right-click any page and choose <em>Inspect</em>.</p>
<h3>Your first file</h3>
<p>Create a file called <code>index.html</code> and paste this in:</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, world!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>Open it in your browser — you just built a web page. 🎉</p>
<div class="callout tip"><strong>Tip:</strong> <code>index.html</code> is the conventional name for a site's home page. Servers load it automatically.</div>`),
        ],
      },
      {
        title: "HTML Fundamentals",
        lessons: [
          video("html-structure", "HTML Document Structure", "10 min", `
<p>Every HTML page shares the same skeleton. Learn it once and you'll recognize it everywhere.</p>
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
<h3>What each part means</h3>
<ul>
  <li><code>&lt;!DOCTYPE html&gt;</code> — tells the browser to use modern HTML5.</li>
  <li><code>&lt;head&gt;</code> — metadata: title, character set, links to CSS. Not shown on the page.</li>
  <li><code>&lt;body&gt;</code> — the visible content.</li>
</ul>
<h3>Anatomy of an element</h3>
<p>An element usually has an <strong>opening tag</strong>, some <strong>content</strong>, and a <strong>closing tag</strong>:</p>
<pre><code>&lt;p&gt;This is the content&lt;/p&gt;
   ^opening         ^closing</code></pre>
<div class="callout tip">Indent nested elements. It costs nothing and makes your HTML readable at a glance.</div>`),
          video("html-text", "Text, Links & Images", "11 min", `
<h3>Headings and paragraphs</h3>
<p>Headings run from <code>&lt;h1&gt;</code> (most important) to <code>&lt;h6&gt;</code>. Use one <code>&lt;h1&gt;</code> per page.</p>
<pre><code>&lt;h1&gt;Main title&lt;/h1&gt;
&lt;h2&gt;A section&lt;/h2&gt;
&lt;p&gt;Regular body text goes in a paragraph.&lt;/p&gt;
&lt;strong&gt;Bold&lt;/strong&gt; and &lt;em&gt;italic&lt;/em&gt; add emphasis.</code></pre>
<h3>Links</h3>
<p>The anchor tag <code>&lt;a&gt;</code> uses an <code>href</code> attribute for its destination:</p>
<pre><code>&lt;a href="https://example.com"&gt;Visit Example&lt;/a&gt;
&lt;a href="about.html"&gt;About page&lt;/a&gt;
&lt;a href="#contact"&gt;Jump to a section&lt;/a&gt;</code></pre>
<h3>Images</h3>
<p>Images are <em>self-closing</em> — no closing tag. Always include <code>alt</code> text for accessibility:</p>
<pre><code>&lt;img src="cat.jpg" alt="A sleeping orange cat" width="400"&gt;</code></pre>
<div class="callout"><strong>Attributes</strong> are extra info inside the opening tag, written as <code>name="value"</code>. <code>src</code>, <code>href</code>, and <code>alt</code> are all attributes.</div>`),
          video("html-lists", "Lists, Tables & Structure", "9 min", `
<h3>Lists</h3>
<pre><code>&lt;ul&gt;                    &lt;!-- unordered (bullets) --&gt;
  &lt;li&gt;HTML&lt;/li&gt;
  &lt;li&gt;CSS&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;                    &lt;!-- ordered (numbers) --&gt;
  &lt;li&gt;Wake up&lt;/li&gt;
  &lt;li&gt;Write code&lt;/li&gt;
&lt;/ol&gt;</code></pre>
<h3>Tables</h3>
<pre><code>&lt;table&gt;
  &lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Role&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Sara&lt;/td&gt;&lt;td&gt;Instructor&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;</code></pre>
<h3>Semantic structure</h3>
<p>Modern HTML gives meaning to layout with tags like these:</p>
<pre><code>&lt;header&gt;...&lt;/header&gt;
&lt;nav&gt;...&lt;/nav&gt;
&lt;main&gt;
  &lt;section&gt;...&lt;/section&gt;
  &lt;article&gt;...&lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;...&lt;/footer&gt;</code></pre>
<div class="callout tip">Semantic tags help screen readers, SEO, and other developers understand your page. Prefer them over generic <code>&lt;div&gt;</code>s when a meaningful tag exists.</div>`),
          video("html-forms", "Forms & Inputs", "12 min", `
<p>Forms collect input from users. The basics:</p>
<pre><code>&lt;form&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input type="email" id="email" name="email" placeholder="you@site.com"&gt;

  &lt;label for="msg"&gt;Message&lt;/label&gt;
  &lt;textarea id="msg" name="message"&gt;&lt;/textarea&gt;

  &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;</code></pre>
<h3>Common input types</h3>
<ul>
  <li><code>text</code>, <code>email</code>, <code>password</code>, <code>number</code></li>
  <li><code>checkbox</code>, <code>radio</code>, <code>date</code>, <code>range</code></li>
</ul>
<div class="callout tip">Always pair an <code>&lt;input&gt;</code> with a <code>&lt;label&gt;</code> using matching <code>for</code>/<code>id</code>. Clicking the label focuses the field — and screen readers announce it correctly.</div>`),
          quiz("html-quiz", "Quiz: HTML Fundamentals", [
            {
              q: "Which tag holds the visible content of a page?",
              options: ["&lt;head&gt;", "&lt;body&gt;", "&lt;title&gt;", "&lt;meta&gt;"],
              answer: 1,
            },
            {
              q: "What attribute sets a link's destination?",
              options: ["src", "link", "href", "to"],
              answer: 2,
            },
            {
              q: "Which element creates a numbered list?",
              options: ["&lt;ul&gt;", "&lt;li&gt;", "&lt;ol&gt;", "&lt;list&gt;"],
              answer: 2,
            },
            {
              q: "Why is the alt attribute on images important?",
              options: [
                "It makes images load faster",
                "It provides text for screen readers and when images fail",
                "It's required or the page won't load",
                "It changes the image size",
              ],
              answer: 1,
            },
          ]),
        ],
      },
      {
        title: "Styling with CSS",
        lessons: [
          video("css-selectors", "Selectors & the Box Model", "12 min", `
<h3>Three ways to add CSS</h3>
<p>The best way is an external stylesheet linked in the <code>&lt;head&gt;</code>:</p>
<pre><code>&lt;link rel="stylesheet" href="styles.css"&gt;</code></pre>
<h3>Selectors</h3>
<pre><code>h1        { color: navy; }      /* by tag    */
.intro    { font-size: 18px; }  /* by class  */
#hero     { padding: 40px; }    /* by id     */
a:hover   { color: purple; }    /* on hover  */</code></pre>
<h3>The Box Model</h3>
<p>Every element is a box made of four layers, from inside out:</p>
<ul>
  <li><strong>content</strong> — the text or image</li>
  <li><strong>padding</strong> — space inside the box, around the content</li>
  <li><strong>border</strong> — the edge</li>
  <li><strong>margin</strong> — space <em>outside</em> the box, between it and neighbors</li>
</ul>
<pre><code>.card {
  padding: 16px;
  border: 1px solid #ddd;
  margin: 12px;
}</code></pre>
<div class="callout tip">Add <code>* { box-sizing: border-box; }</code> at the top of your CSS. It makes width include padding &amp; border — far more intuitive.</div>`),
          video("css-colors", "Colors, Fonts & Text", "10 min", `
<h3>Colors</h3>
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
<div class="callout">Always provide fallback fonts. If the first font isn't available, the browser tries the next. Ending with <code>sans-serif</code> or <code>serif</code> guarantees something readable.</div>`),
          video("css-flexbox", "Flexbox Layout", "14 min", `
<p><strong>Flexbox</strong> lays items out in a row or column and distributes space between them — perfect for navbars, cards, and centering.</p>
<pre><code>.navbar {
  display: flex;
  justify-content: space-between; /* horizontal spacing */
  align-items: center;            /* vertical alignment */
  gap: 16px;
}</code></pre>
<h3>The two axes</h3>
<ul>
  <li><code>justify-content</code> controls the <strong>main axis</strong> (row = horizontal).</li>
  <li><code>align-items</code> controls the <strong>cross axis</strong> (row = vertical).</li>
</ul>
<h3>Perfect centering</h3>
<pre><code>.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}</code></pre>
<div class="callout tip">The classic "center a div" problem is three lines of Flexbox. This is one of the most useful skills in all of CSS.</div>`),
          video("css-grid", "CSS Grid", "13 min", `
<p>Where Flexbox is one-dimensional, <strong>Grid</strong> handles two dimensions — rows <em>and</em> columns — making it ideal for full page layouts.</p>
<pre><code>.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 20px;
}</code></pre>
<h3>Responsive grid with one line</h3>
<pre><code>.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}</code></pre>
<p>This automatically fits as many 240px-minimum columns as will fit, then wraps — no media queries needed.</p>
<div class="callout">Reach for <strong>Flexbox</strong> for components (a row of buttons) and <strong>Grid</strong> for page-level layout (sidebar + content).</div>`),
          video("css-responsive", "Responsive Design & Media Queries", "11 min", `
<p>Responsive design means your site looks great on phones, tablets, and desktops. The key tool is the <strong>media query</strong>.</p>
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
<p>Write your base styles for small screens, then <em>add</em> complexity for larger ones with <code>min-width</code> queries. It keeps CSS simpler.</p>
<div class="callout tip">Don't forget this tag in your <code>&lt;head&gt;</code>, or mobile browsers will lie about their width:<br><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></div>`),
          quiz("css-quiz", "Quiz: CSS", [
            {
              q: "In the box model, which layer is OUTSIDE the border?",
              options: ["padding", "content", "margin", "outline"],
              answer: 2,
            },
            {
              q: "Which display value is best for a one-dimensional row of items?",
              options: ["grid", "flex", "block", "inline"],
              answer: 1,
            },
            {
              q: "How do you select all elements with class \"intro\"?",
              options: ["#intro", ".intro", "intro", "*intro"],
              answer: 1,
            },
            {
              q: "What does a media query let you do?",
              options: [
                "Play videos",
                "Apply styles based on screen size or device features",
                "Load fonts faster",
                "Add JavaScript",
              ],
              answer: 1,
            },
          ]),
        ],
      },
      {
        title: "JavaScript Programming",
        lessons: [
          video("js-vars", "Variables & Data Types", "11 min", `
<p>JavaScript makes pages interactive. Start with <strong>variables</strong> — named containers for values.</p>
<pre><code>let score = 10;        // can be reassigned
const name = "Sara";   // cannot be reassigned
let isReady = true;    // boolean</code></pre>
<p>Prefer <code>const</code> by default; use <code>let</code> only when the value will change. Avoid the old <code>var</code>.</p>
<h3>Core data types</h3>
<ul>
  <li><strong>String</strong> — text: <code>"hello"</code></li>
  <li><strong>Number</strong> — <code>42</code>, <code>3.14</code></li>
  <li><strong>Boolean</strong> — <code>true</code> / <code>false</code></li>
  <li><strong>Array</strong> — a list: <code>[1, 2, 3]</code></li>
  <li><strong>Object</strong> — key/value pairs: <code>{ name: "Sara" }</code></li>
</ul>
<pre><code>console.log("Hello, " + name); // Hello, Sara</code></pre>
<div class="callout tip"><code>console.log()</code> prints to the browser's DevTools console — your best friend for debugging.</div>`),
          video("js-functions", "Functions & Logic", "12 min", `
<h3>Functions</h3>
<p>A function packages reusable logic:</p>
<pre><code>function greet(name) {
  return "Hi, " + name + "!";
}
greet("Sara"); // "Hi, Sara!"</code></pre>
<p>The modern <strong>arrow function</strong> syntax is more concise:</p>
<pre><code>const add = (a, b) =&gt; a + b;
add(2, 3); // 5</code></pre>
<h3>Making decisions</h3>
<pre><code>const hour = 14;
if (hour &lt; 12) {
  console.log("Good morning");
} else if (hour &lt; 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}</code></pre>
<div class="callout">Functions are the building blocks of every program. If you write the same code twice, wrap it in a function.</div>`),
          video("js-arrays", "Arrays & Objects", "12 min", `
<h3>Arrays</h3>
<pre><code>const skills = ["HTML", "CSS", "JS"];
skills.length;        // 3
skills[0];            // "HTML"
skills.push("React"); // add to end</code></pre>
<h3>Looping</h3>
<pre><code>skills.forEach(skill =&gt; {
  console.log(skill);
});</code></pre>
<h3>Objects</h3>
<pre><code>const course = {
  title: "Web Dev Bootcamp",
  hours: 21.5,
  free: true
};
course.title;      // "Web Dev Bootcamp"
course["hours"];   // 21.5</code></pre>
<div class="callout tip">Arrays are ordered lists; objects are labeled bags of properties. Together they model almost any data you'll encounter.</div>`),
          video("js-dom", "DOM Manipulation", "13 min", `
<p>The <strong>DOM</strong> (Document Object Model) is JavaScript's live representation of your HTML. You can read and change it on the fly.</p>
<pre><code>// Find an element
const title = document.querySelector("h1");

// Change its text and style
title.textContent = "Updated with JavaScript!";
title.style.color = "purple";

// Create and add a new element
const p = document.createElement("p");
p.textContent = "I was added dynamically.";
document.body.appendChild(p);</code></pre>
<div class="callout"><code>querySelector</code> uses the same syntax as CSS selectors: <code>"#id"</code>, <code>".class"</code>, <code>"tag"</code>. Learn CSS selectors once, use them everywhere.</div>`),
          video("js-events", "Events & Interactivity", "12 min", `
<p>Events let your code react to the user — clicks, typing, submitting a form.</p>
<pre><code>const button = document.querySelector("#myBtn");

button.addEventListener("click", () =&gt; {
  alert("You clicked me!");
});</code></pre>
<h3>A tiny counter</h3>
<pre><code>let count = 0;
const display = document.querySelector("#count");

document.querySelector("#plus").addEventListener("click", () =&gt; {
  count++;
  display.textContent = count;
});</code></pre>
<p>That's the essence of interactivity: <em>listen for an event → update the page</em>. Everything from to-do apps to games builds on this loop.</p>
<div class="callout tip">Common events: <code>click</code>, <code>input</code>, <code>submit</code>, <code>keydown</code>, <code>mouseover</code>.</div>`),
          quiz("js-quiz", "Quiz: JavaScript", [
            {
              q: "Which keyword declares a value that should not be reassigned?",
              options: ["let", "var", "const", "def"],
              answer: 2,
            },
            {
              q: "What does document.querySelector(\".btn\") select?",
              options: [
                "The element with id \"btn\"",
                "The first element with class \"btn\"",
                "All &lt;btn&gt; tags",
                "Nothing — it's invalid",
              ],
              answer: 1,
            },
            {
              q: "How do you add an item to the end of an array?",
              options: ["array.add()", "array.push()", "array.append()", "array.end()"],
              answer: 1,
            },
            {
              q: "Which method runs code in response to a user action?",
              options: ["addEventListener", "console.log", "querySelector", "createElement"],
              answer: 0,
            },
          ]),
        ],
      },
      {
        title: "Final Project",
        lessons: [
          article("project-portfolio", "Project: Build Your Portfolio Site", "20 min", `
<p>Time to combine everything into a real, single-page <strong>portfolio</strong> you can show employers.</p>
<h3>The plan</h3>
<ol>
  <li><strong>Structure (HTML):</strong> a header with your name and nav, an "About" section, a "Projects" grid, and a contact footer.</li>
  <li><strong>Style (CSS):</strong> a color theme, Flexbox navbar, and a responsive Grid for projects.</li>
  <li><strong>Interactivity (JS):</strong> a dark-mode toggle and a "back to top" button.</li>
</ol>
<h3>Starter skeleton</h3>
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
<h3>Dark-mode toggle in JS</h3>
<pre><code>const toggle = document.querySelector("#theme");
toggle.addEventListener("click", () =&gt; {
  document.body.classList.toggle("dark");
});</code></pre>
<div class="callout tip"><strong>Challenge:</strong> once it works locally, publish it free with GitHub Pages or Netlify and put the link on your résumé. You're now a web developer. 🚀</div>
<h3>Where to go next</h3>
<ul>
  <li>Learn <strong>Git &amp; GitHub</strong> for version control.</li>
  <li>Pick a framework like <strong>React</strong> to build larger apps.</li>
  <li>Explore the <strong>Fetch API</strong> to load real data.</li>
</ul>
<p>Congratulations on finishing the bootcamp — mark this lesson complete to hit 100%! 🎓</p>`),
        ],
      },
    ],
  },

  /* ---- Web Basics: full beginner course ---- */
  {
    id: "web-basics",
    title: "Web Basics: Build Your First Website",
    subtitle: "The complete beginner course — understand how the web works and build a real page with HTML, CSS & JavaScript.",
    instructor: "Sara Mitchell",
    category: "Fundamentals",
    level: "Beginner",
    rating: 4.9,
    ratings: 64210,
    students: 402180,
    hours: 7,
    price: "Free",
    color: "linear-gradient(135deg,#ff6a00,#ee0979)",
    icon: "&#127760;",
    description:
      "Brand new to coding? Start here. This gentle, hands-on course explains how the web works and walks you step by step through building your very first website. No experience needed — by the end you'll have a real web page made with HTML, CSS, and a sprinkle of JavaScript.",
    whatYouLearn: [
      "Understand how websites and browsers work",
      "Write your first HTML page from scratch",
      "Style pages with colors, fonts, and spacing using CSS",
      "Add simple interactivity with JavaScript",
      "Use links, images, and lists correctly",
      "Build and combine everything into a finished web page",
    ],
    sections: [
      {
        title: "Welcome & How the Web Works",
        lessons: [
          article("wb-welcome", "Welcome to Web Basics", "4 min", `
<p>Welcome! 👋 If you've never written a line of code, you're in exactly the right place.</p>
<p>By the end of this short course you will have built a <strong>real web page</strong> — with a heading, styled text, an image, a list, and a button that actually does something when you click it.</p>
<h3>How to take this course</h3>
<ul>
  <li>Go in order. Each lesson builds on the last.</li>
  <li>Type the examples yourself — don't just read them. Muscle memory matters.</li>
  <li>Take the quizzes to check your understanding.</li>
  <li>Mark lessons complete as you go to track your progress.</li>
</ul>
<div class="callout tip">There's no such thing as a "dumb question" when you're learning to code. Everyone started exactly where you are now.</div>`),
          article("wb-how", "How Websites Work", "7 min", `
<p>Before we build anything, let's demystify what actually happens when you open a website.</p>
<h3>A quick conversation</h3>
<ol>
  <li>You type an address like <code>example.com</code> into your <strong>browser</strong> (Chrome, Edge, Safari…).</li>
  <li>The browser asks a <strong>server</strong> (a computer somewhere on the internet) for that page.</li>
  <li>The server sends back some files — mostly <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.</li>
  <li>Your browser reads those files and <em>draws</em> the page you see.</li>
</ol>
<h3>The key idea</h3>
<p>A website is really just a bundle of text files that your browser knows how to display. That's it! When you build a site, you're writing those text files.</p>
<div class="callout"><strong>Client &amp; server:</strong> the "client" is your browser asking for things. The "server" is the computer answering. This back-and-forth happens in a fraction of a second.</div>`),
          article("wb-frontback", "Front-End vs Back-End", "5 min", `
<p>You'll hear these two terms a lot. Here's the simple version.</p>
<h3>Front-end — what you can see</h3>
<p>Everything that appears in the browser: text, buttons, colors, layout, animations. It's built with the three languages we'll learn:</p>
<ul>
  <li><strong>HTML</strong> — structure &amp; content</li>
  <li><strong>CSS</strong> — appearance &amp; layout</li>
  <li><strong>JavaScript</strong> — interactivity</li>
</ul>
<h3>Back-end — the behind-the-scenes</h3>
<p>The server, databases, and logic you <em>don't</em> see — things like saving your account or processing a payment.</p>
<div class="callout tip">This course is 100% <strong>front-end</strong>. It's the friendliest place to start, and you get to see your results instantly.</div>`),
          article("wb-tools", "The Tools You Need", "6 min", `
<p>Good news: getting set up is free and takes five minutes.</p>
<h3>1. A code editor</h3>
<p>This is where you write code. <strong>Visual Studio Code</strong> is the most popular, free choice. Install it and add the <em>Live Server</em> extension so your page refreshes automatically when you save.</p>
<h3>2. A web browser</h3>
<p>You already have one! Chrome, Edge, or Firefox all work great.</p>
<h3>3. Create your first file</h3>
<p>Make a folder for your project, and inside it create a file named <code>index.html</code>. That's the conventional name for a website's home page.</p>
<pre><code>my-website/
  index.html   &larr; your page
  style.css    &larr; your styles (later)
  script.js    &larr; your JavaScript (later)</code></pre>
<div class="callout">To preview a page, just double-click <code>index.html</code> — it opens in your browser. Or use Live Server for auto-refresh.</div>`),
        ],
      },
      {
        title: "HTML Basics — Structure & Content",
        lessons: [
          video("wb-first-page", "Your First HTML Page", "9 min", `
<p>HTML (HyperText Markup Language) describes the <strong>structure</strong> of a page. Let's write a complete one.</p>
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
<h3>What each piece does</h3>
<ul>
  <li><code>&lt;!DOCTYPE html&gt;</code> — says "this is a modern HTML page."</li>
  <li><code>&lt;head&gt;</code> — hidden info like the page title (shown in the browser tab).</li>
  <li><code>&lt;body&gt;</code> — the visible content.</li>
</ul>
<h3>Tags come in pairs</h3>
<pre><code>&lt;p&gt;This is content&lt;/p&gt;
 ^opening tag    ^closing tag (note the /)</code></pre>
<div class="callout tip">Save this as <code>index.html</code> and open it — you just built a web page from scratch! 🎉</div>`,
          "https://www.w3schools.com/html/mov_bbb.mp4"), // demo video — swap for "videos/your-file.mp4"
          video("wb-text", "Headings, Paragraphs & Text", "8 min", `
<h3>Headings</h3>
<p>Headings range from <code>&lt;h1&gt;</code> (biggest / most important) down to <code>&lt;h6&gt;</code>. Use one <code>&lt;h1&gt;</code> per page for the main title.</p>
<pre><code>&lt;h1&gt;My Blog&lt;/h1&gt;
&lt;h2&gt;My First Post&lt;/h2&gt;
&lt;h3&gt;A subsection&lt;/h3&gt;</code></pre>
<h3>Paragraphs and emphasis</h3>
<pre><code>&lt;p&gt;This is a paragraph of text.&lt;/p&gt;
&lt;p&gt;You can make words &lt;strong&gt;bold&lt;/strong&gt;
   or &lt;em&gt;italic&lt;/em&gt; for emphasis.&lt;/p&gt;</code></pre>
<div class="callout">Headings aren't just "big text" — they give your page an outline that search engines and screen readers rely on. Use them in order.</div>`),
          video("wb-links", "Links & Navigation", "8 min", `
<p>Links are what make the web a <em>web</em>. They use the anchor tag <code>&lt;a&gt;</code> with an <code>href</code> ("hypertext reference") attribute.</p>
<pre><code>&lt;a href="https://wikipedia.org"&gt;Visit Wikipedia&lt;/a&gt;

&lt;!-- link to another page in your site --&gt;
&lt;a href="about.html"&gt;About Me&lt;/a&gt;

&lt;!-- open in a new tab --&gt;
&lt;a href="https://google.com" target="_blank"&gt;Google&lt;/a&gt;</code></pre>
<h3>What is an attribute?</h3>
<p>An <strong>attribute</strong> is extra information inside the opening tag, written as <code>name="value"</code>. Here <code>href</code> and <code>target</code> are attributes.</p>
<div class="callout tip">A link's text should describe where it goes. "Click here" is unhelpful; "Read the docs" is clear.</div>`),
          video("wb-images", "Images & Media", "7 min", `
<p>Add pictures with the <code>&lt;img&gt;</code> tag. It's <strong>self-closing</strong> — there's no <code>&lt;/img&gt;</code>.</p>
<pre><code>&lt;img src="photo.jpg" alt="A golden retriever puppy" width="400"&gt;</code></pre>
<h3>The three things to know</h3>
<ul>
  <li><code>src</code> — the image file's location (a filename or a full URL).</li>
  <li><code>alt</code> — a text description, read aloud by screen readers and shown if the image fails to load.</li>
  <li><code>width</code> / <code>height</code> — optional size in pixels.</li>
</ul>
<div class="callout"><strong>Always write good <code>alt</code> text.</strong> It makes your site usable for people who can't see the image — and it's good for SEO.</div>`),
          video("wb-lists", "Lists", "6 min", `
<p>Two everyday list types:</p>
<pre><code>&lt;!-- bulleted list --&gt;
&lt;ul&gt;
  &lt;li&gt;Milk&lt;/li&gt;
  &lt;li&gt;Eggs&lt;/li&gt;
  &lt;li&gt;Bread&lt;/li&gt;
&lt;/ul&gt;

&lt;!-- numbered list --&gt;
&lt;ol&gt;
  &lt;li&gt;Preheat the oven&lt;/li&gt;
  &lt;li&gt;Mix the batter&lt;/li&gt;
  &lt;li&gt;Bake for 20 minutes&lt;/li&gt;
&lt;/ol&gt;</code></pre>
<p><code>&lt;ul&gt;</code> = <em>unordered</em> (bullets), <code>&lt;ol&gt;</code> = <em>ordered</em> (numbers). Each item goes in an <code>&lt;li&gt;</code> ("list item").</p>
<div class="callout tip">Navigation menus are usually built as a <code>&lt;ul&gt;</code> of links — lists are everywhere once you notice them.</div>`),
          quiz("wb-html-quiz", "Quiz: HTML Basics", [
            {
              q: "Which tag holds the content you actually see on the page?",
              options: ["&lt;head&gt;", "&lt;title&gt;", "&lt;body&gt;", "&lt;meta&gt;"],
              answer: 2,
            },
            {
              q: "Which attribute tells a link where to go?",
              options: ["src", "href", "link", "goto"],
              answer: 1,
            },
            {
              q: "Which tag creates a bulleted list?",
              options: ["&lt;ol&gt;", "&lt;li&gt;", "&lt;ul&gt;", "&lt;list&gt;"],
              answer: 2,
            },
            {
              q: "What is the alt attribute on an image for?",
              options: [
                "Making the image bigger",
                "A text description for accessibility and when the image fails",
                "Adding a caption below the image",
                "It's not needed",
              ],
              answer: 1,
            },
          ]),
        ],
      },
      {
        title: "CSS Basics — Making It Look Good",
        lessons: [
          video("wb-css-add", "Adding CSS to Your Page", "8 min", `
<p>CSS (Cascading Style Sheets) controls how your page <strong>looks</strong> — colors, fonts, spacing, layout.</p>
<h3>The recommended way: a separate file</h3>
<p>Create <code>style.css</code>, then link it inside your HTML <code>&lt;head&gt;</code>:</p>
<pre><code>&lt;head&gt;
  &lt;link rel="stylesheet" href="style.css"&gt;
&lt;/head&gt;</code></pre>
<h3>How a CSS rule reads</h3>
<pre><code>h1 {
  color: navy;
  font-size: 40px;
}
/*  ^selector   ^property: value; */</code></pre>
<p>This says: "find every <code>&lt;h1&gt;</code>, make it navy and 40px."</p>
<div class="callout"><strong>Selectors</strong> pick <em>what</em> to style. Common ones: <code>h1</code> (by tag), <code>.intro</code> (by class), <code>#header</code> (by id).</p></div>`),
          video("wb-css-color", "Colors & Backgrounds", "7 min", `
<pre><code>body {
  background-color: #f4f4f4;   /* light gray page */
  color: #222;                  /* dark text */
}
.button {
  background-color: #a435f0;    /* purple */
  color: white;
}</code></pre>
<h3>Ways to write a color</h3>
<ul>
  <li><strong>Name:</strong> <code>red</code>, <code>navy</code>, <code>tomato</code></li>
  <li><strong>Hex:</strong> <code>#a435f0</code> (used most in practice)</li>
  <li><strong>RGB:</strong> <code>rgb(164, 53, 240)</code></li>
</ul>
<div class="callout tip">Try free palette tools like coolors.co to pick colors that look good together.</div>`),
          video("wb-css-text", "Text & Fonts", "7 min", `
<pre><code>body {
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;      /* space between lines */
}
h1 {
  font-weight: bold;
  text-align: center;
}</code></pre>
<h3>Font stacks</h3>
<p>List several fonts as fallbacks. The browser uses the first one it has, ending with a generic family like <code>sans-serif</code>.</p>
<div class="callout">Comfortable body text is around <code>16px</code> with a <code>line-height</code> of <code>1.5</code>–<code>1.6</code>. Cramped text is hard to read.</div>`),
          video("wb-css-box", "Spacing & the Box Model", "9 min", `
<p>Every element is a rectangular <strong>box</strong>. Understanding its layers is the key to controlling spacing.</p>
<ul>
  <li><strong>content</strong> — the text or image itself</li>
  <li><strong>padding</strong> — space <em>inside</em> the box, around the content</li>
  <li><strong>border</strong> — the edge line</li>
  <li><strong>margin</strong> — space <em>outside</em> the box, pushing other elements away</li>
</ul>
<pre><code>.card {
  padding: 20px;                 /* breathing room inside */
  border: 1px solid #ddd;        /* thin gray edge */
  margin: 16px;                  /* gap around the card */
  border-radius: 8px;            /* rounded corners */
}</code></pre>
<div class="callout tip">Add this near the top of your CSS to make sizes behave intuitively:<br><code>* { box-sizing: border-box; }</code></div>`),
          video("wb-css-flex", "Simple Layouts with Flexbox", "10 min", `
<p>To place items side by side (like a navigation bar), use <strong>Flexbox</strong>.</p>
<pre><code>.navbar {
  display: flex;
  justify-content: space-between; /* push items apart */
  align-items: center;            /* line them up vertically */
  gap: 16px;                      /* space between items */
}</code></pre>
<h3>Centering anything</h3>
<pre><code>.hero {
  display: flex;
  justify-content: center;  /* horizontal center */
  align-items: center;      /* vertical center */
  height: 300px;
}</code></pre>
<div class="callout">Flexbox is one of the most useful things in all of CSS. Just three lines can center content that used to take real effort.</div>`),
          quiz("wb-css-quiz", "Quiz: CSS Basics", [
            {
              q: "How do you link an external stylesheet?",
              options: [
                "&lt;style src=\"style.css\"&gt;",
                "&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;",
                "&lt;css href=\"style.css\"&gt;",
                "&lt;script src=\"style.css\"&gt;",
              ],
              answer: 1,
            },
            {
              q: "In the box model, which layer adds space OUTSIDE the border?",
              options: ["padding", "margin", "content", "outline"],
              answer: 1,
            },
            {
              q: "Which property lays items out in a row and lets you space them?",
              options: ["display: block", "display: flex", "text-align", "float"],
              answer: 1,
            },
            {
              q: "Which is a hex color?",
              options: ["rgb(0,0,0)", "navy", "#a435f0", "color: blue"],
              answer: 2,
            },
          ]),
        ],
      },
      {
        title: "JavaScript Basics — Adding Interactivity",
        lessons: [
          video("wb-js-add", "Adding JavaScript", "7 min", `
<p>JavaScript makes a page <strong>do things</strong> — respond to clicks, change content, react to the user.</p>
<p>Add it just before the closing <code>&lt;/body&gt;</code> tag:</p>
<pre><code>  &lt;script src="script.js"&gt;&lt;/script&gt;
&lt;/body&gt;</code></pre>
<p>In <code>script.js</code>, try:</p>
<pre><code>console.log("Hello from JavaScript!");
alert("The page is alive!");</code></pre>
<div class="callout tip">Press <strong>F12</strong> in your browser and open the <em>Console</em> tab to see <code>console.log</code> output — it's how developers check what their code is doing.</div>`),
          video("wb-js-vars", "Variables & Values", "8 min", `
<p>A <strong>variable</strong> is a named box that stores a value.</p>
<pre><code>const name = "Sara";     // text (a "string")
let age = 25;            // a number
let isLearning = true;   // true / false (a "boolean")</code></pre>
<ul>
  <li>Use <code>const</code> when the value won't change.</li>
  <li>Use <code>let</code> when it will.</li>
</ul>
<h3>Using them</h3>
<pre><code>console.log("Hi, " + name);   // Hi, Sara
age = age + 1;                // now 26</code></pre>
<div class="callout">Think of variables as labels on jars. The label (name) stays the same; you can change what's inside a <code>let</code> jar, but not a <code>const</code> one.</div>`),
          video("wb-js-click", "Responding to Clicks", "10 min", `
<p>This is where it gets fun — making a button actually do something.</p>
<h3>The HTML</h3>
<pre><code>&lt;button id="myBtn"&gt;Click me&lt;/button&gt;
&lt;p id="output"&gt;Nothing yet.&lt;/p&gt;</code></pre>
<h3>The JavaScript</h3>
<pre><code>const button = document.querySelector("#myBtn");
const output = document.querySelector("#output");

button.addEventListener("click", () =&gt; {
  output.textContent = "You clicked the button!";
});</code></pre>
<p>The pattern is always: <strong>find an element → listen for an event → change something.</strong> Every interactive site is built on this idea.</p>
<div class="callout tip"><code>querySelector</code> uses CSS-style selectors: <code>"#id"</code>, <code>".class"</code>, <code>"tag"</code>. Learn selectors once, use them in both CSS and JavaScript.</div>`),
          quiz("wb-js-quiz", "Quiz: JavaScript Basics", [
            {
              q: "Which keyword declares a value that should NOT change?",
              options: ["let", "const", "var", "value"],
              answer: 1,
            },
            {
              q: "Where should the <script> tag usually go?",
              options: [
                "In the &lt;title&gt;",
                "Just before the closing &lt;/body&gt; tag",
                "Inside every paragraph",
                "It doesn't matter at all",
              ],
              answer: 1,
            },
            {
              q: "Which method runs code when a user clicks something?",
              options: ["querySelector", "addEventListener", "console.log", "textContent"],
              answer: 1,
            },
          ]),
        ],
      },
      {
        title: "Build Your First Website",
        lessons: [
          article("wb-project", "Project: Your First Web Page", "15 min", `
<p>Let's combine everything into one small, complete page: a personal "intro card."</p>
<h3>1. The HTML (index.html)</h3>
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
<h3>2. The CSS (style.css)</h3>
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
<h3>3. The JavaScript (script.js)</h3>
<pre><code>const btn = document.querySelector("#btn");
const msg = document.querySelector("#msg");

btn.addEventListener("click", () =&gt; {
  msg.textContent = "Thanks for visiting! 🎉";
});</code></pre>
<div class="callout tip"><strong>Try it, then make it yours:</strong> change the name, colors, and list items. Add a photo with <code>&lt;img&gt;</code>. This is your page now!</div>
<h3>🎓 You did it</h3>
<p>You just built a real, interactive web page using all three core languages. Mark this lesson complete to reach 100%. Next up, dive into the <strong>Complete Web Development Bootcamp</strong> to go deeper!</p>`),
        ],
      },
    ],
  },

  /* ---- Lighter catalog courses (still with real lessons) ---- */
  {
    id: "css-mastery",
    title: "CSS Mastery: Flexbox, Grid & Animations",
    subtitle: "Level up from messy stylesheets to pixel-perfect, animated, responsive layouts.",
    instructor: "Diego Alvarez",
    category: "CSS",
    level: "Intermediate",
    rating: 4.7,
    ratings: 42310,
    students: 210500,
    hours: 14,
    price: "Free",
    free: false,
    color: "linear-gradient(135deg,#2193b0,#6dd5ed)",
    icon: "{ }",
    description:
      "Modern CSS is powerful and fun. This full course takes you from selectors and the box model through Flexbox, Grid and positioning, to variables, animation and responsive design — finishing with a polished pricing-page project.",
    whatYouLearn: [
      "Selectors, specificity and the cascade — why styles win or lose",
      "The box model and modern units (rem, %, vh)",
      "Build any layout with Flexbox and Grid",
      "Use CSS variables for maintainable themes",
      "Create smooth transitions and keyframe animations",
      "Make everything responsive with media queries",
    ],
    sections: [
      {
        title: "CSS Foundations",
        lessons: [
          article("cm-selectors", "Selectors & Specificity", "12 min", `
<h3>🎯 Intro</h3>
<p>When two rules fight over one element, <strong>specificity</strong> decides the winner. Understand it once and CSS stops feeling random.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Selectors: <code>p</code> (element) &lt; <code>.card</code> (class) &lt; <code>#header</code> (id)</li>
  <li>Combinators: <code>.card p</code> (descendant), <code>.card &gt; p</code> (direct child)</li>
  <li>States: <code>:hover :focus :first-child :not()</code></li>
  <li>Tie? The <em>later</em> rule in the file wins</li>
</ul>
<h3>💻 Example</h3>
<pre><code>p            { color: gray; }        /* 0-0-1 */
.note        { color: blue; }        /* 0-1-0 wins over p  */
#special     { color: purple; }      /* 1-0-0 wins over all */

.card:hover  { border-color: purple; }
li:first-child { font-weight: 700; }
button:not(.primary) { opacity: .8; }</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> style three paragraphs so element, class and id rules conflict — predict each winner before checking in the playground.</div>`),
          article("cm-boxmodel", "The Box Model & Units", "12 min", `
<h3>🎯 Intro</h3>
<p>Every element is a box: content + padding + border + margin. Master the box, master layout.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>box-sizing: border-box</code> — width includes padding+border (use always!)</li>
  <li>Padding = inside space; margin = outside space</li>
  <li>Units: <code>rem</code> for sizes/text, <code>%</code> for fluid widths, <code>vh/vw</code> for viewport, <code>px</code> for borders</li>
</ul>
<h3>💻 Example</h3>
<pre><code>* { box-sizing: border-box; }

.card {
  width: 100%;
  max-width: 20rem;       /* caps at 320px */
  padding: 1rem 1.5rem;   /* vertical | horizontal */
  margin: 0 auto;         /* the classic centering trick */
  border: 1px solid #ddd;
  border-radius: 10px;
}

.hero { min-height: 60vh; }  /* 60% of the screen height */</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a centered card with comfortable padding — then remove border-box and watch the width break.</div>`),
          video("cm-vars", "CSS Custom Properties (Variables)", "9 min", `
<h3>🎯 Intro</h3>
<p>Custom properties let you define reusable values — perfect for theming.</p>
<h3>💻 Example</h3>
<pre><code>:root {
  --brand: #a435f0;
  --gap: 16px;
}
.button { background: var(--brand); padding: var(--gap); }</code></pre>
<div class="callout tip">Change one variable in <code>:root</code> and it updates everywhere — the foundation of dark mode and design systems.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> define --brand and --radius variables, use them on two buttons, then change the theme by editing only :root.</div>`),
          quiz("cm-quiz", "Quiz: CSS Foundations", [
            { q: "Where are global CSS variables usually declared?", options: [":root", "body", "@media", "*"], answer: 0 },
            { q: "Which selector is the most specific?", options: ["p", ".note", "#special", "*"], answer: 2 },
            { q: "box-sizing: border-box makes width include...", options: ["Only content", "Content + padding + border", "Margin too", "Nothing new"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Layout: Flexbox, Grid & Position",
        lessons: [
          article("cm-flexbox", "Flexbox", "14 min", `
<h3>🎯 Intro</h3>
<p>Flexbox lays things out in a row or column and solves the two classic nightmares: vertical centering and equal-height columns.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Parent: <code>display: flex</code>; direction with <code>flex-direction</code></li>
  <li><code>justify-content</code> = main axis; <code>align-items</code> = cross axis</li>
  <li><code>gap</code> spaces children; <code>flex: 1</code> makes a child stretch</li>
  <li><code>flex-wrap: wrap</code> lets items flow to the next line</li>
</ul>
<h3>💻 Example</h3>
<pre><code>/* perfect centering — the interview classic */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

/* nav bar: logo left, links right */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* equal cards that wrap on small screens */
.cards { display: flex; flex-wrap: wrap; gap: 16px; }
.cards .card { flex: 1 1 240px; }</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a header with a logo, centered menu, and a right-aligned button using one flex container.</div>`),
          article("cm-grid", "CSS Grid", "14 min", `
<h3>🎯 Intro</h3>
<p>Grid is two-dimensional: rows AND columns at once. Page layouts that took hacks now take three lines.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>display: grid</code> + <code>grid-template-columns</code></li>
  <li><code>fr</code> = share of free space; <code>repeat(3, 1fr)</code> = 3 equal columns</li>
  <li>Auto-fit + minmax = responsive card grid with ZERO media queries</li>
  <li>Span areas: <code>grid-column: 1 / -1</code> (full width)</li>
</ul>
<h3>💻 Example</h3>
<pre><code>/* the magic responsive gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

/* classic page: sidebar + content */
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
}
.layout .full { grid-column: 1 / -1; }</code></pre>
<div class="callout tip">Rule of thumb: <strong>Flexbox</strong> for one direction (menus, toolbars), <strong>Grid</strong> for two (pages, galleries).</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build the auto-fit gallery with 6 colored divs, then resize the result pane and watch columns adapt.</div>`),
          article("cm-position", "Positioning & z-index", "11 min", `
<h3>🎯 Intro</h3>
<p>Sometimes elements must escape normal flow: sticky headers, badges, overlays. That's positioning.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>relative</code> — stays in flow, becomes an anchor for children</li>
  <li><code>absolute</code> — pinned to the nearest positioned ancestor</li>
  <li><code>fixed</code> — pinned to the screen; <code>sticky</code> — sticks while scrolling</li>
  <li><code>z-index</code> stacks positioned elements</li>
</ul>
<h3>💻 Example</h3>
<pre><code>/* notification badge on a bell icon */
.bell { position: relative; }
.badge {
  position: absolute;
  top: -6px; right: -6px;
  background: red; color: #fff;
  border-radius: 999px; padding: 2px 6px; font-size: 11px;
}

/* header that sticks while you scroll */
.topbar { position: sticky; top: 0; z-index: 50; }</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> put a "NEW" badge on a card's corner, and make a footer button that stays fixed bottom-right like this site's chat bubble.</div>`),
          quiz("cm-quiz-2", "Quiz: Layout", [
            { q: "Perfect centering with Flexbox uses...", options: ["text-align + margin", "justify-content + align-items", "float + clear", "position: center"], answer: 1 },
            { q: "repeat(auto-fit, minmax(220px, 1fr)) gives you...", options: ["Fixed 220px columns", "A responsive grid without media queries", "One giant column", "An error"], answer: 1 },
            { q: "A child with position:absolute is placed relative to...", options: ["The screen always", "The nearest positioned ancestor", "The body always", "Its siblings"], answer: 1 },
            { q: "Flexbox vs Grid: Grid is best for...", options: ["Single rows", "Two-dimensional layouts", "Text styling", "Animations"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Polish: Motion, Responsive & Project",
        lessons: [
          video("cm-transitions", "Transitions & Animations", "12 min", `
<h3>🎯 Intro</h3>
<p>Subtle motion makes interfaces feel alive and guides the eye.</p>
<h3>💻 Example — Transitions</h3>
<pre><code>.card {
  transition: transform .2s ease, box-shadow .2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,.15);
}</code></pre>
<h3>💻 Example — Keyframe animations</h3>
<pre><code>@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: .4; }
}
.badge { animation: pulse 1.5s infinite; }</code></pre>
<div class="callout">Subtle motion guides attention. Keep durations short (150–300ms) for UI feedback.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make a button that lifts and grows slightly on hover, and a dot that pulses forever.</div>`),
          article("cm-responsive", "Responsive Design & Media Queries", "13 min", `
<h3>🎯 Intro</h3>
<p>Most of your students browse on phones. Responsive design isn't optional — it's the default.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Always: <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code></li>
  <li>Mobile-first: base styles for phones, <code>@media (min-width: 768px)</code> adds desktop</li>
  <li>Fluid media: <code>img { max-width: 100%; height: auto; }</code></li>
  <li>Modern helpers: <code>clamp()</code> for fluid font sizes</li>
</ul>
<h3>💻 Example</h3>
<pre><code>/* mobile first: one column */
.features { display: grid; gap: 16px; }

/* tablets and up: three columns */
@media (min-width: 768px) {
  .features { grid-template-columns: repeat(3, 1fr); }
}

/* fluid heading: never too small, never too big */
h1 { font-size: clamp(1.6rem, 4vw, 3rem); }

img { max-width: 100%; height: auto; }</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a 1-column feature list that becomes 3 columns above 768px — test by resizing the playground result pane.</div>`),
          article("cm-project", "Final Project: Pricing Page", "20 min", `
<h3>🎯 Intro</h3>
<p>Everything combined: variables, Flexbox/Grid, box model, hover motion and responsiveness — a real pricing section you could ship.</p>
<h3>💻 Complete solution — study it, then build yours</h3>
<pre><code>&lt;style&gt;
:root { --brand: #a435f0; --ink: #1c1d1f; --line: #e4e8eb; }
* { box-sizing: border-box; margin: 0; }
body { font-family: sans-serif; color: var(--ink); padding: 24px; }

.plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px; max-width: 900px; margin: 0 auto;
}
.plan {
  border: 1px solid var(--line); border-radius: 14px;
  padding: 24px; text-align: center;
  transition: transform .2s ease, box-shadow .2s ease;
}
.plan:hover { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(0,0,0,.12); }
.plan.featured { border: 2px solid var(--brand); position: relative; }
.plan.featured::before {
  content: "POPULAR"; position: absolute; top: -12px; left: 50%;
  transform: translateX(-50%);
  background: var(--brand); color: #fff; font-size: 11px;
  padding: 3px 12px; border-radius: 999px;
}
.price { font-size: 2.2rem; font-weight: 800; margin: 12px 0; }
.plan ul { list-style: none; padding: 0; margin: 0 0 18px; line-height: 2; }
.btn {
  display: inline-block; width: 100%; padding: 12px;
  border-radius: 8px; border: 0; font-weight: 700; cursor: pointer;
  background: var(--brand); color: #fff;
}
&lt;/style&gt;

&lt;div class="plans"&gt;
  &lt;div class="plan"&gt;
    &lt;h3&gt;Starter&lt;/h3&gt;&lt;div class="price"&gt;Free&lt;/div&gt;
    &lt;ul&gt;&lt;li&gt;5 courses&lt;/li&gt;&lt;li&gt;Community chat&lt;/li&gt;&lt;/ul&gt;
    &lt;button class="btn"&gt;Start&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="plan featured"&gt;
    &lt;h3&gt;Pro&lt;/h3&gt;&lt;div class="price"&gt;$9&lt;/div&gt;
    &lt;ul&gt;&lt;li&gt;All courses&lt;/li&gt;&lt;li&gt;Certificates&lt;/li&gt;&lt;/ul&gt;
    &lt;button class="btn"&gt;Go Pro&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="plan"&gt;
    &lt;h3&gt;Team&lt;/h3&gt;&lt;div class="price"&gt;$29&lt;/div&gt;
    &lt;ul&gt;&lt;li&gt;10 seats&lt;/li&gt;&lt;li&gt;Progress reports&lt;/li&gt;&lt;/ul&gt;
    &lt;button class="btn"&gt;Contact&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> add a dark theme by swapping :root variables, and a monthly/yearly toggle styled with :checked.</div>`),
          quiz("cm-quiz-3", "Final Quiz: CSS Mastery", [
            { q: "Which property animates changes smoothly on hover?", options: ["animation", "transition", "transform", "keyframes"], answer: 1 },
            { q: "Mobile-first means...", options: ["Designing desktop then shrinking", "Base styles for phones, media queries add larger layouts", "Only supporting phones", "Using apps"], answer: 1 },
            { q: "clamp(1.6rem, 4vw, 3rem) sets a font size that...", options: ["Is always 4vw", "Scales but never below 1.6rem or above 3rem", "Randomizes", "Only works on desktop"], answer: 1 },
            { q: "The POPULAR ribbon used which technique?", options: ["A second image", "position:absolute on a ::before pseudo-element", "float", "Grid rows"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "html-deep-dive",
    title: "HTML Deep Dive: Semantic Markup, Forms & Tables",
    subtitle: "Write clean, accessible, professional HTML — the skeleton every great website is built on.",
    instructor: "Aung Kyaw",
    category: "HTML",
    level: "Beginner",
    rating: 4.6,
    ratings: 18240,
    students: 96400,
    hours: 4.5,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#e44d26,#f16529)",
    icon: "&lt;h1&gt;",
    description:
      "Most developers only scratch the surface of HTML. This course goes deeper: semantic elements that make your pages accessible and SEO-friendly, professional forms with built-in validation, and data tables done right. Everything is hands-on with a practice task in every lesson.",
    whatYouLearn: [
      "Structure pages with semantic elements (header, nav, main, article)",
      "Why semantics matter for accessibility and SEO",
      "Build forms with inputs, labels, and built-in validation",
      "Present data with well-structured, accessible tables",
      "Embed images, audio, and video the right way",
    ],
    sections: [
      {
        title: "Semantic HTML",
        lessons: [
          article("hd-semantic", "Semantic Elements: Beyond div", "9 min", `
<h3>🎯 Intro</h3>
<p>A page built only with <code>&lt;div&gt;</code> works — but it tells the browser <em>nothing</em> about what each part means. Semantic elements give your page structure that browsers, search engines, and screen readers understand.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>&lt;header&gt;</code> / <code>&lt;footer&gt;</code> — top and bottom of a page or section</li>
  <li><code>&lt;nav&gt;</code> — groups of navigation links</li>
  <li><code>&lt;main&gt;</code> — the unique main content (one per page)</li>
  <li><code>&lt;article&gt;</code> — self-contained content (a post, a card)</li>
  <li><code>&lt;section&gt;</code> — a themed group of content with a heading</li>
  <li><code>&lt;aside&gt;</code> — side content (related links, ads)</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;body&gt;
  &lt;header&gt;
    &lt;h1&gt;My Blog&lt;/h1&gt;
    &lt;nav&gt;
      &lt;a href="/"&gt;Home&lt;/a&gt; &lt;a href="/about"&gt;About&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
  &lt;main&gt;
    &lt;article&gt;
      &lt;h2&gt;My first post&lt;/h2&gt;
      &lt;p&gt;Hello world!&lt;/p&gt;
    &lt;/article&gt;
  &lt;/main&gt;
  &lt;footer&gt;© 2026&lt;/footer&gt;
&lt;/body&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> take any page you built with only divs and replace them with header, nav, main, article, and footer. The page should look identical — but now it has meaning.</div>`),
          article("hd-a11y", "Why Semantics Matter: Accessibility & SEO", "8 min", `
<h3>🎯 Intro</h3>
<p>Semantic HTML isn't just tidiness — it's how <strong>blind users</strong> navigate your site and how <strong>Google</strong> understands your content.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Screen readers announce landmarks: "navigation", "main", "banner" — users jump straight to what they need</li>
  <li>Search engines rank well-structured pages higher</li>
  <li>Headings (<code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code>) must form an outline — never skip levels for styling</li>
  <li>Every <code>&lt;img&gt;</code> needs an <code>alt</code> describing what it shows</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;!-- Bad: meaningless and silent for screen readers --&gt;
&lt;div class="btn" onclick="save()"&gt;Save&lt;/div&gt;

&lt;!-- Good: keyboard-focusable, announced as a button --&gt;
&lt;button onclick="save()"&gt;Save&lt;/button&gt;

&lt;img src="cat.jpg" alt="An orange cat sleeping on a laptop keyboard"&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> open your page, press <kbd>Tab</kbd> repeatedly. Can you reach every interactive element with the keyboard alone? If not, replace those divs with real buttons and links.</div>`),
          quiz("hd-quiz-1", "Quiz: Semantic HTML", [
            {
              q: "Which element should contain a page's unique main content?",
              options: ["<content>", "<main>", "<section>", "<body>"],
              answer: 1,
            },
            {
              q: "What does a screen reader use to let users jump around a page?",
              options: ["CSS classes", "Landmark elements like <nav> and <main>", "JavaScript events", "Font sizes"],
              answer: 1,
            },
            {
              q: "Which is the correct way to make a clickable 'Save' control?",
              options: ['<div onclick="save()">Save</div>', '<span class="btn">Save</span>', "<button>Save</button>", "<a>Save</a> with no href"],
              answer: 2,
            },
          ]),
        ],
      },
      {
        title: "Forms & Tables",
        lessons: [
          article("hd-forms", "Forms: Inputs, Labels & Validation", "12 min", `
<h3>🎯 Intro</h3>
<p>Forms are how users talk to your site — sign-ups, searches, checkouts. HTML gives you rich input types and validation <em>before you write any JavaScript</em>.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Every input needs a <code>&lt;label&gt;</code> — click the label, focus the input</li>
  <li>Use the right <code>type</code>: <code>email</code>, <code>number</code>, <code>date</code>, <code>password</code> — mobile keyboards adapt automatically</li>
  <li><code>required</code>, <code>min</code>, <code>max</code>, <code>pattern</code> give you free validation</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;form&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input id="email" type="email" required&gt;

  &lt;label for="age"&gt;Age&lt;/label&gt;
  &lt;input id="age" type="number" min="13" max="120"&gt;

  &lt;label for="plan"&gt;Plan&lt;/label&gt;
  &lt;select id="plan"&gt;
    &lt;option&gt;Free&lt;/option&gt;
    &lt;option&gt;Pro&lt;/option&gt;
  &lt;/select&gt;

  &lt;button type="submit"&gt;Sign up&lt;/button&gt;
&lt;/form&gt;</code></pre>
<div class="callout">Try submitting with an empty email — the browser blocks it and shows a message. Zero JavaScript needed.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a contact form with name (required), email (type email, required), a topic dropdown, and a message textarea. Test that validation fires on submit.</div>`),
          article("hd-tables", "Tables Done Right", "9 min", `
<h3>🎯 Intro</h3>
<p>Tables are for <strong>data</strong> — schedules, prices, results. Built correctly, they're readable for everyone including screen reader users.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code> — separate headings from data</li>
  <li><code>&lt;th&gt;</code> for header cells, <code>&lt;td&gt;</code> for data cells</li>
  <li><code>&lt;caption&gt;</code> — a title that describes the table</li>
  <li>Never use tables for page layout — that's CSS's job</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;table&gt;
  &lt;caption&gt;Course schedule&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;&lt;th&gt;Day&lt;/th&gt;&lt;th&gt;Topic&lt;/th&gt;&lt;th&gt;Time&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;&lt;td&gt;Mon&lt;/td&gt;&lt;td&gt;HTML&lt;/td&gt;&lt;td&gt;7 PM&lt;/td&gt;&lt;/tr&gt;
    &lt;tr&gt;&lt;td&gt;Wed&lt;/td&gt;&lt;td&gt;CSS&lt;/td&gt;&lt;td&gt;7 PM&lt;/td&gt;&lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make a weekly study timetable table with a caption, a header row, and at least three body rows.</div>`),
          article("hd-media", "Images, Audio & Video", "8 min", `
<h3>🎯 Intro</h3>
<p>Media makes pages come alive — but done wrong it's slow and inaccessible. Here's the professional way.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>&lt;img&gt;</code> always with <code>alt</code>; add <code>loading="lazy"</code> for images below the fold</li>
  <li><code>&lt;video controls&gt;</code> / <code>&lt;audio controls&gt;</code> for local media files</li>
  <li><code>&lt;figure&gt;</code> + <code>&lt;figcaption&gt;</code> pair media with a caption</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;figure&gt;
  &lt;img src="sunset.jpg" alt="Sunset over Inle Lake" loading="lazy"&gt;
  &lt;figcaption&gt;Inle Lake at dusk, Myanmar&lt;/figcaption&gt;
&lt;/figure&gt;

&lt;video controls width="640"&gt;
  &lt;source src="lesson.mp4" type="video/mp4"&gt;
  Sorry, your browser doesn't support video.
&lt;/video&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a figure with caption and a lazy-loaded image to your practice page, then check the Network tab to see it load only when scrolled into view.</div>`),
          quiz("hd-quiz-2", "Quiz: Forms, Tables & Media", [
            {
              q: "How do you connect a label to its input?",
              options: ["Put them on the same line", 'label\'s "for" matches the input\'s "id"', "Give both the same class", "Wrap the input in a div"],
              answer: 1,
            },
            {
              q: "Which attribute makes a field mandatory with no JavaScript?",
              options: ["validate", "mandatory", "required", "must"],
              answer: 2,
            },
            {
              q: "Header cells in a table use which element?",
              options: ["<td>", "<header>", "<th>", "<thead-cell>"],
              answer: 2,
            },
            {
              q: "What should every <img> include for accessibility?",
              options: ["title attribute", "alt attribute", "name attribute", "label attribute"],
              answer: 1,
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "js-essentials",
    title: "JavaScript Essentials for Beginners",
    subtitle: "The friendly, hands-on path to writing your first real JavaScript.",
    instructor: "Priya Nair",
    category: "JavaScript",
    level: "Beginner",
    rating: 4.6,
    ratings: 58720,
    students: 331200,
    hours: 12,
    price: "Free",
    color: "linear-gradient(135deg,#f7971e,#ffd200)",
    icon: "JS",
    description:
      "No prior programming experience needed. Learn variables, functions, loops, and how to make web pages interactive — one small, practical step at a time.",
    whatYouLearn: [
      "Write and debug JavaScript with confidence",
      "Use loops and conditionals to control flow",
      "Manipulate the page with the DOM",
      "Build a small interactive project",
    ],
    sections: [
      {
        title: "First Steps",
        lessons: [
          video("je-hello", "Your First Script", "8 min", `
<h3>🎯 Intro</h3>
<p>JavaScript is the only language browsers run natively — one script tag and your page comes alive.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Load scripts just before <code>&lt;/body&gt;</code> so the HTML exists first</li>
  <li><code>console.log()</code> is your best friend for seeing what's happening</li>
  <li>DevTools (F12) → Console shows logs and errors</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;script src="app.js"&gt;&lt;/script&gt;</code></pre>
<p>In <code>app.js</code>:</p>
<pre><code>console.log("Hello from JavaScript!");
alert("The page is alive!");</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> log your name, the current year, and 7 * 6 to the console — then find all three in DevTools.</div>`),
          article("je-variables", "Variables & Types", "11 min", `
<h3>🎯 Intro</h3>
<p>Variables are named boxes for values. Modern JavaScript gives you two: <code>const</code> and <code>let</code>.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>const</code> — can't be reassigned (use it by default)</li>
  <li><code>let</code> — can change (counters, accumulating values)</li>
  <li>Core types: string, number, boolean, undefined, null</li>
  <li>Template literals: <code>\`Hello \${name}\`</code> embed values in text</li>
</ul>
<h3>💻 Example</h3>
<pre><code>const name = "Aye";
let lessonsDone = 3;
lessonsDone = lessonsDone + 1;

const isEnrolled = true;
const price = 0;

console.log(\`\${name} finished \${lessonsDone} lessons\`);
console.log(typeof name, typeof price, typeof isEnrolled);
// string number boolean</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create const course and let progress (0–100), increase progress twice, and log a template-literal sentence with both.</div>`),
          article("je-conditions", "Comparisons & if/else", "11 min", `
<h3>🎯 Intro</h3>
<p>Programs choose. Comparisons produce true/false, and <code>if</code> acts on them.</p>
<h3>📝 Summary</h3>
<ul>
  <li>ALWAYS use <code>===</code> and <code>!==</code> (strict — no type surprises)</li>
  <li>Combine with <code>&amp;&amp;</code> (and), <code>||</code> (or), <code>!</code> (not)</li>
  <li>Ternary for tiny choices: <code>cond ? a : b</code></li>
</ul>
<h3>💻 Example</h3>
<pre><code>const score = 72;

if (score &gt;= 80) {
  console.log("Grade A 🏆");
} else if (score &gt;= 60) {
  console.log("Grade B — pass!");
} else {
  console.log("Keep practicing");
}

const label = score &gt;= 60 ? "PASS" : "RETRY";
console.log(\`Result: \${label}\`);

// why === matters:
console.log(5 == "5");    // true  (loose — avoid!)
console.log(5 === "5");   // false (strict — correct)</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write age checks that print "child" / "teen" / "adult", then convert one of them into a ternary.</div>`),
          quiz("je-quiz", "Quiz: JS Basics", [
            { q: "What prints text to the developer console?", options: ["print()", "console.log()", "echo()", "log.console()"], answer: 1 },
            { q: "Which declares a variable that can't be reassigned?", options: ["let", "var", "const", "static"], answer: 2 },
            { q: "5 === \"5\" evaluates to...", options: ["true", "false", "\"5\"", "an error"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Loops, Arrays & Functions",
        lessons: [
          video("je-loops", "Loops", "10 min", `
<h3>🎯 Intro</h3>
<p>Loops repeat work without copy-paste.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>for (let i = 0; i &lt; n; i++)</code> — counting loop</li>
  <li><code>for (const item of array)</code> — walk arrays cleanly</li>
  <li><code>while (condition)</code> — repeat until something changes</li>
</ul>
<h3>💻 Example</h3>
<pre><code>for (let i = 1; i &lt;= 5; i++) {
  console.log("Line " + i);
}

const fruits = ["apple", "pear", "kiwi"];
for (const fruit of fruits) {
  console.log(fruit);
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> print the 7-times table from 7×1 to 7×10 with a counting loop.</div>`),
          article("je-arrays", "Arrays & Their Methods", "13 min", `
<h3>🎯 Intro</h3>
<p>Arrays hold ordered lists — and their built-in methods do in one line what loops do in five.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>.push() .pop()</code> add/remove at the end; <code>.length</code>, <code>[0]</code>, <code>.includes()</code></li>
  <li><code>.map()</code> transforms every item into a new array</li>
  <li><code>.filter()</code> keeps items that pass a test</li>
  <li><code>.reduce()</code> boils a list down to one value</li>
</ul>
<h3>💻 Example</h3>
<pre><code>const scores = [75, 92, 58, 88];

const doubled = scores.map(s =&gt; s * 2);
const passing = scores.filter(s =&gt; s &gt;= 60);
const total   = scores.reduce((sum, s) =&gt; sum + s, 0);

console.log(doubled);              // [150, 184, 116, 176]
console.log(passing);              // [75, 92, 88]
console.log(total / scores.length); // 78.25</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> from an array of prices, make a new array with 10% discount applied, then filter to only items under 5000, and sum them.</div>`),
          article("je-functions", "Functions & Arrow Syntax", "13 min", `
<h3>🎯 Intro</h3>
<p>Functions are reusable machines: input → work → output. Modern JS writes them two ways.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Classic: <code>function add(a, b) { return a + b; }</code></li>
  <li>Arrow: <code>const add = (a, b) =&gt; a + b;</code></li>
  <li>Default parameters: <code>(name = "friend")</code></li>
  <li>Small, single-purpose functions = readable programs</li>
</ul>
<h3>💻 Example</h3>
<pre><code>function grade(score) {
  if (score &gt;= 80) return "A";
  if (score &gt;= 60) return "B";
  return "C";
}

const greet = (name = "friend") =&gt; \`Hello, \${name}!\`;
const kyatToUsd = (amount, rate = 4400) =&gt; (amount / rate).toFixed(2);

console.log(grade(85));            // A
console.log(greet());              // Hello, friend!
console.log(kyatToUsd(100000));    // 22.73</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write isEven(n), an arrow function celsiusToF(c), and a describe(name, age) using both in a template literal.</div>`),
          article("je-objects", "Objects", "12 min", `
<h3>🎯 Intro</h3>
<p>Objects group related data under names — the shape of every API response you'll ever meet.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Create: <code>{ title: "JS", hours: 12 }</code>; read: <code>c.title</code> or <code>c["title"]</code></li>
  <li>Destructure: <code>const { title, hours } = course</code></li>
  <li>Arrays of objects = your data model</li>
</ul>
<h3>💻 Example</h3>
<pre><code>const course = { title: "JS Essentials", hours: 12, free: true };
const { title, hours } = course;
console.log(\`\${title} — \${hours}h\`);

const students = [
  { name: "Aye", score: 85 },
  { name: "Ko",  score: 55 },
];
const names = students.map(s =&gt; s.name);
const best = students.reduce((a, b) =&gt; a.score &gt; b.score ? a : b);
console.log(names, best.name);   // ["Aye","Ko"] "Aye"</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> model 3 phones as objects (name, price, inStock); print only in-stock names with filter + map.</div>`),
          quiz("je-quiz-2", "Quiz: Data & Functions", [
            { q: "Which method keeps only items passing a test?", options: [".map()", ".filter()", ".push()", ".join()"], answer: 1 },
            { q: "const f = (x) => x * 2 is...", options: ["A syntax error", "An arrow function", "An object", "A loop"], answer: 1 },
            { q: "const { name } = user does what?", options: ["Renames user", "Extracts user.name into a variable", "Deletes name", "Creates an object"], answer: 1 },
            { q: "A for loop is used to...", options: ["Style elements", "Repeat a block of code", "Define a variable", "Load a page"], answer: 1 },
          ]),
        ],
      },
      {
        title: "The DOM: Making Pages Interactive",
        lessons: [
          article("je-dom", "Selecting & Changing the Page", "13 min", `
<h3>🎯 Intro</h3>
<p>The DOM is your HTML as live objects. Select an element, change it, and the page updates instantly.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>document.querySelector("css selector")</code> — first match</li>
  <li><code>querySelectorAll</code> — all matches (loop with for...of)</li>
  <li><code>.textContent</code> for text, <code>.classList.add/remove/toggle</code> for styling</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;h1 id="title"&gt;Loading…&lt;/h1&gt;
&lt;p class="note"&gt;First note&lt;/p&gt;
&lt;p class="note"&gt;Second note&lt;/p&gt;

&lt;script&gt;
const title = document.querySelector("#title");
title.textContent = "Welcome to WebDev Academy!";
title.style.color = "purple";

for (const note of document.querySelectorAll(".note")) {
  note.classList.add("highlight");
}
&lt;/script&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a page with 3 paragraphs; use JS to number them "1.", "2.", "3." automatically.</div>`),
          article("je-events", "Events: Reacting to the User", "13 min", `
<h3>🎯 Intro</h3>
<p>Events are the moments users create — clicks, typing, submitting. <code>addEventListener</code> lets you respond.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>el.addEventListener("click", fn)</code></li>
  <li>Input events: read <code>e.target.value</code> live</li>
  <li>Forms: listen to "submit" + <code>e.preventDefault()</code></li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;input id="name" placeholder="Type your name"&gt;
&lt;button id="btn"&gt;Greet&lt;/button&gt;
&lt;p id="out"&gt;&lt;/p&gt;

&lt;script&gt;
const out = document.querySelector("#out");

document.querySelector("#btn").addEventListener("click", () =&gt; {
  const name = document.querySelector("#name").value || "friend";
  out.textContent = \`Hello, \${name}! 👋\`;
});

document.querySelector("#name").addEventListener("input", (e) =&gt; {
  out.textContent = \`Typing: \${e.target.value}\`;
});
&lt;/script&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a "Clear" button that empties both the input and the paragraph.</div>`),
          article("je-project", "Final Project: Interactive To-Do List", "22 min", `
<h3>🎯 Intro</h3>
<p>Everything in one page: variables, arrays, functions, DOM, events. The classic first project — built properly.</p>
<h3>💻 Complete solution — study it, then build yours</h3>
<pre><code>&lt;h2&gt;📚 My Study List &lt;span id="count"&gt;&lt;/span&gt;&lt;/h2&gt;
&lt;form id="form"&gt;
  &lt;input id="input" placeholder="Add a topic…" autocomplete="off"&gt;
  &lt;button&gt;Add&lt;/button&gt;
&lt;/form&gt;
&lt;ul id="list"&gt;&lt;/ul&gt;

&lt;script&gt;
let items = [];

const list  = document.querySelector("#list");
const count = document.querySelector("#count");
const input = document.querySelector("#input");

function render() {
  list.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = item.text;
    label.style.textDecoration = item.done ? "line-through" : "none";
    label.addEventListener("click", () =&gt; {
      item.done = !item.done;
      render();
    });

    const del = document.createElement("button");
    del.textContent = "🗑";
    del.addEventListener("click", () =&gt; {
      items = items.filter(x =&gt; x !== item);
      render();
    });

    li.append(label, " ", del);
    list.append(li);
  }
  const done = items.filter(x =&gt; x.done).length;
  count.textContent = \`(\${done}/\${items.length})\`;
}

document.querySelector("#form").addEventListener("submit", (e) =&gt; {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  items.push({ text, done: false });
  input.value = "";
  render();
});

render();
&lt;/script&gt;</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> save items to localStorage so the list survives refresh, and add a "clear completed" button using filter.</div>`),
          quiz("je-quiz-3", "Final Quiz: JavaScript", [
            { q: "document.querySelector(\".card\") returns...", options: ["All matching elements", "The first matching element", "A string of HTML", "An error"], answer: 1 },
            { q: "e.preventDefault() in a submit handler...", options: ["Clears the form", "Stops the page from reloading", "Validates inputs", "Sends the data"], answer: 1 },
            { q: "To respond to a click you use...", options: ["onClickNow()", "el.addEventListener(\"click\", fn)", "el.click = fn only", "listen(el)"], answer: 1 },
            { q: "items.filter(x => x !== item) is used above to...", options: ["Sort items", "Remove one item immutably", "Duplicate items", "Mark done"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "responsive-design",
    title: "Responsive Web Design in a Weekend",
    subtitle: "Make every site look flawless on phones, tablets, and desktops.",
    instructor: "Maya Chen",
    category: "Responsive",
    level: "Beginner",
    rating: 4.7,
    ratings: 30115,
    students: 154900,
    hours: 6.5,
    price: "Free",
    color: "linear-gradient(135deg,#11998e,#38ef7d)",
    icon: "&#9633;",
    description:
      "A fast, practical course on responsive design: media queries, fluid grids, relative units, and mobile-first thinking. Perfect for a focused weekend.",
    whatYouLearn: [
      "Think mobile-first",
      "Use media queries effectively",
      "Build fluid, flexible layouts",
      "Choose the right CSS units",
    ],
    sections: [
      {
        title: "Responsive Core",
        lessons: [
          video("rd-units", "Relative Units: rem, em, %, vw", "9 min", `
<p>Fixed pixels don't scale. Relative units do.</p>
<ul>
  <li><code>rem</code> — relative to the root font size (great for spacing &amp; type).</li>
  <li><code>%</code> — relative to the parent's size.</li>
  <li><code>vw</code>/<code>vh</code> — 1% of the viewport width/height.</li>
</ul>
<pre><code>h1 { font-size: 2.5rem; }
.hero { padding: 5vw; }
.col { width: 50%; }</code></pre>
<div class="callout tip">Set spacing and font sizes in <code>rem</code> so the whole UI scales with one root value.</div>`),
          video("rd-media", "Breakpoints That Work", "10 min", `
<pre><code>/* mobile first */
.grid { grid-template-columns: 1fr; }

@media (min-width: 600px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}</code></pre>
<div class="callout">Let content decide breakpoints. Resize your browser and add one whenever the layout starts to look cramped.</div>`),
          quiz("rd-quiz", "Quiz: Responsive", [
            {
              q: "Which unit is 1% of the viewport width?",
              options: ["rem", "vw", "em", "px"],
              answer: 1,
            },
            {
              q: "\"Mobile-first\" means you...",
              options: [
                "Only support phones",
                "Write base styles for small screens, then enhance up",
                "Design desktop first",
                "Hide content on mobile",
              ],
              answer: 1,
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "dev-career",
    title: "Land Your First Web Developer Job",
    subtitle: "Portfolio, résumé, GitHub, and interview prep — the non-code half of the job.",
    instructor: "Tom Becker",
    category: "Career",
    level: "All Levels",
    rating: 4.5,
    ratings: 18240,
    students: 96750,
    hours: 5,
    price: "Free",
    color: "linear-gradient(135deg,#654ea3,#eaafc8)",
    icon: "&#9733;",
    description:
      "Great code isn't enough — you have to get hired. Learn to build a standout portfolio, write a résumé that passes screening, use GitHub like a pro, and handle technical interviews.",
    whatYouLearn: [
      "Build a portfolio that gets callbacks",
      "Write a developer résumé that passes ATS",
      "Present projects on GitHub professionally",
      "Prepare for common technical interviews",
    ],
    sections: [
      {
        title: "Get Job-Ready",
        lessons: [
          article("dc-portfolio", "A Portfolio That Stands Out", "8 min", `
<p>Recruiters spend seconds on a portfolio. Make them count.</p>
<ul>
  <li>Lead with <strong>3–4 real projects</strong>, each with a live link and source code.</li>
  <li>For every project: what it does, what you built, and the tech used.</li>
  <li>Keep the design clean, fast, and responsive — it <em>is</em> a work sample.</li>
</ul>
<div class="callout tip">One polished project beats ten half-finished ones. Depth signals professionalism.</div>`),
          article("dc-github", "Using GitHub Professionally", "7 min", `
<p>Your GitHub is a public résumé. Employers <em>will</em> look.</p>
<ul>
  <li>Write clear <strong>README</strong> files with screenshots and setup steps.</li>
  <li>Commit often with meaningful messages.</li>
  <li>Pin your best repositories to your profile.</li>
</ul>
<pre><code># A good commit message
git commit -m "Add dark-mode toggle to portfolio header"</code></pre>
<div class="callout">Green squares aren't the goal — a few well-documented projects beat a wall of noise.</div>`),
          quiz("dc-quiz", "Quiz: Career", [
            {
              q: "What's the most important thing in a junior portfolio?",
              options: [
                "As many projects as possible",
                "A few polished projects with live links",
                "A fancy animated intro",
                "Your GPA",
              ],
              answer: 1,
            },
            {
              q: "A good commit message should be...",
              options: [
                "Left empty",
                "\"update\"",
                "Clear and describe what changed",
                "The date only",
              ],
              answer: 2,
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "python-basics",
    title: "Python for Beginners",
    subtitle: "The world's friendliest programming language — from zero to writing real scripts.",
    instructor: "Su Myat",
    category: "Programming",
    level: "Beginner",
    rating: 4.8,
    ratings: 51200,
    students: 402000,
    hours: 14,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#306998,#FFD43B)",
    icon: "🐍",
    description:
      "Python reads almost like English, which makes it the perfect first language. This full course takes you from installing Python to writing a complete project: variables, control flow, data structures, functions, files and error handling — the foundation for web backends, automation, and data science.",
    whatYouLearn: [
      "Install Python and run programs three different ways",
      "Variables, strings, numbers and user input",
      "Make decisions with if/elif/else and repeat with loops",
      "Master lists, dictionaries, tuples and sets",
      "Write clean reusable functions with parameters and returns",
      "Read/write files, handle errors, and build a final project",
    ],
    sections: [
      {
        title: "Getting Started",
        lessons: [
          article("py-setup", "Installing & Running Python", "9 min", `
<h3>🎯 Intro</h3>
<p>Before writing code, let's get Python onto your machine and learn the three ways to run it.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Download from <strong>python.org</strong> — on Windows, tick <em>"Add Python to PATH"</em> during install</li>
  <li><strong>REPL:</strong> type <code>python</code> in a terminal for an interactive playground</li>
  <li><strong>Scripts:</strong> save code as <code>name.py</code>, run with <code>python name.py</code></li>
  <li><strong>Editors:</strong> VS Code + the Python extension is the popular free setup</li>
</ul>
<h3>💻 Example</h3>
<pre><code># In the terminal:
python --version        # e.g. Python 3.12.4

# REPL — try math instantly:
&gt;&gt;&gt; 2 + 3 * 4
14
&gt;&gt;&gt; "ha" * 3
'hahaha'

# first.py
print("Python is installed and working!")
# run it:  python first.py</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> install Python, open the REPL and compute how many seconds are in a year. Then put the same line in a script and run it.</div>`),
          article("py-hello", "Hello, Python! — print, input & variables", "10 min", `
<h3>🎯 Intro</h3>
<p>Python programs are plain text that runs top to bottom. Three tools carry you a long way: <code>print()</code>, <code>input()</code>, and variables.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>print()</code> shows output; <code>input()</code> asks the user (always returns text!)</li>
  <li>Variables need no type declarations — just assign</li>
  <li>f-strings (<code>f"..."</code>) embed values inside text</li>
  <li>Comments start with <code>#</code> and are ignored by Python</li>
</ul>
<h3>💻 Example</h3>
<pre><code># greeting.py
name = input("What is your name? ")
age = int(input("How old are you? "))   # convert text → number

print(f"Hello {name}!")
print(f"Next year you'll be {age + 1}.")</code></pre>
<div class="callout">Without <code>int(...)</code>, <code>age + 1</code> would crash — input() gives you a string like "25", not the number 25.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> ask for the user's favorite food and how many times they ate it this week, then print a full sentence using both.</div>`),
          article("py-numbers", "Numbers & Math", "9 min", `
<h3>🎯 Intro</h3>
<p>Python has two everyday number types — and a set of operators you'll use constantly.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>int</code> — whole numbers; <code>float</code> — decimals</li>
  <li><code>+ - * /</code> as expected; <code>/</code> ALWAYS gives a float</li>
  <li><code>//</code> floor division, <code>%</code> remainder, <code>**</code> power</li>
  <li><code>round()</code>, <code>abs()</code>, <code>min()</code>, <code>max()</code> are built in</li>
</ul>
<h3>💻 Example</h3>
<pre><code>price = 4500
people = 4

each = price / people        # 1125.0  (float)
whole = price // people      # 1125    (int)
left = price % people        # 0       remainder
squared = people ** 2        # 16

print(f"Each pays: {each}")
print(round(3.14159, 2))     # 3.14</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> a 7580 kyat bill split between 3 friends — print what each pays rounded to 2 decimals, and the remainder using %.</div>`),
          article("py-strings", "Working with Strings", "11 min", `
<h3>🎯 Intro</h3>
<p>Text is everywhere — names, messages, files. Python's string methods make text work painless.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Index characters: <code>s[0]</code> first, <code>s[-1]</code> last; slice with <code>s[2:5]</code></li>
  <li><code>.upper() .lower() .strip() .replace() .split()</code> — the daily five</li>
  <li><code>len(s)</code> gives length; <code>"x" in s</code> checks containment</li>
</ul>
<h3>💻 Example</h3>
<pre><code>msg = "  Learn Python at WebDev Academy  "

clean = msg.strip()
print(clean.upper())              # LEARN PYTHON AT WEBDEV ACADEMY
print(clean.replace("Python", "coding"))
print(len(clean))                 # 30
print("Python" in clean)          # True

words = clean.split(" ")
print(words[0], "…", words[-1])   # Learn … Academy</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> take a full name from input(), print it trimmed, in Title Case (.title()), and print how many characters it has without spaces.</div>`),
          quiz("py-quiz-1", "Quiz: Getting Started", [
            { q: "input() always returns which type?", options: ["int", "float", "str", "bool"], answer: 2 },
            { q: "What is 7 // 2 in Python?", options: ["3.5", "3", "4", "1"], answer: 1 },
            { q: "s[-1] gives you...", options: ["An error", "The last character", "The first character", "Everything but the first"], answer: 1 },
            { q: "Which converts the text \"42\" into a number?", options: ["number(\"42\")", "int(\"42\")", "\"42\".toInt()", "parse(\"42\")"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Control Flow",
        lessons: [
          article("py-if", "Decisions: if / elif / else", "11 min", `
<h3>🎯 Intro</h3>
<p>Programs become smart when they can choose. Python uses <strong>indentation</strong> (4 spaces) to group what belongs to each branch.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Comparisons: <code>== != &lt; &gt; &lt;= &gt;=</code></li>
  <li>Combine with <code>and</code>, <code>or</code>, <code>not</code></li>
  <li><code>elif</code> chains several conditions; only the first true branch runs</li>
</ul>
<h3>💻 Example</h3>
<pre><code>score = int(input("Your score: "))

if score &gt;= 80:
    grade = "A"
elif score &gt;= 60:
    grade = "B"
elif score &gt;= 40:
    grade = "C"
else:
    grade = "F"

passed = score &gt;= 40 and score &lt;= 100
print(f"Grade: {grade}, valid pass: {passed}")</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> ask for an age and print "child" (under 13), "teenager" (13–19) or "adult" — then add a check for impossible ages like -5.</div>`),
          article("py-while", "while Loops", "10 min", `
<h3>🎯 Intro</h3>
<p><code>while</code> repeats as long as a condition stays true — perfect when you don't know how many rounds you'll need.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Something in the loop must change, or it never ends</li>
  <li><code>break</code> exits immediately; <code>continue</code> skips to the next round</li>
  <li>Classic pattern: loop until the user types a quit word</li>
</ul>
<h3>💻 Example</h3>
<pre><code>secret = 7
guess = None

while guess != secret:
    guess = int(input("Guess (1-10): "))
    if guess &lt; secret:
        print("Too low!")
    elif guess &gt; secret:
        print("Too high!")

print("Correct! 🎉")</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> keep asking for words until the user types "stop", then print how many words they entered.</div>`),
          article("py-for", "for Loops & range()", "11 min", `
<h3>🎯 Intro</h3>
<p><code>for</code> visits each item in a sequence. With <code>range()</code>, it becomes a counting machine.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>range(5)</code> → 0,1,2,3,4; <code>range(1, 6)</code> → 1..5; <code>range(0, 20, 5)</code> steps by 5</li>
  <li>Loop any string, list, or dictionary directly</li>
  <li><code>enumerate()</code> gives you index + value together</li>
</ul>
<h3>💻 Example</h3>
<pre><code># multiplication table
n = 7
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")

# index + value
courses = ["HTML", "CSS", "Python"]
for i, c in enumerate(courses, start=1):
    print(f"{i}. {c}")</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> print all even numbers from 2 to 30 using range's step — then do it again with an if + % check.</div>`),
          quiz("py-quiz-2", "Quiz: Control Flow", [
            { q: "How does Python group the body of an if statement?", options: ["Curly braces { }", "Indentation", "Parentheses", "The end keyword"], answer: 1 },
            { q: "range(3) produces...", options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3 zeros"], answer: 1 },
            { q: "break inside a loop...", options: ["Pauses the program", "Skips one round", "Exits the loop immediately", "Restarts the loop"], answer: 2 },
            { q: "A while loop whose condition never becomes false...", options: ["Stops after 1000 rounds", "Runs forever", "Throws an error", "Is impossible"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Data Structures",
        lessons: [
          article("py-lists", "Lists in Depth", "13 min", `
<h3>🎯 Intro</h3>
<p>The list is Python's workhorse: ordered, changeable, and packed with useful methods.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>.append() .insert() .remove() .pop()</code> — grow and shrink</li>
  <li><code>.sort()</code> orders in place; <code>sorted(x)</code> returns a new list</li>
  <li>Slices work like strings: <code>nums[1:3]</code>, <code>nums[::-1]</code> reverses</li>
  <li><code>sum() len() min() max()</code> work on whole lists</li>
</ul>
<h3>💻 Example</h3>
<pre><code>scores = [75, 92, 58]
scores.append(88)          # [75, 92, 58, 88]
scores.sort(reverse=True)  # [92, 88, 75, 58]

top3 = scores[:3]
average = sum(scores) / len(scores)

print(f"Top 3: {top3}")
print(f"Average: {average:.1f}")
print(f"Best: {max(scores)}, Worst: {min(scores)}")</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> collect 5 prices from input() into a list, then print them sorted, their total, and the most expensive one.</div>`),
          article("py-dicts", "Dictionaries", "13 min", `
<h3>🎯 Intro</h3>
<p>A dictionary stores <strong>labeled</strong> data: look up by key instead of position. It's how real-world records are modeled.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Create: <code>{"name": "Aye", "score": 85}</code>; read: <code>d["name"]</code></li>
  <li><code>d.get("key", default)</code> avoids crashes on missing keys</li>
  <li>Loop: <code>for key, value in d.items():</code></li>
  <li>Dictionaries nest — a list of dicts is a mini database</li>
</ul>
<h3>💻 Example</h3>
<pre><code>students = [
    {"name": "Aye", "score": 85},
    {"name": "Ko",  "score": 55},
    {"name": "Mya", "score": 92},
]

for s in students:
    status = "pass" if s["score"] &gt;= 60 else "retry"
    print(f'{s["name"]}: {s["score"]} ({status})')

# count pass/fail
results = {"pass": 0, "retry": 0}
for s in students:
    key = "pass" if s["score"] &gt;= 60 else "retry"
    results[key] += 1
print(results)   # {'pass': 2, 'retry': 1}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a phone book dict of 3 friends; ask for a name with input() and print the number, or "not found" using .get().</div>`),
          article("py-tuples", "Tuples, Sets & Comprehensions", "12 min", `
<h3>🎯 Intro</h3>
<p>Two more containers with superpowers — plus Python's most-loved shortcut.</p>
<h3>📝 Summary</h3>
<ul>
  <li><strong>Tuple</strong> <code>(lat, lon)</code> — like a list but unchangeable; great for fixed pairs</li>
  <li><strong>Set</strong> <code>{1, 2, 3}</code> — no duplicates, instant membership checks</li>
  <li><strong>Comprehension</strong> — build a list in one readable line</li>
</ul>
<h3>💻 Example</h3>
<pre><code>point = (16.8661, 96.1951)          # Yangon lat/lon — fixed forever
lat, lon = point                     # unpacking

votes = ["mo", "aye", "mo", "ko", "mo"]
unique_voters = set(votes)
print(unique_voters)                 # {'mo', 'aye', 'ko'}

nums = [1, 2, 3, 4, 5, 6]
squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
print(squares)   # [1, 4, 9, 16, 25, 36]
print(evens)     # [2, 4, 6]</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> given a list of words with repeats, print the unique words, and use a comprehension to make a list of their lengths.</div>`),
          quiz("py-quiz-3", "Quiz: Data Structures", [
            { q: "Which method adds an item to the end of a list?", options: [".add()", ".push()", ".append()", ".insert_end()"], answer: 2 },
            { q: "d.get(\"x\", 0) when \"x\" is missing returns...", options: ["An error", "None always", "0", "\"x\""], answer: 2 },
            { q: "Which container silently removes duplicates?", options: ["list", "tuple", "dict", "set"], answer: 3 },
            { q: "[n*2 for n in nums] is called a...", options: ["Lambda", "List comprehension", "Generator class", "Decorator"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Functions, Files & Final Project",
        lessons: [
          article("py-func", "Functions", "13 min", `
<h3>🎯 Intro</h3>
<p>Functions turn repeated code into named, reusable, testable pieces — the single biggest step toward professional code.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>def name(params):</code> defines; <code>return</code> sends a value back</li>
  <li>Default values: <code>def greet(name, lang="en")</code></li>
  <li>A function should do <strong>one</strong> thing, named with a verb</li>
</ul>
<h3>💻 Example</h3>
<pre><code>def area(width, height):
    return width * height

def grade(score):
    if score &gt;= 80: return "A"
    if score &gt;= 60: return "B"
    return "C"

def greet(name, lang="en"):
    if lang == "my":
        return f"မင်္ဂလာပါ {name}!"
    return f"Hello {name}!"

print(area(4, 5))            # 20
print(grade(72))             # B
print(greet("Aye", "my"))    # မင်္ဂလာပါ Aye!</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write kyat_to_usd(amount, rate=4400) and use it on three amounts; then write is_even(n) returning True/False.</div>`),
          article("py-files", "Files & Errors", "13 min", `
<h3>🎯 Intro</h3>
<p>Real programs save data and survive bad input. Files + try/except are how.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>with open(path) as f:</code> auto-closes the file for you</li>
  <li><code>"w"</code> writes (overwrites!), <code>"a"</code> appends, default reads</li>
  <li><code>try / except</code> catches specific errors so the program keeps going</li>
</ul>
<h3>💻 Example</h3>
<pre><code># save scores
with open("scores.txt", "w") as f:
    f.write("Aye,85\\n")
    f.write("Ko,55\\n")

# read them back safely
try:
    with open("scores.txt") as f:
        for line in f:
            name, score = line.strip().split(",")
            print(f"{name} scored {score}")
except FileNotFoundError:
    print("No scores saved yet.")
except ValueError:
    print("A line was badly formatted.")</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a diary program — each run appends one input() line with today's date to diary.txt, then prints the whole file.</div>`),
          article("py-project", "Final Project: Student Report Tool", "20 min", `
<h3>🎯 Intro</h3>
<p>Time to combine <em>everything</em>: input, dicts, loops, functions, files. A tool a real teacher could use.</p>
<h3>📝 The task</h3>
<ul>
  <li>Enter student names and scores until "done"</li>
  <li>Compute average, highest, lowest, pass rate</li>
  <li>Save a formatted report to report.txt</li>
</ul>
<h3>💻 Complete solution — read it, then write yours</h3>
<pre><code>def collect_students():
    students = []
    while True:
        name = input("Student name (or done): ").strip()
        if name.lower() == "done":
            return students
        try:
            score = int(input(f"Score for {name}: "))
        except ValueError:
            print("Numbers only — try again.")
            continue
        students.append({"name": name, "score": score})

def summarize(students):
    scores = [s["score"] for s in students]
    passed = [s for s in students if s["score"] &gt;= 60]
    return {
        "count": len(students),
        "average": sum(scores) / len(scores),
        "best": max(students, key=lambda s: s["score"]),
        "pass_rate": len(passed) / len(students) * 100,
    }

def save_report(students, stats):
    with open("report.txt", "w") as f:
        f.write("CLASS REPORT\\n============\\n")
        for s in students:
            f.write(f'{s["name"]:<12} {s["score"]:>3}\\n')
        f.write(f'\\nStudents: {stats["count"]}\\n')
        f.write(f'Average:  {stats["average"]:.1f}\\n')
        f.write(f'Best:     {stats["best"]["name"]}\\n')
        f.write(f'Pass rate {stats["pass_rate"]:.0f}%\\n')

students = collect_students()
if students:
    stats = summarize(students)
    save_report(students, stats)
    print(f'Report saved — average {stats["average"]:.1f}, '
          f'best: {stats["best"]["name"]} 🎉')</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> add letter grades to the report, sort students best-first, and refuse scores outside 0–100.</div>`),
          quiz("py-quiz-4", "Final Quiz: Python", [
            { q: "Which keyword defines a function?", options: ["function", "fn", "def", "func"], answer: 2 },
            { q: "with open(\"f.txt\", \"w\") — what does \"w\" do?", options: ["Reads only", "Appends", "Overwrites/creates for writing", "Locks the file"], answer: 2 },
            { q: "try/except exists to...", options: ["Speed up code", "Handle errors without crashing", "Import modules", "Format strings"], answer: 1 },
            { q: "max(students, key=lambda s: s[\"score\"]) returns...", options: ["The highest score number", "The student dict with the highest score", "A sorted list", "An error"], answer: 1 },
            { q: "A good function should...", options: ["Do as much as possible", "Do one clear thing", "Avoid parameters", "Always print"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "java-basics",
    title: "Java Fundamentals",
    subtitle: "The language behind Android apps and enterprise systems — strongly typed, everywhere.",
    instructor: "Ko Zaw",
    category: "Programming",
    level: "Beginner",
    rating: 4.6,
    ratings: 28900,
    students: 187000,
    hours: 7,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#5382a1,#f89820)",
    icon: "☕",
    description:
      "Java runs on billions of devices. Learn its strict-but-helpful type system, classes and objects — skills that map directly to Android, Spring, and big-company codebases.",
    whatYouLearn: [
      "Compile and run Java programs",
      "Static types: int, double, String, boolean",
      "Control flow and arrays",
      "Classes, objects and methods",
    ],
    sections: [
      {
        title: "Java Foundations",
        lessons: [
          article("jv-hello", "Your First Java Program", "10 min", `
<h3>🎯 Intro</h3>
<p>Java code lives inside <strong>classes</strong>, and every program starts at <code>main</code>.</p>
<h3>💻 Example</h3>
<pre><code>public class Hello {
    public static void main(String[] args) {
        String name = "Mya";
        int year = 2026;
        System.out.println("Hello " + name + ", welcome to " + year);
    }
}</code></pre>
<div class="callout">Compile with <code>javac Hello.java</code>, run with <code>java Hello</code>.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> change the program to print your own name and city on two separate lines.</div>`),
          article("jv-types", "Types, Conditions & Loops", "12 min", `
<h3>🎯 Intro</h3>
<p>Java checks types <em>before</em> the program runs — many bugs never make it to your users.</p>
<h3>💻 Example</h3>
<pre><code>int[] scores = {75, 92, 58, 88};
int total = 0;
for (int s : scores) {
    total += s;
}
double average = (double) total / scores.length;
if (average &gt;= 80) {
    System.out.println("Great class average: " + average);
} else {
    System.out.println("Average: " + average);
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> loop over an array of prices and count how many are under 1000.</div>`),
          article("jv-oop", "Classes & Objects", "14 min", `
<h3>🎯 Intro</h3>
<p>Object-oriented programming models real things: a class is the blueprint, objects are the copies.</p>
<h3>💻 Example</h3>
<pre><code>class Student {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }

    boolean passed() {
        return score &gt;= 60;
    }
}

Student s = new Student("Hla", 72);
System.out.println(s.name + " passed? " + s.passed());</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a <code>grade()</code> method returning "A" for 80+, "B" for 60–79, else "C".</div>`),
          quiz("jv-quiz", "Quiz: Java", [
            { q: "Where does every Java program start?", options: ["The first line of the file", "The main method", "The constructor", "init()"], answer: 1 },
            { q: "Which is a valid Java type?", options: ["number", "int", "let", "var only"], answer: 1 },
            { q: "A class is best described as...", options: ["A running program", "A blueprint for objects", "A loop", "A package manager"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "c-basics",
    title: "C Programming Essentials",
    subtitle: "The classic language that powers operating systems — and teaches you how computers really work.",
    instructor: "Dr. Min Thu",
    category: "Programming",
    level: "Intermediate",
    rating: 4.5,
    ratings: 15300,
    students: 98000,
    hours: 8,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#283593,#5c6bc0)",
    icon: "C",
    description:
      "C gives you direct control of memory and hardware. Learning it makes every other language easier to understand — and it's still the language of Linux, embedded devices, and game engines.",
    whatYouLearn: [
      "Compile C with gcc and understand the build step",
      "printf/scanf, variables and operators",
      "Arrays and the basics of pointers",
      "Write small complete programs",
    ],
    sections: [
      {
        title: "C Foundations",
        lessons: [
          article("c-hello", "Hello, C — Compile & Run", "10 min", `
<h3>🎯 Intro</h3>
<p>C is <strong>compiled</strong>: your text becomes machine code before it runs. That's why it's fast.</p>
<h3>💻 Example</h3>
<pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int age = 20;
    printf("Hello from C! Age: %d\\n", age);
    return 0;
}</code></pre>
<div class="callout">Compile: <code>gcc hello.c -o hello</code> then run <code>./hello</code></div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> print your name with %s and your height in meters with %f.</div>`),
          article("c-io", "Variables, scanf & Operators", "12 min", `
<h3>🎯 Intro</h3>
<p>In C you declare a type for everything, and read input with <code>scanf</code>.</p>
<h3>💻 Example</h3>
<pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d", &amp;a, &amp;b);
    printf("Sum=%d  Product=%d\\n", a + b, a * b);
    return 0;
}</code></pre>
<div class="callout tip">The <code>&amp;</code> before a variable gives scanf its <em>address</em> — your first taste of pointers.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> read a temperature in Celsius and print it in Fahrenheit (F = C × 9/5 + 32).</div>`),
          article("c-arrays", "Arrays & Pointer Basics", "14 min", `
<h3>🎯 Intro</h3>
<p>An array is a block of memory; a pointer holds an address into memory. They're two views of the same idea.</p>
<h3>💻 Example</h3>
<pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int nums[4] = {10, 20, 30, 40};
    int *p = nums;          /* points at nums[0] */
    for (int i = 0; i &lt; 4; i++) {
        printf("%d ", *(p + i));   /* same as nums[i] */
    }
    return 0;
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> sum an array of 5 numbers using a pointer instead of index notation.</div>`),
          quiz("c-quiz", "Quiz: C", [
            { q: "What does gcc do?", options: ["Runs C directly", "Compiles C into machine code", "Formats the code", "Installs libraries"], answer: 1 },
            { q: "In scanf(\"%d\", &x) the & means...", options: ["logical AND", "the address of x", "a reference type", "nothing"], answer: 1 },
            { q: "*(p + 2) is equivalent to...", options: ["p[2]", "p + 2", "&p[2]", "p * 2"], answer: 0 },
          ]),
        ],
      },
    ],
  },
  {
    id: "cpp-basics",
    title: "C++ Fundamentals",
    subtitle: "C's powerful successor — the language of game engines, finance, and high-performance software.",
    instructor: "Dr. Min Thu",
    category: "Programming",
    level: "Intermediate",
    rating: 4.6,
    ratings: 19800,
    students: 121000,
    hours: 8,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#00427e,#0086d4)",
    icon: "C++",
    description:
      "C++ adds classes, the standard library, and modern conveniences on top of C's speed. This course covers the essentials: iostream, vectors, and object-oriented basics.",
    whatYouLearn: [
      "cin/cout input and output",
      "std::string and std::vector — the workhorses",
      "Range-based loops and auto",
      "Classes with constructors and methods",
    ],
    sections: [
      {
        title: "C++ Foundations",
        lessons: [
          article("cpp-hello", "Hello, C++ — cout & cin", "10 min", `
<h3>🎯 Intro</h3>
<p>C++ replaces printf/scanf with type-safe <strong>streams</strong>.</p>
<h3>💻 Example</h3>
<pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    std::string name;
    std::cout &lt;&lt; "Your name? ";
    std::cin &gt;&gt; name;
    std::cout &lt;&lt; "Hello, " &lt;&lt; name &lt;&lt; "!\\n";
    return 0;
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> read two integers with cin and print their sum with cout.</div>`),
          article("cpp-vector", "Vectors & Loops", "12 min", `
<h3>🎯 Intro</h3>
<p><code>std::vector</code> is a resizable array — you'll use it constantly.</p>
<h3>💻 Example</h3>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;

int main() {
    std::vector&lt;int&gt; scores = {75, 92, 58};
    scores.push_back(88);
    int total = 0;
    for (auto s : scores) total += s;
    std::cout &lt;&lt; "Average: " &lt;&lt; total / (double)scores.size() &lt;&lt; "\\n";
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a vector of prices and print only those above 100.</div>`),
          article("cpp-class", "Classes & Constructors", "14 min", `
<h3>🎯 Intro</h3>
<p>C++ classes bundle data and behavior, with control over visibility.</p>
<h3>💻 Example</h3>
<pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Course {
    std::string title;
    int lessons;
public:
    Course(std::string t, int n) : title(t), lessons(n) {}
    void describe() const {
        std::cout &lt;&lt; title &lt;&lt; " has " &lt;&lt; lessons &lt;&lt; " lessons\\n";
    }
};

int main() {
    Course c("C++ Fundamentals", 12);
    c.describe();
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add an <code>isLong()</code> method returning true when lessons &gt; 20.</div>`),
          quiz("cpp-quiz", "Quiz: C++", [
            { q: "Which header provides std::cout?", options: ["<stdio.h>", "<iostream>", "<output>", "<console>"], answer: 1 },
            { q: "std::vector is...", options: ["A fixed-size array", "A resizable array", "A linked list", "A map"], answer: 1 },
            { q: "Members of a class are private...", options: ["never", "by default", "only with the private keyword", "when static"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "csharp-basics",
    title: "C# Fundamentals",
    subtitle: "Microsoft's elegant all-rounder — desktop apps, web APIs with .NET, and Unity games.",
    instructor: "Thiri Win",
    category: "Programming",
    level: "Beginner",
    rating: 4.7,
    ratings: 22100,
    students: 143000,
    hours: 6.5,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#68217a,#9b4f96)",
    icon: "C#",
    description:
      "C# combines Java-style structure with modern convenience. It's the language of the .NET ecosystem and the Unity game engine — friendly for beginners, powerful for professionals.",
    whatYouLearn: [
      "Run C# with dotnet",
      "Variables, strings and interpolation",
      "Collections with List<T>",
      "Classes and properties",
    ],
    sections: [
      {
        title: "C# Foundations",
        lessons: [
          article("cs-hello", "Hello, C#", "9 min", `
<h3>🎯 Intro</h3>
<p>Modern C# programs can be as short as one line — top-level statements run directly.</p>
<h3>💻 Example</h3>
<pre><code>string name = "Nilar";
int year = 2026;
Console.WriteLine($"Hello {name}, welcome to {year}!");</code></pre>
<div class="callout">Create and run a project: <code>dotnet new console</code> then <code>dotnet run</code></div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> read a name with <code>Console.ReadLine()</code> and greet the user with string interpolation.</div>`),
          article("cs-lists", "Lists & Loops", "11 min", `
<h3>🎯 Intro</h3>
<p><code>List&lt;T&gt;</code> is C#'s resizable collection — the T means it's typed.</p>
<h3>💻 Example</h3>
<pre><code>var scores = new List&lt;int&gt; { 75, 92, 58 };
scores.Add(88);

foreach (var s in scores)
{
    if (s &gt;= 60)
        Console.WriteLine($"{s} — pass");
    else
        Console.WriteLine($"{s} — retry");
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make a List of city names and print each in UPPERCASE (hint: <code>.ToUpper()</code>).</div>`),
          article("cs-class", "Classes & Properties", "13 min", `
<h3>🎯 Intro</h3>
<p>C# properties give you clean field access with built-in control.</p>
<h3>💻 Example</h3>
<pre><code>class Student
{
    public string Name { get; set; }
    public int Score { get; set; }

    public bool Passed =&gt; Score &gt;= 60;
}

var s = new Student { Name = "Kyaw", Score = 72 };
Console.WriteLine($"{s.Name} passed? {s.Passed}");</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a <code>Grade</code> property returning "A", "B" or "C" based on Score.</div>`),
          quiz("cs-quiz", "Quiz: C#", [
            { q: "Which command runs a C# console project?", options: ["csc run", "dotnet run", "dotnet go", "run cs"], answer: 1 },
            { q: "$\"Hello {name}\" is called...", options: ["A template", "String interpolation", "Concatenation", "A format macro"], answer: 1 },
            { q: "List<int> can hold...", options: ["Anything", "Only integers", "Only strings", "Exactly 10 items"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "kotlin-basics",
    title: "Kotlin Basics",
    subtitle: "The modern language of Android — concise, safe, and a joy to write.",
    instructor: "Thiri Win",
    category: "Programming",
    level: "Beginner",
    rating: 4.7,
    ratings: 12400,
    students: 76000,
    hours: 5,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#7f52ff,#e24462)",
    icon: "K",
    description:
      "Kotlin is Google's preferred language for Android and a favorite for modern backend work. Learn its null-safe type system, data classes, and expressive syntax.",
    whatYouLearn: [
      "val/var, types and string templates",
      "Null safety — Kotlin's signature feature",
      "Collections and lambdas",
      "Data classes and when expressions",
    ],
    sections: [
      {
        title: "Kotlin Foundations",
        lessons: [
          article("kt-hello", "Hello, Kotlin", "8 min", `
<h3>🎯 Intro</h3>
<p>Kotlin drops the ceremony: no class needed for main, no semicolons.</p>
<h3>💻 Example</h3>
<pre><code>fun main() {
    val name = "Phyo"        // val = read-only
    var score = 90           // var = changeable
    score += 5
    println("Hello $name, score: $score")
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create val city and var temperature, then print "It is X degrees in Y" with templates.</div>`),
          article("kt-null", "Null Safety & when", "11 min", `
<h3>🎯 Intro</h3>
<p>In Kotlin a variable can't be null unless you say so — goodbye NullPointerException.</p>
<h3>💻 Example</h3>
<pre><code>fun describe(grade: String?): String = when (grade) {
    "A" -&gt; "Excellent"
    "B" -&gt; "Good"
    null -&gt; "No grade yet"
    else -&gt; "Keep trying"
}

fun main() {
    println(describe("A"))
    println(describe(null))          // safe!
    val length = null?.length ?: 0   // elvis operator
    println(length)
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a when expression that maps 1→"Mon" ... 7→"Sun" and anything else to "Invalid".</div>`),
          article("kt-data", "Collections, Lambdas & Data Classes", "12 min", `
<h3>🎯 Intro</h3>
<p>Kotlin's collections + lambdas make data work read like a sentence.</p>
<h3>💻 Example</h3>
<pre><code>data class Student(val name: String, val score: Int)

fun main() {
    val students = listOf(
        Student("Aye", 85), Student("Ko", 55), Student("Mya", 92)
    )
    val passed = students.filter { it.score &gt;= 60 }
                         .map { it.name }
    println("Passed: $passed")
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> given a list of prices, use filter + sum to total only prices under 5000.</div>`),
          quiz("kt-quiz", "Quiz: Kotlin", [
            { q: "Which keyword makes a read-only variable?", options: ["var", "let", "val", "const only"], answer: 2 },
            { q: "String? means...", options: ["A list of strings", "A string that may be null", "An optional import", "A comment"], answer: 1 },
            { q: "data class automatically gives you...", options: ["A database table", "equals/hashCode/toString", "A UI screen", "Nothing extra"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "r-basics",
    title: "R for Data Analysis",
    subtitle: "Crunch numbers, summarize datasets and make charts — the statistician's language.",
    instructor: "Dr. Ei Mon",
    category: "Programming",
    level: "Beginner",
    rating: 4.5,
    ratings: 8900,
    students: 54000,
    hours: 5,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#1f65b7,#75aadb)",
    icon: "R",
    description:
      "R was built for statistics. Learn vectors, data frames and plotting — the core moves of every data analysis, from class grades to research papers.",
    whatYouLearn: [
      "Vectors and vectorized math",
      "Data frames — tables in code",
      "Filtering and summarizing data",
      "Your first plot",
    ],
    sections: [
      {
        title: "R Foundations",
        lessons: [
          article("r-vectors", "Vectors & Vectorized Math", "9 min", `
<h3>🎯 Intro</h3>
<p>In R, the basic unit isn't a number — it's a <strong>vector</strong> of numbers, and math applies to all elements at once.</p>
<h3>💻 Example</h3>
<pre><code>scores &lt;- c(75, 92, 58, 88)
scores + 5          # adds 5 to every score
mean(scores)        # 78.25
max(scores)         # 92
scores[scores &gt; 80] # 92 88</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make a vector of 6 temperatures and find its mean, min and max.</div>`),
          article("r-frames", "Data Frames", "12 min", `
<h3>🎯 Intro</h3>
<p>A data frame is a table: columns have names, rows are observations. It's R's superpower.</p>
<h3>💻 Example</h3>
<pre><code>students &lt;- data.frame(
  name  = c("Aye", "Ko", "Mya"),
  score = c(85, 55, 92)
)

students$score            # one column
students[students$score &gt;= 60, ]   # passing rows
nrow(students)            # 3</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a data frame of 4 products with prices; select only rows where price &lt; 100.</div>`),
          article("r-plot", "Your First Plot", "8 min", `
<h3>🎯 Intro</h3>
<p>One line of R gives you a chart — the fastest way to see your data.</p>
<h3>💻 Example</h3>
<pre><code>months &lt;- c(1, 2, 3, 4, 5, 6)
sales  &lt;- c(12, 19, 15, 25, 32, 28)

plot(months, sales, type = "b",
     main = "Sales by Month",
     xlab = "Month", ylab = "Sales")</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> plot your weekly study hours across 7 days with type "b".</div>`),
          quiz("r-quiz", "Quiz: R", [
            { q: "c(1, 2, 3) creates...", options: ["A class", "A vector", "A comment", "A file"], answer: 1 },
            { q: "students$score selects...", options: ["A row", "A column by name", "The first cell", "Nothing"], answer: 1 },
            { q: "Which function draws a basic chart?", options: ["chart()", "draw()", "plot()", "graph()"], answer: 2 },
          ]),
        ],
      },
    ],
  },
  {
    id: "dsa-basics",
    title: "Data Structures & Algorithms",
    subtitle: "The thinking skills behind every interview question and every fast program.",
    instructor: "Dr. Min Thu",
    category: "Programming",
    level: "Intermediate",
    rating: 4.8,
    ratings: 31500,
    students: 168000,
    hours: 9,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#134e5e,#71b280)",
    icon: "⚙️",
    description:
      "Why is one program instant and another painfully slow? DSA answers that. Learn Big-O thinking, the core data structures, and classic algorithms — with JavaScript examples you can run in the playground.",
    whatYouLearn: [
      "Big-O: how to reason about speed",
      "Arrays, stacks, queues and hash maps",
      "Linear vs binary search",
      "Classic sorting ideas",
    ],
    sections: [
      {
        title: "Thinking in Algorithms",
        lessons: [
          article("dsa-bigo", "Big-O: How Fast Is Your Code?", "12 min", `
<h3>🎯 Intro</h3>
<p>Big-O describes how work grows as data grows. It's the shared language of every technical interview.</p>
<h3>📝 Summary</h3>
<ul>
  <li><strong>O(1)</strong> — constant: array lookup by index</li>
  <li><strong>O(log n)</strong> — halving: binary search</li>
  <li><strong>O(n)</strong> — one pass: a simple loop</li>
  <li><strong>O(n²)</strong> — nested loops: comparing everything with everything</li>
</ul>
<h3>💻 Example</h3>
<pre><code>// O(n) — touches each item once
function sum(list) {
  let total = 0;
  for (const x of list) total += x;
  return total;
}

// O(n²) — touches each PAIR of items
function hasDuplicate(list) {
  for (let i = 0; i &lt; list.length; i++)
    for (let j = i + 1; j &lt; list.length; j++)
      if (list[i] === list[j]) return true;
  return false;
}
console.log(sum([1,2,3]), hasDuplicate([1,2,2]));</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> rewrite hasDuplicate using a Set so it becomes O(n).</div>`),
          article("dsa-structures", "Stacks, Queues & Hash Maps", "14 min", `
<h3>🎯 Intro</h3>
<p>Choosing the right container is half of programming.</p>
<h3>📝 Summary</h3>
<ul>
  <li><strong>Stack</strong> — last in, first out (undo history)</li>
  <li><strong>Queue</strong> — first in, first out (print jobs)</li>
  <li><strong>Hash map</strong> — instant lookup by key (phone book)</li>
</ul>
<h3>💻 Example</h3>
<pre><code>// Stack with an array
const stack = [];
stack.push("page1"); stack.push("page2");
console.log(stack.pop());       // page2 — most recent first

// Hash map with Map
const phone = new Map();
phone.set("Aye", "09-111");
phone.set("Ko",  "09-222");
console.log(phone.get("Ko"));   // instant, even with a million entries</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> use a Map to count how many times each word appears in a sentence.</div>`),
          article("dsa-search", "Linear vs Binary Search", "12 min", `
<h3>🎯 Intro</h3>
<p>Finding one item in a million: linear search checks up to a million; binary search checks about 20.</p>
<h3>💻 Example</h3>
<pre><code>function binarySearch(sorted, target) {
  let lo = 0, hi = sorted.length - 1;
  while (lo &lt;= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] &lt; target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
console.log(binarySearch([2,5,8,12,16,23,38], 16)); // 4</code></pre>
<div class="callout">Requirement: the list must be <strong>sorted</strong> first.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a counter that logs how many comparisons binarySearch makes for a 100-item array.</div>`),
          quiz("dsa-quiz", "Quiz: DSA", [
            { q: "A loop inside a loop over the same list is typically...", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 3 },
            { q: "Undo/redo history fits which structure?", options: ["Queue", "Stack", "Hash map", "Graph"], answer: 1 },
            { q: "Binary search requires the data to be...", options: ["Unique", "Sorted", "Numeric", "Short"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "git-basics",
    title: "Git & GitHub Essentials",
    subtitle: "Version control is a developer's superpower — never lose work, collaborate with anyone.",
    instructor: "Ko Zaw",
    category: "Tools",
    level: "Beginner",
    rating: 4.8,
    ratings: 26700,
    students: 195000,
    hours: 4,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#f05033,#3e2c00)",
    icon: "⎇",
    description:
      "Every professional project lives in Git. Learn the commit-branch-merge workflow and push your code to GitHub — the exact skills employers check first.",
    whatYouLearn: [
      "init, add, commit — the core loop",
      "Reading status and history",
      "Branching and merging",
      "Push to GitHub and collaborate",
    ],
    sections: [
      {
        title: "Git Foundations",
        lessons: [
          article("git-commit", "The Commit Loop", "10 min", `
<h3>🎯 Intro</h3>
<p>Git takes snapshots of your project. Each snapshot (commit) is a save point you can always return to.</p>
<h3>💻 Example</h3>
<pre><code>git init                      # start tracking this folder
git add index.html            # stage a file
git commit -m "Add homepage"  # snapshot with a message

git status                    # what changed?
git log --oneline             # history</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create a folder, init a repo, add a file, and make two commits with clear messages.</div>`),
          article("git-branch", "Branches & Merging", "12 min", `
<h3>🎯 Intro</h3>
<p>Branches let you try ideas without touching the working version.</p>
<h3>💻 Example</h3>
<pre><code>git branch feature-menu     # create a branch
git switch feature-menu     # work on it
# ...edit files, commit...
git switch main             # back to main
git merge feature-menu      # bring the work in</code></pre>
<div class="callout tip">Golden rule: main always works; experiments live on branches.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create a branch, change a file, commit, then merge it back to main.</div>`),
          article("git-github", "Push to GitHub", "10 min", `
<h3>🎯 Intro</h3>
<p>GitHub hosts your repositories online — backup, portfolio, and teamwork in one.</p>
<h3>💻 Example</h3>
<pre><code>git remote add origin https://github.com/you/project.git
git push -u origin main     # first push
git push                    # every time after

git pull                    # get teammates' changes</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create a GitHub repo and push your practice project — then check it appears on your profile.</div>`),
          quiz("git-quiz", "Quiz: Git", [
            { q: "Which command creates a snapshot?", options: ["git snapshot", "git save", "git commit", "git push"], answer: 2 },
            { q: "Branches are for...", options: ["Backups only", "Working on ideas without breaking main", "Deleting history", "Speed"], answer: 1 },
            { q: "git push does what?", options: ["Downloads changes", "Uploads your commits to the remote", "Merges branches", "Deletes the repo"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "docker-basics",
    title: "Docker Basics",
    subtitle: "\"It works on my machine\" — solved. Package apps into containers that run anywhere.",
    instructor: "Aung Kyaw",
    category: "Tools",
    level: "Intermediate",
    rating: 4.6,
    ratings: 14200,
    students: 89000,
    hours: 5,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#0db7ed,#384d54)",
    icon: "🐳",
    description:
      "Containers bundle your app with everything it needs. Learn images, containers, Dockerfiles and the commands you'll actually use daily.",
    whatYouLearn: [
      "Images vs containers — the mental model",
      "run, ps, stop, logs — daily commands",
      "Write a Dockerfile for your own app",
      "Map ports and persist data with volumes",
    ],
    sections: [
      {
        title: "Container Foundations",
        lessons: [
          article("dk-run", "Images & Containers", "10 min", `
<h3>🎯 Intro</h3>
<p>An <strong>image</strong> is a frozen template; a <strong>container</strong> is a running copy of it. Like class → object.</p>
<h3>💻 Example</h3>
<pre><code>docker run hello-world          # first container!
docker run -d -p 8080:80 nginx  # web server in one line

docker ps                       # what's running?
docker logs &lt;container-id&gt;      # what did it print?
docker stop &lt;container-id&gt;      # shut it down</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> run nginx as above and open http://localhost:8080 in your browser.</div>`),
          article("dk-dockerfile", "Your First Dockerfile", "12 min", `
<h3>🎯 Intro</h3>
<p>A Dockerfile is a recipe that turns YOUR app into an image.</p>
<h3>💻 Example</h3>
<pre><code># Dockerfile for a Node.js app
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>
<pre><code>docker build -t my-app .
docker run -p 3000:3000 my-app</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a Dockerfile for any small app you have and build it with a tag.</div>`),
          quiz("dk-quiz", "Quiz: Docker", [
            { q: "An image is to a container as...", options: ["A file is to a folder", "A recipe is to a cooked meal", "A server is to a client", "RAM is to disk"], answer: 1 },
            { q: "-p 8080:80 means...", options: ["Use 8080 MB of memory", "Map host port 8080 to container port 80", "Run 80 copies", "Set priority"], answer: 1 },
            { q: "Which file defines how to build your app's image?", options: ["docker.json", "Dockerfile", "image.yml", "container.cfg"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "excel-basics",
    title: "Excel for Beginners",
    subtitle: "The world's most-used data tool — formulas, functions and charts for work and study.",
    instructor: "Su Myat",
    category: "Tools",
    level: "Beginner",
    rating: 4.6,
    ratings: 33800,
    students: 274000,
    hours: 4,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#1d6f42,#21a366)",
    icon: "📊",
    description:
      "Every office runs on spreadsheets. Master cell references, the essential functions, and turn tables of numbers into answers.",
    whatYouLearn: [
      "Cell references: relative vs absolute ($)",
      "SUM, AVERAGE, COUNT, MIN/MAX",
      "IF and VLOOKUP — the interview favorites",
      "Sort, filter and chart your data",
    ],
    sections: [
      {
        title: "Spreadsheet Foundations",
        lessons: [
          article("xl-formulas", "Formulas & References", "10 min", `
<h3>🎯 Intro</h3>
<p>Every formula starts with <code>=</code>. References like <code>A1</code> point at cells — and adjust automatically when copied.</p>
<h3>💻 Example</h3>
<pre><code>=A2*B2          relative: copies as A3*B3, A4*B4...
=A2*$B$1        absolute: $B$1 stays fixed when copied
=SUM(C2:C10)    add up a whole range
=AVERAGE(C2:C10)</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a price × quantity table where one tax-rate cell ($) is used by every row.</div>`),
          article("xl-if", "IF & VLOOKUP", "12 min", `
<h3>🎯 Intro</h3>
<p>IF makes decisions; VLOOKUP finds matching data in another table — the two most-asked Excel skills.</p>
<h3>💻 Example</h3>
<pre><code>=IF(C2&gt;=60, "Pass", "Fail")

=VLOOKUP(A2, Products!A:C, 3, FALSE)
   find A2 in the first column of Products!A:C,
   return the value from column 3, exact match</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make a grade sheet where IF assigns Pass/Fail, then count passes with COUNTIF.</div>`),
          quiz("xl-quiz", "Quiz: Excel", [
            { q: "Every formula begins with...", options: ["#", "=", "@", "$"], answer: 1 },
            { q: "$A$1 in a copied formula...", options: ["Changes row only", "Changes column only", "Never changes", "Causes an error"], answer: 2 },
            { q: "VLOOKUP's FALSE argument asks for...", options: ["Sorted data", "An exact match", "Case sensitivity", "A backup value"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "react-basics",
    title: "React Fundamentals",
    subtitle: "The most in-demand frontend library — build UIs from reusable components.",
    instructor: "Sara Mitchell",
    category: "Frontend",
    level: "Intermediate",
    rating: 4.8,
    ratings: 47600,
    students: 356000,
    hours: 15,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#087ea4,#61dafb)",
    icon: "⚛️",
    description:
      "React turns your UI into components: small, reusable pieces that update automatically when data changes. This full course covers JSX, props, state, forms, effects and data fetching — then you build a complete study-tracker app.",
    whatYouLearn: [
      "Start a real React project with Vite",
      "JSX rules and thinking in components",
      "Props, state and one-way data flow",
      "Controlled forms and user input",
      "Fetch data from APIs with useEffect",
      "Build a complete interactive app",
    ],
    sections: [
      {
        title: "Thinking in React",
        lessons: [
          article("re-setup", "Setup with Vite & Your First Component", "11 min", `
<h3>🎯 Intro</h3>
<p>Real React projects use a build tool. <strong>Vite</strong> is today's fast standard — one command and you're coding.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>npm create vite@latest my-app</code> → choose React</li>
  <li><code>npm install</code> then <code>npm run dev</code> → live at localhost:5173</li>
  <li>Components live in .jsx files; <code>App.jsx</code> is your root</li>
</ul>
<h3>💻 Example</h3>
<pre><code>// src/App.jsx
function App() {
  const student = "Aye";
  return (
    &lt;div&gt;
      &lt;h1&gt;WebDev Academy&lt;/h1&gt;
      &lt;p&gt;Welcome back, {student}! Today is {new Date().toDateString()}.&lt;/p&gt;
    &lt;/div&gt;
  );
}

export default App;</code></pre>
<div class="callout">Anything inside <code>{ }</code> in JSX is live JavaScript — variables, math, function calls.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create the Vite app, then make App show your academy name and a lessons-completed number stored in a variable.</div>`),
          article("re-jsx", "JSX Rules You Must Know", "10 min", `
<h3>🎯 Intro</h3>
<p>JSX looks like HTML but has four rules that trip up every beginner. Learn them once, avoid hours of confusion.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Return <strong>one</strong> root element (wrap siblings in <code>&lt;&gt;...&lt;/&gt;</code>)</li>
  <li><code>className</code> instead of <code>class</code></li>
  <li>Every tag must close: <code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code></li>
  <li>Style takes an object: <code>style={{ color: "purple" }}</code></li>
</ul>
<h3>💻 Example</h3>
<pre><code>function Banner() {
  const urgent = true;
  return (
    &lt;&gt;
      &lt;h2 className="title"&gt;New course out!&lt;/h2&gt;
      &lt;p style={{ color: urgent ? "red" : "gray", fontWeight: 700 }}&gt;
        Enrollment closes soon &lt;br /&gt;
        Don't miss it
      &lt;/p&gt;
    &lt;/&gt;
  );
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a Profile component with an image, a styled name, and a bio — breaking none of the four rules.</div>`),
          article("re-components", "Components & Props", "13 min", `
<h3>🎯 Intro</h3>
<p>Components are functions that return markup; <strong>props</strong> are their arguments. Build small pieces, compose big apps.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Component names start with a Capital letter</li>
  <li>Props flow <strong>down</strong> parent → child, read-only</li>
  <li>Destructure them: <code>function Card({ title, hours })</code></li>
  <li><code>children</code> is whatever you nest inside the tag</li>
</ul>
<h3>💻 Example</h3>
<pre><code>function CourseCard({ title, hours, free }) {
  return (
    &lt;div className="card"&gt;
      &lt;h3&gt;{title}&lt;/h3&gt;
      &lt;p&gt;{hours} hours · {free ? "Free" : "Premium"}&lt;/p&gt;
    &lt;/div&gt;
  );
}

function App() {
  return (
    &lt;main&gt;
      &lt;CourseCard title="HTML Deep Dive" hours={4.5} free={true} /&gt;
      &lt;CourseCard title="React" hours={15} free={true} /&gt;
    &lt;/main&gt;
  );
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add an instructor prop to CourseCard and render four cards from your favorite courses.</div>`),
          quiz("re-quiz-1", "Quiz: React Foundations", [
            { q: "A React component is fundamentally...", options: ["A CSS file", "A function returning markup", "A database model", "An HTML template file"], answer: 1 },
            { q: "In JSX you set a CSS class with...", options: ["class", "className", "css", "styleClass"], answer: 1 },
            { q: "Props are...", options: ["Editable by the child", "Read-only inputs passed from the parent", "Global variables", "Only strings"], answer: 1 },
            { q: "Which starts a React project fastest today?", options: ["npm create vite@latest", "Writing webpack config by hand", "A PHP server", "Copying script tags"], answer: 0 },
          ]),
        ],
      },
      {
        title: "State & Interaction",
        lessons: [
          article("re-state", "State with useState", "14 min", `
<h3>🎯 Intro</h3>
<p>State is data that changes over time. When it changes, React re-renders the UI for you — no manual DOM updates, ever.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>const [value, setValue] = useState(initial)</code></li>
  <li>NEVER assign directly — always call the setter</li>
  <li>Each component instance gets its own state</li>
  <li>Updating from previous value: <code>setCount(c =&gt; c + 1)</code></li>
</ul>
<h3>💻 Example</h3>
<pre><code>import { useState } from "react";

function LessonTracker() {
  const [done, setDone] = useState(0);
  const total = 12;

  return (
    &lt;div&gt;
      &lt;h3&gt;Progress: {done}/{total} lessons&lt;/h3&gt;
      &lt;progress value={done} max={total} /&gt;
      &lt;button onClick={() =&gt; setDone(d =&gt; Math.min(d + 1, total))}&gt;
        Complete a lesson ✓
      &lt;/button&gt;
      {done === total &amp;&amp; &lt;p&gt;🎓 Course finished!&lt;/p&gt;}
    &lt;/div&gt;
  );
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a like button that toggles 🤍/❤️ with a boolean state, plus a counter showing total likes.</div>`),
          article("re-forms", "Forms & Controlled Inputs", "13 min", `
<h3>🎯 Intro</h3>
<p>In React, the input's value lives in state — the input just displays it. This is the <strong>controlled component</strong> pattern.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>value={text}</code> + <code>onChange={e =&gt; setText(e.target.value)}</code></li>
  <li>Submit with <code>onSubmit</code> on the form + <code>e.preventDefault()</code></li>
  <li>Validation is just JavaScript on the state</li>
</ul>
<h3>💻 Example</h3>
<pre><code>function Signup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const valid = email.includes("@");

  function handleSubmit(e) {
    e.preventDefault();
    if (valid) setSent(true);
  }

  if (sent) return &lt;p&gt;✅ Welcome aboard, {email}!&lt;/p&gt;;

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        value={email}
        onChange={(e) =&gt; setEmail(e.target.value)}
        placeholder="you@example.com"
      /&gt;
      &lt;button disabled={!valid}&gt;Join free&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a name field, require it to be non-empty, and show a live character count under it.</div>`),
          article("re-lists", "Lists, Keys & Conditional UI", "12 min", `
<h3>🎯 Intro</h3>
<p>Turning arrays into UI is React's bread and butter: <code>map</code> + a stable <code>key</code>, and show/hide with plain JavaScript.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>{items.map(item =&gt; &lt;Row key={item.id} ... /&gt;)}</code></li>
  <li>Keys must be stable and unique — use ids, not array index</li>
  <li>Conditional: <code>{cond &amp;&amp; &lt;X /&gt;}</code> or <code>{cond ? &lt;A /&gt; : &lt;B /&gt;}</code></li>
</ul>
<h3>💻 Example</h3>
<pre><code>const students = [
  { id: 1, name: "Aye", score: 85 },
  { id: 2, name: "Ko",  score: 55 },
  { id: 3, name: "Mya", score: 92 },
];

function ClassList({ passOnly }) {
  const shown = passOnly
    ? students.filter(s =&gt; s.score &gt;= 60)
    : students;

  return (
    &lt;ul&gt;
      {shown.map(s =&gt; (
        &lt;li key={s.id} style={{ color: s.score &gt;= 60 ? "green" : "red" }}&gt;
          {s.name} — {s.score} {s.score &gt;= 90 &amp;&amp; "🏆"}
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a button that toggles passOnly with state, and an "empty class" message when the filtered list is empty.</div>`),
          quiz("re-quiz-2", "Quiz: State & Interaction", [
            { q: "How do you update state?", options: ["Assign directly", "Call the setter from useState", "Edit the DOM", "Reload the page"], answer: 1 },
            { q: "A controlled input's value comes from...", options: ["The DOM", "State", "Props only", "localStorage"], answer: 1 },
            { q: "List keys should be...", options: ["Array indexes always", "Stable unique ids", "Random each render", "CSS classes"], answer: 1 },
            { q: "{score > 90 && <Badge />} renders Badge when...", options: ["Always", "score is exactly 90", "score is greater than 90", "Never"], answer: 2 },
          ]),
        ],
      },
      {
        title: "Effects, Data & Project",
        lessons: [
          article("re-effect", "useEffect & Fetching Data", "15 min", `
<h3>🎯 Intro</h3>
<p>Effects handle things <em>outside</em> rendering: fetching data, timers, titles. The dependency array controls when they run.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>useEffect(fn, [])</code> — run once after first render (perfect for fetch)</li>
  <li><code>useEffect(fn, [x])</code> — re-run when x changes</li>
  <li>Track loading and error states — users always see something</li>
</ul>
<h3>💻 Example</h3>
<pre><code>import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =&gt; {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(r =&gt; { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(data =&gt; setUsers(data))
      .catch(err =&gt; setError(err.message))
      .finally(() =&gt; setLoading(false));
  }, []);

  if (loading) return &lt;p&gt;Loading…&lt;/p&gt;;
  if (error)   return &lt;p&gt;⚠ {error}&lt;/p&gt;;

  return (
    &lt;ul&gt;
      {users.map(u =&gt; &lt;li key={u.id}&gt;{u.name} — {u.email}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> fetch /todos from the same API and show only incomplete ones, with a count in the heading.</div>`),
          article("re-project", "Final Project: Study Tracker App", "25 min", `
<h3>🎯 Intro</h3>
<p>Everything combined — components, props, state, forms, lists, conditional UI — in one complete app you can show off.</p>
<h3>📝 The task</h3>
<ul>
  <li>Add subjects with a form (controlled input)</li>
  <li>Mark them done / not done, delete them</li>
  <li>Show live progress and filter buttons</li>
</ul>
<h3>💻 Complete solution — study it, then build your own</h3>
<pre><code>import { useState } from "react";

function StudyTracker() {
  const [subjects, setSubjects] = useState([
    { id: 1, title: "HTML basics", done: true },
    { id: 2, title: "React state", done: false },
  ]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubjects(s =&gt; [...s, { id: Date.now(), title: text.trim(), done: false }]);
    setText("");
  }
  const toggle = (id) =&gt;
    setSubjects(s =&gt; s.map(x =&gt; x.id === id ? { ...x, done: !x.done } : x));
  const remove = (id) =&gt;
    setSubjects(s =&gt; s.filter(x =&gt; x.id !== id));

  const shown = subjects.filter(x =&gt;
    filter === "all" ? true : filter === "done" ? x.done : !x.done);
  const doneCount = subjects.filter(x =&gt; x.done).length;

  return (
    &lt;div&gt;
      &lt;h2&gt;📚 Study Tracker ({doneCount}/{subjects.length})&lt;/h2&gt;
      &lt;form onSubmit={add}&gt;
        &lt;input value={text} onChange={e =&gt; setText(e.target.value)}
               placeholder="New subject…" /&gt;
        &lt;button&gt;Add&lt;/button&gt;
      &lt;/form&gt;
      {["all", "todo", "done"].map(f =&gt; (
        &lt;button key={f} disabled={filter === f} onClick={() =&gt; setFilter(f)}&gt;
          {f}
        &lt;/button&gt;
      ))}
      &lt;ul&gt;
        {shown.map(s =&gt; (
          &lt;li key={s.id}&gt;
            &lt;label style={{ textDecoration: s.done ? "line-through" : "none" }}&gt;
              &lt;input type="checkbox" checked={s.done}
                     onChange={() =&gt; toggle(s.id)} /&gt;
              {s.title}
            &lt;/label&gt;
            &lt;button onClick={() =&gt; remove(s.id)}&gt;🗑&lt;/button&gt;
          &lt;/li&gt;
        ))}
      &lt;/ul&gt;
      {shown.length === 0 &amp;&amp; &lt;p&gt;Nothing here 🎉&lt;/p&gt;}
    &lt;/div&gt;
  );
}</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> persist subjects to localStorage with useEffect, add an edit button, and show a 🎓 banner at 100% done.</div>`),
          quiz("re-quiz-3", "Final Quiz: React", [
            { q: "useEffect(fn, []) runs...", options: ["Every render", "Once after the first render", "Never", "Only on unmount"], answer: 1 },
            { q: "To add an item to state, you should...", options: ["subjects.push(item)", "Create a NEW array: [...subjects, item]", "Edit the DOM", "Use a global variable"], answer: 1 },
            { q: "{ ...x, done: !x.done } creates...", options: ["A syntax error", "A copy of x with done flipped", "A deleted object", "A DOM node"], answer: 1 },
            { q: "Loading and error states exist so that...", options: ["Code looks longer", "Users always see meaningful UI while data arrives or fails", "React requires them", "SEO improves"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "vue-basics",
    title: "Vue.js Fundamentals",
    subtitle: "The progressive framework — gentle learning curve, powerful results.",
    instructor: "Diego Alvarez",
    category: "Frontend",
    level: "Beginner",
    rating: 4.7,
    ratings: 21300,
    students: 142000,
    hours: 6,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#35495e,#42b883)",
    icon: "V",
    description:
      "Vue lets you sprinkle reactivity onto HTML you already know. Learn templates, directives, and reactive data — many developers find it the friendliest framework to start with.",
    whatYouLearn: [
      "Reactive data with ref()",
      "Template directives: v-if, v-for, v-model",
      "Handling events with @click",
      "Computed properties",
    ],
    sections: [
      {
        title: "Vue Foundations",
        lessons: [
          article("vu-reactive", "Reactive Data & Templates", "11 min", `
<h3>🎯 Intro</h3>
<p>Change the data → the page updates. That's Vue's whole promise.</p>
<h3>💻 Example</h3>
<pre><code>&lt;script setup&gt;
import { ref } from "vue";
const count = ref(0);
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="count++"&gt;
    Clicked {{ count }} times
  &lt;/button&gt;
&lt;/template&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a second button that resets count to 0.</div>`),
          article("vu-directives", "v-if, v-for & v-model", "13 min", `
<h3>🎯 Intro</h3>
<p>Directives are HTML attributes with superpowers.</p>
<h3>💻 Example</h3>
<pre><code>&lt;script setup&gt;
import { ref } from "vue";
const newTask = ref("");
const tasks = ref(["Learn HTML", "Learn Vue"]);
function add() {
  if (newTask.value) tasks.value.push(newTask.value);
  newTask.value = "";
}
&lt;/script&gt;

&lt;template&gt;
  &lt;input v-model="newTask" @keyup.enter="add" placeholder="New task"&gt;
  &lt;p v-if="tasks.length === 0"&gt;Nothing to do 🎉&lt;/p&gt;
  &lt;ul&gt;
    &lt;li v-for="t in tasks" :key="t"&gt;{{ t }}&lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a delete button to each task using v-for's index.</div>`),
          quiz("vu-quiz", "Quiz: Vue", [
            { q: "ref(0) creates...", options: ["A constant", "Reactive data", "A DOM reference only", "A route"], answer: 1 },
            { q: "Which directive loops over a list?", options: ["v-loop", "v-each", "v-for", "v-map"], answer: 2 },
            { q: "v-model on an input gives you...", options: ["Validation", "Two-way binding", "Styling", "Autocomplete"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "jquery-basics",
    title: "jQuery Quick Start",
    subtitle: "Still on millions of sites — select, style and animate the DOM with one-liners.",
    instructor: "Sara Mitchell",
    category: "Frontend",
    level: "Beginner",
    rating: 4.4,
    ratings: 17800,
    students: 132000,
    hours: 3.5,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#0769ad,#7acef4)",
    icon: "jQ",
    description:
      "You'll meet jQuery in countless existing projects. Learn the $ selector, event handling, and DOM manipulation so legacy code never scares you.",
    whatYouLearn: [
      "Select elements with $(css-selector)",
      "React to clicks and form events",
      "Change content, classes and visibility",
      "Know when NOT to use jQuery",
    ],
    sections: [
      {
        title: "jQuery Foundations",
        lessons: [
          article("jq-select", "The $ Function", "9 min", `
<h3>🎯 Intro</h3>
<p>jQuery's big idea: select with CSS syntax, then chain actions.</p>
<h3>💻 Example</h3>
<pre><code>&lt;p class="note"&gt;Hello&lt;/p&gt;
&lt;button id="btn"&gt;Click me&lt;/button&gt;

&lt;script src="https://code.jquery.com/jquery-3.7.1.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  $("#btn").on("click", function () {
    $(".note").text("Clicked!").css("color", "purple").fadeOut(500).fadeIn(500);
  });
&lt;/script&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make a button that toggles a "dark" class on the body (hint: .toggleClass()).</div>`),
          article("jq-modern", "jQuery vs Modern JavaScript", "8 min", `
<h3>🎯 Intro</h3>
<p>Everything jQuery does, modern browsers now do natively. Learn the translations so you can read old code and write new code.</p>
<h3>💻 Example</h3>
<pre><code>// jQuery                    // Modern JS
$("#btn")                    document.querySelector("#btn")
$(".item")                   document.querySelectorAll(".item")
$el.text("hi")               el.textContent = "hi"
$el.addClass("on")           el.classList.add("on")
$el.on("click", fn)          el.addEventListener("click", fn)</code></pre>
<div class="callout tip">New project? Plain JavaScript is usually enough. Old project? Now you speak both.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> take the previous lesson's example and rewrite it without jQuery.</div>`),
          quiz("jq-quiz", "Quiz: jQuery", [
            { q: "$(\".card\") selects...", options: ["The first .card only", "All elements with class card", "An id of card", "Nothing"], answer: 1 },
            { q: "The modern equivalent of $el.addClass(\"on\") is...", options: ["el.class = 'on'", "el.classList.add('on')", "el.addClass('on')", "el.setAttribute('on')"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "bootstrap-basics",
    title: "Bootstrap & CSS Frameworks",
    subtitle: "Ship polished, responsive pages in hours using ready-made components.",
    instructor: "Diego Alvarez",
    category: "Frontend",
    level: "Beginner",
    rating: 4.5,
    ratings: 24500,
    students: 178000,
    hours: 4,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#712cf9,#9461fb)",
    icon: "B",
    description:
      "CSS frameworks like Bootstrap and W3.CSS give you professional buttons, cards, navbars and a responsive grid — just by adding classes. Perfect for prototypes and real projects alike.",
    whatYouLearn: [
      "Add Bootstrap with one CDN link",
      "The 12-column responsive grid",
      "Ready components: buttons, cards, navbars, alerts",
      "Utility classes for spacing and color",
    ],
    sections: [
      {
        title: "Framework Foundations",
        lessons: [
          article("bs-setup", "Setup & the Grid", "11 min", `
<h3>🎯 Intro</h3>
<p>Bootstrap's grid divides the page into 12 columns that rearrange on small screens.</p>
<h3>💻 Example</h3>
<pre><code>&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"&gt;

&lt;div class="container"&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-md-8"&gt;Main content&lt;/div&gt;
    &lt;div class="col-md-4"&gt;Sidebar&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<div class="callout">col-md-8 = 8 of 12 columns on medium+ screens; on phones both stack full-width automatically.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a 3-column pricing row that stacks on mobile (col-md-4 × 3).</div>`),
          article("bs-components", "Components & Utilities", "12 min", `
<h3>🎯 Intro</h3>
<p>Buttons, cards, alerts — copy the classes, get the design.</p>
<h3>💻 Example</h3>
<pre><code>&lt;button class="btn btn-primary"&gt;Enroll now&lt;/button&gt;
&lt;button class="btn btn-outline-secondary"&gt;Preview&lt;/button&gt;

&lt;div class="card mt-3" style="width:18rem"&gt;
  &lt;div class="card-body"&gt;
    &lt;h5 class="card-title"&gt;HTML Course&lt;/h5&gt;
    &lt;p class="card-text text-muted"&gt;Learn the skeleton of the web.&lt;/p&gt;
    &lt;a href="#" class="btn btn-primary"&gt;Start&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div class="alert alert-success mt-3"&gt;Lesson complete! 🎉&lt;/div&gt;</code></pre>
<div class="callout tip">Utilities: <code>mt-3</code> = margin-top, <code>p-2</code> = padding, <code>text-center</code>, <code>d-flex</code>… tiny classes, no custom CSS.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> recreate one of this site's course cards using Bootstrap card classes.</div>`),
          quiz("bs-quiz", "Quiz: Bootstrap", [
            { q: "Bootstrap's grid has how many columns?", options: ["10", "12", "16", "Unlimited"], answer: 1 },
            { q: "btn btn-primary gives you...", options: ["A form", "A styled button", "A nav bar", "An error"], answer: 1 },
            { q: "mt-3 is a utility for...", options: ["Font size", "Margin-top", "Max width", "Mobile only"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "node-express",
    title: "Node.js & Express",
    subtitle: "JavaScript on the server — build the APIs that power real apps.",
    instructor: "Ko Zaw",
    category: "Backend",
    level: "Intermediate",
    rating: 4.7,
    ratings: 29400,
    students: 201000,
    hours: 13,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#215732,#68a063)",
    icon: "⬢",
    description:
      "The JavaScript you already know, now running servers. This full course covers Node's runtime, modules, npm and the file system, then builds up Express routing, middleware and a complete CRUD API — the exact backend skills that pair with React.",
    whatYouLearn: [
      "Run JavaScript outside the browser and use npm",
      "Organize code with modules",
      "Read and write files with fs",
      "Build Express routes with params and queries",
      "Understand middleware and handle JSON bodies",
      "Ship a complete CRUD API with proper status codes",
    ],
    sections: [
      {
        title: "Node Foundations",
        lessons: [
          article("nd-hello", "Node, npm & Your First Script", "11 min", `
<h3>🎯 Intro</h3>
<p>Node runs JavaScript directly on your computer — the same language you know from the browser, now with access to files, networks and the operating system.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Install from <strong>nodejs.org</strong> (LTS version); check with <code>node --version</code></li>
  <li>Run any file: <code>node app.js</code></li>
  <li><code>npm init -y</code> creates <code>package.json</code> — your project's ID card</li>
  <li><code>npm install &lt;package&gt;</code> downloads into <code>node_modules</code></li>
</ul>
<h3>💻 Example</h3>
<pre><code>// info.js
const os = require("os");

console.log("Node version:", process.version);
console.log("Platform:", os.platform());
console.log("CPU cores:", os.cpus().length);
console.log("Free memory:", Math.round(os.freemem() / 1e6), "MB");

// terminal:
//   node info.js</code></pre>
<div class="callout tip">Add <code>"start": "node app.js"</code> under scripts in package.json — then <code>npm start</code> runs your app the standard way.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a script that prints today's date, your username (os.userInfo().username), and how long the computer has been on (os.uptime(), in hours).</div>`),
          article("nd-modules", "Modules: Splitting Your Code", "11 min", `
<h3>🎯 Intro</h3>
<p>Real projects are many small files, not one giant one. Modules let files share functions cleanly.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Export: <code>module.exports = { fn1, fn2 }</code></li>
  <li>Import: <code>const { fn1 } = require("./myfile")</code> — note the <code>./</code></li>
  <li>No <code>./</code> means npm package or built-in (express, os, fs)</li>
  <li>Each module's variables are private unless exported</li>
</ul>
<h3>💻 Example</h3>
<pre><code>// math.js
function add(a, b) { return a + b; }
function average(list) {
  return list.reduce((s, x) =&gt; s + x, 0) / list.length;
}
module.exports = { add, average };

// app.js
const { add, average } = require("./math");

console.log(add(3, 4));                 // 7
console.log(average([75, 92, 58]));     // 75</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create text.js exporting shout(s) (uppercase + "!") and initials(fullName); use both from app.js.</div>`),
          article("nd-fs", "Files with the fs Module", "12 min", `
<h3>🎯 Intro</h3>
<p>Servers constantly read and write files: configs, logs, uploads, data. Node's <code>fs</code> module handles it all.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>fs.readFileSync / fs.writeFileSync</code> — simple, blocking versions</li>
  <li><code>JSON.parse / JSON.stringify</code> turn files into data and back</li>
  <li>Wrap reads in try/catch — files may not exist yet</li>
</ul>
<h3>💻 Example</h3>
<pre><code>const fs = require("fs");

// save data
const students = [{ name: "Aye", score: 85 }, { name: "Ko", score: 55 }];
fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

// load data safely
function load() {
  try {
    return JSON.parse(fs.readFileSync("students.json", "utf-8"));
  } catch (e) {
    return [];   // first run — no file yet
  }
}

const data = load();
console.log(\`Loaded \${data.length} students\`);</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a tiny visit counter: read count.json, add 1, save it back, print "Visit #N". Run it three times.</div>`),
          quiz("nd-quiz-1", "Quiz: Node Foundations", [
            { q: "npm install express does what?", options: ["Runs the server", "Downloads the package into node_modules", "Creates routes", "Compiles JS"], answer: 1 },
            { q: "require(\"./math\") vs require(\"express\") — the ./ means...", options: ["Nothing", "A local file in your project", "A global install", "A URL"], answer: 1 },
            { q: "JSON.stringify(data, null, 2) produces...", options: ["Compressed JSON", "Pretty-printed JSON text", "A JavaScript object", "A file handle"], answer: 1 },
            { q: "Reading a file that doesn't exist...", options: ["Returns null", "Returns \"\"", "Throws an error you should catch", "Creates the file"], answer: 2 },
          ]),
        ],
      },
      {
        title: "Express Essentials",
        lessons: [
          article("nd-express", "Your First Express Server", "13 min", `
<h3>🎯 Intro</h3>
<p>Express maps URLs to functions — that's the whole idea. A route says: "when this URL is requested, run this code."</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>npm install express</code>, then create the app and listen on a port</li>
  <li><code>app.get(path, handler)</code> — handler gets <code>(req, res)</code></li>
  <li><code>res.json()</code> for data, <code>res.send()</code> for text/HTML</li>
</ul>
<h3>💻 Example</h3>
<pre><code>const express = require("express");
const app = express();

app.get("/", (req, res) =&gt; {
  res.send("&lt;h1&gt;WebDev Academy API&lt;/h1&gt;");
});

app.get("/api/health", (req, res) =&gt; {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.listen(3000, () =&gt;
  console.log("Running at http://localhost:3000"));</code></pre>
<div class="callout">Test in the browser, or from a terminal: <code>curl http://localhost:3000/api/health</code></div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add /api/about returning JSON with your academy's name and version, and a /bye route that sends plain text.</div>`),
          article("nd-routes", "Route Params & Query Strings", "13 min", `
<h3>🎯 Intro</h3>
<p>Real URLs carry information: <code>/api/courses/3</code>, <code>/search?q=html</code>. Express parses both for you.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>/:id</code> in the path → <code>req.params.id</code> (always a string!)</li>
  <li><code>?q=html&amp;limit=5</code> → <code>req.query.q</code>, <code>req.query.limit</code></li>
  <li>Missing things deserve a <code>404</code>, not a crash</li>
</ul>
<h3>💻 Example</h3>
<pre><code>const courses = [
  { id: 1, title: "HTML Deep Dive" },
  { id: 2, title: "React Fundamentals" },
  { id: 3, title: "Node & Express" },
];

app.get("/api/courses/:id", (req, res) =&gt; {
  const course = courses.find(c =&gt; c.id === Number(req.params.id));
  if (!course) return res.status(404).json({ error: "Not found" });
  res.json(course);
});

app.get("/api/search", (req, res) =&gt; {
  const q = (req.query.q || "").toLowerCase();
  res.json(courses.filter(c =&gt; c.title.toLowerCase().includes(q)));
});</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add ?limit=N support to /api/search using .slice(0, limit) with a sensible default.</div>`),
          article("nd-middleware", "Middleware & POST Bodies", "14 min", `
<h3>🎯 Intro</h3>
<p>Middleware are functions that run <em>before</em> your routes — logging, auth, parsing. They're Express's superpower.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>app.use(fn)</code> runs fn for every request; call <code>next()</code> to continue</li>
  <li><code>app.use(express.json())</code> parses JSON bodies into <code>req.body</code></li>
  <li>Validate input and answer <code>400</code> for bad requests</li>
</ul>
<h3>💻 Example</h3>
<pre><code>app.use(express.json());

// logger middleware
app.use((req, res, next) =&gt; {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

app.post("/api/courses", (req, res) =&gt; {
  const { title } = req.body;
  if (!title || title.trim().length &lt; 3) {
    return res.status(400).json({ error: "title (3+ chars) required" });
  }
  const course = { id: Date.now(), title: title.trim() };
  courses.push(course);
  res.status(201).json(course);
});</code></pre>
<div class="callout tip">Status codes tell the story: 200 OK, 201 Created, 400 bad input, 404 missing, 500 server error.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write middleware that adds req.requestTime = Date.now(), and a route that reports how old the request is.</div>`),
          quiz("nd-quiz-2", "Quiz: Express", [
            { q: "req.params.id from /courses/:id is...", options: ["A number", "Always a string", "An object", "undefined"], answer: 1 },
            { q: "Which middleware fills req.body for JSON?", options: ["express.static()", "express.json()", "body.get()", "None needed"], answer: 1 },
            { q: "Creating a resource successfully should return status...", options: ["200", "201", "301", "404"], answer: 1 },
            { q: "A middleware that never calls next()...", options: ["Speeds things up", "Leaves the request hanging unless it responds itself", "Crashes Express", "Is ignored"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Project: Complete CRUD API",
        lessons: [
          article("nd-crud", "Build the Courses API (Full CRUD)", "22 min", `
<h3>🎯 Intro</h3>
<p>Create, Read, Update, Delete — every real backend is built on these four. Here's a complete, correct API in ~50 lines.</p>
<h3>💻 Complete solution — study it, then build yours</h3>
<pre><code>const express = require("express");
const app = express();
app.use(express.json());

let courses = [{ id: 1, title: "HTML Deep Dive", hours: 4.5 }];
let nextId = 2;

// READ all + READ one
app.get("/api/courses", (req, res) =&gt; res.json(courses));
app.get("/api/courses/:id", (req, res) =&gt; {
  const c = courses.find(x =&gt; x.id === Number(req.params.id));
  if (!c) return res.status(404).json({ error: "Not found" });
  res.json(c);
});

// CREATE
app.post("/api/courses", (req, res) =&gt; {
  const { title, hours } = req.body;
  if (!title) return res.status(400).json({ error: "title required" });
  const c = { id: nextId++, title, hours: Number(hours) || 0 };
  courses.push(c);
  res.status(201).json(c);
});

// UPDATE
app.put("/api/courses/:id", (req, res) =&gt; {
  const c = courses.find(x =&gt; x.id === Number(req.params.id));
  if (!c) return res.status(404).json({ error: "Not found" });
  if (req.body.title) c.title = req.body.title;
  if (req.body.hours !== undefined) c.hours = Number(req.body.hours);
  res.json(c);
});

// DELETE
app.delete("/api/courses/:id", (req, res) =&gt; {
  const before = courses.length;
  courses = courses.filter(x =&gt; x.id !== Number(req.params.id));
  if (courses.length === before)
    return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

app.listen(3000, () =&gt; console.log("API ready on :3000"));</code></pre>
<h3>🧪 Test it</h3>
<pre><code>curl http://localhost:3000/api/courses
curl -X POST -H "Content-Type: application/json" \\
     -d '{"title":"React","hours":15}' \\
     http://localhost:3000/api/courses
curl -X DELETE http://localhost:3000/api/courses/1</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> persist courses to courses.json with fs on every change (load at startup), and add ?q= search to the list route. Bonus: connect it to your React Study Tracker!</div>`),
          quiz("nd-quiz-3", "Final Quiz: Node & Express", [
            { q: "CRUD stands for...", options: ["Code, Run, Update, Debug", "Create, Read, Update, Delete", "Connect, Route, Use, Deploy", "None"], answer: 1 },
            { q: "Which HTTP method conventionally updates an existing resource?", options: ["GET", "POST", "PUT", "DELETE"], answer: 2 },
            { q: "res.status(204).end() means...", options: ["Error", "Success with no body to return", "Redirect", "Timeout"], answer: 1 },
            { q: "Why Number(req.params.id)?", options: ["Style preference", "Params are strings; the ids are numbers — types must match for ===", "Express requires it", "It validates auth"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "php-basics",
    title: "PHP for the Web",
    subtitle: "The language running most of the web — WordPress, Laravel, and millions of sites.",
    instructor: "Aung Kyaw",
    category: "Backend",
    level: "Beginner",
    rating: 4.4,
    ratings: 19700,
    students: 154000,
    hours: 6,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#4f5b93,#8892bf)",
    icon: "🐘",
    description:
      "PHP generates HTML on the server and talks to databases with ease. It powers WordPress (40% of the web) — learning it opens a huge job market.",
    whatYouLearn: [
      "Embed PHP inside HTML",
      "Variables, arrays and loops",
      "Handle form submissions ($_POST)",
      "Structure code with functions and includes",
    ],
    sections: [
      {
        title: "PHP Foundations",
        lessons: [
          article("php-hello", "PHP Inside HTML", "10 min", `
<h3>🎯 Intro</h3>
<p>PHP runs on the server and prints into your HTML before the browser sees it.</p>
<h3>💻 Example</h3>
<pre><code>&lt;?php
$name = "Moe";
$courses = ["HTML", "CSS", "PHP"];
?&gt;
&lt;h1&gt;Welcome, &lt;?= $name ?&gt;!&lt;/h1&gt;
&lt;ul&gt;
&lt;?php foreach ($courses as $c): ?&gt;
  &lt;li&gt;&lt;?= $c ?&gt;&lt;/li&gt;
&lt;?php endforeach; ?&gt;
&lt;/ul&gt;</code></pre>
<div class="callout">Run locally with <code>php -S localhost:8000</code> — no other server needed.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> print a price list from an associative array of item =&gt; price.</div>`),
          article("php-forms", "Handling Forms", "12 min", `
<h3>🎯 Intro</h3>
<p>Forms POST to a PHP file; <code>$_POST</code> holds the values. Always escape output!</p>
<h3>💻 Example</h3>
<pre><code>&lt;form method="post"&gt;
  &lt;input name="username" required&gt;
  &lt;button&gt;Register&lt;/button&gt;
&lt;/form&gt;

&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user = htmlspecialchars($_POST["username"] ?? "");
    echo "&lt;p&gt;Welcome, " . $user . "!&lt;/p&gt;";
}
?&gt;</code></pre>
<div class="callout tip"><code>htmlspecialchars()</code> stops users injecting HTML/scripts into your page — never skip it.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add an email field and print both values back safely after submit.</div>`),
          quiz("php-quiz", "Quiz: PHP", [
            { q: "<?= $name ?> is shorthand for...", options: ["A comment", "echo $name", "A variable declaration", "An import"], answer: 1 },
            { q: "Submitted form values arrive in...", options: ["$_FORM", "$_DATA", "$_POST", "$input"], answer: 2 },
            { q: "htmlspecialchars() protects against...", options: ["Slow queries", "HTML/script injection (XSS)", "Typos", "Large uploads"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "django-basics",
    title: "Django Essentials",
    subtitle: "Python's batteries-included web framework — admin panel and database out of the box.",
    instructor: "Su Myat",
    category: "Backend",
    level: "Intermediate",
    rating: 4.6,
    ratings: 16800,
    students: 112000,
    hours: 7,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#092e20,#44b78b)",
    icon: "dj",
    description:
      "Django gives you routing, database models, templates AND a free admin interface. Learn the model-view-template flow that ships real products fast.",
    whatYouLearn: [
      "Start a project and app with manage.py",
      "Define database models in Python",
      "URL routes and views",
      "Render templates with data",
    ],
    sections: [
      {
        title: "Django Foundations",
        lessons: [
          article("dj-start", "Project, App & First View", "12 min", `
<h3>🎯 Intro</h3>
<p>Django projects contain apps; each app owns its models, views and URLs.</p>
<h3>💻 Example</h3>
<pre><code># terminal
pip install django
django-admin startproject academy
cd academy
python manage.py startapp courses
python manage.py runserver

# courses/views.py
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to WebDev Academy!")

# academy/urls.py
from courses import views
urlpatterns = [ path("", views.home) ]</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add an /about view returning your academy's description.</div>`),
          article("dj-models", "Models & the Free Admin", "14 min", `
<h3>🎯 Intro</h3>
<p>Describe your data as a Python class — Django creates the database table AND an admin UI for it.</p>
<h3>💻 Example</h3>
<pre><code># courses/models.py
from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=100)
    hours = models.FloatField()
    free  = models.BooleanField(default=True)

    def __str__(self):
        return self.title

# terminal
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser   # then visit /admin ✨</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> register Course in courses/admin.py and add two courses through the admin panel.</div>`),
          quiz("dj-quiz", "Quiz: Django", [
            { q: "Which command starts the dev server?", options: ["django run", "python manage.py runserver", "npm start", "django serve"], answer: 1 },
            { q: "A Django model maps to...", options: ["A CSS file", "A database table", "A URL", "A template"], answer: 1 },
            { q: "The admin interface is...", options: ["A paid add-on", "Built in — enable and go to /admin", "Only for superusers' code", "Deprecated"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "laravel-basics",
    title: "Laravel Essentials",
    subtitle: "PHP's most elegant framework — expressive routing, Eloquent ORM, artisan magic.",
    instructor: "Aung Kyaw",
    category: "Backend",
    level: "Intermediate",
    rating: 4.6,
    ratings: 14100,
    students: 96000,
    hours: 7,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#ff2d20,#ff6b5e)",
    icon: "L",
    description:
      "Laravel makes PHP development a pleasure: clean routes, the Eloquent ORM for databases, and Blade templates. It's the top choice for modern PHP teams.",
    whatYouLearn: [
      "Create a project with composer",
      "Routes and controllers",
      "Eloquent models and migrations",
      "Blade templates",
    ],
    sections: [
      {
        title: "Laravel Foundations",
        lessons: [
          article("lv-routes", "Routes & Blade", "12 min", `
<h3>🎯 Intro</h3>
<p>Laravel routes read like documentation; Blade templates keep HTML clean.</p>
<h3>💻 Example</h3>
<pre><code>// routes/web.php
Route::get("/", function () {
    $courses = ["HTML", "CSS", "Laravel"];
    return view("home", ["courses" =&gt; $courses]);
});

&lt;!-- resources/views/home.blade.php --&gt;
&lt;h1&gt;Our Courses&lt;/h1&gt;
&lt;ul&gt;
  @foreach ($courses as $c)
    &lt;li&gt;{{ $c }}&lt;/li&gt;
  @endforeach
&lt;/ul&gt;</code></pre>
<div class="callout">Start a project: <code>composer create-project laravel/laravel academy</code> then <code>php artisan serve</code></div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a /contact route rendering a Blade view with your academy's email.</div>`),
          article("lv-eloquent", "Eloquent Models", "13 min", `
<h3>🎯 Intro</h3>
<p>Eloquent turns database rows into friendly PHP objects.</p>
<h3>💻 Example</h3>
<pre><code># terminal
php artisan make:model Course -m   # model + migration

// database/migrations/..._create_courses_table.php
$table-&gt;string("title");
$table-&gt;float("hours");

# terminal
php artisan migrate

// anywhere in your app
$course = Course::create(["title" =&gt; "Laravel", "hours" =&gt; 7]);
$all    = Course::all();
$long   = Course::where("hours", "&gt;", 5)-&gt;get();</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create a Student model with name and score, migrate, and insert two rows with tinker.</div>`),
          quiz("lv-quiz", "Quiz: Laravel", [
            { q: "Laravel projects are created with...", options: ["npm", "composer", "pip", "gem"], answer: 1 },
            { q: "{{ $name }} in Blade...", options: ["Echoes the value, escaped", "Declares a variable", "Is a comment", "Imports a file"], answer: 0 },
            { q: "Course::where(\"hours\", \">\", 5)->get() is...", options: ["Raw SQL", "An Eloquent query", "A Blade directive", "Invalid"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "sql-basics",
    title: "SQL Fundamentals",
    subtitle: "Ask questions, get answers — the universal language of data.",
    instructor: "Dr. Ei Mon",
    category: "Databases",
    level: "Beginner",
    rating: 4.8,
    ratings: 38200,
    students: 289000,
    hours: 5,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#00618a,#5aa8c9)",
    icon: "SQL",
    description:
      "Every serious application stores data in a database, and SQL is how you talk to it. SELECT, WHERE, JOIN — learn the queries you'll use for the rest of your career.",
    whatYouLearn: [
      "SELECT with WHERE, ORDER BY and LIMIT",
      "INSERT, UPDATE, DELETE safely",
      "Aggregate with COUNT, SUM, GROUP BY",
      "Combine tables with JOIN",
    ],
    sections: [
      {
        title: "Query Foundations",
        lessons: [
          article("sql-select", "SELECT: Asking Questions", "11 min", `
<h3>🎯 Intro</h3>
<p>A query describes <em>what</em> you want; the database figures out how to get it.</p>
<h3>💻 Example</h3>
<pre><code>SELECT name, score
FROM students
WHERE score &gt;= 60
ORDER BY score DESC
LIMIT 5;

-- top 5 passing students, best first</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a query for the 3 cheapest products under 10000 from a products(name, price) table.</div>`),
          article("sql-crud", "INSERT, UPDATE, DELETE", "10 min", `
<h3>🎯 Intro</h3>
<p>Changing data is easy — dangerously easy. The WHERE clause is your seatbelt.</p>
<h3>💻 Example</h3>
<pre><code>INSERT INTO students (name, score) VALUES ("Hla", 72);

UPDATE students SET score = 80 WHERE name = "Hla";

DELETE FROM students WHERE score &lt; 20;

-- ⚠ UPDATE/DELETE without WHERE touches EVERY row!</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> insert three students, raise one score by 10, then delete one by name.</div>`),
          article("sql-join", "GROUP BY & JOIN", "14 min", `
<h3>🎯 Intro</h3>
<p>JOIN combines tables; GROUP BY summarizes. Together they answer real business questions.</p>
<h3>💻 Example</h3>
<pre><code>-- how many students per course?
SELECT c.title, COUNT(e.student_id) AS students
FROM courses c
JOIN enrollments e ON e.course_id = c.id
GROUP BY c.title
ORDER BY students DESC;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a query for total sales per city from orders(city, amount).</div>`),
          quiz("sql-quiz", "Quiz: SQL", [
            { q: "Which clause filters rows?", options: ["FILTER", "WHERE", "HAVING only", "LIMIT"], answer: 1 },
            { q: "DELETE FROM users; (no WHERE) does what?", options: ["Deletes one row", "Errors", "Deletes ALL rows", "Nothing"], answer: 2 },
            { q: "JOIN is used to...", options: ["Merge databases", "Combine rows from related tables", "Create indexes", "Backup data"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "rdbms-basics",
    title: "MySQL & PostgreSQL in Practice",
    subtitle: "The two databases behind most of the internet — set up, connect, and work like a pro.",
    instructor: "Dr. Ei Mon",
    category: "Databases",
    level: "Intermediate",
    rating: 4.5,
    ratings: 12600,
    students: 84000,
    hours: 5,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#00758f,#336791)",
    icon: "🗄️",
    description:
      "SQL is the language; MySQL and PostgreSQL are the engines. Learn their differences, create databases and users, and design sensible tables with keys.",
    whatYouLearn: [
      "Create databases, tables and users",
      "Choose column types wisely",
      "Primary and foreign keys",
      "MySQL vs PostgreSQL: when to pick which",
    ],
    sections: [
      {
        title: "Working with Real Engines",
        lessons: [
          article("db-create", "Databases, Tables & Keys", "13 min", `
<h3>🎯 Intro</h3>
<p>Good table design prevents 90% of future pain. Keys are how tables relate.</p>
<h3>💻 Example</h3>
<pre><code>CREATE DATABASE academy;

CREATE TABLE courses (
  id     SERIAL PRIMARY KEY,        -- MySQL: INT AUTO_INCREMENT
  title  VARCHAR(100) NOT NULL,
  hours  DECIMAL(4,1)
);

CREATE TABLE enrollments (
  id         SERIAL PRIMARY KEY,
  course_id  INT REFERENCES courses(id),   -- foreign key
  student    VARCHAR(100),
  enrolled_at TIMESTAMP DEFAULT NOW()
);</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> design a reviews table linked to courses with a rating column limited 1–5 (hint: CHECK).</div>`),
          article("db-vs", "MySQL vs PostgreSQL", "9 min", `
<h3>🎯 Intro</h3>
<p>Both are excellent. Knowing their flavors helps you fit into any team.</p>
<h3>📝 Summary</h3>
<ul>
  <li><strong>MySQL</strong> — everywhere in web hosting, pairs with PHP/WordPress, very fast reads</li>
  <li><strong>PostgreSQL</strong> — strictest SQL standard, rich types (JSONB, arrays), loved for complex apps</li>
  <li>Same core SQL — your skills transfer both ways</li>
</ul>
<h3>💻 Example</h3>
<pre><code>-- PostgreSQL bonus: query inside JSON
SELECT data-&gt;&gt;'city' AS city
FROM users
WHERE data-&gt;&gt;'plan' = 'pro';</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> install one of them (or use a free cloud instance) and run the courses table from the previous lesson.</div>`),
          quiz("db-quiz", "Quiz: MySQL & PostgreSQL", [
            { q: "A PRIMARY KEY...", options: ["Speeds up backups", "Uniquely identifies each row", "Encrypts the table", "Is optional in every design"], answer: 1 },
            { q: "A FOREIGN KEY does what?", options: ["Links a row to a row in another table", "Makes a column unique", "Creates an index only", "Renames a table"], answer: 0 },
            { q: "JSONB columns are a specialty of...", options: ["MySQL", "PostgreSQL", "Both equally", "Neither"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "mongodb-basics",
    title: "MongoDB Basics",
    subtitle: "The leading NoSQL database — store data as flexible JSON-like documents.",
    instructor: "Ko Zaw",
    category: "Databases",
    level: "Beginner",
    rating: 4.5,
    ratings: 15900,
    students: 108000,
    hours: 4.5,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#116149,#4faa41)",
    icon: "🍃",
    description:
      "MongoDB stores documents, not rows — a natural fit for JavaScript apps. Learn CRUD operations, queries, and when to choose NoSQL over SQL.",
    whatYouLearn: [
      "Documents and collections vs rows and tables",
      "insertOne, find, updateOne, deleteOne",
      "Query operators: $gt, $in, $regex",
      "When MongoDB fits (and when it doesn't)",
    ],
    sections: [
      {
        title: "Document Database Foundations",
        lessons: [
          article("mg-crud", "Documents & CRUD", "12 min", `
<h3>🎯 Intro</h3>
<p>A document is JSON with superpowers. No fixed schema — each document can differ.</p>
<h3>💻 Example</h3>
<pre><code>db.courses.insertOne({
  title: "MongoDB Basics",
  hours: 4.5,
  tags: ["database", "nosql"]
});

db.courses.find({ hours: { $lt: 6 } });

db.courses.updateOne(
  { title: "MongoDB Basics" },
  { $set: { hours: 5 } }
);

db.courses.deleteOne({ title: "Old Course" });</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> insert three students with a scores array, then find those whose name starts with "A" ($regex).</div>`),
          article("mg-when", "SQL or NoSQL?", "9 min", `
<h3>🎯 Intro</h3>
<p>Choosing a database is an engineering decision, not fashion.</p>
<h3>📝 Summary</h3>
<ul>
  <li><strong>Choose SQL</strong> when data is highly relational: orders ↔ customers ↔ payments, strict consistency</li>
  <li><strong>Choose MongoDB</strong> for flexible/evolving shapes: content, catalogs, event logs, fast prototypes</li>
  <li>Many real systems use both, side by side</li>
</ul>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> for your own app idea, list its 3 main data types and argue SQL or Mongo for each.</div>`),
          quiz("mg-quiz", "Quiz: MongoDB", [
            { q: "MongoDB stores data as...", options: ["Rows in tables", "JSON-like documents", "Plain text files", "Key-value pairs only"], answer: 1 },
            { q: "{ hours: { $lt: 6 } } finds documents where hours is...", options: ["Equal to 6", "Less than 6", "At least 6", "Missing"], answer: 1 },
            { q: "Strictly relational money data (orders/payments) usually fits best in...", options: ["MongoDB", "A SQL database", "Text files", "Cookies"], answer: 1 },
          ]),
        ],
      },
    ],
  },
];

/* Expose to the app */
window.APP_DATA = { CATEGORIES, COURSES };
