"use client";

/**
 * Inline checkout upsells, styled after a competitor reference the founder
 * liked: offers embedded directly in the order summary (a checkbox "add this
 * deal" card + a small "Researchers Also Add" row), not a popup modal.
 * Real EVLV pricing throughout — discounts are applied to actual product.price,
 * never fabricated "was $X" numbers.
 */

import Image from "next/image";
import { useCart, BAC_WATER } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { getProductBySlug, getProducts } from "@/lib/products";

const FEATURED_SLUG = "bpc-157-10mg";
const FEATURED_DISCOUNT_PERCENT = 25;
const FEATURED_PACK_LABEL = `1 PCS (${FEATURED_DISCOUNT_PERCENT}% Off Offer)`;

const ALSO_ADD_DISCOUNT_PERCENT = 10;
const ALSO_ADD_PACK_LABEL = `1 PCS (${ALSO_ADD_DISCOUNT_PERCENT}% Off Offer)`;

export const FREE_SHIPPING_THRESHOLD = 300;
export const FLAT_SHIPPING_COST = 15;

export function ShippingProgressBar() {
  const { subtotal } = useCart();
  const { formatPrice } = useCurrency();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="mb-5 rounded-lg border border-stone bg-ivory-soft px-4 py-3">
      <p className="flex items-center gap-1.5 text-xs font-medium text-charcoal">
        <i className={`text-sm ${remaining === 0 ? "ri-checkbox-circle-fill text-sage-deep" : "ri-truck-line text-copper"}`} />
        {remaining === 0 ? "You've unlocked free shipping!" : `Spend ${formatPrice(remaining)} more for free shipping!`}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone">
        <div className="h-full rounded-full bg-sage-deep transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function FeaturedOfferCard() {
  const { lines, addToCart, removeLine } = useCart();
  const { formatPrice } = useCurrency();
  const product = getProductBySlug(FEATURED_SLUG);
  if (!product) return null;

  const checked = lines.some((l) => l.product.id === product.id && l.packLabel === FEATURED_PACK_LABEL);
  const alreadyInCartElsewhere = lines.some((l) => l.product.id === product.id && l.packLabel !== FEATURED_PACK_LABEL);
  if (alreadyInCartElsewhere) return null;

  const discountedPrice = product.price * (1 - FEATURED_DISCOUNT_PERCENT / 100);

  function toggle() {
    if (!product) return;
    if (checked) {
      removeLine(product.id, FEATURED_PACK_LABEL);
    } else {
      addToCart(product, 1, discountedPrice, FEATURED_PACK_LABEL);
    }
  }

  return (
    <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-copper/40 bg-copper/5 p-4">
      <input type="checkbox" checked={checked} onChange={toggle} className="mt-1 h-4 w-4 shrink-0 accent-copper" />
      <div className="h-14 w-11 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
        {product.image && <Image src={product.image} alt={product.name} width={90} height={112} className="h-full w-full object-cover" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-charcoal">
          Add {product.name} ({FEATURED_DISCOUNT_PERCENT}% off today only)
        </p>
        <p className="mt-0.5 text-xs text-charcoal/50">Pairs well with what&apos;s in your cart.</p>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-xs text-charcoal/40 line-through">{formatPrice(product.price)}</span>
          <span className="text-sm font-semibold text-copper">{formatPrice(discountedPrice)}</span>
        </div>
      </div>
    </label>
  );
}

export function ResearchersAlsoAdd() {
  const { lines, addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const inCartIds = new Set(lines.map((l) => l.product.id));
  const items = getProducts()
    .filter((p) => !inCartIds.has(p.id) && p.slug !== FEATURED_SLUG && p.inStock)
    .slice(0, 3);

  if (items.length === 0) return null;

  return (
    <div className="mt-6 border-t border-stone pt-5">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal/50">Researchers Also Add</p>
      <div className="space-y-3">
        {items.map((p) => {
          const discountedPrice = p.price * (1 - ALSO_ADD_DISCOUNT_PERCENT / 100);
          return (
            <div key={p.id} className="flex items-center gap-3">
              <div className="h-14 w-11 shrink-0 overflow-hidden rounded-md bg-ivory-soft">
                {p.image && <Image src={p.image} alt={p.name} width={90} height={112} className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-charcoal">{p.name}</p>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-[11px] text-charcoal/40 line-through">{formatPrice(p.price)}</span>
                  <span className="text-xs font-semibold text-charcoal">{formatPrice(discountedPrice)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => addToCart(p, 1, discountedPrice, ALSO_ADD_PACK_LABEL)}
                className="rounded-md bg-sage-deep px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-ivory transition hover:bg-sage-light"
              >
                Add {ALSO_ADD_DISCOUNT_PERCENT}% Off
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { BAC_WATER };
