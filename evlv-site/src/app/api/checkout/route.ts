import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { getMarket } from "@/lib/market";
import { createNiftipayFiatOrder, niftipayConfigured } from "@/lib/niftipay";

export const runtime = "nodejs";

// POST /api/checkout - proxies to the CRM's /api/store/checkout, which
// places a real order in the same database the CRM dashboard reads from.
// Body must match peptides-crm-app's CheckoutInput shape (lib/order-engine.ts):
// { items: [{slug, quantity}], paymentMethod, paymentMemo, billing: {...}, customerNote? }
export async function POST(req: Request) {
  const market = getMarket();
  const requestHost = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").split(":")[0].toLowerCase();
  const isAuRequest = market.id === "AU" || requestHost.endsWith("evlvpeptides.com.au");
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Checkout isn't connected to the CRM yet." }, { status: 503 });
  }
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!isAuRequest) {
    return NextResponse.json(
      { error: "Credit card processing is down for maintenance. Please come back later." },
      { status: 503 },
    );
  }
  if (isAuRequest && body.paymentMethod !== "niftipay") {
    return NextResponse.json({ error: "Australian checkout only supports secure card payment through Niftipay." }, { status: 400 });
  }
  if (isAuRequest && !niftipayConfigured()) {
    return NextResponse.json({ error: "Australian card checkout is not configured yet." }, { status: 503 });
  }
  const items = Array.isArray(body.items) ? body.items : [];
  const discountCode = typeof body.discountCode === "string" ? body.discountCode : undefined;
  const customerEmail = typeof body.customerEmail === "string" ? body.customerEmail : undefined;
  const wholesaleCheckout = body.wholesaleCheckout === true;

  // Resolve automatic non-stackable promotions without any customer/code inputs
  // first. A qualifying automatic event owns the discount slot for this order;
  // coupon and affiliate discount fields are stripped before the authoritative
  // checkout call so the event cannot stack with another percentage reduction.
  const automaticPreview = await crmFetch("/api/store/coupons/validate", { items, customerEmail, wholesaleCheckout });
  const automaticData = automaticPreview.ok ? automaticPreview.data as Record<string, unknown> : {};
  const automaticPromoId = typeof automaticData.automaticPromotion === "string" ? automaticData.automaticPromotion : null;
  const automaticPromotion = automaticPromoId === "GLP_PAIR_OCT_2026" || automaticPromoId === "RESEARCH_SET_OCT_2026" || automaticPromoId === "HALLOWEEN_BOGO_2026";
  const checkoutBody = automaticPromotion
    ? { ...body, couponCode: undefined, discountCode: undefined, affiliateRef: undefined }
    : body;

  // Fail closed above the tier ceiling. GLP is hard-limited to 35%; Research
  // Set and wholesale coupons respect the CRM's own maximumDiscountPercent.
  const preview = automaticPromotion
    ? automaticPreview
    : await crmFetch("/api/store/coupons/validate", { items, code: discountCode, customerEmail });
  if (preview.ok) {
    const result = preview.data as Record<string, unknown>;
    const subtotalCents = typeof result.subtotalCents === "number" ? result.subtotalCents : 0;
    const discountCents = typeof result.discountCents === "number" ? result.discountCents : 0;
    const maxPct = result.automaticPromotion === "HALLOWEEN_BOGO_2026" ? 50
      : result.automaticPromotion === "GLP_PAIR_OCT_2026" ? 35
      : result.automaticPromotion === "RESEARCH_SET_OCT_2026" ? 30
      : result.maximumDiscountPercent === 40 ? 40 : 30;
    if (subtotalCents > 0 && discountCents > Math.floor(subtotalCents * (maxPct / 100))) {
      return NextResponse.json({ error: `This promotion exceeds EVLV's ${maxPct}% maximum discount and cannot be applied.` }, { status: 422 });
    }
  }
  // The CRM sits behind this server, so it can only ever see this
  // server's own IP unless we forward the real one -- used for fraud
  // review (see Order.ipAddress in the CRM), not for anything that blocks
  // checkout.
  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
  const userAgent = req.headers.get("user-agent") || undefined;
  const { ok, status, data } = await crmFetch("/api/store/checkout", { ...checkoutBody, ipAddress, userAgent });
  if (!ok || !isAuRequest) return NextResponse.json(data, { status: ok ? 200 : status });

  const order = data && typeof data === "object" ? data as Record<string, unknown> : {};
  const reference = String(order.number ?? order.id ?? "");
  const totalCents = typeof order.totalCents === "number"
    ? order.totalCents
    : typeof order.total === "number" ? Math.round(order.total * 100) : 0;
  const billing = body.billing && typeof body.billing === "object" ? body.billing as Record<string, unknown> : {};
  if (!reference || totalCents <= 0) {
    return NextResponse.json({ error: "The AU order was created without a valid reference or authoritative total. Payment was not started." }, { status: 502 });
  }
  try {
    const payment = await createNiftipayFiatOrder({
      amountCents: totalCents,
      reference: `EVLV-AU-${reference}`.slice(0, 80),
      description: `EVLV Australia order ${reference}`,
      email: String(billing.email ?? body.customerEmail ?? ""),
      firstName: String(billing.firstName ?? ""),
      lastName: String(billing.lastName ?? ""),
      phone: String(billing.phone ?? ""),
      country: "AU",
    });
    return NextResponse.json({ ...order, paymentProvider: "niftipay", ...payment });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Niftipay could not start payment.";
    return NextResponse.json({ error: message, orderReference: reference }, { status: 502 });
  }
}
