import "server-only";

import { crmConfigured } from "./crm-proxy";
import { getLiveProducts, mergeProducts } from "./product-feed";
import { getProducts, withQuantityPricing } from "./products";

export async function getCatalogProducts() {
  const liveProducts = await getLiveProducts();

  // Once the CRM is connected it is the only authority for availability.
  // Static product records still supply curated copy and imagery, but a SKU
  // absent from the CRM feed must not remain purchasable from stale bundled
  // inventory or a Google Sheet snapshot.
  if (crmConfigured()) {
    const liveSlugs = new Set(liveProducts.map((product) => product.slug));
    return mergeProducts(getProducts(), liveProducts).map((product) =>
      withQuantityPricing({
        ...product,
        inStock: liveSlugs.has(product.slug) && product.inStock,
      }),
    );
  }

  // Local development can still render the maintained static catalogue when
  // no CRM connection has been configured at all.
  return getProducts().map(withQuantityPricing);
}
