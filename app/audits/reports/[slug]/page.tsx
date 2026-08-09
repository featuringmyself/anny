import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ReadinessReportView from "@/components/pages/audits/ReadinessReportView";
import ReportView from "@/components/pages/audits/ReportView";
import {
  getReportEntryBySlug,
  getReportSlugs,
} from "@/components/pages/audits/data";
import { SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getReportSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getReportEntryBySlug(slug);

  if (!entry) {
    return { title: `Report — ${SITE_NAME}` };
  }

  const titleKind =
    entry.kind === "readiness" ? "AI Readiness Report" : "AI Visibility Report";

  return {
    title: `${entry.report.company} ${titleKind} — ${SITE_NAME}`,
    description: entry.report.summary,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AuditReportPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getReportEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  if (entry.kind === "readiness") {
    return <ReadinessReportView report={entry.report} />;
  }

  return <ReportView report={entry.report} />;
}
