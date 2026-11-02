# EVLV Australia launch checklist

The AU Vercel project deploys the same `main` branch as US. Do not fork the repository.

## Required before preview checkout

- Create the AU Vercel project with `NEXT_PUBLIC_SITE_MARKET=AU`.
- Configure an AU-scoped CRM brand, `CRM_STORE_DOMAIN`, and API key.
- Update the CRM checkout schema to accept `paymentMethod: "niftipay"`.
- Implement the CRM endpoint `POST /api/store/payments/niftipay/webhook` with idempotent status transitions.
- Load AU prices in AUD as active mappings on the `evlv-au` CRM brand. Those
  brand-scoped mappings are the AU catalog allowlist.
- Load AU-specific COAs and confirm that no US lot/report appears in the AU brand.
- Complete Niftipay KYB and enable fiat card payments.
- Create one Niftipay fiat integration for the AU site and set its integration ID, API key, and webhook secret in Vercel.

## Vercel environment split

Copy shared server credentials from the US project only where the service is
intentionally shared: `CRM_API_URL`, `CRM_ORG_API_KEY`, Google inventory
service-account credentials, `RESEND_API_KEY`, and `CRM_WEBHOOK_SECRET`.

Do not copy the US market identity values. Set these specifically for AU:

```text
NEXT_PUBLIC_SITE_MARKET=AU
CRM_STORE_DOMAIN=evlvpeptides.com.au
AU_LEGAL_ENTITY=<Australian legal entity>
AU_SUPPORT_EMAIL=support@evlvpeptides.com.au
AU_INDEXING_ENABLED=false
NIFTIPAY_API_KEY=<issued by Niftipay>
NIFTIPAY_INTEGRATION_ID=<issued by Niftipay>
NIFTIPAY_WEBHOOK_SECRET=<issued/registered by Niftipay>
NIFTIPAY_BASE_URL=https://www.niftipay.com
NIFTIPAY_SERVICE_FEE_PAYER=merchant
```

After running the CRM AU-brand seed, use its newly printed AU values for
`CRM_CONTACT_FORM_KEY` and `NEXT_PUBLIC_CRM_TRACKING_KEY`. Create separate AU
values for GA4, Omnisend and Google Place ID rather than blending US/AU data.
Google OAuth may share a client only after the AU callback URL has been added
to that client's authorized redirects.

## Niftipay URLs

```text
Return URL: https://www.evlvpeptides.com.au/payment-return
Failure URL: https://www.evlvpeptides.com.au/payment-failed
Merchant webhook base URL: https://www.evlvpeptides.com.au
Webhook endpoint: https://www.evlvpeptides.com.au/niftipay/webhook
```

Run Niftipay's signed test-webhook action before accepting a live order. The storefront verifies HMAC-SHA256 signatures and rejects timestamps outside five minutes.

## Required before indexing

- Localize or remove US-only homepage, navigation, footer, shipping, wholesale, comparison, promotion, account, and policy copy.
- Confirm Australian legal entity, support email, returns address, shipping zones, tax/GST treatment, privacy terms, and consumer-law wording with qualified Australian counsel/accounting support.
- Verify every canonical, Open Graph URL, sitemap URL, product currency, Merchant Center feed, and structured-data area is AU/AUD.
- Create AU analytics, Search Console, Merchant Center, email sender, and CRM tracking credentials rather than reusing US identifiers.
- Complete an AU crawl, checkout test, signed webhook test, refund test, mobile performance audit, and structured-data validation.
- Only then set `AU_INDEXING_ENABLED=true`.

## Safety properties already implemented

- AU never falls back to the US catalog.
- AU publication is controlled by active `evlv-au` CRM StoreMappings, not a
  duplicate environment-variable slug list.
- AU checkout rejects non-Niftipay methods.
- Niftipay secrets stay server-side.
- Browser redirects never mark an order paid; only a verified webhook may do that.
- US and AU catalog caches are isolated.
- AU stays noindex/disallowed until explicitly released.
