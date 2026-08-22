/* ============================================================
   S. Sparham Electrical - site generator
   Usage:  node generate.js   (or npm run build, which also runs check.js)
   Output: ../_site/, which is what wrangler deploys.

   Replaces the single-file base64 demo. Across 33 documents, inlining
   every asset into every page would have meant tens of megabytes and no
   cross-page caching at all, so assets are real files under /assets and
   shared by every page.

   _site/ is wiped on every run. Nothing may be hand-placed inside it.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const D = require('./src/data.js');
const Pages = require('./src/pages.js');
const Info = require('./src/pages-info.js');
const Light = require('./src/pages-lighting.js');
const A = require('./src/assets.js');
const llms = require('./src/llms.js');

const SRC = path.join(__dirname, 'src');
const ASSETS = path.join(__dirname, 'assets');
const OUT = path.join(__dirname, '..', '_site');
const OUT_ASSETS = path.join(OUT, 'assets');

const rm = p => fs.existsSync(p) && fs.rmSync(p, { recursive: true, force: true });
const mkdir = p => fs.mkdirSync(p, { recursive: true });

/* ---------- clean and prepare ---------- */
rm(OUT);
mkdir(OUT_ASSETS);

/* ---------- build the page list ---------- */
const pages = [
  Pages.home(),
  Pages.servicesHub(),
  ...D.services.map(s => Pages.servicePage(s)),
  Pages.areasHub(),
  ...D.locations.map((l, i) => Pages.locationPage(l, i)),
  Light.lightingHub(),
  ...Light.guides.map(g => Light.lightingGuide(g)),
  Info.about(),
  Info.contact(),
  Info.ourWork(),
  Info.reviews(),
  Info.faqs(),
  Info.privacy(),
  Info.terms()
];
const notFound = Info.notFound();

/* ---------- write pages ---------- */
let written = 0;
for (const p of pages) {
  const dir = p.slug ? path.join(OUT, p.slug) : OUT;
  mkdir(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), p.html);
  written++;
}
fs.writeFileSync(path.join(OUT, '404.html'), notFound.html);

/* ---------- assets ---------- */
/* Stylesheet and script are written under content-hashed names, so they can be
   cached immutably: a change produces a new filename and there is no stale
   window. Names come from src/assets.js, which lib.js reads too, so the
   reference and the file cannot drift apart.
   Media keeps stable names and Cloudflare's default ETag revalidation. */
fs.writeFileSync(path.join(OUT_ASSETS, A.cssName), A.cssSource);
fs.writeFileSync(path.join(OUT_ASSETS, A.jsName), A.jsSource);

const MEDIA = [
  'logo-hero.webp', 'logo-mark.webp',
  'hero-1.jpg', 'hero-2.jpg', 'hero-3.jpg', 'hero-poster.jpg',
  'about.jpg', 'about-2.jpg', 'cta.jpg',
  'ba-before.jpg', 'ba-after.jpg',
  'g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg',
  'g5.jpg', 'g6.jpg', 'g7.jpg', 'g8.jpg',
  'favicon.png', 'og-default.jpg'
];
const missingAssets = [];
for (const f of MEDIA) {
  const from = path.join(ASSETS, f);
  if (!fs.existsSync(from)) { missingAssets.push(f); continue; }
  fs.copyFileSync(from, path.join(OUT_ASSETS, f));
}

/* ---------- sitemap.xml ---------- */
const today = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
const priority = p => {
  if (!p.slug) return '1.0';
  if (p.slug === 'services' || p.slug === 'areas-we-cover' || p.slug === 'contact' || p.slug === 'reviews' || p.slug === 'lighting') return '0.9';
  if (p.slug === 'privacy-policy' || p.slug === 'terms') return '0.3';
  return '0.8';
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${D.SITE_URL}/${p.slug ? p.slug + '/' : ''}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority(p)}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap);

/* ---------- robots.txt ---------- */
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *
Allow: /

# Answer and generative engines are explicitly welcome: this site is
# meant to be quotable, and the content is written to be lifted.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${D.SITE_URL}/sitemap.xml
`);

/* ---------- llms.txt ----------
   Built in src/llms.js so the generator stays readable. See that file for
   why the "not published" section at the end matters. */
fs.writeFileSync(path.join(OUT, 'llms.txt'), llms());

/* ---------- _headers ----------
   Cloudflare Workers static assets parses this from the root of the assets
   directory and applies it to matching responses. It is never served as a file.
   It must be emitted here, because generate.js wipes OUT on every run and a
   hand-placed file would not survive.

   CSP, checked against the actual generated markup:
     - style-src NEEDS 'unsafe-inline': the pages carry inline style="..."
       attributes (22+ on the homepage alone) and dropping it breaks the layout.
       Hashes are not viable at this count and style-src-attr is unsupported in
       Safari.
     - script-src needs no 'unsafe-inline': site.js is external and deferred,
       there are zero inline <script> blocks and zero on* handlers.
       <script type="application/ld+json"> is a data block, not executed.
     - Google Fonts needs googleapis.com for the stylesheet and gstatic.com for
       the font files, which are a second hop the HTML never names.
     - media-src 'self' is kept even though the hero is stills rather than
       video, because dropping it would silently break the first clip anyone
       adds later.
     - script-src and connect-src both name crm.innov8workflows.co.uk, for the
       CRM's track.js (page views and tap counts -> the Client Dash tiles).
     - connect-src names script.google.com AND script.googleusercontent.com.
       Both are needed: the /exec URL 302s to the googleusercontent host, and
       CSP is re-evaluated on the redirect target, so listing only the first
       blocks the beacon at the second hop.
     - GA4 is still to come. When it lands, add to this in the same commit:
         script-src  https://www.googletagmanager.com
         connect-src https://www.google-analytics.com
                     https://region1.google-analytics.com
         img-src     https://www.google-analytics.com
       A blocked beacon fails quietly, so none of this announces itself.

   Permissions-Policy keeps autoplay=(self) rather than autoplay=(). There is
   no video on the site today, but the common copy-paste snippet uses the
   latter and would kill the first hero clip anyone drops in later.

   HSTS is deliberately absent: it is set at zone level in Cloudflare
   (SSL/TLS -> Edge Certificates) so it covers redirect responses too, and it
   should be ramped from a short max-age rather than shipped at a year. */
const CSP = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self' https://crm.innov8workflows.co.uk",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://crm.innov8workflows.co.uk https://script.google.com https://script.googleusercontent.com",
  "form-action 'self'",
  "manifest-src 'none'",
  "worker-src 'none'",
  'upgrade-insecure-requests'
].join('; ');

const PERMISSIONS = [
  'accelerometer=()', 'autoplay=(self)', 'camera=()', 'display-capture=()',
  'encrypted-media=()', 'fullscreen=(self)', 'geolocation=()', 'gyroscope=()',
  'magnetometer=()', 'microphone=()', 'midi=()', 'payment=()', 'usb=()',
  'xr-spatial-tracking=()'
].join(', ');

fs.writeFileSync(path.join(OUT, '_headers'), `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Cross-Origin-Opener-Policy: same-origin
  Permissions-Policy: ${PERMISSIONS}
  Content-Security-Policy: ${CSP}

# Content-hashed, so a change means a new filename and this can never go stale.
# Media is NOT given a long TTL: the filenames are not versioned, so a replaced
# photo would be stuck in caches with no way to bust it. Cloudflare's default
# (max-age=0, must-revalidate, with an ETag) gives repeat visitors a cheap 304.
/assets/${A.cssName}
  Cache-Control: public, max-age=31536000, immutable

/assets/${A.jsName}
  Cache-Control: public, max-age=31536000, immutable

# Keeps the preview deployment out of the index while workers_dev is true.
# Remove this block when the custom domain goes live and workers_dev is false.
https://:worker.:account.workers.dev/*
  X-Robots-Tag: noindex, nofollow
`);

/* ---------- report ---------- */
const totalBytes = (function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).reduce((sum, e) => {
    const f = path.join(dir, e.name);
    return sum + (e.isDirectory() ? walk(f) : fs.statSync(f).size);
  }, 0);
})(OUT);

const htmlBytes = pages.reduce((a, p) => a + Buffer.byteLength(p.html), 0);
const kb = n => (n / 1024).toFixed(0) + ' KB';

console.log('Built ' + OUT);
console.log('  pages            : ' + (written + 1) + ' (including 404)');
console.log('  average page HTML: ' + kb(htmlBytes / pages.length));
console.log('  total output     : ' + (totalBytes / 1048576).toFixed(2) + ' MB');
console.log('  hashed assets    : ' + A.cssName + ', ' + A.jsName);
if (missingAssets.length) {
  console.log('\n  MISSING ASSETS (page references will 404):');
  missingAssets.forEach(f => console.log('    - ' + f));
}
console.log('\n  Awaiting client confirmation:');
Object.values(D.pending).forEach(v => console.log('    - ' + v));
if (missingAssets.length) process.exitCode = 1;
