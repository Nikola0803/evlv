"use client";

import { useMemo, useState } from "react";
import { getProducts } from "@/lib/products";

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

export function LabResultsClient() {
  const batches = useMemo(() => getProducts().filter((p) => p.batch), []);
  const [query, setQuery] = useState("");

  const filtered = batches.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.batch!.code.toLowerCase().includes(q);
  });

  return (
    <>
      <section className="bg-sage-deep py-20 text-center text-white md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sage-light">
            <i className="ri-shield-check-line" /> Independent Verification
          </div>
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-5xl lg:text-6xl">Lab Results</h1>
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

          <div className="overflow-x-auto rounded-lg border border-stone">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-ivory-soft">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-charcoal/70 md:px-6">Batch</th>
                  <th className="px-4 py-3 text-left font-semibold text-charcoal/70 md:px-6">Product</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-charcoal/70 md:table-cell md:px-6">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-charcoal/70 md:px-6">Purity</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-charcoal/70 sm:table-cell md:px-6">Avg. Mass</th>
                  <th className="px-4 py-3 text-left font-semibold text-charcoal/70 md:px-6">Status</th>
                  <th className="px-4 py-3 text-right font-semibold text-charcoal/70 md:px-6">Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone">
                {filtered.map((p) => (
                  <tr key={p.id} className="transition hover:bg-ivory-soft/50">
                    <td className="px-4 py-4 font-mono text-xs text-charcoal/60 md:px-6">{p.batch!.code}</td>
                    <td className="px-4 py-4 font-medium text-charcoal md:px-6">{p.name}</td>
                    <td className="hidden px-4 py-4 text-charcoal/50 md:table-cell md:px-6">{p.batch!.date}</td>
                    <td className="px-4 py-4 md:px-6">
                      <span className="font-semibold text-sage-deep">{p.purity ?? "—"}</span>
                    </td>
                    <td className="hidden px-4 py-4 text-charcoal/60 sm:table-cell md:px-6">{p.avgMass ?? "—"}</td>
                    <td className="px-4 py-4 md:px-6">
                      <span className="inline-flex items-center gap-1 rounded-full bg-sage-mist px-2.5 py-1 text-xs font-semibold text-sage-deep">
                        <i className="ri-checkbox-circle-fill" /> PASS
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right md:px-6">
                      <button type="button" className="text-xs font-medium text-sage-deep transition hover:underline">
                        View <i className="ri-external-link-line" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
