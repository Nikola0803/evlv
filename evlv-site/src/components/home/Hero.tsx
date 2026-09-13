import Link from "next/link";
import { getGoogleReviews } from "@/lib/google-reviews";

const QUICK_LINKS = [
  { label: "Shop All Compounds", href: "/shop" },
  { label: "Peptides", href: "/shop?category=peptides" },
  { label: "Ancillaries", href: "/shop?category=ancillaries" },
  { label: "View COAs", href: "/coas" },
  { label: "Research Journal", href: "/journal" },
];

/**
 * Full-bleed video hero -- the actual everlifemd pattern (a full-width
 * banner video/image behind centered white headline copy), not a bento
 * tile grid. Matches the same video-hero treatment now used on /shop's
 * banner (ShopClient.tsx) so the site opens with one consistent visual
 * language instead of two different hero styles.
 */
export async function Hero() {
  const reviews = await getGoogleReviews();

  return (
    <section className="relative overflow-hidden bg-charcoal pb-20 pt-24 text-center text-white md:pb-28 md:pt-32">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/hero-vial.png"
        aria-hidden
      >
        <source src="/videos/hero-21by9.mp4" media="(min-aspect-ratio: 21/9)" type="video/mp4" />
        <source src="/videos/hero-evlv.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/60 to-charcoal" />

      <div className="relative mx-auto max-w-3xl px-4 md:px-8">
        <div className="mb-5 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-copper">
          <span className="h-px w-8 bg-copper/60" />
          Precision. Purity. Potential.
          <span className="h-px w-8 bg-copper/60" />
        </div>

        <h1 className="font-display text-4xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-[4.5rem]">
          Evolve.
          <br className="hidden sm:block" />
          <span className="text-sage-light">Become your ultimate.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          Premium research peptides engineered around precision and transparency. For Research Use Only. Not for
          human or veterinary use.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {reviews && reviews.rating > 0 ? (
            <a
              href={reviews.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm transition hover:border-white/30"
            >
              <Stars rating={reviews.rating} />
              <span className="text-xs font-semibold text-white">{reviews.rating.toFixed(1)}/5</span>
              <span className="text-xs text-white/60">· {reviews.reviewCount.toLocaleString()}+ researcher reviews</span>
            </a>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              <i className="ri-shield-check-line text-copper" /> Independently Tested &amp; Batch Verified
            </div>
          )}
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          {["99%+ Tested Purity", "Batch-Level COAs", "Research Use Only"].map((label) => (
            <span key={label} className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-white/60">
              <i className="ri-check-line text-copper" />
              {label}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/shop"
            className="rounded-md bg-copper px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light"
          >
            Shop Research Peptides
          </Link>
          <Link
            href="/coas"
            className="rounded-md border border-white/25 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >
            View COAs
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-white/70 transition hover:border-white/40 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-copper" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={i < Math.round(rating) ? "ri-star-fill text-xs" : "ri-star-line text-xs text-white/30"} />
      ))}
    </span>
  );
}
