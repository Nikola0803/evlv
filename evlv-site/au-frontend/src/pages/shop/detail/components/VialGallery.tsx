import { useState } from 'react';

type GalleryProduct = {
  name: string;
  size: string;
  image: string;
  purity: string;
  coa: boolean;
};

type Props = {
  product: GalleryProduct;
  categoryLabel: string;
};

type ViewKey = 'photo' | 'label' | 'spec';

const VIEWS: { key: ViewKey; short: string; label: string; icon: string }[] = [
  { key: 'photo', short: 'Vial', label: 'Vial photo', icon: 'ri-image-line' },
  { key: 'label', short: 'Label', label: 'Printed label', icon: 'ri-price-tag-3-line' },
  { key: 'spec', short: 'Lot', label: 'Lot sheet', icon: 'ri-file-list-3-line' },
];

export default function VialGallery({ product, categoryLabel }: Props) {
  const [view, setView] = useState<ViewKey>('photo');
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex sm:flex-col gap-2.5 sm:w-[84px] shrink-0">
        {VIEWS.map((v) => {
          const active = v.key === view;
          return (
            <button
              key={v.key}
              type="button"
              onClick={() => setView(v.key)}
              aria-label={v.label}
              aria-pressed={active}
              className={`cursor-pointer flex sm:h-[84px] flex-1 sm:flex-none flex-col items-center justify-center gap-1 rounded-[16px] border px-2 py-2.5 transition-colors ${
                active
                  ? 'border-primary-500 bg-background-50 text-primary-800'
                  : 'border-primary-800/12 bg-background-50/45 text-foreground-500 hover:border-primary-800/30 hover:text-foreground-800'
              }`}
            >
              {v.key === 'photo' && !failed ? (
                <img
                  src={product.image}
                  alt=""
                  className="h-7 w-7 rounded-[6px] object-contain"
                  onError={() => setFailed(true)}
                />
              ) : (
                <i className={`${v.icon} text-[15px]`} />
              )}
              <span className="text-[8.5px] font-medium uppercase tracking-[0.1em] whitespace-nowrap">{v.short}</span>
            </button>
          );
        })}
      </div>

      <div className="relative flex-1 min-w-0 rounded-[30px] overflow-hidden product-frame-light aspect-square">
        {view === 'photo' &&
          (failed ? (
            <div className="product-frame-fallback">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background-50/80 text-2xl">
                <i className="ri-flask-line" />
              </span>
              <span className="text-sm font-medium leading-tight">
                {product.name} {product.size}
              </span>
              <span className="text-[10px] uppercase tracking-[0.12em] opacity-70">Photo on request</span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={`${product.name} ${product.size} research vial`}
              title={`${product.name} ${product.size} ${categoryLabel} vial`}
              onError={() => setFailed(true)}
            />
          ))}

        {view === 'label' && (
          <div className="flex h-full w-full flex-col justify-between bg-background-100 p-5 sm:p-7 text-primary-900">
            <div className="flex items-start justify-between gap-3">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em]">EVLV</span>
              <span className="rounded-full border border-primary-900/30 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em]">
                RX Only
              </span>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary-700">{categoryLabel}</p>
              <p className="mt-2 font-heading text-2xl sm:text-3xl font-semibold uppercase leading-[1.05]">
                {product.name}
              </p>
              <p className="mt-2 text-sm tracking-[0.16em] text-primary-800">{product.size}</p>
            </div>

            <div className="border-t border-primary-900/15 pt-3">
              <p className="text-[10px] leading-relaxed text-primary-800">
                Lyophilised powder. For laboratory and analytical research only, not for human or veterinary use.
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-primary-700">
                Lot reference printed on the outer carton
              </p>
            </div>
          </div>
        )}

        {view === 'spec' && (
          <div className="flex h-full w-full flex-col justify-between bg-background-100 p-5 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary-700">Lot sheet</p>
              <span className="rounded-full border border-primary-900/25 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-800">
                {product.coa ? 'Report held' : 'On request'}
              </span>
            </div>

            <dl className="mt-4 space-y-0">
              {[
                { label: 'Compound', value: product.name },
                { label: 'Quantity', value: product.size },
                { label: 'Format', value: 'Lyophilised powder' },
                { label: 'Purity', value: product.purity || 'On request' },
                { label: 'Analysis', value: 'HPLC and mass spec' },
                { label: 'Endotoxin', value: 'Report on request' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3 border-b border-primary-900/10 py-2 last:border-b-0"
                >
                  <dt className="text-[11px] text-foreground-500">{row.label}</dt>
                  <dd className="text-[11.5px] font-medium text-foreground-900 text-right">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="text-[9.5px] leading-relaxed text-foreground-500">
              Figures are copied from the supplier report for this lot. COA and endotoxin reports are emailed on request.
            </p>
          </div>
        )}

        {view === 'photo' && product.coa && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background-50/90 border border-primary-800/12 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-primary-800">
            <i className="ri-verified-badge-line" />
            COA &amp; endotoxin
          </span>
        )}

        <span className="absolute right-4 top-4 inline-flex items-center rounded-full border border-primary-900/25 bg-background-50/92 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-primary-900">
          RX Only
        </span>
      </div>
    </div>
  );
}