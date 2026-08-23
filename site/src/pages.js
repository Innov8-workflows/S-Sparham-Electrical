/* ============================================================
   Page builders. Each returns { slug, title, description, html }.

   Note on the homepage: there is deliberately NO FAQ section on it.
   FAQ content lives on /faqs/ and on the service pages that own the
   questions. Putting it on the homepage as well duplicates the answers
   and gives two pages a claim on the same FAQPage schema.
   ============================================================ */
const D = require('./data.js');
const L = require('./lib.js');
const { biz, services, locations, gallery, projects, generalFaqs, ratings, reviews } = D;
const { guides: lightingGuides } = require('./lighting.js');
const {
  esc, href, asset, abs, ic, ph, waLink, tel, WA_PREFILL, head, header, crumbs, phead,
  ticks, steps, faqBlock, band, quotePanel, servicePanel, areaPanel, footer,
  credentialsBlock, credBadges, credStrip, projectRow,
  starRow, reviewCard, reviewsCarousel, reviewLinks, ratingsBar,
  graph, serviceNode, reviewNodes, G_MARK, PAGE_TOKEN, pageLabel
} = L;

/* Single funnel for every page, which is also where the WhatsApp prefill gets
   its page name. Doing the substitution here rather than threading a label
   through footer(), band(), quotePanel() and every inline link means there is
   exactly one place it can be wrong, and no way to add a new WhatsApp link
   that forgets to carry the source. */
const page = (p, body) => {
  const html = head(p) + header(p.depth, p.nav || p.slug) +
    (p.trail ? crumbs(p.depth, p.trail) : '') + `<main id="main">` + body + `</main>` + footer(p.depth);
  return html.split(PAGE_TOKEN).join(encodeURIComponent(pageLabel(p)));
};

const areaSlug = l => 'electrician-in-' + l.slug;
const AREA_NAMES = locations.map(l => l.name);

/* the shared quote form, used on contact and the homepage */
function quoteForm(d) {
  return `
<form class="form" id="quoteForm" data-wa="${biz.whatsapp}" novalidate>
  <h3>Request a free quote</h3>
  <p>No obligation. For a small job a photo and a couple of lines are usually enough to give you a price.</p>
  <div class="form__2">
    <div class="field"><label for="f-name">Your name</label>
      <input id="f-name" name="name" type="text" autocomplete="name" placeholder="Full name" required></div>
    <div class="field"><label for="f-phone">Phone number</label>
      <input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="Mobile or landline" required></div>
  </div>
  <div class="form__2">
    <div class="field"><label for="f-area">Your area</label>
      <input id="f-area" name="area" type="text" placeholder="Town or postcode"></div>
    <div class="field"><label for="f-job">What do you need?</label>
      <select id="f-job" name="job">
        <option value="">Please choose</option>
        ${services.map(s => `<option>${esc(s.nav)}</option>`).join('')}
        <option>Something else</option>
      </select></div>
  </div>
  <div class="field"><label for="f-msg">Tell us about the job</label>
    <textarea id="f-msg" name="message" placeholder="A few lines on what is wrong, or what you would like doing"></textarea></div>
  <button class="btn btn--brand btn--wide" type="submit">${ic('chat')} Send on WhatsApp</button>
  <p class="form__note">This opens WhatsApp with your message written out. Nothing is sent until you press send.</p>
</form>`;
}

/* Fixed grid, used on the homepage: every image visible, nothing hidden behind
   a horizontal scroll. */
const galleryGrid = (d, items) => `
<div class="galg" id="gal">
  ${items.map(([f, alt]) => `<figure class="galg__i"><img src="${asset(d, f)}" alt="${esc(alt)}" loading="lazy" width="900" height="900"></figure>`).join('\n  ')}
</div>`;

/* Horizontal scroller, used on /our-work/ where the full set lives. */
const galleryBlock = (d, items) => `
<div class="gal" id="gal">
  ${items.map(([f, alt]) => `<figure class="gal__i"><img src="${asset(d, f)}" alt="${esc(alt)}" loading="lazy" width="900" height="900"></figure>`).join('\n  ')}
</div>
<div class="gal__hint">${ic('chevron')} Swipe to see more</div>`;

const lightbox = () => `
<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="lb__x" id="lbX" aria-label="Close">${ic('x')}</button>
  <img id="lbImg" src="" alt="">
</div>`;

/* ============================================================
   HOMEPAGE
   ============================================================ */
function home() {
  const d = 0;
  const p = {
    depth: d, slug: '', nav: '',
    title: 'Electrician in Ripley, Belper & Derby | S. Sparham Electrical',
    ogTitle: 'S. Sparham Electrical',
    description: `Qualified electricians covering Ripley, Belper, Derby and Nottinghamshire. Rewires, fuse boards, EICRs, EV chargers and lighting. ${ratings.google.score}★ on Google. Call ${biz.phone}.`,
    extraNodes: reviewNodes(reviews.slice(0, 6))
  };
  p.schema = graph(p);

  const heroTowns = ['Ripley', 'Belper', 'Derby', 'Heanor', 'Chesterfield'];

  const body = `
<section class="hero" id="top">
  <!-- The client's own footage: the pendants and coving strip fading up from
       dark to lit. It replaced a three-image crossfade slider.

       Encoded so it ends on the frame it starts on, so the repeat has no cut
       to see - see site/make-video.sh.

       autoplay/muted/loop/playsinline are all on the element rather than left
       to script: this is above the fold, so unlike the mid-page clip there is
       nothing to wait for and no reason to make playback depend on JS running.
       site.js only handles the case where a browser REFUSES to autoplay.

       Deliberately NOT gated on prefers-reduced-motion at the CSS level. The
       stylesheet stills the Ken Burns drift for those users but never hides
       hero media, because a hidden hero is a black box. site.js drops the loop
       for them instead, so the motion is bounded rather than perpetual. -->
  <div class="hero-media">
    <video class="hero-video" autoplay muted loop playsinline preload="auto"
           poster="${asset(d, 'hero-loop-poster.jpg')}" aria-hidden="true">
      <source src="${asset(d, 'hero-loop.mp4')}" type="video/mp4">
    </video>
  </div>
  <div class="hero__scrim"></div>
  <div class="wrap hero__in">
    <img class="hero__logo" src="${asset(d, 'logo-hero.webp')}" alt="${esc(biz.name)}" width="820" height="480" fetchpriority="high">
    <h1 class="hero__tag">Quality electrical work, <em>finished properly</em></h1>
    <p class="hero__sub">Domestic, commercial and industrial electricians covering ${esc(biz.baseArea)}. Qualified, insured, and ${ratings.google.score} out of 5 on Google.</p>
    <div class="hero__cta">
      <a class="btn btn--brand" href="${tel}" data-track="call">${ic('phone')} Call ${biz.phone}</a>
      <a class="btn btn--ghost" href="${href(d, 'contact')}">Get a free quote ${ic('arrow')}</a>
    </div>
    <div class="hero__strip">
      ${heroTowns.map(t => `<span><i class="dot"></i>${t}</span>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="trust">
  <div class="wrap trust__grid">
    <div class="trust__i">${ic('star')}<div><b>${ratings.google.score} out of 5 on Google</b><small>From ${ratings.google.count} reviews, plus ${ratings.mybuilder.count} at 5.0 on MyBuilder</small></div></div>
    <div class="trust__i">${ic('shield')}<div><b>Insured and guaranteed</b><small>${biz.publicLiabilityText} public liability, ${biz.guaranteeMonths}-month guarantee</small></div></div>
    <div class="trust__i">${ic('award')}<div><b>Qualified to 18th Edition</b><small>NVQ Level 3, 2391 inspection and testing, EV</small></div></div>
    <div class="trust__i">${ic('pin')}<div><b>Based in ${esc(biz.town)}</b><small>A team of ${biz.teamSize}, trading ${biz.yearsTrading} years</small></div></div>
  </div>
</section>

${credStrip(d)}

<section class="sec" id="services">
  <div class="wrap">
    <div class="sec-head sec-head--mid">
      <div class="eyebrow">What we do</div>
      <h2>Electrical services done properly</h2>
      <p>From a single socket to a full rewire, for homes, business premises and industrial units across Derbyshire and Nottinghamshire.</p>
    </div>
    <!-- Six on the homepage, not all twelve. The full set is one click away and
         a twelve-card grid is more than a homepage should be asking anyone to
         read. Order comes from data.js, so the six shown are the first six. -->
    <div class="svc">
      ${services.slice(0, 6).map(s => `<article class="svc__c">
        <div class="svc__ico">${ic(s.icon)}</div>
        <h3><a href="${href(d, s.slug)}" style="color:inherit">${esc(s.h1)}</a></h3>
        <p>${esc(s.blurb)}</p>
      </article>`).join('\n      ')}
    </div>
    <div style="text-align:center;margin-top:22px">
      <a class="btn btn--dark" href="${href(d, 'services')}">See all services ${ic('arrow')}</a>
    </div>
  </div>
</section>

<section class="sec sec--tint" id="transformations">
  <div class="wrap">
    <div class="sec-head sec-head--mid">
      <div class="eyebrow">Before and after</div>
      <h2>A job from start to finish</h2>
      <p>Watch the same room go from stripped back to finished.</p>
    </div>
    ${projects.map((p, i) => projectRow(d, p, i)).join('\n')}
    <p class="proj__more">${ph()} More before and after projects to be added as the photographs come in.</p>
  </div>
</section>

<section class="sec sec--tint" id="gallery">
  <div class="wrap">
    <div class="sec-head sec-head--mid">
      <div class="eyebrow">Recent work</div>
      <h2>A look at our jobs</h2>
      <p>Lighting, kitchens, sockets and EV chargers, all photographed on site. Every picture on this website is our own work.</p>
    </div>
    ${galleryGrid(d, gallery.slice(0, 6))}
    <div style="text-align:center;margin-top:24px">
      <a class="btn btn--dark" href="${href(d, 'our-work')}">See all our work ${ic('arrow')}</a>
    </div>
  </div>
</section>

<section class="sec" id="reviews">
  <div class="wrap">
    <div class="sec-head sec-head--mid">
      <div class="eyebrow">Customer reviews</div>
      <h2>What our customers say</h2>
      <p>Real reviews, reproduced word for word. Every one of these is on Google, where you can check it yourself.</p>
    </div>
    ${reviewsCarousel(reviews.filter(r => r.source === 'Google').slice(0, 6))}
    ${reviewLinks(d)}
    <div style="text-align:center;margin-top:6px">
      <a class="btn btn--ghost btn--onlight" href="${href(d, 'reviews')}">Or read them all on our reviews page ${ic('arrow')}</a>
    </div>
  </div>
</section>

<section class="sec sec--tint">
  <div class="wrap">
    <div class="sec-head sec-head--mid">
      <div class="eyebrow">Why choose us</div>
      <h2>An electrician who turns up and tidies up</h2>
    </div>
    <div class="why">
      <article class="why__c">${ic('check')}<div><h3>We get the small things right</h3>
        <p>Arriving when we say we will, keeping you informed while the job is running, working cleanly and leaving your property tidy. Simple things, and they make a big difference.</p></div></article>
      <article class="why__c">${ic('lightbulb')}<div><h3>We care how the work looks</h3>
        <p>Wherever possible we install everything neatly and thoughtfully rather than simply making it work. Accessories set level, cable routed sensibly, and lighting set out before anything is cut.</p></div></article>
      <article class="why__c">${ic('users')}<div><h3>A team of ${biz.teamSize}, one number</h3>
        <p>What started as a one-man business has grown into a small team of local electricians, without losing the personal service it was built on. You deal with us directly on ${biz.phone}.</p></div></article>
      <article class="why__c">${ic('shield')}<div><h3>Qualified, insured, guaranteed</h3>
        <p>${biz.publicLiabilityText} of public liability cover and a ${biz.guaranteeMonths}-month guarantee on everything we do. Certificates issued for the work that needs them.</p></div></article>
    </div>
  </div>
</section>

<section class="sec" id="about">
  <div class="wrap ab">
    <div class="ab__img">
      <img src="${asset(d, 'about.jpg')}" alt="Stephen Sparham on site in branded S. Sparham Electrical workwear, holding an SDS drill" loading="lazy" width="700" height="845">
      <img class="ab__sub" src="${asset(d, 'about-2.jpg')}" alt="S. Sparham Electrical branded workwear: hoodie, beanie, t-shirt and body warmer, each carrying the lightning bolt mark" loading="lazy" width="420" height="420">
    </div>
    <div class="ab__body">
      <div class="eyebrow">Meet the owner</div>
      <h2>The face behind S. Sparham Electrical</h2>
      <p>${esc(biz.name)} is a local electrical business based in ${esc(biz.town)}, providing reliable electrical services to domestic, commercial and industrial customers across the surrounding areas.</p>
      <p>What started as a one-man business has grown into a small team of skilled, trusted local electricians. We take pride in delivering high-quality workmanship while keeping the personal service and attention to detail the business was built on.</p>
      <p>From small repairs and fault finding to full rewires, new builds, lighting installations, EV chargers and larger commercial projects, we approach every job with the same level of care.</p>
      <div class="ab__sign"><div class="rv__av">SS</div><div><b>${esc(biz.owner)}</b>
        <small>Owner, ${esc(biz.name)}</small></div></div>
      <div style="margin-top:18px"><a class="btn btn--dark" href="${href(d, 'about')}">More about us ${ic('arrow')}</a></div>
    </div>
  </div>
</section>

<section class="sec sec--tint" id="areas">
  <div class="wrap">
    <div class="sec-head sec-head--mid">
      <div class="eyebrow">Where we work</div>
      <h2>Areas we cover</h2>
      <p>Based in ${esc(biz.town)} and working right across ${esc(biz.baseArea)}.</p>
    </div>
    <ul class="areas">
      ${locations.map(l => `<li><a href="${href(d, areaSlug(l))}" style="display:flex;align-items:center;gap:9px;color:inherit">${ic('pin')}${esc(l.name)}</a></li>`).join('\n      ')}
    </ul>
    <p class="areas__note">Plus all surrounding towns and villages. Not sure if you are in range? <a href="${tel}" style="color:var(--brand-dp);font-weight:600">Give us a call and ask.</a></p>
  </div>
</section>

<section class="sec" id="contact">
  <div class="wrap">
    <div class="sec-head sec-head--mid">
      <div class="eyebrow">Get in touch</div>
      <h2>Get a free quote</h2>
      <p>Fill this in and it opens straight in WhatsApp with your details ready to send.</p>
    </div>
    <div class="ct">
      <div class="ct__side">
        <a class="ct__row" href="${tel}" data-track="call">${ic('phone')}<div><small>Call or text</small><b>${biz.phone}</b></div></a>
        <a class="ct__row" href="${waLink(WA_PREFILL)}" target="_blank" rel="noopener" data-track="whatsapp">${ic('chat')}<div><small>WhatsApp</small><b>Send us a photo</b></div></a>
        <a class="ct__row" href="mailto:${biz.email}">${ic('mail')}<div><small>Email</small><b>${esc(biz.email)}</b></div></a>
        <div class="ct__row">${ic('pin')}<div><small>Based in</small><b>${esc(biz.town)}, ${esc(biz.county)} ${esc(biz.postcodeArea)}</b></div></div>
      </div>
      ${quoteForm(d)}
    </div>
  </div>
</section>

<section class="fcta">
  <img class="fcta__bg" src="${asset(d, 'cta.jpg')}" alt="" aria-hidden="true" loading="lazy" width="1400" height="1867">
  <div class="wrap fcta__in">
    <h2>Need an electrician you can trust?</h2>
    <p>Call, text or send a photo of the job on WhatsApp and you will get a straight answer on what it needs. Quotes are free and there is no obligation.</p>
    <div class="fcta__btns">
      <a class="btn btn--brand" href="${tel}" data-track="call">${ic('phone')} Call ${biz.phone}</a>
      <a class="btn btn--ghost" href="${waLink(WA_PREFILL)}" target="_blank" rel="noopener" data-track="whatsapp">${ic('chat')} Message on WhatsApp</a>
    </div>
  </div>
</section>
${lightbox()}`;

  return { ...p, html: page(p, body) };
}

/* ============================================================
   SERVICES HUB
   ============================================================ */
function servicesHub() {
  const d = 1;
  const p = {
    depth: d, slug: 'services', nav: 'services',
    trail: [['services', 'Services']],
    title: 'Electrical Services | S. Sparham Electrical',
    description: `Rewires, consumer units, EICRs, fault finding, lighting, EV chargers and CCTV across Derbyshire and Nottinghamshire. Call ${biz.phone}.`
  };
  p.schema = graph(p);

  const body = phead(d, {
    h1: 'Electrical services',
    sub: `Domestic, commercial and industrial electrical work across ${esc(biz.baseArea)}.`,
    bg: 'g6.jpg'
  }) + `
<section class="sec"><div class="wrap">
  <div class="keyfact">
    <h2>In short</h2>
    <p>${esc(biz.name)} carries out ${services.length} main types of electrical work: ${services.map(s => s.nav.toLowerCase()).join(', ')}. All of it is done to BS 7671, tested on completion, and certificated where a certificate applies. The business covers domestic, commercial and industrial customers across ${esc(biz.baseArea)}, is insured for ${biz.publicLiabilityText} of public liability, and guarantees its work for ${biz.guaranteeMonths} months.</p>
  </div>
  <div class="cards cards--3">
    ${services.map(s => `<a class="card" href="${href(d, s.slug)}">
      <div class="card__ico">${ic(s.icon)}</div>
      <h3>${esc(s.h1)}</h3>
      <p>${esc(s.blurb)}</p>
      <span class="card__go">Read more ${ic('arrow')}</span>
    </a>`).join('\n    ')}
  </div>
  ${band(d, 'Not sure which one you need?', 'Describe it or send a photo to ' + biz.phone + ' and you will be told what it actually needs, rather than what is easiest to sell.')}
</div></section>
${credStrip(d)}`;

  return { ...p, html: page(p, body) };
}

/* ============================================================
   SERVICE PAGE
   ============================================================ */
function servicePage(s) {
  const d = 1;
  const p = {
    depth: d, slug: s.slug, nav: 'services',
    trail: [['services', 'Services'], [s.slug, s.h1]],
    title: `${s.metaTitle || s.title} | S. Sparham Electrical`,
    ogTitle: s.title,
    description: `${s.blurb} Covering Derbyshire and Nottinghamshire. Call ${biz.phone}.`,
    faqs: s.faqs,
    serviceNode: serviceNode(s, AREA_NAMES)
  };
  p.schema = graph(p);

  const others = services.filter(x => x.slug !== s.slug).slice(0, 3);

  const body = phead(d, { h1: s.h1, sub: esc(s.blurb), bg: 'g6.jpg' }) + `
<section class="sec"><div class="wrap layout">
  <div>
    <div class="keyfact">
      <h2>In short</h2>
      <p>${esc(s.answer)}</p>
    </div>
    <div class="prose">
      <p>${esc(s.intro)}</p>
      <h2>${esc(s.signsTitle)}</h2>
      ${ticks(s.signs.map(esc))}
      <h2>What the job involves</h2>
      <p>Every property is different, but the shape of the work is usually the same. Here is how a typical ${s.h1.toLowerCase()} job runs.</p>
    </div>
    ${steps(s.process)}
    ${band(d, 'Want someone to take a look?', 'Call ' + biz.phone + ' or send a photo on WhatsApp and you will get a straight answer on what it needs.')}
    ${s.slug === 'lighting-and-led-installations' ? `
    <div class="prose">
      <h2>Choosing the fittings</h2>
      <p>This page is about the installation. If you are still deciding what to put in, the <a href="${href(d, 'lighting')}">lighting guides</a> cover each style — chandeliers, pendants, downlights, wall lights, bathroom, outdoor and LED strip — and what is worth checking before you buy one.</p>
    </div>
    <div class="chips">
      ${lightingGuides.map(g => `<a class="chip" href="${href(d, 'lighting/' + g.slug)}">${ic(g.icon)}${esc(g.nav)}</a>`).join('\n      ')}
    </div>` : ''}

    <div class="prose">
      <h2>${esc(s.h1)} near you</h2>
      <p>${esc(biz.name)} covers ${esc(biz.baseArea)}. Pick your area for local detail, or call ${biz.phone} if you are not sure whether you are in range.</p>
    </div>
    <div class="chips">
      ${locations.map(l => `<a class="chip" href="${href(d, areaSlug(l))}">${ic('pin')}${esc(l.name)}</a>`).join('\n      ')}
    </div>
    <div class="prose">
      <h2>Frequently asked questions</h2>
    </div>
    ${faqBlock(s.faqs)}
    <div class="related">
      <h2>Other services</h2>
      <div class="cards">
        ${others.map(o => `<a class="card" href="${href(d, o.slug)}">
          <div class="card__ico">${ic(o.icon)}</div>
          <h3>${esc(o.h1)}</h3>
          <p>${esc(o.blurb)}</p>
          <span class="card__go">Read more ${ic('arrow')}</span>
        </a>`).join('\n        ')}
      </div>
    </div>
  </div>
  <aside class="aside">
    ${quotePanel(d)}
    ${servicePanel(d, s.slug)}
    ${areaPanel(d)}
  </aside>
</div></section>
${credStrip(d)}`;

  return { ...p, html: page(p, body) };
}

/* ============================================================
   AREAS HUB
   ============================================================ */
function areasHub() {
  const d = 1;
  const p = {
    depth: d, slug: 'areas-we-cover', nav: 'areas-we-cover',
    trail: [['areas-we-cover', 'Areas we cover']],
    title: 'Areas We Cover | S. Sparham Electrical',
    description: `Electricians covering Ripley, Belper, Derby, Heanor, Ilkeston, Alfreton, Matlock, Chesterfield, Nottingham and Eastwood. Call ${biz.phone}.`,
    faqs: [
      ['Which areas do you cover?', 'Ripley, Belper, Derby, Heanor, Ilkeston, Alfreton, Matlock, Chesterfield, Nottingham and Eastwood, plus the towns and villages around them across Derbyshire and Nottinghamshire.'],
      ['Do you charge to travel to my area?', 'Travel within the areas listed on this page is not charged separately. If you are outside them it is still worth calling, because it depends on the job and where else we are working that week.'],
      ['I am not on your list, can you still help?', 'Very possibly. The towns listed are the main ones, not a boundary. Call ' + biz.phone + ' with your postcode and you will get a straight yes or no.']
    ]
  };
  p.schema = graph(p);

  const body = phead(d, {
    h1: 'Areas we cover',
    sub: `Electrical work right across ${esc(biz.baseArea)}, from a base in ${esc(biz.town)}.`,
    bg: 'g2.jpg'
  }) + `
<section class="sec"><div class="wrap">
  <div class="keyfact">
    <h2>In short</h2>
    <p>${esc(biz.name)} works across ${AREA_NAMES.join(', ')} and all surrounding areas, covering ${esc(biz.baseArea)}. If your town is not listed, call ${biz.phone} and ask, because the list is the main areas rather than a hard boundary.</p>
  </div>
  <div class="cards cards--3">
    ${locations.map(l => `<a class="card" href="${href(d, areaSlug(l))}">
      <div class="card__ico">${ic('pin')}</div>
      <h3>Electrician in ${esc(l.name)}</h3>
      <p>${esc(l.county)}. Covering ${esc(l.nearby.slice(0, 3).join(', '))} and the surrounding area.</p>
      <span class="card__go">Read more ${ic('arrow')}</span>
    </a>`).join('\n    ')}
  </div>
  ${band(d, 'Not sure if you are in range?', 'Call ' + biz.phone + ' with your postcode and you will get a straight answer.')}
  <div class="prose">
    <h2>Frequently asked questions</h2>
  </div>
  ${faqBlock(p.faqs)}
</div></section>`;

  return { ...p, html: page(p, body) };
}

/* ============================================================
   LOCATION PAGE
   The rotating question keeps the FAQ set from being the same four
   questions repeated ten times, which reads as boilerplate to a
   reader and as duplicate content to a crawler.
   ============================================================ */
function locationPage(l, i) {
  const d = 1;
  const slug = areaSlug(l);
  const rotating = [
    ['How quickly can you get to ' + l.name + '?', l.name + ' is inside our normal working area, so it is not a special trip. Anything dangerous, such as a burning smell or scorching around a socket, is treated as urgent. Call ' + biz.phone + ' and you will be told honestly when somebody can get there.'],
    ['Do you charge extra to come out to ' + l.name + '?', 'No. ' + l.name + ' is within the areas we cover, so there is no separate travel charge on top of the quote.'],
    ['Can you quote for work in ' + l.name + ' from photos?', 'Often yes, at least well enough to say whether it is a small job or something bigger. Send a photo of the problem and one of the consumer unit to ' + biz.phone + ' on WhatsApp. A rewire or a board change still needs looking at in person before a firm price.'],
    ['Do you work on older property in ' + l.name + '?', 'Yes. Older houses need more care over cable routing and making good, particularly where walls are solid stone or the property is listed or in a conservation area. It is worth checking what consents are needed before work starts.']
  ];
  const faqs = [
    ['Do you cover ' + l.name + '?', 'Yes. ' + biz.name + ' covers ' + l.name + ' and the surrounding area, including ' + l.nearby.slice(0, 4).join(', ') + '. Call or WhatsApp ' + biz.phone + ' and we will tell you when we can get to you.'],
    ['Are you qualified and insured to work in ' + l.name + '?', 'Yes. Stephen holds the Level 3 NVQ in Installing Electrotechnical Systems and Equipment, the 2391 inspection and testing award and the Level 3 EV charging qualification, and works to BS 7671. The business carries ' + biz.publicLiabilityText + ' of public liability insurance and guarantees its work for ' + biz.guaranteeMonths + ' months.'],
    ['Can you carry out an EICR on a rented property in ' + l.name + '?', 'Yes. Private rented properties in England need a satisfactory EICR at least every five years and for each new tenancy. Testing is arranged around the tenant or the changeover date.'],
    rotating[i % rotating.length]
  ];

  const p = {
    depth: d, slug, nav: 'areas-we-cover',
    trail: [['areas-we-cover', 'Areas we cover'], [slug, l.name]],
    title: `Electrician in ${l.name} | S. Sparham Electrical`,
    ogTitle: `Electrician in ${l.name}`,
    description: `Qualified electrician covering ${l.name} and ${l.nearby.slice(0, 3).join(', ')}. Rewires, fuse boards, EICRs, fault finding and EV chargers. Call ${biz.phone}.`,
    /* the breadcrumb says "Derby", which is right there but too thin on its
       own in a WhatsApp message */
    waLabel: `Electrician in ${l.name}`,
    faqs,
    extraNodes: [{
      '@type': 'Service',
      '@id': abs(slug) + '#service',
      name: 'Electrical services in ' + l.name,
      serviceType: 'Electrician',
      description: 'Electrical installation, testing and repair work in ' + l.name + ', ' + l.county + '.',
      url: abs(slug),
      provider: { '@id': L.BIZ_ID },
      areaServed: [{ '@type': 'City', name: l.name }].concat(
        l.nearby.map(n => ({ '@type': 'Place', name: n })))
    }]
  };
  p.schema = graph(p);

  const body = phead(d, {
    h1: `Electrician in ${l.name}`,
    sub: `Domestic, commercial and industrial electrical work in ${esc(l.name)} and the surrounding area.`,
    bg: 'g5.jpg'
  }) + `
<section class="sec"><div class="wrap layout">
  <div>
    <div class="keyfact">
      <h2>In short</h2>
      <p>${esc(biz.name)} is a ${esc(biz.town)}-based electrical business covering ${esc(l.name)} and the surrounding area, including ${esc(l.nearby.join(', '))}. We carry out rewires, consumer unit upgrades, EICRs and electrical testing, fault finding, lighting, EV charger installation and commercial work. The business is insured for ${biz.publicLiabilityText} of public liability, guarantees its work for ${biz.guaranteeMonths} months, and is rated ${ratings.google.score} out of 5 across ${ratings.google.count} Google reviews. Call or WhatsApp ${biz.phone}.</p>
    </div>
    <div class="prose">
      <h2>Electrical work in ${esc(l.name)}</h2>
      <p>${esc(l.context)}</p>
      <h2>What we do in ${esc(l.name)}</h2>
      <p>Every service below is available across ${esc(l.name)} and the surrounding villages.</p>
    </div>
    <div class="cards">
      ${services.slice(0, 6).map(s => `<a class="card" href="${href(d, s.slug)}">
        <div class="card__ico">${ic(s.icon)}</div>
        <h3>${esc(s.h1)}</h3>
        <p>${esc(s.blurb)}</p>
        <span class="card__go">Read more ${ic('arrow')}</span>
      </a>`).join('\n      ')}
    </div>
    ${band(d, 'Need an electrician in ' + l.name + '?', 'Call ' + biz.phone + ' or send a photo of the job on WhatsApp. Quotes are free.')}
    <div class="prose">
      <h2>Areas we cover around ${esc(l.name)}</h2>
      <p>As well as ${esc(l.name)} itself we regularly work in ${esc(l.nearby.join(', '))}, and across the rest of ${esc(biz.baseArea)}.</p>
    </div>
    <div class="chips">
      ${l.nearby.map(n => `<span class="chip">${ic('pin')}${esc(n)}</span>`).join('\n      ')}
    </div>
    <div class="prose">
      <h2>Frequently asked questions</h2>
    </div>
    ${faqBlock(faqs)}
    <div class="related">
      <h2>Other areas we cover</h2>
      <div class="cards">
        ${locations.filter(x => x.slug !== l.slug).slice(0, 3).map(o => `<a class="card" href="${href(d, areaSlug(o))}">
          <div class="card__ico">${ic('pin')}</div>
          <h3>Electrician in ${esc(o.name)}</h3>
          <p>${esc(o.county)}. Covering ${esc(o.nearby.slice(0, 3).join(', '))} and the surrounding area.</p>
          <span class="card__go">Read more ${ic('arrow')}</span>
        </a>`).join('\n        ')}
      </div>
    </div>
  </div>
  <aside class="aside">
    ${quotePanel(d)}
    ${servicePanel(d)}
    ${areaPanel(d, l.slug)}
  </aside>
</div></section>`;

  return { ...p, html: page(p, body) };
}

module.exports = {
  home, servicesHub, servicePage, areasHub, locationPage,
  quoteForm, galleryBlock, galleryGrid, lightbox, page, areaSlug
};
