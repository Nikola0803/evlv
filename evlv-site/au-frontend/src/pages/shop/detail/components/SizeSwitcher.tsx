import { Link } from 'react-router-dom';

type Variant = {
  slug: string;
  size: string;
  price: number;
};

type Props = {
  variants: Variant[];
  activeSlug: string;
};

export default function SizeSwitcher({ variants, activeSlug }: Props) {
  if (variants.length < 2) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <span className="text-[10.5px] uppercase tracking-[0.16em] text-foreground-500">
        {variants.length} strengths
      </span>
      <div className="inline-flex items-center gap-1 rounded-full border border-primary-800/15 bg-background-50/60 p-1">
        {variants.map((v) => {
          const active = v.slug === activeSlug;
          return (
            <Link
              key={v.slug}
              to={`/shop/${v.slug}`}
              aria-current={active ? 'page' : undefined}
              className={`cursor-pointer whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                active
                  ? 'bg-secondary-950 text-background-50'
                  : 'text-foreground-700 hover:bg-primary-50 hover:text-primary-800'
              }`}
            >
              {v.size}
            </Link>
          );
        })}
      </div>
      <span className="text-[11.5px] text-foreground-500">Same compound, different load per vial</span>
    </div>
  );
}