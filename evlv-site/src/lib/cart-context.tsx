"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from "react";
import { Product } from "./types";
import { trackEvent } from "./pixel";

interface CartLine {
  product: Product;
  qty: number;
  unitPrice: number;
  packLabel: string;
}

/** Required reconstitution add-on, auto-included whenever the cart has items. Seeded as a real CRM product (see prisma/seed-evlv.ts) so it resolves at real checkout too. */
export const BAC_WATER = {
  slug: "bacteriostatic-water-30ml",
  name: "Bacteriostatic Water 30mL",
  note: "Required for reconstitution",
  price: 15,
};

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  toastMessage: string | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, qty: number, unitPrice: number, packLabel: string) => void;
  removeLine: (productId: string, packLabel: string) => void;
  setLineQty: (productId: string, packLabel: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback((product: Product, qty: number, unitPrice: number, packLabel: string) => {
    setLines((prev) => {
      const existingIndex = prev.findIndex((l) => l.product.id === product.id && l.packLabel === packLabel);
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = { ...next[existingIndex], qty: next[existingIndex].qty + qty };
        return next;
      }
      return [...prev, { product, qty, unitPrice, packLabel }];
    });
    setToastMessage(`${product.name} added to cart`);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(null), 2600);
    setIsOpen(true);
    trackEvent("add_to_cart", { properties: { name: product.name, slug: product.slug, sku: product.sku }, valueCents: Math.round(unitPrice * qty * 100) });
  }, []);

  const removeLine = useCallback((productId: string, packLabel: string) => {
    setLines((prev) => prev.filter((l) => !(l.product.id === productId && l.packLabel === packLabel)));
  }, []);

  const setLineQty = useCallback((productId: string, packLabel: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.product.id === productId && l.packLabel === packLabel ? { ...l, qty: Math.max(1, qty) } : l))
        .filter((l) => l.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const productSubtotal = useMemo(() => lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0), [lines]);
  const subtotal = useMemo(() => productSubtotal + (lines.length > 0 ? BAC_WATER.price : 0), [productSubtotal, lines.length]);

  const value = useMemo(
    () => ({ lines, count, subtotal, toastMessage, isOpen, openCart, closeCart, addToCart, removeLine, setLineQty, clearCart }),
    [lines, count, subtotal, toastMessage, isOpen, openCart, closeCart, addToCart, removeLine, setLineQty, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
