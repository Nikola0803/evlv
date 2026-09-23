"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { saveAuth } from "@/lib/auth";
import { Logo } from "@/components/ui/Logo";

const SESSION_KEY = "evlv_research_access_v4";
const ACCESS_KEY = "evlv_research_access_v4";
const ACCESS_TTL_DAYS = 30;
const BYPASS_PARAM = "age_verified";

type Mode = "signin" | "register";

type AuthPayload = {
  token?: string;
  accessToken?: string;
  access_token?: string;
  email?: string;
  username?: string;
  name?: string;
  user_id?: string;
  id?: string;
  user?: AuthPayload;
  customer?: AuthPayload;
  data?: AuthPayload;
  error?: string;
  message?: string;
};

function rememberAccess(source: "account" | "deep-link") {
  const value = JSON.stringify({ ts: Date.now(), source });
  sessionStorage.setItem(SESSION_KEY, "1");
  localStorage.setItem(ACCESS_KEY, value);
}

function hasStoredAccess() {
  if (sessionStorage.getItem(SESSION_KEY) === "1") return true;
  try {
    const raw = localStorage.getItem(ACCESS_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw) as { ts?: number };
    return typeof ts === "number" && Date.now() - ts < ACCESS_TTL_DAYS * 864e5;
  } catch {
    return false;
  }
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
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const deepLinkVerified = url.searchParams.get(BYPASS_PARAM) === "1";
    let nextAccepted = false;

    if (deepLinkVerified) {
      rememberAccess("deep-link");
      url.searchParams.delete(BYPASS_PARAM);
      const query = url.searchParams.toString();
      window.history.replaceState({}, "", `${url.pathname}${query ? `?${query}` : ""}${url.hash}`);
      nextAccepted = true;
    } else {
      nextAccepted = hasStoredAccess();
    }
    queueMicrotask(() => {
      setAccepted(nextAccepted);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready || accepted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [ready, accepted, mode]);

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
    setPassword("");
    setConfirmPassword("");
  }

  async function request(path: string, body: Record<string, unknown>) {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await response.json().catch(() => ({}))) as AuthPayload;
    if (!response.ok) {
      throw new Error(data.error ?? data.message ?? "We could not complete that request. Please try again.");
    }
    return data;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!confirmed) {
      setError("Confirm that you are 21 or older and agree to the research-use restrictions.");
      return;
    }
    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }

    setSubmitting(true);
    try {
      let data = await request(
        mode === "signin" ? "/api/auth/login" : "/api/auth/register",
        mode === "signin" ? { email, password } : { email, password, name, marketingOptIn: true },
      );
      let session = getSession(data, email);

      if (mode === "register" && !session) {
        data = await request("/api/auth/login", { email, password });
        session = getSession(data, email);
      }
      if (!session) throw new Error("Your account response did not include a valid session. Please contact support.");

      saveAuth(session);
      rememberAccess("account");
      setAccepted(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {children}
      {ready && !accepted && (
        <div className="cp-ruo-gate" role="dialog" aria-modal="true" aria-labelledby="cp-ruo-title" aria-describedby="cp-ruo-description">
          <div className="cp-ruo-gate-card">
            <div className="cp-ruo-gate-media">
              <img src="/images/certified/evlv-hero-multi-vials.png" alt="EVLV premium research peptide vials and cartons" />
              <div className="cp-ruo-gate-media-overlay" />
              <div className="cp-ruo-gate-brand">
                <p>Verified research access</p>
                <Logo tone="ivory" />
                <span>Premium Research Peptides</span>
              </div>
              <div className="cp-ruo-gate-proof">
                <span><i className="ri-checkbox-circle-fill" /> Batch-level COAs</span>
                <span><i className="ri-checkbox-circle-fill" /> Third-party tested</span>
                <span><i className="ri-checkbox-circle-fill" /> Made in USA</span>
              </div>
            </div>

            <div className="cp-ruo-gate-content">
              <p className="cp-ruo-gate-kicker">Account verified access</p>
              <h2 id="cp-ruo-title">Research Access</h2>
              <p id="cp-ruo-description">
                Sign in or create an account to enter. EVLV products are strictly for legitimate laboratory and
                analytical research and are not for human or veterinary use.
              </p>

              <div className="cp-ruo-gate-tabs" role="tablist" aria-label="Research account access">
                <button type="button" role="tab" aria-selected={mode === "signin"} onClick={() => switchMode("signin")}>Sign In</button>
                <button type="button" role="tab" aria-selected={mode === "register"} onClick={() => switchMode("register")}>Create Account</button>
              </div>

              <form className="cp-ruo-gate-form" onSubmit={handleSubmit}>
                {mode === "register" && (
                  <label>
                    <span>Full Name</span>
                    <input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
                  </label>
                )}
                <label>
                  <span>Email Address</span>
                  <input ref={emailRef} required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
                </label>
                <label>
                  <span>Password</span>
                  <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
                </label>
                {mode === "register" && (
                  <label>
                    <span>Confirm Password</span>
                    <input required type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" />
                  </label>
                )}

                {mode === "register" && (
                  <label className="cp-ruo-gate-marketing">
                    <input type="checkbox" checked readOnly aria-readonly="true" />
                    <span>Email research updates, product notices, and EVLV offers are enabled for this account.</span>
                  </label>
                )}

                <label className="cp-ruo-gate-check">
                  <input type="checkbox" checked={confirmed} onChange={(event) => { setConfirmed(event.target.checked); setError(""); }} />
                  <span>I confirm I am at least 21 and agree to the research-use restrictions.</span>
                </label>

                {error && <p className="cp-ruo-gate-error"><i className="ri-error-warning-line" /> {error}</p>}

                <button className="cp-ruo-gate-submit" type="submit" disabled={submitting}>
                  {submitting ? "Please wait..." : mode === "signin" ? "Sign In and Enter" : "Create Account and Enter"}
                </button>
              </form>

              <small>Verified access is remembered for 30 days on this browser.</small>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
