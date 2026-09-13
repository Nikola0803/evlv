import Image from "next/image";
import { getGoogleReviews } from "@/lib/google-reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-copper" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={i < Math.round(rating) ? "ri-star-fill text-sm" : "ri-star-line text-sm text-charcoal/20"} />
      ))}
    </span>
  );
}

// Proof photos shown alongside real reviews in the masonry grid -- swap
// these for actual lab/testing photography (COAs on the bench, batch
// verification shots, etc.) as they come in. No stock "customer" photos.
const PHOTOS = [
  { src: "/images/proof/ugc-1.webp", alt: "Batch verification in the lab" },
  { src: "/images/proof/ugc-2.webp", alt: "EVLV vial staged for testing" },
  { src: "/images/proof/ugc-3.webp", alt: "Compound prepared for laboratory analysis" },
  { src: "/images/proof/ugc-4.webp", alt: "EVLV vial held for batch verification" },
];

/**
 * "Trusted by researchers" proof section, sourced entirely from real Google
 * reviews (see @/lib/google-reviews) -- never fabricated copy or a fake
 * review/rating count. getGoogleReviews() returns null when the integration
 * isn't configured (and it isn't a demo/preview build), in which case this
 * section renders nothing rather than showing broken or placeholder trust
 * signals in production.
 */
type ProofReview = Awaited<ReturnType<typeof getGoogleReviews>>;
type Card = { type: "review"; review: NonNullable<ProofReview>["reviews"][number] } | { type: "photo"; photo: (typeof PHOTOS)[number] };

export async function ProofSection() {
  const data = await getGoogleReviews();
  if (!data || data.reviews.length === 0) return null;

  // Interleave real reviews with proof photos for the masonry feel.
  const cards: Card[] = [];
  data.reviews.forEach((review, i) => {
    cards.push({ type: "review", review });
    if (PHOTOS[i]) cards.push({ type: "photo", photo: PHOTOS[i] });
  });

  return (
    <section className="bg-ivory-soft py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-charcoal/40">Google Reviews</p>
          <h2 className="font-display text-3xl font-semibold text-charcoal md:text-4xl">
            Trusted by <em className="text-sage-deep not-italic">real</em> researchers
          </h2>
          <a
            href={data.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-stone bg-white px-5 py-2.5 transition hover:border-sage-deep"
          >
            <i className="ri-google-fill text-sm text-charcoal/50" />
            <Stars rating={data.rating} />
            <span className="text-xs font-semibold text-charcoal/70">
              {data.rating.toFixed(1)} · {data.reviewCount.toLocaleString()} reviews
            </span>
          </a>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {cards.map((card, i) =>
            card.type === "photo" ? (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={card.photo.src} alt={card.photo.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
              </div>
            ) : (
              <div key={i} className="rounded-xl border border-stone bg-white p-6">
                <Stars rating={card.review.rating} />
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">&ldquo;{card.review.text}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-deep text-xs font-semibold text-white">
                    {card.review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">{card.review.author}</div>
                    <div className="text-xs text-soft-gray">{card.review.relativeTime}</div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
