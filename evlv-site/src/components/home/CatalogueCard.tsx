"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCurrency } from "@/lib/currency-context";

/**
 * Lean catalogue-entry card for the homepage rail -- deliberately not the
 * full ProductCard (no pack selector/add-to-cart/rating stars). Brief: the
 * card's job is recognition -> confidence -> click, not information
 * overload. Full purchasing UI lives on /shop and the product page.
 */
export function CatalogueCard({ product }: { product: Product }) {
  const { formatPrice } = useCurrency();

  return (
    <Link href={`/shop/${product.slug}`} className="group flex w-[260px] shrink-0 flex-col md:w-[300px]">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-ivory-soft">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={480}
            height={640}
            sizes="(max-width: 768px) 60vw, 300px"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="pt-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-copper">Research Material</span>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-charcoal">{product.name}</h3>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="font-display text-lg font-semibold text-charcoal">{formatPrice(product.price)}</span>
        </div>

        <div className="mt-3 flex flex-col gap-1 border-t border-stone pt-3 text-[10px] uppercase tracking-[0.12em] text-charcoal/50">
          {product.batch && <span>COA Available</span>}
          {product.batch && <span>Batch Documented</span>}
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-sage-deep">
          View Material <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
