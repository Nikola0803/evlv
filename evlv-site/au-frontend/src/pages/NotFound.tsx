import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="atmo-dark relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center text-background-50">
      <p className="font-heading text-[26vw] md:text-[18vw] font-bold leading-[0.72] tracking-tighter text-primary-400/25 select-none">
        404
      </p>
      <div className="relative z-10 -mt-10 md:-mt-16">
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">This page hasn&apos;t been built yet</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-background-300">
          The page you&apos;re looking for isn&apos;t part of the site yet. Head back to the homepage, or ask us to build it.
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-secondary-950 cursor-pointer hover:bg-primary-400"
        >
          Back to homepage <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </div>
  );
}