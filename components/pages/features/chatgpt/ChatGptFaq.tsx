import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    question: "Why should I track visibility in ChatGPT?",
    answer:
      "ChatGPT is the most popular LLM today, making it a critical platform to track for brand visibility. It frequently surfaces different results than other models because it uses data from both Bing and Google using its own independent ranking logic. Keep observing our content, as we will be publishing more about how to master these differences!",
  },
  {
    question: "What makes Anny unique at measuring ChatGPT visibility?",
    answer:
      "Anny reveals the internal query expansions ChatGPT runs to formulate its answers — available in the dashboard, MCP and API. These query fanouts show you the exact sub-topics ChatGPT searches for, letting you include those terms in your content and improve how your brand shows up.",
  },
  {
    question: "What makes ChatGPT different than other LLMs?",
    answer:
      "ChatGPT differs from other AI models in three ways. First, it pulls from both Google and Bing during its grounding process and applies its own ranking logic on top. Second, our research shows it surfaces product pages, homepages, and profile pages more frequently than other models do. Third, these differences mean your visibility in ChatGPT can look very different from your visibility on Google Gemini or Claude. Anny compares your presence across all models and shows you which sources influence ChatGPT's answers the most.",
  },
  {
    question: "Does ChatGPT rank brands the way Google search results do?",
    answer:
      "No. ChatGPT doesn't produce a numbered results list. Visibility instead depends on how often your brand is surfaced and cited across its answers, and how it's framed relative to competitors. Anny converts this into a trackable visibility score with average positions.",
  },
  {
    question: "Can agencies track ChatGPT visibility for multiple client brands?",
    answer:
      "Yes. Anny lets agencies monitor ChatGPT visibility, sentiment, and source citations separately for each client account from a single dashboard, with data structured for client reporting.",
  },
  {
    question: "How can I improve my brand's visibility in ChatGPT?",
    answer:
      "Improving your brand's visibility in ChatGPT comes down to being present and credible in the sources AI models pull from. Earn mentions in authoritative publications and community platforms like Reddit, since third-party validation weighs more than your own marketing. Make your own content clear, factual, and crawlable by AI bots so it can be easily retrieved and cited. Then track which prompts mention your brand and which competitors appear instead, and close those gaps over time.",
  },
] as const;

export default function ChatGptFaq() {
  return (
    <section
      className="border-b border-border px-6 py-14 md:px-12 md:py-20"
      aria-labelledby="chatgpt-faq-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="chatgpt-faq-heading"
          className="text-3xl font-medium tracking-tight md:text-4xl"
        >
          FAQs
        </h2>
        <p className="mt-3 text-[15px] text-pretty text-zinc-500">
          Learn more about monitoring visibility in ChatGPT with Anny
        </p>
      </div>

      <Accordion defaultValue={["item-0"]} className="mx-auto mt-10 max-w-3xl">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`item-${index}`}
            className="border-b border-border"
          >
            <AccordionTrigger className="py-5 text-base font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed text-zinc-500">
              <p className="max-w-2xl text-left text-pretty">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
