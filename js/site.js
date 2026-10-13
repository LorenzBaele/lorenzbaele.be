/* Spotlight in de hero: volgt de muis en dooft uit zodra de muis de hero verlaat.
   Alleen op toestellen met een muis; op gsm en tablet blijft hij uit. */
(function () {
  'use strict';

  function init() {
    var hero = document.getElementById('hero');
    if (!hero || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var frame = 0;
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = Math.round(e.clientX - r.left);
      var y = Math.round(e.clientY - r.top);
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () {
        hero.style.setProperty('--lx', x + 'px');
        hero.style.setProperty('--ly', y + 'px');
        hero.classList.add('is-lit');
      });
    });

    hero.addEventListener('mouseleave', function () {
      if (frame) cancelAnimationFrame(frame);
      hero.classList.remove('is-lit');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
