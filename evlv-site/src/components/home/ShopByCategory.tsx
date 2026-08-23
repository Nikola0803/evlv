import Link from "next/link";

const CATEGORIES = [
  { title: "Recovery & Tissue Research", compounds: "BPC-157 · TB-500", href: "/shop?category=peptides", art: "botanical" as const },
  { title: "Metabolic Research", compounds: "Semaglutide · Tirzepatide · Retatrutide", href: "/shop?category=peptides", art: "droplet" as const },
  { title: "Cellular & Longevity Research", compounds: "MOTS-C · NAD+ · GHK-Cu", href: "/shop?category=ancillaries", art: "molecular" as const },
  { title: "Growth Hormone Research", compounds: "CJC-1295 · Ipamorelin · Tesamorelin", href: "/shop?category=growth-hormone", art: "sculptural" as const },
];

export function ShopByCategory() {
  return (
    <section className="bg-ivory-soft py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-deep">Explore the Collection</p>
        <h2 className="max-w-xl font-display text-3xl font-semibold text-charcoal md:text-4xl">Shop by research category</h2>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-lg">
                <CategoryArt variant={cat.art} className="h-full w-full transition duration-700 ease-out group-hover:scale-[1.04]" />
              </div>
              <h3 className="mt-5 font-display text-lg font-medium text-charcoal">{cat.title}</h3>
              <p className="mt-1.5 text-xs uppercase tracking-[0.1em] text-soft-gray">{cat.compounds}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryArt({ variant, className = "" }: { variant: "botanical" | "droplet" | "molecular" | "sculptural"; className?: string }) {
  const bg = {
    botanical: "linear-gradient(160deg, #e7e9e2 0%, #cdd4c7 60%, #97a494 100%)",
    droplet: "linear-gradient(160deg, #3a4539 0%, #1c211c 70%, #10130f 100%)",
    molecular: "linear-gradient(160deg, #f4f0e7 0%, #e7e9e2 100%)",
    sculptural: "linear-gradient(160deg, #d8d3c9 0%, #97a494 100%)",
  }[variant];

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ background: bg }}>
      {variant === "botanical" && (
        <svg viewBox="0 0 120 200" className="h-[70%] w-auto opacity-80">
          <path d="M60 190 V40" stroke="#454f43" strokeWidth="2" fill="none" strokeLinecap="round" />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M60 ${170 - i * 35} q ${i % 2 === 0 ? 30 : -30} -10 ${i % 2 === 0 ? 34 : -34} -30`}
              stroke="#454f43"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>
      )}
      {variant === "droplet" && (
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => {
            const x = (i * 37) % 190;
            const y = (i * 53) % 190;
            const r = 3 + (i % 4);
            return <circle key={i} cx={x} cy={y} r={r} fill="#F2EDE2" opacity={0.12 + (i % 3) * 0.08} />;
          })}
        </svg>
      )}
      {variant === "molecular" && (
        <svg viewBox="0 0 160 160" className="h-[70%] w-auto">
          {[
            [40, 40],
            [120, 50],
            [80, 90],
            [30, 120],
            [130, 120],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#687767" opacity="0.7" />
          ))}
          <path d="M40 40 L80 90 L120 50 M80 90 L30 120 M80 90 L130 120" stroke="#97A494" strokeWidth="1" fill="none" />
        </svg>
      )}
      {variant === "sculptural" && (
        <svg viewBox="0 0 160 200" className="h-[70%] w-auto">
          <circle cx="80" cy="60" r="26" fill="#536252" opacity="0.85" />
          <circle cx="55" cy="120" r="20" fill="#536252" opacity="0.7" />
          <circle cx="105" cy="130" r="18" fill="#536252" opacity="0.6" />
          <line x1="80" y1="60" x2="55" y2="120" stroke="#454f43" strokeWidth="4" />
          <line x1="80" y1="60" x2="105" y2="130" stroke="#454f43" strokeWidth="4" />
          <rect x="45" y="170" width="70" height="10" rx="2" fill="#454f43" opacity="0.5" />
        </svg>
      )}
    </div>
  );
}
