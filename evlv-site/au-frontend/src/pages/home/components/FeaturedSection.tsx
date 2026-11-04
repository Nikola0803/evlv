import { treatments, timeline, bentoPackShot } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function FeaturedSection() {
  const featured = treatments[0];
  const options = treatments.slice(0, 4);

  return (
    <section className="atmo-purple panel-section text-background-50 section-y">
      <Container>
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="t-section">EVLV has the treatment you need to live life how you want.</h2>
            <p className="mt-3 md:mt-4 text-[13px] md:text-base text-primary-200">
              Pick a formulation and see how the first month looks.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-7 md:mt-10 rounded-[22px] md:rounded-[30px] bg-background-50 text-foreground-950 p-4 md:p-9">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-10 items-center">
              <div className="relative aspect-[4/3] rounded-[16px] md:rounded-[22px] overflow-hidden bg-background-100">
                <img
                  src={bentoPackShot}
                  alt="EVLV pre-filled injection pen with its warm ivory carton"
                  title={`${featured.name} ${featured.type}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.16em] text-foreground-500">
                  {featured.type} · {featured.name}
                </p>
                <p className="mt-2 font-heading text-xl md:text-3xl font-semibold text-foreground-950">
                  From {featured.price}
                  <sup className="text-sm align-super">{featured.cents}</sup>
                  <span className="ml-2 text-sm font-normal text-foreground-500">per piece</span>
                </p>

                <div className="mt-4 md:mt-5 flex flex-wrap gap-1.5 md:gap-2">
                  {options.map((o, i) => (
                    <SmartLink
                      key={o.name}
                      href={o.href}
                      className={`whitespace-nowrap rounded-full px-3.5 md:px-4 py-1.5 md:py-2 text-[11px] md:text-xs font-medium cursor-pointer transition-colors ${
                        i === 0
                          ? 'bg-foreground-950 text-background-50'
                          : 'border border-foreground-950/15 text-foreground-800 hover:bg-background-100'
                      }`}
                    >
                      {o.name}
                    </SmartLink>
                  ))}
                </div>

                <div className="mt-6 md:mt-8">
                  <div className="relative grid grid-cols-3 gap-1">
                    <span className="absolute top-[7px] left-[12%] right-[12%] h-px bg-foreground-950/15" />
                    {timeline.map((t) => (
                      <div key={t.badge} className="relative flex flex-col items-center text-center">
                        <span className="w-3.5 h-3.5 rounded-full bg-foreground-950 ring-4 ring-background-50" />
                        <span className="mt-3 text-[10px] uppercase tracking-[0.1em] text-foreground-500">
                          {t.badge}
                        </span>
                        <span className="mt-1 text-xs text-foreground-800">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-2.5 md:gap-3">
                  <SmartLink
                    href={featured.href}
                    className="whitespace-nowrap rounded-full border border-foreground-950/20 px-6 py-3 text-center text-sm font-medium text-foreground-900 cursor-pointer hover:bg-background-100"
                  >
                    Learn more
                  </SmartLink>
                  <SmartLink
                    href="/treatments"
                    className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-center text-sm font-semibold cursor-pointer hover:bg-primary-400"
                  >
                    Get started
                  </SmartLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}