# abdofoda.github.io

Personal site for [Abdelrahman Fouda](https://github.com/AbdoFoda).

**Live:** https://abdofoda.github.io

## Stack

Static HTML, Tailwind CSS (CDN), vanilla JS. Deployed with GitHub Actions to GitHub Pages.

## Local preview

```bash
python3 -m http.server 8080
```

Open http://localhost:8080. The contact form needs a deploy with the `CONTACT_EMAIL` secret to work locally.

## Contact form

Submissions go through [Formsubmit](https://formsubmit.co). The recipient address is stored as a repo secret and injected at deploy time — it is not committed to the repo.

1. Add secret `CONTACT_EMAIL` in repo settings (Settings → Secrets → Actions)
2. Push to `main` — the workflow in `.github/workflows/deploy-pages.yml` handles the rest
3. On first real submission, Formsubmit sends an activation email — click the link once

## Deploy

Pushes to `main` trigger the GitHub Actions workflow. Pages source must be set to **GitHub Actions** (already configured for this repo).
