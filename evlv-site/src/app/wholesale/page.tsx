import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WholesaleForm } from "./WholesaleForm";
import { Reveal } from "@/components/ui/Reveal";

const SITE_URL = "https://www.evlvpeptides.com";

export const metadata: Metadata = {
  title: "Wholesale Peptides | RUO-Compliant Bulk Supply for U.S. Businesses | EVLV",
  description:
    "EVLV wholesale peptides for qualified U.S. research-product businesses. Bulk lab-grade peptide supply with lot-specific COAs, 21 CFR 809.10(c) labeling, and documented fulfillment. Vetted partner program.",
  keywords: [
    "wholesale peptides",
    "bulk peptide supply",
    "lab-grade peptide supply",
    "research peptide wholesale",
    "buy peptides in bulk",
    "bulk research peptides USA",
    "peptide wholesale supplier",
    "peptide reseller program",
    "peptide white label",
    "peptide private label",
    "RUO wholesale peptides",
  ],
  alternates: { canonical: "/wholesale" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/wholesale`,
    title: "Wholesale Peptides — Bulk Lab-Grade Peptide Supply | EVLV",
    description: "RUO-compliant wholesale peptides and bulk peptide supply for qualified U.S. research businesses. 21 CFR 809.10(c) labeled, lot-specific COAs, vetted partner program.",
    images: [{
      url: "/images/wholesale/evlv-b2b-fulfillment.png",
      width: 1600,
      height: 900,
      alt: "EVLV wholesale research-product fulfillment operation",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Peptides | RUO-Compliant Bulk Supply | EVLV",
    description: "Vetted bulk peptide supply for qualified U.S. research businesses. 21 CFR 809.10(c) labeled. Lot-specific COAs.",
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
  name: "Wholesale Peptides for Approved U.S. Businesses",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/wholesale/evlv-b2b-fulfillment.png`,
  },
};

const PROGRAMS = [
  {
    number: "01",
    icon: "ri-box-3-line",
    title: "Bulk Wholesale",
    eyebrow: "Stock it. Sell it.",
    body: "Purchase finished EVLV research products at volume pricing and fulfill from your own operation. All products labeled in accordance with 21 CFR 809.10(c).",
    points: ["Volume-based pricing", "Lot-specific batch documentation", "Flexible multi-SKU orders"],
  },
  {
    number: "02",
    icon: "ri-palette-line",
    title: "White Label",
    eyebrow: "Your brand. Built properly.",
    body: "Launch a distinct research brand with custom packaging and a storefront supported by our infrastructure. Requires additional compliance review.",
    points: ["Custom brand and packaging", "Storefront and CRM options", "Extended compliance vetting required"],
    featured: true,
    status: "By application — extended review",
  },
];

const CAPABILITIES = [
  { icon: "ri-test-tube-line", title: "RUO-labeled catalog", body: "All products labeled 'For Research Use Only – Not for Human or Animal Use' per 21 CFR 809.10(c). Lot-specific COAs on every batch." },
  { icon: "ri-shield-check-line", title: "Compliance documentation", body: "Your supply chain documentation protects your business. Partners receive complete batch records and labeling evidence for every product supplied." },
  { icon: "ri-dashboard-3-line", title: "Commerce infrastructure", body: "Optional storefront, CRM, content, and order-management capabilities for approved partners." },
  { icon: "ri-map-pin-2-line", title: "U.S. fulfillment", body: "Domestic pick, pack, dispatch, and tracked delivery workflows — maintaining the product record from inventory to customer." },
];

const STEPS = [
  { number: "01", title: "Choose your model", body: "Tell us whether you need bulk wholesale, white label supply, or a combination of both." },
  { number: "02", title: "Qualify the opportunity", body: "We review your catalog, audience, expected volume, and launch timeline." },
  { number: "03", title: "Receive a scoped offer", body: "You get a clear commercial proposal built around your actual operation." },
  { number: "04", title: "Build and launch", body: "We align products, branding, systems, and fulfillment before go-live." },
];

export default function WholesalePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WHOLESALE_SERVICE_JSON_LD).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WHOLESALE_PAGE_JSON_LD).replace(/</g, "\\u003c") }} />
      <div className="border-b border-stone bg-white py-2.5 text-center text-xs text-charcoal/60">
        Already a partner?{" "}
        <Link href="/account?tab=wholesale" className="font-semibold text-sage-deep underline underline-offset-2 hover:text-charcoal">
          Sign in to your dashboard
        </Link>
      </div>

      <section className="px-3 pb-12 pt-5 md:px-6 md:pb-16 md:pt-7">
        <div className="relative mx-auto min-h-[650px] max-w-[1400px] overflow-hidden rounded-[26px] bg-[#062f31] text-white shadow-[0_24px_70px_rgba(7,42,43,0.18)] md:min-h-[690px]">
          <Image
            src="/images/wholesale/evlv-b2b-fulfillment.png"
            alt="EVLV research products and branded fulfillment operation"
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
                <span className="h-px w-8 bg-[#b9d9ce]/70" /> EVLV Partner Programs
              </p>
              <h1 className="font-display text-[42px] font-semibold leading-[1.02] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
                Wholesale and white label — built around you.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                Bulk lab-grade peptide supply for qualified U.S. research businesses. All products labeled for
                research use only in accordance with 21 CFR 809.10(c), with lot-specific COAs and documented fulfillment.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                Wholesale and white label available after review. Both require vetting and a documented operating plan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#inquire" className="rounded-md bg-white px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#07383a] transition hover:bg-[#edf5f2]">
                  Get partner pricing <i className="ri-arrow-right-line" />
                </a>
                <a href="#programs" className="rounded-md border border-white/35 bg-white/5 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/12">
                  Compare programs
                </a>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 border-t border-white/15 pt-7 text-xs text-white/75 sm:grid-cols-3">
                <span className="flex items-center gap-2"><i className="ri-shield-check-line text-[#b9d9ce]" /> 21 CFR 809.10(c) labeled</span>
                <span className="flex items-center gap-2"><i className="ri-file-text-line text-[#b9d9ce]" /> Lot-specific COAs</span>
                <span className="flex items-center gap-2"><i className="ri-map-pin-2-line text-[#b9d9ce]" /> U.S. fulfillment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-[#f5f3ef] py-5">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <p className="text-center text-xs leading-relaxed text-charcoal/65">
            <i className="ri-shield-check-line mr-1.5 text-sage-deep" />
            All products supplied are labeled &quot;For Research Use Only – Not for Human or Animal Use&quot; in accordance with <strong className="text-charcoal">21 CFR 809.10(c)</strong>.
            Partners are solely responsible for the lawful handling, marketing, and use of research products in their jurisdiction.
          </p>
        </div>
      </section>

      <section id="programs" className="pb-20 pt-6 md:pb-28 md:pt-10">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <Reveal className="mx-auto mb-11 max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">Two ways to partner</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-charcoal md:text-5xl">Choose the operating model that fits.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/60 md:text-base">
              Bulk wholesale or white label — or combine both. Every proposal is scoped around your market, catalog, volume, and fulfillment needs.
            </p>
          </Reveal>

          <Reveal stagger className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {PROGRAMS.map((program) => (
              <article key={program.title} className={`relative overflow-hidden rounded-2xl border p-7 md:p-8 ${program.featured ? "border-sage-deep bg-[#eef5f2] shadow-[0_16px_45px_rgba(11,65,64,.10)]" : "border-stone bg-white"}`}>
                {"status" in program && program.status && <span className="absolute right-5 top-5 rounded-full bg-charcoal px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/80">{program.status}</span>}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-deep text-xl text-white"><i className={program.icon} /></div>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-sage-deep">{program.number} · {program.eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-charcoal">{program.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-charcoal/60">{program.body}</p>
                <ul className="mt-6 space-y-3 border-t border-charcoal/10 pt-5">
                  {program.points.map((point) => <li key={point} className="flex items-center gap-2.5 text-sm text-charcoal/75"><i className="ri-check-line text-sage-deep" />{point}</li>)}
                </ul>
                <a href="#inquire" className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-sage-deep">Discuss this model <i className="ri-arrow-right-line" /></a>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

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
              You own the customer relationship. EVLV provides the compliant catalog, optional branded storefront,
              inventory holding, and U.S. fulfillment behind it.
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

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <Reveal className="mb-10 max-w-2xl">
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

      <section id="inquire" className="bg-[#07383a] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b9d9ce]">Partner inquiry</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">Tell us what you want to build.</h2>
            <p className="mt-5 text-sm leading-relaxed text-white/65 md:text-base">Our team reviews every inquiry and replies with the most suitable program, practical next steps, and a scoped commercial conversation.</p>
            <div className="mt-8 space-y-4 border-t border-white/15 pt-7 text-sm text-white/70">
              <p className="flex items-start gap-3"><i className="ri-check-line mt-0.5 text-[#b9d9ce]" /> All products supplied with 21 CFR 809.10(c)-compliant RUO labeling and lot-specific batch documentation.</p>
              <p className="flex items-start gap-3"><i className="ri-check-line mt-0.5 text-[#b9d9ce]" /> Your supplier's compliance record is your reputation. EVLV documentation is available to demonstrate your supply chain to institutional buyers.</p>
              <p className="flex items-start gap-3"><i className="ri-check-line mt-0.5 text-[#b9d9ce]" /> Wholesale and white label available after review. Both require a documented operating plan and compliance vetting.</p>
              <p className="flex items-start gap-3"><i className="ri-check-line mt-0.5 text-[#b9d9ce]" /> Partners are solely responsible for the lawful handling, marketing, and use of supplied products in their jurisdiction.</p>
            </div>
          </Reveal>
          <Reveal><WholesaleForm /></Reveal>
        </div>
      </section>
    </>
  );
}
