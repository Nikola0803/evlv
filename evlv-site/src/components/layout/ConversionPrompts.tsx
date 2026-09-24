"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { setStoredCouponCode } from "@/lib/referral";

type PromptMode = "newsletter" | "availability" | "cart" | "checkout" | null;

const NEWSLETTER_KEY = "evlv_newsletter_exit_shown_v2";
const AVAILABILITY_KEY = "evlv_glp_availability_shown_v2";
const CART_KEY = "evlv_cart_abandonment_shown_v2";
const CHECKOUT_KEY = "evlv_checkout_offer_shown_v2";
const CHECKOUT_OFFER_CODE = process.env.NEXT_PUBLIC_CHECKOUT_URGENCY_CODE?.trim() ?? "";
const GLP_PROMO_CODE = process.env.NEXT_PUBLIC_GLP_PROMO_CODE?.trim() ?? "";
const GLP_PROMO_LABEL = process.env.NEXT_PUBLIC_GLP_PROMO_LABEL?.trim() ?? "";
const CHECKOUT_OFFER_SECONDS = 120;
const EXIT_INTENT_DELAY = 10000;
const CART_IDLE_DELAY = 45000;

function wasShown(key: string) {
  try { return sessionStorage.getItem(key) === "1"; } catch { return false; }
}

function rememberShown(key: string) {
  try { sessionStorage.setItem(key, "1"); } catch { /* storage may be unavailable */ }
}

export function ConversionPrompts() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [mode, setMode] = useState<PromptMode>(null);
  const [email, setEmail] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [offerSeconds, setOfferSeconds] = useState(CHECKOUT_OFFER_SECONDS);
  const enteredAt = useRef(0);

  useEffect(() => {
    enteredAt.current = Date.now();

    const preview = new URLSearchParams(window.location.search).get("cro_preview");
    if (window.location.hostname === "localhost" && ["newsletter", "availability", "cart", "checkout"].includes(preview ?? "")) {
      const previewTimer = window.setTimeout(() => setMode(preview as Exclude<PromptMode, null>), 0);
      return () => window.clearTimeout(previewTimer);
    }
    const resetTimer = window.setTimeout(() => setMode(null), 0);

    const isCommercePage = pathname === "/" || pathname === "/shop" || pathname.startsWith("/shop/");
    const isCheckout = pathname === "/checkout";
    let pendingExit = false;

    function reveal(nextMode: Exclude<PromptMode, null>, key: string) {
      if (wasShown(key)) return;
      setMode((current) => {
        if (current) return current;
        rememberShown(key);
        if (nextMode === "checkout") setOfferSeconds(CHECKOUT_OFFER_SECONDS);
        return nextMode;
      });
    }

    function revealCartPrompt() {
      if (count === 0) return;
      if (isCheckout && CHECKOUT_OFFER_CODE) reveal("checkout", CHECKOUT_KEY);
      else reveal("cart", CART_KEY);
    }

    function revealExitPrompt() {
      if (Date.now() - enteredAt.current < EXIT_INTENT_DELAY) return;
      if (count > 0) revealCartPrompt();
      else reveal("newsletter", NEWSLETTER_KEY);
    }

    let availabilityTimer = 0;
    if (isCommercePage && count === 0 && !wasShown(AVAILABILITY_KEY)) {
      availabilityTimer = window.setTimeout(() => {
        reveal("availability", AVAILABILITY_KEY);
      }, 35000);
    }

    function handlePointerExit(event: MouseEvent | PointerEvent) {
      if (event.relatedTarget === null && event.clientY <= 12) revealExitPrompt();
    }

    let mobileTimer = 0;
    function handleScroll() {
      if (window.innerWidth > 760 || window.scrollY < document.documentElement.scrollHeight * 0.45) return;
      window.clearTimeout(mobileTimer);
      mobileTimer = window.setTimeout(() => count > 0 ? revealCartPrompt() : reveal("newsletter", NEWSLETTER_KEY), 30000);
      window.removeEventListener("scroll", handleScroll);
    }

    function markPendingExit() { pendingExit = true; }
    function handleReturn() {
      if (!pendingExit) return;
      pendingExit = false;
      revealExitPrompt();
    }
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") markPendingExit();
      else handleReturn();
    }

    const cartTimer = count > 0 ? window.setTimeout(revealCartPrompt, CART_IDLE_DELAY) : 0;
    document.addEventListener("mouseout", handlePointerExit);
    document.addEventListener("pointerout", handlePointerExit);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", markPendingExit);
    window.addEventListener("focus", handleReturn);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(availabilityTimer);
      window.clearTimeout(mobileTimer);
      window.clearTimeout(cartTimer);
      window.clearTimeout(resetTimer);
      document.removeEventListener("mouseout", handlePointerExit);
      document.removeEventListener("pointerout", handlePointerExit);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", markPendingExit);
      window.removeEventListener("focus", handleReturn);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, count]);

  useEffect(() => {
    if (mode !== "checkout") return;
    const timer = window.setTimeout(() => {
      if (offerSeconds <= 1) setMode(null);
      else setOfferSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [mode, offerSeconds]);

  function close() { setMode(null); }

  function applyCheckoutOffer() {
    if (!CHECKOUT_OFFER_CODE || offerSeconds <= 0) return;
    setStoredCouponCode(CHECKOUT_OFFER_CODE);
    window.dispatchEvent(new CustomEvent("evlv:coupon-applied", { detail: { code: CHECKOUT_OFFER_CODE } }));
    close();
  }

  function openGlpProducts() {
    if (GLP_PROMO_CODE) setStoredCouponCode(GLP_PROMO_CODE);
    close();
    router.push("/shop?category=peptides&q=GLP");
  }

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? "We could not create your code. Please try again.");
      const code = typeof data?.couponCode === "string" ? data.couponCode : "";
      if (!code) throw new Error("Your email was saved, but no checkout code was returned. Please contact support.");
      setStoredCouponCode(code);
      setCouponCode(code);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not create your code. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mode) return null;

  if (mode === "availability") {
    return (
      <aside className="cp-cro-toast" role="dialog" aria-label="GLP research series availability">
        <button type="button" className="cp-cro-close" onClick={close} aria-label="Dismiss"><i className="ri-close-line" /></button>
        <div className="cp-cro-availability-copy">
          <small>Current batch availability</small>
          <h2>GLP research series is in stock.</h2>
          <p>Review current lots, purity documentation, and available formats while this batch remains listed.</p>
          {GLP_PROMO_CODE && GLP_PROMO_LABEL && (
            <div className="cp-cro-promo"><b>{GLP_PROMO_LABEL}</b><span>Code {GLP_PROMO_CODE}</span></div>
          )}
          <button type="button" className="cp-cro-primary" onClick={openGlpProducts}>{GLP_PROMO_CODE ? "Apply Offer" : "View GLP Products"} <i className="ri-arrow-right-line" /></button>
        </div>
      </aside>
    );
  }

  return (
    <div className="cp-cro-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section className="cp-cro-modal" role="dialog" aria-modal="true" aria-labelledby="cp-cro-title">
        <button type="button" className="cp-cro-close" onClick={close} aria-label="Dismiss"><i className="ri-close-line" /></button>
        {mode === "checkout" ? (
          <>
            <small>Checkout-only offer</small>
            <div className="cp-cro-timer" aria-label={`${offerSeconds} seconds remaining`}>
              {String(Math.floor(offerSeconds / 60)).padStart(2, "0")}:{String(offerSeconds % 60).padStart(2, "0")}
            </div>
            <h2 id="cp-cro-title">Finish now and take an additional 5% off.</h2>
            <p>Apply the checkout offer before the timer ends, then complete your order when you are ready.</p>
            <div className="cp-cro-actions">
              <button type="button" className="cp-cro-primary" onClick={applyCheckoutOffer}>Apply 5% and Continue</button>
              <button type="button" className="cp-cro-secondary" onClick={close}>No thanks</button>
            </div>
            <em>Additional savings are subject to the 30% total order cap.</em>
          </>
        ) : mode === "cart" ? (
          <>
            <small>Your cart is saved</small>
            <h2 id="cp-cro-title">You still have research items in your cart.</h2>
            <p>Return to checkout when you are ready. Your selected products and quantities are waiting for you.</p>
            <div className="cp-cro-actions">
              <button type="button" className="cp-cro-primary" onClick={() => { close(); router.push("/checkout"); }}>Continue to Checkout</button>
              <button type="button" className="cp-cro-secondary" onClick={close}>Keep Browsing</button>
            </div>
          </>
        ) : couponCode ? (
          <>
            <small>Your research welcome offer</small>
            <h2 id="cp-cro-title">Your 10% code is ready.</h2>
            <p>The code has been saved and will be checked automatically at checkout.</p>
            <div className="cp-cro-code">{couponCode}</div>
            <button type="button" className="cp-cro-primary" onClick={() => { close(); router.push(count > 0 ? "/checkout" : "/shop"); }}>{count > 0 ? "Use at Checkout" : "Shop Research Products"}</button>
          </>
        ) : (
          <>
            <small>Before you go</small>
            <h2 id="cp-cro-title">Take 10% off your first research order.</h2>
            <p>Enter your email to receive a real checkout code plus occasional batch and product updates.</p>
            <form className="cp-cro-form" onSubmit={subscribe}>
              <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" aria-label="Email address" />
              <button className="cp-cro-primary" type="submit" disabled={submitting}>{submitting ? "Creating..." : "Get My Code"}</button>
            </form>
            {error && <p className="cp-cro-error">{error}</p>}
            <em>One offer per order. Discounts never exceed 30%.</em>
          </>
        )}
      </section>
    </div>
  );
}
