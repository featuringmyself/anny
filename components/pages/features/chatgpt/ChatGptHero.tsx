import Image from "next/image";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import chatgptLogo from "@/public/ai-logo/chatgptLogo.svg";
import heroDashboard from "@/public/features/chatgpt/hero-dashboard.png";

export default function ChatGptHero() {
  return (
    <section
      className="border-b border-border px-6 py-14 md:px-12 md:py-20"
      aria-labelledby="chatgpt-hero-heading"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-[#10A37F]">
            <Image
              src={chatgptLogo}
              alt=""
              width={16}
              height={16}
              className="size-4 object-contain"
              unoptimized
            />
            ChatGPT
          </p>
          <h1
            id="chatgpt-hero-heading"
            className="max-w-xl text-4xl font-medium tracking-tight text-balance md:text-5xl"
          >
            ChatGPT Visibility Tracker
          </h1>
          <p className="mt-4 max-w-md text-lg text-pretty text-zinc-500">
            Anny shows you exactly how your brand appears in ChatGPT, with
            everything you need to track, understand, and improve your
            visibility.
          </p>
          <div className="mt-8">
            <TalkToSalesButton
              size="lg"
              className="bg-[#10A37F] px-4 hover:bg-[#10A37F]/90"
              source="chatgpt-hero"
            />
          </div>
        </div>

        <figure className="relative min-w-0 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-md">
          <Image
            src={heroDashboard}
            alt="Anny ChatGPT visibility dashboard showing brand overview, competitor trends, and sentiment"
            width={heroDashboard.width}
            height={heroDashboard.height}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 55vw"
            placeholder="blur"
            priority
          />
          <figcaption className="sr-only">
            Product screenshot of the ChatGPT visibility overview
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
