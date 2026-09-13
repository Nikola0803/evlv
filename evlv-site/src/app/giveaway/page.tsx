import { Metadata } from "next";
import { getGiveawayStatus } from "@/lib/deal-and-giveaway";
import { GiveawayEntryForm } from "./GiveawayEntryForm";

export const metadata: Metadata = {
  title: "Giveaway | EVLV",
  description: "Enter EVLV's giveaway for a chance to win -- free entry, no purchase necessary.",
};

const DEFAULT_RULES =
  "No purchase necessary to enter or win. One free entry per person per day via this page. Placing a qualifying order today also earns one automatic entry -- purchasing does not increase your odds of winning beyond that one entry. Winner is selected at random from that day's entries. Void where prohibited.";

export default async function GiveawayPage() {
  const giveaway = await getGiveawayStatus();
  const isLive = Boolean(giveaway && giveaway.enabled);

  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Giveaway</p>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">
            {isLive && giveaway?.prizeLabel ? `Win ${giveaway.prizeLabel}` : "Today's Giveaway"}
          </h1>
          {isLive && typeof giveaway?.entryCount === "number" && (
            <p className="mt-4 text-sm text-white/60">{giveaway.entryCount} entered today</p>
          )}
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-28">
        <div className="mx-auto max-w-[560px] px-4 md:px-8">
          {isLive ? (
            <>
              <GiveawayEntryForm />
              <div className="mt-8 rounded-lg border border-stone bg-ivory-soft p-6">
                <h3 className="mb-2 font-display text-base font-semibold text-charcoal">Official Rules</h3>
                <p className="whitespace-pre-line text-xs leading-relaxed text-charcoal/60">
                  {giveaway?.rulesText?.trim() || DEFAULT_RULES}
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-stone bg-white p-8 text-center">
              <p className="font-display text-lg font-semibold text-charcoal">No giveaway running right now</p>
              <p className="mt-2 text-sm text-charcoal/60">
                Check back soon -- we run these periodically and announce them on the homepage.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
