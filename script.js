/* Mex Gas Supply — Propuesta de rediseño */
(function () {
  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navList.classList.toggle('open');
    });
    navList.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { toggle.classList.remove('open'); navList.classList.remove('open'); });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('in'); }); }

  // Contador animado de métricas
  var metricNums = document.querySelectorAll('.count');
  if ('IntersectionObserver' in window && metricNums.length) {
    var animated = new WeakSet();
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !animated.has(e.target)) {
          animated.add(e.target);
          var target = parseFloat(e.target.dataset.target);
          var suffix = e.target.dataset.suffix || '';
          var dec = (target % 1 !== 0) ? 1 : 0;
          var start = null, dur = 1400;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var v = (target * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3))));
            e.target.textContent = v.toFixed(dec) + suffix;
            if (p < 1) requestAnimationFrame(step);
            else e.target.textContent = target.toFixed(dec) + suffix;
          }
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    metricNums.forEach(function (el) { co.observe(el); });
  }

  // Form
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = document.getElementById('formSuccess');
      if (ok) { ok.classList.add('show'); ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      form.reset();
    });
  }

  // Año dinámico
  document.querySelectorAll('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
