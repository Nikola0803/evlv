import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account", "/checkout", "/order-success"],
      },
    ],
    sitemap: "https://evlvpeptides.com/sitemap.xml",
  };
}
