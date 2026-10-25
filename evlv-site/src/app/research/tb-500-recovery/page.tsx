import { Metadata } from "next";
import { RESEARCH_ARTICLE_CSS } from "@/lib/research-article-css";

export const metadata: Metadata = {
  title: "TB-500 for Recovery: What the Research Shows — EVLV",
  description:
    "Preclinical research on TB-500 (Thymosin Beta-4 fragment) and tissue repair: proposed mechanisms, animal model findings, and what the current evidence base does and does not establish.",
  alternates: { canonical: "/research/tb-500-recovery" },
};

const INNER_HTML = `
  <span class="kicker">Research Overview · Musculoskeletal</span>
  <h1 itemprop="headline">TB-500 for Recovery: What the Research Shows</h1>

  <div class="lead">
    TB-500 is a synthetic analog of Thymosin Beta-4 (Tβ4), an endogenous peptide involved in actin regulation and cellular migration. Preclinical research has examined its role in wound healing, angiogenesis, and tissue repair across several injury models — but the human clinical evidence base remains limited, and no regulatory body has approved it for medical use.
  </div>

  <h2>Background: What Is TB-500?</h2>
  <p>Thymosin Beta-4 (Tβ4) is a naturally occurring 43-amino-acid protein found in most nucleated cells in the human body. It was first isolated in thymic tissue and named accordingly, but subsequent research established it is expressed broadly throughout the body rather than being specific to the thymus.</p>
  <p>TB-500 refers to a synthetic fragment of Tβ4 — specifically the central actin-binding domain (amino acids 17–23 of the full sequence, often described as the LKKTETQ sequence) — that researchers produce as a standalone peptide. It is distinct from Thymosin Alpha-1, a different thymic peptide that has reached clinical use in some countries for immune-related conditions.</p>
  <p>The distinction between TB-500 and the full Tβ4 protein is scientifically important: the synthetic fragment is designed to retain the actin-sequestering and cell-migration properties of the parent protein. Whether its pharmacological behavior in animal models maps onto the complete Tβ4 molecule's activity is a question preclinical researchers have examined without definitive resolution.</p>

  <h2>Proposed Mechanisms: What Preclinical Research Hypothesizes</h2>
  <p>Animal models have investigated several pathways that may explain Tβ4/TB-500's effects on tissue repair. These findings are hypothesis-generating — not clinically confirmed in humans.</p>

  <h3>Actin Sequestration and Cell Migration</h3>
  <p>Tβ4's primary biochemical function is binding G-actin (monomeric actin) with high affinity, maintaining a large intracellular pool of unpolymerized actin available for rapid cytoskeletal remodeling. When cells at a wound edge need to extend lamellipodia and migrate into damaged tissue, the availability of free G-actin becomes a rate-limiting factor. Multiple in vitro studies have observed that Tβ4 supplementation promotes migration of endothelial cells, keratinocytes, and cardiac cells in wound-scratch assays, with significantly faster gap closure compared to vehicle controls.</p>
  <cite>Goldstein AL, Hannappel E, Kleinman HK. Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues. Trends Mol Med. 2005;11(9):421-429.</cite>

  <h3>Angiogenesis and VEGF Upregulation</h3>
  <p>Several rodent studies have examined Tβ4's effect on blood vessel formation in ischemic tissue. Researchers observed upregulation of vascular endothelial growth factor (VEGF) and VEGFR2 expression in treated animals, suggesting a possible role in revascularization of injured tissue. Bock-Marquette et al. (Nature, 2004) published findings showing Tβ4 improved cardiac function and capillary density in mice following myocardial infarction — a well-cited paper that established early interest in the peptide's regenerative potential.</p>
  <cite>Bock-Marquette I, et al. Thymosin beta4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair. Nature. 2004;432(7016):466-472.</cite>

  <h3>Anti-Inflammatory Signaling</h3>
  <p>Preclinical models of traumatic injury, corneal wounds, and dermal damage have observed reduced inflammatory marker expression in Tβ4-treated animals. The peptide appears to modulate NF-κB activation and reduce pro-inflammatory cytokine release (IL-1β, TNF-α) in injured tissue — though the upstream mechanism connecting actin sequestration to immune signaling is not fully characterized. Studies examining recovery from muscle strain in rodents have reported fewer infiltrating inflammatory cells and earlier transition to the remodeling phase of healing in treated groups.</p>

  <h3>Cardiac and Skeletal Muscle Repair</h3>
  <p>The most extensively studied recovery application of Tβ4 in preclinical settings has been cardiac repair. Researchers at the National Institutes of Health and collaborating institutions have published a series of studies examining Tβ4 administration after myocardial infarction in mouse models, consistently reporting improved ventricular function, reduced scar area, and evidence of cardiomyocyte survival — outcomes that generated significant interest given the limited regenerative capacity of cardiac muscle. Skeletal muscle injury models have shown faster functional recovery in treated rodents compared to controls, though effect sizes across studies are variable.</p>

  <div class="callout">
    <p><strong>Note on these findings:</strong> All mechanisms described above derive from animal and in vitro studies. The translational gap between rodent injury models and human musculoskeletal or cardiac recovery is significant. These findings indicate biological plausibility, not clinical efficacy.</p>
  </div>

  <h2>Preclinical vs. Human Evidence: A Critical Distinction</h2>

  <h3>What animal research has examined:</h3>
  <p>TB-500 and Tβ4 have been studied in rodent models of myocardial infarction, dermal wound healing, corneal injury, traumatic brain injury, spinal cord damage, and skeletal muscle strain. Results across these diverse models have consistently shown some form of improved tissue repair outcome, which is why the compound has attracted substantial research interest despite the absence of large human trials.</p>

  <h3>What human clinical evidence does not yet establish:</h3>
  <p>Phase II clinical trials of Tβ4 (conducted by RegeneRx Biopharmaceuticals for indications including pressure ulcers and dry eye) have been conducted, but peer-reviewed Phase III results confirming efficacy for any indication have not been published as of this writing. The compound has not received FDA approval for any medical application.</p>
  <p>Individuals who report anecdotal use of TB-500 are typically using a compounded research peptide, not a pharmaceutical-grade formulation tested in controlled human trials. This is a material distinction: the purity, dose calibration, and route of administration of research compounds used outside supervised protocols differ from clinical trial conditions.</p>

  <h3>Relationship to BPC-157 Research</h3>
  <p>TB-500 is sometimes researched alongside BPC-157 because both peptides have been studied in models of musculoskeletal injury and tissue repair. The two operate through distinct mechanisms — BPC-157 acts primarily through the nitric oxide system and angiogenesis pathways, while TB-500/Tβ4 acts primarily through actin dynamics and cell migration. Their preclinical profiles overlap in outcome (improved tissue healing) but not mechanism, which makes them scientifically distinct research subjects despite being commonly discussed together. See our <a href="/research/bpc-157-gut-health">BPC-157 research overview</a> for that compound's separate evidence base.</p>

  <div class="disclaimer">
    <p><strong>Important:</strong> EVLV does not make medical claims about TB-500. The research described on this page represents preclinical and early-stage scientific investigation. It is not a basis for self-treatment. Any use of TB-500 or similar peptides in a human context requires evaluation and oversight by a licensed physician.</p>
  </div>

  <h2>Why Physician Oversight Matters for Recovery Research</h2>
  <p>Interest in TB-500 most often arises in the context of injury recovery — a context where individuals experiencing musculoskeletal pain or disrupted training are particularly motivated to explore emerging research. This makes rigorous oversight more important, not less: a physician familiar with the injury in question can identify whether a surgical, rehabilitative, or pharmaceutical intervention is more appropriate than a research protocol, and can rule out contraindications that self-research cannot.</p>
  <p>Compounding pharmacies that produce TB-500 for research purposes are operating in a different regulatory framework than pharmaceutical manufacturers. Any human-context use of TB-500 requires independently obtained physician guidance — the physician must evaluate the specific compound, the proposed parameters, and the individual's health history.</p>
  <p>EVLV sells TB-500 strictly as a research-use-only compound for laboratory and analytical research. EVLV does not provide physician referrals, medical guidance, or supervised clinical protocols — that oversight must be obtained independently from any vendor relationship.</p>

  <hr />

  <h2>Frequently Asked Questions</h2>
  <div itemscope itemtype="https://schema.org/FAQPage">

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">What is the difference between TB-500 and Thymosin Beta-4?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">Thymosin Beta-4 (Tβ4) is a naturally occurring 43-amino-acid protein found throughout the body. TB-500 is a synthetic peptide fragment derived from Tβ4's central actin-binding domain (approximately amino acids 17–23). Researchers study TB-500 as a more stable and targeted analog, but the two are not identical, and findings from studies of the full Tβ4 protein do not automatically apply to TB-500 and vice versa.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Has TB-500 been studied in human clinical trials?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">Early-phase clinical trials of Tβ4 (the parent compound) have been conducted by RegeneRx Biopharmaceuticals for indications including pressure ulcers and dry eye. Large-scale Phase III results confirming efficacy have not been published as of this writing. TB-500 specifically, as a synthetic fragment, has a more limited human trial history than the full Tβ4 protein.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">What injury types has TB-500 been studied for in preclinical research?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">Preclinical researchers have examined Tβ4/TB-500 in models of cardiac injury, dermal wounds, corneal damage, tendon healing, skeletal muscle strain, and neurological injury. No injury type has been confirmed as treatable with TB-500 in a human medical context — these findings represent animal-model data requiring further validation.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Is TB-500 the same as BPC-157?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">No. TB-500 and BPC-157 are distinct peptides with different amino acid sequences, origins, and proposed mechanisms. TB-500 is derived from Thymosin Beta-4 and acts primarily through actin dynamics and cell migration. BPC-157 is derived from a gastric protein and acts primarily through the nitric oxide system and angiogenic pathways. They are frequently researched in parallel because both have been studied in tissue repair models, but they are scientifically separate compounds.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Is TB-500 FDA-approved?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">No. TB-500 is not FDA-approved for any medical condition. EVLV sells TB-500 strictly as a research-use-only compound for laboratory and analytical research — not for human self-administration. Any human-context application requires independently obtained physician oversight.</span>
      </div>
    </div>

    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="faq-q" itemprop="name">Does EVLV provide medical guidance for TB-500 research?</div>
      <div class="faq-a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <span itemprop="text">No. EVLV is a research-use-only vendor. TB-500 products sold by EVLV are for laboratory and analytical research only — not for human self-administration. EVLV does not provide physician referrals, medical advice, or supervised clinical protocols. Any human-context application requires independently obtained physician guidance.</span>
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
  headline: "TB-500 for Recovery: What the Research Shows",
  description:
    "Preclinical research on TB-500 (Thymosin Beta-4 fragment) and tissue repair: proposed mechanisms, animal model findings, and what the current evidence base does and does not establish.",
  author: { "@type": "Organization", name: "EVLV" },
  publisher: { "@type": "Organization", name: "EVLV" },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.evlvpeptides.com/research/tb-500-recovery",
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
