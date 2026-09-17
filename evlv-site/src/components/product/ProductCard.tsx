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

// Display-only trim -- every badge in products.ts is literally "Case
// Pricing Available"; that full phrase force-wraps to 2 lines on a
// ~150px-wide mobile card. "Available" is implied by the badge existing
// at all, so it's safe to drop just for the pill's own rendering.
function shortBadge(label: string) {
  return label.replace(/\s+Available$/i, "");
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
    setIsMember(user?.membershipStatus === "APPROVED");
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
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
        <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-sage-deep sm:px-2.5 sm:py-1 sm:text-[10px]">
          {product.purity ? (
            <>
              <i className="ri-flask-line" /> {product.purity} Purity
            </>
          ) : (
            product.categoryLabel
          )}
        </span>
        {product.format && (
          <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-charcoal/60 sm:px-2.5 sm:py-1 sm:text-[10px]">
            {FORMAT_LABELS[product.format] ?? product.format}
          </span>
        )}
        {product.badges?.[0] && (
          <span className="whitespace-nowrap rounded-full bg-copper/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-copper-dark sm:px-2.5 sm:py-1 sm:text-[10px]">
            <span className="sm:hidden">{shortBadge(product.badges[0])}</span>
            <span className="hidden sm:inline">{product.badges[0]}</span>
          </span>
        )}
        {!product.inStock && (
          <span className="whitespace-nowrap rounded-full bg-charcoal/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-charcoal/60 sm:px-2.5 sm:py-1 sm:text-[10px]">
            Out of Stock
          </span>
        )}
        {locked && (
          <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-charcoal/85 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-copper sm:px-2.5 sm:py-1 sm:text-[10px]">
            <i className="ri-lock-line" /> {restrictedLocked ? "Verified Only" : "Member Only"}
          </span>
        )}
      </div>

      <Link href={`/shop/${product.slug}`} className="mt-2 font-display text-base font-semibold tracking-tight text-charcoal transition hover:opacity-60 sm:mt-2.5 sm:text-lg md:text-xl">
        {title} {dosage}
      </Link>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-soft-gray">{product.shortDescription}</p>
      {product.casNumber && (
        <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-charcoal/40">CAS {product.casNumber}</p>
      )}

      {/*
        Other doses of this same product (5mg/10mg/20mg etc) -- without
        this, the grid only ever shows the one canonical variant per
        group (see getShopListProducts()) and a visitor has to open the
        product page to even find out other sizes exist. Small pill row,
        no prices (keeps the card from getting crowded) -- the product
        page's own Size selector shown after clicking through is where
        price-per-size is compared.
      */}
      {product.variants && product.variants.length > 1 && (
        <div className="mt-1.5 grid grid-cols-2 gap-1">
          {product.variants.map((v) => {
            const active = v.slug === product.slug;
            return (
              <Link
                key={v.slug}
                href={`/shop/${v.slug}`}
                className={`rounded-full border px-2 py-0.5 text-center text-[10px] font-semibold transition ${
                  active
                    ? "border-sage-deep bg-sage-mist text-sage-deep"
                    : "border-stone bg-white text-charcoal/55 hover:border-charcoal/30"
                } ${!v.inStock ? "pointer-events-none opacity-40" : ""}`}
              >
                {v.label}
              </Link>
            );
          })}
        </div>
      )}

      {/*
        Whole product photo, uncropped -- the earlier version cropped out
        the bottom of the image to dodge a purity-badge overlay that
        collided with the copper brand band baked into the photo. That
        crop was the wrong fix (it cut off real parts of the product shot);
        removing the redundant overlay badge below was the right one --
        purity already shows in the badge row above the title.
      */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative my-2 mx-auto block aspect-square w-[70%] overflow-hidden"
      >
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
      </Link>

      <div className="mt-auto pt-1">
        {/*
          Stacked on mobile, side-by-side from sm+ -- at 2-up card widths
          on a phone, the strikethrough price + real price + this COA
          link used to all fight for the same ~140px row (all nowrap) and
          the overflow got silently clipped by the card's own
          overflow-hidden, showing a real price cut off mid-digit. Giving
          the price block its own full-width row on mobile (COA drops
          underneath) removes the squeeze; flex-wrap is a backstop so a
          long price never clips even if this ever renders narrower still.
        */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-charcoal/55 sm:text-[11px]">Price</p>
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="whitespace-nowrap text-xs font-medium text-charcoal/40 line-through sm:text-base">
                {formatPrice(anchorPrice)}
              </span>
              <p className="whitespace-nowrap font-display text-base font-semibold text-charcoal sm:text-xl md:text-2xl">{formatPrice(product.price)}</p>
            </div>
            {hasMultiplePrices && (
              <p className="mt-0.5 text-[11px] font-medium text-charcoal/65">As low as {formatPrice(lowestUnitPrice)}/vial in bulk</p>
            )}
          </div>
          <Link href="/coas" className="flex shrink-0 items-center gap-1 text-[10px] font-medium uppercase tracking-[0.15em] text-charcoal/40 transition hover:text-copper">
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
