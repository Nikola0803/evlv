"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredUser, setPlan, type AuthUser, type Plan } from "@/lib/auth";

const TIERS: { key: Plan | "admin"; label: string; price: string; body: string; features: string[] }[] = [
  {
    key: "standard",
    label: "Standard",
    price: "Free to join",
    body: "Full access to the shop, everything except member-exclusive blends.",
    features: ["All standard research compounds", "Standard pricing", "Full order history & account tools"],
  },
  {
    key: "member",
    label: "Member",
    price: "Coming soon",
    body: "Unlocks member-exclusive research blends, plus member pricing once billing is live.",
    features: ["Everything in Standard", "Member-exclusive blends (Wolverine Stack, GLOW, KLOW)", "Member pricing (coming soon)"],
  },
  {
    key: "admin",
    label: "Admin-Granted",
    price: "—",
    body: "Access granted manually on your profile. Ask us if you think you qualify.",
    features: ["For institutional & bulk buyers", "Granted case-by-case by our team", "Contact us to be considered"],
  },
];

export default function PlansPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    setMounted(true);
  }, []);

  function handleSelectMember() {
    setPlan("member");
    setUser(getStoredUser());
  }

  if (!mounted) return null;

  return (
    <>
      <section className="bg-sage-deep py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-[700px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-light">Plans</p>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">Choose your access.</h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Purchase a plan for member pricing and access to member-exclusive blends, or ask us to grant access
            manually on your profile.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-4 md:px-8">
          {!user && (
            <div className="mb-8 rounded-lg border border-dashed border-stone bg-ivory-soft p-4 text-center text-sm text-charcoal/50">
              You&rsquo;re browsing as a guest, sign in to select a plan.
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((tier) => {
              const isCurrent = user && (user.plan ?? "standard") === tier.key;
              return (
                <div key={tier.key} className={`flex flex-col rounded-lg border p-6 ${isCurrent ? "border-copper bg-copper/5" : "border-stone bg-white"}`}>
                  {isCurrent && (
                    <span className="mb-3 w-fit rounded-full bg-copper px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-charcoal">
                      Current Plan
                    </span>
                  )}
                  <h2 className="font-display text-xl font-semibold text-charcoal">{tier.label}</h2>
                  <p className="mt-1 text-sm font-medium text-copper">{tier.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{tier.body}</p>

                  <ul className="mt-5 flex-1 space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-charcoal/60">
                        <i className="ri-checkbox-circle-line mt-0.5 text-copper" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    {tier.key === "standard" && (
                      <button
                        disabled
                        className="w-full cursor-default rounded-md border border-stone py-3 text-[11px] font-semibold uppercase tracking-wide text-charcoal/40"
                      >
                        {user ? "Included" : "Default Plan"}
                      </button>
                    )}
                    {tier.key === "member" &&
                      (user ? (
                        <button
                          type="button"
                          onClick={handleSelectMember}
                          disabled={!!isCurrent}
                          className="w-full rounded-md bg-copper py-3 text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light disabled:cursor-default disabled:opacity-50"
                        >
                          {isCurrent ? "Active" : "Unlock Membership"}
                        </button>
                      ) : (
                        <Link href="/" className="block w-full rounded-md bg-copper py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light">
                          Sign In to Join
                        </Link>
                      ))}
                    {tier.key === "admin" && (
                      <Link
                        href="/contact"
                        className="block w-full rounded-md border border-charcoal py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-ivory"
                      >
                        Contact Us
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {user && (
            <p className="mt-8 text-center text-xs text-charcoal/40">
              Member billing isn&rsquo;t live yet, selecting Member unlocks access now as a preview so you can see how
              it works. No charge.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
