"use client";

import { FormEvent, useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  branch: string;
  status: string;
}

const STATUS_OPTIONS = [
  "Active Duty",
  "Veteran",
  "Reservist / National Guard",
  "Police / Law Enforcement",
  "Firefighter",
  "EMS / Paramedic",
  "Dispatch / Emergency Personnel",
  "Other First Responder",
];

const BRANCH_OPTIONS = [
  "U.S. Army",
  "U.S. Navy",
  "U.S. Marine Corps",
  "U.S. Air Force",
  "U.S. Space Force",
  "U.S. Coast Guard",
  "National Guard",
  "Police Department",
  "Sheriff's Office",
  "Fire Department",
  "EMS / Ambulance Service",
  "Federal Law Enforcement",
  "Other",
];

const MAX_FILE_BYTES = 8 * 1024 * 1024;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const inputClass =
  "w-full rounded-lg border border-stone bg-[#f4f7f5] px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-sage-deep focus:bg-white focus:shadow-[0_0_0_3px_rgba(50,118,87,.08)]";

export function HeroesDiscountForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", branch: "", status: "" });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setError("");
    if (file && file.size > MAX_FILE_BYTES) {
      setError("File is too large — please upload something under 8MB.");
      e.target.value = "";
      setProofFile(null);
      return;
    }
    setProofFile(file);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!proofFile) {
      setError("Please attach current proof of service.");
      return;
    }
    setSubmitting(true);
    try {
      const proofDataUrl = await readFileAsDataUrl(proofFile);
      const res = await fetch("/api/heroes-discount/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          proofFileName: proofFile.name,
          proofFileType: proofFile.type,
          proofFileDataUrl: proofDataUrl,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          res.status === 503
            ? "This program isn't accepting requests yet — check back soon."
            : data?.error || "Something went wrong submitting your request."
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
      <div className="rounded-xl border border-stone bg-[#f4f7f5] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-deep text-white">
          <i className="ri-checkbox-circle-line text-2xl" />
        </div>
        <p className="mt-4 font-display text-lg font-semibold text-charcoal">Application received</p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
          We verify every request by hand. If approved, your 25% lifetime benefit will be connected to <span className="font-medium text-charcoal">{form.email}</span> and apply automatically at checkout.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/60">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="William Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/60">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="william@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/60">Phone Number</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="+1 (555) 000-0000"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/60">Service Status</label>
          <select
            required
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            className={inputClass}
          >
            <option value="">Select status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/60">Branch / Agency</label>
          <select
            required
            value={form.branch}
            onChange={(e) => set("branch", e.target.value)}
            className={inputClass}
          >
            <option value="">Select branch</option>
            {BRANCH_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/60">
          Proof of Service <span className="text-copper normal-case tracking-normal">*</span>
        </label>
        <input
          type="file"
          required
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="w-full rounded-lg border border-stone bg-[#f4f7f5] px-4 py-2.5 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-sage-deep file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:text-white focus:border-sage-deep"
        />
        <p className="mt-1.5 text-[11px] text-charcoal/40">
          Military/veteran ID, DD-214, department credential, or uniform photo. Image or PDF, under 8MB. Cover any unrelated sensitive info.
        </p>
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <i className="ri-error-warning-line shrink-0 text-sm" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-sage-deep py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#0a4748] disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Apply for 25% Lifetime Access"}
      </button>

      <p className="text-center text-[11px] text-charcoal/40">
        Non-stackable · One benefit per person · No expiration
      </p>
    </form>
  );
}
