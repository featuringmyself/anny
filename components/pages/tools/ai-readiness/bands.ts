export const READINESS_BANDS = [
  {
    from: 0,
    to: 29,
    label: "Not ready",
    copy: "Agents will struggle to crawl, name, or understand this site.",
  },
  {
    from: 30,
    to: 49,
    label: "Early",
    copy: "Some signals exist, but discovery files or markup are still thin.",
  },
  {
    from: 50,
    to: 69,
    label: "Getting ready",
    copy: "A usable baseline. A few high-impact files would lift this fast.",
  },
  {
    from: 70,
    to: 84,
    label: "Ready",
    copy: "Crawlers and agents can parse the site with confidence.",
  },
  {
    from: 85,
    to: 100,
    label: "Agent-native",
    copy: "Discovery files, schema, and HTML are in good shape for AI agents.",
  },
] as const;

export function bandForScore(score: number) {
  return (
    READINESS_BANDS.find((band) => score >= band.from && score <= band.to) ??
    READINESS_BANDS[0]
  );
}
