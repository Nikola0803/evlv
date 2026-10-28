"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { VerifiedPeptideReviewsBadge } from "@/components/trust/VerifiedPeptideReviewsBadge";

const STARTS_AT = Date.parse("2026-10-13T04:00:00.000Z");
const ENDS_AT = Date.parse("2026-10-20T04:00:00.000Z");

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

  const effectiveNow = now ?? ENDS_AT + 1;
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
        <div className="cp-hero-actions">
          <Link className="cp-primary" href="/shop?category=peptides">Shop All Peptides</Link>
          <Link className="cp-hero-coas" href="/coas"><i className="ri-file-text-line" /> View COAs</Link>
        </div>
      </div>
      <div className="cp-hero-image" aria-label="EVLV premium peptide vials and matching cartons" />
    </section>
  );
}

export function ResearchSetCampaignHomeHero() {
  const { phase, remaining, ready } = useCampaignClock();
  if (phase === "ended") return <StandardHero />;

  return (
    <section className="cp-hero cp-campaign-hero cp-wrap" data-campaign-phase={phase}>
      <div className="cp-hero-copy cp-campaign-hero-copy">
        <VerifiedPeptideReviewsBadge />
        <p className="cp-campaign-kicker">Research Set Event · October 13–19</p>
        <h1>{phase === "before" ? "Build Your Research Set" : "Research Set Is Live"}</h1>
        <strong className="cp-campaign-offer">Choose 3, <em>save 30%</em></strong>
        <p className="cp-campaign-copy">Mix any eligible items from the research catalog. Automatic set pricing — no code needed. Discount applies at checkout.</p>
        <div className="cp-campaign-timer-block">
          <span>{phase === "before" ? "Event opens in" : "Event ends in"}</span>
          <Countdown remaining={remaining} />
        </div>
        <Link className="cp-primary" href="/shop?utm_source=site&utm_medium=hero&utm_campaign=research_set_oct_13_19">
          {phase === "before" ? "Browse the Catalog" : "Build Your Set"}
        </Link>
        <small className="cp-campaign-terms">Any 3 or more eligible catalog items. Automatic — no code required. Cannot be combined with other offers. $15 shipping below $300.</small>
      </div>
      <div className="cp-hero-image cp-campaign-hero-image" aria-label="EVLV research peptide collection" />
      {!ready && <span className="sr-only">Loading campaign countdown</span>}
    </section>
  );
}

export function ResearchSetCampaignShopCallout() {
  const { phase, remaining } = useCampaignClock();
  if (phase === "ended") return null;

  return (
    <div className="cp-shop-campaign" data-campaign-phase={phase}>
      <div>
        <small>{phase === "before" ? "Starts October 13" : "Now live · Ends October 19"}</small>
        <strong>Choose 3+ items, <em>save 30%</em></strong>
        <p>Mix any eligible catalog products. Discount applied automatically at checkout.</p>
      </div>
      <div>
        <span>{phase === "before" ? "Starts in" : "Ends in"}</span>
        <Countdown remaining={remaining} compact />
      </div>
    </div>
  );
}
