import { useState } from 'react';
import { labsImage } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

const panelMarkers = [
  { label: 'Metabolic', value: '18 markers', state: 'In range' },
  { label: 'Hormones', value: '12 markers', state: 'In range' },
  { label: 'Inflammation', value: '6 markers', state: 'Review' },
  { label: 'Nutrients', value: '14 markers', state: 'In range' },
];

export default function LabsSection() {
  const [age, setAge] = useState(29.4);
  const [alt, setAlt] = useState(55);
  const bio = (age - 3.6).toFixed(1);
  const inRange = alt <= 35;

  return (
    <section className="atmo-apricot panel-section section-y">
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div className="min-w-0">
              <p className="eyebrow text-primary-900">Labs</p>
              <h2 className="t-section mt-2.5 md:mt-3 text-foreground-950">
                Turning bloodwork into health insights and data.
              </h2>
            </div>
            <SmartLink
              href="/treatments/labs"
              className="hidden md:inline-flex whitespace-nowrap self-start rounded-full border border-foreground-950/25 px-6 py-3 text-sm font-semibold text-foreground-950 cursor-pointer hover:bg-foreground-950/5"
            >
              Our panel
            </SmartLink>
          </div>
        </Reveal>

        <div className="mt-6 md:mt-14 grid grid-cols-1 lg:grid-cols-[1.05fr_0.85fr_1.1fr] gap-3 md:gap-4 items-stretch">
          <Reveal delay={60}>
            <div className="h-full rounded-[22px] md:rounded-[28px] bg-background-50/80 p-5 md:p-7 flex flex-col ring-1 ring-foreground-950/5">
              <h3 className="font-heading text-lg md:text-2xl font-semibold leading-tight text-foreground-950">
                50 biomarkers.
                <br />
                One clear picture.
              </h3>
              <p className="mt-2.5 md:mt-3 text-[13px] md:text-sm text-foreground-600 leading-relaxed">
                Your results are reviewed by your expert and explained in plain language, so you know what each number
                actually means.
              </p>
              <SmartLink
                href="/treatments/labs"
                className="inline-block self-start whitespace-nowrap mt-5 rounded-full bg-foreground-950 text-background-50 px-6 py-2.5 text-sm font-semibold cursor-pointer hover:bg-foreground-900"
              >
                Get started
              </SmartLink>
              <div className="mt-5 md:mt-6 w-full flex-1 min-h-[200px] md:min-h-[220px] rounded-2xl overflow-hidden glass-frame">
                <img
                  src={labsImage}
                  alt="Woman reviewing her EVLV lab results at home"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="h-full flex items-end justify-center pt-3 md:pt-6">
              <div className="w-[212px] md:w-[248px] rounded-[32px] md:rounded-[36px] bg-foreground-950 p-2 shadow-[0_30px_60px_-32px_rgba(0,0,0,0.5)]">
                <div className="rounded-[28px] bg-background-50 overflow-hidden">
                  <div className="h-7 flex items-center justify-center">
                    <span className="w-12 h-1 rounded-full bg-foreground-300" />
                  </div>
                  <div className="px-4 pb-5">
                    <p className="text-[9px] uppercase tracking-[0.14em] text-foreground-500">Lab results</p>
                    <p className="font-heading text-sm font-semibold text-foreground-950 mt-1">Jamie&apos;s panel</p>

                    <div className="mt-3 rounded-xl bg-secondary-200/60 p-3">
                      <p className="text-[9px] text-foreground-600">Biological age</p>
                      <p className="font-heading text-lg font-semibold text-primary-800 leading-tight">29.4</p>
                    </div>

                    <div className="mt-3 space-y-2">
                      {panelMarkers.map((m) => (
                        <div key={m.label} className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[10px] font-medium text-foreground-900 truncate">{m.label}</p>
                            <p className="text-[8px] text-foreground-500">{m.value}</p>
                          </div>
                          <span
                            className={`text-[8px] px-2 py-[2px] rounded-full whitespace-nowrap ${
                              m.state === 'Review'
                                ? 'bg-accent-200 text-accent-900'
                                : 'bg-primary-100 text-primary-800'
                            }`}
                          >
                            {m.state}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-xl bg-background-100 p-3">
                      <p className="text-[9px] text-foreground-600">Trend</p>
                      <div className="mt-2 flex items-end gap-1 h-10">
                        {[70, 62, 55, 48, 40, 34].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-primary-600 to-primary-300"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="h-full rounded-[22px] md:rounded-[28px] bg-background-50 p-5 md:p-7">
              <h3 className="font-heading text-lg md:text-2xl font-semibold leading-tight text-foreground-950">
                What are your health markers telling you?
              </h3>
              <p className="mt-2.5 md:mt-3 text-[13px] md:text-sm text-foreground-600 leading-relaxed">
                From hormones to inflammation to biological age, get a complete picture of what&apos;s actually going on
                inside.
              </p>

              <div className="mt-4 md:mt-5 rounded-2xl bg-secondary-100/70 p-4 md:p-5 flex flex-wrap justify-between items-end gap-4">
                <div>
                  <p className="text-xs text-secondary-800">Actual age</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease age"
                      onClick={() => setAge(Math.max(18, +(age - 0.1).toFixed(1)))}
                      className="w-8 h-8 rounded-full bg-background-50 cursor-pointer flex items-center justify-center hover:bg-background-100"
                    >
                      <i className="ri-subtract-line" />
                    </button>
                    <span className="font-heading text-xl font-semibold w-14 text-center tabular-nums text-foreground-950">
                      {age.toFixed(1)}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase age"
                      onClick={() => setAge(Math.min(90, +(age + 0.1).toFixed(1)))}
                      className="w-8 h-8 rounded-full bg-background-50 cursor-pointer flex items-center justify-center hover:bg-background-100"
                    >
                      <i className="ri-add-line" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-secondary-800">Biological age</p>
                  <p className="mt-2 font-heading text-xl font-semibold text-primary-800 tabular-nums">{bio}</p>
                </div>
              </div>

              <div className="mt-3 md:mt-4 rounded-2xl bg-background-100 p-4 md:p-5">
                <p className="text-sm font-heading font-semibold text-foreground-950">
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
                <div className="flex justify-between text-[10px] text-foreground-500">
                  <span>0</span>
                  <span>35 (threshold)</span>
                  <span>100+</span>
                </div>
                <p className="mt-3 text-xs text-foreground-700 leading-relaxed">
                  Your ALT level is <strong>{inRange ? 'in range' : 'out of range'}</strong>.{' '}
                  {inRange
                    ? 'Your expert will review your result with you.'
                    : 'Elevated liver enzymes (ALT) can have several causes. Your expert will review your result and reach out to talk about next steps.'}
                </p>
              </div>
              <p className="mt-3 text-[11px] text-foreground-500">
                For demonstration purposes only. Individual results may vary.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 md:hidden">
          <SmartLink
            href="/treatments/labs"
            className="block whitespace-nowrap rounded-full bg-foreground-950 px-6 py-3 text-center text-sm font-semibold text-background-50 cursor-pointer"
          >
            Start your labs
          </SmartLink>
        </div>
      </Container>
    </section>
  );
}