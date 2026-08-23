/* S. Sparham Electrical
   Shared behaviour for every page. Each block guards its own hooks, because
   pages differ in what they contain: only the homepage has the hero slider
   and the before/after comparison, only some pages carry the reviews
   carousel or the gallery. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- current year in the footer ---- */
  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- mobile menu ---- */
  var burger = $('#burger'), panel = $('#navPanel');
  if (burger && panel) {
    burger.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', panel).forEach(function (a) {
      a.addEventListener('click', function () {
        panel.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- hero photo slider ----
     Three of Stephen's own job photographs, crossfading. Deliberately not
     gated on prefers-reduced-motion at the JS level: the CSS stills the
     Ken Burns drift for those users but the first slide must still paint,
     because an empty hero is worse than a static one. */
  var slides = $$('.hero-slide');
  if (slides.length > 1) {
    var si = 0;
    setInterval(function () {
      slides[si].classList.remove('is-on');
      si = (si + 1) % slides.length;
      slides[si].classList.add('is-on');
    }, 5500);
  }

  /* ---- reviews carousel ---- */
  var track = $('#rvTrack'), dotsBox = $('#rvDots'), rv = $('#rv');
  if (track && dotsBox && rv) {
    var cards = $$('.rv__card', track);
    var page = 0, timer = null;
    var perView = function () { return window.matchMedia('(min-width:860px)').matches ? 3 : 1; };
    var pages = function () { return Math.ceil(cards.length / perView()); };

    var render = function () {
      var pv = perView(), max = pages();
      if (page > max - 1) page = max - 1;
      if (page < 0) page = 0;
      track.style.transform = 'translateX(' + (-page * 100) + '%)';
      dotsBox.innerHTML = '';
      for (var i = 0; i < max; i++) {
        var b = document.createElement('button');
        b.className = 'rv__dot' + (i === page ? ' on' : '');
        b.setAttribute('aria-label', 'Go to review page ' + (i + 1));
        (function (n) { b.addEventListener('click', function () { page = n; render(); restart(); }); })(i);
        dotsBox.appendChild(b);
      }
      cards.forEach(function (c, i) {
        c.setAttribute('aria-hidden', (i >= page * pv && i < (page + 1) * pv) ? 'false' : 'true');
      });
    };
    var go = function (d) { var max = pages(); page = (page + d + max) % max; render(); };
    var restart = function () { clearInterval(timer); timer = setInterval(function () { go(1); }, 6000); };

    var nx = $('#rvNext'), pr = $('#rvPrev');
    if (nx) nx.addEventListener('click', function () { go(1); restart(); });
    if (pr) pr.addEventListener('click', function () { go(-1); restart(); });
    rv.addEventListener('mouseenter', function () { clearInterval(timer); });
    rv.addEventListener('mouseleave', restart);

    var x0 = null;
    track.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { go(dx < 0 ? 1 : -1); restart(); }
      x0 = null;
    }, { passive: true });

    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(render, 150); });
    render(); restart();
  }

  /* ---- transformation clips: play on scroll into view ----
     No play button, by design. The clip starts when it is actually on screen
     and pauses when it is not, so nobody arrives at a video that has already
     looped six times, and a visitor who never scrolls that far never pays for
     the download.

     Reduced motion is handled rather than ignored. Somebody who has asked their
     OS for less movement gets the poster frame and a set of controls, so the
     clip is still available deliberately instead of being hidden or forced on
     them. Hiding it outright would leave a black box, which is worse than both.

     play() is promise-returning and rejects if the browser declines (a battery
     saver, an autoplay policy we did not anticipate). Swallow it: an unplayed
     video already shows its poster, so there is nothing to recover. */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* querySelectorAll direct rather than the $ helper: nothing subtle, it just
     survives being written through a shell heredoc without losing a dollar. */
  var vids = Array.prototype.slice.call(document.querySelectorAll('.pvid__v'));

  if (vids.length && reduceMotion) {
    vids.forEach(function (v) { v.setAttribute('controls', ''); });
  } else if (vids.length && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          var pr = v.play();
          if (pr && pr['catch']) pr['catch'](function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    vids.forEach(function (v) { vio.observe(v); });
  } else {
    /* No IntersectionObserver (very old browser): fall back to plain autoplay
       rather than a video that can never start. */
    vids.forEach(function (v) {
      v.setAttribute('autoplay', '');
      var pr = v.play();
      if (pr && pr['catch']) pr['catch'](function () {});
    });
  }

  /* ---- before / after comparison ----
     A draggable wipe over two stills of the same kitchen. Pointer events
     cover mouse, touch and pen in one path; the range input underneath is
     the real control, so it works from the keyboard and reports a value to
     assistive technology without any extra ARIA. */
  $$('.ba').forEach(function (ba) {
    var clip = $('.ba__before', ba), handle = $('.ba__handle', ba), input = $('.ba__range', ba);
    if (!clip || !handle || !input) return;
    var set = function (pct) {
      pct = Math.max(0, Math.min(100, pct));
      clip.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      handle.style.left = pct + '%';
      if (input.value !== String(pct)) input.value = pct;
    };
    input.addEventListener('input', function () { set(parseFloat(input.value)); });
    var drag = false;
    var fromEvent = function (e) {
      var r = ba.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };
    ba.addEventListener('pointerdown', function (e) {
      drag = true; ba.setPointerCapture(e.pointerId); fromEvent(e);
    });
    ba.addEventListener('pointermove', function (e) { if (drag) fromEvent(e); });
    ba.addEventListener('pointerup', function () { drag = false; });
    ba.addEventListener('pointercancel', function () { drag = false; });
    set(parseFloat(input.value) || 50);
  });

  /* ---- gallery lightbox ---- */
  var lb = $('#lb'), lbImg = $('#lbImg'), lbX = $('#lbX');
  if (lb && lbImg) {
    $$('.gal__i img').forEach(function (img) {
      img.parentNode.addEventListener('click', function () {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    var closeLb = function () {
      lb.classList.remove('open'); lbImg.src = ''; document.body.style.overflow = '';
    };
    if (lbX) lbX.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
    });
  }

  /* ---- FAQ accordions ----
     Built on <details>, so every answer sits in the DOM and is readable by
     crawlers and answer engines whether or not it happens to be open.
     This handler only closes the siblings; <details> does the rest. */
  $$('.faq__i').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      var group = d.closest('.faq');
      if (!group) return;
      $$('.faq__i', group).forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---- lead logger -> Google Sheet + email + innov8 CRM ----
     Endpoint comes from <body data-lead>, written by the generator from
     biz.leadEndpoint. When that is null nothing here is wired up, which is
     deliberate: a beacon pointing at a dead URL fails silently and looks
     exactly like a working site.

     NEVER navigator.sendBeacon here. Brave, uBlock and Firefox strict mode
     block it WHILE sendBeacon() still returns true, so the usual
     `if (sendBeacon(...)) return; fetch(...)` shape skips the working fetch
     and the lead vanishes with no error anywhere. fetch + keepalive survives
     the tab being carried off to WhatsApp just as well, and cannot report a
     success it did not achieve.

     Not consent-gated: it sets no cookies and stores no identifiers, and a
     submitted enquiry is data the customer chose to send. PECR governs device
     storage, which this has none of. A declined banner must never cost a real
     enquiry. */
  var LEAD_URL = document.body && document.body.getAttribute('data-lead');
  var LEAD_TEST = /[?&]test=1/.test(location.search);

  function sendLead(dd) {
    if (!LEAD_URL) return;
    try {
      dd.page = location.pathname || '/';
      dd.referrer = document.referrer || '';
      if (LEAD_TEST) dd.test = true;
      fetch(LEAD_URL, {
        method: 'POST',
        mode: 'no-cors',            // we don't read the reply, just deliver it
        keepalive: true,            // survives unload and the app-switch
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },  // no CORS preflight
        body: JSON.stringify(dd)
      })['catch'](function () { /* never break the page */ });
    } catch (err) { /* never break the page */ }
  }
  window.sendLead = sendLead;

  /* Where on the page the action happened -> the Sheet's Source column, so
     "three calls from the bottom CTA" is an answerable question. Selectors are
     this site's: .wa is the float, .aside .panel is the sidebar quote panel. */
  function where(el) {
    if (!el || !el.closest) return 'page';
    if (el.closest('.wa')) return 'whatsapp widget';
    if (el.closest('.nav')) return 'nav';
    if (el.closest('.hero')) return 'hero';
    if (el.closest('.phead')) return 'page header';
    if (el.closest('.form')) return 'contact form';
    if (el.closest('.aside')) return 'sidebar panel';
    if (el.closest('.band')) return 'mid-page CTA';
    if (el.closest('.fcta')) return 'bottom CTA';
    if (el.closest('.ct')) return 'contact details';
    if (el.closest('.ft')) return 'footer';
    return 'page';
  }

  /* One delegated listener covers every link, including anything added later.
     KEEP THESE TYPE STRINGS AND THE SCRIPT'S NOTIFY_TYPES IDENTICAL - a
     mismatch silently disables every alert for that action. Title Case here,
     matching site/apps-script/Code.gs. */
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    var a = t.closest('a');
    if (!a) return;
    var h = a.getAttribute('href') || '';

    if (h.indexOf('tel:') === 0) {
      sendLead({ type: 'Call click', phone: h.replace('tel:', ''), source: where(a) });
    } else if (/wa.me|api.whatsapp.com|whatsapp:/i.test(h)) {
      sendLead({ type: 'WhatsApp click', source: where(a) });
    } else if (h.indexOf('mailto:') === 0) {
      sendLead({ type: 'Email click', details: h.replace('mailto:', '').split('?')[0], source: where(a) });
    }
  }, true);

  /* ---- quote form -> WhatsApp ---- */
  var form = $('#quoteForm');
  if (form) {
    var WA = form.getAttribute('data-wa') || '447557448945';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      /* read through .elements: form.name and form.action are reserved
         properties on HTMLFormElement and would shadow the inputs */
      var el = e.target.elements;
      var val = function (n) { return el[n] && el[n].value ? el[n].value.trim() : ''; };
      var name = val('name'), phone = val('phone');
      if (!name || !phone) {
        var miss = el[!name ? 'name' : 'phone'];
        if (miss && miss.focus) miss.focus();
        alert('Please add your name and phone number so we can get back to you.');
        return;
      }
      var lines = ['Hello S. Sparham Electrical, I would like a quote for some electrical work.', '',
                   'Name: ' + name, 'Phone: ' + phone];
      if (val('area')) lines.push('Area: ' + val('area'));
      if (val('job')) lines.push('Job: ' + val('job'));
      if (val('message')) lines.push('', 'Details: ' + val('message'));

      /* Where the enquiry came from, matching the line the plain WhatsApp
         buttons carry. Stephen also gets enquiries from Facebook, MyBuilder
         and word of mouth, so a message that says which is worth having.
         data-page is set on <body> by the generator. */
      var src = (document.body && document.body.getAttribute('data-page')) || '';
      lines.push('', 'Sent from the enquiry form on ssparhamelectrical.co.uk' + (src ? ' (' + src + ')' : ''));

      /* Log the enquiry BEFORE the tab is carried off to WhatsApp. keepalive is
         what makes that safe: the fetch completes even though this document is
         being replaced. It fires whether or not they go on to press send in
         WhatsApp, which is the point - a filled-in form is a lead either way,
         and without this the ones who bail are invisible. */
      sendLead({
        type: 'Quote form',
        name: name,
        phone: phone,
        service: val('job'),
        area: val('area'),
        details: val('message'),
        source: 'contact form'
      });

      window.location.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));
    });
  }
})();
