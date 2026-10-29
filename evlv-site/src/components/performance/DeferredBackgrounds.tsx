"use client";

import { useEffect } from "react";

/**
 * CSS background images are fetched as soon as the stylesheet is parsed.
 * Marking non-critical panels with `data-defer-background` lets them retain
 * their design fallback while their imagery waits until it is near view.
 */
export function DeferredBackgrounds() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-defer-background]"));
    if (!targets.length) return;

    const reveal = (target: HTMLElement) => {
      target.dataset.backgroundReady = "true";
    };

    if (!("IntersectionObserver" in window)) {
      targets.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "400px 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
