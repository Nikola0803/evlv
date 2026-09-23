"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";

const SESSION_KEY = "evlv_ruo_acknowledged_v2";
const ACCESS_KEY = "evlv_access_v2";
const ACCESS_TTL_DAYS = 30;
const BYPASS_PARAM = "age_verified";

function rememberAccess(source: "gate" | "deep-link") {
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

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const deepLinkVerified = url.searchParams.get(BYPASS_PARAM) === "1";

    if (deepLinkVerified) {
      rememberAccess("deep-link");
      url.searchParams.delete(BYPASS_PARAM);
      const query = url.searchParams.toString();
      window.history.replaceState({}, "", `${url.pathname}${query ? `?${query}` : ""}${url.hash}`);
      setAccepted(true);
    } else {
      setAccepted(hasStoredAccess());
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || accepted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [ready, accepted]);

  function enterSite() {
    if (!confirmed) {
      setError("Please confirm that you are 21 or older and understand the research-use restrictions.");
      return;
    }
    rememberAccess("gate");
    setAccepted(true);
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
              <p className="cp-ruo-gate-kicker">Access confirmation</p>
              <h2 id="cp-ruo-title">Research Purposes Only</h2>
              <p id="cp-ruo-description">
                EVLV products are supplied strictly for legitimate laboratory and analytical research. They are not
                intended to diagnose, prevent, treat, or cure any illness and are not for human or veterinary use.
              </p>

              <div className="cp-ruo-gate-notice">
                <i className="ri-shield-check-line" />
                <div>
                  <strong>21+ research access</strong>
                  <span>Confirm your eligibility and understanding before entering the catalog.</span>
                </div>
              </div>

              <label className="cp-ruo-gate-check">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => {
                    setConfirmed(event.target.checked);
                    setError("");
                  }}
                />
                <span>I confirm that I am at least 21 years old and agree to the research-use restrictions.</span>
              </label>

              {error && <p className="cp-ruo-gate-error"><i className="ri-error-warning-line" /> {error}</p>}

              <div className="cp-ruo-gate-actions">
                <button ref={buttonRef} type="button" onClick={enterSite}>Confirm and Enter Site</button>
                <a href="/account?age_verified=1">Already registered? Sign in</a>
              </div>

              <small>Access is remembered for 30 days on this browser.</small>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
