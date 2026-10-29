import { NextResponse } from "next/server";

const BADGE_URL = "https://launchorbit.co/api/badge?theme=light&v=9";
const TTL = 24 * 60 * 60 * 1000;

let cache: { buf: ArrayBuffer; ct: string; at: number } | null = null;

export async function GET() {
  if (!cache || Date.now() - cache.at > TTL) {
    const res = await fetch(BADGE_URL);
    const buf = await res.arrayBuffer();
    const ct = res.headers.get("content-type") ?? "image/svg+xml";
    cache = { buf, ct, at: Date.now() };
  }
  const { buf, ct } = cache;
  return new NextResponse(buf, {
    headers: {
      "content-type": ct,
      "cache-control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
