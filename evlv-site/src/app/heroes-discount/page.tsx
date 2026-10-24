import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroesDiscountForm } from "./HeroesDiscountForm";

export const metadata: Metadata = {
  title: "25% Lifetime Service Discount",
  description:
    "Veterans, active military, and first responders can apply for a verified, account-based 25% EVLV discount for life.",
  alternates: { canonical: "/heroes-discount" },
};

const FAQ = [
  {
    question: "Is the 25% discount really permanent?",
    answer: "Yes. Once approved, the benefit remains attached to the verified EVLV account unless eligibility was obtained using inaccurate or fraudulent information.",
  },
  {
    question: "Do I need to enter a coupon every time?",
    answer: "No. The reward is account-based and applies automatically when the approved account or matching email is recognized at checkout.",
  },
  {
    question: "Can it be combined with another sale or coupon?",
    answer: "No. The lifetime service discount is non-stackable. Checkout applies the eligible offer under EVLV's discount and margin rules.",
  },
  {
    question: "Can I use a photo of my service uniform?",
    answer: "Yes. A clear photo of your service uniform is acceptable if you are legally permitted to share it. Cover badge numbers, restricted identifiers, and unrelated sensitive information.",
  },
] as const;

export default function HeroesDiscountPage() {
  return (
    <div className="bg-white text-charcoal">
      {/* Hero + Form */}
      <section className="px-3 pb-10 pt-5 md:px-6 md:pb-14 md:pt-7">
        <div className="mx-auto max-w-[1300px] overflow-hidden rounded-[22px] border border-stone bg-[#f4f7f5] shadow-[0_16px_50px_rgba(8,40,41,.08)]">
          <div className="grid lg:grid-cols-[1fr_520px]">
            {/* Left — image + headline */}
            <div className="relative min-h-[260px] overflow-hidden lg:min-h-[680px]">
              <Image
                src="/images/heroes-service-banner-v2.png"
                alt="Veteran, firefighter, and EMS professional holding an EVLV Veterans banner"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 780px"
                className="object-cover object-[69%_center] lg:object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,35,37,.05)_0%,rgba(4,35,37,.55)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,35,37,.04)_0%,rgba(4,35,37,.60)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white lg:p-10">
                <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c7a06d]">
                  <span className="h-px w-6 bg-[#c7a06d]/70" /> EVLV Service Recognition
                </p>
                <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.025em] sm:text-5xl lg:text-[58px]">
                  25% off.<br />For life.
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70 lg:text-base">
                  A permanent, account-based benefit for verified veterans, active military, and first responders.
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/60">
                  <span className="flex items-center gap-1.5"><i className="ri-infinity-line text-[#c7a06d]" /> No expiration</span>
                  <span className="flex items-center gap-1.5"><i className="ri-user-heart-line text-[#c7a06d]" /> Account based</span>
                  <span className="flex items-center gap-1.5"><i className="ri-shield-check-line text-[#c7a06d]" /> Manually verified</span>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="flex flex-col justify-center bg-white p-6 lg:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-deep">Apply now</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-charcoal lg:text-3xl">Verify your service</h2>
              <p className="mt-2 text-sm text-charcoal/55">Fill in your details and upload proof of service. We review every request by hand.</p>
              <div className="mt-6">
                <HeroesDiscountForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-stone bg-ivory-soft py-16 md:py-20">
        <div className="mx-auto max-w-[860px] px-5 md:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-deep">Questions</p>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold md:text-4xl">Program details</h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((item) => (
              <details key={item.question} className="rounded-xl border border-stone bg-white p-5">
                <summary className="cursor-pointer list-none pr-6 font-semibold">{item.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{item.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-charcoal/55">
            Need help before applying?{" "}
            <Link href="/contact" className="font-semibold text-sage-deep underline underline-offset-4">
              Contact EVLV support
            </Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
