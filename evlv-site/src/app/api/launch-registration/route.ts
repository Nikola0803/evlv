import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LaunchRegistration = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  source?: unknown;
};

export async function POST(req: Request) {
  const publicKey = process.env.CRM_CONTACT_FORM_KEY;
  const crmUrl = process.env.CRM_API_URL;
  if (!crmUrl || !publicKey) {
    return NextResponse.json({ error: "Launch registration is temporarily unavailable." }, { status: 503 });
  }

  const body = (await req.json().catch(() => ({}))) as LaunchRegistration;
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 200) : "/";

  if (!name || name.length > 120 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || phone.length > 50) {
    return NextResponse.json({ error: "Please enter a valid name and email address." }, { status: 400 });
  }

  const message = [
    "EVLV Today launch-call pre-registration.",
    phone ? `Phone: ${phone}` : "Phone: not provided",
    `Signup page: ${source}`,
    "Marketing consent: yes",
  ].join("\n");

  try {
    const response = await fetch(`${crmUrl}/api/forms/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        publicKey,
        name,
        email,
        subject: "EVLV Today — launch call pre-registration",
        message,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json({ error: data?.error || "The CRM could not save this registration." }, { status: response.status });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The CRM could not be reached. Please try again." }, { status: 502 });
  }
}
