/* ============================================================
   About, Contact, Our work, Reviews, FAQs, legal pages and 404.

   PRIVACY POLICY: it describes what the site ACTUALLY does, and it has to be
   rewritten whenever that changes or it becomes a false statement rather than
   a missing one. As at August 2026 the site runs visitor tracking and a lead
   logger, neither of which uses cookies or device storage, plus Google Fonts.
   GA4 is still to come and WILL need this updating again, because unlike the
   other two it does set cookies.
   ============================================================ */
const D = require('./data.js');
const L = require('./lib.js');
const P = require('./pages.js');
const { biz, services, locations, gallery, projects, generalFaqs, credentials, ratings, reviews } = D;
const {
  esc, href, asset, ic, ph, waLink, tel, WA_PREFILL, phead, faqBlock, band,
  quotePanel, servicePanel, areaPanel, credentialsBlock, credStrip,
  ratingsBar, reviewCard, reviewLinks, G_MARK,
  graph, reviewNodes
} = L;
const { page, quoteForm, galleryBlock, areaSlug } = P;
const { lightbox } = P;

const d = 1;

/* ---------------- ABOUT ---------------- */
function about() {
  const p = {
    depth: d, slug: 'about', nav: 'about',
    trail: [['about', 'About']],
    title: 'About S. Sparham Electrical | Ripley Electricians',
    description: `A ${biz.town}-based electrical business run by ${biz.owner}, covering domestic, commercial and industrial work across Derbyshire and Notts.`
  };
  p.schema = graph(p);

  const body = phead(d, {
    h1: 'About S. Sparham Electrical',
    sub: `A small team of local electricians based in ${esc(biz.town)}.`,
    bg: 'g6.jpg'
  }) + `
<section class="sec"><div class="wrap layout">
  <div>
    <div class="keyfact">
      <h2>In short</h2>
      <p>${esc(biz.name)} is an electrical business based in ${esc(biz.town)}, ${esc(biz.county)}, run by ${esc(biz.owner)} with a team of ${biz.teamSize}. It has been trading ${biz.yearsTrading} years and covers domestic, commercial and industrial work across ${esc(biz.baseArea)}: rewires, consumer unit upgrades, EICRs and testing, fault finding, lighting, EV chargers, CCTV and industrial installations. The business is insured for ${biz.publicLiabilityText} of public liability and guarantees its work for ${biz.guaranteeMonths} months.</p>
    </div>

    <div class="ab" style="margin-bottom:clamp(24px,4vw,40px)">
      <div class="ab__img">
        <img src="${asset(d, 'about.jpg')}" alt="Stephen Sparham on site in branded S. Sparham Electrical workwear, holding an SDS drill" loading="lazy" width="700" height="845">
        <img class="ab__sub" src="${asset(d, 'about-2.jpg')}" alt="S. Sparham Electrical branded workwear: hoodie, beanie, t-shirt and body warmer, each carrying the lightning bolt mark" loading="lazy" width="420" height="420">
      </div>
      <div class="ab__body">
        <div class="eyebrow">Meet the owner</div>
        <h2>${esc(biz.owner)}</h2>
        <p>${esc(biz.name)} is a local electrical business based in ${esc(biz.town)}, providing reliable electrical services to domestic, commercial and industrial customers across the surrounding areas.</p>
        <p>What started as a one-man business has grown into a small team of skilled, trusted local electricians. We take pride in delivering high-quality workmanship while keeping the personal service and attention to detail that our business was built on.</p>
        <p>From small electrical repairs and fault finding to full rewires, new builds, lighting installations, EV chargers and larger commercial projects, we approach every job with the same level of care and professionalism.</p>
        <p>We believe in doing things properly, keeping our customers informed and leaving every job clean, safe and finished to a high standard.</p>
        <div class="ab__sign"><div class="rv__av">SS</div><div><b>${esc(biz.owner)}</b>
          <small>Owner, ${esc(biz.name)}</small></div></div>
      </div>
    </div>

    <div class="prose">
      <h2>What sets us apart</h2>
      <p>We believe great electrical work is about more than just getting the job done.</p>
      <p>We are a skilled team who take real pride in our work, with a focus on getting the small things right. From keeping you informed throughout the job and arriving when we say we will, to working cleanly and leaving your property tidy, we believe these simple things make a big difference.</p>
      <p>We also take pride in how our work looks. Wherever possible, we aim to install everything neatly and thoughtfully, rather than simply making it work. We listen to what each customer wants and take the time to find the solution that best suits their property, needs and budget.</p>
      <p>For us, it is about doing things properly, treating people with respect and leaving every job with something we are proud to put our name to.</p>

      <h2>Where we work</h2>
      <p>We are based in ${esc(biz.town)} and cover ${locations.map(l => l.name).join(', ')}, plus the towns and villages around them across ${esc(biz.baseArea)}.</p>
    </div>
    <div class="chips">
      ${locations.map(l => `<a class="chip" href="${href(d, areaSlug(l))}">${ic('pin')}${esc(l.name)}</a>`).join('\n      ')}
    </div>

    ${band(d, 'Want a quote?', 'Call ' + biz.phone + ', or send a photo of the job on WhatsApp. Quotes are free and there is no obligation.')}
  </div>
  <aside class="aside">
    ${quotePanel(d)}
    ${servicePanel(d)}
    ${areaPanel(d)}
  </aside>
</div></section>
${credentialsBlock(d, { tint: true, title: 'What Stephen is qualified to do' })}`;

  return { ...p, html: page(p, body) };
}

/* ---------------- CONTACT ---------------- */
function contact() {
  const p = {
    depth: d, slug: 'contact', nav: 'contact',
    trail: [['contact', 'Contact']],
    title: 'Contact | S. Sparham Electrical, Ripley',
    description: `Call or WhatsApp ${biz.phone} for a free electrical quote in Ripley, Belper, Derby, Chesterfield or Nottingham. No obligation.`,
    faqs: [
      ['How do I get a quote?', 'Call or text ' + biz.phone + ', or send a photo of the job on WhatsApp. For a small job a photograph and a description are usually enough to give you a price without anyone coming out. Larger work needs looking at properly first. Quotes are free.'],
      ['What information should I send?', 'A photo of the problem, a photo of your consumer unit, and a line on what the property is and where it is. That is enough to tell you whether it is a small job, a repair, or something that needs a visit before anyone can price it.'],
      ['Do you charge a call-out fee to quote?', 'No. Quotations are free and there is no obligation to go ahead.']
    ]
  };
  p.schema = graph(p);

  const body = phead(d, {
    h1: 'Get in touch',
    sub: 'Call, text or send a photo on WhatsApp. Quotes are free and there is no obligation.',
    bg: 'g1.jpg'
  }) + `
<section class="sec"><div class="wrap">
  <div class="keyfact">
    <h2>In short</h2>
    <p>Call or WhatsApp ${biz.phone}, or email ${esc(biz.email)}. ${esc(biz.name)} is based in ${esc(biz.town)}, ${esc(biz.county)} ${esc(biz.postcodeArea)} and covers ${esc(biz.baseArea)}. Quotes are free. ${ph()} Opening hours to be confirmed before they are published.</p>
  </div>
  <div class="ct">
    <div class="ct__side">
      <a class="ct__row" href="${tel}" data-track="call">${ic('phone')}<div><small>Call or text</small><b>${biz.phone}</b></div></a>
      <a class="ct__row" href="${waLink(WA_PREFILL)}" target="_blank" rel="noopener" data-track="whatsapp">${ic('chat')}<div><small>WhatsApp</small><b>Send us a photo of the job</b></div></a>
      <a class="ct__row" href="mailto:${biz.email}">${ic('mail')}<div><small>Email</small><b>${esc(biz.email)}</b></div></a>
      <div class="ct__row">${ic('pin')}<div><small>Based in</small><b>${esc(biz.town)}, ${esc(biz.county)} ${esc(biz.postcodeArea)}</b></div></div>
      <a class="ct__row" href="${biz.facebook}" target="_blank" rel="noopener">${ic('facebook')}<div><small>Facebook</small><b>See our recent work</b></div></a>
      <a class="ct__row" href="${biz.instagram}" target="_blank" rel="noopener">${ic('instagram')}<div><small>Instagram</small><b>@s.sparham_electrical</b></div></a>
    </div>
    ${quoteForm(d)}
  </div>
  <div class="prose" style="margin-top:clamp(28px,4vw,44px)">
    <h2>Frequently asked questions</h2>
  </div>
  ${faqBlock(p.faqs)}
</div></section>`;

  return { ...p, html: page(p, body) };
}

/* ---------------- OUR WORK ---------------- */
function ourWork() {
  const p = {
    depth: d, slug: 'our-work', nav: 'our-work',
    trail: [['our-work', 'Our work']],
    title: 'Our Work | S. Sparham Electrical',
    description: 'Photographs of electrical work carried out by S. Sparham Electrical: lighting, kitchens, sockets, EV chargers and full renovations across Derbyshire.',
    extraNodes: [{
      '@type': 'ImageGallery',
      '@id': L.abs('our-work') + '#gallery',
      name: 'Completed electrical work by ' + biz.name,
      image: gallery.map(([f, alt]) => ({
        '@type': 'ImageObject',
        contentUrl: D.SITE_URL + '/assets/' + f,
        caption: alt
      }))
    }]
  };
  p.schema = graph(p);

  const body = phead(d, {
    h1: 'Our work',
    sub: 'Every photograph on this website is a job we have carried out ourselves.',
    bg: 'g2.jpg'
  }) + `
<section class="sec"><div class="wrap">
  <div class="keyfact">
    <h2>In short</h2>
    <p>These are photographs of real jobs carried out by ${esc(biz.name)}: lighting and LED work, kitchen and renovation jobs, consumer units and testing, outdoor and garden lighting, EV chargers, and three-phase and industrial installations across ${esc(biz.baseArea)}. None of them is a stock photograph.</p>
  </div>
  ${galleryBlock(d, gallery)}
</div></section>

<section class="sec sec--tint">
  <div class="wrap">
    <div class="sec-head sec-head--mid">
      <div class="eyebrow">Before and after</div>
      <h2>A job from start to finish</h2>
      <p>Watch the same room go from stripped back to finished.</p>
    </div>
    ${projects.map((pr, n) => L.projectRow(d, pr, n)).join('\n')}
  </div>
</section>

<section class="sec"><div class="wrap">
  ${band(d, 'Want something similar doing?', 'Call ' + biz.phone + ' or send us a photo of the space on WhatsApp and we will tell you what is involved.')}
</div></section>
${lightbox()}`;

  return { ...p, html: page(p, body) };
}

/* ---------------- REVIEWS ---------------- */
function reviews_() {
  const p = {
    depth: d, slug: 'reviews', nav: 'reviews',
    trail: [['reviews', 'Reviews']],
    title: 'Customer Reviews | S. Sparham Electrical',
    description: `${ratings.google.score} out of 5 from ${ratings.google.count} Google reviews, 5.0 from ${ratings.mybuilder.count} on MyBuilder and ${ratings.facebook.recommendPct}% recommended on Facebook. Read what customers say.`,
    /* Review nodes are emitted here because this is the page that actually
       shows every one of them. */
    extraNodes: reviewNodes(reviews)
  };
  p.schema = graph(p);

  const body = phead(d, {
    h1: 'Customer reviews',
    sub: 'Real reviews from Google, MyBuilder and Facebook, reproduced word for word.',
    bg: 'g5.jpg'
  }) + `
<section class="sec"><div class="wrap">
  <div class="keyfact">
    <h2>In short</h2>
    <p>${esc(biz.name)} is rated ${ratings.google.score} out of 5 from ${ratings.google.count} Google reviews, 5.0 out of 5 from ${ratings.mybuilder.count} reviews on MyBuilder, and ${ratings.facebook.recommendPct}% recommended from ${ratings.facebook.count} recommendations on Facebook, as at ${esc(ratings.asAt)}. The reviews below are reproduced exactly as the customers wrote them.</p>
  </div>
  ${ratingsBar(d)}
  <div class="cards cards--3" style="align-items:stretch">
    ${reviews.map(r => reviewCard(r)).join('\n    ')}
  </div>
  ${reviewLinks(d)}
  ${band(d, 'Had work done by us?', 'A review makes a real difference to a small business. Leaving one on Google takes about a minute.')}
  <div style="text-align:center">
    <a class="btn btn--google" href="${biz.googleReview}" target="_blank" rel="noopener">${G_MARK} Leave a Google review</a>
  </div>
</div></section>`;

  return { ...p, html: page(p, body) };
}

/* ---------------- FAQs ----------------
   The homepage deliberately carries no FAQ section, so this page owns the
   general questions outright and there is no competing FAQPage schema. */
function faqs() {
  const serviceFaqs = services.map(s => [s, s.faqs.slice(0, 2)]);
  const p = {
    depth: d, slug: 'faqs', nav: 'faqs',
    trail: [['faqs', 'FAQs']],
    title: 'Frequently Asked Questions | S. Sparham Electrical',
    description: 'Common questions about electrical work: qualifications, insurance, certificates, EICRs, rewires, fuse boards and how to get a quote.',
    faqs: generalFaqs
  };
  p.schema = graph(p);

  const body = phead(d, {
    h1: 'Frequently asked questions',
    sub: 'The questions we get asked most, answered plainly.',
    bg: 'g3.jpg'
  }) + `
<section class="sec"><div class="wrap layout">
  <div>
    <div class="keyfact">
      <h2>In short</h2>
      <p>${esc(biz.name)} is a qualified, insured electrical business based in ${esc(biz.town)}, covering ${esc(biz.baseArea)}. Quotations are free, work is guaranteed for ${biz.guaranteeMonths} months, and certificates are issued for the work that requires them. Call or WhatsApp ${biz.phone}.</p>
    </div>
    <div class="prose"><h2>General questions</h2></div>
    ${faqBlock(generalFaqs)}

    <div class="prose" style="margin-top:clamp(28px,4vw,44px)"><h2>Questions by service</h2>
      <p>Two questions from each service page. Follow the link under each pair for the rest.</p>
    </div>
    ${serviceFaqs.map(([s, fs]) => `
    <div class="prose" style="margin-top:22px"><h3>${esc(s.h1)}</h3></div>
    ${faqBlock(fs)}
    <p style="margin-top:10px"><a class="chip" href="${href(d, s.slug)}">${ic(s.icon)}More about ${esc(s.nav.toLowerCase())} ${ic('arrow')}</a></p>`).join('\n')}

    ${band(d, 'Question not answered here?', 'Call ' + biz.phone + ' and ask. You will get a straight answer, whether or not it turns into a job.')}
  </div>
  <aside class="aside">
    ${quotePanel(d)}
    ${servicePanel(d)}
    ${areaPanel(d)}
  </aside>
</div></section>`;

  return { ...p, html: page(p, body) };
}

/* ---------------- LEGAL ---------------- */
function privacy() {
  const p = {
    depth: d, slug: 'privacy-policy', nav: '',
    trail: [['privacy-policy', 'Privacy policy']],
    title: 'Privacy Policy | S. Sparham Electrical',
    description: 'How S. Sparham Electrical handles the information you send through this website.'
  };
  p.schema = graph(p);
  const body = phead(d, { h1: 'Privacy policy', sub: 'How we handle the information you send us.', bg: 'g3.jpg' }) + `
<section class="sec"><div class="wrap legal">
  <p><strong>Last updated:</strong> August 2026</p>
  <p>This policy explains what ${esc(biz.name)} does with the information you provide through this website.</p>

  <h2>Cookies</h2>
  <p>This website sets no cookies. It does not use cookies for advertising, and it stores nothing on your device: no cookies, no local storage, no identifiers of any kind. That is why you are not being asked to accept anything.</p>

  <h2>Visitor statistics</h2>
  <p>We record basic, anonymous statistics about how the site is used: which pages are viewed, which page a visitor arrived from, and when the call, WhatsApp or email buttons are pressed. This is handled for us by Innov8 Workflows, who built and look after this website.</p>
  <p>These statistics are not tied to you. No cookie or identifier is stored, so return visits are not linked together and no profile is built. As with any website, our provider's server can see the IP address a request came from.</p>

  <h2>The enquiry form</h2>
  <p>The form on this site does two things when you press the button.</p>
  <p>First, it opens WhatsApp on your device with your message already written out. Nothing goes to us through WhatsApp until you press send there, and at that point it reaches us through WhatsApp in the ordinary way, under WhatsApp's own terms.</p>
  <p>Second, it sends what you typed into the form to our own lead record, so an enquiry is not lost if WhatsApp fails to open or you change your mind. That record holds your name, phone number, the service you selected, your area and your message. It is kept in a spreadsheet we control, it triggers an email alert to us, and it is stored in the customer record system Innov8 Workflows run for us.</p>
  <p>If you would rather not have that happen, call or message us directly on <a href="${tel}">${biz.phone}</a> instead.</p>

  <h2>Contacting us directly</h2>
  <p>If you call, message or email us, we hold the details you give us, such as your name, phone number, address and what you have told us about the job, so that we can quote for and carry out the work.</p>

  <h2>What we use it for</h2>
  <ul>
    <li>Responding to your enquiry and providing a quote</li>
    <li>Carrying out work you have asked us to do</li>
    <li>Issuing and keeping certificates and records of work carried out</li>
  </ul>
  <p>We do not sell your information, and we do not pass it to third parties for marketing.</p>

  <h2>Who else is involved</h2>
  <ul>
    <li><strong>Google Fonts</strong> supplies the typefaces, so your browser makes a request to Google's servers when a page loads. That request includes your IP address.</li>
    <li><strong>Google Sheets and Google Workspace</strong> hold the enquiry record and deliver the email alert.</li>
    <li><strong>Innov8 Workflows</strong> built and maintain this website, and run the visitor statistics and the customer record system on our behalf.</li>
    <li><strong>WhatsApp</strong> handles anything you send through it, under WhatsApp's own privacy terms.</li>
  </ul>
  <p>We do not use advertising networks, social media tracking pixels, or any other third party service on this website.</p>

  <h2>Certificates and records</h2>
  <p>Electrical certificates and condition reports contain the property address and details of the installation. We keep copies as a record of the work carried out, as an electrician is expected to.</p>

  <h2>How long we keep it</h2>
  <p>Enquiry details are kept only as long as needed to deal with the enquiry and any work that follows from it, plus the period required for tax, certification and insurance records.</p>

  <h2>Your rights</h2>
  <p>You can ask us what information we hold about you, ask for it to be corrected, or ask for it to be deleted. Contact us on <a href="${tel}">${biz.phone}</a> or at <a href="mailto:${biz.email}">${esc(biz.email)}</a> to do so.</p>

  <h2>Contact</h2>
  <p>${esc(biz.name)}<br>${esc(biz.town)}, ${esc(biz.county)} ${esc(biz.postcodeArea)}<br>Phone: <a href="${tel}">${biz.phone}</a><br>Email: <a href="mailto:${biz.email}">${esc(biz.email)}</a></p>
  <p>${ph()} If a registered company name, number and address exist, they should be added here.</p>
</div></section>`;
  return { ...p, html: page(p, body) };
}

function terms() {
  const p = {
    depth: d, slug: 'terms', nav: '',
    trail: [['terms', 'Terms']],
    title: 'Terms of Use | S. Sparham Electrical',
    description: 'Terms of use for the S. Sparham Electrical website, covering the general electrical guidance published here, quotes, photographs and reviews.'
  };
  p.schema = graph(p);
  const body = phead(d, { h1: 'Terms of use', sub: 'The terms covering this website.', bg: 'g4.jpg' }) + `
<section class="sec"><div class="wrap legal">
  <h2>About this website</h2>
  <p>This website is operated by ${esc(biz.name)}. By using it you accept these terms.</p>

  <h2>Information on this site</h2>
  <p>The guidance on this website is general information about electrical work in the United Kingdom, written against BS 7671 and Part P of the Building Regulations as they stand at the time of writing. It is not an inspection, a specification, or advice about your particular installation. Every property is different, and nothing here should be relied on in place of having someone test and inspect the actual installation.</p>
  <p>Do not use anything on this site as instructions for carrying out electrical work yourself. Much of the work described is notifiable under Part P, and all of it carries a risk of injury or fire if it is done wrong.</p>
  <p>Any indication of how long a job takes or what it involves is a general guide only. Firm timescales and prices are given in a written quote.</p>

  <h2>Quotes</h2>
  <p>Nothing on this website is an offer or a contract. Work is carried out on the basis of a specific quote given for your property, and a quote becomes binding only when it is accepted in the terms set out in it.</p>

  <h2>Photographs</h2>
  <p>All photographs on this site show work carried out by ${esc(biz.name)}. They illustrate the type of work undertaken and are not a promise that your job will look the same, because the result depends on the property, the materials and the condition of what is already there.</p>

  <h2>Reviews</h2>
  <p>The reviews shown on this site are real reviews left by customers on Google, MyBuilder and Facebook. They are reproduced word for word, and each rating links to the profile it came from so it can be checked independently.</p>

  <h2>Links</h2>
  <p>Where this site links to other websites, we are not responsible for their content.</p>

  <h2>Intellectual property</h2>
  <p>The content, photographs and design of this website belong to ${esc(biz.name)} and may not be reproduced without permission.</p>

  <h2>Contact</h2>
  <p>Phone: <a href="${tel}">${biz.phone}</a><br>Email: <a href="mailto:${biz.email}">${esc(biz.email)}</a></p>
  <p>${ph()} Registered company name, number and address to be added if applicable.</p>
</div></section>`;
  return { ...p, html: page(p, body) };
}

/* ---------------- 404 ---------------- */
function notFound() {
  /* Depth -1 = root-absolute paths. The host serves this page for a miss at
     ANY depth, so /electrician-in-ripley/foo/ would otherwise resolve
     depth-relative references against that directory and 404 every asset
     and every link on the page. */
  const p = {
    depth: -1, slug: '404', nav: '',
    /* Without these it is an indexable soft-404: the host serves this file
       for any miss, and /404 itself answers 200, self-canonicalising to a
       URL that does not exist. */
    noindex: true,
    canonical: D.SITE_URL + '/',
    title: 'Page Not Found | S. Sparham Electrical',
    description: `That page could not be found. Browse our electrical services and the areas we cover, or call ${biz.phone} for a free quote.`
  };
  p.schema = graph({ ...p, slug: '' });
  const body = `
<section class="sec" style="text-align:center"><div class="wrap">
  <div class="eyebrow" style="justify-content:center">Error 404</div>
  <h1 style="font-size:clamp(1.8rem,6vw,3rem);margin-bottom:12px">This page has tripped out</h1>
  <p style="color:var(--muted);max-width:52ch;margin:0 auto 26px">The page you were after does not exist any more, or the address has a typo in it. Here is where to go instead.</p>
  <div class="band__btns" style="margin-bottom:34px">
    <a class="btn btn--brand" href="${href(-1, '')}">Back to the homepage ${ic('arrow')}</a>
    <a class="btn btn--dark" href="${tel}" data-track="call">${ic('phone')} Call ${biz.phone}</a>
  </div>
  <div class="chips" style="justify-content:center">
    ${services.map(s => `<a class="chip" href="${href(-1, s.slug)}">${ic(s.icon)}${esc(s.nav)}</a>`).join('\n    ')}
    <a class="chip" href="${href(-1, 'areas-we-cover')}">${ic('pin')}Areas we cover</a>
    <a class="chip" href="${href(-1, 'contact')}">${ic('mail')}Contact</a>
  </div>
</div></section>`;
  return { ...p, html: page(p, body) };
}

module.exports = { about, contact, ourWork, reviews: reviews_, faqs, privacy, terms, notFound };
