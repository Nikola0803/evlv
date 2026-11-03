import "server-only";

const DEFAULT_BASE_URL = "https://www.niftipay.com";

export function niftipayConfigured() {
  return Boolean(process.env.NIFTIPAY_API_KEY && process.env.NIFTIPAY_INTEGRATION_ID);
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
  const apiKey = process.env.NIFTIPAY_API_KEY;
  const integrationId = process.env.NIFTIPAY_INTEGRATION_ID;
  if (!apiKey || !integrationId) throw new Error("Niftipay is not configured for this deployment.");
  if (!Number.isInteger(input.amountCents) || input.amountCents <= 0) throw new Error("Invalid Niftipay order total.");

  let response: Response;
  try {
    response = await fetch(`${process.env.NIFTIPAY_BASE_URL || DEFAULT_BASE_URL}/api/fiat/orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "Idempotency-Key": input.reference,
      },
      body: JSON.stringify({
        integrationId,
        amountCents: input.amountCents,
        currency: "AUD",
        reference: input.reference,
        description: input.description,
        serviceFeePayer: process.env.NIFTIPAY_SERVICE_FEE_PAYER === "customer" ? "customer" : "merchant",
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        country: input.country || "AU",
      }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) {
      throw new Error("Niftipay did not respond within 8 seconds. Please try again shortly.");
    }
    throw error;
  }
  const responseText = await response.text();
  const data = (() => {
    try {
      return JSON.parse(responseText) as Record<string, unknown>;
    } catch {
      return {} as Record<string, unknown>;
    }
  })();
  if (!response.ok) {
    const details = typeof data.details === "string" ? data.details : undefined;
    const message = typeof data.error === "string" ? data.error : details;
    throw new Error(message || `Niftipay returned HTTP ${response.status}.`);
  }
  const payUrl = typeof data.payUrl === "string" ? data.payUrl : undefined;
  const order = data.order && typeof data.order === "object" ? data.order as Record<string, unknown> : undefined;
  if (!payUrl || !order) throw new Error("Niftipay returned an incomplete payment session.");
  return { payUrl, orderId: String(order.id ?? ""), orderKey: String(order.orderKey ?? "") };
}
