import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '@/components/feature/PageShell';
import PageIntro from '@/components/feature/PageIntro';
import { faqGroups } from '@/mocks/home';

export default function Faq() {
  const [open, setOpen] = useState<string | null>(`${faqGroups[0].title}-0`);

  return (
    <PageShell>
      <PageIntro
        eyebrow="Answers"
        title={
          <>
            Straight answers,
            <br />
            before you commit.
          </>
        }
        text="Everything patients ask us before their first assessment. If your question is not here, the care team will answer it directly."
      >
        <Link
          to="/contact"
          className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
        >
          Ask us anything
        </Link>
      </PageIntro>

      <section className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 pb-20 grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-8 items-start">
        <div className="space-y-5">
          {faqGroups.map((g) => (
            <div key={g.title} className="glass-card rounded-[26px] p-5 md:p-7">
              <h2 className="font-heading text-xl font-semibold mb-1">{g.title}</h2>
              {g.items.map((it, i) => {
                const key = `${g.title}-${i}`;
                const isOpen = open === key;
                return (
                  <div key={key} className="border-t border-primary-800/12 first-of-type:border-t-0">
                    <h3>
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
                    </h3>
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

        <aside className="lg:sticky lg:top-28 space-y-5">
          <div className="glass-gold rounded-[26px] p-6 md:p-7">
            <h2 className="font-heading text-xl font-semibold text-accent-950">Still deciding?</h2>
            <p className="mt-2 text-sm text-accent-950/80 leading-relaxed">
              Send a note describing what is going on. A member of the care team reads every message — you will not get
              a canned reply.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-5 whitespace-nowrap rounded-full bg-secondary-950 text-background-50 px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-secondary-800"
            >
              Message the care team
            </Link>
          </div>

          <div className="glass-card rounded-[26px] p-6 md:p-7">
            <h2 className="font-heading text-lg font-semibold">Good to know</h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground-600 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <i className="ri-map-pin-2-line text-primary-700 mt-0.5" />
                <span>Available across New South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, the ACT and the Northern Territory, with more coverage added regularly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <i className="ri-truck-line text-primary-700 mt-0.5" />
                <span>Free delivery on every order, in plain packaging with a signature required.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <i className="ri-lock-line text-primary-700 mt-0.5" />
                <span>Encrypted, healthcare-grade systems. Your records are never sold.</span>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}