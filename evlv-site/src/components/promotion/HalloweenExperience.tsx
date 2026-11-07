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
      const previewTimer = window.setTimeout(() => setConfig({ live: true, themeActive: true, endsAt: "2026-11-05T04:59:59.000Z", freeShippingThresholdCents: 30000, headline: "Buy one, get one free", detail: "Buy any two, the cheaper one is free. No pair limit." }), 0);
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
          <aside className="hw-popup" role="dialog" aria-modal="true" aria-label="Black Friday BOGO offer">
            <div className="hw-popup-accent-bar" />
            <div className="hw-popup-inner">
              <button className="hw-popup-close" aria-label="Close offer" onClick={() => { setShowPopup(false); window.sessionStorage.setItem("evlv_halloween_seen", "1"); }}>×</button>
              <div className="hw-popup-eyebrow">Black Friday BOGO is live</div>
              <h3>Buy one.<br />Get one<br />free.</h3>
              <div className="hw-popup-grid" aria-label="2 items added, 1 item paid for">
                <div className="hw-popup-cell">
                  <div className="hw-popup-cell-num">2</div>
                  <div className="hw-popup-cell-label">You add</div>
                </div>
                <div className="hw-popup-cell">
                  <div className="hw-popup-cell-num">1</div>
                  <div className="hw-popup-cell-label">You pay for</div>
                </div>
              </div>
              <p className="hw-popup-copy">Add any 2 eligible products and the cheaper one is <b>$0 at checkout.</b> Every extra pair unlocks another free item. No code needed.</p>
              <div className="hw-popup-timer-label">Sale ends in</div>
              {timer}
              <Link href="/shop?utm_source=popup&utm_medium=site&utm_campaign=blackfriday_bogo_2026" className="hw-popup-cta" onClick={() => window.sessionStorage.setItem("evlv_halloween_seen", "1")}>
                <span>Shop the Black Friday BOGO</span>
                <span aria-hidden="true">→</span>
              </Link>
              <p className="hw-popup-fine">No code · No stacking · Free priority shipping over $300</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
