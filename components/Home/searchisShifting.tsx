import { ArrowUp } from "lucide-react";

import { PatternStrip } from "@/components/pages/shared/pattern-strip";

/**
 * Publicly attributed MAU figures only. Widths are relative to the largest
 * value so the chart stays honest when numbers change.
 *
 * ChatGPT: Sensor Tower via Reuters (May 2026 app MAU).
 * Gemini: Google (Aug 2026 monthly users announcement).
 * Claude: Sensor Tower via Reuters (Q2 2026 app MAU).
 */
const mauData = [
  {
    name: "ChatGPT",
    logo: "/ai-logo/chatgptLogo.svg",
    value: "1B",
    mauMillions: 1000,
    color: "#10A37F",
    invert: true,
  },
  {
    name: "Gemini",
    logo: "/ai-logo/geminiLogo.svg",
    value: "1B",
    mauMillions: 1000,
    color: "#4B7BFF",
    invert: true,
  },
  {
    name: "Claude",
    logo: "/ai-logo/claudeLogo.svg",
    value: "56M",
    mauMillions: 56,
    color: "#E8784A",
    invert: true,
  },
] as const;

const maxMau = Math.max(...mauData.map((item) => item.mauMillions));

const REUTERS_CHATGPT_MAU =
  "https://www.reuters.com/technology/chatgpt-app-hits-1-billion-monthly-active-users-record-time-data-shows-2026-06-02/";
const VERGE_GEMINI_MAU =
  "https://www.theverge.com/ai-artificial-intelligence/978113/chatgpt-gemini-1-billion-users";

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
    <section aria-labelledby="search-shifting-heading">
      <PatternStrip bordered={false} />
      <div className="grid grid-cols-1 border-y md:grid-cols-2">
        <article className="flex flex-col border-b md:border-r md:border-b-0">
          <header className="flex flex-1 flex-col gap-3 p-6 sm:gap-5 sm:p-8 md:p-10">
            <h2
              id="search-shifting-heading"
              className="text-xl leading-tight font-medium tracking-tight text-balance sm:text-3xl md:text-4xl md:leading-normal"
            >
              Search is Shifting from Search Engines to AI.
            </h2>
            <p className="max-w-md text-sm leading-snug text-balance text-zinc-500 sm:text-xl md:text-2xl">
              ChatGPT crossed{" "}
              <span className="text-[#2462ff]">1 billion</span> monthly app
              users in May 2026, and Google said Gemini reached the same
              monthly scale by August—buyers are asking assistants, not only
              search boxes.
            </p>
            <p className="text-xs leading-relaxed text-zinc-400">
              Sources:{" "}
              <a
                href={REUTERS_CHATGPT_MAU}
                className="underline underline-offset-2 hover:text-zinc-600"
                rel="noopener noreferrer"
                target="_blank"
              >
                Reuters / Sensor Tower
              </a>
              {" · "}
              <a
                href={VERGE_GEMINI_MAU}
                className="underline underline-offset-2 hover:text-zinc-600"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google via The Verge
              </a>
              <span className="mt-1 block tracking-wide uppercase">
                Updated September 2026
              </span>
            </p>
          </header>

          <figure
            className="mt-auto flex flex-col border-t"
            aria-label="Monthly active users by AI tool"
          >
            <figcaption className="sr-only">
              Attributed monthly active users: ChatGPT 1B app MAU (Sensor Tower
              via Reuters, May 2026), Gemini 1B monthly users (Google, August
              2026), Claude 56M app MAU (Sensor Tower via Reuters, Q2 2026).
            </figcaption>
            {mauData.map((item) => {
              const width = `${Math.max(
                (item.mauMillions / maxMau) * 100,
                4,
              )}%`;
              return (
                <div
                  key={item.name}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)_3.5rem] items-center border-b last:border-b-0"
                >
                  <div
                    className="grid h-12 place-items-center"
                    style={{ backgroundColor: item.color, ...stripeStyle }}
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        width={14}
                        height={14}
                        className={`size-3.5 object-contain ${item.invert ? "brightness-0 invert" : ""}`}
                        draggable={false}
                      />
                    </span>
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
                  <span className="pr-3 text-right text-sm text-zinc-500 tabular-nums sm:pr-4">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </figure>
        </article>

        <aside className="flex flex-col bg-[#1a1a1a] px-8 py-10 text-white md:px-12 md:py-12">
          <h2 className="text-center text-3xl font-medium tracking-tight text-balance md:text-4xl">
            Your customers aren&apos;t <Googling /> anymore. They&apos;re asking
            AI for purchase decisions.
          </h2>

          <figure className="relative mx-auto my-10 w-full max-w-sm flex-1">
            <figcaption className="sr-only">
              Example AI answer recommending Attio for the query &quot;best CRM
              for growing B2B teams&quot;
            </figcaption>
            <div className="relative flex h-full min-h-80 flex-col overflow-hidden rounded-2xl bg-[#111] ring-1 ring-white/5">
              <div className="absolute top-[28%] right-6 left-6 z-10 flex justify-end">
                <p className="max-w-[85%] rounded-2xl bg-[#2462ff] px-4 py-3 text-sm leading-snug text-white shadow-lg">
                  best CRM for growing B2B teams
                </p>
              </div>

              <div
                className="absolute inset-x-6 top-[48%] space-y-2 text-[11px] leading-relaxed text-zinc-500"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 20%, black 55%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 20%, black 55%, transparent 100%)",
                }}
              >
                <p>
                  Here are the top CRMs teams recommend for scaling B2B sales:
                </p>
                <p>
                  1. Attio is a modern CRM built for startups and sales teams
                  that need flexible pipelines and clean data without the
                  complexity.
                </p>
                <p>…</p>
              </div>

              <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-xl bg-[#1f1f1f] px-4 py-3 ring-1 ring-white/5">
                <span className="flex-1 text-sm text-zinc-500">
                  Ask me anything...
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-[#2a2a2a] text-zinc-400">
                  <ArrowUp className="size-3.5" strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </figure>

          <div className="mt-auto text-center">
            <h3 className="text-2xl font-medium tracking-tight text-balance md:text-3xl">
              Generative Engine Optimization puts you at the center of every
              buying decision.
            </h3>
            <p className="mx-auto mt-4 max-w-sm text-sm text-balance text-zinc-400">
              Either you get mentioned in AI answers or lose the sale to your
              competitors.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
