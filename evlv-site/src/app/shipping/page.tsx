import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | EVLV",
  description: "EVLV shipping regions, processing times, packaging and tracking.",
};

const SECTIONS = [
  {
    title: "Where we ship",
    body: "EVLV ships across the United States and Canada. Pricing and currency are set automatically based on your location, and can be switched manually from USD to CAD (or back) at any time from the top of the site.",
  },
  {
    title: "Processing time",
    body: "Orders placed before our daily cutoff are dispatched the same business day. Every compound we sell is lyophilized and shelf-stable in transit, so no cold-chain packaging is required, orders go out next-day rather than waiting on refrigerated logistics.",
  },
  {
    title: "Delivery estimates",
    body: "Most orders arrive within 1-2 business days of dispatch once shipped. You'll receive tracking information by email within one business day of your order going out.",
  },
  {
    title: "Free shipping",
    body: "Orders over $300 (in your selected currency) ship free. Orders under that threshold include a flat shipping charge, shown at checkout before you place your order.",
  },
  {
    title: "Packaging",
    body: "All orders are packaged discreetly, with no product branding visible on the exterior of the shipment.",
  },
];

export default function ShippingPage() {
  return (
    <>
      <section className="bg-sage-deep py-20 text-center text-white md:py-32">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-light">Shipping Policy</p>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">Fast, discreet, ambient shipping.</h1>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-28">
        <div className="mx-auto max-w-[800px] space-y-10 px-4 md:px-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-medium text-charcoal">{s.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-soft-gray">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
