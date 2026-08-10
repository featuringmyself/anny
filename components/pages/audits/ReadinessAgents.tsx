import { readinessCopy } from "./readiness-copy";
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
    <section className="border-b">
      <div className="px-6 pt-12 md:px-12 md:pt-16">
        <p className="mb-3 text-sm font-medium text-[#2462ff]">Site files</p>
        <h2 className="max-w-xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
          {report.discoverySignals.some((s) => s.found)
            ? "Crawlers are welcome. Discovery is incomplete."
            : "Crawlers are welcome. Capability files are missing."}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500">
          {readinessCopy(
            mode,
            report.agentsIntro,
            report.agentsIntroTechnical,
          )}
        </p>
        <dl className="mt-8 flex flex-wrap gap-8 text-sm">
          <div>
            <dt className="text-zinc-400">AI agents in robots.txt</dt>
            <dd className="mt-1 font-medium">
              {allowedCount}/{report.agents.length} allowed
              {blockedCount > 0 ? ` · ${blockedCount} blocked` : ""}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-400">llms.txt</dt>
            <dd className="mt-1 font-medium">
              {report.llmsTxtFound ? "Found" : "Not found"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 border-t px-6 py-10 md:px-12 md:py-12">
        <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
          Agent discovery signals
        </p>
        {isTechnical ? (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {report.discoverySignals.map((signal) => (
              <li
                key={signal.id}
                className="flex items-start gap-3 border border-zinc-200 px-4 py-3 text-sm"
              >
                <span
                  className={
                    signal.found
                      ? "font-medium text-[#2462ff]"
                      : "font-medium text-zinc-400"
                  }
                  aria-hidden
                >
                  {signal.found ? "✓" : "✗"}
                </span>
                <span className="min-w-0">
                  <span className="font-medium text-zinc-800">
                    {signal.found ? "Found" : "Not found"}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-zinc-500 break-all">
                    {signal.label}
                  </span>
                  {signal.note ? (
                    <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
                      {signal.note}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600">
            {missingDiscovery === report.discoverySignals.length
              ? `MCP / agent-skill discovery files are missing — advanced agents have no advertised way to learn what ${report.company} can do.`
              : `${missingDiscovery} of ${report.discoverySignals.length} MCP / agent-skill discovery signals are missing.`}
          </p>
        )}
      </div>

      {isTechnical ? (
        <div className="border-t px-6 py-10 md:px-12 md:py-12">
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
            robots.txt · AI agents
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b text-xs tracking-wide text-zinc-400 uppercase">
                  <th className="pb-3 pr-4 font-medium">Agent</th>
                  <th className="pb-3 pr-4 font-medium">Vendor</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.agents.map((row) => (
                  <tr key={row.agent} className="border-b border-zinc-100">
                    <td className="py-3 pr-4 font-mono text-xs text-zinc-800">
                      {row.agent}
                    </td>
                    <td className="py-3 pr-4 text-zinc-600">{row.vendor}</td>
                    <td className="py-3">
                      <span
                        className={
                          row.allowed
                            ? "font-medium text-[#2462ff]"
                            : "font-medium text-zinc-900"
                        }
                      >
                        {row.allowed ? "Allowed" : "Blocked"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="border-t px-6 py-10 md:px-12 md:py-12">
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
            robots.txt · AI agents
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600">
            {allowedCount}/{report.agents.length} AI agents allowed — major
            crawlers are not blocked. The gap is capability discovery, not
            crawl permission.
          </p>
        </div>
      )}
    </section>
  );
}
