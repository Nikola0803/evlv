import { Metadata } from "next";
import { RESEARCH_ARTICLE_CSS } from "@/lib/research-article-css";

export const metadata: Metadata = {
  title: "Compounded vs. Research-Grade Peptides: What the Terms Actually Mean — EVLV",
  description:
    "Compounded peptides and research-grade peptides describe two distinct regulatory categories that are frequently conflated. This explainer covers the legal definitions, quality standards, and what each means for physician oversight.",
  alternates: { canonical: "/research/compounded-vs-research-grade" },
};

const INNER_HTML = `
  <span class="kicker">Education · Regulatory &amp; Quality</span>
  <h1 itemprop="headline">Compounded vs. Research-Grade Peptides: What the Terms Actually Mean</h1>

  <div class="lead">
    "Compounded peptides" and "research-grade peptides" describe two distinct regulatory categories that are frequently conflated in online discussions. Understanding the difference matters before making any decision about engaging with these compounds — whether through a physician-supervised protocol or a research procurement process.
  </div>

  <h2>The Two Categories: Clear Definitions</h2>
  <p>These terms sound similar and are often used interchangeably by vendors and forums alike, but they describe materially different regulatory and quality contexts. The conflation is not accidental — it serves sellers who want their products to appear legitimate under either framework without being strictly accountable to either.</p>

  <div class="def-block">
    <strong>Compounded Peptides</strong>
    <p>Peptides prepared by a licensed compounding pharmacy under the oversight of a licensed prescriber. In the United States, compounding is regulated under Section 503A (patient-specific, prescriber-directed) or Section 503B (outsourcing facilities, larger-scale production) of the Federal Food, Drug, and Cosmetic Act. Compounded peptides are intended for human or veterinary use in specific patients; they require a valid physician prescription and are subject to pharmacy board oversight. Examples: BPC-157 compounded for a specific patient under physician supervision; semaglutide compounded during shortage conditions.</p>
  </div>

  <div class="def-block">
    <strong>Research-Grade Peptides (Research Use Only / RUO)</strong>
    <p>Peptides produced for laboratory and analytical research applications, not for human or veterinary use. RUO products are sold to researchers, academic institutions, and companies for use in cell culture, animal studies, assay development, and related scientific work. They are not produced under pharmacy standards and are not intended for human administration. EVLV's products are sold under this designation — strictly for laboratory and analytical research use.</p>
  </div>

  <h2>Why the Terms Get Conflated</h2>
  <p>Several dynamics drive the confusion between these two categories.</p>

  <h3>1. Physical similarity</h3>
  <p>A compounded peptide vial destined for a specific patient and a research-grade peptide vial sold to a laboratory researcher can look nearly identical: same lyophilized white powder, same amber glass vial, same product name. The difference lies entirely in the regulatory pathway behind the product, not in any physical characteristic visible on the label.</p>

  <h3>2. Overlapping chemistry</h3>
  <p>The peptide molecule itself — its amino acid sequence and chemical identity — is the same regardless of whether it was produced for compounding or research purposes. A synthetic BPC-157 peptide doesn't chemically "know" which regulatory category it belongs to. The distinction is imposed by the production, testing, and distribution pathway, not by the molecule.</p>

  <h3>3. Informal vendor language</h3>
  <p>Many online vendors use the term "research-grade" loosely to imply high quality or purity, without reference to the actual RUO regulatory designation. This creates a false equivalence between "research-grade" as a marketing term and the formal legal meaning of research-use-only designation. Similarly, some vendors describe their products as "pharmaceutical-grade" without holding any pharmaceutical regulatory status — a claim that signals nothing when unverified.</p>

  <h3>4. The grey market reality</h3>
  <p>A substantial portion of the peptide marketplace exists in a grey zone: products labeled RUO that are purchased by individuals for self-administration, outside any physician oversight, compounding pharmacy, or legitimate research context. This neither qualifies as compounding (no prescription, no licensed pharmacy) nor as legitimate research use (no institutional oversight, no scientific protocol). It is simply an unregulated consumer transaction with an RUO label attached to avoid formal pharmaceutical classification.</p>

  <h2>Quality Standards: Are They the Same?</h2>
  <p>No — and this is an important practical distinction beyond regulatory labeling.</p>

  <h3>Pharmaceutical compounding standards</h3>
  <p>503A and 503B compounding pharmacies are subject to United States Pharmacopeia (USP) standards, state pharmacy board inspections, and — for 503B outsourcing facilities — FDA facility inspections. These standards require documented identity testing, potency verification, sterility testing, and endotoxin testing, among other controls. A compounded peptide produced under these standards has undergone a defined set of quality checks before reaching a patient.</p>

  <h3>Research-grade standards</h3>
  <p>RUO peptide quality standards are set by individual manufacturers and vary considerably across the market. There is no federal regulatory body setting a mandatory quality floor for RUO peptides equivalent to USP pharmaceutical standards. What constitutes "research-grade" quality is determined by what a given manufacturer chooses to document and test — which is why third-party independent testing and published Certificates of Analysis are the primary transparency mechanism in this market segment. The presence of an independent HPLC purity report and identity confirmation is the closest analog to quality verification available for RUO products.</p>

  <div class="callout">
    <p><strong>What EVLV does:</strong> EVLV's products are sold as research-use-only compounds. Where available, we publish independent third-party Certificates of Analysis (COAs) documenting purity and identity on a per-batch basis. This is the highest transparency standard achievable for RUO products, and we state clearly which products have matching COA documentation and which do not. No RUO standard — including ours — is equivalent to a compounded pharmaceutical regulated under 503A/503B.</p>
  </div>

  <h2>What This Means for Physician Oversight</h2>
  <p>The compounded/research-grade distinction has direct implications for how a physician can or should engage with these compounds.</p>
  <p>A physician who prescribes a compounded peptide through a licensed 503A pharmacy is operating within a defined legal and regulatory framework: they write a prescription, a licensed pharmacy fills it to applicable USP standards, and the patient receives a compound produced to documented quality requirements. This is a supervised, traceable pathway.</p>
  <p>A physician participating in a research protocol involving RUO compounds is operating in a different framework: the product is not pharmaceutical-grade, the physician is responsible for evaluating the specific product's available documentation, and the protocol carries different risk and oversight requirements than a conventional compounding arrangement. Physicians who engage in peptide research typically have specific familiarity with this landscape and evaluate RUO products based on available batch documentation before including them in supervised protocols.</p>
  <p>EVLV's role is limited to supplying and documenting RUO compounds for legitimate research use. Human-context protocols are outside EVLV's scope — that oversight must be independently obtained from a licensed physician with no connection to the vendor relationship.</p>

  <div class="disclaimer">
    <p><strong>Important:</strong> This page is provided for educational purposes only and does not constitute legal, medical, or regulatory advice. The regulatory landscape for peptides is complex and evolving; consult a licensed professional for guidance specific to your situation. EVLV products are sold strictly for laboratory and analytical research use and are not intended for human self-administration.</p>
  </div>

  <hr />

  <h2>Frequently Asked Questions</h2>
  <div itemscope itemtype="https://schema.org/FAQPage">

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Can I get a compounded peptide without a prescription?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">No. Compounded peptides are prescription medications prepared by licensed compounding pharmacies for specific patients. A valid physician prescription from a licensed prescriber is required. Purchasing what appears to be a "compounded" peptide without a prescription means the product is not actually a compounded pharmaceutical — it is either a research-grade product mislabeled, or an unregulated product sold outside any legitimate regulatory framework.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Is "research-grade" the same as "pharmaceutical-grade"?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">No. "Pharmaceutical-grade" refers to products produced under GMP (Good Manufacturing Practice) standards and subject to regulatory oversight appropriate for human use. Research-grade (RUO) products are produced for laboratory and analytical research, not for human administration, and are held to different quality standards. The term "pharmaceutical-grade" applied to an RUO product is a marketing claim, not a regulatory designation, unless accompanied by verifiable GMP certification.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">What does "research-use only" (RUO) actually mean legally?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">RUO is an FDA designation indicating that a product is intended solely for laboratory research, not for clinical or diagnostic use in humans or animals. Selling an RUO product while knowing or intending it for human use is a violation of federal law. The RUO label is not a workaround for pharmaceutical regulations — it carries its own set of legal constraints on intended use.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Why do some peptides exist in both compounded and research-grade forms?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">The same peptide molecule can exist in both forms because the molecule itself is not what defines the regulatory category — the production pathway, oversight, and intended use define it. BPC-157, for example, can be legally produced by a 503A compounding pharmacy for a specific patient under a physician's prescription, and simultaneously produced by a research chemical company for sale to laboratories. The compound is chemically identical; the regulatory and quality context is entirely different.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">How does EVLV classify its products?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">EVLV's products are sold strictly as research-use-only (RUO) compounds for laboratory and analytical research. They are not compounded pharmaceuticals, are not produced under pharmacy standards, and are not intended for human self-administration. EVLV publishes independent third-party Certificates of Analysis for available batches and clearly indicates which products have matching COA documentation. Any engagement with these compounds in a human research context requires physician oversight.</span>
      </div>
    </div>

  </div>

  <div class="cta-block">
    <h2>Research starts with documentation.</h2>
    <p>Browse EVLV's catalog with lot-level COA documentation — independent purity and identity data you can verify before you order.</p>
    <a href="/coas" class="cta-btn">View COA Library</a>
  </div>
`;

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Compounded vs. Research-Grade Peptides: What the Terms Actually Mean",
  description:
    "Compounded peptides and research-grade peptides describe two distinct regulatory categories that are frequently conflated. This explainer covers the legal definitions, quality standards, and what each means for physician oversight.",
  author: { "@type": "Organization", name: "EVLV" },
  publisher: { "@type": "Organization", name: "EVLV" },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.evlvpeptides.com/research/compounded-vs-research-grade",
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
