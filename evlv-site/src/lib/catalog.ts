import "server-only";

import { crmConfigured } from "./crm-proxy";
import { getLiveProducts, mergeProducts } from "./product-feed";
import { getProducts, withQuantityPricing } from "./products";

// Immediate storefront safety net for SKUs confirmed unavailable in the
// 2026-10-04 Stockroom export. The CRM sync applies the complete sheet, but
// these must remain unpurchasable even while a stale CRM deployment/feed is
// being refreshed.
const CONFIRMED_UNAVAILABLE = new Set([
  "hcg-2000iu",
  "hcg-5000iu",
  "kpv-oral-500mcg",
  "tb-500-20mg",
]);

export async function getCatalogProducts() {
  const liveProducts = await getLiveProducts();

  // Let the CRM override matching SKUs, but keep deliberately published
  // static catalogue entries visible when the CRM has not imported them yet.
  // Otherwise adding a product to products.ts deploys its page and imagery
  // while silently removing its card from the shop whenever CRM is enabled.
  if (crmConfigured()) {
    return mergeProducts(getProducts(), liveProducts, true).map((product) =>
      withQuantityPricing({
        ...product,
        inStock: !CONFIRMED_UNAVAILABLE.has(product.slug) && product.inStock,
      }),
    );
  }

  // Local development can still render the maintained static catalogue when
  // no CRM connection has been configured at all.
  return getProducts().map((product) => withQuantityPricing({
    ...product,
    inStock: !CONFIRMED_UNAVAILABLE.has(product.slug) && product.inStock,
  }));
}
