"use client";

import { useEffect, useState } from "react";
import { getStoredToken } from "@/lib/auth";

type ReferralData = {
  referralCode: string;
  referralLink: string;
  friendRewardCents: number;
  referrerRewardCents: number;
  availableStoreCreditCents: number;
  referrals: { id: string; status: "SIGNED_UP" | "ORDER_PENDING" | "REWARDED"; rewardCouponCode?: string | null }[];
};

export function ReferralPanel() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"link" | "code" | "">("");

  useEffect(() => {
    fetch("/api/account/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: getStoredToken() }),
    })
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body.error || "Referral details are temporarily unavailable.");
        setData(body);
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : "Referral details are temporarily unavailable."));
  }, []);

  async function copy(value: string, kind: "link" | "code") {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied(""), 1800);
  }

  if (error) return <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">{error}</div>;
  if (!data) return <div className="rounded-xl border border-stone bg-ivory-soft p-8 text-sm text-charcoal/50">Loading your personal referral link…</div>;

  const rewards = data.referrals.filter((item) => item.status === "REWARDED");
  const pending = data.referrals.length - rewards.length;
  const dollars = (cents: number) => `$${(cents / 100).toFixed(0)}`;

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-2xl bg-[#123B35] text-white shadow-[0_20px_60px_rgba(18,59,53,0.16)]">
        <div className="p-7 md:p-9">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#D3AD78]">Refer a fellow researcher</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">Give {dollars(data.friendRewardCents)}. Get {dollars(data.referrerRewardCents)}.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">They receive $15 toward their first qualifying purchase. After that order&rsquo;s payment is confirmed, your one-use $15 reward appears here.</p>
          <div className="mt-7 rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">Your personal link</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="min-w-0 flex-1 break-all font-mono text-sm font-bold text-white">{data.referralLink}</p>
              <button type="button" onClick={() => copy(data.referralLink, "link")} className="shrink-0 rounded-lg bg-[#D3AD78] px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-[#123B35] transition hover:bg-[#E0C08F]">{copied === "link" ? "Copied" : "Copy link"}</button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        {[{ label: "Store credit", value: dollars(data.availableStoreCreditCents) }, { label: "Friends joined", value: data.referrals.length }, { label: "Pending", value: pending }].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-stone bg-white p-5"><p className="text-2xl font-bold text-charcoal">{stat.value}</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal/45">{stat.label}</p></div>
        ))}
      </div>

      {rewards.length > 0 && <section className="rounded-xl border border-[#D3AD78]/50 bg-[#FAF8F2] p-6"><h3 className="text-sm font-bold text-charcoal">Available reward codes</h3><div className="mt-4 space-y-3">{rewards.filter((item) => item.rewardCouponCode).map((item) => <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg bg-white p-4 ring-1 ring-stone"><span className="font-mono text-sm font-bold tracking-wide text-[#123B35]">{item.rewardCouponCode}</span><button type="button" onClick={() => copy(item.rewardCouponCode!, "code")} className="text-xs font-bold uppercase tracking-wide text-copper">{copied === "code" ? "Copied" : "Copy"}</button></div>)}</div></section>}

      <p className="text-xs leading-5 text-charcoal/45">One reward per new customer. The friend must be a first-time purchaser. Referral rewards cannot be combined with another promotion unless checkout explicitly permits it.</p>
    </div>
  );
}
