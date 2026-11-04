import { privacyCards } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';

export default function PrivacySection() {
  return (
    <section className="atmo-dark panel-section text-background-50 section-y">
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="eyebrow text-primary-300">Privacy first</p>
              <h2 className="t-section mt-3">We take your privacy seriously.</h2>
            </div>
            <div className="hidden md:flex items-center gap-5">
              <p className="text-sm text-background-300 max-w-xs leading-relaxed">
                Your personal health information is protected every step of the way.
              </p>
              <div className="w-20 h-20 shrink-0 flex items-center justify-center text-4xl text-background-400/70 animate-spin-slow">
                <i className="ri-contrast-drop-2-line" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {privacyCards.map((c, i) => (
            <Reveal key={c.text} delay={i * 90}>
              <div className="group h-full glass-card-dark glass-lift rounded-[26px] p-6 md:p-7 min-h-[240px] flex flex-col justify-between">
                <div className="w-14 h-14 flex items-center justify-center rounded-full glass-inner-dark text-2xl text-primary-200 transition-transform duration-500 group-hover:scale-105">
                  <i className={c.icon} />
                </div>
                <p className="mt-8 text-base md:text-lg leading-snug text-background-100">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}