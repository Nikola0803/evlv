"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Product, ProductCategory, ProductFormat } from "@/lib/types";
import { categories, formats } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterDropdown<T extends string>({
  label,
  activeLabel,
  options,
  value,
  onChange,
}: {
  label: string;
  activeLabel: string | null;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = activeLabel !== null;

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors md:px-5 md:text-sm ${
          isActive ? "bg-sage text-white" : "border border-stone bg-ivory-soft text-charcoal/70 hover:bg-stone/40"
        }`}
      >
        {activeLabel ?? label}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-2 w-56 overflow-hidden rounded-lg border border-stone bg-white py-1.5 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm transition ${
                opt.value === value ? "font-semibold text-sage-deep" : "text-charcoal/70 hover:bg-ivory-soft"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [activeFormat, setActiveFormat] = useState<ProductFormat | "all">("all");
  const [sortAz, setSortAz] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fromUrl = searchParams.get("category") as ProductCategory | null;
    if (fromUrl && categories.some((c) => c.value === fromUrl)) setActiveCategory(fromUrl);
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);
    if (activeFormat !== "all") list = list.filter((p) => p.format === activeFormat);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sortAz) list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, activeCategory, activeFormat, query, sortAz]);

  const resetAll = () => {
    setActiveCategory("all");
    setActiveFormat("all");
    setSortAz(false);
  };

  const nothingActive = activeCategory === "all" && activeFormat === "all" && !sortAz;

  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
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
            <button
              type="button"
              onClick={resetAll}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors md:px-5 md:text-sm ${
                nothingActive ? "bg-sage text-white" : "border border-stone bg-ivory-soft text-charcoal/70 hover:bg-stone/40"
              }`}
            >
              All
            </button>

            <FilterDropdown
              label="Shop by Category"
              activeLabel={activeCategory === "all" ? null : categories.find((c) => c.value === activeCategory)?.label ?? null}
              options={categories}
              value={activeCategory}
              onChange={setActiveCategory}
            />

            <FilterDropdown
              label="Shop by Format"
              activeLabel={activeFormat === "all" ? null : formats.find((f) => f.value === activeFormat)?.label ?? null}
              options={formats}
              value={activeFormat}
              onChange={setActiveFormat}
            />

            <button
              type="button"
              onClick={() => setSortAz((v) => !v)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors md:px-5 md:text-sm ${
                sortAz ? "bg-sage text-white" : "border border-stone bg-ivory-soft text-charcoal/70 hover:bg-stone/40"
              }`}
            >
              A&ndash;Z
            </button>

            <Link
              href="/bundles"
              className="shrink-0 whitespace-nowrap rounded-full border border-stone bg-ivory-soft px-4 py-2 text-xs font-semibold text-charcoal/70 transition-colors hover:bg-stone/40 md:px-5 md:text-sm"
            >
              Bundles
            </Link>
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
