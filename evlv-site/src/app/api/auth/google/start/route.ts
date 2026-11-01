import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { cookieSecure, googleOAuthConfigured, safeReturnTo } from "@/lib/google-oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  if (!googleOAuthConfigured()) {
    return NextResponse.redirect(new URL("/account?google_error=not_configured", origin));
  }

  const state = crypto.randomBytes(32).toString("base64url");
  const returnTo = safeReturnTo(request.nextUrl.searchParams.get("returnTo"), "/account");
  const redirectUri = `${origin}/api/auth/google/callback`;
  const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authorizationUrl.searchParams.set("client_id", process.env.GOOGLE_OAUTH_CLIENT_ID!);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("scope", "openid email profile");
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(authorizationUrl);
  const secure = cookieSecure(origin);
  response.cookies.set("evlv_google_oauth_state", state, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 600 });
  response.cookies.set("evlv_google_oauth_return", returnTo, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 600 });
  return response;
}
