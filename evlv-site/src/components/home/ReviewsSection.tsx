import { getGoogleReviews } from "@/lib/google-reviews";
import { Reveal } from "@/components/ui/Reveal";
import { MolecularMotif } from "@/components/ui/MolecularMotif";

const PURITY_STATS = [
  { icon: "ri-flask-line", value: "99%+", label: "Avg HPLC purity across all batches" },
  { icon: "ri-file-shield-2-line", value: "100%", label: "Batches with published COA" },
  { icon: "ri-time-line", value: "48h", label: "Third-party lab turnaround" },
  { icon: "ri-calendar-check-line", value: "12 mo", label: "Shelf life guarantee" },
];

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
 * placeholder/fabricated reviews. PURITY_STATS above the testimonials are
 * the same lab-standard figures shown in the hero and the "From checkout
 * to your bench" order-process section -- kept identical across all three
 * so the numbers read as one consistent claim, not three different ones.
 * Icons match the TrustBar/AboutSection icon-row convention used
 * elsewhere on the page rather than introducing a new visual language.
 */
export async function ReviewsSection() {
  const data = await getGoogleReviews();

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-white md:py-36">
      <MolecularMotif
        variant="particles"
        className="pointer-events-none absolute -right-24 -top-24 hidden h-[380px] w-[380px] lg:block"
      />
      <MolecularMotif
        variant="concentric"
        className="pointer-events-none absolute -bottom-32 -left-32 hidden h-[340px] w-[340px] lg:block"
      />
      <div className="relative mx-auto max-w-[1000px] px-4 md:px-8">
        <Reveal className="mb-12 text-center md:mb-14">
          <span className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" /> Research-Grade Quality
          </span>
          <h2 className="font-display text-3xl font-semibold leading-[1.1] md:text-5xl">
            Research you can <em className="text-sage-light not-italic">actually verify</em>.
          </h2>
          {data && (
            <p className="mx-auto mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
              <Stars rating={data.rating} />
              <span className="font-semibold text-white">{data.rating.toFixed(1)} / 5</span>
              {data.reviewCount > 0 && <span>&middot; {data.reviewCount.toLocaleString()}+ verified researcher reviews</span>}
            </p>
          )}
        </Reveal>

        <Reveal
          stagger
          className="mb-16 grid grid-cols-2 divide-y divide-white/10 rounded-lg border border-white/10 bg-white/[0.03] md:mb-20 md:grid-cols-4 md:divide-x md:divide-y-0"
        >
          {PURITY_STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 px-4 py-6 text-center">
              <i className={`${s.icon} text-lg text-copper`} aria-hidden />
              <p className="font-display text-xl font-semibold text-white md:text-2xl">{s.value}</p>
              <p className="max-w-[140px] text-[11px] leading-snug text-white/45">{s.label}</p>
            </div>
          ))}
        </Reveal>

        {data ? (
          <>
            {data.reviews.length > 0 && (
              <Reveal stagger className="divide-y divide-white/10 border-t border-white/10">
                {data.reviews.slice(0, 6).map((r, i) => {
                  const alt = i % 2 === 1;
                  return (
                    <div key={i} className={`flex items-start gap-6 py-8 ${alt ? "flex-row-reverse text-right" : "text-left"}`}>
                      <div className={`flex shrink-0 flex-col items-center gap-1.5 ${alt ? "items-center" : "items-center"}`}>
                        {r.authorPhotoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.authorPhotoUrl} alt={r.author} className="h-9 w-9 rounded-full object-cover" />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                            {r.author.charAt(0)}
                          </div>
                        )}
                        <p className="whitespace-nowrap text-xs font-semibold">{r.author}</p>
                        <p className="whitespace-nowrap text-[11px] text-white/40">{r.relativeTime}</p>
                        <Stars rating={r.rating} className="text-xs" />
                      </div>
                      <p className="flex-1 text-lg leading-relaxed text-white/85 md:text-xl">&ldquo;{r.text}&rdquo;</p>
                    </div>
                  );
                })}
              </Reveal>
            )}

            <div className="mt-10 border-t border-white/10 pt-10 text-center">
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-copper transition hover:text-white"
              >
                Read All {data.reviewCount > 0 ? `${data.reviewCount}+ ` : ""}Reviews <i className="ri-arrow-right-line" />
              </a>
            </div>
          </>
        ) : (
          <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-lg border border-dashed border-white/20 px-6 py-10 text-center">
            <i className="ri-shield-star-line text-2xl text-copper" />
            <p className="text-sm text-white/60">
              Verified researcher reviews will appear here once connected. Set{" "}
              <code className="text-copper">GOOGLE_PLACES_API_KEY</code> and{" "}
              <code className="text-copper">GOOGLE_PLACE_ID</code> in <code className="text-copper">.env.local</code>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
