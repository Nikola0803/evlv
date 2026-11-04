import type { ReactNode } from 'react';
import Reveal from '@/components/base/Reveal';
import Container from '@/components/base/Container';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  children?: ReactNode;
};

export default function PageIntro({ eyebrow, title, text, children }: Props) {
  return (
    <section className="atmo-cream panel-section pt-8 md:pt-16 pb-8 md:pb-14">
      <Container>
        <Reveal>
          <div className="w-full">
            {eyebrow && (
              <p className="eyebrow inline-flex items-center gap-2 text-primary-700 bg-background-50/70 border border-primary-800/12 rounded-full px-3 py-1.5">
                {eyebrow}
              </p>
            )}
            <h1 className="t-display mt-4 md:mt-5 w-full">{title}</h1>
            {text && (
              <p className="mt-4 md:mt-5 text-[13.5px] md:text-lg text-foreground-600 leading-relaxed max-w-2xl">
                {text}
              </p>
            )}
            {children && (
              <div className="mt-6 md:mt-7 flex flex-wrap gap-2.5 md:gap-3 [&>a]:w-full [&>a]:text-center sm:[&>a]:w-auto">
                {children}
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}