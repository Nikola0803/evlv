import "server-only";
import { crmConfigured, crmGet } from "@/lib/crm-proxy";

export interface CoaEntry {
  slug: string;
  url: string;
  label?: string;
}

interface CrmProduct {
  slug: string;
  coaUrl?: string;
  coaBatchLabel?: string;
}

/**
 * Real lab COA PDFs, keyed by product slug, sourced from the CRM's
 * CoaDocument table (see peptides-crm-app/prisma/schema.prisma). Returns {}
 * if the CRM isn't configured or a product has no COA uploaded yet — the
 * /coas page shows "COA pending" for those rather than inventing data.
 */
export async function getCoaMap(): Promise<Record<string, CoaEntry>> {
  if (!crmConfigured()) return {};

  const { ok, data } = await crmGet("/api/store/products", { revalidate: 120 });
  if (!ok || !Array.isArray(data)) return {};

  const map: Record<string, CoaEntry> = {};
  for (const p of data as CrmProduct[]) {
    if (p.slug && p.coaUrl) {
      map[p.slug] = { slug: p.slug, url: p.coaUrl, label: p.coaBatchLabel };
    }
  }
  return map;
}
