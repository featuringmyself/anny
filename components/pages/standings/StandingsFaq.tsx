"use client";

import { brand } from "@/components/Home/brand";

import { getSnapshotFaqs } from "./content";
import StandingsFaqAnalytics from "./StandingsFaqAnalytics";
import { useSnapshotMarket } from "./SnapshotMarketContext";

/**
 * FAQ prices follow the shared market (same as pricing + CTA).
 * Answers stay in the HTML for the active market on first paint.
 */
export default function StandingsFaq() {
  const { market } = useSnapshotMarket();
  const faqs = getSnapshotFaqs(market);

  return (
    <section
      className="w-full rounded-2xl bg-white px-5 py-10 sm:px-6 sm:py-20 md:px-12"
      aria-labelledby="standings-faq-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="standings-faq-heading"
          className="text-[1.5rem] font-bold tracking-tight sm:text-3xl md:text-4xl"
          style={{ color: brand.tertiary }}
        >
          Questions agencies ask before ordering
        </h2>
        <p
          className="mx-auto mt-3 hidden max-w-md text-base font-medium leading-relaxed sm:mt-4 sm:block sm:text-lg"
          style={{ color: brand.body }}
        >
          White-label, pricing, prompts, accuracy, speed, and how to sell it.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-2xl sm:mt-10">
        {faqs.map((faq, index) => (
          <StandingsFaqAnalytics
            key={faq.question}
            question={faq.question}
            questionIndex={index}
          >
            <details
              name="standings-faq"
              className="group border-b border-border"
              open={index === 0}
            >
              <summary
                className="cursor-pointer list-none py-3.5 text-left text-[15px] font-semibold marker:content-none sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden"
                style={{ color: brand.tertiary }}
              >
                <span className="flex items-start justify-between gap-4">
                  {faq.question}
                  <span
                    className="mt-1 shrink-0 text-zinc-400 transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <div
                className="pb-3.5 text-sm leading-relaxed font-medium sm:pb-5 sm:text-[15px]"
                style={{ color: brand.body }}
              >
                <p className="max-w-xl">{faq.answer}</p>
              </div>
            </details>
          </StandingsFaqAnalytics>
        ))}
      </div>
    </section>
  );
}
