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
    <div className="w-full max-w-[720px] mx-auto">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-foreground-600 cursor-pointer hover:text-foreground-950"
        >
          <i className="ri-arrow-left-line" /> Back
        </button>
        <p className="text-[11px] uppercase tracking-[0.16em] text-foreground-500 tabular-nums">
          {index + 1} / {total}
        </p>
      </div>

      <div className="mt-3 h-1.5 w-full rounded-full bg-foreground-950/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-500"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <h2 className="mt-7 md:mt-11 font-heading font-semibold leading-[1.1] tracking-[-0.03em] text-[clamp(1.65rem,3.2vw,2.5rem)]">
        {question.title}
      </h2>
      {question.helper && (
        <p className="mt-2.5 text-[13.5px] md:text-sm text-foreground-600 leading-relaxed">{question.helper}</p>
      )}

      <div className="mt-6 md:mt-9 space-y-2.5">
        {question.options.map((option) => {
          const active = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(option.id)}
              className={`w-full text-left cursor-pointer rounded-[16px] md:rounded-[18px] border px-4 py-3.5 md:px-5 md:py-4 flex items-center gap-3.5 md:gap-4 transition-all duration-200 ${
                active
                  ? 'border-primary-600 bg-primary-100/90 shadow-[0_14px_30px_-24px_rgba(0,0,0,0.6)]'
                  : 'border-foreground-950/10 bg-background-50/85 hover:border-primary-500 hover:bg-primary-50/70'
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium leading-snug text-foreground-950">{option.label}</span>
                {option.hint && (
                  <span className="block text-xs text-foreground-500 mt-1 leading-relaxed">{option.hint}</span>
                )}
              </span>
              <span
                className={`w-6 h-6 shrink-0 flex items-center justify-center border text-[12px] transition-colors ${
                  multiple ? 'rounded-md' : 'rounded-full'
                } ${active ? 'border-primary-600 bg-primary-600 text-background-50' : 'border-foreground-300 text-transparent'}`}
                aria-hidden="true"
              >
                <i className="ri-check-line" />
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canContinue}
        className="mt-6 w-full whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-7 py-4 text-sm font-semibold cursor-pointer hover:bg-primary-400 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
      >
        {index + 1 === total ? 'See my starting point' : 'Next'}
      </button>

      <p className="mt-4 text-center text-[11px] text-foreground-500">
        No card, no cost. You can stop at any point.
      </p>
    </div>
  );
}