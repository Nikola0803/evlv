"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, BAC_WATER } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_COST } from "@/components/layout/CartUpsellOffers";
import { getStoredUser } from "@/lib/auth";
import { addOrder } from "@/lib/orders";

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_COST;
  const total = subtotal + shipping;

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      const user = getStoredUser();
      const order = addOrder({
        userId: user?.user_id ?? "guest",
        currency,
        subtotal,
        shipping,
        total,
        lines: [
          ...lines.map((l) => ({ name: l.product.name, packLabel: l.packLabel, qty: l.qty, unitPrice: l.unitPrice })),
          { name: BAC_WATER.name, packLabel: BAC_WATER.note, qty: 1, unitPrice: BAC_WATER.price },
        ],
      });
      clearCart();
      router.push(`/account?order=${order.id}`);
    }, 500);
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Your cart is empty</h1>
        <p className="mt-2 text-sm text-charcoal/50">Add something to your cart before checking out.</p>
        <Link href="/shop" className="mt-6 inline-block rounded-md bg-copper px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light">
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <h1 className="font-display text-2xl font-semibold uppercase tracking-tight text-charcoal md:text-3xl">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <section>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">Contact</h2>
            <input required type="email" placeholder="Email address" className="w-full rounded-md border border-stone bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-copper" />
          </section>

          <section>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">Shipping Address</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input required type="text" placeholder="First name" className="rounded-md border border-stone bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-copper" />
              <input required type="text" placeholder="Last name" className="rounded-md border border-stone bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-copper" />
              <input required type="text" placeholder="Address" className="sm:col-span-2 rounded-md border border-stone bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-copper" />
              <input required type="text" placeholder="City" className="rounded-md border border-stone bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-copper" />
              <input required type="text" placeholder="Postal / ZIP code" className="rounded-md border border-stone bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-copper" />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">Payment</h2>
            <div className="rounded-lg border border-dashed border-stone bg-ivory-soft p-4 text-xs text-charcoal/50">
              Payment processing isn&apos;t connected yet. This checkout is a preview of the flow.
            </div>
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-copper py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Processing..." : `Place Order (${formatPrice(total)})`}
          </button>
        </form>

        <div className="h-fit rounded-lg border border-stone bg-ivory-soft p-5">
          <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">Order Summary</h2>
          <div className="space-y-4">
            {lines.map((line) => (
              <div key={`${line.product.id}-${line.packLabel}`} className="flex gap-3">
                <div className="relative h-16 w-13 shrink-0 overflow-hidden rounded-md bg-white">
                  {line.product.image && <Image src={line.product.image} alt={line.product.name} width={90} height={112} className="h-full w-full object-cover" />}
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] font-semibold text-ivory">{line.qty}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">{line.product.name}</p>
                  <p className="text-xs text-charcoal/50">{line.packLabel}</p>
                </div>
                <span className="text-sm font-semibold text-charcoal">{formatPrice(line.qty * line.unitPrice)}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 border-t border-dashed border-stone pt-4">
              <div className="flex h-16 w-13 shrink-0 items-center justify-center rounded-md bg-sage-deep">
                <i className="ri-drop-line text-lg text-ivory" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-charcoal">{BAC_WATER.name}</p>
                <p className="text-xs text-copper">{BAC_WATER.note}</p>
              </div>
              <span className="text-sm font-semibold text-charcoal">{formatPrice(BAC_WATER.price)}</span>
            </div>
          </div>

          <div className="mt-5 space-y-1.5 border-t border-stone pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-charcoal/60">Subtotal</span>
              <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-charcoal/60">Shipping</span>
              <span className="font-medium text-charcoal">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-stone pt-2.5 text-base">
              <span className="font-medium text-charcoal">Total</span>
              <span className="font-display text-lg font-semibold text-charcoal">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
