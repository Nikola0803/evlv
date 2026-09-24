"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { saveAuth } from "@/lib/auth";
import { Logo } from "@/components/ui/Logo";

const SESSION_KEY = "evlv_research_access_v6";
const ACCESS_KEY = "evlv_research_access_v6";
const ACCESS_TTL_DAYS = 30;
const BYPASS_PARAM = "age_verified";
type Mode = "signin" | "register";
type AuthPayload = { token?: string; accessToken?: string; access_token?: string; email?: string; username?: string; name?: string; user_id?: string; id?: string; user?: AuthPayload; customer?: AuthPayload; data?: AuthPayload; error?: string; message?: string };

function rememberAccess(source: "account" | "deep-link") {
  localStorage.setItem(ACCESS_KEY, JSON.stringify({ ts: Date.now(), source }));
  sessionStorage.setItem(SESSION_KEY, "1");
}
function hasStoredAccess() {
  if (sessionStorage.getItem(SESSION_KEY) === "1") return true;
  try {
    const raw = localStorage.getItem(ACCESS_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw) as { ts?: number };
    return typeof ts === "number" && Date.now() - ts < ACCESS_TTL_DAYS * 864e5;
  } catch { return false; }
}
function getSession(data: AuthPayload, fallbackEmail: string) {
  const root = data.data ?? data;
  const user = root.user ?? root.customer ?? root;
  const token = root.token ?? root.accessToken ?? root.access_token;
  const email = user.email ?? root.email ?? fallbackEmail;
  const username = user.username ?? user.name ?? root.username ?? root.name ?? email.split("@")[0];
  const userId = user.user_id ?? user.id ?? root.user_id ?? root.id;
  return token && userId ? { token, email, username, user_id: userId } : null;
}

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [mode, setMode] = useState<Mode>("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const isLocalPreview = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    const bypassed = url.searchParams.get(BYPASS_PARAM) === "1";
    let allowed = false;
    if (isLocalPreview) {
      allowed = true;
    } else if (bypassed) {
      rememberAccess("deep-link");
      url.searchParams.delete(BYPASS_PARAM);
      const query = url.searchParams.toString();
      window.history.replaceState({}, "", `${url.pathname}${query ? `?${query}` : ""}${url.hash}`);
      allowed = true;
    } else allowed = hasStoredAccess();
    queueMicrotask(() => { setAccepted(allowed); setReady(true); });
  }, []);

  useEffect(() => {
    if (!ready || accepted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailRef.current?.focus();
    return () => { document.body.style.overflow = previous; };
  }, [ready, accepted, mode]);

  function switchMode(next: Mode) {
    setMode(next); setError(""); setPassword(""); setConfirmPassword(""); setShowPassword(false);
  }
  async function request(path: string, body: Record<string, unknown>) {
    const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = (await response.json().catch(() => ({}))) as AuthPayload;
    if (!response.ok) throw new Error(data.error ?? data.message ?? "We could not complete that request. Please try again.");
    return data;
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!confirmed) return setError("Confirm that you are 21 or older and agree to the research-only terms.");
    if (mode === "register" && password !== confirmPassword) return setError("Passwords do not match.");
    if (password.length < 8) return setError("Use at least 8 characters for your password.");
    setSubmitting(true);
    try {
      let data = await request(mode === "signin" ? "/api/auth/login" : "/api/auth/register", mode === "signin" ? { email, password } : { email, password, marketingOptIn: true });
      let session = getSession(data, email);
      if (mode === "register" && !session) { data = await request("/api/auth/login", { email, password }); session = getSession(data, email); }
      if (!session) throw new Error("Your account response did not include a valid session. Please contact support.");
      void fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => undefined);
      saveAuth(session); rememberAccess("account"); setAccepted(true);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  }

  return <>
    {children}
    {ready && !accepted && <div className="cp-ruo-gate" role="dialog" aria-modal="true" aria-labelledby="cp-ruo-title" aria-describedby="cp-ruo-description">
      <div className="cp-ruo-gate-card">
        <aside className="cp-ruo-gate-media">
          <img src="/images/certified/evlv-hero-multi-vials.png" alt="EVLV premium research peptide vials and cartons" />
          <div className="cp-ruo-gate-media-overlay" />
          <div className="cp-ruo-gate-brand"><p>Verified Research Access</p><Logo tone="ivory" /><span>Premium Research Peptides</span></div>
          <div className="cp-ruo-gate-proof">
            <span><i className="ri-checkbox-circle-fill" /> ≥99% Purity · HPLC-Verified</span>
            <span><i className="ri-checkbox-circle-fill" /> Every Batch Third-Party Tested</span>
            <span><i className="ri-checkbox-circle-fill" /> Batch-Level COAs, Publicly Verifiable</span>
          </div>
          <p className="cp-ruo-gate-restriction">Access to product information is restricted to verified researchers who confirm the research-only terms.</p>
        </aside>

        <section className="cp-ruo-gate-content">
          <div className="cp-ruo-gate-tabs" role="tablist" aria-label="Research account access">
            <button type="button" role="tab" aria-selected={mode === "signin"} onClick={() => switchMode("signin")}>Sign In</button>
            <button type="button" role="tab" aria-selected={mode === "register"} onClick={() => switchMode("register")}>Create Account</button>
          </div>
          <div className="cp-ruo-gate-body">
            <h2 id="cp-ruo-title">{mode === "register" ? "Create your account" : "Welcome back"}</h2>
            <p id="cp-ruo-description">{mode === "register" ? "Due to regulatory requirements, an account is required to browse product information. Your account keeps order history and COAs in one place." : "Sign in to access product information, order history, and batch-level COAs."}</p>
            <form className="cp-ruo-gate-form" onSubmit={handleSubmit}>
              <label><span>Email Address</span><input ref={emailRef} required type="email" placeholder="you@lab.edu" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label>
              <label><span>Password</span><span className="cp-ruo-password-field"><input required minLength={8} type={showPassword ? "text" : "password"} placeholder={mode === "register" ? "Min. 8 characters" : "Enter your password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} /><button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button></span></label>
              {mode === "register" && <label><span>Confirm Password</span><input required minLength={8} type={showPassword ? "text" : "password"} placeholder="Repeat your password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" /></label>}
              <div className="cp-ruo-gate-compliance">
                <strong><i className="ri-shield-check-line" /> Research Use Only</strong>
                <label className="cp-ruo-gate-check">
                  <input type="checkbox" checked={confirmed} onChange={(event) => { setConfirmed(event.target.checked); setError(""); }} />
                  <span>I confirm my information is accurate, I am 21+ and a qualified professional. Products are for in-vitro laboratory research only, not for human consumption or clinical use. Misuse is a material breach and may terminate my account. I agree to indemnify EVLV and accept the <a href="/terms" target="_blank" rel="noreferrer">Full Terms &amp; Conditions</a>.</span>
                </label>
                <label className="cp-ruo-gate-marketing">
                  <input type="checkbox" checked readOnly aria-readonly="true" />
                  <span>Yes, I agree to receive emails from EVLV. I may unsubscribe at any time.</span>
                </label>
              </div>
              {error && <p className="cp-ruo-gate-error"><i className="ri-error-warning-line" /> {error}</p>}
              <button className="cp-ruo-gate-submit" type="submit" disabled={submitting}>{submitting ? "Please wait..." : "Continue"}</button>
            </form>
            <button className="cp-ruo-gate-switch" type="button" onClick={() => switchMode(mode === "register" ? "signin" : "register")}>{mode === "register" ? "Already have an account? Sign in" : "Need an account? Create account"}</button>
          </div>
          <footer className="cp-ruo-gate-footer"><b>EVLV</b><span>Due to regulatory changes in this industry, we now require an account to access product information and continue browsing.</span></footer>
        </section>
      </div>
    </div>}
  </>;
}
