import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Keep only genuinely private journey routes out of crawler requests. API
  // responses carry X-Robots-Tag instead, so public QR image assets are not
  // reported as "blocked" while still remaining ineligible for indexing.
  const privateRoutes = ["/checkout", "/order-success", "/research-guide", "/trade/apply", "/trade/portal"];

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
    sitemap: "https://www.evlvpeptides.com/sitemap.xml",
    host: "www.evlvpeptides.com",
  };
}
