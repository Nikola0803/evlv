import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

// POST /api/heroes-discount/request { name, email, status, branch, proofFileName,
// proofFileType, proofFileDataUrl } - proxies to the CRM's
// /api/store/heroes-discount/request. Manually reviewed, like the affiliate
// program: reviewer checks the attached proof of service or medical
// employment before approving. The CRM then assigns a personal,
// non-stackable lifetime 25%-off coupon to the verified contact/account.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "This program isn't connected yet." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/heroes-discount/request", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}
