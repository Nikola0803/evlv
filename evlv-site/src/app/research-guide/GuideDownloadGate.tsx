"use client";

import { FormEvent, useState } from "react";

export function GuideDownloadGate() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/research-guide/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), consent, website: "" }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "We couldn't unlock the guide. Please try again.");
      setUnlocked(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We couldn't unlock the guide. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) {
    return (
      <div className="rounded-2xl border border-sage-deep/15 bg-white p-7 shadow-[0_22px_60px_rgba(14,17,19,.08)] sm:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-deep text-xl text-white">
          <i className="ri-check-line" aria-hidden />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[.18em] text-copper">Access unlocked</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-charcoal">Your guide is ready.</h2>
        <p className="mt-3 text-sm leading-6 text-charcoal/60">
          Download the 2026 EVLV Peptide Research and Wellness Guide as an editable Word document.
        </p>
        <a
          href="/api/research-guide/download"
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-charcoal px-6 py-4 text-sm font-semibold text-white transition hover:bg-sage-deep"
        >
          Download the guide <i className="ri-download-2-line" aria-hidden />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-sage-deep/15 bg-white p-7 shadow-[0_22px_60px_rgba(14,17,19,.08)] sm:p-9">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-copper">Complimentary access</p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-charcoal">Send me the guide.</h2>
      <p className="mt-3 text-sm leading-6 text-charcoal/60">Enter your email to join EVLV research updates and unlock the download.</p>

      <label className="mt-7 block text-xs font-semibold uppercase tracking-[.12em] text-charcoal/65" htmlFor="guide-email">
        Email address
      </label>
      <input
        id="guide-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="mt-2 w-full rounded-md border border-stone bg-ivory-soft px-4 py-3.5 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-sage-deep focus:ring-2 focus:ring-sage-deep/10"
      />
      <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" type="text" name="website" />

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-5 text-charcoal/60">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-stone accent-[var(--color-sage-deep)]"
        />
        <span>I agree to receive occasional research updates and offers from EVLV. I can unsubscribe at any time.</span>
      </label>

      {error && <p role="alert" className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-charcoal px-6 py-4 text-sm font-semibold text-white transition hover:bg-sage-deep disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "Unlocking..." : "Unlock the guide"} <i className="ri-arrow-right-line" aria-hidden />
      </button>
      <p className="mt-4 text-center text-[11px] leading-4 text-charcoal/40">Educational content only. Not medical or veterinary advice.</p>
    </form>
  );
}
