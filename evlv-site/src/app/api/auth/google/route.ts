import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

interface GoogleTokenInfo {
  sub: string;
  email: string;
  email_verified: string;
  name?: string;
  given_name?: string;
  picture?: string;
  aud: string;
  iss: string;
  exp: string;
  error_description?: string;
}

async function verifyGoogleToken(credential: string): Promise<GoogleTokenInfo | null> {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) return null;

  const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
  if (!res.ok) return null;

  const info = await res.json() as GoogleTokenInfo;
  if (info.error_description) return null;
  if (info.aud !== clientId) return null;
  if (info.email_verified !== "true") return null;

  return info;
}

// Derives a stable password for Google OAuth accounts in the CRM.
// Not user-typeable — Google users always authenticate through Google.
function derivedPassword(sub: string) {
  return `gauth:${sub}:evlv`;
}

// POST /api/auth/google { credential: string }
// Verifies the Google ID token, then finds or creates a CRM account.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json(
      { error: "Auth not configured. Set CRM_API_URL / CRM_ORG_API_KEY / CRM_STORE_DOMAIN." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => ({})) as { credential?: string };
  if (!body.credential) {
    return NextResponse.json({ error: "Missing Google credential." }, { status: 400 });
  }

  const info = await verifyGoogleToken(body.credential);
  if (!info) {
    return NextResponse.json({ error: "Invalid Google credential." }, { status: 401 });
  }

  const { email, name, given_name, sub } = info;
  const password = derivedPassword(sub);
  const username = given_name ?? name ?? email.split("@")[0];

  // Try sign-in first (returning Google user)
  const loginResult = await crmFetch("/api/store/auth/login", { email, password });
  if (loginResult.ok) {
    return NextResponse.json(loginResult.data, { status: 200 });
  }

  // Not found — create account
  const registerResult = await crmFetch("/api/store/auth/register", {
    email,
    password,
    username,
    name: name ?? username,
    marketingOptIn: true,
    googleAuth: true,
  });

  if (!registerResult.ok) {
    // If the email already exists with a different password, let the client know
    const errMsg = (registerResult.data as Record<string, unknown>)?.error ?? (registerResult.data as Record<string, unknown>)?.message;
    if (String(errMsg).toLowerCase().includes("exist") || registerResult.status === 409) {
      return NextResponse.json(
        { error: "An account with this email already exists. Sign in with your email and password instead.", code: "email_exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(registerResult.data, { status: registerResult.status });
  }

  // After register, sign in to get a token (same pattern as AccountAccess.tsx)
  const postRegisterLogin = await crmFetch("/api/store/auth/login", { email, password });
  if (postRegisterLogin.ok) {
    return NextResponse.json(postRegisterLogin.data, { status: 200 });
  }

  return NextResponse.json(registerResult.data, { status: 200 });
}
