import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

// POST /api/affiliate/login { email, password } — proxies to the CRM's
// /api/store/affiliate/login. Doesn't exist on the CRM yet — see
// AFFILIATE-PORTAL.md.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Affiliate sign-in isn't connected yet." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/affiliate/login", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}
