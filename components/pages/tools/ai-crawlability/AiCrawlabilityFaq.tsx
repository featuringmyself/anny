import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { aiCrawlFaqs } from "@/components/pages/tools/ai-crawlability/seo";
import { AI_READINESS_PATH } from "@/components/pages/tools/ai-readiness/seo";

export function AiCrawlabilityFaq() {
  return (
    <section
      className="border-b border-zinc-200 bg-[#f6f7f4] px-6 py-16 md:px-10 md:py-24"
      aria-labelledby="crawl-faq-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#2462ff]">FAQ</p>
        <h2
          id="crawl-faq-heading"
          className="mt-2 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl"
        >
          Common questions about AI crawlability
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500 text-balance">
          Short answers for the questions people actually type.
        </p>

        <Accordion defaultValue={["item-0"]} className="mt-10 max-w-3xl">
          {aiCrawlFaqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-b border-zinc-200"
            >
              <AccordionTrigger className="py-5 text-left text-base font-medium text-zinc-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-zinc-500">
                {faq.question ===
                "Is this the same as the AI readiness checker?" ? (
                  <p className="max-w-2xl text-pretty">
                    No. This tool only answers whether AI bots can crawl the
                    site. The{" "}
                    <Link
                      href={AI_READINESS_PATH}
                      className="font-medium text-zinc-800 underline-offset-4 hover:text-[#2462ff] hover:underline"
                    >
                      AI readiness checker
                    </Link>{" "}
                    also looks at brand identity, schema, and citation signals.
                  </p>
                ) : (
                  <p className="max-w-2xl text-pretty">{faq.answer}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-8 text-sm text-zinc-500">
          Next step:{" "}
          <Link
            href={AI_READINESS_PATH}
            className="font-medium text-zinc-800 underline-offset-4 hover:text-[#2462ff] hover:underline"
          >
            Run the AI readiness checker
          </Link>
        </p>
      </div>
    </section>
  );
}
