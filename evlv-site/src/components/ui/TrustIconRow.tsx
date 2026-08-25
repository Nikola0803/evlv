interface TrustItem {
  icon: string;
  label: string;
  sublabel?: string;
}

export function TrustIconRow({ items }: { items: TrustItem[]; tone?: "ring" | "plain" }) {
  return (
    <section className="overflow-hidden bg-sage-forest py-5 md:py-12">
      <div className="mx-auto max-w-[1400px] md:px-4 lg:px-8">
        <div className="md:hidden">
          <div className="flex w-max animate-[marquee_18s_linear_infinite] items-center gap-10 pl-10">
            {[...items, ...items].map((item, i) => (
              <div key={`${item.label}-${i}`} className="flex shrink-0 items-center gap-2.5">
                <i className={`${item.icon} text-base text-white/60`} />
                <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.15em] text-white/70">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`hidden gap-6 md:grid ${items.length > 4 ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-start gap-3">
              <i className={`${item.icon} text-lg text-white/60`} />
              <span className="whitespace-nowrap text-xs uppercase tracking-[0.15em] text-white/70">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
