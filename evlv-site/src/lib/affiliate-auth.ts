"use client";

/**
 * Affiliate portal session — separate from the regular customer session
 * (src/lib/auth.ts). An affiliate account is a distinct identity from a
 * shopper account (someone can be both, with two separate logins), so
 * this deliberately doesn't share storage keys or types with auth.ts.
 */
const TOKEN_KEY = "evlv_aff_token";
const USER_KEY = "evlv_aff_user";

export interface AffiliateUser {
  email: string;
  name: string;
  affiliate_id: string;
  referralCode: string;
}

export function getStoredAffiliateToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function getStoredAffiliateUser(): AffiliateUser | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) ?? "null");
  } catch {
    return null;
  }
}

export function saveAffiliateAuth(data: { token: string; email: string; name: string; affiliate_id: string; referralCode: string }) {
  try {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({ email: data.email, name: data.name, affiliate_id: data.affiliate_id, referralCode: data.referralCode })
    );
  } catch {
    /* ignore */
  }
}

export function clearAffiliateAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
