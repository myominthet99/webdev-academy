// Tiny zero-dependency static server for WebDev Academy
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = process.env.PORT || 5500;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript',
  '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.ico':'image/x-icon' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log(`WebDev Academy running → http://localhost:${port}`));
