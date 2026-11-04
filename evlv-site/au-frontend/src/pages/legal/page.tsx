import { Link, useParams } from 'react-router-dom';
import PageShell from '@/components/feature/PageShell';
import PageIntro from '@/components/feature/PageIntro';

type Section = { title: string; body: string[] };

const terms: Section[] = [
  {
    title: '1. About these terms',
    body: [
      'These terms govern your use of the EVLV website and any related services. EVLV is a wellness optimisation service operated by tagadaRX. By using the site you agree to these terms.',
      'This website is a starting point. Where our full service agreement, consent forms, or provincial requirements differ from what is written here, the agreement you accept during onboarding takes precedence.',
    ],
  },
  {
    title: '2. Not a pharmacy or manufacturer',
    body: [
      'EVLV is not a pharmacy, drug manufacturer, or emergency care provider. Prescription products require an online consultation with a Wellness Optimisation Specialist who determines whether a prescription is appropriate.',
      'Medications shown on this site are dispensed by a licensed pharmacy partner. Availability, pricing, and eligibility are confirmed during your assessment.',
    ],
  },
  {
    title: '3. Your responsibilities',
    body: [
      'You agree to provide accurate, complete health information, to answer follow-up questions honestly, and to tell your provider about other medications, conditions, and allergies.',
      'Incomplete or inaccurate information can make treatment unsafe. Your provider may decline to prescribe or may stop treatment if the information you supply does not support it.',
    ],
  },
  {
    title: '4. Emergencies',
    body: [
      'EVLV does not provide emergency or urgent care. If you believe you are experiencing a medical emergency, call 000 or attend your nearest emergency department immediately.',
      'If you experience a serious side effect, stop taking the medication and seek medical attention, then notify your prescribing provider.',
    ],
  },
  {
    title: '5. Pricing and billing',
    body: [
      'Pricing shown on this site is indicative and confirmed during your assessment. Charges are presented before you commit to any order.',
      'We do not offer direct insurance billing. Where coverage exists, your prescription package includes the documentation usually required for reimbursement.',
    ],
  },
  {
    title: '6. Limitations',
    body: [
      'The content on this site is general information, not medical advice, and should not be used to diagnose or treat any condition on its own.',
      'To the extent permitted by law, EVLV and tagadaRX are not liable for outcomes resulting from reliance on site content rather than advice from a licensed provider.',
    ],
  },
  {
    title: '7. Changes',
    body: [
      'We may update these terms as the service evolves. Material changes will be communicated before they take effect for existing patients.',
    ],
  },
];

const privacy: Section[] = [
  {
    title: '1. What we collect',
    body: [
      'We collect the information you give us directly: your name, contact details, state or territory, health history, and anything you write in an assessment or message.',
      'We also collect limited technical information needed to operate the site securely, such as device type and basic usage data.',
    ],
  },
  {
    title: '2. Why we collect it',
    body: [
      'Your information is used to provide care: reviewing your assessment, arranging prescriptions, coordinating delivery, and following up on how treatment is going.',
      'We also use it to meet legal and regulatory obligations that apply to online wellness and prescribing services in Australia.',
    ],
  },
  {
    title: '3. Who can see it',
    body: [
      'Your information is available to the licensed provider managing your care, the pharmacy partner dispensing your prescription, and the tagadaRX staff who support those services.',
      'We do not sell your personal or health information, and we do not share it for advertising.',
    ],
  },
  {
    title: '4. How it is protected',
    body: [
      'Health information is stored in encrypted, healthcare-grade systems with access limited to people who need it to provide your care.',
      'Medication is shipped in plain, unbranded packaging with a signature required on delivery, so the contents are not visible to anyone else.',
    ],
  },
  {
    title: '5. Your choices',
    body: [
      'You can ask to access the personal information we hold about you, request corrections, or ask questions about how it is handled by contacting the care team.',
      'Marketing emails are separate from care communications. You can unsubscribe from marketing at any time without affecting your care.',
    ],
  },
  {
    title: '6. Retention',
    body: [
      'Clinical records are retained for the period required by the regulatory college and provincial health privacy law that apply to your care.',
    ],
  },
];

export default function Legal() {
  const { slug } = useParams();
  const doc = slug === 'privacy' ? privacy : slug === 'terms' ? terms : null;

  if (!doc) {
    return (
      <PageShell>
        <section className="atmo-cream panel-section section-y">
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">That document is not here.</h1>
          <p className="mt-3 text-foreground-600">Try our Terms of Service or Privacy Policy.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/legal/terms"
              className="whitespace-nowrap rounded-full bg-primary-500 text-secondary-950 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-primary-400"
            >
              Terms of Service
            </Link>
            <Link
              to="/legal/privacy"
              className="whitespace-nowrap rounded-full border border-primary-500 text-primary-700 px-6 py-3 text-sm font-medium cursor-pointer hover:bg-primary-50"
            >
              Privacy Policy
            </Link>
          </div>
          </div>
        </section>
      </PageShell>
    );
  }

  const isTerms = slug === 'terms';

  return (
    <PageShell>
      <PageIntro
        eyebrow="Legal"
        title={isTerms ? 'Terms of Service' : 'Privacy Policy'}
        text={
          isTerms
            ? 'The ground rules for using EVLV and receiving care through it.'
            : 'How EVLV and tagadaRX handle the information you share with us.'
        }
      />

      <section className="atmo-cream panel-section section-y">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start">
        <article className="glass-card rounded-[28px] p-6 md:p-10 max-w-3xl">
          {doc.map((s) => (
            <div key={s.title} className="mb-8 last:mb-0">
              <h2 className="font-heading text-xl font-semibold">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-2.5 text-sm text-foreground-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="mt-8 pt-6 border-t border-primary-800/12 text-[11px] text-foreground-500 leading-relaxed">
            EVLV is a wellness optimisation service operated by tagadaRX. This page is a plain-language summary prepared for the
            website and does not replace the full agreement presented during onboarding.
          </p>
        </article>

        <aside className="lg:sticky lg:top-28 space-y-5">
          <div className="glass-card rounded-[24px] p-6">
            <h2 className="font-heading text-lg font-semibold">Also read</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to={isTerms ? '/legal/privacy' : '/legal/terms'}
                  className="text-primary-700 underline cursor-pointer"
                >
                  {isTerms ? 'Privacy Policy' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-700 underline cursor-pointer">
                  Frequently asked questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-700 underline cursor-pointer">
                  Contact the care team
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        </div>
      </section>
    </PageShell>
  );
}