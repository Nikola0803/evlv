"use client";

import type { FormEvent } from "react";
import type * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/pixel";
import { captureAttributionFromUrl, getStoredAttribution } from "@/lib/campaign-attribution";
import { getStoredUser, saveAuth } from "@/lib/auth";
import { setStoredCouponCode } from "@/lib/referral";

type GateMode = "signin" | "register";
type AuthApiResponse = { token?: string; accessToken?: string; access_token?: string; email?: string; user_id?: string; id?: string; user?: AuthApiResponse; customer?: AuthApiResponse; data?: AuthApiResponse; error?: string; message?: string; username?: string; name?: string; couponCode?: string };

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

function getSession(data: AuthApiResponse, fallbackEmail: string) {
  const root = data.data ?? data;
  const user = (root.user as AuthApiResponse | undefined) ?? (root.customer as AuthApiResponse | undefined) ?? root;
  const token = root.token ?? root.accessToken ?? root.access_token;
  const email = user.email ?? root.email ?? fallbackEmail;
  const username = user.username ?? user.name ?? root.username ?? root.name ?? email.split("@")[0];
  const userId = user.user_id ?? user.id ?? root.user_id ?? root.id;
  return token && userId ? { token, email, username, user_id: userId } : null;
}

export function AgeGate({ children, initialAccepted = false }: { children: React.ReactNode; initialAccepted?: boolean }) {
  const pathname = usePathname();
  const [accepted, setAccepted] = useState(initialAccepted);
  const [campaignMode, setCampaignMode] = useState(false);

  // shared form state
  const [mode, setGateMode] = useState<GateMode>("signin");
  const [gateEmail, setGateEmail] = useState("");
  const [gatePassword, setGatePassword] = useState("");
  const [gateConfirmPassword, setGateConfirmPassword] = useState("");
  const [gateFullName, setGateFullName] = useState("");
  const [gateDOB, setGateDOB] = useState("");
  const [gateCompany, setGateCompany] = useState("");
  const [gateBusinessType, setGateBusinessType] = useState("RESEARCHER");
  const [gatePhone, setGatePhone] = useState("");
  const [gateRuoAttested, setGateRuoAttested] = useState(false);
  const [gateMarketingOptIn, setGateMarketingOptIn] = useState(true);
  const [gateShowPassword, setGateShowPassword] = useState(false);
  const [gateError, setGateError] = useState("");
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  function switchMode(next: GateMode) { setGateMode(next); setGateError(""); }

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

  function startGoogleSignIn() {
    window.location.assign(`/api/auth/google/start?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}&gate=1`);
  }

  async function handleGateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGateError("");
    if (gatePassword.length < 8) { setGateError("Use at least 8 characters for your password."); return; }
    if (mode === "register" && gatePassword !== gateConfirmPassword) { setGateError("Passwords do not match."); return; }
    if (mode === "register" && !gateRuoAttested) { setGateError("Confirm the research-use acknowledgement to create an account."); return; }
    setGateSubmitting(true);
    try {
      const path = mode === "signin" ? "/api/auth/login" : "/api/auth/register";
      const body = mode === "signin"
        ? { email: gateEmail, password: gatePassword }
        : { email: gateEmail, password: gatePassword, name: gateFullName, dateOfBirth: gateDOB, company: gateCompany, businessType: gateBusinessType, phone: gatePhone, ruoAttested: gateRuoAttested, marketingOptIn: gateMarketingOptIn };
      const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      let data = (await res.json().catch(() => ({}))) as AuthApiResponse;
      if (!res.ok) throw new Error(data.error ?? data.message ?? (mode === "signin" ? "Sign in failed. Please try again." : "Registration failed. Please try again."));
      const registrationCouponCode = mode === "register" && typeof data.couponCode === "string" ? data.couponCode : undefined;
      let session = getSession(data, gateEmail);
      if (mode === "register" && !session) {
        const loginRes = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: gateEmail, password: gatePassword }) });
        data = (await loginRes.json().catch(() => ({}))) as AuthApiResponse;
        session = getSession(data, gateEmail);
      }
      if (!session) throw new Error("Could not complete sign-in. Please try again.");
      saveAuth(session);
      if (registrationCouponCode) setStoredCouponCode(registrationCouponCode);
      completeAccess("email");
    } catch (cause) {
      setGateError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setGateSubmitting(false);
    }
  }

  return <>
    {children}
    {!accepted && (
      <div className="cp-ruo-gate cp-ruo-gate-simple" role="dialog" aria-modal="true" aria-labelledby="cp-ruo-title">
        <section className="cp-ruo-auth-card" style={{ overflowY: "auto", maxHeight: "92dvh" }}>
          {/* Logo as plain img — no link, so navigation doesn't close the gate */}
          <div className="cp-ruo-entry-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/evlv-logo-dark.webp" alt="EVLV" style={{ height: "28px", width: "auto" }} />
          </div>
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
              {/* Tab switcher */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "12px", background: "#edf5f1", padding: "6px", marginTop: "8px", marginBottom: "16px" }}>
                <button type="button" onClick={() => switchMode("signin")} style={{ borderRadius: "8px", padding: "10px 4px", border: 0, fontSize: "12px", fontWeight: 700, cursor: "pointer", background: mode === "signin" ? "#0b3d37" : "transparent", color: mode === "signin" ? "#fff" : "#60746d", transition: "background 0.15s, color 0.15s" }}>Sign in</button>
                <button type="button" onClick={() => switchMode("register")} style={{ borderRadius: "8px", padding: "10px 4px", border: 0, fontSize: "12px", fontWeight: 700, cursor: "pointer", background: mode === "register" ? "#0b3d37" : "transparent", color: mode === "register" ? "#fff" : "#60746d", transition: "background 0.15s, color 0.15s" }}>Register</button>
              </div>

              <h2 id="cp-ruo-title" className="cp-ruo-auth-heading" style={{ marginTop: 0 }}>{mode === "signin" ? "Welcome back." : "Create your account."}</h2>
              <p className="cp-ruo-auth-sub">{mode === "signin" ? "Sign in to manage orders, documentation access, and account benefits." : "Create a free account and receive 10% off your first eligible order."}</p>

              {/* Google sign-in */}
              <button
                type="button"
                onClick={startGoogleSignIn}
                disabled={googleLoading || gateSubmitting}
                style={{ marginTop: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", minHeight: "44px", borderRadius: "12px", border: "1px solid #cbdcd5", background: "#fff", fontSize: "12px", fontWeight: 700, color: "#183c36", cursor: "pointer", transition: "border-color 0.15s, background 0.15s", opacity: (googleLoading || gateSubmitting) ? 0.6 : 1 }}
              >
                <span style={{ display: "grid", placeItems: "center", height: "20px", width: "20px", borderRadius: "50%", background: "#fff", fontWeight: 900, fontSize: "14px", color: "#4285f4" }} aria-hidden="true">G</span>
                {googleLoading ? "Finishing Google sign-in…" : "Continue with Google"}
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0 12px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".13em", color: "#9aa9a4" }}>
                <span style={{ flex: 1, height: "1px", background: "#e1ebe6" }} />use your email<span style={{ flex: 1, height: "1px", background: "#e1ebe6" }} />
              </div>

              <form onSubmit={handleGateSubmit} className="cp-ruo-gate-form">
                <label style={{ gridColumn: "1/-1" }}>
                  <span>Email address</span>
                  <input type="email" value={gateEmail} onChange={e => setGateEmail(e.target.value)} autoComplete="email" required placeholder="you@example.com" />
                </label>
                <label style={{ gridColumn: "1/-1", position: "relative" as const }}>
                  <span>Password</span>
                  <span style={{ position: "relative" as const, display: "block" }}>
                    <input type={gateShowPassword ? "text" : "password"} value={gatePassword} onChange={e => setGatePassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} required placeholder="••••••••" style={{ paddingRight: "44px" }} />
                    <button type="button" onClick={() => setGateShowPassword(v => !v)} aria-label={gateShowPassword ? "Hide password" : "Show password"} style={{ position: "absolute" as const, inset: "0 0 0 auto", width: "44px", display: "grid", placeItems: "center", background: "none", border: 0, color: "#789088", cursor: "pointer" }}><i className={gateShowPassword ? "ri-eye-off-line" : "ri-eye-line"} /></button>
                  </span>
                </label>

                {mode === "register" && <>
                  <label style={{ gridColumn: "1/-1" }}>
                    <span>Confirm password</span>
                    <input type={gateShowPassword ? "text" : "password"} value={gateConfirmPassword} onChange={e => setGateConfirmPassword(e.target.value)} autoComplete="new-password" required placeholder="••••••••" />
                  </label>
                  <label>
                    <span>Full name</span>
                    <input type="text" value={gateFullName} onChange={e => setGateFullName(e.target.value)} autoComplete="name" required placeholder="Jane Smith" />
                  </label>
                  <label>
                    <span>Date of birth</span>
                    <input type="date" value={gateDOB} onChange={e => setGateDOB(e.target.value)} autoComplete="bday" required />
                  </label>
                  <label style={{ gridColumn: "1/-1" }}>
                    <span>Company or institution <span style={{ fontWeight: 400, color: "#9aa9a4" }}>(optional)</span></span>
                    <input type="text" value={gateCompany} onChange={e => setGateCompany(e.target.value)} autoComplete="organization" placeholder="Lab / University / Clinic" />
                  </label>
                  <label style={{ gridColumn: "1/-1" }}>
                    <span>Business type</span>
                    <select value={gateBusinessType} onChange={e => setGateBusinessType(e.target.value)} style={{ height: "44px", width: "100%", borderRadius: "10px", border: "1px solid #cfddd7", background: "#fbfdfc", padding: "0 14px", fontSize: "14px", color: "#152522", outline: "none" }}>
                      <option value="RESEARCHER">Researcher</option>
                      <option value="CLINIC">Clinic</option>
                      <option value="UNIVERSITY">University</option>
                      <option value="DISTRIBUTOR">Distributor</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </label>
                  <label style={{ gridColumn: "1/-1" }}>
                    <span>Phone number <span style={{ fontWeight: 400, color: "#9aa9a4" }}>(optional)</span></span>
                    <input type="tel" value={gatePhone} onChange={e => setGatePhone(e.target.value)} autoComplete="tel" placeholder="+1 555 000 0000" />
                  </label>
                  <details style={{ gridColumn: "1/-1", borderRadius: "10px", border: "1px solid #d9e7e1", background: "#f8fbf9", fontSize: "11px", lineHeight: "1.6", color: "#5f746c" }}>
                    <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", fontWeight: 700, color: "#254a43", cursor: "pointer", listStyle: "none" }}>
                      Research-use terms and eligibility <i className="ri-add-line" />
                    </summary>
                    <div style={{ borderTop: "1px solid #d9e7e1", padding: "12px 14px 14px" }}>
                      <p>Products are supplied strictly for lawful in-vitro laboratory and analytical research. They are not for human or veterinary use, consumption, application, diagnosis, or treatment.</p>
                      <p style={{ marginTop: "8px" }}>By registering, you confirm that you are at least 21 years old and that any purchase will be used exclusively for lawful research purposes.</p>
                      <Link href="/terms" target="_blank" style={{ display: "inline-block", marginTop: "10px", fontWeight: 700, color: "#15584e", textDecoration: "underline" }}>View Terms &amp; Conditions</Link>
                    </div>
                  </details>
                  <label style={{ gridColumn: "1/-1", display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "11px", lineHeight: "1.6", color: "#385b53", cursor: "pointer" }}>
                    <input required type="checkbox" checked={gateRuoAttested} onChange={e => setGateRuoAttested(e.target.checked)} style={{ marginTop: "2px", width: "14px", height: "14px", accentColor: "#0b3d37", flexShrink: 0 }} />
                    I acknowledge I am accessing EVLV materials solely for lawful in-vitro research, have read and agree to the Terms of Service, and am authorized to handle them.
                  </label>
                  <label style={{ gridColumn: "1/-1", display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "11px", lineHeight: "1.6", color: "#60736c", cursor: "pointer" }}>
                    <input type="checkbox" checked={gateMarketingOptIn} onChange={e => setGateMarketingOptIn(e.target.checked)} style={{ marginTop: "2px", width: "14px", height: "14px", accentColor: "#0b3d37", flexShrink: 0 }} />
                    Send me product updates, new documentation notices, and occasional account offers.
                  </label>
                </>}

                {gateError && <p className="cp-ruo-gate-error" style={{ gridColumn: "1/-1" }}><i className="ri-error-warning-line" />{gateError}</p>}

                <button type="submit" disabled={gateSubmitting} className="cp-ruo-gate-submit" style={{ gridColumn: "1/-1" }}>
                  {gateSubmitting ? "Please wait…" : mode === "signin" ? "Sign In & Enter →" : "Create Account & Enter →"}
                </button>
              </form>

              <p style={{ marginTop: "11px", textAlign: "center", fontSize: "10px", color: "#7a8581" }}>
                {mode === "signin"
                  ? <><span>No account? </span><button type="button" onClick={() => switchMode("register")} style={{ background: "none", border: 0, color: "#327657", fontWeight: 700, cursor: "pointer", padding: 0 }}>Create one →</button><span style={{ margin: "0 6px", color: "#d6e0db" }}>·</span><Link href="/login" style={{ color: "#327657", fontWeight: 700 }}>Forgot password?</Link></>
                  : <><span>Already have an account? </span><button type="button" onClick={() => switchMode("signin")} style={{ background: "none", border: 0, color: "#327657", fontWeight: 700, cursor: "pointer", padding: 0 }}>Sign in →</button></>
                }
              </p>
            </>
          )}
        </section>
      </div>
    )}
  </>;
}
