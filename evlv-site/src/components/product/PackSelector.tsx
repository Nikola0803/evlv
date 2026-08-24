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

export function usePackSelection(product: Product) {
  const packs: Pack[] = product.bulkOption
    ? [
        { label: "1 PCS", qty: 1, unitPrice: product.price },
        {
          label: "10-pack",
          qty: 10,
          unitPrice: product.bulkOption.price / product.bulkOption.qty,
          totalPrice: product.bulkOption.price,
          savePercent: product.bulkOption.savePercent,
        },
      ]
    : [{ label: "1 PCS", qty: 1, unitPrice: product.price }];

  const [packIndex, setPackIndex] = useState(0);
  return { packIndex, setPackIndex, packs, selected: packs[packIndex] };
}

export function PackSelector({
  packs,
  packIndex,
  onSelect,
}: {
  packs: Pack[];
  packIndex: number;
  onSelect: (i: number) => void;
}) {
  if (packs.length < 2) return null;

  return (
    <div>
      <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-wider text-charcoal/50">Quantity</label>
      <div className="flex items-center gap-2">
        {packs.map((pack, i) =>
          pack.savePercent ? (
            <button
              key={pack.label}
              type="button"
              onClick={() => onSelect(i)}
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium tracking-wide transition ${
                packIndex === i
                  ? "border border-charcoal text-charcoal"
                  : "border border-transparent text-charcoal/40 hover:text-charcoal/70"
              }`}
            >
              <span className="bu-swatch-label">{pack.label}</span>
              <span className="text-[11px] font-semibold text-copper">Save {pack.savePercent}%</span>
            </button>
          ) : (
            <button
              key={pack.label}
              type="button"
              onClick={() => onSelect(i)}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-xs font-medium tracking-wide transition ${
                packIndex === i
                  ? "border border-charcoal text-charcoal"
                  : "border border-transparent text-charcoal/40 hover:text-charcoal/70"
              }`}
            >
              {pack.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
