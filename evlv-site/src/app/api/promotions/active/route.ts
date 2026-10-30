import { NextResponse } from "next/server";
import { crmConfigured, crmGet } from "@/lib/crm-proxy";

export const dynamic = "force-dynamic";

const HALLOWEEN_STARTS_AT = "2026-10-26T06:00:00.000Z";
const HALLOWEEN_ENDS_AT = "2026-11-02T08:00:00.000Z";

function forcedHalloweenCampaign() {
  const now = Date.now();
  const live = now >= new Date(HALLOWEEN_STARTS_AT).getTime() && now < new Date(HALLOWEEN_ENDS_AT).getTime();
  return {
    halloween: {
      live,
      themeActive: live,
      startsAt: HALLOWEEN_STARTS_AT,
      endsAt: HALLOWEEN_ENDS_AT,
      freeShippingThresholdCents: 30000,
      promotionId: "HALLOWEEN_BOGO_2026",
      headline: "Buy one, get one free",
      detail: "Buy any two, the cheaper one is free. No pair limit.",
    },
  };
}

export async function GET() {
  const forced = forcedHalloweenCampaign();
  if (forced.halloween.live || !crmConfigured()) return NextResponse.json(forced);
  const result = await crmGet("/api/store/promotions/active", { revalidate: 0 });
  return NextResponse.json(result.data ?? { halloween: { live: false, themeActive: false } }, { status: result.ok ? 200 : result.status });
}
