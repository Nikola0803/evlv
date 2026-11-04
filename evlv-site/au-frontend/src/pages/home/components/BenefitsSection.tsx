import { benefits } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';

export default function BenefitsSection() {
  return (
    <section className="atmo-cream panel-section section-y">
      <Container>
        <Reveal>
          <div className="w-full">
            <h2 className="t-section">It&apos;s time to take control of your health.</h2>
          </div>
        </Reveal>

        <div className="mt-5 md:mt-14 grid grid-cols-2 gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b} delay={i * 80}>
              <div className="flex flex-col">
                <span className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-primary-700/30 flex items-center justify-center text-primary-800 text-[13px] md:text-sm shrink-0">
                  <i className="ri-check-line" />
                </span>
                <p className="mt-2.5 md:mt-4 text-[12px] md:text-sm leading-relaxed text-foreground-700">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}