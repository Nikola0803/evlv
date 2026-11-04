import { Link } from 'react-router-dom';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';
import { quizIntroFacts } from '@/mocks/quiz';

const preview = [
  { label: 'Your goal', value: 'Break through a plateau' },
  { label: 'Your week', value: 'Desk job, training twice' },
  { label: 'Matched protocol', value: 'Dual action, once weekly' },
];

export default function QuizCtaSection() {
  return (
    <section className="atmo-plum panel-section text-background-50 section-y">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          <Reveal>
            <div className="w-full">
              <p className="eyebrow text-primary-300">60-second wellness quiz</p>
              <h2 className="t-section mt-3 max-w-[20ch]">
                Not sure where to start? Start with your own answers.
              </h2>
              <p className="mt-5 text-background-300 leading-relaxed max-w-xl">
                Six short questions about your goal, your week and your history. We match them to a Wellness Optimisation
                protocol, then a Wellness Optimisation Specialist reviews it before you pay anything.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/quiz"
                  className="whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 text-foreground-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-accent-400"
                >
                  Take the quiz <i className="ri-arrow-right-line" />
                </Link>
                <Link
                  to="/treatments"
                  className="whitespace-nowrap inline-flex items-center justify-center rounded-full border border-primary-300/50 text-background-50 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-background-50/10"
                >
                  Browse all formulations
                </Link>
              </div>

              <p className="mt-5 text-[11px] text-background-400">
                Free to take · No card needed · Reviewed by licensed Australian practitioners
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-card-dark rounded-[28px] p-6 md:p-7 w-full">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-primary-300">Your result page</p>
                <span className="w-8 h-8 rounded-full glass-inner-dark flex items-center justify-center text-primary-200">
                  <i className="ri-stethoscope-line" />
                </span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {preview.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-xl glass-inner-dark px-4 py-3"
                  >
                    <span className="text-[11px] uppercase tracking-[0.1em] text-background-400">{row.label}</span>
                    <span className="text-xs text-background-100 text-right">{row.value}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {quizIntroFacts.map((fact) => (
                  <div key={fact.label} className="rounded-xl bg-primary-500/15 px-2 py-2.5 text-center">
                    <p className="font-heading text-lg font-semibold text-primary-200">{fact.value}</p>
                    <p className="text-[9px] uppercase tracking-[0.08em] text-background-400 leading-tight mt-0.5">
                      {fact.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}