import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

// POST /api/coupons/validate - proxies to the CRM's own
// /api/store/coupons/validate: a dry-run preview of exactly what a coupon
// code would discount, using the same resolveCoupons()/evaluateCoupons()
// logic runCheckout() uses for the real order (including the wholesale-
// margin floor), so the number shown here is never wrong at checkout.
// Body: { items: [{slug, quantity}], code }.
export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ valid: false, discountCents: 0, errors: [{ code: "", reason: "Store not connected" }] });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/coupons/validate", body);
  const result = data as Record<string, unknown>;
  const subtotalCents = typeof result.subtotalCents === "number" ? result.subtotalCents : 0;
  const discountCents = typeof result.discountCents === "number" ? result.discountCents : 0;
  const maximumDiscountCents = Math.floor(subtotalCents * 0.3);
  if (ok && subtotalCents > 0 && discountCents > maximumDiscountCents) {
    const existingErrors = Array.isArray(result.errors) ? result.errors : [];
    return NextResponse.json({
      ...result,
      valid: false,
      discountCents: 0,
      totalCents: subtotalCents,
      cappedByStore: true,
      errors: [...existingErrors, { code: String((body as Record<string, unknown>).code ?? ""), reason: "Discount exceeds the 30% store maximum." }],
    });
  }
  return NextResponse.json(data, { status: ok ? 200 : status });
}
