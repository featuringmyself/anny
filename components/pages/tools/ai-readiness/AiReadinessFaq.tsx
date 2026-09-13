import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { AI_CRAWL_PATH } from "@/components/pages/tools/ai-crawlability/seo";
import { aiReadinessFaqs } from "@/components/pages/tools/ai-readiness/seo";

export function AiReadinessFaq() {
  return (
    <section
      className="border-b border-zinc-200 bg-white px-6 py-16 md:px-10 md:py-24"
      aria-labelledby="ar-faq-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#2462ff]">FAQ</p>
        <h2
          id="ar-faq-heading"
          className="mt-2 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl"
        >
          Common questions
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500 text-balance">
          Short answers for the questions people actually type.
        </p>

        <Accordion defaultValue={["item-0"]} className="mt-10 max-w-3xl">
          {aiReadinessFaqs.map((faq, index) => (
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
                "Should I run the AI crawlability checker first?" ? (
                  <p className="max-w-2xl text-pretty">
                    Yes, if you only need to know whether AI bots can fetch the
                    site. Use the{" "}
                    <Link
                      href={AI_CRAWL_PATH}
                      className="font-medium text-zinc-800 underline-offset-4 hover:text-[#2462ff] hover:underline"
                    >
                      AI crawlability checker
                    </Link>{" "}
                    for robots.txt allow/block status, then use this readiness
                    checker for brand identity, schema, and citation signals.
                  </p>
                ) : (
                  <p className="max-w-2xl text-pretty">{faq.answer}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
