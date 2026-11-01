import { NextRequest, NextResponse } from "next/server";
import { readHandoff } from "@/lib/google-oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Exchanges the short-lived, HttpOnly callback handoff for the same session
// payload the existing client-side account code already expects. The CRM token
// never appears in a query string or a third-party redirect URL.
export async function POST(request: NextRequest) {
  const handoff = readHandoff(request.cookies.get("evlv_google_oauth_handoff")?.value);
  const response = handoff
    ? NextResponse.json(handoff)
    : NextResponse.json({ error: "Google sign-in session expired. Please try again." }, { status: 401 });
  response.cookies.delete("evlv_google_oauth_handoff");
  return response;
}
