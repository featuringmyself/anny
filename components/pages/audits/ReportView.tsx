import PatternStrip from "@/components/PatternStrip";

import ReportBrandCrisis from "./ReportBrandCrisis";
import ReportCompetitors from "./ReportCompetitors";
import ReportCta from "./ReportCta";
import ReportHero from "./ReportHero";
import ReportPrivateBanner from "./ReportPrivateBanner";
import ReportQueries from "./ReportQueries";
import ReportScoreStrip from "./ReportScoreStrip";
import ReportSprint from "./ReportSprint";
import type { VisibilityReport } from "./types";

type ReportViewProps = {
  report: VisibilityReport;
};

export default function ReportView({ report }: ReportViewProps) {
  return (
    <div className="pb-16 md:pb-24">
      {report.private ? <ReportPrivateBanner /> : null}
      <ReportHero report={report} />
      <PatternStrip />
      <ReportBrandCrisis report={report} />
      {report.brandCrisis?.length ? <PatternStrip /> : null}
      <ReportScoreStrip report={report} />
      <ReportCompetitors report={report} />
      <PatternStrip />
      <ReportQueries report={report} />
      <PatternStrip />
      <ReportSprint report={report} />
      <ReportCta report={report} />
    </div>
  );
}
