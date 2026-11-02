# EVLV deployment

This project is a Next.js application and requires a Node.js hosting environment. It is not a static HTML upload.

## Build commands

```bash
npm install
npm run build
npm run start
```

## Required production environment variables

Copy the values from the secure production environment. Do not upload `.env.local` or commit secrets.

```text
CRM_API_URL=
CRM_ORG_API_KEY=
CRM_STORE_DOMAIN=
CRM_CONTACT_FORM_KEY=
NEXT_PUBLIC_CRM_URL=
NEXT_PUBLIC_CRM_TRACKING_KEY=
```

Optional analytics and reviews variables are documented in `.env.example`.

## Two-market Vercel deployment

Both Vercel projects deploy the same `main` branch. Set project-specific environment variables:

- US project: `NEXT_PUBLIC_SITE_MARKET=US` and the existing US CRM variables.
- AU project: `NEXT_PUBLIC_SITE_MARKET=AU`, an AU-scoped `CRM_STORE_DOMAIN`, AU CRM API key, and all `NIFTIPAY_*` values. Active mappings on the `evlv-au` CRM brand determine the catalog.

AU deliberately fails closed: without an AU CRM brand plus an explicit reviewed catalog allowlist, it displays no purchasable catalog. It never falls back to US prices or products. AU checkout accepts only Niftipay and creates AUD card sessions server-side.

Configure the Niftipay fiat integration with:

```text
Return URL: https://www.evlvpeptides.com.au/payment-return
Failure URL: https://www.evlvpeptides.com.au/payment-failed
Merchant webhook base URL: https://www.evlvpeptides.com.au
Final webhook endpoint: https://www.evlvpeptides.com.au/niftipay/webhook
```

The AU CRM must implement `POST /api/store/payments/niftipay/webhook` with idempotent event handling and support `paymentMethod: "niftipay"`. Fulfil only on the signed `paid` event; never use the browser return page as payment confirmation.

## Research access flow

Normal visitors must sign in or create an account and confirm the RUO restriction. Account creation sends `marketingOptIn: true` to the CRM.

Approved advertising and deep links may bypass the account gate with:

```text
?age_verified=1
```

The site removes only `age_verified` from the visible URL. Product paths, UTM parameters, referral codes, and anchors remain intact.

Example:

```text
https://evlvpeptides.com/shop/evlv-3-10mg?age_verified=1&utm_source=meta&utm_campaign=launch
```

## Verification

The production build was verified with Next.js 16.3.2 and generated all configured pages successfully.
