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
  'A Wellness Optimisation Expert (MD) reviews it and confirms (or adjusts) the protocol.',
  'Your medication is dispensed and delivered discreetly, if you are approved.',
];

export default function QuizResult({ rec, secondary, onRetake }: Props) {
  const slug = rec.href.split('/').filter(Boolean).pop() || '';
  const product = treatmentDetails.find((item) => item.slug === slug);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-6 items-start">
        <div className="glass-card rounded-[30px] p-6 md:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 text-primary-800 text-[11px] font-medium px-3 py-1.5">
              <i className="ri-stethoscope-line" /> Wellness Optimisation Expert protocol
            </span>
            <span className="text-[11px] text-foreground-500">Based on your 6 answers</span>
          </div>

          <h1 className="t-section mt-5">
            Based on your profile, you are a candidate for our Wellness Optimisation Expert protocol.
          </h1>
          <p className="mt-3 text-foreground-600 leading-relaxed">
            Your answers point to one protocol first. Nothing is prescribed until a Wellness Optimisation Expert (MD) has
            read your intake and confirmed it is appropriate for you.
          </p>

          <div className="mt-7 glass-inner rounded-[24px] p-5 md:p-6">
            <p className="text-[11px] uppercase tracking-[0.14em] text-primary-700">{rec.tier}</p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
              <h2 className="font-heading text-2xl font-semibold">{rec.name}</h2>
              <span className="whitespace-nowrap text-sm font-medium text-foreground-700">{rec.price}</span>
            </div>
            <p className="mt-2.5 text-sm text-foreground-600 leading-relaxed">{rec.summary}</p>

            <ul className="mt-4 space-y-2.5">
              {rec.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2.5 text-sm text-foreground-700 leading-relaxed">
                  <i className="ri-check-line text-primary-600 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              to={rec.href}
              className="whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
            >
              View my plan <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/contact"
              className="whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-full bg-secondary-950 text-background-50 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-secondary-800"
            >
              Submit intake for medical approval
            </Link>
            <Link
              to="/treatments"
              className="whitespace-nowrap inline-flex items-center justify-center rounded-full border border-primary-500 text-primary-700 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-primary-50"
            >
              Browse all formulations
            </Link>
          </div>

          <button
            type="button"
            onClick={onRetake}
            className="mt-5 inline-flex items-center gap-1.5 text-xs text-foreground-600 underline cursor-pointer hover:text-primary-700"
          >
            <i className="ri-restart-line" /> Retake the quiz
          </button>
        </div>

        <div className="space-y-5">
          <div className="glass-card rounded-[30px] p-5">
            <div className="product-frame-light rounded-[22px] w-full aspect-[4/3]">
              {product && (
                <img
                  src={product.image}
                  alt={`${product.name} ${product.generic}`}
                  title={`${product.name} ${product.generic} — EVLV`}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <p className="mt-4 text-xs text-foreground-500 leading-relaxed">
              <i className="ri-shield-check-line text-primary-600 mr-1" />
              Reviewed by a Wellness Optimisation Expert (MD). Free, discreet delivery Australia wide.
            </p>
          </div>

          <div className="atmo-purple text-background-50 rounded-[30px] p-6">
            <h2 className="font-heading text-lg font-semibold">What happens after the quiz</h2>
            <ol className="mt-4 space-y-3.5">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-background-300 leading-relaxed">
                  <span className="w-6 h-6 shrink-0 rounded-full glass-inner-dark flex items-center justify-center text-[11px] text-primary-200">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-heading text-lg font-semibold">Also worth raising with your Wellness Optimisation Expert</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {secondary.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className="glass-card glass-lift rounded-[24px] p-5 block cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-primary-700">{item.tier}</p>
                  <h3 className="font-heading text-base font-semibold mt-1.5">{item.name}</h3>
                </div>
                <i className="ri-arrow-right-up-line text-primary-700 shrink-0" />
              </div>
              <p className="mt-2 text-xs text-foreground-600 leading-relaxed">{item.summary}</p>
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-8 text-[11px] leading-relaxed text-foreground-500 max-w-3xl">
        This quiz is a guidance tool, not a diagnosis or a prescription. Answers are used to suggest a starting point
        only. Prescription products require an online consultation with a licensed healthcare practitioner who decides
        whether treatment is appropriate. EVLV is an Australian wellness optimisation service.
      </p>
    </div>
  );
}