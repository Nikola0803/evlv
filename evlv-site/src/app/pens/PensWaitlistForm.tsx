"use client";

import { FormEvent, useState } from "react";

// Same /api/newsletter proxy as the footer form; `source` becomes the
// Omnisend tag ("pens-waitlist"), which is the list the pens launch email goes to.
export function PensWaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "pens-waitlist" }),
      });
    } catch {
      /* still show success below -- signup isn't worth blocking on a network hiccup */
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-stone bg-ivory-soft p-6 text-center">
        <p className="font-display text-xl font-semibold text-charcoal">You&apos;re on the list.</p>
        <p className="mt-2 text-sm text-charcoal/60">We&apos;ll email you first the moment EVLV pens are available.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="w-full rounded-full border border-stone bg-white px-5 py-3 text-sm text-charcoal outline-none focus:border-sage-deep"
      />
      <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" type="text" name="website" />
      <button
        type="submit"
        disabled={submitting}
        className="shrink-0 rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white transition hover:bg-sage-deep disabled:opacity-50"
      >
        Notify me
      </button>
    </form>
  );
}
