# EVLV Australia launch checklist

The AU Vercel project deploys the same `main` branch as US. Do not fork the repository.

## Required before preview checkout

- Create the AU Vercel project with `NEXT_PUBLIC_SITE_MARKET=AU`.
- Configure an AU-scoped CRM brand, `CRM_STORE_DOMAIN`, and API key.
- Update the CRM checkout schema to accept `paymentMethod: "niftipay"`.
- Implement the CRM endpoint `POST /api/store/payments/niftipay/webhook` with idempotent status transitions.
- Load AU prices in AUD and set `AU_CATALOG_SLUGS` to the reviewed published slugs.
- Load AU-specific COAs and confirm that no US lot/report appears in the AU brand.
- Complete Niftipay KYB and enable fiat card payments.
- Create one Niftipay fiat integration for the AU site and set its integration ID, API key, and webhook secret in Vercel.

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
- AU checkout rejects non-Niftipay methods.
- Niftipay secrets stay server-side.
- Browser redirects never mark an order paid; only a verified webhook may do that.
- US and AU catalog caches are isolated.
- AU stays noindex/disallowed until explicitly released.
