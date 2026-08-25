export type ProductCategory = "peptides" | "ancillaries";

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
  batch?: {
    code: string;
    date: string;
    status: "PASS" | "PENDING";
  };
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
