import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="bg-ivory py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="mb-16 max-w-2xl md:mb-24">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-deep">Our Collection</p>
          <h2 className="font-display text-4xl font-semibold text-charcoal md:text-5xl lg:text-6xl">Featured Research</h2>
          <p className="mt-5 text-base leading-relaxed text-soft-gray md:text-lg">
            Our most requested research compounds, independently tested and prepared to exacting standards.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 flex justify-center md:mt-24">
          <ButtonLink href="/shop" variant="secondary">
            View All Products <i className="ri-arrow-right-line" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
