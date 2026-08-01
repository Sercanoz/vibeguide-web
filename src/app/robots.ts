import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /v2–/v7: noindex'li prototip sayfaları — tarama bütçesini boşa harcamasın.
        disallow: ["/api/", "/_next/", "/trip/", "/admin/", "/v2/", "/v3/", "/v4/", "/v5/", "/v6/", "/v7/"],
      },
    ],
    sitemap: "https://www.vibeguideapp.com/sitemap.xml",
    host: "https://www.vibeguideapp.com",
  };
}
