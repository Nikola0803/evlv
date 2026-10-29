import { Metadata } from "next";
import { RESEARCH_ARTICLE_CSS } from "@/lib/research-article-css";

export const metadata: Metadata = {
  title: "How EVLV Verifies Product Quality — EVLV",
  description:
    "EVLV's quality verification process explained step by step: independent third-party COAs, HPLC purity analysis, identity confirmation, and the limits of what any RUO verification covers.",
  alternates: { canonical: "/research/testing-standards" },
};

const INNER_HTML = `
  <span class="kicker">Trust &amp; Transparency · Quality Standards</span>
  <h1 itemprop="headline">How EVLV Verifies Product Quality</h1>

  <div class="lead">
    EVLV's approach to quality verification is built around one principle: documentation you can check, not claims you have to take on faith. This page explains exactly how we verify the products in our catalog, what our published Certificates of Analysis represent, and where our verification process has limits.
  </div>

  <h2>The Problem We're Solving</h2>
  <p>The research peptide market has a chronic documentation problem. Many vendors make purity claims — "99% purity," "HPLC-tested," "pharmaceutical grade" — with no published evidence to support them. Even when certificates are posted, they are often supplier-provided documents, not independent third-party tests, meaning the seller is both making and verifying their own claims.</p>
  <p>A supplier-provided COA is not the same as an independent third-party COA. When an independent laboratory tests a sample that was submitted by the buyer rather than the manufacturer, the result is structurally more credible — the manufacturer cannot cherry-pick which batches to certify or alter what was sent to the lab before testing.</p>
  <p>EVLV publishes independent third-party COAs for available batches precisely to close that credibility gap. We acknowledge explicitly which products have matching documentation and which do not, rather than papering over the distinction with generic purity language.</p>

  <h2>Our Verification Process: Step by Step</h2>

  <div class="step-list">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <h3>Supplier pre-qualification</h3>
        <p>Before introducing a product to the EVLV catalog, we evaluate the manufacturer's GMP credentials, production documentation practices, and ability to provide batch-level traceability. We do not source from suppliers who cannot provide batch records. This is a baseline, not a guarantee of final product quality.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <h3>Batch sample submission for independent testing</h3>
        <p>For batches where independent COA documentation is available, samples are submitted to third-party analytical laboratories independent of the manufacturer. We do not use manufacturer-affiliated testing facilities for our published COAs. The laboratory receives the sample without prior knowledge of the expected result beyond the compound identity.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <h3>HPLC purity analysis</h3>
        <p>High-Performance Liquid Chromatography (HPLC) is the standard analytical method for peptide purity assessment. The technique separates compounds in a sample by their interaction with a stationary phase and mobile phase, producing a chromatogram where peak areas correspond to the relative abundance of each component. HPLC purity is reported as a percentage of the main peak (the target peptide) relative to total detectable material. Our published COAs report the HPLC purity result from the independent laboratory test.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">4</div>
      <div class="step-body">
        <h3>Identity confirmation</h3>
        <p>Purity alone does not confirm that the compound is what it claims to be — a 99% pure substance could be 99% pure wrong peptide. Identity verification typically uses mass spectrometry (MS) or tandem MS techniques that confirm the molecular weight and fragmentation pattern of the compound matches the expected sequence. Where identity confirmation data is included in a batch's documentation, it is published with the COA.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">5</div>
      <div class="step-body">
        <h3>Batch-level COA publication</h3>
        <p>Verified COAs are published in our <a href="/coas">COA Library</a> and matched to specific lot numbers. Every product listing indicates whether a COA is available for the current batch. When you receive an EVLV product, the lot number on your vial or carton can be entered in the COA Library to retrieve the corresponding documentation. If no COA is listed for your batch, we say so directly — we do not substitute a documentation placeholder.</p>
      </div>
    </div>
  </div>

  <h2>What Our Verification Does Not Cover</h2>
  <p>Honest documentation requires stating the limits of what has been verified, not only what has been confirmed.</p>
  <p><strong>Not all batches have independent COAs.</strong> Some products in our catalog are supplied with manufacturer documentation rather than independently commissioned third-party tests for every batch. Where this is the case, it is stated on the product page. We are working to increase the proportion of batches with independent documentation, but we will not represent supplier documents as independent tests.</p>
  <p><strong>HPLC purity does not measure everything.</strong> Standard HPLC purity reporting captures relative peak area percentages but does not independently measure absolute content (mg/vial), endotoxin levels, sterility, or the identity of any impurity peaks detected. More comprehensive analytical packages exist — we note on individual COAs which tests were performed for a given batch.</p>
  <p><strong>RUO products are not produced to pharmaceutical compounding standards.</strong> Our products are research-use-only compounds. Third-party independent testing is the best quality verification available in this market segment, but it is not equivalent to the quality controls applied to products produced under USP compounding pharmacy standards or GMP pharmaceutical manufacturing. See our <a href="/research/compounded-vs-research-grade">compounded vs. research-grade explainer</a> for a fuller discussion of this distinction.</p>

  <div class="callout">
    <p><strong>How to verify your batch:</strong> Every EVLV product comes with a lot number on the vial or carton. Enter that number at <a href="/coas">evlvpeptides.com/coas</a> to retrieve the corresponding Certificate of Analysis and testing documentation for your specific batch.</p>
  </div>

  <h2>Our Relationship with VerifiedPeptideReviews.com</h2>

  <div class="disclosure">
    <strong>Ownership Disclosure</strong>
    <p>EVLV and VerifiedPeptideReviews.com (VPR) share common ownership. VPR is a third-party review and testing platform that independently publishes peptide vendor reviews, HPLC test results, and market comparisons. Because of this ownership relationship, reviews of EVLV on VPR should be understood in the context of that shared ownership — readers should weigh this information accordingly and consult additional independent sources when evaluating EVLV relative to other vendors. We disclose this relationship directly rather than obscuring it, because transparency about how information is produced is the same standard we apply to our product documentation.</p>
  </div>

  <h2>Why Documentation Transparency Matters</h2>
  <p>The research peptide market is largely unregulated in the consumer-facing tier. There is no governing body requiring vendors to publish purity data, no mandatory audit of COA claims, and no standardized reporting format that makes vendor-to-vendor comparison straightforward. In this environment, documentation transparency is not a differentiator — it is a baseline responsibility.</p>
  <p>EVLV's position is that researchers who engage with this market deserve accurate information about what they are procuring. We publish what we know, state clearly what we don't know, and do not substitute marketing language for documented evidence. That is the operational definition of the "documentation-first" standard we have built around.</p>
  <p>It is also why we are transparent about the limits of our verification. A vendor who claims complete certainty about their products in this market is not being more rigorous — they are being less honest about the constraints every RUO supplier operates within.</p>

  <div class="disclaimer">
    <p><strong>Important:</strong> EVLV products are sold strictly for laboratory and analytical research use. They are not intended for human self-administration. Quality documentation published by EVLV describes the analytical characteristics of research compounds, not clinical safety or efficacy. Any use of these compounds in a human research context requires physician oversight.</p>
  </div>

  <div class="cta-block">
    <h2>Read the documentation yourself.</h2>
    <p>Every available COA is in our public library — no account required. Enter your lot number or browse by product.</p>
    <a href="/coas" class="cta-btn">View COA Library</a>
  </div>
`;

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How EVLV Verifies Product Quality",
  description:
    "EVLV's quality verification process explained step by step: independent third-party COAs, HPLC purity analysis, identity confirmation, and the limits of what any RUO verification covers.",
  author: { "@type": "Organization", name: "EVLV" },
  publisher: { "@type": "Organization", name: "EVLV" },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.evlvpeptides.com/research/testing-standards",
  },
};

export default function Page() {
  return (
    <>
      <style>{RESEARCH_ARTICLE_CSS}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article
        className="evlv-rc"
        itemScope
        itemType="https://schema.org/Article"
        dangerouslySetInnerHTML={{ __html: INNER_HTML }}
      />
    </>
  );
}
