import type { Product } from "./types";
import { getAnchorPrice } from "./pricing";

/**
 * The homepage's "Featured products" carousel is scraped static HTML
 * (landing-content.json, see page.tsx's big doc comment) with prices
 * hand-typed in at scrape time -- they silently drift from the real,
 * live shop prices whenever a price changes there. This patches each
 * product card's <div class="pprice"> in place with the real current
 * price plus a crossed-out anchor price (same 20%-off convention as
 * ProductCard.tsx's getAnchorPrice()), so the homepage always matches
 * the shop instead of needing a second manual edit on every price change.
 *
 * Deliberately a targeted regex substitution over the scraped markup
 * rather than a rebuilt template -- every product's badge/description/
 * feature-bullet copy in that HTML is real, reviewed marketing copy that
 * has nothing to do with pricing, and shouldn't be reconstructed from
 * scratch here (or silently dropped) just to fix a number.
 */
export function applyLiveFeaturedPricing(html: string, products: Product[]): string {
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  return html.replace(
    /(href="\/shop\/([a-z0-9-]+)"[^>]*class="product"[\s\S]*?<div class="pprice">)<span class="amt">[^<]*<\/span><span class="per"><\/span><\/div>/g,
    (match, prefix, slug) => {
      const product = bySlug.get(slug);
      if (!product) return match; // unknown slug -- leave whatever was scraped alone rather than guess
      const anchor = getAnchorPrice(product.price);
      const was = `<span class="amt-was" style="font-size:14px;font-weight:500;text-decoration:line-through;opacity:.45;margin-right:2px">$${anchor.toFixed(0)}</span>`;
      return `${prefix}${was}<span class="amt">$${product.price.toFixed(0)}</span><span class="per"></span></div>`;
    }
  );
}
