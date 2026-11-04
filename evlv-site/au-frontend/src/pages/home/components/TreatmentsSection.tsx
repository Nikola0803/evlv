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
    <section className="atmo-cream panel-section section-y">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="eyebrow text-primary-700">Popular treatments</p>
            <h2 className="t-section mt-3">Care that fits your life, not the other way around.</h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <SmartLink
              href="/treatments"
              className="whitespace-nowrap text-sm text-primary-700 underline decoration-primary-500/40 underline-offset-4 cursor-pointer hover:text-primary-800"
            >
              See all treatments
            </SmartLink>
            <div className="hidden md:flex gap-2">
              <button
                type="button"
                aria-label="Previous treatments"
                onClick={() => slide(-1)}
                className="w-11 h-11 rounded-full border border-primary-800/20 flex items-center justify-center cursor-pointer text-foreground-700 hover:bg-background-200 hover:border-primary-800/40 transition-colors"
              >
                <i className="ri-arrow-left-line" />
              </button>
              <button
                type="button"
                aria-label="Next treatments"
                onClick={() => slide(1)}
                className="w-11 h-11 rounded-full border border-primary-800/20 flex items-center justify-center cursor-pointer text-foreground-700 hover:bg-background-200 hover:border-primary-800/40 transition-colors"
              >
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={rail}
          data-product-shop
          className="peek-rail no-scrollbar mt-10"
        >
          {treatments.map((t) => (
            <article
              key={t.name}
              className="peek-item group glass-card-dark glass-lift rounded-[26px] p-5 flex flex-col"
            >
              <div className="flex items-center justify-between h-7">
                <span className="text-[11px] rounded-full border border-primary-200/40 bg-background-50/10 px-3 py-1 text-primary-100 backdrop-blur-sm whitespace-nowrap">
                  {t.type}
                </span>
                <span className="w-7 h-7 rounded-full border border-primary-300/40 flex items-center justify-center text-primary-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="ri-arrow-right-up-line" />
                </span>
              </div>

              <h3 className="t-card mt-4">{t.name}</h3>

              <div className="product-frame h-[190px] mt-4 rounded-[18px]">
                <img
                  src={t.image}
                  alt={`${t.name} prescription treatment`}
                  title={`${t.name} ${t.type}`}
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <SmartLink
                href={t.href}
                className="mt-5 whitespace-nowrap text-center rounded-full bg-gradient-to-b from-primary-300 to-accent-500 text-foreground-950 py-3 text-sm font-semibold cursor-pointer hover:from-primary-200 hover:to-accent-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)]"
              >
                Get started
              </SmartLink>

              <p className="mt-3 text-[11px] leading-4 text-primary-200 text-center h-4">
                {t.price}
                <sup>{t.cents}</sup> per piece
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-foreground-500">
          Prices are per piece and include delivery. No subscription, no recurring charge.
        </p>
      </Container>
    </section>
  );
}