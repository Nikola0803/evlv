import { getGoogleReviews } from "@/lib/google-reviews";
import { Reveal } from "@/components/ui/Reveal";
import { MolecularMotif } from "@/components/ui/MolecularMotif";

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-copper ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={i < Math.round(rating) ? "ri-star-fill" : "ri-star-line text-white/25"} />
      ))}
    </span>
  );
}

/**
 * Verified reviews, sourced live from lib/google-reviews.ts (Google Places
 * Place Details) -- server component, no client JS. Renders an honest empty
 * state until GOOGLE_PLACES_API_KEY/GOOGLE_PLACE_ID are set, never
 * placeholder/fabricated reviews.
 */
export async function ReviewsSection() {
  const data = await getGoogleReviews();

  return (
    <section className="relative overflow-hidden bg-sage-deep py-24 text-white md:py-36">
      <MolecularMotif
        variant="particles"
        className="pointer-events-none absolute -right-24 -top-24 hidden h-[380px] w-[380px] lg:block"
      />
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        {data ? (
          <>
            <Reveal className="mb-14 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">03 / The EVLV Experience</p>
                <h2 className="font-display text-3xl font-semibold leading-[1.1] md:text-5xl">
                  {data.reviewCount > 0 ? `${data.reviewCount.toLocaleString()}+` : "Trusted by"} researchers
                  <br />
                  and counting.
                </h2>
              </div>

              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-6 py-4 transition hover:border-copper/40"
              >
                <span className="font-display text-3xl font-semibold">{data.rating.toFixed(1)}</span>
                <span className="flex flex-col gap-1">
                  <Stars rating={data.rating} />
                  <span className="text-[11px] text-white/50">{data.reviewCount.toLocaleString()} verified reviews</span>
                </span>
              </a>
            </Reveal>

            {data.reviews.length > 0 && (
              <Reveal stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data.reviews.slice(0, 6).map((r, i) => (
                  <div
                    key={i}
                    className={`rounded-lg border border-white/10 bg-white/5 p-6 ${i % 3 === 1 ? "lg:mt-8" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <i className="ri-double-quotes-l text-2xl text-copper/60" />
                      <Stars rating={r.rating} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">{r.text}</p>
                    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      {r.authorPhotoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.authorPhotoUrl} alt={r.author} className="h-9 w-9 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                          {r.author.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{r.author}</p>
                        <p className="text-[11px] text-white/40">{r.relativeTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Reveal>
            )}

            <div className="mt-12 text-center">
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-copper transition hover:text-white"
              >
                Read All Reviews <i className="ri-arrow-right-line" />
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
              03 / The EVLV Experience
            </p>
            <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-lg border border-dashed border-white/20 px-6 py-10 text-center">
              <i className="ri-shield-star-line text-2xl text-copper" />
              <p className="text-sm text-white/60">
                Verified researcher reviews will appear here once connected. Set{" "}
                <code className="text-copper">GOOGLE_PLACES_API_KEY</code> and{" "}
                <code className="text-copper">GOOGLE_PLACE_ID</code> in <code className="text-copper">.env.local</code>.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
