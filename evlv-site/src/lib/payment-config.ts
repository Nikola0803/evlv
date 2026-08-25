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

export type PaymentGatewayId = "cashapp" | "zelle" | "venmo";

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
