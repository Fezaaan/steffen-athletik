/* Steffen Goller – Interaktion
   Jahr im Fuß, Navigation beim Scrollen. Läuft auch auf den Rechtsseiten (alles mit Null-Checks). */
(function () {
  "use strict";

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
})();
