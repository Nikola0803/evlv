import Link from "next/link";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const orderNumber = typeof params.order === "string" ? params.order : "";
  const gatewayLabel = typeof params.label === "string" ? params.label : "your selected method";
  const handle = typeof params.handle === "string" ? params.handle : "";
  const memo = typeof params.memo === "string" ? params.memo : "";

  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center px-4 py-20 text-center md:px-8">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-sage-deep/30 bg-sage-mist">
        <i className="ri-check-line text-3xl text-sage-deep" />
      </div>
      <h1 className="font-display text-2xl font-semibold text-charcoal md:text-3xl">Order Submitted</h1>

      {orderNumber && <p className="mt-4 font-mono text-sm tracking-wider text-copper">Order #{orderNumber}</p>}

      <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal/60">
        Your order has been received. Please complete payment via{" "}
        <strong className="text-charcoal">{gatewayLabel}</strong>
        {handle ? (
          <>
            {" "}
            to <span className="font-mono text-copper">{handle}</span>
          </>
        ) : (
          " using the details we email you"
        )}
        {memo ? (
          <>
            {" "}
            and include the code <span className="font-mono text-copper">{memo}</span> in your payment notes for
            faster verification.
          </>
        ) : (
          "."
        )}
      </p>

      <p className="mt-4 text-xs text-charcoal/40">Orders are typically dispatched within 24 hours of payment confirmation.</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/account" className="rounded-md bg-copper px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light">
          View Order
        </Link>
        <Link href="/shop" className="rounded-md border border-charcoal px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-charcoal hover:text-ivory">
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
