import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

export default function SmartLink({ href, className, children, ariaLabel }: Props) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}