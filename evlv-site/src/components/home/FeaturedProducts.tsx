import { getFeaturedProducts } from "@/lib/products";
import { CatalogueCard } from "./CatalogueCard";
import { ButtonLink } from "@/components/ui/Button";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div className="max-w-xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">02 / Our Collection</p>
            <h2 className="font-display text-3xl font-semibold text-charcoal md:text-4xl">Explore research materials</h2>
          </div>
          <ButtonLink href="/shop" variant="secondary" className="shrink-0">
            View All Materials <i className="ri-arrow-right-line" />
          </ButtonLink>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto px-4 pb-4 md:gap-8 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-full max-w-[1400px] gap-6 md:gap-8">
          {products.map((product) => (
            <CatalogueCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
