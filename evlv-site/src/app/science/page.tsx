import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Science | EVLV",
  description: "How EVLV approaches testing, documentation, handling and transparency across every research compound.",
};

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

      <section className="bg-ivory py-20 md:py-32">
        <div className="mx-auto max-w-[1000px] px-4 md:px-8">
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
