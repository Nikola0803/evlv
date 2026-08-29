import { ButtonLink } from "@/components/ui/Button";

export function ValueSection() {
  return (
    <section className="bg-ivory pb-16 pt-28 text-center md:pb-20 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">07 / The EVLV Difference</p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold uppercase leading-[1.05] text-charcoal md:text-5xl lg:text-6xl">
          Built for the work.
        </h2>
        <p className="mx-auto mt-6 max-w-sm text-sm uppercase tracking-[0.1em] text-soft-gray md:text-base">
          Clear materials. Clear documentation. No unnecessary complexity.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/shop" size="lg" className="px-10">
            Shop the Collection <i className="ri-arrow-right-line" />
          </ButtonLink>
          <ButtonLink href="/faq" variant="secondary" size="lg" className="px-10">
            Why EVLV <i className="ri-arrow-right-line" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
