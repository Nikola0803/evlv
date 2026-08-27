"use client";

/**
 * Referral / promo code capture. This only stores and forwards a code —
 * the actual discount math (is it valid, how much off, has it expired)
 * has to be server-truth once the CRM implements the referral program
 * (see PROJECT.md's "Next steps"), not faked here. Doubles as generic
 * promo-code storage for the cart drawer's "Have a promo code?" field.
 */
const CODE_KEY = "evlv_coupon_code";

export function captureReferralFromUrl() {
  if (typeof window === "undefined") return;
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref && ref.trim()) {
    localStorage.setItem(CODE_KEY, ref.trim().toUpperCase());
  }
}

export function getStoredCouponCode(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(CODE_KEY) ?? "";
}

export function setStoredCouponCode(code: string) {
  if (typeof window === "undefined") return;
  if (code.trim()) localStorage.setItem(CODE_KEY, code.trim().toUpperCase());
  else localStorage.removeItem(CODE_KEY);
}

export function clearStoredCouponCode() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CODE_KEY);
}
