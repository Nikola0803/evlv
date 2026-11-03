import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

function validSignature(rawBody: string, timestamp: string, signature: string, secret: string) {
  if (!signature.startsWith("v1=")) return false;
  const provided = signature.slice(3);
  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`, "utf8").digest("hex");
  if (!/^[a-f0-9]+$/i.test(provided) || provided.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(provided, "hex"), Buffer.from(expected, "hex"));
}

export async function POST(request: Request) {
  const secret = process.env.NIFTIPAY_WEBHOOK_SECRET;
  const timestamp = request.headers.get("x-timestamp") || "";
  const signature = request.headers.get("x-signature") || "";
  const webhookId = request.headers.get("x-webhook-id") || "";
  const rawBody = await request.text();
  if (!secret || !timestamp || !signature) return NextResponse.json({ error: "Missing webhook signature configuration" }, { status: 401 });
  const numericTimestamp = Number(timestamp);
  if (!Number.isFinite(numericTimestamp) || Math.abs(Math.floor(Date.now() / 1000) - numericTimestamp) > 300) {
    return NextResponse.json({ error: "Webhook timestamp outside replay window" }, { status: 401 });
  }
  if (!validSignature(rawBody, timestamp, signature, secret)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as Record<string, unknown>;
  if (payload.event === "test") return NextResponse.json({ ok: true });
  if (!crmConfigured()) return NextResponse.json({ error: "CRM is not configured" }, { status: 503 });

  // The market-specific CRM brand owns deduplication and order-state transitions. It must
  // only fulfil on `paid`; browser return URLs are never payment authority.
  const result = await crmFetch("/api/store/payments/niftipay/webhook", {
    ...payload,
    webhookId,
    receivedAt: new Date().toISOString(),
  });
  if (!result.ok) return NextResponse.json({ error: "CRM rejected Niftipay event" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
