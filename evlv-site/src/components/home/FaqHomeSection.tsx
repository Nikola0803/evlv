"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { faqItems } from "@/lib/content";

export function FaqHomeSection() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqItems;
    return faqItems.filter((item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="bg-charcoal py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 md:grid-cols-3 md:px-8">
        <div className="md:col-span-1">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">09 / Common Questions</p>
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">Answers before you order.</h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            Clear answers on shipping, testing, and how EVLV verifies every batch.
          </p>
          <div className="relative mt-6">
            <i className="ri-search-line pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions"
              className="w-full rounded-md border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 transition-colors focus:border-copper/50 focus:outline-none"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          {filtered.length === 0 ? (
            <p className="py-10 text-sm text-white/50">No questions match &ldquo;{query}&rdquo;.</p>
          ) : (
            filtered.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.question} className="border-b border-white/10 py-5">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-xs font-semibold tabular-nums text-copper">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-medium text-white md:text-base">{item.question}</span>
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm transition ${
                        isOpen ? "rotate-45 border-copper bg-copper text-charcoal" : "border-white/20 text-white"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p className="max-w-2xl pl-9 pt-3 text-sm leading-relaxed text-white/60">{item.answer}</p>
                  )}
                </div>
              );
            })
          )}

          <div className="mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-copper transition hover:text-white"
            >
              View All FAQs <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
