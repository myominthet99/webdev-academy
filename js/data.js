/* =====================================================================
   WebDev Academy — course catalog & lesson content
   All lesson HTML is pre-escaped so code samples render as text.
   ===================================================================== */

const CATEGORIES = ["All", "Fundamentals", "HTML", "CSS", "JavaScript", "Responsive", "Career"];

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
];

/* Expose to the app */
window.APP_DATA = { CATEGORIES, COURSES };
