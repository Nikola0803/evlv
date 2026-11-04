import { Link, useParams } from 'react-router-dom';
import PageShell from '@/components/feature/PageShell';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';
import { careCategories, treatmentDetails } from '@/mocks/catalog';

export default function TreatmentDetail() {
  const { slug } = useParams();
  const item = treatmentDetails.find((t) => t.slug === slug);

  if (!item) {
    return (
      <PageShell>
        <section className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 py-24 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">We could not find that treatment.</h1>
          <p className="mt-3 text-foreground-600">It may have been renamed or moved.</p>
          <Link
            to="/treatments"
            className="inline-block mt-7 whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
          >
            Browse all treatments
          </Link>
        </section>
      </PageShell>
    );
  }

  const category = careCategories.find((c) => c.slug === item.category);
  const related = treatmentDetails.filter((t) => t.slug !== item.slug && t.category === item.category).slice(0, 3);

  return (
    <PageShell>
      <section className="atmo-cream pt-8 md:pt-10 pb-16 md:pb-20">
        <Container>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-foreground-500">
          <Link to="/" className="hover:text-foreground-800 cursor-pointer">
            Home
          </Link>
          <span>/</span>
          <Link to="/treatments" className="hover:text-foreground-800 cursor-pointer">
            Treatments
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link to={`/treatments?category=${category.slug}`} className="hover:text-foreground-800 cursor-pointer">
                {category.label}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-foreground-800">{item.name}</span>
        </nav>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28 rounded-[30px] overflow-hidden product-frame-light h-[320px] md:h-[460px]">
              <img
                src={item.image}
                alt={`${item.name} ${item.generic}`}
              />
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-primary-700 bg-background-50/70 border border-primary-800/12 rounded-full px-3 py-1.5">
                {category?.label}
              </span>
              <h1 className="t-display mt-4">
                {item.name}
              </h1>
              <p className="mt-1 text-sm text-foreground-500">{item.generic}</p>
              <p className="mt-4 text-lg text-foreground-800 font-medium leading-snug">{item.tagline}</p>
              <p className="mt-4 text-foreground-600 leading-relaxed">{item.summary}</p>

              <div className="mt-6 glass-card rounded-[22px] px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-500">Price</p>
                  <p className="mt-1">
                    <span className="font-heading text-2xl font-semibold">{item.price}</span>
                    <span className="text-foreground-600">{item.cents}</span>
                    <span className="text-sm text-foreground-500"> {item.cadence}</span>
                  </p>
                </div>
                <p className="inline-flex items-center gap-1.5 rounded-full border border-primary-800/12 bg-background-50/70 px-3 py-1.5 text-[11.5px] text-foreground-700">
                  <i className="ri-truck-line text-primary-600" />
                  Delivery included
                </p>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to={`/contact?treatment=${item.slug}&intent=buy`}
                  className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3.5 text-sm font-semibold cursor-pointer hover:bg-primary-400 transition-colors"
                >
                  Buy now
                  <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/quiz"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary-800/25 bg-background-50/60 text-primary-800 px-6 py-3.5 text-sm font-medium cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <i className="ri-compass-3-line" />
                  Not sure? Take the quiz
                </Link>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-[20px] border border-primary-800/12 bg-background-50/55 px-4 py-3.5">
                <span className="w-8 h-8 shrink-0 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center text-base">
                  <i className="ri-shield-check-line" />
                </span>
                <p className="text-[12px] leading-relaxed text-foreground-600">
                  <strong className="font-semibold text-foreground-900">Reviewed by a real person.</strong> Our
                  wellness optimisation specialists review every form. If anything you have told us needs clarifying,
                  they will give you a call on the number you provide, usually within one business day. You are not
                  charged until a licensed provider confirms your treatment.
                </p>
              </div>

              <ul className="mt-7 space-y-2.5">
                {item.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-foreground-700">
                    <i className="ri-checkbox-circle-fill text-primary-600 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        </Container>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-[26px] p-6 md:p-8">
          <h2 className="font-heading text-2xl font-semibold">What is included</h2>
          <ul className="mt-5 space-y-3">
            {item.included.map((x) => (
              <li key={x} className="flex items-start gap-3 text-sm text-foreground-700 leading-relaxed">
                <span className="w-6 h-6 shrink-0 rounded-full glass-inner flex items-center justify-center text-[11px] text-primary-700">
                  <i className="ri-check-line" />
                </span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 pt-6 border-t border-primary-800/12">
            <h3 className="font-heading text-lg font-semibold">Who it is for</h3>
            <p className="mt-2 text-sm text-foreground-600 leading-relaxed">{item.goodFor}</p>
          </div>
        </div>

        <div className="atmo-purple text-background-50 rounded-[26px] p-6 md:p-8">
          <h2 className="font-heading text-2xl font-semibold">The details</h2>
          <dl className="mt-5 divide-y divide-primary-200/15">
            {item.facts.map((f) => (
              <div key={f.label} className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-sm text-background-300">{f.label}</dt>
                <dd className="text-sm font-medium text-background-50 text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[11px] leading-relaxed text-background-400">
            <strong className="text-background-200">Important:</strong> EVLV does not sell medication directly. A
            licensed Australian provider reviews every assessment and decides whether a prescription is appropriate.
            EVLV is a wellness optimisation service operated by tagadaRX.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 pb-20">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold">Also in {category?.label}</h2>
            <Link to="/treatments" className="text-sm text-primary-700 underline cursor-pointer whitespace-nowrap">
              See all treatments
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/treatments/${r.slug}`}
                className="group glass-card glass-lift rounded-[24px] p-2.5 pb-4 cursor-pointer"
              >
                <div className="product-frame-light w-full h-[160px] rounded-[18px]">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="px-2 pt-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{r.name}</h3>
                    <p className="text-xs text-foreground-500">{r.generic}</p>
                  </div>
                  <span className="text-sm text-foreground-700 whitespace-nowrap">
                    {r.price}
                    {r.cents}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}