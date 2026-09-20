import ReportSectionHeader from "./ReportSectionHeader";
import { readinessCopy } from "./readiness-copy";
import { rt } from "./report-theme";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessAgentsProps = {
  report: ReadinessReport;
  mode: ReadinessAudienceMode;
};

export default function ReadinessAgents({
  report,
  mode,
}: ReadinessAgentsProps) {
  const allowedCount = report.agents.filter((a) => a.allowed).length;
  const blockedCount = report.agents.length - allowedCount;
  const isTechnical = mode === "technical";
  const missingDiscovery = report.discoverySignals.filter((s) => !s.found)
    .length;

  return (
    <section>
      <ReportSectionHeader
        index="04"
        label="Crawl & discovery"
        title={
          report.discoverySignals.some((s) => s.found)
            ? "Crawlers allowed; discovery incomplete"
            : "Crawlers allowed; capability files missing"
        }
        description={readinessCopy(
          mode,
          report.agentsIntro,
          report.agentsIntroTechnical,
        )}
      />

      <dl className={`grid grid-cols-2 border-b ${rt.hairline} text-sm`}>
        <div className={`border-r ${rt.hairline} px-6 py-5 md:px-10`}>
          <dt className={`text-xs ${rt.label}`}>AI agents in robots.txt</dt>
          <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
            <span className={rt.info}>
              {allowedCount}/{report.agents.length} allowed
            </span>
            {blockedCount > 0 ? (
              <span className={rt.critical}> · {blockedCount} blocked</span>
            ) : null}
          </dd>
        </div>
        <div className="px-6 py-5 md:px-10">
          <dt className={`text-xs ${rt.label}`}>llms.txt</dt>
          <dd
            className={`mt-1 font-medium ${report.llmsTxtFound ? rt.info : rt.critical}`}
          >
            {report.llmsTxtFound ? "Found" : "Not found"}
          </dd>
        </div>
      </dl>

      <div className={`border-b ${rt.hairline} px-6 py-7 md:px-10 md:py-8`}>
        <p
          className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
        >
          Agent discovery signals
        </p>
        {isTechnical ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {report.discoverySignals.map((signal) => (
              <li
                key={signal.id}
                className={`flex items-start gap-3 border ${rt.hairline} ${rt.surface} px-3 py-2.5 text-sm`}
              >
                <span
                  className={
                    signal.found
                      ? `font-medium ${rt.info}`
                      : `font-medium ${rt.critical}`
                  }
                  aria-hidden
                >
                  {signal.found ? "✓" : "-"}
                </span>
                <span className="min-w-0">
                  <span
                    className={`font-medium ${signal.found ? rt.bodyStrong : rt.critical}`}
                  >
                    {signal.found ? "Found" : "Not found"}
                  </span>
                  <span
                    className={`mt-0.5 block font-mono text-xs break-all ${rt.body}`}
                  >
                    {signal.label}
                  </span>
                  {signal.note ? (
                    <span
                      className={`mt-1 block text-xs leading-relaxed ${rt.body}`}
                    >
                      {signal.note}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${rt.body}`}>
            {missingDiscovery === report.discoverySignals.length
              ? `MCP / agent-skill discovery files are missing, advanced agents have no advertised way to learn what ${report.company} can do.`
              : `${missingDiscovery} of ${report.discoverySignals.length} MCP / agent-skill discovery signals are missing.`}
          </p>
        )}
      </div>

      {isTechnical ? (
        <div className="px-6 py-7 md:px-10 md:py-8">
          <p
            className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
          >
            robots.txt · AI agents
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr
                  className={`border-b ${rt.hairline} text-[11px] tracking-wide uppercase ${rt.label}`}
                >
                  <th className="pb-2.5 pr-4 font-medium">Agent</th>
                  <th className="pb-2.5 pr-4 font-medium">Vendor</th>
                  <th className="pb-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.agents.map((row) => (
                  <tr key={row.agent} className={`border-b ${rt.hairline}`}>
                    <td
                      className={`py-2.5 pr-4 font-mono text-xs ${rt.bodyStrong}`}
                    >
                      {row.agent}
                    </td>
                    <td className={`py-2.5 pr-4 ${rt.body}`}>{row.vendor}</td>
                    <td
                      className={`py-2.5 font-medium ${row.allowed ? rt.bodyStrong : rt.critical}`}
                    >
                      {row.allowed ? "Allowed" : "Blocked"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="px-6 py-7 md:px-10 md:py-8">
          <p
            className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
          >
            robots.txt · AI agents
          </p>
          <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${rt.body}`}>
            {allowedCount}/{report.agents.length} AI agents allowed, major
            crawlers are not blocked. The gap is capability discovery, not
            crawl permission.
          </p>
        </div>
      )}
    </section>
  );
}
