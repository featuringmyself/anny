const features = [
  {
    name: "AI mention tracking",
    starter: true,
    growth: true,
    agency: true,
  },
  {
    name: "Source & citation map",
    starter: true,
    growth: true,
    agency: true,
  },
  {
    name: "Competitor visibility",
    starter: false,
    growth: true,
    agency: true,
  },
  {
    name: "AI Mode / Overview dual panel",
    starter: false,
    growth: true,
    agency: true,
  },
  {
    name: "Prompt volume",
    starter: "500 / mo",
    growth: "2,500 / mo",
    agency: "Custom",
  },
  {
    name: "Seats",
    starter: "3",
    growth: "10",
    agency: "Unlimited",
  },
  {
    name: "Slack & email alerts",
    starter: false,
    growth: true,
    agency: true,
  },
  {
    name: "White-label reports",
    starter: false,
    growth: false,
    agency: true,
  },
  {
    name: "SSO & audit logs",
    starter: false,
    growth: false,
    agency: true,
  },
] as const;

function Cell({ value }: { value: boolean | string }) {
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
        <h2 className="text-2xl font-medium tracking-tight">Compare features</h2>
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          Everything Anny tracks, lined up by plan — no card chrome, just the checklist.
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
              <th className="w-28 px-4 py-4 text-sm font-medium md:w-36">Growth</th>
              <th className="w-28 px-4 py-4 text-sm font-medium md:w-36 md:pr-12">
                Agency
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((row) => (
              <tr key={row.name} className="border-b last:border-b-0">
                <td className="sticky left-0 bg-background px-6 py-4 text-sm text-zinc-800 md:px-12">
                  {row.name}
                </td>
                <td className="px-4 py-4">
                  <Cell value={row.starter} />
                </td>
                <td className="px-4 py-4">
                  <Cell value={row.growth} />
                </td>
                <td className="px-4 py-4 md:pr-12">
                  <Cell value={row.agency} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
