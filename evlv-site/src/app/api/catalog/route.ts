import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/catalog";
import { getShopListProducts } from "@/lib/products";

// Revalidated every 2 minutes so the CMS plugin's fresh EVLV site also
// gets up-to-date stock and pricing without hammering the CRM on every page load.
// The evlv-site CMS plugin's WP Sync admin tool calls this endpoint to pull the
// latest catalog; no-store was forcing a full CRM re-fetch on every call.
export const revalidate = 120;

export async function GET() {
  const products = getShopListProducts(await getCatalogProducts());
  return NextResponse.json({ products, syncedAt: new Date().toISOString() }, {
    headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=30" },
  });
}
