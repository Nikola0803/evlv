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
    <section className="panel-section pt-12 md:pt-24 pb-12 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, oklch(0.93 0.025 72) 0%, oklch(0.18 0.012 68) 100%)' }}>
      <div className="flex w-max animate-marquee font-heading text-[28px] sm:text-4xl md:text-6xl font-semibold text-accent-950 whitespace-nowrap">
        {marquee.map((_, i) => (
          <span key={i} className="px-4 md:px-6 flex items-center gap-4 md:gap-6">
            Results worth talking about
            <span className="w-11 h-11 md:w-20 md:h-20 rounded-full bg-foreground-950 text-accent-200 flex items-center justify-center text-base md:text-xl">
              <i className="ri-sparkling-2-line" />
            </span>
          </span>
        ))}
      </div>

      <Container className="mt-7 md:mt-16">
        <div ref={rail} className="peek-rail no-scrollbar">
          {testimonials.map((t) => (
            <article key={t.author} className="peek-item flex flex-col">
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden">
                <img
                  src={t.photo}
                  alt={`${t.author} from ${t.place}, EVLV patient`}
                  title={`${t.author} testimonial ${t.product}`}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/80 via-foreground-950/30 to-foreground-950/10" />
                <p className="absolute inset-x-5 top-5 text-[12px] md:text-[13px] leading-relaxed text-background-50">
                  {t.quote}
                </p>
              </div>

              <div className="mt-2.5 md:mt-3 rounded-[16px] md:rounded-[18px] bg-background-50 p-2.5 md:p-3 flex items-center gap-2.5 md:gap-3 shadow-[0_14px_30px_-24px_rgba(0,0,0,0.5)]">
                <div className="w-10 h-10 md:w-11 md:h-11 shrink-0 rounded-xl overflow-hidden bg-background-100">
                  <img
                    src={t.image}
                    alt={`${t.product} treatment`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-semibold text-sm text-foreground-950 truncate">{t.product}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-foreground-500 truncate">{t.type}</p>
                </div>
                <SmartLink
                  href={t.href}
                  className="shrink-0 whitespace-nowrap text-[10px] uppercase tracking-[0.12em] font-semibold text-primary-800 cursor-pointer hover:text-primary-600"
                >
                  Learn more
                </SmartLink>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-5 md:mt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] md:text-sm text-background-300 max-w-md">
            Real stories from patients across Australia using EVLV.
          </p>
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => slide(-1)}
              className="w-11 h-11 rounded-full bg-background-50/15 text-background-100 border border-background-50/20 flex items-center justify-center cursor-pointer hover:bg-background-50/25"
            >
              <i className="ri-arrow-left-line" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => slide(1)}
              className="w-11 h-11 rounded-full bg-foreground-950 text-background-50 flex items-center justify-center cursor-pointer hover:bg-foreground-900"
            >
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}