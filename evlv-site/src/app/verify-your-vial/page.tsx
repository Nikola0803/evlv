import type { Metadata } from "next";
import Link from "next/link";
import { CoaScanner } from "@/app/coas/CoaScanner";

const SITE_URL = "https://www.evlvpeptides.com";

export const metadata: Metadata = {
  title: "Verify Your EVLV Vial: COA & Lot Records",
  description: "Use the lot code or vial QR to verify an EVLV research product against its exact COA and, where published, separate endotoxin documentation.",
  alternates: { canonical: "/verify-your-vial" },
  openGraph: {
    title: "How to Verify Your EVLV Vial | EVLV",
    description: "A documentation-first workflow for matching an EVLV product label to its published lot records.",
    url: "/verify-your-vial",
    type: "website",
  },
};

const STEPS = [
  { icon: "ri-qr-scan-2-line", label: "01 / Open the lot record", title: "Scan the QR or search the lot", body: "Use the QR printed on the vial or carton. It opens the public record for that identified lot. If a QR is unavailable, search the lot or report number in the COA Library." },
  { icon: "ri-price-tag-3-line", label: "02 / Compare the label", title: "Match the physical item", body: "Confirm the product name, labeled strength, and lot or report number on the received item before treating any published record as relevant." },
  { icon: "ri-file-search-line", label: "03 / Read the documents", title: "Review what was actually tested", body: "Open the original COA to read sample identification, method, result, laboratory, test date, and report scope. Where present, read endotoxin as its own separate report." },
  { icon: "ri-shield-check-line", label: "04 / Keep the scope honest", title: "Do not overextend a result", body: "A report belongs to its identified sample or lot. It does not automatically verify another strength, another batch, sterility, clinical suitability, or human or veterinary use." },
] as const;

const FAQ = [
  { question: "What does the QR code on an EVLV vial open?", answer: "The QR is designed to open the public record for the exact published lot. That record identifies the product, report number, laboratory, analysis date, and links to the original source PDFs." },
  { question: "Why are COA and endotoxin reports separate?", answer: "They answer different analytical questions. A COA may report identity, purity, or other listed attributes, while an endotoxin report has its own method, result, and scope. One should not be used to imply the other." },
  { question: "What if my label does not match the published record?", answer: "Do not assume the record applies. Contact EVLV support with the product name, labeled strength, and lot information so the documentation can be reviewed." },
  { question: "Does an analytical record make an RUO product suitable for personal use?", answer: "No. Published records support laboratory and analytical review only. EVLV products are not for human or veterinary use." },
] as const;

function jsonLd(value: object) { return JSON.stringify(value).replace(/</g, "\\u003c"); }

export default function VerifyYourVialPage() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Verify your vial", item: `${SITE_URL}/verify-your-vial` }] };

  return (
    <main className="bg-white text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-white md:-mt-[100px] md:pb-28 md:pt-[175px]">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 md:grid-cols-[1.08fr_0.72fr] md:items-center md:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">EVLV lot verification</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">How to verify your EVLV vial.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">A QR and lot-first workflow for connecting the item in hand to its published documentation, without treating a generic report as proof for every product.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/coas" className="rounded-md bg-copper px-7 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-sage-deep">Search COA library</Link><Link href="/sourcing" className="rounded-md border border-white/25 px-7 py-3 text-xs font-semibold uppercase tracking-wide text-white">Testing standards</Link></div>
            <p className="mt-6 text-xs font-medium text-white/45">Research use only. Not for human or veterinary use.</p>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper">Have the vial with you?</p>
            <h2 className="mt-3 font-display text-2xl font-semibold">Start with the QR.</h2>
            <p className="mt-3 text-sm leading-6 text-white/65">Scan the code on the item or carton to open the matching record. You can also search its lot number manually.</p>
            <div className="mt-6"><CoaScanner /></div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-16 md:px-8 md:py-24">
        <header className="max-w-3xl"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">A four-step check</p><h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Verify the record before relying on it.</h2><p className="mt-4 text-base leading-7 text-soft-gray">The goal is not to find any report with a familiar compound name. It is to connect the exact physical item, its lot, and the document that names that same sample.</p></header>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {STEPS.map((step) => <article key={step.label} className="rounded-2xl border border-stone bg-ivory-soft p-7 md:p-8"><i className={`${step.icon} text-2xl text-copper`} /><p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep">{step.label}</p><h3 className="mt-2 font-display text-2xl font-semibold">{step.title}</h3><p className="mt-4 text-sm leading-7 text-soft-gray">{step.body}</p></article>)}
        </div>
      </section>

      <section className="border-y border-stone bg-ivory-soft py-16 md:py-24"><div className="mx-auto grid max-w-[1180px] gap-8 px-4 md:grid-cols-[1fr_1fr] md:px-8"><article className="rounded-2xl bg-white p-7 md:p-9"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">COA record</p><h2 className="mt-3 font-display text-3xl font-semibold">What to match</h2><ul className="mt-6 space-y-3 text-sm leading-6 text-soft-gray"><li><b className="text-charcoal">Product and strength:</b> The document must identify the material being reviewed.</li><li><b className="text-charcoal">Lot or sample:</b> Compare the label code with the report identifier.</li><li><b className="text-charcoal">Laboratory and date:</b> Confirm who issued the report and when the sample was analyzed.</li><li><b className="text-charcoal">Method and scope:</b> Read the original PDF before interpreting a headline percentage.</li></ul></article><article className="rounded-2xl bg-charcoal p-7 text-white md:p-9"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Separate document type</p><h2 className="mt-3 font-display text-3xl font-semibold">Endotoxin is not a shortcut.</h2><p className="mt-5 text-sm leading-7 text-white/65">When published for the same DPS lot, EVLV displays the endotoxin report beside the COA. It must be read as its own analytical record, with its own method, result, and scope. It does not establish sterility, clinical suitability, or an approved use.</p><Link href="/coas" className="mt-7 inline-flex text-sm font-semibold text-copper underline underline-offset-4">Browse published records <i className="ri-arrow-right-line ml-1" /></Link></article></div></section>

      <section className="mx-auto grid max-w-[1180px] gap-12 px-4 py-16 md:grid-cols-[1fr_0.55fr] md:px-8 md:py-24"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Verification FAQ</p><h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Straight answers about records and lots.</h2><div className="mt-8 space-y-4">{FAQ.map((item) => <details key={item.question} className="rounded-xl border border-stone bg-white p-5"><summary className="cursor-pointer list-none pr-6 font-semibold">{item.question}</summary><p className="mt-3 text-sm leading-7 text-soft-gray">{item.answer}</p></details>)}</div></div><aside className="h-fit rounded-2xl border border-stone bg-ivory-soft p-7 md:sticky md:top-28"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Need document help?</p><h2 className="mt-3 font-display text-2xl font-semibold">Start with the lot, not a guess.</h2><p className="mt-4 text-sm leading-6 text-soft-gray">For a label-to-document mismatch, contact EVLV with the product name, labeled strength, and lot or report identifier.</p><Link href="/contact" className="mt-6 inline-flex rounded-md bg-sage-deep px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-charcoal">Contact support</Link></aside></section>
    </main>
  );
}
