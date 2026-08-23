import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative -mt-[90px] flex min-h-[92vh] items-center overflow-hidden bg-charcoal md:-mt-[100px]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full scale-110 object-cover"
        poster="/images/hero-vial.jpg"
      >
        <source src="/videos/hero-water-2.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(90deg, rgba(16,19,14,0.55) 0%, rgba(16,19,14,0.15) 55%, rgba(16,19,14,0) 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(0deg, rgba(16,19,14,0.5) 0%, rgba(16,19,14,0) 100%)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-32 pt-[150px] md:px-8 md:pb-28 md:pt-[170px]">
        <div className="max-w-xl">
          <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">
            <span className="h-px w-8 bg-white/40" />
            Research-Grade Compounds
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[0.98] text-white md:text-7xl lg:text-8xl">
            <span className="text-outline">Evolve. Alter.</span>
            <br />
            Become your ultimate.
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
            Premium research peptides, rigorously tested and third-party verified. Prepared exclusively for research
            use.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/shop" size="lg" className="!bg-ivory !text-charcoal hover:!bg-sage-light">
              Shop All Products
            </ButtonLink>
            <ButtonLink href="/lab-results" variant="secondary" size="lg" className="!border-white/40 !text-ivory hover:!bg-ivory hover:!text-charcoal">
              View Lab Results
            </ButtonLink>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-2">
            {["99%+ Tested Purity", "Batch-Level COAs", "Research Use Only"].map((label) => (
              <span key={label} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-white/70">
                <i className="ri-check-line text-sm" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-4 rounded bg-sage-deep/90 px-5 py-3 text-white backdrop-blur-sm md:bottom-8 md:left-8">
        <div className="text-[10px] uppercase tracking-wider opacity-80">Independently Verified</div>
        <div className="text-base font-semibold md:text-lg">99.2% Avg. Purity</div>
      </div>

      <StampBadge className="absolute right-4 top-[100px] h-20 w-20 md:right-8 md:top-[120px] md:h-24 md:w-24" />
    </section>
  );
}

function StampBadge({ className = "" }: { className?: string }) {
  const text = "EVOLVE. ALTER. • BECOME YOUR ULTIMATE. • ";
  return (
    <div className={`flex items-center justify-center rounded-full border border-white/40 bg-charcoal/50 backdrop-blur-sm ${className}`}>
      <svg viewBox="0 0 100 100" className="hero-spin absolute inset-0 h-full w-full">
        <defs>
          <path id="stamp-circle" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
        </defs>
        <text fill="#F2EDE2" fontSize="7.4" letterSpacing="1.2" fontFamily="var(--font-body), sans-serif">
          <textPath href="#stamp-circle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 100 100" className="hero-pulse absolute inset-0 h-full w-full" style={{ transformOrigin: "50% 50%" }}>
        <circle cx="50" cy="50" r="20" fill="none" stroke="#F2EDE2" strokeWidth="1" opacity="0.7" />
        <path d="M42 50l6 6 12-13" fill="none" stroke="#F2EDE2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
