import { steps } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function StepsSection() {
  return (
    <section className="atmo-cream panel-section section-y">
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-6">
            <div className="min-w-0">
              <p className="eyebrow text-primary-700">How it works</p>
              <h2 className="t-section mt-2.5 md:mt-3">Getting care is simple.</h2>
            </div>
            <div className="hidden sm:flex flex-wrap gap-3 shrink-0">
              <SmartLink
                href="/contact"
                className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
              >
                Start your free assessment
              </SmartLink>
              <SmartLink
                href="/about"
                className="whitespace-nowrap rounded-full border border-primary-500 text-primary-700 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-primary-50"
              >
                Learn more
              </SmartLink>
            </div>
          </div>
        </Reveal>

        <div className="peek-rail no-scrollbar -mr-4 mt-6 sm:hidden">
          {steps.map((s, i) => (
            <article key={s.title} className="peek-item">
              <div className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden glass-frame bg-background-200">
                <img src={s.image} alt={s.alt} className="w-full h-full object-cover object-center" />
                <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-background-50/90 font-heading text-[11px] font-semibold text-primary-800">
                  {i + 1}
                </span>
              </div>
              <h3 className="t-card mt-3 text-[15px]">{s.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-foreground-600">{s.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-7 hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="group flex h-full flex-col">
                <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] rounded-[22px] md:rounded-[24px] overflow-hidden glass-frame bg-background-200">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="t-card mt-4 md:mt-5">{s.title}</h3>
                <p className="text-[13px] md:text-sm text-foreground-600 mt-1.5 md:mt-2 leading-relaxed">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 sm:hidden flex flex-col gap-2.5">
          <SmartLink
            href="/contact"
            className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-center text-sm font-semibold cursor-pointer hover:bg-primary-400"
          >
            Start your free assessment
          </SmartLink>
          <SmartLink
            href="/about"
            className="whitespace-nowrap rounded-full border border-primary-500 text-primary-700 px-6 py-3 text-center text-sm font-medium cursor-pointer hover:bg-primary-50"
          >
            Learn more
          </SmartLink>
        </div>

        <div className="mt-10 md:mt-14 hidden sm:grid grid-cols-4 items-center" aria-hidden="true">
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center">
              <span className="shrink-0 w-9 h-9 rounded-full glass-inner flex items-center justify-center font-heading text-sm font-semibold text-primary-700">
                {i + 1}
              </span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-primary-800/20" />}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}