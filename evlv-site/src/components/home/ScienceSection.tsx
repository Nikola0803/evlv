import Image from "next/image";

const ARTICLES = [
  {
    num: "01",
    label: "Understanding Peptides",
    title: "Understanding peptide purity",
    description: "How purity is evaluated and why independent verification matters.",
    image: "/images/science/purity.jpg",
  },
  {
    num: "02",
    label: "How We Test",
    title: "Batch testing explained",
    description: "How laboratory documentation helps researchers evaluate a specific lot.",
    image: "/images/science/testing.jpg",
  },
  {
    num: "03",
    label: "Research Standards",
    title: "Inside the EVLV standard",
    description: "How EVLV approaches packaging, handling and traceability.",
    image: "/images/science/standard.jpg",
  },
];

export function ScienceSection() {
  return (
    <section className="bg-ivory py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="mb-16 max-w-2xl md:mb-24">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">08 / The EVLV Research Journal</p>
          <h2 className="font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
            Research deserves
            <br />
            better standards.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-soft-gray md:text-lg">
            Explore how EVLV approaches testing, documentation, handling and transparency across every research
            compound.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {ARTICLES.map((article) => (
            <article key={article.title} className="group">
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
                <span>{article.num} /</span> {article.label}
              </p>
              <h3 className="mt-2 font-display text-xl font-medium text-charcoal">{article.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-soft-gray">{article.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-sage-deep">
                Read Article <i className="ri-arrow-right-line" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
