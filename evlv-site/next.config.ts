import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.83", "localhost", "127.0.0.1"],
  images: {
    // The CRM's live product feed (see src/lib/product-feed.ts) stores
    // Product.imageUrl as a full absolute URL back at this same site
    // (peptide-saas's seed builds it as "https://" + CRM_STORE_DOMAIN +
    // path) rather than a relative path. next/image refuses to optimize
    // *any* external absolute URL unless its host is explicitly
    // allowlisted here -- without this, every product photo the CRM has
    // an opinion on (which, once the CRM feed is live, is most of them --
    // mergeProducts() lets a CRM-set image win over the static catalog's
    // own working relative path) silently renders as a broken image
    // icon instead of erroring loudly. Confirmed live: this is why
    // product photos "went missing" on the storefront once the CRM
    // feed started actually returning imageUrl values, not a lost-file
    // problem on either end.
    remotePatterns: [
      { protocol: "https", hostname: "evlvpeptides.com" },
      { protocol: "https", hostname: "www.evlvpeptides.com" },
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
    ];
  },
};

export default nextConfig;
