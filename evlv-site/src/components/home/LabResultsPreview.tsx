const METHODS = ["HPLC", "LC-MS", "Third-Party Laboratory"];

export function LabResultsPreview() {
  return (
    <section className="bg-charcoal py-24 text-white md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-4 md:grid-cols-5 md:px-8 lg:gap-16">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
            <span className="h-px w-8 bg-copper/60" />
            06 / Transparency
          </div>
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] md:text-6xl">
            Every batch.
            <br />
            Verified.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
            Every EVLV compound is supported by batch-specific analytical documentation.
          </p>
          <a href="/coas" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:text-copper">
            View COAs <i className="ri-arrow-right-line" />
          </a>
        </div>

        <div className="rounded-lg bg-ivory p-8 text-charcoal md:col-span-3 md:p-12">
          <div className="flex items-start justify-between border-b border-stone pb-6">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/50">Certificate of Analysis</p>
              <p className="mt-1 font-display text-2xl font-semibold">BPC-157</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-charcoal/50">Lot</p>
              <p className="mt-1 font-mono text-sm text-charcoal/70">#BPC-2608</p>
            </div>
          </div>

          <div className="border-b border-stone py-10 text-center">
            <p className="font-display text-7xl font-semibold text-charcoal">99.2%</p>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-charcoal/50">Tested Purity</p>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-stone py-7 text-center">
            {METHODS.map((method) => (
              <div key={method} className="flex flex-col items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-copper text-copper">
                  <i className="ri-check-line text-sm" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-charcoal/60">{method}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-charcoal/50">Verified Independently</span>
              <span className="ml-3 text-sm font-semibold uppercase tracking-wide text-sage-deep">Pass</span>
            </div>
            <a href="/coas" className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-copper transition hover:text-charcoal">
              View COA <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
