import { NextResponse } from "next/server";
import {
  omnisendConfigured,
  upsertContact,
  createOrder,
  updateOrder,
  pushEvent,
  writeContactProperties,
  type OmnisendOrderInput,
} from "@/lib/omnisend-server";

export const runtime = "nodejs";

function authorized(req: Request): boolean {
  const secret = process.env.CRM_WEBHOOK_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${secret}`;
}

export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!omnisendConfigured()) {
    return NextResponse.json({ error: "Omnisend not configured" }, { status: 503 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = payload.event as string;
  const data = (payload.data ?? {}) as Record<string, unknown>;

  try {
    switch (event) {
      case "contact.created":
      case "contact.subscribed": {
        await upsertContact({
          email: data.email as string,
          firstName: data.firstName as string | undefined,
          tags: data.tags as string[] | undefined,
          subscribed: true,
          consentTimestamp: data.consentTimestamp as string | undefined,
        });
        break;
      }

      case "checkout.started": {
        const email = data.email as string;
        const props: Record<string, string> = {};
        if (data.code_cart) props.code_cart = data.code_cart as string;
        if (data.code_cart_returning) props.code_cart_returning = data.code_cart_returning as string;
        if (Object.keys(props).length) {
          await writeContactProperties(email, props);
        }
        break;
      }

      case "order.placed": {
        const order = data as OmnisendOrderInput & {
          code_second?: string;
          code_winback?: string;
        };
        await createOrder(order);
        const codeProps: Record<string, string> = {};
        if (order.code_second) codeProps.code_second = order.code_second;
        if (order.code_winback) codeProps.code_winback = order.code_winback;
        if (Object.keys(codeProps).length) {
          await writeContactProperties(order.email, codeProps);
        }
        break;
      }

      case "order.fulfilled": {
        await updateOrder(data.orderID as string, {
          orderStatus: "fulfilled",
          paymentStatus: "paid",
          fulfillmentStatus: "fulfilled",
          tracking: data.tracking as {
            trackingCode?: string;
            carrier?: string;
            trackingUrl?: string;
          } | undefined,
        });
        break;
      }

      case "order.canceled": {
        await updateOrder(data.orderID as string, {
          orderStatus: "cancelled",
          fulfillmentStatus: "unfulfilled",
        });
        break;
      }

      case "order.refunded": {
        await updateOrder(data.orderID as string, {
          orderStatus: "refunded",
          paymentStatus: "refunded",
        });
        break;
      }

      case "product.back_in_stock": {
        await pushEvent(data.email as string, "back in stock", {
          productTitle: data.productTitle,
          productUrl: data.productUrl,
          productImage: data.productImage,
        });
        break;
      }

      case "batch.released": {
        await pushEvent(data.email as string, "new batch released", {
          productTitle: data.productTitle,
          productUrl: data.productUrl,
          coaUrl: data.coaUrl,
          batchNumber: data.batchNumber,
        });
        break;
      }

      default:
        return NextResponse.json({ error: "Unknown event" }, { status: 400 });
    }
  } catch (err) {
    console.error("[crm-webhook] error", event, err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
