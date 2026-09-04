import Image from "next/image";

const BG = "#11333c";
const STICKER_BG = "#fdf6ec";
const STICKER_FG = "#93E85F";
const CARD_BG = "#f7f3ec";
const SOURCE = "#225864";

const quotes = [
  {
    text: "Google users who encounter an AI summary clicked a traditional result just 8% of the time — nearly half the rate without one.",
    source: "Pew Research",
    date: "Jul 22, 2025",
    logo: "/services/press/pew.png",
  },
  {
    text: "Generative AI solutions are becoming substitute answer engines, replacing queries that previously ran through traditional search.",
    source: "Gartner",
    date: "Feb 19, 2024",
    logo: "/services/press/gartner.png",
  },
  {
    text: "Google search is \"no longer a meaningful driver\" of traffic — Condé Nast's CEO called AI summaries \"another sort of death blow.\"",
    source: "Financial Times",
    date: "Feb 27, 2026",
    logo: "/services/press/ft.png",
  },
  {
    text: "AI Overviews correlate with a 58% reduction in click-through rates for top-ranking pages — nearly double the hit measured a year earlier.",
    source: "Ahrefs",
    date: "Feb 2026",
    logo: "/services/press/ahrefs.png",
  },
  {
    text: "Travel publishers told Bloomberg traffic fell by half after AI Overviews launched — then cratered as much as 90%.",
    source: "Bloomberg",
    date: "Apr 07, 2025",
    logo: "/services/press/bloomberg.png",
  },
  {
    text: "AI chatbots drive 95.7% less traffic to publishers than traditional Google search — the promised upside hasn't materialized.",
    source: "Digiday",
    date: "Dec 2025",
    logo: "/services/press/digiday.jpg",
  },
] as const;

export default function ServicesSearchIsChanging() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: BG }}
      aria-labelledby="services-search-changing-heading"
    >
      <div className="mx-auto flex flex-col items-center px-6 pt-20 pb-10 text-center sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-14">
        <span className="inline-flex items-center rounded-full border border-white/70 px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white uppercase sm:text-xs">
          Googling is so Y2K
        </span>

        <h2
          id="services-search-changing-heading"
          className="mt-7 max-w-3xl text-3xl leading-[1.2] font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.18]"
        >
          <span className="block">Web Search is Changing.</span>
          <span
            className="mt-2 inline-block -rotate-2 rounded-md px-3.5 py-0.5 whitespace-nowrap sm:mt-3"
            style={{ backgroundColor: STICKER_BG, color: STICKER_FG }}
          >
            Are You Ready?
          </span>
        </h2>
      </div>

      <div className="relative w-full pb-16 sm:pb-20 lg:pb-24">
        <ul
          className="flex gap-3 overflow-x-auto px-6 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-none sm:gap-4 sm:px-8 lg:gap-3.5 lg:overflow-visible lg:px-8 xl:gap-4"
          aria-label="Press coverage on AI search"
        >
          {quotes.map((quote) => (
            <li
              key={quote.source}
              className="flex w-[min(16.5rem,78vw)] shrink-0 snap-center flex-col rounded-2xl p-5 text-left sm:w-56 lg:w-0 lg:min-w-0 lg:flex-1"
              style={{ backgroundColor: CARD_BG }}
            >
              <p className="flex-1 text-[14px] leading-snug font-medium text-pretty text-zinc-800 sm:text-[15px]">
                {quote.text}
              </p>

              <footer className="mt-8 flex items-center gap-2.5">
                <Image
                  src={quote.logo}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 leading-tight">
                  <p
                    className="truncate text-sm font-bold"
                    style={{ color: SOURCE }}
                  >
                    {quote.source}
                  </p>
                  <p className="text-xs text-zinc-500">{quote.date}</p>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
