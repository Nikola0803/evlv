import { Metadata } from "next";
import { PensWaitlistForm } from "./PensWaitlistForm";

export const metadata: Metadata = {
  title: "EVLV Pens: Coming Soon",
  description: "EVLV pens are coming to the catalogue soon. Join the list and get the first email when they are available. Research use only.",
};

export default function PensPage() {
  return (
    <>
      <section className="cp-info-hero -mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[3px] text-white/50">Coming soon</p>
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-5xl lg:text-6xl">EVLV pens.</h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Pens are coming to the EVLV catalogue soon. Join the list and get the first email when they land.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-xl px-4 md:px-8">
          <PensWaitlistForm />
          <p className="mt-6 text-center text-xs leading-relaxed text-charcoal/50">
            One email when pens are available, plus EVLV research notes. Unsubscribe anytime. For laboratory research use only.
          </p>
        </div>
      </section>
    </>
  );
}
