import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/base/Reveal';

type Product = {
  slug: string;
  name: string;
  size: string;
  price: number;
  category: string;
  purity: string;
  coa: boolean;
  image: string;
};

type Props = {
  product: Product;
  categoryLabel: string;
  index: number;
};

export default function ProductCard({ product, categoryLabel, index }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <Reveal delay={(index % 4) * 55}>
      <article
        data-product-shop
        className="group glass-card glass-lift rounded-[24px] p-2.5 pb-4 h-full flex flex-col"
      >
        <Link to={`/shop/${product.slug}`} className="relative block cursor-pointer" aria-label={`${product.name} ${product.size} details`}>
          <div className="product-frame-light product-frame-contain w-full aspect-square rounded-[18px] overflow-hidden">
            {failed ? (
              <div className="product-frame-fallback">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background-50/80 text-lg">
                  <i className="ri-flask-line" />
                </span>
                <span className="text-[11px] font-medium leading-tight">
                  {product.name} {product.size}
                </span>
                <span className="text-[9.5px] uppercase tracking-[0.12em] opacity-70">Photo on request</span>
              </div>
            ) : (
              <img
                src={product.image}
                alt={`${product.name} ${product.size} research vial`}
                title={`${product.name} ${product.size} ${categoryLabel} vial`}
                onError={() => setFailed(true)}
                className="transition-transform duration-700 group-hover:scale-[1.04]"
              />
            )}
          </div>
          {product.coa && (
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-background-50/90 border border-primary-800/12 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-primary-800">
              <i className="ri-verified-badge-line text-[10px]" />
              COA
            </span>
          )}
          <span className="absolute right-2 top-2 inline-flex items-center rounded-full border border-primary-900/25 bg-background-50/92 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-primary-900">
            RX Only
          </span>
        </Link>

        <div className="px-2.5 pt-3 flex flex-col flex-1">
          <p className="text-[9.5px] uppercase tracking-[0.14em] text-primary-700">{categoryLabel}</p>
          <h3 className="t-card mt-1 leading-tight">
            <Link to={`/shop/${product.slug}`} className="cursor-pointer hover:text-primary-700 transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-foreground-500 mt-0.5">{product.size} vial</p>

          <p className="mt-2 text-[11px] leading-relaxed text-foreground-500">
            {product.purity ? (
              <>
                Reported purity <span className="text-foreground-800">{product.purity}</span>
              </>
            ) : (
              'Documentation on request'
            )}
          </p>

          <div className="mt-auto pt-3.5 flex items-end justify-between gap-2">
            <p className="leading-none">
              <span className="font-heading text-lg font-semibold text-foreground-950">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-1 text-[10px] text-foreground-500">AUD / vial</span>
            </p>
            <Link
              to={`/shop/${product.slug}`}
              className="whitespace-nowrap rounded-full bg-secondary-900 px-3.5 py-2 text-[11.5px] font-semibold text-background-50 cursor-pointer hover:bg-secondary-800 transition-colors"
            >
              View vial
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}