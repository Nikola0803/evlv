import { steps } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function StepsSection() {
  return (
    <section className="atmo-cream panel-section section-y">
      <Container>
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="min-w-0">
            <p className="eyebrow text-primary-700">How it works</p>
            <h2 className="t-section mt-3">Getting care is simple.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <SmartLink
              href="/quiz"
              className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
            >
              Take the 60-second quiz
            </SmartLink>
            <SmartLink
              href="/contact"
              className="whitespace-nowrap rounded-full border border-primary-500 text-primary-700 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-primary-50"
            >
              Start your free assessment
            </SmartLink>
          </div>
        </div>
      </Reveal>

      <div className="relative isolate mt-10 md:mt-12">
        <div className="hidden lg:block absolute -z-10 top-[150px] left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="group h-full glass-card glass-lift rounded-[26px] p-2.5 pb-6 flex flex-col">
                <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden glass-frame bg-background-200">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="relative -mt-5 ml-4 w-11 h-11 rounded-full glass-inner flex items-center justify-center font-heading font-semibold text-primary-700">
                  {i + 1}
                </div>
                <div className="px-3.5">
                  <h3 className="t-card mt-4">{s.title}</h3>
                  <p className="text-sm text-foreground-600 mt-1.5 leading-relaxed">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      </Container>
    </section>
  );
}