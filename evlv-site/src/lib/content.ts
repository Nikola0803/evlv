import { FaqItem, Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    quote:
      "Straightforward pricing, no games, and the batch reports actually match what's on the vial. That's rarer than it should be.",
    author: "@researchlab_j",
    source: "Verified Buyer",
  },
  {
    quote:
      "Ordered on a Monday, tracking within the hour, package on Wednesday. Everything about the process felt calm and organized.",
    author: "@n.harlow",
    source: "Verified Buyer",
  },
  {
    quote:
      "What I appreciate most is the transparency — every batch has a report, every report is easy to find. No hunting around.",
    author: "@coredata_r",
    source: "Verified Buyer",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What is your refund and/or return policy?",
    answer:
      "All sales are final. Product quality is independently assessed via third-party laboratory testing, and every purchase is made with the understanding that you've reviewed the testing provided on each product page. If you have a quality concern, contact us and we'll work with you directly.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We currently ship across Canada. Every order is packaged discreetly and dispatched same day when placed before our daily cutoff.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Most orders arrive within 1–2 business days of dispatch. You'll receive tracking information as soon as your order ships.",
  },
  {
    question: "Is tracking provided?",
    answer: "Yes. Tracking is generated automatically and sent to your email within one business day of your order.",
  },
  {
    question: "Is bacteriostatic water required?",
    answer:
      "Most lyophilized compounds require reconstitution before use. We recommend pharmaceutical-grade bacteriostatic water, available in our Ancillaries category.",
  },
  {
    question: "How can I verify your product is legitimate?",
    answer:
      "Every batch we sell is independently tested by a third-party laboratory. Match the batch code on your vial to the corresponding report on our Lab Results page.",
  },
];
