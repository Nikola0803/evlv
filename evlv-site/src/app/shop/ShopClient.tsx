"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Product, ProductCategory, ProductFormat } from "@/lib/types";
import { categories, formats } from "@/lib/products";
import { getShopMenuGroups } from "@/lib/shop-menu-data";
import { ProductCard } from "@/components/product/ProductCard";

// The mega-menu's real research-focus groupings (src/lib/shop-menu-data.ts)
// give us a genuine, already-curated "by research area" taxonomy -- far more
// useful here than the raw 2-value category enum, and not fabricated.
type FocusArea = string;

function CheckboxGroup<T extends string>({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { value: T; label: string }[];
  selected: Set<T>;
  onToggle: (v: T) => void;
}) {
  return (
    <div className="border-b border-stone py-5 first:pt-0 last:border-b-0">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal/50">{title}</h3>
      <div className="space-y-2.5">
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal/80 hover:text-charcoal">
            <input
              type="checkbox"
              checked={selected.has(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="h-4 w-4 shrink-0 rounded-sm border-stone accent-sage-deep"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();

  const focusGroups = useMemo(() => getShopMenuGroups(products), [products]);
  const slugToFocus = useMemo(() => {
    const map = new Map<string, FocusArea>();
    for (const g of focusGroups) for (const p of g.products) map.set(p.slug, g.label);
    return map;
  }, [focusGroups]);

  const [activeFocus, setActiveFocus] = useState<Set<FocusArea>>(new Set());
  const [activeTypes, setActiveTypes] = useState<Set<ProductCategory>>(new Set());
  const [activeFormats, setActiveFormats] = useState<Set<ProductFormat>>(new Set());
  const [sort, setSort] = useState<"featured" | "az" | "price-low" | "price-high">("featured");
  const [query, setQuery] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const fromUrl = searchParams.get("category") as ProductCategory | null;
    if (fromUrl && categories.some((c) => c.value === fromUrl)) {
      setActiveTypes(new Set([fromUrl]));
    }
    // ?focus=<slug> -- links into the real compound-class taxonomy (the
    // same groups the mega-menu and this page's own "Category" checkboxes
    // use, from shop-menu-data.ts), so a link from anywhere on the site
    // (the homepage category marquee, "Shop by Compound Class," "Find
    // your path") actually filters to real products instead of just
    // being decorative text. Matched by slug, not the display label, so
    // the URL stays a clean kebab-case string independent of "&" / "/"
    // in the label itself.
    const focusFromUrl = searchParams.get("focus");
    const matchedFocusGroup = focusGroups.find((g) => g.slug === focusFromUrl);
    if (matchedFocusGroup) {
      setActiveFocus(new Set([matchedFocusGroup.label]));
    }
    // ?format=<value> -- links into the real product-format taxonomy
    // (products.ts's `formats` export, the same list that drives this
    // page's own "Product Format" checkboxes), so a link from anywhere on
    // the site (the homepage featured-categories grid) filters to real
    // products instead of pointing at a decorative label.
    const formatFromUrl = searchParams.get("format") as ProductFormat | null;
    if (formatFromUrl && formats.some((f) => f.value === formatFromUrl)) {
      setActiveFormats(new Set([formatFromUrl]));
    }
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams, focusGroups]);

  // Lock body scroll while the mobile filter drawer is open.
  useEffect(() => {
    if (!filterOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [filterOpen]);

  function toggle<T>(set: Set<T>, setter: (s: Set<T>) => void, value: T) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  }

  const filtered = useMemo(() => {
    let list = products;
    if (activeFocus.size > 0) list = list.filter((p) => activeFocus.has(slugToFocus.get(p.slug) ?? ""));
    if (activeTypes.size > 0) list = list.filter((p) => activeTypes.has(p.category));
    if (activeFormats.size > 0) list = list.filter((p) => p.format && activeFormats.has(p.format));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, activeFocus, slugToFocus, activeTypes, activeFormats, query, sort]);

  const activeCount =
    activeFocus.size + activeTypes.size + activeFormats.size + (query.trim() ? 1 : 0);
  const nothingActive = activeCount === 0;

  const resetAll = () => {
    setActiveFocus(new Set());
    setActiveTypes(new Set());
    setActiveFormats(new Set());
    setQuery("");
  };

  const SORT_LABELS: Record<typeof sort, string> = {
    featured: "Featured",
    az: "A–Z",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
  };

  const focusOptions = focusGroups.map((g) => ({ value: g.label, label: g.label }));

  const filterBody = (
    <>
      <div className="relative mb-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-md border border-stone bg-ivory-soft py-2.5 pl-9 pr-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/40 focus:border-sage-deep"
        />
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-xs text-charcoal/40" />
      </div>

      <CheckboxGroup title="Category" options={focusOptions} selected={activeFocus} onToggle={(v) => toggle(activeFocus, setActiveFocus, v)} />
      <CheckboxGroup title="Product Format" options={formats.filter((f) => f.value !== "all") as { value: ProductFormat; label: string }[]} selected={activeFormats} onToggle={(v) => toggle(activeFormats, setActiveFormats, v)} />

    </>
  );

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-charcoal md:text-4xl">Shop</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-soft-gray">
          Every EVLV product is rigorously lab tested, with multiple samples sent for every batch to ensure
          consistency, accuracy, and complete transparency. For laboratory and research use only.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr] md:gap-10">
        {/* Sidebar -- desktop only */}
        <aside className="hidden md:sticky md:top-28 md:block md:self-start">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal/50">Filter</span>
            {!nothingActive && (
              <button type="button" onClick={resetAll} className="text-xs font-medium text-copper hover:text-copper-dark">
                Clear all
              </button>
            )}
          </div>
          {filterBody}
        </aside>

        {/* Grid + mobile controls */}
        <div>
          <div className="mb-6 flex items-center justify-between gap-3 border-b border-stone pb-4">
            {/* Mobile: Filter + Sort trigger buttons */}
            <div className="flex flex-1 items-center gap-2.5 md:hidden">
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-charcoal/20 bg-white px-4 py-2.5 text-xs font-semibold text-charcoal"
              >
                <i className="ri-filter-3-line" /> Filter {activeCount > 0 && `(${activeCount})`}
              </button>
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setSortOpen((o) => !o)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-charcoal/20 bg-white px-4 py-2.5 text-xs font-semibold text-charcoal"
                >
                  {SORT_LABELS[sort]}
                  <i className={`ri-arrow-down-s-line transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-lg border border-stone bg-white py-1.5 shadow-lg">
                    {(Object.keys(SORT_LABELS) as (typeof sort)[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSort(key);
                          setSortOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm transition ${
                          key === sort ? "font-semibold text-sage-deep" : "text-charcoal/70 hover:bg-ivory-soft"
                        }`}
                      >
                        {SORT_LABELS[key]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: results count + sort */}
            <p className="hidden text-sm text-charcoal/50 md:block">{filtered.length} results</p>
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                className="inline-flex items-center gap-2 rounded-md border border-stone bg-white px-3.5 py-2 text-xs font-semibold text-charcoal/70 transition hover:border-charcoal/30"
              >
                Sort: {SORT_LABELS[sort]}
                <i className={`ri-arrow-down-s-line transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-lg border border-stone bg-white py-1.5 shadow-lg">
                  {(Object.keys(SORT_LABELS) as (typeof sort)[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSort(key);
                        setSortOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition ${
                        key === sort ? "font-semibold text-sage-deep" : "text-charcoal/70 hover:bg-ivory-soft"
                      }`}
                    >
                      {SORT_LABELS[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="mb-4 text-xs text-charcoal/40 md:hidden">{filtered.length} results</p>

          {filtered.length === 0 ? (
            <div className="rounded-lg border border-stone bg-ivory-soft py-16 text-center text-sm text-charcoal/50">
              No products match these filters.{" "}
              <button type="button" onClick={resetAll} className="font-semibold text-copper hover:text-copper-dark">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFilterOpen(false)}
            className="absolute inset-0 bg-charcoal/40"
          />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone px-5 py-4">
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-charcoal">Filter</span>
              <button type="button" onClick={() => setFilterOpen(false)} aria-label="Close" className="text-xl text-charcoal/60">
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">{filterBody}</div>
            <div className="flex items-center gap-3 border-t border-stone px-5 py-4">
              {!nothingActive && (
                <button type="button" onClick={resetAll} className="text-xs font-semibold text-copper hover:text-copper-dark">
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="ml-auto flex-1 rounded-full bg-charcoal py-3 text-xs font-semibold uppercase tracking-[0.15em] text-ivory"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
