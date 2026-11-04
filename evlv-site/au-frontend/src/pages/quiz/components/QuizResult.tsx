import { Link } from 'react-router-dom';
import { treatmentDetails } from '@/mocks/catalog';
import type { Recommendation } from '@/pages/quiz/lib/quiz';

type Props = {
  rec: Recommendation;
  secondary: Recommendation[];
  onRetake: () => void;
};

const nextSteps = [
  'Submit your intake — it takes about two minutes.',
  'An expert reviews it and confirms (or adjusts) the protocol.',
  'Your medication is dispensed and delivered discreetly, if you are approved.',
];

function imageFor(href: string) {
  const slug = href.split('/').filter(Boolean).pop() || '';
  return treatmentDetails.find((item) => item.slug === slug);
}

export default function QuizResult({ rec, secondary, onRetake }: Props) {
  const product = imageFor(rec.href);

  return (
    <div className="w-full max-w-[900px] mx-auto">
      <p className="eyebrow text-primary-700">Your starting point</p>
      <h1 className="mt-3 font-heading font-semibold leading-[1.1] tracking-[-0.03em] text-[clamp(1.65rem,3.3vw,2.6rem)]">
        Here&apos;s a good place to start based on what you&apos;ve shared.
      </h1>
      <p className="mt-3 text-[13.5px] md:text-base text-foreground-600 leading-relaxed max-w-2xl">
        Your answers point to one protocol first. Nothing is prescribed until a Wellness Optimisation Expert has read
        your intake and confirmed it is appropriate for you.
      </p>

      <div className="mt-6 md:mt-9 glass-card rounded-[24px] md:rounded-[30px] p-3 md:p-4">
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
          <div className="relative w-full sm:w-[250px] shrink-0 rounded-[22px] overflow-hidden product-frame-light aspect-[4/3] sm:aspect-[4/5]">
            {product && (
              <img
                src={product.image}
                alt={`${product.name} ${product.generic}`}
                title={`${product.name} ${product.generic} — EVLV`}
                className="w-full h-full object-cover object-center"
              />
            )}
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background-50/92 border border-primary-800/12 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-primary-800">
              <i className="ri-sparkling-2-line" />
              Best match
            </span>
          </div>

          <div className="flex-1 min-w-0 p-2 sm:p-3 pb-4">
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-primary-700">{rec.tier}</p>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h2 className="font-heading text-2xl md:text-[1.75rem] font-semibold leading-tight">{rec.name}</h2>
              <span className="whitespace-nowrap text-sm font-medium text-foreground-700">{rec.price}</span>
            </div>
            <p className="mt-2.5 text-sm text-foreground-600 leading-relaxed">{rec.summary}</p>

            <ul className="mt-4 space-y-2">
              {rec.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2.5 text-[13px] text-foreground-700 leading-relaxed">
                  <i className="ri-check-line text-primary-600 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
              <Link
                to={rec.href}
                className="whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
              >
                Get started <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/contact"
                className="whitespace-nowrap inline-flex items-center justify-center rounded-full border border-primary-800/25 px-6 py-3 text-sm font-medium text-primary-800 cursor-pointer hover:border-primary-500 hover:bg-primary-50"
              >
                Talk it through first
              </Link>
            </div>
          </div>
        </div>
      </div>

      {secondary.length > 0 && (
        <div className="mt-4 space-y-3">
          {secondary.map((item) => {
            const itemProduct = imageFor(item.href);
            return (
              <Link
                key={item.key}
                to={item.href}
                className="glass-card glass-lift rounded-[24px] p-3 flex items-center gap-4 cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-[16px] overflow-hidden product-frame-light">
                  {itemProduct && (
                    <img
                      src={itemProduct.image}
                      alt={`${itemProduct.name} ${itemProduct.generic}`}
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-primary-700">{item.tier}</p>
                  <h3 className="font-heading text-base md:text-lg font-semibold mt-1 leading-tight">{item.name}</h3>
                  <p className="mt-1 text-xs text-foreground-600 leading-relaxed line-clamp-2">{item.summary}</p>
                </div>
                <i className="ri-arrow-right-up-line text-primary-700 shrink-0" />
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-8 rounded-[24px] border border-foreground-950/10 bg-background-50/70 p-5 md:p-6">
        <h2 className="font-heading text-base font-semibold">What happens next</h2>
        <ol className="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-3">
          {nextSteps.map((s, i) => (
            <li key={s} className="flex items-start gap-2.5 text-[12.5px] text-foreground-600 leading-relaxed">
              <span className="w-5 h-5 shrink-0 rounded-full bg-primary-500 text-secondary-950 flex items-center justify-center text-[10.5px] font-semibold">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center gap-1.5 text-xs text-foreground-600 underline cursor-pointer hover:text-primary-700"
        >
          <i className="ri-restart-line" /> Retake the quiz
        </button>
        <Link
          to="/treatments"
          className="text-xs text-foreground-600 underline cursor-pointer hover:text-primary-700"
        >
          Browse every formulation
        </Link>
      </div>

      <p className="mt-7 text-[11px] leading-relaxed text-foreground-500 max-w-3xl mx-auto text-center">
        This quiz is a guidance tool, not a diagnosis or a prescription. Answers are used to suggest a starting point
        only. RX peptides require an online consultation with an expert who decides whether treatment is
        appropriate. EVLV is an Australian wellness optimisation service.
      </p>
    </div>
  );
}