import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const TERTIARY = "#025864";
const PRIMARY = "#93E85F";
const SECONDARY = "#fcf0e7";
const DARK = "#212529";
const TERTIARY_100 = "#ccdee0";
const BODY = "#2a3f44";

const services = [
  {
    title: "Custom Strategy",
    body: "We'll create a tailored plan to enhance your brand's presence, sentiment, and ranking across all major AI search engines.",
    icon: "/services/icons/custom-strategy.svg",
  },
  {
    title: "Fully Managed Execution",
    body: "Too busy to implement a new strategy? Our team can manage everything from content optimization to PR outreach on your behalf.",
    icon: "/services/icons/managed-execution.svg",
  },
  {
    title: "Ongoing Performance Audits",
    body: "We proactively adapt your strategy to stay ahead of algorithm changes and new AI features, ensuring your brand maintains its competitive edge.",
    icon: "/services/icons/performance-audits.svg",
  },
  {
    title: "Team Training & Workshops",
    body: "Empower your in-house team with customized training on Generative Engine Optimization (GEO) and how to leverage the Anny platform.",
    icon: "/services/icons/team-training.svg",
  },
] as const;

export default function ServicesPutOnAIMap() {
  return (
    <section
      className="w-full rounded-2xl bg-white py-20 sm:py-24 lg:py-28"
      aria-labelledby="services-ai-map-heading"
    >
      <div className="mx-auto flex w-full max-w-260 flex-col items-center gap-12 px-6 lg:gap-14 xl:gap-16">
        <div className="mx-auto flex w-full max-w-150 flex-col items-center text-center lg:max-w-187.5">
          <span
            className="inline-flex items-center rounded-full border px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase sm:text-xs"
            style={{ color: TERTIARY, borderColor: TERTIARY_100 }}
          >
            Our Services
          </span>

          <h2
            id="services-ai-map-heading"
            className="mt-7 max-w-3xl text-[2rem] leading-[1.1] font-bold tracking-[-0.07rem] sm:mt-8 sm:text-[2.5rem] sm:tracking-[-0.08rem] xl:text-[3rem] xl:tracking-[-0.12rem]"
            style={{ color: TERTIARY }}
          >
            We&apos;re Here to Put Your Brand on
            <br />
            <span
              className="mt-2 inline-flex -rotate-1 rounded-lg px-3.5 py-1.5 lg:mt-0 lg:-rotate-2 lg:rounded-lg lg:px-4 lg:py-0"
              style={{ backgroundColor: TERTIARY, color: PRIMARY }}
            >
              The AI Map
            </span>
          </h2>

          <p
            className="mt-8 max-w-2xl text-base leading-[1.65] font-medium tracking-tight sm:mt-10 sm:text-lg sm:leading-normal text-center"
            style={{ color: BODY }}
          >
            Anny team provides the winning strategy. We partner with you to
            turn raw data into a powerful action plan, ensuring your brand
            doesn&apos;t just appear in AI answers, it dominates them.
          </p>
        </div>

        <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex items-start gap-4 rounded-2xl border p-7 sm:gap-5 sm:p-8 lg:gap-6 lg:p-10"
              style={{
                backgroundColor: SECONDARY,
                borderColor: DARK,
              }}
            >
              <Image
                src={service.icon}
                alt=""
                width={40}
                height={40}
                className="size-8 shrink-0 sm:size-10"
              />
              <div className="flex min-w-0 flex-1 flex-col text-left">
                <h3
                  className="m-0 text-lg leading-[1.2] font-bold tracking-[-0.02em] sm:text-xl sm:tracking-[-0.03em]"
                >
                  {service.title}
                </h3>
                <p
                  className="mt-2 m-0 text-[15px] leading-[1.55] font-medium sm:mt-2.5 sm:text-base sm:leading-[1.6]"
                  style={{ color: BODY }}
                >
                  {service.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
