import "server-only";
import crypto from "crypto";

export type GoogleHandoff = {
  token: string;
  email: string;
  username: string;
  user_id: string;
};

const FIVE_MINUTES = 60 * 5;

export function googleOAuthConfigured() {
  return Boolean(process.env.GOOGLE_OAUTH_CLIENT_ID && process.env.GOOGLE_OAUTH_CLIENT_SECRET);
}

export function safeReturnTo(value: string | null | undefined, fallback = "/account") {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

export function handoffSecret() {
  const secret = process.env.GOOGLE_OAUTH_HANDOFF_SECRET;
  if (!secret || secret.length < 32) throw new Error("GOOGLE_OAUTH_HANDOFF_SECRET must be set to a long random value");
  return secret;
}

export function createHandoff(payload: GoogleHandoff) {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + FIVE_MINUTES })).toString("base64url");
  const signature = crypto.createHmac("sha256", handoffSecret()).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function readHandoff(value: string | undefined): GoogleHandoff | null {
  if (!value) return null;
  const [body, signature] = value.split(".");
  if (!body || !signature) return null;
  const expected = crypto.createHmac("sha256", handoffSecret()).update(body).digest("base64url");
  const actual = Buffer.from(signature);
  const known = Buffer.from(expected);
  if (actual.length !== known.length || !crypto.timingSafeEqual(actual, known)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (typeof parsed?.exp !== "number" || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    if (![parsed.token, parsed.email, parsed.username, parsed.user_id].every((value) => typeof value === "string" && value.length > 0)) return null;
    return { token: parsed.token, email: parsed.email, username: parsed.username, user_id: parsed.user_id };
  } catch {
    return null;
  }
}

export function cookieSecure(url: string) {
  return new URL(url).protocol === "https:";
}
