// Certificate of analysis and endotoxin reports per product slug.
// PDFs are served from /public/coas/. Add an entry here for each product
// that has reports; products without an entry show a "reports on request" note.
export type CoaDoc = {
  kind: 'COA' | 'Endotoxin';
  label: string;
  lab: string;
  tested: string;
  url: string;
};

export const coaDocsBySlug: Record<string, CoaDoc[]> = {
  'evlv-3-10mg': [
    { kind: 'COA', label: '1190.OPT.260901', lab: 'OPTIQ', tested: 'Sep 2026', url: '/coas/warrior-reta-10mg.pdf' },
    { kind: 'COA', label: 'DPS-3733528', lab: 'Horizon Analytical', tested: 'Sep 15, 2026', url: '/coas/evlv-dps-3733528.pdf' },
    { kind: 'Endotoxin', label: 'DPS-3733528', lab: 'Horizon Analytical', tested: 'Sep 15, 2026', url: '/coas/evlv-dps-3733528-endotoxin.pdf' },
  ],
};
