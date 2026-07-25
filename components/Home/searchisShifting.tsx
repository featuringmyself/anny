import { ArrowUp } from "lucide-react";

import { PatternStrip } from "@/components/pages/shared/pattern-strip";

const mauData = [
  {
    name: "ChatGPT",
    logo: "/ai-logo/chatgptLogo.svg",
    value: "1B",
    width: "92%",
    color: "#10A37F",
    invert: true,
  },
  {
    name: "Gemini",
    logo: "/ai-logo/geminiLogo.svg",
    value: "950M",
    width: "87%",
    color: "#4B7BFF",
    invert: true,
  },
  {
    name: "Claude",
    logo: "/ai-logo/claudeLogo.svg",
    value: "245M",
    width: "23%",
    color: "#E8784A",
    invert: true,
  },
  {
    name: "Grok",
    logo: "/ai-logo/grokLogo.svg",
    value: "117M",
    width: "11%",
    color: "#1A1A1A",
    invert: true,
  },
  {
    name: "DeepSeek",
    logo: null,
    value: "67M",
    width: "6%",
    color: "#4D6BFE",
    invert: false,
  },
  {
    name: "Perplexity",
    logo: "/ai-logo/perplexityLogo.svg",
    value: "34M",
    width: "3%",
    color: "#1AA8B8",
    invert: true,
  },
] as const;

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

function DeepSeekMark() {
  return (
    <svg
      viewBox="0 0 28 20"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-auto"
      aria-hidden
    >
      <path d="M26.8051 1.67861C26.5182 1.53756 26.3946 1.80637 26.2268 1.94293C26.1694 1.98698 26.1209 2.04424 26.0723 2.09709C25.6529 2.54642 25.1629 2.84168 24.5228 2.80638C23.5869 2.75348 22.7878 3.04875 22.0815 3.76689C21.9314 2.88134 21.4325 2.35256 20.6732 2.01339C20.2759 1.83713 19.8742 1.66087 19.596 1.27755C19.4018 1.00448 19.3488 0.700459 19.2517 0.400842C19.1899 0.220231 19.1281 0.0351223 18.9206 0.00427084C18.6954 -0.0309327 18.6071 0.158431 18.5188 0.317137C18.1657 0.964824 18.0288 1.67857 18.042 2.40111C18.0729 4.0269 18.7572 5.32213 20.1169 6.24298C20.2714 6.34874 20.3111 6.4544 20.2626 6.6087C20.1699 6.92592 20.0595 7.23429 19.9624 7.55151C19.9006 7.75422 19.8078 7.79827 19.5916 7.71007C18.8455 7.39735 18.2009 6.93467 17.6314 6.37519C16.6646 5.43674 15.7905 4.40137 14.7002 3.59068C14.4441 3.40122 14.1881 3.22505 13.9232 3.05755C12.8107 1.97378 14.0689 1.08373 14.3602 0.978074C14.6648 0.867918 14.4662 0.488948 13.4817 0.493445C12.4972 0.497797 11.5967 0.828265 10.4489 1.26884C10.2812 1.33494 10.1045 1.38335 9.92351 1.423C8.88168 1.22479 7.80008 1.18064 6.66995 1.30849C4.54208 1.54636 2.84252 2.55532 1.59319 4.27802C0.0922557 6.34874 -0.260902 8.70138 0.171737 11.1555C0.626451 13.7416 1.94196 15.8828 3.96388 17.5571C6.06085 19.2929 8.47565 20.1433 11.2303 19.9803C12.9035 19.8834 14.7665 19.6587 16.8678 17.8744C17.3975 18.1387 17.9538 18.2444 18.8765 18.3237C19.5872 18.3898 20.2715 18.2885 20.8012 18.1784C21.6312 18.0021 21.5738 17.2311 21.2736 17.0901C18.8412 15.9534 19.3753 16.416 18.8897 16.0415C20.1258 14.5744 21.9888 13.0499 22.7172 8.11099C22.7746 7.71892 22.726 7.47216 22.7172 7.15494C22.7128 6.96112 22.7569 6.88627 22.9777 6.86417C23.5869 6.79367 24.1784 6.6263 24.7214 6.32669C26.2975 5.46319 26.9331 4.0445 27.0832 2.34385C27.1053 2.08389 27.0788 1.81508 26.8051 1.67861Z" />
    </svg>
  );
}

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
    <>
    <PatternStrip bordered={false} />
    <div className="grid grid-cols-1 border-y md:grid-cols-2">
      {/* Left: MAU chart */}
      <div className="flex flex-col border-b md:border-b-0 md:border-r">
        <div className="flex flex-1 flex-col gap-5 p-8 md:p-10">
          <h2 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">
            Search is Shifting from Search Engines to AI.
          </h2>
          <p className="max-w-md text-xl leading-snug text-zinc-500 text-balance md:text-2xl">
            Monthly usage of standalone AI tools has grown to well over{" "}
            <span className="text-[#2462ff]">1 billion people</span> by mid-2026.
          </p>
        </div>

        <div className="mt-auto flex flex-col border-t">
          {mauData.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-[1fr_3.5rem] items-center border-b last:border-b-0"
            >
              <div className="min-w-0">
                <div
                  className="relative flex h-12 items-center pl-3"
                  style={{
                    width: item.width,
                    backgroundColor: item.color,
                    ...stripeStyle,
                  }}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white/20">
                    {item.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.logo}
                        alt=""
                        width={14}
                        height={14}
                        className={`size-3.5 object-contain ${item.invert ? "brightness-0 invert" : ""}`}
                        draggable={false}
                      />
                    ) : (
                      <DeepSeekMark />
                    )}
                  </span>
                  <span className="sr-only">{item.name}</span>
                </div>
              </div>
              <span className="pr-4 text-right text-sm text-zinc-500 tabular-nums">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: GEO pitch */}
      <div className="flex flex-col bg-[#1a1a1a] px-8 py-10 text-white md:px-12 md:py-12">
        <h2 className="text-center text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Your customers aren&apos;t <Googling />{" "}
          anymore. They&apos;re asking AI for purchase decisions.
        </h2>

        <div className="relative mx-auto my-10 w-full max-w-sm flex-1">
          <div className="relative flex h-full min-h-80 flex-col overflow-hidden rounded-2xl bg-[#111] ring-1 ring-white/5">
            {/* User query bubble */}
            <div className="absolute top-[28%] right-6 left-6 z-10 flex justify-end">
              <div className="max-w-[85%] rounded-2xl bg-[#2462ff] px-4 py-3 text-sm leading-snug text-white shadow-lg">
                best CRM for growing B2B teams
              </div>
            </div>

            {/* Faded AI reply */}
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
                1. Attio is a modern CRM built for startups and sales teams that
                need flexible pipelines and clean data without the complexity.
              </p>
              <p>…</p>
            </div>

            {/* Input */}
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-xl bg-[#1f1f1f] px-4 py-3 ring-1 ring-white/5">
              <span className="flex-1 text-sm text-zinc-500">Ask me anything...</span>
              <span className="grid size-7 place-items-center rounded-full bg-[#2a2a2a] text-zinc-400">
                <ArrowUp className="size-3.5" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto text-center">
          <h3 className="text-2xl font-medium tracking-tight text-balance md:text-3xl">
            Generative Engine Optimization puts you at the center of every buying
            decision.
          </h3>
          <p className="mx-auto mt-4 max-w-sm text-sm text-zinc-400 text-balance">
            Either your clients get mentioned in AI answers or they lose the
            sale to competitors.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
