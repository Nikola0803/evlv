import { Link } from 'react-router-dom';
import type { MouseEvent, ReactNode } from 'react';

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
};

export default function SmartLink({ href, className, children, ariaLabel, onClick }: Props) {
  const handle = (_e: MouseEvent<HTMLElement>) => {
    if (onClick) onClick();
  };

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} aria-label={ariaLabel} onClick={handle}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={handle}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}