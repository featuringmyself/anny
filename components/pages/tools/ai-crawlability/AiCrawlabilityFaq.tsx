import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { aiCrawlFaqs } from "@/components/pages/tools/ai-crawlability/seo";

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
          Common questions from marketing and SEO teams
        </h2>

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
                <p className="max-w-2xl text-pretty">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
