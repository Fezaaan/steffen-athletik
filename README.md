# steffen-athletik

Statische Website, aufgebaut wie `meat_me`.

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
