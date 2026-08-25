"use client";

/**
 * Order history, stored locally per browser (keyed by the signed-in user's
 * id) since there's no live payment/order backend wired up yet. Orders are
 * created for real when a checkout is submitted, not fabricated. Swap this
 * for a real CRM/WooCommerce orders fetch once that's connected.
 */

export interface OrderLine {
  name: string;
  packLabel: string;
  qty: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  createdAt: string;
  status: "Processing" | "Shipped" | "Delivered";
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: "USD" | "CAD";
}

const STORAGE_KEY = "evlv_orders";

function readAll(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeAll(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    /* ignore */
  }
}

export function getOrdersForUser(userId: string): Order[] {
  return readAll()
    .filter((o) => o.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function addOrder(order: Omit<Order, "id" | "createdAt" | "status">): Order {
  const full: Order = {
    ...order,
    id: `EVLV-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString(),
    status: "Processing",
  };
  writeAll([...readAll(), full]);
  return full;
}
