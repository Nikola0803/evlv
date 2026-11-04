import { Link } from 'react-router-dom';
import PageShell from '@/components/feature/PageShell';
import PageIntro from '@/components/feature/PageIntro';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';
import { steps } from '@/mocks/home';

const principles = [
  {
    icon: 'ri-user-heart-line',
    title: 'Real experts, not chatbots',
    text: 'Every assessment is read by an expert who is accountable for the decision they make about your care.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Privacy as a default',
    text: 'Health information stays in encrypted, healthcare-grade systems. Medication arrives in plain, unbranded packaging.',
  },
  {
    icon: 'ri-time-line',
    title: 'Care that keeps up',
    text: 'Follow-ups are part of the plan, not an upsell. If something is not working, your expert adjusts instead of leaving you to figure it out.',
  },
];

export default function About() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="About EVLV"
        title={
          <>
            A better standard of
            <br />
            everyday care.
          </>
        }
        text="EVLV is an Australian wellness optimisation service for women who want straightforward access to Wellness Optimisation Experts — for weight, skin, hair, and the health questions that usually get pushed to the bottom of the list."
      >
        <Link
          to="/treatments"
          className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
        >
          Explore treatments
        </Link>
        <Link
          to="/contact"
          className="whitespace-nowrap rounded-full border border-primary-500 text-primary-700 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-primary-50"
        >
          Talk to us
        </Link>
      </PageIntro>

      <section className="band-soft panel-section pb-16 md:pb-24 pt-2">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="h-full glass-card glass-lift rounded-[22px] md:rounded-[26px] p-5 md:p-7">
                  <span className="w-10 h-10 md:w-11 md:h-11 rounded-full glass-inner flex items-center justify-center text-lg md:text-xl text-primary-700">
                    <i className={p.icon} />
                  </span>
                  <h2 className="font-heading text-lg md:text-xl font-semibold mt-4 md:mt-5">{p.title}</h2>
                  <p className="mt-1.5 md:mt-2 text-[13px] md:text-sm text-foreground-600 leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="atmo-purple panel-section text-background-50 section-y">
        <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-10 lg:gap-16 items-start">
          <Reveal>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-primary-300">Built for women</p>
              <h2 className="t-section mt-3">
                Care designed around women&apos;s health, not a generic health app.
              </h2>
              <p className="mt-4 md:mt-5 text-[13.5px] md:text-base text-background-300 leading-relaxed">
                EVLV started with weight, hair, and skin because those are the concerns women most often raise and
                least often get a straight answer about. We built the service so the same expert, the same
                standards, and the same discretion apply from the first assessment onwards.
              </p>
              <p className="mt-3.5 md:mt-4 text-[13.5px] md:text-base text-background-300 leading-relaxed">
                Women come to us with very different histories, and rarely with time to spare. What does not change is
                who is on the other side of the assessment: a Wellness Optimisation Expert, in your state or territory, working to
                Australian clinical standards, who explains the plan instead of leaving you to guess.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              {
                label: 'What we treat',
                items: ['Weight and metabolic health', 'Hair thinning and shedding', 'Acne, texture, and aging skin', 'Lab work before treatment'],
              },
              {
                label: 'How it feels',
                items: ['An expert who listens properly', 'Free, discreet delivery', 'Encrypted, privacy-law-aligned records', 'Follow-ups included in your plan'],
              },
            ].map((col, i) => (
              <Reveal key={col.label} delay={i * 90}>
                <div className="glass-card-dark rounded-[20px] md:rounded-[24px] p-5 md:p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold text-background-50">{col.label}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {col.items.map((x) => (
                      <li key={x} className="flex items-start gap-2 text-sm text-background-300 leading-relaxed">
                        <i className="ri-check-line text-primary-300 mt-0.5" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        </Container>
      </section>

      <section className="atmo-cream panel-section section-y">
        <Container>
        <Reveal>
          <div className="max-w-[24ch]">
            <p className="eyebrow text-primary-700">Process</p>
            <h2 className="t-section mt-3">How care works at EVLV.</h2>
          </div>
        </Reveal>
        <div className="mt-7 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="h-full glass-card glass-lift rounded-[26px] p-2.5 pb-6 flex flex-col">
                <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden glass-frame bg-background-200">
                  <img src={s.image} alt={s.alt} className="w-full h-full object-cover object-top" />
                </div>
                <div className="relative -mt-5 ml-4 w-11 h-11 rounded-full glass-inner flex items-center justify-center font-heading font-semibold text-primary-700">
                  {i + 1}
                </div>
                <div className="px-3.5">
                  <h3 className="font-heading text-lg font-semibold mt-4">{s.title}</h3>
                  <p className="text-sm text-foreground-600 mt-1.5 leading-relaxed">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        </Container>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 md:px-8 lg:px-12 pb-16 md:pb-20">
        <div className="glass-card rounded-[22px] md:rounded-[28px] p-5 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 md:gap-8 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-primary-700">Clinical standards</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mt-3">
              An expert network, a real pharmacy, and follow-up that continues.
            </h2>
            <p className="mt-3 text-foreground-600 leading-relaxed max-w-2xl">
              Every assessment is reviewed by a Wellness Optimisation Expert who works to national standards. Prescriptions are dispensed by a licensed pharmacy, and your care team stays with you through
              titration, refills and any adjustment along the way.
            </p>
          </div>
          <Link
            to="/contact"
            className="whitespace-nowrap justify-self-start lg:justify-self-end rounded-full bg-secondary-950 text-background-50 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-secondary-800"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </PageShell>
  );
}