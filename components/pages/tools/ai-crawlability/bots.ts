export const EXAMPLE_DOMAINS = [
  "openai.com",
  "anthropic.com",
  "nytimes.com",
] as const;

/** Shared with the crawl engine. Keep in sync with scoring in lib/ai-crawlability.ts */
export const AI_CRAWL_BOTS = [
  { agent: "GPTBot", vendor: "OpenAI", role: "Training" },
  { agent: "OAI-SearchBot", vendor: "OpenAI", role: "ChatGPT search" },
  { agent: "ChatGPT-User", vendor: "OpenAI", role: "Live answers" },
  { agent: "ClaudeBot", vendor: "Anthropic", role: "Training" },
  { agent: "Claude-SearchBot", vendor: "Anthropic", role: "Claude search" },
  { agent: "Claude-User", vendor: "Anthropic", role: "Live answers" },
  { agent: "PerplexityBot", vendor: "Perplexity", role: "Answer engine" },
  { agent: "Google-Extended", vendor: "Google", role: "Gemini training" },
  { agent: "Applebot-Extended", vendor: "Apple", role: "Apple Intelligence" },
  { agent: "Amazonbot", vendor: "Amazon", role: "Alexa / search" },
  { agent: "meta-externalagent", vendor: "Meta", role: "AI training" },
  { agent: "Bytespider", vendor: "ByteDance", role: "Training" },
  { agent: "CCBot", vendor: "Common Crawl", role: "Open datasets" },
  { agent: "cohere-ai", vendor: "Cohere", role: "Training" },
] as const;

export const CRAWL_CHECK_BUCKETS = [
  {
    id: "bots",
    label: "AI crawler rules",
    copy: "robots.txt allow/deny for major training, search, and live-answer user agents.",
  },
  {
    id: "homepage",
    label: "Homepage fetch",
    copy: "Whether the site responds over HTTPS so crawlers can load a page at all.",
  },
  {
    id: "sitemap",
    label: "sitemap.xml",
    copy: "A published sitemap so bots can discover URLs beyond the homepage.",
  },
  {
    id: "llms",
    label: "llms.txt",
    copy: "Optional map for coding agents. Useful, but never treated as a hard failure.",
  },
] as const;
