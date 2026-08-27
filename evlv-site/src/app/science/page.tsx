import { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Science",
  description: "How EVLV approaches testing, documentation, handling and transparency across every research peptide.",
  alternates: { canonical: "/science" },
};

const STATS = [
  { label: "Purity", value: ">99%" },
  { label: "Identity", value: "HPLC + MS" },
  { label: "Storage", value: "2–8°C" },
];

const TEST_PANEL = [
  {
    code: "HPLC",
    title: "Purity Analysis",
    description: "Confirms purity above our published threshold on every batch — not a single sample lot.",
  },
  {
    code: "MS",
    title: "Mass Spectrometry",
    description: "Confirms the compound's identity — what's in the vial matches the label, not assumed from the synthesis recipe.",
  },
  {
    code: "LAL",
    title: "Endotoxin Testing",
    description: "Screens for bacterial endotoxins, reported in EU/mg against a defined threshold.",
  },
  {
    code: "STERILITY",
    title: "Sterility Testing",
    description: "Confirms the vial is free of microbial contamination before it ships.",
  },
  {
    code: "HEAVY METALS",
    title: "Heavy Metal Screening",
    description: "Checks for lead, arsenic, cadmium and mercury — all reported below detection limit.",
  },
  {
    code: "SOLVENTS",
    title: "Residual Solvent Analysis",
    description: "Confirms manufacturing solvents were fully purged, within accepted limits.",
  },
];

const ARTICLES = [
  {
    label: "Purity",
    title: "Understanding peptide purity",
    description:
      "Purity is measured against the total mass of a sample, isolating the target compound from residual solvents, salts and synthesis byproducts. Independent verification exists because self-reported purity has no accountability behind it.",
    image: "/images/science/purity.jpg",
  },
  {
    label: "Testing",
    title: "Batch testing explained",
    description:
      "Every batch we sell is tied to a lot number and a corresponding certificate of analysis. HPLC identifies and quantifies the compound; mass spectrometry confirms molecular identity. Together they answer two different questions: how much, and is it actually what it claims to be.",
    image: "/images/science/testing.jpg",
  },
  {
    label: "Standards",
    title: "Inside the EVLV standard",
    description:
      "Packaging, cold-chain handling and lot traceability are treated as part of the product, not an afterthought. A result is only meaningful if the vial it describes can be identified with certainty.",
    image: "/images/science/standard.jpg",
  },
];

export default function SciencePage() {
  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-5xl lg:text-6xl">
            Research deserves
            <br />
            better standards.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Explore how EVLV approaches testing, documentation, handling and transparency across every research
            compound.
          </p>
        </div>
      </section>

      {/* Verified purity */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-4 md:grid-cols-2 md:px-8 lg:gap-20">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
              <span className="h-px w-8 bg-copper/60" />
              01 / Verified Purity
            </div>
            <h2 className="font-display text-3xl font-semibold text-charcoal md:text-4xl">
              The standard behind every vial.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-soft-gray">
              Every EVLV compound is synthesized to research-grade specification, then independently verified for
              purity and identity before it ships. Each batch carries its own certificate of analysis and is stored
              cold from lab to doorstep. Supplied strictly for laboratory research use.
            </p>

            <div className="mt-8 grid grid-cols-3 divide-x divide-stone rounded-md border border-stone bg-white">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-4 py-5 text-center">
                  <p className="text-lg font-semibold text-charcoal md:text-xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-soft-gray">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/science/purity.jpg"
              alt="Purity verification"
              width={800}
              height={600}
              sizes="(max-width: 768px) 90vw, 640px"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Batch testing panel */}
      <section className="relative overflow-hidden bg-charcoal py-20 text-white md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(184,135,90,0.14) 0%, rgba(184,135,90,0) 70%)" }}
        />
        <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
              <span className="h-px w-8 bg-copper/60" />
              02 / Testing Protocol
            </div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Six tests. Every batch.</h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
              This is the same breakdown behind every certificate of analysis we publish — the actual panel a
              third-party lab runs before a batch is cleared to ship.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEST_PANEL.map((test) => (
              <div key={test.code} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-copper">{test.code}</p>
                <p className="mt-3 font-display text-base font-medium text-white">{test.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{test.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where it's made / what ships */}
      <section className="bg-ivory-soft py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
            <div>
              <h3 className="font-display text-xl font-semibold text-charcoal md:text-2xl">Where it&apos;s made</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-soft-gray">
                Every compound is synthesized by our manufacturing partners to research-grade specification, then
                independently re-tested by a third-party lab before a batch is cleared to ship — not tested once by
                the manufacturer and taken on faith.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-charcoal md:text-2xl">What ships with your order</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-soft-gray">
                Every vial ships with its batch-specific certificate of analysis, viewable from the product page or
                the COA archive below. Product is stored and shipped cold, and supplied strictly for laboratory
                research use.
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-lg border border-stone bg-white p-6 md:flex-row md:items-center md:p-8">
            <p className="max-w-md text-sm leading-relaxed text-charcoal/70 md:text-base">
              Want to see a real one before you order? Browse sample certificates of analysis from recent batches.
            </p>
            <div className="flex shrink-0 gap-3">
              <ButtonLink href="/coas" variant="secondary">
                View COAs
              </ButtonLink>
              <ButtonLink href="/shop" variant="dark">
                Shop Research <i className="ri-arrow-right-line" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Further reading */}
      <section className="bg-ivory py-20 md:py-32">
        <div className="mx-auto max-w-[1000px] px-4 md:px-8">
          <div className="mb-14 text-center">
            <div className="mb-4 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
              <span className="h-px w-8 bg-copper/60" />
              03 / Further Reading
              <span className="h-px w-8 bg-copper/60" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-charcoal md:text-3xl">Go deeper on the standard.</h2>
          </div>
          {ARTICLES.map((article, i) => (
            <article key={article.title} className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 ${i > 0 ? "mt-20 border-t border-stone pt-20" : ""}`}>
              <div className={`aspect-[4/3] w-full overflow-hidden rounded-lg ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <Image
                  src={article.image}
                  alt={article.title}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 90vw, 480px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-deep">{article.label}</p>
                <h2 className="mt-3 font-display text-2xl font-medium text-charcoal md:text-3xl">{article.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-soft-gray">{article.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
