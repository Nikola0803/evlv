import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WholesaleForm } from "./WholesaleForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Dropshipping & Wholesale | EVLV",
  description: "White-label your own research peptide storefront on EVLV's supply chain — custom CRM/CMS, branded website, and fulfillment included, priced with a personal offer built around your business.",
  alternates: { canonical: "/wholesale" },
};

const HERO_FACTS = [
  { icon: "ri-money-dollar-circle-line", title: "$0 build cost", subtitle: "Website + CRM included" },
  { icon: "ri-price-tag-3-line", title: "Market-rate pricing", subtitle: "No markup on product cost" },
  { icon: "ri-handshake-line", title: "Personal offer", subtitle: "Scoped to your pack, not a tier" },
];

const INCLUDED = [
  {
    icon: "ri-dashboard-3-line",
    title: "Custom CRM/CMS",
    body: "A dedicated backend for your brand — orders, customers, content, and reporting, built on the same system EVLV runs on.",
  },
  {
    icon: "ri-global-line",
    title: "Branded Website",
    body: "A fully designed storefront under your own brand identity, not a reskinned template.",
  },
  {
    icon: "ri-archive-2-line",
    title: "Fulfillment",
    body: "Inventory, packing, and shipping handled on our end. You run the brand — we run the warehouse.",
  },
  {
    icon: "ri-headphone-line",
    title: "Ongoing Support",
    body: "Hosting, updates, and a direct line to our team after launch — not a one-time handoff.",
  },
];

const BUILD_STATS = [
  { value: "$0", label: "Upfront cost for the website & CRM build" },
  { value: "Market rate", label: "What you pay for product — no build markup" },
  { value: "1:1", label: "Personal offer, scoped to your pack selection" },
  { value: "Ongoing", label: "Hosting, updates, and support after launch" },
];

const STEPS = [
  { num: "01", title: "Inquire", body: "Tell us about your business, your audience, and the pack sizes you want to sell." },
  { num: "02", title: "Personal Offer", body: "We scope pricing and build to your business specifically — no flat monthly minimum, no one-size tier." },
  { num: "03", title: "Launch", body: "We build your CRM/CMS and storefront, and connect fulfillment before you go live." },
];

const FREE_ITEMS = [
  "Custom-designed storefront, built for your brand",
  "Full CRM/CMS — orders, customers, content, reporting",
  "Hosting, updates, and ongoing support after launch",
  "Inventory, packing, and shipping on our end",
];

const REQUIRED_ITEMS = [
  "Your storefront and CRM run on EVLV's product catalog",
  "Product pricing to you matches current market rates",
  "No separate setup fee — the build is funded by the supply relationship",
];

export default function WholesalePage() {
  return (
    <>
      {/* Top bar */}
      <div className="border-b border-stone bg-charcoal py-2.5 text-center text-xs text-white/70">
        Already a partner?{" "}
        <Link href="/account?tab=wholesale" className="font-semibold text-copper-light underline underline-offset-2 hover:text-copper">
          Sign in to your dashboard
        </Link>
      </div>

      {/* Hero */}
      <section className="relative -mt-px overflow-hidden bg-charcoal py-16 text-white md:py-24">
        <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="mb-5 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-copper lg:justify-start">
              <span className="h-px w-8 bg-copper/60" />
              Partner Program
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-white md:text-5xl lg:text-6xl">
              Your brand.
              <br />
              Our supply chain.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg lg:mx-0">
              White-label a research peptide business on EVLV&apos;s infrastructure — a custom CRM/CMS, a branded
              website, and fulfillment, built around a personal offer for your business.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 lg:mx-0">
              No flat volume commitment. We build the offer around the pack sizes and catalog you actually want to
              sell.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#inquire"
                className="rounded-md bg-copper px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light"
              >
                Start the conversation <i className="ri-arrow-right-line" />
              </a>
              <a
                href="#included"
                className="rounded-md border border-white/25 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
              >
                See what&apos;s included
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 border-t border-white/10 pt-9 lg:justify-start">
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

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:aspect-[5/4]">
            <Image
              src="/images/science/coa-vial-banner.png"
              alt="EVLV research peptide vial with certificate of analysis"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="included" className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">01 / What&apos;s Included</p>
          <h2 className="mb-10 font-display text-3xl font-semibold text-charcoal md:text-4xl">Everything but the brand name.</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((item) => (
              <div key={item.title} className="rounded-lg border border-stone bg-ivory-soft p-6">
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-copper/15 text-copper">
                  <i className={item.icon} />
                </span>
                <h3 className="font-display text-lg font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + photo */}
      <section className="bg-ivory-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <Reveal className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">The Numbers</p>
              <h2 className="max-w-md font-display text-3xl font-semibold leading-tight text-charcoal md:text-4xl">
                A real build, not a plugin storefront.
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
                {BUILD_STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl font-semibold text-sage-deep md:text-3xl">{s.value}</p>
                    <p className="mt-1.5 text-xs leading-snug text-charcoal/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg">
              <Image
                src="/images/proof/ugc-1.webp"
                alt="EVLV research peptide vial"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How pricing works / disclosure */}
      <section className="relative overflow-hidden bg-sage-deep py-20 text-white md:py-28">
        <div className="relative mx-auto max-w-[1100px] px-4 md:px-8">
          <Reveal className="mb-12 text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">How It Works</p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">
              We build it. You brand it. One condition keeps it working.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              Every wholesale and dropshipping partner gets a fully built website and a complete CRM system at no
              additional cost — no setup fee, no dev bill. The one requirement: everything we build for you runs on
              EVLV&apos;s product catalog, so the build stays tied to the supply relationship that funds it. What you
              pay us for product matches current market rates — we don&apos;t mark up to cover the build.
            </p>
          </Reveal>

          <Reveal stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">What&apos;s Free</p>
              <ul className="space-y-3">
                {FREE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                    <i className="ri-checkbox-circle-fill mt-0.5 shrink-0 text-copper" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">What&apos;s Required</p>
              <ul className="space-y-3">
                {REQUIRED_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                    <i className="ri-shield-check-line mt-0.5 shrink-0 text-copper" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works - steps */}
      <section className="bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">02 / The Process</p>
          <h2 className="mb-10 font-display text-3xl font-semibold text-charcoal md:text-4xl">A real partnership, not a plugin.</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.num} className="rounded-lg border border-stone bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-copper">{s.num}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-charcoal">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-charcoal/40">
            No flat setup fee, no fixed monthly minimum — every offer is scoped to the pack sizes and volume you tell
            us about during the inquiry conversation.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-charcoal py-24 text-center text-white md:py-32">
        <Reveal className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Start The Conversation</p>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
            Ready to build your own storefront?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-white/70 md:text-lg">
            Every inquiry is reviewed by hand before we scope a personal offer and a build.
          </p>
        </Reveal>
      </section>

      {/* Form */}
      <section id="inquire" className="bg-charcoal py-4 pb-20 md:pb-28">
        <div className="mx-auto max-w-[600px] px-4 md:px-8">
          <WholesaleForm />
        </div>
      </section>
    </>
  );
}
