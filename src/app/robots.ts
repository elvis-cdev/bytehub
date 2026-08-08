import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/developer/dashboard",
          "/developer/applications",
          "/developer/profile",
          "/developer/projects/",
          "/company/dashboard",
          "/company/projects/",
          "/company/developers/",
          "/feed",
        ],
      },
    ],
    sitemap: "https://www.bytehub.co.ke/sitemap.xml",
  };
}
