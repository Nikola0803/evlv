import { getProductBySlug, getProducts } from "./products";
import type { Product } from "./types";

/** Groupings for the Shop mega-menu, by research focus. Every curated static SKU appears exactly once. */
const GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: "Recovery & Repair Research",
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
    label: "Metabolic & Weight Research",
    slugs: [
      "gp-3-10mg",
      "gp-3-15mg",
      "gp-3-30mg",
      "gp-3-60mg",
      "gp-1-5mg",
      "gp-1-10mg",
      "gp-2-10mg",
      "gp-2-15mg",
      "gp-2-30mg",
      "gp-2-60mg",
    ],
  },
  {
    label: "GHRH & Pituitary Axis Research",
    slugs: ["tesamorelin-10mg", "tesamorelin-20mg", "cjc-ipa-blend-10mg", "cjc-ipa-blend-20mg"],
  },
  {
    label: "Longevity & Cellular Health Research",
    slugs: ["ghk-cu-50mg", "mots-c-10mg", "mots-c-40mg", "ss-31-10mg", "nad-500mg", "glow-70mg", "klow-80mg"],
  },
  { label: "Cognition & Mood Research", slugs: ["selank-10mg", "semax-10mg"] },
  {
    label: "Sexual Health & Hormone Research",
    slugs: ["pt-141-10mg", "melanotan-ii-10mg", "oxytocin-10mg", "hcg-2000iu", "hcg-5000iu"],
  },
  {
    label: "Other Research",
    slugs: ["aod-9604-10mg", "cartalax-20mg", "igf-1-lr3-1mg", "kpv-10mg", "kpv-oral-500mcg"],
  },
];

export interface ShopMenuGroup {
  label: string;
  products: Product[];
}

/**
 * Builds the mega-menu groups. Pass the CRM-merged catalog (see
 * mergeProducts(getProducts(), await getLiveProducts()) in product-feed.ts)
 * so a live SKU the CRM adds shows up here too, not just on /shop -- the
 * menu and the shop grid read the same list, they just group it differently.
 * Falls back to the static catalog when no list is supplied (existing
 * callers keep working unchanged).
 *
 * Any product in `products` whose slug isn't in one of the curated GROUPS
 * (e.g. a brand-new CRM SKU that hasn't been assigned a focus area yet)
 * lands in "New & Other" rather than silently vanishing from the menu.
 */
export function getShopMenuGroups(products?: Product[]): ShopMenuGroup[] {
  const bySlug = new Map((products ?? getProducts()).map((p) => [p.slug, p]));

  const curated = GROUPS.map((g) => ({
    label: g.label,
    products: g.slugs
      .map((slug) => bySlug.get(slug) ?? getProductBySlug(slug))
      .filter((p): p is Product => Boolean(p)),
  }));

  const claimedSlugs = new Set(GROUPS.flatMap((g) => g.slugs));
  const leftover = [...bySlug.values()].filter((p) => !claimedSlugs.has(p.slug));

  const groups = leftover.length > 0 ? [...curated, { label: "New & Other Research", products: leftover }] : curated;

  return groups.filter((g) => g.products.length > 0);
}

/** One representative product per top-level shop category, used for the
 * mega-menu's big image tiles. Picks the first in-stock match from the
 * supplied (CRM-merged) list, falling back to the static catalog. */
export function getCategoryTileProduct(category: Product["category"], products?: Product[]): Product | undefined {
  const list = products ?? getProducts();
  return list.find((p) => p.category === category && p.image) ?? list.find((p) => p.category === category);
}
