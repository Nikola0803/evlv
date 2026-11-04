import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';
import { shopIncludedCards } from '@/mocks/shop';

export default function IncludedCards() {
  return (
    <section className="pb-16 md:pb-20">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="eyebrow text-primary-700">Every order includes</p>
            <h2 className="t-section mt-2">The same six things, on every vial.</h2>
          </div>
          <p className="max-w-sm text-sm text-foreground-600 leading-relaxed">
            None of this is an upgrade or an add-on. It is the standard a lot is held to before it is listed.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {shopIncludedCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 45}>
              <div className="glass-card rounded-[20px] p-4 md:p-5 h-full flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full glass-inner text-[15px] text-primary-700">
                  <i className={card.icon} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-[15px] font-semibold leading-snug">{card.title}</h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-foreground-600">{card.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}