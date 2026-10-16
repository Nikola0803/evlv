import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { bodyWithServerSession, unauthorized } from "@/lib/server-session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!crmConfigured()) return NextResponse.json({ error: "Referrals are not connected yet." }, { status: 503 });
  const body = await bodyWithServerSession(req);
  if (!body) return unauthorized();
  const { ok, status, data } = await crmFetch("/api/store/account/referral", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}
