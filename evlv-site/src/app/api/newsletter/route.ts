import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { upsertContact } from "@/lib/omnisend-server";

export const runtime = "nodejs";

// POST /api/newsletter { email, source? } - proxies to the CRM's /api/store/newsletter,
// which saves to the CRM's own Contact table (always) and pushes to
// Mailchimp best-effort. On CRM success, also upserts to Omnisend.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Newsletter signup isn't connected to the CRM yet." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/newsletter", body);
  if (ok && body.email) {
    void upsertContact({
      email: body.email as string,
      subscribed: true,
      consentTimestamp: new Date().toISOString(),
      tags: [(body.source as string | undefined) ?? "footer-subscriber"],
    }).catch(() => undefined);
  }
  return NextResponse.json(data, { status: ok ? 200 : status });
}
