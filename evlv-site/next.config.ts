import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.83", "localhost", "127.0.0.1"],
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
