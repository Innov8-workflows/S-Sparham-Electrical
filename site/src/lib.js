/* ============================================================
   Shared building blocks for every generated page.
   Icons are exact Lucide paths, never hand-drawn.
   ============================================================ */
const { SITE_URL, biz, pending, credentials, badges, projects, ratings, reviews, services, locations } = require('./data.js');
const A = require('./assets.js');

/* ---------- small helpers ---------- */
const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/* depth 0 = site root (index.html), depth 1 = /<slug>/index.html,
   depth -1 = root-absolute, for pages served from an arbitrary path */
const root = d => (d === -1 ? '/' : d === 0 ? '' : '../');
const href = (d, slug) => (d === -1 ? '/' + (slug ? slug + '/' : '')
                                    : root(d) + (slug ? slug + '/' : '') || './');
const asset = (d, f) => root(d) + 'assets/' + f;
const abs = slug => SITE_URL + '/' + (slug ? slug + '/' : '');

/* ---------- icons (Lucide) ---------- */
const ICON = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  brick: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 9v6"/><path d="M16 15v6"/><path d="M16 3v6"/><path d="M3 15h18"/><path d="M3 9h18"/><path d="M8 15v6"/><path d="M8 3v6"/>',
  triangle: '<path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/>',
  rain: '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>',
  hammer: '<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>',
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  users: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  zap: '<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',
  lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  plug: '<path d="M12 22v-5"/><path d="M15 8V2"/><path d="M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z"/><path d="M9 8V2"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  factory: '<path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M8 16h.01"/>',
  cctv: '<path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"/><path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"/><path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"/><path d="M2 21v-4"/><path d="M7 9h.01"/>',
  award: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'
};
const ic = (n, cls) => `<svg class="${cls || 'ic'}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n] || ''}</svg>`;

/* The Google "G", exact paths from the gilbarbara/logos set. Full colour, on
   its own 256x262 viewBox, so it cannot live in the 24x24 ICON map above.
   Never redraw this by hand: it is a trademark and an approximation looks it. */
const G_MARK = '<svg class="gmark" viewBox="0 0 256 262" aria-hidden="true" focusable="false">' +
  '<path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>' +
  '<path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>' +
  '<path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>' +
  '<path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>' +
  '</svg>';

/* the official WhatsApp glyph, for the float and the brand buttons */
const WA_GLYPH = '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488"/>';

const ph = () => '<span class="ph">Placeholder</span>';
/* One prefill for every WhatsApp entry point on the site, so the message
   Stephen receives is consistent no matter which button was pressed.

   It carries where it came from. Stephen gets enquiries from Facebook,
   MyBuilder and word of mouth as well as the site, and a message that says so
   is the difference between knowing the website is earning its keep and
   guessing. The page name is in there too, because "EV charger installation"
   tells him what the customer was reading when they pressed the button.

   PAGE_TOKEN is substituted per page in page() rather than threaded through
   every helper that builds a WhatsApp link. It survives encodeURIComponent
   untouched (underscores are not escaped), so it can be swapped in after the
   URL has been built, which is why it looks like this rather than being a
   template hole. */
const PAGE_TOKEN = '__PAGE__';
const WA_PREFILL = 'Hello S. Sparham Electrical, I would like a quote for some electrical work.' +
  '\n\nSent from ssparhamelectrical.co.uk (' + PAGE_TOKEN + ')';

/* The human label for the page, used in the WhatsApp prefill and on the body
   element for the form to read. The last breadcrumb is already the readable
   name of the page, so there is nothing extra to maintain. */
function pageLabel(p) {
  if (p.waLabel) return p.waLabel;
  if (!p.slug) return 'Home page';
  if (p.slug === '404') return 'Page not found';
  const t = p.trail && p.trail.length ? p.trail[p.trail.length - 1][1] : null;
  return t || p.slug;
}
const waLink = txt => `https://wa.me/${biz.whatsapp}${txt ? '?text=' + encodeURIComponent(txt) : ''}`;
const tel = `tel:${biz.phoneRaw}`;

/* ---------- head ---------- */
function head(p) {
  const d = p.depth;
  /* The 404 page is served at whatever path was missed, and the file itself
     answers /404 with a 200, so it must not be indexable and must not
     canonicalise to a URL that does not exist. Both are overridable per page. */
  const canonical = p.canonical || abs(p.slug);
  const robots = p.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1';
  const ogImg = SITE_URL + '/assets/' + (p.ogImage || 'og-default.jpg');
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0B0E12">
<meta name="robots" content="${robots}">
<meta property="og:type" content="${p.slug ? 'article' : 'website'}">
<meta property="og:site_name" content="${esc(biz.name)}">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.ogTitle || p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${ogImg}">
<link rel="icon" href="${asset(d, 'favicon.png')}" sizes="any">
<link rel="apple-touch-icon" href="${asset(d, 'favicon.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset(d, A.cssName)}">
<script type="application/ld+json">${JSON.stringify(p.schema)}</script>
</head>
<body data-page="${esc(pageLabel(p))}">`;
}

/* ---------- header ---------- */
function header(d, current) {
  const on = s => (current === s ? ' aria-current="page"' : '');
  const nav = [
    ['services', 'Services'],
    ['areas-we-cover', 'Areas'],
    ['our-work', 'Our work'],
    ['reviews', 'Reviews'],
    ['faqs', 'FAQs'],
    ['about', 'About'],
    ['contact', 'Contact']
  ];
  return `
<a class="skip" href="#main">Skip to content</a>
<header class="nav">
  <div class="wrap nav__in">
    <a class="nav__logo" href="${href(d, '')}" aria-label="${esc(biz.name)}, home">
      <img src="${asset(d, 'logo-mark.webp')}" alt="${esc(biz.name)}" width="440" height="257">
    </a>
    <nav class="nav__links" aria-label="Main">
      ${nav.map(([s, l]) => `<a href="${href(d, s)}"${on(s)}>${l}</a>`).join('\n      ')}
    </nav>
    <div class="nav__spacer"></div>
    <a class="nav__call" href="${tel}" data-track="call">${ic('phone')}<span>${biz.phone}</span></a>
    <button class="nav__burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="navPanel">${ic('menu')}</button>
  </div>
  <div class="nav__panel" id="navPanel">
    ${nav.map(([s, l]) => `<a href="${href(d, s)}"${on(s)}>${l} ${ic('arrow')}</a>`).join('\n    ')}
    <a href="${href(d, 'contact')}">Get a quote ${ic('arrow')}</a>
  </div>
</header>`;
}

/* ---------- breadcrumbs ---------- */
function crumbs(d, trail) {
  if (!trail || !trail.length) return '';
  const items = [['', 'Home']].concat(trail);
  return `
<nav class="crumb" aria-label="Breadcrumb">
  <div class="wrap"><ol>
    ${items.map(([slug, label], i) => {
      const last = i === items.length - 1;
      const sep = i ? ic('chevron') : '';
      const inner = last
        ? `<span aria-current="page">${esc(label)}</span>`
        : `<a href="${href(d, slug)}">${esc(label)}</a>`;
      return `<li>${sep}${inner}</li>`;
    }).join('\n    ')}
  </ol></div>
</nav>`;
}

/* ---------- page header band ---------- */
function phead(d, o) {
  return `
<section class="phead">
  <img class="phead__bg" src="${asset(d, o.bg || 'hero-poster.jpg')}" alt="" aria-hidden="true" loading="eager">
  <div class="wrap phead__in">
    <h1>${esc(o.h1)}</h1>
    ${o.sub ? `<p class="phead__sub">${o.sub}</p>` : ''}
    <div class="phead__cta">
      <a class="btn btn--brand" href="${tel}" data-track="call">${ic('phone')} Call ${biz.phone}</a>
      <a class="btn btn--ghost" href="${href(d, 'contact')}">Get a quote ${ic('arrow')}</a>
    </div>
  </div>
</section>`;
}

/* ---------- reusable blocks ---------- */
const ticks = items => `<ul class="ticks">${items.map(t => `<li>${ic('check')}<span>${t}</span></li>`).join('')}</ul>`;

const steps = list => `<div class="steps">${list.map(([h, p]) =>
  `<div class="step"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>`;

const faqBlock = list => `<div class="faq">${list.map(([q, a]) =>
  `<details class="faq__i"><summary class="faq__q">${esc(q)}</summary><div class="faq__a"><p>${a}</p></div></details>`
).join('')}</div>`;

function band(d, title, text) {
  return `
<div class="band">
  <h2>${esc(title)}</h2>
  <p>${esc(text)}</p>
  <div class="band__btns">
    <a class="btn btn--brand" href="${tel}" data-track="call">${ic('phone')} Call ${biz.phone}</a>
    <a class="btn btn--ghost" href="${waLink(WA_PREFILL)}" target="_blank" rel="noopener" data-track="whatsapp">${ic('chat')} WhatsApp us</a>
  </div>
</div>`;
}

function quotePanel(d) {
  return `
<div class="panel panel--dark">
  <h3>Get a quote</h3>
  <p>Call or send a photo of the problem on WhatsApp and you will get a straight answer on what it needs.</p>
  <a class="btn btn--brand" href="${tel}" data-track="call">${ic('phone')} ${biz.phone}</a>
  <div style="height:8px"></div>
  <a class="btn btn--ghost" href="${waLink(WA_PREFILL)}" target="_blank" rel="noopener" data-track="whatsapp">${ic('chat')} WhatsApp</a>
</div>`;
}

function servicePanel(d, exclude) {
  return `
<div class="panel">
  <h3>Our services</h3>
  <div class="panel__list">
    ${services.filter(s => s.slug !== exclude).map(s =>
      `<a href="${href(d, s.slug)}">${esc(s.nav)} ${ic('chevron')}</a>`).join('\n    ')}
  </div>
</div>`;
}

function areaPanel(d, exclude) {
  return `
<div class="panel">
  <h3>Areas we cover</h3>
  <div class="panel__list">
    ${locations.filter(l => l.slug !== exclude).slice(0, 9).map(l =>
      `<a href="${href(d, 'electrician-in-' + l.slug)}">${esc(l.name)} ${ic('chevron')}</a>`).join('\n    ')}
    <a href="${href(d, 'areas-we-cover')}">All areas ${ic('chevron')}</a>
  </div>
</div>`;
}

/* ---------- credential badge strip ----------
   The compact form: sits directly under the hero, on every service page, and
   in the footer. Text badges by design; see the note on `badges` in data.js
   for why there are no scheme logos here. */
function credBadges(d, variant) {
  const v = variant ? ' badges--' + variant : '';
  return `
<div class="badges${v}">
  ${badges.map(([icon, name, note]) => `<div class="badge">${ic(icon)}<div><b>${esc(name)}</b><small>${esc(note)}</small></div></div>`).join('\n  ')}
</div>`;
}

function credStrip(d) {
  return `
<section class="credstrip" aria-label="Qualifications and cover">
  <div class="wrap">
    ${credBadges(d)}
    <p class="credstrip__note">Held by ${esc(biz.owner)}. Every job that needs one is tested and certificated. <a href="${href(d, 'about')}">More about our qualifications</a></p>
  </div>
</section>`;
}

/* ---------- project zig-zag ----------
   Alternating left/right rows. The direction comes from the index, so a second
   project needs nothing but another entry in data.projects. */
function projectRow(d, p, i) {
  const [bf, balt] = p.before, [af, aalt] = p.after;
  return `
<article class="proj${i % 2 ? ' proj--flip' : ''}">
  <div class="proj__media">
    <div class="ba">
      <img class="ba__after" src="${asset(d, af)}" alt="${esc(aalt)}" loading="lazy" width="1080" height="1080">
      <img class="ba__before" src="${asset(d, bf)}" alt="${esc(balt)}" loading="lazy" width="1080" height="1080">
      <span class="ba__tag ba__tag--b">During</span>
      <span class="ba__tag ba__tag--a">Finished</span>
      <div class="ba__handle" aria-hidden="true"></div>
      <input class="ba__range" type="range" min="0" max="100" value="50" step="1"
             aria-label="${esc(p.title)}: drag to reveal more of the finished room or more of the work in progress">
    </div>
    <p class="ba__cap">${ic('chevron')} Drag the handle to compare</p>
  </div>
  <div class="proj__body">
    <div class="eyebrow">${esc(p.eyebrow)}</div>
    <h3>${esc(p.title)}</h3>
    <p class="proj__lead">${esc(p.lead)}</p>
    <p>${esc(p.body)}</p>
    <h4>What the job involved</h4>
    ${ticks(p.scope.map(esc))}
  </div>
</article>`;
}

/* ---------- credentials ----------
   The audit's single biggest finding was that nothing on the old site told
   a customer Stephen was qualified. This block is the answer, and it appears
   on the homepage, About and every service page.

   It lists QUALIFICATIONS ONLY. No competent-person scheme has been
   confirmed, so none is named, implied, or hinted at with a logo slot. */
function credentialsBlock(d, opts) {
  const o = opts || {};
  return `
<section class="creds${o.tint ? ' creds--tint' : ''}">
  <div class="wrap">
    <div class="sec-head sec-head--mid">
      <div class="eyebrow">Qualifications</div>
      <h2>${esc(o.title || 'Qualified, insured and guaranteed')}</h2>
      <p>Before anyone works on your electrics it is worth knowing what they are trained to do. This is what ${esc(biz.owner)} holds.</p>
    </div>
    <div class="creds__grid">
      ${credentials.map(([name, note]) => `<div class="creds__i">${ic('award')}<div><b>${esc(name)}</b><small>${esc(note)}</small></div></div>`).join('\n      ')}
    </div>
    <div class="creds__bar">
      <div class="creds__bi">${ic('shield')}<div><b>Fully insured</b><small>${biz.publicLiabilityText} public liability cover</small></div></div>
      <div class="creds__bi">${ic('check')}<div><b>${biz.guaranteeMonths}-month guarantee</b><small>On all work carried out</small></div></div>
      <div class="creds__bi">${ic('file')}<div><b>Certificates issued</b><small>Test results with every job that needs them</small></div></div>
      <div class="creds__bi">${ic('clock')}<div><b>${biz.yearsTrading} years trading</b><small>A team of ${biz.teamSize}, based in ${esc(biz.town)}</small></div></div>
    </div>
  </div>
</section>`;
}

/* ---------- reviews ----------
   Real reviews only, word for word. `ratings` and `reviews` both come from
   the harvest and neither is padded: if a platform has four reviews it says
   four. Scores from different platforms are shown side by side and never
   averaged into one number. */
const starRow = n => `<div class="stars" role="img" aria-label="${n} out of 5 stars">${ic('star', 'ic ic--fill').repeat(n)}</div>`;

const reviewCard = r => `
<figure class="rv__card rv__card--${r.source.toLowerCase()}"><div class="rv__inner">
  ${starRow(r.stars)}
  <blockquote class="rv__txt">${esc(r.text)}</blockquote>
  <figcaption class="rv__who">
    <div class="rv__av" aria-hidden="true">${esc(r.name.trim()[0])}</div>
    <div><b>${esc(r.name)}${r.place ? ', ' + esc(r.place) : ''}</b>
      <small>${esc(r.when)}</small></div>
    ${r.source === 'Google' ? G_MARK : `<span class="rv__src">${esc(r.source)}</span>`}
  </figcaption>
</div></figure>`;

function ratingsBar(d) {
  const g = ratings.google, m = ratings.mybuilder, f = ratings.facebook;
  return `
<div class="rate">
  <a class="rate__i" href="${g.url}" target="_blank" rel="noopener">
    <span class="rate__n">${g.score}</span>
    ${starRow(5)}
    <small>${g.count} Google reviews</small>
  </a>
  <a class="rate__i" href="${m.url}" target="_blank" rel="noopener">
    <span class="rate__n">${m.score}.0</span>
    ${starRow(5)}
    <small>${m.count} MyBuilder reviews</small>
  </a>
  <a class="rate__i" href="${f.url}" target="_blank" rel="noopener">
    <span class="rate__n">${f.recommendPct}%</span>
    ${starRow(5)}
    <small>recommend on Facebook (${f.count})</small>
  </a>
</div>
<p class="rate__note">Scores as at ${esc(ratings.asAt)}. Every review on this site is a real one, reproduced word for word, and each score links to the profile it came from so you can check it yourself.</p>`;
}

/* Links out to the review profiles. Google first, because it is the one a
   customer can check in a single tap and the one with the most reviews on it. */
function reviewLinks(d) {
  return `
<div class="rvout">
  <a class="btn btn--google" href="${biz.googleProfile}" target="_blank" rel="noopener">
    ${G_MARK} Read all ${ratings.google.count} Google reviews ${ic('arrow')}
  </a>
  <a class="btn btn--dark" href="${ratings.mybuilder.url}" target="_blank" rel="noopener">
    ${ic('check')} ${ratings.mybuilder.score}.0 from ${ratings.mybuilder.count} on MyBuilder ${ic('arrow')}
  </a>
</div>
<p class="rvout__note">${esc(biz.name)} is rated ${ratings.google.score} out of 5 across ${ratings.google.count} Google reviews and ${ratings.mybuilder.score} out of 5 from ${ratings.mybuilder.count} reviews on MyBuilder, with ${ratings.facebook.recommendPct}% recommending on <a href="${ratings.facebook.url}" target="_blank" rel="noopener">Facebook</a>. Scores as at ${esc(ratings.asAt)}.</p>`;
}

/* Carousel of real reviews for the homepage. */
function reviewsCarousel(list) {
  return `
<div class="rv" id="rv">
  <div class="rv__view"><div class="rv__track" id="rvTrack">${(list || reviews).map(reviewCard).join('')}</div></div>
  <div class="rv__nav">
    <button class="rv__btn" id="rvPrev" aria-label="Previous reviews"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
    <div class="rv__dots" id="rvDots"></div>
    <button class="rv__btn" id="rvNext" aria-label="Next reviews">${ic('chevron')}</button>
  </div>
</div>`;
}

/* ---------- footer ---------- */
function footer(d) {
  const soc = [];
  if (biz.facebook) soc.push(`<a href="${biz.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('facebook')}</a>`);
  if (biz.instagram) soc.push(`<a href="${biz.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('instagram')}</a>`);
  soc.push(`<a href="${waLink(WA_PREFILL)}" target="_blank" rel="noopener" aria-label="WhatsApp" data-track="whatsapp">${ic('chat')}</a>`);

  return `
<footer class="ft">
  <div class="wrap">
    <div class="ft__grid">
      <div>
        <div class="ft__logo"><img src="${asset(d, 'logo-mark.webp')}" alt="${esc(biz.name)}" width="440" height="257" loading="lazy"></div>
        <p>${esc(biz.tagline)}. Domestic, commercial and industrial electrical work across ${esc(biz.baseArea)}.</p>
        <div class="ft__soc">${soc.join('')}</div>
        <div class="ft__ins">${ic('shield')}<span>Fully insured. ${biz.publicLiabilityText} public liability cover, and a ${biz.guaranteeMonths}-month guarantee on all work.</span></div>
        ${credBadges(d, 'ft')}
        
      </div>
      <div class="ft__cols">
        <div>
          <h4>Services</h4>
          <div class="ft__li">
            ${services.map(s => `<a href="${href(d, s.slug)}">${esc(s.nav)}</a>`).join('\n            ')}
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <div class="ft__li">
            <a href="${href(d, 'about')}">About us</a>
            <a href="${href(d, 'our-work')}">Our work</a>
            <a href="${href(d, 'reviews')}">Reviews</a>
            <a href="${href(d, 'faqs')}">FAQs</a>
            <a href="${href(d, 'areas-we-cover')}">Areas we cover</a>
            <a href="${href(d, 'contact')}">Contact</a>
          </div>
        </div>
      </div>
    </div>
    <div class="ft__bar">
      <span>&copy; <span id="yr">2026</span> ${esc(biz.name)}. All rights reserved. &middot;
        <a href="${href(d, 'privacy-policy')}">Privacy</a> &middot;
        <a href="${href(d, 'terms')}">Terms</a></span>
      <span>Website by <a href="https://innov8workflows.co.uk" target="_blank" rel="noopener">Innov8 Workflows</a></span>
    </div>
  </div>
</footer>

<a class="wa" href="${waLink(WA_PREFILL)}" target="_blank" rel="noopener" aria-label="Message us on WhatsApp" data-track="whatsapp">
  <span class="wa__pulse" aria-hidden="true"></span>
  <svg viewBox="0 0 24 24" aria-hidden="true">${WA_GLYPH}</svg>
</a>
<script src="${asset(d, A.jsName)}" defer></script>
</body>
</html>`;
}

/* ============================================================
   STRUCTURED DATA
   Answer engines lean on this heavily, so every page carries a
   @graph with the business, the page, and its breadcrumb trail.
   aggregateRating IS asserted here, and it is Google's alone: 4.9 from 13
   reviews, harvested 2026-08-21 and displayed on the page it describes.
   Platform scores are never averaged together into a made-up composite, and
   no rating is claimed for a platform whose reviews are not shown.

   Still NOT asserted, because none has been confirmed: priceRange,
   openingHours, and any competent-person scheme membership.
   ============================================================ */
const BIZ_ID = SITE_URL + '/#business';
const SITE_ID = SITE_URL + '/#website';

function businessNode() {
  const node = {
    '@type': ['Electrician', 'LocalBusiness'],
    '@id': BIZ_ID,
    name: biz.name,
    alternateName: biz.shortName,
    url: SITE_URL + '/',
    telephone: biz.phoneIntl,
    image: SITE_URL + '/assets/og-default.jpg',
    logo: { '@type': 'ImageObject', url: SITE_URL + '/assets/logo-hero.webp' },
    description: 'Qualified electricians covering ' + biz.baseArea +
      '. Consumer unit upgrades, full and partial rewires, EICRs and electrical testing, fault finding, lighting, EV charger installation, CCTV, outdoor and industrial electrical work. A team of ' +
      biz.teamSize + ' based in ' + biz.town + ', fully insured with ' + biz.publicLiabilityText +
      ' public liability cover and a ' + biz.guaranteeMonths + '-month guarantee on all work.',
    areaServed: locations.map(l => ({ '@type': 'City', name: l.name })),
    knowsAbout: services.map(s => s.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Electrical services',
      itemListElement: services.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, url: abs(s.slug) }
      }))
    },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: biz.teamSize },
    founder: { '@type': 'Person', name: biz.owner },
    employee: { '@type': 'Person', name: biz.owner, jobTitle: 'Owner' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: biz.town,
      addressRegion: biz.county,
      postalCode: biz.postcodeArea,
      addressCountry: 'GB'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: biz.phoneIntl,
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'English'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratings.google.score,
      reviewCount: ratings.google.count,
      bestRating: 5,
      worstRating: 1
    }
  };
  if (biz.email) node.email = biz.email;
  if (biz.founded) node.foundingDate = String(biz.founded);
  const same = [biz.facebook, biz.instagram, biz.mybuilder].filter(Boolean);
  if (same.length) node.sameAs = same;
  return node;
}

function graph(p) {
  const nodes = [
    businessNode(),
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: SITE_URL + '/',
      name: biz.name,
      publisher: { '@id': BIZ_ID },
      inLanguage: 'en-GB'
    },
    {
      '@type': 'WebPage',
      '@id': abs(p.slug) + '#webpage',
      url: abs(p.slug),
      name: p.title,
      description: p.description,
      isPartOf: { '@id': SITE_ID },
      about: { '@id': BIZ_ID },
      inLanguage: 'en-GB'
    }
  ];

  const trail = [['', 'Home']].concat(p.trail || []);
  if (trail.length > 1) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': abs(p.slug) + '#breadcrumb',
      itemListElement: trail.map(([slug, label], i) => ({
        '@type': 'ListItem', position: i + 1, name: label, item: abs(slug)
      }))
    });
  }
  if (p.serviceNode) nodes.push(p.serviceNode);
  if (p.faqs && p.faqs.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': abs(p.slug) + '#faq',
      mainEntity: p.faqs.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    });
  }
  if (p.extraNodes) nodes.push(...p.extraNodes);
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/* Review nodes, attached to the pages that actually display the reviews.
   Emitting these on a page that does not show them is exactly the kind of
   thing that gets structured data ignored. */
function reviewNodes(list) {
  return (list || reviews).map((r, i) => ({
    '@type': 'Review',
    '@id': SITE_URL + '/reviews/#review-' + (i + 1),
    itemReviewed: { '@id': BIZ_ID },
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5, worstRating: 1 },
    reviewBody: r.text,
    publisher: { '@type': 'Organization', name: r.source }
  }));
}

function serviceNode(s, areaNames) {
  return {
    '@type': 'Service',
    '@id': abs(s.slug) + '#service',
    name: s.title,
    serviceType: s.title,
    description: s.answer,
    url: abs(s.slug),
    provider: { '@id': BIZ_ID },
    areaServed: (areaNames || locations.map(l => l.name)).map(n => ({ '@type': 'City', name: n }))
  };
}

module.exports = {
  esc, root, href, asset, abs, ic, ICON, WA_GLYPH, G_MARK, ph, waLink, tel,
  WA_PREFILL, PAGE_TOKEN, pageLabel,
  head, header, crumbs, phead, ticks, steps, faqBlock, band,
  quotePanel, servicePanel, areaPanel, footer,
  credentialsBlock, credBadges, credStrip, projectRow,
  starRow, reviewCard, reviewsCarousel, reviewLinks, ratingsBar,
  graph, serviceNode, businessNode, reviewNodes, BIZ_ID, SITE_ID
};
