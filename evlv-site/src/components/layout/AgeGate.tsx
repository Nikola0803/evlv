"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/pixel";
import { Logo } from "@/components/ui/Logo";
import { captureAttributionFromUrl, getStoredAttribution } from "@/lib/campaign-attribution";
import { getStoredUser } from "@/lib/auth";

const SESSION_KEY = "evlv_research_access_v7";
const ACCESS_KEY = "evlv_research_access_v7";
const ACCESS_TTL_DAYS = 30;
const CAMPAIGN_PARAM = "age_verified";
const CAMPAIGN_SESSION_KEY = "evlv_campaign_entry";

// These pages ARE the auth UI — no overlay on top of them
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

export function AgeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [campaignMode, setCampaignMode] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

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
      setReady(true);
    });
  }, [pathname]);

  useEffect(() => {
    if (!ready || accepted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!campaignMode) emailRef.current?.focus();
    return () => { document.body.style.overflow = previous; };
  }, [ready, accepted, campaignMode]);

  function stripCampaignParam() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(CAMPAIGN_PARAM)) return;
    url.searchParams.delete(CAMPAIGN_PARAM);
    const query = url.searchParams.toString();
    window.history.replaceState({}, "", `${url.pathname}${query ? `?${query}` : ""}${url.hash}`);
  }

  function completeAccess(source: "email" | "campaign") {
    rememberAccess(source);
    const attribution = getStoredAttribution();
    trackEvent("research_gate_accept", { gate_type: source, campaign: attribution?.campaign, source: attribution?.source });
    stripCampaignParam();
    setAccepted(true);
  }

  async function handleEmailEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      }).catch(() => undefined);
      completeAccess("email");
    } finally {
      setSubmitting(false);
    }
  }

  return <>
    {children}
    {ready && !accepted && (
      <div className="cp-ruo-gate cp-ruo-gate-simple" role="dialog" aria-modal="true" aria-labelledby="cp-ruo-title">
        <section className="cp-ruo-auth-card">
          <div className="cp-ruo-entry-brand"><Logo tone="charcoal" /></div>
          <p className="cp-ruo-entry-kicker"><i className="ri-shield-check-line" /> Research Use Access</p>

          {campaignMode ? (
            <>
              <h2 id="cp-ruo-title" className="cp-ruo-auth-heading">Confirm &amp; enter</h2>
              <p className="cp-ruo-auth-sub">EVLV products are supplied exclusively for laboratory and analytical research. No account required.</p>
              <div className="cp-ruo-entry-attestation">
                <strong>By entering, you confirm:</strong>
                <span>You are 21 or older and a qualified professional. Products are for in-vitro research only—not for human consumption, clinical, or veterinary use—and you accept the <Link href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link>.</span>
              </div>
              <button className="cp-ruo-entry-primary" type="button" onClick={() => completeAccess("campaign")}>I Confirm &amp; Enter</button>
              <p className="cp-ruo-entry-footnote">Your campaign link provides streamlined access. No email re-entry needed.</p>
            </>
          ) : (
            <>
              <h2 id="cp-ruo-title" className="cp-ruo-auth-heading">Enter EVLV</h2>
              <p className="cp-ruo-auth-sub">Enter your email for fast access to EVLV research products. No password required.</p>

              <form className="cp-ruo-auth-form" onSubmit={handleEmailEntry}>
                <label>
                  <span>Email address</span>
                  <input ref={emailRef} required type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <div className="cp-ruo-entry-attestation">
                  <strong>Research use confirmation:</strong>
                  <span>You are 21 or older and a qualified professional. Products are for in-vitro research only—not for human consumption, clinical, or veterinary use—and you accept the <Link href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link>.</span>
                </div>

                {error && <p className="cp-ruo-entry-error"><i className="ri-error-warning-line" /> {error}</p>}

                <button className="cp-ruo-entry-primary" type="submit" disabled={submitting}>
                  {submitting ? "Entering…" : "Continue to EVLV"}
                </button>
              </form>

              <p className="cp-ruo-entry-footnote">
                Already have an account? <Link className="cp-ruo-auth-switch" href="/login">Sign in</Link>
                {" · "}
                New to EVLV? <Link className="cp-ruo-auth-switch" href="/register">Create account</Link>
              </p>
            </>
          )}
        </section>
      </div>
    )}
  </>;
}
