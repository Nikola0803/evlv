import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | EVLV",
  description: "The terms that govern use of the EVLV website and purchase of EVLV products.",
};

const SECTIONS = [
  {
    title: "Research use only",
    body: "Every product sold on this site is intended strictly for laboratory research, identification, and reference purposes. By purchasing, you confirm you are acquiring these products for research use, not for human or veterinary consumption, and that you are 21 years of age or older.",
  },
  {
    title: "No medical claims",
    body: "Nothing on this site, in product listings, in Certificates of Analysis, or in correspondence with EVLV constitutes medical, dosing, or therapeutic advice. Statements have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease.",
  },
  {
    title: "Accounts",
    body: "You're responsible for keeping your account credentials secure and for all activity under your account. Let us know right away if you believe your account has been accessed without authorization.",
  },
  {
    title: "Orders and pricing",
    body: "Prices are shown in USD or CAD based on your location or manual selection, and may change without notice. We reserve the right to refuse or cancel an order at our discretion, including for suspected misuse.",
  },
  {
    title: "Acceptable use",
    body: "You agree not to misrepresent EVLV products for resale as drugs, supplements, or consumer goods, and not to use the site in a way that violates applicable law.",
  },
  {
    title: "Limitation of liability",
    body: "EVLV provides products and information as-is, for research purposes. To the fullest extent permitted by law, EVLV is not liable for any use of its products outside the scope of laboratory research.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-sage-deep py-20 text-center text-white md:py-32">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-light">Terms of Service</p>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">The terms behind every order.</h1>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-28">
        <div className="mx-auto max-w-[800px] space-y-10 px-4 md:px-8">
          <p className="text-sm text-charcoal/50">Last updated: August 2026</p>
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-medium text-charcoal">{s.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-soft-gray">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
