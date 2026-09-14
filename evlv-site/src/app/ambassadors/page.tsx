import { Metadata } from "next";
import Link from "next/link";
import { AffiliateForm } from "./AffiliateForm";
import { Reveal } from "@/components/ui/Reveal";
import { MolecularMotif } from "@/components/ui/MolecularMotif";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Ambassador Program | EVLV",
  description:
    "Join the EVLV Ambassador Program — share research-grade peptides and compounds with your audience, and earn commission on every order they place.",
  alternates: { canonical: "/ambassadors" },
};

const HERO_FACTS = [
  { icon: "ri-calendar-2-line", title: "Monthly", subtitle: "Commission payouts" },
  { icon: "ri-shield-check-line", title: "RUO", subtitle: "Compliant, always" },
  { icon: "ri-chat-3-line", title: "Direct line", subtitle: "To our team" },
];

const HOW_IT_WORKS = [
  { value: "Up to 20%", label: "Commission per confirmed order" },
  { value: "Monthly", label: "Payouts, on confirmed orders" },
  { value: "4", label: "Commission tiers to grow into" },
  { value: "48 hrs", label: "Typical application review" },
];

const CONTENT_TAGS = ["Research Methods", "Peptide Science", "Lab Analysis", "Longevity Research"];

const PARTNER_POINTS = [
  {
    num: "01",
    title: "Commission That Grows With You",
    body: "Start at 8% and climb into higher tiers as your referral volume builds — up to 20% for top partners, paid out monthly.",
  },
  {
    num: "02",
    title: "Compliance-First, By Design",
    body: "We keep every tier RUO-compliant. No dosing claims, no therapeutic promises to police yourself — just clear guardrails so your content stays safe to publish.",
  },
  {
    num: "03",
    title: "A Real Research Catalog",
    body: "Peptides, compounds, and ancillaries — every batch independently lab-verified, so you're standing behind products that hold up to scrutiny.",
  },
  {
    num: "04",
    title: "Your Own Discount, Too",
    body: "Every approved ambassador gets a personal discount code for their own research procurement, separate from commission earnings.",
  },
  {
    num: "05",
    title: "A Team That Answers",
    body: "Questions about a referral, a payout, or a product? You get a direct line to us.",
  },
];

const AUDIENCE_TAGS = [
  "Longevity & Research",
  "Strength & Performance",
  "Biohacking",
  "Peptide Science",
  "Research Communications",
  "Health Education",
  "Lab & Research Communities",
  "Compound Science",
];

const AUDIENCE_SIZES = [
  { value: "10k–50k", label: "Growing creators" },
  { value: "50k+", label: "Established influencers" },
  { value: "Your story", label: "EVLV customers" },
];

const BENEFITS = [
  { icon: "ri-money-dollar-circle-line", label: "Monthly commission payouts" },
  { icon: "ri-coupon-3-line", label: "A personal discount code for your own orders" },
  { icon: "ri-chat-3-line", label: "A direct line to our team" },
  { icon: "ri-file-list-3-line", label: "Real batch COAs and lab reports to share" },
  { icon: "ri-line-chart-line", label: "Commission tiers that grow with your volume" },
  { icon: "ri-megaphone-line", label: "Featured placement across EVLV's own channels" },
];

export default function AmbassadorsPage() {
  return (
    <>
      {/* Top bar */}
      <div className="border-b border-stone bg-charcoal py-2.5 text-center text-xs text-white/70">
        Already an ambassador?{" "}
        <Link href="/account?tab=affiliate" className="font-semibold text-copper-light underline underline-offset-2 hover:text-copper">
          Sign in
        </Link>
      </div>

      {/* Hero */}
      <section className="relative -mt-px overflow-hidden bg-charcoal pb-20 pt-20 text-center text-white md:pb-28 md:pt-28">
        <MolecularMotif
          variant="concentric"
          className="pointer-events-none absolute -right-32 -top-32 hidden h-[420px] w-[420px] lg:block"
        />
        <MolecularMotif
          variant="particles"
          className="pointer-events-none absolute -bottom-24 -left-24 hidden h-[360px] w-[360px] lg:block"
        />
        <div className="relative mx-auto max-w-3xl px-4 md:px-8">
          <div className="mb-5 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-copper">
            <span className="h-px w-8 bg-copper/60" />
            Ambassador Program
            <span className="h-px w-8 bg-copper/60" />
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
            Become an EVLV Ambassador.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Create content. Build your audience. Help serious researchers get real answers.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50">
            We partner with creators, researchers, and educators in the peptide and longevity-research space who
            care about accuracy, not hype — and who want to earn from an audience that already trusts them.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#apply"
              className="rounded-md bg-copper px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light"
            >
              Apply to be an ambassador <i className="ri-arrow-right-line" />
            </a>
            <a
              href="#why-partner"
              className="rounded-md border border-white/25 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
            >
              Why partner with us
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 border-t border-white/10 pt-9">
            {HERO_FACTS.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <i className={`${f.icon} text-xl text-copper`} aria-hidden />
                <div className="text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white">{f.title}</p>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-white/50">{f.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What partnership looks like */}
      <section className="bg-ivory-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <Reveal className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">What Partnership Looks Like</p>
              <h2 className="max-w-md font-display text-3xl font-semibold leading-tight text-charcoal md:text-4xl">
                Your referral code, your link, paid monthly on confirmed orders.
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {HOW_IT_WORKS.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl font-semibold text-sage-deep md:text-3xl">{s.value}</p>
                    <p className="mt-1.5 text-xs leading-snug text-charcoal/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-stone bg-white p-7 shadow-sm md:p-8">
              <div className="flex items-center gap-3 border-b border-stone pb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-deep/10 text-sage-deep">
                  <i className="ri-user-star-line text-xl" />
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-charcoal">@yourhandle</p>
                  <p className="text-xs text-charcoal/50">Any size · IG / TikTok / YouTube</p>
                </div>
                <span className="ml-auto rounded-full border border-sage-deep/30 bg-sage-deep/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-sage-deep">
                  Ambassador
                </span>
              </div>
              <div className="pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal/40">Commission rate</p>
                <p className="mt-1.5 font-display text-4xl font-semibold text-charcoal">8–20%</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-copper">
                  <i className="ri-arrow-up-line" /> Grows with your referral volume
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content pillars */}
      <section id="why-partner" className="relative overflow-hidden bg-charcoal py-20 text-white md:py-28">
        <MolecularMotif
          variant="particles"
          className="pointer-events-none absolute -right-24 top-1/2 hidden h-[380px] w-[380px] -translate-y-1/2 lg:block"
        />
        <div className="relative mx-auto max-w-[900px] px-4 text-center md:px-8">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Real Research · Real Routines</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
              Content that lives outside the studio.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              Our best ambassadors share what the lab work actually looks like — a batch on the bench, a COA
              breakdown, a walkthrough of how they read a result. Authenticity beats polish, every time.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {CONTENT_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why partner - numbered list */}
      <section className="bg-ivory-soft py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-14 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Why Partner</p>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] text-charcoal md:text-5xl">
              Built for creators looking for long-term partnerships.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-charcoal/60">
              The EVLV Ambassador Program isn&apos;t built for one-time promotions. We work closely with ambassadors
              through commission that grows with volume, real compliance guardrails, and direct support from our
              team — not a ticket queue.
            </p>
          </Reveal>

          <Reveal>
            <div className="divide-y divide-stone border-t border-stone">
              {PARTNER_POINTS.map((item) => (
                <div key={item.num} className="flex gap-6 py-5">
                  <span className="font-display text-sm text-copper">{item.num}</span>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-charcoal">{item.title}</p>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-soft-gray">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who we're looking for */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-[1000px] px-4 text-center md:px-8">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Who We&apos;re Looking For</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-charcoal md:text-4xl">
              Creators with an authentic voice.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/60">
              Whether you&apos;re a growing creator, an established voice in research or fitness circles, or simply
              an EVLV customer with a story to share — strong engagement and honest content matter most.
            </p>

            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {AUDIENCE_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-stone bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-charcoal/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 divide-y divide-stone border-t border-stone sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {AUDIENCE_SIZES.map((s) => (
                <div key={s.label} className="px-6 py-6 first:pt-0 sm:py-0">
                  <p className="font-display text-2xl font-semibold text-sage-deep">{s.value}</p>
                  <p className="mt-1.5 text-xs uppercase tracking-wide text-charcoal/50">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-sage-deep py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1100px] px-4 md:px-8">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Ambassador Benefits</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">What you get</h2>
          </Reveal>

          <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.label} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-5">
                <i className={`${b.icon} mt-0.5 shrink-0 text-lg text-copper`} aria-hidden />
                <p className="text-sm leading-snug text-white/85">{b.label}</p>
              </div>
            ))}
          </Reveal>

          <p className="mx-auto mt-10 max-w-lg text-center text-xs leading-relaxed text-white/50">
            Institutional Partner tier ambassadors get early access to new EVLV research releases.
          </p>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="bg-ivory py-20 md:py-28">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-14 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Apply Now</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-charcoal md:text-4xl">
              Apply to become an EVLV Ambassador.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal/60">
              We review every application by hand, typically within 48 hours.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-charcoal/50">
              Sign in to your EVLV account first — ambassador status is a role on your existing account, not a
              separate login.
            </p>
          </Reveal>

          <Reveal>
            <AffiliateForm />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-charcoal py-24 text-center text-white md:py-32">
        <Reveal className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Your Audience Already Trusts You</p>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
            Give them research-grade compounds worth citing.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-white/70 md:text-lg">
            Apply today to become an EVLV Ambassador and get paid for referrals your audience was going to make
            anyway.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="#apply" size="lg" className="!bg-copper !text-charcoal hover:!bg-copper-light">
              Apply to be an ambassador <i className="ri-arrow-right-line" />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
