import { getGoogleReviews } from "@/lib/google-reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-copper" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={i < Math.round(rating) ? "ri-star-fill" : "ri-star-line text-white/25"} />
      ))}
    </span>
  );
}

/**
 * Real Google reviews (replaces the old Trustpilot TrustBox). Server
 * component -- fetches once at render via lib/google-reviews.ts, no client
 * JS or third-party script needed. Renders an honest empty state (with a
 * direct link out to Google) until GOOGLE_PLACES_API_KEY/GOOGLE_PLACE_ID
 * are set.
 */
export async function GoogleReviewsWidget() {
  const data = await getGoogleReviews();

  return (
    <section className="bg-sage-deep py-24 text-white md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
          03 / The EVLV Experience
        </p>

        {data ? (
          <>
            <div className="mb-10 flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl font-semibold">{data.rating.toFixed(1)}</span>
                <Stars rating={data.rating} />
              </div>
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-white/60 hover:text-copper hover:underline"
              >
                {data.reviewCount.toLocaleString()} Google reviews
              </a>
            </div>

            {data.reviews.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data.reviews.slice(0, 6).map((r, i) => (
                  <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3">
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
                    <Stars rating={r.rating} />
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-white/70">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-lg border border-dashed border-white/20 px-6 py-10 text-center">
            <i className="ri-google-fill text-2xl text-copper" />
            <p className="text-sm text-white/60">
              Real Google reviews will appear here once connected. Set{" "}
              <code className="text-copper">GOOGLE_PLACES_API_KEY</code> and{" "}
              <code className="text-copper">GOOGLE_PLACE_ID</code> in <code className="text-copper">.env.local</code>.
            </p>
            <a
              href="https://www.google.com/search?q=EVLV+Peptides"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wide text-copper hover:underline"
            >
              Find us on Google →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
