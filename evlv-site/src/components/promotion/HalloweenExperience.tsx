"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type HalloweenConfig = {
  live: boolean;
  themeActive: boolean;
  endsAt: string | null;
  freeShippingThresholdCents: number;
  headline: string;
  detail: string;
};

function Spider({ className }: { className: string }) {
  return <span className={className} aria-hidden="true">🕷</span>;
}

function useCountdown(end: string | null | undefined) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return useMemo(() => {
    const remaining = now > 0 ? Math.max(0, (end ? new Date(end).getTime() : now) - now) : 0;
    return {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining / 3600000) % 24),
      minutes: Math.floor((remaining / 60000) % 60),
      seconds: Math.floor((remaining / 1000) % 60),
    };
  }, [end, now]);
}

export function HalloweenExperience() {
  const [config, setConfig] = useState<HalloweenConfig | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const countdown = useCountdown(config?.endsAt);

  useEffect(() => {
    document.body.classList.remove("evlv-halloween");
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("halloween_preview") === "1") {
      const previewTimer = window.setTimeout(() => setConfig({ live: true, themeActive: true, endsAt: "2026-11-02T08:00:00.000Z", freeShippingThresholdCents: 30000, headline: "Buy one, get one free", detail: "Buy any two, the cheaper one is free. No pair limit." }), 0);
      return () => window.clearTimeout(previewTimer);
    }
    fetch("/api/promotions/active", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setConfig(data?.halloween ?? null))
      .catch(() => setConfig(null));
  }, []);

  useEffect(() => {
    const active = Boolean(config?.live && config.themeActive);
    if (!active || window.sessionStorage.getItem("evlv_halloween_seen")) return;
    const timer = window.setTimeout(() => setShowPopup(true), 3000);
    return () => window.clearTimeout(timer);
  }, [config]);

  if (!config?.live || !config.themeActive) return null;

  const timer = (
    <div className="hw-countdown" aria-label={`${countdown.days} days ${countdown.hours} hours ${countdown.minutes} minutes remaining`}>
      {Object.entries(countdown).map(([label, value]) => <span key={label}><b>{String(value).padStart(2, "0")}</b><small>{label}</small></span>)}
    </div>
  );

  return (
    <>
      {showPopup && (
        <div className="hw-popup-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setShowPopup(false);
            window.sessionStorage.setItem("evlv_halloween_seen", "1");
          }
        }}>
          <aside className="hw-popup" role="dialog" aria-modal="true" aria-label="Halloween BOGO offer">
            <button aria-label="Close Halloween offer" onClick={() => { setShowPopup(false); window.sessionStorage.setItem("evlv_halloween_seen", "1"); }}>×</button>
            <Spider className="hw-popup-spider" />
            <small>HALLOWEEN BOGO IS LIVE</small>
            <h3>Buy one. Get one free.</h3>
            <p>Add any 2 products and the cheaper one is free. Add 4 and the cheaper 2 are free. Every pair unlocks another free item.</p>
            <strong>Unlimited pairs · Applied automatically</strong>
            <div className="hw-popup-timer-label">EVENT ENDS IN</div>
            {timer}
            <Link href="/shop?utm_source=popup&utm_medium=site&utm_campaign=halloween_bogo_2026" onClick={() => window.sessionStorage.setItem("evlv_halloween_seen", "1")}>Shop the Halloween BOGO</Link>
            <em>No code. No stacking. Free priority shipping at $300.</em>
          </aside>
        </div>
      )}
    </>
  );
}
