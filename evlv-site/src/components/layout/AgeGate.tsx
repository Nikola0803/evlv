"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const SESSION_KEY = "evlv_research_access_v7";
const ACCESS_KEY = "evlv_research_access_v7";
const ACCESS_TTL_DAYS = 30;
const BYPASS_PARAM = "age_verified";

function rememberAccess(source: "acknowledgement" | "deep-link") {
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
  } catch {
    return false;
  }
}

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);

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
    } else {
      allowed = hasStoredAccess();
    }

    queueMicrotask(() => {
      setAccepted(allowed);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready || accepted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [ready, accepted]);

  function enterSite() {
    rememberAccess("acknowledgement");
    setAccepted(true);
  }

  return (
    <>
      {children}
      {ready && !accepted && (
        <div className="cp-ruo-gate" role="dialog" aria-modal="true" aria-labelledby="cp-ruo-title" aria-describedby="cp-ruo-description">
          <div className="cp-ruo-gate-card">
            <aside className="cp-ruo-gate-media">
              <img src="/images/certified/evlv-hero-multi-vials.png" alt="EVLV laboratory research products and cartons" />
              <div className="cp-ruo-gate-media-overlay" />
              <div className="cp-ruo-gate-brand">
                <p>Verified Research Access</p>
                <Logo tone="ivory" />
                <span>Premium Research Materials</span>
              </div>
              <div className="cp-ruo-gate-proof">
                <span><i className="ri-checkbox-circle-fill" /> Batch-specific purity documentation</span>
                <span><i className="ri-checkbox-circle-fill" /> Third-party analytical testing</span>
                <span><i className="ri-checkbox-circle-fill" /> Publicly available COAs</span>
              </div>
              <p className="cp-ruo-gate-restriction">Product information is intended exclusively for qualified laboratory researchers.</p>
            </aside>

            <section className="cp-ruo-gate-content">
              <div className="cp-ruo-gate-body">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Research access</p>
                <h2 id="cp-ruo-title">Research Use Only</h2>
                <p id="cp-ruo-description">
                  This catalog is for laboratory, analytical, and in-vitro research use by qualified personnel. Products are not for human or veterinary use.
                </p>
                <div className="cp-ruo-gate-compliance">
                  <strong><i className="ri-shield-check-line" /> Before entering, please confirm:</strong>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-charcoal/70">
                    <li className="flex gap-2"><i className="ri-check-line mt-0.5 text-copper" /> You are at least 21 years old.</li>
                    <li className="flex gap-2"><i className="ri-check-line mt-0.5 text-copper" /> You understand these materials are not for consumption, administration, diagnosis, or treatment.</li>
                    <li className="flex gap-2"><i className="ri-check-line mt-0.5 text-copper" /> You agree to the research-only restrictions and site terms.</li>
                  </ul>
                </div>
                <button className="cp-ruo-gate-submit" type="button" onClick={enterSite} autoFocus>
                  I Confirm — Enter Research Site
                </button>
                <p className="mt-4 text-center text-xs leading-relaxed text-charcoal/50">
                  By continuing, you agree to the <Link href="/ruo" className="text-copper hover:underline">Research Use Only Policy</Link> and <Link href="/terms" className="text-copper hover:underline">Terms &amp; Conditions</Link>.
                </p>
                <Link href="/account" className="cp-ruo-gate-switch">Already have an account? Sign in</Link>
              </div>
              <footer className="cp-ruo-gate-footer"><b>EVLV</b><span>No account or marketing subscription is required to browse.</span></footer>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
