"use client";

// Omnisend's own client-side event API (separate from GTM/dataLayer and the
// CRM pixel -- see OmnisendSnippet.tsx for the base snippet that loads
// window.omnisend and fires $pageViewed). Cart/checkout events here power
// Omnisend's abandoned-cart and browse-abandonment automations.
//
// IMPORTANT per Omnisend's docs: "added product to cart", "viewed product"
// and "started checkout" are only captured for an IDENTIFIED contact (one
// who clicked a campaign email, submitted an Omnisend form, or was passed
// to identifyOmnisendContact below). Anonymous first-time visitors with no
// email on file will not generate these events -- that's an Omnisend
// platform rule, not a bug here. Once checkout captures their email,
// identifyOmnisendContact links the session so later events (and, from
// that point on, abandonment emails) start working for them.
//
// "placed order" is intentionally NOT sent from here -- Omnisend's docs say
// order-related events must go through their server-side REST API (with an
// Omnisend API key), not this browser snippet. Without that wired up,
// Omnisend's abandoned-cart email can still fire for a visitor who already
// completed checkout. See PROJECT.md / ask Nik for the Omnisend API key to
// close that gap server-side.

declare global {
  interface Window {
    omnisend?: unknown[];
  }
}

const CART_ID_KEY = "evlv_omnisend_cart_id";

function getOrCreateCartId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(CART_ID_KEY);
    if (!id) {
      id =
        window.crypto?.randomUUID?.() ??
        `cart_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(CART_ID_KEY, id);
    }
    return id;
  } catch {
    return `cart_${Date.now()}`;
  }
}

function push(event: string, properties: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.omnisend = window.omnisend || [];
  window.omnisend.push(["track", event, { origin: "api", eventVersion: "", properties }]);
}

/** Call as soon as a visitor's email becomes known (checkout, newsletter,
 * account login) so Omnisend links their session to a real contact and
 * starts capturing cart/checkout events for them. */
export function identifyOmnisendContact(email: string) {
  if (typeof window === "undefined" || !email) return;
  try {
    (window.omnisend as unknown as { identifyContact?: (c: { email: string }) => void } | undefined)
      ?.identifyContact?.({ email });
  } catch {
    /* omnisend launcher script not loaded yet -- best effort, non-blocking */
  }
}

const CLIENT_CATEGORY_MAP: Array<[RegExp, string]> = [
  [/semaglutide|tirzepatide|5-amino-1mq|mots-c|aod-9604/i, "Metabolic"],
  [/bpc-157|tb-500|kpv|wolverine|glow-blend/i, "Recovery"],
  [/cjc|ipamorelin|tesamorelin|ghrp|sermorelin|growth-hormone/i, "Growth"],
  [/nad|epithalon|ghk-cu|ss-31|longevity/i, "Longevity"],
  [/pt-141|semax|selank|testosterone/i, "Hormonal & Cognitive"],
];

export function omnisendCategoriesForSlug(slug: string): string[] {
  for (const [pattern, category] of CLIENT_CATEGORY_MAP) {
    if (pattern.test(slug)) return [category];
  }
  return [];
}

interface ProductLike {
  sku: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
  categoryLabel?: string;
  omnisendCategories?: string[];
}

function productUrl(slug: string) {
  return typeof window !== "undefined" ? `${window.location.origin}/shop/${slug}` : `/shop/${slug}`;
}

export function trackOmnisendViewedProduct(product: ProductLike) {
  push("viewed product", {
    product: {
      id: product.sku,
      title: product.name,
      price: Math.round(product.price * 100),
      currency: "USD",
      url: productUrl(product.slug),
      imageUrl: product.image,
      status: "inStock",
      categories: product.omnisendCategories ?? omnisendCategoriesForSlug(product.slug),
    },
  });
}

export function trackOmnisendAddedToCart(product: ProductLike, qty: number, unitPrice: number) {
  const categories = product.omnisendCategories ?? omnisendCategoriesForSlug(product.slug);
  const lineItem = {
    productID: product.sku,
    productTitle: product.name,
    productPrice: unitPrice,
    productQuantity: qty,
    productURL: productUrl(product.slug),
    productImageURL: product.image,
    productCategories: categories,
  };
  push("added product to cart", {
    cartID: getOrCreateCartId(),
    abandonedCheckoutURL: `${typeof window !== "undefined" ? window.location.origin : ""}/checkout`,
    currency: "USD",
    value: unitPrice * qty,
    addedItem: lineItem,
    lineItems: [lineItem],
  });
}

export function trackOmnisendStartedCheckout(
  lines: { product: ProductLike; qty: number; unitPrice: number }[],
  total: number,
  currency: string
) {
  push("started checkout", {
    cartID: getOrCreateCartId(),
    abandonedCheckoutURL: `${typeof window !== "undefined" ? window.location.origin : ""}/checkout`,
    currency,
    value: total,
    lineItems: lines.map((l) => ({
      productID: l.product.sku,
      productTitle: l.product.name,
      productPrice: l.unitPrice,
      productQuantity: l.qty,
      productURL: productUrl(l.product.slug),
      productImageURL: l.product.image,
      productCategories: l.product.omnisendCategories ?? omnisendCategoriesForSlug(l.product.slug),
    })),
  });
}
