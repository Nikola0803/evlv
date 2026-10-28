import "server-only";
import { crmConfigured, crmGet } from "@/lib/crm-proxy";

export interface CoaEntry {
  slug: string;
  url: string;
  label?: string;
  productName?: string;
  compound?: string;
  purity?: string;
  tested?: string;
  lab?: string;
}

/**
 * Public COA library. Reports may be issued under Warrior Distributions LLC,
 * the registered parent entity of the EVLV brand. Laboratory attribution is
 * kept separate: DPS-series reports are analyzed by Horizon Analytical and
 * OPT-series reports are analyzed by OPTIQ.
 * Multiple entries for one slug represent distinct lots.
 */
export const LOCAL_COAS: CoaEntry[] = [
  // === RETATRUTIDE ===
  { slug: "evlv-3-10mg", url: "/coas/warrior-reta-10mg.pdf", label: "1190.OPT.260901", productName: "GLP3-R 10MG", compound: "Retatrutide", purity: "99.8%", tested: "Sep 2026", lab: "OPTIQ" },
  { slug: "evlv-3-10mg", url: "/coas/evlv-dps-3733528.pdf", label: "DPS-3733528", productName: "GLP3-R 10MG", compound: "Retatrutide", purity: "99.41%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },
  { slug: "evlv-3-15mg", url: "/coas/evlv-dps-9173749.pdf", label: "DPS-9173749", productName: "GLP3-R 15MG", compound: "Retatrutide", purity: "99.35%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },
  { slug: "evlv-3-30mg", url: "/coas/warrior-reta-30mg.pdf", label: "1189.OPT.260901", productName: "GLP3-R 30MG", compound: "Retatrutide", purity: "99.3%", tested: "Sep 2026", lab: "OPTIQ" },
  { slug: "evlv-3-30mg", url: "/coas/evlv-dps-9041738.pdf", label: "DPS-9041738", productName: "GLP3-R 30MG", compound: "Retatrutide", purity: "99.16%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === TIRZEPATIDE ===
  { slug: "evlv-2-10mg", url: "/coas/warrior-tirz-10mg.pdf", label: "0330.OPT.260729", productName: "GLP2-T 10MG", compound: "Tirzepatide", purity: "99.99%", tested: "Jul 31, 2026", lab: "OPTIQ" },
  { slug: "evlv-2-30mg", url: "/coas/warrior-tirz-30mg.pdf", label: "0332.OPT.260729", productName: "GLP2-T 30MG", compound: "Tirzepatide", purity: "99.99%", tested: "Jul 31, 2026", lab: "OPTIQ" },

  // === TESAMORELIN ===
  { slug: "tesamorelin-10mg", url: "/coas/evlv-dps-1572576.pdf", label: "DPS-1572576", productName: "TESAMORELIN 10MG", compound: "Tesamorelin", purity: "99.61%", tested: "Sep 24, 2026", lab: "Horizon Analytical" },
  { slug: "tesamorelin-10mg", url: "/coas/evlv-dps-9789916.pdf", label: "DPS-9789916", productName: "TESAMORELIN 10MG", compound: "Tesamorelin", purity: "99.39%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === NAD+ ===
  { slug: "nad-500mg", url: "/coas/evlv-dps-1640102.pdf", label: "DPS-1640102", productName: "NAD+ 500MG", compound: "NAD+", purity: "99.51%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === CJC-1295 / IPAMORELIN ===
  { slug: "cjc-ipa-blend-10mg", url: "/coas/warrior-cjc-ipa-20mg.pdf", label: "0585.OPT.260804", productName: "CJC-1295 / IPAMORELIN", compound: "CJC-1295 no DAC / Ipamorelin", purity: "99.08%", tested: "Aug 7, 2026", lab: "OPTIQ" },
  { slug: "cjc-ipa-blend-10mg", url: "/coas/evlv-dps-6465415.pdf", label: "DPS-6465415", productName: "CJC-1295 / IPAMORELIN 10MG", compound: "CJC-1295 no DAC / Ipamorelin", purity: "99.21% / 99.28%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === BPC-157 + TB-500 BLEND ===
  { slug: "bpc-tb-500-blend-10mg", url: "/coas/evlv-dps-7074663.pdf", label: "DPS-7074663", productName: "BPC-157 / TB-500 BLEND 10MG", compound: "BPC-157 / TB-500", purity: "99.68% / 99.55%", tested: "Sep 16, 2026", lab: "Horizon Analytical" },
  { slug: "bpc-tb-500-blend-20mg", url: "/coas/evlv-dps-7074663.pdf", label: "DPS-7074663", productName: "BPC-157 / TB-500 BLEND 20MG", compound: "BPC-157 / TB-500", purity: "99.68% / 99.55%", tested: "Sep 16, 2026", lab: "Horizon Analytical" },

  // === GHK-Cu ===
  { slug: "ghk-cu-50mg", url: "/coas/evlv-dps-7384458.pdf", label: "DPS-7384458", productName: "GHK-CU 50MG", compound: "GHK-Cu", purity: "99.51%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === KPV ===
  { slug: "kpv-10mg", url: "/coas/evlv-dps-4673660.pdf", label: "DPS-4673660", productName: "KPV 10MG", compound: "KPV", purity: "99.45%", tested: "Sep 24, 2026", lab: "Horizon Analytical" },

  // === MOTS-c ===
  { slug: "mots-c-10mg", url: "/coas/warrior-mots-c-10mg.pdf", label: "0588.OPT.260804", productName: "MOTS-C 10MG", compound: "MOTS-c", purity: "99.51%", tested: "Aug 7, 2026", lab: "OPTIQ" },
  { slug: "mots-c-10mg", url: "/coas/evlv-dps-6246893.pdf", label: "DPS-6246893", productName: "MOTS-C 10MG", compound: "MOTS-c", purity: "99.45%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === PT-141 ===
  { slug: "pt-141-10mg", url: "/coas/evlv-dps-9050324.pdf", label: "DPS-9050324", productName: "PT-141 10MG", compound: "PT-141", purity: "99.28%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === GLOW ===
  { slug: "glow-70mg", url: "/coas/warrior-glow-70mg.pdf", label: "0977.OPT.260825", productName: "GLOW 70MG", compound: "GHK-Cu / BPC-157 / TB-500", purity: "99.1%", tested: "Sep 3, 2026", lab: "OPTIQ" },
  { slug: "glow-70mg", url: "/coas/evlv-dps-7777201.pdf", label: "DPS-7777201", productName: "GLOW 70MG", compound: "GHK-Cu / BPC-157 / TB-500", purity: "See analyte results", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === KLOW ===
  { slug: "klow-80mg", url: "/coas/warrior-klow-80mg.pdf", label: "0846.OPT.260817", productName: "KLOW 80MG", compound: "GHK-Cu / KPV / TB-500 / BPC-157", purity: "99.5%", tested: "Sep 3, 2026", lab: "OPTIQ" },
  { slug: "klow-80mg", url: "/coas/evlv-dps-8243101.pdf", label: "DPS-8243101", productName: "KLOW 80MG", compound: "GHK-Cu / KPV / TB-500 / BPC-157", purity: "See analyte results", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === BPC-157 (standalone) ===
  { slug: "bpc-157-5mg", url: "/coas/evlv-dps-9628420.pdf", label: "DPS-9628420", productName: "BPC-157", compound: "BPC-157", purity: "99.42%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === TB-500 (standalone) ===
  { slug: "tb-500-10mg", url: "/coas/evlv-dps-2022011.pdf", label: "DPS-2022011", productName: "TB-500", compound: "TB-500", purity: "99.38%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === SERMORELIN ===
  { slug: "sermorelin-5mg", url: "/coas/evlv-dps-3441701.pdf", label: "DPS-3441701", productName: "SERMORELIN", compound: "Sermorelin", purity: "99.35%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === IGF-1 LR3 ===
  { slug: "igf-1-lr3-1mg", url: "/coas/evlv-dps-9375813.pdf", label: "DPS-9375813", productName: "IGF-1 LR3", compound: "IGF-1 LR3", purity: "99.59%", tested: "Sep 19, 2026", lab: "Horizon Analytical" },

  // === CAGRILINTIDE ===
  { slug: "cagrilintide-5mg", url: "/coas/evlv-dps-7613643.pdf", label: "DPS-7613643", productName: "CAGRILINTIDE", compound: "Cagrilintide", purity: "99.62%", tested: "Sep 16, 2026", lab: "Horizon Analytical" },

  // === DSIP ===
  { slug: "dsip-5mg", url: "/coas/evlv-dps-2552327.pdf", label: "DPS-2552327", productName: "DSIP", compound: "DSIP", purity: "99.47%", tested: "Sep 16, 2026", lab: "Horizon Analytical" },

  // === SEMAX ===
  { slug: "semax-5mg", url: "/coas/evlv-dps-4383620.pdf", label: "DPS-4383620", productName: "SEMAX", compound: "Semax", purity: "99.34%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },

  // === SELANK ===
  { slug: "selank-5mg", url: "/coas/evlv-dps-4692745.pdf", label: "DPS-4692745", productName: "SELANK", compound: "Selank", purity: "99.42%", tested: "Sep 15, 2026", lab: "Horizon Analytical" },
];


const PRIMARY_LOCAL_COA_MAP: Record<string, CoaEntry> = {};
for (const coa of LOCAL_COAS) {
  const current = PRIMARY_LOCAL_COA_MAP[coa.slug];
  // Current DPS reports have paired endotoxin documentation in this release.
  // Prefer them over an older Warrior/OPTIQ record while retaining the latter
  // in the public lot-history library.
  const incomingIsDps = coa.label?.startsWith("DPS-");
  const currentIsDps = current?.label?.startsWith("DPS-");
  if (!current || (incomingIsDps && !currentIsDps)) PRIMARY_LOCAL_COA_MAP[coa.slug] = coa;
}
PRIMARY_LOCAL_COA_MAP["bpc-tb-500-blend-20mg"] = LOCAL_COAS.find((coa) => coa.slug === "bpc-tb-500-blend-20mg")!;

export async function getCoaMap(): Promise<Record<string, CoaEntry>> {
  if (!crmConfigured()) return PRIMARY_LOCAL_COA_MAP;

  const { ok, data } = await crmGet("/api/store/coas", { revalidate: 120 });
  if (!ok || !Array.isArray(data)) return PRIMARY_LOCAL_COA_MAP;

  const map: Record<string, CoaEntry> = { ...PRIMARY_LOCAL_COA_MAP };
  for (const coa of data as CoaEntry[]) {
    if (coa.slug && coa.url) map[coa.slug] = coa;
  }
  return map;
}

export async function getCoaEntries(): Promise<CoaEntry[]> {
  if (!crmConfigured()) return LOCAL_COAS;

  const { ok, data } = await crmGet("/api/store/coas", { revalidate: 120 });
  if (!ok || !Array.isArray(data)) return LOCAL_COAS;

  const knownUrls = new Set(LOCAL_COAS.map((coa) => coa.url));
  const remote = (data as CoaEntry[]).filter((coa) => coa.slug && coa.url && !knownUrls.has(coa.url));
  return [...LOCAL_COAS, ...remote];
}
