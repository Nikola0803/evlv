import type { QuizQuestion } from '@/pages/quiz/lib/quiz';

type Props = {
  question: QuizQuestion;
  index: number;
  total: number;
  selected: string[];
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function QuizStep({ question, index, total, selected, onSelect, onNext, onBack }: Props) {
  const multiple = question.type === 'multiple';
  const canContinue = selected.length > 0;

  return (
    <div className="glass-card rounded-[30px] p-6 md:p-9 w-full">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-foreground-500">
          Question {index + 1} of {total}
        </p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i <= index ? 'w-6 bg-primary-500' : 'w-3 bg-background-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 h-1 w-full rounded-full bg-background-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-500"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <h2 className="font-heading text-2xl md:text-[1.9rem] font-semibold leading-tight mt-6">{question.title}</h2>
      {question.helper && <p className="mt-2 text-sm text-foreground-600">{question.helper}</p>}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {question.options.map((option) => {
          const active = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(option.id)}
              className={`w-full text-left cursor-pointer rounded-2xl border px-4 py-3.5 flex items-start gap-3 transition-all duration-200 ${
                active
                  ? 'border-primary-600 bg-primary-50 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.5)]'
                  : 'border-primary-800/12 bg-background-50/70 hover:border-primary-400 hover:bg-primary-50/50'
              }`}
            >
              <span
                className={`mt-0.5 w-5 h-5 shrink-0 flex items-center justify-center border text-[11px] ${
                  multiple ? 'rounded-md' : 'rounded-full'
                } ${active ? 'border-primary-600 bg-primary-600 text-background-50' : 'border-foreground-300 text-transparent'}`}
              >
                <i className="ri-check-line" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug">{option.label}</span>
                {option.hint && <span className="block text-xs text-foreground-500 mt-1 leading-relaxed">{option.hint}</span>}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="whitespace-nowrap inline-flex items-center justify-center gap-1.5 rounded-full border border-primary-800/15 text-foreground-700 px-5 py-2.5 text-sm cursor-pointer hover:bg-primary-50"
        >
          <i className="ri-arrow-left-line" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 text-secondary-950 px-7 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {index + 1 === total ? 'See my protocol' : 'Continue'}
          <i className="ri-arrow-right-line" />
        </button>
      </div>
    </div>
  );
}