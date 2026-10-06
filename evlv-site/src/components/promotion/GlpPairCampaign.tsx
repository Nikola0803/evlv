"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { VerifiedPeptideReviewsBadge } from "@/components/trust/VerifiedPeptideReviewsBadge";

const STARTS_AT = Date.parse("2026-10-06T04:00:00.000Z");
const ENDS_AT = Date.parse("2026-10-13T04:00:00.000Z");

type CampaignPhase = "before" | "live" | "ended";

function getPreviewNow() {
  if (typeof window === "undefined") return null;
  const preview = new URL(window.location.href).searchParams.get("sale_preview");
  if (preview === "before") return STARTS_AT - 86_400_000;
  if (preview === "live") return STARTS_AT + 3_600_000;
  if (preview === "ended") return ENDS_AT + 3_600_000;
  return null;
}

function useCampaignClock() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const previewNow = getPreviewNow();
    const tick = () => setNow(previewNow ?? Date.now());
    tick();
    const timer = window.setInterval(tick, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const effectiveNow = now ?? STARTS_AT - 1;
  const phase: CampaignPhase = effectiveNow < STARTS_AT ? "before" : effectiveNow < ENDS_AT ? "live" : "ended";
  const target = phase === "before" ? STARTS_AT : ENDS_AT;
  return { phase, remaining: Math.max(0, target - effectiveNow), ready: now !== null };
}

function Countdown({ remaining, compact = false }: { remaining: number; compact?: boolean }) {
  const totalSeconds = Math.max(0, Math.floor(remaining / 1_000));
  const values = [
    [Math.floor(totalSeconds / 86_400), "Days"],
    [Math.floor((totalSeconds % 86_400) / 3_600), "Hours"],
    [Math.floor((totalSeconds % 3_600) / 60), "Min"],
    [totalSeconds % 60, "Sec"],
  ] as const;

  return (
    <div className={`cp-campaign-countdown${compact ? " cp-campaign-countdown-compact" : ""}`} aria-label="Campaign countdown">
      {values.map(([value, label]) => (
        <span key={label}><b>{String(value).padStart(2, "0")}</b><small>{label}</small></span>
      ))}
    </div>
  );
}

function StandardHero() {
  return (
    <section className="cp-hero cp-wrap">
      <div className="cp-hero-copy">
        <VerifiedPeptideReviewsBadge />
        <h1>Premium Peptides<br /><span>&amp; BioRegulators</span></h1>
        <p>EVLV is built for researchers who expect precise documentation, consistent quality, and premium presentation.</p>
        <Link className="cp-primary" href="/shop?category=peptides">Shop All Peptides</Link>
      </div>
      <div className="cp-hero-image" aria-label="EVLV premium peptide vials and matching cartons" />
    </section>
  );
}

export function GlpCampaignHomeHero() {
  const { phase, remaining, ready } = useCampaignClock();
  if (phase === "ended") return <StandardHero />;

  return (
    <section className="cp-hero cp-campaign-hero cp-wrap" data-campaign-phase={phase}>
      <div className="cp-hero-copy cp-campaign-hero-copy">
        <VerifiedPeptideReviewsBadge />
        <p className="cp-campaign-kicker">GLP Research Week · October 6–12</p>
        <h1>{phase === "before" ? "The Pair Event" : "The Pair Event Is Live"}</h1>
        <strong className="cp-campaign-offer">Second matching item <em>70% off</em></strong>
        <p className="cp-campaign-copy">Choose two of the same eligible GLP research product and strength. The second item is discounted automatically at checkout.</p>
        <div className="cp-campaign-timer-block">
          <span>{phase === "before" ? "Event opens in" : "Event ends in"}</span>
          <Countdown remaining={remaining} />
        </div>
        <Link className="cp-primary" href="/shop?focus=metabolic&utm_source=site&utm_medium=hero&utm_campaign=glp_pair_oct_6_12">
          {phase === "before" ? "Preview the GLP Series" : "Build Your Matching Pair"}
        </Link>
        <small className="cp-campaign-terms">Same eligible product and strength. One discounted pair per customer. Cannot be combined. $15 shipping below $300.</small>
      </div>
      <div className="cp-hero-image cp-campaign-hero-image" aria-label="EVLV GLP research series" />
      {!ready && <span className="sr-only">Loading campaign countdown</span>}
    </section>
  );
}

export function GlpCampaignShopCallout() {
  const { phase, remaining } = useCampaignClock();
  if (phase === "ended") return null;

  return (
    <div className="cp-shop-campaign" data-campaign-phase={phase}>
      <div>
        <small>{phase === "before" ? "Starts October 6" : "Now live · Ends October 12"}</small>
        <strong>Second matching GLP item <em>70% off</em></strong>
        <p>Same eligible product and strength. Discount applied automatically.</p>
      </div>
      <div>
        <span>{phase === "before" ? "Starts in" : "Ends in"}</span>
        <Countdown remaining={remaining} compact />
      </div>
    </div>
  );
}
