import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.evlvpeptides.com";

export const metadata: Metadata = {
  title: "Quality & Documentation",
  description: "Learn how EVLV presents lot-specific laboratory documentation, COA records, verification paths, and research-use-only boundaries.",
  alternates: { canonical: "/quality" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/quality`,
    title: "Quality & Documentation | EVLV",
    description: "A clear guide to EVLV lot records, COA matching, and research-use-only documentation.",
  },
};

const PROOF_STEPS = [
  {
    number: "01",
    title: "Identify the item",
    body: "Start with the product name, labeled quantity, SKU, and lot or sample identifier on the item being reviewed.",
  },
  {
    number: "02",
    title: "Match the exact record",
    body: "Use the COA Library or vial QR destination to locate the published record for that identified lot, rather than relying on a generic report.",
  },
  {
    number: "03",
    title: "Read the report scope",
    body: "Review the issuing laboratory, method, date, sample identification, and stated result directly in the source document.",
  },
  {
    number: "04",
    title: "Keep conclusions proportionate",
    body: "A report applies only within its stated method and scope. It is not a safety, sterility, efficacy, or human-use claim.",
  },
];

const FAQ = [
  {
    question: "What does an Exact COA Available label mean?",
    answer: "It means the product page connects to a published EVLV COA record for the identified product or lot. The source document remains the record to review for its method, result, date, and sample scope.",
  },
  {
    question: "Why might a product not have an exact report published?",
    answer: "Documentation can be pending, unavailable for a particular lot, or not match the item precisely enough to be presented as an exact record. EVLV does not substitute an unrelated report as an exact match.",
  },
  {
    question: "Are endotoxin records published with every COA?",
    answer: "No. An endotoxin record is displayed only when a matching report is published for the identified lot. It is presented as a separate analytical record and does not establish sterility or clinical suitability.",
  },
  {
    question: "Are EVLV materials intended for human or veterinary use?",
    answer: "No. EVLV materials are supplied strictly for lawful laboratory and analytical research. They are not for human or veterinary administration, diagnosis, treatment, or consumption.",
  },
] as const;

function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function QualityPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/quality#webpage`,
    url: `${SITE_URL}/quality`,
    name: "EVLV Quality & Documentation",
    description: "A guide to EVLV lot-specific COA records, supplemental documentation, and research-use-only boundaries.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="bg-white text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-white md:-mt-[100px] md:pb-28 md:pt-[175px]">
        <div className="mx-auto max-w-[1080px] px-4 text-center md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Evidence before assumptions</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">Quality &amp; documentation, clearly separated.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/70 md:text-lg">EVLV makes published lot records easy to locate and clear about what they do, and do not, establish. Every material remains strictly for lawful laboratory and analytical research.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/coas" className="rounded-md bg-copper px-6 py-3 text-xs font-semibold uppercase tracking-wide text-charcoal">Search COA library</Link>
            <Link href="/verify-your-vial" className="rounded-md border border-white/35 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white">Verify a vial or lot</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">A repeatable review path</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">How to review an EVLV lot record</h2>
          <p className="mt-4 text-sm leading-7 text-soft-gray md:text-base">The useful question is not whether a document exists. It is whether the record identifies the same item and whether its stated scope supports the conclusion being drawn.</p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-4">
          {PROOF_STEPS.map((step) => <article key={step.number} className="bg-white p-6 md:p-7"><p className="text-xs font-semibold tracking-[0.16em] text-copper">{step.number}</p><h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-soft-gray">{step.body}</p></article>)}
        </div>
      </section>

      <section className="border-y border-stone bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">What you can verify</p><h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Records should be easy to find and hard to overstate.</h2><p className="mt-5 text-sm leading-7 text-soft-gray md:text-base">The COA Library is designed for direct record review. It connects a lot page, the original published PDF, and, where available, a separately identified endotoxin report for that same DPS lot.</p><Link href="/sourcing" className="mt-7 inline-block text-sm font-semibold text-sage-deep underline decoration-sage-deep/30 underline-offset-4">Review sourcing and quality policy</Link></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <EvidenceCard icon="ri-file-search-line" title="Lot-linked COA pages" body="Each published record identifies its product, lot or report number, laboratory, reported result, and analysis date before opening the original file." />
            <EvidenceCard icon="ri-qr-scan-2-line" title="QR verification destination" body="Supported vial labels can direct researchers to the matching lot record, where the label details can be compared to the publication." />
            <EvidenceCard icon="ri-test-tube-line" title="Separate endotoxin records" body="A matching endotoxin report is shown only when published for the same identified lot. It is never presented as a substitute for a COA." />
            <EvidenceCard icon="ri-shield-check-line" title="Clear RUO boundary" body="Documentation supports laboratory review only. It does not establish approval, safety, efficacy, sterility, or suitability for human or veterinary use." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[960px] px-4 py-16 md:px-8 md:py-24">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Documentation questions</p>
        <h2 className="mt-3 text-center font-display text-3xl font-semibold md:text-4xl">Straight answers about the record.</h2>
        <div className="mt-10 divide-y divide-stone rounded-2xl border border-stone bg-white px-6 md:px-8">
          {FAQ.map((item) => <article key={item.question} className="py-6"><h3 className="font-semibold text-charcoal">{item.question}</h3><p className="mt-3 text-sm leading-6 text-soft-gray">{item.answer}</p></article>)}
        </div>
      </section>

      <section className="border-t border-stone bg-charcoal py-14 text-white">
        <div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center md:px-8"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Need record support?</p><h2 className="mt-2 font-display text-3xl font-semibold">Start with the lot, then contact us.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">For document questions, include the product name and lot or report identifier so the record can be located accurately.</p></div><Link href="/contact" className="shrink-0 rounded-md bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wide text-charcoal">Contact EVLV</Link></div>
      </section>
    </main>
  );
}

function EvidenceCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return <article className="rounded-xl border border-stone bg-white p-6"><i className={`${icon} text-2xl text-sage-deep`} /><h3 className="mt-5 font-display text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-soft-gray">{body}</p></article>;
}
