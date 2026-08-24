"use client";

/**
 * Premium age/RUO verification + email-capture gate, shown before the site
 * is accessible. Inspired by a reference design's split-panel structure but
 * simplified: EVLV has no account/auth backend yet, so this is verify +
 * email only (no sign-in/register tabs). Consent + email are remembered in
 * localStorage for ACCESS_TTL_DAYS so returning visitors aren't re-gated.
 */

import { useEffect, useRef, useState } from "react";

const ACCESS_KEY = "evlv_access";
const ACCESS_TTL_DAYS = 30;
const MIN_AGE = 21;

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [granted, setGranted] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeEmail, setAgreeEmail] = useState(true);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ACCESS_KEY);
      if (raw) {
        const { ts } = JSON.parse(raw) as { ts: number };
        if (Date.now() - ts < ACCESS_TTL_DAYS * 864e5) {
          setGranted(true);
        }
      }
    } catch {
      /* ignore */
    }
    setChecking(false);
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
    if (!granted && !checking) setTimeout(() => emailRef.current?.focus(), 80);
  }, [granted, checking]);

  if (granted || checking) return <>{children}</>;

  function shake() {
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  }

  function handleSubmit() {
    setError("");
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      shake();
      return;
    }
    if (!agreeTerms) {
      setError(`You must confirm you are ${MIN_AGE}+ and agree to the research-only terms.`);
      shake();
      return;
    }

    try {
      localStorage.setItem(ACCESS_KEY, JSON.stringify({ ts: Date.now(), email, marketing: agreeEmail }));
    } catch {
      /* ignore */
    }
    // TODO: POST { email, marketing: agreeEmail } to an email provider (Klaviyo/Omnisend) once available —
    // same gap already flagged on the footer newsletter form.
    setGranted(true);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

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
            maxWidth: 900,
            maxHeight: "96vh",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
            animation: shaking ? "gate-shake 0.6s cubic-bezier(.36,.07,.19,.97)" : undefined,
          }}
        >
          {/* Left brand panel */}
          <div className="relative hidden w-[340px] shrink-0 flex-col justify-between overflow-hidden bg-charcoal p-9 md:flex">
            <div className="absolute inset-0">
              <img src="/images/hero-vial.png" alt="" className="h-full w-full object-cover opacity-30" style={{ objectPosition: "center 30%" }} />
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
            <div className="flex flex-1 flex-col gap-4 p-8">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-charcoal md:text-2xl">Confirm research access</h2>
                <p className="mt-1 text-sm text-charcoal/60">
                  You must be {MIN_AGE}+ and agree to our research-only terms to browse. Enter your email to unlock
                  10% off your first order.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-charcoal/60">Email Address</label>
                <input
                  ref={emailRef}
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
                  <span className="text-xs font-medium leading-snug text-charcoal/70">I confirm I am {MIN_AGE}+ and agree to the research-only terms.</span>
                </label>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeEmail}
                    onChange={(e) => setAgreeEmail(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#B8875A]"
                  />
                  <span className="text-xs leading-snug text-charcoal/50">
                    Send me my 10% off code, plus occasional research updates. I may unsubscribe at any time.
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
                className="mt-1 w-full rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light"
              >
                Enter Site
              </button>
            </div>

            <div className="border-t border-stone bg-charcoal px-8 py-4">
              <p className="mb-0.5 font-display text-xs tracking-wide text-white">EVLV</p>
              <p className="text-[11px] text-white/50">Evolve. Alter. Become your ultimate.</p>
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
