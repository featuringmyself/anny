import Image from "next/image";

import { brand } from "@/components/Home/brand";
import allAiGraph from "@/public/metrics/allAIGraph.webp";
import aiSources from "@/public/metrics/aiSources.webp";
import brandMonitor from "@/public/metrics/brandMonitor.webp";

/**
 * One job: show what the product does.
 * Three capabilities (Miller / chunking), alternating media, no card chrome
 * unless needed for interaction.
 */
const features = [
  {
    title: "See your AI visibility",
    body: "One view of how often ChatGPT, Claude, Gemini, and Perplexity mention you. Tracked daily so shifts are obvious.",
    image: allAiGraph,
    mediaFirst: false,
  },
  {
    title: "Find the sources that skip you",
    body: "AI cites specific pages. See which ones drive answers, who wrote them, and where competitors show up instead.",
    image: aiSources,
    mediaFirst: true,
  },
  {
    title: "Read every word AI says",
    body: "Full responses, sentiment, and mention history. Know the narrative before it hardens.",
    image: brandMonitor,
    mediaFirst: false,
  },
] as const;

export default function Metric() {
  return (
    <section
      className="w-full rounded-2xl bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="metrics-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="metrics-heading"
          className="text-[1.75rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.4rem]"
          style={{ color: brand.tertiary }}
        >
          Monitoring that tells the truth
        </h2>
        <p
          className="mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed sm:text-lg"
          style={{ color: brand.body }}
        >
          Know what changed. Then decide what to ship next.
        </p>
      </div>

      <ul className="mx-auto mt-14 flex max-w-5xl flex-col gap-16 px-6 lg:mt-16 lg:gap-20">
        {features.map((feature) => (
          <li
            key={feature.title}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
          >
            <div
              className={
                feature.mediaFirst ? "order-2 md:order-1" : "order-2 md:order-2"
              }
            >
              <figure
                className="relative aspect-16/10 overflow-hidden rounded-2xl"
                style={{ backgroundColor: brand.cream }}
              >
                <Image
                  src={feature.image}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <figcaption className="sr-only">{feature.body}</figcaption>
              </figure>
            </div>
            <div
              className={
                feature.mediaFirst
                  ? "order-1 md:order-2"
                  : "order-1 md:order-1"
              }
            >
              <h3
                className="text-2xl font-bold tracking-tight sm:text-[1.75rem]"
                style={{ color: brand.tertiary }}
              >
                {feature.title}
              </h3>
              <p
                className="mt-3 max-w-md text-[15px] font-medium leading-relaxed sm:text-base"
                style={{ color: brand.bodyStrong }}
              >
                {feature.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
