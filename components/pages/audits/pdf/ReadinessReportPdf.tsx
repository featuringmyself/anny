import { Document, Page, Text, View } from "@react-pdf/renderer";

import type {
  ReadinessReport,
  ReadinessStatus,
} from "@/components/pages/audits/types";
import { readinessStatusLabel } from "@/components/pages/audits/readiness-status";

import { PdfFooter, PdfHeader } from "./PdfChrome";
import {
  ACCENT,
  CRITICAL,
  INK,
  LINE,
  MUTED,
  WHITE,
  pdfStyles,
} from "./styles";

const AMBER = "#b45309";
const GOOD = ACCENT;

function scoreColor(score: number) {
  if (score < 40) return CRITICAL;
  if (score < 60) return AMBER;
  if (score < 80) return "#a16207";
  return GOOD;
}

function statusColor(status: ReadinessStatus) {
  switch (status) {
    case "good":
      return GOOD;
    case "needs-improvement":
      return AMBER;
    case "poor":
      return CRITICAL;
  }
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1, minWidth: "22%" }}>
      <Text style={pdfStyles.label}>{label}</Text>
      <Text style={{ marginTop: 4, fontSize: 9, fontWeight: 500 }}>{value}</Text>
    </View>
  );
}

function StatusPill({ status }: { status: ReadinessStatus }) {
  const color = statusColor(status);
  return (
    <Text
      style={{
        alignSelf: "flex-start",
        fontSize: 8,
        fontWeight: 500,
        color,
        borderWidth: 1,
        borderColor: color,
        paddingHorizontal: 6,
        paddingVertical: 3,
      }}
    >
      {readinessStatusLabel(status)}
    </Text>
  );
}

function CoverPage({ report }: { report: ReadinessReport }) {
  const color = scoreColor(report.overallScore);

  return (
    <Page size="A4" style={[pdfStyles.page, { paddingTop: 48 }]}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: ACCENT,
        }}
      />

      <Text style={pdfStyles.eyebrow}>Anny · AI readiness audit</Text>
      <Text style={pdfStyles.h1}>{report.company}</Text>
      <Text style={{ ...pdfStyles.body, marginTop: 10, maxWidth: 420, fontSize: 11 }}>
        {report.tagline ??
          `How ready ${report.company} is for AI agents: structured data, crawl access, automation, and semantic HTML.`}
      </Text>

      <View style={{ ...pdfStyles.row, marginTop: 28, gap: 10 }}>
        <MetaCell label="Prepared for" value={report.preparedFor} />
        <MetaCell label="Role" value={report.role ?? "—"} />
        <MetaCell label="Website" value={report.website} />
        <MetaCell label="Snapshot" value={report.dateLabel} />
      </View>

      <View
        style={{
          marginTop: 28,
          flexDirection: "row",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        <View
          style={{
            ...pdfStyles.card,
            width: 168,
            alignItems: "flex-start",
            borderColor: color,
          }}
        >
          <Text style={pdfStyles.label}>Readiness score</Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: 44,
              fontWeight: 500,
              letterSpacing: -1.2,
              color,
            }}
          >
            {report.overallScore}
            <Text style={{ fontSize: 16, color: MUTED }}>/100</Text>
          </Text>
          <Text style={{ marginTop: 6, fontSize: 11, fontWeight: 500, color }}>
            {report.scoreLabel}
          </Text>
          <Text style={{ ...pdfStyles.body, marginTop: 10, fontSize: 8 }}>
            On-site readiness for AI agents: schema, crawl signals, automation,
            and HTML semantics.
          </Text>
        </View>

        <View style={{ flex: 1, ...pdfStyles.card }}>
          <Text style={pdfStyles.label}>Industry</Text>
          <Text style={{ marginTop: 6, fontSize: 11, fontWeight: 500 }}>
            {report.industry}
          </Text>
          {report.stats?.length ? (
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {report.stats.map((stat) => (
                <View
                  key={stat.label}
                  style={{
                    width: "45%",
                    borderTopWidth: 1,
                    borderTopColor: LINE,
                    paddingTop: 8,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: 500 }}>{stat.value}</Text>
                  <Text style={{ marginTop: 2, fontSize: 8, color: MUTED }}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </View>

      <View style={{ marginTop: 22, ...pdfStyles.card, backgroundColor: WHITE }}>
        <Text style={pdfStyles.label}>Executive summary</Text>
        <Text style={{ ...pdfStyles.bodyInk, marginTop: 8, fontSize: 10 }}>
          {report.summary}
        </Text>
      </View>

      {report.private ? (
        <View
          style={{
            marginTop: 18,
            backgroundColor: INK,
            paddingVertical: 10,
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ fontSize: 8, color: "#a1a1aa" }}>
            Private page · prepared for outreach only · not indexed by search
            engines or AI crawlers
          </Text>
        </View>
      ) : null}

      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

function InsightsPage({ report }: { report: ReadinessReport }) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <PdfHeader company={report.company} kind="readiness" />
      <Text style={pdfStyles.h2}>Key findings</Text>
      <Text style={pdfStyles.body}>
        The gaps that keep answer engines from citing {report.company} — even
        when crawlers are allowed in.
      </Text>

      <View style={{ marginTop: 16 }}>
        {report.insights.map((insight, index) => (
          <View
            key={insight.id}
            style={{
              marginBottom: 12,
              ...pdfStyles.card,
              padding: 12,
            }}
            wrap={false}
          >
            <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
              <Text style={{ fontSize: 10, fontWeight: 600, color: ACCENT, width: 22 }}>
                {String(index + 1).padStart(2, "0")}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, fontWeight: 500 }}>{insight.title}</Text>
                <Text style={{ ...pdfStyles.body, marginTop: 6, fontSize: 9 }}>
                  {insight.body}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

function CategoriesPage({ report }: { report: ReadinessReport }) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <PdfHeader company={report.company} kind="readiness" />
      <Text style={pdfStyles.h2}>Category scores</Text>
      <Text style={{ ...pdfStyles.body, marginBottom: 14 }}>
        How each readiness surface contributes to the {report.overallScore}/100
        overall score.
      </Text>

      {report.categories.map((category) => (
        <View
          key={category.id}
          style={{
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: LINE,
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: 500 }}>{category.title}</Text>
            <StatusPill status={category.status} />
          </View>
          <Text style={{ ...pdfStyles.body, fontSize: 9 }}>{category.body}</Text>
          {category.metrics?.length ? (
            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {category.metrics.map((metric) => (
                <View
                  key={metric.label}
                  style={{
                    borderWidth: 1,
                    borderColor: LINE,
                    backgroundColor: WHITE,
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                  }}
                >
                  <Text style={{ fontSize: 7, color: MUTED }}>{metric.label}</Text>
                  <Text style={{ marginTop: 2, fontSize: 8, fontWeight: 500 }}>
                    {metric.value}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ))}

      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

function AutomationPage({ report }: { report: ReadinessReport }) {
  const { automation } = report;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <PdfHeader company={report.company} kind="readiness" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <Text style={pdfStyles.h2}>Form & automation</Text>
        <StatusPill status={automation.status} />
      </View>
      <Text style={{ ...pdfStyles.body, marginBottom: 12 }}>{automation.body}</Text>

      <View style={{ ...pdfStyles.row, marginBottom: 14, gap: 8 }}>
        <View style={{ ...pdfStyles.card, flex: 1, padding: 10 }}>
          <Text style={pdfStyles.label}>Total issues</Text>
          <Text style={{ marginTop: 4, fontSize: 22, fontWeight: 500 }}>
            {automation.totalIssues}
          </Text>
        </View>
        <View style={{ ...pdfStyles.card, flex: 1, padding: 10 }}>
          <Text style={pdfStyles.label}>P1 critical</Text>
          <Text style={{ marginTop: 4, fontSize: 22, fontWeight: 500, color: CRITICAL }}>
            {automation.p1Count}
          </Text>
        </View>
        <View style={{ ...pdfStyles.card, flex: 1, padding: 10 }}>
          <Text style={pdfStyles.label}>P2</Text>
          <Text style={{ marginTop: 4, fontSize: 22, fontWeight: 500, color: AMBER }}>
            {automation.p2Count}
          </Text>
        </View>
      </View>

      {automation.groups.map((group) => (
        <View
          key={group.id}
          style={{ marginBottom: 12, ...pdfStyles.card, padding: 11 }}
          wrap={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: 500, flex: 1 }}>
              {group.title}
            </Text>
            <Text
              style={{
                fontSize: 8,
                fontWeight: 600,
                color: group.severity === "P1" ? CRITICAL : AMBER,
              }}
            >
              {group.severity} · ×{group.count}
            </Text>
          </View>
          <Text style={{ ...pdfStyles.body, fontSize: 8.5 }}>{group.summary}</Text>
          {group.examples.length ? (
            <View
              style={{
                marginTop: 8,
                backgroundColor: INK,
                padding: 8,
              }}
            >
              {group.examples.slice(0, 3).map((example) => (
                <Text
                  key={example}
                  style={{
                    fontSize: 7,
                    color: "#d4d4d8",
                    marginBottom: 3,
                    fontFamily: "SpaceGrotesk",
                  }}
                >
                  {example}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      ))}

      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

function AgentsPage({ report }: { report: ReadinessReport }) {
  const allowed = report.agents.filter((a) => a.allowed).length;
  const blocked = report.agents.length - allowed;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <PdfHeader company={report.company} kind="readiness" />
      <Text style={pdfStyles.h2}>AI crawlers & discovery</Text>
      <Text style={{ ...pdfStyles.body, marginBottom: 12 }}>{report.agentsIntro}</Text>

      <View style={{ ...pdfStyles.row, marginBottom: 14, gap: 8 }}>
        <View style={{ ...pdfStyles.card, flex: 1, padding: 10 }}>
          <Text style={pdfStyles.label}>Agents allowed</Text>
          <Text style={{ marginTop: 4, fontSize: 20, fontWeight: 500, color: GOOD }}>
            {allowed}/{report.agents.length}
          </Text>
        </View>
        <View style={{ ...pdfStyles.card, flex: 1, padding: 10 }}>
          <Text style={pdfStyles.label}>Blocked</Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: 20,
              fontWeight: 500,
              color: blocked ? CRITICAL : MUTED,
            }}
          >
            {blocked}
          </Text>
        </View>
        <View style={{ ...pdfStyles.card, flex: 1, padding: 10 }}>
          <Text style={pdfStyles.label}>llms.txt</Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: 14,
              fontWeight: 500,
              color: report.llmsTxtFound ? GOOD : CRITICAL,
            }}
          >
            {report.llmsTxtFound ? "Found" : "404"}
          </Text>
        </View>
      </View>

      <Text style={{ ...pdfStyles.label, marginBottom: 8 }}>Discovery signals</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 16,
        }}
      >
        {report.discoverySignals.map((signal) => (
          <View
            key={signal.id}
            style={{
              width: "48%",
              borderWidth: 1,
              borderColor: LINE,
              backgroundColor: WHITE,
              padding: 8,
            }}
          >
            <Text
              style={{
                fontSize: 8,
                fontWeight: 500,
                color: signal.found ? GOOD : CRITICAL,
              }}
            >
              {signal.found ? "Found" : "Missing"}
            </Text>
            <Text style={{ marginTop: 3, fontSize: 8 }}>{signal.label}</Text>
            {signal.note ? (
              <Text style={{ marginTop: 2, fontSize: 7, color: MUTED }}>
                {signal.note}
              </Text>
            ) : null}
          </View>
        ))}
      </View>

      <Text style={{ ...pdfStyles.label, marginBottom: 6 }}>Agent allowlist</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
        {report.agents.map((agent) => (
          <Text
            key={agent.agent}
            style={{
              fontSize: 7,
              paddingHorizontal: 5,
              paddingVertical: 3,
              borderWidth: 1,
              borderColor: LINE,
              backgroundColor: WHITE,
              color: agent.allowed ? INK : MUTED,
            }}
          >
            {agent.agent}
            {agent.allowed ? "" : " · blocked"}
          </Text>
        ))}
      </View>

      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

function QuickWinsPage({ report }: { report: ReadinessReport }) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <PdfHeader company={report.company} kind="readiness" />
      <Text style={pdfStyles.h2}>Quick wins</Text>
      <Text style={{ ...pdfStyles.body, marginBottom: 14 }}>
        Highest-leverage on-site fixes — ordered for impact inside the sprint.
      </Text>

      {report.quickWins.map((win, index) => (
        <View
          key={win.id}
          style={{
            marginBottom: 10,
            ...pdfStyles.card,
            padding: 11,
          }}
          wrap={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <View style={{ flexDirection: "row", gap: 8, flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 600, color: ACCENT }}>
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Text style={{ fontSize: 11, fontWeight: 500, flex: 1 }}>
                {win.title}
              </Text>
            </View>
            <Text style={{ fontSize: 7.5, color: MUTED }}>
              Impact {win.impact} · Effort {win.effort}
            </Text>
          </View>
          <Text style={{ ...pdfStyles.body, marginTop: 6, fontSize: 9, marginLeft: 30 }}>
            {win.body}
          </Text>
        </View>
      ))}

      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

function SprintPage({ report }: { report: ReadinessReport }) {
  const { sprint } = report;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <PdfHeader company={report.company} kind="readiness" />
      <Text style={pdfStyles.eyebrow}>Services · not SaaS</Text>
      <Text style={pdfStyles.h2}>{sprint.headline}</Text>
      <Text style={{ ...pdfStyles.body, marginBottom: 14 }}>{sprint.body}</Text>

      <View style={{ ...pdfStyles.row, marginBottom: 16 }}>
        <View style={{ ...pdfStyles.card, flex: 1 }}>
          <Text style={pdfStyles.label}>Engagement</Text>
          <Text style={{ marginTop: 6, fontSize: 11, fontWeight: 500 }}>
            {sprint.name}
          </Text>
        </View>
        <View style={{ ...pdfStyles.card, flex: 1 }}>
          <Text style={pdfStyles.label}>Length</Text>
          <Text style={{ marginTop: 6, fontSize: 11, fontWeight: 500 }}>
            {sprint.duration}
          </Text>
        </View>
      </View>

      <Text style={{ ...pdfStyles.label, marginBottom: 8 }}>What you get</Text>
      {sprint.outcomes.map((outcome, i) => (
        <View
          key={outcome}
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 8,
            paddingBottom: 8,
            borderBottomWidth: i === sprint.outcomes.length - 1 ? 0 : 1,
            borderBottomColor: LINE,
          }}
        >
          <Text style={{ fontSize: 9, fontWeight: 600, color: ACCENT, width: 22 }}>
            {String(i + 1).padStart(2, "0")}
          </Text>
          <Text style={{ flex: 1, fontSize: 9.5, lineHeight: 1.45 }}>{outcome}</Text>
        </View>
      ))}

      <View
        style={{
          marginTop: 24,
          backgroundColor: INK,
          padding: 18,
        }}
      >
        <Text style={{ fontSize: 9, fontWeight: 500, color: "#7a9fff" }}>
          {report.ctaEyebrow ?? "Next step"}
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontSize: 16,
            fontWeight: 500,
            color: WHITE,
            letterSpacing: -0.3,
          }}
        >
          {report.ctaHeadline ?? `Raise ${report.company} AI readiness in 90 days`}
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontSize: 9,
            lineHeight: 1.5,
            color: "#a1a1aa",
          }}
        >
          {report.ctaBody ??
            "Book a call to include on-site readiness fixes in the same AI Visibility Sprint as citation work."}
        </Text>
        <Text
          style={{
            marginTop: 14,
            fontSize: 10,
            fontWeight: 500,
            color: ACCENT,
          }}
        >
          {report.ctaUrl
            ? report.ctaUrl.replace(/^https?:\/\//, "")
            : "anny.dodoxhq.com · talk to sales"}
        </Text>
      </View>

      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

type ReadinessReportPdfProps = {
  report: ReadinessReport;
};

export function ReadinessReportPdf({ report }: ReadinessReportPdfProps) {
  return (
    <Document
      title={`${report.company} AI Readiness Report`}
      author="Anny"
      subject={`AI readiness audit for ${report.company}`}
      creator="Anny · anny.dodoxhq.com"
      keywords={`AI readiness, AEO, schema, ${report.company}`}
      language="en"
    >
      <CoverPage report={report} />
      <InsightsPage report={report} />
      <CategoriesPage report={report} />
      <AutomationPage report={report} />
      <AgentsPage report={report} />
      <QuickWinsPage report={report} />
      <SprintPage report={report} />
    </Document>
  );
}
