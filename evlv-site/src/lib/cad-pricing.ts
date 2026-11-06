import type { Product } from "./types";

/**
 * Hardcoded CAD retail prices by product slug, sourced from Align Peptides'
 * live CAD storefront. These replace the static 1.38 USD→CAD conversion rate
 * for products that have an explicit CAD price. Products without an entry
 * fall back to the exchange-rate conversion in currency-context.tsx.
 */
export const CAD_PRICE_OVERRIDES: Record<string, number> = {
  // GLP compounds (Semaglutide / Tirzepatide / Retatrutide)
  "evlv-1-5mg": 79.99,
  "evlv-1-10mg": 119.99,
  "evlv-1-30mg": 149.99,
  "evlv-2-10mg": 99.99,
  "evlv-2-15mg": 149.99,
  "evlv-2-30mg": 229.99,
  "evlv-3-10mg": 129.99,
  "evlv-3-15mg": 179.99,
  "evlv-3-20mg": 234.99,
  "evlv-3-30mg": 299.99,
  // Core peptides
  "bpc-157-5mg": 59.99,
  "bpc-157-10mg": 99.99,
  "tb-500-10mg": 109.99,
  "ghk-cu-50mg": 69.99,
  "ghk-cu-100mg": 109.99,
  "tesamorelin-10mg": 169.99,
  "mots-c-10mg": 79.99,
  "cjc-ipa-blend-10mg": 99.99,
  "cjc-ipa-blend-20mg": 199.99,
  "selank-10mg": 79.99,
  "semax-10mg": 79.99,
  "aod-9604-5mg": 79.99,
  "aod-9604-10mg": 109.99,
  "igf-1-lr3-1mg": 119.99,
  "kpv-10mg": 109.99,
  "melanotan-ii-10mg": 69.99,
  "pt-141-10mg": 99.99,
  "nad-500mg": 99.99,
  "nad-1000mg": 159.99,
  "ipamorelin-10mg": 99.99,
  "sermorelin-10mg": 109.99,
  "sermorelin-5mg": 69.99,
  "hexarelin-10mg": 99.99,
  "hexarelin-2mg": 39.99,
  "vip-10mg": 99.99,
  "dsip-10mg": 59.99,
  "dsip-15mg": 79.99,
  "thymosin-alpha-1-10mg": 99.99,
  "oxytocin-1mg": 49.99,
  "oxytocin-5mg": 79.99,
  "melanotan-i-10mg": 69.99,
  "kisspeptin-10mg": 109.99,
  "glutathione-1500mg": 99.99,
  "pinealon-2mg": 79.99,
  "ss-31-50mg": 199.99,
  "cagrilintide-10mg": 189.99,
  "5-amino-1mq-30mg": 149.99,
  "slu-pp-332-10mg": 129.99,
  "epitalon-10mg": 69.99,
  "epitalon-50mg": 159.99,
  "ghrp-6-5mg": 69.99,
  // Blends
  "glow-70mg": 154.99,
  "klow-80mg": 184.99,
  "wolverine-10mg": 94.99,
  "wolverine-20mg": 154.99,
  // Supplies
  "bacteriostatic-water-10ml": 19.99,
  "gac-water-10ml": 14.99,
};

export function applyCadPricing(product: Product): Product {
  return {
    ...product,
    cadPrice: CAD_PRICE_OVERRIDES[product.slug],
    variants: product.variants?.map((v) => ({
      ...v,
      cadPrice: CAD_PRICE_OVERRIDES[v.slug],
    })),
  };
}
