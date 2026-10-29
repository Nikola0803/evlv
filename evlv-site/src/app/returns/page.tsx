import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns Policy",
  description: "EVLV returns, replacements, and order issue policy for research-use-only compounds.",
};

export default function ReturnsPage() {
  return (
    <>
      <section className="cp-info-hero -mt-[90px] bg-charcoal pb-16 pt-[150px] text-center text-white md:-mt-[100px] md:pb-24 md:pt-[170px]">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Legal</p>
          <h1 className="font-display text-3xl font-semibold uppercase leading-tight md:text-5xl">Returns Policy</h1>
          <p className="mt-4 text-sm text-white/50">Effective Date: October 2026</p>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <p className="mb-12 text-base leading-relaxed text-soft-gray">
            All products sold by EVLV are intended strictly for laboratory and analytical research purposes. Due to
            the nature of research-grade compounds, all sales are considered final. Exceptions are made in limited
            circumstances as described below. By completing a purchase you acknowledge and agree to this policy.
          </p>

          <div className="space-y-12">
            <PolicySection num="1" title="All Sales Final">
              <p>
                Because EVLV supplies research-use-only compounds, we do not accept returns or issue refunds based
                on a change of mind, ordering the incorrect product, or dissatisfaction unrelated to a verifiable
                product or fulfillment issue. We encourage customers to review product specifications, certificate
                of analysis documentation, and order details carefully before purchasing.
              </p>
            </PolicySection>

            <PolicySection num="2" title="Eligible Issues">
              <p className="mb-4">
                We will issue a replacement or store credit — at our discretion — in the following circumstances:
              </p>
              <ul className="list-none space-y-3">
                {[
                  "An item was shipped in error (wrong product or wrong quantity).",
                  "An item arrived visibly damaged or the packaging seal was broken prior to delivery.",
                  "A demonstrable quality defect is identified and supported by documentation.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-copper" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Replacements are issued for the same SKU and quantity as the original order. Cash refunds are not
                available except where required by applicable law.
              </p>
            </PolicySection>

            <PolicySection num="3" title="Reporting Window">
              <p>
                All issues must be reported within <strong className="text-charcoal">14 days</strong> of the
                confirmed delivery date. Claims submitted outside this window will not be considered. Delivery
                dates are determined by carrier tracking records.
              </p>
            </PolicySection>

            <PolicySection num="4" title="How to Report an Issue">
              <p className="mb-3">
                Contact our support team via the{" "}
                <Link href="/contact" className="font-semibold text-copper hover:underline">
                  Contact page
                </Link>{" "}
                or at{" "}
                <a href="mailto:orders@evlvpeptides.com" className="font-semibold text-copper hover:underline">
                  orders@evlvpeptides.com
                </a>{" "}
                with the following:
              </p>
              <ul className="list-none space-y-3">
                {[
                  "Your order number.",
                  "A clear description of the issue.",
                  "Photographic documentation of damaged or incorrect items.",
                  "The lot number printed on the product label, where available.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-copper" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Our team will review your submission and respond within 2 business days. We reserve the right to
                request additional information before making a determination.
              </p>
            </PolicySection>

            <PolicySection num="5" title="Non-Eligible Circumstances">
              <p className="mb-3">The following are not eligible for replacement or credit:</p>
              <ul className="list-none space-y-3">
                {[
                  "Products that have been opened, reconstituted, or used in any capacity.",
                  "Products stored outside the recommended conditions stated on the label or certificate of analysis.",
                  "Orders where the delivery address provided was inaccurate or incomplete.",
                  "Delays caused by the shipping carrier or circumstances outside EVLV's control.",
                  "Dissatisfaction with research outcomes.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-copper/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection num="6" title="Chargebacks">
              <p>
                Filing a chargeback without first contacting EVLV support to resolve the issue is considered a
                violation of this policy. We maintain detailed order, fulfillment, and delivery records and will
                respond to all disputes with full documentation.
              </p>
            </PolicySection>

            <PolicySection num="7" title="Contact">
              <p>
                For any order-related concerns, reach us via our{" "}
                <Link href="/contact" className="font-semibold text-copper hover:underline">
                  Contact page
                </Link>{" "}
                or at{" "}
                <a href="mailto:orders@evlvpeptides.com" className="font-semibold text-copper hover:underline">
                  orders@evlvpeptides.com
                </a>
                . Phone support is available at{" "}
                <a href="tel:+15417095434" className="font-semibold text-copper hover:underline">
                  (541) 709-5434
                </a>
                .
              </p>
            </PolicySection>
          </div>

          <div className="mt-16 border-t border-stone pt-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal/40">Related Legal Documents</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/shipping" className="text-charcoal/60 transition hover:text-charcoal">
                Shipping Policy
              </Link>
              <Link href="/terms" className="text-charcoal/60 transition hover:text-charcoal">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy" className="text-charcoal/60 transition hover:text-charcoal">
                Privacy Policy
              </Link>
              <Link href="/ruo" className="text-charcoal/60 transition hover:text-charcoal">
                Research Use Only
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PolicySection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="flex items-baseline gap-2 font-display text-xl font-semibold text-charcoal">
        <span className="text-copper">{num}.</span> {title}
      </h2>
      <div className="mt-3 text-base leading-relaxed text-soft-gray">{children}</div>
    </div>
  );
}
