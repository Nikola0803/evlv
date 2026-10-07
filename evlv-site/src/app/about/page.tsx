import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About EVLV Research | Documentation Before Claims",
  description:
    "Meet EVLV Research, a U.S. research-use-only supplier built around clear product information, batch-linked documentation and responsive support.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About EVLV Research",
    description: "Research supply built around documentation, clarity and accountable support.",
    url: "/about",
    type: "website",
    images: [{ url: "/images/certified/evlv-quality-page.png", width: 1600, height: 900, alt: "EVLV Research quality review" }],
  },
};

const PROOF_POINTS = [
  { icon: "ri-file-shield-2-line", title: "Batch-linked documentation", body: "Reports are connected to the products and lots they describe." },
  { icon: "ri-microscope-line", title: "Independent analysis", body: "Third-party analytical records are published where available." },
  { icon: "ri-truck-line", title: "U.S. fulfillment", body: "Clear order tracking and support from a domestic fulfillment operation." },
  { icon: "ri-customer-service-2-line", title: "Accountable support", body: "Questions reach a real team that knows the catalogue." },
];

const PROCESS = [
  { num: "01", title: "Product review", body: "Identity, labeling, presentation and available documentation are reviewed before a product is listed." },
  { num: "02", title: "Analytical records", body: "Product-specific reports are organized by compound, strength and batch whenever the source documentation permits." },
  { num: "03", title: "Clear publication", body: "Purity data and COA availability are stated directly—without turning one report into a blanket claim." },
  { num: "04", title: "Traceable fulfillment", body: "Orders move through a controlled U.S. fulfillment workflow with tracking and responsive follow-through." },
];

const PRINCIPLES = [
  { icon: "ri-search-eye-line", title: "Specifics over adjectives", body: "We would rather show the relevant record than ask you to trust vague superlatives." },
  { icon: "ri-layout-grid-line", title: "Clarity over clutter", body: "The catalogue is structured to make products, strengths and documentation easy to compare." },
  { icon: "ri-shield-check-line", title: "Boundaries matter", body: "Our catalogue is strictly for laboratory and analytical research—not human or veterinary use." },
  { icon: "ri-chat-3-line", title: "People over scripts", body: "Support should solve the question in front of you, not send you through a canned-response loop." },
  { icon: "ri-links-line", title: "Batch over blanket", body: "Documentation belongs to a specific product or lot, not automatically to an entire product line." },
  { icon: "ri-refresh-line", title: "Improve continuously", body: "We keep refining the catalogue, documentation library and purchasing experience as EVLV grows." },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-charcoal">
      <section className="relative isolate min-h-[680px] overflow-hidden bg-sage-deep text-white md:min-h-[720px]">
        <Image src="/images/certified/evlv-science-wide.png" alt="EVLV analytical research environment" fill priority sizes="100vw" className="object-cover object-[70%_center] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,31,29,.98)_0%,rgba(4,31,29,.94)_38%,rgba(4,31,29,.55)_65%,rgba(4,31,29,.14)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-sage-deep/80 to-transparent" />

        <div className="relative mx-auto flex min-h-[680px] max-w-[1400px] items-center px-5 py-24 md:min-h-[720px] md:px-8">
          <Reveal className="max-w-[710px]">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65"><span className="h-px w-10 bg-copper" /> About EVLV Research</p>
            <h1 className="font-display text-[clamp(3.25rem,7vw,6.7rem)] font-semibold leading-[.91] tracking-[-.055em]">A higher standard for <span className="text-white/70">research supply.</span></h1>
            <p className="mt-7 max-w-[600px] text-base leading-7 text-white/72 md:text-lg md:leading-8">
              EVLV was built for researchers who want less noise and more evidence: clear product information,
              batch-linked documentation, straightforward fulfillment and support that answers the actual question.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/coas" size="lg" className="!bg-white !text-charcoal hover:!bg-sage-mist">Explore the COA Library <i className="ri-arrow-right-line" /></ButtonLink>
              <ButtonLink href="/shop" variant="secondary" size="lg" className="!border-white/45 !text-white hover:!bg-white hover:!text-charcoal">View the Catalogue</ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="relative border-t border-white/15 bg-black/10 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 px-5 md:grid-cols-4 md:px-8">
            {["Research use only", "Product-specific COAs", "Independent lab records", "U.S. fulfillment"].map((item, index) => (
              <div key={item} className={`flex min-h-20 items-center gap-3 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white/75 md:px-6 md:text-[11px] ${index % 2 ? "border-l border-white/15" : ""} ${index > 1 ? "border-t border-white/15 md:border-t-0" : ""} ${index > 0 ? "md:border-l" : ""}`}>
                <i className="ri-checkbox-circle-line text-lg text-copper" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:grid-cols-[.92fr_1.08fr] md:px-8 lg:gap-24">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-copper">Why we exist</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.02] md:text-6xl">Research purchasing should not feel like guesswork.</h2>
            <div className="mt-7 max-w-xl space-y-5 text-base leading-7 text-soft-gray md:text-lg md:leading-8">
              <p>This market grew quickly. Useful product information did not always grow with it. Researchers were left comparing broad purity claims, unclear imagery and documentation that was difficult to connect to the item being purchased.</p>
              <p>EVLV exists to make that decision cleaner. We organize the catalogue around identifiable products, clearly labeled analytical records and a purchasing experience that respects the person doing the work.</p>
            </div>
            <Link href="/sourcing" className="mt-8 inline-flex items-center gap-2 border-b border-charcoal pb-1 text-xs font-semibold uppercase tracking-[.12em]">Read our sourcing and quality policy <i className="ri-arrow-right-up-line" /></Link>
          </Reveal>

          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-ivory-soft shadow-[0_30px_80px_rgba(11,47,44,.14)]">
              <Image src="/images/certified/evlv-quality-page.png" alt="EVLV quality-control review" fill sizes="(min-width:768px) 54vw, 100vw" className="object-cover object-center" />
            </div>
            <div className="relative -mt-12 ml-5 max-w-[330px] rounded-2xl border border-stone bg-white p-5 shadow-xl md:-ml-10 md:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-copper">The EVLV difference</p>
              <p className="mt-2 font-display text-xl font-semibold leading-tight">Documentation before promotion.</p>
              <p className="mt-3 text-sm leading-6 text-soft-gray">The record should carry the claim—not the other way around.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-stone bg-ivory-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <Reveal className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-copper">What customers can expect</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">Proof built into the experience.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-soft-gray">Trust is not one badge. It is the combined result of transparent information, traceable documentation, dependable fulfillment and reachable support.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {PROOF_POINTS.map((point) => (
                <article key={point.title} className="rounded-2xl border border-stone bg-white p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-sage-mist text-xl text-sage-deep"><i className={point.icon} /></div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-soft-gray">{point.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-charcoal)] py-20 text-white md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-copper-light">The EVLV standard</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.02] md:text-6xl">From catalogue review to your research bench.</h2>
            <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {PROCESS.map((step) => (
                <article key={step.num} className="grid grid-cols-[54px_1fr] gap-4 py-6 md:grid-cols-[72px_180px_1fr] md:gap-6 md:py-7">
                  <span className="font-display text-sm font-semibold text-copper-light">{step.num}</span>
                  <h3 className="font-display text-lg font-semibold md:text-xl">{step.title}</h3>
                  <p className="col-start-2 text-sm leading-6 text-white/62 md:col-start-3">{step.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/coas" size="lg" className="!bg-white !text-charcoal hover:!bg-sage-mist">View Published COAs</ButtonLink>
              <ButtonLink href="/sourcing" variant="secondary" size="lg" className="!border-white/40 !text-white hover:!bg-white hover:!text-charcoal">Quality Policy</ButtonLink>
            </div>
          </Reveal>

          <Reveal className="relative min-h-[520px] overflow-hidden rounded-[24px] border border-white/10 lg:min-h-full">
            <Image src="/images/certified/evlv-quality-transparency-v2.png" alt="EVLV research product and packaging" fill sizes="(min-width:1024px) 42vw, 100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-deep via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-copper-light">Clarity at product level</p>
              <p className="mt-2 max-w-md font-display text-2xl font-semibold">The exact product, the available record, the stated result.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-copper">How we operate</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">The principles behind EVLV.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-soft-gray">A premium experience is not more decoration. It is better information, fewer dead ends and consistent follow-through.</p>
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <article key={principle.title} className="min-h-[230px] bg-white p-7 md:p-8">
                <i className={`${principle.icon} text-2xl text-copper`} />
                <h3 className="mt-9 font-display text-xl font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-soft-gray">{principle.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-charcoal)] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:grid-cols-[1fr_1fr] md:px-8 lg:gap-24">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-copper-light">The line we do not cross</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">Research use only. Always.</h2>
          </Reveal>
          <Reveal>
            <p className="text-base leading-7 text-white/68 md:text-lg md:leading-8">EVLV supplies materials strictly for laboratory and analytical research. Products are not intended for human or veterinary use, diagnosis, treatment, mitigation, cure or prevention of disease. We do not provide dosing, administration or therapeutic guidance.</p>
            <Link href="/ruo" className="mt-7 inline-flex items-center gap-2 border-b border-white/60 pb-1 text-xs font-semibold uppercase tracking-[.12em] text-white">Read the full RUO policy <i className="ri-arrow-right-line" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <Reveal className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid overflow-hidden rounded-[24px] border border-stone bg-ivory-soft md:grid-cols-[1.15fr_.85fr]">
            <div className="p-7 md:p-12 lg:p-14">
              <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-copper">Questions are welcome</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">Talk to a team that knows the catalogue.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-soft-gray">Need help locating documentation, confirming availability or understanding an order? Contact EVLV and a real person will follow up.</p>
              <ButtonLink href="/contact" variant="dark" size="lg" className="mt-8">Contact EVLV <i className="ri-arrow-right-line" /></ButtonLink>
            </div>
            <div className="grid content-center gap-5 border-t border-stone bg-white p-7 md:border-l md:border-t-0 md:p-10">
              <ContactLine icon="ri-mail-line" label="Email" value="office@evlvpeptides.com" href="mailto:office@evlvpeptides.com" />
              <ContactLine icon="ri-file-list-3-line" label="Documentation" value="Browse the COA library" href="/coas" />
              <ContactLine icon="ri-truck-line" label="Existing order" value="Track your shipment" href="/track-order" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-[var(--color-sage-deep)] py-20 text-center text-white md:py-28">
        <Reveal className="mx-auto max-w-[820px] px-5 md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-copper-light">Explore EVLV Research</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] md:text-6xl">See the standard in the catalogue.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/68">Browse research materials alongside the product-specific documentation currently available for each listing.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/shop" size="lg" className="!bg-white !text-charcoal hover:!bg-sage-mist">Explore Materials <i className="ri-arrow-right-line" /></ButtonLink>
            <ButtonLink href="/coas" variant="secondary" size="lg" className="!border-white/45 !text-white hover:!bg-white hover:!text-charcoal">View COAs</ButtonLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function ContactLine({ icon, label, value, href }: { icon: string; label: string; value: string; href: string }) {
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-xl border border-stone p-4 transition hover:border-sage-deep hover:bg-sage-mist">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage-mist text-lg text-sage-deep"><i className={icon} /></span>
      <span className="min-w-0 flex-1"><small className="block text-[9px] font-semibold uppercase tracking-[.15em] text-soft-gray">{label}</small><strong className="mt-1 block truncate text-sm font-semibold text-charcoal">{value}</strong></span>
      <i className="ri-arrow-right-line text-soft-gray transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
