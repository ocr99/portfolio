[English](README.md) · [Español](README.es.md)

# Portfolio web de Oscar Lopez

Mi portfolio personal, hecho como página estática solo con HTML, CSS y JS. Sin framework, sin build step y sin dependencias que instalar.

[![Sitio en vivo](https://img.shields.io/badge/live-ocr99.github.io%2Fportfolio-0F3D3E)](https://ocr99.github.io/portfolio/)
[![Deploy](https://github.com/ocr99/portfolio/actions/workflows/pages.yml/badge.svg)](https://github.com/ocr99/portfolio/actions/workflows/pages.yml)
[![Licencia: GPL v3](https://img.shields.io/badge/license-GPLv3-blue)](LICENSE)
![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**→ [ocr99.github.io/portfolio](https://ocr99.github.io/portfolio/)**

![Vista previa del portfolio](assets/img/portfolio-img-1.webp)

## Sobre mí

Soy Business Intelligence Developer en Barcelona. Monto soluciones de reporting de principio a fin, desde la transformación y el modelado de datos hasta la lógica de KPIs y el dashboard final, sobre todo con **Power BI, Domo y SQL**.

- [LinkedIn](https://www.linkedin.com/in/oscarlopezconde/)
- [Agendar una llamada](https://cal.com/oscarlopez/30min)
- CV: [English](https://rxresu.me/oscarlopez/cv-english) · [Español](https://rxresu.me/oscarlopez/cv-espanol)

## Portfolio

### Homelab
> Infraestructura self-hosted que llevo desde 2021, con `Proxmox VE`, `Docker`, `Caddy`, `Cloudflare Tunnel`, `LLDAP` y `Home Assistant`
- [Homelab](https://ocr99.github.io/portfolio/pages/projects/personal/homelab.html)

### El Bon Camí
> Web de alquiler de autocaravanas creada con `WordPress`, `Woocommerce` y `Elementor`
- [El Bon Camí](https://www.elboncami.com/)

### El propio portfolio
> Web para enseñar el currículum online
- [Personal Web Portfolio](https://ocr99.github.io/portfolio/)

## Stack técnico

> Lenguajes usados: `HTML`, `CSS` y `JavaScript`

| Librería | Versión | Para qué |
|---|---|---|
| Bootstrap | 5.2.1 | Grid y clases de utilidad |
| Bootstrap Icons | 1.9.1 | Iconos |
| AOS | 2.3.4 | Animaciones al hacer scroll |
| GLightbox | 3.3.1 | Páginas de proyecto en overlay |
| Swiper | 8.4.7 | Sliders de capturas |

Todo se carga por CDN, con la versión fijada y su hash SRI. Cada página solo pide lo que usa de verdad.

Los estilos son CSS plano con custom properties. Toda la web funciona con cuatro colores:

```css
--maincolor: #100F0F;     /* fondo                 */
--accentcolor: #0F3D3E;   /* tarjetas, nav, bordes */
--textcolor: #E2DCC8;     /* texto                 */
--contrastcolor: #F1F1F1; /* resaltados            */
```

## Estructura

```
.
├── index.html                  Portada
├── 404.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── styles.css              Todos los estilos
│   ├── main.js                 Todo el comportamiento
│   ├── site.webmanifest
│   ├── img/                    Capturas y retrato en WebP
│   ├── favicon/
│   └── downloads/              El CV en los dos idiomas
├── pages/
│   ├── aboutme.html            La principal: sobre mí, stack, experiencia, proyectos, contacto
│   └── projects/
│       ├── elboncami.html
│       └── personal/
│           ├── homelab.html
│           └── personal-portfolio.html
└── .github/workflows/pages.yml
```

## Despliegue

Push a `master` y [el workflow](.github/workflows/pages.yml) sube el repo tal cual a GitHub Pages. No se compila nada, así que lo que commiteo es lo que se sirve.

## Licencia

[GNU GPL v3](LICENSE)
