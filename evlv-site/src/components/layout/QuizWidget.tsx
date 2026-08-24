"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FOCUS_AREAS, SUBGOALS, QUIZ_PRODUCTS, QUIZ_LABELS, TIER_ORDER, MAX_FOCUS_SELECTIONS, type Tier } from "@/lib/quiz-data";
import { getProductBySlug } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

type Step = "intro" | "goals" | "subgoal" | "results";

interface Candidate {
  slug: string;
  tier: Tier;
  text: string;
}

function candidatesFor(key: string, exclude: Set<string>): Candidate[] {
  return Object.entries(QUIZ_PRODUCTS)
    .filter(([slug, p]) => p.variants[key] && !exclude.has(slug))
    .map(([slug, p]) => ({ slug, tier: p.tier, text: p.variants[key] }))
    .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]);
}

interface GoalResult {
  goalKey: string;
  subgoalLabel?: string;
  picks: Candidate[];
}

function buildResults(selectedGoals: string[], subgoalAnswers: Record<string, string>): GoalResult[] {
  const used = new Set<string>();
  return selectedGoals.map((goalKey) => {
    const subgoal = subgoalAnswers[goalKey];
    const key = `${goalKey}:${subgoal}`;
    const picks = candidatesFor(key, used).slice(0, 2);
    picks.forEach((p) => used.add(p.slug));
    return {
      goalKey,
      subgoalLabel: SUBGOALS[goalKey]?.options.find((o) => o.key === subgoal)?.label,
      picks,
    };
  });
}

function goalLabel(key: string) {
  return FOCUS_AREAS.find((f) => f.key === key)?.label ?? key;
}

export function QuizWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [subgoalIndex, setSubgoalIndex] = useState(0);
  const [subgoalAnswers, setSubgoalAnswers] = useState<Record<string, string>>({});
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
    resetAnswers();
  }

  function resetAnswers() {
    setSelectedGoals([]);
    setSubgoalIndex(0);
    setSubgoalAnswers({});
  }

  function toggleGoal(key: string) {
    setSelectedGoals((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= MAX_FOCUS_SELECTIONS) return prev;
      return [...prev, key];
    });
  }

  function handleGoalsContinue() {
    if (selectedGoals.length === 0) return;
    setSubgoalIndex(0);
    setSubgoalAnswers({});
    // Skip straight to results if none of the selected goals have a subgoal question (e.g. only "vitality" picked).
    const firstWithSubgoal = selectedGoals.findIndex((g) => SUBGOALS[g]);
    setStep(firstWithSubgoal === -1 ? "results" : "subgoal");
  }

  function answerSubgoal(subgoalKey: string) {
    const goalKey = selectedGoals[subgoalIndex];
    const nextAnswers = { ...subgoalAnswers, [goalKey]: subgoalKey };
    setSubgoalAnswers(nextAnswers);
    const next = selectedGoals.findIndex((g, i) => i > subgoalIndex && SUBGOALS[g]);
    if (next !== -1) {
      setSubgoalIndex(next);
    } else {
      setStep("results");
    }
  }

  function retake() {
    setStep("goals");
    resetAnswers();
  }

  const currentGoalKey = selectedGoals[subgoalIndex];
  const currentSubgoal = currentGoalKey ? SUBGOALS[currentGoalKey] : undefined;
  const results = step === "results" ? buildResults(selectedGoals, subgoalAnswers) : null;

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
                  Answer a couple of quick questions and we&apos;ll point you toward the right compound or stack. No
                  pressure, no upsell.
                </p>
                <button
                  type="button"
                  onClick={() => setStep("goals")}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light"
                >
                  Take the quiz <i className="ri-arrow-right-line" />
                </button>
              </div>
            )}

            {step === "goals" && (
              <div>
                <h2 className="font-display text-xl font-semibold text-charcoal md:text-2xl">What&apos;s your main research focus?</h2>
                <p className="mt-2 text-sm text-charcoal/50">Pick up to {MAX_FOCUS_SELECTIONS}.</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {FOCUS_AREAS.map((area) => {
                    const isSelected = selectedGoals.includes(area.key);
                    const disabled = !isSelected && selectedGoals.length >= MAX_FOCUS_SELECTIONS;
                    return (
                      <button
                        key={area.key}
                        type="button"
                        disabled={disabled}
                        onClick={() => toggleGoal(area.key)}
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
                  disabled={selectedGoals.length === 0}
                  onClick={handleGoalsContinue}
                  className="mt-8 w-full rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Continue <i className="ri-arrow-right-line" />
                </button>
              </div>
            )}

            {step === "subgoal" && currentSubgoal && (
              <div>
                <button
                  type="button"
                  onClick={() => setStep("goals")}
                  className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-charcoal/50 transition hover:text-copper"
                >
                  <i className="ri-arrow-left-line text-sm" /> Back
                </button>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-copper">
                  {goalLabel(currentGoalKey)} · {subgoalIndex + 1} of {selectedGoals.length}
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold text-charcoal md:text-2xl">{currentSubgoal.question}</h2>

                <div className="mt-6 flex flex-col gap-3">
                  {currentSubgoal.options.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => answerSubgoal(opt.key)}
                      className="rounded-lg border border-stone bg-ivory-soft px-4 py-3.5 text-left text-sm font-medium text-charcoal/70 transition hover:border-copper hover:text-charcoal"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "results" && results && (
              <div>
                <button
                  type="button"
                  onClick={() => setStep("goals")}
                  className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-charcoal/50 transition hover:text-copper"
                >
                  <i className="ri-arrow-left-line text-sm" /> Back
                </button>
                <h2 className="font-display text-xl font-semibold text-charcoal md:text-2xl">{QUIZ_LABELS.resultsHeader}</h2>
                <p className="mt-2 text-sm text-charcoal/50">{QUIZ_LABELS.resultsSubheader}</p>

                <div className="mt-6 max-h-[46vh] space-y-6 overflow-y-auto pr-1">
                  {results.map((goal) => (
                    <div key={goal.goalKey}>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal/50">
                        {goalLabel(goal.goalKey)}
                        {goal.subgoalLabel ? ` · ${goal.subgoalLabel}` : ""}
                      </p>
                      {goal.picks.length > 0 ? (
                        <div className="space-y-3">
                          {goal.picks.map((pick, i) => {
                            const product = getProductBySlug(pick.slug);
                            if (!product) return null;
                            return (
                              <div key={pick.slug} className="rounded-lg border border-stone p-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-14 w-11 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
                                    {product.image && <Image src={product.image} alt={product.name} width={90} height={112} className="h-full w-full object-cover" />}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-charcoal">{product.name}</p>
                                    <p className="text-xs text-charcoal/50">${product.price.toFixed(2)} CAD</p>
                                  </div>
                                  <span className="shrink-0 whitespace-nowrap rounded-full bg-copper/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-copper">
                                    {i === 0 ? QUIZ_LABELS.startHere : QUIZ_LABELS.alsoWorthLook}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => addToCart(product, 1, product.price, "1 PCS")}
                                    className="shrink-0 rounded-md border border-charcoal px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-ivory"
                                  >
                                    Add
                                  </button>
                                </div>
                                <p className="mt-2.5 text-xs leading-relaxed text-charcoal/60">{pick.text}</p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-charcoal/50">{QUIZ_LABELS.noMatch}</p>
                      )}
                    </div>
                  ))}
                </div>

                <p className="mt-6 border-t border-stone pt-4 text-[11px] leading-relaxed text-charcoal/50">{QUIZ_LABELS.footer}</p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={retake}
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
