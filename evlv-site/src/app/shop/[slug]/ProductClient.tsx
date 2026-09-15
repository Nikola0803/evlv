"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { PackSelector, usePackSelection } from "@/components/product/PackSelector";
import { MediaGallery } from "@/components/product/MediaGallery";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { getStoredUser } from "@/lib/auth";
import { getAnchorPrice } from "@/lib/pricing";
import { ResearchUseNotice } from "@/components/product/ResearchUseNotice";
import { trackEvent } from "@/lib/pixel";
import type { CoaEntry } from "@/lib/coa-data";

const TABS = ["Description", "Lab Report"] as const;

const DOSAGE_PATTERN = /\s(\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g)(?:\/\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g))?)$/i;

function splitDosage(name: string) {
  const match = name.match(DOSAGE_PATTERN);
  if (!match) return { title: name, dosage: null as string | null };
  return { title: name.slice(0, match.index).trim(), dosage: match[1].toUpperCase() };
}

export function ProductClient({ product, coa }: { product: Product; coa?: CoaEntry }) {
  const { packIndex, setPackIndex, packs, selected } = usePackSelection(product);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [isMember, setIsMember] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    setIsMember(user?.plan === "member");
    setIsVerified(user?.researcherStatus === "APPROVED");
  }, []);

  useEffect(() => {
    trackEvent("view_content", { properties: { name: product.name, slug: product.slug, sku: product.sku } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const ctaRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Scroll-position based (not IntersectionObserver) so it also works
  // correctly in environments/tools that throttle IO callbacks in
  // background or automated tabs.
  useEffect(() => {
    function check() {
      const el = ctaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0 || rect.top > window.innerHeight);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const memberLocked = !!product.memberOnly && !isMember;
  const restrictedLocked = !!product.restricted && !isVerified;
  const locked = memberLocked || restrictedLocked;

  // One consolidated benefits list -- mirrors the reference PDP's single
  // bordered "key benefits" block rather than splitting the same trust
  // signals across a bullet list AND a separate badge-card grid.
  const KEY_BENEFITS = [
    { icon: "ri-shield-check-line", title: "Identity & Purity Verified", subtitle: "Every batch tested by an independent lab" },
    {
      icon: "ri-file-list-3-line",
      title: "Certificate of Analysis",
      subtitle: `Published per batch, searchable by lot code${product.purity ? ` -- ${product.purity} purity` : ""}`,
    },
    { icon: "ri-truck-line", title: "Ships Same Day", subtitle: "Discreet packaging, before daily cutoff" },
    { icon: "ri-lock-line", title: "Secure Checkout", subtitle: "No membership or subscription required" },
  ];

  const lineTotal = selected.unitPrice * selected.qty;
  const variantPrices = product.variants?.map((v) => v.price) ?? [];
  const minVariantPrice = variantPrices.length > 0 ? Math.min(product.price, ...variantPrices) : product.price;
  const hasCheaperVariant = !!product.variants && product.variants.length > 1 && minVariantPrice < product.price;
  const { title, dosage } = splitDosage(product.name);

  return (
    <>
    <section className="grid grid-cols-1 gap-6 pb-20 lg:grid-cols-[1.04fr_1fr] lg:items-start lg:gap-x-[60px] lg:gap-y-1 lg:pb-0">
      {/* Gallery -- left column, spans both rows on wide desktop like the reference */}
      <div className="relative self-start lg:sticky lg:top-[110px] lg:col-start-1 lg:row-start-1 lg:row-span-2">
        <MediaGallery name={product.name} title={title} dosage={dosage} image={product.image} gallery={product.gallery} />
        <div className="pointer-events-none absolute inset-0 flex items-start justify-between p-4">
          {product.badges?.map((b) => (
            <span key={b} className="pointer-events-auto rounded-full bg-sage-deep px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              {b}
            </span>
          ))}
          {locked && (
            <span className="pointer-events-auto ml-auto flex items-center gap-1.5 rounded-full bg-charcoal/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-copper backdrop-blur-sm">
              <i className="ri-lock-line" /> {restrictedLocked ? "Verified Researchers Only" : "Member Exclusive"}
            </span>
          )}
        </div>
      </div>

      {/* Hero head -- title + rating on one line, subhead below */}
      <div className="flex flex-col lg:col-start-2 lg:row-start-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
          <h1
            className="font-medium text-charcoal"
            style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fontSize: "clamp(1.9rem, 4vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            {title}
          </h1>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-sm tracking-wider text-sage-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="ri-star-fill" />
              ))}
            </span>
            <span className="text-sm font-semibold text-charcoal">{product.rating}</span>
            <a href="#reviews" className="text-sm text-charcoal/50 underline underline-offset-2 hover:text-charcoal">
              ({product.reviewCount} reviews)
            </a>
          </div>
        </div>
        <p className="mt-2 text-base leading-relaxed text-charcoal/60 md:text-lg">{product.shortDescription}</p>
      </div>

      {/* Buy box -- right column, below the hero head */}
      <div className="flex flex-col lg:col-start-2 lg:row-start-2 lg:mt-2.5">
        <div className="mt-1">
          {hasCheaperVariant && (
            <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-charcoal/40">
              Starting at {formatPrice(minVariantPrice)}
            </p>
          )}
          <div className="flex items-baseline gap-3">
            <span className="whitespace-nowrap text-lg font-medium text-charcoal/25 line-through md:text-xl">
              {formatPrice(getAnchorPrice(selected.unitPrice))}
            </span>
            <div className="font-display text-3xl font-semibold text-charcoal md:text-4xl">{formatPrice(selected.unitPrice)}</div>
            <span className={`flex items-center gap-1 text-xs font-medium ${product.inStock ? "text-sage-deep" : "text-charcoal/40"}`}>
              <i className="ri-checkbox-circle-line" /> {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          {product.bulkOption && (
            <p className="mt-1 text-sm text-charcoal/50">
              Case pricing available -- {product.bulkOption.qty}-unit case at reduced per-unit cost
            </p>
          )}
          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-copper-dark">
            <i className="ri-fire-line" /> High demand -- 13 people viewing now
          </p>
        </div>

        {product.variants && product.variants.length > 1 && (
          <div className="mt-6">
            <label className="mb-2.5 block text-[13px] font-semibold text-charcoal">Size</label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => {
                const active = v.slug === product.slug;
                return (
                  <Link
                    key={v.slug}
                    href={`/shop/${v.slug}`}
                    className={`flex items-center gap-1.5 rounded-full border-[1.5px] px-3.5 py-2 text-xs font-semibold transition ${
                      active ? "border-sage-deep bg-white text-sage-deep shadow-sm" : "border-stone bg-white text-charcoal/70 hover:border-charcoal/30"
                    } ${!v.inStock ? "pointer-events-none opacity-40" : ""}`}
                  >
                    {v.label}
                    <span className={active ? "text-sage-deep/70" : "text-charcoal/40"}>{formatPrice(v.price)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6">
          <PackSelector packs={packs} packIndex={packIndex} onSelect={setPackIndex} formatPrice={formatPrice} />
        </div>

        {locked && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-copper/30 bg-copper/5 p-4 text-sm text-charcoal/70">
            <i className="ri-lock-line text-copper" />
            {restrictedLocked ? (
              <>
                This product requires verified researcher/institutional access.{" "}
                <Link href="/account?tab=verification" className="font-semibold text-copper hover:underline">
                  Apply for verification
                </Link>
              </>
            ) : (
              <>
                This is a member-exclusive blend.{" "}
                <Link href="/plans" className="font-semibold text-copper hover:underline">
                  View plans
                </Link>
              </>
            )}
          </div>
        )}

        <div ref={ctaRef} className="mt-6">
          {locked ? (
            <Link
              href={restrictedLocked ? "/account?tab=verification" : "/plans"}
              className="block w-full rounded-xl bg-copper py-4 text-center text-sm font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light"
            >
              {restrictedLocked ? "Apply for Verification" : "Unlock With Membership"}
            </Link>
          ) : (
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => addToCart(product, selected.qty, selected.unitPrice, selected.label)}
              className="block w-full rounded-xl bg-copper py-4 text-sm font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:bg-stone disabled:text-charcoal/50"
            >
              {product.inStock ? `Add to Cart -- ${formatPrice(lineTotal)}` : "Out of Stock"}
            </button>
          )}
        </div>

        <ResearchUseNotice />

        {/* Key benefits -- compact 2x2 grid, icon in a tinted rounded square.
            Sits below the CTA so it reads as reassurance right after the
            purchase decision, not as another thing to read before it. */}
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-stone bg-white p-4 shadow-sm">
          {KEY_BENEFITS.map((item) => (
            <div key={item.title} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sage-mist/70 text-xs text-sage-deep">
                <i className={item.icon} />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold leading-tight text-charcoal">{item.title}</div>
                <div className="mt-0.5 text-[11px] leading-snug text-charcoal/50">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Always visible -- COA/batch trust signal shouldn't depend on a
            visitor clicking into a tab. The Lab Report tab below still has
            the fuller breakdown (avg. mass, etc); this is the "prove it"
            summary right next to the buy decision. */}
        <div className="mt-4 overflow-hidden rounded-xl border border-sage-deep/25 bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-sage-deep px-4 py-2.5 text-white">
            <i className="ri-verified-badge-fill" />
            <span className="text-xs font-semibold uppercase tracking-wider">Certificate of Analysis</span>
          </div>
          <div className="p-4">
            {product.batch ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-stone px-1.5 py-0.5 font-mono text-[11px] text-charcoal/70">
                      {product.batch.code}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-sage-deep">
                      <i className="ri-checkbox-circle-fill" /> PASS
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-charcoal/50">
                    Tested {product.batch.date}
                    {product.purity ? ` -- ${product.purity} purity` : ""}
                  </p>
                </div>
                {coa ? (
                  <a
                    href={coa.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-charcoal px-3.5 py-2 text-xs font-semibold uppercase tracking-wide text-ivory transition hover:bg-charcoal/85"
                  >
                    View PDF <i className="ri-download-2-line" />
                  </a>
                ) : (
                  <Link href="/coas" className="shrink-0 text-xs font-semibold text-sage-deep underline underline-offset-2">
                    Find it in the COA library
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-charcoal/60">This batch&apos;s certificate hasn&apos;t been published to this listing yet.</p>
                <Link href="/coas" className="shrink-0 text-xs font-semibold text-sage-deep underline underline-offset-2">
                  Browse all COAs
                </Link>
              </div>
            )}
          </div>
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
                {t}
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
            {tab === "Lab Report" && (
              <div className="max-w-sm">
                {product.batch ? (
                  <>
                    <p className="mb-3 text-sm text-charcoal/60">
                      Every batch is tested by an independent third-party lab before it ships. Certificate of Analysis for batch {product.batch.code}:
                    </p>
                    <div className="overflow-hidden rounded-xl border border-stone">
                    <dl className="divide-y divide-stone text-xs">
                      <Row label="Batch" value={product.batch.code} />
                      <Row label="Date" value={product.batch.date} />
                      {product.purity && <Row label="Purity" value={product.purity} />}
                      {product.avgMass && <Row label="Avg. Mass" value={product.avgMass} />}
                      <Row label="Status" value="PASS" accent />
                    </dl>
                    {coa && (
                      <a
                        href={coa.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-2 border-t border-stone bg-white px-4 py-3 text-xs font-semibold text-sage-deep transition hover:bg-sage-mist"
                      >
                        View Certificate of Analysis (PDF)
                        <i className="ri-external-link-line" />
                      </a>
                    )}
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-stone bg-white p-5 text-sm text-charcoal/60">
                    Every batch we ship is independently lab-tested -- this specific listing&apos;s certificate hasn&apos;t
                    been published here yet.{" "}
                    <Link href="/coas" className="font-semibold text-sage-deep underline underline-offset-2">
                      Browse the full COA library
                    </Link>{" "}
                    or contact us for the current batch&apos;s report.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* Persistent buy bar: reappears once the primary Add to Cart button scrolls
        out of view, so a long page never leaves a visitor without a one-tap
        way back to checkout. */}
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-stone bg-ivory/95 shadow-[0_-4px_24px_rgba(20,39,26,0.08)] backdrop-blur transition-transform duration-300 ${
        showStickyBar ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:px-8">
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-semibold text-charcoal">{product.name}</p>
          <p className="text-xs text-charcoal/50">{formatPrice(lineTotal)}</p>
        </div>
        <div className="flex flex-1 items-center gap-3 sm:flex-none">
          {locked ? (
            <Link
              href={restrictedLocked ? "/account?tab=verification" : "/plans"}
              className="flex-1 whitespace-nowrap rounded-xl bg-copper py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light sm:flex-none sm:px-8"
            >
              {restrictedLocked ? "Apply for Verification" : "Unlock With Membership"}
            </Link>
          ) : (
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => addToCart(product, selected.qty, selected.unitPrice, selected.label)}
              className="flex-1 whitespace-nowrap rounded-xl bg-copper py-3.5 text-sm font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:bg-stone disabled:text-charcoal/50 sm:flex-none sm:px-8"
            >
              {product.inStock ? `Add to Cart -- ${formatPrice(lineTotal)}` : "Out of Stock"}
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-stone bg-white p-4">
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
