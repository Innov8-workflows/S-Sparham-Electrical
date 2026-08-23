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

  /* ---- hero video ----
     The slider it replaced is gone; the element carries autoplay/muted/loop/
     playsinline itself so it starts without waiting for this file. All that is
     left here is the two cases the attributes cannot cover.

     1. A browser that REFUSES to autoplay. Brave's shields do this by default.
        A rejected play() arms one retry on the first interaction anywhere on
        the page; a user gesture satisfies every autoplay policy there is, and
        no control is ever shown.

     prefers-reduced-motion is NOT handled here, and that is a decision rather
     than an omission. An earlier version stripped the loop for those users, so
     the hero played once and stopped; on a machine that reports reduce - which
     Brave does, and which is how a play button ended up on the mid-page clip
     too - that reads as "the video is not looping", because it is not.

     The site's stance, set on the hero from the start, is to still the motion
     and keep the content rather than remove it. This is a muted, silent
     cross-dissolve of lights fading up behind a heavy dark scrim: no parallax,
     no zoom, no rotation, nothing carrying a vestibular risk.

     Worth knowing: WCAG 2.2.2 wants a pause mechanism for automatic motion that
     runs past five seconds, and a loop never stops. The considered trade is a
     looping ambient hero with no control, which is what most sites with hero
     video do. If that is ever revisited, a small discreet pause toggle in the
     corner of the hero is the fix - not the browser's own control bar, which is
     what caused the original complaint. */
  var hero = document.querySelector('.hero-video');
  if (hero) {
    var heroArmed = false;
    var heroPlay = function () {
      var pr = hero.play();
      if (pr && pr['catch']) pr['catch'](function () {
        if (heroArmed) return;
        heroArmed = true;
        var evs = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
        var go = function () {
          evs.forEach(function (e) { window.removeEventListener(e, go); });
          var p2 = hero.play();
          if (p2 && p2['catch']) p2['catch'](function () {});
        };
        evs.forEach(function (e) { window.addEventListener(e, go, { once: true, passive: true }); });
      });
    };
    heroPlay();
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
     No controls, no play button, nothing to press. Three things make that
     work rather than just hoping:

     1. It LOOPS, on the client's instruction (2026-08-23), and the loop
        attribute in lib.js is what does that — not this file. All this does is
        start it when it scrolls into view and pause it when it leaves, so the
        loop only runs while somebody can actually see it. Scrolling back
        resumes rather than restarts, which is why nothing resets currentTime
        on the way in.

     2. prefers-reduced-motion is NOT gated on here, deliberately, and this is
        a judgement call worth knowing about. An earlier version added controls
        for it, which is exactly how a play button ended up on the page. The
        site's existing stance, set on the hero, is to still the motion rather
        than remove the content — and this is a muted five-second cross-dissolve
        between two photographs: no parallax, no zoom, no rotation, nothing that
        carries a vestibular risk. Now that it loops, WCAG 2.2.2 does bite; the
        answer if it is ever revisited is a small discreet corner toggle, or
        revealing pvid__still instead of playing — the markup is already there
        for that.

     3. play() returns a promise and browsers reject it when their autoplay
        policy says no — Brave's shields do this by default. Rather than
        leaving the visitor on a static shot of a building site, a rejection
        arms a one-time retry on the first real interaction anywhere on the
        page, which is enough of a user gesture to satisfy every policy. Still
        no button: they never know it happened. */
  var vids = Array.prototype.slice.call(document.querySelectorAll('.pvid__v'));

  if (vids.length) {
    var armed = false;

    /* Playback failed for good. Show the finished room instead of leaving the
       visitor on the poster, which is the building site the clip starts on. */
    var giveUp = function (v) {
      var still = v.parentNode.querySelector('.pvid__still');
      if (still) { still.hidden = false; v.hidden = true; }
    };

    /* A rejected play() arms one retry on the first real interaction anywhere
       on the page. A user gesture satisfies every autoplay policy there is,
       and the visitor never knows it happened — no button, no prompt. */
    var armRetry = function (v) {
      if (armed) { giveUp(v); return; }
      armed = true;
      var evs = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
      var go = function () {
        evs.forEach(function (e) { window.removeEventListener(e, go); });
        var pr = v.play();
        if (pr && pr['catch']) pr['catch'](function () { giveUp(v); });
      };
      evs.forEach(function (e) { window.addEventListener(e, go, { once: true, passive: true }); });
    };

    /* No currentTime reset: a looping clip never reaches its end, so scrolling
       back to it resumes where it was rather than jumping to the start. */
    var playNow = function (v) {
      var pr = v.play();
      if (pr && pr['catch']) pr['catch'](function () { armRetry(v); });
    };

    if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) playNow(en.target);
          else if (!en.target.paused) en.target.pause();
        });
      }, { threshold: 0.35 });
      vids.forEach(function (v) { vio.observe(v); });
    } else {
      vids.forEach(playNow);
    }
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

  /* ============================================================
     COOKIE CONSENT AND GOOGLE ANALYTICS 4
     ============================================================
     The measurement ID arrives on <body data-ga4>, from biz.ga4Id in
     data.js. No ID, no banner, no gtag, no cookies - the whole block is
     inert, which is how it stays testable and how it switches off.

     WHY THIS IS NOT THE SNIPPET GOOGLE GIVES YOU. Google's snippet is two
     <script> tags, the second inline. This site's CSP is script-src 'self'
     plus the CRM host, with NO 'unsafe-inline', so that inline block would
     be refused and analytics would silently never start. Everything below
     runs from site.js, which is same-origin and allowed, and it appends the
     gtag loader itself.

     CONSENT MODE V2, DENIED BY DEFAULT. gtag.js loads on every page but is
     told up front that analytics_storage is denied, so NO COOKIE IS WRITTEN
     until somebody presses Accept. A rejected visit still sends Google a
     cookieless ping, which is what keeps headline visitor counts honest;
     the privacy policy says so in as many words rather than pretending
     rejection means nothing leaves the page.

     wait_for_update gives the stored choice time to be read and applied
     before the first hit goes out, so an accepting returning visitor is not
     counted as a denied one on their first page.

     The choice lives in localStorage, not a cookie. Storing consent in a
     cookie to record that you may not set cookies is the joke that writes
     itself, and localStorage is exempt on the same "strictly necessary"
     grounds. */
  var GA_KEY = 'ssp_consent', GA_VER = 'v1';
  var ga4 = document.body.getAttribute('data-ga4');

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  if (ga4) {
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    });

    var readChoice = function () {
      try {
        var v = localStorage.getItem(GA_KEY);
        if (!v) return null;
        var parts = v.split(':');
        return parts[0] === GA_VER ? parts[1] : null;
      } catch (e) { return null; }
    };
    var writeChoice = function (v) {
      try { localStorage.setItem(GA_KEY, GA_VER + ':' + v); } catch (e) {}
    };
    var applyChoice = function (v) {
      gtag('consent', 'update', { analytics_storage: v === 'accepted' ? 'granted' : 'denied' });
    };

    var stored = readChoice();
    if (stored) applyChoice(stored);

    var gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga4);
    document.head.appendChild(gs);
    gtag('js', new Date());
    gtag('config', ga4, { anonymize_ip: true });

    /* ---- the banner ----
       Built in JS rather than shipped in every page's HTML, because a
       visitor who has already answered should never receive the markup at
       all. Styles live in site.css, not here: injecting a <style> element
       would lean on style-src 'unsafe-inline', and there is no reason to. */
    var showBanner = function () {
      var b = document.createElement('div');
      b.className = 'cc';
      b.setAttribute('role', 'dialog');
      b.setAttribute('aria-label', 'Cookies');
      b.innerHTML =
        '<div class="cc__in">' +
          '<p class="cc__t"><b>Cookies</b> We would like to count visits with Google Analytics, which sets a cookie. ' +
          'It is not used for advertising and you are not tracked across other websites. ' +
          'The site works exactly the same either way. <a href="' + (document.body.getAttribute('data-privacy') || '/privacy-policy/') + '">Privacy policy</a></p>' +
          '<div class="cc__b">' +
            '<button type="button" class="cc__no">Reject</button>' +
            '<button type="button" class="cc__yes">Accept</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(b);
      document.body.classList.add('has-cc');
      /* Push the WhatsApp float above the banner by the banner's REAL height.
         A fixed offset is not good enough: the text wraps to four lines on a
         narrow phone and one on a wide screen, so the float ended up buried
         behind it on mobile.

         ResizeObserver rather than a one-off measurement, because measuring
         once on append reads the height BEFORE the webfont swaps in - it came
         out 176px for a banner that settled at 196 - and rotating a phone
         rewraps it again. The resize listener is the fallback for browsers
         without RO. */
      var lift = function () { document.body.style.setProperty('--cc-h', b.offsetHeight + 'px'); };
      lift();
      var ro = null;
      if (window.ResizeObserver) { ro = new ResizeObserver(lift); ro.observe(b); }
      else { window.addEventListener('resize', lift); }
      /* two frames: one to get it into the layout, one so the transition
         has a start value to animate from rather than snapping */
      requestAnimationFrame(function () { requestAnimationFrame(function () { b.classList.add('cc--in'); }); });

      var close = function (choice) {
        writeChoice(choice);
        applyChoice(choice);
        b.classList.remove('cc--in');
        document.body.classList.remove('has-cc');
        /* let the observer go with the banner, or it keeps a detached node
           alive and keeps writing --cc-h for something that is gone */
        if (ro) ro.disconnect(); else window.removeEventListener('resize', lift);
        document.body.style.removeProperty('--cc-h');
        setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 350);
      };
      b.querySelector('.cc__yes').addEventListener('click', function () { close('accepted'); });
      b.querySelector('.cc__no').addEventListener('click', function () { close('rejected'); });
    };
    if (!stored) showBanner();

    /* Lets somebody change their mind: any element with data-cc-reset wipes
       the stored choice and reloads, which brings the banner back. It is in
       the privacy policy, because burying it would defeat the point. */
    document.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== document.body) {
        if (t.hasAttribute && t.hasAttribute('data-cc-reset')) {
          e.preventDefault();
          try { localStorage.removeItem(GA_KEY); } catch (err) {}
          location.reload();
          return;
        }
        t = t.parentNode;
      }
    });

    /* ---- events ----
       Three, matching the names used across the other client sites and the
       Apps Script lead types: click_to_call, click_whatsapp, generate_lead.
       generate_lead is one of GA4's own recommended event names, so it can
       be marked as a key event in the property without any extra setup.

       Delegated from document in the CAPTURE phase, for the same reason the
       lead beacon is: a tel: or wa.me tap starts a navigation that can tear
       this document down, and a listener bound to the link itself in the
       bubble phase can lose the race. Delegation also means links added to
       any page later are covered without touching this file. */
      var where = function (el) {
        if (!el || !el.closest) return 'page';
        if (el.closest('.wa')) return 'whatsapp widget';
        if (el.closest('.nav')) return 'nav';
        if (el.closest('.hero')) return 'hero';
        if (el.closest('.phead')) return 'page header';
        if (el.closest('form')) return 'contact form';
        if (el.closest('.fcta')) return 'bottom CTA';
        if (el.closest('.band')) return 'CTA band';
        if (el.closest('.ct__side')) return 'contact details';
        if (el.closest('footer')) return 'footer';
        return 'page';
      };

    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var h = a.getAttribute('href') || '';
      if (h.indexOf('tel:') === 0) {
        gtag('event', 'click_to_call', { link_source: where(a), page_path: location.pathname });
      } else if (h.indexOf('wa.me') > -1) {
        gtag('event', 'click_whatsapp', { link_source: where(a), page_path: location.pathname });
      }
    }, true);

    /* The quote form does not POST anywhere - it hands off to WhatsApp - so
       there is no thank-you page to count. The submit itself is the lead,
       and it is counted whether or not they go on to press send in WhatsApp,
       which matches how the lead beacon treats it. */
    document.addEventListener('submit', function (e) {
      var f = e.target;
      if (!f || f.id !== 'quoteForm') return;
      var svc = document.getElementById('f-job');
      gtag('event', 'generate_lead', {
        form_id: 'quote_form',
        service: svc ? svc.value : '',
        page_path: location.pathname
      });
    }, true);
  }

})();
