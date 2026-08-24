"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { PackSelector, usePackSelection } from "@/components/product/PackSelector";
import { useCart } from "@/lib/cart-context";

const TABS = ["Description", "Reviews", "Lab Report"] as const;

const DOSAGE_PATTERN = /\s(\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g)(?:\/\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g))?)$/i;

function splitDosage(name: string) {
  const match = name.match(DOSAGE_PATTERN);
  if (!match) return { title: name, dosage: null as string | null };
  return { title: name.slice(0, match.index).trim(), dosage: match[1].toUpperCase() };
}

const TRUST_ITEMS = [
  { icon: "ri-shield-check-line", title: "Independently Verified", subtitle: "Independent lab testing" },
  { icon: "ri-truck-line", title: "Free Shipping", subtitle: "Orders over $300 CAD" },
  { icon: "ri-lock-line", title: "Secure Checkout", subtitle: "256-bit encryption" },
  { icon: "ri-refresh-line", title: "Satisfaction Guaranteed", subtitle: "Quality assured" },
];

export function ProductClient({ product }: { product: Product }) {
  const { packIndex, setPackIndex, packs, selected } = usePackSelection(product);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");
  const { addToCart } = useCart();

  const lineTotal = selected.unitPrice * qty * selected.qty;
  const shippingThreshold = 300;
  const shippingProgress = Math.min(100, (lineTotal / shippingThreshold) * 100);
  const shippingRemaining = Math.max(0, shippingThreshold - lineTotal);
  const { title, dosage } = splitDosage(product.name);

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative">
        <div className="overflow-hidden rounded-lg border border-stone bg-ivory-soft">
          <div className="aspect-square w-full">
            {product.image ? (
              <Image src={product.image} alt={product.name} width={800} height={800} sizes="(max-width: 1024px) 90vw, 560px" className="h-full w-full object-cover" priority />
            ) : (
              <ProductVisual name={title} dosage={dosage} className="h-full w-full p-10" />
            )}
          </div>
        </div>
        {product.badges?.map((b) => (
          <span key={b} className="absolute left-4 top-4 rounded-full bg-sage-deep px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
            {b}
          </span>
        ))}
      </div>

      <div className="flex flex-col">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-sage-deep">{product.categoryLabel}</div>
        <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-charcoal md:text-4xl">{product.name}</h1>
        <div className="mt-3 flex items-center gap-2">
          <span className="flex items-center gap-0.5 text-sage-deep">
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} className="ri-star-fill text-sm" />
            ))}
          </span>
          <span className="text-sm font-semibold text-charcoal">{product.rating}</span>
          <span className="text-sm text-charcoal/50">({product.reviewCount} reviews)</span>
        </div>

        <div className="mt-5">
          <div className="font-display text-3xl font-semibold text-charcoal md:text-4xl">
            ${selected.unitPrice.toFixed(2)} <span className="text-base font-normal text-charcoal/50">CAD</span>
          </div>
          {product.bulkOption && (
            <p className="mt-1 text-sm text-charcoal/50">
              Single vial — save {product.bulkOption.savePercent}% with {product.bulkOption.qty}-pack
            </p>
          )}
        </div>

        {(product.purity || product.avgMass) && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-sage-mist bg-sage-mist/40 p-3">
            <i className="ri-flask-line text-sage-deep" />
            <span className="text-sm font-medium text-sage-deep">
              {product.purity && `Purity ${product.purity}`}
              {product.purity && product.avgMass && " / "}
              {product.avgMass && `Avg. mass ${product.avgMass}`}
            </span>
          </div>
        )}

        <div className="mt-3 flex items-center gap-4 text-xs text-charcoal/50">
          <span>
            SKU: <span className="font-medium text-charcoal/70">{product.sku}</span>
          </span>
        </div>

        <div className="mt-6">
          <PackSelector packs={packs} packIndex={packIndex} onSelect={setPackIndex} savePercent={product.bulkOption?.savePercent} />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-charcoal/60">Quantity</label>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-md border border-stone bg-ivory">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center rounded-l-md transition hover:bg-ivory-soft" aria-label="Decrease quantity">
                <i className="ri-subtract-line text-charcoal/70" />
              </button>
              <span className="w-12 text-center text-sm font-semibold text-charcoal">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="flex h-11 w-11 items-center justify-center rounded-r-md transition hover:bg-ivory-soft" aria-label="Increase quantity">
                <i className="ri-add-line text-charcoal/70" />
              </button>
            </div>
            <span className={`flex items-center gap-1 text-xs font-medium ${product.inStock ? "text-sage-deep" : "text-charcoal/40"}`}>
              <i className="ri-checkbox-circle-line" /> {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addToCart(product, qty * selected.qty, selected.unitPrice, selected.label)}
            className="flex-1 whitespace-nowrap rounded-md bg-copper py-4 text-sm font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:bg-stone disabled:text-charcoal/50"
          >
            {product.inStock ? `Add to Cart — $${lineTotal.toFixed(2)}` : "Out of Stock"}
          </button>
          <a href="/shop" className="flex-1 whitespace-nowrap rounded-md border border-charcoal py-4 text-center text-sm font-semibold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-ivory">
            Continue Shopping
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-2 rounded-lg bg-ivory-soft p-3 text-xs">
              <i className={`${item.icon} flex h-5 w-5 items-center justify-center text-lg text-sage-deep`} />
              <div>
                <div className="font-semibold text-charcoal">{item.title}</div>
                <div className="text-charcoal/50">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-stone bg-ivory-soft p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-charcoal">Free shipping threshold</span>
            <span className="font-semibold text-sage-deep">
              {shippingRemaining > 0 ? `$${shippingRemaining.toFixed(0)} away` : "Unlocked"}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone">
            <div className="h-full rounded-full bg-sage transition-all duration-500" style={{ width: `${shippingProgress}%` }} />
          </div>
          <p className="mt-2 text-xs text-charcoal/50">Free express shipping on all orders over $300 CAD</p>
        </div>

        <div className="mt-10 border-t border-stone">
          <div className="flex items-center gap-0 border-b border-stone">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`border-b-2 px-4 py-4 text-sm font-semibold uppercase tracking-wide transition md:px-6 ${
                  tab === t ? "border-sage text-sage-deep" : "border-transparent text-charcoal/50 hover:text-charcoal"
                }`}
              >
                {t === "Reviews" ? `Reviews (${product.reviewCount})` : t}
              </button>
            ))}
          </div>

          <div className="py-8 text-base leading-relaxed text-charcoal/70 md:py-12">
            {tab === "Description" && (
              <div className="max-w-3xl">
                <p className="text-base md:text-lg">{product.description}</p>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoCard title="Storage" body={product.storage} />
                  {product.reconstitution && <InfoCard title="Reconstitution" body={product.reconstitution} />}
                  <InfoCard title="Testing" body="Every batch is independently tested. View the full lab report in the Lab Report tab." />
                  <InfoCard title="Shipping" body="Ships domestically in discreet packaging. Tracking provided within 1 business day." />
                </div>
              </div>
            )}
            {tab === "Reviews" && (
              <p>
                {product.reviewCount} verified researchers rated this product an average of {product.rating.toFixed(1)}{" "}
                out of 5.
              </p>
            )}
            {tab === "Lab Report" && product.batch && (
              <div className="max-w-sm overflow-hidden rounded-lg border border-stone">
                <dl className="divide-y divide-stone text-xs">
                  <Row label="Batch" value={product.batch.code} />
                  <Row label="Date" value={product.batch.date} />
                  {product.purity && <Row label="Purity" value={product.purity} />}
                  {product.avgMass && <Row label="Avg. Mass" value={product.avgMass} />}
                  <Row label="Status" value="PASS" accent />
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-stone bg-ivory-soft p-4">
      <h4 className="mb-1 text-sm font-semibold text-charcoal">{title}</h4>
      <p className="text-xs text-charcoal/60">{body}</p>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between bg-ivory px-4 py-2.5">
      <dt className="text-charcoal/55">{label}</dt>
      <dd className={`font-medium ${accent ? "text-sage-deep" : "text-charcoal"}`}>{value}</dd>
    </div>
  );
}
