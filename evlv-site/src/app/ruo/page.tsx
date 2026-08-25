import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Use Only Policy | EVLV",
  description: "EVLV's Research Use Only policy: scope, purchaser representations, regulatory compliance and safe handling.",
};

export default function RuoPolicyPage() {
  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-16 pt-[150px] text-center text-white md:-mt-[100px] md:pb-24 md:pt-[170px]">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Legal</p>
          <h1 className="font-display text-3xl font-semibold uppercase leading-tight md:text-5xl">
            Research Use Only Policy
          </h1>
          <p className="mt-4 text-sm text-white/50">Last updated: August 2026</p>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <div className="mb-12 rounded-lg border border-copper/40 bg-copper/5 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-copper">Critical Notice, Please Read</p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              All products sold by EVLV are exclusively for in vitro research and laboratory use by qualified
              scientific professionals. These products are not approved for human consumption, injection,
              therapeutic treatment, or veterinary use. Misuse of research chemicals may be illegal and is
              potentially dangerous.
            </p>
          </div>

          <div className="space-y-12">
            <PolicySection num="1" title="Scope of This Policy">
              <p>
                This Research Use Only (RUO) Policy applies to all products listed on the EVLV website. It defines
                the acceptable and prohibited uses of our products and establishes the responsibilities of
                purchasers. By purchasing from us, you explicitly agree to comply with this policy.
              </p>
            </PolicySection>

            <PolicySection num="2" title="What “Research Use Only” Means">
              <p>
                &ldquo;Research Use Only&rdquo; (RUO) means our products are intended solely for use in scientific
                investigations, studies, and experiments performed in controlled laboratory environments by
                qualified and trained researchers. RUO products:
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { title: "Are for in vitro use", body: "Testing and experiments conducted outside a living organism in controlled laboratory conditions." },
                  { title: "Are not for human use", body: "Not intended for ingestion, injection, inhalation, or any form of human administration." },
                  { title: "Are not therapeutic", body: "Not approved as drugs, treatments, or medical interventions by the FDA or any regulatory body." },
                  { title: "Require qualified personnel", body: "Must be handled by trained scientists in appropriate laboratory settings." },
                ].map((item) => (
                  <div key={item.title} className="rounded-lg border border-stone bg-ivory-soft p-4">
                    <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">{item.body}</p>
                  </div>
                ))}
              </div>
            </PolicySection>

            <PolicySection num="3" title="Purchaser Representations & Warranties">
              <p>By purchasing any product from EVLV, you represent and warrant that:</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  "You are a qualified scientist, researcher, or authorized representative of a research institution",
                  "You will use the products only for legitimate research or educational purposes in a controlled laboratory setting",
                  "You have the proper facilities, equipment, and expertise to safely handle research-grade chemicals",
                  "You will comply with all applicable federal, state, and local laws regarding the purchase, storage, use, and disposal of research chemicals",
                  "You will not use the products for human consumption or administration in any form",
                  "You will not resell or distribute products to any party who intends to use them for non-research purposes",
                  "You are at least 21 years of age",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal/70">
                    <i className="ri-check-line mt-0.5 shrink-0 text-copper" /> {item}
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection num="4" title="Regulatory Compliance">
              <p>
                EVLV is a chemical supplier, not a compounding pharmacy or outsourcing facility as defined under
                Sections 503A or 503B of the Federal Food, Drug, and Cosmetic Act. Our products have not been
                evaluated by the U.S. Food and Drug Administration (FDA) and are not intended to diagnose, treat,
                cure, or prevent any disease or condition.
              </p>
            </PolicySection>

            <PolicySection num="5" title="Safe Handling Guidelines">
              <p>Research chemicals must be handled with appropriate precautions:</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Always wear appropriate personal protective equipment (PPE) including lab coat, gloves, and eye protection",
                  "Handle in well-ventilated areas or a fume hood as appropriate",
                  "Store according to product specifications, many peptides require cold storage (-20°C or -80°C)",
                  "Keep out of reach of children and unauthorized personnel",
                  "Dispose of products in accordance with applicable environmental and safety regulations",
                  "Review Safety Data Sheets (SDS) before handling any chemical",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal/70">
                    <i className="ri-flask-line mt-0.5 shrink-0 text-copper" /> {item}
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection num="6" title="Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless EVLV, its officers, employees, and agents from any
                claims, damages, losses, or expenses arising from your misuse of our products or your violation of
                this Research Use Only Policy or any applicable law.
              </p>
            </PolicySection>

            <PolicySection num="7" title="Contact Us">
              <p>
                EVLV, Compliance. If you have questions about proper research use, please{" "}
                <Link href="/contact" className="font-semibold text-copper hover:underline">
                  contact us
                </Link>{" "}
                before purchasing.
              </p>
            </PolicySection>
          </div>

          <div className="mt-16 border-t border-stone pt-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal/40">Related Legal Documents</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/privacy" className="text-charcoal/60 transition hover:text-charcoal">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-charcoal/60 transition hover:text-charcoal">
                Terms of Service
              </Link>
              <Link href="/returns" className="text-charcoal/60 transition hover:text-charcoal">
                Returns Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PolicySection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="flex items-baseline gap-2 font-display text-xl font-semibold text-charcoal">
        <span className="text-copper">{num}.</span> {title}
      </h2>
      <div className="mt-3 text-base leading-relaxed text-soft-gray">{children}</div>
    </div>
  );
}
