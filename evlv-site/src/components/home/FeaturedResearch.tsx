import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Editorial "one dominant product" treatment, distinct from the catalogue
 * rail above it -- brief section 8: a product story, not another grid.
 */
export function FeaturedResearch() {
  const product = getProductBySlug("bpc-157-10mg");
  if (!product) return null;

  return (
    <section className="bg-ivory-soft py-20 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">03 / Featured Research</p>
          <h2 className="font-display text-3xl font-semibold leading-[1.1] text-charcoal md:text-5xl">{product.name}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-soft-gray md:text-lg">{product.description}</p>

          <div className="mt-8 grid grid-cols-3 gap-6 border-y border-stone py-6">
            {product.purity && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-charcoal/40">Purity</p>
                <p className="mt-1 font-display text-lg font-semibold text-charcoal">{product.purity}</p>
              </div>
            )}
            {product.batch && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-charcoal/40">Batch</p>
                <p className="mt-1 font-mono text-sm font-medium text-charcoal">{product.batch.code}</p>
              </div>
            )}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-charcoal/40">Documentation</p>
              <Link href="/coas" className="mt-1 flex items-center gap-1 font-display text-sm font-semibold text-sage-deep hover:text-charcoal">
                COA Available <i className="ri-arrow-right-up-line" />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <span className="font-display text-2xl font-semibold text-charcoal">${product.price}</span>
            <ButtonLink href={`/shop/${product.slug}`}>
              View Material <i className="ri-arrow-right-line" />
            </ButtonLink>
          </div>
        </div>

        <div className="order-1 aspect-[4/5] w-full overflow-hidden rounded-lg bg-charcoal lg:order-2">
          {product.image && (
            <Image src={product.image} alt={product.name} width={800} height={1000} sizes="(max-width: 1024px) 90vw, 640px" className="h-full w-full object-cover" />
          )}
        </div>
      </div>
    </section>
  );
}
