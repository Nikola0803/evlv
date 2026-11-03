import "server-only";

import { createHash } from "node:crypto";

const DEFAULT_BASE_URL = "https://www.niftipay.com";

export function niftipayConfigured() {
  const authenticationConfigured = Boolean(
    process.env.NIFTIPAY_API_KEY ||
      (process.env.NIFTIPAY_CLIENT_ID && process.env.NIFTIPAY_CLIENT_SECRET),
  );
  return Boolean(
    authenticationConfigured &&
      process.env.NIFTIPAY_CUSTOMER_ID &&
      process.env.NIFTIPAY_INTEGRATION_ID,
  );
}

async function getAccessToken(baseUrl: string) {
  // Niftipay may provision a ready-made JWT. In that case it is already the
  // Bearer token and must not be sent as an x-api-key header.
  if (process.env.NIFTIPAY_API_KEY) return process.env.NIFTIPAY_API_KEY;

  const clientId = process.env.NIFTIPAY_CLIENT_ID;
  const clientSecret = process.env.NIFTIPAY_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("Niftipay authentication is not configured.");

  const response = await fetch(`${baseUrl}/api/oauth/token`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "payments:create",
    }),
    signal: AbortSignal.timeout(20_000),
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  const data = payload.data && typeof payload.data === "object" ? payload.data as Record<string, unknown> : {};
  const token = typeof data.access_token === "string" ? data.access_token : undefined;
  if (!response.ok || !token) {
    const message = typeof payload.message === "string" ? payload.message : "Niftipay authentication failed.";
    throw new Error(message);
  }
  return token;
}

function idempotencyUuid(reference: string) {
  const bytes = Buffer.from(createHash("sha256").update(reference).digest().subarray(0, 16));
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export async function createNiftipayFiatOrder(input: {
  amountCents: number;
  reference: string;
  description: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
}) {
  const baseUrl = process.env.NIFTIPAY_BASE_URL || DEFAULT_BASE_URL;
  const customerId = process.env.NIFTIPAY_CUSTOMER_ID;
  const integrationId = process.env.NIFTIPAY_INTEGRATION_ID;
  if (!customerId || !integrationId) throw new Error("Niftipay is not configured for this deployment.");
  if (!Number.isInteger(input.amountCents) || input.amountCents <= 0) throw new Error("Invalid Niftipay order total.");
  const accessToken = await getAccessToken(baseUrl);

  const response = await fetch(`${baseUrl}/api/v1/partner/customers/${encodeURIComponent(customerId)}/fiat-orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Idempotency-Key": idempotencyUuid(input.reference),
    },
    body: JSON.stringify({
      integration_id: integrationId,
      amount_cents: input.amountCents,
      currency: "AUD",
      reference: input.reference,
      description: input.description,
      return_url: "https://www.evlvpeptides.com.au/payment-return",
      failure_url: "https://www.evlvpeptides.com.au/payment-failed",
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      phone: input.phone,
      country: input.country || "AU",
    }),
    signal: AbortSignal.timeout(20_000),
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  const data = payload.data && typeof payload.data === "object" ? payload.data as Record<string, unknown> : {};
  const error = payload.error && typeof payload.error === "object" ? payload.error as Record<string, unknown> : {};
  if (!response.ok) {
    const message = typeof error.message === "string"
      ? error.message
      : typeof payload.message === "string" ? payload.message : "Niftipay could not create the payment session.";
    throw new Error(message);
  }
  const payUrl = typeof data.pay_url === "string" ? data.pay_url : undefined;
  const order = data.fiat_order && typeof data.fiat_order === "object" ? data.fiat_order as Record<string, unknown> : undefined;
  if (!payUrl || !order) throw new Error("Niftipay returned an incomplete payment session.");
  return { payUrl, orderId: String(order.order_id ?? ""), orderKey: String(order.order_key ?? "") };
}
