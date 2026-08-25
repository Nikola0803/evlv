export interface JournalArticle {
  slug: string;
  label: string;
  title: string;
  excerpt: string;
  image: string;
  publishedDate: string;
  readTime: string;
  body: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "understanding-peptide-purity",
    label: "Purity",
    title: "Understanding peptide purity",
    excerpt: "How purity is evaluated and why independent verification matters more than the number on the label.",
    image: "/images/science/purity.jpg",
    publishedDate: "2026-08-03",
    readTime: "6 min read",
    body: [
      "Purity, in the context of a research peptide, describes how much of a vial's mass is the target compound versus everything else that can end up in a synthesis: residual solvents, unreacted amino acids, salts, and truncated or deletion sequences that share most of the target molecule's structure but not all of it. A purity figure is a ratio, not a guarantee of identity, which is why purity and identity are tested separately and reported together.",
      "The standard method for quantifying purity is high-performance liquid chromatography, or HPLC. A sample is pushed through a column that separates its components by how they interact with the column material, and each component exits at a different time and produces its own peak on a chromatogram. The target peptide's peak area, measured against the total peak area of everything that eluted, is what produces a number like 99.2%.",
      "HPLC alone cannot confirm that the largest peak actually is the intended compound. A truncated sequence missing one amino acid can be extremely close in retention time and peak shape to the full sequence, and a purity scan will not distinguish them. That is what mass spectrometry is for: it measures the molecular weight of what eluted and confirms it matches the expected mass of the target peptide, within a tight tolerance. Purity answers 'how much.' Mass spec answers 'is it actually what it claims to be.' A certificate of analysis that only reports one of the two is telling half the story.",
      "Self-reported purity, meaning a number a seller states without an independent lab result attached, carries no real accountability. There is no mechanism forcing accuracy, and a synthesis run that came back at 92% costs the same to sell as one that came back at 99%, if nobody is checking. Third-party testing exists specifically to remove that incentive: the lab has no stake in the result, and its report is the same whether the batch passes or fails.",
      "In practice, that means the purity number worth trusting is the one you can trace back to a specific lot, a specific test date, and a lab that is not the seller. EVLV publishes a certificate of analysis for every batch, searchable by the lot code printed on the vial, so a purity claim is never something you have to take on faith.",
    ],
  },
  {
    slug: "batch-testing-explained",
    label: "Testing",
    title: "Batch testing explained",
    excerpt: "How laboratory documentation helps researchers evaluate a specific lot, not just a product line.",
    image: "/images/science/testing.jpg",
    publishedDate: "2026-08-11",
    readTime: "5 min read",
    body: [
      "A product page tells you what a compound is supposed to be. A batch, or lot, is the actual physical run of material that ended up in the specific vial in front of you, and it is the batch, not the product line, that gets tested. Two vials of the same product can come from different lots, synthesized at different times, and while EVLV's standards require every lot to clear the same bar, only lot-specific testing can confirm that a given vial actually did.",
      "Every batch is assigned a lot code at the point it clears synthesis. That code follows the batch through testing, packaging, and shipping, and it is printed on the vial label. It is also the input to EVLV's batch verification tool: enter the code and the result returned is the actual HPLC and mass-spec data for that lot, not a generic spec sheet for the product.",
      "Testing itself happens in two passes, run by an independent third-party laboratory rather than in-house. HPLC quantifies purity, as covered separately. Mass spectrometry confirms molecular identity, verifying that the compound present actually matches the expected mass of the target peptide rather than a structurally similar byproduct. A lot only clears as PASS once both results are in and both meet the threshold.",
      "The certificate of analysis produced from that testing is a public document. It lists the lot code, the compound, the purity result, the test date, and the pass/fail outcome, and it is published the moment it clears, not withheld or issued only on request. That is a deliberate choice: documentation that exists but isn't searchable functions the same as documentation that doesn't exist.",
      "For a researcher, the practical takeaway is to treat the lot code as the unit that matters, not the product name. When you look up a batch, you're not confirming that 'BPC-157 is supposed to be pure.' You're confirming that the specific vial you have in hand, identified by its lot code, was independently tested and passed.",
    ],
  },
  {
    slug: "inside-the-evlv-standard",
    label: "Standards",
    title: "Inside the EVLV standard",
    excerpt: "How EVLV approaches sourcing, synthesis, testing, documentation and fulfillment, end to end.",
    image: "/images/science/standard.jpg",
    publishedDate: "2026-08-19",
    readTime: "7 min read",
    body: [
      "\"Precision without compromise\" is easy to put on a page and hard to actually run as a process. In practice it breaks down into five stages, each with its own failure points, and the standard only holds if every one of them does.",
      "It starts with sourcing. Raw materials come from vetted synthesis partners, under NDA and subject to audit, rather than from whichever supplier quotes the lowest price that week. A synthesis is only as reliable as the starting materials that go into it, and that stage is invisible in a finished vial, which is exactly why it has to be controlled upstream rather than caught later.",
      "Synthesis itself is solid-phase peptide synthesis carried out in ISO-controlled facilities, with sequence verification built into the process rather than bolted on at the end. This is where a peptide's actual amino acid sequence gets built, one residue at a time, and where truncation and deletion sequences are most likely to be introduced if the process isn't controlled tightly.",
      "Third-party testing follows every lot, no exceptions, using HPLC for purity quantification and mass spectrometry for identity confirmation, run by a laboratory with no financial stake in the result. This is covered in more depth in 'Batch testing explained,' but the short version is that testing that happens in-house is not independent, and independence is the entire point.",
      "Once a lot clears, its certificate of analysis is published, publicly, searchable by lot code, the moment it's available. Not mailed on request, not held back for select customers. A COA that exists but can't be found by anyone who wants to check it isn't really transparency, it's paperwork.",
      "The last stage is fulfillment, and it's the one researchers notice least until it goes wrong: EVLV's compounds are lyophilized and shelf-stable in transit, which means no cold-chain packaging is required and orders dispatch next-day rather than waiting on refrigerated logistics. It's a smaller detail than synthesis or testing, but a compound that degrades in transit before it reaches a lab makes every upstream standard moot.",
      "None of these five stages is impressive in isolation. What makes the standard real is that all five apply to every lot, every time, with no exceptions carved out for a difficult batch or a rush order. That consistency, more than any single purity number, is what \"verified at every stage\" is meant to describe.",
    ],
  },
];

export function getJournalArticles() {
  return JOURNAL_ARTICLES;
}

export function getJournalArticleBySlug(slug: string) {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}
