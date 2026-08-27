# Self-Serve Affiliate Portal — CRM/CMS Requirements

Spec for turning `/affiliates` from a hand-reviewed application form into a real account system:
apply → (manual approval, unchanged) → sign in → see your standing (clicks, sales, commission).
Storefront side is built and described at the bottom; everything else lives in `peptides-crm-app`.

## Important: don't reuse `vp-affiliate-portal`'s backend

The reference the affiliate registration fields were modeled on
(`C:\Users\PC\Desktop\Vint and MSV\vp-affiliate-portal`) is a **different company's**
infrastructure — a shared login/dashboard for Vintage Vitality Group's storefronts (Vintage
Peptides, My Secret Vitality, Liberty Peptides), talking to a shared WordPress `vp-affiliates`
plugin those specific sites run. Only the **field list and dashboard UX shape** were used as a
reference here — none of its code, API contract, or WordPress backend should ever be pointed at
from EVLV. EVLV is headless (`peptides-crm-app`), not WordPress, and mixing an unrelated
company's affiliate data into/out of EVLV's would be a real data-boundary mistake. Build EVLV's
version against `peptides-crm-app`'s own `Affiliate` model (already exists, see below).

## Current state (grounded in the real schema/code, 2026-08-26)

`peptides-crm-app`'s `Affiliate` model already exists but is **admin-created only** — no email,
password, or self-serve anything:

```prisma
model Affiliate {
  id             String       @id @default(cuid())
  organizationId String
  name        String
  slug        String
  ratePercent Float
  couponCode  String
  attributions AffiliateOrderAttribution[]
  createdAt    DateTime @default(now())
}

model AffiliateOrderAttribution {
  id            String    @id @default(cuid())
  affiliateId   String
  orderId       String    @unique
  commissionCents Int
}
```

`order-engine.ts`'s checkout flow already resolves `affiliateRef`/`couponCode` against
`Affiliate.couponCode`/`slug` and writes `AffiliateOrderAttribution` with the correct commission
— **the attribution and commission math already work end-to-end**. What's missing is entirely on
the "affiliate manages their own account" side: no login, no dashboard data, no click tracking.

## Schema changes needed

```prisma
model Affiliate {
  // ...existing fields...
  email          String?  @unique
  passwordHash   String?
  username       String?
  firstName      String?
  lastName       String?
  phone          String?
  socialLink     String?
  address        String?
  city           String?
  province       String?
  postalCode     String?
  country        String?
  referredBy     String?
  status         AffiliateStatus @default(PENDING)
  clicks         AffiliateClick[]
}

enum AffiliateStatus {
  PENDING    // applied, awaiting manual review — matches the site's existing
             // "we review every application by hand" copy, don't change that UX
  APPROVED
  REJECTED
}

model AffiliateClick {
  id          String   @id @default(cuid())
  affiliate   Affiliate @relation(fields: [affiliateId], references: [id], onDelete: Cascade)
  affiliateId String
  createdAt   DateTime @default(now())
}
```

`AffiliateClick` is deliberately minimal (just a timestamp row) — enough to compute
`clicks_30d`/`clicks_total` by counting, without needing IP/UA tracking this program doesn't need.

## API endpoints needed (`/api/store/affiliate/*`)

All three already have a working proxy on the storefront side (`evlv-site/src/app/api/affiliate/*`)
sending exactly this shape — they currently 503 because these CRM routes don't exist yet:

- **`POST /api/store/affiliate/register`** `{ username, firstName, lastName, email, password,
  referredBy?, socialLink, phone, address, postalCode, city, province, country }` → creates an
  `Affiliate` row with `status: PENDING`, a generated `slug`/`couponCode` (same short-readable-slug
  approach as `REFERRAL-PROGRAM.md` recommends for `Customer.referralCode`). Returns a normal
  "application received" response — **does not log them in**, since pending applicants can't earn
  yet (matches the existing "reviewed within a couple of business days" copy).
- **`POST /api/store/affiliate/login`** `{ email, password }` → only succeeds for
  `status: APPROVED`. A `PENDING` affiliate should get a clear "still under review" error, not a
  generic invalid-credentials message. Returns `{ token, email, name, affiliate_id, referralCode }`
  — the storefront's `saveAffiliateAuth()` expects exactly this shape.
- **`POST /api/store/affiliate/dashboard`** `{ token }` → resolves the affiliate from the token
  server-side, returns:
  ```json
  {
    "clicks30d": 0, "clicksTotal": 0,
    "salesConfirmed": 0, "salesPending": 0,
    "commissionAvailableCents": 0, "commissionPendingCents": 0
  }
  ```
  (field names must match exactly — `evlv-site/src/app/affiliates/dashboard/page.tsx` reads these.)
  `salesConfirmed`/`commissionAvailableCents` = sum of `AffiliateOrderAttribution` joined to
  `COMPLETED` orders; `salesPending`/`commissionPendingCents` = same joined to `PENDING` orders.
- **New:** something needs to write an `AffiliateClick` row when `?ref=CODE` matches a real
  `Affiliate.slug` — the storefront's `ReferralCapture.tsx` already fires on every landing page
  with `?ref=`, but today it only writes to `localStorage`, nothing hits the CRM. Cheapest fix:
  have `ReferralCapture` fire a fire-and-forget `POST /api/store/affiliate/click` when it captures
  a code (don't block/await it, a dropped click shouldn't affect page load).

## Open questions before this gets built

1. **Approval notification** — does an approved applicant get an email telling them they can now
   log in? (Same "no transactional email infra exists yet" gap as `REFERRAL-PROGRAM.md` flags —
   one email provider decision covers both features.)
2. **Payout mechanics** — `vp-affiliate-portal`'s reference has a full payout-request flow
   (method, destination, minimum threshold). Worth building now, or manual payouts (like the
   store's own Zelle/CashApp/Venmo checkout) until volume justifies automating it?
3. **Materials page** — the reference also has a banners/marketing-assets page for affiliates.
   Lower priority; flagging so it's a conscious "not yet" rather than an oversight.

## Storefront side — already built, ready today

- `src/lib/affiliate-auth.ts` — separate session storage from the regular customer login
  (`evlv_aff_token`/`evlv_aff_user`, distinct keys) — an affiliate account and a shopper account
  are different identities, someone could have both.
- `src/app/affiliates/AffiliateForm.tsx` — full registration form matching the competitor
  reference's field set (username, first/last name, email + confirm, password, referred-by,
  social link, phone, full address, ToS checkbox), posting to `/api/affiliate/register`.
- `src/app/affiliates/login/page.tsx` — real sign-in form, posting to `/api/affiliate/login`.
- `src/app/affiliates/dashboard/page.tsx` — gated on a stored session; fetches
  `/api/affiliate/dashboard` and renders real numbers only (clicks, confirmed/pending sales,
  available/pending commission, referral link with copy button) — no fabricated data, matches
  this codebase's established "honest empty state" convention. Shows a clear sign-in prompt when
  logged out, and a clear "not available yet" message (not a crash) while the CRM endpoints above
  don't exist.
- `src/app/api/affiliate/{register,login,dashboard}/route.ts` — proxy routes already wired to the
  exact CRM contract above, 503-ing gracefully today.
- "Affiliates" added to the main nav (`Header.tsx`), not just the footer.
