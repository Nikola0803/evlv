"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { PackSelector, usePackSelection } from "./PackSelector";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

const DOSAGE_PATTERN = /\s(\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g)(?:\/\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g))?)$/i;

function splitDosage(name: string) {
  const match = name.match(DOSAGE_PATTERN);
  if (!match) return { title: name, dosage: null as string | null };
  return { title: name.slice(0, match.index).trim(), dosage: match[1].toUpperCase() };
}

export function ProductCard({ product }: { product: Product }) {
  const { packIndex, setPackIndex, packs, selected } = usePackSelection(product);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { title, dosage } = splitDosage(product.name);
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnter() {
    setHovering(true);
    videoRef.current?.play().catch(() => {});
  }

  function handleLeave() {
    setHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div className="group flex flex-col">
      <Link
        href={`/shop/${product.slug}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative block overflow-hidden rounded-lg bg-ivory-soft"
      >
        <div className="aspect-[3/4] w-full">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={750}
              sizes="(max-width: 768px) 45vw, 320px"
              className={`h-full w-full object-cover transition-opacity duration-500 ${hovering ? "opacity-0" : "opacity-100"}`}
            />
          ) : (
            <ProductVisual
              name={title}
              dosage={dosage}
              floating
              className={`h-full w-full p-6 transition-opacity duration-500 ${hovering ? "opacity-0" : "opacity-100"}`}
            />
          )}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hovering ? "opacity-100" : "opacity-0"}`}
          >
            <source src="/videos/product-hover.mp4" type="video/mp4" />
          </video>
        </div>
        {product.badges?.map((badge) => (
          <span key={badge} className="absolute left-3 top-3 border-l-2 border-copper bg-charcoal/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-copper backdrop-blur-sm">
            {badge}
          </span>
        ))}
        {!product.inStock && (
          <span className="absolute right-3 top-3 text-[10px] font-semibold uppercase tracking-wider text-charcoal/50">Out of Stock</span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-copper">{product.categoryLabel}</span>
          <Link
            href="/coas"
            className="flex shrink-0 items-center gap-1 text-[10px] font-medium uppercase tracking-[0.15em] text-charcoal/40 transition hover:text-copper"
          >
            Read COA <i className="ri-arrow-right-up-line" />
          </Link>
        </div>

        <Link href={`/shop/${product.slug}`} className="font-display text-xl font-semibold tracking-tight text-charcoal transition hover:opacity-60 md:text-2xl">
          {title}
        </Link>
        {dosage && <div className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-charcoal/50">{dosage}</div>}

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-semibold text-charcoal">{formatPrice(product.price).split(" ")[0]}</span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-charcoal/40">{formatPrice(product.price).split(" ")[1]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-0.5 text-sage-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="ri-star-fill text-[11px]" />
              ))}
            </span>
            <span className="text-xs font-semibold text-charcoal">{product.rating}</span>
            <span className="text-xs text-charcoal/40">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-stone pt-3.5">
          {product.purity && (
            <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.1em] text-charcoal/50">
              <i className="ri-flask-line text-copper" /> {product.purity}+ Purity Verified
            </span>
          )}
          <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.1em] text-charcoal/50">
            <i className="ri-truck-line text-copper" /> Ships within 24h
          </span>
        </div>

        <div className="mt-auto pt-6">
          {packs.length > 1 && <PackSelector packs={packs} packIndex={packIndex} onSelect={setPackIndex} />}

          {(dosage || product.batch) && (
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-stone pt-4">
              {dosage && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/40">Dose</p>
                  <p className="mt-0.5 text-xs font-medium text-charcoal">{dosage} / vial</p>
                </div>
              )}
              {product.batch && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/40">Batch</p>
                  <p className="mt-0.5 text-xs font-medium text-charcoal">{product.batch.code}</p>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addToCart(product, 1, selected.unitPrice, selected.label)}
            className="mt-5 w-full rounded-md bg-copper py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:bg-stone disabled:text-charcoal/40"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
