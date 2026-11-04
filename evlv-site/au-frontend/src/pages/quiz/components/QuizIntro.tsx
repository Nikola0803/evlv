import { Link } from 'react-router-dom';
import Reveal from '@/components/base/Reveal';
import { quizIntroFacts, quizTrustPoints } from '@/mocks/quiz';

type Props = {
  onStart: (goalId?: string) => void;
};

// Front door: each path opens the quiz with its matching first answer
// pre-selected (the user can still change it before continuing).
const paths = [
  {
    goalId: 'sustainable',
    icon: 'ri-scales-3-line',
    title: 'Weight management',
    text: 'Steady fat loss, or breaking through a plateau.',
  },
  {
    goalId: 'hair',
    icon: 'ri-brush-line',
    title: 'Hair',
    text: 'Thinning, shedding or a widening part.',
  },
  {
    goalId: 'skin',
    icon: 'ri-drop-line',
    title: 'Skin',
    text: 'Texture, breakouts or visible ageing.',
  },
  {
    goalId: 'composition',
    icon: 'ri-run-line',
    title: 'Recovery and body composition',
    text: 'Tone, training recovery and strength.',
  },
  {
    goalId: 'metabolic',
    icon: 'ri-heart-pulse-line',
    title: 'Metabolic health and labs',
    text: 'Energy, sleep, blood sugar and your numbers.',
  },
];

const inside = [
  { icon: 'ri-focus-3-line', title: 'Your goal', text: 'What you actually want to change first.' },
  { icon: 'ri-walk-line', title: 'Your week', text: 'Sleep, stress, training, how you eat on a busy day.' },
  { icon: 'ri-file-list-3-line', title: 'Your history', text: 'Anything a doctor has flagged, and what you have tried.' },
];

export default function QuizIntro({ onStart }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_1fr] gap-10 lg:gap-14 items-center">
      <Reveal>
        <div className="w-full">
          <p className="eyebrow inline-flex items-center gap-2 text-primary-700 bg-background-50/70 border border-primary-800/12 rounded-full px-3 py-1.5">
            <i className="ri-sparkling-2-line text-sm" /> Wellness quiz · 60 seconds
          </p>
          <h1 className="t-display mt-5 w-full">
            What can we help
            <br />
            you with?
          </h1>
          <p className="mt-5 text-base md:text-lg text-foreground-600 leading-relaxed max-w-2xl">
            Six short questions about your goal, your week and your history. Your answers are matched to a protocol,
            then a Wellness Optimisation Expert (MD) reviews it before you pay a cent.
          </p>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3">
            {paths.map((path) => (
              <button
                key={path.goalId}
                type="button"
                onClick={() => onStart(path.goalId)}
                className="text-left cursor-pointer rounded-2xl border border-primary-800/12 bg-background-50/70 hover:border-primary-400 hover:bg-primary-50/50 px-4 py-4 transition-all duration-200"
              >
                <i className={`${path.icon} text-xl text-primary-700`} />
                <span className="block mt-3 text-sm font-semibold leading-snug">{path.title}</span>
                <span className="block mt-1 text-xs text-foreground-600 leading-relaxed">{path.text}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onStart()}
              className="whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 text-secondary-950 px-7 py-3.5 text-sm font-semibold cursor-pointer hover:bg-primary-400"
            >
              Not sure? Take the 60-second quiz
              <i className="ri-arrow-right-line" />
            </button>
            <Link
              to="/treatments"
              className="whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-full border border-primary-500 text-primary-700 px-7 py-3.5 text-sm font-medium cursor-pointer hover:bg-primary-50"
            >
              Browse formulations instead
            </Link>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5">
            {quizTrustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-foreground-600">
                <i className="ri-shield-check-line text-primary-600 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="glass-card rounded-[30px] p-6 md:p-8 w-full">
          <div className="grid grid-cols-3 gap-3">
            {quizIntroFacts.map((fact) => (
              <div key={fact.label} className="glass-inner rounded-2xl px-3 py-3 text-center">
                <p className="font-heading text-2xl font-semibold text-primary-700">{fact.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-foreground-500 leading-tight">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-lg font-semibold mt-7">What we ask about</h2>
          <ul className="mt-4 space-y-4">
            {inside.map((item, i) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="w-9 h-9 shrink-0 rounded-full glass-inner flex items-center justify-center text-primary-700">
                  <i className={item.icon} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {i + 1}. {item.title}
                  </p>
                  <p className="text-xs text-foreground-600 leading-relaxed mt-0.5">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl bg-secondary-900 text-background-50 p-4">
            <p className="text-xs leading-relaxed text-background-300">
              <i className="ri-stethoscope-line text-primary-300 mr-1.5" />
              This is a guidance tool, not a diagnosis. A Wellness Optimisation Expert (MD) reviews every recommendation
              before treatment is dispensed.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}