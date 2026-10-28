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

      <section className="mx-auto mt-4 grid min-h-[460px] w-[calc(100%-26px)] max-w-[1320px] overflow-hidden rounded-2xl border border-white/10 bg-sage-deep text-white shadow-[0_18px_48px_rgba(11,47,44,0.11)] md:mt-7 md:min-h-[520px] md:w-[calc(100%-64px)] md:grid-cols-[0.9fr_1.1fr] md:rounded-[22px]">
        <div className="flex flex-col justify-center px-6 py-12 md:px-10 md:py-16 lg:px-14 xl:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">{definition.eyebrow}</p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.04] md:text-[40px] lg:text-5xl xl:text-6xl">{definition.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/70">{definition.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#catalogue" className="rounded-md bg-white px-7 py-3 text-xs font-semibold uppercase tracking-wide text-sage-deep">Browse products</Link>
            <Link href="/coas" className="rounded-md border border-white/25 px-7 py-3 text-xs font-semibold uppercase tracking-wide text-white">Search COA library</Link>
          </div>
          <p className="mt-5 text-xs font-medium text-white/45">Strictly for laboratory and analytical research. Not for human or veterinary use.</p>
        </div>
        <div className="relative min-h-[300px] md:min-h-full" aria-hidden="true">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${definition.heroImage}')` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-sage-deep via-transparent to-transparent md:bg-gradient-to-r md:from-sage-deep md:via-sage-deep/20 md:to-transparent" />
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

      <section className="bg-white px-4 py-14 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[22px] border border-stone bg-ivory-soft shadow-[0_18px_48px_rgba(11,47,44,0.08)]">
          <div className="grid gap-10 p-7 md:grid-cols-[0.86fr_1.14fr] md:p-12 lg:p-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Documentation first</p>
              <h2 className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight md:text-4xl">{definition.scopeTitle}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-soft-gray">{definition.scope}</p>
            </div>
            <div className="grid gap-3 self-start">
              {[
                { href: "/sourcing", eyebrow: "Quality system", title: "Testing standards", copy: "How EVLV labels exact reports, methods, and product-specific documentation." },
                { href: "/research-peptides-usa", eyebrow: "Research guide", title: "U.S. sourcing guide", copy: "A practical framework for evaluating identity, traceability, and fulfillment." },
                { href: "/journal", eyebrow: "Research Center", title: "Laboratory reading library", copy: "Evidence-led articles covering purity, identity, lots, and analytical records." },
              ].map((resource) => (
                <Link key={resource.href} href={resource.href} className="group grid grid-cols-[1fr_auto] items-center gap-5 rounded-xl border border-stone bg-white p-5 transition hover:-translate-y-0.5 hover:border-sage-deep/35 hover:shadow-md">
                  <span>
                    <small className="block text-[9px] font-semibold uppercase tracking-[0.15em] text-sage-deep">{resource.eyebrow}</small>
                    <strong className="mt-1 block font-display text-xl">{resource.title}</strong>
                    <span className="mt-1 block text-xs leading-5 text-soft-gray">{resource.copy}</span>
                  </span>
                  <i className="ri-arrow-right-line text-xl text-copper transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-stone bg-white p-7 md:p-12 lg:px-16">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Explore by research class</p>
                <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">Find the right catalogue path.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-soft-gray">Browse focused collections without losing product-level documentation and availability.</p>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {RESEARCH_CATEGORY_LINKS.filter((item) => item.path !== definition.path).map((item, index) => (
                <Link key={item.path} href={item.path} className="group flex min-h-24 items-center justify-between rounded-xl border border-stone bg-ivory-soft p-5 transition hover:border-sage-deep/40 hover:bg-white hover:shadow-md">
                  <span><small className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.15em] text-copper">0{index + 1}</small><strong className="font-display text-lg leading-tight">{item.title}</strong></span>
                  <i className="ri-arrow-right-up-line ml-4 text-lg text-sage-deep transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
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
