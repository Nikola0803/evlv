"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

/**
 * Classic "frequently bought together" cross-sell: the current product plus
 * up to 2 related items, each toggleable, with one combined add-to-cart.
 * Related-product selection reuses getRelatedProducts (same category) --
 * there's no real purchase-pattern data to base this on yet, so it's
 * honestly a same-category suggestion, not a fabricated "often bought
 * with" statistic.
 */
export function FrequentlyBoughtTogether({ product, related }: { product: Product; related: Product[] }) {
  const items = [product, ...related.slice(0, 2)];
  const [checked, setChecked] = useState<Set<string>>(new Set(items.map((p) => p.id)));
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  if (items.length < 2) return null;

  function toggle(id: string) {
    if (id === product.id) return; // the current product always stays selected
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selected = items.filter((p) => checked.has(p.id));
  const total = selected.reduce((sum, p) => sum + p.price, 0);

  function addAll() {
    for (const p of selected) addToCart(p, 1, p.price, "1 PCS");
  }

  return (
    <section className="border-t border-stone py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="mb-8 font-display text-2xl font-semibold text-charcoal md:text-3xl">Frequently bought together</h2>

        <div className="flex flex-col gap-6 rounded-lg border border-stone bg-ivory-soft p-6 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-wrap items-center gap-4">
            {items.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked.has(p.id)}
                    onChange={() => toggle(p.id)}
                    disabled={p.id === product.id}
                    className="h-4 w-4 shrink-0 accent-copper disabled:opacity-60"
                  />
                  <div className="h-16 w-13 shrink-0 overflow-hidden rounded-md bg-white">
                    {p.image && <Image src={p.image} alt={p.name} width={104} height={130} className="h-full w-full object-cover" />}
                  </div>
                  <div>
                    <Link href={`/shop/${p.slug}`} className="text-sm font-medium text-charcoal hover:underline">
                      {p.name}
                    </Link>
                    <p className="text-xs text-charcoal/50">{formatPrice(p.price)}</p>
                  </div>
                </label>
                {i < items.length - 1 && <i className="ri-add-line ml-1 text-lg text-charcoal/30" />}
              </div>
            ))}
          </div>

          <div className="shrink-0 text-center lg:text-right">
            <p className="text-xs text-charcoal/50">
              Total for {selected.length} item{selected.length === 1 ? "" : "s"}
            </p>
            <p className="font-display text-2xl font-semibold text-charcoal">{formatPrice(total)}</p>
            <button
              type="button"
              onClick={addAll}
              disabled={selected.length === 0}
              className="mt-2 rounded-md bg-copper px-6 py-3 text-xs font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add Selected to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
