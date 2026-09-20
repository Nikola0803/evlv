import { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Returns Policy | EVLV",
  description: "EVLV's policy on returns, refunds and quality concerns.",
};

const SECTIONS = [
  {
    title: "All sales are final",
    body: "Because every batch is independently laboratory-tested before it's sold, and testing results are published for every compound, all sales are final. We don't accept returns for change of mind.",
  },
  {
    title: "Quality concerns",
    body: "If you believe a product you received doesn't match its published Certificate of Analysis, contact us with your order number and batch code. We'll work with you directly to investigate.",
  },
  {
    title: "Verify before you contact us",
    body: "Every vial is labeled with a batch code. Before reaching out, match that code against the published report on our COAs page, it's the fastest way to confirm what you received.",
  },
  {
    title: "Damaged or incorrect shipments",
    body: "If your order arrives damaged in transit or doesn't match what you ordered, contact us within 48 hours of delivery with photos, and we'll make it right.",
  },
];

export default function ReturnsPage() {
  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Returns Policy</p>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">All sales are final, and here's why.</h1>
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

          <div className="rounded-lg border border-stone bg-ivory-soft p-8 text-center">
            <h3 className="mb-2 font-display text-xl font-semibold text-charcoal">Have a quality concern?</h3>
            <p className="mb-4 text-sm text-charcoal/50">Reach out and we'll work with you directly.</p>
            <ButtonLink href="/contact">
              Contact Us <i className="ri-arrow-right-line" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
