"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveAffiliateAuth } from "@/lib/affiliate-auth";

export default function AffiliateLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/affiliate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          res.status === 503
            ? "The affiliate portal isn't live yet — check back soon."
            : data?.error || "Sign-in failed. Check your email and password."
        );
      }
      saveAffiliateAuth(data);
      router.push("/affiliates/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-ivory-soft py-20 md:py-32">
      <div className="mx-auto max-w-[440px] px-4 md:px-8">
        <div className="mb-8 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Affiliate Portal</p>
          <h1 className="font-display text-3xl font-semibold text-charcoal">Sign in</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-stone bg-white p-6 md:p-8">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-charcoal">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none focus:border-copper"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-charcoal">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-stone bg-ivory px-4 py-2.5 text-sm outline-none focus:border-copper"
            />
          </div>

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
            {submitting ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-xs text-charcoal/50">
            Not an affiliate yet?{" "}
            <Link href="/affiliates#apply" className="text-copper hover:underline">
              Apply here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
