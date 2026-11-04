import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';
import { shopProductFaqs } from '@/mocks/shop';

export default function ProductFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="panel-section py-14 md:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-12 items-start">
          <div>
            <p className="eyebrow text-primary-700">Before you order</p>
            <h2 className="t-section mt-2">The questions that come up most.</h2>
            <p className="mt-3 text-sm text-foreground-600 leading-relaxed max-w-sm">
              Everything about the vial itself: how it arrives, how it is stored, what paperwork travels with the lot.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 mt-5 text-sm text-primary-700 underline underline-offset-4 cursor-pointer whitespace-nowrap"
            >
              See all FAQs
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <Reveal>
            <div className="glass-card rounded-[26px] p-4 md:p-6">
              {shopProductFaqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.q} className="border-t border-primary-800/12 first:border-t-0">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 py-4 text-left cursor-pointer"
                      >
                        <span className="font-medium text-sm md:text-[15px] leading-snug">{item.q}</span>
                        <span className="w-6 h-6 shrink-0 flex items-center justify-center text-xl text-foreground-600">
                          <i className={isOpen ? 'ri-subtract-line' : 'ri-add-line'} />
                        </span>
                      </button>
                    </h3>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <p className="overflow-hidden pb-4 pr-8 text-[12.5px] md:text-sm text-foreground-600 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}