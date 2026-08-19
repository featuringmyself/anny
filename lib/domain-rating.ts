import "server-only";

import { after } from "next/server";

import {
  domainInputSchema,
  parseDomainParam,
} from "@/lib/domain-input";
import {
  findFreshDomainRating,
  recordDomainRatingLookup,
  touchDomainRatingLookup,
} from "@/lib/domain-rating-lookups";

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

  const cached = await findFreshDomainRating(parsed.data);
  if (cached) {
    scheduleCacheHit(parsed.data);
    return cached;
  }

  const result = await fetchDomainRating(parsed.data);
  scheduleLookupRecord(parsed.data, result);
  return result;
}

async function fetchDomainRating(
  domain: string,
): Promise<DomainRating | { error: string }> {
  const apiKey = process.env.AHREF_API_KEY;

  if (!apiKey) {
    return { error: "Failed to check domain rating" };
  }

  const url = new URL("https://api.ahrefs.com/v3/public/domain-rating-free");
  url.searchParams.set("target", domain);
  url.searchParams.set("output", "json");

  try {
    const response = await fetch(url, {
      cache: "no-store",
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

function scheduleCacheHit(domain: string) {
  after(async () => {
    try {
      await touchDomainRatingLookup(domain);
    } catch (error) {
      console.error("[domain-rating] failed to touch lookup", error);
    }
  });
}

function scheduleLookupRecord(
  domain: string,
  result: DomainRating | { error: string },
) {
  after(async () => {
    try {
      await recordDomainRatingLookup(domain, result);
    } catch (error) {
      console.error("[domain-rating] failed to store lookup", error);
    }
  });
}
