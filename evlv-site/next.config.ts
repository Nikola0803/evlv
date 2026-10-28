import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.83", "localhost", "127.0.0.1"],
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // The CRM's live product feed (see src/lib/product-feed.ts) hands
    // back Product.imageUrl / CoaDocument.url as absolute URLs pointing
    // at the CRM's own domain (peptide-saas's /api/store/products route
    // absolutizes what's stored as a bare "/uploads/..." path -- see
    // absoluteMediaUrl there). next/image refuses to optimize *any*
    // external absolute URL unless its host is explicitly allowlisted
    // here -- without this, every product photo/COA the CRM has an
    // opinion on (which, once the CRM feed is live, is most of them --
    // mergeProducts() lets a CRM-set image win over the static catalog's
    // own working relative path) 400s from next/image's optimizer
    // instead of rendering.
    remotePatterns: [
      { protocol: "https", hostname: "evlvpeptides.com" },
      { protocol: "https", hostname: "www.evlvpeptides.com" },
      // The CRM (peptide-saas) itself, wherever it's hosted -- admin-
      // uploaded product photos and COA PDFs are now served as absolute
      // URLs back to the CRM's own domain (see absoluteMediaUrl in
      // peptide-saas's /api/store/products route), e.g.
      // "crm.evlvpeptides.com". Wildcarded to one subdomain level so this
      // doesn't need editing again if that subdomain changes.
      { protocol: "https", hostname: "*.evlvpeptides.com" },
    ],
  },
  async redirects() {
    return [
      // Renamed to /heroes-discount (broader umbrella covering active
      // duty/veterans/reservists/first responders, not just "military").
      { source: "/military-discount", destination: "/heroes-discount", permanent: true },
      // Affiliate program rebranded/consolidated into a single Ambassador
      // Program page. Every affiliate/ambassador variant should land here.
      { source: "/affiliates", destination: "/ambassadors", permanent: true },
      { source: "/affiliate", destination: "/ambassadors", permanent: true },
      { source: "/affiliate-program", destination: "/ambassadors", permanent: true },
      { source: "/ambassador", destination: "/ambassadors", permanent: true },
      { source: "/ambassador-program", destination: "/ambassadors", permanent: true },
      // Discontinued SKUs — redirect to nearest available size
      { source: "/shop/bpc-157-20mg", destination: "/shop/bpc-157-10mg", permanent: true },
      { source: "/shop/mots-c-40mg", destination: "/shop/mots-c-10mg", permanent: true },
      { source: "/shop/oxytocin-10mg", destination: "/shop/oxytocin-5mg", permanent: true },
      { source: "/shop/ss-31-10mg", destination: "/shop/ss-31-50mg", permanent: true },
      { source: "/shop/tb-500-20mg", destination: "/shop/tb-500-10mg", permanent: true },
      { source: "/shop/tb-500-5mg", destination: "/shop/tb-500-10mg", permanent: true },
      { source: "/shop/tesamorelin-20mg", destination: "/shop/tesamorelin-10mg", permanent: true },
    ];
  },
};

export default nextConfig;
