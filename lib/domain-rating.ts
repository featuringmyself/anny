import "server-only";

import * as z from "zod";

export type DomainRating = {
  domain_rating: number;
  ahrefs_rank?: number;
};

type DomainRatingResponse = {
  domain_rating?: DomainRating;
  error?: string;
};

const HOSTNAME =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

function normalizeDomainInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(
      /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
        ? trimmed
        : `https://${trimmed}`,
    );
    return url.hostname.replace(/\.$/, "").toLowerCase();
  } catch {
    return trimmed
      .replace(/^[a-z][a-z0-9+.-]*:\/\//i, "")
      .split(/[/?#]/)[0]
      .split(":")[0]
      .replace(/\.$/, "")
      .toLowerCase();
  }
}

export const domainInputSchema = z
  .string({ error: "Enter a domain." })
  .trim()
  .min(1, "Enter a domain.")
  .transform(normalizeDomainInput)
  .pipe(z.string().regex(HOSTNAME, "Enter a valid domain."));

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

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: 86400 },
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
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw?.trim()) return "";

  const parsed = domainInputSchema.safeParse(raw);
  return parsed.success ? parsed.data : normalizeDomainInput(raw);
}
