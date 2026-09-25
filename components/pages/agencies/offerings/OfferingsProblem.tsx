import { brand } from "@/components/Home/brand";

const engines = [
  { name: "ChatGPT", logo: "/ai-logo/chatgptLogo.svg", color: "#10A37F" },
  { name: "Gemini", logo: "/ai-logo/geminiLogo.svg", color: "#4B7BFF" },
  { name: "Claude", logo: "/ai-logo/claudeLogo.svg", color: "#E8784A" },
] as const;

export default function OfferingsProblem() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="offerings-problem-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:gap-12 md:py-20 lg:py-24">
        <div>
          <h2
            id="offerings-problem-heading"
            className="text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl"
          >
            Clients already ask where they show up in AI.
          </h2>
          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-neutral-200/90 sm:text-lg">
            Answer with a{" "}
            <span style={{ color: brand.lime }}>standing snapshot</span>, then
            sell the monthly retainer. Same toolkit SEO, PR, and digital shops
            already know how to package.
          </p>
        </div>

        <aside className="relative flex min-h-72 flex-col overflow-hidden rounded-2xl bg-[#0c242b] p-5 ring-1 ring-white/10 sm:p-6">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">
            Client kickoff · sample
          </p>
          <p
            className="mt-4 text-2xl font-bold tracking-tight"
            style={{ color: brand.lime }}
          >
            18% visibility
          </p>
          <p className="mt-1 text-sm font-medium text-white/55">
            Named in 4 of 22 tracked prompts
          </p>

          <ul className="mt-8 space-y-3">
            {engines.map((engine) => (
              <li
                key={engine.name}
                className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 ring-1 ring-white/10"
              >
                <span
                  className="grid size-8 place-items-center rounded-lg"
                  style={{ backgroundColor: engine.color }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={engine.logo}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 object-contain brightness-0 invert"
                  />
                </span>
                <span className="flex-1 text-sm font-semibold text-white/80">
                  {engine.name}
                </span>
                <span className="text-xs font-medium text-white/40">Gap</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
