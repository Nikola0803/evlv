"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { setStoredCouponCode } from "@/lib/referral";

type PromptMode = "newsletter" | "availability" | "checkout" | null;

const SHOWN_KEY = "evlv_conversion_prompt_shown_v1";
const AVAILABILITY_KEY = "evlv_glp_availability_shown_v1";
const CHECKOUT_OFFER_CODE = process.env.NEXT_PUBLIC_CHECKOUT_URGENCY_CODE?.trim() ?? "";
const GLP_PROMO_CODE = process.env.NEXT_PUBLIC_GLP_PROMO_CODE?.trim() ?? "";
const GLP_PROMO_LABEL = process.env.NEXT_PUBLIC_GLP_PROMO_LABEL?.trim() ?? "";
const CHECKOUT_OFFER_SECONDS = 120;

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
    setMode(null);

    const preview = new URLSearchParams(window.location.search).get("cro_preview");
    if (window.location.hostname === "localhost" && ["newsletter", "availability", "checkout"].includes(preview ?? "")) {
      setMode(preview as Exclude<PromptMode, null>);
      return;
    }

    if (pathname === "/checkout") {
      if (count === 0 || !CHECKOUT_OFFER_CODE || wasShown(SHOWN_KEY)) return;
      const revealOffer = () => {
        if (wasShown(SHOWN_KEY)) return;
        rememberShown(SHOWN_KEY);
        setOfferSeconds(CHECKOUT_OFFER_SECONDS);
        setMode("checkout");
      };
      const timer = window.setTimeout(() => {
        revealOffer();
      }, 120000);
      const exitIntent = (event: MouseEvent) => {
        if (event.clientY <= 8 && Date.now() - enteredAt.current >= 20000) revealOffer();
      };
      document.addEventListener("mouseleave", exitIntent);
      return () => {
        window.clearTimeout(timer);
        document.removeEventListener("mouseleave", exitIntent);
      };
    }

    const isCommercePage = pathname === "/" || pathname === "/shop" || pathname.startsWith("/shop/");
    let availabilityTimer = 0;
    if (isCommercePage && !wasShown(AVAILABILITY_KEY)) {
      availabilityTimer = window.setTimeout(() => {
        if (wasShown(SHOWN_KEY)) return;
        rememberShown(AVAILABILITY_KEY);
        rememberShown(SHOWN_KEY);
        setMode((current) => current ?? "availability");
      }, 35000);
    }

    function showExitOffer() {
      if (Date.now() - enteredAt.current < 20000 || wasShown(SHOWN_KEY)) return;
      rememberShown(SHOWN_KEY);
      setMode("newsletter");
    }

    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 8) showExitOffer();
    }

    let mobileTimer = 0;
    function handleScroll() {
      if (window.innerWidth > 760 || window.scrollY < document.documentElement.scrollHeight * 0.45) return;
      window.clearTimeout(mobileTimer);
      mobileTimer = window.setTimeout(showExitOffer, 70000);
      window.removeEventListener("scroll", handleScroll);
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(availabilityTimer);
      window.clearTimeout(mobileTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, count]);

  useEffect(() => {
    if (mode !== "checkout") return;
    if (offerSeconds <= 0) {
      setMode(null);
      return;
    }
    const timer = window.setTimeout(() => setOfferSeconds((seconds) => seconds - 1), 1000);
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
