import type { Metadata } from "next";
import Image from "next/image";
import { GuideDownloadGate } from "./GuideDownloadGate";

export const metadata: Metadata = {
  title: "Peptide Research and Wellness Guide",
  description: "Access the EVLV evidence-led peptide research and wellness guide.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function ResearchGuidePage() {
  return (
    <div className="relative overflow-hidden bg-ivory">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_18%_15%,rgba(85,115,108,.20),transparent_42%),radial-gradient(circle_at_82%_10%,rgba(32,58,55,.12),transparent_40%)]" />
      <section className="container-altr relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-copper">EVLV Research Library</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.06] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
              Peptide research, without the noise.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-charcoal/65 sm:text-lg sm:leading-8">
              A visually guided reference covering metabolic compounds, repair peptides, cognition, longevity, SARMs, evidence levels, study-dose context and safety boundaries.
            </p>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["Evidence graded", "Approved, clinical, early human and preclinical evidence clearly separated."],
                ["Broad coverage", "Semaglutide, retatrutide, BPC-157, TB-500, SARMs and more."],
                ["Built for clarity", "Clickable sections, visual maps and concise research takeaways."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-xl border border-sage-deep/10 bg-white/70 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-charcoal">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-charcoal/55">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 overflow-hidden rounded-2xl border border-sage-deep/10 bg-charcoal shadow-[0_26px_80px_rgba(14,17,19,.16)]">
              <Image
                src="/images/research-guide-cover.png"
                alt="Abstract molecular peptide research illustration"
                width={1600}
                height={780}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-32">
            <GuideDownloadGate />
            <div className="mt-5 flex items-center justify-center gap-5 text-[11px] uppercase tracking-[.12em] text-charcoal/40">
              <span className="inline-flex items-center gap-1.5"><i className="ri-lock-line" aria-hidden /> Private access</span>
              <span className="inline-flex items-center gap-1.5"><i className="ri-file-word-2-line" aria-hidden /> Word document</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
