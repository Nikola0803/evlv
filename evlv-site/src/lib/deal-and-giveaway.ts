import { crmConfigured, crmGet } from "./crm-proxy";

export interface DealOfTheDay {
  slug: string;
  name: string;
  imageUrl?: string;
  dealPriceCents: number;
  regularPriceCents: number;
  endsAt: string; // ISO, midnight UTC
  /** Short research-use blurb shown on the richer deal card (2-3 sentences). */
  description?: string;
}

export interface GiveawayStatus {
  enabled: boolean;
  prizeLabel?: string;
  minOrderCents?: number;
  rulesText?: string;
  entryCount?: number;
}

// Real research-blurb copy for products that have appeared as Deal of
// the Day, keyed by slug -- purely cosmetic (the italic sentence under
// the price on the homepage card), so a slug with no entry here just
// renders without that line rather than breaking anything. The actual
// deal (which product, what price, what day) is 100% CRM-driven now --
// see getDealOfTheDay() below -- staff picks it from the product page's
// Deal of the Day card in the CRM, never edited here.
const DEAL_DESCRIPTIONS: Record<string, string> = {
  "bpc-157-10mg":
    "BPC-157 is a synthetic peptide fragment studied for its interactions with tissue-repair and angiogenesis pathways. Supplied at 99%+ HPLC-verified purity for in vitro and laboratory research only.",
};

const GIVEAWAY_STATUS: GiveawayStatus | null = {
  enabled: true,
  prizeLabel: "a $25 EVLV Store Credit",
  minOrderCents: 5000,
  // Legal note: most US states treat "pay to enter, chance, prize" as an
  // unlicensed lottery unless a free alternate method of entry (AMOE)
  // exists alongside the purchase-triggered one. The homepage teaser and
  // this page's headline both lead with the qualifying-order framing (to
  // match the competitor pattern this was modeled on), but the free,
  // no-purchase-necessary entry path below (GiveawayEntryForm, one entry
  // per email per day) stays live and is still spelled out in rulesText --
  // don't remove that path without checking sweepstakes law for every
  // state you ship to first.
  rulesText:
    "No purchase necessary to enter or win. One free entry per person per day via the entry form on this page. Placing a qualifying order of $50 or more today also earns one automatic entry -- purchasing does not increase your odds of winning beyond that one entry, and is not required to enter or win. Winner is selected at random from that day's entries. Void where prohibited.",
};

// Pulled live from the CRM's /api/store/deal-of-the-day -- staff sets the
// product + price + day from that product's Deal of the Day card in the
// CRM (peptides-crm-app's (app)/promotions page). dealPriceCents there is
// the SAME price checkout actually charges and the SAME price the live
// product feed (getLiveProducts()) reports, so this card, the shop page,
// and every homepage product card all agree with each other by
// construction -- there's only ever one number to set, in one place.
// Returns null (row hidden) whenever nothing's scheduled or the CRM
// isn't configured, same as before.
export async function getDealOfTheDay(): Promise<DealOfTheDay | null> {
  if (!crmConfigured()) return null;
  const { ok, data } = await crmGet("/api/store/deal-of-the-day", { revalidate: 60 });
  if (!ok || !data || typeof data.slug !== "string") return null;

  return {
    slug: data.slug,
    name: data.name,
    imageUrl: data.imageUrl,
    dealPriceCents: data.dealPriceCents,
    regularPriceCents: data.regularPriceCents,
    endsAt: data.endsAt,
    description: DEAL_DESCRIPTIONS[data.slug],
  };
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
  const percentOff = Math.round((1 - deal.dealPriceCents / deal.regularPriceCents) * 100);
  const img = deal.imageUrl
    ? `<img decoding="async" width="1022" height="2336" sizes="100vw" src="${escapeHtml(deal.imageUrl)}" alt="EVLV ${name} deal of the day">`
    : "";
  const desc = deal.description
    ? `<p class="deal-desc">${escapeHtml(deal.description)}</p>`
    : "";

  return `<a href="/shop/${escapeHtml(deal.slug)}" class="deal-card">
        <div class="deal-card-img">${img}<span class="deal-badge">${percentOff}% OFF</span></div>
        <div class="deal-card-body">
          <p class="deal-eyebrow">Today&rsquo;s Featured Deal</p>
          <h3>${name}</h3>
          <p class="deal-price-row"><span class="deal-price-now">$${dealPrice}</span><s class="deal-price-was">$${regularPrice}</s><span class="deal-percent">${percentOff}% OFF</span></p>
          ${desc}
          <p class="deal-countdown-row"><i class="ri-time-line" aria-hidden="true"></i> <span class="deal-countdown" data-ends-at="${escapeHtml(deal.endsAt)}">calculating&hellip;</span></p>
          <span class="deal-cta">Shop Today&rsquo;s Deal <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></span>
        </div>
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

  const minOrder = typeof giveaway.minOrderCents === "number" ? formatDollars(giveaway.minOrderCents) : null;
  const title = minOrder
    ? `Orders Over $${minOrder} Are Automatically Entered`
    : giveaway.prizeLabel
      ? `Win ${escapeHtml(giveaway.prizeLabel)}`
      : "Enter to Win";
  const sub = minOrder && giveaway.prizeLabel
    ? `Place a qualifying order today and you&rsquo;re automatically entered for ${escapeHtml(giveaway.prizeLabel)}.`
    : "Free entry, no purchase necessary.";
  const count =
    typeof giveaway.entryCount === "number"
      ? `<p class="deal-countdown-row"><i class="ri-group-line" aria-hidden="true"></i> ${giveaway.entryCount} entered today</p>`
      : "";

  return `<a href="/giveaway" class="giveaway-card">
        <div class="giveaway-icon"><i class="ri-gift-line" aria-hidden="true"></i></div>
        <div class="deal-card-body">
          <p class="deal-eyebrow">Today&rsquo;s Giveaway</p>
          <h3>${title}</h3>
          <p class="deal-desc">${sub}</p>
          ${count}
          <span class="deal-cta">View Drawing Page <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></span>
        </div>
      </a>`;
}
