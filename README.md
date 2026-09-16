[English](README.md) · [Español](README.es.md)

# Oscar Lopez · Business Intelligence Developer

Personal portfolio of a BI Developer based in Barcelona. Built as a hand-written static site: no framework, no build step, no dependencies to install.

[![Live site](https://img.shields.io/badge/live-ocr99.github.io%2Fportfolio-0F3D3E)](https://ocr99.github.io/portfolio/)
[![Deploy](https://github.com/ocr99/portfolio/actions/workflows/pages.yml/badge.svg)](https://github.com/ocr99/portfolio/actions/workflows/pages.yml)
[![License: GPL v3](https://img.shields.io/badge/license-GPLv3-blue)](LICENSE)
![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**→ [ocr99.github.io/portfolio](https://ocr99.github.io/portfolio/)**

![Portfolio preview](assets/img/Portfolio-img-1.webp)

## About

I design and develop Business Intelligence solutions that turn operational data into reliable insights, covering the full path from data transformation and modelling through KPI logic and semantic models to dashboard delivery. I work mainly with **Power BI, Domo and SQL**, with experience across Power Query, Databricks and Azure Analysis Services.

- [LinkedIn](https://www.linkedin.com/in/oscarlopezconde/)
- [Schedule a call](https://cal.com/oscarlopez/30min)
- [CV (PDF)](assets/downloads/Oscar-Lopez-CV.pdf)

## Featured projects

| Project | What it is | Stack |
|---|---|---|
| [Homelab](https://ocr99.github.io/portfolio/pages/projects/personal/homelab.html) | Self-hosted infrastructure running since 2021: virtualization, secure exposure without open ports, self-managed SSO and home automation | Proxmox VE · Docker · Caddy · Cloudflare Tunnel · LLDAP · Home Assistant |
| [El Bon Camí](https://ocr99.github.io/portfolio/pages/projects/elboncami.html) | RV rental e-commerce site with reservations, card payments and customer accounts | WordPress · WooCommerce · Elementor |
| [This portfolio](https://ocr99.github.io/portfolio/pages/projects/personal/personal-portfolio.html) | The site you are looking at, written from scratch | HTML · CSS · JavaScript · Bootstrap |

## Tech stack

Plain HTML, CSS and JavaScript. **There is deliberately no build step**: for five pages, a bundler would add more maintenance than it saves, and GitHub Pages can deploy the repository verbatim.

| Library | Version | Used for |
|---|---|---|
| [Bootstrap](https://getbootstrap.com/) | 5.2.1 | Grid and utility classes |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | 1.9.1 | Icons |
| [AOS](https://michalsnik.github.io/aos/) | 2.3.4 | Animate on scroll |
| [GLightbox](https://biati-digital.github.io/glightbox/) | 3.3.1 | Project pages in an overlay |
| [Swiper](https://swiperjs.com/) | 8.4.7 | Project screenshot sliders |

Everything loads from a CDN with an exact version and a Subresource Integrity hash. Each page only loads what it actually uses.

Styling is plain CSS with custom properties. The whole site runs on a four-colour palette declared once in `:root`:

```css
--maincolor: #100F0F;   /* background        */
--accentcolor: #0F3D3E; /* cards, nav, borders */
--textcolor: #E2DCC8;   /* body text         */
--contrastcolor: #F1F1F1; /* highlights      */
```

## Project structure

```
.
├── index.html                  Landing page
├── 404.html                    Served by Pages for unknown paths
├── robots.txt
├── sitemap.xml                 Maintained by hand
├── assets/
│   ├── styles.css              All styling
│   ├── main.js                 All behaviour
│   ├── site.webmanifest        PWA manifest
│   ├── img/                    WebP screenshots and headshot
│   ├── favicon/
│   └── downloads/              CV
├── pages/
│   ├── aboutme.html            The main page: about, stack, experience, projects, contact
│   └── projects/
│       ├── elboncami.html
│       └── personal/
│           ├── homelab.html
│           └── personal-portfolio.html
└── .github/workflows/pages.yml Deploy to GitHub Pages
```

## Running locally

Serve it over HTTP rather than opening the files directly. With `file://` the web manifest and some relative paths do not behave the same way.

The simplest option is the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code: right-click `index.html` and pick *Open with Live Server*.

If you have Python or Node available:

```bash
python -m http.server 8000   # then open http://localhost:8000
npx serve                    # or this
```

## Adding a new project

1. Copy an existing project page, for example `pages/projects/personal/homelab.html`.
2. Update its `<head>`: title, description, keywords, canonical, Open Graph tags and the JSON-LD block.
3. Check the relative depth of the asset paths and of the *Back to portfolio* link. Pages under `projects/personal/` need `../../`, pages under `projects/` need `../`.
4. Add a card to the `#portfolio` section of `pages/aboutme.html`.
5. Add a `<url>` entry to `sitemap.xml` with today's date in `<lastmod>`.

## Deployment

Pushing to `master` triggers [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which uploads the repository as-is and deploys it to GitHub Pages. There is no build stage, so what is committed is what is served.

## Implementation notes

A few things that are not obvious from reading the code:

- **Years update themselves.** Any element with `data-years-since="YYYY-MM-DD"` has its text replaced with `"N+ years"`, calculated in Madrid time. Add `data-years-exact` to drop the `+`. The years of experience on the site are never manually edited.
- **The email address is injected at runtime.** It is not in the HTML. `main.js` fills every `a.mailto` href, and writes the address as text into any nested `.mailto-text`. Anchors marked `.noTextA` keep their own markup.
- **Project pages open two ways.** From the portfolio grid they load inside a GLightbox overlay; from a search result they load standalone. That is why the *Back to portfolio* link uses `target="_top"`, so it escapes the overlay instead of navigating inside it.
- **`sitemap.xml` is manual.** Bump the relevant `<lastmod>` when you change a page.
- **Some CSS looks unused and is not.** The rules for `.resume .mycv` and `.resume .modal` style the CV button and modal, whose markup is currently commented out in `pages/aboutme.html`. They are kept so uncommenting it restores a working modal.

## License

[GNU GPL v3](LICENSE)
