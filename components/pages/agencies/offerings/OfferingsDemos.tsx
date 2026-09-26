import Image, { type StaticImageData } from "next/image";

import { brand } from "@/components/Home/brand";

import brandMonitor from "@/public/metrics/brandMonitor.webp";
import actionPlans from "@/public/partnership/agencies/feature-action-plans.webp";

type Demo = {
  title: string;
  body: string;
  mediaFirst: boolean;
  kind: "image" | "video";
  image?: StaticImageData;
  video?: string;
  videoLabel?: string;
};

const demos: readonly Demo[] = [
  {
    title: "Standing in one glance",
    body: "Visibility by engine, the prompts they win, and the ones they lose, ready for the kickoff PDF.",
    mediaFirst: false,
    kind: "video",
    video: "/services/videos/brand-visibility.webm",
    videoLabel: "Brand visibility across AI answers",
  },
  {
    title: "See who owns the answer",
    body: "Competitor share-of-voice and the sources AI cites when your client is skipped.",
    mediaFirst: true,
    kind: "video",
    video: "/services/videos/comparison.webm",
    videoLabel: "AI platform comparison dashboard",
  },
  {
    title: "Weekly proof without slide rebuilds",
    body: "Branded scorecards and deltas your AMs drop into Slack or the retainer deck.",
    mediaFirst: false,
    kind: "image",
    image: brandMonitor,
  },
  {
    title: "Pitch with their gap, not a strategy deck",
    body: "Spin up a prospect workspace, walk in with the chart, convert it to a live client on signature.",
    mediaFirst: true,
    kind: "image",
    image: actionPlans,
  },
] as const;

function Media({ demo }: { demo: Demo }) {
  if (demo.kind === "video" && demo.video) {
    return (
      <figure
        className="relative aspect-16/10 overflow-hidden rounded-2xl"
        style={{ backgroundColor: brand.cream }}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={demo.videoLabel}
        >
          <source src={demo.video} type="video/webm" />
        </video>
      </figure>
    );
  }

  return (
    <figure
      className="relative aspect-16/10 overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.cream }}
    >
      {demo.image ? (
        <Image
          src={demo.image}
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : null}
    </figure>
  );
}

export default function OfferingsDemos() {
  return (
    <section
      className="w-full rounded-2xl bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="offerings-demos-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="offerings-demos-heading"
          className="text-[1.75rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.4rem]"
          style={{ color: brand.tertiary }}
        >
          What clients actually see
        </h2>
        <p
          className="mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed sm:text-lg"
          style={{ color: brand.body }}
        >
          Your logo. Your portal. Reports that look like you built them.
        </p>
      </div>

      <ul className="mx-auto mt-14 flex max-w-5xl flex-col gap-16 px-6 lg:mt-16 lg:gap-20">
        {demos.map((demo) => (
          <li
            key={demo.title}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
          >
            <div
              className={
                demo.mediaFirst ? "order-2 md:order-1" : "order-2 md:order-2"
              }
            >
              <Media demo={demo} />
            </div>
            <div
              className={
                demo.mediaFirst ? "order-1 md:order-2" : "order-1 md:order-1"
              }
            >
              <h3
                className="text-2xl font-bold tracking-tight sm:text-[1.75rem]"
                style={{ color: brand.tertiary }}
              >
                {demo.title}
              </h3>
              <p
                className="mt-3 max-w-md text-[15px] font-medium leading-relaxed sm:text-base"
                style={{ color: brand.bodyStrong }}
              >
                {demo.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
