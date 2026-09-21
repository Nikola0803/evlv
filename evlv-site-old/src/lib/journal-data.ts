export interface JournalArticle {
  slug: string;
  label: string;
  title: string;
  excerpt: string;
  image: string;
  publishedDate: string;
  readTime: string;
  body: string[];
  /** Optional end-of-article CTA (e.g. wholesale/dropshipping posts linking to /wholesale). */
  cta?: { label: string; href: string };
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
  {
    slug: "gp-3-us-research-guide-2026",
    label: "Compounds",
    title: "GP-3 in the US: What Researchers Need to Know in 2026",
    excerpt:
      "A research overview of GP-3, the triple-agonist peptide under investigation at the GLP-1, GIP, and glucagon receptors — sourcing, purity standards, and US regulatory framing for in vitro research.",
    image: "/images/science/standard.jpg",
    publishedDate: "2026-08-27",
    readTime: "8 min read",
    body: [
      "GP-3 is studied as a triple receptor agonist, engaging the GLP-1, GIP, and glucagon receptors in a single molecule rather than the single- or dual-receptor approach of earlier compounds in the same research area. That broader receptor engagement is what makes it a compound of active interest in metabolic research, and also why it demands more from a synthesis and testing process: three-receptor selectivity depends on a sequence being exactly right, with no shortcuts in verification.",
      "As with any compound at the frontier of a research category, published data is still developing and protocols are not standardized the way they are for older, more established peptides. That makes independent verification of what's actually in a given vial more important, not less — a research program built on an unverified compound produces unverifiable results.",
      "Sourcing considerations follow directly from that. A newer compound generally means fewer manufacturing partners have real experience with it, and supply-chain maturity varies more than it does for a compound that's been in production for years. The practical response is the same one that applies to any compound: confirm purity by HPLC and identity by mass spectrometry, on the specific lot, from a third-party lab with no stake in the result.",
      "On the regulatory side, GP-3 is supplied in the US strictly for laboratory research — not for human or veterinary use, and not evaluated by the FDA for any indication. EVLV is a chemical supplier, not a compounding pharmacy or outsourcing facility as defined under 503A or 503B of the Federal Food, Drug, and Cosmetic Act. Research use only means exactly that: appropriate for qualified researchers working in a laboratory setting, not a substitute for medical guidance.",
      "Before sourcing any batch, the same checklist applies regardless of how new the compound is: a certificate of analysis searchable by lot code, a purity result from HPLC, and an identity result from mass spectrometry — not a spec sheet for the product line, but data for the vial in front of you.",
    ],
  },
  {
    slug: "bpc-157-us-research-guide-2026",
    label: "Compounds",
    title: "BPC-157 in the US: Complete Research Guide 2026",
    excerpt:
      "Background, characterization, and US sourcing considerations for BPC-157, a synthetic pentadecapeptide studied in preclinical research for angiogenic and growth factor signaling pathways.",
    image: "/images/science/purity.jpg",
    publishedDate: "2026-08-29",
    readTime: "7 min read",
    body: [
      "BPC-157 is a synthetic pentadecapeptide — a 15-amino-acid sequence — derived from research into a protective protein identified in gastric juice. It's one of the more extensively studied compounds in its research category, with a body of preclinical literature examining its role in angiogenesis and growth-factor signaling pathways relevant to tissue repair research.",
      "That research history is also why BPC-157 is a useful case study in what 'well studied' does and doesn't mean for sourcing. A large literature base tells you the compound itself is a legitimate subject of ongoing research. It tells you nothing about whether a specific vial from a specific supplier actually contains what the label says, at the purity the label claims.",
      "For US-based researchers, sourcing BPC-157 responsibly means the same fundamentals that apply to any research peptide: independent HPLC testing for purity, mass spectrometry for identity confirmation, and a certificate of analysis tied to the actual lot, not a generic product page. A compound's research pedigree doesn't substitute for batch-level verification.",
      "It's worth being precise about scope here: this is a research compound, supplied for laboratory and identification purposes only, not for human or veterinary use and not evaluated by the FDA for any condition. The published research on BPC-157 is preclinical — it describes what's been observed in laboratory research settings, not a validated human application.",
      "Practically, that means the diligence question for a researcher isn't 'has BPC-157 been studied' — it clearly has — but 'can I verify this specific batch.' Look for a searchable lot code, a real HPLC/mass-spec report behind it, and a supplier willing to publish that data rather than provide it only on request.",
    ],
  },
  {
    slug: "tirzepatide-vs-semaglutide-research-differences",
    label: "Compounds",
    title: "Tirzepatide vs Semaglutide: Research Differences Explained",
    excerpt:
      "A side-by-side overview of two GLP-1 receptor agonists under active research — receptor selectivity, structural differences, and how each compound is characterized in preclinical studies.",
    image: "/images/science/testing.jpg",
    publishedDate: "2026-09-01",
    readTime: "6 min read",
    body: [
      "Semaglutide is a GLP-1 receptor agonist — its structure is built to engage a single receptor target. Tirzepatide is a dual agonist, engaging both the GLP-1 and GIP receptors within one molecule. That single structural difference is the starting point for nearly every other distinction researchers draw between the two compounds in the literature.",
      "Structurally, both are modified peptide backbones designed for extended receptor engagement relative to native incretin hormones, but they diverge in the specific modifications used to achieve that stability and in the additional GIP-binding domain present in tirzepatide's sequence. Characterizing either compound by HPLC and mass spectrometry confirms the same two things regardless of which one you're testing: how much of the sample is the target peptide, and whether its measured mass matches the expected sequence.",
      "In preclinical research, this receptor-selectivity difference is the variable most protocols are actually designed around — a single-receptor versus dual-receptor comparison is a common framing precisely because it isolates one structural variable at a time. Neither compound's research profile is inherently 'better'; they're different tools answering different questions about receptor engagement.",
      "Both compounds are supplied for laboratory research only, not for human or veterinary use, and neither is evaluated by the FDA for any indication in that context. Whatever the study design, the sourcing standard doesn't change with the compound: independent purity and identity testing, on the specific lot, published where it can actually be checked.",
      "For a researcher deciding between the two for a given protocol, the meaningful comparison is scientific — which receptor pathway the study is actually investigating — not which compound is more novel. Both have a real, growing research literature behind them.",
    ],
  },
  {
    slug: "are-research-peptides-legal-in-the-us-2026",
    label: "Regulatory",
    title: "Are Research Peptides Legal in the US? The 2026 Answer",
    excerpt:
      "A plain-language summary of the US regulatory framework around research-use-only peptides, including FDA's stance on in vitro research and the 503A/503B distinction.",
    image: "/images/science/standard.jpg",
    publishedDate: "2026-09-03",
    readTime: "6 min read",
    body: [
      "Research peptides sold for laboratory and research use are legal to purchase and possess in the US when supplied and used strictly as research use only (RUO) chemicals — not intended for human or veterinary consumption, injection, or ingestion, and not evaluated by the FDA for any medical indication. That framing is the entire basis on which a research-chemical supplier can legally operate.",
      "The key regulatory distinction is between a research chemical supplier and a compounding pharmacy. Facilities compounding drugs for human administration operate under 503A or 503B of the Federal Food, Drug, and Cosmetic Act, with a distinct set of licensing, sterility, and dispensing requirements tied to human use. A supplier of RUO research compounds is explicitly not operating under that framework — EVLV is a chemical supplier, not a compounding pharmacy or outsourcing facility as defined under 503A or 503B.",
      "That distinction is what makes the RUO label load-bearing rather than a formality. It's the legal basis for the entire product category: compounds sold for laboratory research, identification, and in vitro study, with no claim of safety or efficacy for any human or animal application, and no dosing information provided for that purpose.",
      "State-level rules can add additional wrinkles on top of the federal framework, and they vary — some states have moved on specific compounds independently of federal action. This is a summary of the general federal framework, not legal advice, and a researcher or institution with a specific compliance question should consult counsel familiar with their state's rules.",
      "The practical upshot for 2026: yes, research peptides are legal to source in the US as RUO laboratory chemicals, provided both the supplier and the buyer treat that designation as real — proper documentation, no human-use marketing, and no dosing claims — rather than as a label of convenience.",
    ],
  },
  {
    slug: "research-peptides-us-sourcing-guide-2026",
    label: "Sourcing",
    title: "Research Peptides in the US: 2026 Sourcing Guide",
    excerpt:
      "How qualified researchers evaluate US research-peptide suppliers — purity certificates, third-party HPLC testing, batch documentation, and what to verify before purchase.",
    image: "/images/science/purity.jpg",
    publishedDate: "2026-09-05",
    readTime: "6 min read",
    body: [
      "Evaluating a research peptide supplier comes down to a short list of things that are either verifiable or they aren't. Purity and identity data either exists for the specific lot you're buying, from an independent lab, or it doesn't — everything else is secondary to that one distinction.",
      "Start with the certificate of analysis. A real COA is tied to a specific lot code, dated, and includes both an HPLC purity result and a mass-spectrometry identity result. If a supplier's 'COA' is a generic spec sheet with no lot number, or purity figures with no lab attribution behind them, that's a self-reported number, not independent verification — and self-reported purity has no accountability mechanism behind it.",
      "Next, check whether the documentation is actually accessible before you buy, not promised after. A supplier that publishes batch results searchable by lot code is making a claim that's checkable in real time. A supplier that will 'send the COA on request after purchase' is asking for trust it hasn't yet earned.",
      "Storage and fulfillment matter more than they're usually given credit for. Lyophilized compounds are shelf-stable in transit, which is one less variable to worry about; anything requiring cold-chain shipping introduces a failure point between the lab that tested it and the researcher who receives it. Ask how a supplier handles that gap.",
      "Finally, the RUO framing itself is a signal. A supplier that avoids dosing language, human-use claims, and therapeutic promises for its compounds is one that understands — and is operating inside — the actual regulatory category its products belong to. That's not a marketing detail; it's the difference between a research-chemical supplier and a liability.",
    ],
  },
  {
    slug: "how-to-reconstitute-peptides-step-by-step",
    label: "Lab Guides",
    title: "How to Reconstitute Peptides: Step-by-Step Guide",
    excerpt:
      "A technical reconstitution walkthrough for lyophilized peptides using bacteriostatic water — volume calculations, sterile-technique considerations, and storage handling for research settings.",
    image: "/images/science/testing.jpg",
    publishedDate: "2026-09-08",
    readTime: "5 min read",
    body: [
      "Lyophilized peptides ship as a freeze-dried powder for stability, which means they need to be brought into solution before they can be used in a laboratory protocol. Reconstitution is the technique for doing that cleanly, and it's a step where technique errors — not the compound itself — are the most common source of unreliable results.",
      "Bacteriostatic water, water with a small concentration of benzyl alcohol as a preservative, is the standard diluent for this purpose in a research setting, chosen because it resists microbial growth across repeated draws better than plain sterile water. Whatever diluent is used, it should be pharmaceutical- or laboratory-grade, from a sealed source, not an ad hoc substitute.",
      "The math is straightforward: reconstituted concentration equals the total peptide mass in the vial divided by the volume of diluent added. A 10mg vial reconstituted with 2mL of bacteriostatic water yields a 5mg/mL solution. Working backward from a target concentration for a given protocol is just that same equation rearranged — decide the concentration a protocol calls for, then calculate the diluent volume that produces it.",
      "Sterile technique matters throughout: swab the vial's rubber stopper with alcohol before each entry, use a new sterile needle and syringe per draw, and add diluent slowly down the interior wall of the vial rather than directly onto the lyophilized cake, which can denature the peptide through excess agitation or foaming.",
      "Once reconstituted, most peptides are meaningfully less stable than in their lyophilized state and should be refrigerated at 2–8°C and used within the window specified for that compound — commonly around 30 days, though this varies and the product's own documentation is the authority, not a general rule of thumb. Reconstituted solution that's been left at room temperature for an extended period is a research variable worth controlling for, not ignoring.",
    ],
  },
  {
    slug: "why-wholesale-partners-choose-batch-verified-supply",
    label: "Wholesale",
    title: "Why Wholesale Partners Choose Batch-Verified Peptide Supply",
    excerpt:
      "What separates a durable wholesale peptide partnership from a race-to-the-bottom supplier relationship — testing, batch documentation, and why it protects your brand, not just ours.",
    image: "/images/science/standard.jpg",
    publishedDate: "2026-09-10",
    readTime: "6 min read",
    body: [
      "Building a peptide brand on top of someone else's supply chain means your reputation is only as solid as your supplier's testing practices, whether or not that's obvious on day one. A single unverified batch reaching a customer under your label is a problem your brand absorbs, not the supplier's — which is exactly why the wholesale partners who last are the ones who chose testing rigor over the cheapest quote.",
      "The mechanics of what makes a batch trustworthy don't change based on order volume. Every lot still needs independent HPLC testing for purity and mass spectrometry for identity, tied to a specific batch code, before it's fit to sell under anyone's name — yours or ours. Wholesale doesn't lower that bar; if anything, it raises the stakes, because a single lot at wholesale volume reaches far more end customers than a single retail order.",
      "This is also where documentation stops being a nice-to-have and becomes operational infrastructure. A wholesale partner needs to be able to answer a customer's question about a specific batch quickly and accurately, which means the certificate of analysis has to actually exist, be searchable, and match what shipped — not get reconstructed after the fact when a question comes in.",
      "None of this is about price positioning — it's about what a partnership needs to be durable. A supplier relationship built on verified batches, real documentation, and consistent testing is one a growing brand can build years of trust on top of. One built on unverified supply is a liability waiting for the first customer who asks a question the seller can't answer.",
      "If you're evaluating what a wholesale or white-label peptide supply relationship should look like — testing standards, batch traceability, and how fulfillment actually works day to day — that's exactly the conversation our wholesale program exists to have.",
    ],
    cta: { label: "Explore the Wholesale Program", href: "/wholesale" },
  },
  {
    slug: "white-label-peptide-dropshipping-done-right",
    label: "Dropshipping",
    title: "The Case for White-Label Peptide Dropshipping, Done Right",
    excerpt:
      "Dropshipping research peptides can mean shipping whatever's cheapest, or it can mean building a real brand on a supply chain that's actually verified. The difference is entirely in who you partner with.",
    image: "/images/science/purity.jpg",
    publishedDate: "2026-09-12",
    readTime: "6 min read",
    body: [
      "Dropshipping gets a mixed reputation in the research-chemical space, and it's earned — a lot of it is built on unverified supply, vague sourcing, and sellers who never see or test the product they're listing. None of that is inherent to the dropship model itself; it's a function of who's on the other end of the supply chain.",
      "Done properly, white-label dropshipping separates two things that don't actually need to live in the same company: building a brand, storefront, and customer relationship, and operating a compliant, testing-first supply and fulfillment chain. A founder who's good at the first doesn't need to also become an expert in HPLC testing and cold-chain-free lyophilized logistics to run a credible research-compound brand.",
      "What makes that separation work is that the fulfillment partner treats testing as non-negotiable regardless of who's selling under the label. Every batch independently tested for purity and identity, a real certificate of analysis behind every lot, and fulfillment that ships lyophilized product reliably — that standard has to hold whether the order came through EVLV's own storefront or through a partner's branded site.",
      "The CRM/CMS and storefront side matters too, and it's often the part new brands underestimate. Order tracking, customer accounts, batch/COA lookup tied to what actually shipped — that's infrastructure a dropship partner shouldn't have to build from scratch, and shouldn't want to, when it can run on a system already built for exactly this.",
      "The honest pitch here isn't that dropshipping is easy — it's that it's only worth doing on a supply chain you'd be comfortable putting your own name behind. If that's the kind of partnership you're evaluating, our wholesale and white-label program is built around exactly that standard.",
    ],
    cta: { label: "Explore the Wholesale Program", href: "/wholesale" },
  },
];

export function getJournalArticles() {
  return JOURNAL_ARTICLES;
}

export function getJournalArticleBySlug(slug: string) {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}
