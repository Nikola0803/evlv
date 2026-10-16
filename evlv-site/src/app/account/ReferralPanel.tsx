"use client";

import { useEffect, useState } from "react";
import { getStoredToken } from "@/lib/auth";

interface ReferralData {
  referralCode: string;
  successfulReferrals: number;
  referrerBonusCents: number;
  refereeBonusCents: number;
}

export function ReferralPanel() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) { setError("Not authenticated"); setLoading(false); return; }

    fetch("/api/referral/my-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("Failed to load referral data"))
      .finally(() => setLoading(false));
  }, []);

  const referralLink = data ? `https://www.evlvpeptides.com/r/${data.referralCode}` : "";
  const bonusDollars = data ? Math.round(data.referrerBonusCents / 100) : 15;
  const refereeDollars = data ? Math.round(data.refereeBonusCents / 100) : 15;

  function handleCopy() {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">Referral Program</h2>

      <div className="rounded-lg border border-stone bg-ivory-soft p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-deep/10">
            <i className="ri-gift-line text-lg text-sage-deep" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-charcoal">Give ${refereeDollars}, Get ${bonusDollars}</h3>
            <p className="mt-1 text-sm leading-relaxed text-charcoal/55">
              Share your link with a friend. When they place their first order, you both receive ${bonusDollars} store credit applied automatically at checkout.
            </p>
          </div>
        </div>

        {loading && (
          <div className="mt-6 flex items-center gap-2 text-sm text-charcoal/40">
            <i className="ri-loader-4-line animate-spin" /> Loading your referral link…
          </div>
        )}

        {!loading && error && (
          <div className="mt-6 flex items-center gap-2 rounded-md bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
            <i className="ri-error-warning-line" /> {error}
          </div>
        )}

        {!loading && data && (
          <>
            <div className="mt-6">
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-charcoal/50">Your Referral Link</label>
              <div className="flex items-stretch overflow-hidden rounded-md border border-stone bg-white">
                <span className="flex-1 truncate px-4 py-3 font-mono text-sm text-charcoal/70">{referralLink}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`flex shrink-0 items-center gap-1.5 border-l border-stone px-4 text-[11px] font-semibold uppercase tracking-wide transition ${
                    copied ? "bg-sage-mist text-sage-deep" : "text-charcoal hover:bg-ivory"
                  }`}
                >
                  <i className={copied ? "ri-check-line" : "ri-file-copy-line"} />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-stone bg-white p-4 text-center">
                <p className="font-display text-3xl font-semibold text-charcoal">{data.successfulReferrals}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-charcoal/40">Successful Referrals</p>
              </div>
              <div className="rounded-lg border border-stone bg-white p-4 text-center">
                <p className="font-display text-3xl font-semibold text-charcoal">${data.successfulReferrals * bonusDollars}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-charcoal/40">Total Earned</p>
              </div>
            </div>

            <div className="mt-4 rounded-md bg-sage-mist/60 px-4 py-3 text-xs text-sage-deep">
              <i className="ri-information-line mr-1.5" />
              Credit is issued after your friend&rsquo;s first order ships. Each credit applies automatically — no code needed.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
