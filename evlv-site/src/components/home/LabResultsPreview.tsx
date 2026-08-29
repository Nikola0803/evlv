import { ButtonLink } from "@/components/ui/Button";
import { BatchVerifyTerminal } from "./BatchVerifyTerminal";

export function LabResultsPreview() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-white md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(184,135,90,0.16) 0%, rgba(184,135,90,0) 70%)" }}
      />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-4 md:grid-cols-5 md:px-8 lg:gap-16">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
            <span className="h-px w-8 bg-copper/60" />
            06 / Transparency
          </div>
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] md:text-6xl">
            Every batch.
            <br />
            Verified.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
            Every order ships with a Certificate of Analysis for its exact lot. Enter a batch code and pull the real
            result, not a demo.
          </p>
          <ButtonLink href="/coas" variant="secondary" size="lg" className="mt-9 !border-white/40 !text-ivory hover:!border-copper hover:!bg-transparent hover:!text-copper">
            View All COAs <i className="ri-arrow-right-line" />
          </ButtonLink>
        </div>

        <div className="md:col-span-3">
          <BatchVerifyTerminal />
        </div>
      </div>
    </section>
  );
}
