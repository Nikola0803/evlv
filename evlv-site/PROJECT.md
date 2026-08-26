# EVLV — Project Reference

Research-grade peptide e-commerce site. **Forked from `altr-site` on 2026-08-23** — same architecture, page
structure, components, and product logic, retargeted with the EVLV brand identity per the "EVLV Brand Identity
System" spec (full text pasted into this session; key points captured below). Next.js 16 (App Router) +
TypeScript + Tailwind v4. No backend yet — all product/content data is mocked in `src/lib/`.

**Local path:** `C:\Users\PC\Desktop\EVLV\evlv-site`
**Sibling project:** `C:\Users\PC\Desktop\EVLV\evlv-cms-plugin` — headless WordPress CMS meant to eventually feed
this frontend (see its own PROJECT.md).
**Forked from:** `C:\Users\PC\Desktop\ALTR\altr-site` — check there for git history predating the fork.
**Repo:** not yet pushed to GitHub — see "Next steps" below.
**Dev server:** `npm run dev`

## Brand — EVLV

- **Name/meaning:** EVLV = EVOLVE. Core statement: "EVOLVE. ALTER. BECOME YOUR ULTIMATE." Supporting concepts:
  Precision. Purity. Potential. Research. Transformation. Performance. Transparency. Progress.
- **Positioning:** Luxury wellness + modern biotechnology + premium research. Sits between a luxury longevity
  clinic, a high-end wellness brand, and a modern biotech company. Gender-neutral, sophisticated, calm, expensive,
  intentional.
- **Must NOT feel like:** generic supplement co, bodybuilding brand, pharma corp, feminine skincare, "biohacker
  bro", cheap peptide reseller, clinical hospital site.
- **Voice:** intelligent, calm, precise, confident, minimal, transparent. No "miracle/magic/instant/guaranteed".
  CTA language avoids aggressive ecommerce ("BUY NOW", "LIMITED TIME") — prefer "Explore Research", "View
  Compounds", "Discover EVLV".
- **RUO compliance (inherited from ALTR, still applies):** never make human-use, medical, treatment, or
  weight-loss claims.

### Logo — KNOWN GAP, needs real asset
The spec is explicit: the real EVLV wordmark has **intentional geometric cut-outs in the letterforms**
(communicating alteration/transformation) and must **not** be recreated as generic tracked-out text. The brand
kit image supplied this session only shows a flattened mockup, not a usable vector. `src/components/ui/Logo.tsx`
currently renders a **text placeholder** ("EVLV", Poppins 600, wide tracking) — this violates the spec's own
rule and must be swapped for the real logo (SVG/vector) as soon as the user provides it. Same applies to
`ProductVisual.tsx`'s inline SVG wordmark.

### Colors (`src/app/globals.css`)
Two layers: spec-exact palette, and semantic aliases components actually use. **Never hardcode a hex in a
component** — add/adjust the alias in `globals.css` instead. Full mapping table is in a comment at the top of
that file's `:root` block.

| Spec color | Hex | Alias used in components | Role |
|---|---|---|---|
| EVLV Obsidian | `#0E1113` | `charcoal` | primary dark bg/text |
| EVLV Charcoal | `#1C2224` | `sage-forest` | secondary dark |
| EVLV Deep Mineral | `#203A37` | `sage-deep` | brand green — CTAs, header/footer, hover |
| EVLV Mineral | `#314743` | `sage-light` | lighter green accent |
| EVLV Slate | `#6B7370` | `sage`, `soft-gray` | secondary text/UI/borders |
| EVLV Warm Ivory | `#D8D3C7` | `stone` | borders, product backgrounds |
| EVLV Soft Ivory | `#E7E3DA` | `ivory` | primary page background |
| EVLV Porcelain | `#F1EEE7` | `ivory-soft`, `sage-mist` | lightest panels, active/selected tint |
| EVLV Copper | `#B8875A` | `copper` | accent only — **~5% of the UI max, never a primary CTA color** |
| EVLV Copper Light/Dark | `#C9A77F` / `#8F6847` | `copper-light` / `copper-dark` | copper hover/pressed states |

Target visual balance: 35% ivory/light neutrals, 25% obsidian/charcoal, 20% deep mineral green, 15%
slate/stone, 5% copper. Section transitions should be tonal (ivory → soft ivory → stone → deep mineral →
charcoal), not hard white/black/green jumps.

### Typography
- Display/headings: **Poppins**, weights 400/500/600 only — spec explicitly says avoid heavy 700/800. All
  `font-bold` → `font-semibold` (600) site-wide as part of the fork; do not reintroduce 700+ for display text.
- Body: **Inter**, weights 400/500/600.
- No serif accent font (dropped Instrument Serif from the ALTR fork). `.font-accent` now renders in Poppins 500,
  colored copper — used for short highlighted words/phrases only (e.g. "Potential." in a headline), matching the
  spec's "copper for tiny highlights" guidance. Do not use it for full sentences/paragraphs.
- Icons: Remix Icon via CDN (unchanged from ALTR) — spec wants thin-line, geometric, minimal icons in
  obsidian/slate/deep-mineral, copper only for rare highlights.

### Design system rules (from spec)
- Border radius restrained: 4–12px (`rounded-md` etc.) — do not introduce large pill/24px+ rounded cards.
- Buttons: primary = obsidian bg / soft-ivory text, hover deep-mineral bg. Secondary = transparent bg, 1px
  obsidian border, hover deep-mineral bg + soft-ivory text. Copper is never the default CTA color. See
  `src/components/ui/Button.tsx`.
- Cards: understated — ivory/porcelain bg, thin stone border, small radius, minimal shadow.
- Motion: subtle only — slow fades, gentle reveals, soft vertical movement. No bouncing, no fast/flashy
  animation, no heavy parallax.
- No discount codes / countdown timers / fake urgency (inherited from ALTR — still applies).

## Architecture (unchanged from `altr-site`)

- `src/lib/types.ts` — `Product` type.
- `src/lib/products.ts` — mock catalog (14 SKUs carried over from ALTR). **`image` field stripped from every
  product during the fork** — see "Product photography" below for why.
- `src/lib/woocommerce.ts` — placeholder for a future real WooCommerce/WPGraphQL integration; `evlv-cms-plugin`
  is the more likely eventual backend (headless WP REST API — see its PROJECT.md).
- `src/lib/cart-context.tsx` — client-side cart state (badge count only, no real checkout yet).
- `src/components/home/*`, `src/components/product/*`, `src/components/layout/*` — same structure as ALTR.
- Pages: `/`, `/shop`, `/shop/[slug]`, `/faq`, `/contact`, `/lab-results`, `/science`, `/journal`, `/about`.

## Product photography — RESOLVED (2026-08-26)

Real EVLV-labeled product renders now exist for every SKU, sourced from `C:\Users\PC\Desktop\EVLV MEdia\products`
and copied into `public/images/products/<slug>.png`, wired via the `image` field on every `Product` in
`products.ts`. `ProductVisual.tsx` (the branded SVG placeholder) is no longer used by any live product but is
left in place as a fallback pattern for future SKUs shipped without a real photo.
- Hero/section videos (`hero-evlv.mp4`, `hero-water.mp4`, `precision-section.mp4`, etc.) are already the
  real EVLV-branded footage — `Hero.tsx`/`AboutSection.tsx` reference the EVLV files, not ALTR's.
- `public/images/science/*.jpg` (the 3 Science-section article images) are generic/non-branded and are safe to
  keep reusing.

## Known gaps / not-yet-built

Note: much of this section predates the CRM (`peptides-crm-app`) integration work — logo, product photography,
checkout, contact/newsletter forms, COAs, and footer legal links are all resolved now (see git log). Remaining
real gaps:
- **No CMS/backend for catalog data** — product/bundle/journal content is still hardcoded in `src/lib/`, not
  pulled from a real WooCommerce/WPGraphQL or CRM source. `evlv-cms-plugin` exists as a sibling project for this.
- **Affiliate form** (`src/app/affiliates/AffiliateForm.tsx`) doesn't submit anywhere yet — no state on its
  inputs, no `onSubmit` POST, just a fake "submitted" UI state. Needs the same `/api/*` + CRM proxy pattern as
  `ContactForm.tsx`.
- **Plans/membership pricing** shows "Coming soon" — member pricing tiers not finalized.
- Copy throughout (hero, trust bar, about, science, testimonials) is a first-pass EVLV rewrite of the ALTR
  original — matches the spec's tone/CTA language rules but has not been reviewed line-by-line against the full
  brand voice guidance yet.

## Common gotchas (inherited from ALTR — still apply)

- **Turbopack dev-server staleness**: `rm -rf .next` + restart dev server + fresh browser tab if you see stale
  "module not found" errors after large edits.
- **`useSearchParams()` requires a `<Suspense>` boundary** for static prerendering (already fixed in
  `src/app/shop/page.tsx` — don't regress it). Verify Vercel-affecting changes with a real `npm run build`.
- **`prefers-reduced-motion`**: most animations respect it; `.hero-spin` is a deliberate always-on exception.

## Next steps

1. Get the real EVLV vector logo from the user and wire it into `Logo.tsx` / `ProductVisual.tsx`.
2. Get real EVLV-branded product photography and hero/section video, or explicitly decide to ship with the
   SVG-placeholder catalog for launch.
3. `git init` this project (currently un-versioned — the fork copy stripped ALTR's `.git`), create a GitHub repo,
   push. Mirror the `push-to-github.bat` pattern used by `altr-site`.
4. Review full copy pass against brand voice section of the spec (avoid exaggerated claims, use the preferred
   language list).
