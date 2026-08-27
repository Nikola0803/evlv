"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredAffiliateUser, getStoredAffiliateToken, clearAffiliateAuth, type AffiliateUser } from "@/lib/affiliate-auth";

interface DashboardData {
  clicks30d: number;
  clicksTotal: number;
  salesConfirmed: number;
  salesPending: number;
  commissionAvailableCents: number;
  commissionPendingCents: number;
}

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function AffiliateDashboardPage() {
  const [user] = useState<AffiliateUser | null>(() => getStoredAffiliateUser());
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(() => !!getStoredAffiliateUser());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    const token = getStoredAffiliateToken();
    fetch("/api/affiliate/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body?.error || "Couldn't load your dashboard.");
        setData(body);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Couldn't load your dashboard."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const referralLink = user ? `https://evlvpeptides.com/?ref=${user.referralCode}` : "";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable, link is still visible to copy manually */
    }
  }

  function handleSignOut() {
    clearAffiliateAuth();
    window.location.href = "/affiliates/login";
  }

  if (!user) {
    return (
      <section className="bg-ivory-soft py-24 text-center md:py-36">
        <div className="mx-auto max-w-md px-4">
          <i className="ri-lock-line text-3xl text-charcoal/30" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-charcoal">Sign in required</h1>
          <p className="mt-2 text-sm text-charcoal/60">Sign in to your affiliate account to see your standing.</p>
          <Link
            href="/affiliates/login"
            className="mt-6 inline-block rounded-md bg-copper px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light"
          >
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory-soft py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Affiliate Portal</p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-charcoal">Welcome back, {user.name}.</h1>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-md border border-charcoal px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-ivory"
          >
            Sign Out
          </button>
        </div>

        <div className="mb-8 rounded-lg border border-stone bg-white p-6">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">Your Referral Link</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="flex-1 truncate rounded-md bg-ivory px-4 py-2.5 text-sm text-charcoal">{referralLink}</code>
            <button
              type="button"
              onClick={copyLink}
              className="shrink-0 rounded-md bg-copper px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light"
            >
              {copied ? "Copied" : "Copy Link"}
            </button>
          </div>
        </div>

        {loading && <p className="text-sm text-charcoal/50">Loading your standing…</p>}

        {!loading && error && (
          <div className="rounded-lg border border-stone bg-white p-8 text-center">
            <i className="ri-information-line text-2xl text-charcoal/30" />
            <p className="mt-3 font-display text-lg font-semibold text-charcoal">Dashboard not available yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-charcoal/60">{error}</p>
          </div>
        )}

        {!loading && !error && data && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <StatCard label="Clicks (30d)" value={String(data.clicks30d)} />
            <StatCard label="Total Clicks" value={String(data.clicksTotal)} />
            <StatCard label="Confirmed Sales" value={String(data.salesConfirmed)} />
            <StatCard label="Pending Sales" value={String(data.salesPending)} />
            <StatCard label="Available Commission" value={money(data.commissionAvailableCents)} accent />
            <StatCard label="Pending Commission" value={money(data.commissionPendingCents)} />
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-stone bg-white p-6">
      <p className={`font-display text-2xl font-semibold ${accent ? "text-copper" : "text-charcoal"}`}>{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal/50">{label}</p>
    </div>
  );
}
