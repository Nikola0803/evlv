import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCoaEntries } from "@/lib/coa-data";
import { getCoaLotId, getEndotoxinReport } from "@/lib/coa-lots";
import { getProductBySlug } from "@/lib/products";

const SITE_URL = "https://www.evlvpeptides.com";

function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

async function getLot(lot: string) {
  const entries = await getCoaEntries();
  return entries.find((entry) => getCoaLotId(entry) === lot);
}

export async function generateMetadata({ params }: { params: Promise<{ lot: string }> }): Promise<Metadata> {
  const { lot } = await params;
  const coa = await getLot(lot);
  if (!coa) return {};
  const name = coa.productName ?? coa.compound ?? "EVLV research product";
  const title = `${name} Certificate of Analysis | ${coa.label ?? "Lot report"}`;
  const lotRef = coa.label ? ` lot ${coa.label}` : "";
  const description = `Review the published ${coa.lab ?? "laboratory"} record for ${name}${lotRef}, including the identified lot, reported result, and analysis date.`;
  return {
    title,
    description,
    alternates: { canonical: `/coas/${lot}` },
    robots: { index: true, follow: true },
    openGraph: { title: `${title} | EVLV`, description, url: `/coas/${lot}`, type: "article" },
  };
}

export default async function CoaLotPage({ params }: { params: Promise<{ lot: string }> }) {
  const { lot } = await params;
  const coa = await getLot(lot);
  if (!coa) notFound();

  const product = getProductBySlug(coa.slug);
  const endotoxinUrl = getEndotoxinReport(coa.label);
  const productName = coa.productName ?? product?.name ?? coa.compound ?? "Research product";
  const pageUrl = `${SITE_URL}/coas/${lot}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${pageUrl}#report`,
    url: pageUrl,
    name: `${productName} laboratory report ${coa.label ?? ""}`.trim(),
    description: `Published laboratory documentation for ${productName}.`,
    about: { "@type": "Thing", name: coa.compound ?? productName },
    datePublished: coa.tested,
    publisher: { "@type": "Organization", name: "EVLV", url: SITE_URL },
    isBasedOn: coa.url,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "COA Library", item: `${SITE_URL}/coas` },
      { "@type": "ListItem", position: 3, name: coa.label ?? productName, item: pageUrl },
    ],
  };

  return (
    <main className="bg-white text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <section className="bg-charcoal pb-16 pt-24 text-white md:pb-20 md:pt-28">
        <div className="mx-auto max-w-[1080px] px-4 md:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/55" aria-label="Breadcrumb">
            <Link href="/">Home</Link><i className="ri-arrow-right-s-line" />
            <Link href="/coas">COA Library</Link><i className="ri-arrow-right-s-line" />
            <span className="truncate text-white/80">{coa.label ?? "Lot report"}</span>
          </nav>
          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Published lot record</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">{productName} COA</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">This page identifies the exact published record before opening the source document. Results apply only to the named sample or lot.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr]">
          <article className="rounded-2xl border border-stone bg-ivory-soft p-6 md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Record details</p>
            <dl className="mt-6 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              <div><dt className="text-xs text-soft-gray">Product</dt><dd className="mt-1 font-display text-xl font-semibold">{productName}</dd></div>
              <div><dt className="text-xs text-soft-gray">Compound</dt><dd className="mt-1 text-lg font-semibold">{coa.compound ?? "See source report"}</dd></div>
              <div><dt className="text-xs text-soft-gray">Lot / report number</dt><dd className="mt-1 font-mono text-sm font-semibold">{coa.label ?? "See source report"}</dd></div>
              <div><dt className="text-xs text-soft-gray">Issuing laboratory</dt><dd className="mt-1 text-lg font-semibold">{coa.lab ?? "See source report"}</dd></div>
              <div><dt className="text-xs text-soft-gray">Reported purity</dt><dd className="mt-1 text-lg font-semibold text-sage-deep">{coa.purity ?? "See source report"}</dd></div>
              <div><dt className="text-xs text-soft-gray">Analyzed</dt><dd className="mt-1 text-lg font-semibold">{coa.tested ?? "See source report"}</dd></div>
            </dl>
            <div className="mt-8 border-t border-stone pt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sage-deep">Published report bundle</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a href={coa.url} target="_blank" rel="noreferrer" className="rounded-xl border border-sage-deep/20 bg-white p-4 transition hover:border-sage-deep hover:shadow-sm"><span className="flex items-center justify-between gap-3"><b className="text-sm">COA / purity record</b><i className="ri-external-link-line text-sage-deep" /></span><small className="mt-2 block leading-5 text-soft-gray">Open the original record for its stated method, result, sample identification, and scope.</small></a>
                {endotoxinUrl ? <a href={endotoxinUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-sage-deep/20 bg-[#f4f8f5] p-4 transition hover:border-sage-deep hover:shadow-sm"><span className="flex items-center justify-between gap-3"><b className="text-sm">Endotoxin report</b><i className="ri-test-tube-line text-lg text-sage-deep" /></span><small className="mt-2 block leading-5 text-soft-gray">Published for this same DPS lot. Read it as a separate analytical record.</small></a> : <div className="rounded-xl border border-stone bg-ivory-soft p-4"><span className="flex items-center justify-between gap-3"><b className="text-sm text-charcoal/65">Endotoxin report</b><i className="ri-file-forbid-line text-charcoal/35" /></span><small className="mt-2 block leading-5 text-soft-gray">No matching endotoxin report is currently published for this identified lot.</small></div>}
              </div>
              <p className="mt-4 text-xs leading-6 text-soft-gray">An endotoxin record is not a sterility or clinical-use claim. Results remain limited to the identified sample and report scope.</p>
            </div>
          </article>
          <aside className="h-fit rounded-2xl border border-stone bg-white p-6 md:sticky md:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Verify before use</p>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-soft-gray">
              <li><strong className="text-charcoal">1. Match identity.</strong> Confirm the named compound and product match the item being reviewed.</li>
              <li><strong className="text-charcoal">2. Match the record.</strong> Compare the lot or sample identifier, laboratory, and test date.</li>
              <li><strong className="text-charcoal">3. Read the method.</strong> Interpret results only within the methods and scope stated in the PDF.</li>
            </ol>
            {product && <Link href={`/shop/${product.slug}`} className="mt-7 inline-flex text-sm font-semibold text-sage-deep underline decoration-sage-deep/30 underline-offset-4">View {product.name}</Link>}
            <Link href="/coas" className="mt-4 block text-sm font-semibold text-sage-deep underline decoration-sage-deep/30 underline-offset-4">Search the COA library</Link>
            <div className="mt-7 border-t border-stone pt-6 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sage-deep">Vial QR destination</p>
              <Image src={`/api/coas/${lot}/qr`} alt={`QR code for ${coa.label ?? productName} lot record`} width={180} height={180} unoptimized className="mx-auto mt-3 h-36 w-36 rounded-lg border border-stone bg-white p-2" />
              <a href={`/api/coas/${lot}/qr`} download={`evlv-${lot}-coa-qr.svg`} className="mt-3 inline-block text-xs font-semibold text-sage-deep underline decoration-sage-deep/30 underline-offset-4">Download print-ready QR</a>
            </div>
          </aside>
        </div>
        <p className="mt-10 rounded-xl border border-stone bg-ivory-soft p-5 text-xs leading-6 text-soft-gray">Research use only. This documentation is supplied to support laboratory and analytical review. It does not establish safety, efficacy, clinical suitability, or human or veterinary use.</p>
      </section>
    </main>
  );
}
