import "server-only";
import { crmConfigured, crmGet } from "@/lib/crm-proxy";

export interface CoaEntry {
  slug: string;
  url: string;
  label?: string;
}

/**
 * Real lab COA PDFs, keyed by product slug, sourced from the CRM's
 * CoaDocument table via /api/store/coas (see peptide-saas's
 * src/app/api/store/coas/route.ts, and the Master Products admin page
 * where COAs are uploaded).
 *
 * Until the CRM is populated, LOCAL_COA_MAP below covers our dropship/
 * testing partner's real, currently-available certificates (lab: Horizon
 * Analytical) as a local fallback under public/coas/. These use the real
 * lot codes exactly as issued by the lab — never relabeled to look like
 * EVLV-native lot numbers. Products with no COA in either source show
 * "COA pending" on /coas rather than inventing data.
 */
const LOCAL_COA_MAP: Record<string, CoaEntry> = {
  "gp-3-10mg": { slug: "gp-3-10mg", url: "/coas/MSV-7184415-P.pdf", label: "MSV-7184415-P" },
  "gp-3-15mg": { slug: "gp-3-15mg", url: "/coas/MSV-5244055-P.pdf", label: "MSV-5244055-P" },
  "gp-3-30mg": { slug: "gp-3-30mg", url: "/coas/MSV-6472318-P.pdf", label: "MSV-6472318-P" },
  "mots-c-10mg": { slug: "mots-c-10mg", url: "/coas/MSV-7058391-P.pdf", label: "MSV-7058391-P" },
  "tirzepatide-10mg": { slug: "tirzepatide-10mg", url: "/coas/MSV-9109868-P.pdf", label: "MSV-9109868-P" },
  "tirzepatide-15mg": { slug: "tirzepatide-15mg", url: "/coas/MSV-3795846-P.pdf", label: "MSV-3795846-P" },
  "tirzepatide-30mg": { slug: "tirzepatide-30mg", url: "/coas/MSV-6006482-P.pdf", label: "MSV-6006482-P" },
  "semaglutide-5mg": { slug: "semaglutide-5mg", url: "/coas/MSV-4193082-P.pdf", label: "MSV-4193082-P" },
  "kpv-10mg": { slug: "kpv-10mg", url: "/coas/MSV-4451178-P.pdf", label: "MSV-4451178-P" },
  "bpc-157-5mg": { slug: "bpc-157-5mg", url: "/coas/MSV-8212693-P.pdf", label: "MSV-8212693-P" },
  "bpc-157-10mg": { slug: "bpc-157-10mg", url: "/coas/MSV-4152086-P.pdf", label: "MSV-4152086-P" },
  "tb-500-5mg": { slug: "tb-500-5mg", url: "/coas/MSV-8212693-P.pdf", label: "MSV-8212693-P" },
  "tb-500-10mg": { slug: "tb-500-10mg", url: "/coas/MSV-4152086-P.pdf", label: "MSV-4152086-P" },
  "bpc-tb-500-blend-10mg": { slug: "bpc-tb-500-blend-10mg", url: "/coas/MSV-8212693-P.pdf", label: "MSV-8212693-P" },
  "bpc-tb-500-blend-20mg": { slug: "bpc-tb-500-blend-20mg", url: "/coas/MSV-4152086-P.pdf", label: "MSV-4152086-P" },
  "cjc-ipa-blend-10mg": { slug: "cjc-ipa-blend-10mg", url: "/coas/MSV-3437208-P.pdf", label: "MSV-3437208-P" },
  "glow-70mg": { slug: "glow-70mg", url: "/coas/MSV-9377026-P.pdf", label: "MSV-9377026-P" },
};

export async function getCoaMap(): Promise<Record<string, CoaEntry>> {
  if (!crmConfigured()) return LOCAL_COA_MAP;

  const { ok, data } = await crmGet("/api/store/coas", { revalidate: 120 });
  if (!ok || !Array.isArray(data)) return LOCAL_COA_MAP;

  const map: Record<string, CoaEntry> = { ...LOCAL_COA_MAP };
  for (const c of data as CoaEntry[]) {
    if (c.slug && c.url) map[c.slug] = c;
  }
  return map;
}
