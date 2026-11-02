import type { Product } from "./types";

// Exact-strength public AU comparison prices verified from
// longevitytech-lab.com/shop on 2026-11-02. Only rows where both the single
// vial and 10-pack price were explicitly shown are included. Never infer a
// missing strength or reuse another strength's price.
export const AU_PRICE_SCHEDULE = {
  "bpc-157-5mg": { vial: 120, case10: 850 },
  "bpc-157-10mg": { vial: 180, case10: 1250 },
  "evlv-3-10mg": { vial: 350, case10: 1550 },
  "evlv-2-10mg": { vial: 200, case10: 1350 },
  "mots-c-10mg": { vial: 200, case10: 850 },
  "tb-500-10mg": { vial: 350, case10: 1650 },
  "tesamorelin-10mg": { vial: 300, case10: 2450 },
} as const;

export type AuPricedSlug = keyof typeof AU_PRICE_SCHEDULE;

export function applyAuFallbackPrice(product: Product): Product | null {
  const price = AU_PRICE_SCHEDULE[product.slug as AuPricedSlug];
  if (!price) return null;
  const savePercent = Math.max(0, Math.round((1 - price.case10 / (price.vial * 10)) * 100));
  return {
    ...product,
    price: price.vial,
    bulkOption: { qty: 10, price: price.case10, savePercent },
    fixedBulkPricing: true,
    variants: product.variants?.filter((variant) => variant.slug in AU_PRICE_SCHEDULE).map((variant) => ({
      ...variant,
      price: AU_PRICE_SCHEDULE[variant.slug as AuPricedSlug].vial,
    })),
  };
}
