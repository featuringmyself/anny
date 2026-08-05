import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ReportView from "@/components/pages/audits/ReportView";
import {
  getReportBySlug,
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
  const report = getReportBySlug(slug);

  if (!report) {
    return { title: `Report — ${SITE_NAME}` };
  }

  return {
    title: `${report.company} AI Visibility Report — ${SITE_NAME}`,
    description: report.summary,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AuditReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getReportBySlug(slug);

  if (!report) {
    notFound();
  }

  return <ReportView report={report} />;
}
