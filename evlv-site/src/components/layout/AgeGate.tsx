"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth";

const ACCESS_KEY = "evlv_research_access_v7";
const SESSION_KEY = "evlv_research_session_v7";
const ACCESS_TTL_DAYS = 30;
const ACCESS_ROUTES = ["/account", "/login", "/register", "/join25"];

function isCampaignVisit(url: URL) {
  const sources = url.searchParams.getAll("utm_source").map((value) => value.toLowerCase());
  const mediums = url.searchParams.getAll("utm_medium").map((value) => value.toLowerCase());
  return url.searchParams.get("age_verified") === "1"
    || sources.some((value) => value === "email" || value.includes("omnisend"))
    || mediums.some((value) => value === "email" || value.includes("newsletter"))
    || ["omnisendContactID", "omnisendAttributionID", "omnisendScopeID", "omnisendCampaignID"].some((key) => url.searchParams.has(key));
}

function hasRememberedAccess() {
  if (sessionStorage.getItem(SESSION_KEY) === "1") return true;
  try {
    const value = localStorage.getItem(ACCESS_KEY);
    if (!value) return false;
    const parsed = JSON.parse(value) as { ts?: number };
    return typeof parsed.ts === "number" && Date.now() - parsed.ts < ACCESS_TTL_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

/** Sends first-time visitors to the full /account researcher-access page. */
export function AgeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const isAccessRoute = ACCESS_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
    if (isAccessRoute || isCampaignVisit(url) || getStoredUser() || hasRememberedAccess()) return;
    const returnTo = `${url.pathname}${url.search}${url.hash}`;
    router.replace(`/account?returnTo=${encodeURIComponent(returnTo)}`);
  }, [pathname, router]);

  return <>{children}</>;
}
