"use client";

import { FormEvent, useState } from "react";

const TOPICS = ["Order Question", "Product Question", "Shipping & Tracking", "COAs", "Other"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to a form endpoint (e.g. WordPress REST /wp-json/contact-form-7 or a mail API) once available.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-md border border-stone bg-ivory p-6 text-center md:p-8">
        <p className="font-display text-lg font-semibold text-charcoal">Message sent</p>
        <p className="mt-2 text-sm text-charcoal/60">Thanks for reaching out — our team typically responds within minutes during business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-md border border-stone bg-ivory p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-charcoal">Subject</label>
        <select required className="w-full rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none transition focus:border-sage-deep">
          <option value="">Select a topic</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-semibold text-charcoal">Message</label>
        </div>
        <textarea
          required
          maxLength={500}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help you?"
          className="w-full resize-none rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none transition focus:border-sage-deep"
        />
        <div className="mt-1 text-right text-xs text-charcoal/40">Max 500 characters</div>
      </div>

      <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" type="text" name="company" />

      <button type="submit" className="w-full rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light">
        Send Message
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-charcoal">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none transition focus:border-sage-deep"
      />
    </div>
  );
}
