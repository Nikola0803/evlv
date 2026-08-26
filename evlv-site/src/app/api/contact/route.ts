import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

// POST /api/contact { contactEmail, subject, message, orderRef? }
// Proxies to the CRM's /api/store/support, landing as a real SupportTicket
// visible in the CRM's Support admin instead of going nowhere.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Contact form isn't connected to the CRM yet." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/support", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}
