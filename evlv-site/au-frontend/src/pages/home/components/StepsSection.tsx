import { steps } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function StepsSection() {
  return (
    <section className="atmo-plum panel-section text-background-50 section-y">
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-6">
            <div className="min-w-0">
              <p className="eyebrow text-primary-300">How it works</p>
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
                className="whitespace-nowrap rounded-full border border-primary-300/50 text-primary-200 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-primary-800/40"
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
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-background-300">{s.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-7 hidden sm:grid sm:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="group flex flex-row items-center gap-5 md:gap-6 h-full">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="t-card mt-1">{s.title}</h3>
                  <p className="text-[13px] md:text-sm text-background-300 mt-1.5 md:mt-2 leading-relaxed">{s.text}</p>
                </div>
                <div className="shrink-0 w-28 h-24 md:w-36 md:h-28 rounded-[16px] md:rounded-[20px] overflow-hidden glass-frame bg-background-200">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
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
            className="whitespace-nowrap rounded-full border border-primary-300/50 text-primary-200 px-6 py-3 text-center text-sm font-medium cursor-pointer hover:bg-primary-800/40"
          >
            Learn more
          </SmartLink>
        </div>

      </Container>
    </section>
  );
}