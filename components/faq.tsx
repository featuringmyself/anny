import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What does Anny actually do?",
    answer: (
      <p>
        Anny shows you if your brand or your clients get mentioned in AI answers
        when people ask AI assistants like ChatGPT, Claude, Gemini and more for
        recommendations. It shows you gaps and opportunities to improve your AI
        visibility. Think of it sort of like Ahrefs, but for AI answers.
      </p>
    ),
  },
  {
    question: "What is GEO (Generative Engine Optimization)?",
    answer: (
      <p>
        GEO (Generative Engine Optimization) is the process of optimizing your
        content and strategy so AI platforms like ChatGPT, Claude, and Gemini
        mention your business when people ask for recommendations. Just like SEO
        helps you rank higher on Google, GEO helps you get recommended more often
        by AI/LLMs.
      </p>
    ),
  },
  {
    question: "Is Anny for agencies?",
    answer: (
      <p>
        Yes. Agencies use Anny to track multiple brands and report AI visibility
        to clients. For workspace details, see{" "}
        <Link
          href="/features/agencies"
          className="text-foreground underline underline-offset-2 hover:text-zinc-300"
        >
          Anny for agencies
        </Link>
        .
      </p>
    ),
  },
  {
    question: "What is a response in Anny?",
    answer: (
      <p>
        Each time we generate an AI answer from any model (ChatGPT, Claude,
        Gemini, etc.), it counts as 1 response. All models use the same amount —
        1 response per query, making it simple to track your usage.
      </p>
    ),
  },
  {
    question: "Do I need to install anything or change my website?",
    answer: (
      <p>
        Nope! No code, no plugins, no website changes needed. Just enter your URL
        and start tracking.
      </p>
    ),
  },
  {
    question: "What's a good Visibility Score?",
    answer: (
      <>
        <p>Here&apos;s how to interpret your Visibility Score:</p>
        <ul className="mt-2 list-none space-y-1.5">
          <li>
            <span className="font-medium text-foreground">80-100%:</span>{" "}
            Excellent — Your brand dominates AI responses.
          </li>
          <li>
            <span className="font-medium text-foreground">60-79%:</span> Good —
            Strong presence with room for improvement.
          </li>
          <li>
            <span className="font-medium text-foreground">40-59%:</span> Fair —
            Your brand appears regularly but not prominently.
          </li>
          <li>
            <span className="font-medium text-foreground">20-39%:</span> Poor —
            Limited AI visibility.
          </li>
          <li>
            <span className="font-medium text-foreground">0-19%:</span> Critical —
            Your brand rarely appears in AI responses.
          </li>
        </ul>
      </>
    ),
  },
] as const;

export default function Faq() {
  return (
    <section id="faq" className="px-6 py-20 md:px-12 md:py-28">
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
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
