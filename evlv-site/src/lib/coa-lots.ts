import type { CoaEntry } from "@/lib/coa-data";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A stable public page identifier for one published laboratory record. The
 * product slug remains part of the identifier because the same report can be
 * associated with more than one product-strength listing.
 */
export function getCoaLotId(coa: Pick<CoaEntry, "slug" | "label" | "url">) {
  const documentName = coa.url.split("/").pop()?.replace(/\.pdf$/i, "") ?? "report";
  return [slugify(coa.slug), slugify(coa.label ?? documentName), slugify(documentName)]
    .filter(Boolean)
    .join("-");
}

export function getCoaLotPath(coa: Pick<CoaEntry, "slug" | "label" | "url">) {
  return `/coas/${getCoaLotId(coa)}`;
}

// Public document mapping by exact DPS report number. Endotoxin reports are
// separate analytical records and must never be read as purity or sterility.
const ENDOTOXIN_REPORTS: Record<string, string> = {
  "DPS-1572576": "/coas/evlv-dps-1572576-endotoxin.pdf", "DPS-1640102": "/coas/evlv-dps-1640102-endotoxin.pdf",
  "DPS-2022011": "/coas/evlv-dps-2022011-endotoxin.pdf", "DPS-2552327": "/coas/evlv-dps-2552327-endotoxin.pdf",
  "DPS-3441701": "/coas/evlv-dps-3441701-endotoxin.pdf", "DPS-3733528": "/coas/evlv-dps-3733528-endotoxin.pdf",
  "DPS-4383620": "/coas/evlv-dps-4383620-endotoxin.pdf", "DPS-4673660": "/coas/evlv-dps-4673660-endotoxin.pdf",
  "DPS-4692745": "/coas/evlv-dps-4692745-endotoxin.pdf", "DPS-6246893": "/coas/evlv-dps-6246893-endotoxin.pdf",
  "DPS-6465415": "/coas/evlv-dps-6465415-endotoxin.pdf", "DPS-7074663": "/coas/evlv-dps-7074663-endotoxin.pdf",
  "DPS-7384458": "/coas/evlv-dps-7384458-endotoxin.pdf", "DPS-7613643": "/coas/evlv-dps-7613643-endotoxin.pdf",
  "DPS-7777201": "/coas/evlv-dps-7777201-endotoxin.pdf", "DPS-8243101": "/coas/evlv-dps-8243101-endotoxin.pdf",
  "DPS-9041738": "/coas/evlv-dps-9041738-endotoxin.pdf", "DPS-9050324": "/coas/evlv-dps-9050324-endotoxin.pdf",
  "DPS-9173749": "/coas/evlv-dps-9173749-endotoxin.pdf", "DPS-9375813": "/coas/evlv-dps-9375813-endotoxin.pdf",
  "DPS-9628420": "/coas/evlv-dps-9628420-endotoxin.pdf", "DPS-9789916": "/coas/evlv-dps-9789916-endotoxin.pdf",
};

export function getEndotoxinReport(label?: string) {
  return label ? ENDOTOXIN_REPORTS[label] : undefined;
}
