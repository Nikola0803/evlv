import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { navTreatments, navMedications } from '@/mocks/home';
import Logo from '@/components/feature/Logo';
import SmartLink from '@/components/base/SmartLink';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [mTreatments, setMTreatments] = useState(true);
  const [mMeds, setMMeds] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="w-full bg-secondary-900 text-background-50">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-1.5 text-center text-[10.5px] leading-snug sm:px-5 sm:py-2 sm:text-xs md:px-8 md:text-sm">
          <strong>A better standard of wellness optimisation</strong>
          <span className="hidden sm:inline"> - </span>
          <Link to="/contact" className="hidden underline cursor-pointer whitespace-nowrap sm:inline sm:ml-1">
            Start your free assessment
          </Link>
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full">
      <div className="relative bg-background-50/95 backdrop-blur border-b border-background-200">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[54px] md:h-[68px]">
            <Link to="/" aria-label="EVLV home" className="flex items-center shrink-0 cursor-pointer">
              <Logo variant="dark" className="w-[70px] md:w-[96px] h-auto" />
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
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                  onClick={() => setOpen(!open)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-2xl cursor-pointer lg:hidden"
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
                    Answer six short questions and an expert reviews the result.
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
          <div className="absolute left-0 right-0 top-full z-40 h-[calc(100dvh-84px)] overflow-y-auto border-t border-background-200 bg-background-50 md:h-[calc(100dvh-68px)] lg:hidden">
            <div className="px-4 pt-4 pb-10 sm:px-5">
              <div className="relative overflow-hidden rounded-[22px] bg-secondary-900 px-5 py-5 text-background-50">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-heading text-[17px] font-semibold leading-tight">Download the EVLV app</p>
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-background-300">
                      Expert-reviewed care, check-ins and your protocol in one place.
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background-50/10 text-lg">
                    <i className="ri-smartphone-line" />
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    to="/contact"
                    onClick={close}
                    className="inline-flex items-center gap-1.5 rounded-full border border-background-50/25 px-3 py-1.5 text-[11px] font-medium text-background-50 cursor-pointer"
                  >
                    <i className="ri-apple-fill" /> App Store
                  </Link>
                  <Link
                    to="/contact"
                    onClick={close}
                    className="inline-flex items-center gap-1.5 rounded-full border border-background-50/25 px-3 py-1.5 text-[11px] font-medium text-background-50 cursor-pointer"
                  >
                    <i className="ri-google-play-fill" /> Google Play
                  </Link>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-full bg-secondary-100 px-4 py-2.5 text-[11.5px] text-secondary-900">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true">🦘</span> Australia owned and operated
                </span>
                <i className="ri-sparkling-2-line text-primary-700" />
              </div>

              <nav className="mt-4">
                <div className="border-b border-background-200">
                  <button
                    type="button"
                    onClick={() => setMTreatments(!mTreatments)}
                    aria-expanded={mTreatments}
                    className="flex w-full items-center justify-between gap-4 py-3.5 text-left cursor-pointer"
                  >
                    <span className="font-heading text-[15px] font-semibold text-foreground-950">Treatments</span>
                    <i
                      className={`text-lg text-foreground-500 transition-transform ${
                        mTreatments ? 'ri-subtract-line' : 'ri-add-line'
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      mTreatments ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="pb-3">
                        {navTreatments.map((l) => (
                          <li key={l.label}>
                            <Link
                              to={l.href}
                              onClick={close}
                              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-foreground-800 cursor-pointer hover:bg-background-100"
                            >
                              {l.label}
                              <i className="ri-arrow-right-up-line text-xs opacity-40" />
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            to="/treatments"
                            onClick={close}
                            className="px-3 pt-1 text-xs text-primary-700 underline cursor-pointer"
                          >
                            See all treatments
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-b border-background-200">
                  <button
                    type="button"
                    onClick={() => setMMeds(!mMeds)}
                    aria-expanded={mMeds}
                    className="flex w-full items-center justify-between gap-4 py-3.5 text-left cursor-pointer"
                  >
                    <span className="font-heading text-[15px] font-semibold text-foreground-950">Popular</span>
                    <i
                      className={`text-lg text-foreground-500 transition-transform ${
                        mMeds ? 'ri-subtract-line' : 'ri-add-line'
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      mMeds ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="pb-3">
                        {navMedications.map((l) => (
                          <li key={l.label}>
                            <SmartLink
                              href={l.href}
                              onClick={close}
                              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-foreground-800 cursor-pointer hover:bg-background-100"
                            >
                              {l.label}
                              <i className="ri-arrow-right-up-line text-xs opacity-40" />
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {[
                  { label: 'Shop', href: '/shop' },
                  { label: 'How it works', href: '/about' },
                  { label: 'FAQs', href: '/faq' },
                  { label: 'Contact us', href: '/contact' },
                ].map((l) => (
                  <Link
                    key={l.label}
                    to={l.href}
                    onClick={close}
                    className="flex items-center justify-between gap-4 border-b border-background-200 py-3.5 font-heading text-[15px] font-semibold text-foreground-950 cursor-pointer"
                  >
                    {l.label}
                    <i className="ri-arrow-right-s-line text-lg text-foreground-400" />
                  </Link>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-2.5">
                <Link
                  to="/contact"
                  onClick={close}
                  className="whitespace-nowrap rounded-full border border-secondary-300 px-5 py-3 text-center text-sm font-medium text-secondary-900 cursor-pointer"
                >
                  Book a consult
                </Link>
                <Link
                  to="/quiz"
                  onClick={close}
                  className="whitespace-nowrap rounded-full bg-primary-500 px-5 py-3 text-center text-sm font-semibold text-secondary-950 cursor-pointer"
                >
                  Take the quiz
                </Link>
              </div>

              <p className="mt-4 text-[10.5px] leading-relaxed text-foreground-500">
                EVLV is an Australian wellness optimisation service. RX peptides are prescribed only where appropriate.
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
}