# EVLV

Monorepo for the EVLV brand — luxury wellness / modern biotech peptide research storefront (fork of the ALTR
project). Two independent projects, each with its own install/run lifecycle:

- **`evlv-site/`** — Next.js 16 storefront. See `evlv-site/PROJECT.md`. `cd evlv-site && npm install && npm run dev`
- **`evlv-cms-plugin/`** — headless WordPress CMS plugin, meant to eventually feed `evlv-site` over REST. See
  `evlv-cms-plugin/PROJECT.md`. Not yet activated on a real WordPress install.

Both were copied over from the ALTR project on 2026-08-23 and retargeted with the EVLV brand identity. See each
subproject's `PROJECT.md` for what's genuinely EVLV-ready versus what's still a placeholder inherited from ALTR
(most notably: the logo is a styled-text stand-in for the real vector wordmark, and some product photography/video
is still ALTR-branded — both flagged as launch blockers in `evlv-site/PROJECT.md`).
