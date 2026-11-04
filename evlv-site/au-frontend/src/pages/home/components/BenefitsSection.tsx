import { benefits } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';

export default function BenefitsSection() {
  return (
    <section className="atmo-purple panel-section text-background-50 section-y">
      <Container>
      <Reveal>
        <div className="w-full">
          <p className="eyebrow text-primary-300">Why EVLV</p>
          <h2 className="t-section mt-3">It&apos;s time to take control of your health.</h2>
        </div>
      </Reveal>
      <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((b, i) => (
          <Reveal key={b} delay={i * 80}>
            <div className="h-full glass-card-dark glass-lift rounded-[24px] p-6 md:p-7 flex flex-col">
              <div className="w-9 h-9 flex items-center justify-center rounded-full glass-inner-dark text-primary-200 text-lg">
                <i className="ri-check-line" />
              </div>
              <p className="mt-6 text-background-200 leading-relaxed">{b}</p>
            </div>
          </Reveal>
        ))}
      </div>
      </Container>
    </section>
  );
}