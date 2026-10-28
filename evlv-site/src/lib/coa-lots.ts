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
