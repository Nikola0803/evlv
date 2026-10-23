"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

const DISMISSED_KEY = "evlv-launch-popup-dismissed";
const REGISTERED_KEY = "evlv-launch-preregistered";

export function LaunchRegistrationPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem(REGISTERED_KEY) || sessionStorage.getItem(DISMISSED_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 120);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/launch-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: String(form.get("phone") || "").trim(),
          website: String(form.get("website") || ""),
          source: window.location.pathname,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "We couldn't save your registration. Please try again.");

      localStorage.setItem(REGISTERED_KEY, "1");
      setSubmitted(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn't save your registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/85 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="launch-popup-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#090a0b] shadow-[0_30px_120px_rgba(0,0,0,.75)] md:grid-cols-[.9fr_1.1fr]">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-lg text-white/75 backdrop-blur transition hover:border-white/35 hover:text-white"
          aria-label="Close launch registration"
        >
          <i className="ri-close-line" aria-hidden="true" />
        </button>

        <div className="relative hidden min-h-[590px] overflow-hidden md:block">
          <Image
            src="/images/banner/evlv-black-luxe-bg-v1.png"
            alt=""
            fill
            sizes="(min-width: 768px) 405px, 0px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,.08),transparent_42%),linear-gradient(to_top,rgba(0,0,0,.85),rgba(0,0,0,.08))]" />
          <div className="relative flex h-full flex-col justify-between p-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.34em] text-copper">A new EVLV era</p>
              <p className="mt-6 text-5xl font-semibold tracking-[.18em] text-white">EVLV</p>
              <p className="mt-1 text-sm font-medium tracking-[.72em] text-white/65">TODAY</p>
            </div>
            <div>
              <div className="mb-5 h-px w-14 bg-copper" />
              <p className="max-w-xs font-display text-3xl leading-tight text-white">Built for the people building what comes next.</p>
              <p className="mt-4 text-sm leading-6 text-white/55">Fresh conversations. Real access. The next side of EVLV.</p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[590px] flex-col justify-center bg-ivory px-6 py-16 sm:px-10 md:px-12">
          <div className="md:hidden">
            <p className="text-[10px] font-semibold uppercase tracking-[.32em] text-copper">EVLV Today</p>
            <div className="my-6 h-px w-12 bg-copper" />
          </div>

          {submitted ? (
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-2xl text-copper">
                <i className="ri-check-line" aria-hidden="true" />
              </span>
              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[.28em] text-copper">You&apos;re pre-registered</p>
              <h2 id="launch-popup-title" className="mt-3 font-display text-4xl font-medium tracking-tight text-charcoal">You&apos;ll hear it first.</h2>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-charcoal/60">We&apos;ll contact you with priority access when the first EVLV Today launch calls open.</p>
              <button type="button" onClick={() => setOpen(false)} className="mt-8 rounded-md bg-charcoal px-7 py-3 text-xs font-semibold uppercase tracking-[.18em] text-white transition hover:bg-charcoal/90">Continue to EVLV</button>
            </div>
          ) : (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-copper">Pre-registration is open</p>
              <h2 id="launch-popup-title" className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-charcoal sm:text-5xl">Get first access to the launch calls.</h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-charcoal/60">Something new is coming from EVLV. Join the priority list and be first to know when the launch calls go live.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label htmlFor="launch-name" className="mb-1.5 block text-xs font-semibold text-charcoal/65">Name</label>
                  <input ref={firstFieldRef} id="launch-name" name="name" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="h-12 w-full rounded-md border border-stone bg-white px-4 text-sm outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/20" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="launch-email" className="mb-1.5 block text-xs font-semibold text-charcoal/65">Email</label>
                  <input id="launch-email" name="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 w-full rounded-md border border-stone bg-white px-4 text-sm outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/20" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="launch-phone" className="mb-1.5 block text-xs font-semibold text-charcoal/65">Phone <span className="font-normal text-charcoal/35">(optional)</span></label>
                  <input id="launch-phone" name="phone" type="tel" autoComplete="tel" className="h-12 w-full rounded-md border border-stone bg-white px-4 text-sm outline-none transition focus:border-copper focus:ring-2 focus:ring-copper/20" placeholder="(555) 555-5555" />
                </div>
                <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="website" />

                {error && <p role="alert" className="text-xs font-medium text-red-700">{error}</p>}

                <button type="submit" disabled={submitting} className="flex h-12 w-full items-center justify-center rounded-md bg-charcoal text-xs font-semibold uppercase tracking-[.2em] text-white transition hover:bg-charcoal/90 disabled:cursor-wait disabled:opacity-60">
                  {submitting ? "Saving your place…" : "Pre-register now"}
                </button>
                <p className="text-center text-[10px] leading-4 text-charcoal/40">By registering, you agree to receive launch updates from EVLV. Unsubscribe anytime.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
