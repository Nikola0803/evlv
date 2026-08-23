# EVLV CMS Plugin — Project Reference

Headless WordPress CMS plugin, originally built for the **ALTR** storefront and copied here on 2026-08-23 as the
starting point for the **EVLV** brand's CMS, alongside the sibling `evlv-site` frontend fork. Not a theme — it
registers custom post types, admin UI, and a REST API for a Next.js frontend to consume.

**Local path:** `C:\Users\PC\Desktop\EVLV\evlv-cms-plugin`
**Plugin slug / internal prefix:** still `altr-cms` / `altr_` — **not yet rebranded**. All function names,
post-meta keys, and admin-menu slugs are prefixed `altr_`/`ALTR_CMS_` (internal-only, not shown to end users),
and the seeded product data in `includes/importer-data.php` is still the 14 real ALTR SKUs with ALTR image
paths/branding. Decide with the user whether to: (a) rename the internal prefix to `evlv_` for consistency, or
(b) leave it as an internal implementation detail since it's never user-facing — then update
`includes/importer-data.php` and `includes/content-schema.php` to seed real EVLV copy/products once available.
**Original/upstream copy:** `C:\Users\PC\Desktop\ALTR\altr-cms-plugin` — may have diverged since the fork; diff
before assuming feature parity.
**Related project:** `C:\Users\PC\Desktop\EVLV\evlv-site` — the Next.js frontend this plugin is meant to serve

## Why this is its own repo

This plugin started life inside the same working session as `altr-site` but is a fully independent codebase
(PHP, WordPress plugin architecture) with its own install/activation lifecycle and its own deploy target (a
WordPress install, not Vercel). Splitting it out keeps its git history, issues, and versioning separate from
the frontend.

## What it does

Single source of truth for every piece of ALTR storefront content — products, lab results (COAs), page
copy/images, and marketing popups — exposed over a REST API for the Next.js frontend to consume headlessly.

### Custom Post Types (`includes/post-types.php`)
- `altr_product` — full field parity with the frontend's `Product` TypeScript type (see meta-boxes-product.php
  for the exact field list: slug, sku, category, image, price, bulk pricing, purity, avg mass, rating, review
  count, stock, descriptions, storage, reconstitution, badges, batch code/date/status).
- `altr_coa` — Certificate of Analysis entries for the Lab Results page. Independent of products so batches can
  be added/edited/removed freely; each links to a product via a dropdown.
- `altr_content` — one post per frontend page/section, holding a flexible key/value field array
  (`includes/content-schema.php` defines the schema and default seed values — pre-populated on activation).
- `altr_popup` — marketing popups/offers. Off by default; admin opts each one in with trigger rules
  (page-load / exit-intent / timed / scroll), targeting, and scheduling.

### Admin UI (`includes/admin-menu.php`)
Top-level "ALTR CMS" menu → Setup & Import dashboard (shows content/product/COA/popup counts, one-click
"Import Products Now" button, REST endpoint reference) + submenus for Products / Lab Results / Site Content /
Popups & Offers, each using WP's native post-list UI.

### REST API (`includes/rest-api.php`)
Public, unauthenticated GET endpoints under `altr/v1` (same trust model as a public WooCommerce store feed):
- `GET /products` — full catalog
- `GET /products/{slug}` — one product
- `GET /coas` — all lab results
- `GET /content` — every page's content fields
- `GET /content/{page-key}` — one page's content
- `GET /popups/active` — currently active popups only

### Importer (`includes/importer-data.php`, `includes/importer.php`)
Hardcoded seed array mirroring the 14 real, live products from `altr-site`'s `src/lib/products.ts` at the time
of the fork. Import is idempotent — re-running skips any slug that already exists. Triggered from the Setup page
via `admin-post.php?action=altr_cms_import_products`.

## Known gaps / not yet done

- **Never activated on a real WordPress install** — written and hand-reviewed for syntax, but no `php -l` or
  live activation test has been run yet (no PHP binary in the dev sandbox). Test activation on a real WP install
  before relying on it.
- **No auth on write actions beyond WP's own admin capability checks** — fine for an admin-only CMS, but if any
  endpoint ever needs to accept writes from the Next.js frontend directly, add a proper auth layer (application
  passwords / JWT) first.
- **`altr-site` is not yet wired to consume this API** — it still reads from hardcoded mock data in
  `src/lib/products.ts` / `src/lib/content.ts`. Swapping that over is the next integration step once this plugin
  is verified live.
- **Importer data is a point-in-time snapshot** — if the live catalog in `altr-site` changes, `importer-data.php`
  needs to be updated to match, or the two will drift.
- No image/media migration — the importer just references the same `/images/products/*.jpg` paths the frontend
  already uses; it does not upload the actual image files into the WP media library.

## Conventions

- Every custom field is prefixed `_altr_` in `postmeta` to avoid collisions with other plugins/themes.
- All CPTs are `public => false`, `show_in_rest => false` — deliberately not exposed via WP's default REST
  routes; only the hand-built `altr/v1` namespace is public, so response shape is fully controlled.
- Nonces + `current_user_can()` checks on every save handler and the importer action.
