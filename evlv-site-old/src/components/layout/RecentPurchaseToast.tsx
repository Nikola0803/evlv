"use client";

/**
 * Floating "recent purchase" social-proof toast. Ported from a reference
 * project's RecentPurchaseToast pattern, re-skinned to EVLV.
 *
 * Data is illustrative, not a live feed of real orders (same convention as
 * the mock ratings/review counts in src/lib/products.ts) -- cycles through actual catalog products/
 * images, but the buyer name, city, and "N minutes ago" are placeholder
 * examples, not real customer data. If real anonymized order data becomes
 * available later, resolve it server-side (same pattern as any future
 * /api/account/orders route) rather than exposing raw order data publicly.
 *
 * Positioned bottom-left on desktop to clear the "Not sure what you need?"
 * quiz button (bottom-6 right-6) and the cart toast (bottom-6, centered). On
 * mobile it renders as a banner just under the fixed header instead, since
 * the bottom strip is already crowded by those two.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProducts } from "@/lib/products";

// US-only for now — Canada, Australia, UK come later once EVLV ships there.
const SAMPLE_BUYERS = [
  { name: "Jordan K.", city: "Miami, FL" },
  { name: "Maria S.", city: "Austin, TX" },
  { name: "David L.", city: "Seattle, WA" },
  { name: "Priya R.", city: "Boston, MA" },
  { name: "Chris T.", city: "Denver, CO" },
];

const MINUTES_AGO = [12, 27, 41, 58, 6, 33];

const FEATURED_PRODUCTS = getProducts()
  .filter((p) => p.inStock)
  .slice(0, 8);

const SHOW_MS = 7000;
const GAP_MS = 9000;
const FIRST_DELAY_MS = 5000;

export function RecentPurchaseToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped || FEATURED_PRODUCTS.length === 0) return;

    let showTimer: number;
    let hideTimer: number;

    const cycle = () => {
      setVisible(true);
      hideTimer = window.setTimeout(() => {
        setVisible(false);
        showTimer = window.setTimeout(() => {
          setIndex((i) => (i + 1) % FEATURED_PRODUCTS.length);
          cycle();
        }, GAP_MS);
      }, SHOW_MS);
    };

    const first = window.setTimeout(cycle, FIRST_DELAY_MS);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [stopped]);

  if (stopped || FEATURED_PRODUCTS.length === 0) return null;

  const product = FEATURED_PRODUCTS[index];
  const buyer = SAMPLE_BUYERS[index % SAMPLE_BUYERS.length];
  const minutesAgo = MINUTES_AGO[index % MINUTES_AGO.length];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed z-40 top-[100px] inset-x-4 sm:inset-x-auto sm:top-auto sm:bottom-6 sm:left-6 sm:w-[min(19rem,calc(100vw-7rem))] transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 sm:translate-y-2 pointer-events-none opacity-0"
      }`}
    >
      <div className="relative flex items-center gap-3 rounded-lg border border-stone bg-ivory/95 p-3 pr-8 shadow-[0_20px_50px_-12px_rgba(14,17,19,0.35)] backdrop-blur-md">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-ivory-soft">
          {product.image && <Image src={product.image} alt={product.name} width={90} height={112} className="h-full w-full object-cover" />}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] text-charcoal/50">
            <span className="font-semibold text-charcoal/80">{buyer.name}</span>
            <span className="text-charcoal/40"> · {buyer.city}</span>
          </p>
          <p className="mt-0.5 truncate font-display text-sm font-semibold text-charcoal">{product.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-copper">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-copper" />
            </span>
            Purchased {minutesAgo} minutes ago
          </p>
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setStopped(true)}
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-charcoal/40 transition hover:bg-stone/60 hover:text-charcoal"
        >
          <i className="ri-close-line text-xs" />
        </button>
      </div>
    </div>
  );
}
