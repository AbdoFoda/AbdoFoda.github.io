# Developer Portfolio Template

A fork-friendly, single-page portfolio for GitHub Pages. Static HTML, Tailwind CSS, vanilla JS — no build step, no framework lock-in.

**Live demo:** [abdofoda.github.io](https://abdofoda.github.io) (iOS engineer example)

[![Deploy GitHub Pages](https://github.com/AbdoFoda/AbdoFoda.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/AbdoFoda/AbdoFoda.github.io/actions/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## Features

- **Single-page layout** — Hero, About, Experience, Projects, Skills, Contact
- **Dark theme** — Emerald accent, responsive, mobile nav
- **Featured project cards** — Screenshot previews with fitted device frames
- **Private contact form** — Email stored as a GitHub secret, never in the repo
- **GitHub Actions deploy** — Push to `main`, site updates automatically
- **Zero build tooling** — Edit HTML and push

---

## Quick start

### 1. Create your repo

Click **Use this template** (or fork), then rename the repository to:

```text
YOUR-GITHUB-USERNAME.github.io
```

GitHub Pages will serve it at `https://YOUR-GITHUB-USERNAME.github.io`.

> Repo name must match your username exactly for the default `*.github.io` URL.

### 2. Enable GitHub Pages

1. **Settings → Pages**
2. **Build and deployment → Source:** GitHub Actions

### 3. Set up the contact form (optional)

1. **Settings → Secrets and variables → Actions → New repository secret**
2. Name: `CONTACT_EMAIL`
3. Value: your email address

The deploy workflow injects this at build time. Your email never appears in the public code.

On the **first** form submission, [Formsubmit](https://formsubmit.co) sends an activation link — click it once.

### 4. Customize content

Edit [`index.html`](index.html) with your name, experience, projects, and links. See [What to customize](#what-to-customize) below.

### 5. Deploy

```bash
git add .
git commit -m "Personalize portfolio"
git push origin main
```

The workflow in [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes the site.

---

## Local preview

```bash
python3 -m http.server 8080
# http://localhost:8080
```

The contact form only works after deploy with the `CONTACT_EMAIL` secret set.

---

## What to customize

All content lives in **`index.html`**. Search for these sections:

| Section | HTML comment / `id` | What to change |
|---------|---------------------|----------------|
| Meta & title | `<head>` | `description`, `og:*`, `<title>`, favicon initials |
| Hero | `#home` | Name, role, tagline, avatar URL, social links |
| About | `#about` | Bio paragraphs, stat cards |
| Experience | `#experience` | Timeline entries (company, role, dates, bullets) |
| Projects | `#projects` | Featured cards + grid (titles, screenshots, tags, GitHub URLs) |
| Skills | `#skills` | Skill pills |
| Contact | `#contact` | Form labels only — delivery email is the GitHub secret |
| Footer | `<footer>` | Copyright name, social links |

Optional reference config: [`assets/site.config.example.js`](assets/site.config.example.js) lists common fields. You can wire it up yourself or ignore it and edit HTML directly.

### Projects with screenshots

Featured cards use a fixed preview frame (`.project-preview`). Put screenshot URLs in `<img src="...">` — raw GitHub URLs work:

```text
https://raw.githubusercontent.com/USER/REPO/BRANCH/path/to/screenshot.png
```

### Colors & fonts

Tailwind config is inline in `index.html` (`accent`, `accent2`, `surface`). Font imports are in `<head>`.

---

## Optional: custom domain

### GitHub Pages custom domain

1. **Settings → Pages → Custom domain** → e.g. `www.yourdomain.com`
2. Add the DNS records your registrar requires (usually `CNAME` to `USERNAME.github.io`)

### Free `*.is-a.dev` subdomain

Community subdomains like `yourname.is-a.dev` point to your GitHub Pages site via CNAME. See [is-a.dev docs](https://docs.is-a.dev/guides/github-pages/).

---

## Optional: GitHub profile README

This template is the **website**. For the README shown on your GitHub profile, create a separate repo named **`YOUR-USERNAME/YOUR-USERNAME`** (same as username) with a root `README.md`.

Example profile README repo: [AbdoFoda/AbdoFoda](https://github.com/AbdoFoda/AbdoFoda)

---

## Project structure

```text
.
├── index.html              # Page content and styles
├── assets/
│   ├── main.js             # Nav, scroll reveal, contact form
│   └── site.config.example.js
├── .github/workflows/
│   └── deploy-pages.yml    # GitHub Pages deploy + email injection
├── .nojekyll               # Skip Jekyll processing
└── LICENSE
```

---

## FAQ

**Do I need Node.js?**  
No. Tailwind is loaded from CDN in `index.html`.

**Can I use this with a project repo name (not `username.github.io`)?**  
Yes. The site will be at `https://USERNAME.github.io/REPO-NAME/` instead. Update internal links if you use absolute paths.

**Is the contact form required?**  
No. Without `CONTACT_EMAIL`, the form shows a short error. Remove the `#contact` section if you do not need it.

**Can I deploy without GitHub Actions?**  
Yes. Remove the workflow and enable **Deploy from branch → main / root** in Pages settings. You will need another way to keep your email out of the repo if you use the contact form.

---

## Credits

Demo content in this repo belongs to [Abdelrahman Fouda](https://github.com/AbdoFoda).  
Replace it with your own when you fork.

If this template helped you, a star on the repo is appreciated.

---

## License

[MIT](LICENSE) — free to fork, modify, and use for personal or commercial portfolios. Attribution welcome but not required.
