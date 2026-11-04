import { useEffect, useState } from 'react';
import type { CoaDoc } from '@/mocks/coa';

type Props = {
  open: boolean;
  onClose: () => void;
  productName: string;
  docs: CoaDoc[];
};

export default function CoaModal({ open, onClose, productName, docs }: Props) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!open) return;
    setSelected(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  const doc = docs[selected];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary-950/70 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} reports`}
      onClick={onClose}
    >
      <div
        className="flex h-[88vh] w-full max-w-[1200px] flex-col overflow-hidden rounded-[26px] bg-background-50 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-primary-800/12 px-6 py-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.14em] text-primary-700">Reports</p>
            <h2 className="font-heading text-lg font-semibold truncate">{productName}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-primary-800/20 px-4 py-2 text-sm cursor-pointer hover:bg-primary-50"
          >
            Close
          </button>
        </div>

        {docs.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-8 text-center text-foreground-600">
            No reports are published for this product yet. Ask us and we will send them.
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            <ul className="flex gap-2 overflow-x-auto border-b border-primary-800/12 p-4 md:w-72 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r">
              {docs.map((d, i) => (
                <li key={d.url} className="shrink-0 md:shrink">
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={i === selected}
                    className={`w-full text-left rounded-2xl border px-4 py-3 cursor-pointer transition-colors ${
                      i === selected
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-primary-800/12 bg-background-50/70 hover:border-primary-400'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-primary-700">{d.kind}</span>
                    <span className="block text-sm font-medium mt-1">{d.label}</span>
                    <span className="block text-xs text-foreground-600 mt-0.5">
                      {d.lab} · {d.tested}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex items-center justify-between gap-3 px-5 py-3 text-xs text-foreground-600">
                <span>{doc.kind} · {doc.label}</span>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-primary-700 underline cursor-pointer">
                  Open in new tab
                </a>
              </div>
              <iframe
                key={doc.url}
                src={`${doc.url}#view=FitH`}
                title={`${doc.kind} report ${doc.label}`}
                className="h-full w-full flex-1 border-0 bg-background-100"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
