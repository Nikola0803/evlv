import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Keep only genuinely private journey routes out of crawler requests. API
  // responses carry X-Robots-Tag instead, so public QR image assets are not
  // reported as "blocked" while still remaining ineligible for indexing.
  const privateRoutes = ["/checkout", "/order-success", "/payment-return", "/payment-failed", "/research-guide", "/trade/apply", "/trade/portal"];
  const auPrelaunch = process.env.NEXT_PUBLIC_SITE_MARKET === "AU" && process.env.AU_INDEXING_ENABLED !== "true";

  if (auPrelaunch) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      sitemap: "https://www.evlvpeptides.com.au/sitemap.xml",
      host: "www.evlvpeptides.com.au",
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privateRoutes,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: privateRoutes,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: privateRoutes,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: privateRoutes,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: privateRoutes,
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_MARKET === "AU" ? "https://www.evlvpeptides.com.au" : "https://www.evlvpeptides.com"}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_MARKET === "AU" ? "www.evlvpeptides.com.au" : "www.evlvpeptides.com",
  };
}
