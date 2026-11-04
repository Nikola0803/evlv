import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navTreatments, navMedications } from '@/mocks/home';
import Logo from '@/components/feature/Logo';
import SmartLink from '@/components/base/SmartLink';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-secondary-900 text-background-50 text-xs md:text-sm">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 py-2 text-center">
          <strong>A better standard of wellness optimisation</strong> -{' '}
          <Link to="/contact" className="underline cursor-pointer whitespace-nowrap">
            Start your free assessment
          </Link>
        </div>
      </div>
      <div className="bg-background-50/95 backdrop-blur border-b border-background-200">
        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[68px]">
            <Link to="/" aria-label="EVLV home" className="flex items-center shrink-0 cursor-pointer">
              <Logo variant="dark" className="w-[86px] md:w-[96px] h-auto" />
            </Link>

            <div className="ml-auto flex items-center gap-4 lg:gap-7">
              <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                <div
                  className="relative flex h-[68px] items-center"
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                >
                  <button type="button" className="flex items-center gap-1 whitespace-nowrap cursor-pointer">
                    Treatments <i className="ri-arrow-down-s-line" />
                  </button>
                </div>
                <Link to="/shop" className="whitespace-nowrap hover:text-primary-600 cursor-pointer">
                  Shop
                </Link>
                <Link to="/about" className="whitespace-nowrap hover:text-primary-600 cursor-pointer">
                  How it works
                </Link>
                <Link to="/faq" className="whitespace-nowrap hover:text-primary-600 cursor-pointer">
                  FAQs
                </Link>
              </nav>

              <div className="flex items-center gap-3">
                <span className="hidden xl:inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-secondary-100 py-1 pl-1.5 pr-3 text-xs text-secondary-900">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-background-50 text-[13px] leading-none"
                    aria-hidden="true"
                  >
                    🦘
                  </span>
                  Australia owned and operated
                </span>
                <Link
                  to="/contact"
                  className="hidden whitespace-nowrap rounded-full border border-secondary-300 px-5 py-2 text-sm font-medium text-secondary-900 cursor-pointer hover:bg-secondary-100 md:inline-flex"
                >
                  Book a consult
                </Link>
                <Link
                  to="/quiz"
                  className="hidden whitespace-nowrap rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-secondary-950 cursor-pointer hover:bg-primary-400 md:inline-flex"
                >
                  Take the quiz
                </Link>
                <button
                  type="button"
                  aria-label="Menu"
                  onClick={() => setOpen(!open)}
                  className="flex h-10 w-10 items-center justify-center text-2xl cursor-pointer lg:hidden"
                >
                  <i className={open ? 'ri-close-line' : 'ri-menu-line'} />
                </button>
              </div>
            </div>
          </div>

          {mega && (
            <div
              className="absolute left-5 right-5 top-full hidden max-h-[calc(100vh-140px)] overflow-hidden rounded-[26px] border border-background-200 bg-background-50 shadow-[0_30px_80px_-40px_rgba(20,20,20,0.45)] md:left-8 md:right-8 lg:left-12 lg:right-12 lg:grid lg:grid-cols-[1.5fr_1fr]"
              onMouseEnter={() => setMega(true)}
              onMouseLeave={() => setMega(false)}
            >
              <div className="grid grid-cols-2 gap-6 p-6">
                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-foreground-500">Categories</p>
                  <ul className="space-y-1">
                    {navTreatments.map((l) => (
                      <li key={l.label}>
                        <Link
                          to={l.href}
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-sm cursor-pointer hover:bg-background-100 hover:text-secondary-950"
                        >
                          {l.label}
                          <i className="ri-arrow-right-up-line text-xs opacity-40" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/treatments"
                    className="mt-3 inline-flex items-center gap-1 px-3 text-xs text-primary-700 underline cursor-pointer"
                  >
                    See all treatments
                  </Link>
                </div>
                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-foreground-500">Popular</p>
                  <ul className="space-y-1">
                    {navMedications.map((l) => (
                      <li key={l.label}>
                        <Link
                          to={l.href}
                          className="block rounded-xl px-3 py-2 text-sm cursor-pointer hover:bg-background-100 hover:text-secondary-950"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative flex min-h-[280px] flex-col justify-end bg-secondary-900 p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/60 to-transparent z-10" />
                <div className="relative z-20 text-background-50">
                  <p className="font-heading text-lg font-semibold leading-tight">
                    Not sure where
                    <br />
                    to start?
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-background-300">
                    Not sure where to start? Answer six short questions and a licensed provider reviews the result.
                  </p>
                  <Link
                    to="/quiz"
                    className="mt-3 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-accent-500 px-4 py-2 text-xs font-semibold text-foreground-950 cursor-pointer hover:bg-accent-400"
                  >
                    Take the quiz
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {open && (
          <div className="border-t border-background-200 bg-background-50 lg:hidden">
            <div className="mx-auto w-full max-w-[1440px] space-y-4 px-5 py-4 text-sm md:px-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-foreground-500">Treatments</p>
                <div className="grid grid-cols-2 gap-2">
                  {navTreatments.map((l) => (
                    <Link key={l.label} to={l.href} className="cursor-pointer">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {navMedications.map((l) => (
                  <SmartLink key={l.label} href={l.href} className="cursor-pointer text-foreground-700">
                    {l.label}
                  </SmartLink>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-1 text-foreground-700">
                <Link to="/shop" className="cursor-pointer">
                  Shop
                </Link>
                <Link to="/about" className="cursor-pointer">
                  How it works
                </Link>
                <Link to="/faq" className="cursor-pointer">
                  FAQs
                </Link>
                <Link to="/legal/terms" className="cursor-pointer">
                  Terms
                </Link>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="whitespace-nowrap rounded-full border border-secondary-300 px-5 py-2 text-center text-secondary-900 cursor-pointer"
                >
                  Book a consult
                </Link>
                <Link
                  to="/quiz"
                  className="whitespace-nowrap rounded-full bg-primary-500 px-5 py-2 text-center font-semibold text-secondary-950 cursor-pointer"
                >
                  Take the quiz
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}