import { crmConfigured, crmGet } from "./crm-proxy";
import type { Product } from "./types";

interface FeedVariant {
  slug: string;
  sku: string;
  label: string;
  priceCents: number;
  inStock: boolean;
  coaUrl?: string;
  imageUrl?: string;
  shortDescription?: string;
  description?: string;
  purity?: string;
  categoryLabel?: string;
  storageInstructions?: string;
}

interface FeedGroup {
  groupSlug: string;
  name: string;
  variants: FeedVariant[];
}

// Real supplier products imported into the CRM (see supplier-import.ts on
// the CRM side), fetched live so a dropship partner's price list actually
// shows up on the storefront instead of just sitting in the CRM. Falls
// back to an empty list -- callers merge this into the static demo
// catalog rather than depending on it exclusively, so the shop never goes
// blank if the CRM is unreachable.
export async function getLiveProducts(): Promise<Product[]> {
  if (!crmConfigured()) return [];
  let response: Awaited<ReturnType<typeof crmGet>>;
  try {
    response = await crmGet("/api/store/products", { revalidate: 120 });
  } catch (error) {
    console.error("CRM product feed unavailable; rendering the storefront in safe fallback mode", error);
    return [];
  }
  const { ok, data } = response;
  if (!ok || !Array.isArray(data)) return [];

  const products: Product[] = [];
  for (const group of data as FeedGroup[]) {
    const variants = group.variants.map((v) => ({ slug: v.slug, label: v.label, price: v.priceCents / 100, inStock: v.inStock }));
    for (const v of group.variants) {
      products.push({
        id: `crm-${v.sku}`,
        slug: v.slug,
        sku: v.sku,
        name: `${group.name}${group.variants.length > 1 ? ` ${v.label}` : ""}`.toUpperCase(),
        category: "peptides",
        categoryLabel: v.categoryLabel || "Peptide Research",
        // CRM-managed photo/content wins when set (see Product.imageUrl
        // etc. in peptide-saas's schema + the Storefront content card on
        // its product page) -- mergeProducts() also keeps the static
        // catalog's own photo as a fallback for a matching slug when the
        // CRM hasn't been given a photo yet. A genuinely new (no static
        // counterpart) live product with no CRM photo either falls back
        // to ProductVisual's SVG placeholder, same as any other
        // unphotographed SKU.
        image: v.imageUrl,
        price: v.priceCents / 100,
        purity: v.purity,
        rating: 0,
        reviewCount: 0,
        inStock: v.inStock,
        // Left empty (not defaulted here) when the CRM hasn't been given
        // real content yet -- mergeProducts() only overlays these onto a
        // matching static product when they're actually non-empty, and
        // fills the generic fallback text itself for a genuinely new,
        // static-catalog-less product that still has none set.
        shortDescription: v.shortDescription ?? "",
        description: v.description ?? "",
        storage: v.storageInstructions ?? "",
        variants: group.variants.length > 1 ? variants : undefined,
      });
    }
  }
  return products;
}

// CRM is an inventory source only. Public-facing names, images, purity,
// categories, descriptions and storage copy always come from the reviewed
// storefront catalog so an unreviewed CRM field can never become indexable.
// CRM-only rows are ignored by the storefront.
export function mergeProducts(staticProducts: Product[], liveProducts: Product[], preserveStaticStock = false): Product[] {
  if (liveProducts.length === 0) return staticProducts;
  const bySlug = new Map(staticProducts.map((p) => [p.slug, p]));
  for (const live of liveProducts) {
    const existing = bySlug.get(live.slug);
    if (existing) {
      bySlug.set(live.slug, {
        ...existing,
        price: live.price,
        inStock: preserveStaticStock ? existing.inStock : live.inStock,
        sku: live.sku,
        variants: preserveStaticStock
          ? (live.variants ?? existing.variants)?.map((variant) => ({
              ...variant,
              inStock: existing.variants?.find((item) => item.slug === variant.slug)?.inStock ?? variant.inStock,
            }))
          : live.variants,
        // Every product admitted to the storefront inventory has a curated,
        // deploy-local image. Keep that known-good asset authoritative. CRM
        // imageUrl values are still used for genuinely CRM-only products,
        // but must never replace a matching storefront image (or a malformed
        // synced absolute URL can make next/image return 400 for the card).
        image: existing.image,
        purity: existing.purity,
        categoryLabel: existing.categoryLabel,
        shortDescription: existing.shortDescription,
        description: existing.description,
        storage: existing.storage,
      });
    }
  }
  return [...bySlug.values()];
}
