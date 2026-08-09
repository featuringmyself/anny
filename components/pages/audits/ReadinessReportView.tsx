"use client";

import { useState } from "react";

import PatternStrip from "@/components/PatternStrip";

import ReportCta from "./ReportCta";
import ReportPrivateBanner from "./ReportPrivateBanner";
import ReadinessAgents from "./ReadinessAgents";
import ReadinessAutomation from "./ReadinessAutomation";
import ReadinessCategories from "./ReadinessCategories";
import {
  ReadinessHeroBody,
  ReadinessHeroLead,
} from "./ReadinessHero";
import ReadinessInsights from "./ReadinessInsights";
import { ReadinessModeBar } from "./ReadinessModeToggle";
import ReadinessQuickWins from "./ReadinessQuickWins";
import ReadinessSprint from "./ReadinessSprint";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessReportViewProps = {
  report: ReadinessReport;
};

export default function ReadinessReportView({
  report,
}: ReadinessReportViewProps) {
  const [mode, setMode] = useState<ReadinessAudienceMode>("non-technical");

  return (
    <main className="pb-16 md:pb-24">
      {report.private ? <ReportPrivateBanner /> : null}
      <ReadinessHeroLead report={report} />
      <ReadinessModeBar mode={mode} onChange={setMode} />
      <section className="border-b">
        <ReadinessHeroBody report={report} mode={mode} />
      </section>
      <PatternStrip />
      <ReadinessInsights report={report} mode={mode} />
      <PatternStrip />
      <ReadinessCategories report={report} mode={mode} />
      <PatternStrip />
      <ReadinessAutomation report={report} mode={mode} />
      <PatternStrip />
      <ReadinessAgents report={report} mode={mode} />
      <PatternStrip />
      <ReadinessQuickWins report={report} mode={mode} />
      <PatternStrip />
      <ReadinessSprint report={report} />
      <ReportCta report={report} />
    </main>
  );
}
