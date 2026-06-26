import type { MetadataRoute } from "next";
import { getGuides } from "@/lib/guides";

const siteUrl = "https://unisorder.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getGuides({ publishedOnly: true });
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/features",
    "/stories",
    "/pricing",
    "/guide",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${siteUrl}/guide/${guide.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...guideRoutes];
}
