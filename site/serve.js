/* ============================================================
   Local server that replicates Cloudflare Workers static assets, so the
   things that only break in production can be caught before deploying.

   A plain static server does NOT replicate:
     - _headers, so a broken CSP looks fine locally and strips the layout live
     - auto-trailing-slash, so /contact vs /contact/ behaviour is untested
     - not_found_handling, so the 404 page is never exercised at depth

   Usage:  node site/serve.js [port]
   ============================================================ */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const PORT = Number(process.argv[2]) || 8134;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon'
};

/* ---------- parse _headers the way Workers does ---------- */
function parseHeaders() {
  const f = path.join(ROOT, '_headers');
  if (!fs.existsSync(f)) return [];
  const rules = [];
  let current = null;
  for (const raw of fs.readFileSync(f, 'utf8').split('\n')) {
    const line = raw.replace(/\s+$/, '');
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      current = { pattern: line.trim(), headers: [] };
      rules.push(current);
    } else if (current) {
      const i = line.indexOf(':');
      if (i > 0) current.headers.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
    }
  }
  return rules;
}
const RULES = parseHeaders();

/* only host-less patterns are matched here; the workers.dev rule is skipped */
const matches = (pattern, urlPath) => {
  if (/^https?:/.test(pattern)) return false;
  const re = new RegExp('^' + pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*') + '$');
  return re.test(urlPath);
};

const applyHeaders = (res, urlPath) => {
  for (const r of RULES) {
    if (matches(r.pattern, urlPath)) for (const [k, v] of r.headers) res.setHeader(k, v);
  }
};

const send = (res, status, body, type, urlPath) => {
  applyHeaders(res, urlPath);
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const target = path.join(ROOT, urlPath);

  /* a real file wins */
  if (fs.existsSync(target) && fs.statSync(target).isFile()) {
    return send(res, 200, fs.readFileSync(target),
      MIME[path.extname(target).toLowerCase()] || 'application/octet-stream', urlPath);
  }

  /* auto-trailing-slash also serves foo.html at /foo, which is how the real
     host answers /404 with a 200. That is why the 404 page carries noindex. */
  if (!urlPath.endsWith('/') && fs.existsSync(target + '.html')) {
    return send(res, 200, fs.readFileSync(target + '.html'), MIME['.html'], urlPath);
  }

  /* directory with an index: serve it if the path ends in a slash */
  const index = path.join(target, 'index.html');
  if (urlPath.endsWith('/') && fs.existsSync(index)) {
    return send(res, 200, fs.readFileSync(index), MIME['.html'], urlPath);
  }

  /* auto-trailing-slash: /contact -> 307 -> /contact/  (Workers uses 307, not 301) */
  if (!urlPath.endsWith('/') && fs.existsSync(index)) {
    applyHeaders(res, urlPath);
    res.writeHead(307, { Location: urlPath + '/' });
    return res.end();
  }

  /* not_found_handling: "404-page" — real 404 status, body served under the
     original request path, which is why 404.html must use root-absolute refs */
  const notFound = path.join(ROOT, '404.html');
  if (fs.existsSync(notFound)) {
    return send(res, 404, fs.readFileSync(notFound), MIME['.html'], urlPath);
  }
  return send(res, 404, 'Not found', 'text/plain', urlPath);
}).listen(PORT, () => {
  console.log(`Serving _site on http://localhost:${PORT}`);
  console.log(`Replicating: _headers (${RULES.length} rules), auto-trailing-slash, 404-page`);
});
