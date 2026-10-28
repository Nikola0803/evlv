import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getCatalogProducts } from "@/lib/catalog";
import { getCoaMap } from "@/lib/coa-data";
import { getShopListProducts } from "@/lib/products";
import { COMPOUND_HUB_LIST, type CompoundHubDefinition } from "@/lib/compound-hubs";

const SITE_URL = "https://www.evlvpeptides.com";

function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export async function CompoundHubPage({ hub }: { hub: CompoundHubDefinition }) {
  const [catalog, coaMap] = await Promise.all([getCatalogProducts(), getCoaMap()]);
  const products = getShopListProducts(catalog).filter((product) => hub.slugs.includes(product.slug));
  const pageUrl = `${SITE_URL}${hub.path}`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    url: pageUrl,
    name: hub.title,
    description: hub.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@type": "Thing", name: hub.shortName, description: hub.classification },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}/shop/${product.slug}`,
      })),
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Research Peptides", item: `${SITE_URL}/research-peptides` },
      { "@type": "ListItem", position: 3, name: hub.shortName, item: pageUrl },
    ],
  };

  return (
    <div className="bg-white text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-white md:-mt-[100px] md:pb-28 md:pt-[175px]">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs text-white/45" aria-label="Breadcrumb">
            <Link href="/">Home</Link><i className="ri-arrow-right-s-line" />
            <Link href="/research-peptides">Research peptides</Link><i className="ri-arrow-right-s-line" />
            <span className="text-white/75">{hub.shortName}</span>
          </nav>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">{hub.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.08] md:text-6xl">{hub.title}</h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/50">{hub.classification}</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">{hub.overview}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#products" className="rounded-md bg-copper px-7 py-3 text-xs font-semibold uppercase tracking-wide text-charcoal">View available strengths</Link>
            <Link href="/coas" className="rounded-md border border-white/25 px-7 py-3 text-xs font-semibold uppercase tracking-wide text-white">Search exact COAs</Link>
          </div>
          <p className="mt-6 text-xs font-medium text-white/45">Research use only. Not for human or veterinary use.</p>
        </div>
      </section>

      <section className="border-b border-stone bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-5 px-4 md:grid-cols-2 md:px-8">
          <article className="rounded-xl border border-stone bg-white p-7 md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">01 / Identity</p>
            <h2 className="mt-3 font-display text-2xl font-semibold">Know what the listing identifies</h2>
            <p className="mt-4 leading-7 text-soft-gray">{hub.identityContext}</p>
          </article>
          <article className="rounded-xl border border-stone bg-white p-7 md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">02 / Verification</p>
            <h2 className="mt-3 font-display text-2xl font-semibold">Read the analytical record</h2>
            <p className="mt-4 leading-7 text-soft-gray">{hub.analyticalFocus}</p>
          </article>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Current EVLV catalogue</p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{hub.shortName} products</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-soft-gray">Each strength keeps its own stock, price, measured-content fields, and exact-documentation status.</p>
        </header>
        {products.length > 0 ? (
          <div className="cp-product-grid">{products.map((product) => <ProductCard key={product.id} product={product} coaVerified={Boolean(coaMap[product.slug])} />)}</div>
        ) : (
          <p className="rounded-lg border border-stone bg-ivory-soft p-8 text-soft-gray">No active products from this research group are currently listed.</p>
        )}
      </section>

      <section className="border-y border-stone bg-charcoal py-16 text-white md:py-24">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Research Center</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold md:text-4xl">Read the evidence before the product claims.</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {hub.journalLinks.map((article) => (
              <Link key={article.href} href={article.href} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-copper/50 hover:bg-white/[0.07]">
                <h3 className="font-display text-xl font-semibold">{article.label}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{article.description}</p>
                <span className="mt-5 inline-flex text-xs font-semibold uppercase tracking-wide text-copper">Read guide <i className="ri-arrow-right-line ml-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-12 px-4 py-16 md:grid-cols-[1fr_0.55fr] md:px-8 md:py-24">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Compound FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Questions laboratories ask</h2>
          <div className="mt-8 space-y-4">
            {hub.faq.map((item) => (
              <details key={item.question} className="rounded-lg border border-stone bg-white p-5">
                <summary className="cursor-pointer list-none pr-6 font-semibold">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-soft-gray">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-xl bg-ivory-soft p-7 md:sticky md:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Continue exploring</p>
          <div className="mt-5 space-y-3">
            {hub.categoryPaths.map((path) => <Link key={path} href={path} className="block font-semibold text-sage-deep underline decoration-sage-deep/25 underline-offset-4">View the related research category</Link>)}
            <Link href="/sourcing" className="block font-semibold text-sage-deep underline decoration-sage-deep/25 underline-offset-4">Testing and sourcing standards</Link>
            <Link href="/coas" className="block font-semibold text-sage-deep underline decoration-sage-deep/25 underline-offset-4">Search the COA library</Link>
          </div>
          <p className="mt-7 border-t border-stone pt-6 text-sm leading-6 text-soft-gray">Results belong to the identified product and lot. They should not be generalized to another strength, batch, or supplier.</p>
        </aside>
      </section>

      <section className="border-t border-stone bg-ivory-soft py-14">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Other compound hubs</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {COMPOUND_HUB_LIST.filter((item) => item.path !== hub.path).map((item) => <Link key={item.path} href={item.path} className="rounded-full border border-stone bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-sage-deep hover:text-sage-deep">{item.shortName}</Link>)}
          </div>
        </div>
      </section>
    </div>
  );
}
