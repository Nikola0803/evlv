import { useState } from 'react';
import { faqGroups } from '@/mocks/home';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function FaqSection() {
  const [open, setOpen] = useState<string | null>('General-0');

  return (
    <section className="bg-background-50 panel-section section-y">
      <Container className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-7 md:gap-10 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-32 self-start">
          <h2 className="t-section">
            Have questions?
            <br />
            We have answers.
          </h2>
          <p className="mt-3 md:mt-4 text-[13px] md:text-base text-foreground-600 max-w-sm leading-relaxed">
            Learn more about what to expect when starting treatment with EVLV.
          </p>
          <SmartLink
            href="/contact"
            className="hidden md:inline-block whitespace-nowrap mt-6 rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
          >
            Contact us
          </SmartLink>
        </div>

        <div>
          {faqGroups.map((g) => (
            <div key={g.title} className="mb-6 md:mb-8 last:mb-0">
              <h3 className="text-[11px] md:text-xs uppercase tracking-[0.16em] text-foreground-500 mb-2">{g.title}</h3>
              <div>
                {g.items.map((it, i) => {
                  const key = `${g.title}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={key} className="border-b border-foreground-950/12 first-of-type:border-t first-of-type:border-foreground-950/12">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 md:gap-6 py-4 md:py-5 text-left cursor-pointer"
                      >
                        <span className="font-medium text-[13.5px] md:text-base text-foreground-900">{it.q}</span>
                        <span className="w-5 h-5 shrink-0 flex items-center justify-center text-base text-foreground-500">
                          <i className={isOpen ? 'ri-subtract-line' : 'ri-add-line'} />
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <p className="overflow-hidden pb-4 md:pb-5 text-[13px] md:text-sm text-foreground-600 leading-relaxed max-w-2xl">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <SmartLink
            href="/contact"
            className="mt-5 block whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-center text-sm font-semibold cursor-pointer md:hidden"
          >
            Contact us
          </SmartLink>
        </div>
      </Container>
    </section>
  );
}