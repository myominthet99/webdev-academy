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
    hours: 9,
    price: "Free",
    free: false,
    color: "linear-gradient(135deg,#2193b0,#6dd5ed)",
    icon: "{ }",
    description:
      "Modern CSS is powerful and fun. In this focused course you'll master Flexbox, Grid, custom properties, transitions and keyframe animations — the toolkit for professional-looking interfaces.",
    whatYouLearn: [
      "Build complex layouts with Grid & Flexbox",
      "Use CSS variables for maintainable themes",
      "Create smooth transitions and keyframe animations",
      "Make anything responsive with modern techniques",
    ],
    sections: [
      {
        title: "Modern CSS Foundations",
        lessons: [
          video("cm-vars", "CSS Custom Properties (Variables)", "9 min", `
<p>Custom properties let you define reusable values — perfect for theming.</p>
<pre><code>:root {
  --brand: #a435f0;
  --gap: 16px;
}
.button { background: var(--brand); padding: var(--gap); }</code></pre>
<div class="callout tip">Change one variable in <code>:root</code> and it updates everywhere — the foundation of dark mode and design systems.</div>`),
          video("cm-transitions", "Transitions & Animations", "12 min", `
<h3>Transitions</h3>
<pre><code>.card {
  transition: transform .2s ease, box-shadow .2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,.15);
}</code></pre>
<h3>Keyframe animations</h3>
<pre><code>@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: .4; }
}
.badge { animation: pulse 1.5s infinite; }</code></pre>
<div class="callout">Subtle motion guides attention. Keep durations short (150–300ms) for UI feedback.</div>`),
          quiz("cm-quiz", "Quiz: Modern CSS", [
            {
              q: "Where are global CSS variables usually declared?",
              options: [":root", "body", "@media", "*"],
              answer: 0,
            },
            {
              q: "Which property animates changes smoothly on hover?",
              options: ["animation", "transition", "transform", "keyframes"],
              answer: 1,
            },
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
<p>Add JavaScript to a page just before the closing <code>&lt;/body&gt;</code> tag:</p>
<pre><code>&lt;script src="app.js"&gt;&lt;/script&gt;</code></pre>
<p>In <code>app.js</code>:</p>
<pre><code>console.log("Hello from JavaScript!");
alert("The page is alive!");</code></pre>
<div class="callout tip">Open DevTools (F12) → Console tab to see your logs.</div>`),
          video("je-loops", "Loops", "10 min", `
<p>Loops repeat work without copy-paste.</p>
<pre><code>for (let i = 1; i &lt;= 5; i++) {
  console.log("Line " + i);
}

const fruits = ["apple", "pear", "kiwi"];
for (const fruit of fruits) {
  console.log(fruit);
}</code></pre>
<div class="callout">Use a <code>for...of</code> loop to walk through arrays cleanly.</div>`),
          quiz("je-quiz", "Quiz: JS Basics", [
            {
              q: "What prints text to the developer console?",
              options: ["print()", "console.log()", "echo()", "log.console()"],
              answer: 1,
            },
            {
              q: "A for loop is used to...",
              options: [
                "Style elements",
                "Repeat a block of code",
                "Define a variable",
                "Load a page",
              ],
              answer: 1,
            },
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
    hours: 6,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#306998,#FFD43B)",
    icon: "🐍",
    description:
      "Python reads almost like English, which makes it the perfect first language. You'll learn variables, control flow, functions and data structures — the foundation for web backends, automation, and data science.",
    whatYouLearn: [
      "Write and run your first Python programs",
      "Variables, strings, numbers and user input",
      "Make decisions with if/else and repeat with loops",
      "Organize code with functions, lists and dictionaries",
    ],
    sections: [
      {
        title: "Python Foundations",
        lessons: [
          article("py-hello", "Hello, Python!", "8 min", `
<h3>🎯 Intro</h3>
<p>Python programs are plain text files that run top to bottom — no setup ceremony needed.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>print()</code> shows output; <code>input()</code> asks the user</li>
  <li>Variables need no type declarations</li>
  <li>f-strings embed values inside text</li>
</ul>
<h3>💻 Example</h3>
<pre><code>name = input("What is your name? ")
age = 25
print(f"Hello {name}, next year you'll be {age + 1}!")</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> ask the user for their favorite food and print a sentence using it with an f-string.</div>`),
          article("py-flow", "If, Loops & Lists", "12 min", `
<h3>🎯 Intro</h3>
<p>Real programs make decisions and repeat work. Python uses <strong>indentation</strong> instead of braces.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>if / elif / else</code> for decisions</li>
  <li><code>for item in list:</code> to loop over collections</li>
  <li>Lists hold ordered items: <code>fruits[0]</code> is the first</li>
</ul>
<h3>💻 Example</h3>
<pre><code>fruits = ["mango", "apple", "durian"]
for fruit in fruits:
    if fruit == "durian":
        print(f"{fruit} — smells strong!")
    else:
        print(f"{fruit} — delicious")</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make a list of 5 numbers and print only the ones greater than 10.</div>`),
          article("py-func", "Functions & Dictionaries", "12 min", `
<h3>🎯 Intro</h3>
<p>Functions package logic you can reuse; dictionaries store labeled data — together they're most of everyday Python.</p>
<h3>💻 Example</h3>
<pre><code>def greet(user):
    return f"Hello, {user['name']} from {user['city']}!"

student = {"name": "Aung", "city": "Yangon"}
print(greet(student))</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a function <code>area(width, height)</code> that returns width × height, and call it twice with different values.</div>`),
          quiz("py-quiz", "Quiz: Python Basics", [
            { q: "How does Python group the body of an if statement?", options: ["Curly braces { }", "Indentation", "Parentheses", "The end keyword"], answer: 1 },
            { q: "What does fruits[0] return?", options: ["The last item", "An error", "The first item", "The list length"], answer: 2 },
            { q: "Which keyword defines a function?", options: ["function", "fn", "def", "func"], answer: 2 },
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
    hours: 8,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#087ea4,#61dafb)",
    icon: "⚛️",
    description:
      "React turns your UI into components: small, reusable pieces that update automatically when data changes. Learn JSX, props, state and events — the 90% you use every day.",
    whatYouLearn: [
      "JSX: HTML-like syntax inside JavaScript",
      "Components and props",
      "State with the useState hook",
      "Handling events and rendering lists",
    ],
    sections: [
      {
        title: "React Foundations",
        lessons: [
          article("re-components", "Components & JSX", "12 min", `
<h3>🎯 Intro</h3>
<p>A React component is just a function that returns markup. Build small pieces, compose big apps.</p>
<h3>💻 Example</h3>
<pre><code>function Welcome({ name }) {
  return &lt;h2&gt;Hello, {name}!&lt;/h2&gt;;
}

function App() {
  return (
    &lt;div&gt;
      &lt;Welcome name="Aye" /&gt;
      &lt;Welcome name="Ko" /&gt;
    &lt;/div&gt;
  );
}</code></pre>
<div class="callout tip">Props flow <strong>down</strong> from parent to child — like function arguments.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create a &lt;CourseCard title="..." hours={5} /&gt; component and render three of them.</div>`),
          article("re-state", "State & Events", "14 min", `
<h3>🎯 Intro</h3>
<p>State is data that changes. When it changes, React re-renders for you — no manual DOM updates.</p>
<h3>💻 Example</h3>
<pre><code>import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
      Clicked {count} times
    &lt;/button&gt;
  );
}</code></pre>
<div class="callout">Never write <code>count = 5</code> — always use the setter so React knows to update.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a like button that toggles between 🤍 and ❤️ using state.</div>`),
          article("re-lists", "Rendering Lists", "10 min", `
<h3>🎯 Intro</h3>
<p>Turning an array into UI is React's bread and butter: <code>map</code> + a <code>key</code>.</p>
<h3>💻 Example</h3>
<pre><code>const courses = [
  { id: 1, title: "HTML" },
  { id: 2, title: "CSS" },
  { id: 3, title: "React" },
];

function CourseList() {
  return (
    &lt;ul&gt;
      {courses.map((c) =&gt; (
        &lt;li key={c.id}&gt;{c.title}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> render a student list where scores under 60 get a red style.</div>`),
          quiz("re-quiz", "Quiz: React", [
            { q: "A React component is fundamentally...", options: ["A CSS file", "A function returning markup", "A database model", "An HTML template file"], answer: 1 },
            { q: "How do you update state?", options: ["Assign directly", "Call the setter from useState", "Edit the DOM", "Reload the page"], answer: 1 },
            { q: "When rendering lists, each item needs...", options: ["An id attribute", "A unique key prop", "An index.html", "A class"], answer: 1 },
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
    hours: 7,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#215732,#68a063)",
    icon: "⬢",
    description:
      "The JavaScript you already know, now running servers. Learn Node's runtime, npm, and Express — the standard toolkit for building web APIs.",
    whatYouLearn: [
      "Run JavaScript outside the browser",
      "npm: install and manage packages",
      "Build routes with Express",
      "Return JSON and handle POST bodies",
    ],
    sections: [
      {
        title: "Server Foundations",
        lessons: [
          article("nd-hello", "Node & npm", "10 min", `
<h3>🎯 Intro</h3>
<p>Node runs JavaScript files directly on your computer — no browser needed.</p>
<h3>💻 Example</h3>
<pre><code>// hello.js
const os = require("os");
console.log("Hello from Node on " + os.platform());

// terminal:
// node hello.js
// npm init -y            → creates package.json
// npm install express    → adds a package</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a script that prints today's date and your Node version (process.version).</div>`),
          article("nd-express", "Your First Express API", "14 min", `
<h3>🎯 Intro</h3>
<p>Express maps URLs to functions. That's an API.</p>
<h3>💻 Example</h3>
<pre><code>const express = require("express");
const app = express();
app.use(express.json());

const courses = [{ id: 1, title: "HTML" }, { id: 2, title: "CSS" }];

app.get("/api/courses", (req, res) =&gt; res.json(courses));

app.post("/api/courses", (req, res) =&gt; {
  const c = { id: courses.length + 1, title: req.body.title };
  courses.push(c);
  res.status(201).json(c);
});

app.listen(3000, () =&gt; console.log("http://localhost:3000"));</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add GET /api/courses/:id that returns one course or a 404.</div>`),
          quiz("nd-quiz", "Quiz: Node & Express", [
            { q: "npm install express does what?", options: ["Runs the server", "Downloads the package into node_modules", "Creates routes", "Compiles JS"], answer: 1 },
            { q: "app.get(\"/api/courses\", fn) handles...", options: ["All requests", "GET requests to that path", "Database queries", "File uploads"], answer: 1 },
            { q: "res.json(data) sends...", options: ["An HTML page", "A JSON response", "A file download", "A redirect"], answer: 1 },
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
