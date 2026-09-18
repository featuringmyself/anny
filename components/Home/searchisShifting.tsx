import { ArrowUp } from "lucide-react";

import { brand } from "@/components/Home/brand";

/**
 * Comparable monthly-audience estimates from one methodology so the chart
 * does not imply ChatGPT and Gemini are tied at "1B".
 *
 * Sensor Tower State of AI 2026 (published June 2026): True Audience share
 * across app + web as of May 2026, with monthly-user estimates reported from
 * that share series:
 *   ChatGPT ~1.1B (46.4%)
 *   Gemini  ~662M (27.7%)
 *   Claude  ~245M (10.3%)
 *
 * Claude's earlier Reuters/Sensor Tower *app-only* figure (~56M, Q2 2026)
 * is a different metric and is not mixed into this chart.
 */
const mauData = [
  {
    name: "ChatGPT",
    logo: "/ai-logo/chatgptLogo.svg",
    value: "1.1B",
    note: "Est. monthly",
    mauMillions: 1100,
    color: "#10A37F",
    invert: true,
  },
  {
    name: "Gemini",
    logo: "/ai-logo/geminiLogo.svg",
    value: "662M",
    note: "Est. monthly",
    mauMillions: 662,
    color: "#4B7BFF",
    invert: true,
  },
  {
    name: "Claude",
    logo: "/ai-logo/claudeLogo.svg",
    value: "245M",
    note: "Est. monthly",
    mauMillions: 245,
    color: "#E8784A",
    invert: true,
  },
] as const;

const maxMau = Math.max(...mauData.map((item) => item.mauMillions));

const SENSOR_TOWER_STATE_OF_AI =
  "https://sensortower.com/blog/state-of-ai-2026";

const googleLetters = [
  { char: "G", color: "#4285F4" },
  { char: "o", color: "#EA4335" },
  { char: "o", color: "#FBBC05" },
  { char: "g", color: "#4285F4" },
  { char: "l", color: "#34A853" },
  { char: "i", color: "#EA4335" },
  { char: "n", color: "#4285F4" },
  { char: "g", color: "#34A853" },
] as const;

const stripeStyle = {
  backgroundImage:
    "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 4px)",
};

function Googling() {
  return (
    <span className="inline">
      {googleLetters.map((letter, i) => (
        <span key={`${letter.char}-${i}`} style={{ color: letter.color }}>
          {letter.char}
        </span>
      ))}
    </span>
  );
}

export default function SearchIsShifting() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="search-shifting-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:gap-12 md:py-20 lg:py-24">
        <div>
          <h2
            id="search-shifting-heading"
            className="text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl"
          >
            Buyers aren&apos;t only{" "}
            <Googling />
            . They ask AI first.
          </h2>
          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-neutral-200/90 sm:text-lg">
Sensor
            Tower&apos;s May 2026 estimates put ChatGPT near{" "}
            <span style={{ color: brand.lime }}>1.1B</span> monthly users,
            Gemini around <span style={{ color: brand.lime }}>662M</span>, and
            Claude around <span style={{ color: brand.lime }}>245M</span>. If
            you are not in the answer, you are not in the shortlist.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/40">
            Source:{" "}
            <a
              href={SENSOR_TOWER_STATE_OF_AI}
              className="underline underline-offset-2 hover:text-white/65"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sensor Tower State of AI 2026
            </a>
            {" "}
            (True Audience, app + web, May 2026)
          </p>

          <figure
            className="mt-8 overflow-hidden rounded-xl"
            style={{ backgroundColor: brand.cream }}
            aria-label="Estimated monthly users across AI assistants, May 2026"
          >
            <figcaption className="border-b border-black/5 px-4 py-2.5 text-left text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">
              Est. monthly users · same methodology
            </figcaption>
            {mauData.map((item) => {
              const width = `${Math.max((item.mauMillions / maxMau) * 100, 8)}%`;
              return (
                <div
                  key={item.name}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)_5.5rem] items-center border-b border-black/5 last:border-b-0 sm:grid-cols-[2.5rem_minmax(0,1fr)_6.5rem]"
                >
                  <div
                    className="grid h-12 place-items-center"
                    style={{ backgroundColor: item.color, ...stripeStyle }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.logo}
                      alt=""
                      width={14}
                      height={14}
                      className={`size-3.5 object-contain ${item.invert ? "brightness-0 invert" : ""}`}
                      draggable={false}
                    />
                  </div>
                  <div className="min-w-0 self-stretch">
                    <div
                      className="h-full min-h-12"
                      style={{
                        width,
                        backgroundColor: item.color,
                        ...stripeStyle,
                      }}
                    />
                  </div>
                  <div className="pr-3 text-right leading-tight">
                    <p className="text-sm font-semibold text-zinc-800 tabular-nums">
                      {item.value}
                    </p>
                    <p className="text-[10px] font-medium text-zinc-500">
                      {item.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </figure>
        </div>

        <aside className="relative flex min-h-80 flex-col overflow-hidden rounded-2xl bg-[#0c242b] p-5 ring-1 ring-white/10 sm:p-6">
          <p
            className="ml-auto max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-snug font-semibold text-[#11333c]"
            style={{ backgroundColor: brand.lime }}
          >
            best CRM for growing B2B teams
          </p>
          <div className="mt-6 space-y-2 text-[13px] leading-relaxed text-white/55">
            <p>Here are the top CRMs teams recommend:</p>
            <p>
              1. Attio is a modern CRM built for startups and sales teams that
              need flexible pipelines without the complexity.
            </p>
            <p className="text-white/35">…</p>
          </div>
          <div className="mt-auto flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
            <span className="flex-1 text-sm text-white/40">Ask anything...</span>
            <span className="grid size-7 place-items-center rounded-full bg-white/10 text-white/60">
              <ArrowUp className="size-3.5" strokeWidth={2.5} />
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}
