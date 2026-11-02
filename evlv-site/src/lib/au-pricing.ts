import type { Product } from "./types";

type AuPrice = { name: string; vial?: number; case10?: number };

export const AU_PRICE_SCHEDULE: Record<string, AuPrice> = {
  "bpc-157-5mg": { name: "BPC-157 5MG", vial: 120, case10: 850 },
  "bpc-157-10mg": { name: "BPC-157 10MG", vial: 180, case10: 1250 },
  "evlv-3-10mg": { name: "RETATRUTIDE 10MG", vial: 350, case10: 1550 },
  "evlv-3-20mg": { name: "RETATRUTIDE 20MG", vial: 500, case10: 2150 },
  "evlv-2-10mg": { name: "TIRZEPATIDE 10MG", vial: 200, case10: 1350 },
  "evlv-1-5mg": { name: "SEMAGLUTIDE 5MG", vial: 200 },
  "evlv-1-10mg": { name: "SEMAGLUTIDE 10MG", vial: 300 },
  "mots-c-10mg": { name: "MOTS-C 10MG", vial: 200, case10: 850 },
  "tb-500-10mg": { name: "TB-500 10MG", vial: 350, case10: 1650 },
  "tesamorelin-10mg": { name: "TESAMORELIN 10MG", vial: 300, case10: 2450 },
  "ghk-cu-50mg": { name: "GHK-CU 50MG", case10: 850 },
  "ghk-cu-100mg": { name: "GHK-CU 100MG", case10: 1150 },
  "selank-10mg": { name: "SELANK 10MG", vial: 250 },
  "semax-10mg": { name: "SEMAX 10MG", case10: 1050 },
  "cjc-ipa-blend-10mg": { name: "CJC-1295 + IPAMORELIN 10MG", case10: 1150 },
  "aod-9604-5mg": { name: "AOD-9604 5MG", case10: 1050 },
  "aod-9604-10mg": { name: "AOD-9604 10MG", case10: 1850 },
  "dsip-10mg": { name: "DSIP 10MG", case10: 950 },
  "epitalon-10mg": { name: "EPITHALON 10MG", case10: 750 },
  "epitalon-50mg": { name: "EPITHALON 50MG", case10: 1950 },
  "nad-500mg": { name: "NAD+ 500MG", case10: 950 },
  "nad-1000mg": { name: "NAD+ 1000MG", case10: 1250 },
  "kpv-10mg": { name: "KPV 10MG", case10: 1050 },
  "igf-1-lr3-1mg": { name: "IGF-1 LR3 1MG", case10: 1750 },
  "ipamorelin-10mg": { name: "IPAMORELIN 10MG", case10: 1050 },
};

export function applyAuFallbackPrice(product: Product): Product | null {
  const price = AU_PRICE_SCHEDULE[product.slug];
  if (!price || (price.vial == null && price.case10 == null)) return null;
  const unitPrice = price.vial ?? price.case10! / 10;
  // AU customers can order singles or build a 3/5/10-vial pack. Where the
  // source supplied only a 10-pack total, its per-vial equivalent is the
  // public single price; the exact supplied total is retained for quantity 10.
  const availablePackQuantities: Array<1 | 3 | 5 | 10> = [1, 3, 5, 10];
  const savePercent = price.vial && price.case10 ? Math.max(0, Math.round((1 - price.case10 / (price.vial * 10)) * 100)) : 0;
  return { ...product, name: price.name, price: unitPrice,
    bulkOption: price.case10 == null ? undefined : { qty: 10, price: price.case10, savePercent },
    fixedBulkPricing: price.case10 != null, availablePackQuantities,
    variants: product.variants?.filter((variant) => variant.slug in AU_PRICE_SCHEDULE) };
}

export function applyAuDisplayName(product: Product): Product {
  const price = AU_PRICE_SCHEDULE[product.slug];
  return price ? { ...product, name: price.name } : product;
}
