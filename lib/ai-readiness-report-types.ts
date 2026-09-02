import type {
  ReadinessCategory,
  ReadinessReport,
} from "@/components/pages/audits/types";
import type { ScanPhaseId } from "@/lib/ai-readiness-scan-phases";

export type AiReadinessScanStatus = "idle" | "running" | "ready" | "failed";
export type ScanStepStatus = "pending" | "running" | "done" | "failed";

export type ScanProgressStep = {
  id: ScanPhaseId;
  label: string;
  status: ScanStepStatus;
  detail?: string;
};

export type ScanProgress = {
  steps: ScanProgressStep[];
  completedPhases: ScanPhaseId[];
  startedAt?: string | Date;
};

export const CATEGORY_SECTIONS = [
  { id: "cat-site-files", title: "Site files", phase: "site_files" as const },
  { id: "cat-seo", title: "SEO fundamentals", phase: "seo_schema" as const },
  { id: "cat-freshness", title: "Content freshness", phase: "seo_schema" as const },
  { id: "cat-schema", title: "Structured data", phase: "seo_schema" as const },
  { id: "cat-content", title: "Content structure", phase: "content_images" as const },
  { id: "cat-linking", title: "Internal linking", phase: "content_images" as const },
  { id: "cat-images", title: "Image accessibility", phase: "content_images" as const },
  { id: "cat-semantics", title: "HTML semantics", phase: "content_images" as const },
] as const;

export function mergeReportPartials(
  base: Partial<ReadinessReport>,
  partial: Partial<ReadinessReport>,
): Partial<ReadinessReport> {
  const merged: Partial<ReadinessReport> = { ...base, ...partial };

  if (base.categories || partial.categories) {
    const byId = new Map<string, ReadinessCategory>();
    for (const cat of base.categories ?? []) byId.set(cat.id, cat);
    for (const cat of partial.categories ?? []) byId.set(cat.id, cat);
    merged.categories = [...byId.values()];
  }

  return merged;
}
