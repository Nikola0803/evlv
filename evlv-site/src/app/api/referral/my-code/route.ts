import { NextRequest, NextResponse } from "next/server";
import { crmConfigured } from "@/lib/crm-proxy";

const CRM_BASE = process.env.NEXT_PUBLIC_CRM_URL ?? process.env.CRM_URL ?? "";

export async function POST(req: NextRequest) {
  const { token } = await req.json().catch(() => ({}));
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!crmConfigured()) {
    return NextResponse.json({ error: "Referral service not configured" }, { status: 503 });
  }

  try {
    const res = await fetch(`${CRM_BASE}/api/store/referral/my-code`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to reach referral service" }, { status: 502 });
  }
}
