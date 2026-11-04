import { womensHealthImage } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

const entryPoints = [
  {
    icon: 'ri-scales-3-line',
    title: 'Weight and metabolic health',
    text: 'GLP-1, GLP-2 and GLP-3 protocols reviewed by a licensed provider, with dosing adjusted to your body and your history.',
    href: '/treatments?category=weight-loss',
  },
  {
    icon: 'ri-leaf-line',
    title: 'Skin, texture and aging',
    text: 'Prescription tretinoin and a plan for acne, texture, and the changes that come with age.',
    href: '/treatments/tretinoin',
  },
  {
    icon: 'ri-user-heart-line',
    title: 'Hair thinning and shedding',
    text: 'Topical and oral options built for women, with a straight answer about what actually works.',
    href: '/treatments/minoxidil',
  },
];

export default function WomensHealthSection() {
  return (
    <section id="womens-health" className="atmo-plum panel-section section-y">
      <Container>
        <div className="glass-card rounded-[32px] p-3 md:p-4 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-4 lg:gap-8 items-stretch">
            <Reveal className="h-full">
              <div className="relative w-full h-[320px] sm:aspect-[4/5] sm:h-auto lg:min-h-[480px] rounded-[26px] overflow-hidden glass-frame bg-background-200">
                <img
                  src={womensHealthImage}
                  alt="Woman standing in warm natural light at home"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-foreground-950/55 backdrop-blur-md border border-background-50/20 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-primary-200">For women, at every stage</p>
                  <p className="mt-1 text-sm text-background-50 leading-snug">
                    The same licensed providers, the same discretion, built around what you actually asked for.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90} className="h-full">
              <div className="h-full flex flex-col justify-center px-3 pb-6 pt-4 md:px-6 md:py-8">
                <p className="eyebrow text-primary-700">Women&apos;s wellness</p>
                <h2 className="t-section mt-3">Women&apos;s wellness, without the waiting room.</h2>
                <p className="mt-4 text-foreground-600 leading-relaxed max-w-xl">
                  Weight, skin, hair, and the lab work that keeps getting pushed to next year. Start with a secure
                  assessment at home and a provider who listens properly instead of rushing you out the door.
                </p>

                <ul className="mt-7 divide-y divide-primary-800/10">
                  {entryPoints.map((e) => (
                    <li key={e.title}>
                      <SmartLink
                        href={e.href}
                        className="group flex items-start gap-4 py-4 cursor-pointer"
                      >
                        <span className="w-10 h-10 shrink-0 rounded-full glass-inner flex items-center justify-center text-lg text-primary-700">
                          <i className={e.icon} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="font-heading text-base font-semibold">{e.title}</span>
                            <i className="ri-arrow-right-up-line text-xs text-primary-600 opacity-0 transition-opacity group-hover:opacity-100" />
                          </span>
                          <span className="mt-1 block text-sm text-foreground-600 leading-relaxed">{e.text}</span>
                        </span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-start gap-3 rounded-2xl glass-inner px-4 py-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-sm text-primary-700">
                    <i className="ri-user-add-line" />
                  </span>
                  <p className="text-[12.5px] leading-relaxed text-foreground-700">
                    <span className="font-semibold text-foreground-950">Looking after him too?</span> We supply RX
                    peptides to men as well. Mention it in your assessment and your provider can advise on the right
                    protocol for your partner — you do not need a second account.
                    <SmartLink
                      href="/treatments?category=peptides"
                      className="ml-1 inline-flex items-center gap-1 whitespace-nowrap font-semibold text-primary-700 underline underline-offset-2 cursor-pointer hover:text-primary-800"
                    >
                      RX peptides
                      <i className="ri-arrow-right-up-line text-[10px]" />
                    </SmartLink>
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <SmartLink
                    href="/contact"
                    className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
                  >
                    Start your free assessment
                  </SmartLink>
                  <SmartLink
                    href="/about"
                    className="whitespace-nowrap rounded-full border border-primary-500 text-primary-700 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-primary-50"
                  >
                    How care works
                  </SmartLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}