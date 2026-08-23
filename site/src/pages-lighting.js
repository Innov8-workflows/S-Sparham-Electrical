/* ============================================================
   /lighting/ - the hub and one guide page per style of fitting.

   These sit at depth 2 (/lighting/chandeliers/), which is the only part of
   the site that does. lib.js root() was single-level until this section
   existed; if links or assets ever 404 from in here, that is the first place
   to look.

   SEARCH INTENT, and why these do not cannibalise the service page.
   /lighting-and-led-installations/ is a SERVICE page and answers "electrician
   who installs lighting near me" - commercial, local. These are GUIDE pages
   and answer "how high should pendants hang", "do downlights need to be fire
   rated", "who fits chandeliers". Different intent, different queries. Every
   guide links back to the service page for the commercial half, and the
   service page links out to the hub, so neither competes for the other's term.
   ============================================================ */
const D = require('./data.js');
const L = require('./lib.js');
const P = require('./pages.js');
const { guides } = require('./lighting.js');
const { biz, ratings } = D;
const {
  esc, href, asset, abs, ic, ph, tel, phead, faqBlock, band,
  quotePanel, servicePanel, areaPanel, credStrip, ticks, steps,
  graph
} = L;
const { page } = P;

const HUB = 'lighting';
const guideSlug = g => HUB + '/' + g.slug;

/* The "what to check before you buy" block, which is the reason these pages
   are worth reading at all: it is the advice a customer cannot get from a
   product page, because the product page is trying to sell them the product. */
const checkList = list => `
<div class="checks">
  ${list.map(([h, p]) => `<div class="check">${ic('check')}<div><b>${esc(h)}</b><p>${esc(p)}</p></div></div>`).join('\n  ')}
</div>`;

/* Stephen buys the fittings as well as fitting them, so supply is the lead
   offer rather than a caveat. Still explicitly accepts something the customer
   has already bought: people buy a light they love before they ring an
   electrician, and turning that work away would be daft.
   One constant, used on the hub and all seven guides. */
const SUPPLY_LINE = 'We supply the fittings as well as installing them, so you can leave the sourcing to us: tell us the look you are after and we will find something that works in your room. If you have already bought something, send us a photo or a link and we will tell you what it needs.';

/* ---------------- HUB ---------------- */
function lightingHub() {
  const d = 1;
  const p = {
    depth: d, slug: HUB, nav: HUB,
    trail: [[HUB, 'Lighting']],
    title: 'Lighting Guides | S. Sparham Electrical',
    description: `Chandeliers, pendants, downlights, wall lights, bathroom and outdoor lighting. We supply and fit, and these guides cover what makes each one work. Call ${biz.phone}.`,
    waLabel: 'Lighting guides'
  };
  p.schema = graph(p);

  const body = phead(d, {
    h1: 'Lighting guides',
    sub: 'We supply and fit. These guides cover what makes each style work, and what we check before ordering one.',
    bg: 'g2.jpg'
  }) + `
<section class="sec"><div class="wrap">
  <div class="keyfact">
    <h2>In short</h2>
    <p>These pages cover the styles of lighting we fit most: chandeliers, pendants, downlights, wall lights, bathroom lighting, outdoor lighting and LED strip. Each one explains what is involved in fitting it and, more usefully, what is worth checking before you buy one — weight, drop height, IP rating, dimmer compatibility and where the cable has to come from. ${esc(SUPPLY_LINE)}</p>
  </div>

  <div class="prose">
    <p>Most lighting problems are decided before an electrician is anywhere near the job. A chandelier arrives that the ceiling will not hold. Downlights get spaced in a grid that lights the floor and not the worktop. LED strip goes in with the driver sealed behind plasterboard. None of that is hard to avoid — it just has to be thought about while there is still a choice.</p>
    <p>That is most of the reason we source the fittings ourselves. It is a great deal easier to make a room look right when the thing being fitted was chosen against the ceiling, the joists and the switching, rather than bought first and worked around afterwards.</p>
    <p>These are not catalogue pages and there are no prices on them. They are the things we would tell you on site, written down.</p>
  </div>

  <div class="prose"><h2>How it works</h2></div>
  ${steps([
    ['Tell us the look you want', 'A photo of the room, and a picture of the sort of thing you like. It does not need to be a specific product — a style, a finish, a photograph off the internet is plenty to work from.'],
    ['We find something that fits it', 'Sourced against the actual room: what the ceiling will hold, where the joists are, the drop height, the IP rating if it is a bathroom, and whether it will dim if you want it to.'],
    ['We fit, test and certificate it', 'Installed, switched the way you want the room lit, tested, and a certificate issued for the work that needs one.']
  ])}

  <div class="cards cards--3" style="margin-top:clamp(20px,3vw,32px)">
    ${guides.map(g => `<a class="card" href="${href(d, guideSlug(g))}">
      <div class="card__ico">${ic(g.icon)}</div>
      <h3>${esc(g.h1)}</h3>
      <p>${esc(g.blurb)}</p>
      <span class="card__go">Read the guide ${ic('arrow')}</span>
    </a>`).join('\n    ')}
  </div>

  ${band(d, 'Not sure what will work in your room?', 'Send a photo of the space and the fitting you like to ' + biz.phone + ' on WhatsApp, and you will get a straight answer on whether it will work and what it needs.')}

  <div class="prose">
    <h2>Looking for the installation itself?</h2>
    <p>These pages are about choosing. For the work itself — new lighting circuits, switching, dimming and rewiring existing lighting — see <a href="${href(d, 'lighting-and-led-installations')}">lighting and LED installations</a>, or <a href="${href(d, 'services')}">all our services</a>.</p>
  </div>
</div></section>
${credStrip(d)}`;

  return { ...p, html: page(p, body) };
}

/* ---------------- GUIDE PAGE ---------------- */
function lightingGuide(g) {
  const d = 2;
  const slug = guideSlug(g);
  const others = guides.filter(x => x.slug !== g.slug).slice(0, 3);

  const p = {
    depth: d, slug, nav: HUB,
    trail: [[HUB, 'Lighting'], [slug, g.nav]],
    title: `${g.title} | S. Sparham Electrical`,
    ogTitle: g.title,
    description: `${g.blurb} What makes one work in your room, and what fitting it involves. Call ${biz.phone}.`,
    faqs: g.faqs,
    waLabel: g.title,
    ogImage: g.photo ? g.photo[0] : undefined
  };
  p.schema = graph(p);

  const body = phead(d, { h1: g.h1, sub: esc(g.blurb), bg: g.bg }) + `
<section class="sec"><div class="wrap layout">
  <div>
    <div class="keyfact">
      <h2>In short</h2>
      <p>${esc(g.answer)}</p>
    </div>

    ${g.photo ? `<figure class="guidepic">
      <img src="${asset(d, g.photo[0])}" alt="${esc(g.photo[1])}" loading="lazy" width="900" height="900">
      <figcaption>Our own work. ${esc(g.photo[1])}.</figcaption>
    </figure>` : `<p class="guidepic__none">${ph()} We have not photographed this style of job yet. ${esc(biz.owner)} has more photographs to send and this page gets one as soon as they arrive.</p>`}

    <div class="prose">
      <p>${esc(g.intro)}</p>
      <h2>${esc(g.checkTitle)}</h2>
      <p>This is what we look at before ordering anything. ${esc(SUPPLY_LINE)}</p>
    </div>
    ${checkList(g.checks)}

    <div class="prose">
      <h2>What fitting one involves</h2>
    </div>
    ${steps(g.process)}

    ${band(d, 'Got a fitting in mind?', 'Send a photo of it and of the room to ' + biz.phone + ' on WhatsApp. You will get a straight answer on whether it will work where you want it.')}

    <div class="prose">
      <h2>Frequently asked questions</h2>
    </div>
    ${faqBlock(g.faqs)}

    <div class="prose">
      <h2>Having the work done</h2>
      <p>This page is about choosing a fitting. For the installation itself, including new circuits, switching and dimming, see <a href="${href(d, 'lighting-and-led-installations')}">lighting and LED installations</a>. We cover ${esc(biz.baseArea)} — see <a href="${href(d, 'areas-we-cover')}">areas we cover</a>.</p>
    </div>

    <div class="related">
      <h2>Other lighting guides</h2>
      <div class="cards">
        ${others.map(o => `<a class="card" href="${href(d, guideSlug(o))}">
          <div class="card__ico">${ic(o.icon)}</div>
          <h3>${esc(o.h1)}</h3>
          <p>${esc(o.blurb)}</p>
          <span class="card__go">Read the guide ${ic('arrow')}</span>
        </a>`).join('\n        ')}
      </div>
      <p style="margin-top:16px"><a class="chip" href="${href(d, HUB)}">${ic('lightbulb')}All lighting guides ${ic('arrow')}</a></p>
    </div>
  </div>
  <aside class="aside">
    ${quotePanel(d)}
    ${servicePanel(d)}
    ${areaPanel(d)}
  </aside>
</div></section>
${credStrip(d)}`;

  return { ...p, html: page(p, body) };
}

module.exports = { lightingHub, lightingGuide, guides, guideSlug, HUB };
