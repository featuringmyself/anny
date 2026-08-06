import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Anthropic-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
] as const;

const CASE_STUDY_DISALLOW = [
  "/case-studies/life-pro-fitness",
  "/case-studies/winn-dixie",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...CASE_STUDY_DISALLOW],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/" as const,
        disallow: [...CASE_STUDY_DISALLOW],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
