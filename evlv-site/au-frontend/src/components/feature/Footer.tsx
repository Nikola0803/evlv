import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { footerColumns } from '@/mocks/home';
import SmartLink from '@/components/base/SmartLink';
import Logo from '@/components/feature/Logo';
import Container from '@/components/base/Container';

export default function Footer() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok'>('idle');
  const [formError, setFormError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const trap = String(fd.get('website_alt') || '').trim();
    if (trap) {
      setStatus('ok');
      return;
    }
    fd.delete('website_alt');
    const email = String(fd.get('email') || '').trim();
    if (!email) {
      setFormError('Please enter your email address.');
      return;
    }
    setFormError('');
    setStatus('sending');
    try {
      const body = new URLSearchParams();
      fd.forEach((v, k) => body.append(k, String(v)));
      const res = await fetch('https://readdy.ai/api/form/dbkq4eebe8r9umpnnr7g', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      const text = await res.text();
      let parsed: { code?: string; message?: string; meta?: { message?: string; detail?: string } } | null = null;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }
      const msg = parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || text;
      if (res.ok && parsed?.code === 'OK' && !/spam/i.test(msg || '')) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('idle');
        setFormError(msg || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('idle');
      setFormError('Network error. Please try again.');
    }
  };

  return (
    <footer className="atmo-footer panel-section text-background-50">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="max-w-sm">
            <Link to="/" aria-label="EVLV home" className="inline-flex items-center cursor-pointer">
              <Logo variant="light" className="w-[88px] h-auto" />
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-background-300">
              Wellness optimisation for women across Australia, including prescribed RX peptides. Every protocol is reviewed by a
              licensed provider before anything is dispensed.
            </p>

            <h4 className="mt-6 font-heading text-base font-semibold">Expert tips on everyday health</h4>
            <p className="mt-1 text-[12px] text-background-400">
              Short, useful notes. Unsubscribe whenever you like.
            </p>

            {status === 'ok' ? (
              <p className="mt-4 rounded-2xl border border-primary-400/40 bg-primary-500/25 px-4 py-3 text-[13px]">
                Thank you! Your submission has been received.
              </p>
            ) : (
              <form id="newsletter-footer" data-readdy-form onSubmit={onSubmit} className="mt-3">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    className="w-full min-w-0 box-border rounded-full border border-secondary-600 bg-secondary-800/80 px-4 py-2.5 text-[13px] text-background-50 outline-none placeholder:text-background-400 focus:border-accent-400"
                  />
                  <input
                    type="text"
                    name="website_alt"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    readOnly
                    className="field-extra"
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="whitespace-nowrap rounded-full bg-accent-500 px-5 py-2.5 text-[13px] font-semibold text-foreground-950 cursor-pointer hover:bg-accent-400 disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending...' : 'Subscribe'}
                  </button>
                </div>
                {formError && <p className="mt-2 text-[12px] text-accent-300">{formError}</p>}
                <p className="mt-2 text-[11px] leading-relaxed text-background-400">
                  By signing up you agree to receive emails from EVLV and accept the{' '}
                  <Link to="/legal/terms" className="underline cursor-pointer hover:text-background-200">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/legal/privacy" className="underline cursor-pointer hover:text-background-200">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-background-300">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 cursor-pointer hover:text-background-50"
              >
                <i className="ri-message-2-line text-sm" /> Book a consult
              </Link>
              <Link to="/faq" className="inline-flex items-center gap-1.5 cursor-pointer hover:text-background-50">
                <i className="ri-question-line text-sm" /> Read the FAQs
              </Link>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-200">{col.title}</h4>
              <ul className="space-y-2 text-[13px] text-background-300">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href} className="cursor-pointer hover:text-background-50">
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-secondary-700/60 pt-5 text-[11px] leading-relaxed text-background-400 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl">
            <strong className="text-background-200">
              <em>EVLV is not a pharmacy or drug manufacturer.</em>
            </strong>{' '}
            Prescription products, including RX peptides, require an online consultation with a licensed healthcare
            practitioner who will determine whether a prescription is appropriate. EVLV is an Australian wellness
            optimisation service.
          </p>
          <div className="flex shrink-0 flex-col gap-1 sm:text-right">
            <span className="text-background-300">Wellness optimisation for women, Australia wide</span>
            <span>© {new Date().getFullYear()} EVLV. All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}