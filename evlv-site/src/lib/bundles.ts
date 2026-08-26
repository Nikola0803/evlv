import { Bundle } from "./types";

export const bundles: Bundle[] = [
  {
    slug: "flagship-90-day-full-optimization",
    name: "Flagship: 90-Day Full Optimization",
    tagline: "The Full Optimizer",
    category: "Flagship: 90-Day Full Optimization",
    duration: "90 days",
    price: 1424.9,
    compareAtPrice: 1899.87,
  },
  {
    slug: "starter-bundle",
    name: "Starter Bundle",
    tagline: "The Curious Starter",
    category: "Starter Bundle",
    duration: "8 weeks",
    price: 399.98,
    compareAtPrice: 499.98,
  },
  {
    slug: "injury-repair",
    name: "Injury Repair",
    tagline: "The Rebuilder",
    category: "Injury Repair",
    duration: "12 weeks",
    price: 448.93,
    compareAtPrice: 528.15,
  },
  {
    slug: "fat-loss-summer-shred",
    name: "Fat Loss",
    tagline: "Summer Shred",
    category: "Fat Loss",
    duration: "12 weeks",
    price: 824.73,
    compareAtPrice: 1030.91,
  },
  {
    slug: "sleep-optimization",
    name: "Sleep Optimization",
    tagline: "The Wired-and-Tired",
    category: "Sleep Optimization",
    duration: "8 weeks",
    price: 593.16,
    compareAtPrice: 697.83,
  },
  {
    slug: "energy-mitochondrial",
    name: "Energy (Mitochondrial)",
    tagline: "The Burned-Out Operator",
    category: "Energy (Mitochondrial)",
    duration: "12 weeks",
    price: 511.22,
    compareAtPrice: 681.62,
  },
  {
    slug: "founder-ceo-focus",
    name: "Founder / CEO Focus",
    tagline: "The High-Performing Exec",
    category: "Founder / CEO Focus",
    duration: "8 weeks",
    price: 882.16,
    compareAtPrice: 1102.7,
  },
  {
    slug: "muscle-building-recomp",
    name: "Muscle Building",
    tagline: "Recomp Optimizer / Athlete",
    category: "Muscle Building",
    duration: "12 weeks",
    price: 1016.14,
    compareAtPrice: 1354.85,
  },
  {
    slug: "gut-repair",
    name: "Gut Repair",
    tagline: "The Gut-First Client",
    category: "Gut Repair",
    duration: "Add-on",
    price: 690.27,
    compareAtPrice: 812.08,
    comingSoon: true,
  },
  {
    slug: "longevity-long-term-thinker",
    name: "Longevity",
    tagline: "Long Term Thinker",
    category: "Longevity",
    duration: "Custom",
    price: 511.5,
    compareAtPrice: 639.37,
  },
];

export function getBundles() {
  return bundles;
}

export function getBundleBySlug(slug: string) {
  return bundles.find((b) => b.slug === slug);
}

/** Computed, not stored -- guarantees the displayed "Save X%" always matches price/compareAtPrice. */
export function bundleSavePercent(b: Bundle) {
  return Math.round((1 - b.price / b.compareAtPrice) * 100);
}
