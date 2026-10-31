import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getJournalArticles, getJournalArticleBySlug } from "@/lib/journal-data";

export function generateStaticParams() {
  return getJournalArticles().map((a) => ({ slug: a.slug }));
}

const SITE_URL = "https://www.evlvpeptides.com";

// Keep SERP titles concise while preserving the complete editorial headline
// on-page, in structured data, and in social cards.
const SEO_TITLES: Record<string, string> = {
  "5-amino-1mq-research-documentation-guide": "5-Amino-1MQ: COA & Research Guide",
  "are-research-peptides-legal-in-the-us-2026": "Research Peptides in the US: 2026 Guide",
  "bpc-157-peptide-research-documentation-guide": "BPC-157: COA & Research Guide",
  "bpc-157-us-research-guide-2026": "BPC-157 in the US: 2026 Research Guide",
  "bpc-157-vs-tb-500-research-documentation": "BPC-157 vs TB-500: Documentation Guide",
  "cjc-ipamorelin-peptide-blend-documentation-guide": "CJC/Ipamorelin: COA & Research Guide",
  "evlv-1-vs-evlv-2-receptor-selectivity-research": "EVLV-1 vs EVLV-2: Research Comparison",
  "evlv-3-us-research-guide-2026": "EVLV-3 in the US: 2026 Research Guide",
  "ghk-cu-peptide-research-documentation-guide": "GHK-Cu: COA & Research Guide",
  "glow-peptide-blend-research-guide": "GLOW Blend: COA & Research Guide",
  "glow-vs-klow-peptide-blend-research": "GLOW vs KLOW: Documentation Differences",
  "how-to-review-a-bpc-157-coa": "BPC-157 COA: How to Review a Report",
  "how-to-review-a-glow-blend-coa": "GLOW Blend COA: How to Review a Report",
  "how-to-review-a-semaglutide-coa": "Semaglutide COA: How to Review a Report",
  "how-to-review-a-tb-500-coa": "TB-500 COA: How to Review a Report",
  "how-to-review-a-tirzepatide-coa": "Tirzepatide COA: How to Review a Report",
  "how-to-review-a-wolverine-blend-coa": "WOLVERINE Blend COA: How to Review",
  "how-to-review-an-ss-31-coa": "SS-31 COA: How to Review a Report",
  "identifying-lyophilized-peptides": "Lyophilized Peptide Cake: Appearance Guide",
  "klow-peptide-blend-research-guide": "KLOW Blend: COA & Research Guide",
  "mg-versus-powder-amount": "Milligrams vs Powder Volume: Vial Guide",
  "nad-research-compound-documentation-guide": "NAD+: COA & Research Guide",
  "peptide-shipping-warm-conditions": "Lyophilized Peptide Shipping: Research Guide",
  "research-peptides-us-sourcing-guide-2026": "Research Peptides in the US: Sourcing Guide",
  "semaglutide-peptide-research-documentation-guide": "Semaglutide: COA & Research Guide",
  "ss-31-peptide-research-documentation-guide": "SS-31: COA & Research Guide",
  "ss-31-vs-mots-c-research-documentation": "SS-31 vs MOTS-C: Documentation Differences",
  "tb-500-peptide-research-documentation-guide": "TB-500: COA & Research Guide",
  "tirzepatide-peptide-research-documentation-guide": "Tirzepatide: COA & Research Guide",
  "whats-inside-a-lyophilized-peptide-vial": "Inside a Lyophilized Peptide Vial",
  "where-to-buy-research-peptides-with-coa": "Where to Buy Research Peptides With a COA",
  "white-label-peptide-dropshipping-done-right": "Research Peptide Dropshipping: Evaluation Guide",
  "why-endotoxin-testing-matters": "Endotoxin Testing: Research Documentation Guide",
  "why-wholesale-partners-choose-batch-verified-supply": "Wholesale Peptides: Batch Documentation Guide",
  "wolverine-blend-vs-standalone-bpc-157-tb-500": "WOLVERINE vs BPC-157 and TB-500: Documentation",
  "wolverine-peptide-blend-research-guide": "WOLVERINE Blend: COA & Research Guide",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);
  if (!article) return {};
  const url = `${SITE_URL}/journal/${article.slug}`;
  return {
    title: SEO_TITLES[article.slug] ?? article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedDate,
      images: [{ url: `${SITE_URL}${article.image}`, width: 1200, height: 675, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [`${SITE_URL}${article.image}`],
    },
  };
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);
  if (!article) notFound();

  const more = getJournalArticles().filter((a) => a.slug !== slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [`${SITE_URL}${article.image}`],
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    author: { "@type": "Organization", name: "EVLV" },
    publisher: {
      "@type": "Organization",
      name: "EVLV",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo/evlv-logo-light.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/journal/${article.slug}` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/journal/${article.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-[900px] px-4 pt-6 md:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-charcoal/50">
          <Link href="/" className="transition hover:text-charcoal">
            Home
          </Link>
          <i className="ri-arrow-right-s-line" />
          <Link href="/journal" className="transition hover:text-charcoal">
            Journal
          </Link>
          <i className="ri-arrow-right-s-line" />
          <span className="font-medium text-charcoal">{article.title}</span>
        </nav>
      </div>

      <article className="mx-auto max-w-[760px] px-4 py-10 md:px-8 md:py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">{article.label}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal md:text-5xl">{article.title}</h1>
        <div className="mt-4 flex items-center gap-3 text-xs text-charcoal/50">
          <time dateTime={article.publishedDate}>
            {new Date(article.publishedDate).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <span>&middot;</span>
          <span>{article.readTime}</span>
        </div>

        <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-sage-mist">
          <Image src={article.image} alt={article.title} width={1200} height={675} className="h-full w-full object-cover" priority />
        </div>

        {article.relatedLinks && article.relatedLinks.length > 0 && (
          <aside className="mt-8 rounded-xl border border-stone bg-ivory-soft p-5" aria-label="Related research paths">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Related research paths</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {article.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-lg border border-stone bg-white p-4 transition hover:border-sage-deep/40">
                  <strong className="text-sm text-charcoal">{link.label}</strong>
                  <span className="mt-1 block text-xs leading-5 text-soft-gray">{link.description}</span>
                </Link>
              ))}
            </div>
          </aside>
        )}

        <div className="mt-10 space-y-6 text-base leading-relaxed text-charcoal/80 md:text-lg">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {article.cta && (
          <Link
            href={article.cta.href}
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-copper px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-copper-light"
          >
            {article.cta.label} <i className="ri-arrow-right-line" />
          </Link>
        )}

        <div className="mt-12 rounded-lg border border-stone bg-ivory-soft p-5 text-xs leading-relaxed text-charcoal/50">
          For research use only. Nothing in this article is dosing, medical or veterinary guidance.
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-stone bg-ivory-soft py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="mb-8 font-display text-2xl font-semibold text-charcoal md:text-3xl">More from the Journal</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {more.map((a) => (
                <Link key={a.slug} href={`/journal/${a.slug}`} className="group flex items-center gap-5 rounded-lg bg-ivory p-4">
                  <div className="h-20 w-28 shrink-0 overflow-hidden rounded-md bg-sage-mist">
                    <Image src={a.image} alt={a.title} width={280} height={200} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-copper">{a.label}</p>
                    <p className="mt-1 font-display text-base font-medium text-charcoal">{a.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
