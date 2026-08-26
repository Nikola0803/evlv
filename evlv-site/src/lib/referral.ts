"use client";

// Affiliate referral capture: ?ref=CODE on any page gets remembered for 30
// days so an affiliate's link still attributes the sale even if the visitor
// browses around before buying. Feeds the couponCode field on checkout,
// which the CRM already matches against Affiliate.couponCode end-to-end
// (see order-engine.ts) -- the missing piece was ever collecting a code
// from the storefront in the first place.
const REF_KEY = "evlv_ref_code";
const REF_EXPIRES_KEY = "evlv_ref_expires";
const REF_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function captureReferralFromUrl() {
  if (typeof window === "undefined") return;
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (!ref) return;
  try {
    localStorage.setItem(REF_KEY, ref.trim().toUpperCase());
    localStorage.setItem(REF_EXPIRES_KEY, String(Date.now() + REF_TTL_MS));
  } catch {
    /* localStorage unavailable -- referral just won't be remembered */
  }
}

export function getStoredReferralCode(): string {
  if (typeof window === "undefined") return "";
  try {
    const expires = Number(localStorage.getItem(REF_EXPIRES_KEY) ?? 0);
    if (!expires || Date.now() > expires) return "";
    return localStorage.getItem(REF_KEY) ?? "";
  } catch {
    return "";
  }
}
