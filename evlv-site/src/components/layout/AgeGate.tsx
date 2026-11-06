"use client";

import type * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/pixel";
import { captureAttributionFromUrl, getStoredAttribution } from "@/lib/campaign-attribution";
import { getStoredUser } from "@/lib/auth";
import { AccountAccess } from "@/app/account/AccountAccess";

const SESSION_KEY = "evlv_research_access_v7";
const ACCESS_KEY = "evlv_research_access_v7";
const ACCESS_TTL_DAYS = 30;
const CAMPAIGN_PARAM = "age_verified";
const CAMPAIGN_SESSION_KEY = "evlv_campaign_entry";

const GATE_BYPASS_PATHS = ["/login", "/register", "/account", "/join25"];

function isEmailCampaignVisit(url: URL) {
  const sources = url.searchParams.getAll("utm_source").map((v) => v.toLowerCase());
  const mediums = url.searchParams.getAll("utm_medium").map((v) => v.toLowerCase());
  const knownEmailSource = sources.some((s) => s === "email" || s.includes("omnisend"));
  const knownEmailMedium = mediums.some((m) => m === "email" || m.includes("newsletter"));
  const hasOmnisendAttribution = [
    "omnisendContactID", "omnisendAttributionID", "omnisendScopeID", "omnisendCampaignID",
  ].some((p) => url.searchParams.has(p));
  return url.searchParams.get(CAMPAIGN_PARAM) === "1" || knownEmailSource || knownEmailMedium || hasOmnisendAttribution;
}

function rememberAccess(source: "email" | "campaign") {
  localStorage.setItem(ACCESS_KEY, JSON.stringify({ ts: Date.now(), source }));
  sessionStorage.setItem(SESSION_KEY, "1");
  if (source === "campaign") sessionStorage.setItem(CAMPAIGN_SESSION_KEY, "1");
}

function hasStoredAccess() {
  if (sessionStorage.getItem(SESSION_KEY) === "1") return true;
  try {
    const raw = localStorage.getItem(ACCESS_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw) as { ts?: number };
    return typeof ts === "number" && Date.now() - ts < ACCESS_TTL_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

export function AgeGate({ children, initialAccepted = false }: { children: React.ReactNode; initialAccepted?: boolean }) {
  const pathname = usePathname();
  const [accepted, setAccepted] = useState(initialAccepted);
  const [campaignMode, setCampaignMode] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const attribution = captureAttributionFromUrl(url);
    const isLocalPreview = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    const forcePreview = url.searchParams.get("gate_preview") === "1";
    const campaign = isEmailCampaignVisit(url);
    if (campaign) sessionStorage.setItem(CAMPAIGN_SESSION_KEY, "1");

    const isAuthPage = GATE_BYPASS_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
    const isLoggedIn = !!getStoredUser();
    if (isLoggedIn && !hasStoredAccess()) rememberAccess("email");

    const allowed = forcePreview ? false
      : isAuthPage ? true
      : isLoggedIn ? true
      : initialAccepted ? true
      : isLocalPreview && !campaign ? true
      : hasStoredAccess();

    if (!allowed) {
      trackEvent("research_gate_view", {
        gate_type: campaign ? "campaign" : "auth",
        campaign: attribution?.campaign,
        source: attribution?.source,
      });
    }
    queueMicrotask(() => {
      setCampaignMode(campaign);
      setAccepted(allowed);
    });
  }, [initialAccepted, pathname]);

  useEffect(() => {
    if (accepted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [accepted, campaignMode]);

  function stripCampaignParam() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(CAMPAIGN_PARAM)) return;
    url.searchParams.delete(CAMPAIGN_PARAM);
    const query = url.searchParams.toString();
    window.history.replaceState({}, "", `${url.pathname}${query ? `?${query}` : ""}${url.hash}`);
  }

  function completeAccess(source: "email" | "campaign") {
    rememberAccess(source);
    document.cookie = `evlv_research_access=1; Max-Age=${ACCESS_TTL_DAYS * 86_400}; Path=/; SameSite=Lax; Secure`;
    const attribution = getStoredAttribution();
    trackEvent("research_gate_accept", { gate_type: source, campaign: attribution?.campaign, source: attribution?.source });
    stripCampaignParam();
    setAccepted(true);
  }

  return <>
    {children}
    {!accepted && (
      campaignMode ? (
        <div className="cp-ruo-gate cp-ruo-gate-simple" role="dialog" aria-modal="true" aria-labelledby="cp-ruo-title">
          <section className="cp-ruo-auth-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/evlv-logo-dark.webp" alt="EVLV" style={{ height: "28px", width: "auto" }} />
            <p className="cp-ruo-entry-kicker"><i className="ri-shield-check-line" /> Research Use Access</p>
            <h2 id="cp-ruo-title" className="cp-ruo-auth-heading">Confirm &amp; enter</h2>
            <p className="cp-ruo-auth-sub">EVLV products are supplied exclusively for laboratory and analytical research. No account required.</p>
            <div className="cp-ruo-entry-attestation">
              <strong>By entering, you confirm:</strong>
              <span>You are 21 or older and a qualified professional. Products are for in-vitro research only—not for human consumption, clinical, or veterinary use—and you accept the <Link href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link>.</span>
            </div>
            <button className="cp-ruo-entry-primary" type="button" onClick={() => completeAccess("campaign")}>I Confirm &amp; Enter</button>
            <p className="cp-ruo-entry-footnote">Your campaign link provides streamlined access. No email re-entry needed.</p>
          </section>
        </div>
      ) : (
        <div className="cp-ruo-gate-auth-overlay" role="dialog" aria-modal="true">
          <AccountAccess
            initialMode="signin"
            onSuccess={() => completeAccess("email")}
          />
        </div>
      )
    )}
  </>;
}
