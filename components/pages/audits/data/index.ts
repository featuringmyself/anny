import type { VisibilityReport } from "../types";
import { companyAiVisibilityReport } from "./company-ai-visibility-report";
import { rentokAiVisibilityReport } from "./rentok-ai-visibility-report";

const reports: VisibilityReport[] = [
  companyAiVisibilityReport,
  rentokAiVisibilityReport,
];

export function getAllReports(): VisibilityReport[] {
  return reports;
}

export function getReportBySlug(slug: string): VisibilityReport | undefined {
  return reports.find((report) => report.slug === slug);
}

export function getReportSlugs(): string[] {
  return reports.map((report) => report.slug);
}
