# steffen-athletik

Neue Website für Steffen Goller (Personaltraining, bisher www.steffen-bewegt.de),
im Stil und Aufbau von `meat_me`. Rein statisch: kein Framework, keine externen
Schriften, keine Cookies, keine Dienste Dritter.

## Dateien
- `index.html` – Startseite (Angebote, Kurse, Ablauf, Fragen, Kontakt, Partner)
- `impressum.html`, `datenschutz.html` – Rechtsseiten
- `css/styles.css` – Gestaltung (hell, ruhig, Akzentfarbe Blau `--akzent`), `js/main.js` – Navigation und Jahr
- `fonts/` – Instrument Sans, lokal eingebunden (SIL Open Font License)
- `images/` – Fotos und Logo, alles lokal

## Vor dem Livegang ausfüllen
Alle Platzhalter sind als `<span class="todo">[…]</span>` markiert (`grep -n todo *.html`):
Telefon, E-Mail, Anschrift, USt-IdNr. Außerdem den Hoster in `datenschutz.html` prüfen.

## Branches
- `main` – Produktion. Jeder Push baut ein Docker-Image (nginx) und lädt es nach
  `europe-west3-docker.pkg.dev/<GCP_PROJECT>/peak-fit-room/steffen-athletik:latest` hoch.
- `feature/staging` – Staging. Jeder Push veröffentlicht die Seite auf GitHub Pages (Branch `gh-pages`).

## Einrichtung
- Repository-Secrets: `GCP_KEY`, `GCP_PROJECT`
- GitHub Pages: Settings → Pages → Source „Deploy from a branch“ → `gh-pages`
- Hostinger: `.htaccess` (HTTPS, Sicherheits-Header, Caching)

## Lokal starten
`python3 -m http.server 4173` (siehe `.claude/launch.json`)
