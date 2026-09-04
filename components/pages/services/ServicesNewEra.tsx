import Image from "next/image";

const BG = "#11333c";
const STICKER_BG = "#fdf6ec";
const STICKER_FG = "#93E85F";

const features = [
  {
    title: "50% Decline in Your Organic Web Traffic",
    body: "Gartner predicts organic search traffic will drop by 50% by 2028 and we're already seeing early signs. In 2025 alone, U.S. organic traffic is down nearly 60% as AI tools dominate how people search, shop, and decide.",
    icon: "/services/icons/decline.svg",
  },
  {
    title: "Google Rankings Have Lost Their Relevance",
    body: "83% of users now prefer AI-generated answers over traditional search results. That means ranking #1 on Google no longer guarantees visibility. If you're not appearing in AI Overviews, ChatGPT, Perplexity, and Microsoft Copilot, your audience won't find you.",
    icon: "/services/icons/google-decline.svg",
  },
  {
    title: "New Factors Influence Visibility on AI Search",
    body: "Generative engines reference fewer than half of the top 10 search results and they don't play by SEO's old rules. Structured data, authority signals, and brand mentions now drive whether your business gets cited or skipped.",
    icon: "/services/icons/visibility.svg",
  },
] as const;

export default function ServicesNewEra() {
  return (
    <section
      className="w-full rounded-2xl"
      style={{ backgroundColor: BG }}
      aria-labelledby="services-new-era-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-24 lg:py-28">
        <span className="inline-flex items-center rounded-full border-2 border-neutral-300 px-6 py-1.5 text-xs font-semibold text-neutral-300 uppercase ">
          Welcome to GEO Era
        </span>

        <h2
          id="services-new-era-heading"
          className="mt-7 max-w-3xl text-3xl leading-[1.2] font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.18]"
        >
          <span className="block">SEO is as Outdated as</span>
          <span
            className="inline-block -rotate-2 rounded-md px-3.5 whitespace-nowrap"
            style={{ backgroundColor: STICKER_BG, color: STICKER_FG }}
          >
            Dial-up Internet
          </span>
        </h2>

        <p className="mt-8 max-w-2xl text-base text-neutral-200/90 sm:text-lg font-medium leading-snug">
          Let&apos;s be honest &ldquo;Just Google It&rdquo; era is over! AI is
          getting chattier than your aunt at Thanksgiving. Here&apos;s
          what&apos;s happening:
        </p>

        <ul className="mt-14 grid w-full grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-10 lg:gap-14">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="mx-auto flex max-w-sm flex-col items-center text-center"
            >
              <Image
                src={feature.icon}
                alt=""
                width={52}
                height={52}
                className="size-12 sm:size-13 bg-white rounded-lg p-1"
              />
              <h3 className="mt-5 text-lg leading-snug font-bold text-balance text-white sm:text-xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-normal text-white/65 font-medium sm:text-[15px] text-justify text-pretty">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
