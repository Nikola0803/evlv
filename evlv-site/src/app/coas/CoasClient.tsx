"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

const STATS = [
  ["100%", "Batches Tested"],
  ["16+", "Active Reports"],
  ["99.2%", "Avg. Purity"],
  ["0", "Failed Batches"],
];

const WHY_POINTS = [
  "HPLC purity analysis with quantification",
  "Mass spectrometry for molecular identity",
  "Multiple samples tested per batch",
  "Reports verifiable directly with the testing lab",
];

const PROTOCOL = [
  ["1", "Sample Collection", "Multiple vials randomly selected from each batch"],
  ["2", "Lab Analysis", "HPLC and mass spectrometry testing at an independent facility"],
  ["3", "Report Publishing", "Results linked to batch numbers on product pages"],
  ["4", "Customer Verification", "Match your vial batch number to the published report"],
];

export function CoasClient() {
  const batches = useMemo(() => getProducts().filter((p) => p.batch), []);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = batches.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.batch!.code.toLowerCase().includes(q);
  });

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-copper">
            <i className="ri-shield-check-line" /> Independent Verification
          </div>
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-5xl lg:text-6xl">COAs</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Every batch is independently tested. View purity, mass and batch verification for complete transparency.
          </p>
        </div>
      </section>

      <section className="border-b border-stone py-14">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-8">
          {STATS.map(([value, label]) => (
            <div key={label} className="p-4 text-center">
              <div className="font-display text-3xl font-semibold text-sage-deep md:text-4xl">{value}</div>
              <div className="mt-1 text-sm text-charcoal/50">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="font-display text-xl font-semibold text-charcoal md:text-2xl">Batch Verification Reports</h2>
            <div className="relative w-full sm:w-72">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search batch or product..."
                className="w-full rounded-md border border-stone bg-ivory-soft py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-sage-deep"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-charcoal/50">No batches match &ldquo;{query}&rdquo;.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelected(p)}
                  className="flex items-center gap-4 rounded-lg border border-stone bg-white p-4 text-left transition hover:border-sage-deep hover:shadow-md"
                >
                  <div className="h-16 w-13 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
                    {p.image && <Image src={p.image} alt={p.name} width={90} height={112} className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-charcoal">{p.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-charcoal/50">{p.batch!.code}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-sage-mist px-2 py-0.5 text-[10px] font-semibold text-sage-deep">
                        <i className="ri-checkbox-circle-fill" /> PASS
                      </span>
                      {p.purity && <span className="text-xs font-medium text-charcoal/60">{p.purity} purity</span>}
                    </div>
                  </div>
                  <i className="ri-arrow-right-s-line shrink-0 text-lg text-charcoal/30" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div aria-hidden onClick={() => setSelected(null)} className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm" />

          <div className="relative w-full max-w-lg overflow-hidden rounded-lg border border-copper/15 bg-ivory shadow-2xl">
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/10 text-charcoal/60 transition hover:bg-charcoal/20 hover:text-charcoal"
            >
              <i className="ri-close-line text-lg" />
            </button>

            <div className="h-1 w-full bg-copper" />
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between border-b border-stone pb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-deep text-ivory">
                    <i className="ri-shield-check-fill text-base" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-charcoal/50">Certificate of Analysis</p>
                    <p className="mt-0.5 font-display text-xl font-semibold">{selected.name}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[11px] uppercase tracking-wider text-charcoal/50">Batch</p>
                  <p className="mt-1 font-mono text-sm text-charcoal/70">{selected.batch!.code}</p>
                </div>
              </div>

              <div className="border-b border-stone py-8 text-center">
                <p className="font-display text-6xl font-semibold text-charcoal">{selected.purity ?? "On file"}</p>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-charcoal/50">Tested Purity</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-stone py-6 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-charcoal/40">Test Date</p>
                  <p className="mt-1 font-medium text-charcoal">{selected.batch!.date}</p>
                </div>
                {selected.avgMass && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-charcoal/40">Avg. Mass</p>
                    <p className="mt-1 font-medium text-charcoal">{selected.avgMass}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-charcoal/40">Method</p>
                  <p className="mt-1 font-medium text-charcoal">HPLC, LC-MS</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-mist px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-sage-deep">
                  <i className="ri-checkbox-circle-fill" /> Independently Verified, Pass
                </span>
                <Link
                  href={`/shop/${selected.slug}`}
                  onClick={() => setSelected(null)}
                  className="rounded-md bg-copper px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="bg-sage-forest py-20 text-white md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="mb-4 font-display text-3xl font-semibold md:text-4xl">Why independent testing?</h2>
            <p className="mb-6 leading-relaxed text-white/60">
              Independent laboratory analysis is the gold standard for verifying research peptides. HPLC and mass
              spectrometry methods provide unambiguous verification of purity, identity and mass for every compound.
            </p>
            <ul className="space-y-3 text-sm">
              {WHY_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <i className="ri-check-line mt-0.5 text-sage-light" />
                  <span className="text-white/70">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/30">
                <i className="ri-flask-line text-2xl text-sage-light" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Testing Protocol</h3>
                <p className="text-xs text-white/50">Every batch undergoes rigorous QC</p>
              </div>
            </div>
            <div className="space-y-4">
              {PROTOCOL.map(([num, title, desc]) => (
                <div key={num} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage text-xs font-semibold text-white">{num}</div>
                  <div>
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="text-xs text-white/50">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
