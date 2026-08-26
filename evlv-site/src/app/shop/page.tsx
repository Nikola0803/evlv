import { Suspense } from "react";
import { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { ShopClient } from "./ShopClient";
import { TrustIconRow } from "@/components/ui/TrustIconRow";

export const metadata: Metadata = {
  title: "Shop Research Peptides",
  description: "Browse the full EVLV catalogue of research peptides and ancillaries, each batch independently tested with a published Certificate of Analysis.",
  alternates: { canonical: "/shop" },
};

const SHOP_TRUST_ITEMS = [
  { icon: "ri-shield-check-line", label: "Independently Verified", sublabel: "Every batch independently tested" },
  { icon: "ri-truck-line", label: "US & Canada Shipping", sublabel: "1-2 business day delivery" },
  { icon: "ri-lock-line", label: "Secure Payments", sublabel: "Encrypted checkout" },
  { icon: "ri-customer-service-2-line", label: "Expert Support", sublabel: "Response within minutes" },
];

export default function ShopPage() {
  const products = getProducts();

  return (
    <>
      <Suspense fallback={null}>
        <ShopClient products={products} />
      </Suspense>
      <TrustIconRow items={SHOP_TRUST_ITEMS} tone="plain" />
    </>
  );
}
