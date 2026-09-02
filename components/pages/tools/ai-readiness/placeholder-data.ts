import type { ReadinessStatus } from "@/components/pages/audits/types";
import { CATEGORY_META } from "@/components/pages/tools/ai-readiness/bands";

export type PlaceholderCategory = {
  id: keyof typeof CATEGORY_META;
  title: string;
  score: number;
  max: number;
  status: ReadinessStatus;
  body: string;
};

export type PlaceholderStat = {
  label: string;
  value: string;
};

function domainSeed(domain: string): number {
  let hash = 0;
  for (let i = 0; i < domain.length; i += 1) {
    hash = (hash * 31 + domain.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function scoreToStatus(score: number, max: number): ReadinessStatus {
  const ratio = max === 0 ? 0 : score / max;
  if (ratio >= 0.7) return "good";
  if (ratio >= 0.4) return "needs-improvement";
  return "poor";
}

export function deriveCategoryScores(
  overallScore: number,
  domain: string,
): PlaceholderCategory[] {
  const seed = domainSeed(domain);
  const maxes = [35, 35, 20, 10] as const;
  const ids = ["crawl", "identity", "cite", "extras"] as const;
  const titles = [
    "Crawl access",
    "Brand identity",
    "Citation readiness",
    "Agent extras",
  ] as const;

  const jitter = ids.map((_, index) => 0.82 + ((seed >> (index * 4)) & 0xf) / 32);
  const weighted = maxes.map((max, index) => max * jitter[index]);
  const weightSum = weighted.reduce((sum, value) => sum + value, 0);

  let allocated = 0;
  const scores = maxes.map((max, index) => {
    if (index === maxes.length - 1) {
      return Math.min(max, Math.max(0, overallScore - allocated));
    }

    const raw = Math.round((overallScore * weighted[index]) / weightSum);
    const score = Math.min(max, Math.max(0, raw));
    allocated += score;
    return score;
  });

  const bodies: Record<(typeof ids)[number], string> = {
    crawl:
      "robots.txt rules and bot-specific directives determine whether AI crawlers can fetch public pages consistently.",
    identity:
      "Title, meta description, H1, and Organization markup tell models who owns the site and what it offers.",
    cite:
      "Sitemap coverage, canonical tags, and FAQ signals affect whether models can find stable URLs to reference.",
    extras:
      "llms.txt and agent skill files help coding agents discover capabilities — they do not decide ChatGPT rankings.",
  };

  return ids.map((id, index) => ({
    id,
    title: titles[index],
    score: scores[index],
    max: maxes[index],
    status: scoreToStatus(scores[index], maxes[index]),
    body: bodies[id],
  }));
}

export function deriveStats(
  overallScore: number,
  domain: string,
): PlaceholderStat[] {
  const seed = domainSeed(domain);
  const checksRun = 18 + (seed % 5);
  const issues = Math.max(2, Math.round((100 - overallScore) / 7) + (seed % 3));
  const agentsAllowed = Math.min(9, 4 + (seed % 6));
  const discoveryCount = seed % 4;

  return [
    { label: "Checks run", value: String(checksRun) },
    { label: "Issues flagged", value: String(issues) },
    {
      label: "AI agents allowed",
      value: `${agentsAllowed}/9`,
    },
    {
      label: "Discovery files",
      value: discoveryCount === 0 ? "None" : String(discoveryCount),
    },
  ];
}

export function executiveSummary(
  company: string,
  score: number,
  band: string,
): string {
  if (score < 30) {
    return `${company} scores ${score}/100 — ${band.toLowerCase()}. Crawlers may be blocked or the homepage lacks the basics models need to fetch and name the site. The sections below group findings across crawl access, brand identity, citation signals, and agent discovery files.`;
  }

  if (score < 50) {
    return `${company} scores ${score}/100 — ${band.toLowerCase()}. Some crawl access exists, but brand identity and citation signals are still thin. Fixing robots.txt gaps, structured data, and sitemap discovery would move the score quickly.`;
  }

  if (score < 70) {
    return `${company} scores ${score}/100 — ${band.toLowerCase()}. Bots can fetch the site, but a few homepage and site-file gaps still make the brand harder to pin down than it needs to be. The category breakdown shows where effort will pay off first.`;
  }

  if (score < 85) {
    return `${company} scores ${score}/100 — ${band.toLowerCase()}. Crawlers can fetch the site and attach a name to it. Remaining gaps are mostly citation polish and optional agent discovery files.`;
  }

  return `${company} scores ${score}/100 — ${band.toLowerCase()}. On-site basics are in place for AI agents to fetch, name, and cite the site. The next question is whether models actually mention ${company} in answers.`;
}

export function deriveAgentTeaser(domain: string) {
  const seed = domainSeed(domain);
  const allowed = Math.min(9, 4 + (seed % 6));
  const blocked = 9 - allowed;
  const llmsFound = seed % 5 === 0;

  return {
    allowed,
    blocked,
    total: 9,
    llmsFound,
    missingDiscovery: llmsFound ? 2 : 3,
    totalDiscovery: 3,
  };
}
