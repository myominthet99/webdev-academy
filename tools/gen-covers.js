/* Generates an SVG cover image for every built-in course.
   Usage: node tools/gen-covers.js   (writes covers/<course-id>.svg)
   Design: course gradient background, seeded scatter of faint code
   glyphs, soft accent circles, big icon, category label. */
const fs = require("fs");
const path = require("path");

global.window = {};
eval(fs.readFileSync(path.join(__dirname, "..", "js", "data.js"), "utf-8"));
const COURSES = global.window.APP_DATA.COURSES;

const W = 640, H = 360;
const GLYPHS = ["&lt;/&gt;", "{ }", "( )", ";", "=", "#", "[ ]", "//", "&amp;&amp;", "*"];

function hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return h >>> 0;
}
function rng(seed) {
  let x = seed || 1;
  return () => {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5; x |= 0;
    return ((x >>> 0) % 10000) / 10000;
  };
}
const esc = (s) => String(s).replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, "&amp;");

function colorsOf(course) {
  const stops = String(course.color).match(/#[0-9a-fA-F]{3,6}/g) || ["#7b2ff7", "#f107a3"];
  return [stops[0], stops[stops.length - 1]];
}

function cover(course) {
  const [c1, c2] = colorsOf(course);
  const r = rng(hash(course.id));
  let scatter = "";
  for (let i = 0; i < 14; i++) {
    const g = GLYPHS[Math.floor(r() * GLYPHS.length)];
    const x = Math.floor(r() * W);
    const y = 30 + Math.floor(r() * (H - 40));
    const size = 14 + Math.floor(r() * 30);
    const rot = Math.floor(r() * 60) - 30;
    scatter += `<text x="${x}" y="${y}" font-size="${size}" fill="#ffffff" fill-opacity="0.09" font-family="Consolas,monospace" font-weight="700" transform="rotate(${rot} ${x} ${y})">${g}</text>\n  `;
  }
  const cat = esc(String(course.category).toUpperCase());
  const icon = esc(course.icon);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="${W - 70}" cy="40" r="130" fill="#ffffff" fill-opacity="0.08"/>
  <circle cx="50" cy="${H - 30}" r="90" fill="#000000" fill-opacity="0.10"/>
  ${scatter}
  <text x="${W / 2}" y="${H / 2 + 4}" font-size="96" text-anchor="middle" dominant-baseline="middle"
        font-family="'Segoe UI Emoji','Apple Color Emoji',Consolas,monospace" font-weight="800" fill="#ffffff"
        style="paint-order:stroke" stroke="#000000" stroke-opacity="0.15" stroke-width="4">${icon}</text>
  <rect x="24" y="${H - 52}" width="4" height="26" rx="2" fill="#ffffff" fill-opacity="0.9"/>
  <text x="38" y="${H - 32}" font-size="17" font-family="'Segoe UI',Arial,sans-serif" font-weight="700"
        fill="#ffffff" fill-opacity="0.92" letter-spacing="2">${cat}</text>
  <text x="${W - 24}" y="${H - 32}" font-size="13" text-anchor="end" font-family="'Segoe UI',Arial,sans-serif"
        font-weight="600" fill="#ffffff" fill-opacity="0.55">WebDev Academy</text>
</svg>
`;
}

const outDir = path.join(__dirname, "..", "covers");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
let n = 0;
COURSES.forEach((c) => {
  fs.writeFileSync(path.join(outDir, c.id + ".svg"), cover(c));
  n++;
});
console.log("Generated " + n + " covers in covers/");
