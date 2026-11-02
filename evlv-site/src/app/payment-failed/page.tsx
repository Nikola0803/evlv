import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Payment not completed", robots: { index: false, follow: false } };

export default function PaymentFailedPage() {
  return <div className="mx-auto max-w-xl px-5 py-24 text-center">
    <i className="ri-error-warning-line text-5xl text-copper" />
    <h1 className="mt-5 font-display text-3xl font-semibold">Payment was not completed</h1>
    <p className="mt-4 text-sm leading-7 text-charcoal/60">No fulfilment has been triggered. Return to checkout to try again, or contact support if your card shows a pending charge.</p>
    <div className="mt-8 flex justify-center gap-3"><Link href="/checkout" className="rounded-md bg-sage-deep px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">Return to checkout</Link><Link href="/contact" className="rounded-md border border-charcoal/20 px-6 py-3 text-xs font-bold uppercase tracking-wider">Contact support</Link></div>
  </div>;
}
