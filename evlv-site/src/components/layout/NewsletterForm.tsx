"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to an email provider (Klaviyo/Omnisend) once available.
    setSubmitted(true);
  }

  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-white/40">Newsletter</p>
      {submitted ? (
        <p className="text-sm text-white/60">You&apos;re on the list.</p>
      ) : (
        <>
          <p className="mb-4 text-sm leading-relaxed text-white/50">Research notes and new SKUs, occasionally.</p>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b border-white/20 pb-2">
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
            <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" type="text" name="website" />
            <button type="submit" aria-label="Subscribe" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/30 transition hover:bg-white hover:text-charcoal">
              <i className="ri-arrow-right-line text-xs" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
