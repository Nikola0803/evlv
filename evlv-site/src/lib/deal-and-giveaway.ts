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

// Hardcoded, not CRM-driven -- there's no live CRM connection wired up for
// this storefront yet, so pulling these from an unconfigured CRM endpoint
// silently returned nothing and both rows on the homepage just vanished.
// Update the values below directly to change the featured deal or run a
// new giveaway; set DEAL_OF_THE_DAY / GIVEAWAY_STATUS to null to hide a
// row entirely (same as before, when nothing was configured).
const DEAL_OF_THE_DAY: DealOfTheDay | null = {
  slug: "bpc-157-10mg",
  name: "BPC-157 10MG",
  imageUrl: "/images/products/bpc-157-10mg.png",
  dealPriceCents: 5900,
  regularPriceCents: 7000,
  endsAt: new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString(),
};

const GIVEAWAY_STATUS: GiveawayStatus | null = {
  enabled: true,
  prizeLabel: "a $100 EVLV Store Credit",
  rulesText:
    "No purchase necessary to enter or win. One free entry per person per day via this page. Placing a qualifying order today also earns one automatic entry -- purchasing does not increase your odds of winning beyond that one entry. Winner is selected at random from that day's entries. Void where prohibited.",
};

export async function getDealOfTheDay(): Promise<DealOfTheDay | null> {
  return DEAL_OF_THE_DAY;
}

export async function getGiveawayStatus(): Promise<GiveawayStatus | null> {
  return GIVEAWAY_STATUS;
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
 * Returns "" (nothing rendered) when DEAL_OF_THE_DAY above is set to null.
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
 * Returns "" when GIVEAWAY_STATUS above is set to null or enabled: false.
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
