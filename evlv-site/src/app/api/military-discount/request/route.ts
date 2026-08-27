import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

// POST /api/military-discount/request { name, email, status, branch } — proxies
// to the CRM's /api/store/military-discount/request. Manually reviewed, like
// the affiliate program: on approval the CRM issues a personal, single-use
// 20%-off Coupon (PERCENT, amount: 20) and emails the code — reuses the same
// Coupon model checkout already validates against, no new discount mechanism
// needed. Non-stackable is inherent: checkout only ever reads one couponCode
// field, so this can never combine with another code. Doesn't exist on the
// CRM yet — needs a Coupon row created per approved request, plus the same
// "no transactional email" gap flagged in REFERRAL-PROGRAM.md /
// AFFILIATE-PORTAL.md (one email provider decision covers all three).
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "This program isn't connected yet." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/military-discount/request", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}
