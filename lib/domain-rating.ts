import "server-only";

import {
  domainInputSchema,
  parseDomainParam,
} from "@/lib/domain-input";

export type DomainRating = {
  domain_rating: number;
  ahrefs_rank?: number;
};

export { parseDomainParam };

type DomainRatingResponse = {
  domain_rating?: DomainRating;
  error?: string;
};

export async function getDomainRating(
  domain: string,
): Promise<DomainRating | { error: string }> {
  const parsed = domainInputSchema.safeParse(domain);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Enter a valid domain.",
    };
  }

  const apiKey = process.env.AHREF_API_KEY;

  if (!apiKey) {
    return { error: "Failed to check domain rating" };
  }

  const url = new URL("https://api.ahrefs.com/v3/public/domain-rating-free");
  url.searchParams.set("target", parsed.data);
  url.searchParams.set("output", "json");

  try {
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
  } catch {
    return { error: "Failed to check domain rating" };
  }
}
