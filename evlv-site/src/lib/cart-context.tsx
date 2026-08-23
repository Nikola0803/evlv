"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from "react";
import { Product } from "./types";

interface CartLine {
  product: Product;
  qty: number;
  unitPrice: number;
  packLabel: string;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  toastMessage: string | null;
  addToCart: (product: Product, qty: number, unitPrice: number, packLabel: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

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
  }, []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0), [lines]);

  const value = useMemo(
    () => ({ lines, count, subtotal, toastMessage, addToCart }),
    [lines, count, subtotal, toastMessage, addToCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
