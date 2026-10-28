import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getCatalogProducts } from "@/lib/catalog";
import { getCoaMap } from "@/lib/coa-data";
import { getShopListProducts } from "@/lib/products";
import { RESEARCH_CATEGORY_LINKS, type ResearchCategoryDefinition } from "@/lib/research-category-pages";
import { COMPOUND_HUB_LIST } from "@/lib/compound-hubs";

const SITE_URL = "https://www.evlvpeptides.com";

function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export async function ResearchCategoryPage({ definition }: { definition: ResearchCategoryDefinition }) {
  const [catalog, coaMap] = await Promise.all([getCatalogProducts(), getCoaMap()]);
  const products = getShopListProducts(catalog).filter(definition.selector);
  const compoundHubs = COMPOUND_HUB_LIST.filter((hub) => hub.categoryPaths.includes(definition.path));
  const pageUrl = `${SITE_URL}${definition.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    url: pageUrl,
    name: definition.title,
    description: definition.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/shop/${product.slug}`,
        name: product.name,
      })),
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: definition.title, item: pageUrl },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: definition.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="bg-white text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faq) }} />

      <section className="-mt-[90px] bg-charcoal pb-14 pt-[145px] text-white md:-mt-[100px] md:pb-18 md:pt-[165px]">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">{definition.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">{definition.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">{definition.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#catalogue" className="rounded-md bg-copper px-7 py-3 text-xs font-semibold uppercase tracking-wide text-charcoal">Browse products</Link>
            <Link href="/coas" className="rounded-md border border-white/25 px-7 py-3 text-xs font-semibold uppercase tracking-wide text-white">Search COA library</Link>
          </div>
          <p className="mt-5 text-xs font-medium text-white/45">Strictly for laboratory and analytical research. Not for human or veterinary use.</p>
        </div>
      </section>

      <section id="catalogue" className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Current catalogue</p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Available research products</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-soft-gray">{products.length} current listings. Exact COA badges appear only when a matching product report is available.</p>
        </header>
        {products.length > 0 ? (
          <div className="cp-product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} coaVerified={Boolean(coaMap[product.slug])} />)}
          </div>
        ) : (
          <div className="rounded-lg border border-stone bg-ivory-soft p-8 text-soft-gray">Current inventory in this category is being updated. <Link href="/shop" className="font-semibold text-sage-deep underline">Browse the full catalogue.</Link></div>
        )}
      </section>

      {compoundHubs.length > 0 && (
        <section className="border-y border-stone bg-white py-14 md:py-20">
          <div className="mx-auto max-w-[1180px] px-4 md:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Compound research hubs</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Go deeper than a product card.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-soft-gray">Compare identities, strengths, exact-documentation requirements, and relevant laboratory guides before opening an individual listing.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {compoundHubs.map((hub) => (
                <Link key={hub.path} href={hub.path} className="rounded-xl border border-stone bg-ivory-soft p-6 transition hover:-translate-y-0.5 hover:border-sage-deep/40 hover:shadow-lg">
                  <small className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sage-deep">{hub.classification}</small>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{hub.shortName}</h3>
                  <p className="mt-3 text-sm leading-6 text-soft-gray">Identity, available strengths, analytical context, COAs, and related lab guides.</p>
                  <span className="mt-5 inline-flex text-xs font-semibold uppercase tracking-wide text-sage-deep">Open research hub <i className="ri-arrow-right-line ml-1" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-stone bg-ivory-soft py-14 md:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 md:grid-cols-[0.78fr_1.22fr] md:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Documentation first</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">{definition.scopeTitle}</h2>
          </div>
          <div>
            <p className="text-base leading-8 text-soft-gray">{definition.scope}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link href="/sourcing" className="text-sage-deep underline decoration-sage-deep/30 underline-offset-4">Testing standards</Link>
              <Link href="/research-peptides-usa" className="text-sage-deep underline decoration-sage-deep/30 underline-offset-4">U.S. sourcing guide</Link>
              <Link href="/journal" className="text-sage-deep underline decoration-sage-deep/30 underline-offset-4">Research Center</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Explore by research class</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {RESEARCH_CATEGORY_LINKS.filter((item) => item.path !== definition.path).map((item) => (
              <Link key={item.path} href={item.path} className="rounded-full border border-stone bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-sage-deep hover:text-sage-deep">{item.title}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-4 py-16 md:px-8 md:py-24">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Common questions</p>
        <h2 className="mt-3 text-center font-display text-3xl font-semibold md:text-4xl">Research catalogue FAQ</h2>
        <div className="mt-9 space-y-4">
          {definition.faq.map((item) => (
            <details key={item.question} className="rounded-lg border border-stone bg-white p-5">
              <summary className="cursor-pointer list-none pr-6 font-semibold">{item.question}</summary>
              <p className="mt-3 text-sm leading-7 text-soft-gray">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
