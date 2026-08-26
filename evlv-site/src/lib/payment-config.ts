/**
 * Manual payment gateway handles, shown at checkout once a customer picks
 * CashApp / Zelle / Venmo. Matches the peptides-crm-app Order schema, which
 * models paymentMethod as "zelle" | "cashapp" | "venmo" with a paymentMemo
 * field, so this checkout flow lines up with what the real CRM expects.
 *
 * Left blank until real handles are set. Checkout gracefully falls back to
 * "we'll email you the details" when a handle is empty, it never invents one.
 */
export const PAYMENT_HANDLES = {
  cashapp: "", // e.g. "$EVLVPeptides"
  zelle: "", // e.g. "payments@evlvpeptides.com" or a phone number
  venmo: "", // e.g. "@EVLV-Peptides"
};

/**
 * Placeholder handles used ONLY to render the quick-pay QR/link before real
 * handles are set in PAYMENT_HANDLES above — so the QR-code and deep-link
 * mechanism is real and testable end-to-end, but visibly not a live payment
 * destination yet. Once PAYMENT_HANDLES has a real value for a gateway,
 * getEffectiveHandle() uses that instead and these stop mattering.
 */
const DEMO_HANDLES = {
  cashapp: "$EVLVPeptidesDemo",
  zelle: "payments@evlvpeptides.com",
  venmo: "@EVLV-Peptides-Demo",
};

export type PaymentGatewayId = "cashapp" | "zelle" | "venmo";

export function getEffectiveHandle(gateway: PaymentGatewayId): { handle: string; isDemo: boolean } {
  const real = PAYMENT_HANDLES[gateway];
  return real ? { handle: real, isDemo: false } : { handle: DEMO_HANDLES[gateway], isDemo: true };
}

/**
 * Venmo and Cash App both support real "pay this exact amount" deep links.
 * Zelle has no equivalent, it's direct bank-to-bank with no public payment-
 * request URL scheme, so there's nothing to build a working link/QR to; the
 * best we can honestly offer is a QR that encodes the handle/amount/memo as
 * plain text, to save re-typing, not a one-tap payment.
 */
export function buildQuickPayTarget(
  gateway: PaymentGatewayId,
  amount: number,
  memo: string
): { kind: "payLink"; url: string } | { kind: "infoText"; text: string } {
  const { handle } = getEffectiveHandle(gateway);
  const amountStr = amount.toFixed(2);

  if (gateway === "venmo") {
    const clean = handle.replace(/^@/, "");
    return { kind: "payLink", url: `https://venmo.com/${clean}?txn=pay&amount=${amountStr}&note=${encodeURIComponent(memo)}` };
  }
  if (gateway === "cashapp") {
    const clean = handle.startsWith("$") ? handle.slice(1) : handle;
    return { kind: "payLink", url: `https://cash.app/$${clean}/${amountStr}` };
  }
  return { kind: "infoText", text: `Zelle\nTo: ${handle}\nAmount: $${amountStr}\nMemo: ${memo}` };
}

export const PAYMENT_GATEWAYS: {
  id: PaymentGatewayId;
  label: string;
  icon: string;
  handle: string;
  handleNote: string;
}[] = [
  {
    id: "cashapp",
    label: "Cash App",
    icon: "ri-money-dollar-circle-line",
    handle: PAYMENT_HANDLES.cashapp,
    handleNote: "Send as a personal payment, not \"for goods and services.\"",
  },
  {
    id: "zelle",
    label: "Zelle",
    icon: "ri-bank-line",
    handle: PAYMENT_HANDLES.zelle,
    handleNote: "Zelle transfers are instant and free between US banks.",
  },
  {
    id: "venmo",
    label: "Venmo",
    icon: "ri-smartphone-line",
    handle: PAYMENT_HANDLES.venmo,
    handleNote: "Send via Friends & Family. Do not use Goods & Services.",
  },
];
