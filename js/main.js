/* Steffen Goller – Interaktion
   Jahr im Fuß, Navigation beim Scrollen, Anfrage in fünf Schritten. Läuft auch auf den Rechtsseiten (alles mit Null-Checks). */
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

  /* ---------- Anfrage in fünf Schritten ----------
     Die Angaben bleiben im Browser. Am Ende wird daraus eine E-Mail gebaut,
     die sich im E-Mail-Programm des Besuchers öffnet (mailto). Empfänger: data-email am Formular. */
  var form = document.getElementById("anfrage");
  if (form) {
    var steps = form.querySelectorAll(".f-schritt");
    var stand = document.getElementById("anfrage-stand");
    var balken = document.getElementById("anfrage-balken");
    var fehler = document.getElementById("anfrage-fehler");
    var zurueck = document.getElementById("anfrage-zurueck");
    var weiter = document.getElementById("anfrage-weiter");
    var fuss = weiter.parentNode;
    var fertig = document.getElementById("anfrage-fertig");
    var fertigText = document.getElementById("anfrage-fertig-text");
    var zusammenfassung = document.getElementById("anfrage-zusammenfassung");
    var kopieren = document.getElementById("anfrage-kopieren");
    var empfaenger = (form.getAttribute("data-email") || "").trim();
    var cur = 0;

    form.classList.add("js");

    var val = function (name) {
      var e = form.elements[name];
      return e && typeof e.value === "string" ? e.value.trim() : "";
    };
    var checked = function (name) {
      return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]:checked'))
        .map(function (i) { return i.value; });
    };
    var setError = function (msg) {
      fehler.textContent = msg || "";
      fehler.hidden = !msg;
    };

    var show = function (i, focus) {
      cur = i;
      for (var n = 0; n < steps.length; n++) steps[n].hidden = n !== i;
      stand.textContent = "Schritt " + (i + 1) + " von " + steps.length;
      balken.style.width = ((i + 1) / steps.length * 100) + "%";
      zurueck.hidden = i === 0;
      weiter.textContent = i === steps.length - 1 ? "Anfrage senden" : "Weiter";
      fuss.hidden = false;
      fertig.hidden = true;
      setError("");
      if (focus) steps[i].querySelector("legend").focus();
    };

    var validate = function (i) {
      if (i === 0 && !checked("Interesse").length) return "Bitte wählen Sie mindestens ein Angebot aus.";
      if (i === steps.length - 1) {
        var mail = val("E-Mail");
        if (!val("Name")) return "Bitte geben Sie Ihren Namen an.";
        if (!mail && !val("Telefon")) return "Bitte geben Sie eine E-Mail-Adresse oder eine Telefonnummer an.";
        if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return "Bitte prüfen Sie Ihre E-Mail-Adresse.";
      }
      return "";
    };

    var buildText = function () {
      var lines = ["Anfrage Probetraining", ""];
      var add = function (label, value) { if (value) lines.push(label + ": " + value); };
      add("Interesse", checked("Interesse").join(", "));
      add("Schwerpunkt", checked("Schwerpunkt").concat(val("Eigener Schwerpunkt") || []).join(", "));
      add("Trainingsort", checked("Trainingsort").join(", "));
      add("Wohnort", val("Wohnort"));
      if (val("Nachricht")) lines.push("", "Nachricht:", val("Nachricht"));
      lines.push("");
      add("Name", val("Name"));
      add("E-Mail", val("E-Mail"));
      add("Telefon", val("Telefon"));
      return lines.join("\n");
    };

    var finish = function () {
      var text = buildText();
      setError("");
      for (var n = 0; n < steps.length; n++) steps[n].hidden = true;
      fuss.hidden = true;
      stand.textContent = "Fertig";
      balken.style.width = "100%";
      zusammenfassung.textContent = text;
      fertigText.textContent = empfaenger
        ? "Ihr E-Mail-Programm öffnet sich mit dem folgenden Text. Bitte dort nur noch auf Senden klicken. Falls sich nichts öffnet, kopieren Sie den Text und schicken ihn an " + empfaenger + "."
        : "Bitte kopieren Sie den folgenden Text und schicken Sie ihn per E-Mail.";
      kopieren.textContent = "Text kopieren";
      fertig.hidden = false;
      fertig.focus();
      if (empfaenger) {
        window.location.href = "mailto:" + empfaenger +
          "?subject=" + encodeURIComponent("Anfrage Probetraining – " + val("Name")) +
          "&body=" + encodeURIComponent(text);
      }
    };

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var msg = validate(cur);
      if (msg) { setError(msg); return; }
      if (cur < steps.length - 1) show(cur + 1, true); else finish();
    });
    form.addEventListener("input", function () { setError(""); });
    zurueck.addEventListener("click", function () { if (cur > 0) show(cur - 1, true); });
    document.getElementById("anfrage-aendern").addEventListener("click", function () { show(steps.length - 1, true); });
    kopieren.addEventListener("click", function () {
      var text = zusammenfassung.textContent;
      var done = function () { kopieren.textContent = "Kopiert"; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var r = document.createRange(); r.selectNodeContents(zusammenfassung);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        try { if (document.execCommand("copy")) done(); } catch (e) {}
      }
    });

    show(0, false);
  }
})();
