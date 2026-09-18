import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/products";
import { getLiveProducts, mergeProducts } from "@/lib/product-feed";
import { getCoaMap } from "@/lib/coa-data";
import { getGoogleReviews } from "@/lib/google-reviews";
import { GoogleRatingBadge } from "@/components/ui/GoogleRatingBadge";
import { FrequentlyBoughtTogether } from "@/components/product/FrequentlyBoughtTogether";
import { ProductFaq } from "@/components/product/ProductFaq";
import { ProductClient } from "./ProductClient";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

async function resolveProduct(slug: string) {
  const live = await getLiveProducts();
  return mergeProducts(getProducts(), live).find((p) => p.slug === slug) ?? getProductBySlug(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  if (!product) return {};
  const title = `${product.name}, Research Peptide`;
  return {
    title,
    description: `${product.shortDescription} ${product.purity ? `Purity: ${product.purity}.` : ""} Batch-tested with a published Certificate of Analysis. Research use only.`.trim(),
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description: product.shortDescription,
      images: product.image ? [{ url: product.image, width: 800, height: 800, alt: product.name }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await resolveProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const coaMap = await getCoaMap();
  const coa = coaMap[product.slug];
  const reviews = await getGoogleReviews();
  const featuredReviews = reviews?.reviews.slice(0, 3) ?? [];
  const title = product.name.replace(/\s\d.*$/, "");

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.shortDescription,
    image: product.image ? [`https://evlvpeptides.com${product.image}`] : undefined,
    category: product.categoryLabel,
    offers: {
      "@type": "Offer",
      url: `https://evlvpeptides.com/shop/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://evlvpeptides.com" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://evlvpeptides.com/shop" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://evlvpeptides.com/shop/${product.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-[1400px] px-4 pb-4 pt-8 md:px-8 md:pt-10">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-charcoal/50">
          <Link href="/" className="transition hover:text-charcoal">
            Home
          </Link>
          <i className="ri-arrow-right-s-line" />
          <Link href="/shop" className="transition hover:text-charcoal">
            Shop
          </Link>
          <i className="ri-arrow-right-s-line" />
          <span className="font-medium text-charcoal">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pb-12 md:px-8">
        <ProductClient product={product} coa={coa} ratingBadge={<GoogleRatingBadge variant="light" />} />
      </div>

      {/* Three-step process -- rebuilt to match the homepage's own
          "How ordering works" card recipe (icon-tinted square + numeral +
          bordered white card, left-aligned eyebrow/title) instead of the
          bare centered text columns this had before, which didn't share
          any visual language with the rest of the site. Copy stays
          distinct from the Key Benefits trust badges above so the two
          don't repeat the same claims. */}
      <section className="bg-ivory py-10 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="mb-10 flex max-w-[660px] flex-col gap-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-copper">Getting started</p>
            <h2 className="font-display text-2xl font-semibold text-charcoal md:text-3xl">
              Three steps to <em className="text-sage-deep not-italic">your bench</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { n: "01", icon: "ri-file-list-3-line", t: "Pick your batch", b: "Choose a size and pack quantity -- no consultation or account needed." },
              { n: "02", icon: "ri-shield-check-line", t: "Checkout in minutes", b: "Secure checkout, no membership or subscription required." },
              { n: "03", icon: "ri-truck-line", t: "Ships same day", b: "Orders before our daily cutoff go out same day in discreet packaging." },
            ].map((step) => (
              <div key={step.n} className="flex flex-col gap-5 rounded-2xl border border-stone bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-mist text-lg text-sage-deep">
                    <i className={step.icon} />
                  </span>
                  <span
                    className="font-light text-stone"
                    style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fontSize: "2.25rem", lineHeight: 1 }}
                  >
                    {step.n}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-charcoal">{step.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal/60">{step.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real reviews, if configured -- quietly omitted otherwise, never fabricated */}
      {featuredReviews.length > 0 && (
        <section id="reviews" className="bg-ivory-soft py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <div className="mb-3 flex justify-center">
              <GoogleRatingBadge variant="light" />
            </div>
            <h2 className="mb-8 text-center font-display text-2xl font-semibold text-charcoal md:text-3xl">
              Why researchers choose <em className="text-sage-deep not-italic">{title}</em>
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {featuredReviews.map((r) => (
                <div key={r.author + r.relativeTime} className="rounded-xl border border-stone bg-white p-6">
                  <span className="inline-flex items-center gap-0.5 text-copper">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={i < Math.round(r.rating) ? "ri-star-fill text-sm" : "ri-star-line text-sm text-charcoal/20"} />
                    ))}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/80">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-deep text-xs font-semibold text-white">
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-charcoal">{r.author}</div>
                      <div className="text-xs text-soft-gray">{r.relativeTime}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upsell: kept, but positioned after trust is established rather than
          competing with the hero for attention */}
      <FrequentlyBoughtTogether product={product} related={related} />

      {/* FAQ */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <h2 className="mb-10 text-center font-display text-2xl font-semibold text-charcoal md:text-3xl">
            Questions about <em className="text-sage-deep not-italic">{title}</em>
          </h2>
          <div className="mx-auto max-w-[800px]">
            <ProductFaq product={product} title={title} />
          </div>
        </div>
      </section>

      {/* Closing CTA -- mirrors the homepage's FinalCta section: flat brand-green bg-sage-deep, no gradients/glows */}
      <section className="bg-sage-deep py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Get this batch <em className="text-ivory not-italic">verified and on your bench.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70">
            Independently tested, documented per batch, and shipped same day. No account or consultation required.
          </p>
          <a
            href="#top"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ivory px-8 py-4 text-sm font-semibold uppercase tracking-wide text-charcoal transition hover:bg-sage-light"
          >
            {product.inStock ? `Order ${title}` : "Check Availability"} <i className="ri-arrow-right-line" />
          </a>
          <p className="mx-auto mt-6 max-w-md text-[11px] leading-relaxed text-white/50">
            Supplied strictly for laboratory and analytical research use. Not for human or veterinary consumption.
          </p>
        </div>
      </section>
    </>
  );
}
