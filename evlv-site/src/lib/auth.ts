"use client";

/**
 * Storefront customer session, backed by the custom CRM (peptides-crm-app)
 * via this app's own /api/auth/* proxy routes (keeps the CRM's URL and API
 * key server-side, browser never talks to the CRM directly).
 */
const TOKEN_KEY = "evlv_auth_token";
const USER_KEY = "evlv_auth_user";

export interface AuthUser {
  email: string;
  username: string;
  user_id: string;
}

export function getStoredToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) ?? "null");
  } catch {
    return null;
  }
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
