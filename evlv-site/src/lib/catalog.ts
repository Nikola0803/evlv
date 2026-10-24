import "server-only";

import { crmConfigured } from "./crm-proxy";
import { getLiveProducts, mergeProducts } from "./product-feed";
import { getProducts, withQuantityPricing } from "./products";

// Authoritative storefront range from "Inventory Sheet Nikola.xlsx".
// The CRM is allowed to update matching products, but stale CRM-only rows must
// never create cards for products that are not present in this sheet.
const INVENTORY_SHEET_SLUGS = new Set([
  "5-amino-1mq-30mg",
  "aod-9604-5mg",
  "aod-9604-10mg",
  "bacteriostatic-water-10ml",
  "bpc-157-5mg",
  "bpc-157-10mg",
  "cagrilintide-10mg",
  "cjc-ipa-blend-10mg",
  "cjc-ipa-blend-20mg",
  "dsip-10mg",
  "dsip-15mg",
  "epitalon-10mg",
  "epitalon-50mg",
  "gac-water-10ml",
  "ghk-cu-50mg",
  "ghk-cu-100mg",
  "ghrp-6-5mg",
  "glow-70mg",
  "glutathione-1500mg",
  "hexarelin-2mg",
  "hexarelin-10mg",
  "igf-1-lr3-1mg",
  "ipamorelin-10mg",
  "kisspeptin-10mg",
  "klow-80mg",
  "kpv-10mg",
  "ll-37-10mg",
  "melanotan-i-10mg",
  "melanotan-ii-10mg",
  "mots-c-10mg",
  "nad-500mg",
  "nad-1000mg",
  "oxytocin-1mg",
  "oxytocin-5mg",
  "pinealon-2mg",
  "pt-141-10mg",
  "evlv-3-15mg",
  "evlv-3-20mg",
  "evlv-3-30mg",
  "selank-10mg",
  "evlv-1-5mg",
  "evlv-1-10mg",
  "evlv-1-30mg",
  "semax-10mg",
  "sermorelin-5mg",
  "sermorelin-10mg",
  "slu-pp-332-10mg",
  "ss-31-50mg",
  "tb-500-10mg",
  "tesamorelin-10mg",
]);

const applyStorefrontRules = <T extends { slug: string; price: number }>(
  product: T,
  approvedPriceBySlug: Map<string, number>,
): T => ({
  ...product,
  // The maintained storefront prices are 5% below the matching comparison
  // catalog supplied by the owner. CRM remains stock/SKU authority, but must
  // not overwrite this pricing schedule. BW is an explicit exception and
  // stays at its owner-set $9.99 price.
  price: product.slug === "bacteriostatic-water-10ml"
    ? 9.99
    : approvedPriceBySlug.get(product.slug) ?? product.price,
});

export async function getCatalogProducts() {
  const liveProducts = await getLiveProducts();
  const sheetProducts = getProducts().filter((product) => INVENTORY_SHEET_SLUGS.has(product.slug));
  const approvedPriceBySlug = new Map(sheetProducts.map((product) => [product.slug, product.price]));

  if (crmConfigured()) {
    const approvedLiveProducts = liveProducts.filter((product) => INVENTORY_SHEET_SLUGS.has(product.slug));
    return mergeProducts(sheetProducts, approvedLiveProducts, true)
      .map((product) => applyStorefrontRules(product, approvedPriceBySlug))
      .map(withQuantityPricing);
  }

  return sheetProducts
    .map((product) => applyStorefrontRules(product, approvedPriceBySlug))
    .map(withQuantityPricing);
}
