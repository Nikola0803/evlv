"use client";

import Link from "next/link";
import { useCurrency } from "@/lib/currency-context";

const PENS = [
  {
    slug: "bpc-157-pen",
    name: "BPC-157 Pen",
    dose: "5mg",
    usdPrice: 189,
    description: "Tissue repair & gut healing peptide. 5mg pre-filled autoinjector, 30 doses.",
  },
  {
    slug: "tb-500-pen",
    name: "TB-500 Pen",
    dose: "10mg",
    usdPrice: 219,
    description: "Recovery & healing support. 10mg pre-filled autoinjector, 30 doses.",
  },
  {
    slug: "sermorelin-pen",
    name: "Sermorelin Pen",
    dose: "5mg",
    usdPrice: 199,
    description: "Growth hormone releasing peptide. 5mg pre-filled autoinjector, 30 doses.",
  },
  {
    slug: "ipamorelin-pen",
    name: "Ipamorelin Pen",
    dose: "10mg",
    usdPrice: 229,
    description: "GH secretagogue. 10mg pre-filled autoinjector, 30 doses.",
  },
  {
    slug: "pt-141-pen",
    name: "PT-141 Pen",
    dose: "10mg",
    usdPrice: 249,
    description: "Melanocortin receptor agonist. 10mg pre-filled autoinjector, 20 doses.",
  },
  {
    slug: "melanotan-ii-pen",
    name: "Melanotan II Pen",
    dose: "10mg",
    usdPrice: 219,
    description: "MT-II research peptide. 10mg pre-filled autoinjector, 20 doses.",
  },
  {
    slug: "ghk-cu-pen",
    name: "GHK-Cu Pen",
    dose: "50mg",
    usdPrice: 189,
    description: "Copper peptide complex. 50mg pre-filled autoinjector, 30 doses.",
  },
  {
    slug: "nad-pen",
    name: "NAD+ Pen",
    dose: "500mg",
    usdPrice: 299,
    description: "Nicotinamide adenine dinucleotide. 500mg pre-filled autoinjector, 20 doses.",
  },
  {
    slug: "epitalon-pen",
    name: "Epitalon Pen",
    dose: "10mg",
    usdPrice: 209,
    description: "Telomere bioregulator peptide. 10mg pre-filled autoinjector, 20 doses.",
  },
  {
    slug: "cjc-ipa-pen",
    name: "CJC+Ipa Blend Pen",
    dose: "10mg",
    usdPrice: 269,
    description: "CJC-1295 + Ipamorelin blend. 10mg pre-filled autoinjector, 30 doses.",
  },
];

export function VipPensPanel() {
  const { formatPrice, convert } = useCurrency();

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded-xl bg-charcoal p-6 md:p-8">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-copper">VIP Access</p>
        <h2 className="font-display text-2xl font-semibold text-ivory md:text-3xl">EVLV Pens</h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ivory/60">
          Pre-filled autoinjector pens — precision dosing, no reconstitution required. Available exclusively to verified EVLV members. For research use only.
        </p>
        <Link
          href="/pens"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-copper px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light"
        >
          Shop All Pens <i className="ri-arrow-right-line" />
        </Link>
      </div>

      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">Available Now ({PENS.length})</h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PENS.map((pen) => (
          <Link
            key={pen.slug}
            href={`/pens#${pen.slug}`}
            className="group flex items-start gap-4 rounded-lg border border-stone bg-ivory-soft p-4 transition hover:border-charcoal/30 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal/8 text-charcoal/50 group-hover:bg-copper/15 group-hover:text-copper">
              <i className="ri-medicine-bottle-line text-base" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-charcoal">{pen.name}</p>
                <span className="shrink-0 text-sm font-semibold text-charcoal">{formatPrice(pen.usdPrice)}</span>
              </div>
              <p className="mt-0.5 text-[11px] text-charcoal/50">{pen.dose} · 1 pen</p>
              <p className="mt-1 text-xs leading-relaxed text-charcoal/60 line-clamp-2">{pen.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-charcoal/40">
        Pens are for laboratory research use only. Not for human consumption.
      </p>
    </div>
  );
}
