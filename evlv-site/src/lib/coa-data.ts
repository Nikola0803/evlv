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
 * where COAs are uploaded). Returns {} if the CRM isn't configured or a
 * product has no COA uploaded yet — the /coas page shows "COA pending"
 * for those rather than inventing data.
 */
export async function getCoaMap(): Promise<Record<string, CoaEntry>> {
  if (!crmConfigured()) return {};

  const { ok, data } = await crmGet("/api/store/coas", { revalidate: 120 });
  if (!ok || !Array.isArray(data)) return {};

  const map: Record<string, CoaEntry> = {};
  for (const c of data as CoaEntry[]) {
    if (c.slug && c.url) map[c.slug] = c;
  }
  return map;
}
