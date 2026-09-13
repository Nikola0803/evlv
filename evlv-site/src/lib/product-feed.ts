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
  reconstitutionInstructions?: string;
}

interface FeedGroup {
  groupSlug: string;
  name: string;
  variants: FeedVariant[];
}

const STANDARD_STORAGE = "Store lyophilized vials at 2–8°C. After reconstitution, use within 30 days and refrigerate.";

// Real supplier products imported into the CRM (see supplier-import.ts on
// the CRM side), fetched live so a dropship partner's price list actually
// shows up on the storefront instead of just sitting in the CRM. Falls
// back to an empty list -- callers merge this into the static demo
// catalog rather than depending on it exclusively, so the shop never goes
// blank if the CRM is unreachable.
export async function getLiveProducts(): Promise<Product[]> {
  if (!crmConfigured()) return [];
  const { ok, data } = await crmGet("/api/store/products", { revalidate: 120 });
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
        reconstitution: v.reconstitutionInstructions,
        variants: group.variants.length > 1 ? variants : undefined,
      });
    }
  }
  return products;
}

// Merges the live CRM feed into the static demo catalog. Price/stock/sku/
// variants from the CRM always win when a live product matches a curated
// static entry (real numbers win) -- but so does any storefront content
// (photo, purity, descriptions, storage/recon copy, category) the CRM has
// actually been given (see Product.imageUrl etc. in peptide-saas's schema
// and the Storefront content card on its product page), field by field:
// a field the CRM hasn't filled in yet just falls through to the static
// entry's own value instead of overwriting it with something blank. A
// live product with no static counterpart is appended as-is, generating
// generic fallback text for any content field the CRM also left blank
// (Product's shortDescription/description/storage are required strings).
export function mergeProducts(staticProducts: Product[], liveProducts: Product[]): Product[] {
  if (liveProducts.length === 0) return staticProducts;
  const bySlug = new Map(staticProducts.map((p) => [p.slug, p]));
  for (const live of liveProducts) {
    const existing = bySlug.get(live.slug);
    if (existing) {
      bySlug.set(live.slug, {
        ...existing,
        price: live.price,
        inStock: live.inStock,
        sku: live.sku,
        variants: live.variants,
        image: live.image || existing.image,
        purity: live.purity || existing.purity,
        categoryLabel: live.categoryLabel || existing.categoryLabel,
        shortDescription: live.shortDescription || existing.shortDescription,
        description: live.description || existing.description,
        storage: live.storage || existing.storage,
        reconstitution: live.reconstitution || existing.reconstitution,
      });
    } else {
      bySlug.set(live.slug, {
        ...live,
        shortDescription: live.shortDescription || `${live.name} for research protocols.`,
        description: live.description || `${live.name}, supplied for laboratory research use only.`,
        storage: live.storage || STANDARD_STORAGE,
      });
    }
  }
  return [...bySlug.values()];
}
