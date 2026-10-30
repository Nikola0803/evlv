const BASE = "https://api.omnisend.com/v3";
const VERSION = "2026-03-15";

export function omnisendConfigured(): boolean {
  return !!process.env.OMNISEND_API_KEY;
}

async function omniCall(
  method: string,
  path: string,
  body?: unknown
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const key = process.env.OMNISEND_API_KEY;
  if (!key) throw new Error("OMNISEND_API_KEY not set");
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": key,
      "Omnisend-Version": VERSION,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { /* empty response */ }
  return { ok: res.ok, status: res.status, data };
}

export interface ContactUpsertInput {
  email: string;
  firstName?: string;
  tags?: string[];
  subscribed?: boolean;
  consentTimestamp?: string;
  customProperties?: Record<string, string>;
}

export async function upsertContact(input: ContactUpsertInput): Promise<void> {
  if (!omnisendConfigured()) return;
  const body: Record<string, unknown> = {
    identifiers: [
      {
        type: "email",
        id: input.email,
        channels: {
          email: {
            status: input.subscribed ? "subscribed" : "nonSubscribed",
            statusDate: input.consentTimestamp ?? new Date().toISOString(),
          },
        },
      },
    ],
  };
  if (input.firstName) body.firstName = input.firstName;
  if (input.tags?.length) body.tags = input.tags;
  if (input.customProperties) body.customProperties = input.customProperties;
  await omniCall("POST", "/contacts", body);
}

export async function writeContactProperties(
  email: string,
  props: Record<string, string>
): Promise<void> {
  if (!omnisendConfigured()) return;
  await omniCall("POST", "/contacts", {
    identifiers: [{ type: "email", id: email }],
    customProperties: props,
  });
}

export interface OmnisendProductInput {
  productID: string;
  title: string;
  productUrl: string;
  imageUrl?: string;
  price: number;
  status: "inStock" | "outOfStock";
  categories?: string[];
}

export async function upsertProduct(product: OmnisendProductInput): Promise<void> {
  if (!omnisendConfigured()) return;
  const body: Record<string, unknown> = {
    productID: product.productID,
    title: product.title,
    productUrl: product.productUrl,
    status: product.status,
    currency: "USD",
    variants: [
      {
        variantID: product.productID,
        title: product.title,
        sku: product.productID,
        status: product.status,
        price: product.price,
      },
    ],
  };
  if (product.imageUrl) body.imageUrl = product.imageUrl;
  if (product.categories?.length) body.tags = product.categories;

  const put = await omniCall("PUT", `/products/${product.productID}`, body);
  if (put.status === 404) {
    await omniCall("POST", "/products", body);
  }
}

export interface OmnisendLineItem {
  productID: string;
  variantID?: string;
  sku?: string;
  productTitle: string;
  quantity: number;
  price: number;
  productUrl?: string;
  imageUrl?: string;
  productCategories?: string[];
}

export interface OmnisendOrderInput {
  orderID: string;
  email: string;
  orderNumber?: string;
  orderStatus?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  currency?: string;
  orderTotal: number;
  subtotalPrice?: number;
  discountAmount?: number;
  shippingPrice?: number;
  lineItems: OmnisendLineItem[];
  createdAt?: string;
  billingAddress?: Record<string, string>;
}

export async function createOrder(order: OmnisendOrderInput): Promise<void> {
  if (!omnisendConfigured()) return;
  const body: Record<string, unknown> = {
    orderID: order.orderID,
    email: order.email,
    orderNumber: order.orderNumber ?? order.orderID,
    orderStatus: order.orderStatus ?? "pending",
    paymentStatus: order.paymentStatus ?? "awaitingPayment",
    fulfillmentStatus: order.fulfillmentStatus ?? "unfulfilled",
    currency: order.currency ?? "USD",
    orderSum: order.orderTotal,
    subTotalSum: order.subtotalPrice ?? order.orderTotal,
    discountSum: order.discountAmount ?? 0,
    shippingSum: order.shippingPrice ?? 0,
    lineItems: order.lineItems.map((item) => ({
      productID: item.productID,
      variantID: item.variantID ?? item.productID,
      sku: item.sku ?? item.productID,
      title: item.productTitle,
      quantity: item.quantity,
      price: item.price,
      productUrl: item.productUrl,
      imageUrl: item.imageUrl,
      productCategories: item.productCategories,
    })),
    createdAt: order.createdAt ?? new Date().toISOString(),
  };
  if (order.billingAddress) body.billingAddress = order.billingAddress;
  await omniCall("POST", "/orders", body);
}

export interface OmnisendOrderUpdate {
  orderStatus?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  tracking?: {
    trackingCode?: string;
    carrier?: string;
    trackingUrl?: string;
  };
}

export async function updateOrder(
  orderID: string,
  update: OmnisendOrderUpdate
): Promise<void> {
  if (!omnisendConfigured()) return;
  const body: Record<string, unknown> = {};
  if (update.orderStatus) body.orderStatus = update.orderStatus;
  if (update.paymentStatus) body.paymentStatus = update.paymentStatus;
  if (update.fulfillmentStatus) body.fulfillmentStatus = update.fulfillmentStatus;
  if (update.tracking) body.tracking = update.tracking;
  await omniCall("PATCH", `/orders/${orderID}`, body);
}

export async function pushEvent(
  email: string,
  eventName: string,
  fields?: Record<string, unknown>
): Promise<void> {
  if (!omnisendConfigured()) return;
  await omniCall("POST", "/events", {
    email,
    eventName,
    origin: "api",
    fields: fields ?? {},
  });
}

const CATEGORY_MAP: Array<[RegExp, string]> = [
  [/semaglutide|tirzepatide|5-amino-1mq|mots-c|aod-9604/i, "Metabolic"],
  [/bpc-157|tb-500|kpv|wolverine|glow-blend/i, "Recovery"],
  [/cjc|ipamorelin|tesamorelin|ghrp|sermorelin|growth-hormone/i, "Growth"],
  [/nad|epithalon|ghk-cu|ss-31|longevity/i, "Longevity"],
  [/pt-141|semax|selank|testosterone/i, "Hormonal & Cognitive"],
];

export function slugToOmnisendCategories(slug: string): string[] {
  for (const [pattern, category] of CATEGORY_MAP) {
    if (pattern.test(slug)) return [category];
  }
  return [];
}
