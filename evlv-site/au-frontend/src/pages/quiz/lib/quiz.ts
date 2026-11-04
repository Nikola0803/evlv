import { quizQuestions, quizRecommendations } from '@/mocks/quiz';

export type AnswerMap = Record<string, string[]>;

export type QuizOption = {
  id: string;
  label: string;
  hint: string;
  weights: Record<string, number>;
};

export type QuizQuestion = {
  id: string;
  title: string;
  helper: string;
  type: 'single' | 'multiple';
  options: QuizOption[];
};

export type Recommendation = {
  key: string;
  tier: string;
  name: string;
  href: string;
  price: string;
  summary: string;
  reasons: string[];
};

export const questions = quizQuestions as unknown as QuizQuestion[];

export const recommendations = quizRecommendations as unknown as Recommendation[];

const order = ['glp1', 'glp2', 'glp3', 'peptides', 'labs', 'hair', 'skin'];

export function getRecommendation(answers: AnswerMap): Recommendation {
  const scores: Record<string, number> = { glp1: 0, glp2: 0, glp3: 0, peptides: 0, labs: 0, hair: 0, skin: 0 };

  questions.forEach((question) => {
    const picked = answers[question.id] || [];
    question.options.forEach((option) => {
      if (!picked.includes(option.id)) return;
      Object.keys(option.weights).forEach((key) => {
        scores[key] = (scores[key] || 0) + option.weights[key];
      });
    });
  });

  let best = order[0];
  order.forEach((key) => {
    if (scores[key] > scores[best]) best = key;
  });

  return recommendations.find((rec) => rec.key === best) || recommendations[0];
}

export function getSecondaryRecommendations(primary: Recommendation): Recommendation[] {
  return recommendations.filter((rec) => rec.key !== primary.key).slice(0, 2);
}