import type { MetadataRoute } from "next";

import { getRoleSlugs } from "@/components/pages/careers/roles";
import { getAllPosts } from "@/components/pages/product/blog/posts";
import { SITE_DATE_MODIFIED, SITE_URL } from "@/lib/site";

const routes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/register", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/docs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/changelog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/ai-instructions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/ai-readiness-checker", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/domain-rating-checker", changeFrequency: "monthly", priority: 0.7 },
  { path: "/features/agencies", changeFrequency: "monthly", priority: 0.8 },
  { path: "/features/chatgpt", changeFrequency: "monthly", priority: 0.7 },
  { path: "/features/gemini", changeFrequency: "monthly", priority: 0.7 },
  { path: "/features/ai-mode", changeFrequency: "monthly", priority: 0.7 },
  { path: "/compare/ahrefs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/compare/semrush", changeFrequency: "monthly", priority: 0.7 },
  { path: "/compare/profound", changeFrequency: "monthly", priority: 0.7 },
  { path: "/partnership/agencies", changeFrequency: "monthly", priority: 0.6 },
  { path: "/partnership/creators", changeFrequency: "monthly", priority: 0.6 },
  { path: "/partnership/media", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  { path: "/imprint", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE_DATE_MODIFIED);

  const staticEntries = routes.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const blogEntries = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const careerEntries = getRoleSlugs().map((slug) => ({
    url: `${SITE_URL}/careers/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticEntries, ...blogEntries, ...careerEntries];
}
