import { useRef } from 'react';
import { treatments } from '@/mocks/home';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function TreatmentsSection() {
  const rail = useRef<HTMLDivElement>(null);

  const slide = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const step = el.querySelector<HTMLElement>('.peek-item');
    const amount = step ? step.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="atmo-purple panel-section text-background-50 section-y">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h2 className="t-section">Popular treatments, now within reach.</h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <SmartLink
              href="/treatments"
              className="whitespace-nowrap text-sm text-primary-100 underline decoration-primary-300/50 underline-offset-4 cursor-pointer hover:text-primary-50"
            >
              See all treatments
            </SmartLink>
            <div className="hidden md:flex gap-2">
              <button
                type="button"
                aria-label="Previous treatments"
                onClick={() => slide(-1)}
                className="w-11 h-11 rounded-full border border-primary-300/50 flex items-center justify-center cursor-pointer text-primary-100 hover:bg-primary-700/50 hover:border-primary-200/70 transition-colors"
              >
                <i className="ri-arrow-left-line" />
              </button>
              <button
                type="button"
                aria-label="Next treatments"
                onClick={() => slide(1)}
                className="w-11 h-11 rounded-full border border-primary-300/50 flex items-center justify-center cursor-pointer text-primary-100 hover:bg-primary-700/50 hover:border-primary-200/70 transition-colors"
              >
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </div>

        <div ref={rail} data-product-shop className="peek-rail no-scrollbar -mr-4 mt-5 md:mr-0 md:mt-12">
          {treatments.map((t) => (
            <SmartLink key={t.name} href={t.href} className="peek-item group block cursor-pointer">
              <div className="h-full rounded-[18px] md:rounded-[22px] bg-foreground-950 p-2 md:p-2.5 flex flex-col shadow-[0_24px_50px_-16px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:-translate-y-1">
                <div className="relative aspect-[4/5] rounded-[13px] md:rounded-[16px] overflow-hidden bg-gradient-to-b from-foreground-800 to-foreground-950">
                  <img
                    src={t.image}
                    alt={`${t.name} ${t.type} treatment pack shot`}
                    title={`${t.name} ${t.type}`}
                    className="w-full h-full object-contain object-center px-5 py-5 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-foreground-950 to-transparent" />
                </div>

                <div className="relative z-10 -mt-4 md:-mt-5 mx-auto rounded-full bg-background-50 px-4 md:px-5 py-[6px] md:py-[7px] text-[11px] md:text-xs font-semibold text-foreground-950 whitespace-nowrap shadow-[0_8px_18px_-10px_rgba(0,0,0,0.6)]">
                  {t.name}
                </div>

                <p className="mt-2.5 md:mt-3 text-center text-[10.5px] md:text-[11px] leading-none text-background-400">
                  Starting at{' '}
                  <span className="font-semibold text-background-100">
                    {t.price}
                    <sup className="text-[8px]">{t.cents}</sup>
                  </span>
                </p>
                <p className="mt-2 mb-1.5 text-center text-[10px] uppercase tracking-[0.12em] text-background-500">
                  {t.type}
                </p>
              </div>
            </SmartLink>
          ))}
        </div>

        <p className="mt-4 md:mt-6 text-[10px] md:text-[11px] text-primary-300/80">
          Prices are per piece and include delivery. No subscription, no recurring charge.
        </p>
      </Container>
    </section>
  );
}