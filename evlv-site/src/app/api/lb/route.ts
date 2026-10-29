import { NextResponse } from "next/server";

const BADGE_URL = "https://launchorbit.co/api/badge?theme=light&v=9";
const TTL = 24 * 60 * 60 * 1000;

let cache: { buf: Buffer; ct: string; at: number } | null = null;

export async function GET() {
  if (!cache || Date.now() - cache.at > TTL) {
    const res = await fetch(BADGE_URL, { next: { revalidate: 86400 } });
    const buf = Buffer.from(await res.arrayBuffer());
    const ct = res.headers.get("content-type") ?? "image/svg+xml";
    cache = { buf, ct, at: Date.now() };
  }
  return new NextResponse(cache.buf, {
    headers: {
      "content-type": cache.ct,
      "cache-control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
