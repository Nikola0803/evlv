import { useState } from 'react';
import { goalsImage } from '@/mocks/home';
import Reveal from '@/components/base/Reveal';
import SmartLink from '@/components/base/SmartLink';
import Container from '@/components/base/Container';

export default function GoalsSection() {
  const [weight, setWeight] = useState(175);
  const lost = Math.round(weight * 0.222);
  const change = (d: number) => setWeight((w) => Math.min(350, Math.max(120, w + d)));
  return (
    <section className="atmo-plum panel-section text-background-50 section-y">
      <Container>
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-6">
          <div className="min-w-0">
            <p className="eyebrow text-primary-300">Tracked in app</p>
            <h2 className="t-section mt-2.5 md:mt-3">Your goals, conveniently tracked in one place.</h2>
          </div>
          <SmartLink
            href="/treatments?category=weight-loss"
            className="hidden md:inline-flex whitespace-nowrap self-start rounded-full bg-accent-500 text-foreground-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-accent-400"
          >
            Start your free assessment
          </SmartLink>
        </div>
      </Reveal>

      <div className="mt-6 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        <Reveal delay={80}>
          <div className="h-full glass-card-dark rounded-[22px] md:rounded-[28px] p-4 md:p-8">
            <p className="text-[15px] md:text-base font-medium text-background-200 leading-relaxed max-w-md">
              Semaglutides, Tirzepatides, Retatrutides, and Wellness Weight Loss programmes are available through EVLV as part of medically supervised care plans.
            </p>

            <div className="mt-6 glass-card rounded-2xl p-5 text-foreground-950">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading font-semibold text-base">Jamie</span>
                <span className="text-foreground-500 text-[11px]">Adjust meter</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] bg-primary-100 text-primary-800 rounded-full px-3 py-1">Current</span>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease weight"
                      onClick={() => change(-1)}
                      className="w-8 h-8 rounded-full bg-background-200 cursor-pointer flex items-center justify-center hover:bg-background-300"
                    >
                      <i className="ri-subtract-line" />
                    </button>
                    <span className="font-heading text-2xl font-semibold w-12 text-center tabular-nums">{weight}</span>
                    <button
                      type="button"
                      aria-label="Increase weight"
                      onClick={() => change(1)}
                      className="w-8 h-8 rounded-full bg-background-200 cursor-pointer flex items-center justify-center hover:bg-background-300"
                    >
                      <i className="ri-add-line" />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] bg-accent-100 text-accent-900 rounded-full px-3 py-1">Your potential</span>
                  <p className="mt-3 font-heading text-2xl font-semibold gold-text-deep tabular-nums">-{lost}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 glass-card rounded-2xl p-5 text-foreground-950">
              <p className="font-heading font-semibold text-sm">Your Progress</p>
              <svg
                viewBox="0 55 1080 310"
                className="mt-2 w-full"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="evlvChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" style={{ stopColor: 'oklch(var(--accent-500))', stopOpacity: 0.5 }} />
                    <stop offset="100%" style={{ stopColor: 'oklch(var(--accent-500))', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path
                  d="M 90 85 C 160 95, 220 145, 270 170 S 360 200, 450 215 S 540 230, 630 240 S 720 245, 810 250 S 900 255, 990 258 L 990 300 L 90 300 Z"
                  fill="url(#evlvChartGrad)"
                />
                <path
                  d="M 90 85 C 160 95, 220 145, 270 170 S 360 200, 450 215 S 540 230, 630 240 S 720 245, 810 250 S 900 255, 990 258"
                  fill="none"
                  style={{ stroke: 'oklch(var(--accent-600))' }}
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {([[90, 85], [270, 170], [450, 215], [630, 240], [810, 250], [990, 258]] as [number, number][]).map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r={20} style={{ fill: 'oklch(var(--accent-500))' }} fillOpacity={0.2} />
                    <circle cx={x} cy={y} r={9} fill="white" />
                    <circle cx={x} cy={y} r={5.5} style={{ fill: 'oklch(var(--accent-600))' }} />
                  </g>
                ))}
                {[90, 270, 450, 630, 810, 990].map((x, i) => (
                  <text
                    key={i}
                    x={x}
                    y={325}
                    textAnchor="middle"
                    fontSize={26}
                    fill="currentColor"
                    fillOpacity={0.4}
                    fontWeight={500}
                  >
                    W{i + 1}
                  </text>
                ))}
              </svg>
            </div>
            <p className="mt-4 text-[11px] text-background-400">For demonstration purposes only. Individual results may vary.</p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 md:gap-5">
          <Reveal delay={140}>
            <div className="w-full aspect-[16/10] rounded-[22px] md:rounded-[28px] overflow-hidden glass-frame">
              <img src={goalsImage} alt="Woman outdoors in activewear on a morning walk" className="w-full h-full object-cover object-center" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative overflow-hidden rounded-[22px] md:rounded-[28px] glass-gold text-secondary-950 p-5 md:p-8">
              <div className="relative z-10 max-w-sm">
                <h3 className="font-heading text-xl md:text-2xl font-semibold leading-tight">
                  See results in as little as one month.
                </h3>
                <p className="mt-2 text-sm text-secondary-900">
                  Clinically backed treatment means real progress. Often faster than you&apos;d expect.
                </p>
                <SmartLink
                  href="/treatments?category=weight-loss"
                  className="inline-block whitespace-nowrap mt-5 rounded-full bg-secondary-950 text-background-50 px-6 py-2.5 text-sm font-semibold cursor-pointer hover:bg-secondary-800"
                >
                  Get started
                </SmartLink>
              </div>
              <div className="pointer-events-none absolute -right-6 bottom-0 h-full w-1/2 hidden sm:block">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-500/40 to-transparent z-10" />
                <img src={goalsImage} alt="" className="w-full h-full object-cover object-top opacity-40" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      </Container>
    </section>
  );
}