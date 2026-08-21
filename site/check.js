/* Post-build validation. Run after generate.js.
   Checks the things that silently break a static site: dead internal links,
   missing assets, malformed JSON-LD, and duplicate or overlong metadata. */
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', '_site');
/* derive the host, never hardcode it: SITE_URL changes when the domain does,
   and a stale literal here fails the build for every sitemap entry */
const D = require('./src/data.js');
const { SITE_URL } = D;

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
  const f = path.join(d, e.name);
  return e.isDirectory() ? walk(f) : [f];
});

const files = walk(OUT);
const htmls = files.filter(f => f.endsWith('.html'));
const rel = f => path.relative(OUT, f).replace(/\\/g, '/');
const problems = [];
const warn = [];

const titles = new Map(), descs = new Map(), canons = new Map();

for (const f of htmls) {
  const html = fs.readFileSync(f, 'utf8');
  const id = rel(f);
  const dir = path.dirname(f);

  /* --- metadata --- */
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (!title) problems.push(`${id}: no <title>`);
  if (!desc) problems.push(`${id}: no meta description`);
  if (!canon) problems.push(`${id}: no canonical`);
  if (title) {
    if (titles.has(title)) problems.push(`${id}: duplicate title, same as ${titles.get(title)}`);
    titles.set(title, id);
    if (title.length > 65) warn.push(`${id}: title ${title.length} chars (over 65, may truncate in search)`);
  }
  if (desc) {
    if (descs.has(desc)) problems.push(`${id}: duplicate description, same as ${descs.get(desc)}`);
    descs.set(desc, id);
    if (desc.length > 165) warn.push(`${id}: description ${desc.length} chars (over 165)`);
    if (desc.length < 70) warn.push(`${id}: description only ${desc.length} chars`);
  }
  /* 404.html deliberately canonicalises to the homepage, so it is exempt from
     the collision check in both directions: it must neither be reported nor
     registered, or whichever page is walked second gets flagged. */
  if (canon && id !== '404.html') {
    if (canons.has(canon)) problems.push(`${id}: canonical collides with ${canons.get(canon)}`);
    canons.set(canon, id);
  }

  /* --- exactly one h1 --- */
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${id}: ${h1s} <h1> elements (expected 1)`);

  /* --- JSON-LD parses --- */
  const ld = (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
  if (!ld) problems.push(`${id}: no JSON-LD`);
  else {
    try {
      const j = JSON.parse(ld);
      const types = (j['@graph'] || []).map(n => n['@type']).flat();
      if (!types.some(t => t === 'Electrician')) problems.push(`${id}: JSON-LD missing Electrician`);

      const s = JSON.stringify(j);

      /* Claims that are NOT backed by anything the client has confirmed, and
         so may never appear in the markup. priceRange and openingHours are
         both still in `pending` in data.js; if either is ever confirmed,
         remove it from this list at the same time as adding it, and not
         before. */
      ['priceRange', 'openingHours'].forEach(k => {
        if (s.includes('"' + k + '"')) problems.push(`${id}: JSON-LD asserts unverified "${k}"`);
      });

      /* aggregateRating IS asserted, from the harvested Google score. Guard
         it instead of banning it: it has to match data.js exactly, or the
         markup and the page drift apart and the rich result gets dropped. */
      const ar = (j['@graph'] || []).map(n => n.aggregateRating).filter(Boolean)[0];
      if (ar) {
        if (ar.ratingValue !== D.ratings.google.score || ar.reviewCount !== D.ratings.google.count) {
          problems.push(`${id}: aggregateRating ${ar.ratingValue}/${ar.reviewCount} does not match data.js (${D.ratings.google.score}/${D.ratings.google.count})`);
        }
      }

      /* Review nodes may only appear on a page that actually displays the
         reviews, which is the homepage and /reviews/. Structured reviews on
         a page that does not show them is exactly what gets a site's rich
         results ignored. */
      const hasReviewNodes = (j['@graph'] || []).some(n => n['@type'] === 'Review');
      const showsReviews = /class="rv__txt"/.test(html);
      if (hasReviewNodes && !showsReviews) problems.push(`${id}: Review schema on a page that shows no reviews`);

      /* And the reverse: no scheme registration has been confirmed, so the
         words must not appear anywhere in the markup at all. */
      const banned = /(NICEIC|NAPIT|ELECSA|Stroma|Part P registered|approved contractor)/i.exec(html);
      if (banned) problems.push(`${id}: claims scheme registration ("${banned[0]}") which the client has not confirmed`);
    } catch (e) { problems.push(`${id}: JSON-LD does not parse (${e.message})`); }
  }

  /* --- internal links and asset references resolve --- */
  /* strip comments first: the video swap points quote real paths for
     documentation, and those are not live references */
  const live = html.replace(/<!--[\s\S]*?-->/g, '');
  const refs = [];
  const push = re => { let m; while ((m = re.exec(live))) refs.push(m[1]); };
  push(/href="([^"#?][^"]*)"/g);
  push(/src="([^"]+)"/g);

  for (const r of refs) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(r)) continue;
    let target = r.startsWith('/') ? path.join(OUT, r) : path.resolve(dir, r);
    if (r.endsWith('/') || !path.extname(r)) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) problems.push(`${id}: dead link -> ${r}`);
  }

  /* --- images must carry alt --- */
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  imgs.forEach(t => { if (!/\salt=/.test(t)) problems.push(`${id}: <img> with no alt attribute`); });
}

/* --- sitemap covers every page and nothing else --- */
const sm = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const pageUrls = htmls.filter(f => !f.endsWith('404.html'))
  .map(f => rel(f).replace(/index\.html$/, ''))
  .map(u => SITE_URL + '/' + u);
pageUrls.forEach(u => { if (!locs.includes(u)) problems.push(`sitemap: missing ${u}`); });
locs.forEach(u => { if (!pageUrls.includes(u)) problems.push(`sitemap: lists non-existent ${u}`); });
if (!/sitemaps\.org/.test(sm)) problems.push('sitemap: wrong namespace');

console.log(`Checked ${htmls.length} pages, ${files.length} files.`);
console.log(`Unique titles: ${titles.size} | descriptions: ${descs.size} | sitemap urls: ${locs.length}`);
if (warn.length) { console.log('\nWarnings (' + warn.length + '):'); warn.forEach(w => console.log('  ! ' + w)); }
if (problems.length) {
  console.log('\nPROBLEMS (' + problems.length + '):');
  [...new Set(problems)].forEach(p => console.log('  x ' + p));
  process.exitCode = 1;
} else {
  console.log('\nNo problems found.');
}
