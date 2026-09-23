"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import type { CoaEntry } from "@/lib/coa-data";
import { getProductImage } from "@/lib/product-images";

type Filter = "all" | "peptides" | "ancillaries" | "oral" | "available";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All products" },
  { value: "peptides", label: "Peptides" },
  { value: "ancillaries", label: "Ancillaries" },
  { value: "oral", label: "Oral research" },
  { value: "available", label: "Reports available" },
];

export function CoasClient({ coaMap }: { coaMap: Record<string, CoaEntry> }) {
  const products = useMemo(() => getProducts(), []);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("search") ?? "");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = products.filter((product) => {
    const term = query.trim().toLowerCase();
    const coa = coaMap[product.slug];
    const matchesQuery = !term || product.name.toLowerCase().includes(term) || (coa?.label ?? "").toLowerCase().includes(term) || (product.casNumber ?? "").toLowerCase().includes(term);
    const matchesFilter = filter === "all" || (filter === "available" && Boolean(coa)) || (filter === "oral" && product.format === "oral") || product.category === filter;
    return matchesQuery && matchesFilter;
  });

  const availableCount = products.filter((product) => coaMap[product.slug]).length;

  return (
    <main className="bg-white">
      <section className="cp-info-hero cp-info-quality">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Batch documentation</p>
          <h1 className="font-display font-semibold text-white">Certificates of Analysis</h1>
          <p className="mt-5 text-base leading-relaxed text-white/70">Search product and batch documentation in one place. Reports open directly from the independent laboratory file.</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1240px] px-4 md:px-8">
          <div className="rounded-2xl border border-stone bg-[#f4f7f5] p-4 md:p-6">
            <div className="relative">
              <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-lg text-charcoal/40" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product, batch code, or CAS number…" className="h-15 w-full rounded-xl border border-stone bg-white pl-13 pr-5 text-base text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-sage-deep focus:shadow-[0_0_0_3px_rgba(50,118,87,.08)]" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">{FILTERS.map((item) => <button key={item.value} type="button" onClick={() => setFilter(item.value)} className={`rounded-full border px-4 py-2 text-[11px] font-semibold transition ${filter === item.value ? "border-sage-deep bg-sage-deep text-white" : "border-stone bg-white text-charcoal/65 hover:border-sage-deep hover:text-sage-deep"}`}>{item.label}</button>)}</div>
          </div>

          <div className="mb-6 mt-10 flex items-end justify-between gap-4">
            <div><p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage-deep">Document library</p><h2 className="mt-2 font-display text-2xl font-semibold text-charcoal">Batch verification reports</h2></div>
            <p className="text-xs text-charcoal/45">{availableCount} reports currently on file</p>
          </div>

          {filtered.length === 0 ? <div className="rounded-xl border border-stone bg-[#f4f7f5] py-16 text-center"><i className="ri-file-search-line text-3xl text-charcoal/25" /><p className="mt-3 text-sm text-charcoal/50">No documentation matches &ldquo;{query}&rdquo;.</p></div> : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {filtered.map((product) => {
                const coa = coaMap[product.slug];
                const body = <><div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f4f7f5]"><Image src={getProductImage(product)} alt={product.name} width={160} height={160} className="h-full w-full object-cover" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-charcoal">{product.name}</p><p className="mt-1 font-mono text-[11px] text-charcoal/45">{coa?.label || product.casNumber || "Report upload pending"}</p><span className={`mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide ${coa ? "text-sage-deep" : "text-charcoal/35"}`}><i className={coa ? "ri-checkbox-circle-fill" : "ri-time-line"} />{coa ? "View laboratory report" : "Report pending"}</span></div><i className={`shrink-0 text-lg ${coa ? "ri-arrow-right-up-line text-sage-deep" : "ri-lock-line text-charcoal/20"}`} /></>;
                const className = `flex items-center gap-4 rounded-xl border border-stone bg-white p-4 text-left transition ${coa ? "hover:-translate-y-0.5 hover:border-sage-deep hover:shadow-[0_14px_35px_rgba(11,47,44,.08)]" : "opacity-60"}`;
                return coa ? <a key={product.id} href={coa.url} target="_blank" rel="noreferrer" className={className}>{body}</a> : <div key={product.id} className={className}>{body}</div>;
              })}
            </div>
          )}

          <div className="mt-14 grid grid-cols-1 gap-4 border-t border-stone pt-10 sm:grid-cols-3">
            {[["ri-test-tube-line","Independent analysis","Reports from qualified third-party laboratories."],["ri-fingerprint-line","Identity verification","Analytical documentation linked to specific batches."],["ri-links-line","Direct access","Open original reports without hidden request forms."]].map(([icon,title,copy]) => <div key={title} className="flex gap-4 p-3"><i className={`${icon} text-xl text-sage-deep`} /><div><h3 className="text-sm font-semibold text-charcoal">{title}</h3><p className="mt-1 text-xs leading-5 text-charcoal/50">{copy}</p></div></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
