/** Research-focus areas offered in the "Find your protocol" quiz, mapped to real catalog slugs. */
export interface FocusArea {
  key: string;
  label: string;
  slugs: string[];
}

export const FOCUS_AREAS: FocusArea[] = [
  { key: "recovery", label: "Recovery & Repair Research", slugs: ["bpc-157-10mg", "thymosin-alpha-1-5mg", "wolverine-stack-20mg"] },
  { key: "longevity", label: "Longevity & Cellular Health Research", slugs: ["mots-c-10mg", "ghk-cu-50mg", "5-amino-1mq-50mg", "klow-80mg"] },
  { key: "metabolic", label: "Metabolic & Weight Research", slugs: ["retatrutide-10mg", "5-amino-1mq-50mg"] },
  { key: "growth", label: "Growth & Performance Research", slugs: ["cjc-1295-no-dac-5mg", "sermorelin-10mg", "tesamorelin-10mg", "hgh-24iu"] },
  { key: "cognition", label: "Cognition & Mood Research", slugs: ["selank-10mg"] },
  { key: "vitality", label: "Sexual Health Research", slugs: [] },
];

export const MAX_FOCUS_SELECTIONS = 3;
