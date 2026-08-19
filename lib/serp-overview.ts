import "server-only";

import {
  groupIdForTypes,
  type SerpGroupId,
} from "@/lib/serp-features";
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
  "page_type",
  "keywords",
  "backlinks",
  "top_keyword",
] as const;

const TOP_ORGANIC_POSITIONS = 10;

export type SerpPosition = {
  position: number;
  type: string[];
  url: string | null;
  title: string | null;
  domain_rating: number | null;
  url_rating: number | null;
  ahrefs_rank: number | null;
  update_date: string | null;
  page_type: string | null;
  keywords: number | null;
  backlinks: number | null;
  top_keyword: string | null;
};

export type SerpOverview = {
  keyword: string;
  country: SerpCountryCode;
  updateDate: string | null;
  positions: SerpPosition[];
};

type SerpOverviewResponse = {
  positions?: Partial<SerpPosition>[];
  error?: string;
};

function normalizePosition(row: Partial<SerpPosition>): SerpPosition | null {
  if (typeof row.position !== "number") return null;

  return {
    position: row.position,
    type: Array.isArray(row.type) ? row.type : [],
    url: row.url ?? null,
    title: row.title ?? null,
    domain_rating: row.domain_rating ?? null,
    url_rating: row.url_rating ?? null,
    ahrefs_rank: row.ahrefs_rank ?? null,
    update_date: row.update_date ?? null,
    page_type: row.page_type ?? null,
    keywords: row.keywords ?? null,
    backlinks: row.backlinks ?? null,
    top_keyword: row.top_keyword ?? null,
  };
}

export function positionsInGroup(
  positions: SerpPosition[],
  group: SerpGroupId,
): SerpPosition[] {
  return positions.filter((row) => groupIdForTypes(row.type) === group);
}

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
    throw new Error("Failed to load SERP overview");
  }

  const url = new URL("https://api.ahrefs.com/v3/serp-overview/serp-overview");
  url.searchParams.set("select", SERP_COLUMNS.join(","));
  url.searchParams.set("keyword", parsedKeyword.data);
  url.searchParams.set("country", parsedCountry.data);
  url.searchParams.set("top_positions", String(TOP_ORGANIC_POSITIONS));
  url.searchParams.set("output", "json");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    next: {
      revalidate: 3600,
      tags: [
        `serp-overview:${parsedCountry.data}:${parsedKeyword.data.toLowerCase()}`,
      ],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load SERP overview");
  }

  const data = (await response.json()) as SerpOverviewResponse;

  if (!Array.isArray(data.positions)) {
    throw new Error("Failed to load SERP overview");
  }

  const positions = data.positions
    .map(normalizePosition)
    .filter((row): row is SerpPosition => row != null)
    .sort((a, b) => a.position - b.position);

  return {
    keyword: parsedKeyword.data,
    country: parsedCountry.data,
    updateDate: positions[0]?.update_date ?? null,
    positions,
  };
}
