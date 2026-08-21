import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

import { publicAssetPath } from "@/lib/audits/pdf/assets";
import { MODEL_META } from "@/components/pages/audits/models";
import type {
  BrandCrisisFinding,
  QueryFinding,
  VisibilityReport,
} from "@/components/pages/audits/types";

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

function scoreColor(score: number) {
  if (score < 20) return CRITICAL;
  if (score < 40) return "#c2410c";
  if (score < 60) return "#a16207";
  return ACCENT;
}

function assetSrc(src?: string) {
  if (!src) return null;
  try {
    return publicAssetPath(src);
  } catch {
    return null;
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

function CoverPage({ report }: { report: VisibilityReport }) {
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

      <Text style={pdfStyles.eyebrow}>Anny · AI visibility audit</Text>
      <Text style={pdfStyles.h1}>{report.company}</Text>
      <Text style={{ ...pdfStyles.body, marginTop: 10, maxWidth: 420, fontSize: 11 }}>
        {report.tagline ??
          `How often AI answers cite ${report.company} when buyers ask for recommendations — and where competitors win instead.`}
      </Text>

      <View style={{ ...pdfStyles.row, marginTop: 28, gap: 10 }}>
        <MetaCell label="Prepared for" value={report.preparedFor} />
        <MetaCell
          label="Role"
          value={report.role ?? "—"}
        />
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
          <Text style={pdfStyles.label}>Visibility score</Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: 48,
              fontWeight: 500,
              letterSpacing: -1.2,
              color,
            }}
          >
            {report.overallScore}
            <Text style={{ fontSize: 18, color: MUTED }}>%</Text>
          </Text>
          <Text style={{ marginTop: 6, fontSize: 11, fontWeight: 500, color }}>
            {report.scoreLabel}
          </Text>
          <Text style={{ ...pdfStyles.body, marginTop: 10, fontSize: 8 }}>
            Share of audited discovery prompts where {report.company} is cited
            in this snapshot.
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

      {report.brandCrisisHeadline ? (
        <View
          style={{
            marginTop: 14,
            borderWidth: 1,
            borderColor: "#fecaca",
            backgroundColor: "#fef2f2",
            padding: 12,
          }}
        >
          <Text style={{ ...pdfStyles.label, color: CRITICAL }}>
            Brand crisis
          </Text>
          <Text
            style={{
              marginTop: 6,
              fontSize: 11,
              fontWeight: 500,
              color: CRITICAL,
            }}
          >
            {report.brandCrisisHeadline}
          </Text>
          {report.brandCrisisDek ? (
            <Text style={{ marginTop: 6, fontSize: 9, color: MUTED, lineHeight: 1.45 }}>
              {report.brandCrisisDek}
            </Text>
          ) : null}
        </View>
      ) : null}

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

function OverviewPage({ report }: { report: VisibilityReport }) {
  const maxCompetitor = Math.max(
    ...report.competitors.map((c) => c.visibility),
    1,
  );
  const audited = report.modelScores.filter((s) => s.audited !== false);

  return (
    <Page size="A4" style={pdfStyles.page}>
      <PdfHeader company={report.company} />
      <Text style={pdfStyles.h2}>Snapshot overview</Text>
      <Text style={pdfStyles.body}>
        Model coverage and competitive share of voice for this audit set.
      </Text>

      <Text style={{ ...pdfStyles.label, marginTop: 20, marginBottom: 8 }}>
        By model
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {report.modelScores.map((score) => {
          const live = score.audited !== false;
          return (
            <View
              key={score.model}
              style={{
                width: "31%",
                ...pdfStyles.card,
                opacity: live ? 1 : 0.55,
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 9, fontWeight: 500 }}>
                {MODEL_META[score.model]?.name ?? score.model}
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 20,
                  fontWeight: 500,
                  color: live ? INK : MUTED,
                }}
              >
                {score.visibility}%
              </Text>
              <Text style={{ marginTop: 4, fontSize: 7.5, color: MUTED }}>
                {live
                  ? `${score.cited}/${score.total} prompts`
                  : "Not in this snapshot"}
              </Text>
            </View>
          );
        })}
      </View>

      {audited.length === 1 ? (
        <Text style={{ ...pdfStyles.body, marginTop: 8, fontSize: 8 }}>
          This pack is a {MODEL_META[audited[0].model]?.name ?? audited[0].model}{" "}
          snapshot. Other models are marked for the 90-day sprint expansion.
        </Text>
      ) : null}

      <Text style={{ ...pdfStyles.label, marginTop: 22, marginBottom: 8 }}>
        Competitive share of voice
      </Text>
      <View style={pdfStyles.card}>
        {report.competitors.map((competitor) => {
          const isBrand =
            competitor.name.toLowerCase() === report.company.toLowerCase();
          const widthPct = Math.max(
            4,
            Math.round((competitor.visibility / maxCompetitor) * 100),
          );
          return (
            <View
              key={competitor.name}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
                gap: 8,
              }}
            >
              <Text
                style={{
                  width: 90,
                  fontSize: 8.5,
                  fontWeight: isBrand ? 600 : 400,
                  color: isBrand ? ACCENT : INK,
                }}
              >
                {competitor.name}
                {isBrand ? " · you" : ""}
              </Text>
              <View style={pdfStyles.barTrack}>
                <View
                  style={{
                    ...(isBrand ? pdfStyles.barFillAccent : pdfStyles.barFill),
                    width: `${widthPct}%`,
                  }}
                />
              </View>
              <Text
                style={{
                  width: 28,
                  textAlign: "right",
                  fontSize: 8,
                  color: MUTED,
                }}
              >
                {competitor.visibility}%
              </Text>
            </View>
          );
        })}
      </View>

      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

function CrisisPage({
  report,
  item,
  index,
  total,
}: {
  report: VisibilityReport;
  item: BrandCrisisFinding;
  index: number;
  total: number;
}) {
  const img = assetSrc(item.screenshot.src);

  return (
    <Page size="A4" style={pdfStyles.page} wrap={false}>
      <PdfHeader company={report.company} />
      <Text style={pdfStyles.eyebrow}>
        Brand crisis · {String(index + 1).padStart(2, "0")} /{" "}
        {String(total).padStart(2, "0")}
      </Text>
      <Text style={pdfStyles.h2}>{item.title}</Text>
      <Text
        style={{
          ...pdfStyles.badge,
          ...pdfStyles.badgeCritical,
          marginBottom: 10,
        }}
      >
        {item.outcome}
      </Text>
      <Text style={{ fontSize: 9, fontWeight: 500, marginBottom: 4 }}>
        Prompt: “{item.query}”
      </Text>
      <Text style={{ ...pdfStyles.body, marginBottom: 12 }}>{item.body}</Text>
      {img ? (
        // react-pdf Image has no alt prop; screenshots are captioned in text above.
        // eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image
        <Image src={img} style={pdfStyles.screenshot} />
      ) : (
        <View style={{ ...pdfStyles.card, padding: 20 }}>
          <Text style={pdfStyles.body}>Screenshot unavailable.</Text>
        </View>
      )}
      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

function QueryPage({
  report,
  finding,
  index,
  total,
}: {
  report: VisibilityReport;
  finding: QueryFinding;
  index: number;
  total: number;
}) {
  const shot =
    finding.screenshot ??
    (finding.screenshots?.length ? finding.screenshots[0] : undefined);
  const img = assetSrc(shot?.src);
  const excerpt = finding.answers[0]?.excerpt;
  const isCritical = finding.severity === "critical";

  return (
    <Page size="A4" style={pdfStyles.page} wrap={false}>
      <PdfHeader company={report.company} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 6,
        }}
      >
        <Text style={pdfStyles.eyebrow}>
          Prompt {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </Text>
        <Text
          style={{
            ...pdfStyles.badge,
            ...(isCritical ? pdfStyles.badgeCritical : pdfStyles.badgeAccent),
          }}
        >
          {finding.tag ?? finding.outcome}
        </Text>
      </View>

      <Text style={{ ...pdfStyles.h2, fontSize: 15 }}>{finding.query}</Text>
      <Text style={{ ...pdfStyles.body, marginBottom: 6 }}>{finding.intent}</Text>
      <Text
        style={{
          fontSize: 9,
          fontWeight: 500,
          color: finding.rentokStatus === "cited" ? ACCENT : CRITICAL,
          marginBottom: 8,
        }}
      >
        {finding.outcome}
      </Text>

      {finding.citedBrands.length ? (
        <Text style={{ fontSize: 8, color: MUTED, marginBottom: 10 }}>
          Cited instead: {finding.citedBrands.join(" · ")}
        </Text>
      ) : null}

      {img ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image
        <Image src={img} style={{ ...pdfStyles.screenshot, maxHeight: 380 }} />
      ) : null}

      {excerpt ? (
        <View style={{ marginTop: 10, ...pdfStyles.card, padding: 10 }}>
          <Text style={pdfStyles.label}>Answer excerpt</Text>
          <Text style={{ ...pdfStyles.bodyInk, marginTop: 6, fontSize: 9 }}>
            {excerpt}
          </Text>
        </View>
      ) : null}

      <PdfFooter privateReport={report.private} />
    </Page>
  );
}

function SprintPage({ report }: { report: VisibilityReport }) {
  const { sprint } = report;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <PdfHeader company={report.company} />
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
          {report.ctaHeadline ?? `Get ${report.company} cited in 90 days`}
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
            "Book a call to start the AI Visibility Sprint across ChatGPT, Perplexity, and Google AI Overview."}
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

type VisibilityReportPdfProps = {
  report: VisibilityReport;
};

export function VisibilityReportPdf({ report }: VisibilityReportPdfProps) {
  const brandQueries = new Set(
    report.brandCrisis?.map((item) => item.query) ?? [],
  );
  const findings = report.queries.filter((q) => !brandQueries.has(q.query));
  const crises = report.brandCrisis ?? [];

  return (
    <Document
      title={`${report.company} AI Visibility Report`}
      author="Anny"
      subject={`AI visibility audit for ${report.company}`}
      creator="Anny · anny.dodoxhq.com"
      keywords={`AI visibility, GEO, ${report.company}, ChatGPT`}
      language="en"
    >
      <CoverPage report={report} />
      <OverviewPage report={report} />
      {crises.map((item, index) => (
        <CrisisPage
          key={item.id}
          report={report}
          item={item}
          index={index}
          total={crises.length}
        />
      ))}
      {findings.map((finding, index) => (
        <QueryPage
          key={finding.id}
          report={report}
          finding={finding}
          index={index}
          total={findings.length}
        />
      ))}
      <SprintPage report={report} />
    </Document>
  );
}
