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
    <section className="bg-sage-deep py-24 text-white md:py-36">
      <div className="mx-auto max-w-[720px] px-4 text-center md:px-8">
        <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">07 / The EVLV Experience</p>

        <p className="font-display text-xl font-medium leading-snug md:text-2xl">&ldquo;{current.quote}&rdquo;</p>

        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex gap-1 text-copper" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} className="ri-star-fill text-xs" />
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/60">Verified Researcher</p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button aria-label="Previous" onClick={prev} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition hover:border-copper hover:text-copper">
            <i className="ri-arrow-left-line text-sm" />
          </button>
          <span className="text-[11px] tracking-wider text-white/40">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button aria-label="Next" onClick={next} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition hover:border-copper hover:text-copper">
            <i className="ri-arrow-right-line text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
}
