"use client";

import { useState } from "react";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  function prev() {
    setIndex((i) => (i - 1 + total) % total);
  }
  function next() {
    setIndex((i) => (i + 1) % total);
  }

  return (
    <section className="bg-sage-deep py-20 text-white md:py-32">
      <div className="mx-auto max-w-[900px] px-4 text-center md:px-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-light">The EVLV Experience</p>
        <div className="flex items-center justify-center gap-3 text-sm text-white/70">
          <span className="font-display text-xl font-semibold text-white">4.9 / 5</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>150+ Researchers</span>
        </div>

        <p className="mt-12 font-display text-2xl font-medium leading-snug md:text-4xl">&ldquo;{current.quote}&rdquo;</p>

        <div className="mt-8">
          <p className="text-sm font-semibold">{current.author}</p>
          <p className="mt-1 text-xs text-white/50">Verified Researcher</p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button aria-label="Previous" onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition hover:bg-white hover:text-sage-deep">
            <i className="ri-arrow-left-line" />
          </button>
          <span className="text-xs tracking-wider text-white/50">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button aria-label="Next" onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition hover:bg-white hover:text-sage-deep">
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}
