export type ProductCategory = "peptides" | "ancillaries";

/** Shop-page "Shop by Format" filter dimension. Most current products are
 * standalone lyophilized vials and don't belong to any of these buckets
 * (they still show up under "All Formats"). */
export type ProductFormat = "blend" | "supplies" | "oral" | "nasal";

export interface BulkOption {
  qty: number;
  price: number;
  savePercent: number;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  format?: ProductFormat;
  image?: string;
  price: number;
  bulkOption?: BulkOption;
  purity?: string;
  avgMass?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  shortDescription: string;
  description: string;
  storage: string;
  reconstitution?: string;
  badges?: string[];
  /** Only purchasable by Member-plan accounts (see /plans). */
  memberOnly?: boolean;
  batch?: {
    code: string;
    date: string;
    status: "PASS" | "PENDING";
  };
  /**
   * Sibling size/dose options sharing this product's base name (e.g.
   * BPC-157 5mg/10mg/20mg), each its own independently priced/stocked
   * product with its own slug/page. Every sibling in a group carries an
   * identical `variants` array (including itself) — see the `*_VARIANTS`
   * consts in lib/products.ts and `getShopListProducts()`, which uses
   * `variants[0].slug === slug` to show one canonical card per group in
   * the shop grid while every dose still has a real, linkable page.
   */
  variants?: ProductVariant[];
}

export interface ProductVariant {
  slug: string;
  label: string;
  price: number;
  inStock: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  source: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Multi-product research protocol packages, distinct from a single Product
 * (duration-based, not dose-based; no purity/batch of its own since it's a
 * bundle of already-verified individual products).
 */
export interface Bundle {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  duration: string;
  price: number;
  compareAtPrice: number;
  comingSoon?: boolean;
}
