"use client";

import posthog from "posthog-js";

import { brand } from "@/components/Home/brand";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/faqs";

export default function Faq({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;

  return (
    <section
      id="faq"
      className="w-full rounded-2xl bg-white px-6 py-16 sm:py-20 md:px-12"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Heading
          id="faq-heading"
          className="text-[1.75rem] font-bold tracking-tight sm:text-3xl md:text-4xl"
          style={{ color: brand.tertiary }}
        >
          FAQ
        </Heading>
        <p
          className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed sm:text-lg"
          style={{ color: brand.body }}
        >
          Short answers about Anny, GEO, and what each plan includes.
        </p>
      </div>

      <Accordion
        defaultValue={["item-0"]}
        className="mx-auto mt-10 max-w-2xl"
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
            <AccordionTrigger className="cursor-pointer py-5 text-base font-semibold hover:no-underline md:text-[17px]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[15px] leading-relaxed font-medium text-zinc-600">
              <FaqAnswer answer={faq.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
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
