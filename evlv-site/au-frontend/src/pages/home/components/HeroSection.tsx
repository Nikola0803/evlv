import { Link } from 'react-router-dom';
import { heroPromos, bentoPackShot, bentoCareImage, bentoSmall } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function HeroSection() {
  return (
    <section className="atmo-cream panel-section pt-6 md:pt-10 pb-16 md:pb-24">
      <Container>
        <Link
          to="/treatments?category=weight-loss"
          className="group relative block w-full h-[240px] md:h-[380px] lg:h-[440px] rounded-[28px] overflow-hidden cursor-pointer glass-frame"
        >
          <img
            src={bentoCareImage}
            alt="EVLV wellness optimisation, women's care on your terms"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/65 via-foreground-950/25 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 max-w-[640px]">
            <p className="eyebrow text-primary-200">EVLV Wellness Optimisation</p>
            <p className="mt-3 font-heading text-2xl md:text-4xl font-semibold text-background-50 leading-tight">
              Start with a 60-second quiz. Free, discreet delivery.
            </p>
          </div>
        </Link>

        <Reveal>
          <div className="mt-12 md:mt-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10">
            <div className="min-w-0 lg:flex-1">
              <p className="eyebrow text-primary-700">A better standard of women&apos;s care</p>
              <h1 className="t-display mt-4 text-foreground-950">Women&apos;s wellness, on your terms.</h1>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/quiz"
                  className="whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
                >
                  Take the 60-second quiz
                  <i className="ri-arrow-right-line" />
                </Link>
                <Link
                  to="/treatments"
                  className="whitespace-nowrap inline-flex items-center justify-center rounded-full border border-primary-800/25 text-foreground-800 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-background-50/70"
                >
                  Browse formulations
                </Link>
              </div>
            </div>
            <ul className="flex flex-wrap items-center gap-2 text-[11px] leading-none shrink-0 lg:flex-col lg:items-end">
              {heroPromos.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-1.5 bg-background-50/60 text-foreground-700 border border-primary-800/12 rounded-full px-2.5 py-[6px] whitespace-nowrap shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)]"
                >
                  <i className="ri-checkbox-circle-fill text-[11px] text-primary-600" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Reveal className="sm:col-span-2" delay={60}>
            <Link
              to="/treatments?category=weight-loss"
              className="group relative block h-[320px] md:h-[380px] rounded-[28px] overflow-hidden p-6 md:p-7 glass-gold cursor-pointer"
            >
              <div className="relative z-20 flex items-start justify-between gap-4">
                <div className="max-w-[18ch]">
                  <p className="font-heading text-xl md:text-2xl font-semibold text-accent-950 leading-tight">
                    Access retatrutide and more
                  </p>
                  <p className="mt-2 text-sm font-medium text-accent-950/80">Retatrutide 10mg · $399.99</p>
                </div>
                <span className="w-9 h-9 shrink-0 rounded-full bg-background-50/70 flex items-center justify-center text-accent-950 transition-transform group-hover:translate-x-1">
                  <i className="ri-arrow-right-up-line" />
                </span>
              </div>
              <div className="absolute inset-x-5 bottom-0 h-[60%] overflow-hidden rounded-t-[20px] shadow-[0_-18px_40px_-24px_rgba(0,0,0,0.45)]">
                <img
                  src={bentoPackShot}
                  alt="EVLV pre-filled injection pen with its warm ivory carton"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-900/10 to-transparent" />
              </div>
            </Link>
          </Reveal>

          <Reveal className="sm:col-span-2" delay={120}>
            <Link
              to="/about"
              className="group relative block aspect-[16/9] rounded-[28px] overflow-hidden cursor-pointer glass-frame"
            >
              <img
                src={bentoCareImage}
                alt="Two women walking together outdoors in warm afternoon light"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/45 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 right-6 flex items-start justify-between gap-4">
                <p className="font-heading text-xl md:text-2xl font-semibold text-background-50 max-w-[14ch]">
                  Care built for women
                </p>
                <span className="w-9 h-9 shrink-0 rounded-full bg-background-50/85 flex items-center justify-center text-foreground-950">
                  <i className="ri-arrow-right-up-line" />
                </span>
              </div>
            </Link>
          </Reveal>

          {bentoSmall.map((b, i) => {
            const isCta = i === 3;
            return (
              <Reveal key={b.label} delay={180 + i * 60}>
                <SmartLink
                  href={b.href}
                  className={`group relative flex flex-col justify-between h-[220px] rounded-[28px] overflow-hidden p-5 cursor-pointer ${
                    isCta ? 'glass-gold text-secondary-950' : 'glass-card glass-lift text-foreground-950'
                  }`}
                >
                  <span className="font-heading text-lg font-semibold max-w-[62%] leading-snug">{b.label}</span>
                  {isCta ? (
                    <img
                      src={b.image}
                      alt={b.alt}
                      className="absolute right-3 bottom-3 w-[86px] h-[86px] rounded-2xl object-cover object-top ring-2 ring-primary-300/60"
                    />
                  ) : (
                    <img
                      src={b.image}
                      alt={b.alt}
                      className="absolute right-2 bottom-1 w-[104px] h-[104px] object-contain object-top transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  )}
                  <span className="absolute right-4 top-4 text-foreground-500 opacity-0 transition-opacity group-hover:opacity-100">
                    <i className="ri-arrow-right-up-line" />
                  </span>
                </SmartLink>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}