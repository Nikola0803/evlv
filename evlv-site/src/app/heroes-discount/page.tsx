import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroesDiscountForm } from "./HeroesDiscountForm";

export const metadata: Metadata = {
  title: "25% Lifetime Service Discount",
  description:
    "Veterans, active military, first responders, and medical staff can apply for a verified, account-based 25% EVLV discount for life.",
  alternates: { canonical: "/heroes-discount" },
};

const ELIGIBLE = [
  { icon: "ri-shield-star-line", title: "Military", body: "Active duty, veterans, reservists, and National Guard." },
  { icon: "ri-alarm-warning-line", title: "First responders", body: "Police, fire, EMS, dispatch, and emergency personnel." },
  { icon: "ri-nurse-line", title: "Medical staff", body: "Clinical, hospital, pharmacy, and medical-office professionals." },
] as const;

const STEPS = [
  { number: "01", title: "Apply", body: "Use the email connected to your EVLV account and select your service category." },
  { number: "02", title: "Verify", body: "Upload current proof of service. Sensitive ID numbers may be covered or redacted." },
  { number: "03", title: "Save for life", body: "Once approved, 25% applies automatically whenever that account checks out." },
] as const;

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
    question: "What proof can medical staff submit?",
    answer: "A current employee badge, professional license, employer letter, or similar document showing active medical employment is acceptable. You may redact unrelated sensitive numbers.",
  },
] as const;

export default function HeroesDiscountPage() {
  return (
    <div className="bg-white text-charcoal">
      <section className="px-3 pb-12 pt-5 md:px-6 md:pb-16 md:pt-7">
        <div className="relative mx-auto min-h-[650px] max-w-[1400px] overflow-hidden rounded-[26px] bg-[#082f30] text-white shadow-[0_24px_70px_rgba(7,42,43,0.18)] md:min-h-[690px]">
          <Image
            src="/images/heroes-service-banner.png"
            alt="Veteran, firefighter, EMS professional, and medical professional holding an EVLV Veterans banner"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover object-[69%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,35,37,.99)_0%,rgba(4,35,37,.97)_36%,rgba(4,35,37,.62)_56%,rgba(4,35,37,.08)_78%,rgba(4,35,37,.02)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#082f30]/80 to-transparent md:hidden" />

          <div className="relative z-10 flex min-h-[650px] items-center px-6 py-14 sm:px-10 md:min-h-[690px] md:px-16 lg:px-20">
            <div className="max-w-[650px]">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c7a06d]">
                <span className="h-px w-8 bg-[#c7a06d]/80" /> EVLV service recognition
              </p>
              <h1 className="mt-5 font-display text-[43px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[70px]">
                25% off.<br />For life.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                A permanent, account-based benefit for verified veterans, active military, first responders, and medical staff.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#apply" className="rounded-md bg-white px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#07383a] transition hover:bg-[#edf5f2]">
                  Apply for verification <i className="ri-arrow-right-line" />
                </a>
                <a href="#how-it-works" className="rounded-md border border-white/35 bg-white/5 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/10">
                  How it works
                </a>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 border-t border-white/15 pt-7 text-xs text-white/75 sm:grid-cols-3">
                <span className="flex items-center gap-2"><i className="ri-user-heart-line text-[#c7a06d]" /> Account based</span>
                <span className="flex items-center gap-2"><i className="ri-infinity-line text-[#c7a06d]" /> No expiration</span>
                <span className="flex items-center gap-2"><i className="ri-shield-check-line text-[#c7a06d]" /> Manually verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-5 md:pb-28 md:pt-10">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">Who can apply</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">Service takes many forms.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/60 md:text-base">
              We built one verification program for the people who serve their country, community, and patients.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ELIGIBLE.map((item) => (
              <article key={item.title} className="rounded-2xl border border-stone bg-ivory-soft p-7 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-deep text-xl text-white"><i className={item.icon} /></div>
                <h3 className="mt-6 font-display text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-stone bg-[#f2f6f4] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(10,52,53,.12)]">
            <Image
              src="/images/certified/evlv-support-page.png"
              alt="EVLV support team helping verified service-program members"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover object-[62%_center]"
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">Simple by design</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-5xl">Verify once. Keep the benefit.</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-charcoal/60 md:text-base">
              There is no recurring form and no one-time code to lose. Approval connects the benefit to the verified account email.
            </p>
            <div className="mt-9 space-y-6">
              {STEPS.map((step) => (
                <div key={step.number} className="grid grid-cols-[42px_1fr] gap-4 border-t border-charcoal/10 pt-5">
                  <span className="font-mono text-xs font-bold text-copper">{step.number}</span>
                  <div><h3 className="font-display text-xl font-semibold">{step.title}</h3><p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">{step.body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sage-deep">Lifetime account benefit</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">Apply for 25% off.</h2>
            <p className="mt-5 text-sm leading-relaxed text-charcoal/60 md:text-base">
              Use the same email as your EVLV account. If you do not have an account yet, you can create one with that email before or after approval.
            </p>
            <div className="mt-7 rounded-xl border border-stone bg-ivory-soft p-5 text-sm leading-relaxed text-charcoal/65">
              <p className="font-semibold text-charcoal"><i className="ri-lock-2-line mr-2 text-sage-deep" />Your documents stay private.</p>
              <p className="mt-2">Proof is stored outside the public site and reviewed only by authorized staff. Redact unrelated ID numbers before uploading.</p>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-charcoal/45">Non-stackable. One verified benefit per person and account. EVLV may request updated documentation if eligibility cannot be confirmed.</p>
          </div>
          <HeroesDiscountForm />
        </div>
      </section>

      <section className="border-t border-stone bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto max-w-[900px] px-5 md:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-deep">Questions</p>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold md:text-4xl">Program details</h2>
          <div className="mt-8 space-y-4">
            {FAQ.map((item) => (
              <details key={item.question} className="rounded-lg border border-stone bg-white p-5">
                <summary className="cursor-pointer list-none pr-6 font-semibold">{item.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{item.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-charcoal/55">Need help before applying? <Link href="/contact" className="font-semibold text-sage-deep underline underline-offset-4">Contact EVLV support</Link>.</p>
        </div>
      </section>
    </div>
  );
}
