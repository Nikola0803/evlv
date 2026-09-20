"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import type { Pack } from "./PackSelector";

/**
 * The old evlv-site-old ProductCard's own compact pack chooser -- just
 * "1 PCS" vs the product's real bulk tier ("10-pack" etc), a flex row of
 * small pill buttons. This is intentionally NOT the current, heavier
 * 4-tile "Pack Size" grid selector from ./PackSelector (1/3/5/bulk-qty
 * tiers, sized for the full product page) -- that one reads as an
 * oversized, cramped grid when embedded inside a narrow shop-grid card.
 * ProductClient.tsx (the full product page) still uses the shared
 * ./PackSelector; only ProductCard.tsx uses this one.
 */
export function useCardPackSelection(product: Product) {
  const packs: Pack[] = product.bulkOption
    ? [
        { label: "1 PCS", qty: 1, unitPrice: product.price },
        {
          label: `${product.bulkOption.qty}-pack`,
          qty: product.bulkOption.qty,
          unitPrice: product.bulkOption.price / product.bulkOption.qty,
          totalPrice: product.bulkOption.price,
          savePercent: product.bulkOption.savePercent,
        },
      ]
    : [{ label: "1 PCS", qty: 1, unitPrice: product.price }];

  const [packIndex, setPackIndex] = useState(0);
  return { packIndex, setPackIndex, packs, selected: packs[packIndex] };
}

export function CardPackSelector({
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
        {packs.map((pack, i) => {
          const active = packIndex === i;
          return (
            <button
              key={pack.label}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(i)}
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 px-4 py-2.5 text-xs font-semibold tracking-wide transition ${
                active ? "border-charcoal bg-charcoal text-ivory" : "border-stone text-charcoal/50 hover:border-charcoal/40 hover:text-charcoal"
              }`}
            >
              <span>{pack.label}</span>
              {pack.savePercent && (
                <span className={`text-[11px] font-semibold ${active ? "text-copper-light" : "text-copper"}`}>Save {pack.savePercent}%</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
