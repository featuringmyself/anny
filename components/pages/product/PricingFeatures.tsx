import { Fragment, type ReactNode } from "react";
import Image from "next/image";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import PricingTierMotion from "@/components/pages/product/PricingTierMotion";

type CellValue = boolean | string | ReactNode;

type FeatureRow = {
  name: ReactNode;
  starter: CellValue;
  pro: CellValue;
  advanced: CellValue;
};

type FeatureSection = {
  title: string;
  rows: FeatureRow[];
};

const baseModels = [
  { name: "ChatGPT", icon: "/pricing-models/chatgpt.svg" },
  { name: "AI Mode", icon: "/pricing-models/google.svg" },
  { name: "AI Overviews", icon: "/pricing-models/google.svg" },
  { name: "Microsoft Copilot", icon: "/pricing-models/copilot.svg" },
  { name: "Perplexity", icon: "/pricing-models/perplexity.svg" },
  { name: "Gemini", icon: "/pricing-models/gemini.svg" },
] as const;

const advancedExtraModels = [
  { name: "Claude Sonnet 4", icon: "/pricing-models/claude.svg", api: true },
  { name: "GPT 5 Search", icon: "/pricing-models/chatgpt.svg", api: true },
  { name: "Deepseek", icon: "/pricing-models/deepseek.svg", api: true },
  { name: "Qwen", icon: "/pricing-models/qwen.svg", api: true },
  { name: "Mistral", icon: "/pricing-models/mistral.svg", api: true },
] as const;

function ModelRow({
  name,
  icon,
  api,
}: {
  name: string;
  icon: string;
  api?: boolean;
}) {
  return (
    <li className="flex items-center gap-2 text-sm text-zinc-700">
      <Image
        src={icon}
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0 rounded-[3px] ring-1 ring-zinc-200/80"
      />
      <span>{name}</span>
      {api ? (
        <span className="rounded bg-zinc-100 px-1 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
          API
        </span>
      ) : null}
    </li>
  );
}

function ModelList({
  extras,
}: {
  extras?: readonly { name: string; icon: string; api?: boolean }[];
}) {
  return (
    <ul className="flex flex-col gap-2">
      {baseModels.map((model) => (
        <ModelRow key={model.name} name={model.name} icon={model.icon} />
      ))}
      {extras?.map((model) => (
        <ModelRow
          key={model.name}
          name={model.name}
          icon={model.icon}
          api={model.api}
        />
      ))}
    </ul>
  );
}

const sections: FeatureSection[] = [
  {
    title: "Core features",
    rows: [
      {
        name: (
          <span>
            Available models
            <span className="mt-0.5 block text-xs font-normal text-zinc-500">
              Select in the onboarding process
            </span>
          </span>
        ),
        starter: <ModelList />,
        pro: <ModelList />,
        advanced: <ModelList extras={advancedExtraModels} />,
      },
      {
        name: (
          <span>
            AI Shopping
            <span className="mt-0.5 block text-xs font-normal text-emerald-600">
              Included at launch
            </span>
          </span>
        ),
        starter: true,
        pro: true,
        advanced: true,
      },
      {
        name: "Number of models included",
        starter: "3",
        pro: "3",
        advanced: "unlimited",
      },
      {
        name: "Projects",
        starter: "1",
        pro: "2",
        advanced: "unlimited",
      },
      {
        name: "Countries per project",
        starter: "1",
        pro: "3",
        advanced: "unlimited",
      },
      {
        name: "Daily/Weekly tracking",
        starter: "Daily",
        pro: "Daily",
        advanced: "Daily or Weekly",
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
        advanced: true,
      },
      {
        name: "MCP integration",
        starter: true,
        pro: true,
        advanced: true,
      },
      {
        name: "Single sign on (SSO)",
        starter: false,
        pro: false,
        advanced: true,
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
        advanced: "Dedicated Support",
      },
      {
        name: "Slack community",
        starter: true,
        pro: true,
        advanced: true,
      },
      {
        name: "Custom onboarding",
        starter: false,
        pro: false,
        advanced: true,
      },
    ],
  },
];

function Cell({ value }: { value: CellValue }) {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <span
          className="inline-flex size-5 items-center justify-center text-zinc-800"
          aria-label="Included"
        >
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
    return (
      <span className="text-sm text-zinc-300" aria-label="Not included">
        —
      </span>
    );
  }
  if (typeof value === "string") {
    return <span className="text-sm text-zinc-700 tabular-nums">{value}</span>;
  }
  return <div>{value}</div>;
}

const planHeaders = [
  { name: "Starter", price: "$99/mo", cta: "register" as const },
  { name: "Pro", price: "$249/mo", cta: "register" as const, featured: true },
  { name: "Advanced", price: "Custom", cta: "sales" as const },
];

export default function PricingFeatures() {
  return (
    <section>
      <div className="border-b px-6 py-10 md:px-12">
        <h2 className="text-2xl font-medium tracking-tight">Compare brand plans</h2>
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          Agency packages are quoted separately — see the agency section above for what&apos;s
          included.
        </p>
      </div>
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="sticky left-0 border-r bg-background px-6 py-4 text-sm font-medium text-zinc-500 md:px-12">
                Feature
              </th>
              {planHeaders.map((plan, index) => (
                <th
                  key={plan.name}
                  className={`px-6 py-4 align-bottom md:px-8 ${
                    index < planHeaders.length - 1 ? "border-r" : "md:pr-12"
                  }`}
                >
                  <p className="text-sm font-medium text-zinc-900">{plan.name}</p>
                  <p className="mt-1 text-xs font-normal text-zinc-500">{plan.price}</p>
                </th>
              ))}
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
                  </td>
                </tr>
                {section.rows.map((row, rowIndex) => (
                  <tr key={`${section.title}-${rowIndex}`} className="border-b">
                    <td className="sticky left-0 border-r bg-background px-6 py-5 text-sm font-medium text-zinc-800 md:px-12">
                      {row.name}
                    </td>
                    <td className="border-r px-6 py-5 align-top md:px-8">
                      <Cell value={row.starter} />
                    </td>
                    <td className="border-r px-6 py-5 align-top md:px-8">
                      <Cell value={row.pro} />
                    </td>
                    <td className="px-6 py-5 align-top md:px-8 md:pr-12">
                      <Cell value={row.advanced} />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
            <tr>
              <td className="sticky left-0 border-r bg-background px-6 py-6 md:px-12" />
              {planHeaders.map((plan, index) => (
                <td
                  key={plan.name}
                  className={`px-6 py-6 align-top md:px-8 ${
                    index < planHeaders.length - 1 ? "border-r" : "md:pr-12"
                  }`}
                >
                  {plan.cta === "sales" ? (
                    <TalkToSalesButton
                      size="lg"
                      variant="outline"
                      className="w-full px-4"
                      source={`pricing-compare-${plan.name.toLowerCase()}`}
                    >
                      Talk to Sales
                    </TalkToSalesButton>
                  ) : (
                    <PricingTierMotion
                      featured={Boolean(plan.featured)}
                      href="/register"
                      cta="Get started"
                      tier={plan.name}
                    />
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
