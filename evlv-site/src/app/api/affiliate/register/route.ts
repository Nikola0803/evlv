import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

// POST /api/affiliate/register — proxies to the CRM's /api/store/affiliate/register.
// This CRM endpoint doesn't exist yet as of 2026-08 (peptides-crm-app's Affiliate
// model is currently admin-created only, no self-serve signup/auth) — see
// AFFILIATE-PORTAL.md for what needs to be built there. Until then this
// correctly 503s rather than pretending to work.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Affiliate signup isn't connected yet." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/affiliate/register", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}
