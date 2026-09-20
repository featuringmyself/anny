"use client";

import { useState } from "react";

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
import { rt } from "./report-theme";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessReportViewProps = {
  report: ReadinessReport;
};

export default function ReadinessReportView({
  report,
}: ReadinessReportViewProps) {
  const [mode, setMode] = useState<ReadinessAudienceMode>("non-technical");

  return (
    <main
      className={`overflow-anchor-none bg-background px-3 py-3 pb-16 sm:px-4 md:pb-24 ${rt.stack}`}
    >
      {report.private ? <ReportPrivateBanner /> : null}

      <header className={rt.panel}>
        <ReadinessHeroLead report={report} />
      </header>

      <ReadinessModeBar
        company={report.company}
        mode={mode}
        onChange={setMode}
      />

      <section className={rt.panel} aria-label="Executive summary">
        <ReadinessHeroBody report={report} mode={mode} />
      </section>

      <div className={`${rt.panel} px-6 py-5 md:px-12`}>
        <p
          className={`text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
        >
          Audit findings
        </p>
        <p className={`mt-1 text-sm text-balance ${rt.body}`}>
          On-site readiness detail for {report.company}
          {report.website ? (
            <>
              {" "}
              ·{" "}
              <span className={`font-medium ${rt.bodyStrong}`}>
                {report.website}
              </span>
            </>
          ) : null}
          . Scroll for insights, categories, agents, and quick wins.
        </p>
      </div>

      <div className={rt.panel}>
        <ReadinessInsights report={report} mode={mode} />
      </div>
      <div className={rt.panel}>
        <ReadinessCategories report={report} mode={mode} />
      </div>
      <div className={rt.panel}>
        <ReadinessAutomation report={report} mode={mode} />
      </div>
      <div className={rt.panel}>
        <ReadinessAgents report={report} mode={mode} />
      </div>
      <div className={rt.panel}>
        <ReadinessQuickWins report={report} mode={mode} />
      </div>

      <div className={rt.panel}>
        <ReadinessSprint report={report} />
      </div>

      <div className={rt.panel}>
        <ReportCta report={report} />
      </div>
    </main>
  );
}
