import type { ReadinessReport, VisibilityReport } from "../types";
import { companyAiVisibilityReport } from "./company-ai-visibility-report";
import { hilivingAiVisibilityReport } from "./hiliving-ai-visibility-report";
import { rentokAiVisibilityReport } from "./rentok-ai-visibility-report";
import { sprentzoAiReadinessReport } from "./sprentzo-ai-readiness-report";
import { sprentzoAiVisibilityReport } from "./sprentzo-ai-visibility-report";
import { trulivAiVisibilityReport } from "./truliv-ai-visibility-report";
import { zippservAiVisibilityReport } from "./zippserv-ai-visibility-report";

export type ReportEntry =
  | { kind: "visibility"; report: VisibilityReport }
  | { kind: "readiness"; report: ReadinessReport };

const entries: ReportEntry[] = [
  { kind: "visibility", report: companyAiVisibilityReport },
  { kind: "visibility", report: rentokAiVisibilityReport },
  { kind: "visibility", report: zippservAiVisibilityReport },
  { kind: "visibility", report: trulivAiVisibilityReport },
  { kind: "visibility", report: sprentzoAiVisibilityReport },
  { kind: "visibility", report: hilivingAiVisibilityReport },
  { kind: "readiness", report: sprentzoAiReadinessReport },
];

export function getAllReportEntries(): ReportEntry[] {
  return entries;
}

export function getReportEntryBySlug(slug: string): ReportEntry | undefined {
  return entries.find((entry) => entry.report.slug === slug);
}

export function getReportSlugs(): string[] {
  return entries.map((entry) => entry.report.slug);
}

/** Visibility reports only (legacy helpers). */
export function getAllReports(): VisibilityReport[] {
  return entries
    .filter(
      (entry): entry is { kind: "visibility"; report: VisibilityReport } =>
        entry.kind === "visibility",
    )
    .map((entry) => entry.report);
}

export function getReportBySlug(slug: string): VisibilityReport | undefined {
  const entry = getReportEntryBySlug(slug);
  return entry?.kind === "visibility" ? entry.report : undefined;
}
