import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://andrewvirya.me";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/redteam-only", "/.env.backup", "/schedule-with-me"],
      other: {
        "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
      },
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
