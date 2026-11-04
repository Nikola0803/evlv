import { useState } from 'react';
import { faqGroups } from '@/mocks/home';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function FaqSection() {
  const [open, setOpen] = useState<string | null>('General-0');

  return (
    <section className="bg-background-50 panel-section section-y">
      <Container className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.3fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-32 self-start">
          <p className="eyebrow text-primary-700">FAQs</p>
          <h2 className="t-section mt-3">
            Have questions?
            <br />
            We have answers.
          </h2>
          <p className="mt-4 text-foreground-600 max-w-sm leading-relaxed">
            Learn more about what to expect when starting treatment with EVLV.
          </p>
          <SmartLink
            href="/contact"
            className="inline-block whitespace-nowrap mt-6 rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
          >
            Contact us
          </SmartLink>
        </div>

        <div className="space-y-4">
          {faqGroups.map((g) => (
            <div key={g.title} className="glass-card rounded-[24px] p-5 md:p-7">
              <h3 className="font-heading text-lg md:text-xl font-semibold mb-1">{g.title}</h3>
              {g.items.map((it, i) => {
                const key = `${g.title}-${i}`;
                const isOpen = open === key;
                return (
                  <div key={key} className="border-t border-primary-800/12 first-of-type:border-t-0">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 py-4 text-left cursor-pointer"
                    >
                      <span className="font-medium text-sm md:text-[15px]">{it.q}</span>
                      <span className="w-6 h-6 shrink-0 flex items-center justify-center text-xl text-foreground-600">
                        <i className={isOpen ? 'ri-subtract-line' : 'ri-add-line'} />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <p className="overflow-hidden pb-4 text-sm text-foreground-600 leading-relaxed">{it.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}