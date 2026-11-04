import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageShell from '@/components/feature/PageShell';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';
import ProductCard from '@/pages/shop/components/ProductCard';
import VialGallery from '@/pages/shop/detail/components/VialGallery';
import SizeSwitcher from '@/pages/shop/detail/components/SizeSwitcher';
import IncludedCards from '@/pages/shop/detail/components/IncludedCards';
import ProductFaq from '@/pages/shop/detail/components/ProductFaq';
import { shopCategories, shopDetailBlocks, shopDispatchNotes, shopProducts } from '@/mocks/shop';

export default function ShopProductDetail() {
  const { slug } = useParams();
  const [galleryView, setGalleryView] = useState<'photo' | 'label' | 'spec'>('photo');
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const product = shopProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <PageShell>
        <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 md:px-8 lg:px-12 py-24 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">That vial is no longer listed.</h1>
          <p className="mt-3 text-foreground-600">It may have sold out or been renamed.</p>
          <Link
            to="/shop"
            className="inline-block mt-7 whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
          >
            Back to the catalogue
          </Link>
        </section>
      </PageShell>
    );
  }

  const category = shopCategories.find((c) => c.slug === product.category);
  const categoryLabel = category?.label ?? 'Research';
  const related = shopProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  const strengths = shopProducts
    .filter((p) => p.name === product.name)
    .slice()
    .sort((a, b) => a.price - b.price);

  const facts = [
    { label: 'Compound', value: product.name },
    { label: 'Quantity', value: `${product.size} per vial` },
    { label: 'Format', value: 'Lyophilised powder' },
    { label: 'Purity', value: product.purity || 'Report on request' },
    { label: 'Reports', value: product.coa ? 'COA held; endotoxin on request' : 'On request' },
    { label: 'Dispatch', value: 'Within 1 business day' },
  ];

  return (
    <PageShell>
      <div className="fixed inset-x-3 bottom-3 z-40 lg:hidden">
        <div className="flex items-center gap-3 rounded-full border border-primary-800/15 bg-background-50/95 px-3 py-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10.5px] leading-tight text-foreground-500">
              {product.name} · {product.size}
            </p>
            <p className="font-heading text-[15px] font-semibold leading-tight text-foreground-950">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <Link
            to={`/contact?intent=buy&product=${product.slug}`}
            className="whitespace-nowrap rounded-full bg-primary-500 px-5 py-2.5 text-[12.5px] font-semibold text-secondary-950 cursor-pointer"
          >
            Buy this vial
          </Link>
        </div>
      </div>

      <section className="atmo-cream pt-8 md:pt-10 pb-14 md:pb-20">
        <Container>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-foreground-500">
            <Link to="/" className="hover:text-foreground-800 cursor-pointer">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground-800 cursor-pointer">
              Shop
            </Link>
            <span>/</span>
            <Link
              to={`/shop?category=${product.category}`}
              className="hover:text-foreground-800 cursor-pointer"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-foreground-800">
              {product.name} {product.size}
            </span>
          </nav>

          <div className="mt-5 md:mt-7 grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-6 md:gap-8 lg:gap-10 items-start">
            <Reveal>
              <div ref={galleryRef} className="lg:sticky lg:top-28">
                <VialGallery
                  product={product}
                  categoryLabel={categoryLabel}
                  view={galleryView}
                  onViewChange={setGalleryView}
                />

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { icon: 'ri-truck-line', label: 'Tracked AU post' },
                    { icon: 'ri-lock-line', label: 'Discreet parcel' },
                    { icon: 'ri-refresh-line', label: 'COA & endotoxin' },
                  ].map((t) => (
                    <div
                      key={t.label}
                      className="glass-card rounded-[18px] px-3 py-3 text-center"
                    >
                      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full glass-inner text-primary-700">
                        <i className={t.icon} />
                      </span>
                      <p className="mt-2 text-[10.5px] leading-tight text-foreground-600">{t.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary-800/12 bg-background-50/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-primary-700">
                    {categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-900/25 bg-background-50/70 px-2.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-primary-900">
                    <i className="ri-shield-check-line text-[11px]" />
                    RX Only
                  </span>
                </div>

                <h1 className="t-display mt-4">{product.name}</h1>
                <p className="mt-2 text-sm text-foreground-500">
                  {product.size} vial &middot; Lyophilised research compound
                </p>

                <SizeSwitcher variants={strengths} activeSlug={product.slug} />

                <p className="mt-4 text-base leading-relaxed text-foreground-700">{product.summary}</p>

                <div className="mt-6 glass-card rounded-[22px] px-5 py-4 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-500">Price per vial</p>
                    <p className="mt-1 leading-none">
                      <span className="font-heading text-3xl font-semibold text-foreground-950">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-2 text-xs text-foreground-500">AUD, delivery included</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <p className="inline-flex items-center gap-1.5 rounded-full bg-background-50/80 border border-primary-800/12 px-3 py-1.5 text-[11.5px] text-foreground-700">
                      <i className="ri-truck-line text-primary-600" />
                      Free discreet delivery
                    </p>
                    <p className="inline-flex items-center gap-1.5 rounded-full bg-background-50/80 border border-primary-800/12 px-3 py-1.5 text-[11.5px] text-foreground-700">
                      <i className={product.purity ? 'ri-checkbox-circle-fill text-primary-600' : 'ri-flask-line text-foreground-500'} />
                      {product.purity ? `Purity ${product.purity}` : 'COA on request'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    to={`/contact?intent=buy&product=${product.slug}`}
                    className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3.5 text-sm font-semibold cursor-pointer hover:bg-primary-400 transition-colors"
                  >
                    Buy this vial
                    <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setGalleryView('spec');
                      galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-800/25 bg-background-50/60 px-6 py-3.5 text-sm font-medium text-primary-800 cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
                  >
                    <i className="ri-file-text-line" />
                    Show COA &amp; Endotoxin Report
                  </button>
                </div>

                <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0 rounded-[22px] border border-primary-800/12 bg-background-50/55 px-5 py-2">
                  {facts.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center justify-between gap-3 py-2.5 border-b border-primary-800/8 last:border-b-0"
                    >
                      <dt className="text-[12px] text-foreground-500">{f.label}</dt>
                      <dd className="text-[12.5px] font-medium text-foreground-900 text-right">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-4 flex items-start gap-2 text-[11.5px] leading-relaxed text-foreground-500">
                  <i className="ri-error-warning-line mt-0.5 text-accent-700" />
                  Supplied for laboratory and analytical research only. Not a medicine, and not for human or
                  veterinary use.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="band-soft panel-section py-10 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {shopDetailBlocks.map((block, i) => (
              <Reveal key={block.key} delay={i * 60}>
                <div className="glass-card rounded-[24px] p-6 h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full glass-inner text-lg text-primary-700">
                    <i className={block.icon} />
                  </span>
                  <h2 className="font-heading text-xl font-semibold mt-4">{block.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {block.items.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-foreground-700">
                        <i className="ri-check-line mt-0.5 text-primary-600" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 md:mt-8 atmo-dark panel-section rounded-[26px] p-6 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="eyebrow text-primary-300">Dispatch</p>
              <h2 className="font-heading text-xl md:text-2xl font-semibold mt-2 text-background-50">
                Sent the same working day the order is confirmed.
              </h2>
              <ul className="mt-4 space-y-2">
                {shopDispatchNotes.map((n) => (
                  <li key={n} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-background-300">
                    <i className="ri-arrow-right-s-line mt-0.5 text-primary-300" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to={`/contact?intent=buy&product=${product.slug}`}
              className="whitespace-nowrap shrink-0 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-secondary-950 cursor-pointer hover:bg-primary-400"
            >
              Order {product.name} {product.size}
            </Link>
          </div>
        </Container>
      </section>

      <IncludedCards />

      <ProductFaq />

      {related.length > 0 && (
        <section className="band-soft panel-section py-10 md:py-20">
          <Container>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="t-section">Also in {categoryLabel}</h2>
                <p className="mt-2 text-sm text-foreground-600 max-w-xl leading-relaxed">
                  The same documentation standard, on the vials that sit closest to this one.
                </p>
              </div>
              <Link
                to={`/shop?category=${product.category}`}
                className="text-sm text-primary-700 underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                See the full range
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} categoryLabel={categoryLabel} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <div className="h-16 lg:hidden" aria-hidden="true" />
    </PageShell>
  );
}