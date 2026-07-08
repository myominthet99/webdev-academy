/* =====================================================================
   WebDev Academy — course catalog & lesson content
   All lesson HTML is pre-escaped so code samples render as text.
   ===================================================================== */

const CATEGORIES = ["All", "Kids", "Fundamentals", "HTML", "CSS", "JavaScript", "Frontend", "Backend", "Programming", "Databases", "AI", "Tools", "Responsive", "Career"];

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
<div class="flow">
  <div class="flow-box">🧱 HTML<br><small>structure</small></div>
  <div class="flow-arrow" data-label="styled by"></div>
  <div class="flow-box alt">🎨 CSS<br><small>looks</small></div>
  <div class="flow-arrow" data-label="powered by"></div>
  <div class="flow-box warn">⚡ JavaScript<br><small>behavior</small></div>
</div>
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
<div class="flow">
  <div class="flow-box">🧑 Browser<br><small>client</small></div>
  <div class="flow-arrow" data-label="HTTP request"></div>
  <div class="flow-box alt">🖥️ Server<br><small>responds</small></div>
  <div class="flow-arrow" data-label="HTML/CSS/JS"></div>
  <div class="flow-box">🖼️ Rendered page<br><small>you see it</small></div>
</div>
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
<div class="flow">
  <div class="flow-box">🧑 You + Browser<br><small>the client</small></div>
  <div class="flow-arrow" data-label="1. asks for page"></div>
  <div class="flow-box alt">🖥️ Server<br><small>a computer online</small></div>
  <div class="flow-arrow" data-label="2. sends files"></div>
  <div class="flow-box">🖼️ Page appears<br><small>HTML · CSS · JS</small></div>
</div>
<h3>The key idea</h3>
<p>A website is really just a bundle of text files that your browser knows how to display. That's it! When you build a site, you're writing those text files.</p>
<div class="callout"><strong>Client &amp; server:</strong> the "client" is your browser asking for things. The "server" is the computer answering. This back-and-forth happens in a fraction of a second.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> open Chrome, press <code>F12</code> → the <strong>Network</strong> tab → reload this page. Every row you see is one file your browser downloaded from the server. Count how many there are!</div>`),
          article("wb-frontback", "Front-End vs Back-End", "5 min", `
<p>You'll hear these two terms a lot. Here's the simple version.</p>
<div class="flow">
  <div class="flow-box">🎨 Front-end<br><small>what you SEE<br>HTML · CSS · JS</small></div>
  <div class="flow-arrow" data-label="talks to"></div>
  <div class="flow-box alt">⚙️ Back-end<br><small>behind the scenes<br>server · database</small></div>
</div>
<h3>Front-end — what you can see</h3>
<p>Everything that appears in the browser: text, buttons, colors, layout, animations. It's built with the three languages we'll learn:</p>
<ul>
  <li><strong>HTML</strong> — structure &amp; content</li>
  <li><strong>CSS</strong> — appearance &amp; layout</li>
  <li><strong>JavaScript</strong> — interactivity</li>
</ul>
<h3>Back-end — the behind-the-scenes</h3>
<p>The server, databases, and logic you <em>don't</em> see — things like saving your account or processing a payment.</p>
<div class="callout tip">This course is 100% <strong>front-end</strong>. It's the friendliest place to start, and you get to see your results instantly.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> think of an app you love (Facebook, TikTok…). Name <strong>two things</strong> that are front-end (things you can see and tap) and <strong>one thing</strong> that's back-end (something saved or processed behind the scenes, like your login).</div>`),
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
<div class="callout tip">Save this as <code>index.html</code> and open it — you just built a web page from scratch! 🎉</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, type out the full HTML page above. Then change the <code>&lt;h1&gt;</code> to your own name, and add a second <code>&lt;p&gt;</code> about your favorite hobby.</div>`,
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
<div class="callout">Headings aren't just "big text" — they give your page an outline that search engines and screen readers rely on. Use them in order.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, build a mini blog: an <code>&lt;h1&gt;</code> title, an <code>&lt;h2&gt;</code> post heading, and a paragraph with one <strong>bold</strong> word and one <em>italic</em> word.</div>`),
          video("wb-links", "Links & Navigation", "8 min", `
<p>Links are what make the web a <em>web</em>. They use the anchor tag <code>&lt;a&gt;</code> with an <code>href</code> ("hypertext reference") attribute.</p>
<pre><code>&lt;a href="https://wikipedia.org"&gt;Visit Wikipedia&lt;/a&gt;

&lt;!-- link to another page in your site --&gt;
&lt;a href="about.html"&gt;About Me&lt;/a&gt;

&lt;!-- open in a new tab --&gt;
&lt;a href="https://google.com" target="_blank"&gt;Google&lt;/a&gt;</code></pre>
<h3>What is an attribute?</h3>
<p>An <strong>attribute</strong> is extra information inside the opening tag, written as <code>name="value"</code>. Here <code>href</code> and <code>target</code> are attributes.</p>
<div class="callout tip">A link's text should describe where it goes. "Click here" is unhelpful; "Read the docs" is clear.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, create a link to your favorite website that opens in a new tab (<code>target="_blank"</code>) — and give it clear text that says where it goes.</div>`),
          video("wb-images", "Images & Media", "7 min", `
<p>Add pictures with the <code>&lt;img&gt;</code> tag. It's <strong>self-closing</strong> — there's no <code>&lt;/img&gt;</code>.</p>
<pre><code>&lt;img src="photo.jpg" alt="A golden retriever puppy" width="400"&gt;</code></pre>
<h3>The three things to know</h3>
<ul>
  <li><code>src</code> — the image file's location (a filename or a full URL).</li>
  <li><code>alt</code> — a text description, read aloud by screen readers and shown if the image fails to load.</li>
  <li><code>width</code> / <code>height</code> — optional size in pixels.</li>
</ul>
<div class="callout"><strong>Always write good <code>alt</code> text.</strong> It makes your site usable for people who can't see the image — and it's good for SEO.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, add an image using a full URL (any image link you know), give it good <code>alt</code> text describing the picture, and set <code>width="300"</code>.</div>`),
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
<div class="callout tip">Navigation menus are usually built as a <code>&lt;ul&gt;</code> of links — lists are everywhere once you notice them.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, make a bulleted <code>&lt;ul&gt;</code> shopping list (3 items) and a numbered <code>&lt;ol&gt;</code> of steps to make tea.</div>`),
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
<div class="flow">
  <div class="flow-box">h1<br><small>selector<br>WHAT to style</small></div>
  <div class="flow-arrow" data-label="set its"></div>
  <div class="flow-box alt">color<br><small>property<br>WHAT to change</small></div>
  <div class="flow-arrow" data-label="to"></div>
  <div class="flow-box warn">navy<br><small>value<br>the new look</small></div>
</div>
<div class="callout"><strong>Selectors</strong> pick <em>what</em> to style. Common ones: <code>h1</code> (by tag), <code>.intro</code> (by class), <code>#header</code> (by id).</p></div>
<h3>💻 Example</h3>
<pre><code>&lt;h1&gt;My Shop&lt;/h1&gt;
&lt;p class="intro"&gt;Welcome!&lt;/p&gt;

&lt;style&gt;
  h1     { color: purple; }
  .intro { color: gray; font-size: 20px; }
&lt;/style&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, add an <code>&lt;h1&gt;</code> and write a style rule that makes it your favorite color and <code>50px</code> big. Then add a paragraph and give it a different color.</div>`),
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
<div class="callout tip">Try free palette tools like coolors.co to pick colors that look good together.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, give your page a soft <code>background</code> color, make the <code>&lt;h1&gt;</code> a bold color, and give a <code>&lt;button&gt;</code> a colored background with white text.</div>`),
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
<div class="callout">Comfortable body text is around <code>16px</code> with a <code>line-height</code> of <code>1.5</code>–<code>1.6</code>. Cramped text is hard to read.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, add a paragraph of text, then change its <code>font-family</code>, set <code>font-size: 18px</code>, and <code>line-height: 1.6</code>. Notice how much easier it is to read.</div>`),
          video("wb-css-box", "Spacing & the Box Model", "9 min", `
<p>Every element is a rectangular <strong>box</strong>. Understanding its layers is the key to controlling spacing.</p>
<ul>
  <li><strong>content</strong> — the text or image itself</li>
  <li><strong>padding</strong> — space <em>inside</em> the box, around the content</li>
  <li><strong>border</strong> — the edge line</li>
  <li><strong>margin</strong> — space <em>outside</em> the box, pushing other elements away</li>
</ul>
<div class="flow">
  <div class="flow-box">content</div>
  <div class="flow-arrow" data-label="wrapped in"></div>
  <div class="flow-box alt">padding</div>
  <div class="flow-arrow" data-label="then"></div>
  <div class="flow-box warn">border</div>
  <div class="flow-arrow" data-label="then"></div>
  <div class="flow-box">margin</div>
</div>
<pre><code>.card {
  padding: 20px;                 /* breathing room inside */
  border: 1px solid #ddd;        /* thin gray edge */
  margin: 16px;                  /* gap around the card */
  border-radius: 8px;            /* rounded corners */
}</code></pre>
<div class="callout tip">Add this near the top of your CSS to make sizes behave intuitively:<br><code>* { box-sizing: border-box; }</code></div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, make a <code>&lt;div class="card"&gt;</code> with some text, then give <code>.card</code> a background color, <code>padding: 24px</code>, a <code>2px</code> border, and <code>margin: 20px</code>. Change each number and watch the spacing move!</div>`),
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
<div class="callout">Flexbox is one of the most useful things in all of CSS. Just three lines can center content that used to take real effort.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, put three <code>&lt;div&gt;</code> boxes inside a parent, then give the parent <code>display: flex; gap: 12px; justify-content: center;</code> — watch them line up in a neat row.</div>`),
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
<div class="callout tip">Press <strong>F12</strong> in your browser and open the <em>Console</em> tab to see <code>console.log</code> output — it's how developers check what their code is doing.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, use <code>console.log</code> to print your name, then print the result of <code>7 * 8</code>. Check the Console panel below the result.</div>`),
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
<div class="callout">Think of variables as labels on jars. The label (name) stays the same; you can change what's inside a <code>let</code> jar, but not a <code>const</code> one.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, make a <code>let</code> variable for your age and a <code>const</code> for your name, then <code>console.log</code> a sentence like "My name is ... and I am ... years old."</div>`),
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
<div class="flow">
  <div class="flow-box">👆 Click<br><small>an event</small></div>
  <div class="flow-arrow" data-label="runs"></div>
  <div class="flow-box alt">🧠 Your function<br><small>JavaScript</small></div>
  <div class="flow-arrow" data-label="changes"></div>
  <div class="flow-box">📄 The page<br><small>textContent</small></div>
</div>
<div class="callout tip"><code>querySelector</code> uses CSS-style selectors: <code>"#id"</code>, <code>".class"</code>, <code>"tag"</code>. Learn selectors once, use them in both CSS and JavaScript.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in the 🧪 Playground, build a button that shows "Hello!" in a paragraph when clicked. <strong>Bonus:</strong> make a counter that goes up by 1 every time you click.</div>`),
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
<div style="border:2px solid #654ea3;border-radius:10px;overflow:hidden;max-width:340px;margin:16px auto;font-size:13px;font-weight:700;text-align:center">
  <div style="background:#654ea3;color:#fff;padding:8px">&lt;header&gt; + &lt;nav&gt;</div>
  <div style="display:flex">
    <div style="flex:2;background:#eadff8;color:#333;padding:22px 8px;border-right:1px solid #d9cff2">&lt;main&gt;<br>&lt;article&gt;</div>
    <div style="flex:1;background:#f4eefb;color:#555;padding:22px 8px">&lt;aside&gt;</div>
  </div>
  <div style="background:#3bb78f;color:#fff;padding:8px">&lt;footer&gt;</div>
</div>
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
<div class="flow">
  <div class="flow-box">✍️ User fills form</div>
  <div class="flow-arrow" data-label="clicks submit"></div>
  <div class="flow-box warn">✅ Browser checks<br><small>required, type…</small></div>
  <div class="flow-arrow" data-label="if valid"></div>
  <div class="flow-box alt">📨 Data is sent</div>
</div>
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
<div class="flow">
  <div class="flow-box warn">❓ if (condition)</div>
  <div class="flow-arrow" data-label="true → run"></div>
  <div class="flow-box alt">if block</div>
  <div class="flow-arrow" data-label="false → run"></div>
  <div class="flow-box">else block</div>
</div>
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
<div class="flow">
  <div class="flow-box">start<br><small>i = 1</small></div>
  <div class="flow-arrow" data-label="i ≤ 5 ?"></div>
  <div class="flow-box alt">run the body</div>
  <div class="flow-arrow" data-label="then i++ ↺"></div>
  <div class="flow-box warn">check again</div>
</div>
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
<div class="flow">
  <div class="flow-box">[1,2,3,4]<br><small>array</small></div>
  <div class="flow-arrow" data-label=".map(×2)"></div>
  <div class="flow-box alt">[2,4,6,8]</div>
  <div class="flow-arrow" data-label=".filter(&gt;4)"></div>
  <div class="flow-box warn">[6,8]</div>
</div>
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
<div class="flow">
  <div class="flow-box">📥 inputs<br><small>a, b</small></div>
  <div class="flow-arrow" data-label="do work"></div>
  <div class="flow-box alt">⚙️ function<br><small>add(a, b)</small></div>
  <div class="flow-arrow" data-label="return"></div>
  <div class="flow-box">📤 output<br><small>a + b</small></div>
</div>
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
<div class="flow">
  <div class="flow-box">👆 User acts<br><small>click / type</small></div>
  <div class="flow-arrow" data-label="fires event"></div>
  <div class="flow-box alt">🧠 Your listener<br><small>function</small></div>
  <div class="flow-arrow" data-label="updates"></div>
  <div class="flow-box">📄 The page</div>
</div>
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
    hours: 12,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#35495e,#42b883)",
    icon: "V",
    description:
      "Vue lets you sprinkle reactivity onto HTML you already know. This full course covers reactive data, computed values, all the core directives, components with props and events, data fetching — and a complete expense-tracker project.",
    whatYouLearn: [
      "Start Vue two ways: CDN script or a Vite project",
      "Reactive data with ref() and two-way v-model",
      "Computed properties that update themselves",
      "All core directives: v-if, v-for, v-bind, v-on",
      "Split UIs into components with props and events",
      "Fetch API data and build a complete app",
    ],
    sections: [
      {
        title: "Vue Foundations",
        lessons: [
          article("vu-setup", "Two Ways to Start Vue", "10 min", `
<h3>🎯 Intro</h3>
<p>Vue's superpower is meeting you where you are: drop a script tag into any HTML page, or scaffold a full project.</p>
<h3>📝 Summary</h3>
<ul>
  <li><strong>CDN way</strong> — one script tag, perfect for learning and small pages</li>
  <li><strong>Project way</strong> — <code>npm create vue@latest</code> for real apps (.vue files)</li>
  <li>Both use the same concepts — everything you learn transfers</li>
</ul>
<h3>💻 Example (CDN — try this one in the playground!)</h3>
<pre><code>&lt;div id="app"&gt;
  &lt;h2&gt;{{ title }}&lt;/h2&gt;
  &lt;p&gt;Students enrolled: {{ students }}&lt;/p&gt;
&lt;/div&gt;

&lt;script src="https://unpkg.com/vue@3/dist/vue.global.js"&gt;&lt;/script&gt;
&lt;script&gt;
const { createApp, ref } = Vue;
createApp({
  setup() {
    const title = ref("WebDev Academy");
    const students = ref(128);
    return { title, students };
  }
}).mount("#app");
&lt;/script&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> run the CDN example in the playground, then change title and students and watch the page follow.</div>`),
          article("vu-reactive", "Reactive Data & Templates", "11 min", `
<h3>🎯 Intro</h3>
<p>Change the data → the page updates. That's Vue's whole promise.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>ref(value)</code> makes data reactive; read/write <code>.value</code> in code</li>
  <li>In templates, refs unwrap automatically: <code>{{ count }}</code></li>
  <li><code>@click</code> attaches events; any expression works inside</li>
</ul>
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
<div class="callout tip"><strong>Try it yourself:</strong> add a second button that resets count to 0, and a third that adds 10.</div>`),
          article("vu-computed", "Computed Properties", "11 min", `
<h3>🎯 Intro</h3>
<p>A computed property is a value that <em>derives itself</em> from other data — and updates automatically when its sources change.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>computed(() =&gt; ...)</code> — recalculates only when dependencies change</li>
  <li>Use for totals, filters, formatted text — never store what you can derive</li>
  <li>Cleaner than recalculating inside the template</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;script setup&gt;
import { ref, computed } from "vue";

const price = ref(4500);
const qty = ref(2);

const total = computed(() =&gt; price.value * qty.value);
const label = computed(() =&gt;
  total.value &gt; 10000 ? "Big order 🎉" : "Standard order");
&lt;/script&gt;

&lt;template&gt;
  &lt;input type="number" v-model.number="qty" min="1"&gt;
  &lt;p&gt;Total: {{ total }} kyat — {{ label }}&lt;/p&gt;
&lt;/template&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a discount ref (0–100) and a computed finalPrice that applies it to total.</div>`),
          quiz("vu-quiz", "Quiz: Vue Foundations", [
            { q: "ref(0) creates...", options: ["A constant", "Reactive data", "A DOM reference only", "A route"], answer: 1 },
            { q: "In script code you read a ref with...", options: ["count", "count.value", "count()", "this.count only"], answer: 1 },
            { q: "A computed property recalculates...", options: ["Every millisecond", "When its reactive dependencies change", "Only on page load", "Never"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Directives & Components",
        lessons: [
          article("vu-directives", "v-if, v-for & v-model", "13 min", `
<h3>🎯 Intro</h3>
<p>Directives are HTML attributes with superpowers.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>v-if / v-else</code> — render or don't; <code>v-show</code> just hides</li>
  <li><code>v-for="t in tasks" :key="..."</code> — loop with a stable key</li>
  <li><code>v-model</code> — two-way binding for inputs</li>
  <li><code>:attr</code> binds attributes; <code>@event</code> listens</li>
</ul>
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
    &lt;li v-for="(t, i) in tasks" :key="t"&gt;
      {{ t }} &lt;button @click="tasks.splice(i, 1)"&gt;🗑&lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a counter "X of Y done" and a v-if congratulations line when every task is deleted.</div>`),
          article("vu-components", "Components & Props", "13 min", `
<h3>🎯 Intro</h3>
<p>Components split big UIs into named, reusable pieces — same idea as React, Vue flavor.</p>
<h3>📝 Summary</h3>
<ul>
  <li>One component per .vue file; import and use like a tag</li>
  <li><code>defineProps</code> declares the inputs a component accepts</li>
  <li>Bind live data to props with <code>:prop="value"</code></li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;!-- CourseCard.vue --&gt;
&lt;script setup&gt;
defineProps({ title: String, hours: Number, free: Boolean });
&lt;/script&gt;
&lt;template&gt;
  &lt;div class="card"&gt;
    &lt;h3&gt;{{ title }}&lt;/h3&gt;
    &lt;p&gt;{{ hours }}h · {{ free ? "Free" : "Premium" }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- App.vue --&gt;
&lt;script setup&gt;
import CourseCard from "./CourseCard.vue";
const courses = [
  { id: 1, title: "Vue Fundamentals", hours: 12, free: true },
  { id: 2, title: "CSS Mastery", hours: 14, free: false },
];
&lt;/script&gt;
&lt;template&gt;
  &lt;CourseCard v-for="c in courses" :key="c.id"
              :title="c.title" :hours="c.hours" :free="c.free" /&gt;
&lt;/template&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add an instructor prop with a default value ("Staff") and render 3 cards.</div>`),
          article("vu-emits", "Child → Parent: Events", "12 min", `
<h3>🎯 Intro</h3>
<p>Props flow down; events flow up. A child asks the parent to act by <em>emitting</em>.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Child: <code>defineEmits(["enroll"])</code> then <code>emit("enroll", payload)</code></li>
  <li>Parent listens: <code>@enroll="handleEnroll"</code></li>
  <li>The parent owns the data; children request changes</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;!-- EnrollButton.vue --&gt;
&lt;script setup&gt;
defineProps({ courseId: Number });
const emit = defineEmits(["enroll"]);
&lt;/script&gt;
&lt;template&gt;
  &lt;button @click="emit('enroll', courseId)"&gt;Enroll&lt;/button&gt;
&lt;/template&gt;

&lt;!-- App.vue --&gt;
&lt;script setup&gt;
import { ref } from "vue";
import EnrollButton from "./EnrollButton.vue";
const enrolled = ref([]);
function handleEnroll(id) {
  if (!enrolled.value.includes(id)) enrolled.value.push(id);
}
&lt;/script&gt;
&lt;template&gt;
  &lt;EnrollButton :course-id="1" @enroll="handleEnroll" /&gt;
  &lt;p&gt;Enrolled in {{ enrolled.length }} course(s)&lt;/p&gt;
&lt;/template&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make a RatingStars child that emits "rate" with 1–5, and a parent that stores and displays the rating.</div>`),
          quiz("vu-quiz-2", "Quiz: Directives & Components", [
            { q: "Which directive loops over a list?", options: ["v-loop", "v-each", "v-for", "v-map"], answer: 2 },
            { q: "v-model on an input gives you...", options: ["Validation", "Two-way binding", "Styling", "Autocomplete"], answer: 1 },
            { q: "Data flows child → parent via...", options: ["Props", "Emitted events", "Global variables", "v-if"], answer: 1 },
            { q: "defineProps is used to...", options: ["Create routes", "Declare a component's inputs", "Fetch data", "Style components"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Data & Project",
        lessons: [
          article("vu-fetch", "Fetching Data with onMounted", "13 min", `
<h3>🎯 Intro</h3>
<p><code>onMounted</code> runs once when the component appears — the natural moment to load data.</p>
<h3>💻 Example</h3>
<pre><code>&lt;script setup&gt;
import { ref, onMounted } from "vue";

const users = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () =&gt; {
  try {
    const r = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!r.ok) throw new Error("HTTP " + r.status);
    users.value = await r.json();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
&lt;/script&gt;

&lt;template&gt;
  &lt;p v-if="loading"&gt;Loading…&lt;/p&gt;
  &lt;p v-else-if="error"&gt;⚠ {{ error }}&lt;/p&gt;
  &lt;ul v-else&gt;
    &lt;li v-for="u in users" :key="u.id"&gt;{{ u.name }} — {{ u.email }}&lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> fetch /todos, show only incomplete ones, and add a computed count in the heading.</div>`),
          article("vu-project", "Final Project: Expense Tracker", "22 min", `
<h3>🎯 Intro</h3>
<p>Everything combined: refs, computed, v-model, v-for, conditional rendering — a complete money tracker.</p>
<h3>💻 Complete solution — study it, then build yours</h3>
<pre><code>&lt;script setup&gt;
import { ref, computed } from "vue";

const desc = ref("");
const amount = ref(null);
const items = ref([
  { id: 1, desc: "Lunch", amount: -3500 },
  { id: 2, desc: "Freelance", amount: 50000 },
]);

const balance = computed(() =&gt;
  items.value.reduce((s, x) =&gt; s + x.amount, 0));
const income = computed(() =&gt;
  items.value.filter(x =&gt; x.amount &gt; 0).reduce((s, x) =&gt; s + x.amount, 0));
const spent = computed(() =&gt;
  items.value.filter(x =&gt; x.amount &lt; 0).reduce((s, x) =&gt; s + x.amount, 0));

function add() {
  if (!desc.value || !amount.value) return;
  items.value.push({ id: Date.now(), desc: desc.value, amount: amount.value });
  desc.value = ""; amount.value = null;
}
const remove = (id) =&gt;
  items.value = items.value.filter(x =&gt; x.id !== id);
&lt;/script&gt;

&lt;template&gt;
  &lt;h2&gt;💰 Balance: {{ balance }} kyat&lt;/h2&gt;
  &lt;p&gt;⬆ {{ income }} · ⬇ {{ spent }}&lt;/p&gt;

  &lt;form @submit.prevent="add"&gt;
    &lt;input v-model="desc" placeholder="Description"&gt;
    &lt;input v-model.number="amount" type="number"
           placeholder="+income / -expense"&gt;
    &lt;button&gt;Add&lt;/button&gt;
  &lt;/form&gt;

  &lt;p v-if="items.length === 0"&gt;No transactions yet.&lt;/p&gt;
  &lt;ul&gt;
    &lt;li v-for="x in items" :key="x.id"
        :style="{ color: x.amount &lt; 0 ? 'crimson' : 'green' }"&gt;
      {{ x.desc }}: {{ x.amount }}
      &lt;button @click="remove(x.id)"&gt;🗑&lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> add a category dropdown, a computed per-category summary, and persist items to localStorage with watch().</div>`),
          quiz("vu-quiz-3", "Final Quiz: Vue", [
            { q: "onMounted runs...", options: ["Every update", "Once when the component appears", "On every click", "Before setup"], answer: 1 },
            { q: "v-model.number does what?", options: ["Formats currency", "Casts the input value to a number", "Limits to 1 digit", "Nothing"], answer: 1 },
            { q: "balance was implemented as computed because...", options: ["It's faster to type", "It derives from items and stays in sync automatically", "refs can't hold numbers", "Templates require it"], answer: 1 },
            { q: "@submit.prevent on a form...", options: ["Blocks all input", "Runs the handler and stops the page reload", "Validates fields", "Submits twice"], answer: 1 },
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
      {
        title: "Building Blocks",
        lessons: [
          article("bs-navbar", "Responsive Navbar", "12 min", `
<h3>🎯 Intro</h3>
<p>The responsive navbar — desktop menu that collapses into a ☰ burger on phones — is Bootstrap's most-copied component.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>navbar-expand-md</code> = horizontal on medium+ screens, collapsed below</li>
  <li>The toggler button targets the collapse div by id</li>
  <li>Needs Bootstrap's JS bundle for the toggle to work</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"&gt;&lt;/script&gt;

&lt;nav class="navbar navbar-expand-md bg-dark navbar-dark"&gt;
  &lt;div class="container"&gt;
    &lt;a class="navbar-brand" href="#"&gt;WebDev Academy&lt;/a&gt;
    &lt;button class="navbar-toggler" data-bs-toggle="collapse"
            data-bs-target="#menu"&gt;
      &lt;span class="navbar-toggler-icon"&gt;&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="collapse navbar-collapse" id="menu"&gt;
      &lt;ul class="navbar-nav ms-auto"&gt;
        &lt;li class="nav-item"&gt;&lt;a class="nav-link active" href="#"&gt;Courses&lt;/a&gt;&lt;/li&gt;
        &lt;li class="nav-item"&gt;&lt;a class="nav-link" href="#"&gt;Roadmap&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/nav&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> run it in the playground, shrink the result pane, and watch the menu collapse into the burger.</div>`),
          article("bs-forms", "Forms & Feedback", "12 min", `
<h3>🎯 Intro</h3>
<p>Bootstrap makes forms look professional with two classes — and adds validation states for free.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>form-label</code> + <code>form-control</code> style any input</li>
  <li><code>form-select form-check</code> for dropdowns and checkboxes</li>
  <li><code>is-invalid</code> + <code>invalid-feedback</code> show errors</li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;form class="p-4" style="max-width:420px"&gt;
  &lt;div class="mb-3"&gt;
    &lt;label class="form-label"&gt;Email&lt;/label&gt;
    &lt;input type="email" class="form-control is-invalid"&gt;
    &lt;div class="invalid-feedback"&gt;Please enter a valid email.&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="mb-3"&gt;
    &lt;label class="form-label"&gt;Course&lt;/label&gt;
    &lt;select class="form-select"&gt;
      &lt;option&gt;HTML Deep Dive&lt;/option&gt;
      &lt;option&gt;Bootstrap&lt;/option&gt;
    &lt;/select&gt;
  &lt;/div&gt;
  &lt;div class="form-check mb-3"&gt;
    &lt;input class="form-check-input" type="checkbox" id="agree"&gt;
    &lt;label class="form-check-label" for="agree"&gt;I agree to learn daily&lt;/label&gt;
  &lt;/div&gt;
  &lt;button class="btn btn-primary w-100"&gt;Enroll&lt;/button&gt;
&lt;/form&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a contact form with name, email, message textarea and a full-width submit — with one field showing the invalid state.</div>`),
          quiz("bs-quiz-2", "Quiz: Components", [
            { q: "navbar-expand-md means the menu is horizontal...", options: ["Always", "On medium screens and larger", "Only on phones", "Never"], answer: 1 },
            { q: "Which class styles a text input?", options: ["input-style", "form-control", "text-box", "bs-input"], answer: 1 },
            { q: "invalid-feedback text appears when the input has...", options: ["focus", "is-invalid", "disabled", "required"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Project: Landing Page",
        lessons: [
          article("bs-project", "Final Project: Course Landing Page", "20 min", `
<h3>🎯 Intro</h3>
<p>Hero, feature cards, and a signup form — a complete landing page with zero custom CSS.</p>
<h3>💻 Complete solution — run it in the playground</h3>
<pre><code>&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"&gt;

&lt;section class="bg-dark text-white text-center py-5"&gt;
  &lt;div class="container py-4"&gt;
    &lt;h1 class="display-5 fw-bold"&gt;Learn Web Development&lt;/h1&gt;
    &lt;p class="lead text-white-50"&gt;Free bilingual courses — HTML to full-stack.&lt;/p&gt;
    &lt;a href="#signup" class="btn btn-primary btn-lg"&gt;Start free&lt;/a&gt;
  &lt;/div&gt;
&lt;/section&gt;

&lt;section class="container py-5"&gt;
  &lt;div class="row g-4"&gt;
    &lt;div class="col-md-4"&gt;
      &lt;div class="card h-100 text-center p-3"&gt;
        &lt;div class="fs-1"&gt;🎓&lt;/div&gt;
        &lt;h5&gt;29 Courses&lt;/h5&gt;
        &lt;p class="text-muted"&gt;From first HTML tag to deployment.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="col-md-4"&gt;
      &lt;div class="card h-100 text-center p-3"&gt;
        &lt;div class="fs-1"&gt;🧪&lt;/div&gt;
        &lt;h5&gt;Live Playground&lt;/h5&gt;
        &lt;p class="text-muted"&gt;Try every example in your browser.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="col-md-4"&gt;
      &lt;div class="card h-100 text-center p-3"&gt;
        &lt;div class="fs-1"&gt;💬&lt;/div&gt;
        &lt;h5&gt;Community&lt;/h5&gt;
        &lt;p class="text-muted"&gt;Chat with fellow students live.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;

&lt;section id="signup" class="bg-light py-5"&gt;
  &lt;div class="container" style="max-width:480px"&gt;
    &lt;h3 class="text-center mb-4"&gt;Join free&lt;/h3&gt;
    &lt;input class="form-control mb-3" placeholder="Your name"&gt;
    &lt;input type="email" class="form-control mb-3" placeholder="Email"&gt;
    &lt;button class="btn btn-primary w-100"&gt;Create account&lt;/button&gt;
  &lt;/div&gt;
&lt;/section&gt;</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> add the responsive navbar from the earlier lesson, a pricing row (3 cards), and a footer with social links.</div>`),
          quiz("bs-quiz-3", "Final Quiz: Bootstrap", [
            { q: "h-100 on the cards makes them...", options: ["100px tall", "Equal full height in their row", "Hidden", "Full width"], answer: 1 },
            { q: "display-5 fw-bold styles a...", options: ["Table", "Large bold heading", "Flexbox", "Modal"], answer: 1 },
            { q: "row g-4 — the g-4 sets...", options: ["4 columns", "Gutter (gap) size", "Margin top", "Grid rows"], answer: 1 },
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
    hours: 11,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#4f5b93,#8892bf)",
    icon: "🐘",
    description:
      "PHP generates HTML on the server and talks to databases with ease. It powers WordPress (40% of the web). This full course covers PHP-in-HTML, arrays and functions, secure form handling, sessions, MySQL with PDO — and a working guestbook project.",
    whatYouLearn: [
      "Embed PHP inside HTML and run a local server",
      "Indexed and associative arrays, loops",
      "Functions and file includes for clean structure",
      "Handle form submissions ($_POST) safely",
      "Remember users with sessions",
      "Query MySQL securely with PDO prepared statements",
    ],
    sections: [
      {
        title: "PHP Foundations",
        lessons: [
          article("php-hello", "PHP Inside HTML", "10 min", `
<h3>🎯 Intro</h3>
<p>PHP runs on the server and prints into your HTML before the browser sees it.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Code lives between <code>&lt;?php ... ?&gt;</code>; <code>&lt;?= x ?&gt;</code> echoes a value</li>
  <li>Variables start with <code>$</code></li>
  <li>Run locally: <code>php -S localhost:8000</code></li>
</ul>
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
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> print a price list from an associative array of item =&gt; price.</div>`),
          article("php-arrays", "Arrays: Indexed & Associative", "12 min", `
<h3>🎯 Intro</h3>
<p>PHP's array is two structures in one: a list AND a key-value map. Most PHP data work is array work.</p>
<h3>📝 Summary</h3>
<ul>
  <li>Indexed: <code>["a", "b"]</code>; associative: <code>["name" =&gt; "Aye"]</code></li>
  <li><code>foreach ($arr as $key =&gt; $value)</code> visits both</li>
  <li>Helpers: <code>count() array_sum() array_filter() array_map() sort()</code></li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;?php
$student = ["name" =&gt; "Aye", "city" =&gt; "Yangon", "score" =&gt; 85];
foreach ($student as $key =&gt; $value) {
    echo "$key: $value\\n";
}

$scores = [75, 92, 58, 88];
$passing = array_filter($scores, fn($s) =&gt; $s &gt;= 60);
echo "Average: " . array_sum($scores) / count($scores) . "\\n";
echo "Passed: " . count($passing) . "\\n";
?&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build an array of 3 students (each an associative array) and print "NAME from CITY scored X" for each.</div>`),
          article("php-functions", "Functions & Includes", "11 min", `
<h3>🎯 Intro</h3>
<p>Functions organize logic; <code>include</code> splits pages into reusable parts (header, footer) — the pattern behind every PHP site.</p>
<h3>💻 Example</h3>
<pre><code>&lt;?php
// helpers.php
function grade(int $score): string {
    if ($score &gt;= 80) return "A";
    if ($score &gt;= 60) return "B";
    return "C";
}

// index.php
include "helpers.php";
include "header.php";     // shared &lt;head&gt;, nav...
echo "&lt;p&gt;Grade: " . grade(85) . "&lt;/p&gt;";
include "footer.php";
?&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> split a page into header.php / footer.php and a formatPrice($n) helper that adds "Ks" and thousands separators (number_format).</div>`),
          quiz("php-quiz", "Quiz: PHP Foundations", [
            { q: "<?= $name ?> is shorthand for...", options: ["A comment", "echo $name", "A variable declaration", "An import"], answer: 1 },
            { q: "[\"name\" => \"Aye\"] is a(n)...", options: ["Indexed array", "Associative array", "Object literal", "Constant"], answer: 1 },
            { q: "include \"header.php\" does what?", options: ["Downloads a file", "Inserts and runs that file here", "Comments it out", "Caches it"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Forms, Sessions & MySQL",
        lessons: [
          article("php-forms", "Handling Forms Safely", "12 min", `
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
<div class="callout tip"><strong>Try it yourself:</strong> add an email field, validate it with filter_var($email, FILTER_VALIDATE_EMAIL), and show an error when invalid.</div>`),
          article("php-sessions", "Sessions: Remembering Users", "12 min", `
<h3>🎯 Intro</h3>
<p>HTTP forgets everything between requests. Sessions give each visitor a private server-side memory — the basis of every login.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>session_start()</code> first thing on every page that uses it</li>
  <li><code>$_SESSION["key"]</code> persists across page loads</li>
  <li>Logout = <code>session_destroy()</code></li>
</ul>
<h3>💻 Example</h3>
<pre><code>&lt;?php
session_start();

// login.php (after checking password!)
$_SESSION["user"] = "mmtboy90@gmail.com";

// any other page
if (isset($_SESSION["user"])) {
    echo "Welcome back, " . htmlspecialchars($_SESSION["user"]);
} else {
    header("Location: login.php");   // not logged in → redirect
    exit;
}

// logout.php
session_destroy();
?&gt;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a page-view counter per visitor: increment $_SESSION["visits"] on each refresh and display it.</div>`),
          article("php-mysql", "MySQL with PDO", "14 min", `
<h3>🎯 Intro</h3>
<p>PDO is PHP's safe way to talk to databases. <strong>Prepared statements</strong> make SQL injection impossible — the #1 rule of PHP security.</p>
<h3>💻 Example</h3>
<pre><code>&lt;?php
$pdo = new PDO(
    "mysql:host=localhost;dbname=academy;charset=utf8mb4",
    "root", "password",
    [PDO::ATTR_ERRMODE =&gt; PDO::ERRMODE_EXCEPTION]
);

// NEVER glue user input into SQL. Use ? placeholders:
$stmt = $pdo-&gt;prepare("SELECT name, score FROM students WHERE score &gt;= ?");
$stmt-&gt;execute([60]);

foreach ($stmt-&gt;fetchAll() as $row) {
    echo htmlspecialchars($row["name"]) . ": " . $row["score"] . "&lt;br&gt;";
}

// insert safely
$pdo-&gt;prepare("INSERT INTO students (name, score) VALUES (?, ?)")
    -&gt;execute([$_POST["name"], (int)$_POST["score"]]);
?&gt;</code></pre>
<div class="callout">Gluing input into SQL strings ("SELECT ... WHERE name = '$name'") is how sites get hacked. Placeholders, always.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a prepared query that finds students by a city typed into a form field.</div>`),
          quiz("php-quiz-2", "Quiz: Forms, Sessions & PDO", [
            { q: "Submitted form values arrive in...", options: ["$_FORM", "$_DATA", "$_POST", "$input"], answer: 2 },
            { q: "htmlspecialchars() protects against...", options: ["Slow queries", "HTML/script injection (XSS)", "Typos", "Large uploads"], answer: 1 },
            { q: "Which must run before using $_SESSION?", options: ["session_begin()", "session_start()", "start_session()", "Nothing"], answer: 1 },
            { q: "Prepared statements with ? placeholders prevent...", options: ["Slow pages", "SQL injection", "CSS bugs", "Session loss"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Project: Guestbook",
        lessons: [
          article("php-project", "Final Project: A Working Guestbook", "20 min", `
<h3>🎯 Intro</h3>
<p>A complete mini-app on one page: form handling, validation, file storage, safe output — the full PHP request cycle.</p>
<h3>💻 Complete solution — study it, then build yours</h3>
<pre><code>&lt;?php
// guestbook.php — run with: php -S localhost:8000
$file = "entries.json";
$entries = file_exists($file)
    ? json_decode(file_get_contents($file), true)
    : [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $msg  = trim($_POST["message"] ?? "");
    if ($name !== "" &amp;&amp; $msg !== "") {
        $entries[] = [
            "name" =&gt; $name,
            "msg"  =&gt; $msg,
            "time" =&gt; date("Y-m-d H:i"),
        ];
        file_put_contents($file, json_encode($entries, JSON_PRETTY_PRINT));
        header("Location: guestbook.php");   // avoid re-post on refresh
        exit;
    }
    $error = "Both fields are required.";
}
?&gt;
&lt;h1&gt;📖 Guestbook (&lt;?= count($entries) ?&gt;)&lt;/h1&gt;

&lt;?php if (!empty($error)): ?&gt;
  &lt;p style="color:red"&gt;&lt;?= htmlspecialchars($error) ?&gt;&lt;/p&gt;
&lt;?php endif; ?&gt;

&lt;form method="post"&gt;
  &lt;input name="name" placeholder="Your name"&gt;
  &lt;textarea name="message" placeholder="Say something nice…"&gt;&lt;/textarea&gt;
  &lt;button&gt;Sign&lt;/button&gt;
&lt;/form&gt;

&lt;?php foreach (array_reverse($entries) as $e): ?&gt;
  &lt;div class="entry"&gt;
    &lt;strong&gt;&lt;?= htmlspecialchars($e["name"]) ?&gt;&lt;/strong&gt;
    &lt;small&gt;&lt;?= $e["time"] ?&gt;&lt;/small&gt;
    &lt;p&gt;&lt;?= nl2br(htmlspecialchars($e["msg"])) ?&gt;&lt;/p&gt;
  &lt;/div&gt;
&lt;?php endforeach; ?&gt;</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> add a session-based "you already signed" notice, a delete button protected by an admin session, and swap the JSON file for a MySQL table using PDO.</div>`),
          quiz("php-quiz-3", "Final Quiz: PHP", [
            { q: "Why redirect after a successful POST?", options: ["Speed", "Prevents duplicate submits on refresh", "PHP requires it", "SEO"], answer: 1 },
            { q: "nl2br(htmlspecialchars($msg)) — why this order?", options: ["Random", "Escape first, then convert newlines — so user HTML stays harmless", "br tags need escaping", "It's alphabetical"], answer: 1 },
            { q: "array_reverse($entries) in the display shows...", options: ["Oldest first", "Newest first", "Random order", "Only 10"], answer: 1 },
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
      {
        title: "Templates & the ORM",
        lessons: [
          article("dj-templates", "Templates: HTML with Superpowers", "13 min", `
<h3>🎯 Intro</h3>
<p>Views hand data to templates; templates render HTML with loops, conditions and inheritance.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>{{ variable }}</code> prints (auto-escaped — XSS-safe by default)</li>
  <li><code>{% for %} {% if %}</code> control flow</li>
  <li><code>{% extends "base.html" %}</code> — one layout, many pages</li>
</ul>
<h3>💻 Example</h3>
<pre><code># courses/views.py
from django.shortcuts import render
from .models import Course

def course_list(request):
    courses = Course.objects.all()
    return render(request, "courses/list.html", {"courses": courses})

&lt;!-- templates/courses/list.html --&gt;
{% extends "base.html" %}
{% block content %}
  &lt;h1&gt;Our Courses ({{ courses|length }})&lt;/h1&gt;
  {% if not courses %}
    &lt;p&gt;No courses yet — check back soon!&lt;/p&gt;
  {% endif %}
  &lt;ul&gt;
  {% for c in courses %}
    &lt;li&gt;{{ c.title }} — {{ c.hours }}h
        {% if c.free %}&lt;strong&gt;FREE&lt;/strong&gt;{% endif %}&lt;/li&gt;
  {% endfor %}
  &lt;/ul&gt;
{% endblock %}</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make a base.html with a nav block, and an about page that extends it.</div>`),
          article("dj-orm", "Querying with the ORM", "13 min", `
<h3>🎯 Intro</h3>
<p>The ORM writes SQL for you — in Python. Filters chain, reads are lazy, and it's injection-proof by design.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>Model.objects.all() / .get(id=1) / .filter(...)</code></li>
  <li>Field lookups: <code>hours__gte=5</code>, <code>title__icontains="css"</code></li>
  <li><code>.order_by("-hours")</code> sorts; <code>.count()</code> aggregates</li>
</ul>
<h3>💻 Example</h3>
<pre><code>from courses.models import Course

Course.objects.create(title="Django", hours=12, free=True)

long_free = (Course.objects
    .filter(free=True, hours__gte=5)
    .exclude(title__icontains="old")
    .order_by("-hours"))

first = Course.objects.get(id=1)      # exactly one (or error)
total = Course.objects.count()

# UPDATE and DELETE
first.hours = 13
first.save()
Course.objects.filter(hours__lt=1).delete()</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> in <code>python manage.py shell</code>, create 3 courses and query: free ones, the longest one, and how many contain "web" in the title.</div>`),
          quiz("dj-quiz-2", "Quiz: Templates & ORM", [
            { q: "{{ user_input }} in a template is...", options: ["Dangerous by default", "Auto-escaped (XSS-safe)", "Ignored", "Only for numbers"], answer: 1 },
            { q: "hours__gte=5 means hours...", options: ["equals 5", "greater than or equal to 5", "less than 5", "grouped by 5"], answer: 1 },
            { q: "{% extends \"base.html\" %} gives you...", options: ["Faster queries", "Layout inheritance", "A database", "URL routing"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Project: Course Site",
        lessons: [
          article("dj-project", "Final Project: List & Detail Pages", "20 min", `
<h3>🎯 Intro</h3>
<p>The classic Django pattern — a list page linking to detail pages — is the skeleton of blogs, shops and course sites alike.</p>
<h3>💻 Complete solution — study it, then build yours</h3>
<pre><code># courses/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.course_list, name="course_list"),
    path("course/&lt;int:pk&gt;/", views.course_detail, name="course_detail"),
]

# courses/views.py
from django.shortcuts import render, get_object_or_404
from .models import Course

def course_list(request):
    q = request.GET.get("q", "")
    courses = Course.objects.filter(title__icontains=q) if q \\
              else Course.objects.all()
    return render(request, "courses/list.html",
                  {"courses": courses, "q": q})

def course_detail(request, pk):
    course = get_object_or_404(Course, pk=pk)   # clean 404 if missing
    return render(request, "courses/detail.html", {"course": course})

&lt;!-- list.html (inside the content block) --&gt;
&lt;form&gt;&lt;input name="q" value="{{ q }}" placeholder="Search…"&gt;&lt;/form&gt;
{% for c in courses %}
  &lt;p&gt;&lt;a href="{% url 'course_detail' c.pk %}"&gt;{{ c.title }}&lt;/a&gt;&lt;/p&gt;
{% empty %}
  &lt;p&gt;Nothing found for “{{ q }}”.&lt;/p&gt;
{% endfor %}

&lt;!-- detail.html --&gt;
&lt;h1&gt;{{ course.title }}&lt;/h1&gt;
&lt;p&gt;{{ course.hours }} hours · {% if course.free %}Free{% else %}Premium{% endif %}&lt;/p&gt;
&lt;a href="{% url 'course_list' %}"&gt;← All courses&lt;/a&gt;</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> add an Enrollment model with a ForeignKey to Course, show enrollment counts on the list page, and register both models in the admin.</div>`),
          quiz("dj-quiz-3", "Final Quiz: Django", [
            { q: "get_object_or_404 does what when the id doesn't exist?", options: ["Crashes with 500", "Returns None", "Shows a clean 404 page", "Creates the object"], answer: 2 },
            { q: "{% url 'course_detail' c.pk %} generates...", options: ["A database query", "The URL for that route by name", "A template", "JavaScript"], answer: 1 },
            { q: "{% empty %} inside {% for %} renders when...", options: ["There's an error", "The list has no items", "The loop ends", "Always"], answer: 1 },
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
    hours: 11,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#00618a,#5aa8c9)",
    icon: "SQL",
    description:
      "Every serious application stores data in a database, and SQL is how you talk to it. This full course covers SELECT and filtering, safe data changes, aggregation with GROUP BY, all the JOIN types, and finishes with a real school-database project.",
    whatYouLearn: [
      "SELECT with WHERE, ORDER BY and LIMIT",
      "Pattern matching with LIKE, IN, BETWEEN and NULL handling",
      "INSERT, UPDATE, DELETE safely",
      "Aggregate with COUNT, SUM, AVG, GROUP BY and HAVING",
      "Combine tables with INNER and LEFT JOIN",
      "Answer real questions against a realistic schema",
    ],
    sections: [
      {
        title: "Query Foundations",
        lessons: [
          article("sql-select", "SELECT: Asking Questions", "11 min", `
<h3>🎯 Intro</h3>
<p>A query describes <em>what</em> you want; the database figures out how to get it.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>SELECT columns FROM table</code> — <code>*</code> means all columns</li>
  <li><code>WHERE</code> filters rows, <code>ORDER BY ... DESC</code> sorts</li>
  <li><code>LIMIT</code> caps how many rows come back</li>
  <li><code>AS</code> renames columns in the result</li>
</ul>
<h3>💻 Example</h3>
<pre><code>SELECT name, score
FROM students
WHERE score &gt;= 60
ORDER BY score DESC
LIMIT 5;

-- top 5 passing students, best first

SELECT name, score * 1.0 / 100 AS ratio
FROM students;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a query for the 3 cheapest products under 10000 from a products(name, price) table.</div>`),
          article("sql-where", "Filtering Like a Pro", "12 min", `
<h3>🎯 Intro</h3>
<p>Real questions are rarely "score = 60". They're ranges, patterns, lists — and the tricky business of missing data.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>BETWEEN 60 AND 80</code>, <code>IN ("Yangon", "Mandalay")</code></li>
  <li><code>LIKE 'A%'</code> starts with A; <code>'%web%'</code> contains web</li>
  <li>NULL is special: use <code>IS NULL / IS NOT NULL</code>, never <code>= NULL</code></li>
  <li>Combine: <code>AND</code>, <code>OR</code>, parentheses for clarity</li>
</ul>
<h3>💻 Example</h3>
<pre><code>SELECT name, city, score
FROM students
WHERE score BETWEEN 60 AND 89
  AND city IN ('Yangon', 'Mandalay')
  AND name LIKE 'A%';

-- students who never took the exam:
SELECT name FROM students WHERE score IS NULL;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> find products whose name contains "phone", priced 100–500, from brands ('Apple','Samsung') — then all products with no description (NULL).</div>`),
          article("sql-crud", "INSERT, UPDATE, DELETE", "10 min", `
<h3>🎯 Intro</h3>
<p>Changing data is easy — dangerously easy. The WHERE clause is your seatbelt.</p>
<h3>💻 Example</h3>
<pre><code>INSERT INTO students (name, score) VALUES ("Hla", 72);

UPDATE students SET score = 80 WHERE name = "Hla";

DELETE FROM students WHERE score &lt; 20;

-- ⚠ UPDATE/DELETE without WHERE touches EVERY row!</code></pre>
<div class="callout tip">Pro habit: before an UPDATE or DELETE, run a SELECT with the same WHERE first — see exactly which rows you're about to change.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> insert three students, raise one score by 10, then delete one by name — running the safety SELECT before each change.</div>`),
          quiz("sql-quiz", "Quiz: Query Foundations", [
            { q: "Which clause filters rows?", options: ["FILTER", "WHERE", "HAVING only", "LIMIT"], answer: 1 },
            { q: "DELETE FROM users; (no WHERE) does what?", options: ["Deletes one row", "Errors", "Deletes ALL rows", "Nothing"], answer: 2 },
            { q: "How do you find rows where email is missing?", options: ["email = NULL", "email == NULL", "email IS NULL", "email EMPTY"], answer: 2 },
            { q: "name LIKE 'M%' matches...", options: ["Names containing M", "Names starting with M", "Names ending with M", "Exactly 'M%'"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Aggregation & Joining Tables",
        lessons: [
          article("sql-agg", "COUNT, SUM & GROUP BY", "13 min", `
<h3>🎯 Intro</h3>
<p>Aggregates turn thousands of rows into one answer: totals, averages, counts — per group.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>COUNT(*) SUM(x) AVG(x) MIN(x) MAX(x)</code></li>
  <li><code>GROUP BY city</code> — one result row per city</li>
  <li><code>HAVING</code> filters <em>groups</em> (WHERE filters rows, before grouping)</li>
</ul>
<h3>💻 Example</h3>
<pre><code>-- sales summary per city
SELECT city,
       COUNT(*)      AS orders,
       SUM(amount)   AS total,
       AVG(amount)   AS avg_order
FROM orders
GROUP BY city
HAVING SUM(amount) &gt; 100000
ORDER BY total DESC;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> from enrollments(course_id, student, paid), count students and sum payments per course — only courses with 10+ students.</div>`),
          article("sql-join", "INNER JOIN", "14 min", `
<h3>🎯 Intro</h3>
<p>JOIN combines tables; GROUP BY summarizes. Together they answer real business questions.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>JOIN table2 ON table2.fk = table1.id</code> — match rows across tables</li>
  <li>Table aliases (<code>courses c</code>) keep queries readable</li>
  <li>INNER JOIN keeps only rows that match on BOTH sides</li>
</ul>
<h3>💻 Example</h3>
<pre><code>-- how many students per course?
SELECT c.title, COUNT(e.student_id) AS students
FROM courses c
JOIN enrollments e ON e.course_id = c.id
GROUP BY c.title
ORDER BY students DESC;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write a query for total sales per city from orders joined to customers(city).</div>`),
          article("sql-left", "LEFT JOIN & Missing Matches", "12 min", `
<h3>🎯 Intro</h3>
<p>INNER JOIN silently drops rows without a match. LEFT JOIN keeps them — essential for questions about what's <em>missing</em>.</p>
<h3>📝 Summary</h3>
<ul>
  <li><code>LEFT JOIN</code> keeps every left-table row; unmatched right columns become NULL</li>
  <li>"Which courses have NO students?" → LEFT JOIN + <code>IS NULL</code></li>
  <li>COUNT(column) skips NULLs — perfect with LEFT JOIN</li>
</ul>
<h3>💻 Example</h3>
<pre><code>-- every course, including empty ones
SELECT c.title, COUNT(e.id) AS students
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.title;

-- ONLY the courses nobody enrolled in
SELECT c.title
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
WHERE e.id IS NULL;</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> list customers who have never placed an order (customers LEFT JOIN orders + IS NULL).</div>`),
          quiz("sql-quiz-2", "Quiz: Aggregation & Joins", [
            { q: "JOIN is used to...", options: ["Merge databases", "Combine rows from related tables", "Create indexes", "Backup data"], answer: 1 },
            { q: "HAVING differs from WHERE because it filters...", options: ["Columns", "Groups after aggregation", "Tables", "Nothing — identical"], answer: 1 },
            { q: "To include courses with zero enrollments you need...", options: ["INNER JOIN", "LEFT JOIN", "DOUBLE JOIN", "GROUP BY"], answer: 1 },
            { q: "AVG(amount) computes...", options: ["The total", "The row count", "The mean value", "The median"], answer: 2 },
          ]),
        ],
      },
      {
        title: "Project: The School Database",
        lessons: [
          article("sql-project", "Final Project: Answer Real Questions", "22 min", `
<h3>🎯 Intro</h3>
<p>Here's a realistic mini-schema. Your job: answer the questions a school manager would actually ask.</p>
<h3>📝 The schema</h3>
<pre><code>students(id, name, city)
courses(id, title, fee)
enrollments(id, student_id, course_id, score)</code></pre>
<h3>💻 The questions — with solutions to check yourself</h3>
<pre><code>-- 1. Top 3 students by average score
SELECT s.name, AVG(e.score) AS avg_score
FROM students s
JOIN enrollments e ON e.student_id = s.id
GROUP BY s.name
ORDER BY avg_score DESC
LIMIT 3;

-- 2. Revenue per course (enrollment count × fee)
SELECT c.title, COUNT(e.id) * c.fee AS revenue
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.title, c.fee
ORDER BY revenue DESC;

-- 3. Pass rate per course (score >= 60)
SELECT c.title,
       ROUND(100.0 * SUM(CASE WHEN e.score &gt;= 60 THEN 1 ELSE 0 END)
             / COUNT(e.id), 1) AS pass_pct
FROM courses c
JOIN enrollments e ON e.course_id = c.id
GROUP BY c.title;

-- 4. Students from Yangon not enrolled in anything
SELECT s.name
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
WHERE s.city = 'Yangon' AND e.id IS NULL;</code></pre>
<h3>🏋️ Level up</h3>
<div class="callout tip"><strong>Extend it yourself:</strong> write queries for (a) each city's average score, (b) the most popular course per city, (c) students enrolled in 2+ courses. Practice free at sqliteonline.com.</div>`),
          quiz("sql-quiz-3", "Final Quiz: SQL", [
            { q: "CASE WHEN score >= 60 THEN 1 ELSE 0 END inside SUM() computes...", options: ["The max score", "A conditional count", "An error", "The average"], answer: 1 },
            { q: "Why does query 2 use LEFT JOIN?", options: ["Speed", "So courses with zero enrollments still appear with 0 revenue", "Style", "INNER JOIN is deprecated"], answer: 1 },
            { q: "GROUP BY c.title, c.fee — the second column is there because...", options: ["It sorts results", "Selected non-aggregated columns must be grouped", "Fees repeat", "It's optional decoration"], answer: 1 },
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
  {
    id: "ai-for-kids",
    title: "AI for Beginners: Train Your First AI (Ages 10+)",
    subtitle: "No coding needed! Teach a real AI to see, hear and think — then learn to use chatbots wisely.",
    instructor: "Su Myat",
    category: "AI",
    level: "Beginner",
    rating: 4.9,
    ratings: 8100,
    students: 64000,
    hours: 6,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#7b2ff7,#00c9a7)",
    icon: "🤖",
    description:
      "Made for young beginners (great from age 10 up — fun at any age!). You'll train a REAL artificial intelligence with your webcam, build a machine-learning powered game with blocks, and learn to talk to AI chatbots the smart, honest way. Every tool in this course is free — no coding experience needed.",
    whatYouLearn: [
      "What AI really is — and where you already meet it every day",
      "Train an image AI with your webcam (Teachable Machine)",
      "Teach an AI to understand text, and use it inside a Scratch game",
      "Write good prompts that get great answers from chatbots",
      "Use AI honestly: avoid plagiarism, check facts, protect privacy",
    ],
    sections: [
      {
        title: "Step 1 — Meet AI & Train Your First Model",
        lessons: [
          article("ai-what", "What is AI, Really?", "8 min", `
<h3>🎯 Intro</h3>
<p>AI (Artificial Intelligence) is a computer program that <strong>learns from examples</strong> instead of following exact instructions. You don't tell it the rules — you show it examples, and it figures out the rules itself!</p>
<h3>📝 Summary</h3>
<ul>
  <li>🎵 Music apps learn what songs you like → suggest new ones</li>
  <li>📷 Your phone camera finds faces → that's AI seeing</li>
  <li>🗣️ Voice assistants understand speech → that's AI hearing</li>
  <li>💬 Chatbots write answers → that's AI using language</li>
</ul>
<p>The learning part is called <strong>Machine Learning (ML)</strong>: show the computer many examples ("this is a cat", "this is a dog") and it learns to tell them apart — just like you learned as a small child!</p>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> write down 3 places YOU met AI this week (phone, games, apps, YouTube...). For each one, guess: what examples did it learn from?</div>`),
          article("ai-teachable", "Train an AI with Your Webcam", "15 min", `
<h3>🎯 Intro</h3>
<p>Time to train a REAL AI — in your browser, for free, with zero code. We'll use <strong>Google Teachable Machine</strong>.</p>
<h3>📝 Follow these steps</h3>
<ol style="line-height:2">
  <li>Open <a href="https://teachablemachine.withgoogle.com" target="_blank" rel="noopener"><strong>teachablemachine.withgoogle.com</strong></a> → <strong>Get Started</strong></li>
  <li>Choose <strong>Image Project</strong> → Standard</li>
  <li>Rename Class 1 to <strong>"Happy"</strong> — hold the webcam button and record ~50 pictures of yourself smiling 😊</li>
  <li>Rename Class 2 to <strong>"Sad"</strong> — record ~50 pictures frowning 😢</li>
  <li>Click <strong>Train Model</strong> and wait a moment</li>
  <li>Now make faces at the camera — watch the AI guess your mood LIVE!</li>
</ol>
<h3>🤔 What just happened?</h3>
<p>You gave the AI <strong>examples</strong> (your photos), it found <strong>patterns</strong> (mouth shape, eyebrows...), and now it can judge pictures it has <em>never seen before</em>. That's machine learning — the same idea behind self-driving cars and medical AI, just smaller!</p>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> train a new model with 3 classes: ✊ Rock, ✋ Paper, ✌️ Scissors. Test it — can it referee your game? What happens if you show it a thumbs-up it never learned?</div>`),
          article("ai-data", "Why AI Makes Mistakes (Data Matters!)", "10 min", `
<h3>🎯 Intro</h3>
<p>Did your Rock-Paper-Scissors AI ever guess wrong? Great — that's the most important lesson in all of AI!</p>
<h3>📝 Summary</h3>
<ul>
  <li>AI is only as good as its <strong>training data</strong> (the examples)</li>
  <li>Few examples → weak AI. Only bright-room photos → fails in the dark</li>
  <li>If all your "cat" photos are orange cats, it may think a black cat is a dog! This is called <strong>bias</strong></li>
  <li>Real AI teams spend most of their time collecting good, fair, varied data</li>
</ul>
<h3>🧪 Experiment</h3>
<p>Go back to Teachable Machine and make your model STRONGER: add examples with different lighting, angles, distances, and backgrounds. Test again — better, right?</p>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Think like an AI engineer:</strong> a hospital AI learned only from adult X-rays. What might happen with a child's X-ray? How would you fix the training data?</div>`),
          quiz("ai-quiz-1", "Quiz: AI Basics", [
            { q: "How does machine learning work?", options: ["Programmers type in every rule", "The computer learns patterns from examples", "It's magic", "It copies from the internet"], answer: 1 },
            { q: "Your face-mood AI guesses wrong in a dark room. The best fix is...", options: ["A faster computer", "Add training photos taken in the dark", "Train it longer on the same photos", "Give up"], answer: 1 },
            { q: "Training data with only orange cats causes...", options: ["Faster AI", "Bias — the AI may not recognize other cats", "Better accuracy", "Nothing"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Step 2 — Real ML Projects with Blocks",
        lessons: [
          article("ai-mlkids", "Machine Learning for Kids: Text AI", "15 min", `
<h3>🎯 Intro</h3>
<p><strong>Machine Learning for Kids</strong> (free) lets you train AIs on text, numbers and sounds — then USE your model inside Scratch, the block-coding tool.</p>
<h3>📝 Build a compliment/insult detector</h3>
<ol style="line-height:2">
  <li>Open <a href="https://machinelearningforkids.co.uk" target="_blank" rel="noopener"><strong>machinelearningforkids.co.uk</strong></a> → "Get started" → "Try it now" (no account needed)</li>
  <li><strong>Add a new project</strong> → name: "Kind or Mean" → recognising <strong>text</strong></li>
  <li>Make two labels: <strong>kind</strong> and <strong>mean</strong></li>
  <li>Add ~10 examples each: "You are awesome" → kind, "Nobody likes you" → mean...</li>
  <li><strong>Learn &amp; Test</strong> → train the model → type NEW sentences and watch it classify them!</li>
</ol>
<h3>🤔 Notice</h3>
<p>It understands sentences you never typed! It learned <em>patterns of words</em>, not a fixed list — the same idea behind spam filters and comment moderation on real websites.</p>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make it smarter — add tricky examples like "you are not nice" (mean, even though "nice" appears!). Retrain and test.</div>`),
          article("ai-scratch", "Put Your AI Inside a Game", "15 min", `
<h3>🎯 Intro</h3>
<p>The magic step: your trained model becomes a Scratch block you can drag into a real game.</p>
<h3>📝 Build it</h3>
<ol style="line-height:2">
  <li>In your ML for Kids project → <strong>Make</strong> → <strong>Scratch 3</strong> → "Open in Scratch"</li>
  <li>You'll see new blocks like <code>recognise text (…)</code> under your project's name</li>
  <li>Build this script on a character sprite:
    <pre><code>when green flag clicked
forever
  ask "Say something to me!" and wait
  if &lt;recognise text (answer) = kind&gt; then
    say "Thank you! 😊" for 2 seconds
  else
    say "That wasn't very nice... 😢" for 2 seconds</code></pre></li>
  <li>Press the green flag — your character now UNDERSTANDS feelings!</li>
</ol>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Level up:</strong> make the character dance when the message is kind, and add a third label "question" that makes it answer "Good question!". Show your game to a friend!</div>`),
          quiz("ai-quiz-2", "Quiz: ML Projects", [
            { q: "Your text AI understood a sentence you never trained it on. Why?", options: ["It memorized the internet", "It learned word patterns, not a fixed list", "Luck", "Scratch wrote it"], answer: 1 },
            { q: "\"You are not nice\" being MEAN teaches the AI...", options: ["Nothing useful", "That word combinations matter, not single words", "To be rude", "Grammar"], answer: 1 },
            { q: "ML for Kids + Scratch lets you...", options: ["Only watch demos", "Use your own trained model inside a game you build", "Just play games", "Write Python"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Step 3 — Chatbots: Prompts & Playing Fair",
        lessons: [
          article("ai-prompts", "Prompt Power: Talking to AI Chatbots", "12 min", `
<h3>🎯 Intro</h3>
<p>Chatbots (like Gemini, ChatGPT or Copilot — all have free versions) answer better when you ask better. Writing good questions is a real skill called <strong>prompting</strong>.</p>
<h3>📝 The 4 rules of a great prompt</h3>
<ul>
  <li><strong>1. Be specific:</strong> ❌ "tell me about animals" → ✅ "List 5 amazing facts about octopuses, for a 12-year-old"</li>
  <li><strong>2. Give it a role:</strong> "You are a friendly science teacher. Explain why the sky is blue."</li>
  <li><strong>3. Show the format you want:</strong> "...as a table with columns: Animal, Superpower"</li>
  <li><strong>4. Improve in rounds:</strong> answer too hard? Reply "simpler please, with an example"</li>
</ul>
<h3>💻 Example — same question, two ways</h3>
<pre><code>Weak:   "help with math"

Strong: "You are a patient math tutor. I'm learning fractions.
        Explain how to add 1/2 + 1/3 step by step,
        then give me 2 practice problems (don't show answers yet)."</code></pre>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> pick a topic you love (football, K-pop, Minecraft...). Write one weak prompt and one strong prompt using all 4 rules. Compare the answers!</div>`),
          article("ai-ethics", "Using AI Honestly (The Champion's Rules)", "12 min", `
<h3>🎯 Intro</h3>
<p>AI is a powerful helper — and with power comes responsibility. These rules keep you smart, safe and honest.</p>
<h3>📝 The Champion's Rules</h3>
<ul>
  <li><strong>🎓 AI is a tutor, not a cheat code.</strong> "Explain this so I understand" = learning. Copy-pasting AI homework as your own = plagiarism, and you learn nothing.</li>
  <li><strong>🔍 AI can be confidently WRONG.</strong> It sometimes invents facts (called "hallucination"). Always double-check important facts in another source.</li>
  <li><strong>🔒 Protect your private info.</strong> Never tell a chatbot your full name, address, school, passwords, or photos of yourself.</li>
  <li><strong>⚖️ Remember bias.</strong> AI learned from human writing — it can repeat human unfairness. If an answer feels wrong about a group of people, question it.</li>
  <li><strong>🙋 Say when you used AI.</strong> "I used AI to help brainstorm" is honest and totally OK when allowed.</li>
</ul>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Decide — OK or not OK?</strong> (a) Asking AI to explain photosynthesis before a test. (b) Submitting an AI essay with your name on it. (c) Asking AI to quiz you with practice questions. (d) Telling it your home address for "better answers". Discuss with a friend or parent!</div>`),
          quiz("ai-quiz-3", "Final Quiz: AI Champion", [
            { q: "Which prompt gets the best answer?", options: ["\"science\"", "\"You are a science teacher. Explain gravity to a 12-year-old with one fun example.\"", "\"tell me stuff\"", "\"gravity now\""], answer: 1 },
            { q: "An AI 'hallucination' is...", options: ["A scary picture", "When AI confidently states something false", "A computer virus", "A dream"], answer: 1 },
            { q: "AI wrote your whole essay and you submit it as yours. This is...", options: ["Smart time-saving", "Plagiarism — and you learned nothing", "Teamwork", "Fine if not caught"], answer: 1 },
            { q: "What should you NEVER share with a chatbot?", options: ["Your favorite color", "Math questions", "Your address and passwords", "Song lyrics"], answer: 2 },
          ]),
        ],
      },
    ],
  },
  {
    id: "scratch-kids",
    title: "Scratch: Code Your First Games (Ages 8+)",
    subtitle: "Snap colorful blocks together and make games, stories and animations — the world's favorite first coding language.",
    instructor: "Su Myat",
    category: "Kids",
    level: "Beginner",
    rating: 4.9,
    ratings: 15200,
    students: 118000,
    hours: 6,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#f9a825,#ff6f00)",
    icon: "🐱",
    description:
      "Scratch (from MIT) is where millions of kids write their first code — no typing, no errors, just snapping blocks like LEGO. You'll make characters move and talk, build a complete Catch-the-Apple game with scoring, and share your creations with the world.",
    whatYouLearn: [
      "Find your way around Scratch and control sprites",
      "Events, loops and 'if' blocks — real programming logic",
      "Build a complete game with score and game-over",
      "Variables — the boxes that remember things",
      "Create an animated story and share your projects",
    ],
    sections: [
      {
        title: "Scratch Basics",
        lessons: [
          article("sc-start", "Meet Scratch: Make the Cat Move", "12 min", `
<h3>🎯 Intro</h3>
<p><strong>Scratch</strong> is free, runs in your browser, and needs zero typing. Let's make the famous cat obey your code!</p>
<h3>📝 Follow these steps</h3>
<ol style="line-height:2">
  <li>Open <a href="https://scratch.mit.edu" target="_blank" rel="noopener"><strong>scratch.mit.edu</strong></a> → click <strong>Create</strong> (make a free account so you can save!)</li>
  <li>The screen has 3 parts: <strong>blocks</strong> (left), your <strong>code area</strong> (middle), the <strong>stage</strong> where the cat lives (right)</li>
  <li>Drag <code>when 🚩 clicked</code> (Events, yellow) into the code area</li>
  <li>Snap <code>move 10 steps</code> (Motion, blue) underneath it</li>
  <li>Snap <code>say "Hello!" for 2 seconds</code> (Looks, purple) under that</li>
  <li>Click the green flag 🚩 above the stage — the cat moves and talks!</li>
</ol>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make the cat move 50 steps, say your name, then <code>play sound Meow</code>. Then click the cat's costume tab and change its color!</div>`),
          article("sc-loops", "Events, Loops & Dance Party", "13 min", `
<h3>🎯 Intro</h3>
<p>Two superpowers turn blocks into programs: <strong>events</strong> (WHEN things happen) and <strong>loops</strong> (REPEAT things).</p>
<h3>📝 Build a dance party</h3>
<ol style="line-height:2">
  <li>Start with <code>when 🚩 clicked</code></li>
  <li>Add <code>forever</code> (Control, orange) — everything inside repeats forever</li>
  <li>Inside it put: <code>next costume</code> + <code>wait 0.3 seconds</code> — the cat dances!</li>
  <li>Add music: another <code>when 🚩 clicked</code> script with <code>forever</code> + <code>play sound until done</code></li>
  <li>Add a second dancer: click <strong>Choose a Sprite</strong> (bottom right) and give them their own dance script</li>
</ol>
<div class="callout tip">Two scripts running at the same time — you just wrote a <strong>parallel program</strong>. Many adult programmers find that hard! 😎</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make the dance party start when you press the SPACE key instead (find the <code>when key pressed</code> block), and make a sprite spin using <code>turn 15 degrees</code> in a loop.</div>`),
          quiz("sc-quiz-1", "Quiz: Scratch Basics", [
            { q: "Which block starts your program when the green flag is clicked?", options: ["move 10 steps", "when 🚩 clicked", "forever", "say Hello"], answer: 1 },
            { q: "The 'forever' block...", options: ["Runs code once", "Repeats everything inside it non-stop", "Deletes code", "Only works with sound"], answer: 1 },
            { q: "Two sprites each running their own script at once is called...", options: ["A bug", "Parallel programs", "Cheating", "A costume"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Build a Real Game",
        lessons: [
          article("sc-game", "Catch the Apple — Full Game", "18 min", `
<h3>🎯 Intro</h3>
<p>Time to build a complete game: apples fall from the sky, you catch them with a bowl. Every real game concept is in here!</p>
<h3>📝 Build it step by step</h3>
<ol style="line-height:2">
  <li><strong>New project.</strong> Delete the cat (right-click → delete). Add sprites: <strong>Bowl</strong> and <strong>Apple</strong></li>
  <li><strong>Bowl script:</strong> <code>when 🚩 clicked</code> → <code>forever</code> → <code>set x to (mouse x)</code> — the bowl follows your mouse left/right</li>
  <li><strong>Apple script:</strong>
    <pre><code>when 🚩 clicked
forever
  go to x: (pick random -220 to 220) y: 180
  repeat until &lt;touching Bowl?&gt; or &lt;y position &lt; -170&gt;
    change y by -7
  if &lt;touching Bowl?&gt; then
    play sound Pop</code></pre></li>
  <li>Click 🚩 — you're playing your own game! 🎮</li>
</ol>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> make the apple fall faster (change y by -12), then add a second falling sprite — a banana!</div>`),
          article("sc-score", "Variables: Score & Game Over", "15 min", `
<h3>🎯 Intro</h3>
<p>A <strong>variable</strong> is a box that remembers a number — like your score. This is one of the biggest ideas in ALL of programming.</p>
<h3>📝 Add scoring to your game</h3>
<ol style="line-height:2">
  <li>Go to <strong>Variables</strong> (dark orange) → <strong>Make a Variable</strong> → name it <code>score</code>; make another called <code>lives</code></li>
  <li>Start of the game: <code>set score to 0</code>, <code>set lives to 3</code></li>
  <li>When the apple touches the Bowl: <code>change score by 1</code></li>
  <li>When the apple reaches the bottom (missed!): <code>change lives by -1</code></li>
  <li>Add inside the forever loop:
    <pre><code>if &lt;lives = 0&gt; then
  say "Game Over! Score: " join (score)
  stop all</code></pre></li>
  <li><strong>Level-up trick:</strong> make the fall speed <code>change y by (-7 - (score / 5))</code> — the game gets faster as you score!</li>
</ol>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add a golden apple sprite worth +5 points that falls twice as fast. Then challenge a family member to beat your high score!</div>`),
          quiz("sc-quiz-2", "Quiz: Game Building", [
            { q: "A variable is best described as...", options: ["A sprite costume", "A box that remembers a value, like your score", "A sound effect", "A type of loop"], answer: 1 },
            { q: "Which block detects the apple hitting the bowl?", options: ["when 🚩 clicked", "touching Bowl?", "play sound", "set x to"], answer: 1 },
            { q: "(-7 - (score / 5)) for fall speed means...", options: ["The game slows down", "The game speeds up as your score grows", "Nothing changes", "The apple falls up"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Create, Share & What's Next",
        lessons: [
          article("sc-story", "Animated Story Time", "13 min", `
<h3>🎯 Intro</h3>
<p>Scratch isn't only games — it's a movie studio! Let's animate a two-character story with scene changes.</p>
<h3>📝 Build a mini movie</h3>
<ol style="line-height:2">
  <li>Pick a <strong>Backdrop</strong> (bottom-right button) — e.g. a forest — plus a second one, e.g. a castle</li>
  <li>Add two character sprites. Characters talk in turns using <code>say ... for 2 seconds</code> and <code>wait 2 seconds</code> so they don't talk over each other</li>
  <li>Change scenes with <code>switch backdrop to castle</code></li>
  <li>Make a character walk off-screen: <code>glide 2 secs to x: 240 y: -100</code></li>
  <li>Use <code>broadcast message1</code> + <code>when I receive message1</code> to make sprites react to each other — like actors taking cues!</li>
</ol>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> create a 30-second story with 2 scenes, 2 characters and at least one broadcast. Myanmar folk tales make great material! 🇲🇲</div>`),
          article("sc-share", "Share Your Work & Choose Your Path", "10 min", `
<h3>🎯 Intro</h3>
<p>Real creators ship! And after Scratch, you have exciting roads ahead.</p>
<h3>📝 Share on Scratch</h3>
<ul>
  <li>Click <strong>Share</strong> on your project — it gets a link anyone can play</li>
  <li>Explore others' projects and click <strong>See inside</strong> to read their code — remixing is how everyone learns</li>
</ul>
<h3>🗺️ Your next step — pick what excites you most:</h3>
<ul>
  <li>🌐 <strong>Websites:</strong> our <em>Web Basics</em> course — build real pages with HTML &amp; CSS (very visual, super rewarding)</li>
  <li>🎮 <strong>More games:</strong> our <em>Game Creation</em> course — Roblox Studio and retro arcade games</li>
  <li>🤖 <strong>AI:</strong> our <em>AI for Beginners</em> course — train real AI models with your webcam</li>
  <li>📚 <strong>More block practice:</strong> free lessons at code.org and Google CS First</li>
</ul>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Graduation task:</strong> share your Catch-the-Apple game, send the link to a friend, and enroll in your chosen next course on this site!</div>`),
          quiz("sc-quiz-3", "Final Quiz: Scratch", [
            { q: "broadcast + when-I-receive blocks let sprites...", options: ["Change color", "Send signals to each other", "Play music", "Delete themselves"], answer: 1 },
            { q: "\"See inside\" on someone's Scratch project lets you...", options: ["Hack their account", "Read their code and learn from it", "Delete their project", "Nothing"], answer: 1 },
            { q: "After Scratch, which is a natural next step?", options: ["Nothing, coding is finished", "HTML/CSS websites, game dev, or AI — whichever excites you", "Only university courses", "Memorizing syntax"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "gamedev-kids",
    title: "Game Creation: Roblox, Arcade & micro:bit (Ages 10+)",
    subtitle: "Build 3D worlds in Roblox, retro games in your browser, and program a pocket robot — real code through play.",
    instructor: "Ko Zaw",
    category: "Kids",
    level: "Beginner",
    rating: 4.8,
    ratings: 9800,
    students: 87000,
    hours: 7,
    price: "Free",
    free: true,
    color: "linear-gradient(135deg,#00a2ff,#e2231a)",
    icon: "🎮",
    description:
      "Learn real programming through the games you already love. Script your first Roblox world in Lua, build a retro arcade game that runs in any browser (MakeCode Arcade — totally free), and program a micro:bit robot in a simulator. Typing real code starts here!",
    whatYouLearn: [
      "Build and test a 3D world in Roblox Studio",
      "Write your first real Lua script (a lava trap!)",
      "Create a complete retro game with MakeCode Arcade",
      "Program a micro:bit in the free online simulator",
      "Decide your path: game dev, web dev, or AI",
    ],
    sections: [
      {
        title: "Roblox Studio: Your First 3D World",
        lessons: [
          article("rb-studio", "Build a World in Roblox Studio", "15 min", `
<h3>🎯 Intro</h3>
<p><strong>Roblox Studio</strong> is the free tool behind every Roblox game — and 12-year-olds have made games played by millions.</p>
<h3>📝 First world</h3>
<ol style="line-height:2">
  <li>Download <strong>Roblox Studio</strong> free from roblox.com/create (a normal Roblox account works)</li>
  <li>New → <strong>Baseplate</strong> template</li>
  <li>Use <strong>Part</strong> (Home tab) to drop blocks; move/scale/rotate them with the tools — build a small obstacle course (an "obby"!)</li>
  <li>Color parts with <strong>Material</strong> and <strong>Color</strong>; anchor them (Anchor button) so they don't fall</li>
  <li>Press <strong>▶ Play</strong> — your avatar spawns INSIDE your world. Walk your course!</li>
</ol>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build a 5-jump obby ending on a golden platform. Test that every jump is actually possible!</div>`),
          article("rb-lua", "Your First Lua Script: The Lava Trap", "15 min", `
<h3>🎯 Intro</h3>
<p>Now the real magic — <strong>typed code</strong>. Roblox uses the <strong>Lua</strong> language. Let's make a lava block that defeats players who touch it.</p>
<h3>📝 Script it</h3>
<ol style="line-height:2">
  <li>Add a Part, color it red/orange, name it <strong>Lava</strong> (in Explorer panel)</li>
  <li>Right-click the part in Explorer → <strong>Insert Object → Script</strong></li>
  <li>Replace the code with:
    <pre><code>local lava = script.Parent

lava.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.Health = 0   -- touched lava = defeated!
    end
end)</code></pre></li>
  <li>Press ▶ Play and step on the lava. Ouch! 🔥</li>
</ol>
<h3>🤔 What the code means</h3>
<ul>
  <li><code>Touched:Connect(...)</code> — "when something touches me, run this function" (an event, like Scratch's yellow blocks!)</li>
  <li><code>if humanoid then</code> — only affect players, not other parts</li>
</ul>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add lava to your obby's floor, then make a HEAL block (green) that sets <code>humanoid.Health = 100</code> instead.</div>`),
          quiz("rb-quiz", "Quiz: Roblox", [
            { q: "Roblox scripts are written in which language?", options: ["Python", "Lua", "Scratch", "HTML"], answer: 1 },
            { q: "lava.Touched:Connect(...) runs the function...", options: ["Every second", "When something touches the part", "Once at start", "Never"], answer: 1 },
            { q: "Why check 'if humanoid then'?", options: ["Style points", "So only player characters are affected, not random parts", "Lua requires it", "It makes lava hotter"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Retro Arcade Games in Your Browser",
        lessons: [
          article("mk-arcade", "MakeCode Arcade: Complete Game, Zero Install", "16 min", `
<h3>🎯 Intro</h3>
<p><strong>MakeCode Arcade</strong> (free, by Microsoft) builds real retro games in your browser — blocks OR JavaScript, and the game runs on the spot. No downloads, no purchase.</p>
<h3>📝 Build a chase game</h3>
<ol style="line-height:2">
  <li>Open <a href="https://arcade.makecode.com" target="_blank" rel="noopener"><strong>arcade.makecode.com</strong></a> → <strong>New Project</strong></li>
  <li><strong>Sprites</strong> → <code>set mySprite to sprite of kind Player</code> → draw your hero in the pixel editor 👾</li>
  <li><strong>Controller</strong> → <code>move mySprite with buttons</code> — arrows now move you (test on the simulator's D-pad!)</li>
  <li>Add a Food-kind sprite (draw a pizza 🍕) → <code>set position to random</code></li>
  <li><strong>Sprites</strong> → <code>on sprite of kind Player overlaps Food</code>: inside put <code>change score by 1</code> and move the food to a new random spot</li>
  <li><strong>Info</strong> → <code>start countdown 30</code> — when time's up, the game shows your score!</li>
</ol>
<div class="callout tip">Flip the toggle at the top from <strong>Blocks</strong> to <strong>JavaScript</strong> — see YOUR game as real typed code. That's exactly how the pros write it.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> add an Enemy sprite that bounces around — overlapping it ends the game (<code>game over LOSE</code>). Then click Share to get a link and send it to a friend! (Minecraft owner? Try the same ideas at minecraft.makecode.com)</div>`),
          quiz("mk-quiz", "Quiz: Arcade", [
            { q: "MakeCode Arcade costs...", options: ["$29/month", "Nothing — it's free in the browser", "One payment", "Requires Minecraft"], answer: 1 },
            { q: "The Blocks ↔ JavaScript toggle shows...", options: ["Two different games", "Your same game as blocks or real typed code", "A cheat menu", "Graphics settings"], answer: 1 },
            { q: "\"on Player overlaps Food\" is an example of...", options: ["A variable", "An event — code that runs when something happens", "A costume", "An error"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Robots & Your Path Forward",
        lessons: [
          article("mb-microbit", "micro:bit: Program a Pocket Computer (Free Simulator)", "14 min", `
<h3>🎯 Intro</h3>
<p>The <strong>micro:bit</strong> is a tiny computer with LED lights, buttons and sensors. No device? No problem — the website has a <strong>perfect free simulator</strong>.</p>
<h3>📝 Program it</h3>
<ol style="line-height:2">
  <li>Open <a href="https://makecode.microbit.org" target="_blank" rel="noopener"><strong>makecode.microbit.org</strong></a> → New Project</li>
  <li><strong>Flashing heart:</strong> <code>forever</code> → <code>show icon ❤</code> → <code>pause 500ms</code> → <code>show icon 💔</code> → <code>pause 500ms</code> — watch the simulator's LEDs blink!</li>
  <li><strong>Button game:</strong> <code>on button A pressed</code> → <code>show number (pick random 1 to 6)</code> — you built a dice! 🎲</li>
  <li><strong>Sensor magic:</strong> <code>on shake</code> → <code>show string "EARTHQUAKE!"</code> — click "SHAKE" on the simulator</li>
</ol>
<div class="callout">Real micro:bits cost about $15–20 and run these exact programs — steps counters, plant-watering alarms, robot cars... If your school has LEGO Spike robots, the same thinking applies there too.</div>
<h3>🏋️ Practice Task</h3>
<div class="callout tip"><strong>Try it yourself:</strong> build rock-paper-scissors: on shake, show a random one of the three icons. Best of 5 against a friend!</div>`),
          article("kd-path", "Choose Your Adventure", "8 min", `
<h3>🎯 You've tried everything — what's YOUR path?</h3>
<p>You've now coded with blocks (Scratch, Arcade, micro:bit) AND typed real code (Lua). Every path below starts right here on this site:</p>
<ul style="line-height:2">
  <li>🌐 <strong>I want to build websites</strong> → <em>Web Basics</em>, then HTML → CSS → JavaScript. (This whole academy was built with those exact skills!)</li>
  <li>🎮 <strong>I want to make bigger games</strong> → keep leveling up in Roblox Studio (its free Creator Hub tutorials are excellent), and learn <em>JavaScript Essentials</em> here — game logic is the same everywhere</li>
  <li>🤖 <strong>AI amazes me</strong> → our <em>AI for Beginners</em> course: train models with your webcam, then learn to prompt chatbots like a pro</li>
  <li>🤖⚙️ <strong>I love robots</strong> → get a real micro:bit and make your simulator projects physical</li>
</ul>
<div class="callout tip"><strong>The secret:</strong> the path matters less than you think — loops, events, variables and conditions are the SAME everywhere. You already know them all. 🎉</div>
<h3>🏋️ Graduation Task</h3>
<div class="callout tip">Enroll in your chosen next course right now — and tell someone what you're going to build this year.</div>`),
          quiz("kd-quiz", "Final Quiz: Game Creation", [
            { q: "Which concepts appear in Scratch AND Lua AND Arcade?", options: ["Nothing in common", "Events, loops, variables, conditions", "Only colors", "Only sounds"], answer: 1 },
            { q: "The micro:bit simulator lets you...", options: ["Only watch videos", "Program a virtual device for free before owning one", "Play Roblox", "Print money"], answer: 1 },
            { q: "The most important thing when choosing your path is...", options: ["Picking the hardest one", "What excites you — the core concepts transfer everywhere", "What's most expensive", "Copying friends"], answer: 1 },
          ]),
        ],
      },
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    subtitle: "One journey from your first HTML tag to a complete app with a server and database.",
    instructor: "Myo Min Thet",
    category: "Career",
    level: "Beginner",
    rating: 4.9,
    ratings: 2140,
    students: 18420,
    hours: 24,
    price: "Free",
    free: false,
    color: "linear-gradient(135deg,#1a2980,#26d0ce)",
    icon: "🥞",
    description:
      "Become the developer who can build EVERYTHING — the page users see, the server behind it, and the database that remembers. Every lesson uses simple English, flow-chart diagrams, and small steps, so beginners never get lost. You'll finish by building and shipping a real full stack app: My Notes.",
    whatYouLearn: [
      "See the whole picture: how frontend, backend and database work together",
      "Build pages with HTML, CSS and JavaScript",
      "Send and receive data with JSON and fetch()",
      "Create your own server and REST API with Node.js and Express",
      "Store data forever with SQL and SQLite",
      "Build and deploy a complete full stack app to the internet",
    ],
    sections: [
      {
        title: "The Big Picture",
        lessons: [
          article("fs-what", "What is a Full Stack Developer?", "10 min", `
<h3>🎯 The chef who can cook everything</h3>
<p>A restaurant needs someone to decorate the dining room, someone to cook in the kitchen, and someone to manage the storeroom. A <strong>full stack developer</strong> is the person who can do all three — for apps.</p>
<div class="flow">
  <div class="flow-box">🎨 Frontend<br><small>what users SEE<br>HTML · CSS · JS</small></div>
  <div class="flow-arrow" data-label="talks to"></div>
  <div class="flow-box alt">⚙️ Backend<br><small>the LOGIC<br>Node.js server</small></div>
  <div class="flow-arrow" data-label="saves in"></div>
  <div class="flow-box warn">🗄️ Database<br><small>the MEMORY<br>SQL</small></div>
</div>
<h3>📝 The three layers</h3>
<ul>
  <li><strong>Frontend</strong> — everything in the user's browser: buttons, colors, text, forms. Built with HTML, CSS and JavaScript.</li>
  <li><strong>Backend</strong> — a program running on a server computer. It receives requests, makes decisions, and applies rules ("is this password correct?").</li>
  <li><strong>Database</strong> — where data lives permanently: accounts, messages, orders. Even when the server restarts, the database remembers.</li>
</ul>
<p>Example: when you send a chat message in this academy, the <em>frontend</em> takes your text, the <em>backend</em> (Firebase) accepts and shares it, and the <em>database</em> stores it so your friend sees it tomorrow too.</p>
<div class="callout tip"><strong>Try it yourself:</strong> open your favorite app (Facebook, TikTok, anything). Point at 3 things and say which layer they belong to: what you see = frontend, the rules = backend, what is remembered = database.</div>`),
          article("fs-how-web", "How the Web Really Works", "10 min", `
<h3>🎯 A polite conversation</h3>
<p>The web is just two computers talking: your <strong>browser</strong> (the client) asks, and a <strong>server</strong> answers. Every page load is this conversation:</p>
<div class="flow">
  <div class="flow-box">🧑 Browser<br><small>client</small></div>
  <div class="flow-arrow" data-label="1. request"></div>
  <div class="flow-box alt">🖥️ Server<br><small>program</small></div>
  <div class="flow-arrow" data-label="2. response"></div>
  <div class="flow-box">🧑 Browser<br><small>shows page</small></div>
</div>
<h3>📝 What happens when you press Enter</h3>
<ol>
  <li>You type <code>myominthet99.github.io</code> and press Enter.</li>
  <li><strong>DNS</strong> finds the server's <strong>IP address</strong> — like looking up a phone number.</li>
  <li>Your browser sends an <strong>HTTP request</strong>: "GET me that page, please."</li>
  <li>The server sends back a <strong>response</strong>: HTML, CSS, JavaScript files.</li>
  <li>The browser draws the page. Total time: less than a second!</li>
</ol>
<h3>💻 Requests have types (verbs)</h3>
<pre><code>GET    /courses      → "give me data"   (reading)
POST   /login        → "here is data"   (creating/sending)
PUT    /profile      → "update this"    (changing)
DELETE /message/7    → "remove this"    (deleting)</code></pre>
<p>Remember these four — the whole internet runs on them, and your own API in Section 4 will use them all.</p>
<div class="callout tip"><strong>Try it yourself:</strong> in Chrome, press F12 → Network tab → reload any page. Every row you see is one request! Click one and find its type (GET?) and status (200 = OK).</div>`),
          article("fs-tools", "Your Developer Toolbox", "8 min", `
<h3>🎯 Every craftsman needs tools</h3>
<p>Good news: everything a full stack developer needs is <strong>free</strong>.</p>
<h3>📝 The essential four</h3>
<ul>
  <li><strong>Browser + DevTools</strong> — Chrome or Edge. Press <code>F12</code>: the Console shows errors, the Network tab shows requests, the Elements tab shows live HTML.</li>
  <li><strong>Code editor</strong> — <strong>VS Code</strong> (free). It colors your code and finds mistakes. On a phone? Use this site's Playground!</li>
  <li><strong>Node.js</strong> — lets JavaScript run <em>outside</em> the browser. This is your backend engine (Section 4).</li>
  <li><strong>Git + GitHub</strong> — saves versions of your code and puts it online. This academy itself lives on GitHub!</li>
</ul>
<h3>💻 Check your setup (later, on a computer)</h3>
<pre><code># in a terminal:
node --version     # v20.x.x  → Node is installed
git --version      # git version 2.x  → Git is installed</code></pre>
<div class="callout"><strong>No computer yet? No problem.</strong> Frontend lessons work 100% in this site's Playground on your phone. For the backend lessons, read along and learn the ideas — then practice when you get computer time (school lab, internet café, a friend's laptop).</div>
<div class="callout tip"><strong>Try it yourself:</strong> press F12 on this page, open the Console tab, type <code>2 + 2</code> and press Enter. You just ran JavaScript in DevTools!</div>`),
        ],
      },
      {
        title: "Frontend — What Users See",
        lessons: [
          article("fs-html", "HTML in One Lesson", "12 min", `
<h3>🎯 The skeleton of every page</h3>
<p><strong>HTML</strong> gives a page its structure using <strong>tags</strong>. A tag wraps content and gives it meaning: <code>&lt;h1&gt;</code> means "big heading", <code>&lt;p&gt;</code> means "paragraph".</p>
<h3>💻 A complete mini page</h3>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;body&gt;
    &lt;h1&gt;My Tea Shop&lt;/h1&gt;
    &lt;p&gt;The best laphet yay in town.&lt;/p&gt;
    &lt;img src="tea.jpg" alt="A cup of tea"&gt;
    &lt;a href="menu.html"&gt;See the menu&lt;/a&gt;
    &lt;button&gt;Order now&lt;/button&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<h3>📝 The tags you'll use every day</h3>
<ul>
  <li><code>&lt;h1&gt;…&lt;h6&gt;</code> headings · <code>&lt;p&gt;</code> paragraph · <code>&lt;a&gt;</code> link</li>
  <li><code>&lt;img&gt;</code> image · <code>&lt;button&gt;</code> button · <code>&lt;input&gt;</code> text box</li>
  <li><code>&lt;div&gt;</code> a box for grouping · <code>&lt;ul&gt;/&lt;li&gt;</code> lists</li>
</ul>
<p>Tags can have <strong>attributes</strong> — extra settings inside the opening tag: <code>src</code> tells an image which file to show, <code>href</code> tells a link where to go.</p>
<div class="callout tip"><strong>Try it yourself:</strong> open the 🧪 Playground and build a page about YOUR dream shop: one heading, one paragraph, one button. Then add a second heading with <code>&lt;h2&gt;</code>.</div>`),
          article("fs-css", "CSS in One Lesson", "12 min", `
<h3>🎯 The style of every page</h3>
<p><strong>CSS</strong> decides how HTML looks: colors, sizes, spacing, position. A CSS rule has three parts:</p>
<div class="flow">
  <div class="flow-box">selector<br><small>WHO to style<br>h1, .card, #menu</small></div>
  <div class="flow-arrow" data-label="then"></div>
  <div class="flow-box alt">property<br><small>WHAT to change<br>color, font-size</small></div>
  <div class="flow-arrow" data-label="gets"></div>
  <div class="flow-box warn">value<br><small>the new look<br>purple, 24px</small></div>
</div>
<h3>💻 Styling our tea shop</h3>
<pre><code>&lt;style&gt;
  body   { font-family: sans-serif; background: #faf7f2; }
  h1     { color: #654ea3; }
  .card  {
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
  }
  button { background: #654ea3; color: white; border: none;
           padding: 10px 20px; border-radius: 8px; }
&lt;/style&gt;

&lt;div class="card"&gt;
  &lt;h1&gt;My Tea Shop&lt;/h1&gt;
  &lt;button&gt;Order now&lt;/button&gt;
&lt;/div&gt;</code></pre>
<h3>📝 Three ways to select</h3>
<ul>
  <li><code>h1</code> — every h1 tag</li>
  <li><code>.card</code> — every element with <code>class="card"</code> (reusable — most common!)</li>
  <li><code>#menu</code> — the one element with <code>id="menu"</code></li>
</ul>
<div class="callout tip"><strong>Try it yourself:</strong> paste the example into the Playground, then: 1) change the purple to your favorite color, 2) make the button text bigger with <code>font-size: 18px</code>, 3) round the corners more.</div>`),
          article("fs-flex", "Page Layout with Flexbox", "10 min", `
<h3>🎯 Arranging boxes like a pro</h3>
<p>Real pages have things side by side: menus, cards, photo grids. <strong>Flexbox</strong> is the modern way — put <code>display: flex</code> on a parent box, and its children line up automatically.</p>
<h3>💻 Three cards in a row</h3>
<pre><code>&lt;style&gt;
  .row {
    display: flex;
    gap: 12px;               /* space between children */
    justify-content: center; /* left-right position */
    align-items: center;     /* up-down position */
    flex-wrap: wrap;         /* small screens: go to next line */
  }
  .box { background: #e8dff8; padding: 20px; border-radius: 10px; }
&lt;/style&gt;

&lt;div class="row"&gt;
  &lt;div class="box"&gt;☕ Tea&lt;/div&gt;
  &lt;div class="box"&gt;🍜 Noodles&lt;/div&gt;
  &lt;div class="box"&gt;🍰 Cake&lt;/div&gt;
&lt;/div&gt;</code></pre>
<h3>📝 The four you'll use constantly</h3>
<ul>
  <li><code>display: flex</code> — turn on flexbox (on the PARENT)</li>
  <li><code>gap</code> — space between items (no more margin headaches)</li>
  <li><code>justify-content</code> — main direction: <code>center</code>, <code>space-between</code>…</li>
  <li><code>flex-wrap: wrap</code> — items flow to the next line on phones = responsive!</li>
</ul>
<div class="callout tip"><strong>Try it yourself:</strong> build the 3-card row in the Playground. Then change <code>justify-content</code> to <code>space-between</code> and shrink the preview window — watch the cards wrap like magic.</div>`),
          article("fs-js", "JavaScript Basics", "14 min", `
<h3>🎯 The brain of the page</h3>
<p>HTML is structure, CSS is style — <strong>JavaScript</strong> is <em>logic</em>. It remembers values, makes decisions, and repeats work.</p>
<h3>💻 The core moves</h3>
<pre><code>// 1. variables — remember things
let price = 1500;
const shopName = "My Tea Shop";   // const = never changes

// 2. decisions
if (price &gt; 1000) {
  console.log("A bit expensive");
} else {
  console.log("Cheap!");
}

// 3. loops — repeat work
const menu = ["tea", "noodles", "cake"];
for (const item of menu) {
  console.log("We sell: " + item);
}

// 4. functions — reusable recipes
function total(price, qty) {
  return price * qty;
}
console.log(total(1500, 3));   // 4500</code></pre>
<h3>📝 Objects — data with labels</h3>
<pre><code>const drink = { name: "Laphet Yay", price: 1500, hot: true };
console.log(drink.name);    // "Laphet Yay"
drink.price = 1800;         // update a value</code></pre>
<p>Objects are EVERYWHERE in full stack work — every user, message, and product is an object. Get comfortable with the <code>thing.property</code> style.</p>
<div class="callout tip"><strong>Try it yourself:</strong> in the Playground, make an object about yourself (name, age, favorite food) and print a sentence using its values. Then write a function <code>discount(price)</code> that returns the price minus 10%.</div>`),
          article("fs-dom", "The DOM — Making Pages React", "12 min", `
<h3>🎯 JavaScript meets HTML</h3>
<p>The <strong>DOM</strong> (Document Object Model) is the live version of your page that JavaScript can touch: find an element, change it, or listen for clicks.</p>
<div class="flow">
  <div class="flow-box">👆 User clicks<br><small>event</small></div>
  <div class="flow-arrow" data-label="triggers"></div>
  <div class="flow-box alt">🧠 Your function<br><small>JavaScript</small></div>
  <div class="flow-arrow" data-label="updates"></div>
  <div class="flow-box">📄 The page<br><small>DOM change</small></div>
</div>
<h3>💻 A click counter</h3>
<pre><code>&lt;h1 id="count"&gt;0&lt;/h1&gt;
&lt;button id="btn"&gt;+1&lt;/button&gt;

&lt;script&gt;
  let clicks = 0;
  const counter = document.querySelector("#count");
  const button  = document.querySelector("#btn");

  button.addEventListener("click", function () {
    clicks = clicks + 1;
    counter.textContent = clicks;
  });
&lt;/script&gt;</code></pre>
<h3>📝 The three DOM superpowers</h3>
<ul>
  <li><strong>Find:</strong> <code>document.querySelector("#id")</code> or <code>(".class")</code></li>
  <li><strong>Change:</strong> <code>el.textContent = "new text"</code>, <code>el.style.color = "red"</code></li>
  <li><strong>Listen:</strong> <code>el.addEventListener("click", myFunction)</code></li>
</ul>
<div class="callout tip"><strong>Try it yourself:</strong> build the counter in the Playground. Then add a second button that resets the count to 0. Bonus: turn the number red when it passes 10.</div>`),
          quiz("fs-quiz1", "Quiz: Frontend Foundations", [
            { q: "Which layer of an app does the user directly see and touch?", options: ["Database", "Backend", "Frontend", "The server"], answer: 2 },
            { q: "In CSS, what does the selector .card target?", options: ["The tag &lt;card&gt;", "Every element with class=\"card\"", "The element with id=\"card\"", "All divs"], answer: 1 },
            { q: "Which flexbox property pushes items to a new line on small screens?", options: ["gap", "align-items", "flex-wrap: wrap", "display: block"], answer: 2 },
            { q: "What does document.querySelector(\"#count\") do?", options: ["Creates a new element", "Finds the element with id=\"count\"", "Counts all elements", "Deletes an element"], answer: 1 },
            { q: "Which HTTP verb means 'give me data'?", options: ["POST", "GET", "DELETE", "PUT"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Talking to Servers",
        lessons: [
          article("fs-forms", "Forms — Collecting User Input", "10 min", `
<h3>🎯 The doorway for data</h3>
<p>Login boxes, search bars, comment fields — <strong>forms</strong> are how users give data to your app. Frontend collects it; later the backend will receive it.</p>
<h3>💻 A signup form</h3>
<pre><code>&lt;form id="signup"&gt;
  &lt;input name="username" placeholder="Your name" required&gt;
  &lt;input name="email" type="email" placeholder="Email" required&gt;
  &lt;input name="password" type="password" minlength="6"&gt;
  &lt;button type="submit"&gt;Create account&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
  const form = document.querySelector("#signup");
  form.addEventListener("submit", function (e) {
    e.preventDefault();                 // stop the page reload
    const data = new FormData(form);
    console.log(data.get("username")); // read one field
  });
&lt;/script&gt;</code></pre>
<h3>📝 Remember these</h3>
<ul>
  <li><code>type="email"</code>, <code>required</code>, <code>minlength</code> — the browser checks input for FREE before you write any code.</li>
  <li><code>e.preventDefault()</code> — stops the old-style page reload so JavaScript can handle the data.</li>
  <li><code>new FormData(form)</code> — collects every field by its <code>name</code> in one line.</li>
</ul>
<div class="callout"><strong>Golden rule of full stack:</strong> never trust frontend checks alone — a clever user can skip them. The backend must check AGAIN. You'll do exactly that in Section 4.</div>
<div class="callout tip"><strong>Try it yourself:</strong> build a "contact us" form (name + message). On submit, show "Thank you, NAME!" in an &lt;h2&gt; below the form instead of console.log.</div>`),
          article("fs-json", "JSON — The Language of Data", "8 min", `
<h3>🎯 How computers share data</h3>
<p>When frontend and backend talk, they need a shared format. That format is <strong>JSON</strong> (JavaScript Object Notation) — it looks almost exactly like a JavaScript object:</p>
<h3>💻 JSON in real life</h3>
<pre><code>{
  "name": "Aung Aung",
  "age": 16,
  "premium": true,
  "courses": ["HTML", "CSS", "Full Stack"]
}</code></pre>
<h3>📝 Only two rules differ from JS objects</h3>
<ul>
  <li>Keys must wear "double quotes"</li>
  <li>No functions — only data: strings, numbers, true/false, arrays, objects</li>
</ul>
<h3>💻 Converting back and forth</h3>
<pre><code>const student = { name: "Su Su", xp: 320 };

// object → JSON text (to SEND over the internet)
const text = JSON.stringify(student);
// '{"name":"Su Su","xp":320}'

// JSON text → object (when you RECEIVE)
const back = JSON.parse(text);
console.log(back.xp);   // 320</code></pre>
<p>That's it. Every API you will ever use — weather, YouTube, your own — speaks JSON.</p>
<div class="callout tip"><strong>Try it yourself:</strong> in the Playground console, JSON.stringify an object describing your favorite meal, then JSON.parse it back and print one property.</div>`),
          article("fs-fetch", "fetch() — Asking Servers for Data", "12 min", `
<h3>🎯 Your frontend's telephone</h3>
<p><code>fetch()</code> lets JavaScript call a server and get data — <em>without reloading the page</em>. This is how modern apps feel so fast.</p>
<div class="flow">
  <div class="flow-box">📄 Your page<br><small>fetch(url)</small></div>
  <div class="flow-arrow" data-label="request"></div>
  <div class="flow-box alt">🌐 API server<br><small>finds data</small></div>
  <div class="flow-arrow" data-label="JSON"></div>
  <div class="flow-box">📄 Your page<br><small>shows result</small></div>
</div>
<h3>💻 GET — reading data</h3>
<pre><code>fetch("https://api.example.com/quote")
  .then(function (res) { return res.json(); })
  .then(function (data) {
    document.querySelector("#quote").textContent = data.text;
  })
  .catch(function () {
    console.log("Network problem!");
  });</code></pre>
<h3>💻 POST — sending data</h3>
<pre><code>fetch("https://api.example.com/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Hello server!" })
});</code></pre>
<h3>📝 The pattern to memorize</h3>
<ul>
  <li><code>fetch(url)</code> returns a <strong>Promise</strong> — "the answer will arrive soon"</li>
  <li><code>.then(res =&gt; res.json())</code> — unwrap the JSON</li>
  <li><code>.then(data =&gt; …)</code> — use the data</li>
  <li><code>.catch(…)</code> — always handle failure kindly (bad internet happens!)</li>
</ul>
<div class="callout tip"><strong>Try it yourself:</strong> this academy's chat and AI tutor both use fetch under the hood. Press F12 → Network on this site, send a chat message, and watch the fetch request appear!</div>`),
          article("fs-project1", "Mini Project: Quote Machine", "12 min", `
<h3>🎯 Your first data-driven app</h3>
<p>Let's combine everything from this section: a page that shows a random inspirational quote each time you press a button. (We'll use a local list now; in Section 4 you'll serve quotes from YOUR OWN server.)</p>
<h3>💻 The complete app</h3>
<pre><code>&lt;div class="card"&gt;
  &lt;h2 id="quote"&gt;Press the button!&lt;/h2&gt;
  &lt;p id="author"&gt;&lt;/p&gt;
  &lt;button id="next"&gt;New quote ✨&lt;/button&gt;
&lt;/div&gt;

&lt;script&gt;
  const quotes = [
    { text: "The best way to learn is to build.", by: "Every developer" },
    { text: "First, solve the problem. Then, write the code.", by: "John Johnson" },
    { text: "Small steps every day.", by: "Unknown" }
  ];

  document.querySelector("#next").addEventListener("click", function () {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    document.querySelector("#quote").textContent = '"' + q.text + '"';
    document.querySelector("#author").textContent = "— " + q.by;
  });
&lt;/script&gt;</code></pre>
<h3>📝 What you just practiced</h3>
<ul>
  <li>Objects in an array — exactly how APIs return lists</li>
  <li>Random selection with <code>Math.random()</code></li>
  <li>DOM updates on click — the heart of every interactive app</li>
</ul>
<div class="callout tip"><strong>Level it up:</strong> 1) add 5 more quotes (Myanmar proverbs welcome!), 2) style the card with CSS, 3) add a "Copy" button that runs <code>navigator.clipboard.writeText(...)</code>. Save it in your Playground snippets — you'll upgrade it later!</div>`),
          quiz("fs-quiz2", "Quiz: Data & APIs", [
            { q: "Why do we call e.preventDefault() in a form's submit handler?", options: ["To delete the form", "To stop the page from reloading so JS can handle the data", "To make the form prettier", "To send the data twice"], answer: 1 },
            { q: "Which is VALID Json?", options: ["{ name: 'Mya' }", "{ \"name\": \"Mya\" }", "{ name = \"Mya\" }", "(name: Mya)"], answer: 1 },
            { q: "JSON.stringify(obj) does what?", options: ["Turns JSON text into an object", "Turns an object into JSON text for sending", "Deletes the object", "Checks for errors"], answer: 1 },
            { q: "In the fetch pattern, what does .catch() handle?", options: ["Successful answers", "Slow styling", "Failures like network errors", "Button clicks"], answer: 2 },
            { q: "Which layer must ALWAYS re-check user input, even if the frontend already did?", options: ["The browser", "The backend", "CSS", "Nobody"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Backend — The Server Side",
        lessons: [
          article("fs-node", "Node.js — JavaScript Outside the Browser", "10 min", `
<h3>🎯 Same language, new powers</h3>
<p>Great news: you already know the backend language — it's <strong>JavaScript</strong>! <strong>Node.js</strong> runs JS outside the browser, where it gains server superpowers: reading files, talking to databases, and answering web requests.</p>
<h3>💻 Your first Node program</h3>
<pre><code>// hello.js
const name = "future full stack dev";
console.log("Hello, " + name + "!");

// run it in a terminal:
//   node hello.js
// → Hello, future full stack dev!</code></pre>
<h3>📝 The Node world in 4 words</h3>
<ul>
  <li><strong>node</strong> — runs a JS file: <code>node server.js</code></li>
  <li><strong>npm</strong> — installs helpful packages: <code>npm install express</code></li>
  <li><strong>package.json</strong> — your project's ID card (name + package list); created by <code>npm init -y</code></li>
  <li><strong>node_modules</strong> — the folder where packages live (never edit it)</li>
</ul>
<div class="flow">
  <div class="flow-box">📁 your-app<br><small>server.js<br>package.json</small></div>
  <div class="flow-arrow" data-label="npm install"></div>
  <div class="flow-box alt">📦 node_modules<br><small>express, etc.</small></div>
  <div class="flow-arrow" data-label="node server.js"></div>
  <div class="flow-box warn">🚀 running<br><small>your server!</small></div>
</div>
<div class="callout tip"><strong>Try it yourself</strong> (computer time): install Node from nodejs.org, make hello.js, and run it. No computer today? Read on — every lesson shows the full code, and the ideas are what matter.</div>`),
          article("fs-express", "Express — Your First Web Server", "12 min", `
<h3>🎯 20 lines to a real server</h3>
<p><strong>Express</strong> is the most popular Node framework — it makes answering web requests simple.</p>
<h3>💻 A complete working server</h3>
<pre><code>// 1) in a terminal:  npm init -y  &amp;&amp;  npm install express

// 2) server.js
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("&lt;h1&gt;Welcome to my server!&lt;/h1&gt;");
});

app.get("/api/hello", function (req, res) {
  res.json({ message: "Hello from the backend!" });
});

app.listen(3000, function () {
  console.log("Server running at http://localhost:3000");
});

// 3) run:  node server.js
// 4) open http://localhost:3000 in your browser 🎉</code></pre>
<h3>📝 Read it like a sentence</h3>
<ul>
  <li><code>app.get("/", handler)</code> — "when someone GETs the home page, run this"</li>
  <li><code>req</code> — the REQuest (what the visitor asked, sent, who they are)</li>
  <li><code>res</code> — the RESponse you send back: <code>res.send()</code> for HTML, <code>res.json()</code> for data</li>
  <li><code>app.listen(3000)</code> — start listening on port 3000. A port is like a door number on your computer.</li>
</ul>
<div class="callout"><strong>localhost</strong> means "this same computer" — your private testing space. In the last lesson you'll put the server on the real internet.</div>
<div class="callout tip"><strong>Try it yourself:</strong> add a route <code>app.get("/about", ...)</code> that sends your name. Then visit localhost:3000/about. You're officially a backend developer!</div>`),
          article("fs-routes", "Routes — GET, POST and Friends", "12 min", `
<h3>🎯 Different doors for different jobs</h3>
<p>A <strong>route</strong> = an HTTP verb + a path. Together they describe every action your app supports:</p>
<div class="flow">
  <div class="flow-box">GET /quotes<br><small>read all</small></div>
  <div class="flow-arrow" data-label=""></div>
  <div class="flow-box alt">POST /quotes<br><small>add new</small></div>
  <div class="flow-arrow" data-label=""></div>
  <div class="flow-box warn">DELETE /quotes/2<br><small>remove #2</small></div>
</div>
<h3>💻 A quotes API (data in memory for now)</h3>
<pre><code>const express = require("express");
const app = express();
app.use(express.json());   // ← lets Express READ JSON bodies

let quotes = [
  { id: 1, text: "Small steps every day." },
  { id: 2, text: "Build to learn." }
];

// READ
app.get("/quotes", function (req, res) {
  res.json(quotes);
});

// CREATE — data arrives in req.body
app.post("/quotes", function (req, res) {
  if (!req.body.text) {
    return res.status(400).json({ error: "text is required" });
  }
  const q = { id: Date.now(), text: req.body.text };
  quotes.push(q);
  res.status(201).json(q);
});

// DELETE — :id is a URL parameter → req.params.id
app.delete("/quotes/:id", function (req, res) {
  quotes = quotes.filter(function (q) { return q.id != req.params.id; });
  res.json({ ok: true });
});

app.listen(3000);</code></pre>
<h3>📝 New tools unlocked</h3>
<ul>
  <li><code>req.body</code> — JSON the client sent (needs <code>app.use(express.json())</code>)</li>
  <li><code>req.params.id</code> — value from the <code>:id</code> part of the URL</li>
  <li><strong>Status codes:</strong> 200 OK · 201 Created · 400 Bad request · 404 Not found</li>
  <li>See the validation? <em>The backend checks input</em> — the golden rule in action.</li>
</ul>
<div class="callout tip"><strong>Try it yourself:</strong> add <code>GET /quotes/:id</code> that returns just one quote — and a 404 status if the id doesn't exist.</div>`),
          article("fs-api", "Building a Real REST API", "14 min", `
<h3>🎯 The pattern behind every app</h3>
<p>A <strong>REST API</strong> is simply a well-organized set of routes around a "thing" (a <em>resource</em>). Todos, users, orders — same recipe every time:</p>
<h3>📝 The REST recipe</h3>
<pre><code>GET    /todos       → list all todos
GET    /todos/:id   → get ONE todo
POST   /todos       → create a todo
PUT    /todos/:id   → update a todo
DELETE /todos/:id   → delete a todo</code></pre>
<h3>💻 The interesting parts of a Todo API</h3>
<pre><code>let todos = [];
let nextId = 1;

app.post("/todos", function (req, res) {
  const text = (req.body.text || "").trim();
  if (!text) return res.status(400).json({ error: "text required" });
  const todo = { id: nextId++, text: text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put("/todos/:id", function (req, res) {
  const todo = todos.find(function (x) { return x.id == req.params.id; });
  if (!todo) return res.status(404).json({ error: "not found" });
  todo.done = !!req.body.done;      // update from the request
  res.json(todo);
});</code></pre>
<h3>📝 Why REST wins</h3>
<ul>
  <li><strong>Predictable</strong> — any developer instantly understands your API</li>
  <li><strong>Testable</strong> — try routes in the browser or with fetch()</li>
  <li><strong>Reusable</strong> — the same API can serve your website, a phone app, even other developers</li>
</ul>
<div class="callout"><strong>One problem remains:</strong> our todos live in a variable — restart the server and POOF, all gone. That's exactly why we need a database → next section!</div>
<div class="callout tip"><strong>Try it yourself:</strong> design (on paper is fine!) the REST routes for a school library app: books can be listed, added, borrowed (updated), and removed.</div>`),
          article("fs-mid", "Middleware & Serving Your Frontend", "10 min", `
<h3>🎯 The airport security line</h3>
<p><strong>Middleware</strong> are functions every request passes through before reaching your route — like security checks at the airport:</p>
<div class="flow">
  <div class="flow-box">📨 Request<br><small>arrives</small></div>
  <div class="flow-arrow" data-label="express.json"></div>
  <div class="flow-box alt">🧾 logger<br><small>middleware</small></div>
  <div class="flow-arrow" data-label="next()"></div>
  <div class="flow-box warn">🎯 Your route<br><small>responds</small></div>
</div>
<h3>💻 Writing middleware + serving files</h3>
<pre><code>// log every request — great for debugging
app.use(function (req, res, next) {
  console.log(req.method + " " + req.url);
  next();   // ← "let the request continue"
});

// read JSON bodies (you know this one!)
app.use(express.json());

// serve your FRONTEND from a folder named "public"
app.use(express.static("public"));
// public/index.html  → http://localhost:3000/
// public/style.css   → http://localhost:3000/style.css</code></pre>
<h3>📝 Why express.static matters</h3>
<p>This one line makes your Express app serve the frontend too — HTML, CSS, JS, images. <strong>One server, whole app:</strong> frontend files AND API routes together. That's the classic full stack setup you'll use in the final project.</p>
<div class="callout tip"><strong>Try it yourself:</strong> sketch your final project folder: public/index.html, public/app.js, server.js. Which URLs will serve which files?</div>`),
          quiz("fs-quiz3", "Quiz: Backend Basics", [
            { q: "What is Node.js?", options: ["A browser", "A way to run JavaScript outside the browser", "A database", "A CSS framework"], answer: 1 },
            { q: "In app.get(\"/\", function(req, res){...}), what is res?", options: ["The visitor's request", "The response you send back", "A database row", "An error"], answer: 1 },
            { q: "Where does JSON sent by the client appear (with express.json() on)?", options: ["req.params", "req.body", "res.json", "req.url"], answer: 1 },
            { q: "Which status code means 'created successfully'?", options: ["404", "500", "201", "302"], answer: 2 },
            { q: "What does app.use(express.static(\"public\")) do?", options: ["Blocks all requests", "Serves frontend files from the public folder", "Creates a database", "Encrypts passwords"], answer: 1 },
          ]),
        ],
      },
      {
        title: "Databases — Remembering Things",
        lessons: [
          article("fs-db", "Why Apps Need Databases", "8 min", `
<h3>🎯 Memory that survives</h3>
<p>Our Todo API had a fatal flaw: restart the server and all todos vanish. Variables live in RAM — temporary by nature. A <strong>database</strong> stores data on disk, safely and permanently, and can search millions of rows in milliseconds.</p>
<div class="flow">
  <div class="flow-box">🎨 Frontend<br><small>fetch()</small></div>
  <div class="flow-arrow" data-label="HTTP"></div>
  <div class="flow-box alt">⚙️ Backend<br><small>Express</small></div>
  <div class="flow-arrow" data-label="SQL"></div>
  <div class="flow-box warn">🗄️ Database<br><small>tables on disk</small></div>
</div>
<h3>📝 Tables — spreadsheets with rules</h3>
<p>A relational database organizes data in <strong>tables</strong>. A <code>users</code> table:</p>
<pre><code>id | name      | email             | xp
---+-----------+-------------------+----
1  | Aung Aung | aung@mail.com     | 320
2  | Su Su     | susu@mail.com     | 450</code></pre>
<ul>
  <li>Each <strong>row</strong> = one thing (one user)</li>
  <li>Each <strong>column</strong> = one property (name, email…)</li>
  <li><strong>id</strong> = unique number so rows can point to each other (user 2 wrote note 7)</li>
</ul>
<h3>📝 Which database?</h3>
<ul>
  <li><strong>SQLite</strong> — a whole database in one file. Zero setup. PERFECT for learning → we'll use it.</li>
  <li><strong>MySQL / PostgreSQL</strong> — the big servers behind most companies. Same SQL language.</li>
  <li><strong>MongoDB / Firebase</strong> — "NoSQL", stores JSON-like documents (this academy's chat uses Firebase!).</li>
</ul>
<div class="callout tip"><strong>Try it yourself:</strong> design a table for chat messages on paper: which columns would you need? (Hint: who, what, when.)</div>`),
          article("fs-sql", "SQL in One Lesson", "12 min", `
<h3>🎯 Four sentences run the world</h3>
<p><strong>SQL</strong> is the language of databases — and it reads almost like English. Master four commands and you can handle 90% of real work:</p>
<h3>💻 CRUD in SQL</h3>
<pre><code>-- CREATE the table (once)
CREATE TABLE notes (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  text  TEXT NOT NULL,
  done  INTEGER DEFAULT 0
);

-- C: add a row
INSERT INTO notes (text) VALUES ('Learn SQL');

-- R: read rows
SELECT * FROM notes;
SELECT text FROM notes WHERE done = 0 ORDER BY id DESC;

-- U: change rows
UPDATE notes SET done = 1 WHERE id = 1;

-- D: remove rows
DELETE FROM notes WHERE id = 1;</code></pre>
<h3>📝 Reading the patterns</h3>
<ul>
  <li><code>SELECT columns FROM table WHERE condition</code> — the sentence you'll type most in your career</li>
  <li><code>WHERE</code> filters rows — <strong>never forget it on UPDATE/DELETE</strong> or you change EVERY row! 😱</li>
  <li><code>PRIMARY KEY AUTOINCREMENT</code> — the database numbers rows for you</li>
  <li><code>ORDER BY id DESC</code> — newest first</li>
</ul>
<div class="callout"><strong>Fun fact:</strong> SQL is over 50 years old and still #1. Learn it once, use it everywhere — SQLite, MySQL, PostgreSQL all speak it.</div>
<div class="callout tip"><strong>Try it yourself:</strong> write the SQL for your chat-messages table from last lesson: CREATE TABLE, INSERT one message, SELECT the last 10.</div>`),
          article("fs-node-db", "Connecting Node to a Database", "12 min", `
<h3>🎯 The final connection</h3>
<p>Time to join the layers: Express routes that read and write <strong>SQLite</strong>. We'll use the friendly <code>better-sqlite3</code> package (<code>npm install better-sqlite3</code>).</p>
<h3>💻 Todos that survive restarts</h3>
<pre><code>const express = require("express");
const Database = require("better-sqlite3");

const app = express();
app.use(express.json());

const db = new Database("app.db");   // one file = whole database
db.exec("CREATE TABLE IF NOT EXISTS todos (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "text TEXT NOT NULL, done INTEGER DEFAULT 0)");

app.get("/todos", function (req, res) {
  const rows = db.prepare("SELECT * FROM todos ORDER BY id DESC").all();
  res.json(rows);
});

app.post("/todos", function (req, res) {
  const text = (req.body.text || "").trim();
  if (!text) return res.status(400).json({ error: "text required" });
  const info = db.prepare("INSERT INTO todos (text) VALUES (?)").run(text);
  res.status(201).json({ id: info.lastInsertRowid, text: text, done: 0 });
});

app.listen(3000);</code></pre>
<h3>📝 The one rule that keeps you SAFE</h3>
<p>See the <code>?</code> in the INSERT? That's a <strong>parameter placeholder</strong>. The database fills it in safely. <strong>NEVER</strong> glue user text into SQL with +:</p>
<pre><code>// ☠️ DANGEROUS — a hacker types:  '); DROP TABLE todos; --
db.exec("INSERT INTO todos (text) VALUES ('" + userText + "')");

// ✅ SAFE — always use ? placeholders
db.prepare("INSERT INTO todos (text) VALUES (?)").run(userText);</code></pre>
<p>That attack is called <strong>SQL injection</strong> — the #1 classic hack. You now know how to block it. 🛡️</p>
<div class="callout tip"><strong>Try it yourself:</strong> add DELETE /todos/:id using db.prepare("DELETE FROM todos WHERE id = ?").run(req.params.id) — then restart the server and confirm todos SURVIVE.</div>`),
          article("fs-auth", "Login & Passwords — the Safe Way", "10 min", `
<h3>🎯 The most important security lesson</h3>
<p>Real apps have accounts — and accounts mean passwords. Rule number one: <strong>NEVER store the actual password.</strong> Store a <em>hash</em> — a scrambled fingerprint that can't be reversed.</p>
<div class="flow">
  <div class="flow-box">🔑 "myCat123"<br><small>user's password</small></div>
  <div class="flow-arrow" data-label="bcrypt hash"></div>
  <div class="flow-box warn">🔒 "a8f3xq9..."<br><small>stored in DB</small></div>
  <div class="flow-arrow" data-label="login: compare"></div>
  <div class="flow-box alt">✅ match?<br><small>let them in</small></div>
</div>
<h3>💻 Signup & login with bcrypt (npm install bcryptjs)</h3>
<pre><code>const bcrypt = require("bcryptjs");

app.post("/signup", function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  db.prepare("INSERT INTO users (email, pass) VALUES (?, ?)")
    .run(req.body.email, hash);          // hash stored — never the password
  res.status(201).json({ ok: true });
});

app.post("/login", function (req, res) {
  const user = db.prepare("SELECT * FROM users WHERE email = ?")
                 .get(req.body.email);
  if (user &amp;&amp; bcrypt.compareSync(req.body.password, user.pass)) {
    res.json({ ok: true });   // real apps also give a session/token here
  } else {
    res.status(401).json({ error: "Wrong email or password" });
  }
});</code></pre>
<h3>📝 Remember-me: sessions & tokens</h3>
<p>After login, the server gives the browser a <strong>token</strong> (a long random string). The browser shows it on every request — like a wristband at a festival — so users stay logged in. Libraries like <code>jsonwebtoken</code> handle this; this academy's login uses Firebase Authentication, which does hashing AND tokens for you.</p>
<div class="callout tip"><strong>Try it yourself:</strong> say out loud why storing plain passwords is dangerous, even for a small app. (Hint: people reuse passwords everywhere — a leak of YOUR site unlocks their bank email too.)</div>`),
        ],
      },
      {
        title: "Ship It! — Your Full Stack App",
        lessons: [
          article("fs-final1", "Final Project: My Notes — the Backend", "16 min", `
<h3>🎯 Build the whole engine</h3>
<p>Final project time! <strong>My Notes</strong> — users write notes, notes are saved forever, notes can be deleted. Today: the complete backend, using ONLY things you've learned.</p>
<h3>💻 server.js — the complete backend</h3>
<pre><code>const express = require("express");
const Database = require("better-sqlite3");

const app = express();
app.use(express.json());
app.use(express.static("public"));   // serves the frontend (next lesson)

const db = new Database("notes.db");
db.exec("CREATE TABLE IF NOT EXISTS notes (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "text TEXT NOT NULL, " +
        "ts INTEGER)");

app.get("/api/notes", function (req, res) {
  res.json(db.prepare("SELECT * FROM notes ORDER BY id DESC").all());
});

app.post("/api/notes", function (req, res) {
  const text = (req.body.text || "").trim();
  if (!text) return res.status(400).json({ error: "Note text required" });
  if (text.length &gt; 500) return res.status(400).json({ error: "Too long" });
  const info = db.prepare("INSERT INTO notes (text, ts) VALUES (?, ?)")
                 .run(text, Date.now());
  res.status(201).json({ id: info.lastInsertRowid, text: text });
});

app.delete("/api/notes/:id", function (req, res) {
  db.prepare("DELETE FROM notes WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

app.listen(3000, function () {
  console.log("My Notes running → http://localhost:3000");
});</code></pre>
<h3>📝 Notice the professional habits</h3>
<ul>
  <li>API routes start with <code>/api/</code> — keeps them separate from pages</li>
  <li>Input validated (empty? too long?) with clear error messages</li>
  <li><code>?</code> placeholders everywhere — SQL injection blocked</li>
  <li><code>ts</code> timestamp column — you could show "2 minutes ago" later</li>
</ul>
<div class="callout tip"><strong>Try it yourself:</strong> type this file yourself (don't copy-paste — typing builds memory!). Run it, then visit localhost:3000/api/notes — you should see [] (empty, for now…).</div>`),
          article("fs-final2", "Final Project: My Notes — the Frontend", "16 min", `
<h3>🎯 Connect the face to the engine</h3>
<p>Now the frontend: one page in the <code>public</code> folder that talks to your API with fetch(). This diagram is your WHOLE app:</p>
<div class="flow">
  <div class="flow-box">📄 index.html<br><small>form + list</small></div>
  <div class="flow-arrow" data-label="fetch /api/notes"></div>
  <div class="flow-box alt">⚙️ server.js<br><small>Express routes</small></div>
  <div class="flow-arrow" data-label="SQL ?"></div>
  <div class="flow-box warn">🗄️ notes.db<br><small>SQLite file</small></div>
</div>
<h3>💻 public/index.html</h3>
<pre><code>&lt;h1&gt;📝 My Notes&lt;/h1&gt;
&lt;form id="f"&gt;
  &lt;input id="txt" placeholder="Write a note..." maxlength="500"&gt;
  &lt;button&gt;Save&lt;/button&gt;
&lt;/form&gt;
&lt;ul id="list"&gt;&lt;/ul&gt;

&lt;script&gt;
function load() {
  fetch("/api/notes")
    .then(function (r) { return r.json(); })
    .then(function (notes) {
      const list = document.querySelector("#list");
      list.innerHTML = "";
      notes.forEach(function (n) {
        const li = document.createElement("li");
        li.textContent = n.text + " ";
        const del = document.createElement("button");
        del.textContent = "🗑";
        del.addEventListener("click", function () {
          fetch("/api/notes/" + n.id, { method: "DELETE" }).then(load);
        });
        li.appendChild(del);
        list.appendChild(li);
      });
    });
}

document.querySelector("#f").addEventListener("submit", function (e) {
  e.preventDefault();
  const box = document.querySelector("#txt");
  fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: box.value })
  }).then(function () { box.value = ""; load(); });
});

load();
&lt;/script&gt;</code></pre>
<h3>📝 What you just did</h3>
<p>Look at that diagram again. You built every box and every arrow. Form → fetch POST → Express → SQL → disk, and back again. <strong>That is full stack development.</strong> Everything else in your career is this pattern with more detail. 🎓</p>
<div class="callout tip"><strong>Level it up:</strong> 1) style it with your CSS skills, 2) show note count, 3) add an edit button (PUT route!), 4) show newest-first with a "time ago" label from ts.</div>`),
          article("fs-deploy", "Put Your App on the Internet", "10 min", `
<h3>🎯 From localhost to the world</h3>
<p>An app on localhost is a rehearsal. <strong>Deployment</strong> is opening night — real users, real URL. The modern flow:</p>
<div class="flow">
  <div class="flow-box">💻 Your code<br><small>works locally</small></div>
  <div class="flow-arrow" data-label="git push"></div>
  <div class="flow-box alt">🐙 GitHub<br><small>code online</small></div>
  <div class="flow-arrow" data-label="auto deploy"></div>
  <div class="flow-box warn">🌍 Live URL<br><small>real users!</small></div>
</div>
<h3>📝 Where to host (free options)</h3>
<ul>
  <li><strong>Frontend only</strong> (HTML/CSS/JS): <strong>GitHub Pages</strong> — free, fast, this very academy runs on it!</li>
  <li><strong>Full stack Node app</strong>: <strong>Render.com</strong> or <strong>Railway.app</strong> — connect your GitHub repo, they run <code>node server.js</code> in the cloud with a free tier.</li>
  <li><strong>Database</strong>: SQLite works for small apps; bigger apps use hosted PostgreSQL (Render/Railway offer these too).</li>
</ul>
<h3>💻 The deploy checklist</h3>
<pre><code>1. Push code to GitHub          (git add . / commit / push)
2. Render → "New Web Service"   → pick your repo
3. Start command: node server.js
4. Use the PORT they give you:
   app.listen(process.env.PORT || 3000);
5. Share your URL with friends 🎉</code></pre>
<div class="callout"><strong>Real-world tip:</strong> services sleep on free tiers (first visit is slow) — totally fine for portfolios and school projects. This academy uses GitHub Pages + Firebase + Cloudflare, all free — proof you can ship for $0.</div>
<div class="callout tip"><strong>Try it yourself:</strong> deploy your My Notes app to Render when you have computer time. Put the live URL in your CV — employers LOVE a working link.</div>`),
          article("fs-next", "Your Full Stack Career Path", "8 min", `
<h3>🎯 You made it — now what?</h3>
<p>Look back: browser ↔ server ↔ database, forms, APIs, SQL, security, deployment. You understand the WHOLE machine now. Here's how to grow from here:</p>
<h3>📝 Your next 6 months</h3>
<ol>
  <li><strong>Build 3 portfolio projects</strong> — ideas: expense tracker, class attendance app, mini blog. Each one: your API + database + polished frontend, deployed with a live URL.</li>
  <li><strong>Level up the frontend</strong> — take the <em>React</em> course here: it's how big apps organize their UI.</li>
  <li><strong>Level up the backend</strong> — the <em>Node.js</em> and <em>SQL</em> courses here go deeper than this overview.</li>
  <li><strong>Learn Git properly</strong> — branches, pull requests. Every job uses them daily.</li>
  <li><strong>Read other people's code</strong> — this academy is open source on GitHub. Read it! You'll now recognize the patterns.</li>
</ol>
<h3>📝 The job landscape</h3>
<ul>
  <li><strong>Junior full stack developer</strong> — companies love juniors who can touch every layer</li>
  <li><strong>Freelance</strong> — small shops in Myanmar need websites with ordering forms = exactly your skills</li>
  <li><strong>Your own product</strong> — you can now build a complete app alone. That's rare and powerful.</li>
</ul>
<div class="callout tip"><strong>Graduation task:</strong> take the final quiz, download your certificate 🎓, and post it! Then start portfolio project #1 THIS WEEK — momentum is everything.</div>`),
          quiz("fs-quiz4", "Final Quiz: Full Stack Developer", [
            { q: "Which is the correct full stack data flow?", options: ["Database → CSS → HTML", "Frontend → Backend → Database (and back)", "Backend → Frontend → Backend", "JSON → CSS → SQL"], answer: 1 },
            { q: "Why do we use ? placeholders in SQL queries?", options: ["They run faster", "To block SQL injection attacks", "They look professional", "SQLite requires them"], answer: 1 },
            { q: "What should a server store instead of the user's actual password?", options: ["The password backwards", "Nothing", "A bcrypt hash of it", "The password in a secret file"], answer: 2 },
            { q: "In our final app, what does express.static(\"public\") provide?", options: ["The database", "The frontend files (HTML/CSS/JS)", "Password hashing", "The REST routes"], answer: 1 },
            { q: "Which free service can host a Node.js + Express app?", options: ["GitHub Pages only", "Render or Railway", "Google Docs", "Instagram"], answer: 1 },
            { q: "A 201 status code means…", options: ["Server crashed", "Not found", "Created successfully", "Forbidden"], answer: 2 },
          ]),
        ],
      },
    ],
  },
];

/* Expose to the app */
window.APP_DATA = { CATEGORIES, COURSES };
