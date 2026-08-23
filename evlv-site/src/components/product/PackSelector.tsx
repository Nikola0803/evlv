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
          label: "10 PCS",
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
  savePercent,
}: {
  packs: Pack[];
  packIndex: number;
  onSelect: (i: number) => void;
  savePercent?: number;
}) {
  if (packs.length < 2) return null;

  return (
    <div>
      <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-wider text-charcoal/50">Quantity</label>
      <div className="flex items-center gap-2">
        {packs.map((pack, i) => (
          <button
            key={pack.label}
            type="button"
            onClick={() => onSelect(i)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition ${
              packIndex === i
                ? "border border-charcoal text-charcoal"
                : "border border-transparent text-charcoal/40 hover:text-charcoal/70"
            }`}
          >
            {pack.label}
          </button>
        ))}
      </div>
      {savePercent && <p className="mt-2 text-[11px] font-medium text-sage-deep">Save {savePercent}% on {packs[1].qty} PCS</p>}
    </div>
  );
}
