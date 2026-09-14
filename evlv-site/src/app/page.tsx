import data from "./landing-content.json";
import { getDealRowHtml, getGiveawayRowHtml } from "@/lib/deal-and-giveaway";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { PartnerReferralSection } from "@/components/home/PartnerReferralSection";

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
 * data.html carries two markers, each swapped out for a real React
 * component rather than static scraped markup:
 *  - "<!-- PROOF_SECTION_SLOT -->" -> <ReviewsSection />, real reviews
 *    pulled live via the site's Google Places integration (never
 *    fabricated placeholder testimonials).
 *  - "<!-- PARTNER_SECTION_SLOT -->" -> <PartnerReferralSection />, the
 *    ambassador/affiliate program's two-audience CTA (apply vs.
 *    already-approved), backed by the same real commission system as
 *    /ambassadors -- not a separate invented referral program.
 *
 * The middle two hero-rows (previously static Ancillaries / Stacked
 * Research links) were replaced with "<!-- DEAL_ROW_SLOT -->" and
 * "<!-- GIVEAWAY_ROW_SLOT -->" markers. Unlike the two slots above, these
 * two are filled in with plain HTML STRINGS (getDealRowHtml() /
 * getGiveawayRowHtml()) spliced into data.html *before* it's split for
 * rendering -- not React components rendered as dangerouslySetInnerHTML
 * siblings. That's because these markers sit *inside* the scraped
 * `.hero-rows` CSS grid; splitting that grid's markup across separate
 * dangerouslySetInnerHTML divs (the way the proof-section split works)
 * would make the browser's fragment parser auto-close the still-open
 * `.hero-rows` div early, breaking the 2-column grid layout. Splicing
 * strings in first keeps that grid's markup contiguous. Both helpers
 * return "" (nothing rendered, cards collapse away) when no deal/
 * giveaway is configured -- same real-data-only rule as the rest of the
 * page.
 */
export default async function Home() {
  const [dealRowHtml, giveawayRowHtml] = await Promise.all([getDealRowHtml(), getGiveawayRowHtml()]);

  const htmlWithRows = data.html
    .replace("<!-- DEAL_ROW_SLOT -->", dealRowHtml)
    .replace("<!-- GIVEAWAY_ROW_SLOT -->", giveawayRowHtml);

  const [beforeProof, afterProof] = htmlWithRows.split("<!-- PROOF_SECTION_SLOT -->");
  const [htmlBefore, htmlAfter] = afterProof.split("<!-- PARTNER_SECTION_SLOT -->");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: data.css }} />
      <div id="evlv-landing-content" className="ev-d">
        <div dangerouslySetInnerHTML={{ __html: beforeProof }} />
        <ReviewsSection />
        <div dangerouslySetInnerHTML={{ __html: htmlBefore }} />
        <PartnerReferralSection />
        <div dangerouslySetInnerHTML={{ __html: htmlAfter }} />
      </div>
      <script dangerouslySetInnerHTML={{ __html: data.script }} />
    </>
  );
}
