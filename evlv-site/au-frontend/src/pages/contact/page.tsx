import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageShell from '@/components/feature/PageShell';
import PageIntro from '@/components/feature/PageIntro';
import { careCategories, treatmentDetails } from '@/mocks/catalog';
import { shopProducts } from '@/mocks/shop';

const FORM_URL = 'https://readdy.ai/api/form/dbksbo6smf5femiju5og';

const states = [
  'New South Wales',
  'Victoria',
  'Queensland',
  'Western Australia',
  'South Australia',
  'Tasmania',
  'Australian Capital Territory',
  'Northern Territory',
  'Other / not listed',
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok'>('idle');
  const [formError, setFormError] = useState('');

  const chosen = treatmentDetails.find((t) => t.slug === searchParams.get('treatment'));
  const chosenProduct = shopProducts.find((p) => p.slug === searchParams.get('product'));
  const chosenCategory = chosen ? careCategories.find((c) => c.slug === chosen.category) : undefined;
  const isDirectBuy = searchParams.get('intent') === 'buy';
  const requestedName = chosen
    ? `${chosen.name}${chosen.generic ? ` (${chosen.generic})` : ''}`
    : chosenProduct
      ? `${chosenProduct.name} ${chosenProduct.size}`
      : '';

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

    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();
    if (!name || !email || !message) {
      setFormError('Please add your name, email, and a short message.');
      return;
    }

    setFormError('');
    setStatus('sending');
    try {
      const body = new URLSearchParams();
      fd.forEach((v, k) => body.append(k, String(v)));
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      const responseText = await res.text();
      let parsed: { code?: string; message?: string; meta?: { message?: string; detail?: string } } | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }
      const serverMsg =
        parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText || '';
      const failed = !res.ok || parsed?.code !== 'OK' || /spam/i.test(serverMsg);
      if (failed) {
        setStatus('idle');
        setFormError(serverMsg || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('idle');
      setFormError('Network error. Please try again.');
    }
  };

  return (
    <PageShell>
      <PageIntro
        eyebrow="Contact"
        title={
          <>
            Start with a question.
            <br />
            We will take it from there.
          </>
        }
        text="Tell us what is going on and a member of the EVLV care team will point you in the right direction. No pressure, no sales script."
      />

      <section className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 pb-20 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
        <div className="glass-card rounded-[28px] p-6 md:p-9 mt-6 lg:mt-0">
          {(chosen || chosenProduct) && status !== 'ok' && (
            <div className="mb-6 flex items-start gap-3 rounded-[20px] border border-primary-800/12 bg-background-50/70 px-4 py-3.5">
              <span className="w-8 h-8 shrink-0 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center text-base">
                <i className="ri-file-list-3-line" />
              </span>
              <p className="text-[12.5px] leading-relaxed text-foreground-600">
                You are here about <strong className="font-semibold text-foreground-900">{requestedName}</strong>.
                {isDirectBuy
                  ? ' Send your details and a wellness optimisation specialist will confirm your order — they will call you if anything needs clarifying.'
                  : ' Send your details and a wellness optimisation specialist will review them and call you if anything needs clarifying.'}
              </p>
            </div>
          )}
          {status === 'ok' ? (
            <div className="py-10 text-center">
              <span className="w-14 h-14 rounded-full glass-inner flex items-center justify-center text-2xl text-primary-700 mx-auto">
                <i className="ri-check-line" />
              </span>
              <h2 className="font-heading text-2xl font-semibold mt-5">Message received.</h2>
              <p className="mt-2 text-sm text-foreground-600 max-w-sm mx-auto leading-relaxed">
                Thank you — someone from the care team will be in touch. If you need urgent medical help, call 000 or
                your local emergency line.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 whitespace-nowrap rounded-full border border-primary-500 text-primary-700 px-5 py-2.5 text-sm font-medium cursor-pointer hover:bg-primary-50"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form id="evlv-contact" data-readdy-form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="min-w-0">
                  <label htmlFor="contact-name" className="block text-xs font-medium text-foreground-700 mb-1.5">
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jordan Smith"
                    className="w-full box-border min-w-0 rounded-xl bg-background-50/80 border border-primary-800/15 px-4 py-3 text-sm outline-none focus:border-primary-500"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor="contact-email" className="block text-xs font-medium text-foreground-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    className="w-full box-border min-w-0 rounded-xl bg-background-50/80 border border-primary-800/15 px-4 py-3 text-sm outline-none focus:border-primary-500"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor="contact-phone" className="block text-xs font-medium text-foreground-700 mb-1.5">
                    Phone <span className="text-foreground-400">(optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="0400 000 000"
                    className="w-full box-border min-w-0 rounded-xl bg-background-50/80 border border-primary-800/15 px-4 py-3 text-sm outline-none focus:border-primary-500"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor="contact-state" className="block text-xs font-medium text-foreground-700 mb-1.5">
                    State or territory
                  </label>
                  <select
                    id="contact-state"
                    name="state"
                    defaultValue=""
                    className="w-full box-border min-w-0 rounded-xl bg-background-50/80 border border-primary-800/15 px-4 py-3 text-sm outline-none focus:border-primary-500 cursor-pointer"
                  >
                    <option value="">Select your state or territory</option>
                    {states.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="min-w-0">
                <label htmlFor="contact-interest" className="block text-xs font-medium text-foreground-700 mb-1.5">
                  What are you interested in?
                </label>
                <select
                  id="contact-interest"
                  name="interest"
                  defaultValue={chosenCategory?.label ?? ''}
                  className="w-full box-border min-w-0 rounded-xl bg-background-50/80 border border-primary-800/15 px-4 py-3 text-sm outline-none focus:border-primary-500 cursor-pointer"
                >
                  <option value="">Not sure yet</option>
                  {careCategories.map((c) => (
                    <option key={c.slug} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
              </div>

              <div className="min-w-0">
                <label htmlFor="contact-message" className="block text-xs font-medium text-foreground-700 mb-1.5">
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={500}
                  rows={5}
                  placeholder="Tell us a little about what you are looking for."
                  className="w-full box-border min-w-0 rounded-xl bg-background-50/80 border border-primary-800/15 px-4 py-3 text-sm outline-none focus:border-primary-500 resize-none"
                />
                <p className="mt-1.5 text-[11px] text-foreground-500">Up to 500 characters.</p>
              </div>

              {(chosen || chosenProduct) && <input type="hidden" name="treatment" value={requestedName} />}

              <input
                type="text"
                name="website_alt"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                readOnly
                className="field-extra"
              />

              {formError && (
                <p className="rounded-xl border border-accent-300/60 bg-accent-50/70 px-4 py-3 text-sm text-accent-900">
                  {formError}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[11px] text-foreground-500 leading-relaxed max-w-xs">
                  By sending this you agree to be contacted about your enquiry. Please do not include sensitive
                  medical details here.
                </p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-7 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-5">
          <div className="atmo-purple text-background-50 rounded-[28px] p-7">
            <h2 className="font-heading text-xl font-semibold">What happens next</h2>
            <ol className="mt-5 space-y-4">
              {[
                'We read your message and route it to the right person.',
                'A wellness optimisation specialist reviews your answers and calls you if anything needs clarifying.',
                'If treatment makes sense, an expert confirms it and your plan is dispensed.',
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-3 text-sm text-background-300 leading-relaxed">
                  <span className="w-6 h-6 shrink-0 rounded-full glass-inner-dark flex items-center justify-center text-[11px] text-primary-200">
                    {i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="glass-card rounded-[28px] p-7">
            <h2 className="font-heading text-lg font-semibold">Before you write</h2>
            <p className="mt-2 text-sm text-foreground-600 leading-relaxed">
              EVLV is not an emergency service. If you are experiencing a medical emergency, call 000 or go to your
              nearest emergency department.
            </p>
            <p className="mt-4 text-[11px] text-foreground-500 leading-relaxed">
              EVLV is an Australian wellness optimisation service. RX peptides require an online consultation with an
              expert.
            </p>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}