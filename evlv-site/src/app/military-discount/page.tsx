import { Metadata } from "next";
import { MilitaryDiscountForm } from "./MilitaryDiscountForm";

export const metadata: Metadata = {
  title: "Military & First Responder Discount | EVLV",
  description: "Active duty, veterans, reservists, and first responders get a 20% discount on EVLV research peptides.",
};

const ELIGIBLE = ["Active Duty", "Veterans", "Reservists & National Guard", "Police, Fire & EMS"];

export default function MilitaryDiscountPage() {
  return (
    <>
      <section className="bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto max-w-[900px] px-4 text-center md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Thank You For Your Service</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
            20% off, always.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-charcoal/60">
            Active duty, veterans, reservists, and first responders get a flat 20% off every order. One code per
            person, applied at checkout — not combinable with other discounts or promotions.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {ELIGIBLE.map((e) => (
              <span key={e} className="rounded-full border border-stone bg-white px-4 py-2 text-xs font-medium text-charcoal/70">
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[600px] px-4 md:px-8">
          <h2 className="mb-2 text-center font-display text-2xl font-semibold text-charcoal">Request your code.</h2>
          <p className="mb-8 text-center text-sm text-charcoal/60">
            Verified within a couple of business days. Your code arrives by email.
          </p>
          <MilitaryDiscountForm />
        </div>
      </section>
    </>
  );
}
