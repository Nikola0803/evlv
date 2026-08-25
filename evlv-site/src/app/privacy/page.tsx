import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | EVLV",
  description: "What EVLV collects, how it's used, and how to control it.",
};

const SECTIONS = [
  {
    title: "What we collect",
    body: "Account information you provide (email, display name), order details (items, shipping address, order history), and standard site-usage data (pages viewed, device/browser type) collected automatically as you browse.",
  },
  {
    title: "How we use it",
    body: "To process and ship orders, maintain your account and order history, respond to support requests, and improve the site. We don't sell your personal information to third parties.",
  },
  {
    title: "Cookies & local storage",
    body: "We use cookies and browser local storage to keep you signed in, remember your cart and currency preference, and understand how the site is used. You can clear these at any time through your browser settings.",
  },
  {
    title: "Third parties",
    body: "We share the minimum information necessary with service providers who help us operate: payment processing, shipping and fulfillment, and independent laboratories for batch testing (which never receive your personal or order information).",
  },
  {
    title: "Data retention",
    body: "We keep account and order data for as long as your account is active, or as needed to comply with legal and accounting obligations.",
  },
  {
    title: "Your choices",
    body: "You can update your display name or remove saved addresses at any time from your account page, or contact us to request deletion of your account and associated data.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-sage-deep py-20 text-center text-white md:py-32">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-light">Privacy Policy</p>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">What we collect, and why.</h1>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-28">
        <div className="mx-auto max-w-[800px] space-y-10 px-4 md:px-8">
          <p className="text-sm text-charcoal/50">Last updated: August 2026</p>
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
