# strategysoul.github.io — v2.0

A static HTML rebuild of StrategySoul in a dark-editorial design system.
No framework, no build step: every page is plain HTML served as-is.

## Structure

```
index.html                     home
about/                         long-form bio
contact/                       hiring + contact
strategy-breakdowns/           breakdowns index
strategy-breakdowns/<slug>/    individual breakdowns
<project-slug>/                case studies
assets/css/site.css            the whole design system
assets/js/site.js              cursor, nav, reveals, reading progress
assets/img/                    images (carried over unchanged)
```

Every URL from the previous Next.js site is preserved, so no existing link breaks.

## Design system

Defined once in `assets/css/site.css` as custom properties:

| Token | Value | Role |
|---|---|---|
| `--ink` | `#1C1D20` | body text, nav + footer ground |
| `--ink-deep` | `#141517` | deepest ground |
| `--paper` | `#FFFFFF` | page ground |
| `--accent` | `#455CE9` | cursor bubble, links, hover states |
| `--sand` | `#E0D9D1` | warm neutral |

Type is Archivo (Google Fonts) at 300/500/800 throughout.

## Editing

- **Content** lives directly in the HTML — edit the file for the page.
- **Design** changes go in `assets/css/site.css`; every page picks them up.
- **Behaviour** is in `assets/js/site.js` — dependency-free, roughly 150 lines.

## Deploying

`.github/workflows/deploy.yml` publishes to GitHub Pages on push to `main`.
It uploads the repo as-is (no `npm ci`, no `next build`).

> Note: while this lives on the `version2.0` branch it does **not** deploy —
> the workflow only triggers on `main`.
