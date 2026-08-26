import { crmConfigured, crmGet } from "./crm-proxy";
import type { Product } from "./types";

interface FeedVariant {
  slug: string;
  sku: string;
  label: string;
  priceCents: number;
  inStock: boolean;
  coaUrl?: string;
}

interface FeedGroup {
  groupSlug: string;
  name: string;
  variants: FeedVariant[];
}

const STANDARD_STORAGE = "Store lyophilized vials at 2–8°C. After reconstitution, use within 30 days and refrigerate.";
const STANDARD_RECON = "Reconstitute with bacteriostatic or sterile water appropriate for laboratory use.";

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
        categoryLabel: "Peptide Research",
        image: "/images/products/vial-placeholder.png",
        price: v.priceCents / 100,
        rating: 0,
        reviewCount: 0,
        inStock: v.inStock,
        shortDescription: `${group.name} ${v.label} for research protocols.`,
        description: `${group.name} ${v.label}, supplied for laboratory research use only.`,
        storage: STANDARD_STORAGE,
        reconstitution: STANDARD_RECON,
        variants: group.variants.length > 1 ? variants : undefined,
      });
    }
  }
  return products;
}

// Merges the live CRM feed into the static demo catalog: a live product
// overrides a static entry with the same slug (real price/stock wins),
// and any live product with no static counterpart is appended.
export function mergeProducts(staticProducts: Product[], liveProducts: Product[]): Product[] {
  if (liveProducts.length === 0) return staticProducts;
  const bySlug = new Map(staticProducts.map((p) => [p.slug, p]));
  for (const p of liveProducts) bySlug.set(p.slug, p);
  return [...bySlug.values()];
}
