import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/products";
import { getLiveProducts, mergeProducts } from "@/lib/product-feed";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductClient } from "./ProductClient";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

async function resolveProduct(slug: string) {
  const live = await getLiveProducts();
  return mergeProducts(getProducts(), live).find((p) => p.slug === slug) ?? getProductBySlug(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  if (!product) return {};
  const title = `${product.name}, Research Peptide`;
  return {
    title,
    description: `${product.shortDescription} ${product.purity ? `Purity: ${product.purity}.` : ""} Batch-tested with a published Certificate of Analysis. Research use only.`.trim(),
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description: product.shortDescription,
      images: product.image ? [{ url: product.image, width: 800, height: 800, alt: product.name }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.shortDescription,
    image: product.image ? [`https://evlvpeptides.com${product.image}`] : undefined,
    category: product.categoryLabel,
    offers: {
      "@type": "Offer",
      url: `https://evlvpeptides.com/shop/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://evlvpeptides.com" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://evlvpeptides.com/shop" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://evlvpeptides.com/shop/${product.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-[1400px] px-4 pb-4 pt-8 md:px-8 md:pt-10">
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
