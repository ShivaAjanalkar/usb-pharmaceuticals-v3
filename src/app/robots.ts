import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The HCP confirmation page has noindex metadata. Crawlers must be able
      // to read that directive; blocking the URL here would hide it from them.
    },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
