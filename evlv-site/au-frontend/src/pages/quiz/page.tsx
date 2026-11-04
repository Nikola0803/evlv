import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '@/components/feature/PageShell';
import Container from '@/components/base/Container';
import QuizIntro from '@/pages/quiz/components/QuizIntro';
import QuizStep from '@/pages/quiz/components/QuizStep';
import QuizAnalyzing from '@/pages/quiz/components/QuizAnalyzing';
import QuizResult from '@/pages/quiz/components/QuizResult';
import {
  getRecommendation,
  getSecondaryRecommendations,
  questions,
  type AnswerMap,
  type Recommendation,
} from '@/pages/quiz/lib/quiz';

type Stage = 'intro' | 'quiz' | 'analyzing' | 'result';

export default function Quiz() {
  const [stage, setStage] = useState<Stage>('intro');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [result, setResult] = useState<Recommendation | null>(null);
  const answersRef = useRef<AnswerMap>({});
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  const total = questions.length;

  const finish = useCallback(() => {
    setResult(getRecommendation(answersRef.current));
    setStage('result');
  }, []);

  const startAnalyzing = useCallback(() => {
    setStage('analyzing');
  }, []);

  const goNext = useCallback(() => {
    if (step + 1 >= total) {
      startAnalyzing();
      return;
    }
    setStep((prev) => prev + 1);
  }, [startAnalyzing, step, total]);

  const goBack = useCallback(() => {
    if (step === 0) {
      setStage('intro');
      return;
    }
    setStep((prev) => prev - 1);
  }, [step]);

  const handleSelect = useCallback(
    (optionId: string, type: 'single' | 'multiple', questionId: string) => {
      const current = answersRef.current;
      let next: AnswerMap;

      if (type === 'single') {
        next = { ...current, [questionId]: [optionId] };
      } else {
        const picked = current[questionId] || [];
        next = {
          ...current,
          [questionId]: picked.includes(optionId) ? picked.filter((id) => id !== optionId) : [...picked, optionId],
        };
      }

      answersRef.current = next;
      setAnswers(next);
    },
    [],
  );

  const restart = useCallback(() => {
    answersRef.current = {};
    setAnswers({});
    setResult(null);
    setStep(0);
    setStage('intro');
  }, []);

  const secondary = useMemo(() => (result ? getSecondaryRecommendations(result) : []), [result]);
  const current = questions[step];

  return (
    <PageShell>
      <section className="atmo-cream panel-section pt-12 md:pt-16 pb-16 md:pb-24 min-h-[calc(100vh-260px)]">
        <Container>
          {stage === 'intro' && <QuizIntro onStart={() => setStage('quiz')} />}

          {stage === 'quiz' && (
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start">
              <aside className="w-full lg:sticky lg:top-28">
                <p className="eyebrow text-primary-700">Wellness quiz</p>
                <h1 className="font-heading text-2xl md:text-3xl font-semibold leading-tight mt-3">
                  A few answers.
                  <br />
                  A clearer starting point.
                </h1>
                <p className="mt-3 text-sm text-foreground-600 leading-relaxed">
                  Answer honestly — there is nothing to get right here. Your Wellness Optimisation Expert (MD) reads all
                  of it before anything is prescribed.
                </p>

                <div className="mt-6 rounded-2xl glass-inner p-4">
                  <p className="text-xs font-medium flex items-center gap-1.5">
                    <i className="ri-lock-2-line text-primary-700" /> Private by default
                  </p>
                  <p className="mt-1.5 text-[11px] text-foreground-600 leading-relaxed">
                    Answers are used to match a protocol only. No card, no payment, no obligation.
                  </p>
                </div>

                <Link
                  to="/treatments"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs text-foreground-600 underline cursor-pointer hover:text-primary-700"
                >
                  Skip the quiz and browse formulations
                </Link>
              </aside>

              {current && (
                <QuizStep
                  question={current}
                  index={step}
                  total={total}
                  selected={answers[current.id] || []}
                  onSelect={(optionId) => handleSelect(optionId, current.type, current.id)}
                  onNext={goNext}
                  onBack={goBack}
                />
              )}
            </div>
          )}

          {stage === 'analyzing' && <QuizAnalyzing onDone={finish} />}

          {stage === 'result' && result && (
            <QuizResult rec={result} secondary={secondary} onRetake={restart} />
          )}
        </Container>
      </section>
    </PageShell>
  );
}