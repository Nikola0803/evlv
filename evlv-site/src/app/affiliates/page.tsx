import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateForm } from "./AffiliateForm";

export const metadata: Metadata = {
  title: "Affiliate Program | EVLV",
  description: "Refer researchers and labs to EVLV, and earn commission on every order they place.",
};

const STEPS = [
  { num: "01", icon: "ri-user-line", title: "Apply", body: "Submit your application. We review every one by hand, typically within a couple of business days." },
  { num: "02", icon: "ri-share-line", title: "Refer", body: "Once approved, you'll get a personal referral code to share with colleagues, labs, or your audience." },
  { num: "03", icon: "ri-percent-line", title: "Earn", body: "Earn commission on every confirmed order placed with your code, paid out monthly." },
];

const BENEFITS = [
  { icon: "ri-percent-line", title: "Commission On Every Order", body: "Earn a percentage of every verified order placed with your referral code." },
  { icon: "ri-coupon-3-line", title: "Personal Discount", body: "Affiliates get a personal discount code for their own research procurement, on top of commission earnings." },
  { icon: "ri-calendar-check-line", title: "Monthly Payouts", body: "Earnings are paid out monthly once your confirmed balance clears the minimum payout threshold." },
  { icon: "ri-customer-service-2-line", title: "Priority Support", body: "Affiliates get a direct line to the team for their own orders and referral questions." },
];

const TIERS = [
  { label: "Researcher", rate: "8%", note: "Starting rate for every approved affiliate" },
  { label: "Lab Associate", rate: "12%", note: "For consistently active referral volume" },
  { label: "Principal", rate: "16%", note: "For established, high-volume partners" },
];

export default function AffiliatesPage() {
  return (
    <>
      <div className="bg-charcoal py-3">
        <div className="mx-auto flex max-w-[1400px] items-center justify-end px-4 md:px-8">
          <Link
            href="/account?tab=affiliate"
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:text-white"
          >
            Already applied? Sign in to your account <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>

      <section className="bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Lab Affiliate Program</p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
              Refer colleagues.
              <br />
              Earn on every order.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/60">
              Designed for researchers, lab managers, and institutions who already trust EVLV, and want to extend
              that trust, and earn while doing it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#apply" className="rounded-md bg-copper px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light">
                Apply Now
              </a>
              <a href="#tiers" className="text-[12px] font-semibold uppercase tracking-[0.1em] text-charcoal/60 transition hover:text-charcoal">
                View Commission Tiers
              </a>
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-charcoal">
            <Image
              src="/images/affiliate-banner.png"
              alt="Become an EVLV Affiliate — EVLV research peptide vials"
              fill
              sizes="(max-width: 768px) 90vw, 640px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">01 / How It Works</p>
          <h2 className="mb-10 font-display text-3xl font-semibold text-charcoal md:text-4xl">Simple by design.</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.num} className="rounded-lg border border-stone bg-ivory-soft p-6">
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-copper/15 text-copper">
                  <i className={s.icon} />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-copper">{s.num}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-charcoal">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">02 / Program Benefits</p>
          <h2 className="mb-10 font-display text-3xl font-semibold text-charcoal md:text-4xl">What you get.</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex items-start gap-4 rounded-lg bg-white p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-copper/15 text-copper">
                  <i className={b.icon} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-charcoal">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tiers" className="scroll-mt-32 py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">03 / Commission Tiers</p>
          <h2 className="mb-10 font-display text-3xl font-semibold text-charcoal md:text-4xl">Scales with your network.</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((t) => (
              <div key={t.label} className="rounded-lg border border-stone bg-ivory-soft p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/40">{t.label}</p>
                <p className="mt-2 font-display text-4xl font-semibold text-charcoal">{t.rate}</p>
                <p className="mt-1 text-xs text-charcoal/40">Commission per order</p>
                <p className="mt-4 border-t border-stone pt-4 text-xs text-charcoal/50">{t.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-charcoal/40">
            Every affiliate starts at the Researcher rate once approved. Tier upgrades are reviewed manually as your
            referral volume grows, not automatic, reach out any time to request a review.
          </p>
        </div>
      </section>

      <section id="apply" className="scroll-mt-32 bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto max-w-[600px] px-4 text-center md:px-8">
          <h2 className="font-display text-3xl font-semibold text-charcoal md:text-4xl">Apply to the program.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/60">
            Applications are reviewed by our team before your account is activated. We accept researchers, lab
            managers, and institutional buyers.
          </p>
          <div className="mt-8 text-left">
            <AffiliateForm />
          </div>
        </div>
      </section>
    </>
  );
}
