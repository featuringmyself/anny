import "server-only";

import {
  countryInputSchema,
  keywordInputSchema,
  type SerpCountryCode,
} from "@/lib/serp-input";

export type { SerpCountryCode } from "@/lib/serp-input";
export {
  countryLabel,
  parseCountryParam,
  parseKeywordParam,
  SERP_COUNTRIES,
} from "@/lib/serp-input";

const SERP_COLUMNS = [
  "position",
  "type",
  "url",
  "title",
  "domain_rating",
  "url_rating",
  "ahrefs_rank",
  "update_date",
] as const;

export const TOP_ORGANIC_POSITIONS = 10;

export type SerpPosition = {
  position: number;
  type: string[];
  url: string | null;
  title: string | null;
  domain_rating: number | null;
  url_rating: number | null;
  ahrefs_rank: number | null;
  update_date: string | null;
};

export type SerpOverview = {
  keyword: string;
  country: SerpCountryCode;
  updateDate: string | null;
  positions: SerpPosition[];
};

type SerpOverviewResponse = {
  positions?: SerpPosition[];
  error?: string;
};

export async function getSerpOverview(
  keyword: string,
  country: string,
): Promise<SerpOverview | { error: string }> {
  const parsedKeyword = keywordInputSchema.safeParse(keyword);
  if (!parsedKeyword.success) {
    return {
      error: parsedKeyword.error.issues[0]?.message ?? "Enter a keyword.",
    };
  }

  const parsedCountry = countryInputSchema.safeParse(country);
  if (!parsedCountry.success) {
    return {
      error:
        parsedCountry.error.issues[0]?.message ?? "Pick a supported country.",
    };
  }

  const apiKey = process.env.AHREF_API_KEY;

  if (!apiKey) {
    return { error: "Failed to load SERP overview" };
  }

  const url = new URL("https://api.ahrefs.com/v3/serp-overview/serp-overview");
  url.searchParams.set("select", SERP_COLUMNS.join(","));
  url.searchParams.set("keyword", parsedKeyword.data);
  url.searchParams.set("country", parsedCountry.data);
  url.searchParams.set("type", "organic");
  url.searchParams.set("top_positions", String(TOP_ORGANIC_POSITIONS));
  url.searchParams.set("output", "json");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    return { error: "Failed to load SERP overview" };
  }

  const data = (await response.json()) as SerpOverviewResponse;

  if (!Array.isArray(data.positions)) {
    return { error: data.error ?? "Failed to load SERP overview" };
  }

  const positions = data.positions
    .filter((row) => typeof row.position === "number")
    .sort((a, b) => a.position - b.position)
    .slice(0, TOP_ORGANIC_POSITIONS);

  return {
    keyword: parsedKeyword.data,
    country: parsedCountry.data,
    updateDate: positions[0]?.update_date ?? null,
    positions,
  };
}
