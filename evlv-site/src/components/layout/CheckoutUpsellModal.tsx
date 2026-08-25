"use client";

/**
 * Checkout-time upsell: shown once per session when the cart has items and
 * doesn't already include the anchor deal product, offering it at 50% off
 * with a countdown. Real EVLV pricing (not placeholder numbers) — 50% off
 * BPC-157's actual $70 price, not a fabricated "was $99.99" figure.
 *
 * Countdown persists across reopens within the session via sessionStorage
 * (a fresh 10-minute window per browser session, not per popup-open) so it
 * reads as one honest offer rather than resetting every time it's shown.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { getProductBySlug } from "@/lib/products";

const ANCHOR_SLUG = "bpc-157-10mg";
const DISCOUNT_PERCENT = 50;
const WINDOW_MS = 10 * 60 * 1000;
const DEADLINE_KEY = "evlv_upsell_deadline";
const DISMISSED_KEY = "evlv_upsell_dismissed";

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function useCheckoutUpsell() {
  const { lines } = useCart();
  const [open, setOpen] = useState(false);

  const anchorInCart = lines.some((l) => l.product.slug === ANCHOR_SLUG);

  function maybeOpen(): boolean {
    if (anchorInCart || lines.length === 0) return false;
    if (typeof window !== "undefined" && sessionStorage.getItem(DISMISSED_KEY)) return false;
    setOpen(true);
    return true;
  }

  return { open, setOpen, maybeOpen };
}

export function CheckoutUpsellModal({ open, onClose, onContinue }: { open: boolean; onClose: () => void; onContinue: () => void }) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [remaining, setRemaining] = useState(WINDOW_MS);
  const deadlineRef = useRef<number>(0);

  const product = getProductBySlug(ANCHOR_SLUG);

  useEffect(() => {
    if (!open) return;
    let deadline = Number(sessionStorage.getItem(DEADLINE_KEY));
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + WINDOW_MS;
      sessionStorage.setItem(DEADLINE_KEY, String(deadline));
    }
    deadlineRef.current = deadline;
    setRemaining(deadline - Date.now());

    const id = window.setInterval(() => {
      const left = deadlineRef.current - Date.now();
      setRemaining(left);
      if (left <= 0) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [open]);

  if (!open || !product) return null;

  const discountedPrice = product.price * (1 - DISCOUNT_PERCENT / 100);
  const savings = product.price - discountedPrice;
  const expired = remaining <= 0;

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    onClose();
  }

  function claim() {
    if (!product) return;
    addToCart(product, 1, discountedPrice, "1 PCS — 50% Off Offer");
    sessionStorage.setItem(DISMISSED_KEY, "1");
    onContinue();
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div aria-hidden onClick={dismiss} className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-stone bg-ivory shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/10 text-charcoal/60 transition hover:bg-charcoal/20 hover:text-charcoal"
        >
          <i className="ri-close-line text-sm" />
        </button>

        <div className="bg-charcoal px-6 pb-4 pt-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-copper">⚡ Limited Time — Checkout Offer</p>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-16 w-13 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
              {product.image && <Image src={product.image} alt={product.name} width={90} height={112} className="h-full w-full object-cover" />}
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold leading-tight text-charcoal">
                Complete Your Protocol — {DISCOUNT_PERCENT}% Off {product.name}
              </h2>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-charcoal/60">
            Pairs perfectly with what&apos;s in your cart. Add a {product.name} vial in the next 10 minutes and take{" "}
            {DISCOUNT_PERCENT}% off — applied automatically.
          </p>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-sm text-charcoal/40 line-through">{formatPrice(product.price)}</span>
            <span className="font-display text-2xl font-semibold text-charcoal">{formatPrice(discountedPrice)}</span>
            <span className="text-xs font-semibold text-copper">Save {formatPrice(savings)}</span>
          </div>

          <div className="mt-5 rounded-lg border border-stone bg-ivory-soft px-4 py-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal/50">Time Remaining</p>
            <p className={`mt-1 font-display text-2xl font-semibold ${expired ? "text-charcoal/40" : "text-charcoal"}`}>{formatTime(remaining)}</p>
          </div>

          <button
            type="button"
            onClick={claim}
            disabled={expired}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            {expired ? "Offer Expired" : `Add ${product.name.split(" ")[0]} & Save ${DISCOUNT_PERCENT}%`} <i className="ri-arrow-right-line" />
          </button>

          <button type="button" onClick={onContinue} className="mt-3 w-full text-center text-xs text-charcoal/40 transition hover:text-charcoal">
            No thanks, continue to checkout
          </button>

          <div className="mt-5 flex items-center justify-center gap-4 border-t border-stone pt-4 text-[10px] uppercase tracking-wide text-charcoal/40">
            <span className="flex items-center gap-1">
              <i className="ri-file-shield-2-line text-copper" /> COA on file
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-checkbox-circle-line text-copper" /> Third-party tested
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-truck-line text-copper" /> Ships from Canada
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
