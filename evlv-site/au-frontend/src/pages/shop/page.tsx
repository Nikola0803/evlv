import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageShell from '@/components/feature/PageShell';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';
import ProductCard from '@/pages/shop/components/ProductCard';
import ShopToolbar from '@/pages/shop/components/ShopToolbar';
import { shopCategories, shopProducts } from '@/mocks/shop';

const standards = [
  {
    icon: 'ri-file-shield-2-line',
    title: 'Batch documentation',
    text: 'Purity figures shown on each card come from the supplier report for that specific lot. If a lot has no report, the card says so plainly.',
  },
  {
    icon: 'ri-truck-line',
    title: 'Australian dispatch',
    text: 'Tracked delivery from within Australia, sent in unbranded packaging with signature on arrival.',
  },
  {
    icon: 'ri-customer-service-2-line',
    title: 'Reviewed before release',
    text: 'Orders are checked by our care team before they leave. If something looks off, you get a call, not a silent dispatch.',
  },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? 'all';
  const setCategory = (slug: string) => {
    setParams(slug === 'all' ? {} : { category: slug });
  };
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  const labelFor = (slug: string) => shopCategories.find((c) => c.slug === slug)?.label ?? 'Research';

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = shopProducts.filter((p) => (category === 'all' ? true : p.category === category));
    if (q) {
      items = items.filter((p) =>
        `${p.name} ${p.size} ${labelFor(p.category)}`.toLowerCase().includes(q),
      );
    }
    const sorted = [...items];
    if (sort === 'az') {
      sorted.sort((a, b) => a.name.localeCompare(b.name) || a.price - b.price);
    } else if (sort === 'low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [category, query, sort]);

  return (
    <PageShell>
      <section className="atmo-dark panel-section py-14 md:py-20">
        <Container>
          <Reveal>
            <div className="w-full max-w-3xl">
              <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-primary-200/25 bg-primary-200/10 px-3 py-1.5 text-primary-200">
                Research catalogue
              </p>
              <h1 className="t-display mt-5 text-background-50">
                Every vial, held to
                <br />
                one standard.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-background-300 md:text-lg">
                Lyophilised research peptides with the labelled quantity and purity figure printed on the card, not
                buried in a PDF. Prices are in AUD and include tracked Australian delivery.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#catalogue"
                  className="whitespace-nowrap rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-secondary-950 cursor-pointer hover:bg-primary-400"
                >
                  Browse the catalogue
                </a>
                <Link
                  to="/treatments?category=peptides"
                  className="whitespace-nowrap rounded-full border border-primary-200/30 px-6 py-3 text-sm font-medium text-background-100 cursor-pointer hover:bg-primary-200/10"
                >
                  Prescribed RX peptides
                </Link>
              </div>
              <p className="mt-4 max-w-xl text-[12.5px] leading-relaxed text-background-400">
                Looking for RX peptides rather than research vials? Those are prescribed by a licensed provider —
                start with an assessment instead of the catalogue.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-background-400">
                <span className="inline-flex items-center gap-1.5">
                  <i className="ri-shield-check-line text-primary-300" />
                  24 products in stock
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <i className="ri-flask-line text-primary-300" />
                  Research use only
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <i className="ri-lock-line text-primary-300" />
                  Secure checkout
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="catalogue" className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <ShopToolbar
          categories={shopCategories}
          active={category}
          onCategory={setCategory}
          query={query}
          onQuery={setQuery}
          sort={sort}
          onSort={setSort}
          count={list.length}
          total={shopProducts.length}
        />

        {list.length > 0 ? (
          <div
            data-product-shop
            className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          >
            {list.map((p, i) => (
              <ProductCard key={p.slug} product={p} categoryLabel={labelFor(p.category)} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-10 glass-card rounded-[26px] px-6 py-14 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full glass-inner text-xl text-primary-700">
              <i className="ri-search-line" />
            </span>
            <h2 className="font-heading text-xl font-semibold mt-4">Nothing matches that search.</h2>
            <p className="mt-2 text-sm text-foreground-600">
              Try a shorter term, or clear the filters to see the full catalogue.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
              className="mt-5 whitespace-nowrap rounded-full border border-primary-500 px-5 py-2.5 text-sm font-medium text-primary-700 cursor-pointer hover:bg-primary-50"
            >
              Reset filters
            </button>
          </div>
        )}

        <p className="mt-8 text-[11px] leading-relaxed text-foreground-500 max-w-3xl">
          All products listed are supplied strictly for laboratory and analytical research. They are not medicines and
          are not intended for human or veterinary use. Purity figures reflect the supplier certificate for that lot.
        </p>
      </section>

      <section className="atmo-cream panel-section py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <div>
                <h2 className="t-section">What sits behind each card.</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground-600 md:text-base">
                  Every listing shows the compound, the labelled quantity, the reported purity where one exists, and
                  the price you actually pay. No separate freight surprise at checkout.
                </p>
                <Link
                  to="/faq"
                  className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-primary-800/25 px-5 py-2.5 text-sm font-medium text-primary-800 cursor-pointer hover:bg-background-100"
                >
                  Read the FAQs
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {standards.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="glass-card rounded-[22px] h-full p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full glass-inner text-primary-700">
                      <i className={s.icon} />
                    </span>
                    <h3 className="font-heading text-base font-semibold mt-3.5">{s.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-foreground-600">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 py-14 md:py-20">
        <div className="glass-gold rounded-[28px] p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-accent-950">
              Know the vial. Skip the guesswork.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-accent-950/80">
              Tell us the compound and quantity you are after and our team confirms availability, pricing and dispatch
              before anything is sent.
            </p>
          </div>
          <Link
            to="/contact?intent=buy"
            className="whitespace-nowrap shrink-0 rounded-full bg-secondary-950 px-6 py-3 text-sm font-semibold text-background-50 cursor-pointer hover:bg-secondary-800"
          >
            Start an order
          </Link>
        </div>
      </section>
    </PageShell>
  );
}