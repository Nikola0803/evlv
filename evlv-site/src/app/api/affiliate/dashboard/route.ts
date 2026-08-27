import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

// POST /api/affiliate/dashboard { token } — proxies to the CRM's
// /api/store/affiliate/dashboard, which resolves "whose stats" from the
// token server-side. Doesn't exist on the CRM yet — see AFFILIATE-PORTAL.md.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Affiliate dashboard isn't connected yet." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/affiliate/dashboard", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}
