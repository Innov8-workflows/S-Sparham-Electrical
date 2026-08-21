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
      window.location.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));
    });
  }
})();
