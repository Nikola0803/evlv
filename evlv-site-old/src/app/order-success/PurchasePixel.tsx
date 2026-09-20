"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    cc?: (action: string, event: string, extra?: Record<string, unknown>) => void;
  }
}

// Fires the CRM pixel's purchase event once per order -- deduped via
// localStorage since this page can be revisited/refreshed (order
// confirmation links, back button) without that meaning a second sale.
export function PurchasePixel({ orderNumber, total, currency }: { orderNumber: string; total: number; currency: string }) {
  useEffect(() => {
    if (!orderNumber || !Number.isFinite(total)) return;
    const key = `evlv_purchase_tracked_${orderNumber}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      /* localStorage unavailable -- fire anyway rather than silently drop the event */
    }

    let attempts = 0;
    const tryFire = () => {
      if (window.cc) {
        window.cc("track", "purchase", { valueCents: Math.round(total * 100), currency, orderNumber });
      } else if (attempts < 20) {
        attempts += 1;
        setTimeout(tryFire, 250); // pixel.js loads async, may not be ready yet
      }
    };
    tryFire();
  }, [orderNumber, total, currency]);

  return null;
}
