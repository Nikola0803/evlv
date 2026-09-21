/**
 * "Find your protocol" quiz content: goals -> a follow-up subgoal question
 * per selected goal -> tiered product recommendations. Ported from a
 * reference project's goals/subgoals/tiers structure, remapped entirely to
 * EVLV's real catalog (src/lib/products.ts) — every product/copy pairing
 * here reflects what EVLV actually carries, not the reference's catalog.
 * RUO framing throughout: "studied for / researched in the context of"
 * language only, no dosing advice, no therapeutic claims.
 */

export interface FocusArea {
  key: string;
  label: string;
}

export const FOCUS_AREAS: FocusArea[] = [
  { key: "recovery", label: "Recovery & Repair Research" },
  { key: "longevity", label: "Longevity & Cellular Health Research" },
  { key: "metabolic", label: "Metabolic & Weight Research" },
  { key: "growth", label: "GHRH & Pituitary Axis Research" },
  { key: "cognition", label: "Cognition & Mood Research" },
  { key: "vitality", label: "Sexual Health Research" },
];

export const MAX_FOCUS_SELECTIONS = 2;

interface SubgoalOption {
  key: string;
  label: string;
}

interface SubgoalConfig {
  question: string;
  options: SubgoalOption[];
}

/** No entry here = that focus area has no products yet, so the quiz skips straight past it in results. */
export const SUBGOALS: Record<string, SubgoalConfig> = {
  recovery: {
    question: "Within recovery, what are you most focused on?",
    options: [
      { key: "injury", label: "A specific injury or joint" },
      { key: "general", label: "General, whole-body recovery" },
    ],
  },
  longevity: {
    question: "Within longevity, what are you most focused on?",
    options: [
      { key: "cellular", label: "Cellular energy & metabolism" },
      { key: "skin", label: "Skin, tissue & aesthetics" },
    ],
  },
  metabolic: {
    question: "Within metabolic research, what are you most focused on?",
    options: [
      { key: "appetite", label: "Appetite & weight-focused research" },
      { key: "general", label: "General metabolic support" },
    ],
  },
  growth: {
    question: "Within GHRH & pituitary axis research, what are you most focused on?",
    options: [{ key: "gh", label: "Natural GHRH pathway support" }],
  },
  cognition: {
    question: "Within cognition & mood, what are you most focused on?",
    options: [{ key: "stress", label: "Stress & a calm, steady state" }],
  },
};

export type Tier = "beginner" | "mid" | "advanced";
export const TIER_ORDER: Record<Tier, number> = { beginner: 0, mid: 1, advanced: 2 };

interface QuizProduct {
  tier: Tier;
  /** Keyed by `${focusKey}:${subgoalKey}` -> copy shown when that combination points here. */
  variants: Record<string, string>;
}

/** Every product the quiz can recommend, keyed by the real slug in src/lib/products.ts. */
export const QUIZ_PRODUCTS: Record<string, QuizProduct> = {
  "bpc-157-10mg": {
    tier: "beginner",
    variants: {
      "recovery:injury":
        "Among the most-studied compounds in the context of tendon, ligament and soft-tissue repair research. A common first single compound when the focus is one specific area.",
    },
  },
  "thymosin-alpha-1-5mg": {
    tier: "mid",
    variants: {
      "recovery:general":
        "Studied for immune modulation and systemic recovery support, a common pick when the focus is whole-body rather than one area.",
    },
  },
  "bpc-tb-500-blend-10mg": {
    tier: "mid",
    variants: {
      "recovery:injury":
        "Combines BPC-157 and TB-500 research profiles in one vial. A common choice when the focus is a specific injury and running them separately isn't necessary.",
      "recovery:general":
        "Pairs two staple repair-research compounds, which is why it comes up for broad, all-around recovery research.",
    },
  },
  "mots-c-10mg": {
    tier: "beginner",
    variants: {
      "longevity:cellular":
        "A mitochondrial-derived peptide studied around cellular energy and how the body uses fuel. The usual first stop here.",
    },
  },
  "ss-31-10mg": {
    tier: "mid",
    variants: {
      "longevity:cellular": "A mitochondria-targeted compound studied in the context of cellular energy research.",
    },
  },
  "semaglutide-5mg": {
    tier: "beginner",
    variants: {
      "metabolic:general": "A widely-studied GLP-1 research compound, a common starting point for general metabolic research.",
    },
  },
  "ghk-cu-50mg": {
    tier: "beginner",
    variants: {
      "longevity:skin":
        "A copper peptide among the most-studied compounds for skin, collagen and tissue-remodeling research. A common starting point on the aesthetics side.",
    },
  },
  "klow-80mg": {
    tier: "mid",
    variants: {
      "longevity:skin": "A pre-combined cellular-support blend researched for tissue- and skin-focused protocols.",
    },
  },
  "gp-3-10mg": {
    tier: "advanced",
    variants: {
      "metabolic:appetite":
        "A tri-agonist compound at the frontier of metabolic research. Usually explored once someone's already familiar with the category.",
    },
  },
  "tirzepatide-10mg": {
    tier: "mid",
    variants: {
      "metabolic:appetite": "A dual-agonist GLP-1/GIP research compound, a common middle step before tri-agonist research.",
    },
  },
  "cjc-ipa-blend-10mg": {
    tier: "beginner",
    variants: {
      "growth:gh": "A pre-combined GHRH-analog blend studied for natural pituitary-axis research, a common starting point.",
    },
  },
  "tesamorelin-10mg": {
    tier: "mid",
    variants: {
      "growth:gh": "Studied for its role in body composition and pituitary-axis research.",
    },
  },
  "selank-10mg": {
    tier: "beginner",
    variants: {
      "cognition:stress": "Researched around stress response and a calm, steady state.",
    },
  },
  "semax-10mg": {
    tier: "mid",
    variants: {
      "cognition:stress": "A nootropic peptide studied alongside Selank when the focus extends toward cognitive research.",
    },
  },
};

export const QUIZ_LABELS = {
  startHere: "Start Here",
  alsoWorthLook: "Also Worth A Look",
  resultsHeader: "Based on what you told us",
  resultsSubheader: "A short, research-first starting point, not a recommendation. Everything at EVLV is for research use only.",
  footer: "These are starting points for your own research, chosen from what you selected. Nothing here is medical or dosing advice.",
  noMatch: "We don't carry a direct match for this focus yet. Explore the full catalogue.",
};
