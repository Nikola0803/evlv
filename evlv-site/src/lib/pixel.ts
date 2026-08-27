"use client";

// Thin wrapper around the CRM tracking pixel's window.cc(...) global (see
// public/pixel.js server-side and layout.tsx's embed) -- safe to call even
// before the async pixel script has loaded (no-ops silently) or when the
// pixel isn't configured at all.
declare global {
  interface Window {
    cc?: (action: string, event: string, extra?: Record<string, unknown>) => void;
  }
}

export function trackEvent(event: string, extra?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.cc) return;
  window.cc("track", event, extra);
}
