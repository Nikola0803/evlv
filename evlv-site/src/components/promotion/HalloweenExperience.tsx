"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return useMemo(() => {
    const remaining = Math.max(0, (end ? new Date(end).getTime() : now) - now);
    return {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining / 3600000) % 24),
      minutes: Math.floor((remaining / 60000) % 60),
      seconds: Math.floor((remaining / 1000) % 60),
    };
  }, [end, now]);
}

export function HalloweenExperience() {
  const pathname = usePathname();
  const [config, setConfig] = useState<HalloweenConfig | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const countdown = useCountdown(config?.endsAt);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("halloween_preview") === "1") {
      setConfig({ live: true, themeActive: true, endsAt: "2026-11-01T06:00:00.000Z", freeShippingThresholdCents: 30000, headline: "Buy one, get one free", detail: "Every second matching product and strength is free. No pair limit." });
      return;
    }
    fetch("/api/promotions/active", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setConfig(data?.halloween ?? null))
      .catch(() => setConfig(null));
  }, []);

  useEffect(() => {
    const active = Boolean(config?.live && config.themeActive);
    document.body.classList.toggle("evlv-halloween", active);
    if (!active || window.sessionStorage.getItem("evlv_halloween_seen")) return;
    const timer = window.setTimeout(() => setShowPopup(true), 2200);
    return () => window.clearTimeout(timer);
  }, [config]);

  if (!config?.live || !config.themeActive) return null;
  const isHome = pathname === "/";
  const isShop = pathname === "/shop" || pathname.startsWith("/shop/");
  if (!isHome && !isShop && !showPopup) return null;

  const timer = (
    <div className="hw-countdown" aria-label={`${countdown.days} days ${countdown.hours} hours ${countdown.minutes} minutes remaining`}>
      {Object.entries(countdown).map(([label, value]) => <span key={label}><b>{String(value).padStart(2, "0")}</b><small>{label}</small></span>)}
    </div>
  );

  return (
    <>
      {(isHome || isShop) && (
        <section className={isHome ? "hw-hero" : "hw-shop-banner"} aria-label="Halloween sale">
          <div className="hw-web hw-web-left" /><div className="hw-web hw-web-right" />
          <Spider className="hw-spider hw-spider-one" /><Spider className="hw-spider hw-spider-two" />
          <div className="hw-promo-inner">
            <div className="hw-copy">
              <p>EVLV HALLOWEEN EVENT</p>
              <h2>BUY 1, <span>GET 1 FREE</span></h2>
              <h3>Unlimited matching pairs</h3>
              <p className="hw-detail">Add 2, pay for 1. Add 4, pay for 2. Add 6, pay for 3. Match the same product and strength. Applied automatically.</p>
              <div className="hw-actions"><Link href="/shop?utm_source=site&utm_medium=halloween&utm_campaign=halloween_bogo_2026">Shop Halloween BOGO</Link><span>Free priority shipping at $300</span></div>
            </div>
            <div className="hw-timer-wrap"><small>THE PORTAL CLOSES IN</small>{timer}<p>No code. No stacking. No pair limit.</p></div>
          </div>
        </section>
      )}
      {showPopup && (
        <aside className="hw-popup" role="dialog" aria-label="Halloween BOGO offer">
          <button aria-label="Close Halloween offer" onClick={() => { setShowPopup(false); window.sessionStorage.setItem("evlv_halloween_seen", "1"); }}>×</button>
          <Spider className="hw-popup-spider" />
          <small>HALLOWEEN BOGO IS LIVE</small>
          <h3>Buy one. Get one free.</h3>
          <p>Every matching pair unlocks another free item. No pair limit.</p>
          {timer}
          <Link href="/shop?utm_source=popup&utm_medium=site&utm_campaign=halloween_bogo_2026" onClick={() => window.sessionStorage.setItem("evlv_halloween_seen", "1")}>Build your pairs</Link>
        </aside>
      )}
    </>
  );
}
