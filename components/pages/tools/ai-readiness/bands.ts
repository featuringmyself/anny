export const READINESS_BANDS = [
  {
    from: 0,
    to: 29,
    label: "Blocked",
    copy: "AI crawlers probably cannot fetch or name this site yet.",
  },
  {
    from: 30,
    to: 49,
    label: "Weak identity",
    copy: "Some access exists, but the brand is still hard for models to pin down.",
  },
  {
    from: 50,
    to: 69,
    label: "Crawlable",
    copy: "Bots can get in. A few homepage fixes would make the brand obvious.",
  },
  {
    from: 70,
    to: 84,
    label: "Identifiable",
    copy: "Crawlers can fetch the site and attach a name to it.",
  },
  {
    from: 85,
    to: 100,
    label: "Citation-ready",
    copy: "On-site basics are in place. Next: whether models actually mention you.",
  },
] as const;

export const CATEGORY_META = {
  crawl: {
    label: "Can AI fetch it?",
    copy: "robots.txt plus OpenAI, Claude, and Perplexity bots — training, search, and live answers.",
  },
  identity: {
    label: "Can AI name it?",
    copy: "Title, description, H1, and Organization markup so models know who the page belongs to.",
  },
  cite: {
    label: "Can AI cite it?",
    copy: "Sitemap, canonical URL, and optional FAQ/sameAs signals that help with clean citations.",
  },
  extras: {
    label: "Agent extras",
    copy: "llms.txt and skill files help coding agents. They do not decide ChatGPT rankings.",
  },
} as const;

export function bandForScore(score: number) {
  return (
    READINESS_BANDS.find((band) => score >= band.from && score <= band.to) ??
    READINESS_BANDS[0]
  );
}
