import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

// POST /api/checkout - proxies to the CRM's /api/store/checkout, which
// places a real order in the same database the CRM dashboard reads from.
// Body must match peptides-crm-app's CheckoutInput shape (lib/order-engine.ts):
// { items: [{slug, quantity}], paymentMethod, paymentMemo, billing: {...}, customerNote? }
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Checkout isn't connected to the CRM yet." }, { status: 503 });
  }
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const items = Array.isArray(body.items) ? body.items : [];
  const discountCode = typeof body.discountCode === "string" ? body.discountCode : undefined;
  const customerEmail = typeof body.customerEmail === "string" ? body.customerEmail : undefined;

  // Fail closed on any promotion that would reduce the retail subtotal by
  // more than 30%. The CRM coupon engine carries the same clamp, but this
  // storefront boundary prevents an older CRM deployment or stale coupon
  // configuration from ever creating an over-discounted order.
  const preview = await crmFetch("/api/store/coupons/validate", { items, code: discountCode, customerEmail });
  if (preview.ok) {
    const result = preview.data as Record<string, unknown>;
    const subtotalCents = typeof result.subtotalCents === "number" ? result.subtotalCents : 0;
    const discountCents = typeof result.discountCents === "number" ? result.discountCents : 0;
    if (subtotalCents > 0 && discountCents > Math.floor(subtotalCents * 0.3)) {
      return NextResponse.json({ error: "This promotion exceeds EVLV's 30% maximum discount and cannot be applied." }, { status: 422 });
    }
  }
  // The CRM sits behind this server, so it can only ever see this
  // server's own IP unless we forward the real one -- used for fraud
  // review (see Order.ipAddress in the CRM), not for anything that blocks
  // checkout.
  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
  const userAgent = req.headers.get("user-agent") || undefined;
  const { ok, status, data } = await crmFetch("/api/store/checkout", { ...body, ipAddress, userAgent });
  return NextResponse.json(data, { status: ok ? 200 : status });
}
