"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart, BAC_WATER } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { getProducts } from "@/lib/products";
import { CheckoutUpsellModal, useCheckoutUpsell } from "./CheckoutUpsellModal";

export function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, removeLine, setLineQty, addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const upsellModal = useCheckoutUpsell();

  function handleCheckoutClick() {
    if (upsellModal.maybeOpen()) return;
    runStubCheckout();
  }

  function runStubCheckout() {
    alert("Checkout isn't wired up yet — WooCommerce integration pending.");
  }

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const inCartIds = new Set(lines.map((l) => l.product.id));
  const upsells = getProducts()
    .filter((p) => !inCartIds.has(p.id) && p.inStock)
    .slice(0, 3);

  return (
    <>
      <div
        aria-hidden
        onClick={closeCart}
        className={`fixed inset-0 z-[110] bg-charcoal/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[120] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-stone px-5 py-5">
          <h2 className="font-display text-lg font-semibold text-charcoal">Your Cart</h2>
          <button type="button" onClick={closeCart} aria-label="Close cart" className="flex h-8 w-8 items-center justify-center text-charcoal/60 transition hover:text-charcoal">
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {lines.length === 0 ? (
            <p className="mt-10 text-center text-sm text-charcoal/50">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-5">
                {lines.map((line) => (
                  <div key={`${line.product.id}-${line.packLabel}`} className="flex gap-3">
                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
                      {line.product.image && (
                        <Image src={line.product.image} alt={line.product.name} width={120} height={150} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-charcoal">{line.product.name}</p>
                        <button
                          type="button"
                          onClick={() => removeLine(line.product.id, line.packLabel)}
                          aria-label="Remove"
                          className="text-charcoal/40 transition hover:text-charcoal"
                        >
                          <i className="ri-close-line text-sm" />
                        </button>
                      </div>
                      <p className="text-xs text-charcoal/50">{line.packLabel}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-md border border-stone px-2 py-1">
                          <button type="button" onClick={() => setLineQty(line.product.id, line.packLabel, line.qty - 1)} className="text-charcoal/60 hover:text-charcoal">
                            <i className="ri-subtract-line text-xs" />
                          </button>
                          <span className="w-4 text-center text-xs font-medium">{line.qty}</span>
                          <button type="button" onClick={() => setLineQty(line.product.id, line.packLabel, line.qty + 1)} className="text-charcoal/60 hover:text-charcoal">
                            <i className="ri-add-line text-xs" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-charcoal">{formatPrice(line.qty * line.unitPrice)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mandatory reconstitution add-on — always included, not removable */}
              <div className="mt-5 flex items-center gap-3 border-t border-dashed border-stone pt-5">
                <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-md bg-sage-deep">
                  <i className="ri-drop-line text-xl text-ivory" />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-medium text-charcoal">{BAC_WATER.name}</p>
                  <p className="text-xs text-copper">{BAC_WATER.note}</p>
                </div>
                <span className="text-sm font-semibold text-charcoal">{formatPrice(BAC_WATER.price)}</span>
              </div>

              {upsells.length > 0 && (
                <div className="mt-8 border-t border-stone pt-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">Frequently added</p>
                  <div className="space-y-3">
                    {upsells.map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="h-14 w-11 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
                          {p.image && <Image src={p.image} alt={p.name} width={90} height={112} className="h-full w-full object-cover" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-charcoal">{p.name}</p>
                          <p className="text-xs text-charcoal/50">{formatPrice(p.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(p, 1, p.price, "1 PCS")}
                          className="rounded-md border border-charcoal px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-ivory"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-stone px-5 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-charcoal/60">Subtotal</span>
              <span className="font-display text-lg font-semibold text-charcoal">{formatPrice(subtotal)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full rounded-md bg-copper py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light"
            >
              Checkout
            </button>
            <Link href="/shop" onClick={closeCart} className="mt-3 block text-center text-xs uppercase tracking-wide text-charcoal/50 transition hover:text-charcoal">
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>

      <CheckoutUpsellModal
        open={upsellModal.open}
        onClose={() => upsellModal.setOpen(false)}
        onContinue={() => {
          upsellModal.setOpen(false);
          runStubCheckout();
        }}
      />
    </>
  );
}
