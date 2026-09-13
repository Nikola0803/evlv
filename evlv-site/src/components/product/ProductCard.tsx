"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { usePackSelection } from "./PackSelector";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { getStoredUser } from "@/lib/auth";
import { getAnchorPrice } from "@/lib/pricing";

const DOSAGE_PATTERN = /\s(\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g)(?:\/\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g))?)$/i;

const FORMAT_LABELS: Record<string, string> = {
  blend: "Blend",
  supplies: "Supplies",
  oral: "Oral",
  nasal: "Nasal Spray",
  device: "Multi-Dose Cartridge",
};

function splitDosage(name: string) {
  const match = name.match(DOSAGE_PATTERN);
  if (!match) return { title: name, dosage: null as string | null };
  return { title: name.slice(0, match.index).trim(), dosage: match[1].toUpperCase() };
}

export function ProductCard({ product }: { product: Product }) {
  const { packs, selected } = usePackSelection(product);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { title, dosage } = splitDosage(product.name);
  const [isMember, setIsMember] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    setIsMember(user?.plan === "member");
    setIsVerified(user?.researcherStatus === "APPROVED");
  }, []);

  const memberLocked = !!product.memberOnly && !isMember;
  const restrictedLocked = !!product.restricted && !isVerified;
  const locked = memberLocked || restrictedLocked;
  const lowestUnitPrice = Math.min(...packs.map((p) => p.unitPrice));
  const hasMultiplePrices = packs.length > 1 && lowestUnitPrice < product.price;
  // The bold headline price is always the real, current per-vial sale price
  // (product.price) -- never silently swapped for a lower bulk-tier number.
  // Bulk savings surface as a small secondary line instead.
  const anchorPrice = getAnchorPrice(product.price);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-ivory-soft p-5 transition hover:bg-stone/40">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sage-deep">
          {product.purity ? (
            <>
              <i className="ri-flask-line" /> {product.purity} Purity
            </>
          ) : (
            product.categoryLabel
          )}
        </span>
        {product.format && (
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-charcoal/60">
            {FORMAT_LABELS[product.format] ?? product.format}
          </span>
        )}
        {product.badges?.[0] && (
          <span className="rounded-full bg-copper/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-copper-dark">
            {product.badges[0]}
          </span>
        )}
        {!product.inStock && (
          <span className="rounded-full bg-charcoal/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-charcoal/60">
            Out of Stock
          </span>
        )}
        {locked && (
          <span className="flex items-center gap-1 rounded-full bg-charcoal/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-copper">
            <i className="ri-lock-line" /> {restrictedLocked ? "Verified Only" : "Member Only"}
          </span>
        )}
      </div>

      <Link href={`/shop/${product.slug}`} className="mt-2.5 font-display text-lg font-semibold tracking-tight text-charcoal transition hover:opacity-60 md:text-xl">
        {title} {dosage}
      </Link>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-soft-gray">{product.shortDescription}</p>

      <Link href={`/shop/${product.slug}`} className="relative my-2 mx-auto block aspect-square w-[70%]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            sizes="(max-width: 768px) 45vw, 320px"
            className="h-full w-full object-contain"
          />
        ) : (
          <ProductVisual name={title} dosage={dosage} floating className="h-full w-full" />
        )}
        {product.purity && (
          <span className="absolute bottom-0 right-0 flex items-center gap-1 rounded-md bg-charcoal/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            <i className="ri-flask-line text-copper" /> {product.purity}+
          </span>
        )}
      </Link>

      <div className="mt-auto pt-1">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-charcoal/40">Price</p>
            <div className="flex items-baseline gap-1.5">
              <span className="whitespace-nowrap text-sm font-medium text-charcoal/25 line-through">
                {formatPrice(anchorPrice)}
              </span>
              <p className="whitespace-nowrap font-display text-lg font-semibold text-charcoal md:text-xl">{formatPrice(product.price)}</p>
            </div>
            {hasMultiplePrices && (
              <p className="mt-0.5 text-[10px] text-charcoal/40">As low as {formatPrice(lowestUnitPrice)}/vial in bulk</p>
            )}
          </div>
          <Link href="/coas" className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.15em] text-charcoal/40 transition hover:text-copper">
            COA <i className="ri-arrow-right-up-line" />
          </Link>
        </div>

        {locked ? (
          <Link
            href={restrictedLocked ? "/account?tab=verification" : "/plans"}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-charcoal py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal hover:text-ivory"
          >
            <i className="ri-lock-line" /> {restrictedLocked ? "Apply for Verification" : "Unlock With Membership"}
          </Link>
        ) : (
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addToCart(product, 1, selected.unitPrice, selected.label)}
            className="mt-3 w-full rounded-full border border-charcoal bg-white py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-charcoal hover:text-ivory disabled:cursor-not-allowed disabled:border-stone disabled:bg-stone disabled:text-charcoal/40"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        )}
      </div>
    </div>
  );
}
