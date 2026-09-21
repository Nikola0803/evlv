import { Metadata } from "next";
import { getBundles } from "@/lib/bundles";
import { BundleCard } from "@/components/bundles/BundleCard";

export const metadata: Metadata = {
  title: "Research Protocol Bundles",
  description: "Pre-built, multi-compound research protocols bundled by goal -- recovery, metabolic, sleep, longevity and more -- at a lower cost than buying each compound separately.",
  alternates: { canonical: "/bundles" },
};

export default function BundlesPage() {
  const bundles = getBundles();

  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-copper">
            <i className="ri-stack-line" /> Bundled Protocols
          </div>
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-5xl lg:text-6xl">Research Bundles</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Multi-compound protocols grouped by research goal, priced below buying each compound on its own.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.slug} bundle={bundle} />
          ))}
        </div>
      </section>
    </>
  );
}
