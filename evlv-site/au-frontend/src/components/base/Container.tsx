import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Single content grid for the whole site.
 * Section backgrounds stay full-bleed; this keeps every section's content
 * aligned to the same column so nothing looks cropped or off-centre.
 */
export default function Container({ children, className = '' }: Props) {
  return <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-5 md:px-8 lg:px-12 ${className}`}>{children}</div>;
}