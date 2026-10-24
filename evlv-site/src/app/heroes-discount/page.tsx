import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroesDiscountForm } from "./HeroesDiscountForm";

export const metadata: Metadata = {
  title: "25% Lifetime Service Discount — EVLV",
  description:
    "EVLV honors veterans, active military, and first responders with a permanent 25% discount. Verify once. The benefit stays on your account for life.",
  alternates: { canonical: "/heroes-discount" },
};

const WHO_QUALIFIES = [
  { icon: "ri-shield-star-line", label: "U.S. Military", detail: "Active duty, veterans, reservists, and National Guard members of any branch." },
  { icon: "ri-alarm-warning-line", label: "First Responders", detail: "Law enforcement, firefighters, EMS, paramedics, and dispatch personnel." },
  { icon: "ri-nurse-line", label: "Medical Professionals", detail: "Nurses, physicians, and frontline healthcare workers." },
] as const;

const FAQ = [
  {
    q: "Is the 25% discount really permanent?",
    a: "Yes. Once you're verified, the benefit lives on your account with no expiration date — as long as your eligibility was obtained honestly.",
  },
  {
    q: "Do I need a coupon code every time?",
    a: "No. The discount is tied to your account email. It applies automatically every time that account checks out — no code entry, no hassle.",
  },
  {
    q: "Can it stack with other promotions?",
    a: "No. The lifetime service discount is non-stackable. If another offer gives you a better deal at checkout, that one will apply instead.",
  },
  {
    q: "What counts as proof of service?",
    a: "Military ID, DD-214, department-issued credential, agency badge, or a clear photo of a service uniform. Image or PDF under 8MB. Cover badge numbers, patient info, or any unrelated sensitive identifiers before uploading.",
  },
  {
    q: "How long does verification take?",
    a: "We review every submission by hand, typically within 1–2 business days. You'll receive a confirmation email as soon as your account benefit is activated.",
  },
  {
    q: "Can I apply without an EVLV account?",
    a: "Yes. Submit with the email you plan to use. If your account doesn't exist yet, create one with that same email — the benefit will connect automatically.",
  },
] as const;

export default function HeroesDiscountPage() {
  return (
    <div className="bg-white text-charcoal">

      {/* ── HERO + FORM ─────────────────────────────────────── */}
      <section className="px-3 pb-10 pt-5 md:px-6 md:pb-14 md:pt-7">
        <div className="mx-auto max-w-[1300px] overflow-hidden rounded-[22px] border border-stone shadow-[0_16px_50px_rgba(8,40,41,.09)]">
          <div className="grid lg:grid-cols-[1fr_500px]">

            {/* Left — image + copy */}
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-[700px]">
              <Image
                src="/images/heroes-service-banner-v2.png"
                alt="Veteran, firefighter, and EMS professional"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover object-[69%_center] lg:object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,35,37,.10)_0%,rgba(4,35,37,.72)_100%)] lg:bg-[linear-gradient(100deg,rgba(4,35,37,.96)_0%,rgba(4,35,37,.85)_42%,rgba(4,35,37,.30)_75%,transparent_100%)]" />

              <div className="absolute inset-0 flex flex-col justify-end p-7 text-white lg:justify-center lg:p-12 lg:pr-0">
                <p className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.26em] text-[#c7a06d]">
                  <span className="h-px w-6 bg-[#c7a06d]/60" /> EVLV Service Recognition Program
                </p>

                <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.025em] sm:text-5xl lg:text-[60px]">
                  You served.<br />We've got you.
                </h1>

                <p className="mt-4 max-w-[440px] text-sm leading-relaxed text-white/72 md:text-base">
                  EVLV offers a permanent <strong className="font-semibold text-white">25% lifetime discount</strong> to verified veterans, active military, first responders, and healthcare professionals. Verify once — the benefit stays on your account forever.
                </p>

                <div className="mt-7 grid max-w-[380px] grid-cols-3 gap-3 border-t border-white/15 pt-6 text-center">
                  {[
                    { icon: "ri-percent-line", stat: "25%", label: "Off every order" },
                    { icon: "ri-infinity-line", stat: "Lifetime", label: "No expiration" },
                    { icon: "ri-shield-check-line", stat: "Auto", label: "Applies at checkout" },
                  ].map((item) => (
                    <div key={item.stat}>
                      <i className={`${item.icon} text-[#c7a06d] text-lg`} />
                      <p className="mt-1 font-display text-base font-semibold text-white">{item.stat}</p>
                      <p className="mt-0.5 text-[10px] text-white/50">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="flex flex-col justify-center bg-[#f4f7f5] p-7 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage-deep">Apply now — it&apos;s free</p>
              <h2 className="mt-1.5 font-display text-2xl font-semibold text-charcoal">Claim your discount</h2>
              <p className="mt-2 text-sm text-charcoal/55">Fill in your details and upload proof of service. We review every application personally.</p>
              <div className="mt-5">
                <HeroesDiscountForm />
              </div>
              <p className="mt-4 text-center text-[11px] text-charcoal/35">
                Reviewed within 1–2 business days · Documents kept private
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO QUALIFIES ───────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sage-deep">Eligibility</p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Who qualifies?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-charcoal/55 md:text-base">
              If you serve or have served your country or community, this program was built for you.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {WHO_QUALIFIES.map((item) => (
              <div key={item.label} className="rounded-2xl border border-stone bg-ivory-soft p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-deep text-lg text-white">
                  <i className={item.icon} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/55">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="border-y border-stone bg-[#07383a] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1000px] px-5 text-center md:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#c7a06d]">Simple process</p>
          <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Verify once. Save forever.</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { n: "01", title: "Apply above", body: "Enter your name, email, service status, and branch. Upload one document proving your eligibility." },
              { n: "02", title: "We verify", body: "Our team manually reviews every submission — typically within 1–2 business days. You'll get a confirmation email." },
              { n: "03", title: "25% every order", body: "Your discount is attached to your account. No codes. No renewals. It just works at checkout, automatically, for life." },
            ].map((step) => (
              <div key={step.n} className="rounded-2xl border border-white/10 bg-white/5 p-7 text-left">
                <span className="font-mono text-2xl font-bold text-[#c7a06d]">{step.n}</span>
                <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[860px] px-5 md:px-8">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-sage-deep">Common questions</p>
          <h2 className="mt-2 text-center font-display text-3xl font-semibold md:text-4xl">Everything you need to know</h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-xl border border-stone bg-ivory-soft p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.q}
                  <i className="ri-add-line shrink-0 text-sage-deep transition group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-charcoal/50">
            Still have questions?{" "}
            <Link href="/contact" className="font-semibold text-sage-deep underline underline-offset-4">
              Contact our support team
            </Link>.
          </p>
        </div>
      </section>

    </div>
  );
}
