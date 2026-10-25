import { Metadata } from "next";
import { RESEARCH_ARTICLE_CSS } from "@/lib/research-article-css";

export const metadata: Metadata = {
  title: "EVLV vs. Ion Peptide: How They Compare — EVLV",
  description:
    "A side-by-side comparison of EVLV and Ion Peptide: third-party testing documentation, COA transparency, veteran discount programs, affiliate terms, and research content depth.",
  alternates: { canonical: "/compare/evlv-vs-ion-peptide" },
};

const INNER_HTML = `
  <span class="kicker">Vendor Comparison · Research Peptides</span>
  <h1 itemprop="headline">EVLV vs. Ion Peptide: How They Compare</h1>

  <div class="lead">
    Ion Peptide and EVLV are both U.S.-based research peptide suppliers with published third-party testing documentation. This comparison covers the areas where they meaningfully differ: physician oversight structure, affiliate program terms, veteran benefits, and education resources.
  </div>

  <div class="disclaimer">
    <p><strong>Disclosure:</strong> This comparison was prepared by EVLV. The Ion Peptide information below reflects publicly available information and is accurate to the best of our knowledge at time of writing. Ion Peptide's policies and offerings may change; visit ionpeptide.com for current information. This is not an endorsement of either vendor for human use — all products from both vendors are research-use-only compounds.</p>
  </div>

  <h2>Side-by-Side Comparison</h2>

  <table class="comp-table">
    <thead>
      <tr>
        <th>Category</th>
        <th>EVLV</th>
        <th>Ion Peptide</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Location</td>
        <td>U.S.-based fulfillment</td>
        <td>U.S.-based fulfillment</td>
      </tr>
      <tr>
        <td>Third-Party Testing</td>
        <td>Independent COAs published per batch; lot number searchable in COA Library</td>
        <td>Lot-specific COA library with independent testing (Freedom Diagnostics, ILS Labs)</td>
      </tr>
      <tr>
        <td>Testing Method</td>
        <td>HPLC purity + identity confirmation where available</td>
        <td>HPLC purity + mass spectrometry identity</td>
      </tr>
      <tr>
        <td>COA Transparency</td>
        <td>States which products have vs. lack COA documentation</td>
        <td>Lot-level COA published; coverage across catalog not independently verified</td>
      </tr>
      <tr>
        <td>Physician Oversight Model</td>
        <td>RUO vendor only; no physician referrals or supervised clinical protocols. Researchers requiring physician guidance for any human-context application obtain that independently.</td>
        <td>No published physician oversight or supervised protocol structure</td>
      </tr>
      <tr>
        <td>Military / Veteran Discount</td>
        <td>25% lifetime discount for verified military, veterans, first responders, and frontline healthcare professionals</td>
        <td>No published veteran or first responder discount program</td>
      </tr>
      <tr>
        <td>Affiliate / Partner Program</td>
        <td>Selective application-based ambassador program; private negotiated terms</td>
        <td>Affiliate program launched ~2026; public terms not extensively published at time of writing</td>
      </tr>
      <tr>
        <td>Education Resources</td>
        <td>Research overviews, physician oversight context, COA education content</td>
        <td>Product-focused content; research overview depth varies by compound</td>
      </tr>
      <tr>
        <td>Shipping</td>
        <td>Same-day / next-day dispatch on in-stock orders before 2 PM ET; tracked delivery</td>
        <td>U.S. shipping with tracking; specific cutoff times not prominently published</td>
      </tr>
      <tr>
        <td>RUO Designation</td>
        <td>Research use only; not for human or veterinary consumption</td>
        <td>Research use only; not for human or veterinary consumption</td>
      </tr>
    </tbody>
  </table>

  <h2>Where EVLV and Ion Peptide Are Similar</h2>
  <p>Both vendors are U.S.-based, both publish third-party independent COA documentation for their catalogs, and both operate under research-use-only designations. Neither sells products for human self-administration, and both represent the more documentation-transparent end of the research peptide market compared to vendors who publish only supplier-provided certificates or no testing documentation at all.</p>
  <p>If your primary criteria is independent third-party testing documentation with lot-level traceability, both vendors have invested in that infrastructure. This is the baseline for responsible sourcing in this market segment, and both Ion Peptide and EVLV meet it.</p>

  <h2>Where EVLV Differentiates on Documentation</h2>
  <p>The most substantive difference between EVLV and Ion Peptide is documentation transparency: EVLV explicitly states which products have and lack third-party COA coverage, making gaps in documentation visible rather than obscuring them. Both are RUO vendors — neither arranges physician oversight, which is appropriate for research-use-only suppliers. Physicians must be engaged independently by researchers, separate from any vendor relationship.</p>
  <p>EVLV also publishes deeper research content covering mechanism, evidence base, and regulatory context for individual compounds, and maintains a permanent 25% lifetime veteran and first responder discount that Ion Peptide does not publish an equivalent of.</p>

  <h2>The Veteran and First Responder Distinction</h2>
  <p>EVLV's permanent 25% lifetime discount for verified military, veterans, reservists, first responders, and frontline healthcare professionals is a material difference for researchers in those categories. The discount applies once verified — no codes, no renewals — and covers the full EVLV catalog. Ion Peptide does not publish an equivalent program.</p>

  <div class="cta-block">
    <h2>Research starts with documentation.</h2>
    <p>Browse the EVLV catalog with lot-level COA documentation — independent purity and identity data you can verify before you order.</p>
    <a href="/coas" class="cta-btn">View COA Library</a>
  </div>
`;

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EVLV vs. Ion Peptide: How They Compare",
  description:
    "A side-by-side comparison of EVLV and Ion Peptide: third-party testing documentation, COA transparency, veteran discount programs, affiliate terms, and research content depth.",
  author: { "@type": "Organization", name: "EVLV" },
  publisher: { "@type": "Organization", name: "EVLV" },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.evlvpeptides.com/compare/evlv-vs-ion-peptide",
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
