import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Renamed to /heroes-discount (broader umbrella covering active
      // duty/veterans/reservists/first responders, not just "military").
      { source: "/military-discount", destination: "/heroes-discount", permanent: true },
    ];
  },
};

export default nextConfig;
