"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/pixel";
import { Logo } from "@/components/ui/Logo";
import { captureAttributionFromUrl, getStoredAttribution } from "@/lib/campaign-attribution";
import { saveAuth, getStoredUser } from "@/lib/auth";
import { setStoredCouponCode } from "@/lib/referral";

const SESSION_KEY = "evlv_research_access_v7";
const ACCESS_KEY = "evlv_research_access_v7";
const ACCESS_TTL_DAYS = 30;
const CAMPAIGN_PARAM = "age_verified";
const CAMPAIGN_SESSION_KEY = "evlv_campaign_entry";

// These pages ARE the auth UI — no overlay on top of them
const GATE_BYPASS_PATHS = ["/login", "/register", "/account"];

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

type AuthMode = "signin" | "register";
type AuthPayload = {
  token?: string; accessToken?: string; access_token?: string;
  email?: string; username?: string; name?: string; user_id?: string; id?: string;
  user?: AuthPayload; customer?: AuthPayload; data?: AuthPayload;
  error?: string; message?: string; couponCode?: string;
};

function extractSession(data: AuthPayload, fallbackEmail: string) {
  const root = data.data ?? data;
  const user = root.user ?? root.customer ?? root;
  const token = root.token ?? root.accessToken ?? root.access_token;
  const email = user.email ?? root.email ?? fallbackEmail;
  const username = user.username ?? user.name ?? root.username ?? root.name ?? email.split("@")[0];
  const userId = user.user_id ?? user.id ?? root.user_id ?? root.id;
  return token && userId ? { token, email, username, user_id: userId } : null;
}

export function AgeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [campaignMode, setCampaignMode] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
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

  function switchMode(next: AuthMode) {
    setAuthMode(next);
    setError("");
  }

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setSubmitting(true);
    try {
      const path = authMode === "signin" ? "/api/auth/login" : "/api/auth/register";
      const body = authMode === "signin" ? { email, password } : { email, password, marketingOptIn };
      const resp = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      let data = await resp.json().catch(() => ({})) as AuthPayload;
      if (!resp.ok) throw new Error(data.error ?? data.message ?? "Could not complete that request. Please try again.");

      let session = extractSession(data, email);
      if (authMode === "register" && !session) {
        const loginResp = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
        data = await loginResp.json().catch(() => ({})) as AuthPayload;
        if (!loginResp.ok) throw new Error("Account created — sign in to continue.");
        session = extractSession(data, email);
      }
      if (!session) throw new Error("Could not read your session. Please try again.");

      saveAuth(session);
      if (authMode === "register" && typeof data.couponCode === "string") setStoredCouponCode(data.couponCode);
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
              <div className="cp-ruo-auth-tabs" role="tablist">
                <button role="tab" type="button" aria-selected={authMode === "register"} onClick={() => switchMode("register")} className={authMode === "register" ? "active" : ""}>Create Account</button>
                <button role="tab" type="button" aria-selected={authMode === "signin"} onClick={() => switchMode("signin")} className={authMode === "signin" ? "active" : ""}>Sign In</button>
              </div>

              <h2 id="cp-ruo-title" className="cp-ruo-auth-heading">
                {authMode === "register" ? "Open an EVLV account" : "Welcome back"}
              </h2>
              <p className="cp-ruo-auth-sub">
                {authMode === "register"
                  ? "Create a free account to enter the site and get 10% off your first order."
                  : "Sign in with your EVLV email and password to continue."}
              </p>

              <form className="cp-ruo-auth-form" onSubmit={handleAuth}>
                <label>
                  <span>Email address</span>
                  <input ref={emailRef} required type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="cp-ruo-password-field">
                  <span>Password</span>
                  <input required type={showPassword ? "text" : "password"} autoComplete={authMode === "signin" ? "current-password" : "new-password"} placeholder="8+ characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}>{showPassword ? "HIDE" : "SHOW"}</button>
                </label>

                {authMode === "register" && (
                  <label className="cp-ruo-entry-marketing">
                    <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} />
                    <span>Send me EVLV batch updates, new product notices, and occasional offers.</span>
                  </label>
                )}

                <div className="cp-ruo-entry-attestation">
                  <strong>Research use confirmation:</strong>
                  <span>You are 21 or older and a qualified professional. Products are for in-vitro research only—not for human consumption, clinical, or veterinary use—and you accept the <Link href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link>.</span>
                </div>

                {error && <p className="cp-ruo-entry-error"><i className="ri-error-warning-line" /> {error}</p>}

                <button className="cp-ruo-entry-primary" type="submit" disabled={submitting}>
                  {submitting ? "Please wait…" : authMode === "register" ? "Create Account & Enter" : "Sign In & Enter"}
                </button>
              </form>

              <p className="cp-ruo-entry-footnote">
                {authMode === "register" ? "Already have an account?" : "New to EVLV?"}{" "}
                <button type="button" className="cp-ruo-auth-switch" onClick={() => switchMode(authMode === "register" ? "signin" : "register")}>
                  {authMode === "register" ? "Sign in instead" : "Create one free"}
                </button>
              </p>
            </>
          )}
        </section>
      </div>
    )}
  </>;
}
