"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { CheckoutBwHBrandOffer, SaleFreeBwGiftNotice, isSaleActive, FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_COST, ShippingProgressBar } from "@/components/layout/CartUpsellOffers";
import { getStoredToken, getStoredUser } from "@/lib/auth";
import { PAYMENT_GATEWAYS, PAYMENT_PROCESSOR_NOTE, type PaymentGatewayId } from "@/lib/payment-config";
import { getStoredCouponCode, setStoredCouponCode } from "@/lib/referral";
import { useCouponValidation } from "@/lib/use-coupon-validation";
import { trackEvent } from "@/lib/pixel";
import { identifyOmnisendContact, trackOmnisendStartedCheckout } from "@/lib/omnisend";
import { getProductImage } from "@/lib/product-images";
import { formatAttributionNote, getStoredAttribution } from "@/lib/campaign-attribution";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

const CA_PROVINCES = ["AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"];

const MEMO_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function generateMemo() {
  let code = "";
  for (let i = 0; i < 4; i++) code += MEMO_CHARS[Math.floor(Math.random() * MEMO_CHARS.length)];
  return code;
}

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState<"US" | "CA">("US");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [ruoAttestation, setRuoAttestation] = useState(false);
  const [couponCode, setCouponCode] = useState(() => getStoredCouponCode());

  const [selectedGateway, setSelectedGateway] = useState<PaymentGatewayId | null>(null);
  const [memo] = useState(() => generateMemo());
  const [handleCopied, setHandleCopied] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const checkoutTracked = useRef(false);

  const cartItemsForCoupon = lines.map((l) => ({ slug: l.product.slug, quantity: l.qty }));
  const storedUserEmail = getStoredUser()?.email;
  const couponCustomerEmail = storedUserEmail || email.trim() || undefined;
  const coupon = useCouponValidation(couponCode, cartItemsForCoupon, couponCustomerEmail);
  const automaticJoin25 = coupon.valid && coupon.automaticPromotion === "JOIN25_FIRST_ORDER";
  const automaticHalloween = coupon.valid && coupon.automaticPromotion === "HALLOWEEN_BOGO_2026";
  const automaticGlpPromotion = coupon.valid && coupon.automaticPromotion === "GLP_PAIR_OCT_2026";
  const automaticResearchSet = coupon.valid && coupon.automaticPromotion === "RESEARCH_SET_OCT_2026";
  const exclusiveAutomaticPromotion = automaticJoin25 || automaticHalloween || automaticGlpPromotion || automaticResearchSet;
  const discount = coupon.valid ? coupon.discountUsd : 0;
  const displaySubtotal = coupon.automaticPromotion && coupon.subtotalUsd != null ? coupon.subtotalUsd : subtotal;
  const discountedSubtotal = Math.max(0, displaySubtotal - discount);
  const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_COST;
  const total = discountedSubtotal + shipping;
  const p2pDiscount = selectedGateway ? Math.round(total * 0.05 * 100) / 100 : 0;
  const payTotal = total - p2pDiscount;
  const shippingComplete = Boolean(
    firstName.trim() && lastName.trim() && email.trim() && address1.trim() && city.trim() && stateCode && zip.trim()
  );

  useEffect(() => {
    const syncAppliedCoupon = (event: Event) => {
      const code = (event as CustomEvent<{ code?: string }>).detail?.code?.trim();
      if (code) setCouponCode(code);
    };
    window.addEventListener("evlv:coupon-applied", syncAppliedCoupon);
    return () => window.removeEventListener("evlv:coupon-applied", syncAppliedCoupon);
  }, []);

  useEffect(() => {
    if (checkoutTracked.current || lines.length === 0) return;
    checkoutTracked.current = true;
    trackEvent("begin_checkout", {
      currency,
      valueCents: Math.round(subtotal * 100),
      items: lines.map((line) => ({
        item_id: line.product.sku,
        item_name: line.product.name,
        item_category: line.product.category,
        quantity: line.qty,
        price: line.unitPrice,
      })),
    });
    trackOmnisendStartedCheckout(lines, subtotal, currency);
  }, [currency, lines, subtotal]);

  useEffect(() => {
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) return;
    const timer = window.setTimeout(() => {
      trackEvent("identify", { email: trimmed });
      identifyOmnisendContact(trimmed);
    }, 800);
    return () => window.clearTimeout(timer);
  }, [email]);

  const selectedGatewayInfo = PAYMENT_GATEWAYS.find((g) => g.id === selectedGateway) ?? null;

  async function handleCopyGatewayHandle() {
    if (!selectedGatewayInfo?.handle) return;
    try {
      await navigator.clipboard.writeText(selectedGatewayInfo.handle);
      setHandleCopied(true);
      window.setTimeout(() => setHandleCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  function handleContinueToPayment() {
    if (!shippingComplete) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedGateway || !shippingComplete || !ruoAttestation || placing) return;
    setCheckoutError("");
    setPlacing(true);
    trackEvent("order_submit_attempt", {
      currency,
      valueCents: Math.round(total * 100),
      payment_method: selectedGateway,
    });

    const user = getStoredUser();
    const gatewayInfo = PAYMENT_GATEWAYS.find((g) => g.id === selectedGateway)!;
    const attribution = getStoredAttribution();
    let orderId = "";
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({ slug: l.product.slug, quantity: l.qty })),
          paymentMethod: selectedGateway,
          paymentMemo: memo,
          shippingCents: Math.round(shipping * 100),
          couponCode: exclusiveAutomaticPromotion ? undefined : couponCode.trim() || undefined,
          affiliateRef: exclusiveAutomaticPromotion ? undefined : couponCode.trim() || undefined,
          discountCode: exclusiveAutomaticPromotion ? undefined : couponCode.trim() || undefined,
          customerNote: [
            `RUO attestation: purchaser confirmed laboratory/research use only at ${new Date().toISOString()}.`,
            `P2P payment discount (5%): customer pays ${payTotal.toFixed(2)} via ${selectedGateway} (original total: ${total.toFixed(2)}).`,
            formatAttributionNote(attribution),
          ]
            .filter(Boolean)
            .join(" | "),
          ruoAttested: true,
          ruoAttestedAt: new Date().toISOString(),
          customerId: user && user.user_id !== "local" ? user.user_id : undefined,
          token: getStoredToken() || undefined,
          customerEmail: email.trim(),
          billing: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address1: address1.trim(),
            city: city.trim(),
            state: stateCode,
            zip: zip.trim(),
            country,
          },
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { number?: string; id?: string; error?: string; message?: string };
      if (!res.ok) throw new Error(data.error || data.message || "We could not submit your order. Please try again.");
      orderId = data.number || data.id || "";
      if (!orderId) throw new Error("The order system did not return a confirmation number. Your cart has not been cleared.");
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "We could not submit your order. Please try again.";
      setCheckoutError(message);
      trackEvent("order_submit_error", {
        payment_method: selectedGateway,
        error_message: message.slice(0, 180),
      });
      setPlacing(false);
      return;
    }

    trackEvent("order_created", {
      currency,
      valueCents: Math.round(total * 100),
      order_number: orderId,
      payment_method: selectedGateway,
      campaign: attribution?.campaign,
      source: attribution?.source,
    });

    clearCart();
    const params = new URLSearchParams({
      order: orderId,
      gateway: selectedGateway,
      label: gatewayInfo.label,
      handle: gatewayInfo.handle || "",
      memo,
      total: payTotal.toFixed(2),
      currency,
    });
    router.push(`/order-success?${params.toString()}`);
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Your cart is empty</h1>
        <p className="mt-2 text-sm text-charcoal/50">Add something to your cart before checking out.</p>
        <Link href="/shop" className="mt-6 inline-block rounded-md bg-copper px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light">
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-14">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest">
        <span className={step === 1 ? "text-charcoal" : "text-charcoal/35"}>
          {step === 2 && <i className="ri-check-line mr-1 text-sage-deep" />}
          Delivery
        </span>
        <span className="text-charcoal/20">—</span>
        <span className={step === 2 ? "text-charcoal" : "text-charcoal/35"}>Payment</span>
      </div>

      <form onSubmit={handlePlaceOrder}>
        {/* ── Step 1: Delivery ── */}
        {step === 1 && (
          <div className="mx-auto max-w-lg space-y-5">
            <div className="cp-checkout-panel">
              <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-charcoal/50">Shipping Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First Name" required value={firstName} onChange={setFirstName} placeholder="John" />
                <Field label="Last Name" required value={lastName} onChange={setLastName} placeholder="Doe" />
                <Field label="Email" required type="email" value={email} onChange={setEmail} placeholder="you@lab.edu" className="sm:col-span-2" />
                <Field label="Phone (optional)" type="tel" value={phone} onChange={setPhone} placeholder="+1 (555) 000-0000" className="sm:col-span-2" />
                <Field label="Street Address" required value={address1} onChange={setAddress1} placeholder="123 Research Blvd" className="sm:col-span-2" />

                <div>
                  <label className="mb-2 block text-sm font-medium text-charcoal/70">
                    Country <span className="text-copper">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => { setCountry(e.target.value as "US" | "CA"); setStateCode(""); }}
                    className="h-12 w-full rounded-md border border-stone bg-white px-4 text-base text-charcoal outline-none focus:border-copper"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
                <Field label="City" required value={city} onChange={setCity} placeholder="Boston" />

                <div>
                  <label className="mb-2 block text-sm font-medium text-charcoal/70">
                    {country === "US" ? "State" : "Province"} <span className="text-copper">*</span>
                  </label>
                  <select
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value)}
                    className="h-12 w-full rounded-md border border-stone bg-white px-4 text-base text-charcoal outline-none focus:border-copper"
                  >
                    <option value="" disabled>Select...</option>
                    {(country === "US" ? US_STATES : CA_PROVINCES).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <Field label="ZIP / Postal Code" required value={zip} onChange={setZip} placeholder="02110" maxLength={10} />
              </div>

              <label className="mt-5 flex items-start gap-3 rounded-lg border border-stone bg-ivory-soft p-3.5">
                <input type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-copper" />
                <span className="text-xs leading-relaxed text-charcoal/55">
                  Receive order updates by text and email (optional). Msg & data rates may apply. Reply STOP to cancel.{" "}
                  <Link href="/privacy" className="text-copper hover:underline">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleContinueToPayment}
              disabled={!shippingComplete}
              className="w-full rounded-md bg-charcoal px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-ivory transition hover:bg-sage-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* ── Step 2: Payment ── */}
        {step === 2 && (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
            {/* Left column */}
            <div className="space-y-5">
              {/* Delivery summary */}
              <div className="flex items-start justify-between rounded-lg border border-stone bg-ivory-soft px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/40">Delivering to</p>
                  <p className="mt-1 text-sm font-medium text-charcoal">{firstName} {lastName}</p>
                  <p className="text-sm text-charcoal/55">{address1}, {city}, {stateCode} {zip}</p>
                  <p className="text-sm text-charcoal/55">{email}</p>
                </div>
                <button type="button" onClick={() => setStep(1)} className="ml-4 shrink-0 text-xs font-medium text-copper hover:underline">
                  Edit
                </button>
              </div>

              {/* Payment method */}
              <div className="cp-checkout-panel">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal/50">Payment Method</h2>
                <div className="grid grid-cols-3 gap-3">
                  {PAYMENT_GATEWAYS.map((gw) => {
                    const active = selectedGateway === gw.id;
                    return (
                      <button
                        key={gw.id}
                        type="button"
                        onClick={() => {
                          setSelectedGateway(gw.id);
                          setHandleCopied(false);
                          trackEvent("select_payment_method", {
                            currency,
                            valueCents: Math.round(total * 100),
                            payment_method: gw.id,
                          });
                        }}
                        aria-pressed={active}
                        className={`relative flex flex-col items-center gap-2.5 rounded-lg border p-5 pt-7 transition ${
                          active ? "border-copper bg-copper/10" : "border-stone bg-ivory-soft hover:border-charcoal/30"
                        }`}
                      >
                        {active && <i className="ri-checkbox-circle-fill absolute right-2.5 top-2.5 text-base text-copper" />}
                        <span className="absolute left-0 right-0 top-0 rounded-t-lg bg-sage-deep py-0.5 text-center text-[9px] font-semibold uppercase tracking-wide text-ivory">Save 5%</span>
                        <i className={`${gw.icon} text-3xl ${active ? "text-copper" : "text-charcoal/40"}`} />
                        <span className={`text-sm font-medium ${active ? "text-copper" : "text-charcoal/60"}`}>{gw.label}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedGatewayInfo && (
                  <div className="mt-4 rounded-lg border border-stone bg-ivory-soft p-4">
                    <p className="mb-3 flex items-center gap-2 text-sm font-medium text-charcoal/70">
                      <i className={`${selectedGatewayInfo.icon} text-copper`} /> Send to
                    </p>
                    {selectedGatewayInfo.handle ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="flex h-11 flex-1 items-center truncate rounded-md border border-copper/40 bg-white px-4 font-mono text-sm text-copper">
                            {selectedGatewayInfo.handle}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyGatewayHandle}
                            className="h-11 shrink-0 whitespace-nowrap rounded-md border border-stone px-4 text-sm font-medium text-charcoal/70 transition hover:border-copper hover:text-copper"
                          >
                            {handleCopied ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-charcoal/50">{selectedGatewayInfo.handleNote}</p>
                      </>
                    ) : (
                      <p className="flex items-start gap-2 text-sm leading-relaxed text-charcoal/60">
                        <i className="ri-mail-send-line mt-0.5 shrink-0 text-copper" />
                        We&rsquo;ll email your {selectedGatewayInfo.label} details right after you place the order.
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between rounded-md border border-copper/30 bg-white px-4 py-2.5">
                      <span className="text-xs text-charcoal/55">Amount to send</span>
                      <div className="flex items-baseline gap-2">
                        {p2pDiscount > 0 && <span className="text-xs text-charcoal/35 line-through">{formatPrice(total)}</span>}
                        <span className="font-display text-base font-semibold text-copper">{formatPrice(payTotal)}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-charcoal/40">{PAYMENT_PROCESSOR_NOTE}</p>
                  </div>
                )}
              </div>

              {/* RUO attestation */}
              <label className="flex items-start gap-3 rounded-lg border border-stone bg-ivory-soft p-4">
                <input
                  type="checkbox"
                  checked={ruoAttestation}
                  onChange={(e) => setRuoAttestation(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-copper"
                />
                <span className="text-xs leading-relaxed text-charcoal/60">
                  I confirm these products are for laboratory / analytical research use only — not for human or animal consumption or therapeutic use.{" "}
                  <Link href="/ruo" className="text-copper hover:underline">Research Use Only Policy</Link>
                </span>
              </label>

              {checkoutError && (
                <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm leading-relaxed text-red-800">
                  <p className="font-semibold"><i className="ri-error-warning-line mr-1.5" />Order not submitted</p>
                  <p className="mt-1">{checkoutError} Your cart is still saved.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedGateway || !shippingComplete || !ruoAttestation || placing}
                className="w-full rounded-md bg-copper px-5 py-5 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal transition hover:bg-copper-light disabled:cursor-not-allowed disabled:opacity-40"
              >
                {placing ? "Submitting..." : `Submit Order · ${formatPrice(payTotal)}`}
              </button>
            </div>

            {/* Right column — Order summary */}
            <div className="h-fit rounded-lg border border-stone bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal/50">Order Summary</h2>
              <ShippingProgressBar qualifyingSubtotal={discountedSubtotal} />
              <div className="space-y-4">
                {lines.map((line) => (
                  <div key={`${line.product.id}-${line.packLabel}`} className="flex gap-3">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-white">
                      <Image src={getProductImage(line.product)} alt={line.product.name} width={112} height={140} className="h-full w-full object-cover" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] font-semibold text-ivory">{line.qty}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal">{line.product.name}</p>
                      <p className="text-xs text-charcoal/50">{line.packLabel}</p>
                    </div>
                    <span className="text-sm font-semibold text-charcoal">{formatPrice(line.qty * line.unitPrice)}</span>
                  </div>
                ))}
              </div>

              <CheckoutBwHBrandOffer />
              <SaleFreeBwGiftNotice />

              {/* Promo code */}
              <div className="mt-4 border-t border-stone pt-4">
                {automaticHalloween ? (
                  <div className="rounded-md border border-orange-500/40 bg-[#1a0b20] p-3 text-orange-200">
                    <p className="flex items-center gap-2 text-xs font-semibold"><i className="ri-checkbox-circle-fill" /> Halloween BOGO applied</p>
                    <p className="mt-0.5 text-xs leading-relaxed">Every second matching item is free. You saved {formatPrice(coupon.discountUsd)}. No code and no stacking.</p>
                  </div>
                ) : automaticJoin25 ? (
                  <div className="rounded-md border border-sage-deep/30 bg-sage-deep/[0.07] p-3 text-sage-deep">
                    <p className="flex items-center gap-2 text-xs font-semibold"><i className="ri-checkbox-circle-fill" /> 25% first-order reward applied</p>
                    <p className="mt-0.5 text-xs leading-relaxed">You saved {formatPrice(coupon.discountUsd)}. No code is needed, and this reward cannot be combined with another offer.</p>
                  </div>
                ) : automaticGlpPromotion ? (
                  <div className="rounded-md border border-sage-deep/30 bg-sage-deep/[0.07] p-3 text-sage-deep">
                    <p className="flex items-center gap-2 text-xs font-semibold"><i className="ri-checkbox-circle-fill" /> GLP Pair Event applied</p>
                    <p className="mt-0.5 text-xs leading-relaxed">Second eligible item 70% off. You saved {formatPrice(coupon.discountUsd)}.</p>
                  </div>
                ) : (
                  <>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                      Promo / Referral Code <span className="font-normal normal-case text-charcoal/40">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        const next = e.target.value.toUpperCase();
                        setCouponCode(next);
                        setStoredCouponCode(next);
                      }}
                      placeholder="Enter a code"
                      className="h-10 w-full rounded-md border border-stone bg-white px-3 text-sm uppercase tracking-wide text-charcoal outline-none placeholder:text-charcoal/40 placeholder:normal-case focus:border-copper"
                    />
                    {coupon.checking && <p className="mt-1 text-xs text-charcoal/40">Checking...</p>}
                    {!coupon.checking && coupon.valid && (
                      <p className="mt-1 text-xs font-medium text-sage-deep">
                        {coupon.promotionLabel || (couponCode.trim() ? "Code applied" : "Member reward applied")} · {formatPrice(coupon.discountUsd)} off
                        {coupon.flooredByMargin ? " (partial)" : ""}
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="mt-4 space-y-2 border-t border-stone pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-medium text-charcoal">{formatPrice(displaySubtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sage-deep">
                      {automaticHalloween ? "Halloween BOGO" : automaticJoin25 ? "25% first-order reward" : automaticGlpPromotion ? "GLP Pair Event" : automaticResearchSet ? "Research Set" : `Discount${couponCode.trim() ? ` (${couponCode.trim()})` : " (member)"}`}
                    </span>
                    <span className="font-medium text-sage-deep">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/60">Shipping</span>
                  <span className="font-medium text-charcoal">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {isSaleActive() && (
                  <div className="flex items-center justify-between">
                    <span className="text-sage-deep">Free gift (BW 10mL)</span>
                    <span className="font-medium text-sage-deep">Included</span>
                  </div>
                )}
                {p2pDiscount > 0 && (
                  <div className="flex items-center justify-between rounded-md bg-sage-deep/[0.07] px-2 py-1.5">
                    <span className="text-sage-deep">P2P discount (5%)</span>
                    <span className="font-medium text-sage-deep">-{formatPrice(p2pDiscount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-stone pt-3 text-base">
                  <span className="font-medium text-charcoal">Total</span>
                  <div className="text-right">
                    {p2pDiscount > 0 && <p className="text-xs text-charcoal/40 line-through">{formatPrice(total)}</p>}
                    <span className="font-display text-lg font-semibold text-charcoal">{formatPrice(payTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  maxLength,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-charcoal/70">
        {label} {required && <span className="text-copper">*</span>}
      </label>
      <input
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-md border border-stone bg-white px-4 text-base text-charcoal outline-none placeholder:text-charcoal/40 focus:border-copper"
      />
    </div>
  );
}
