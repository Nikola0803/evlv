"use client";

// Thin wrapper around the CRM tracking pixel's window.cc(...) global (see
// public/pixel.js server-side and layout.tsx's embed) -- safe to call even
// before the async pixel script has loaded (no-ops silently) or when the
// pixel isn't configured at all.
declare global {
  interface Window {
    cc?: (action: string, event: string, extra?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, extra?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.cc?.("track", event, extra);

  // Never forward identify/PII calls to Google Analytics or GTM-managed tags
  // (Meta Pixel, TikTok, etc.) -- those stay CRM-only.
  if (event === "identify") return;
  const { valueCents, properties: _properties, ...rest } = extra ?? {};
  const normalized = {
    ...rest,
    ...(typeof valueCents === "number" ? { value: valueCents / 100 } : {}),
  };

  if (window.gtag) window.gtag("event", event, normalized);

  // Also push to the GTM dataLayer so GTM-managed tags (Meta Pixel, TikTok,
  // etc.) can trigger on the same events. The dataLayer queue works even
  // before GTM itself has finished loading, so this doesn't need to wait.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...normalized });
}
