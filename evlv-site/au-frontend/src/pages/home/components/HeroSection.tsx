import { Link } from 'react-router-dom';
import {
  heroBannerVideo,
  heroBannerPoster,
  heroBannerMobileVideo,
  heroBannerMobilePoster,
  bentoPackShot,
  bentoCareImage,
  bentoSmall,
} from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function HeroSection() {
  return (
    <section className="atmo-cream panel-section pt-4 md:pt-10 pb-12 md:pb-24">
      <Container>
        <Link
          to="/treatments?category=weight-loss"
          className="group relative block w-full overflow-hidden rounded-[22px] glass-frame cursor-pointer aspect-[4/5] sm:aspect-[16/10] md:aspect-auto md:h-[380px] lg:h-[440px] md:rounded-[28px]"
        >
          <video
            className="md:hidden w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            poster={heroBannerMobilePoster}
            src={heroBannerMobileVideo}
            aria-label="EVLV wellness optimisation promotion"
          />
          <video
            className="hidden md:block w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            poster={heroBannerPoster}
            src={heroBannerVideo}
            aria-label="EVLV wellness optimisation promotion"
          />
        </Link>

        <Reveal>
          <div className="mt-6 flex flex-col gap-3 md:mt-14 md:flex-row md:items-end md:justify-between md:gap-10">
            <h1 className="t-display text-foreground-950 min-w-0">Women&apos;s health, on your terms.</h1>
            <Link
              to="/quiz"
              className="group inline-flex items-center gap-2 shrink-0 self-end whitespace-nowrap text-[11px] md:self-auto md:text-sm font-medium text-foreground-800 cursor-pointer hover:text-primary-700 transition-colors"
            >
              <span className="hidden sm:inline">Take the 60-second quiz</span>
              <span className="sm:hidden">Take the quiz</span>
              <span className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-primary-800/20 flex items-center justify-center text-[11px] md:text-xs transition-transform group-hover:translate-x-0.5">
                <i className="ri-arrow-right-line" />
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-5 md:mt-10 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
          <Reveal className="col-span-2" delay={60}>
            <Link
              to="/treatments?category=weight-loss"
              className="group relative flex h-[290px] md:h-[380px] w-full flex-col overflow-hidden rounded-[22px] md:rounded-[28px] p-5 md:p-7 glass-gold cursor-pointer"
            >
              <div className="relative z-20 flex items-start justify-between gap-4">
                <p className="font-heading text-lg md:text-2xl font-semibold text-accent-950 leading-tight max-w-[15ch]">
                  Access semaglutides and more
                </p>
                <span className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full bg-background-50/70 flex items-center justify-center text-accent-950 transition-transform group-hover:translate-x-1">
                  <i className="ri-arrow-right-up-line" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[70%]">
                <img
                  src={bentoPackShot}
                  alt="EVLV GLP-1 Semaglutide vial"
                  className="w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.04] group-hover:-translate-y-1"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-accent-800/30 to-transparent" />
              </div>
            </Link>
          </Reveal>

          <Reveal className="col-span-2" delay={120}>
            <Link
              to="/about"
              className="group relative block w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-[22px] md:rounded-[28px] glass-frame cursor-pointer"
            >
              <img
                src={bentoCareImage}
                alt="Two women walking together outdoors in warm afternoon light"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/45 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex items-start justify-between gap-4">
                <p className="font-heading text-lg md:text-2xl font-semibold text-background-50 max-w-[14ch]">
                  Care built for women
                </p>
                <span className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full bg-background-50/85 flex items-center justify-center text-foreground-950">
                  <i className="ri-arrow-right-up-line" />
                </span>
              </div>
            </Link>
          </Reveal>

          {bentoSmall.map((b, i) => {
            const isCta = i === 3;
            return (
              <Reveal key={b.label} delay={150 + i * 50}>
                <SmartLink
                  href={b.href}
                  className={`group relative flex flex-col justify-between h-[142px] md:h-[220px] rounded-[18px] md:rounded-[28px] overflow-hidden p-3.5 md:p-5 cursor-pointer ${
                    isCta ? 'glass-gold text-secondary-950' : 'glass-card glass-lift text-foreground-950'
                  }`}
                >
                  <span className="font-heading text-[15px] md:text-lg font-semibold max-w-[78%] md:max-w-[62%] leading-snug">
                    {b.label}
                  </span>
                  {isCta ? (
                    <img
                      src={b.image}
                      alt={b.alt}
                      className="absolute right-2.5 bottom-2.5 w-[64px] h-[64px] md:w-[86px] md:h-[86px] rounded-xl object-cover object-top ring-2 ring-primary-300/60"
                    />
                  ) : (
                    <img
                      src={b.image}
                      alt={b.alt}
                      className="absolute right-1 bottom-1 w-[76px] h-[76px] md:w-[104px] md:h-[104px] object-contain object-top transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  )}
                  <span className="absolute right-3 top-3 hidden md:block text-foreground-500 opacity-0 transition-opacity group-hover:opacity-100">
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