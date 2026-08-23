import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal | EVLV",
  description: "Notes on research, testing and the EVLV standard.",
};

export default function JournalPage() {
  return (
    <section className="bg-sage-deep py-24 text-center text-white md:py-36">
      <div className="mx-auto max-w-[900px] px-4 md:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-light">Journal</p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">Coming soon</h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/70">
          Longer-form notes on testing methodology, sourcing and the research behind the EVLV standard.
        </p>
      </div>
    </section>
  );
}
