"use client";

import posthog from "posthog-js";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PatternStrip } from "./pages/shared/pattern-strip";
import { faqs } from "@/lib/faqs";

export default function Faq() {
  return (
    <>
      <section id="faq" className="px-6 pt-20 pb-10 md:px-12 md:pt-28 pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
            FAQs
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-snug text-zinc-400 text-balance md:text-xl">
            Get answers to the most common questions about AI search and Anny.
          </p>
        </div>

        <Accordion
          defaultValue={["item-0"]}
          className="mx-auto mt-14 max-w-2xl"
          onValueChange={(value) => {
            const opened = Array.isArray(value) ? value : [value];
            opened.forEach((v) => {
              const index = parseInt(v.replace("item-", ""), 10);
              if (!isNaN(index) && faqs[index]) {
                posthog.capture("faq_item_expanded", {
                  question: faqs[index].question,
                  question_index: index,
                });
              }
            });
          }}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-b border-border"
            >
              <AccordionTrigger className="py-5 text-base font-medium hover:no-underline md:text-[17px]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-zinc-400">
                <FaqAnswer answer={faq.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <PatternStrip />
    </>
  );
}

function FaqAnswer({ answer }: { answer: string }) {
  const lines = answer.split("\n").filter((line) => line.length > 0);
  const listStart = lines.findIndex((line) => line.startsWith("• "));

  if (listStart === -1) {
    return <p>{answer}</p>;
  }

  const intro = lines.slice(0, listStart).join(" ");
  const items = lines.slice(listStart).map((line) => line.replace(/^• /, ""));

  return (
    <>
      {intro ? <p>{intro}</p> : null}
      <ul className="mt-2 list-none space-y-1.5">
        {items.map((item) => {
          const colonIdx = item.indexOf(":");
          if (colonIdx === -1) {
            return <li key={item}>{item}</li>;
          }
          const label = item.slice(0, colonIdx + 1);
          const detail = item.slice(colonIdx + 1).trim();
          return (
            <li key={item}>
              <span className="font-medium text-foreground">{label}</span>{" "}
              {detail}
            </li>
          );
        })}
      </ul>
    </>
  );
}
