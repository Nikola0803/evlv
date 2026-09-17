"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getStoredToken } from "@/lib/auth";

// EVLV ships US-only right now, so the form only collects a US state --
// no separate country field (which was also the thing wrapping "Province /
// State" onto two lines in the 4-column layout).
const SHIP_COUNTRY = "US";

interface FormState {
  name: string;
  email: string;
  referredBy: string;
  socialLink: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  referredBy: "",
  socialLink: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  province: "",
};

/**
 * Applies for affiliate status. If the applicant is already signed in
 * (getStoredToken() is non-empty for a real account, not the AgeGate's
 * placeholder "local" user), their existing account/order history carries
 * over server-side -- but signing in first is NOT required, since most
 * ambassador applicants on this public page have never shopped yet. Name +
 * email collected here upsert (or reuse) their Contact record; see
 * AFFILIATE-PORTAL.md.
 */
export function AffiliateForm({ onApplied }: { onApplied?: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!agreedToTerms) {
      setError("You must accept the Terms & Conditions to apply.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/affiliate/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: getStoredToken(),
          name: form.name.trim(),
          email: form.email.trim(),
          referredBy: form.referredBy.trim() || undefined,
          socialLink: form.socialLink.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          postalCode: form.postalCode.trim(),
          city: form.city.trim(),
          province: form.province.trim(),
          country: SHIP_COUNTRY,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          res.status === 503
            ? "The affiliate program isn't accepting applications yet - check back soon, or reach out via Contact in the meantime."
            : data?.error || "Something went wrong submitting your application."
        );
      }
      setSubmitted(true);
      onApplied?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-stone bg-white p-8 text-center">
        <i className="ri-checkbox-circle-fill text-2xl text-sage-deep" />
        <p className="mt-3 font-display text-lg font-semibold text-charcoal">Application received</p>
        <p className="mt-2 text-sm text-charcoal/60">
          We review every application by hand. We&apos;ll follow up by email within a couple of business days - check
          your Account page for your status any time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-stone bg-ivory-soft p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" required value={form.name} onChange={(v) => set("name", v)} />
        <Field label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} />
      </div>

      <Field label="Who referred you?" value={form.referredBy} onChange={(v) => set("referredBy", v)} placeholder="Optional" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Social Media Link"
          required
          value={form.socialLink}
          onChange={(v) => set("socialLink", v)}
          placeholder="https://instagram.com/yourhandle"
        />
        <Field label="Phone" type="tel" required value={form.phone} onChange={(v) => set("phone", v)} />
      </div>

      <Field label="Address" required value={form.address} onChange={(v) => set("address", v)} />

      <div className="grid grid-cols-3 gap-4">
        <Field label="City" required value={form.city} onChange={(v) => set("city", v)} />
        <Field label="State" required value={form.province} onChange={(v) => set("province", v)} />
        <Field label="Postal Code" required value={form.postalCode} onChange={(v) => set("postalCode", v)} />
      </div>

      <label className="flex items-start gap-2.5 pt-2 text-xs text-charcoal/60">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-copper"
        />
        <span>
          I accept the{" "}
          <Link href="/terms" className="text-copper underline hover:text-copper-dark">
            Terms &amp; Conditions
          </Link>
          .
        </span>
      </label>

      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <i className="ri-error-warning-line text-sm shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  className = "",
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-semibold text-charcoal">
        {label}
        {required && <span className="text-copper"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-stone bg-white px-4 py-2.5 text-sm outline-none focus:border-copper"
      />
    </div>
  );
}
