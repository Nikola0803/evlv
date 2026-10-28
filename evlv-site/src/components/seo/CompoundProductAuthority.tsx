import Link from "next/link";
import type { Product } from "@/lib/types";
import type { CompoundHubDefinition } from "@/lib/compound-hubs";

export function CompoundProductAuthority({ product, hub }: { product: Product; hub: CompoundHubDefinition }) {
  return (
    <section className="border-y border-stone bg-ivory-soft py-14 md:py-20" aria-labelledby="compound-research-heading">
      <div className="mx-auto max-w-[1180px] px-4 md:px-8">
        <header className="grid gap-6 md:grid-cols-[0.72fr_1.28fr] md:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">Compound research context</p>
            <h2 id="compound-research-heading" className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">Evaluate {product.name} beyond the label.</h2>
          </div>
          <div>
            <p className="text-base leading-8 text-soft-gray">{hub.identityContext}</p>
            <Link href={hub.path} className="mt-5 inline-flex items-center text-sm font-semibold text-sage-deep underline decoration-sage-deep/25 underline-offset-4">Open the complete {hub.shortName} research hub <i className="ri-arrow-right-line ml-1" /></Link>
          </div>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <article className="rounded-xl border border-stone bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper">Classification</p>
            <h3 className="mt-3 font-display text-xl font-semibold">{hub.classification}</h3>
            <p className="mt-3 text-sm leading-6 text-soft-gray">Classification organizes the research catalogue. It is not a claim of safety, efficacy, or approved use.</p>
          </article>
          <article className="rounded-xl border border-stone bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper">Analytical review</p>
            <h3 className="mt-3 font-display text-xl font-semibold">Match product, strength, and lot</h3>
            <p className="mt-3 text-sm leading-6 text-soft-gray">{hub.analyticalFocus}</p>
          </article>
          <article className="rounded-xl border border-stone bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper">Available strengths</p>
            <h3 className="mt-3 font-display text-xl font-semibold">Compare separate listings</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {(product.variants ?? [{ slug: product.slug, label: product.name, price: product.price, inStock: product.inStock }]).map((variant) => (
                <Link key={variant.slug} href={`/shop/${variant.slug}`} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${variant.slug === product.slug ? "border-sage-deep bg-sage-deep text-white" : "border-stone bg-ivory text-charcoal"}`}>{variant.label}</Link>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_0.55fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Product-specific questions</p>
            <div className="mt-5 space-y-3">
              {hub.faq.slice(0, 3).map((item) => (
                <details key={item.question} className="rounded-lg border border-stone bg-white p-5">
                  <summary className="cursor-pointer list-none pr-6 font-semibold">{item.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-soft-gray">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <aside>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Related lab guides</p>
            <div className="mt-5 space-y-3">
              {hub.journalLinks.map((article) => (
                <Link key={article.href} href={article.href} className="block rounded-lg border border-stone bg-white p-5 transition hover:border-sage-deep/40">
                  <strong className="font-display text-lg">{article.label}</strong>
                  <span className="mt-2 block text-xs leading-5 text-soft-gray">{article.description}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
