import { getProductBySlug } from "./products";

/** Groupings for the Shop mega-menu, by research focus. Every real SKU appears exactly once. */
const GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: "Recovery & Repair",
    slugs: [
      "bpc-157-5mg",
      "bpc-157-10mg",
      "bpc-157-20mg",
      "tb-500-5mg",
      "tb-500-10mg",
      "tb-500-20mg",
      "bpc-tb-500-blend-10mg",
      "bpc-tb-500-blend-20mg",
      "thymosin-alpha-1-5mg",
    ],
  },
  {
    label: "Metabolic & Weight",
    slugs: [
      "gp-3-10mg",
      "gp-3-15mg",
      "gp-3-30mg",
      "gp-3-60mg",
      "semaglutide-5mg",
      "semaglutide-10mg",
      "tirzepatide-10mg",
      "tirzepatide-15mg",
      "tirzepatide-30mg",
      "tirzepatide-60mg",
    ],
  },
  {
    label: "GHRH & Pituitary Axis",
    slugs: ["tesamorelin-10mg", "tesamorelin-20mg", "cjc-ipa-blend-10mg", "cjc-ipa-blend-20mg"],
  },
  {
    label: "Longevity & Cellular Health",
    slugs: ["ghk-cu-50mg", "mots-c-10mg", "mots-c-40mg", "ss-31-10mg", "nad-500mg", "glow-70mg", "klow-80mg"],
  },
  { label: "Cognition & Mood", slugs: ["selank-10mg", "semax-10mg"] },
  {
    label: "Sexual Health & Hormones",
    slugs: ["pt-141-10mg", "melanotan-ii-10mg", "oxytocin-10mg", "hcg-2000iu", "hcg-5000iu"],
  },
  {
    label: "Other Research",
    slugs: ["aod-9604-10mg", "cartalax-20mg", "igf-1-lr3-1mg", "kpv-10mg", "kpv-oral-500mcg"],
  },
];

export function getShopMenuGroups() {
  return GROUPS.map((g) => ({
    label: g.label,
    products: g.slugs
      .map((slug) => getProductBySlug(slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)),
  })).filter((g) => g.products.length > 0);
}
