import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (body.website) return NextResponse.json({ ok: true });
  if (!EMAIL_PATTERN.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (body.consent !== true) return NextResponse.json({ error: "Newsletter consent is required to unlock the guide." }, { status: 400 });
  if (!crmConfigured()) return NextResponse.json({ error: "Guide access isn't connected yet. Please try again later." }, { status: 503 });

  const { ok, status, data } = await crmFetch("/api/store/newsletter", {
    email,
    source: "evlv_research_guide",
    marketingOptIn: true,
  });
  if (!ok) return NextResponse.json(data, { status });

  const response = NextResponse.json({ ok: true });
  response.cookies.set("evlv_guide_access", "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/api/research-guide",
  });
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}
