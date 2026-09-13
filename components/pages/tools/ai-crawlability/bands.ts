export const CRAWL_BANDS = [
  {
    from: 0,
    to: 29,
    label: "Restricted",
    copy: "Major AI crawlers are blocked, or the site could not be reached.",
  },
  {
    from: 30,
    to: 49,
    label: "Limited access",
    copy: "Some bots can crawl, but key training or search crawlers are still denied.",
  },
  {
    from: 50,
    to: 69,
    label: "Mostly accessible",
    copy: "Most AI bots can fetch the site. Tighten robots.txt and discovery files next.",
  },
  {
    from: 70,
    to: 84,
    label: "Crawl ready",
    copy: "AI crawlers can access the site. A sitemap or llms.txt would improve discovery.",
  },
  {
    from: 85,
    to: 100,
    label: "Fully open",
    copy: "robots.txt, major bots, and discovery signals look open to AI systems.",
  },
] as const;

export function bandForScore(score: number) {
  return (
    CRAWL_BANDS.find((band) => score >= band.from && score <= band.to) ??
    CRAWL_BANDS[0]
  );
}
