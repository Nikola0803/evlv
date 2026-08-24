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

  if (!BUSINESS_UNIT_ID) return null;

  return (
    <section className="bg-sage-deep py-24 text-white md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
          03 / The EVLV Experience
        </p>
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
      </div>
    </section>
  );
}
