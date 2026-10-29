import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getJournalArticles } from "@/lib/journal-data";

export const metadata: Metadata = {
  title: "Research Peptide Journal & Laboratory Guides",
  description: "Evidence-focused guides to research peptide COAs, purity, identity testing, lot traceability, U.S. sourcing, wholesale, and dropshipping.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const articles = getJournalArticles();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.evlvpeptides.com/journal#collection",
    url: "https://www.evlvpeptides.com/journal",
    name: "EVLV Research Peptide Journal",
    description: "Evidence-focused guides to research peptide documentation, testing, sourcing, and B2B supply.",
    isPartOf: { "@id": "https://www.evlvpeptides.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.evlvpeptides.com/journal/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c") }} />
      <section className="cp-info-hero cp-info-quality -mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Journal</p>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">Research deserves better standards.</h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/70">
            Long-form notes on testing methodology, sourcing and the research behind the EVLV standard.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1080px] px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Documentation-first research</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-charcoal md:text-4xl">A practical library for evaluating research materials.</h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-soft-gray">
              <p>Every research product should be evaluated as an identified material, not as a marketing claim. That means comparing the listing, labeled strength, available lot record, issuing laboratory, reported method, and analysis date before drawing a conclusion about a specific sample.</p>
              <p>The EVLV Journal explains the documentation and catalogue questions that come up most often. It is written for laboratory and analytical review, with a focus on traceability rather than protocols, dosing, personal use, or outcome claims.</p>
              <p>Use these guides alongside the product page and exact COA library. A general article can explain how a method works, but only an identified report can speak to the sample or lot named on that report.</p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-stone bg-ivory-soft p-6">
              <i className="ri-file-search-line text-2xl text-sage-deep" />
              <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">Read the record</h3>
              <p className="mt-2 text-sm leading-6 text-soft-gray">Learn what a product-specific COA can establish, what it cannot establish, and why a report must match the material under review.</p>
            </article>
            <article className="rounded-2xl border border-stone bg-ivory-soft p-6">
              <i className="ri-flask-line text-2xl text-sage-deep" />
              <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">Interpret methods carefully</h3>
              <p className="mt-2 text-sm leading-6 text-soft-gray">Separate identity, purity, content, and endotoxin results. Each analytical method answers a different question and has its own stated scope.</p>
            </article>
            <article className="rounded-2xl border border-stone bg-ivory-soft p-6">
              <i className="ri-links-line text-2xl text-sage-deep" />
              <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">Follow the evidence</h3>
              <p className="mt-2 text-sm leading-6 text-soft-gray">Move from a research guide to the relevant product page, then to the exact published record. The goal is transparent, source-linked review.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mb-10 max-w-2xl md:mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Latest laboratory guides</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal md:text-4xl">Research notes, documentation guides, and catalogue context.</h2>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {articles.map((article, i) => (
              <Link key={article.slug} href={`/journal/${article.slug}`} className="group block">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-sage-mist">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 90vw, 420px"
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-6 flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-wider text-copper">
                  <span>{String(i + 1).padStart(2, "0")} /</span> {article.label}
                </p>
                <h2 className="mt-2 font-display text-xl font-medium text-charcoal">{article.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-soft-gray">{article.excerpt}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-charcoal/40">{article.readTime}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-sage-deep">
                  Read Article <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
