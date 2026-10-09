"use client";

import { useEffect, useRef, type ReactNode } from "react";
import posthog from "posthog-js";

import { brand } from "@/components/Home/brand";
import { getAuditFixFaqs } from "./content";
import { useAuditFixMarket } from "./AuditMarketContext";

function FaqAnalytics({
  question,
  questionIndex,
  children,
}: {
  question: string;
  questionIndex: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const details = root.querySelector("details");
    if (!details) return;

    const onToggle = () => {
      if (!details.open) return;
      posthog.capture("faq_item_expanded", {
        question,
        question_index: questionIndex,
        source: "audit-fix",
      });
    };

    details.addEventListener("toggle", onToggle);
    return () => details.removeEventListener("toggle", onToggle);
  }, [question, questionIndex]);

  return <div ref={ref}>{children}</div>;
}

export default function AuditFixFaq() {
  const { market } = useAuditFixMarket();
  const faqs = getAuditFixFaqs(market);

  return (
    <section
      className="w-full rounded-2xl bg-white px-4 py-6 sm:px-6 sm:py-20 md:px-12"
      aria-labelledby="audit-fix-faq-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="audit-fix-faq-heading"
          className="text-[1.25rem] font-bold tracking-tight sm:text-3xl md:text-4xl"
          style={{ color: brand.tertiary }}
        >
          Questions before you order
        </h2>
        <p
          className="mx-auto mt-3 hidden max-w-md text-base font-medium leading-relaxed sm:mt-4 sm:block sm:text-lg"
          style={{ color: brand.body }}
        >
          What&apos;s in the report, pricing, turnaround, and implementation
          credit.
        </p>
      </div>

      <div className="mx-auto mt-3 max-w-2xl sm:mt-10">
        {faqs.map((faq, index) => (
          <FaqAnalytics
            key={faq.question}
            question={faq.question}
            questionIndex={index}
          >
            <details
              name="audit-fix-faq"
              className="group border-b border-border"
            >
              <summary
                className="cursor-pointer list-none py-2.5 text-left text-[13px] font-semibold marker:content-none sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden"
                style={{ color: brand.tertiary }}
              >
                <span className="flex items-start justify-between gap-3 sm:gap-4">
                  {faq.question}
                  <span
                    className="mt-0.5 shrink-0 text-zinc-400 transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <div
                className="pb-2.5 text-[13px] leading-snug font-medium sm:pb-5 sm:text-[15px] sm:leading-relaxed"
                style={{ color: brand.body }}
              >
                <p className="max-w-xl">{faq.answer}</p>
              </div>
            </details>
          </FaqAnalytics>
        ))}
      </div>
    </section>
  );
}
