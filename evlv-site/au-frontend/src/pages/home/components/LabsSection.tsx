import { useState } from 'react';
import { labsImage, labsWideImage } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function LabsSection() {
  const [age, setAge] = useState(29.4);
  const [alt, setAlt] = useState(55);
  const bio = (age - 3.6).toFixed(1);
  const inRange = alt <= 35;

  return (
    <section className="atmo-peach panel-section section-y">
      <Container>
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="min-w-0">
            <p className="eyebrow text-accent-800">Labs & testing</p>
            <h2 className="t-section mt-3 text-accent-950">Turning bloodwork into health insights.</h2>
          </div>
          <SmartLink
            href="/treatments/labs"
            className="whitespace-nowrap self-start rounded-full bg-foreground-950 text-background-50 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-foreground-900"
          >
            Get started
          </SmartLink>
        </div>
      </Reveal>

      <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Reveal delay={70}>
          <div className="h-full glass-card glass-lift rounded-[28px] p-6 md:p-8 flex flex-col justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="font-heading text-xl md:text-2xl font-semibold leading-tight">
                  50 biomarkers. One clear picture.
                </h3>
                <p className="mt-2 text-sm text-foreground-600 leading-relaxed">
                  Your results are reviewed by a licensed provider and explained in plain language.
                </p>
                <SmartLink
                  href="/treatments/labs"
                  className="inline-block whitespace-nowrap mt-5 rounded-full bg-primary-500 text-secondary-950 px-6 py-2.5 text-sm font-semibold cursor-pointer hover:bg-primary-400"
                >
                  Get started
                </SmartLink>
              </div>
              <div className="w-full sm:w-[210px] aspect-[4/5] rounded-2xl overflow-hidden shrink-0 glass-frame">
                <img src={labsImage} alt="Woman checking lab results in the EVLV app" className="w-full h-full object-cover object-center" />
              </div>
            </div>
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden glass-frame">
              <img src={labsWideImage} alt="Blood test tube beside a printed lab report" className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="h-full glass-card glass-lift rounded-[28px] p-6 md:p-8">
            <h3 className="font-heading text-xl md:text-2xl font-semibold leading-tight">
              What are your health markers telling you?
            </h3>
            <p className="mt-2 text-sm text-foreground-600 leading-relaxed">
              From hormones to inflammation to biological age, get a complete picture of what&apos;s actually going on
              inside.
            </p>

            <div className="mt-5 glass-inner rounded-2xl p-5 flex flex-wrap justify-between items-end gap-4">
              <div>
                <p className="text-xs text-secondary-800">Actual age</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease age"
                    onClick={() => setAge(Math.max(18, +(age - 0.1).toFixed(1)))}
                    className="w-8 h-8 rounded-full bg-background-50 cursor-pointer flex items-center justify-center"
                  >
                    <i className="ri-subtract-line" />
                  </button>
                  <span className="font-heading text-xl font-semibold w-14 text-center tabular-nums">{age.toFixed(1)}</span>
                  <button
                    type="button"
                    aria-label="Increase age"
                    onClick={() => setAge(Math.min(90, +(age + 0.1).toFixed(1)))}
                    className="w-8 h-8 rounded-full bg-background-50 cursor-pointer flex items-center justify-center"
                  >
                    <i className="ri-add-line" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-secondary-800">Biological age</p>
                <p className="mt-2 font-heading text-xl font-semibold text-primary-700 tabular-nums">{bio}</p>
              </div>
            </div>

            <div className="mt-4 glass-inner rounded-2xl p-5">
              <p className="text-sm font-heading font-semibold">
                Liver Function (ALT) · {alt} U/L
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={alt}
                onChange={(e) => setAlt(Number(e.target.value))}
                aria-label="ALT level"
                className="w-full mt-4 accent-primary-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-secondary-800">
                <span>0</span>
                <span>35 (threshold)</span>
                <span>100+</span>
              </div>
              <p className="mt-3 text-xs text-secondary-900 leading-relaxed">
                Your ALT level is <strong>{inRange ? 'in range' : 'out of range'}</strong>.{' '}
                {inRange
                  ? 'Your provider will review your result with you.'
                  : 'Elevated liver enzymes (ALT) can have several causes. Your provider will review your result and reach out to talk about next steps.'}
              </p>
            </div>
            <p className="mt-3 text-[11px] text-foreground-500">
              For demonstration purposes only. Individual results may vary.
            </p>
          </div>
        </Reveal>
      </div>
      </Container>
    </section>
  );
}