import { Fragment } from "react";

type CellValue = boolean | string;

type FeatureRow = {
  name: string;
  starter: CellValue;
  pro: CellValue;
  advanced: CellValue;
};

type FeatureSection = {
  title: string;
  note?: string;
  rows: FeatureRow[];
};

const sections: FeatureSection[] = [
  {
    title: "Available models",
    note: "Select in the onboarding process",
    rows: [
      {
        name: "ChatGPT",
        starter: true,
        pro: true,
        advanced: true,
      },
      {
        name: "AI Mode",
        starter: true,
        pro: true,
        advanced: true,
      },
      {
        name: "AI Overviews",
        starter: true,
        pro: true,
        advanced: true,
      },
      {
        name: "Microsoft Copilot",
        starter: true,
        pro: true,
        advanced: true,
      },
      {
        name: "Perplexity",
        starter: true,
        pro: true,
        advanced: true,
      },
      {
        name: "Gemini",
        starter: true,
        pro: true,
        advanced: true,
      },
      {
        name: "AI Shopping",
        starter: "Included at launch",
        pro: "Included at launch",
        advanced: "Included at launch",
      },
    ],
  },
  {
    title: "Core features",
    rows: [
      {
        name: "Number of models included",
        starter: "3",
        pro: "3",
        advanced: "3",
      },
      {
        name: "Projects",
        starter: "1",
        pro: "2",
        advanced: "5",
      },
      {
        name: "Countries per project",
        starter: "1",
        pro: "3",
        advanced: "3",
      },
      {
        name: "Daily/Weekly tracking",
        starter: "Daily",
        pro: "Daily",
        advanced: "Daily",
      },
    ],
  },
  {
    title: "Integrations & access",
    rows: [
      {
        name: "Looker integration",
        starter: false,
        pro: false,
        advanced: true,
      },
      {
        name: "API access",
        starter: false,
        pro: false,
        advanced: false,
      },
      {
        name: "MCP integration",
        starter: false,
        pro: false,
        advanced: false,
      },
      {
        name: "Single sign on (SSO)",
        starter: false,
        pro: false,
        advanced: false,
      },
    ],
  },
  {
    title: "Support & Community",
    rows: [
      {
        name: "Support channels",
        starter: "Chats",
        pro: "Chats + Email",
        advanced: "Chats + Email",
      },
      {
        name: "Slack community",
        starter: false,
        pro: false,
        advanced: false,
      },
      {
        name: "Custom onboarding",
        starter: false,
        pro: false,
        advanced: false,
      },
    ],
  },
] as const;

function Cell({ value }: { value: CellValue }) {
  if (typeof value === "string") {
    return <span className="text-sm text-zinc-700 tabular-nums">{value}</span>;
  }
  if (value) {
    return (
      <span className="inline-flex size-5 items-center justify-center text-[#2462ff]" aria-label="Included">
        <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
          <path
            d="M3.5 8.5 6.5 11.5 12.5 4.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return <span className="text-sm text-zinc-300" aria-label="Not included">—</span>;
}

export default function PricingFeatures() {
  return (
    <section>
      <div className="border-b px-6 py-10 md:px-12">
        <h2 className="text-2xl font-medium tracking-tight">Compare brand plans</h2>
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          Agency packages are quoted separately — see the agency section above for what&apos;s
          included. API, MCP, SSO, Slack community, and custom onboarding are available on Enterprise.
        </p>
      </div>
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="sticky left-0 bg-background px-6 py-4 text-sm font-medium text-zinc-500 md:px-12">
                Feature
              </th>
              <th className="w-28 px-4 py-4 text-sm font-medium md:w-36">Starter</th>
              <th className="w-28 px-4 py-4 text-sm font-medium md:w-36">Pro</th>
              <th className="w-28 px-4 py-4 text-sm font-medium md:w-36 md:pr-12">Advanced</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <Fragment key={section.title}>
                <tr className="border-b bg-zinc-50/80">
                  <td
                    colSpan={4}
                    className="sticky left-0 bg-zinc-50/80 px-6 py-3 md:px-12"
                  >
                    <p className="text-sm font-medium text-zinc-800">{section.title}</p>
                    {section.note ? (
                      <p className="mt-0.5 text-xs text-zinc-500">{section.note}</p>
                    ) : null}
                  </td>
                </tr>
                {section.rows.map((row) => (
                  <tr key={row.name} className="border-b last:border-b-0">
                    <td className="sticky left-0 bg-background px-6 py-4 text-sm text-zinc-800 md:px-12">
                      {row.name}
                    </td>
                    <td className="px-4 py-4">
                      <Cell value={row.starter} />
                    </td>
                    <td className="px-4 py-4">
                      <Cell value={row.pro} />
                    </td>
                    <td className="px-4 py-4 md:pr-12">
                      <Cell value={row.advanced} />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
