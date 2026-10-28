import { Metadata } from "next";
import { RESEARCH_ARTICLE_CSS } from "@/lib/research-article-css";

export const metadata: Metadata = {
  title: "MOTS-c Research Overview: Mitochondrial Peptide & Metabolic Research — EVLV",
  description:
    "MOTS-c is a mitochondria-derived peptide studied for metabolic regulation, insulin sensitivity, and aging. This overview covers the preclinical evidence, proposed mechanisms, and current state of human research.",
  alternates: { canonical: "/research/mots-c" },
};

const INNER_HTML = `
  <span class="kicker">Research Overview · Mitochondrial Biology</span>
  <h1 itemprop="headline">MOTS-c: The Mitochondria-Derived Peptide Researchers Are Studying</h1>

  <div class="lead">
    MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA-c) is a peptide encoded within mitochondrial DNA that has emerged as a subject of significant research interest for its proposed roles in metabolic regulation, insulin sensitivity, and age-related physiological decline. Unlike most research peptides, it originates from the mitochondrial genome rather than the nuclear genome — a discovery that fundamentally changed how researchers understand mitochondria's role in systemic signaling.
  </div>

  <h2>Background: Where MOTS-c Comes From</h2>
  <p>MOTS-c was first described in 2015 by Lee et al. in a paper published in Cell Metabolism, making it a relatively recent addition to the peptide research landscape. The peptide is 16 amino acids in length and is derived from a short open reading frame (sORF) within the 12S ribosomal RNA gene of mitochondrial DNA — a region that was previously classified as non-coding and largely ignored in mainstream genetic research.</p>
  <p>The discovery that the mitochondrial genome encodes bioactive peptides (MOTS-c and Humanin being the most studied) revised a long-held assumption in molecular biology: that mitochondria's genomic role was limited to encoding components of the oxidative phosphorylation machinery. MOTS-c is now understood as part of a class of "mitochondrial-derived peptides" (MDPs) that may function as retrograde signals — communicating the mitochondria's metabolic state back to the cell nucleus and to other tissues through the bloodstream.</p>

  <h2>Proposed Mechanisms: What Preclinical Research Has Examined</h2>

  <h3>AMPK Activation and Metabolic Flexibility</h3>
  <p>The most consistently reported mechanism in MOTS-c preclinical research is activation of AMP-activated protein kinase (AMPK), a central energy-sensing enzyme that regulates cellular metabolism in response to energy status. Studies in cell cultures and rodent models have observed that MOTS-c administration increased AMPK phosphorylation, which in turn promoted glucose uptake, fatty acid oxidation, and inhibition of de novo lipogenesis. This pathway is of particular research interest because AMPK activation is one mechanism shared by established metabolic interventions including metformin.</p>
  <cite>Lee C, et al. The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance. Cell Metab. 2015;21(3):443-454.</cite>

  <h3>Folate Cycle and One-Carbon Metabolism</h3>
  <p>More recent research has proposed that MOTS-c may act within the mitochondrial one-carbon folate pathway, with downstream effects on purine biosynthesis and the methionine cycle. Kim et al. (2018, Nat Commun) showed that MOTS-c enters the nucleus in response to metabolic stress, where it activates the antioxidant response element (ARE) pathway — suggesting MOTS-c functions as a stress-responsive nuclear transcription regulator in addition to its circulating hormonal role. This dual cytoplasmic/nuclear activity is unusual among peptides and has made it a subject of particular mechanistic interest.</p>
  <cite>Kim SJ, et al. Mitochondrially derived peptides as novel regulators of metabolism. J Physiol. 2017;595(21):6613-6621.</cite>

  <h3>Exercise-Responsive Signaling</h3>
  <p>A notable finding from Lee et al. (2019) was that MOTS-c levels in human blood increased significantly following high-intensity exercise, suggesting it functions as an exercise-inducible hormone — or "exerkine." Administration of synthetic MOTS-c to aged mice improved their physical performance on exercise tests, raising questions about whether declining endogenous MOTS-c levels contribute to the reduced exercise capacity observed in aging. These findings have driven interest in MOTS-c as a potential aging-related research compound, distinct from its earlier focus on metabolic disease.</p>
  <cite>Lee C, et al. MOTS-c: A novel mitochondrial-derived peptide regulating muscle and fat metabolism. Free Radic Biol Med. 2019;100(1):182-187.</cite>

  <h3>Insulin Sensitivity in Rodent Models</h3>
  <p>The original 2015 Cell Metabolism study and subsequent work showed that obese, insulin-resistant mice treated with MOTS-c demonstrated improvements in glucose tolerance, reduced adiposity, and improved insulin signaling in skeletal muscle. These effects appeared to be mediated through the AMPK pathway described above, combined with effects on mitochondrial substrate utilization. Sample sizes in these studies were typically 8–12 animals per group, and results were consistent across high-fat diet and genetically obese mouse models.</p>

  <div class="callout">
    <p><strong>Research parameter note:</strong> Published preclinical MOTS-c studies have used a range of doses from approximately 0.5 mg/kg to 15 mg/kg body weight in rodent models, administered via intraperitoneal injection. These figures describe research parameters in animal studies and are not a basis for any human dosing approach. Rodent-to-human dose translation is complex and does not scale linearly; any human research application requires physician determination of appropriate parameters based on individual health status.</p>
  </div>

  <h2>Summary of Published Research Parameters</h2>
  <p>The following table summarizes the types of studies published on MOTS-c through the research literature. It is presented for scientific context only — it does not constitute a protocol or clinical guidance.</p>

  <table class="data-table">
    <thead>
      <tr>
        <th>Study Focus</th>
        <th>Model</th>
        <th>Key Outcome Measured</th>
        <th>Published Source</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Insulin resistance / obesity</td>
        <td>Mice (HFD, ob/ob)</td>
        <td>Glucose tolerance, adiposity, AMPK activation</td>
        <td>Lee et al., Cell Metab 2015</td>
      </tr>
      <tr>
        <td>Skeletal muscle metabolism</td>
        <td>Mice, C2C12 cells</td>
        <td>AMPK phosphorylation, glucose uptake</td>
        <td>Lee et al., Free Radic Biol Med 2019</td>
      </tr>
      <tr>
        <td>Nuclear stress signaling</td>
        <td>Human cells, mice</td>
        <td>ARE activation, NRF2 pathway</td>
        <td>Kim et al., Nat Commun 2018</td>
      </tr>
      <tr>
        <td>Exercise response</td>
        <td>Human serum, aged mice</td>
        <td>Circulating MOTS-c after exercise, grip strength</td>
        <td>Cataldo et al., Physiology 2022</td>
      </tr>
      <tr>
        <td>Age-related metabolic decline</td>
        <td>Aged mice</td>
        <td>Frailty markers, adipose tissue function</td>
        <td>Reynolds et al., Nat Aging 2021</td>
      </tr>
    </tbody>
  </table>

  <h2>Human Evidence: Current Status</h2>
  <p>MOTS-c is among the most scientifically compelling mitochondrial peptides studied to date, but its human evidence base is early. A handful of human studies have measured endogenous MOTS-c levels in specific populations — including older adults, athletes, and type 2 diabetes patients — and observed correlations consistent with the mechanistic hypotheses. These are observational findings, not intervention trials.</p>
  <p>As of this writing, no large-scale randomized controlled trials of synthetic MOTS-c in humans have been published. Research groups have established that the peptide is measurable in human plasma and that its levels change in response to exercise and aging in ways that align with animal model findings — but confirming that exogenous MOTS-c produces the same effects in humans as in rodents requires clinical trial evidence that does not yet exist.</p>

  <div class="disclaimer">
    <p><strong>Important:</strong> EVLV does not make medical claims about MOTS-c. This page describes preclinical research published in peer-reviewed scientific literature. It is not a protocol, a recommendation, or a basis for self-administration. Any use of MOTS-c or similar compounds in a human context requires evaluation and oversight by a licensed physician.</p>
  </div>

  <h2>Why Physician Oversight Is Essential</h2>
  <p>Interest in MOTS-c often arrives alongside interest in longevity, metabolic health, and aging research — a context where the line between scientific curiosity and self-treatment is particularly easy to cross. The fact that MOTS-c is naturally produced by the body does not mean that exogenous synthetic MOTS-c behaves identically, acts at equivalent concentrations, or is safe in all individuals.</p>
  <p>A physician familiar with metabolic and peptide research can assess whether MOTS-c research is appropriate in the context of an individual's complete health picture, including existing metabolic conditions, medications, and lab values. They can also calibrate any research approach based on individual physiology rather than rodent weight-based parameters.</p>
  <p>EVLV sells MOTS-c strictly as a research-use-only compound for laboratory and analytical research. Any human-context application requires independently obtained physician guidance — EVLV does not provide medical advice, physician referrals, or supervised clinical protocols.</p>

  <hr />

  <h2>Frequently Asked Questions</h2>
  <div itemscope itemtype="https://schema.org/FAQPage">

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">What makes MOTS-c different from other research peptides?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">MOTS-c is encoded by mitochondrial DNA rather than nuclear DNA — a distinction that makes it one of a small class of "mitochondria-derived peptides" (MDPs). This origin is scientifically significant because it suggests MOTS-c functions as a retrograde signal communicating mitochondrial status to the rest of the cell and body, rather than a conventional hormone or growth factor produced by dedicated endocrine tissue.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">What dosage protocol has been used in MOTS-c research?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">Published preclinical studies have used doses ranging from approximately 0.5 mg/kg to 15 mg/kg body weight in rodent models via intraperitoneal injection. These are animal research parameters and cannot be directly applied to humans — rodent-to-human dose translation requires allometric scaling and individual clinical assessment. EVLV does not publish human dosing guidance for any research compound; that determination is a physician's responsibility.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Is MOTS-c naturally produced in the human body?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">Yes. Endogenous MOTS-c is measurable in human plasma and appears to be produced in all nucleated cells by their mitochondria. Studies have found that endogenous MOTS-c levels decline with age and increase in response to aerobic exercise — observations that align with the metabolic and longevity-related hypotheses generated by animal research.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Are there published human clinical trials of MOTS-c?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">As of this writing, large-scale randomized controlled trials of exogenous MOTS-c in humans have not been published. Human studies have measured endogenous MOTS-c levels in various populations and found patterns consistent with animal model hypotheses, but intervention trials confirming efficacy or safety of administered synthetic MOTS-c in humans are not yet part of the published literature.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Is MOTS-c FDA-approved for any use?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">No. MOTS-c is not FDA-approved for any medical use. EVLV sells MOTS-c strictly as a research-use-only compound for laboratory and analytical research — not for human self-administration. Any human-context application requires independently obtained physician oversight.</span>
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
  headline: "MOTS-c: The Mitochondria-Derived Peptide Researchers Are Studying",
  description:
    "MOTS-c is a mitochondria-derived peptide studied for metabolic regulation, insulin sensitivity, and aging. This overview covers the preclinical evidence, proposed mechanisms, and current state of human research.",
  author: { "@type": "Organization", name: "EVLV" },
  publisher: { "@type": "Organization", name: "EVLV" },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.evlvpeptides.com/research/mots-c",
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
