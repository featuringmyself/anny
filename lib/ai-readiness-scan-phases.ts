export type ScanPhaseId =
  | "crawl"
  | "site_files"
  | "seo_schema"
  | "content_images"
  | "automation"
  | "agents"
  | "synthesis";

export const SCAN_PHASE_ORDER: ScanPhaseId[] = [
  "crawl",
  "site_files",
  "seo_schema",
  "content_images",
  "automation",
  "agents",
  "synthesis",
];

export const SCAN_PHASE_LABELS: Record<ScanPhaseId, string> = {
  crawl: "Fetching pages",
  site_files: "Site files & crawl",
  seo_schema: "SEO & structured data",
  content_images: "Content & images",
  automation: "Form automation",
  agents: "AI agent access",
  synthesis: "Summary & fixes",
};
