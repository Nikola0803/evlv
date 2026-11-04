import { timeline, featuredBannerImage } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function FeaturedSection() {
  return (
    <section className="atmo-purple panel-section text-background-50 section-y">
      <Container>
      <Reveal>
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow text-primary-300">Featured treatment</p>
          <h2 className="t-section mt-3">
            EVLV has the treatment you need to live life how you want.
          </h2>
          <p className="mt-4 text-primary-200">What to expect with GLP-1 · Semaglutide</p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 w-full aspect-[16/9] md:aspect-[21/9] rounded-[28px] overflow-hidden glass-frame">
          <img
            src={featuredBannerImage}
            alt="Woman receiving her GLP-1 treatment parcel at home"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </Reveal>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <SmartLink
          href="/treatments/glp-1"
          className="whitespace-nowrap rounded-full border border-background-50/70 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-background-50/10"
        >
          Learn more
        </SmartLink>
        <SmartLink
          href="/treatments"
          className="whitespace-nowrap rounded-full bg-accent-500 text-foreground-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-accent-400"
        >
          Get started
        </SmartLink>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 relative max-w-4xl mx-auto">
        <div className="hidden md:block absolute top-[26px] left-[17%] right-[17%] h-px bg-primary-300/50" />
        {timeline.map((t) => (
          <div key={t.badge} className="flex flex-col items-center text-center relative">
            <span className="text-[11px] rounded-full border border-primary-200/45 bg-background-50/10 px-3 py-1 text-primary-100 backdrop-blur-sm">{t.badge}</span>
            <span className="w-3.5 h-3.5 rounded-full bg-background-50 my-3 ring-4 ring-primary-700/40" />
            <span className="text-sm text-background-100">{t.label}</span>
          </div>
        ))}
      </div>
      </Container>
    </section>
  );
}