import "server-only";
import { crmConfigured, crmGet } from "@/lib/crm-proxy";

export interface DealOfTheDay {
  slug: string;
  name: string;
  imageUrl?: string;
  dealPriceCents: number;
  regularPriceCents: number;
  endsAt: string; // ISO, midnight UTC
}

export interface GiveawayStatus {
  enabled: boolean;
  prizeLabel?: string;
  minOrderCents?: number;
  rulesText?: string;
  entryCount?: number;
}

// Real data only -- both return a value that means "nothing configured"
// rather than ever inventing a deal or a prize. Short revalidate window
// (not the 60s default other CRM reads use) since staff expect a deal
// they just set in the CRM to show up on the site quickly.
export async function getDealOfTheDay(): Promise<DealOfTheDay | null> {
  if (!crmConfigured()) return null;
  const { ok, data } = await crmGet("/api/store/deal-of-the-day", { revalidate: 30 });
  if (!ok || !data) return null;
  return data as DealOfTheDay;
}

export async function getGiveawayStatus(): Promise<GiveawayStatus | null> {
  if (!crmConfigured()) return null;
  const { ok, data } = await crmGet("/api/store/giveaway", { revalidate: 30 });
  if (!ok || !data) return null;
  return data as GiveawayStatus;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDollars(cents: number): string {
  return (cents / 100).toFixed(2);
}

/**
 * Returns the raw markup for the Deal of the Day <a class="hero-row">
 * card as an HTML STRING (not a React component). This has to be a
 * string, not a component slotted in beside dangerouslySetInnerHTML
 * siblings, because the marker it replaces sits *inside* the scraped
 * `.hero-rows` CSS grid in landing-content.json -- splitting that grid's
 * markup across separate dangerouslySetInnerHTML divs would make the
 * browser's fragment parser auto-close the still-open <div class=
 * "hero-rows"> early, breaking the 2-column grid. Splicing this string
 * directly into data.html before it's ever split/rendered keeps the
 * grid's markup contiguous and intact.
 *
 * Returns "" (nothing rendered) when no deal is configured today --
 * same real-data-only rule as everything else on this page.
 */
export async function getDealRowHtml(): Promise<string> {
  const deal = await getDealOfTheDay();
  if (!deal) return "";

  const name = escapeHtml(deal.name);
  const dealPrice = formatDollars(deal.dealPriceCents);
  const regularPrice = formatDollars(deal.regularPriceCents);
  const img = deal.imageUrl
    ? `<img decoding="async" width="1022" height="2336" sizes="100vw" src="${escapeHtml(deal.imageUrl)}" alt="EVLV ${name} deal of the day" style="width: 65px; height: 83px; filter: drop-shadow(0 4px 6px rgba(20,39,26,.18))">`
    : "";

  return `<a href="/shop/${escapeHtml(deal.slug)}" class="hero-row">
        <h3>Deal of the Day<span class="hero-row-sub">${name} <span class="accent">$${dealPrice}</span><s>$${regularPrice}</s> &middot; today only</span></h3>
        ${img}
        <span class="chev" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></span>
      </a>`;
}

/**
 * Same reasoning as getDealRowHtml() -- an HTML string spliced into
 * data.html before splitting, not a component, to keep the .hero-rows
 * grid's markup contiguous. Links to a dedicated /giveaway page (entry
 * form + rules) rather than embedding the form here, so this stays a
 * simple, minimal-looking teaser card that matches the other rows.
 * Returns "" when no giveaway is enabled today.
 */
export async function getGiveawayRowHtml(): Promise<string> {
  const giveaway = await getGiveawayStatus();
  if (!giveaway || !giveaway.enabled) return "";

  const label = giveaway.prizeLabel ? `Win ${escapeHtml(giveaway.prizeLabel)}` : "Enter to Win";
  const count = typeof giveaway.entryCount === "number" ? ` &middot; ${giveaway.entryCount} entered today` : "";

  return `<a href="/giveaway" class="hero-row">
        <h3>${label}<span class="hero-row-sub">Free entry, no purchase necessary${count}</span></h3>
        <span class="chev" aria-hidden="true"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></span>
      </a>`;
}
