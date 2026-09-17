"use client";

import { useState } from "react";
import { Product } from "@/lib/types";

export interface Pack {
  label: string;
  qty: number;
  unitPrice: number;
  totalPrice?: number;
  savePercent?: number;
}

/**
 * Builds a tiered price-break ladder (1 / 3 / 5 / the product's real bulk
 * qty) from the single { qty, price, savePercent } bulk option each product
 * defines. Every product's real bulk tier is a flat 20% off at 10 units, so
 * the in-between tiers are derived at the same 2%-per-unit rate that
 * produces exactly that number (3 -> 6%, 5 -> 10%, 10 -> 20%) rather than
 * inventing per-product pricing that doesn't exist in the data yet.
 */
function buildPacks(product: Product): Pack[] {
  if (!product.bulkOption) return [{ label: "1 Vial", qty: 1, unitPrice: product.price }];

  const bulk = product.bulkOption;
  const tierQtys = [1, 3, 5, bulk.qty].filter((q, i, arr) => q <= bulk.qty && arr.indexOf(q) === i);

  return tierQtys.map((qty) => {
    if (qty === 1) return { label: "1 Vial", qty: 1, unitPrice: product.price };
    if (qty === bulk.qty) {
      return {
        label: `${qty} Pack`,
        qty,
        unitPrice: bulk.price / bulk.qty,
        totalPrice: bulk.price,
        savePercent: bulk.savePercent,
      };
    }
    const savePercent = Math.round((bulk.savePercent * qty) / bulk.qty);
    const unitPrice = product.price * (1 - savePercent / 100);
    return { label: `${qty} Pack`, qty, unitPrice, totalPrice: unitPrice * qty, savePercent };
  });
}

export function usePackSelection(product: Product) {
  const packs = buildPacks(product);
  const [packIndex, setPackIndex] = useState(0);
  return { packIndex, setPackIndex, packs, selected: packs[packIndex] };
}

export function PackSelector({
  packs,
  packIndex,
  onSelect,
  formatPrice,
}: {
  packs: Pack[];
  packIndex: number;
  onSelect: (i: number) => void;
  formatPrice: (n: number) => string;
}) {
  if (packs.length < 2) return null;

  return (
    <div>
      <label className="mb-2.5 block text-[13px] font-semibold text-charcoal">Pack Size</label>
      <div className="grid grid-cols-2 gap-2">
        {packs.map((pack, i) => {
          const active = packIndex === i;
          return (
            <button
              key={pack.label}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(i)}
              className={`flex flex-col gap-1 rounded-xl border-[1.5px] px-3.5 py-3 text-left transition ${
                active ? "border-sage-deep bg-white shadow-sm" : "border-stone bg-white hover:border-charcoal/30"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-charcoal">{pack.label}</span>
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    active ? "border-sage-deep" : "border-stone"
                  }`}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-sage-deep" />}
                </span>
              </div>
              {pack.savePercent ? (
                <span className="text-xs font-semibold text-copper">Save {pack.savePercent}%</span>
              ) : (
                <span className="text-xs text-charcoal/40">Standard</span>
              )}
              <span className="text-sm font-semibold text-charcoal">
                {formatPrice(pack.unitPrice)}
                <span className="ml-1 text-xs font-normal text-charcoal/40">/vial</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
