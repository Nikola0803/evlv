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
  {
    icon: "ri-medal-line",
    label: "Active Duty Military",
    detail: "Currently serving members of the Army, Navy, Marine Corps, Air Force, Space Force, and Coast Guard.",
  },
  {
    icon: "ri-shield-star-line",
    label: "Veterans",
    detail: "Honorably discharged service members who have served our nation with distinction.",
  },
  {
    icon: "ri-alarm-warning-line",
    label: "First Responders",
    detail: "Law enforcement, firefighters, EMS, paramedics, and emergency dispatch personnel.",
  },
  {
    icon: "ri-nurse-line",
    label: "Healthcare Workers",
    detail: "Nurses, physicians, and frontline medical staff in hospitals, clinics, and military-affiliated facilities.",
  },
] as const;

const STEPS = [
  { n: "01", title: "Submit the form", body: "Enter your name, email, service type, and branch or department below." },
  { n: "02", title: "Upload your proof", body: "Military ID, DD-214, department credential, badge photo, or uniform photo. PDF or image, under 8MB." },
  { n: "03", title: "We review", body: "Our team manually reviews every submission — typically within 1–2 business days. You'll get a confirmation email." },
  { n: "04", title: "25% on every order", body: "Your discount is tied to your account email. No codes, no renewals — it applies automatically at checkout, for life." },
] as const;

const FAQ = [
  {
    q: "Do I need to verify my status every time I order?",
    a: "No. Once verified, the benefit is permanently tied to your account email. It applies automatically at every checkout — no code, no repeat verification.",
  },
  {
    q: "Can I share my discount?",
    a: "No. The benefit is non-transferable and tied to one verified account email. One discount per individual.",
  },
  {
    q: "What documents are accepted for verification?",
    a: "Military/veteran ID, DD-214, department-issued credential, agency badge, or a photo of a service uniform. Cover badge numbers, patient info, or any unrelated sensitive identifiers before uploading.",
  },
  {
    q: "How long does verification take?",
    a: "We review every submission by hand, typically within 1–2 business days. You'll receive a confirmation email as soon as your discount is activated.",
  },
  {
    q: "Is there a limit on how many times I can use my discount?",
    a: "No. The 25% lifetime discount applies to every order you place — no usage limit, no expiration, and no minimum spend.",
  },
  {
    q: "What if I have trouble submitting verification?",
    a: "Contact our support team at office@evlvpeptides.com or (541) 709-5434 — we're available 7 days a week and can assist with manual verification.",
  },
] as const;

export default function HeroesDiscountPage() {
  return (
    <div className="bg-white text-charcoal">

      {/* ── HERO — rounded card with outer padding ───────────────────── */}
      <section className="px-3 pb-8 pt-5 md:px-6 md:pb-12 md:pt-7">
        <div className="mx-auto max-w-[1300px] overflow-hidden rounded-[22px] shadow-[0_16px_50px_rgba(8,40,41,.12)]">
          <div className="relative min-h-[360px] bg-[#0b2f2c] text-white md:min-h-[480px]">
            <Image
              src="/images/heroes-service-banner-v2.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1300px) 100vw, 1300px"
              className="object-cover object-[69%_center] opacity-20"
            />
            <div className="absolute inset-0 bg-[#0b2f2c]/60" />
            <div className="relative flex h-full min-h-[360px] flex-col items-center justify-center px-5 py-16 text-center md:min-h-[480px] md:py-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">
                EVLV · Service Appreciation
              </p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-5xl md:text-[60px] lg:text-[72px]">
                Honoring Military<br />&amp; First Responders
              </h1>
              <p className="mx-auto mt-5 max-w-[520px] text-sm leading-relaxed text-white/60 md:text-base">
                Active Military, Veterans &amp; First Responders receive an{" "}
                <strong className="font-semibold text-white">exclusive 25% lifetime discount</strong> on all EVLV products. American-made peptides for America's heroes.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="#form"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-[12px] font-bold uppercase tracking-[0.13em] text-[#0b2f2c] transition hover:bg-white/90"
                >
                  Claim My 25% Discount
                </a>
                <Link
                  href="/shop"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-8 text-[12px] font-bold uppercase tracking-[0.13em] text-white/75 transition hover:border-white/60 hover:text-white"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMITMENT ───────────────────────────────────────────────── */}
      <section className="border-b border-stone py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sage-deep">Our Commitment</p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-snug md:text-3xl">
                American-Made Peptides<br />for America's Heroes
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/60">
                At EVLV, we believe that those who serve our country deserve our very best — and our support. That's why we're proud to offer an{" "}
                <strong className="font-semibold text-charcoal">exclusive 25% lifetime discount</strong> to all active military, veterans, and first responders.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                As a 100% American company, we are deeply grateful for the sacrifices made by our military and first responder communities. Your courage, dedication, and selfless service inspires us to give back in every way we can.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sage-deep">Our Promise</p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-snug md:text-3xl">
                Our Commitment<br />to You
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/60">
                Our peptides are proudly manufactured and tested in the United States, with the same rigorous quality standards and dedication to excellence that you demonstrate in your service to our nation.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                Every vial is independently third-party tested for purity, identity, and composition — because you deserve nothing less than the best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO QUALIFIES ────────────────────────────────────────────── */}
      <section className="bg-[#f4f7f5] py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sage-deep">Eligibility</p>
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">Who Qualifies for Our 25% Discount?</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal/55">
            We're honored to extend this exclusive lifetime discount to those who have dedicated their lives to protecting and serving our nation and communities.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHO_QUALIFIES.map((item) => (
              <div key={item.label} className="rounded-2xl border border-stone bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b2f2c] text-white">
                  <i className={`${item.icon} text-base`} />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold">{item.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/55">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO CLAIM ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sage-deep">Simple process</p>
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">How to Claim Your 25% Discount</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.n} className="rounded-2xl border border-stone bg-[#f4f7f5] p-6">
                <span className="font-mono text-2xl font-bold text-charcoal/25">{step.n}</span>
                <h3 className="mt-3 font-display text-sm font-semibold">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/55">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────────────────── */}
      <section id="form" className="bg-[#f4f7f5] py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_520px]">

            {/* Left — copy */}
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sage-deep">Get Your Code</p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-snug md:text-3xl">
                Ready to Claim<br />Your 25% Off?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/60">
                Upload your proof of service and get your permanent lifetime discount — verified manually, no delay.
              </p>
              <div className="mt-7 flex items-center gap-5 rounded-xl bg-[#0b2f2c] px-6 py-5 text-white">
                <i className="ri-shield-check-line text-4xl text-white/40" />
                <div>
                  <p className="font-display text-2xl font-semibold">25% OFF</p>
                  <p className="mt-0.5 text-xs text-white/50">Lifetime · No expiration · Auto-applied at checkout</p>
                </div>
              </div>
              <div className="mt-6 space-y-2.5 text-sm text-charcoal/60">
                <p className="flex items-center gap-2.5">
                  <i className="ri-phone-line text-sage-deep" /> (541) 709-5434
                </p>
                <p className="flex items-center gap-2.5">
                  <i className="ri-mail-line text-sage-deep" /> office@evlvpeptides.com
                </p>
              </div>
              <p className="mt-6 rounded-lg border border-stone bg-white p-4 text-xs leading-relaxed text-charcoal/45">
                <strong className="font-semibold text-charcoal/60">Your privacy matters.</strong> We only use your contact information to verify and confirm data and send your discount. We will never sell or share your information.
              </p>
            </div>

            {/* Right — form */}
            <div className="rounded-2xl border border-stone bg-white p-7 lg:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage-deep">
                Military, First Responder &amp; Healthcare Discount Request
              </p>
              <div className="mt-5">
                <HeroesDiscountForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">

            {/* Left */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sage-deep">Common Questions</p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-snug md:text-3xl">
                Frequently<br />Asked
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/55">
                Have questions? Our team is available 7 days a week to help.
              </p>
              <div className="mt-6 space-y-2.5 text-sm text-charcoal/60">
                <p className="flex items-center gap-2.5">
                  <i className="ri-phone-line text-sage-deep" /> (541) 709-5434
                </p>
                <p className="flex items-center gap-2.5">
                  <i className="ri-mail-line text-sage-deep" />
                  <Link href="/contact" className="underline underline-offset-2 hover:text-sage-deep">Contact support</Link>
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-3">
              {FAQ.map((item) => (
                <details key={item.q} className="group rounded-xl border border-stone bg-[#f4f7f5] p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                    {item.q}
                    <i className="ri-add-line shrink-0 text-sage-deep transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{item.a}</p>
                </details>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CLOSING STRIP ────────────────────────────────────────────── */}
      <section className="bg-[#0b2f2c] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1100px] px-5 text-center md:px-8">
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
            American Made.<br />
            <span className="text-white/50">Veteran Approved.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/55">
            From everyone at EVLV, we express our heartfelt gratitude for your service and sacrifice. This discount is our small way of giving back to those who have given so much.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#form"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-9 text-[12px] font-bold uppercase tracking-[0.13em] text-[#0b2f2c] transition hover:bg-white/90"
            >
              Get Your Discount Code
            </a>
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 px-9 text-[12px] font-bold uppercase tracking-[0.13em] text-white/70 transition hover:border-white/50 hover:text-white"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
