import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Explicit allow rules for AI search, citation, training, and agent crawlers.
 * Anny wants to be discoverable in AI answers — keep these allowed unless a
 * specific privacy/legal need requires opting out of one bot.
 *
 * OpenAI: GPTBot (training), OAI-SearchBot (ChatGPT search), ChatGPT-User (user fetches)
 * Anthropic: ClaudeBot / Claude-SearchBot / Claude-User / Anthropic-User
 * Others: Perplexity, Google AI/extended, Apple, Meta, Amazon, Common Crawl, etc.
 */
const AI_BOTS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Anthropic-User",
  // Perplexity / Google / Apple
  "PerplexityBot",
  "Google-Extended",
  "Google-CloudVertexBot",
  "Applebot-Extended",
  // Meta / Amazon / ByteDance / Common Crawl / Diffbot / Cohere
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "Diffbot",
  "cohere-ai",
] as const;

const CASE_STUDY_DISALLOW = [
  "/case-studies/life-pro-fitness",
  "/case-studies/winn-dixie",
] as const;

const PUBLIC_AI_ALLOW = [
  "/",
  "/llms.txt",
  "/llms-full.txt",
  "/ai-instructions",
  "/.well-known/agent-skills/",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [...PUBLIC_AI_ALLOW],
        disallow: [...CASE_STUDY_DISALLOW],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: [...PUBLIC_AI_ALLOW],
        disallow: [...CASE_STUDY_DISALLOW],
      })),
    ],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
