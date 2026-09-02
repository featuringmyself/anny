"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { servicesFaqs } from "@/components/pages/services/data";
import {
  sectionMuted,
  sectionPadding,
} from "./shared/section-styles";

export default function ServicesFaq() {
  return (
    <section
      className={`${sectionMuted} ${sectionPadding}`}
      aria-labelledby="services-faq-heading"
    >
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16 xl:gap-20">
        <div className="lg:sticky lg:top-24">
          <p className="text-sm font-medium text-[#2462ff]">FAQ</p>
          <h2
            id="services-faq-heading"
            className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl"
          >
            Common questions
          </h2>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-zinc-500">
            What marketing teams ask before starting a managed GEO program.
          </p>
        </div>

        <Accordion
          defaultValue={["item-0"]}
          className="mt-10 lg:mt-0"
        >
          {servicesFaqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-b border-border"
            >
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline md:py-6 md:text-[17px]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[15px] leading-relaxed text-zinc-600">
                <p className="max-w-2xl text-pretty">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
