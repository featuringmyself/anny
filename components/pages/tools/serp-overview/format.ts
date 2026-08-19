export function hostnameFromUrl(url: string | null): string {
  if (!url) return "—";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function displayUrl(url: string | null): string {
  if (!url) return "—";
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const crumbs = parsed.pathname
      .split("/")
      .filter(Boolean)
      .slice(0, 3)
      .map((part) => {
        try {
          return decodeURIComponent(part);
        } catch {
          return part;
        }
      });
    return crumbs.length ? `${host} › ${crumbs.join(" › ")}` : host;
  } catch {
    return url;
  }
}

export function formatCount(value: number | null | undefined): string {
  if (value == null) return "—";
  return value.toLocaleString("en-US");
}

export function formatPageType(pageType: string | null): string | null {
  if (!pageType) return null;
  const first = pageType.split(",")[0]?.trim();
  if (!first) return null;
  return first
    .split("/")
    .filter(Boolean)
    .map((part) => part.replace(/_/g, " "))
    .join(" / ");
}

export function formatScore(score: number | null | undefined): string {
  if (score == null) return "—";
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}

export function formatCheckedAt(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function medianScore(values: Array<number | null | undefined>): number | null {
  const scores = values
    .filter((value): value is number => value != null && Number.isFinite(value))
    .sort((a, b) => a - b);
  if (scores.length === 0) return null;
  const mid = Math.floor(scores.length / 2);
  return scores.length % 2 === 0
    ? (scores[mid - 1] + scores[mid]) / 2
    : scores[mid];
}

export function strongestHost(
  positions: Array<{ url: string | null; domain_rating: number | null }>,
): string | null {
  let best: { url: string | null; domain_rating: number | null } | null = null;
  for (const row of positions) {
    if (row.domain_rating == null) continue;
    if (!best || (best.domain_rating ?? 0) < row.domain_rating) {
      best = row;
    }
  }
  return best ? hostnameFromUrl(best.url) : null;
}
