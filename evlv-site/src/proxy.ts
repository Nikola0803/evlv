import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/_next/image" &&
    request.nextUrl.searchParams.get("url") === "/images/products/klow-80mg.png"
  ) {
    const currentImage = request.nextUrl.clone();
    currentImage.searchParams.set("url", "/images/products/generated-v1/klow-80mg.png");
    currentImage.searchParams.delete("dpl");
    return NextResponse.redirect(currentImage, 308);
  }

  if (request.nextUrl.hostname === "evlvpeptides.com") {
    const canonical = request.nextUrl.clone();
    canonical.hostname = "www.evlvpeptides.com";
    canonical.protocol = "https:";
    return NextResponse.redirect(canonical, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/_next/image", "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
