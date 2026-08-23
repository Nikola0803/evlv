import { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About | EVLV",
  description: "EVLV is built around clarity and consistency in research.",
};

const STANDARDS = [
  { num: "01", title: "Independent Testing" },
  { num: "02", title: "Batch-Level COAs" },
  { num: "03", title: "Controlled Handling" },
  { num: "04", title: "Transparent Sourcing" },
];

export default function AboutPage() {
  return (
    <section className="bg-ivory py-20 md:py-32">
      <div className="mx-auto max-w-[900px] px-4 md:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-deep">About EVLV</p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
          Precision
          <br />
          without compromise.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-soft-gray md:text-lg">
          EVLV is built around clarity and consistency in research. Every SKU, every batch and every result is
          handled with the same standard — because transparency should never be optional. We priced the catalogue
          the way we did because volume pricing communicated plainly beats a discount code, and a straightforward
          buying process beats a clever one.
        </p>

        <div className="mt-12 divide-y divide-stone border-t border-stone">
          {STANDARDS.map((item) => (
            <div key={item.num} className="flex items-center gap-6 py-5">
              <span className="font-display text-sm text-sage-deep">{item.num}</span>
              <span className="text-sm font-medium uppercase tracking-wide text-charcoal">{item.title}</span>
            </div>
          ))}
        </div>

        <ButtonLink href="/lab-results" className="mt-12">
          View Lab Results <i className="ri-arrow-right-line" />
        </ButtonLink>
      </div>
    </section>
  );
}
