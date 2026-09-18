import data from "./landing-content.json";
import { getDealOfTheDay, getGiveawayStatus, getDealRowHtml, getGiveawayRowHtml } from "@/lib/deal-and-giveaway";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { PartnerReferralSection } from "@/components/home/PartnerReferralSection";
import { FaqHomeSection } from "@/components/home/FaqHomeSection";
import { HeroTileVideos } from "@/components/home/HeroTileVideos";
import { getGoogleRatingBadgeHtml } from "@/lib/google-rating-badge";
import { MOBILE_FIX_CSS } from "./landing-mobile-fix";
import { getProducts } from "@/lib/products";
import { getLiveProducts, mergeProducts } from "@/lib/product-feed";
import { applyLiveFeaturedPricing } from "@/lib/featured-products-pricing";

/**
 * Homepage content is a direct port of the approved
 * evlv-everlife-landing.html mockup's desktop ("ev-d") content tree --
 * same markup, same CSS, same real EVLV product/lab/asset images baked
 * into that file.
 *
 * The content was extracted from inside the source file's
 * `<ev-embed class="ev-d">` wrapper, but that wrapper element itself
 * -- and its `ev-d` class -- was left behind during extraction. Hundreds
 * of this stylesheet's rules are scoped as `.ev-d .labs`, `.ev-d .proof`,
 * `.ev-d .hero`, etc., so without that class on an ancestor, none of them
 * matched anything and almost every section rendered with only generic,
 * unstyled fallback styling (confirmed live in a browser: adding the
 * class to the wrapper div below is what made the hero photo, product
 * cards, lab-testing widgets, and reviews section all snap into their
 * real styling). The div below carries that class now so the whole tree
 * resolves the way the source file intends.
 *
 * `script` is the mockup's own `evlv-rendered-copy` text-swap script --
 * some copy in this file (e.g. the reviews/proof section) is only
 * correct after this script's find-and-replace map runs over the
 * rendered text, which is why that section looked wrong before it was
 * included. Trimmed from its original DOMContentLoaded+setInterval(750)
 * polling loop (needed on the original live scraped page, not here) down
 * to one immediate run plus two short retries.
 *
 * landing-content.json also carries a small CSS safety net so every
 * content block (`.block`, `.labs`, `.proof`, `.proc`, `.path`,
 * `.science`, `.faq`) shows the site's beige/ivory tone instead of
 * falling back to white when a section has no explicit background of
 * its own -- per the "no white sections" note.
 *
 * data.html carries three markers, each swapped out for a real,
 * design-token-driven React component rather than static scraped markup
 * (so these sections visually match the rest of the real-component
 * pages -- ambassadors, checkout, etc. -- not the scraped mockup's own
 * styling), plus a fourth marker (GOOGLE_RATING_SLOT, spliced in as a
 * string alongside DEAL_ROW_SLOT/GIVEAWAY_ROW_SLOT below rather than
 * split out as a sibling -- see google-rating-badge.ts for why):
 *  - "<!-- PROOF_SECTION_SLOT -->" -> <ReviewsSection />, real reviews
 *    pulled live via the site's Google Places integration (never
 *    fabricated placeholder testimonials).
 *  - "<!-- PARTNER_SECTION_SLOT -->" -> <PartnerReferralSection />, the
 *    ambassador/affiliate program's two-audience CTA (apply vs.
 *    already-approved), backed by the same real commission system as
 *    /ambassadors -- not a separate invented referral program.
 *  - "<!-- FAQ_SECTION_SLOT -->" -> <FaqHomeSection />, a searchable
 *    accordion built on the site's real FAQ data (lib/content.ts) --
 *    replaces the scraped mockup's static FAQ block, which duplicated
 *    outdated payment-method copy (Zelle/Cash App/Venmo) that lib/content
 *    has already moved past.
 *
 * The middle two hero-rows (previously static Ancillaries / Stacked
 * Research links) were replaced with "<!-- DEAL_ROW_SLOT -->" and
 * "<!-- GIVEAWAY_ROW_SLOT -->" markers. Unlike the three slots above,
 * these two are filled in with plain HTML STRINGS (getDealRowHtml() /
 * getGiveawayRowHtml()) spliced into data.html *before* it's split for
 * rendering -- not React components rendered as dangerouslySetInnerHTML
 * siblings. That's because these markers sit *inside* the scraped
 * `.hero-rows` CSS grid; splitting that grid's markup across separate
 * dangerouslySetInnerHTML divs (the way the other three splits work)
 * would make the browser's fragment parser auto-close the still-open
 * `.hero-rows` div early, breaking the 2-column grid layout. Splicing
 * strings in first keeps that grid's markup contiguous. Both helpers
 * return "" (nothing rendered, cards collapse away) when no deal/
 * giveaway is configured -- same real-data-only rule as the rest of the
 * page.
 */
export default async function Home() {
  const [deal, giveaway, liveProducts, googleRatingBadgeHtml] = await Promise.all([
    getDealOfTheDay(),
    getGiveawayStatus(),
    getLiveProducts(),
    getGoogleRatingBadgeHtml(),
  ]);
  // The two cards share a 2-column grid (.hero-rows) -- when only one of
  // them has anything to show (e.g. no Deal of the Day is scheduled in
  // the CRM's Promotions page today), the lone survivor needs to span
  // both columns instead of leaving a dead empty gap where the other
  // card used to be.
  const dealPresent = !!deal;
  const giveawayPresent = !!giveaway?.enabled;
  const solo = dealPresent !== giveawayPresent;
  const [dealRowHtml, giveawayRowHtml] = await Promise.all([
    getDealRowHtml({ solo }),
    getGiveawayRowHtml({ solo }),
  ]);
  // The FULL merged catalog, not getShopListProducts()'s deduped one --
  // the featured carousel below intentionally references specific dosage
  // variants (e.g. evlv-2-30mg, not the canonical evlv-2-10mg card the
  // shop grid dedupes to), so matching against the deduped list would
  // silently fail to find them and leave their old hardcoded price in
  // place. Every entry, canonical or not, still carries its own real
  // price and its own full `variants` list for the size pills.
  const allProducts = mergeProducts(getProducts(), liveProducts);

  const htmlWithRows = applyLiveFeaturedPricing(
    data.html
      .replace("<!-- DEAL_ROW_SLOT -->", dealRowHtml)
      .replace("<!-- GIVEAWAY_ROW_SLOT -->", giveawayRowHtml)
      .replace("<!-- GOOGLE_RATING_SLOT -->", googleRatingBadgeHtml),
    allProducts
  );

  const [beforeProof, afterProof] = htmlWithRows.split("<!-- PROOF_SECTION_SLOT -->");
  const [beforePartner, afterPartner] = afterProof.split("<!-- PARTNER_SECTION_SLOT -->");
  const [beforeFaq, afterFaq] = afterPartner.split("<!-- FAQ_SECTION_SLOT -->");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: data.css }} />
      <style dangerouslySetInnerHTML={{ __html: MOBILE_FIX_CSS }} />
      <div id="evlv-landing-content" className="ev-d">
        <div dangerouslySetInnerHTML={{ __html: beforeProof }} />
        <ReviewsSection />
        <div dangerouslySetInnerHTML={{ __html: beforePartner }} />
        <PartnerReferralSection />
        <div dangerouslySetInnerHTML={{ __html: beforeFaq }} />
        <FaqHomeSection />
        <div dangerouslySetInnerHTML={{ __html: afterFaq }} />
      </div>
      <script dangerouslySetInnerHTML={{ __html: data.script }} />
      <HeroTileVideos />
    </>
  );
}
