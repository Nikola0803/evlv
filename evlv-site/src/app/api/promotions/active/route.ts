import { NextResponse } from "next/server";
import { crmConfigured, crmGet } from "@/lib/crm-proxy";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!crmConfigured()) return NextResponse.json({ halloween: { live: false, themeActive: false } });
  const result = await crmGet("/api/store/promotions/active", { revalidate: 0 });
  return NextResponse.json(result.data ?? { halloween: { live: false, themeActive: false } }, { status: result.ok ? 200 : result.status });
}
