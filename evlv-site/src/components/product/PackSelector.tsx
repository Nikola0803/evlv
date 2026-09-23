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
    <div className="cp-pack-selector">
      <label>Pack size <span>Choose quantity</span></label>
      <div className="cp-pack-grid">
        {packs.map((pack, i) => {
          const active = packIndex === i;
          return (
            <button
              key={pack.label}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(i)}
              className={`cp-pack-option${active ? " active" : ""}`}
            >
              <div className="cp-pack-heading">
                <span>{pack.label}</span>
                <i aria-hidden="true" className={active ? "ri-checkbox-circle-fill" : "ri-checkbox-blank-circle-line"} />
              </div>
              {pack.savePercent ? (
                <span className="cp-pack-saving">Save {pack.savePercent}%</span>
              ) : (
                <span className="cp-pack-saving">Standard price</span>
              )}
              <span className="cp-pack-price">
                {formatPrice(pack.unitPrice)}
                <small>/vial</small>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
