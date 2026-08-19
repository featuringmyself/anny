import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { serpCheckerFaqs } from "@/components/pages/tools/serp-overview/seo";

export function SerpOverviewFaq() {
  return (
    <section
      className="border-b px-6 py-14 md:px-12 md:py-20"
      aria-labelledby="serp-faq-heading"
    >
      <p className="text-sm font-medium tracking-wide text-[#2462ff]">FAQs</p>
      <h2
        id="serp-faq-heading"
        className="mt-2 text-2xl font-medium tracking-tight md:text-3xl"
      >
        SERP Overview, answered plainly
      </h2>
      <p className="mt-3 max-w-xl text-base text-zinc-500 text-balance">
        Short answers for what this snapshot is — and what it is not.
      </p>

      <Accordion defaultValue={["item-0"]} className="mt-10 max-w-3xl">
        {serpCheckerFaqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`item-${index}`}
            className="border-b border-border"
          >
            <AccordionTrigger className="py-5 text-base font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed text-zinc-500">
              <p className="max-w-2xl text-pretty">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
