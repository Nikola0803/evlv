import { privacyCards, privacyBackdrop } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';

export default function PrivacySection() {
  return (
    <section className="relative overflow-hidden panel-section bg-foreground-950 text-background-50 section-y">
      <div className="absolute inset-0 z-0">
        <img src={privacyBackdrop} alt="" aria-hidden="true" className="w-full h-full object-cover object-center opacity-[0.18]" />
        <div className="absolute inset-0 bg-foreground-950/55" />
      </div>
      <img
        src="https://cdn.prod.website-files.com/67ab626233e66749b69fc19f/6a315e927f5762dd7b9cb111_rvn-spiral-dots-anim.gif"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -right-8 w-64 md:w-80 opacity-20 z-10"
      />
      <div className="relative z-20">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="t-section">Your data stays yours. Full stop.</h2>
            <p className="mt-3 md:mt-4 text-[13px] md:text-base text-background-300 leading-relaxed">
              No third-party data brokers. No marketing partners. Your health information is used for one thing: your care.
            </p>
          </div>
        </Reveal>

        <div className="mt-7 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {privacyCards.map((c, i) => (
            <Reveal key={c.text} delay={i * 90}>
              <div className="group h-full rounded-[20px] md:rounded-[24px] border border-background-50/15 bg-background-50/[0.06] backdrop-blur-md p-5 md:p-8 min-h-0 md:min-h-[300px] flex flex-col items-center text-center">
                <div className="flex items-center justify-center py-4 md:flex-1 md:py-6">
                  <div className="w-[76px] h-[76px] md:w-24 md:h-24 flex items-center justify-center rounded-full border border-background-50/15 text-[32px] md:text-4xl text-primary-200 transition-transform duration-500 group-hover:scale-105">
                    <i className={c.icon} />
                  </div>
                </div>
                <p className="mt-1 md:mt-0 text-[13px] md:text-[15px] leading-relaxed text-background-200">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      </div>
    </section>
  );
}