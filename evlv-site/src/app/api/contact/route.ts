import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/contact { name, email, subject, message }
 * Proxies to the CRM's /api/forms/submit, which creates a real Conversation
 * (channel: CONTACT_FORM) visible in the CRM's Support inbox. That endpoint
 * authenticates with a per-brand `publicKey` (from TrackingConfig, the same
 * key the tracking pixel uses) rather than the x-store-domain/x-store-api-key
 * pair the rest of this proxy uses -- see peptide-saas's
 * src/app/api/forms/submit/route.ts.
 */
export async function POST(req: Request) {
  const publicKey = process.env.CRM_CONTACT_FORM_KEY;
  if (!process.env.CRM_API_URL || !publicKey) {
    return NextResponse.json({ error: "Contact form isn't connected to the CRM yet." }, { status: 503 });
  }
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "au-redesign-contact";

  if (!name || name.length > 100 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || !subject || subject.length > 100 || !message || message.length > 2000) {
    return NextResponse.json({ error: "Please check your name, email, subject and message." }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.CRM_API_URL}/api/forms/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicKey, name, email, subject, message, source }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.ok ? 200 : res.status });
  } catch (error) {
    console.error("[contact] CRM request failed", error);
    return NextResponse.json({ error: "The message service is temporarily unavailable. Please try again." }, { status: 502 });
  }
}
