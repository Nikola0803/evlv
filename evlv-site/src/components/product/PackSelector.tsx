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
        {packs.map((pack, i) => (
          <button
            key={pack.label}
            type="button"
            onClick={() => onSelect(i)}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-2.5 text-xs font-medium tracking-wide transition ${
              packIndex === i ? "border-charcoal text-charcoal" : "border-stone text-charcoal/40 hover:text-charcoal/70"
            }`}
          >
            <span>{pack.label}</span>
            {pack.savePercent && <span className="text-[11px] font-semibold text-copper">Save {pack.savePercent}%</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
