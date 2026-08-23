interface TrustItem {
  icon: string;
  label: string;
  sublabel?: string;
}

export function TrustIconRow({ items }: { items: TrustItem[]; tone?: "ring" | "plain" }) {
  return (
    <section className="bg-sage-forest py-10 md:py-12">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className={`grid gap-6 ${items.length > 4 ? "grid-cols-2 md:grid-cols-5" : "grid-cols-2 md:grid-cols-4"}`}>
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 md:justify-start">
              <i className={`${item.icon} text-lg text-white/60`} />
              <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.15em] text-white/70 md:text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
