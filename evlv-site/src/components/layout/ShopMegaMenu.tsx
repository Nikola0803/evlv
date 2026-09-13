"use client";

import Link from "next/link";
import Image from "next/image";
import { getShopMenuGroups } from "@/lib/shop-menu-data";
import { CategoryArt } from "@/components/home/ShopByCategory";
import { useCurrency } from "@/lib/currency-context";
import type { Product } from "@/lib/types";

function openQuiz() {
  window.dispatchEvent(new Event("evlv:open-quiz"));
}

/**
 * Mega menu: a wide, clean panel of curated research-focus groups (the same
 * taxonomy the shop page's "Category" filter and the quiz already use --
 * one real source, not a fabricated categorization), with a "Popular Right
 * Now" rail along the left rather than a bordered strip at the bottom --
 * softer separation (tinted panel, no hard divider lines) throughout.
 */
export function ShopMegaMenu({ products }: { products?: Product[] }) {
  const allGroups = getShopMenuGroups(products);
  const groups = allGroups.slice(0, 6);
  const popular = allGroups
    .flatMap((g) => g.products)
    .filter((p) => p.inStock)
    .slice(0, 4);

  return (
    <div className="group relative">
      <Link href="/shop" className="whitespace-nowrap transition hover:text-white">
        Shop
      </Link>

      <div className="invisible absolute left-0 top-full w-[min(94vw,1040px)] pt-4 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-lg bg-charcoal shadow-2xl shadow-black/40">
          <div className="flex">
            {popular.length > 0 && (
              <div className="w-[220px] shrink-0 bg-white/[0.035] p-7">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper">Popular Right Now</p>
                <div className="flex flex-col gap-3">
                  {popular.map((p) => (
                    <PopularCard key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 p-8">
              <div className="mb-7 flex items-center justify-between gap-4">
                <p className="text-xs text-white/50">Every listing is independently HPLC-verified and COA-backed.</p>
                <Link
                  href="/shop"
                  className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md bg-copper px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light"
                >
                  Shop All <i className="ri-arrow-right-line" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                {groups.map((group) => (
                  <div key={group.label}>
                    <p className="mb-3.5 text-sm font-semibold text-white">{group.label}</p>
                    <ul className="space-y-2.5">
                      {group.products.slice(0, 5).map((p) => (
                        <li key={p.slug}>
                          <Link href={`/shop/${p.slug}`} className="text-xs font-light text-white/50 transition hover:text-white/90">
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center justify-end gap-5">
                <Link href="/coas" className="flex items-center gap-1 text-xs font-medium text-white/50 transition hover:text-white">
                  View COAs <i className="ri-arrow-right-line" />
                </Link>
                <Link href="/journal" className="flex items-center gap-1 text-xs font-medium text-white/50 transition hover:text-white">
                  Research Journal <i className="ri-arrow-right-line" />
                </Link>
                <button type="button" onClick={openQuiz} className="flex items-center gap-1 text-xs font-medium text-copper transition hover:text-copper-light">
                  Take the Quiz <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small square-image / name / price teaser for the "Popular Right Now" rail
 * -- soft tinted background rather than a hard border, matching the panel's
 * softer overall separation. */
export function PopularCard({ product }: { product: Product }) {
  const { formatPrice } = useCurrency();
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group/pop flex items-center gap-3 rounded-lg bg-white/[0.03] p-2.5 transition hover:bg-white/[0.08]"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/5 p-1.5">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
            className="h-full w-full object-contain transition duration-300 group-hover/pop:scale-105"
          />
        ) : (
          <CategoryArt variant="particles" className="h-full w-full opacity-70" />
        )}
      </div>
      <div className="min-w-0">
        <p className="line-clamp-2 text-[11px] font-medium leading-tight text-white/80">{product.name}</p>
        <p className="mt-1 text-[11px] font-semibold text-copper">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
