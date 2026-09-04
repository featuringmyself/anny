import Image from "next/image";

const BG = "#11333c";
const STICKER_BG = "#fdf6ec";
const STICKER_FG = "#93E85F";
const CARD_BG = "#f7f3ec";
const SOURCE = "#225864";

const quotes = [
  {
    text: "Comprehensive answers by Gemini AI are attracting users who are frustrated with Google's ad-clogged search results.",
    source: "Bloomberg",
    date: "Jan 07, 2025",
    logo: "/services/press/bloomberg.png",
  },
  {
    text: "Despite fewer clicks, copyright fights, and sometimes iffy answers, AI means the end of internet search as we've known it.",
    source: "MIT Technology Review",
    date: "Jan 06, 2025",
    logo: "/services/press/mit.png",
  },
  {
    text: "People reading AI summaries on Google search instead of news stories, media experts warn",
    source: "CBC Canada",
    date: "Aug 14, 2025",
    logo: "/services/press/cbc.png",
  },
  {
    text: "Study claims sites previously ranked first can lose 79% of traffic if results appear below Google Overview.",
    source: "The Guardian",
    date: "Jul 24, 2025",
    logo: "/services/press/guardian.png",
  },
  {
    text: "Generative AI has already caused shifts in the search engine ecosystem. Is OpenAI's Search tool Google's Killer?",
    source: "The Week",
    date: "Nov 05, 2024",
    logo: "/services/press/theweek.png",
  },
  {
    text: "ChatGPT search feels like a helpful friend. It is \"all the things early Google was before it started monetizing our eyeballs.\"",
    source: "Tech Radar",
    date: "Nov 01, 2024",
    logo: "/services/press/techradar.png",
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
