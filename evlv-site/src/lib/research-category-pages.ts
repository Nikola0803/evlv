import type { Product } from "@/lib/types";

export interface ResearchCategoryDefinition {
  path: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  scopeTitle: string;
  scope: string;
  heroImage: string;
  selector: (product: Product) => boolean;
  faq: readonly { question: string; answer: string }[];
}

const BIOREGULATOR_SLUGS = new Set([
  "cartalax-20mg",
  "epitalon-10mg",
  "epitalon-50mg",
  "pinealon-2mg",
  "thymosin-alpha-1-10mg",
]);

const METABOLIC_SLUGS = new Set([
  "evlv-1-5mg", "evlv-1-10mg", "evlv-1-30mg",
  "evlv-2-10mg", "evlv-2-15mg", "evlv-2-30mg", "evlv-2-60mg",
  "evlv-3-10mg", "evlv-3-15mg", "evlv-3-20mg", "evlv-3-30mg", "evlv-3-60mg",
  "aod-9604-5mg", "aod-9604-10mg", "cagrilintide-10mg", "5-amino-1mq-30mg", "slu-pp-332-10mg",
]);

const FAT_LOSS_RESEARCH_SLUGS = new Set([
  "aod-9604-5mg", "aod-9604-10mg",
  "evlv-1-5mg", "evlv-1-10mg", "evlv-1-30mg",
  "evlv-2-10mg", "evlv-2-15mg", "evlv-2-30mg", "evlv-2-60mg",
  "evlv-3-10mg", "evlv-3-15mg", "evlv-3-20mg", "evlv-3-30mg", "evlv-3-60mg",
  "5-amino-1mq-30mg",
]);

const MITOCHONDRIAL_SLUGS = new Set([
  "mots-c-10mg", "mots-c-40mg", "ss-31-10mg", "ss-31-50mg",
  "nad-500mg", "nad-1000mg", "glutathione-1500mg",
]);

export const RESEARCH_CATEGORY_PAGES = {
  researchPeptides: {
    path: "/research-peptides",
    eyebrow: "U.S. research catalogue",
    title: "Research Peptides for Laboratory Analysis",
    metaTitle: "Research Peptides for Sale in the USA | COAs & Purity",
    description: "Browse EVLV research peptides for laboratory and in-vitro analysis, with U.S. dispatch and exact product COAs clearly labeled when available.",
    intro: "Research compounds with clearly labeled, product-specific batch documentation where available.",
    scopeTitle: "A catalogue built around traceability",
    scope: "Compare compound identity, labeled quantity, available strengths, current availability, storage information, and exact COA status before ordering. When a matching report is published, the product page connects directly to it. When it is not, EVLV says so rather than presenting unrelated documentation as an exact match.",
    heroImage: "/images/certified/evlv-hero-multi-vials.png",
    selector: (product) => product.category === "peptides" && product.format !== "supplies",
    faq: [
      { question: "What does research use only mean?", answer: "Research use only means the material is supplied for controlled laboratory, in-vitro, and analytical work. It is not intended or approved for human or veterinary use." },
      { question: "How are exact COAs identified?", answer: "An exact COA badge is shown only when a report can be matched to the listed product and strength. The report remains specific to its identified lot or sample." },
      { question: "Does EVLV dispatch from the United States?", answer: "Yes. Eligible in-stock orders are fulfilled from the United States and receive tracking after carrier acceptance." },
    ],
  },
  peptideBlends: {
    path: "/peptide-blends",
    eyebrow: "Multi-analyte catalogue",
    title: "Research Peptide Blends",
    metaTitle: "Research Peptide Blends | Product-Specific COAs",
    description: "Browse EVLV research peptide blends with clearly labeled composition, strength, availability, and product-specific analytical documentation.",
    intro: "Multi-analyte research products require especially clear labeling. EVLV blend listings identify the named components and total labeled amount while keeping documentation claims tied to the analytes and lot actually reported.",
    scopeTitle: "Read blend documentation analyte by analyte",
    scope: "A single headline purity number can conceal important differences between components. Where a blend report is available, review each named analyte, the reported result, sample identifier, method, and test date. Results for one blend or strength should not be transferred to another.",
    heroImage: "/images/certified/category-peptides.png",
    selector: (product) => product.format === "blend",
    faq: [
      { question: "What is a research peptide blend?", answer: "A research peptide blend is a single labeled product containing more than one named research compound. Its listing should identify the composition and total labeled amount." },
      { question: "Can one component result represent the entire blend?", answer: "No. Review the reported result for each analyte included in the laboratory report and confirm that the sample matches the product being evaluated." },
      { question: "Are EVLV blends intended for personal use?", answer: "No. All EVLV blends are supplied strictly for laboratory and analytical research and are not for human or veterinary use." },
    ],
  },
  bioregulators: {
    path: "/bioregulators",
    eyebrow: "Research classification",
    title: "Bioregulators for Laboratory Research",
    metaTitle: "Research Bioregulators | U.S. Laboratory Supply",
    description: "Explore EVLV bioregulator research products with U.S. dispatch, labeled strengths, storage information, and transparent documentation status.",
    intro: "This collection brings together compounds commonly classified within bioregulator and short-peptide research. Listings focus on chemical identity, labeled quantity, storage, and available analytical records without making clinical or therapeutic claims.",
    scopeTitle: "Classification is not a use claim",
    scope: "Category placement describes how products are organized for catalogue discovery. It does not establish safety, efficacy, clinical suitability, or an approved use. Qualified researchers should evaluate the identity and current lot documentation for each individual product.",
    heroImage: "/images/certified/category-bioregulators.png",
    selector: (product) => BIOREGULATOR_SLUGS.has(product.slug),
    faq: [
      { question: "Why are these products grouped as bioregulators?", answer: "The grouping is a catalogue classification used to organize related research compounds. It is not a statement of an approved application or outcome." },
      { question: "Is documentation shared across products in this category?", answer: "No. Analytical documentation is product and lot specific. A report for one bioregulator should not be treated as evidence for another." },
      { question: "Where can I review EVLV testing standards?", answer: "EVLV publishes its documentation approach on the Testing Standards page and makes available reports searchable in the COA Library." },
    ],
  },
  metabolic: {
    path: "/metabolic-research-peptides",
    eyebrow: "Research classification",
    title: "Metabolic Research Peptides",
    metaTitle: "Metabolic Research Peptides | GLP Research Series",
    description: "Browse EVLV metabolic research peptide classes, including the GLP research series, with clearly labeled strengths and exact COAs where available.",
    intro: "EVLV's metabolic research collection includes single-, dual-, and triple-receptor research classes alongside other laboratory compounds organized within this field. Product pages separate identity, strength, purity reporting, and COA availability.",
    scopeTitle: "Compare the research class, then verify the lot",
    scope: "Compounds grouped in metabolic research can differ in sequence, receptor classification, molecular characteristics, and analytical requirements. Category-level similarities do not make products interchangeable. Evaluate each listing and its current documentation independently.",
    heroImage: "/images/certified/category-lipotropics.png",
    selector: (product) => METABOLIC_SLUGS.has(product.slug),
    faq: [
      { question: "What is the EVLV GLP research series?", answer: "The GLP research series is EVLV's catalogue naming system for single-, dual-, and triple-receptor research classes. Individual product pages identify the specific listing and labeled strength." },
      { question: "Are products in this category interchangeable?", answer: "No. Products may differ materially in identity, sequence, receptor classification, and labeled amount. Each should be evaluated as a separate research material." },
      { question: "Where can I compare available strengths?", answer: "Each product page lists available sibling strengths when stocked, and every strength retains its own price, availability, and documentation status." },
    ],
  },
  mitochondrial: {
    path: "/mitochondrial-research-peptides",
    eyebrow: "Research classification",
    title: "Mitochondrial Research Compounds",
    metaTitle: "Mitochondrial Research Peptides & Compounds",
    description: "Explore mitochondrial research peptides and related compounds with U.S. dispatch, labeled strengths, and transparent analytical documentation.",
    intro: "This collection organizes peptide and non-peptide materials commonly discussed in mitochondrial and cellular-energy research. EVLV presents them as laboratory materials with product-specific identity and documentation, not as wellness or medical products.",
    scopeTitle: "Different material classes need different evidence",
    scope: "A category may include chemically different materials, so the most useful evidence remains product specific: compound identity, labeled amount, sample or lot code, analytical method, reported result, and test date. Purity does not by itself establish identity, content, sterility, or suitability for a particular experiment.",
    heroImage: "/images/certified/evlv-quality-page.png",
    selector: (product) => MITOCHONDRIAL_SLUGS.has(product.slug),
    faq: [
      { question: "Does this category imply a medical benefit?", answer: "No. It is a research catalogue classification only. EVLV does not market these products for diagnosis, treatment, prevention, or personal use." },
      { question: "What should I check before ordering?", answer: "Review chemical identity, labeled amount, storage information, stock status, and whether an exact current product report is available." },
      { question: "Is a purity result the same as identity confirmation?", answer: "No. Purity and identity answer different analytical questions. Review the actual methods and scope stated in the report." },
    ],
  },
  fatLossResearch: {
    path: "/fat-loss-peptide-research",
    eyebrow: "Research classification",
    title: "Fat Loss Peptide Research",
    metaTitle: "Fat Loss Peptide Research | Lipolysis & Metabolic Compounds",
    description: "Explore EVLV research compounds studied in lipolysis, lipid metabolism, and metabolic signaling research, including hGH-fragment and GLP-receptor classes.",
    intro: "This page organises the EVLV research compounds most commonly evaluated in preclinical lipolysis and lipid-metabolism studies. Each compound is supplied as a research-use-only laboratory material — not for human or veterinary use — and the documentation for every listed lot is published and searchable before purchase.",
    scopeTitle: "What 'fat loss peptide' means in a research context",
    scope: "In laboratory research, 'fat loss peptide' typically refers to compounds studied for their interaction with lipolytic signaling pathways: the hGH fragment 176–191 (AOD-9604), which has been investigated for fat-cell receptor activity in preclinical models; GLP-1 receptor agonist classes (EVLV-1, EVLV-2, EVLV-3), studied for metabolic and energy homeostasis signaling in vitro; and NNMT inhibitors such as 5-amino-1MQ, examined in preclinical adipocyte research. None of these compounds has an FDA-approved indication, and none is supplied or intended for human use. The term 'fat loss' as used here describes the research context, not a claimed outcome.",
    heroImage: "/images/certified/category-lipotropics.png",
    selector: (product) => FAT_LOSS_RESEARCH_SLUGS.has(product.slug),
    faq: [
      { question: "What is AOD-9604 studied for?", answer: "AOD-9604 is the C-terminal hGH fragment 176–191, investigated in preclinical research for its interaction with fat-cell receptors and lipolytic signaling pathways. It is supplied for laboratory and in vitro research only." },
      { question: "Are GLP-1 agonist class compounds included here?", answer: "Yes. EVLV-1, EVLV-2, and EVLV-3 are EVLV's catalogue designations for GLP-1-class research compounds (single, dual, and triple receptor classes), which are studied in metabolic and energy-homeostasis research. None is approved for human use." },
      { question: "Are these compounds intended for personal weight-loss use?", answer: "No. All products on this page are research-use-only laboratory materials. They are not for human or veterinary use and are not intended as weight-loss aids, supplements, or treatments of any kind." },
    ],
  },
  labSupplies: {
    path: "/research-lab-supplies",
    eyebrow: "Supporting catalogue",
    title: "Research Laboratory Supplies",
    metaTitle: "Research Laboratory Supplies | U.S. Dispatch",
    description: "Browse supporting EVLV laboratory supplies with clear product labeling, current availability, and U.S. order fulfillment.",
    intro: "Supporting materials are listed separately from research compounds so laboratories can identify product type, container size, stock status, and storage information without confusing supplies with peptide documentation.",
    scopeTitle: "Keep supporting materials clearly separated",
    scope: "A supporting supply is not a peptide COA, does not validate another product, and should be evaluated according to its own label and intended laboratory function. Review the individual listing before adding it to an order.",
    heroImage: "/images/certified/evlv-manufacturing-lab.png",
    selector: (product) => product.format === "supplies" || product.category === "ancillaries",
    faq: [
      { question: "Are laboratory supplies covered by peptide COAs?", answer: "No. Supporting supplies and peptide research products are different product classes and carry different documentation." },
      { question: "Can supplies be ordered with research products?", answer: "Eligible in-stock supplies can be added to the same cart. Shipping and promotion rules are displayed at checkout." },
      { question: "Where is current availability shown?", answer: "Availability is shown on the product listing and is synchronized with the active EVLV catalogue." },
    ],
  },
} satisfies Record<string, ResearchCategoryDefinition>;

export const RESEARCH_CATEGORY_LINKS = Object.values(RESEARCH_CATEGORY_PAGES).map(({ path, title }) => ({ path, title }));
