import type { Product } from "@/lib/types";

export interface CompoundHubDefinition {
  path: string;
  shortName: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  classification: string;
  overview: string;
  identityContext: string;
  analyticalFocus: string;
  slugs: readonly string[];
  categoryPaths: readonly string[];
  journalLinks: readonly { href: string; label: string; description: string }[];
  faq: readonly { question: string; answer: string }[];
}

export const COMPOUND_HUBS = {
  bpc157: {
    path: "/bpc-157-research",
    shortName: "BPC-157",
    title: "BPC-157 Research Products and Documentation",
    metaTitle: "BPC-157 Research Peptide | Strengths, COAs & Purity",
    description: "Review EVLV BPC-157 research peptide strengths, compound identity, analytical documentation, exact COA status, and U.S. laboratory supply information.",
    eyebrow: "Compound research hub",
    classification: "Synthetic pentadecapeptide research compound",
    overview: "BPC-157 is a synthetic 15-amino-acid research peptide. EVLV organizes each available strength as its own product listing so price, stock, labeled quantity, and exact COA status remain specific to the item being evaluated.",
    identityContext: "The catalogue CAS reference for BPC-157 is 137525-51-0. A name or CAS reference identifies the intended compound, but it does not verify the contents of a particular vial. That requires product- and lot-matched analytical documentation.",
    analyticalFocus: "Review purity and identity as separate questions. HPLC can report relative purity, while identity confirmation requires an appropriate method such as mass spectrometry. Also confirm the sample name, labeled strength, lot identifier, laboratory, and analysis date.",
    slugs: ["bpc-157-5mg", "bpc-157-10mg", "bpc-157-20mg"],
    categoryPaths: ["/research-peptides"],
    journalLinks: [
      { href: "/journal/bpc-157-us-research-guide-2026", label: "BPC-157 U.S. research guide", description: "Compound background, sourcing standards, and U.S. research-use framing." },
      { href: "/journal/understanding-peptide-purity", label: "Understanding peptide purity", description: "Why purity and identity are different analytical measurements." },
      { href: "/journal/batch-testing-explained", label: "Batch testing explained", description: "How to evaluate a report for the specific lot in hand." },
    ],
    faq: [
      { question: "What BPC-157 strengths does EVLV list?", answer: "EVLV lists each stocked BPC-157 strength as a separate product. Availability can change, so the current product grid on this page is the source for active strengths." },
      { question: "Does one BPC-157 COA cover every strength and lot?", answer: "No. A report supports only the product, sample, and lot it identifies. Confirm that the listed strength and batch match the item being evaluated." },
      { question: "What should a BPC-157 report show?", answer: "Review the sample identity, analytical methods, reported purity and identity results, lot or sample identifier, laboratory, and analysis date." },
      { question: "Is BPC-157 supplied for personal use?", answer: "No. EVLV BPC-157 products are supplied strictly for laboratory and analytical research and are not for human or veterinary use." },
    ],
  },
  glpSeries: {
    path: "/glp-research-series",
    shortName: "GLP Research Series",
    title: "GLP Research Series: Single, Dual, and Triple Classes",
    metaTitle: "GLP Research Series | GLP1-S, GLP2-T & GLP3-R",
    description: "Compare EVLV GLP1-S, GLP2-T, and GLP3-R research classes, available strengths, compound identity, and exact analytical documentation.",
    eyebrow: "Metabolic research hub",
    classification: "Single-, dual-, and triple-receptor research classes",
    overview: "The EVLV GLP research series separates single-, dual-, and triple-receptor classes into GLP1-S, GLP2-T, and GLP3-R listings. These names organize the catalogue; each product page identifies its own intended compound, labeled strength, stock status, and available documentation.",
    identityContext: "The three classes are chemically distinct and should not be treated as interchangeable. Compare the CAS reference, molecular identity, labeled amount, and analytical report on the individual listing rather than relying on the shared GLP category name.",
    analyticalFocus: "For every GLP series item, match the product name and strength to the report, then review the sample identifier, purity method, identity method where reported, measured content, test date, and issuing laboratory. Results for one class or strength do not transfer to another.",
    slugs: ["evlv-1-5mg", "evlv-1-10mg", "evlv-1-30mg", "evlv-2-10mg", "evlv-2-15mg", "evlv-2-30mg", "evlv-2-60mg", "evlv-3-10mg", "evlv-3-15mg", "evlv-3-20mg", "evlv-3-30mg", "evlv-3-60mg"],
    categoryPaths: ["/research-peptides", "/metabolic-research-peptides"],
    journalLinks: [
      { href: "/journal/evlv-3-us-research-guide-2026", label: "GLP3-R U.S. research guide", description: "Triple-receptor research classification, sourcing, and verification." },
      { href: "/journal/evlv-1-vs-evlv-2-receptor-selectivity-research", label: "GLP1-S vs GLP2-T", description: "A research-focused comparison of single- and dual-receptor classes." },
      { href: "/journal/batch-testing-explained", label: "Batch testing explained", description: "Why the exact product, strength, and lot must match the report." },
    ],
    faq: [
      { question: "What do GLP1-S, GLP2-T, and GLP3-R mean?", answer: "They are EVLV catalogue names used to distinguish single-, dual-, and triple-receptor research classes. The individual product page provides the specific identity and labeled strength." },
      { question: "Can a COA for one GLP class verify another?", answer: "No. Each class and strength is a separate product. Use only documentation that matches the product and identified lot or sample." },
      { question: "How should available strengths be compared?", answer: "Compare labeled amount, product identity, current stock, exact COA availability, and measured content where reported. A higher labeled amount is not evidence of higher purity." },
      { question: "Are GLP research products intended for human use?", answer: "No. The entire EVLV GLP research series is supplied strictly for laboratory and analytical research, not for human or veterinary use." },
    ],
  },
  ghkCu: {
    path: "/ghk-cu-research",
    shortName: "GHK-Cu",
    title: "GHK-Cu Research Products and COA Documentation",
    metaTitle: "GHK-Cu Research Peptide | Strengths, COAs & Purity",
    description: "Review EVLV GHK-Cu research products, available strengths, copper-peptide identity, exact COA status, purity reporting, and U.S. dispatch.",
    eyebrow: "Copper-peptide research hub",
    classification: "Copper-binding tripeptide research compound",
    overview: "GHK-Cu is the copper complex of the glycyl-L-histidyl-L-lysine tripeptide. EVLV lists standalone strengths separately and also identifies blends containing GHK-Cu as distinct multi-analyte products.",
    identityContext: "The catalogue CAS reference for GHK-Cu is 89030-95-5. Copper complexation, peptide identity, labeled amount, and purity are separate characteristics, so a product name alone does not establish the analytical status of a specific lot.",
    analyticalFocus: "Confirm whether a report covers standalone GHK-Cu or a blend, then match the strength and sample identifier. For blends, review the result for each named analyte rather than treating one value as universal proof for the full composition.",
    slugs: ["ghk-cu-50mg", "ghk-cu-100mg"],
    categoryPaths: ["/research-peptides", "/mitochondrial-research-peptides"],
    journalLinks: [
      { href: "/journal/understanding-peptide-purity", label: "Understanding peptide purity", description: "How to read purity alongside identity evidence." },
      { href: "/journal/whats-inside-a-lyophilized-peptide-vial", label: "Inside a lyophilized vial", description: "Why visible powder volume does not establish peptide content." },
      { href: "/journal/batch-testing-explained", label: "Batch testing explained", description: "How exact-lot documentation supports a specific product." },
    ],
    faq: [
      { question: "Is GHK-Cu the same as a GHK-Cu blend?", answer: "No. A standalone GHK-Cu listing and a multi-analyte blend are separate products with different compositions and documentation requirements." },
      { question: "What GHK-Cu strengths are currently available?", answer: "Current stocked strengths appear in the product grid on this page. Each strength has its own listing and documentation status." },
      { question: "What should I match on a GHK-Cu COA?", answer: "Match the product name, strength, sample or lot identifier, and test date. Review the stated methods and reported results rather than relying on a storefront badge alone." },
      { question: "Is EVLV GHK-Cu a cosmetic or medical product?", answer: "No. EVLV GHK-Cu is supplied strictly as a laboratory research material and is not marketed for cosmetic, human, or veterinary use." },
    ],
  },
  motsC: {
    path: "/mots-c-research",
    shortName: "MOTS-C",
    title: "MOTS-C Research Products and Analytical Records",
    metaTitle: "MOTS-C Research Peptide | COAs, Purity & Strengths",
    description: "Review EVLV MOTS-C research products, mitochondrial-derived peptide classification, available strengths, COA status, and U.S. supply information.",
    eyebrow: "Mitochondrial research hub",
    classification: "Mitochondrial-derived peptide research compound",
    overview: "MOTS-C is studied as a mitochondrial-derived peptide. EVLV presents each available strength as a research material with a separate product identity, labeled amount, inventory record, and documentation status.",
    identityContext: "The catalogue CAS reference for MOTS-C is 1627580-64-6. Research classification describes the compound but does not verify a vial. Verification depends on analytical records that identify the actual sample or lot.",
    analyticalFocus: "Review identity confirmation separately from purity, and confirm that the product name, strength, sample identifier, test date, and laboratory align with the item being evaluated. Do not infer the status of one strength from another.",
    slugs: ["mots-c-10mg", "mots-c-40mg"],
    categoryPaths: ["/research-peptides", "/mitochondrial-research-peptides"],
    journalLinks: [
      { href: "/journal/understanding-peptide-purity", label: "Understanding peptide purity", description: "What an HPLC purity result can and cannot establish." },
      { href: "/journal/batch-testing-explained", label: "Batch testing explained", description: "The practical difference between a product name and an exact lot." },
      { href: "/journal/mg-versus-powder-amount", label: "Milligrams vs powder volume", description: "Why visible cake size is not a content measurement." },
    ],
    faq: [
      { question: "What type of compound is MOTS-C?", answer: "MOTS-C is classified in research literature as a mitochondrial-derived peptide. EVLV supplies it strictly as a laboratory research material." },
      { question: "Does a MOTS-C purity number confirm identity?", answer: "Not by itself. Purity and molecular identity are different analytical questions and should be evaluated from the methods and results in the report." },
      { question: "Can documentation be shared between MOTS-C strengths?", answer: "Only when a report explicitly identifies the applicable product and sample. Never assume a result for one strength or lot covers another." },
      { question: "Does EVLV provide MOTS-C protocols?", answer: "EVLV provides product identity, storage, order, and documentation information. It does not provide dosing, administration, or personal-use protocols." },
    ],
  },
  tesamorelin: {
    path: "/tesamorelin-research",
    shortName: "Tesamorelin",
    title: "Tesamorelin Research Product Documentation",
    metaTitle: "Tesamorelin Research Peptide | COA, Purity & Identity",
    description: "Review EVLV Tesamorelin research peptide identity, labeled strength, exact product COAs, purity reporting, storage, and U.S. dispatch information.",
    eyebrow: "GHRH-analog research hub",
    classification: "GHRH-analog research peptide",
    overview: "Tesamorelin is classified as a growth-hormone-releasing-hormone analog in research literature. EVLV supplies its Tesamorelin listing strictly for laboratory and analytical research with product-specific identity and documentation fields.",
    identityContext: "The catalogue CAS reference for Tesamorelin is 218949-48-5. Classification and CAS information identify the intended compound but do not replace exact product and lot verification.",
    analyticalFocus: "Match the named compound, labeled strength, sample or lot identifier, laboratory, and analysis date. Review the stated method for purity and any separate identity or measured-content result included in the record.",
    slugs: ["tesamorelin-10mg", "tesamorelin-20mg"],
    categoryPaths: ["/research-peptides"],
    journalLinks: [
      { href: "/journal/understanding-peptide-purity", label: "Understanding peptide purity", description: "How HPLC results fit into a complete analytical review." },
      { href: "/journal/batch-testing-explained", label: "Batch testing explained", description: "Why a report must match the item and lot under review." },
      { href: "/journal/identifying-lyophilized-peptides", label: "Reading a lyophilized peptide cake", description: "What physical appearance can and cannot tell a laboratory." },
    ],
    faq: [
      { question: "How is Tesamorelin classified for research?", answer: "Tesamorelin is classified as a GHRH-analog research peptide. That classification is descriptive and is not a statement of an approved use." },
      { question: "What does the Tesamorelin COA verify?", answer: "The report states the sample identity, methods, and results supplied by the issuing laboratory. It applies only to the identified sample or lot." },
      { question: "Does EVLV provide administration guidance?", answer: "No. EVLV support is limited to product identity, documentation, unopened-product storage, shipping, and institutional inquiries." },
      { question: "Is Tesamorelin supplied for human or veterinary use?", answer: "No. EVLV Tesamorelin is supplied strictly for laboratory and analytical research." },
    ],
  },
} satisfies Record<string, CompoundHubDefinition>;

export const COMPOUND_HUB_LIST = Object.values(COMPOUND_HUBS);

export function getCompoundHubForProduct(product: Pick<Product, "slug">) {
  return COMPOUND_HUB_LIST.find((hub) => hub.slugs.includes(product.slug));
}
