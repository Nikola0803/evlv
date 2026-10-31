import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.evlvpeptides.com";

export const metadata: Metadata = {
  title: "High Purity Research Peptides | Third-Party HPLC & Mass Spec Verified",
  description:
    "High purity research peptides and high quality research peptides from EVLV — third-party HPLC and mass spectrometry verified. Lot-specific COAs, identity confirmation, and U.S. dispatch for qualified laboratory use.",
  alternates: { canonical: "/high-purity-research-peptides" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/high-purity-research-peptides`,
    title: "High Purity Research Peptides | Third-Party HPLC & Mass Spec Verified",
    description:
      "High purity and high quality research peptides verified by independent accredited labs. Third-party HPLC and mass spectrometry on every listed lot. Searchable COA library with lot-matched reports.",
    images: [
      {
        url: "/images/certified/evlv-quality-transparency-v2.png",
        width: 1536,
        height: 1024,
        alt: "EVLV high purity research peptide vials with batch documentation",
      },
    ],
  },
};

const PURITY_POINTS = [
  {
    title: "HPLC purity result",
    body: "High-performance liquid chromatography separates and quantifies peptide content against impurities. The reported purity percentage describes the primary analyte as a proportion of all detectable components.",
  },
  {
    title: "Mass spectrometry identity",
    body: "MS confirms the molecular weight of the compound matches its theoretical value. A purity result without identity confirmation does not distinguish between correctly synthesized peptide and a closely related impurity.",
  },
  {
    title: "Third-party verification",
    body: "Reports issued by an independent accredited laboratory carry more analytical weight than in-house testing. Review the testing entity, method, and instrument details stated in the report.",
  },
  {
    title: "Lot-specific documentation",
    body: "A general purity claim does not establish the purity of the item in hand. The batch code on the product should connect to documentation for that exact lot, not a prior or representative sample.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Third-party testing",
    body: "Each lot is submitted to an independent accredited laboratory. HPLC quantifies purity; mass spectrometry confirms molecular identity against the theoretical value.",
  },
  {
    step: "2",
    title: "Report published to COA library",
    body: "The test report is published to the EVLV COA Library indexed by product name and lot number. It is not shared across lots, strengths, or products.",
  },
  {
    step: "3",
    title: "Badge on product listing",
    body: "When an exact, lot-matched report is available for a listed product, an exact-COA badge appears on that listing. When no matching report is available, EVLV says so.",
  },
];

const FAQ = [
  {
    question: "What does 'high purity' mean for a research peptide?",
    answer:
      "In research contexts, high purity typically refers to a purity result of ≥98% measured by HPLC, combined with identity confirmation by mass spectrometry. A purity figure alone does not confirm that the primary compound is correctly synthesized — both data points together establish a more complete analytical picture.",
  },
  {
    question: "How does EVLV verify purity?",
    answer:
      "EVLV submits lots to independent accredited third-party laboratories for HPLC and mass spectrometry analysis. The resulting certificate of analysis is published in the searchable COA Library, indexed by product name and lot number.",
  },
  {
    question: "Is a high purity result the same as an identity confirmation?",
    answer:
      "No. Purity and identity answer different analytical questions. HPLC purity describes the proportion of the primary analyte in the sample. Mass spectrometry identity confirms that the analyte's measured molecular weight matches the expected value for the stated compound. Review both reported results.",
  },
  {
    question: "Can one COA apply to multiple strengths or lots?",
    answer:
      "No. A certificate of analysis is produced for a specific sample — typically a single lot at a single labeled quantity. Results from one lot or strength cannot be assumed to apply to another, even for the same compound.",
  },
  {
    question: "What does EVLV consider an 'exact' COA?",
    answer:
      "EVLV uses the term 'exact COA' to mean a published report that can be matched to the specific product and strength being listed. When such a report is available, it is identified on the product page. When it is not available, EVLV does not display an unrelated report in its place.",
  },
  {
    question: "Are EVLV research peptides for personal use?",
    answer:
      "No. All EVLV products are supplied strictly for laboratory and analytical research. They are not for human or veterinary use, not for personal wellness or performance, and not intended to diagnose, treat, cure, or prevent any condition.",
  },
  {
    question: "How do I locate a COA for a product I have ordered?",
    answer:
      "Search the EVLV COA Library by product name or lot number. Match the lot or batch code on your received item to the corresponding entry in the library and review the published report.",
  },
] as const;

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/high-purity-research-peptides#webpage`,
  url: `${SITE_URL}/high-purity-research-peptides`,
  name: "High Purity Research Peptides",
  description:
    "A reference guide to analytical purity standards, third-party verification, and lot-matched documentation for research-use-only peptide materials.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: [
    { "@type": "Thing", name: "High purity research peptides" },
    { "@type": "Thing", name: "HPLC purity testing" },
    { "@type": "Thing", name: "Mass spectrometry peptide identity" },
    { "@type": "Thing", name: "Certificates of Analysis" },
  ],
  audience: { "@type": "BusinessAudience", audienceType: "Qualified laboratory researchers" },
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
    {
      "@type": "ListItem",
      position: 2,
      name: "High Purity Research Peptides",
      item: `${SITE_URL}/high-purity-research-peptides`,
    },
  ],
};

function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function HighPurityResearchPeptidesPage() {
  return (
    <div className="bg-white text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd) }} />

      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-white md:-mt-[100px] md:pb-28 md:pt-[175px]">
        <div className="mx-auto max-w-[1100px] px-4 text-center md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
            Third-party verified · Research use only
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            High Purity Research Peptides
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            EVLV research peptides are verified by independent accredited laboratories using HPLC and mass
            spectrometry. Lot-specific certificates of analysis are published and searchable before purchase.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              className="rounded-md bg-copper px-7 py-3 text-xs font-semibold uppercase tracking-wide text-charcoal"
              href="/shop?category=peptides"
            >
              Browse research products
            </Link>
            <Link
              className="rounded-md border border-white/30 px-7 py-3 text-xs font-semibold uppercase tracking-wide text-white"
              href="/coas"
            >
              Search COA library
            </Link>
          </div>
          <p className="mt-6 text-xs font-medium text-white/45">Not for human or veterinary use.</p>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-[1100px] px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Read the report</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                What does a purity result actually tell you?
              </h2>
              <p className="mt-5 leading-relaxed text-soft-gray">
                A purity percentage from HPLC describes the primary analyte as a proportion of all detectable
                components in the sample. It does not, by itself, confirm that the compound is the correctly
                synthesized peptide you expect. Identity confirmation by mass spectrometry — comparing the measured
                molecular weight against the theoretical value — is the second data point that matters. Together,
                HPLC purity and MS identity provide a more complete analytical record than either alone.
              </p>
              <p className="mt-4 leading-relaxed text-soft-gray">
                EVLV publishes both results where available in the searchable COA Library. Reports are indexed by
                product and lot, so a researcher can verify which specific batch a report describes before relying
                on it.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {PURITY_POINTS.map((item, index) => (
                <article key={item.title} className="rounded-lg border border-stone bg-ivory-soft p-6">
                  <p className="font-mono text-xs font-semibold text-copper">0{index + 1}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft-gray">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-stone bg-ivory-soft py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-4 md:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Documentation first</p>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">How EVLV verifies purity and identity</h2>
              <p className="mt-5 leading-relaxed text-soft-gray">
                Each lot is submitted to an independent accredited laboratory. The resulting report is published in
                the EVLV COA Library indexed by product name and lot number. When an exact, lot-matched report is
                available for a listed product, an exact-COA badge appears on that listing. When one is not
                available, EVLV says so clearly rather than displaying an unrelated or generic report in its place.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {HOW_IT_WORKS.map((item) => (
                <article key={item.step} className="rounded-lg border border-stone bg-white p-6">
                  <p className="font-mono text-xs font-semibold text-copper">Step {item.step}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft-gray">{item.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
              <Link className="text-sage-deep underline decoration-sage-deep/30 underline-offset-4" href="/coas">Open the COA Library</Link>
              <Link className="text-sage-deep underline decoration-sage-deep/30 underline-offset-4" href="/sourcing">Read our testing standards</Link>
              <Link className="text-sage-deep underline decoration-sage-deep/30 underline-offset-4" href="/verify-your-vial">Verify your vial</Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-4 md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Purity in context</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">What purity does not establish</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <article className="rounded-lg border border-stone bg-ivory-soft p-6">
                <h3 className="font-display text-lg font-semibold">Not a safety statement</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft-gray">
                  A high HPLC purity result describes the analytical composition of a sample. It does not establish
                  that the material is safe, sterile, approved, or appropriate for any human or veterinary use.
                </p>
              </article>
              <article className="rounded-lg border border-stone bg-ivory-soft p-6">
                <h3 className="font-display text-lg font-semibold">Not transferable across lots</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft-gray">
                  Purity results are specific to the tested sample. A result from one lot, one strength, or one
                  supplier cannot be assumed to apply to a different batch of the same compound.
                </p>
              </article>
              <article className="rounded-lg border border-stone bg-ivory-soft p-6">
                <h3 className="font-display text-lg font-semibold">Not the only analytical check</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft-gray">
                  Depending on research requirements, a complete analytical record may also include endotoxin testing,
                  residual solvent analysis, moisture content, and container-closure integrity. Review what the report
                  actually covers.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-stone py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-4 md:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Common questions</p>
                <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Purity and documentation FAQ</h2>
                <div className="mt-8 space-y-4">
                  {FAQ.map((item) => (
                    <details key={item.question} className="rounded-lg border border-stone bg-white p-5">
                      <summary className="cursor-pointer list-none pr-6 font-semibold">{item.question}</summary>
                      <p className="mt-3 text-sm leading-relaxed text-soft-gray">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
              <aside className="h-fit rounded-lg bg-charcoal p-8 text-white lg:sticky lg:top-28">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Research-use boundary</p>
                <h2 className="mt-3 font-display text-2xl font-semibold">What EVLV can help with</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  EVLV support can assist with product identity, labeled quantity, batch documentation, unopened-product
                  storage, order status, and institutional inquiries. EVLV cannot provide dosing, reconstitution for
                  personal use, administration guidance, treatment advice, or veterinary guidance.
                </p>
                <div className="mt-6 space-y-3">
                  <Link className="block text-sm font-semibold text-copper underline underline-offset-4" href="/coas">
                    Search the COA Library →
                  </Link>
                  <Link className="block text-sm font-semibold text-white/70 underline underline-offset-4" href="/sourcing">
                    View testing standards →
                  </Link>
                  <Link className="block text-sm font-semibold text-white/70 underline underline-offset-4" href="/faq">
                    All support questions →
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
