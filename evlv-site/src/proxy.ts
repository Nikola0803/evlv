import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMarket } from "@/lib/market";

export function proxy(request: NextRequest) {
  const market = getMarket();
  const requestHost = request.nextUrl.hostname.toLowerCase();
  const isAustralianHost = requestHost.endsWith("evlvpeptides.com.au");
  const isUsMarket = market.id === "US" && !isAustralianHost;
  if (isUsMarket && request.nextUrl.pathname.startsWith("/coas/") && request.nextUrl.pathname.toLowerCase().endsWith(".pdf")) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow, noarchive" },
    });
  }
  const auBlockedRoutes = ["/research-peptides-usa", "/heroes-discount", "/compare", "/wholesale"];
  if (market.id === "AU" && auBlockedRoutes.some((path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`))) {
    return NextResponse.redirect(new URL("/", request.url), 307);
  }
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
  if (!auBlockedRoutes.some((path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`))) {
    const pathname = request.nextUrl.pathname;
    response.headers.set(
      "Link",
      `<https://www.evlvpeptides.com${pathname}>; rel="alternate"; hreflang="en-US", <https://www.evlvpeptides.com.au${pathname}>; rel="alternate"; hreflang="en-AU", <https://www.evlvpeptides.com${pathname}>; rel="alternate"; hreflang="x-default"`,
    );
  }
  if (market.id === "AU" && process.env.AU_INDEXING_ENABLED !== "true") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/coas/:path*", "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
