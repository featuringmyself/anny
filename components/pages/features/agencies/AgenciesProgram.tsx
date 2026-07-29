const included = [
  "Heavily discounted agency rate, quoted to your roster size",
  "Unlimited client workspaces with per-client data isolation",
  "Unlimited team seats — analysts, AMs, and strategists",
  "Every AI model on every client, no per-channel upcharge",
  "Pitch workspaces that sit outside your client quota",
  "White-label reports, Looker templates, CSV and API",
  "Scheduled weekly client reporting via API or MCP",
  "Pricing playbook and pitch collateral for selling GEO",
  "A named partner contact for onboarding and escalations",
] as const;

export default function AgenciesProgram() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12">
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">Agency program</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-medium tracking-tight text-balance md:text-3xl">
          Built for agencies, not brand plans with an agency label
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
          Only volume scales with tier. Everything that makes the service sellable is in from day
          one.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3">
        {included.map((item, index) => (
          <li
            key={item}
            className={`flex items-start gap-3 px-6 py-6 text-sm text-zinc-700 md:px-8 ${
              index < included.length - 1 ? "border-b md:border-b" : ""
            } ${index % 3 !== 2 ? "md:border-r" : ""} ${
              index >= included.length - 3 ? "md:border-b-0" : ""
            }`}
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2462ff]" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
