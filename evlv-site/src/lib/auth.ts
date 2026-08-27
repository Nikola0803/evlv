"use client";

/**
 * Storefront customer session, backed by the custom CRM (peptides-crm-app)
 * via this app's own /api/auth/* proxy routes (keeps the CRM's URL and API
 * key server-side, browser never talks to the CRM directly).
 */
const TOKEN_KEY = "evlv_auth_token";
const USER_KEY = "evlv_auth_user";

export type Plan = "standard" | "member";
export type ResearcherStatus = "NONE" | "PENDING" | "APPROVED";

export interface AuthUser {
  email: string;
  username: string;
  user_id: string;
  plan?: Plan;
  /**
   * Cached locally, refreshed by VerificationSync.tsx (a background check
   * on app load) and by /account's Verification tab. This is a compliance
   * gate for restricted product formats (nasal sprays, injector pens) --
   * unlike `plan`, it's never set client-side as a "preview," only ever
   * synced from what the CRM actually approved.
   */
  researcherStatus?: ResearcherStatus;
}

export function getStoredToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY) ?? "null");
    return user ? { ...user, plan: user.plan ?? "standard", researcherStatus: user.researcherStatus ?? "NONE" } : null;
  } catch {
    return null;
  }
}

/** Synced from the CRM (VerificationSync.tsx, or /account's Verification tab) — never set as a client-side preview. */
export function setResearcherStatus(status: ResearcherStatus) {
  const user = getStoredUser();
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify({ ...user, researcherStatus: status }));
}

/**
 * Sets the account's plan locally. There's no real billing wired up yet, so this
 * is an honest preview toggle (matches the checkout preview pattern), not a charge.
 */
export function setPlan(plan: Plan) {
  const user = getStoredUser();
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify({ ...user, plan }));
}

export function saveAuth(data: { token: string; email: string; username: string; user_id: string }) {
  try {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify({ email: data.email, username: data.username, user_id: data.user_id }));
  } catch {
    /* ignore */
  }
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/** Local display-name override, since the CRM record itself isn't editable from here yet. */
export function setDisplayName(name: string) {
  const user = getStoredUser();
  if (!user) return;
  const next = { ...user, username: name };
  localStorage.setItem(USER_KEY, JSON.stringify(next));
}
