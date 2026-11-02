import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Payment received", robots: { index: false, follow: false } };

export default function PaymentReturnPage() {
  return <div className="mx-auto max-w-xl px-5 py-24 text-center">
    <i className="ri-time-line text-5xl text-sage-deep" />
    <h1 className="mt-5 font-display text-3xl font-semibold">Payment is being confirmed</h1>
    <p className="mt-4 text-sm leading-7 text-charcoal/60">Your card payment has returned successfully. We confirm payment from Niftipay’s signed server notification before the order moves to fulfilment.</p>
    <Link href="/account?tab=orders" className="mt-8 inline-flex rounded-md bg-sage-deep px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">View orders</Link>
  </div>;
}
