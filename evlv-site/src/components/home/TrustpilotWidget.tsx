"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

/**
 * Real Trustpilot reviews via their official TrustBox embed (mini carousel
 * template). Needs NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID set — that's a
 * Trustpilot-generated id from Business App > Widgets > Mini Carousel,
 * NOT the domain. Renders nothing (rather than a broken/empty widget) until
 * that env var is set.
 */
const BUSINESS_UNIT_ID = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID;
const TRUSTPILOT_DOMAIN = "evlvpeptides.com";

export function TrustpilotWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the bootstrap script already loaded (e.g. client nav back to this page),
    // it exposes window.Trustpilot.loadFromElement to (re)hydrate the widget.
    const tp = (window as unknown as { Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void } }).Trustpilot;
    if (tp && ref.current) {
      tp.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <section className="bg-sage-deep py-24 text-white md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
          03 / The EVLV Experience
        </p>

        {BUSINESS_UNIT_ID ? (
          <>
            <Script src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" strategy="lazyOnload" />
            <div
              ref={ref}
              className="trustpilot-widget"
              data-locale="en-US"
              data-template-id="53aa8807dbbb607a2c0006f0"
              data-businessunit-id={BUSINESS_UNIT_ID}
              data-style-height="140px"
              data-style-width="100%"
              data-theme="dark"
              data-stars="4,5"
            >
              <a href={`https://www.trustpilot.com/review/${TRUSTPILOT_DOMAIN}`} target="_blank" rel="noopener noreferrer">
                Trustpilot
              </a>
            </div>
          </>
        ) : (
          <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-lg border border-dashed border-white/20 px-6 py-10 text-center">
            <i className="ri-star-line text-2xl text-copper" />
            <p className="text-sm text-white/60">
              Real Trustpilot reviews will appear here once connected. Add your Business Unit ID (from Trustpilot
              Business App → Widgets → Mini Carousel) as <code className="text-copper">NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID</code> in
              <code className="text-copper"> .env.local</code>.
            </p>
            <a
              href={`https://www.trustpilot.com/review/${TRUSTPILOT_DOMAIN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wide text-copper hover:underline"
            >
              View on Trustpilot →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
