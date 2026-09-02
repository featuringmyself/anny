import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { AiReadinessReportExperience } from "@/components/pages/tools/ai-readiness/AiReadinessReportExperience";
import {
  AR_REPORT_COOKIE,
  getAiReadinessReportById,
  isReportAccessGranted,
  parseReportAccessCookie,
} from "@/lib/ai-readiness-reports";
import { SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const report = await getAiReadinessReportById(id);

  if (!report) {
    return { title: `Report — ${SITE_NAME}` };
  }

  const company = report.domain.replace(/^www\./, "");

  return {
    title: `${company} AI Readiness Report — ${SITE_NAME}`,
    description: `Full AI readiness dossier for ${report.domain}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AiReadinessReportPage({ params }: PageProps) {
  const { id } = await params;
  const report = await getAiReadinessReportById(id);

  if (!report) {
    notFound();
  }

  const cookieStore = await cookies();
  const access = parseReportAccessCookie(cookieStore.get(AR_REPORT_COOKIE)?.value);
  const unlocked = isReportAccessGranted(report, access);

  return (
    <AiReadinessReportExperience
      reportId={report.id}
      domain={report.domain}
      score={report.quickScore}
      band={report.quickBand}
      unlocked={unlocked}
      scanStatus={report.scanStatus ?? "idle"}
      initialScan={report.scan}
      initialPartial={report.scanPartial}
      initialProgress={
        report.scanProgress
          ? {
              ...report.scanProgress,
              startedAt:
                report.scanProgress.startedAt instanceof Date
                  ? report.scanProgress.startedAt.toISOString()
                  : report.scanProgress.startedAt,
            }
          : undefined
      }
    />
  );
}
