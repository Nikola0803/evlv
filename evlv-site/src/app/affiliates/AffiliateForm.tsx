"use client";

import { FormEvent, useState } from "react";

export function AffiliateForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to a form endpoint / CRM lead capture once available.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-stone bg-white p-8 text-center">
        <i className="ri-checkbox-circle-fill text-2xl text-sage-deep" />
        <p className="mt-3 font-display text-lg font-semibold text-charcoal">Application received</p>
        <p className="mt-2 text-sm text-charcoal/60">
          We review every application by hand. We&rsquo;ll follow up by email within a couple of business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-stone bg-white p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-charcoal">Name</label>
          <input required placeholder="Your name" className="w-full rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none focus:border-copper" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-charcoal">Email</label>
          <input required type="email" placeholder="you@example.com" className="w-full rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none focus:border-copper" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-charcoal">Where would you be referring from?</label>
        <select required className="w-full rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none focus:border-copper">
          <option value="">Select one</option>
          <option>Research lab / institution</option>
          <option>Social media / content</option>
          <option>Existing customer network</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-charcoal">Tell us a bit about your audience</label>
        <textarea required rows={4} maxLength={500} placeholder="Who you'd be referring, and roughly how many people" className="w-full resize-none rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none focus:border-copper" />
      </div>

      <button type="submit" className="w-full rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light">
        Submit Application
      </button>
    </form>
  );
}
