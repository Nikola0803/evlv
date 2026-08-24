"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FOCUS_AREAS, MAX_FOCUS_SELECTIONS } from "@/lib/quiz-data";
import { getProductBySlug } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

type Step = "intro" | "focus" | "results";

export function QuizWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [selected, setSelected] = useState<string[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function closeModal() {
    setOpen(false);
    setStep("intro");
    setSelected([]);
  }

  function toggleFocus(key: string) {
    setSelected((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= MAX_FOCUS_SELECTIONS) return prev;
      return [...prev, key];
    });
  }

  const resultSlugs = Array.from(
    new Set(
      FOCUS_AREAS.filter((f) => selected.includes(f.key))
        .flatMap((f) => f.slugs)
    )
  ).slice(0, 4);
  const resultProducts = resultSlugs.map((s) => getProductBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[130] flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ivory shadow-lg transition hover:bg-sage-deep"
      >
        <i className="ri-compass-3-line text-base text-copper" />
        Not sure what you need?
      </button>

      {open && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
          <div aria-hidden onClick={closeModal} className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-lg rounded-2xl border border-stone bg-ivory p-6 shadow-2xl md:p-8">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-charcoal/50 transition hover:text-charcoal"
            >
              <i className="ri-close-line text-lg" />
            </button>

            {step === "intro" && (
              <div>
                <h2 className="font-display text-xl font-semibold text-charcoal md:text-2xl">Find your protocol</h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                  Answer a few quick questions and we&apos;ll point you toward the right compound or stack. No pressure,
                  no upsell.
                </p>
                <button
                  type="button"
                  onClick={() => setStep("focus")}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light"
                >
                  Take the quiz <i className="ri-arrow-right-line" />
                </button>
              </div>
            )}

            {step === "focus" && (
              <div>
                <h2 className="font-display text-xl font-semibold text-charcoal md:text-2xl">What&apos;s your main research focus?</h2>
                <p className="mt-2 text-sm text-charcoal/50">Pick up to {MAX_FOCUS_SELECTIONS}.</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {FOCUS_AREAS.map((area) => {
                    const isSelected = selected.includes(area.key);
                    const disabled = !isSelected && selected.length >= MAX_FOCUS_SELECTIONS;
                    return (
                      <button
                        key={area.key}
                        type="button"
                        disabled={disabled}
                        onClick={() => toggleFocus(area.key)}
                        className={`rounded-lg border px-4 py-3.5 text-left text-sm font-medium transition-colors disabled:opacity-30 ${
                          isSelected ? "border-copper bg-copper/10 text-charcoal" : "border-stone bg-ivory-soft text-charcoal/70 hover:border-charcoal/30"
                        }`}
                      >
                        {area.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelected([]);
                    setStep("results");
                  }}
                  className="mt-3 w-full rounded-lg border border-dashed border-stone px-4 py-3.5 text-left text-sm font-medium text-charcoal/50 transition hover:border-charcoal/40"
                >
                  Not sure yet — point me somewhere
                </button>

                <button
                  type="button"
                  disabled={selected.length === 0}
                  onClick={() => setStep("results")}
                  className="mt-8 w-full rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            )}

            {step === "results" && (
              <div>
                <h2 className="font-display text-xl font-semibold text-charcoal md:text-2xl">Your recommended research picks</h2>
                <p className="mt-2 text-sm text-charcoal/50">
                  {resultProducts.length > 0 ? "Based on what you selected." : "We don't carry a direct match for that focus yet — explore the full catalogue."}
                </p>

                <div className="mt-6 max-h-[50vh] space-y-3 overflow-y-auto">
                  {(resultProducts.length > 0 ? resultProducts : []).map((p) => (
                    <div key={p.id} className="flex items-center gap-3 rounded-lg border border-stone p-3">
                      <div className="h-16 w-13 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
                        {p.image && <Image src={p.image} alt={p.name} width={90} height={112} className="h-full w-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-charcoal">{p.name}</p>
                        <p className="text-xs text-charcoal/50">${p.price.toFixed(2)} CAD</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(p, 1, p.price, "1 PCS")}
                        className="rounded-md border border-charcoal px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-ivory"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setSelected([]);
                      setStep("focus");
                    }}
                    className="flex-1 rounded-md border border-charcoal py-3 text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-ivory"
                  >
                    Retake Quiz
                  </button>
                  <Link
                    href="/shop"
                    onClick={closeModal}
                    className="flex-1 rounded-md bg-copper py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light"
                  >
                    Shop All Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
