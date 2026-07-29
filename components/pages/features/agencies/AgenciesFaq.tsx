import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is agency pricing different from brand pricing?",
    answer:
      "Agencies get a separate, heavily discounted rate built around a roster instead of a single brand. Unlimited client workspaces, unlimited seats, all models, white-label reporting, and API access are included at every tier — only volume scales. We quote it on a call rather than publishing it.",
  },
  {
    question: "Can I resell Anny under my own brand?",
    answer:
      "Yes. Client-facing dashboards, reports, and exports carry your logo and live on your domain. Anny stays under the hood, never appears on your invoice, and we never contact your clients directly.",
  },
  {
    question: "What do agencies typically charge clients for this?",
    answer:
      "Published 2026 benchmarks put tracking-and-reporting retainers around $1,500–$2,500 per client per month, and full GEO programs with content and earned media at $2,500–$6,000. Many agencies start by adding 20–30% to an existing SEO retainer instead of selling a new line item.",
  },
  {
    question: "How many clients can I run in one account?",
    answer:
      "As many as your plan volume covers. Each client is an isolated project with its own prompts, competitors, and markets, and account managers switch between them in one click — no separate logins, no cross-contaminated reports.",
  },
  {
    question: "Do I pay per seat as my team grows?",
    answer:
      "No. Agency plans include unlimited seats, so analysts, account managers, and strategists all work in the same account without an upgrade.",
  },
  {
    question: "How much of the reporting can I automate?",
    answer:
      "The whole weekly loop. Schedule a task through the API or MCP that walks every client project, pulls visibility, share of voice, and sentiment, compares against the prior period, and posts summaries to Slack plus a one-slide-per-client deck.",
  },
  {
    question: "How fast can we launch the service?",
    answer:
      "Same week. Onboarding covers workspace setup, prompt libraries for your clients' categories, branded report templates, and the pricing playbook — no hiring and no internal tooling build.",
  },
] as const;

export default function AgenciesFaq() {
  return (
    <section className="border-b px-6 py-14 md:px-12 md:py-20">
      <p className="text-sm font-medium tracking-wide text-[#2462ff]">Agency FAQs</p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
        What partners ask before signing
      </h2>

      <Accordion defaultValue={["item-0"]} className="mt-10 max-w-3xl">
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
              <p className="max-w-2xl">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
