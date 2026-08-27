# Self-Serve Affiliate Portal — CRM/CMS Build Ticket

Full spec for making `/affiliates` on the storefront (evlv-site) actually work end-to-end:
apply → manual approval → sign in → see standing (clicks, sales, commission) → set payout method
(Venmo / Zelle / Cash App / US bank ACH) → request payout → owner pays out manually and marks it
paid. This document is the complete contract — the storefront side is **already built and
committed** against every endpoint/field name below; nothing on the frontend needs to change once
these are live. Everything in this doc is new work inside `peptides-crm-app`.

## Read this first: don't reuse `vp-affiliate-portal`

`C:\Users\PC\Desktop\Vint and MSV\vp-affiliate-portal` is a **different company's**
infrastructure — a shared login/dashboard for Vintage Vitality Group's storefronts (Vintage
Peptides, My Secret Vitality, Liberty Peptides), talking to a shared WordPress `vp-affiliates`
plugin those specific sites run. Its registration field list and dashboard stat layout were used
purely as **UX reference** for the form below — none of its code, API contract, or WordPress
backend should ever be pointed at from EVLV. EVLV is headless (`peptides-crm-app`), not
WordPress, and routing EVLV affiliate data through an unrelated company's system would be a real
data-boundary mistake, not just an architecture mismatch.

## Current state in `peptides-crm-app` (grounded in the real schema/code, 2026-08-26)

The `Affiliate` model already exists but is **admin-created only** — no email, password, or
self-serve anything:

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
  @@unique([organizationId, slug])
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
on every order — **attribution and commission math already work end-to-end today**. What's
missing is entirely on the "affiliate manages their own account" side: no login, no dashboard
data, no click tracking, no payout handling.

## Schema changes needed

```prisma
model Affiliate {
  // ...existing fields above, unchanged...
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

  // Payout method — one of these three groups is populated depending on payoutMethod.
  payoutMethod        PayoutMethod?
  payoutDestination   String?   // Venmo username / Zelle email-or-phone / $Cashtag
  bankAccountHolder   String?
  bankRoutingNumber   String?
  bankAccountNumber   String?
  bankAccountType     BankAccountType?

  clicks         AffiliateClick[]
  payoutRequests AffiliatePayoutRequest[]
}

enum AffiliateStatus {
  PENDING    // applied, awaiting manual review — matches the storefront's existing
             // "we review every application by hand" copy, don't change that UX
  APPROVED
  REJECTED
}

enum PayoutMethod {
  VENMO
  ZELLE
  CASHAPP
  BANK_ACH
}

enum BankAccountType {
  CHECKING
  SAVINGS
}

model AffiliateClick {
  id          String   @id @default(cuid())
  affiliate   Affiliate @relation(fields: [affiliateId], references: [id], onDelete: Cascade)
  affiliateId String
  createdAt   DateTime @default(now())
}

model AffiliatePayoutRequest {
  id             String   @id @default(cuid())
  affiliate      Affiliate @relation(fields: [affiliateId], references: [id], onDelete: Cascade)
  affiliateId    String
  amountCents    Int
  status         PayoutRequestStatus @default(REQUESTED)
  requestedAt    DateTime @default(now())
  paidAt         DateTime?
  adminNote      String?
}

enum PayoutRequestStatus {
  REQUESTED
  PAID
  REJECTED
}
```

`AffiliateClick` is deliberately minimal (just a timestamp row) — enough to compute
`clicks_30d`/`clicks_total` by counting, no IP/UA tracking needed for this.

Available commission balance = sum of `AffiliateOrderAttribution.commissionCents` joined to
`COMPLETED` orders, **minus** the sum of any `PAID` or `REQUESTED` `AffiliatePayoutRequest.amountCents`
for that affiliate (so a pending/paid request can't be double-counted as still available).

## API endpoints needed (`/api/store/affiliate/*`)

Every one of these already has a working proxy on the storefront (`evlv-site/src/app/api/affiliate/*`)
sending exactly this shape — they currently 503 because these CRM routes don't exist yet. Field
names below are load-bearing: the frontend reads these exact keys.

### `POST /api/store/affiliate/register`
Request: `{ username, firstName, lastName, email, password, referredBy?, socialLink, phone, address, postalCode, city, province, country }`
→ Creates an `Affiliate` row with `status: PENDING`, a generated short readable `slug`/`couponCode`
(e.g. first name + 4 random alphanumerics, checked for collision — matches the approach
`REFERRAL-PROGRAM.md` recommends for `Customer.referralCode`, same idea here). Returns a normal
"application received" response — **does not log them in**, matches the existing "reviewed within
a couple of business days" copy already live on the page.

### `POST /api/store/affiliate/login`
Request: `{ email, password }` → only succeeds for `status: APPROVED`. A `PENDING` affiliate
should get a clear "still under review" error, not a generic invalid-credentials message.
Response: `{ token, email, name, affiliate_id, referralCode }` — must match exactly, the
storefront's `saveAffiliateAuth()` reads these keys.

### `POST /api/store/affiliate/dashboard`
Request: `{ token }` → resolves the affiliate from the token server-side. Response:
```json
{
  "clicks30d": 0, "clicksTotal": 0,
  "salesConfirmed": 0, "salesPending": 0,
  "commissionAvailableCents": 0, "commissionPendingCents": 0,
  "minPayoutCents": 5000,
  "payoutMethod": null,
  "payoutDestination": null,
  "bankAccountHolder": null,
  "bankRoutingNumber": null,
  "bankAccountNumber": null,
  "bankAccountType": null
}
```
`salesConfirmed`/`commissionAvailableCents` = attributions joined to `COMPLETED` orders (minus
pending/paid payout requests, per the balance formula above). `salesPending`/`commissionPendingCents`
= attributions joined to `PENDING` orders. `minPayoutCents` is a per-org config value (suggest
`5000` = $50 minimum to start; make it a real setting, not hardcoded, so it can change later).
**Do not truncate `bankAccountNumber` in this response** — the affiliate is viewing their own
saved info to confirm it's right; masking would only matter if a third party could see it, which
isn't the case here since it's returned only to the authenticated owner of that data.

### `POST /api/store/affiliate/payout-info`
Request: `{ token, payoutMethod, payoutDestination?, bankAccountHolder?, bankRoutingNumber?, bankAccountNumber?, bankAccountType? }`
→ Validates the field set matches `payoutMethod` (bank fields required only for `BANK_ACH`,
`payoutDestination` required for the other three), saves onto the `Affiliate` row. Response: the
saved `PayoutInfo` fields back (same shape as the dashboard response's payout fields), or an
error.

### `POST /api/store/affiliate/payout-request`
Request: `{ token }` → **amount is never client-supplied** — resolve the affiliate's current
`commissionAvailableCents` server-side, reject if below `minPayoutCents` or if `payoutMethod` isn't
set, otherwise create an `AffiliatePayoutRequest` row (`status: REQUESTED`, `amountCents` = the
resolved available balance at request time). Response: `{ amountCents }` so the frontend can
confirm the exact amount requested. **This is a request, not an automatic transfer** — the owner
pays out manually via whichever method the affiliate chose (same manual-payment pattern the store
already uses for customer checkout: Zelle/CashApp/Venmo, no payment processor) and then marks the
request `PAID` from the CRM admin UI (not built yet — see Open questions).

### New: click tracking
Something needs to write an `AffiliateClick` row when `?ref=CODE` matches a real `Affiliate.slug`.
The storefront's `ReferralCapture.tsx` already fires on every landing page with `?ref=`, but today
it only writes to `localStorage` — nothing hits the CRM yet. Cheapest fix: add
`POST /api/store/affiliate/click { code }` (public, no auth — it's just a counter), and have
`ReferralCapture` fire a fire-and-forget call to it (via the existing `evlv-site` `/api/affiliate/*`
proxy pattern — add one more route there) when it captures a code. Don't block/await it; a dropped
click shouldn't affect page load. Silently no-op if the code doesn't match any `Affiliate.slug`
(most `?ref=` codes will be customer referral codes from the *other* program, not affiliate codes
— see `REFERRAL-PROGRAM.md`, these are two separate systems sharing the same `?ref=` query param).

## Seed: default owner account

Create one pre-approved `Affiliate` row for the site owner so there's a real, working account to
test the whole flow with immediately once this ships — mirroring the pattern in
`prisma/seed-evlv.ts` (already referenced in `evlv-site/.env.local`'s comments for the
`TrackingConfig` seed).

```
email:        nikolazivkovic0803@gmail.com
username:     nikola
firstName:    Nikola
password:     Evlv2026-Aff!qX8mK   (plaintext — hash it with bcrypt in the seed script;
                                     change this immediately after first real login)
status:       APPROVED
slug:         NIKOLA
couponCode:   NIKOLA
ratePercent:  20         (arbitrary owner/test rate — doesn't matter much since this account
                           won't be the one earning real external referral commission)
payoutMethod: null       (leave unset — set it live from the dashboard once logged in, so the
                           actual payout-info save flow gets exercised as part of testing)
```

Print the login URL (`https://evlvpeptides.com/affiliates/login`) and these credentials to the
console when the seed script runs, same as the existing `seed-evlv.ts` prints
`CRM_CONTACT_FORM_KEY=...`.

## Open questions before this is fully done

1. **Admin UI for marking payouts paid.** `AffiliatePayoutRequest` rows need somewhere to be
   reviewed/marked `PAID` from the CRM's own dashboard (not the affiliate-facing one) — this
   ticket only covers the affiliate-facing side. Worth its own small admin page: a list of
   `REQUESTED` rows with the affiliate's chosen payout method/destination shown, a "Mark Paid"
   button.
2. **Approval + payout notification emails.** No transactional email infrastructure exists yet in
   `peptides-crm-app` (same gap `REFERRAL-PROGRAM.md` flags) — an approved applicant and a
   fulfilled payout request should both trigger an email once that's built. One provider decision
   (Resend/Postmark) covers both this and the referral program's welcome-coupon email.
3. **Materials/banners page.** The `vp-affiliate-portal` reference also has a marketing-assets
   page for affiliates. Lower priority — flagging as a conscious "not yet," not an oversight.

## Storefront side — already built, ready today

- `src/lib/affiliate-auth.ts` — separate session storage from the regular customer login
  (`evlv_aff_token`/`evlv_aff_user`, distinct keys — an affiliate account and a shopper account
  are different identities; someone could have both).
- `src/app/affiliates/AffiliateForm.tsx` — full registration form (username, first/last name,
  email + confirm, password, referred-by, social link, phone, full address, ToS checkbox),
  posting to `/api/affiliate/register`.
- `src/app/affiliates/login/page.tsx` — real sign-in form, posting to `/api/affiliate/login`.
- `src/app/affiliates/dashboard/page.tsx` — gated on a stored session (uses the same
  mount-then-check pattern as `/account` to avoid a hydration mismatch for returning logged-in
  affiliates — don't "simplify" this back to a lazy `useState` initializer, that reintroduces the
  bug). Shows referral link + copy button, clicks/sales/commission stat cards, a "Request Payout"
  button (disabled until a payout method is saved and balance clears the minimum), and the payout
  method form.
- `src/app/affiliates/dashboard/PayoutSettings.tsx` — Venmo / Zelle / Cash App / US Bank (ACH)
  method picker with the matching field set per method, posting to `/api/affiliate/payout-info`.
- `src/app/api/affiliate/{register,login,dashboard,payout-info,payout-request}/route.ts` — proxy
  routes already wired to the exact CRM contract above, 503-ing gracefully today.
- "Affiliates" added to the main nav (`Header.tsx`), not just the footer.

Every number shown anywhere in this flow is either real (fetched from these endpoints) or an
honest "not connected yet" state — nothing is fabricated. Once the endpoints above exist and
return real data, the frontend needs zero changes to start working.
