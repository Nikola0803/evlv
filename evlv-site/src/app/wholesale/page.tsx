import { Metadata } from "next";
import Link from "next/link";
import { WholesaleForm } from "./WholesaleForm";

export const metadata: Metadata = {
  title: "Dropshipping & Wholesale | EVLV",
  description: "White-label your own research peptide storefront on EVLV's supply chain — custom CRM/CMS, branded website, and fulfillment included.",
  alternates: { canonical: "/wholesale" },
};

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
];

const STEPS = [
  { num: "01", title: "Inquire", body: "Tell us about your business and expected volume." },
  { num: "02", title: "Commit", body: "Confirm a wholesale volume commitment, starting at $5,000–$10,000/month." },
  { num: "03", title: "Launch", body: "We build your CRM/CMS and storefront, and connect fulfillment before you go live." },
];

export default function WholesalePage() {
  return (
    <>
      <section className="bg-charcoal py-20 text-white md:py-32">
        <div className="mx-auto max-w-[900px] px-4 text-center md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Partner Program</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Your brand.
            <br />
            Our supply chain.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
            White-label a research peptide business on EVLV&apos;s infrastructure — a custom CRM/CMS, a branded
            website, and fulfillment, built around a wholesale volume commitment.
          </p>
          <Link
            href="/account?tab=wholesale"
            className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60 transition hover:text-white"
          >
            Already a partner? Sign in to your account <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">01 / What&apos;s Included</p>
          <h2 className="mb-10 font-display text-3xl font-semibold text-charcoal md:text-4xl">Everything but the brand name.</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

      <section className="bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">02 / How It Works</p>
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
            Wholesale commitments start at $5,000–$10,000 per month, scoped to your expected volume during the
            inquiry conversation. Not a flat setup fee — a supply commitment that unlocks the full build.
          </p>
        </div>
      </section>

      <section className="bg-charcoal py-16 md:py-24">
        <div className="mx-auto max-w-[600px] px-4 md:px-8">
          <h2 className="mb-2 text-center font-display text-2xl font-semibold text-white">Start the conversation.</h2>
          <p className="mb-8 text-center text-sm text-white/50">
            Every inquiry is reviewed by hand before we scope a build.
          </p>
          <WholesaleForm />
        </div>
      </section>
    </>
  );
}
