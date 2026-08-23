import { ButtonLink } from "@/components/ui/Button";

const STANDARDS = [
  { num: "01", title: "Independent Testing" },
  { num: "02", title: "Batch-Level COAs" },
  { num: "03", title: "Controlled Handling" },
  { num: "04", title: "Transparent Sourcing" },
];

export function AboutSection() {
  return (
    <section className="bg-ivory-soft py-20 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-charcoal">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="/videos/standard-vial.mp4" type="video/mp4" />
          </video>
        </div>

        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-deep">The EVLV Standard</p>
          <h2 className="font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
            Precision
            <br />
            without compromise.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-soft-gray md:text-lg">
            EVLV is built around clarity and consistency in research. Every SKU, every batch and every result is
            handled with the same standard — because transparency should never be optional.
          </p>

          <div className="mt-10 divide-y divide-stone border-t border-stone">
            {STANDARDS.map((item) => (
              <div key={item.num} className="flex items-center gap-6 py-4">
                <span className="font-display text-sm text-sage-deep">{item.num}</span>
                <span className="text-sm font-medium uppercase tracking-wide text-charcoal">{item.title}</span>
              </div>
            ))}
          </div>

          <ButtonLink href="/lab-results" className="mt-10">
            Explore Our Standards <i className="ri-arrow-right-line" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
