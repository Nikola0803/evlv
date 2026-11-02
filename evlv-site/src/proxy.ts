import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMarket } from "@/lib/market";

export function proxy(request: NextRequest) {
  const market = getMarket();
  const bareHostname = market.hostname.replace(/^www\./, "");
  if (request.nextUrl.hostname === bareHostname) {
    const canonical = request.nextUrl.clone();
    canonical.hostname = market.hostname;
    canonical.protocol = "https:";
    return NextResponse.redirect(canonical, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  requestHeaders.set("x-market", market.id);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (market.id === "AU" && process.env.AU_INDEXING_ENABLED !== "true") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
