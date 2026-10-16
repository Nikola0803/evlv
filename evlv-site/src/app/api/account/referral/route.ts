import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!crmConfigured()) return NextResponse.json({ error: "Referrals are not connected yet." }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  if (!body || typeof body.token !== "string" || !body.token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { ok, status, data } = await crmFetch("/api/store/account/referral", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}
