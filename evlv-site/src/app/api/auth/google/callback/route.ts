import { NextRequest, NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { cookieSecure, createHandoff, googleOAuthConfigured, safeReturnTo } from "@/lib/google-oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GoogleTokenResponse = { id_token?: string; error?: string; error_description?: string };
type GoogleIdentity = { aud?: string; email?: string; email_verified?: string | boolean; name?: string; iss?: string; exp?: string };

function failure(request: NextRequest, code: string) {
  const response = NextResponse.redirect(new URL(`/account?google_error=${encodeURIComponent(code)}`, request.nextUrl.origin));
  response.cookies.delete("evlv_google_oauth_state");
  response.cookies.delete("evlv_google_oauth_return");
  return response;
}

export async function GET(request: NextRequest) {
  if (!googleOAuthConfigured() || !crmConfigured()) return failure(request, "not_configured");
  const returnedState = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("evlv_google_oauth_state")?.value;
  const returnTo = safeReturnTo(request.cookies.get("evlv_google_oauth_return")?.value, "/account");
  const code = request.nextUrl.searchParams.get("code");
  if (!code || !returnedState || !expectedState || returnedState !== expectedState) return failure(request, "state_mismatch");

  try {
    const redirectUri = `${request.nextUrl.origin}/api/auth/google/callback`;
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });
    const token = (await tokenResponse.json()) as GoogleTokenResponse;
    if (!tokenResponse.ok || !token.id_token) return failure(request, "token_exchange");

    const identityResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token.id_token)}`, { cache: "no-store" });
    const identity = (await identityResponse.json()) as GoogleIdentity;
    const validIssuer = identity.iss === "accounts.google.com" || identity.iss === "https://accounts.google.com";
    const isVerified = identity.email_verified === true || identity.email_verified === "true";
    const unexpired = Number(identity.exp ?? 0) > Math.floor(Date.now() / 1000);
    if (!identityResponse.ok || !validIssuer || !isVerified || !unexpired || identity.aud !== process.env.GOOGLE_OAUTH_CLIENT_ID || !identity.email) {
      return failure(request, "identity_verification");
    }

    const { ok, data } = await crmFetch("/api/store/auth/google", { email: identity.email, name: identity.name });
    if (!ok || typeof data?.token !== "string" || typeof data?.user_id !== "string") return failure(request, "account_linking");

    const response = NextResponse.redirect(new URL(`/account?google=1&returnTo=${encodeURIComponent(returnTo)}`, request.nextUrl.origin));
    response.cookies.delete("evlv_google_oauth_state");
    response.cookies.delete("evlv_google_oauth_return");
    response.cookies.set("evlv_google_oauth_handoff", createHandoff({ token: data.token, email: data.email, username: data.username, user_id: data.user_id }), {
      httpOnly: true,
      secure: cookieSecure(request.nextUrl.origin),
      sameSite: "lax",
      path: "/",
      maxAge: 300,
    });
    return response;
  } catch {
    return failure(request, "service_unavailable");
  }
}
