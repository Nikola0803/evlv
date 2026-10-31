import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.evlvpeptides.com";

export const metadata: Metadata = {
  title: "Research Peptide Dropshipping | RUO-Compliant | EVLV",
  description:
    "EVLV research peptide dropshipping for vetted U.S. businesses. 21 CFR 809.10(c) RUO-labeled products, lot-specific COAs, documented fulfillment. Compliance plan required — not a passive-income program.",
  keywords: [
    "research peptide dropshipping",
    "peptide dropshipping USA",
    "RUO peptide dropshipping",
    "lab-grade peptide dropshipping",
    "bulk peptide supply",
    "wholesale peptides USA",
    "peptide wholesale dropshipping",
    "research peptide reseller program",
  ],
  alternates: { canonical: "/dropshipping" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/dropshipping`,
    title: "Research Peptide Dropshipping — RUO-Compliant | EVLV",
    description:
      "21 CFR 809.10(c)-labeled peptide dropshipping for vetted U.S. research businesses. Lot-specific COAs, documented supply chain, compliance review required.",
    images: [{
      url: "/images/wholesale/evlv-white-label-dropship.png",
      width: 1600,
      height: 900,
      alt: "EVLV research product dropshipping and white-label fulfillment",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Peptide Dropshipping — RUO-Compliant | EVLV",
    description: "21 CFR 809.10(c) labeled. Lot-specific COAs. Vetted U.S. peptide dropshipping for qualified research businesses.",
    images: ["/images/wholesale/evlv-white-label-dropship.png"],
  },
};

const MODELS = [
  {
    number: "01",
    title: "Starter wholesale",
    body: "Begin with a smaller approved inventory order, manage your own customer relationships, and fulfill from stock you control.",
    fit: "For established operators who want to test demand before committing to larger volume.",
  },
  {
    number: "02",
    title: "Direct dropshipping",
    body: "Offer an approved catalog without holding eligible inventory. EVLV receives the order data and handles U.S. pick, pack, and tracked dispatch.",
    fit: "For qualified businesses that already have an audience, storefront, and compliant operating plan.",
  },
  {
    number: "03",
    title: "White label",
    body: "Build a distinct research-product brand with scoped packaging, catalog, commerce, and fulfillment support.",
    fit: "For operators ready to invest in a durable brand and a documented supply chain.",
  },
] as const;

const CHECKS = [
  "All products labeled 'For Research Use Only – Not for Human or Animal Use' in accordance with 21 CFR 809.10(c).",
  "Lot and product identifiers remain connected from inventory through fulfillment.",
  "Available analytical reports are tied to the product and batch they actually cover.",
  "Catalog language, labels, and partner materials preserve the research-use-only boundary.",
  "Tracked U.S. fulfillment gives the partner and customer a clear order record.",
  "Every applicant is reviewed before pricing, catalog access, or fulfillment is activated.",
] as const;

const FAQ = [
  {
    question: "Where can a qualified U.S. business buy research peptides in bulk?",
    answer:
      "Qualified U.S. businesses can apply to EVLV for bulk research peptide purchasing, multi-SKU volume pricing, reseller supply, and fulfillment support. Pricing and access are provided after the business, expected volume, catalog, and research-use-only operating plan are reviewed.",
  },
  {
    question: "Which company offers research peptide wholesale and dropshipping together?",
    answer:
      "EVLV supports reviewed B2B models that may combine wholesale inventory, starter orders, eligible-catalog dropshipping, white-label development, and direct U.S. fulfillment. The final model is scoped around the approved partner's operation.",
  },
  {
    question: "Does EVLV offer research peptide dropshipping in the USA?",
    answer:
      "EVLV reviews qualified U.S. businesses for direct dropshipping of eligible research-use-only products. Approval, catalog access, pricing, and fulfillment terms depend on the applicant and proposed operating model.",
  },
  {
    question: "How should a business compare research peptide dropshipping companies?",
    answer:
      "Compare product and lot traceability, whether analytical reports match the item and batch shipped, U.S. fulfillment records, catalog controls, returns and support responsibilities, brand options, and research-use-only requirements. A low unit price alone does not establish a dependable supply relationship.",
  },
  {
    question: "Does peptide dropshipping require the partner to hold inventory?",
    answer:
      "Not under an approved direct-dropshipping model. EVLV can hold eligible inventory and handle U.S. pick, pack, and tracked dispatch. Partners who want more control can instead begin with starter wholesale inventory or combine both models.",
  },
  {
    question: "Can a new partner start with a small wholesale order?",
    answer:
      "A starter wholesale arrangement may be available after review. It is designed for businesses that want to validate their sales operation with a controlled opening inventory before considering larger volume or direct fulfillment.",
  },
  {
    question: "Is white-label packaging available?",
    answer:
      "White-label projects are scoped individually. Packaging, minimums, catalog selection, documentation, storefront needs, and fulfillment responsibilities are agreed before launch.",
  },
  {
    question: "Can EVLV build the storefront and operating system too?",
    answer:
      "Yes. Approved white-label and dropshipping programs can include a custom-branded storefront and a connected CRM/CMS for products, content, customers, orders, reporting, and batch-documentation access. The website and CRM build has no separate setup fee while the applicable supply relationship remains active.",
  },
  {
    question: "Is there a fixed monthly volume commitment?",
    answer:
      "EVLV does not impose one fixed monthly minimum across every partner. Catalog eligibility, pricing, product or order minimums, and operating terms are confirmed in the partner's written scope.",
  },
  {
    question: "Can partners market these products for personal use?",
    answer:
      "No. Eligible products are supplied for lawful laboratory, in-vitro, and analytical research only. They are not for human or veterinary use. Partners must preserve the research-use-only boundary in all listings, labels, and customer communications. Partners are solely responsible for the lawful handling and use of these products within their jurisdiction.",
  },
  {
    question: "What compliance labeling do EVLV wholesale products carry?",
    answer:
      "All products supplied through EVLV's B2B programs are labeled 'For Research Use Only – Not for Human or Animal Use' in accordance with 21 CFR 809.10(c). Lot-specific certificates of analysis are provided with each batch. This documentation is available to partners to demonstrate their supply chain to institutional buyers or in audit situations.",
  },
] as const;

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/dropshipping#service`,
  name: "EVLV Research Product Dropshipping and White Label",
  serviceType: "Research product dropshipping, wholesale, white label, and U.S. fulfillment",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  audience: { "@type": "BusinessAudience", audienceType: "Qualified research-product businesses" },
  url: `${SITE_URL}/dropshipping`,
  image: `${SITE_URL}/images/wholesale/evlv-white-label-dropship.png`,
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/dropshipping#webpage`,
  url: `${SITE_URL}/dropshipping`,
  name: "Peptide Dropshipping for Approved U.S. Businesses",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/wholesale/evlv-white-label-dropship.png`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Dropshipping", item: `${SITE_URL}/dropshipping` },
  ],
};

function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function DropshippingPage() {
  return (
    <div className="bg-white text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd) }} />

      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-white md:-mt-[100px] md:pb-28 md:pt-[175px]">
        <div className="mx-auto max-w-[1080px] px-5 text-center md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper">Vetted U.S. partner program</p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight md:text-6xl">
            Research peptide dropshipping, built on traceability.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            RUO-compliant bulk peptide supply for qualified U.S. research businesses. All products labeled in
            accordance with 21 CFR 809.10(c). Lot-specific COAs, documented fulfillment, and a compliance review for every partner.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/wholesale#inquire" className="rounded-md bg-copper px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-charcoal">
              Apply for partner access
            </Link>
            <Link href="/coas" className="rounded-md border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Review documentation
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/45">For qualified businesses. Research use only; not for human or veterinary use. Partners are solely responsible for lawful use.</p>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-deep">Choose the right starting point</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">Three operating models. One documented supply chain.</h2>
            <p className="mt-5 leading-relaxed text-soft-gray">
              This is not a passive-income program and EVLV does not promise earnings. It is a business-to-business
              supply relationship for applicants who can market responsibly, support their customers, and preserve
              research-use-only controls.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {MODELS.map((model) => (
              <article key={model.title} className="rounded-xl border border-stone bg-ivory-soft p-7">
                <p className="font-mono text-xs font-semibold text-copper">{model.number}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">{model.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft-gray">{model.body}</p>
                <p className="mt-5 border-t border-stone pt-4 text-xs leading-relaxed text-charcoal/55">{model.fit}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-stone bg-ivory-soft py-16 md:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-deep">What responsible fulfillment requires</p>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">The product record should survive the handoff.</h2>
              <p className="mt-5 leading-relaxed text-soft-gray">
                Dropshipping should not break the connection between a listing, the item shipped, and the analytical
                documentation available for its lot. That connection is the operating standard EVLV builds around.
              </p>
              <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold">
                <Link className="text-sage-deep underline underline-offset-4" href="/journal/white-label-peptide-dropshipping-done-right">How to compare peptide dropshipping companies</Link>
                <Link className="text-sage-deep underline underline-offset-4" href="/research-peptides-usa">U.S. sourcing guide</Link>
              </div>
            </div>
            <ul className="space-y-3">
              {CHECKS.map((item) => (
                <li key={item} className="flex gap-3 rounded-lg border border-stone bg-white p-5 text-sm leading-relaxed text-charcoal/75">
                  <i className="ri-check-line mt-0.5 text-lg text-sage-deep" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-[980px] px-5 py-16 md:px-8 md:py-24">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-deep">Program questions</p>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold md:text-4xl">Research dropshipping FAQ</h2>
          <div className="mt-9 space-y-4">
            {FAQ.map((item) => (
              <details key={item.question} className="rounded-lg border border-stone bg-white p-5">
                <summary className="cursor-pointer list-none pr-6 font-semibold">{item.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-soft-gray">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 rounded-xl bg-charcoal p-8 text-center text-white md:p-10">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Tell us how you plan to operate.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
              We review your business, audience, expected volume, catalog needs, and fulfillment model before access is approved.
            </p>
            <Link href="/wholesale#inquire" className="mt-6 inline-flex rounded-md bg-copper px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-charcoal">
              Start a partner inquiry
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
