import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WholesaleForm } from "./WholesaleForm";
import { Reveal } from "@/components/ui/Reveal";

const SITE_URL = "https://www.evlvpeptides.com";

export const metadata: Metadata = {
  title: "Wholesale Peptides USA | Lab-Grade Bulk Supply & White Label | EVLV",
  description:
    "EVLV wholesale peptides for qualified U.S. research businesses. Low-MOQ bulk lab-grade peptide supply, lot-specific COAs, 21 CFR 809.10(c) labeling, dedicated account support, and U.S. fulfillment. Apply to the vetted partner program.",
  keywords: [
    "wholesale peptides",
    "wholesale peptides usa",
    "bulk peptide supply",
    "lab-grade peptide supply",
    "research peptide wholesale",
    "buy peptides in bulk",
    "bulk research peptides USA",
    "peptide wholesale supplier",
    "peptide reseller program",
    "peptide white label",
    "peptide private label",
    "wholesale peptides coa",
    "RUO wholesale peptides",
  ],
  alternates: { canonical: "/wholesale" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/wholesale`,
    title: "Wholesale Peptides USA — Bulk Lab-Grade Supply & White Label | EVLV",
    description: "Low-MOQ wholesale peptides for qualified U.S. research businesses. 21 CFR 809.10(c) labeled, lot-specific COAs, dedicated account support, U.S. fulfillment.",
    images: [{
      url: "/images/wholesale/evlv-b2b-fulfillment.png",
      width: 1600,
      height: 900,
      alt: "EVLV wholesale research-product fulfillment operation",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Peptides USA | Lab-Grade Bulk Supply | EVLV",
    description: "Vetted bulk peptide supply for qualified U.S. research businesses. Low-MOQ, 21 CFR 809.10(c) labeled, lot-specific COAs, dedicated account support.",
    images: ["/images/wholesale/evlv-b2b-fulfillment.png"],
  },
};

const WHOLESALE_SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/wholesale#service`,
  name: "EVLV Research Peptide Wholesale and Bulk Supply",
  serviceType: "Bulk research peptide wholesale, white label, reseller supply, and U.S. fulfillment",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  audience: { "@type": "BusinessAudience", audienceType: "Qualified research-product businesses and resellers" },
  url: `${SITE_URL}/wholesale`,
  image: `${SITE_URL}/images/wholesale/evlv-b2b-fulfillment.png`,
};

const WHOLESALE_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/wholesale#webpage`,
  url: `${SITE_URL}/wholesale`,
  name: "Wholesale Peptides USA for Approved U.S. Businesses",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/wholesale/evlv-b2b-fulfillment.png`,
  },
};

const FAQ = [
  {
    question: "Where can a qualified U.S. business buy wholesale peptides?",
    answer:
      "EVLV supplies wholesale peptides to vetted U.S. research-product businesses. All products are labeled in accordance with 21 CFR 809.10(c) and accompanied by lot-specific certificates of analysis. Partner pricing and catalog access are provided after reviewing the business, expected volume, and research-use-only operating plan.",
  },
  {
    question: "What compliance labeling do EVLV wholesale peptides carry?",
    answer:
      "All products supplied through EVLV's wholesale program are labeled 'For Research Use Only – Not for Human or Animal Use' in accordance with 21 CFR 809.10(c). Lot-specific COAs from independent accredited laboratories accompany every batch. This documentation is available to partners to demonstrate their supply chain to institutional buyers.",
  },
  {
    question: "Does EVLV offer low-MOQ wholesale peptides?",
    answer:
      "Yes. Core catalog products are available for wholesale with low minimum order quantities. Larger volume pricing and custom multi-SKU orders are available for established partners. Minimums, pricing, and catalog access are confirmed during the review process.",
  },
  {
    question: "What is the turnaround time for wholesale peptide orders?",
    answer:
      "Available catalog products are in stock and ready to fulfill. Standard wholesale orders for in-stock catalog items are prepared and dispatched within 3–5 business days. Partners receive tracked U.S. fulfillment with complete order records.",
  },
  {
    question: "Does EVLV offer dedicated account support for wholesale partners?",
    answer:
      "Yes. Approved wholesale partners receive a direct account support path for pricing quotes, volume forecasting, inventory holds, order planning, and catalog questions. Account inquiries are handled by the EVLV partner team.",
  },
  {
    question: "Is white-label peptide packaging available?",
    answer:
      "White-label projects are available to approved partners after extended compliance review. Packaging, minimums, catalog selection, documentation, and fulfillment responsibilities are agreed before launch. White label requires a documented operating plan and an additional compliance vetting step beyond standard wholesale.",
  },
  {
    question: "Can partners resell EVLV research peptides for personal use?",
    answer:
      "No. Eligible products are supplied for lawful laboratory, in-vitro, and analytical research only. They are not for human or veterinary use. Partners must preserve the research-use-only boundary in all listings, labels, and customer communications. Partners are solely responsible for the lawful handling and use of these products in their jurisdiction.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const PROGRAMS = [
  {
    number: "01",
    icon: "ri-box-3-line",
    title: "Bulk Wholesale",
    eyebrow: "Stock it. Sell it.",
    body: "Purchase finished EVLV research products at volume pricing and fulfill from your own operation. Low-MOQ access on core catalog products. All products labeled per 21 CFR 809.10(c).",
    points: ["Low-MOQ access on core catalog", "Lot-specific COAs on every batch", "3–5 day dispatch on in-stock items", "Flexible multi-SKU volume pricing"],
  },
  {
    number: "02",
    icon: "ri-palette-line",
    title: "White Label",
    eyebrow: "Your brand. Built properly.",
    body: "Launch a distinct research brand with custom packaging and a storefront supported by our infrastructure. Requires extended compliance review and a documented operating plan.",
    points: ["Custom brand and packaging", "Optional storefront and CRM", "Complete batch documentation", "Extended compliance vetting required"],
    featured: true,
    status: "By application — extended review",
  },
];

const CAPABILITIES = [
  { icon: "ri-shield-check-line", title: "21 CFR 809.10(c) compliance", body: "All products labeled 'For Research Use Only – Not for Human or Animal Use' per 21 CFR 809.10(c). Lot-specific COAs from independent accredited labs." },
  { icon: "ri-microscope-line", title: ">98% purity, GMP-aligned supply", body: "Each lot verified at >98% purity by HPLC and identity-confirmed by mass spectrometry. Sourced from GMP-aligned manufacturing with consistent synthesis standards." },
  { icon: "ri-customer-service-2-line", title: "Dedicated account support", body: "One direct contact for quotes, inventory holds, volume forecasting, and order planning. Account inquiries handled by the EVLV partner team." },
  { icon: "ri-map-pin-2-line", title: "Low-MOQ U.S. fulfillment", body: "Low minimum order quantities on core catalog products. Domestic pick, pack, dispatch, and tracked delivery — maintaining the product record from inventory to customer." },
];

const COMPARISON = [
  {
    feature: "Low-MOQ Bulk Wholesale",
    detail: "Core catalog on the shelf. Low minimums. Volume pricing confirmed after review.",
    available: true,
  },
  {
    feature: "White Label",
    detail: "Custom packaging, catalog, storefront, and fulfillment. Extended review required.",
    available: true,
    note: "By application",
  },
  {
    feature: "Direct Dropshipping",
    detail: "Not offered. EVLV does not operate a dropshipping program.",
    available: false,
  },
  {
    feature: "21 CFR 809.10(c) Labeling",
    detail: "All products labeled 'For Research Use Only – Not for Human or Animal Use' on every batch.",
    available: true,
  },
  {
    feature: "Lot-Specific COAs",
    detail: "Independent third-party HPLC and mass spectrometry reports matched to specific batches.",
    available: true,
  },
  {
    feature: "Dedicated Account Support",
    detail: "Direct partner contact for quotes, inventory holds, forecasting, and order planning.",
    available: true,
  },
  {
    feature: "U.S. Fulfillment",
    detail: "Domestic pick, pack, tracked dispatch. 3–5 business day turnaround on in-stock items.",
    available: true,
  },
];

const STEPS = [
  { number: "01", title: "Submit an inquiry", body: "Tell us whether you need bulk wholesale, white label, or a combination. Include your catalog needs, expected volume, and operating model." },
  { number: "02", title: "Review and qualify", body: "We review your business, catalog, audience, and research-use-only operating plan. An account contact is assigned for follow-up." },
  { number: "03", title: "Receive a scoped offer", body: "You get a clear commercial proposal covering pricing, MOQs, catalog access, documentation, and fulfillment terms." },
  { number: "04", title: "Build and fulfill", body: "Products, documentation, optional branding, and fulfillment are aligned before your first order." },
];

export default function WholesalePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WHOLESALE_SERVICE_JSON_LD).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WHOLESALE_PAGE_JSON_LD).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />

      <div className="border-b border-stone bg-white py-2.5 text-center text-xs text-charcoal/60">
        Already a partner?{" "}
        <Link href="/account?tab=wholesale" className="font-semibold text-sage-deep underline underline-offset-2 hover:text-charcoal">
          Sign in to your dashboard
        </Link>
      </div>

      {/* Hero */}
      <section className="px-3 pb-12 pt-5 md:px-6 md:pb-16 md:pt-7">
        <div className="relative mx-auto min-h-[650px] max-w-[1400px] overflow-hidden rounded-[26px] bg-[#062f31] text-white shadow-[0_24px_70px_rgba(7,42,43,0.18)] md:min-h-[690px]">
          <Image
            src="/images/wholesale/evlv-b2b-fulfillment.png"
            alt="EVLV wholesale research peptide fulfillment and lab-grade supply operation"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover object-[64%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,36,38,.98)_0%,rgba(4,36,38,.92)_34%,rgba(4,36,38,.42)_61%,rgba(4,36,38,.08)_100%)] md:bg-[linear-gradient(90deg,rgba(4,36,38,.98)_0%,rgba(4,36,38,.92)_35%,rgba(4,36,38,.35)_62%,rgba(4,36,38,.04)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#062f31]/70 to-transparent md:hidden" />

          <div className="relative z-10 flex min-h-[650px] items-center px-6 py-14 sm:px-10 md:min-h-[690px] md:px-16 lg:px-20">
            <div className="max-w-[650px]">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b9d9ce]">
                <span className="h-px w-8 bg-[#b9d9ce]/70" /> EVLV Wholesale Partner Program
              </p>
              <h1 className="font-display text-[42px] font-semibold leading-[1.02] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
                Wholesale peptides, built for serious operators.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                Lab-grade bulk peptide supply for qualified U.S. research businesses. Low-MOQ access,
                21 CFR 809.10(c)-labeled products, lot-specific COAs, and dedicated account support.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                Wholesale and white label available after review. Both require vetting and a documented operating plan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#inquire" className="rounded-md bg-white px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#07383a] transition hover:bg-[#edf5f2]">
                  Apply for partner access <i className="ri-arrow-right-line" />
                </a>
                <a href="#programs" className="rounded-md border border-white/35 bg-white/5 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/12">
                  Compare programs
                </a>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 border-t border-white/15 pt-7 text-xs text-white/75 sm:grid-cols-4">
                <span className="flex items-center gap-2"><i className="ri-archive-2-line text-[#b9d9ce]" /> Low-MOQ access</span>
                <span className="flex items-center gap-2"><i className="ri-time-line text-[#b9d9ce]" /> 3–5 day dispatch</span>
                <span className="flex items-center gap-2"><i className="ri-customer-service-2-line text-[#b9d9ce]" /> Account support</span>
                <span className="flex items-center gap-2"><i className="ri-shield-check-line text-[#b9d9ce]" /> 21 CFR 809.10(c)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance notice */}
      <section className="border-b border-stone bg-[#f5f3ef] py-5">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <p className="text-center text-xs leading-relaxed text-charcoal/65">
            <i className="ri-shield-check-line mr-1.5 text-sage-deep" />
            All products supplied are labeled &quot;For Research Use Only – Not for Human or Animal Use&quot; in accordance with <strong className="text-charcoal">21 CFR 809.10(c)</strong>.
            Partners are solely responsible for the lawful handling, marketing, and use of research products in their jurisdiction.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="pb-20 pt-10 md:pb-28 md:pt-14">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <Reveal className="mx-auto mb-11 max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">Two ways to partner</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-charcoal md:text-5xl">Choose the operating model that fits.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/60 md:text-base">
              Bulk wholesale or white label — or combine both. Every proposal is scoped around your catalog, volume, and fulfillment needs.
            </p>
          </Reveal>

          <Reveal stagger className="mx-auto grid max-w-[900px] grid-cols-1 gap-5 md:grid-cols-2">
            {PROGRAMS.map((program) => (
              <article key={program.title} className={`relative overflow-hidden rounded-2xl border p-7 md:p-8 ${program.featured ? "border-sage-deep bg-[#eef5f2] shadow-[0_16px_45px_rgba(11,65,64,.10)]" : "border-stone bg-white"}`}>
                {"status" in program && program.status && <span className="absolute right-5 top-5 rounded-full bg-charcoal px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/80">{program.status}</span>}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-deep text-xl text-white"><i className={program.icon} /></div>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-sage-deep">{program.number} · {program.eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-charcoal">{program.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{program.body}</p>
                <ul className="mt-6 space-y-3 border-t border-charcoal/10 pt-5">
                  {program.points.map((point) => <li key={point} className="flex items-center gap-2.5 text-sm text-charcoal/75"><i className="ri-check-line text-sage-deep" />{point}</li>)}
                </ul>
                <a href="#inquire" className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-sage-deep">Discuss this model <i className="ri-arrow-right-line" /></a>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Infrastructure / reputation section */}
      <section className="bg-[#f2f6f4] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(10,52,53,.10)]">
            <Image src="/images/wholesale/evlv-white-label-dropship.png" alt="EVLV white label packaging and wholesale fulfillment operation" fill sizes="(max-width: 1024px) 100vw, 650px" className="object-cover" />
          </Reveal>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">More than product supply</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight text-charcoal md:text-5xl">Your supplier&apos;s compliance record is your reputation.</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-charcoal/60 md:text-base">
              Institutional buyers and serious researchers review documentation. EVLV supplies lot-specific COAs,
              21 CFR 809.10(c)-labeled inventory, and complete batch records — so your supply chain can withstand scrutiny.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal/60">
              You drive the marketing and own the customer relationship. EVLV provides the compliant catalog,
              account support, optional branded storefront, and U.S. fulfillment behind it.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {CAPABILITIES.map((item) => (
                <div key={item.title} className="border-t border-charcoal/10 pt-4">
                  <div className="flex items-center gap-2.5"><i className={`${item.icon} text-lg text-sage-deep`} /><h3 className="font-display text-base font-semibold text-charcoal">{item.title}</h3></div>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/55">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <Reveal className="mb-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">Program overview</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal md:text-4xl">What sets EVLV wholesale apart.</h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/60">
              A documented supply chain is what protects resellers, distributors, and white-label operators in the research peptide market.
            </p>
          </Reveal>
          <Reveal>
            <div className="overflow-x-auto rounded-xl border border-stone">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone bg-ivory-soft">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/50">Feature</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/50">How it helps your operation</th>
                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/50">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-stone last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-ivory-soft/40"}`}>
                      <td className="px-5 py-4 font-semibold text-charcoal">{row.feature}</td>
                      <td className="px-5 py-4 leading-relaxed text-charcoal/60">{row.detail}</td>
                      <td className="px-5 py-4 text-center">
                        {row.available
                          ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef5f2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-sage-deep">{row.note ?? "Available"}</span>
                          : <span className="inline-flex items-center gap-1.5 rounded-full bg-stone/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-charcoal/40">Not offered</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-stone pb-20 md:pb-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <Reveal className="mb-10 max-w-2xl pt-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">A clear path to launch</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal md:text-5xl">From first conversation to fulfillment.</h2>
          </Reveal>
          <Reveal stagger className="grid grid-cols-1 border-y border-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <div key={step.number} className={`py-7 sm:p-7 ${index > 0 ? "border-t border-charcoal/10 sm:border-t-0 sm:border-l" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}>
                <p className="text-[11px] font-bold tracking-[0.18em] text-sage-deep">{step.number}</p>
                <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/55">{step.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory-soft py-20 md:py-28">
        <div className="mx-auto max-w-[980px] px-5 md:px-8">
          <Reveal>
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-deep">Partner questions</p>
            <h2 className="mt-3 text-center font-display text-3xl font-semibold text-charcoal md:text-4xl">Wholesale peptides FAQ</h2>
          </Reveal>
          <Reveal className="mt-9 space-y-4">
            {FAQ.map((item) => (
              <details key={item.question} className="rounded-lg border border-stone bg-white p-5">
                <summary className="cursor-pointer list-none pr-6 font-semibold text-charcoal">{item.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{item.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section id="inquire" className="bg-[#07383a] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b9d9ce]">Partner inquiry</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">Tell us what you want to build.</h2>
            <p className="mt-5 text-sm leading-relaxed text-white/65 md:text-base">Our team reviews every inquiry and assigns an account contact. We reply with the most suitable program, practical next steps, and a scoped commercial proposal.</p>
            <div className="mt-8 space-y-4 border-t border-white/15 pt-7 text-sm text-white/70">
              <p className="flex items-start gap-3"><i className="ri-check-line mt-0.5 text-[#b9d9ce]" /> All products supplied with 21 CFR 809.10(c)-compliant RUO labeling and lot-specific batch documentation.</p>
              <p className="flex items-start gap-3"><i className="ri-check-line mt-0.5 text-[#b9d9ce]" /> Your supplier&apos;s compliance record is your reputation — EVLV documentation supports institutional-grade supply chain transparency.</p>
              <p className="flex items-start gap-3"><i className="ri-check-line mt-0.5 text-[#b9d9ce]" /> Low-MOQ wholesale with 3–5 day dispatch on in-stock catalog products. White label by application.</p>
              <p className="flex items-start gap-3"><i className="ri-check-line mt-0.5 text-[#b9d9ce]" /> Partners are solely responsible for the lawful handling, marketing, and use of supplied products in their jurisdiction.</p>
            </div>
          </Reveal>
          <Reveal><WholesaleForm /></Reveal>
        </div>
      </section>
    </>
  );
}
