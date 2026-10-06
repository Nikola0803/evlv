import { NextResponse } from "next/server";
import { crmFetch } from "@/lib/crm-proxy";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/affiliate/program-settings", body);
  return NextResponse.json(data, { status: ok ? 200 : status });
}
