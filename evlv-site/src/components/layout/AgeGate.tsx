"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/pixel";
import { Logo } from "@/components/ui/Logo";
import { captureAttributionFromUrl, getStoredAttribution } from "@/lib/campaign-attribution";

const SESSION_KEY = "evlv_research_access_v7";
const ACCESS_KEY = "evlv_research_access_v7";
const ACCESS_TTL_DAYS = 30;
const CAMPAIGN_PARAM = "age_verified";
const CAMPAIGN_SESSION_KEY = "evlv_campaign_entry";

function isEmailCampaignVisit(url: URL) {
  const sources = url.searchParams.getAll("utm_source").map((value) => value.toLowerCase());
  const mediums = url.searchParams.getAll("utm_medium").map((value) => value.toLowerCase());
  const knownEmailSource = sources.some((source) => source === "email" || source.includes("omnisend"));
  const knownEmailMedium = mediums.some((medium) => medium === "email" || medium.includes("newsletter"));
  const hasOmnisendAttribution = [
    "omnisendContactID",
    "omnisendAttributionID",
    "omnisendScopeID",
    "omnisendCampaignID",
  ].some((parameter) => url.searchParams.has(parameter));

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
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [campaignMode, setCampaignMode] = useState(false);
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const attribution = captureAttributionFromUrl(url);
    const isLocalPreview = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    const forcePreview = url.searchParams.get("gate_preview") === "1";
    // Existing Omnisend campaigns may already be in inboxes without the
    // explicit age_verified flag. Their UTM/Omnisend attribution is enough to
    // use the streamlined confirmation because the address was collected by
    // the email campaign before the visitor reached this page.
    const campaign = isEmailCampaignVisit(url);
    if (campaign) sessionStorage.setItem(CAMPAIGN_SESSION_KEY, "1");
    const allowed = forcePreview ? false : isLocalPreview && !campaign ? true : hasStoredAccess();
    if (!allowed) {
      trackEvent("research_gate_view", {
        gate_type: campaign ? "campaign" : "email",
        campaign: attribution?.campaign,
        source: attribution?.source,
      });
    }
    queueMicrotask(() => {
      setCampaignMode(campaign);
      setAccepted(allowed);
      setReady(true);
    });
  }, []);

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
    trackEvent("research_gate_accept", {
      gate_type: source,
      campaign: attribution?.campaign,
      source: attribution?.source,
    });
    stripCampaignParam();
    setAccepted(true);
  }

  async function handleEmailEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError("Enter a valid email address to continue.");
      return;
    }

    setSubmitting(true);
    try {
      if (marketingOptIn) {
        fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: normalizedEmail, source: "research-access-gate", marketingOptIn: true }),
        }).catch(() => {});
      }
      completeAccess("email");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return <>
    {children}
    {ready && !accepted && (
      <div className="cp-ruo-gate cp-ruo-gate-simple" role="dialog" aria-modal="true" aria-labelledby="cp-ruo-title" aria-describedby="cp-ruo-description">
        <section className={`cp-ruo-entry-card${campaignMode ? " cp-ruo-entry-card-campaign" : ""}`}>
          <div className="cp-ruo-entry-brand"><Logo tone="charcoal" /></div>
          <p className="cp-ruo-entry-kicker"><i className="ri-shield-check-line" /> Research Use Access</p>
          <h2 id="cp-ruo-title">Confirm &amp; enter</h2>
          <p id="cp-ruo-description">EVLV products are supplied exclusively for laboratory and analytical research. No account or password is required.</p>

          {campaignMode ? (
            <>
              <div className="cp-ruo-entry-attestation">
                <strong>By entering, you confirm:</strong>
                <span>You are 21 or older and a qualified professional. Products are for in-vitro research only—not for human consumption, clinical, or veterinary use—and you accept the <Link href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link>.</span>
              </div>
              <button className="cp-ruo-entry-primary" type="button" onClick={() => completeAccess("campaign")}>I Confirm &amp; Enter</button>
              <p className="cp-ruo-entry-footnote">Your campaign link provides streamlined access. No email re-entry or account setup.</p>
            </>
          ) : (
            <form className="cp-ruo-entry-form" onSubmit={handleEmailEntry}>
              <label>
                <span>Email address</span>
                <input ref={emailRef} required type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <div className="cp-ruo-entry-attestation">
                <strong>By entering, you confirm:</strong>
                <span>You are 21 or older and a qualified professional. Products are for in-vitro research only—not for human consumption, clinical, or veterinary use—and you accept the <Link href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link>.</span>
              </div>
              <label className="cp-ruo-entry-marketing">
                <input type="checkbox" checked={marketingOptIn} onChange={(event) => setMarketingOptIn(event.target.checked)} />
                <span>Email me batch updates, product notices, and occasional offers. Unsubscribe any time.</span>
              </label>
              {error && <p className="cp-ruo-entry-error"><i className="ri-error-warning-line" /> {error}</p>}
              <button className="cp-ruo-entry-primary" type="submit" disabled={submitting}>{submitting ? "Please wait..." : "I Confirm & Enter"}</button>
              <p className="cp-ruo-entry-footnote">One step only. This does not create an account.</p>
            </form>
          )}
        </section>
      </div>
    )}
  </>;
}
