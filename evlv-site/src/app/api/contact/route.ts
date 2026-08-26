import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

// POST /api/contact { name, email, phone?, subject, message }
// Proxies to the CRM's /api/forms/submit, which files this as a
// Conversation in the Support inbox (channel: CONTACT_FORM) so staff can
// see and reply to it from the CRM itself, not just a mailbox. Gated by
// CRM_CONTACT_FORM_KEY (a TrackingConfig.publicKey from the CRM, seeded in
// prisma/seed-evlv.ts's output) rather than CRM_ORG_API_KEY -- the CRM
// treats this endpoint as embeddable client-side, but this app proxies it
// server-side anyway so CRM_API_URL itself stays out of the browser bundle,
// matching every other /api/* route here.
export async function POST(req: Request) {
  if (!crmConfigured() || !process.env.CRM_CONTACT_FORM_KEY) {
    return NextResponse.json({ error: "Contact form isn't connected to the CRM yet." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/forms/submit", { ...body, publicKey: process.env.CRM_CONTACT_FORM_KEY });
  return NextResponse.json(data, { status: ok ? 200 : status });
}
