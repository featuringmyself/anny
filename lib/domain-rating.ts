import "server-only";

export type DomainRating = {
  domain_rating: number;
  ahrefs_rank: number;
};

type DomainRatingResponse = {
  domain_rating?: DomainRating;
  error?: string;
};

export async function getDomainRating(
  domain: string,
): Promise<DomainRating | { error: string }> {
  const target = domain.trim();

  if (!target) {
    return { error: "Domain is required" };
  }

  const apiKey = process.env.AHREF_API_KEY;

  if (!apiKey) {
    return { error: "Failed to check domain rating" };
  }

  const url = new URL("https://api.ahrefs.com/v3/public/domain-rating-free");
  url.searchParams.set("target", target);
  url.searchParams.set("output", "json");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    return { error: "Failed to check domain rating" };
  }

  const data = (await response.json()) as DomainRatingResponse;

  if (!data.domain_rating) {
    return { error: data.error ?? "Failed to check domain rating" };
  }

  return data.domain_rating;
}

export function parseDomainParam(
  value: string | string[] | undefined,
): string {
  const domain = Array.isArray(value) ? value[0] : value;
  return domain?.trim() ?? "";
}
