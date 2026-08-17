import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The gate and the handover sheet are not public-facing pages.
      disallow: ["/hcp/", "/design-system/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
