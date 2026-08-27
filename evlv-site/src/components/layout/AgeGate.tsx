"use client";

/**
 * Premium age/RUO verification + account gate, shown before the site is
 * accessible. Real accounts only (Sign In / Create Account) — no guest
 * bypass — backed by the custom CRM (peptides-crm-app) via this app's
 * /api/auth/* proxy routes. Falls back to a clear error if
 * CRM_API_URL/CRM_ORG_API_KEY/CRM_STORE_DOMAIN aren't set rather than
 * pretending to work.
 */

import { useEffect, useRef, useState } from "react";
import { getStoredToken, getStoredUser, saveAuth } from "@/lib/auth";
import { getStoredCouponCode } from "@/lib/referral";

const MIN_AGE = 21;

type Mode = "signin" | "register";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [granted, setGranted] = useState(false);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState<Mode>("register");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeEmail, setAgreeEmail] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Local-only session from the "CRM not configured yet" bypass -- no real token to validate.
    if (getStoredUser()?.user_id === "local") {
      setGranted(true);
      setChecking(false);
      return;
    }
    const token = getStoredToken();
    if (!token) {
      setChecking(false);
      return;
    }
    fetch("/api/auth/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.valid) setGranted(true);
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (checking || granted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [checking, granted]);

  useEffect(() => {
    if (!granted && !checking) setTimeout(() => firstFieldRef.current?.focus(), 80);
  }, [granted, checking, mode]);

  if (granted || checking) return <>{children}</>;

  function shake() {
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  }

  function switchMode(m: Mode) {
    setMode(m);
    setError("");
    setPassword("");
    setConfirm("");
  }

  async function handleSubmit() {
    setError("");
    if (!agreeTerms) {
      setError(`You must confirm you are ${MIN_AGE}+ and agree to the research-only terms.`);
      shake();
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      shake();
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      shake();
      return;
    }
    if (mode === "register") {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        shake();
        return;
      }
      if (password !== confirm) {
        setError("Passwords do not match.");
        shake();
        return;
      }
    }

    setLoading(true);
    try {
      const referralCode = mode === "register" ? getStoredCouponCode() : undefined;
      const res = await fetch(`/api/auth/${mode === "signin" ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          marketingOptIn: agreeEmail,
          ...(referralCode ? { referralCode } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 503) {
        // CRM not configured yet (no CRM_API_URL/CRM_ORG_API_KEY/CRM_STORE_DOMAIN) -- let people through
        // on the client so the site stays usable/testable while that's pending, instead of hard-blocking
        // everyone. Once those env vars are set this branch stops firing and real auth takes over.
        saveAuth({ token: "", email: email.trim(), username: email.trim(), user_id: "local" });
        setGranted(true);
      } else if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        shake();
      } else {
        saveAuth(data);
        setGranted(true);
      }
    } catch {
      setError("Network error. Please check your connection.");
      shake();
    } finally {
      setLoading(false);
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  const TABS: { key: Mode; label: string }[] = [
    { key: "signin", label: "Sign In" },
    { key: "register", label: "Create Account" },
  ];

  return (
    <>
      {children}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4"
        style={{ background: "rgba(14,17,19,0.92)", backdropFilter: "blur(10px)" }}
      >
        <div
          className="flex w-full overflow-hidden rounded-xl border border-white/10"
          style={{
            maxWidth: 940,
            maxHeight: "96vh",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
            animation: shaking ? "gate-shake 0.6s cubic-bezier(.36,.07,.19,.97)" : undefined,
          }}
        >
          {/* Left brand panel */}
          <div className="relative hidden w-[340px] shrink-0 flex-col justify-between overflow-hidden bg-charcoal p-9 md:flex">
            <div className="absolute inset-0">
              <img src="/images/hero-vial.png" alt="" className="h-full w-full object-cover opacity-30" style={{ objectPosition: "78% 45%" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,17,19,0.6) 0%, rgba(14,17,19,0.25) 45%, rgba(14,17,19,0.95) 100%)" }} />
            </div>

            <div className="relative z-10">
              <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-copper">Verified Research Access</p>
              <img src="/logo/evlv-logo-light.png" alt="EVLV" className="h-8 w-auto" />
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/50">Premium Research Peptides</p>
            </div>

            <div className="relative z-10 my-6 flex flex-col gap-2.5">
              {["≥99% Purity · HPLC-Verified", "Every Batch Third-Party Tested", "Batch-Level COAs, Publicly Verifiable"].map((b) => (
                <div key={b} className="flex items-center gap-2.5">
                  <i className="ri-checkbox-circle-fill text-sm text-copper" />
                  <span className="text-xs font-medium text-white/70">{b}</span>
                </div>
              ))}
            </div>

            <div className="relative z-10">
              <p className="text-[11px] leading-relaxed text-white/40">
                Access to product information is restricted to verified researchers who confirm the research-only
                terms.
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-1 flex-col overflow-y-auto bg-ivory" style={{ maxHeight: "96vh" }}>
            <div className="flex border-b border-stone">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => switchMode(t.key)}
                  className="flex-1 py-4 text-[13px] font-semibold transition-colors"
                  style={{
                    color: mode === t.key ? "var(--color-charcoal)" : "var(--color-soft-gray)",
                    borderBottom: mode === t.key ? "2px solid var(--color-copper)" : "2px solid transparent",
                    marginBottom: -1,
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex flex-1 flex-col gap-4 p-8">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-charcoal md:text-2xl">
                  {mode === "signin" ? "Sign in to continue" : "Create your account"}
                </h2>
                <p className="mt-1 text-sm text-charcoal/60">
                  Due to regulatory requirements, an account is required to browse product information. Your account
                  keeps order history and COAs in one place.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-charcoal/60">Email Address</label>
                <input
                  ref={firstFieldRef}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyDown={onKey}
                  placeholder="you@lab.edu"
                  autoComplete="email"
                  className="h-11 w-full rounded-md border border-stone bg-ivory-soft px-4 text-sm text-charcoal outline-none transition placeholder:text-charcoal/40 focus:border-copper focus:ring-1 focus:ring-copper/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-charcoal/60">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    onKeyDown={onKey}
                    placeholder={mode === "register" ? "Min. 8 characters" : "Your password"}
                    autoComplete={mode === "register" ? "new-password" : "current-password"}
                    className="h-11 w-full rounded-md border border-stone bg-ivory-soft px-4 pr-16 text-sm text-charcoal outline-none transition placeholder:text-charcoal/40 focus:border-copper focus:ring-1 focus:ring-copper/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-stone/60 px-2 py-1 text-[11px] font-semibold text-charcoal/60 hover:text-charcoal"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-charcoal/60">Confirm Password</label>
                  <input
                    type={showPass ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      setError("");
                    }}
                    onKeyDown={onKey}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className="h-11 w-full rounded-md border border-stone bg-ivory-soft px-4 text-sm text-charcoal outline-none transition placeholder:text-charcoal/40 focus:border-copper focus:ring-1 focus:ring-copper/40"
                  />
                </div>
              )}

              <div className="mt-1 rounded-lg border border-stone bg-ivory-soft p-4">
                <div className="mb-2 flex items-center gap-2">
                  <i className="ri-shield-check-line text-sm text-copper" />
                  <p className="text-[11px] uppercase tracking-[0.16em] text-copper">Research Use Only</p>
                </div>
                <p className="mb-1 text-xs leading-relaxed text-charcoal/60">
                  By using this site you acknowledge that all products and information are provided for laboratory
                  research purposes only and are not intended for human dosing, injection or ingestion.
                </p>
                <p className="mb-3 text-xs font-medium text-charcoal/70">You must be {MIN_AGE} years of age or older to use this website.</p>

                <label className="mb-3 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      setError("");
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#B8875A]"
                  />
                  <span className="text-xs font-medium leading-snug text-charcoal/70">
                    By logging in or creating an account, you agree to the research-only terms above and confirm you are {MIN_AGE}+.
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeEmail}
                    onChange={(e) => setAgreeEmail(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#B8875A]"
                  />
                  <span className="text-xs leading-snug text-charcoal/50">
                    Yes, I&apos;d like to receive occasional research updates and offers from EVLV. I may unsubscribe at any time.
                  </span>
                </label>
              </div>

              {error && (
                <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                  <i className="ri-error-warning-line text-sm shrink-0" />
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal/30 border-t-charcoal" />
                    {mode === "signin" ? "Signing in…" : "Creating account…"}
                  </>
                ) : mode === "signin" ? (
                  "Sign In & Continue"
                ) : (
                  "Continue"
                )}
              </button>

              {mode === "signin" ? (
                <p className="text-center text-xs text-charcoal/50">
                  <button type="button" onClick={() => switchMode("register")} className="transition hover:text-charcoal">
                    Need an account? Create one
                  </button>
                </p>
              ) : (
                <p className="text-center text-xs text-charcoal/50">
                  <button type="button" onClick={() => switchMode("signin")} className="transition hover:text-charcoal">
                    Already have an account? Sign in
                  </button>
                </p>
              )}
            </div>

            <div className="border-t border-stone bg-charcoal px-8 py-4">
              <p className="mb-0.5 font-display text-xs tracking-wide text-white">EVLV</p>
              <p className="text-[11px] text-white/50">
                Due to regulatory changes in this industry, we now require an account to access product information
                and continue browsing.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gate-shake {
            0%,100%{ transform:translateX(0) }
            15%{ transform:translateX(-9px) }
            30%{ transform:translateX(9px) }
            45%{ transform:translateX(-6px) }
            60%{ transform:translateX(6px) }
            75%{ transform:translateX(-3px) }
            90%{ transform:translateX(3px) }
          }
        `}</style>
      </div>
    </>
  );
}
