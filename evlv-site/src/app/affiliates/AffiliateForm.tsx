"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  referredBy: string;
  socialLink: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
}

const EMPTY: FormState = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  password: "",
  referredBy: "",
  socialLink: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  province: "",
  country: "",
};

export function AffiliateForm() {
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

    if (!EMAIL_RE.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.email.trim().toLowerCase() !== form.confirmEmail.trim().toLowerCase()) {
      setError("Email addresses do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
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
          username: form.username.trim(),
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          password: form.password,
          referredBy: form.referredBy.trim() || undefined,
          socialLink: form.socialLink.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          postalCode: form.postalCode.trim(),
          city: form.city.trim(),
          province: form.province.trim(),
          country: form.country.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          res.status === 503
            ? "The affiliate program isn't accepting self-serve applications yet — check back soon, or reach out via Contact in the meantime."
            : data?.error || "Something went wrong submitting your application."
        );
      }
      setSubmitted(true);
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
          We review every application by hand. We&apos;ll follow up by email within a couple of business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-stone bg-white p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Username" required value={form.username} onChange={(v) => set("username", v)} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="First Name" required value={form.firstName} onChange={(v) => set("firstName", v)} />
          <Field label="Last Name" required value={form.lastName} onChange={(v) => set("lastName", v)} />
        </div>
        <Field label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} />
        <Field label="Confirm Email" type="email" required value={form.confirmEmail} onChange={(v) => set("confirmEmail", v)} />
        <Field
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={(v) => set("password", v)}
          placeholder="Min. 8 characters"
          className="sm:col-span-2"
        />
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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="City" required value={form.city} onChange={(v) => set("city", v)} />
        <Field label="Province / State" required value={form.province} onChange={(v) => set("province", v)} />
        <Field label="Postal Code" required value={form.postalCode} onChange={(v) => set("postalCode", v)} />
        <Field label="Country" required value={form.country} onChange={(v) => set("country", v)} />
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

      <p className="text-center text-xs text-charcoal/50">
        Already have an account?{" "}
        <Link href="/affiliates/login" className="text-copper hover:underline">
          Sign in
        </Link>
      </p>
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
        className="w-full rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none focus:border-copper"
      />
    </div>
  );
}
