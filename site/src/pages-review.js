/* ============================================================
   REVIEW LANDING PAGE  ->  /review/

   The page Stephen sends a customer the day a job finishes. One card, one
   job: get them to Google. It is NOT /reviews/, which is the public page
   where a visitor READS the reviews. This one is unlisted and noindex,
   because it is handed out by text, WhatsApp or a QR code rather than found.

   Structured after the Redline Roofing review card, which converts well:
   video head -> thank you -> one primary ask -> three numbered steps ->
   the fallbacks -> a way to complain privately instead.

   Deliberately SELF-CONTAINED. It does not use lib.head/header/footer:
   - no nav and no footer links, because every extra link is a way to leave
     without leaving a review;
   - its own <style> rather than the 50 KB site stylesheet, for a page that
     exists to be opened on a phone, on data, once.
   It still uses the shared data, icons, brand marks and JSON-LD graph, so
   the phone number, the links and the schema cannot drift from the site.

   NO INLINE <script>. The site's CSP is script-src 'self' plus the CRM host,
   with NO 'unsafe-inline' - the Redline page's inline link-setting script
   would be silently blocked here. Every href is written at build time
   instead, which is better anyway: nothing to go wrong in the browser.

   THE ORDER OF THE THREE DESTINATIONS IS THE POINT. Google is the only one
   that moves the local ranking, so it gets the whole first ask. Facebook and
   MyBuilder appear only after "No Google account?", as the fallback for
   somebody who cannot use the first one.
   ============================================================ */
const D = require('./data.js');
const L = require('./lib.js');

const { biz } = D;
const { esc, ic, G_MARK, F_MARK, waLink, tel, graph } = L;

/* depth 1: /review/index.html, so assets are one level up */
const d = 1;
const asset = f => L.asset(d, f);

/* The card's own stylesheet. Same tokens as the site so the brand does not
   drift, but only the rules this one page uses. */
const CSS = `
:root{
  --ink:#101215;--ink-2:#191C21;--brand:#14AEE3;--brand-lt:#3FCEF6;--brand-dp:#0B6F94;
  --muted:#666F7B;--line:#E4E7EB;--bg-2:#F5F6F8;--white:#fff;--gold:#F5A623;--facebook:#1877F2;
}
*{margin:0;padding:0;box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  font-family:'Manrope',system-ui,-apple-system,sans-serif;color:var(--ink);line-height:1.6;
  background:var(--ink);min-height:100svh;display:flex;align-items:center;justify-content:center;padding:32px 16px;
}
.card{width:100%;max-width:560px;background:var(--white);border-radius:20px;overflow:hidden;
  box-shadow:0 24px 60px -20px rgba(0,0,0,.55),0 4px 12px rgba(0,0,0,.18)}

/* ---- head: the hero clip, playing behind the logo ---- */
.card-head{position:relative;padding:56px 28px 28px;text-align:center;color:#fff;overflow:hidden;background:var(--ink)}
.head-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
/* Weighted to the TOP as well as the bottom. The clip is lights coming on,
   so it ends far brighter than it starts and the ceiling behind the wordmark
   is the brightest thing in frame by the end of the loop. A gradient tuned
   against the first frame looks fine for two seconds and then washes out. */
.head-overlay{position:absolute;inset:0;z-index:1;
  background:linear-gradient(180deg,rgba(16,18,21,.52) 0%,rgba(16,18,21,.58) 50%,rgba(16,18,21,.82) 80%,rgba(16,18,21,.95) 100%)}
.logo-badge{position:relative;z-index:2;display:inline-flex;margin:0 auto 14px}
.logo-badge img{height:clamp(96px,24vw,132px);width:auto;object-fit:contain;display:block;
  filter:drop-shadow(0 12px 28px rgba(0,0,0,.6))}
.biz-tag{position:relative;z-index:2;font-size:.72rem;font-weight:700;letter-spacing:.18em;
  text-transform:uppercase;color:#fff;text-shadow:0 1px 10px rgba(0,0,0,.55)}

/* ---- body ---- */
.card-body{padding:32px 30px 28px;text-align:center}
.stars{display:flex;justify-content:center;gap:4px;margin-bottom:16px}
.stars svg{width:26px;height:26px;fill:var(--gold);stroke:none}
.eyebrow{display:inline-block;font-size:.7rem;font-weight:800;letter-spacing:.2em;
  text-transform:uppercase;color:var(--brand-dp);margin-bottom:10px}
h1{font-family:'Archivo',system-ui,sans-serif;font-weight:900;font-size:clamp(2rem,7vw,2.4rem);
  line-height:1.04;letter-spacing:-.02em;color:var(--ink);margin-bottom:12px}
.lead{font-size:1.02rem;color:var(--ink);max-width:42ch;margin:0 auto}
.favour{margin:26px 0 8px;padding:22px 20px 24px;background:var(--bg-2);border:1px solid var(--line);border-radius:16px}
.favour h2{font-family:'Archivo',system-ui,sans-serif;font-weight:800;font-size:1.4rem;color:var(--ink);margin-bottom:8px}
.favour p{font-size:.95rem;color:var(--muted)}

/* ---- buttons ---- */
.btn{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:16px 20px;
  margin-top:16px;font-family:'Archivo',system-ui,sans-serif;font-weight:800;font-size:1.02rem;
  border-radius:12px;border:2px solid transparent;text-decoration:none;
  transition:transform .15s,box-shadow .2s,background .2s,border-color .2s}
.btn:active{transform:translateY(1px)}
.btn-icon{width:26px;height:26px;flex-shrink:0;background:#fff;border-radius:6px;
  display:flex;align-items:center;justify-content:center}
.btn-icon svg{width:18px;height:18px;display:block}
.btn-google{background:linear-gradient(135deg,var(--brand-lt),var(--brand-dp));color:#fff;
  box-shadow:0 12px 26px -10px rgba(11,111,148,.75)}
.btn-google:hover{transform:translateY(-2px)}
.btn-sub{font-size:.82rem;color:var(--muted);margin-top:10px}
.btn-alt{background:#fff;color:var(--ink);border-color:var(--line);font-size:.98rem}
.btn-alt:hover{border-color:var(--brand);background:#f7fcfe}
.btn-alt .btn-icon{background:transparent}
.btn-alt .btn-icon svg{width:24px;height:24px}
/* COLOR, not fill: the shared F_MARK's path is fill="currentColor", so a
   fill rule on the <svg> never reaches it and the mark comes out ink black. */
.btn-facebook .btn-icon{color:var(--facebook)}
.btn-mybuilder .btn-icon svg{width:22px;height:22px;fill:none;stroke:var(--ink);stroke-width:2;
  stroke-linecap:round;stroke-linejoin:round}

/* ---- steps ---- */
.steps{list-style:none;text-align:left;max-width:390px;margin:22px auto 4px}
.steps li{display:flex;align-items:flex-start;gap:14px;padding:11px 0;font-size:.95rem;
  color:var(--ink);border-bottom:1px solid var(--line)}
.steps li:last-child{border-bottom:none}
.steps .num{flex-shrink:0;width:28px;height:28px;border-radius:50%;background:var(--ink);color:#fff;
  display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.84rem;
  font-family:'Archivo',system-ui,sans-serif}

.divider{display:flex;align-items:center;gap:14px;margin:30px 0 6px;color:var(--muted);font-size:.76rem;
  font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.divider::before,.divider::after{content:"";flex:1;height:1px;background:var(--line)}
.alt-note{font-size:.92rem;color:var(--muted)}

.reassure{margin-top:26px;padding-top:22px;border-top:1px solid var(--line);font-size:.9rem;color:var(--muted)}
.reassure a{color:var(--brand-dp);font-weight:700;text-decoration:none;white-space:nowrap}
.reassure a:hover{text-decoration:underline}

.card-foot{padding:18px 24px;text-align:center;background:var(--ink);color:#9aa3ae;font-size:.78rem}
.card-foot .credit{display:block;margin-top:6px;color:rgba(154,163,174,.65);font-size:.72rem}
.card-foot .credit a{color:#9aa3ae;text-decoration:none}

/* NO prefers-reduced-motion branch, deliberately. Hiding .head-bg here and
   falling back to the poster is the obvious-looking thing to write, and it
   is exactly what made the site hero look broken twice: this machine's
   browser reports reduce, so the person checking the page sees a still and
   reports that the video is not playing. The site's hero settled on looping
   for everybody and this matches it. The clip is muted, five seconds, and
   carries no parallax, zoom or rotation. */
@media(max-width:480px){
  body{padding:0;align-items:flex-start}
  .card{border-radius:0;min-height:100svh;max-width:none;box-shadow:none}
  .card-body{padding:28px 20px 24px}
}
`;

/* Five gold stars. Uses the site's own star path rather than the ★ character,
   which renders as a different shape on every platform. */
const STARS = `<div class="stars" role="img" aria-label="Five out of five stars">${
  Array.from({ length: 5 }, () => ic('star')).join('')
}</div>`;

const STEPS = [
  'Tap the button above &mdash; it opens our Google listing.',
  'Sign in with your Google account if it asks.',
  'Pick your star rating, add a few words, and post. That is it.'
];

function reviewLanding() {
  const url = D.SITE_URL + '/review/';
  const p = {
    depth: d,
    slug: 'review',
    noindex: true,
    title: `Leave a Review | ${biz.name}`,
    description: `Thank you for choosing ${biz.name}. Leaving a quick Google review takes about thirty seconds and helps other people in ${biz.town} find us.`,
    canonical: url
  };
  p.schema = graph(p);

  const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#0B0E12">
<meta name="robots" content="noindex, nofollow">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(biz.name)}">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="Leave ${esc(biz.name)} a review">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${D.SITE_URL}/assets/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Leave ${esc(biz.name)} a review">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${D.SITE_URL}/assets/og-default.jpg">
<link rel="icon" href="${asset('favicon.png')}" sizes="any">
<link rel="apple-touch-icon" href="${asset('favicon.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&amp;family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
<style>${CSS}</style>
<script type="application/ld+json">${JSON.stringify(p.schema)}</script>
</head>
<body>
  <main class="card">
    <header class="card-head">
      <video class="head-bg" autoplay muted loop playsinline preload="auto"
             poster="${asset('hero-loop-poster.jpg')}" aria-hidden="true" tabindex="-1">
        <source src="${asset('hero-loop.mp4')}" type="video/mp4">
      </video>
      <div class="head-overlay" aria-hidden="true"></div>
      <div class="logo-badge"><img src="${asset('logo-hero.webp')}" alt="${esc(biz.name)}" width="440" height="257"></div>
      <p class="biz-tag">Electricians &middot; ${esc(biz.town)}, ${esc(biz.county)}</p>
    </header>

    <div class="card-body">
      ${STARS}
      <p class="eyebrow">Job complete</p>
      <h1>Thank you</h1>
      <p class="lead">We really appreciate you having ${esc(biz.owner)} in. We hope the work is exactly what you wanted.</p>

      <div class="favour">
        <h2>A quick favour?</h2>
        <p>We are a small local team and we do not advertise much &mdash; reviews are how most people decide whether to trust an electrician in their house. If you have thirty seconds, a Google review would genuinely help.</p>
        <a class="btn btn-google" href="${esc(biz.googleReview)}" target="_blank" rel="noopener">
          <span class="btn-icon">${G_MARK}</span>Leave a Google review</a>
        <p class="btn-sub">Opens Google &middot; about thirty seconds</p>
      </div>

      <ol class="steps">
        ${STEPS.map((s, i) => `<li><span class="num">${i + 1}</span><span>${s}</span></li>`).join('\n        ')}
      </ol>

      <div class="divider">No Google account?</div>
      <p class="alt-note">No problem &mdash; Facebook and MyBuilder help just as much, and you may already be signed in to one of them.</p>

      <a class="btn btn-alt btn-facebook" href="${esc(biz.facebookReviews)}" target="_blank" rel="noopener">
        <span class="btn-icon">${F_MARK}</span>Review us on Facebook</a>
      <a class="btn btn-alt btn-mybuilder" href="${esc(biz.mybuilder)}" target="_blank" rel="noopener">
        <span class="btn-icon">${ic('hammer')}</span>Review us on MyBuilder</a>

      <p class="reassure">Not quite happy with something? Please give us the chance to put it right first &mdash; call
        <a href="${tel}">${esc(biz.phone)}</a> or
        <a href="${waLink('Hi ' + biz.ownerShort + ', ')}" target="_blank" rel="noopener">message us on WhatsApp</a>.
        Everything we do is guaranteed for ${biz.guaranteeMonths} months.</p>
    </div>

    <footer class="card-foot">
      &copy; ${new Date().getFullYear()} ${esc(biz.name)} &middot; ${esc(biz.town)}, ${esc(biz.county)}
      <span class="credit">Website by <a href="https://innov8workflows.co.uk" target="_blank" rel="noopener">Innov8 Workflows</a></span>
    </footer>
  </main>
${biz.trackingId ? `<script defer src="https://crm.innov8workflows.co.uk/track.js" data-id="${biz.trackingId}"></script>` : ''}
</body>
</html>`;

  return { ...p, html };
}

module.exports = { reviewLanding };
