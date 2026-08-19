export const SERP_TYPE_LABELS: Record<string, string> = {
  paid_top: "Paid · top",
  paid_bottom: "Paid · bottom",
  paid_right: "Paid · right",
  paid_sitelink: "Paid sitelink",
  organic: "Organic",
  sitelink: "Sitelink",
  snippet: "Featured snippet",
  image: "Images",
  article: "Top stories",
  knowledge_card: "Knowledge card",
  knowledge_panel: "Knowledge panel",
  local_pack: "Local pack",
  local_teaser: "Local teaser",
  news: "News",
  question: "People also ask",
  video: "Videos",
  shopping: "Shopping",
  twitter: "Posts",
  discussions: "Discussions",
  jobs: "Jobs",
  events: "Events",
  recipes: "Recipes",
  podcasts: "Podcasts",
  ai_overview: "AI Overview",
  sitelinks_search_box: "Sitelinks search",
  related_searches: "Related searches",
  people_also_search: "People also search",
};

export type SerpGroupId = "paid" | "features" | "organic";

export const SERP_GROUPS: { id: SerpGroupId; label: string }[] = [
  { id: "paid", label: "Paid" },
  { id: "features", label: "SERP features" },
  { id: "organic", label: "Organic" },
];

export function formatSerpType(type: string): string {
  return SERP_TYPE_LABELS[type] ?? type.replace(/_/g, " ");
}

export function groupIdForTypes(types: string[]): SerpGroupId {
  if (types.some((type) => type.startsWith("paid"))) return "paid";
  if (types.includes("organic") || types.includes("sitelink")) return "organic";
  return "features";
}

export function isSitelink(types: string[]): boolean {
  return types.includes("sitelink") || types.includes("paid_sitelink");
}
