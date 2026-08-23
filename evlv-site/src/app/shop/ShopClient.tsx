"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product, ProductCategory } from "@/lib/types";
import { categories } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

export function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<ProductCategory | "all">("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fromUrl = searchParams.get("category") as ProductCategory | null;
    if (fromUrl && categories.some((c) => c.value === fromUrl)) setActive(fromUrl);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = active === "all" ? products : products.filter((p) => p.category === active);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [products, active, query]);

  return (
    <>
      <section className="bg-sage-deep py-20 text-center text-white md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-5xl lg:text-6xl">Products</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Every EVLV product is rigorously lab tested, with multiple samples sent for every batch to ensure
            consistency, accuracy and complete transparency.
          </p>
          <div className="relative mx-auto mt-8 max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-md border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-white/50"
            />
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          </div>
        </div>
      </section>

      <section className="sticky top-[90px] z-40 border-b border-stone bg-ivory/95 backdrop-blur-sm md:top-[100px]">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 md:gap-3">
            {categories.map((c) => {
              const count = c.value === "all" ? products.length : products.filter((p) => p.category === c.value).length;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setActive(c.value)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition md:px-5 ${
                    active === c.value ? "bg-sage text-white" : "border border-stone bg-ivory-soft text-charcoal/70 hover:bg-stone/40"
                  }`}
                >
                  {c.label} <span className="ml-0.5 text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
        <p className="mb-6 text-sm text-charcoal/50">Showing {filtered.length} products</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
