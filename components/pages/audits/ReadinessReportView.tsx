import PatternStrip from "@/components/PatternStrip";

import ReportCta from "./ReportCta";
import ReportPrivateBanner from "./ReportPrivateBanner";
import ReadinessAgents from "./ReadinessAgents";
import ReadinessAutomation from "./ReadinessAutomation";
import ReadinessCategories from "./ReadinessCategories";
import ReadinessHero from "./ReadinessHero";
import ReadinessInsights from "./ReadinessInsights";
import ReadinessQuickWins from "./ReadinessQuickWins";
import ReadinessSprint from "./ReadinessSprint";
import type { ReadinessReport } from "./types";

type ReadinessReportViewProps = {
  report: ReadinessReport;
};

export default function ReadinessReportView({
  report,
}: ReadinessReportViewProps) {
  return (
    <main className="pb-16 md:pb-24">
      {report.private ? <ReportPrivateBanner /> : null}
      <ReadinessHero report={report} />
      <PatternStrip />
      <ReadinessInsights report={report} />
      <PatternStrip />
      <ReadinessQuickWins report={report} />
      <PatternStrip />
      <ReadinessCategories report={report} />
      <PatternStrip />
      <ReadinessAutomation report={report} />
      <PatternStrip />
      <ReadinessAgents report={report} />
      <PatternStrip />
      <ReadinessSprint report={report} />
      <ReportCta report={report} />
    </main>
  );
}
