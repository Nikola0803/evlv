import { Link, useSearchParams } from 'react-router-dom';
import PageShell from '@/components/feature/PageShell';
import PageIntro from '@/components/feature/PageIntro';
import Reveal from '@/components/base/Reveal';
import { careCategories, treatmentDetails } from '@/mocks/catalog';

export default function Treatments() {
  const [params, setParams] = useSearchParams();
  const active = params.get('category');
  const activeCategory = careCategories.find((c) => c.slug === active);
  const list = active ? treatmentDetails.filter((t) => t.category === active) : treatmentDetails;

  return (
    <PageShell>
      <PageIntro
        eyebrow="Treatments"
        title={
          <>
            Care that starts with
            <br />
            a real conversation.
          </>
        }
        text="Every EVLV treatment begins with a free assessment reviewed by a Wellness Optimisation Expert. Choose a starting point below — your Wellness Optimisation Expert decides what is actually appropriate for you. That includes our RX peptides, which are prescribed and dispensed like any other treatment here."
      >
        <Link
          to="/contact"
          className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
        >
          Book a consult
        </Link>
        <Link
          to="/faq"
          className="whitespace-nowrap rounded-full border border-primary-500 text-primary-700 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-primary-50"
        >
          Read the FAQs
        </Link>
      </PageIntro>

      <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 md:px-8 lg:px-12 pb-16 md:pb-24">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setParams({})}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-colors ${
              active
                ? 'border-primary-800/15 text-foreground-700 hover:bg-background-100'
                : 'bg-secondary-900 text-background-50 border-secondary-900'
            }`}
          >
            All treatments
          </button>
          {careCategories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setParams({ category: c.slug })}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-colors ${
                active === c.slug
                  ? 'bg-secondary-900 text-background-50 border-secondary-900'
                  : 'border-primary-800/15 text-foreground-700 hover:bg-background-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {activeCategory && (
          <p className="mt-5 text-sm text-foreground-600 max-w-2xl leading-relaxed">{activeCategory.blurb}</p>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {list.map((t, i) => (
            <Reveal key={t.slug} delay={i * 60}>
              <Link
                to={`/treatments/${t.slug}`}
                className="group flex flex-col h-full glass-card glass-lift rounded-[26px] p-2.5 pb-5 cursor-pointer"
              >
                <div className="product-frame-light w-full h-[190px] rounded-[20px] sm:h-[210px]">
                  <img
                    src={t.image}
                    alt={`${t.name} ${t.generic} treatment`}
                    className="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="px-3 pt-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-primary-700">
                      {careCategories.find((c) => c.slug === t.category)?.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-foreground-500">{t.generic}</span>
                  </div>
                  <h2 className="font-heading text-xl font-semibold mt-1.5 sm:text-2xl">{t.name}</h2>
                  <p className="text-sm text-foreground-600 mt-1.5 leading-relaxed flex-1">{t.tagline}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <p className="text-sm text-foreground-700">
                      <span className="font-heading text-xl font-semibold text-foreground-950">{t.price}</span>
                      <span className="text-foreground-500">{t.cents}</span>
                      <span className="text-foreground-500"> {t.cadence}</span>
                    </p>
                    <span className="w-9 h-9 rounded-full glass-inner flex items-center justify-center text-foreground-800 transition-transform group-hover:translate-x-1">
                      <i className="ri-arrow-right-up-line" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 glass-gold rounded-[28px] p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-accent-950">
              Not sure which one is right?
            </h2>
            <p className="mt-2 text-sm text-accent-950/80 max-w-xl leading-relaxed">
              That is what the assessment is for. Describe what is going on and a Wellness Optimisation Expert will
              recommend a path — including no treatment at all, if that is the honest answer.
            </p>
          </div>
          <Link
            to="/contact"
            className="whitespace-nowrap shrink-0 rounded-full bg-secondary-950 text-background-50 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-secondary-800"
          >
            Start your free assessment
          </Link>
        </div>
      </section>
    </PageShell>
  );
}