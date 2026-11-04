import type { MetadataRoute } from "next";
import { LEGAL_DOCS } from "@/data/legal";
import { PRODUCTS } from "@/data/products";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    ["/", 1],
    ["/about/", 0.8],
    ["/products/", 0.9],
    ["/services/", 0.8],
    ["/quality/", 0.8],
    ["/careers/", 0.6],
    ["/contact/", 0.7],
  ] as const;

  return [
    ...staticPaths.map(([path, priority]) => ({
      url: siteUrl(path),
      lastModified: new Date(),
      priority,
    })),
    ...PRODUCTS.map((p) => ({
      url: siteUrl(`/products/${p.slug}/`),
      lastModified: new Date(),
      priority: 0.5,
    })),
    ...LEGAL_DOCS.map((d) => ({
      url: siteUrl(`/legal/${d.slug}/`),
      lastModified: new Date(),
      priority: 0.3,
    })),
  ];
}
