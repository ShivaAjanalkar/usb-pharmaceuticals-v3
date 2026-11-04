import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Respect the project path while hosting on GitHub Pages.
      disallow: [`${base}/hcp/`],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
