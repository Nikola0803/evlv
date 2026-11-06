"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredUser, type AuthUser } from "@/lib/auth";
import { useCurrency } from "@/lib/currency-context";

const PENS = [
  {
    slug: "bpc-157-pen",
    name: "BPC-157",
    subtitle: "Tissue Repair Pen",
    dose: "5mg",
    doses: 30,
    usdPrice: 189,
    cadPrice: 261,
    description:
      "BPC-157 (Body Protection Compound) pre-filled autoinjector. 5mg per pen, 30 single-dose cartridges. Sterile, lyophilised peptide. For laboratory research use only.",
    tags: ["Repair", "Gut"],
  },
  {
    slug: "tb-500-pen",
    name: "TB-500",
    subtitle: "Recovery Pen",
    dose: "10mg",
    doses: 30,
    usdPrice: 219,
    cadPrice: 302,
    description:
      "Thymosin Beta-4 fragment pre-filled autoinjector. 10mg per pen, 30 doses. Supports tissue healing and angiogenesis research. For laboratory research use only.",
    tags: ["Recovery", "Healing"],
  },
  {
    slug: "sermorelin-pen",
    name: "Sermorelin",
    subtitle: "GH Releasing Pen",
    dose: "5mg",
    doses: 30,
    usdPrice: 199,
    cadPrice: 275,
    description:
      "Sermorelin GHRH analogue pre-filled autoinjector. 5mg per pen, 30 doses. Growth hormone secretagogue research compound. For laboratory research use only.",
    tags: ["GH", "Peptides"],
  },
  {
    slug: "ipamorelin-pen",
    name: "Ipamorelin",
    subtitle: "GH Secretagogue Pen",
    dose: "10mg",
    doses: 30,
    usdPrice: 229,
    cadPrice: 316,
    description:
      "Ipamorelin GH secretagogue pre-filled autoinjector. 10mg per pen, 30 doses. Selective GHSR agonist, minimal side-effect profile in research. For laboratory research use only.",
    tags: ["GH", "Peptides"],
  },
  {
    slug: "pt-141-pen",
    name: "PT-141",
    subtitle: "MC Receptor Pen",
    dose: "10mg",
    doses: 20,
    usdPrice: 249,
    cadPrice: 344,
    description:
      "Bremelanotide (PT-141) pre-filled autoinjector. 10mg per pen, 20 doses. Melanocortin receptor agonist research compound. For laboratory research use only.",
    tags: ["MC Receptor"],
  },
  {
    slug: "melanotan-ii-pen",
    name: "Melanotan II",
    subtitle: "MT-II Research Pen",
    dose: "10mg",
    doses: 20,
    usdPrice: 219,
    cadPrice: 302,
    description:
      "Melanotan II pre-filled autoinjector. 10mg per pen, 20 doses. Synthetic melanotropin analogue for melanocyte and sexual function research. For laboratory research use only.",
    tags: ["Melanocortin"],
  },
  {
    slug: "ghk-cu-pen",
    name: "GHK-Cu",
    subtitle: "Copper Peptide Pen",
    dose: "50mg",
    doses: 30,
    usdPrice: 189,
    cadPrice: 261,
    description:
      "GHK-Cu (Copper Peptide) pre-filled autoinjector. 50mg per pen, 30 doses. Tissue remodelling and wound-healing research compound. For laboratory research use only.",
    tags: ["Copper", "Repair"],
  },
  {
    slug: "nad-pen",
    name: "NAD+",
    subtitle: "Coenzyme Pen",
    dose: "500mg",
    doses: 20,
    usdPrice: 299,
    cadPrice: 413,
    description:
      "Nicotinamide Adenine Dinucleotide pre-filled autoinjector. 500mg per pen, 20 doses. Mitochondrial function and cellular energy research. For laboratory research use only.",
    tags: ["Mitochondria", "NAD"],
  },
  {
    slug: "epitalon-pen",
    name: "Epitalon",
    subtitle: "Telomere Bioregulator Pen",
    dose: "10mg",
    doses: 20,
    usdPrice: 209,
    cadPrice: 288,
    description:
      "Epitalon (Epithalon) tetrapeptide pre-filled autoinjector. 10mg per pen, 20 doses. Pineal gland bioregulator and telomere length research. For laboratory research use only.",
    tags: ["Bioregulator", "Telomere"],
  },
  {
    slug: "cjc-ipa-pen",
    name: "CJC+Ipa Blend",
    subtitle: "Synergy GH Pen",
    dose: "10mg",
    doses: 30,
    usdPrice: 269,
    cadPrice: 371,
    description:
      "CJC-1295 + Ipamorelin blend pre-filled autoinjector. 10mg per pen, 30 doses. Synergistic GHRH + GHSR agonism research. For laboratory research use only.",
    tags: ["GH", "Blend"],
  },
];

function PenCard({
  pen,
  formatPrice,
  currency,
}: {
  pen: (typeof PENS)[number];
  formatPrice: (n: number) => string;
  currency: string;
}) {
  const displayPrice = currency === "CAD" ? pen.cadPrice : pen.usdPrice;

  return (
    <article
      id={pen.slug}
      className="group flex flex-col overflow-hidden rounded-xl border border-stone bg-white transition hover:border-charcoal/20 hover:shadow-md"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-charcoal/5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-charcoal/10">
          <i className="ri-medicine-bottle-line text-3xl text-charcoal/40" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {pen.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-copper/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-copper">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-semibold text-charcoal">{pen.name}</h3>
        <p className="text-xs font-medium text-charcoal/50">{pen.subtitle}</p>

        <p className="mt-2 flex-1 text-xs leading-relaxed text-charcoal/60">{pen.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone pt-4">
          <div>
            <p className="font-display text-lg font-semibold text-charcoal">{formatPrice(displayPrice)}</p>
            <p className="text-[10px] text-charcoal/40">
              {pen.dose} · {pen.doses} doses
            </p>
          </div>
          <button
            type="button"
            className="rounded-md bg-charcoal px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ivory transition hover:bg-charcoal/80"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

function VipGate() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <div className="mb-5 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-copper/15">
          <i className="ri-vip-crown-line text-2xl text-copper" />
        </div>
      </div>
      <h2 className="font-display text-2xl font-semibold text-charcoal">VIP Members Only</h2>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
        EVLV pens are available to verified VIP accounts. Sign in to your account — if your membership is approved, pens will appear in your dashboard.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/account?tab=vip-pens"
          className="rounded-md bg-copper px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light"
        >
          Go to My Account
        </Link>
        <Link
          href="/shop"
          className="rounded-md border border-charcoal px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal hover:text-ivory"
        >
          Shop Vials
        </Link>
      </div>
    </div>
  );
}

export function PensPageClient() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);
  const { currency, formatPrice } = useCurrency();

  useEffect(() => {
    setUser(getStoredUser());
    setMounted(true);
  }, []);

  const isCanada = currency === "CAD";
  const isVip = user?.membershipStatus === "APPROVED";
  const canSee = isCanada || isVip;

  return (
    <>
      <section className="cp-info-hero -mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-white/50">Pre-Filled Autoinjectors</p>
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-5xl lg:text-6xl">EVLV Pens.</h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Precision peptide delivery. No reconstitution. No measuring. Ready-to-use autoinjector pens for laboratory research.
          </p>
          {canSee && (
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
              <span className="flex items-center gap-1.5"><i className="ri-check-line text-copper" /> Sterile &amp; lyophilised</span>
              <span className="flex items-center gap-1.5"><i className="ri-check-line text-copper" /> &gt;99% purity</span>
              <span className="flex items-center gap-1.5"><i className="ri-check-line text-copper" /> Certificate of analysis</span>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          {!mounted ? null : !canSee ? (
            <VipGate />
          ) : (
            <>
              {!isCanada && isVip && (
                <div className="mb-10 flex items-center gap-3 rounded-lg border border-copper/30 bg-copper/8 px-5 py-3.5 text-sm text-charcoal">
                  <i className="ri-vip-crown-line text-copper" />
                  <span>You&rsquo;re viewing pens as a VIP member. Pens ship to the US and Canada.</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {PENS.map((pen) => (
                  <PenCard key={pen.slug} pen={pen} formatPrice={formatPrice} currency={currency} />
                ))}
              </div>

              <div className="mt-16 rounded-xl border border-stone bg-ivory-soft p-8 text-center">
                <i className="ri-flask-line text-2xl text-charcoal/30" />
                <p className="mt-3 text-sm font-semibold text-charcoal">Research Use Only</p>
                <p className="mt-1 max-w-lg mx-auto text-xs leading-relaxed text-charcoal/50">
                  EVLV pens are intended for in-vitro laboratory research purposes only. Not intended for human consumption, therapeutic use, or veterinary use. Sold to qualified researchers only.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
