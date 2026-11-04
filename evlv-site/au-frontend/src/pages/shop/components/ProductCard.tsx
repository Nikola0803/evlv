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
        className="group glass-card glass-lift rounded-[20px] p-2 pb-3 h-full flex flex-col sm:rounded-[24px] sm:p-2.5 sm:pb-4"
      >
        <Link to={`/shop/${product.slug}`} className="relative block cursor-pointer" aria-label={`${product.name} ${product.size} details`}>
          <div className="product-frame-light product-frame-contain w-full aspect-square rounded-[14px] overflow-hidden sm:rounded-[18px]">
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

        <div className="px-1.5 pt-2.5 flex flex-col flex-1 sm:px-2.5 sm:pt-3">
          <p className="text-[8.5px] uppercase tracking-[0.12em] text-primary-700 sm:text-[9.5px] sm:tracking-[0.14em]">{categoryLabel}</p>
          <h3 className="t-card mt-1 leading-tight text-[13.5px] sm:text-[15px] md:text-[17px]">
            <Link to={`/shop/${product.slug}`} className="cursor-pointer hover:text-primary-700 transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="text-[10.5px] text-foreground-500 mt-0.5 sm:text-xs">{product.size} vial</p>

          <p className="mt-1.5 text-[10px] leading-relaxed text-foreground-500 sm:mt-2 sm:text-[11px]">
            {product.purity ? (
              <>
                Reported purity <span className="text-foreground-800">{product.purity}</span>
              </>
            ) : (
              'Documentation on request'
            )}
          </p>

          <div className="mt-auto pt-2.5 flex items-end justify-between gap-2 sm:pt-3.5">
            <p className="leading-none min-w-0">
              <span className="font-heading text-[15px] font-semibold text-foreground-950 sm:text-lg">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-1 text-[9px] text-foreground-500 sm:text-[10px]">AUD</span>
            </p>
            <Link
              to={`/shop/${product.slug}`}
              aria-label={`View ${product.name}`}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-900 text-background-50 cursor-pointer sm:hidden"
            >
              <i className="ri-arrow-right-line text-xs" />
            </Link>
            <Link
              to={`/shop/${product.slug}`}
              className="hidden whitespace-nowrap rounded-full bg-secondary-900 px-3.5 py-2 text-[11.5px] font-semibold text-background-50 cursor-pointer hover:bg-secondary-800 transition-colors sm:inline-flex"
            >
              View vial
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}