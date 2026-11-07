/**
 * Manual payment gateway handles, shown at checkout once a customer picks
 * CashApp / Zelle / Venmo. Matches the peptides-crm-app Order schema, which
 * models paymentMethod as "zelle" | "cashapp" | "venmo" with a paymentMemo
 * field, so this checkout flow lines up with what the real CRM expects.
 */
export const PAYMENT_HANDLES = {
  cashapp: "$warriordistributions",
  zelle: "Support@warriorresearch.net",
  venmo: "@warriordistributions",
};

const DEMO_HANDLES = {
  cashapp: "$EVLVPeptidesDemo",
  zelle: "Support@warriorresearch.net",
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
  steps: string[];
}[] = [
  {
    id: "cashapp",
    label: "Cash App",
    icon: "ri-money-dollar-circle-line",
    handle: PAYMENT_HANDLES.cashapp,
    handleNote: "Include your order number in the payment note so we can match your payment quickly.",
    steps: [
      "Open Cash App on your phone.",
      "Tap the $ button (Send Money).",
      "Enter the exact order total.",
      "Search for and send to $warriordistributions.",
      "Add your order number in the note field.",
      "Place your order above — we'll confirm once payment is received.",
    ],
  },
  {
    id: "zelle",
    label: "Zelle",
    icon: "ri-bank-line",
    handle: PAYMENT_HANDLES.zelle,
    handleNote: "Send to Support@warriorresearch.net — include your order number in the memo so we can match your payment.",
    steps: [
      "Open your banking app and navigate to Zelle.",
      "Add a new recipient: Support@warriorresearch.net.",
      "Enter the exact order total.",
      "Include your order number in the memo field.",
      "Place your order above — we'll confirm once payment is received.",
    ],
  },
  {
    id: "venmo",
    label: "Venmo",
    icon: "ri-smartphone-line",
    handle: PAYMENT_HANDLES.venmo,
    handleNote: "Include your order number in the payment note so we can match your payment quickly.",
    steps: [
      "Open Venmo on your phone.",
      "Tap Pay/Request and search for @warriordistributions.",
      "Enter the exact order total.",
      "Add your order number in the note field.",
      "Tap Pay — make sure it's set to Pay, not Request.",
      "Place your order above — we'll confirm once payment is received.",
    ],
  },
];
