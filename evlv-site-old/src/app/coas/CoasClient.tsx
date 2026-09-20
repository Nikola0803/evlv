"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import type { CoaEntry } from "@/lib/coa-data";

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

export function CoasClient({ coaMap }: { coaMap: Record<string, CoaEntry> }) {
  const products = useMemo(() => getProducts(), []);
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const label = coaMap[p.slug]?.label ?? "";
    return p.name.toLowerCase().includes(q) || label.toLowerCase().includes(q);
  });

  // Real counts only -- no fabricated purity/pass-rate numbers here.
  const withCoa = products.filter((p) => coaMap[p.slug]).length;
  const stats: [string, string][] = [
    [String(products.length), "Products"],
    [String(withCoa), "COAs On File"],
    [String(products.length - withCoa), "Pending Upload"],
  ];

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
        <div className="mx-auto grid max-w-[1400px] grid-cols-3 gap-6 px-4 md:px-8">
          {stats.map(([value, label]) => (
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
              {filtered.map((p) => {
                const coa = coaMap[p.slug];
                const cardClass =
                  "flex items-center gap-4 rounded-lg border border-stone bg-white p-4 text-left transition";
                const content = (
                  <>
                    <div className="h-16 w-13 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
                      {p.image && <Image src={p.image} alt={p.name} width={90} height={112} className="h-full w-full object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-charcoal">{p.name}</p>
                      {coa?.label && <p className="mt-0.5 font-mono text-xs text-charcoal/50">{coa.label}</p>}
                      <div className="mt-2 flex items-center gap-2">
                        {coa ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-sage-mist px-2 py-0.5 text-[10px] font-semibold text-sage-deep">
                            <i className="ri-checkbox-circle-fill" /> COA on file
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-stone/50 px-2 py-0.5 text-[10px] font-semibold text-charcoal/40">
                            <i className="ri-time-line" /> COA pending
                          </span>
                        )}
                      </div>
                    </div>
                    <i
                      className={`shrink-0 text-lg ${coa ? "ri-external-link-line text-sage-deep" : "ri-arrow-right-s-line text-charcoal/20"}`}
                    />
                  </>
                );

                return coa ? (
                  <a
                    key={p.id}
                    href={coa.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`${cardClass} hover:border-sage-deep hover:shadow-md`}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={p.id} className={`${cardClass} cursor-default opacity-70`}>
                    {content}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

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
