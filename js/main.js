/* Steffen Goller – Interaktion
   Jahr im Fuß, Navigation beim Scrollen, Reveal-Effekt. Läuft auch auf den Rechtsseiten (alles mit Null-Checks). */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Jahr im Fuß ---------- */
  var year = document.getElementById("footYear");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Navigation: beim Scrollen eine Tonstufe heller ---------- */
  var nav = document.getElementById("nav");
  if (nav) {
    var onNav = function () { nav.classList.toggle("scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", onNav, { passive: true });
    onNav();
  }

  /* ---------- Reveal beim Scrollen ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (r) { ro.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }
})();
