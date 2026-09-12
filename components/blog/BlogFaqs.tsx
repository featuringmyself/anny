"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq = {
  _key?: string | null;
  question?: string | null;
  answer?: string | null;
};

export default function BlogFaqs({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="mt-14 border-t pt-10" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-xl font-medium tracking-tight text-zinc-900 md:text-2xl"
      >
        Questions
      </h2>
      <Accordion defaultValue={["faq-0"]} className="mt-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq._key || faq.question || `faq-${index}`}
            value={`faq-${index}`}
            className="border-b border-border"
          >
            <AccordionTrigger className="py-5 text-base font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed text-zinc-500">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
