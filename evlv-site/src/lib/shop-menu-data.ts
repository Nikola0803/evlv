import { getProductBySlug } from "./products";

/** Groupings for the Shop mega-menu, by research focus. Every real SKU appears exactly once. */
const GROUPS: { label: string; slugs: string[] }[] = [
  { label: "Recovery & Repair", slugs: ["bpc-157-10mg", "thymosin-alpha-1-5mg", "wolverine-stack-20mg"] },
  { label: "Metabolic & Weight", slugs: ["gp-3-10mg", "5-amino-1mq-50mg"] },
  { label: "GHRH & Pituitary Axis", slugs: ["tesamorelin-10mg", "sermorelin-10mg", "cjc-1295-no-dac-5mg"] },
  { label: "Longevity & Cellular Health", slugs: ["ghk-cu-50mg", "mots-c-10mg", "glow-70mg", "klow-80mg"] },
  { label: "Cognition & Mood", slugs: ["selank-10mg"] },
];

export function getShopMenuGroups() {
  return GROUPS.map((g) => ({
    label: g.label,
    products: g.slugs
      .map((slug) => getProductBySlug(slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)),
  })).filter((g) => g.products.length > 0);
}
