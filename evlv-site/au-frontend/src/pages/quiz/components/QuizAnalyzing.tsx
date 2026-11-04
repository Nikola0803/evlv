import { useEffect, useState } from 'react';
import { quizAnalyzingSteps } from '@/mocks/quiz';

type Props = {
  onDone: () => void;
};

export default function QuizAnalyzing({ onDone }: Props) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    quizAnalyzingSteps.forEach((_, i) => {
      timers.push(window.setTimeout(() => setRevealed(i + 1), 700 * (i + 1)));
    });
    const finish = window.setTimeout(onDone, 700 * quizAnalyzingSteps.length + 700);
    timers.push(finish);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [onDone]);

  return (
    <div className="w-full max-w-[720px] mx-auto text-center py-8 md:py-14">
      <div className="relative mx-auto w-20 h-20">
        <span className="absolute inset-0 rounded-full border-2 border-primary-200" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-600 animate-spin-slow" />
        <span className="absolute inset-0 flex items-center justify-center text-2xl text-primary-700">
          <i className="ri-stethoscope-line" />
        </span>
      </div>

      <h2 className="font-heading text-2xl md:text-3xl font-semibold mt-7">Analysing your answers...</h2>
      <p className="mt-2 text-sm text-foreground-600">Matching with our clinical protocol. This takes a moment.</p>

      <ul className="mt-8 space-y-3 text-left max-w-md mx-auto">
        {quizAnalyzingSteps.map((step, i) => {
          const done = revealed > i;
          const active = revealed === i;
          return (
            <li
              key={step}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-500 ${
                done
                  ? 'border-primary-600/30 bg-primary-50/80'
                  : active
                    ? 'border-primary-800/15 bg-background-50/70'
                    : 'border-transparent bg-transparent opacity-45'
              }`}
            >
              <span
                className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs ${
                  done ? 'bg-primary-600 text-background-50' : 'glass-inner text-primary-700'
                }`}
              >
                {done ? <i className="ri-check-line" /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
              </span>
              <span className="text-sm">{step}</span>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-[11px] text-foreground-500">
        Reviewed by licensed Australian practitioners. Your answers are never sold or shared.
      </p>
    </div>
  );
}