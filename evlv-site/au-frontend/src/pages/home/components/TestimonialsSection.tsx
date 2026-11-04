import { useRef } from 'react';
import { testimonials } from '@/mocks/home';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function TestimonialsSection() {
  const rail = useRef<HTMLDivElement>(null);
  const marquee = Array.from({ length: 10 });

  const slide = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="atmo-peach panel-section pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden">
      <div className="flex w-max animate-marquee font-heading text-4xl md:text-6xl font-semibold text-accent-950 whitespace-nowrap">
        {marquee.map((_, i) => (
          <span key={i} className="px-6 flex items-center gap-6">
            Results worth talking about
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-foreground-950 text-accent-200 flex items-center justify-center text-xl">
              <i className="ri-play-fill" />
            </span>
          </span>
        ))}
      </div>

      <Container className="mt-12 md:mt-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <p className="text-sm text-accent-950/70 max-w-md">Real stories from patients across Australia using EVLV.</p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => slide(-1)}
              className="w-11 h-11 rounded-full bg-background-50 flex items-center justify-center cursor-pointer hover:bg-background-100"
            >
              <i className="ri-arrow-left-line" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => slide(1)}
              className="w-11 h-11 rounded-full bg-foreground-950 text-background-50 flex items-center justify-center cursor-pointer"
            >
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>

        <div ref={rail} className="peek-rail no-scrollbar">
          {testimonials.map((t) => (
            <article
              key={t.author}
              className="peek-item glass-card glass-lift rounded-[26px] flex flex-col overflow-hidden"
            >
              <div className="p-6 flex-1 flex flex-col">
                <i className="ri-double-quotes-l text-3xl text-primary-500" />
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-800 flex-1">{t.quote}</p>
                <p className="mt-5 text-xs text-foreground-500">
                  {t.author} · {t.place}
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-primary-800/10 p-4 bg-background-100/55 backdrop-blur-sm">
                <div className="w-14 h-14 shrink-0 rounded-xl glass-inner overflow-hidden flex items-center justify-center">
                  <img src={t.image} alt={`${t.product} treatment`} className="w-full h-full object-cover object-center" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-foreground-500">{t.type}</p>
                  <p className="font-heading font-semibold text-sm truncate">{t.product}</p>
                  <SmartLink href={t.href} className="text-xs text-primary-700 underline cursor-pointer whitespace-nowrap">
                    Learn more
                  </SmartLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}