import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductClient } from "./ProductClient";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | EVLV`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 py-4 md:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-charcoal/50">
          <Link href="/" className="transition hover:text-charcoal">
            Home
          </Link>
          <i className="ri-arrow-right-s-line" />
          <Link href="/shop" className="transition hover:text-charcoal">
            Shop
          </Link>
          <i className="ri-arrow-right-s-line" />
          <span className="font-medium text-charcoal">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pb-12 md:px-8">
        <ProductClient product={product} />
      </div>

      {related.length > 0 && (
        <section className="border-t border-stone py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="mb-8 font-display text-2xl font-semibold text-charcoal md:text-3xl">You may also like</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
