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
assets/js/site.js              mobile nav, scroll reveals
assets/img/                    images (carried over unchanged)
```

Every URL from the previous Next.js site is preserved, so no existing link breaks.

## Design system

Defined once in `assets/css/site.css` as custom properties, with a dark
palette under `prefers-color-scheme: dark`.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#F5F6F8` | `#0C0E12` | page ground |
| `--ink` | `#0F1115` | `#ECEEF2` | text |
| `--muted` | `#596070` | `#9AA1AE` | secondary text |
| `--accent` | `#3D52E0` | `#8391FF` | the one accent: links, tags, key numbers |

Type is Geist, with Geist Mono for numbers and labels. Buttons are pills;
cards and media use a 16px radius.

Missing media is shown as a dashed `.ph` placeholder box. Search the HTML for
`TODO(owner)` to find every image, video, logo or file still to add.

## Editing

- **Content** lives directly in the HTML — edit the file for the page.
- **Design** changes go in `assets/css/site.css`; every page picks them up.
- **Behaviour** is in `assets/js/site.js` — dependency-free, about 35 lines.

## Deploying

`.github/workflows/deploy.yml` publishes to GitHub Pages on push to `main`.
It uploads the repo as-is (no `npm ci`, no `next build`).

> Note: while this lives on the `version2.0` branch it does **not** deploy —
> the workflow only triggers on `main`.
