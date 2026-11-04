# EVLV (a tagadaRX telehealth service) – US Telehealth

## 1. Project Description
Marketing site for EVLV, a US telehealth service operated by tagadaRX, focused on women's health nationwide — weight and metabolic health, skin care, hair growth, and lab testing. Warm, premium visual identity: deep espresso, amber, champagne gold, ivory, porcelain — with a translucent "warm glass" card system.

Product line: three weight protocols named by class — GLP-1 (semaglutide), GLP-2 (tirzepatide), GLP-3 (retatrutide) — plus a peptides category (BPC-157, CJC-1295 + Ipamorelin, Thymosin Alpha-1), alongside minoxidil, tretinoin and the baseline lab panel.

Art direction: lifestyle photography throughout features plus-size women, so body diversity is treated as the core of the brand rather than an afterthought.

Brand assets: EVLV wordmark in dark (light backgrounds) and white (dark backgrounds) variants, rendered through `src/components/feature/Logo.tsx`.

## 2. Page Structure
- `/` - Home
- `/treatments` - All treatments, filterable by category (`?category=weight-loss|peptides|hair-growth|skin-care|labs`)
- `/treatments/:slug` - Treatment detail (data-driven from `src/mocks/catalog.ts`)
- `/shop` - Research vial catalogue with filters, search and sorting (`?category=metabolic|peptides|blends|longevity`)
- `/shop/:slug` - Single product page for each vial (data-driven from `src/mocks/shop.ts`)
- `/products/:slug` - Alias of the product detail page
- `/about` - About EVLV, who care is for, how it works, tagadaRX relationship
- `/faq` - Full FAQ with support panel
- `/contact` - Contact / assessment request form (built-in form)
- `/legal/:slug` - Terms of Service (`terms`) and Privacy Policy (`privacy`)
- `*` - Not found

All navigation is internal (react-router `Link` / `SmartLink`); no external clinic links remain.

## 3. Core Features
- [x] Home page with all key sections
- [x] EVLV rebrand (logo, copy, metadata)
- [x] Treatment catalog + detail pages
- [x] Research vial catalogue + per-product pages (AUD per-piece pricing)
- [x] About / FAQs / Contact pages
- [x] Legal pages (Terms, Privacy)
- [x] Newsletter signup (built-in form)
- [x] Contact / assessment request form (built-in form)
- [ ] Patient portal login (needs auth backend)

## 4. Backend / Third-party Integration Plan
- Database: not connected (static content + Readdy built-in forms)
- Auth: not connected. A patient login/portal requires Readdy Backend or SaaS Supabase authentication.

## 5. Development Phase Plan
### Phase 1: Home page (done)
### Phase 2: Treatment catalog + detail pages (done)
### Phase 3: About, FAQs, Contact, legal pages (done)
### Phase 4: Women's health programme pages, patient portal, app experience