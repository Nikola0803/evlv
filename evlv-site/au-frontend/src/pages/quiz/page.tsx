import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
      <section className="atmo-cream panel-section py-12 md:py-20 min-h-[calc(100vh-260px)]">
        <Container>
          {stage === 'intro' && <QuizIntro onStart={() => setStage('quiz')} />}

          {stage === 'quiz' && current && (
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

          {stage === 'analyzing' && <QuizAnalyzing onDone={finish} />}

          {stage === 'result' && result && (
            <QuizResult rec={result} secondary={secondary} onRetake={restart} />
          )}
        </Container>
      </section>
    </PageShell>
  );
}