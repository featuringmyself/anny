import { brand } from "@/components/Home/brand";

import { faqs } from "./faqs";
import OfferingsFaqAnalytics from "./OfferingsFaqAnalytics";

/** Server-rendered FAQ: all answers present in HTML for crawlers. */
export default function OfferingsFaq() {
  return (
    <section
      className="w-full rounded-2xl bg-white px-6 py-16 sm:py-20 md:px-12"
      aria-labelledby="offerings-faq-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="offerings-faq-heading"
          className="text-[1.75rem] font-bold tracking-tight sm:text-3xl md:text-4xl"
          style={{ color: brand.tertiary }}
        >
          FAQ
        </h2>
        <p
          className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed sm:text-lg"
          style={{ color: brand.body }}
        >
          Three answers before you put these on a rate card.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        {faqs.map((faq, index) => (
          <OfferingsFaqAnalytics
            key={faq.question}
            question={faq.question}
            questionIndex={index}
          >
            <details
              className="group border-b border-border"
              open={index === 0}
            >
              <summary
                className="cursor-pointer list-none py-5 text-left text-base font-semibold marker:content-none [&::-webkit-details-marker]:hidden"
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
                className="pb-5 text-[15px] leading-relaxed font-medium"
                style={{ color: brand.body }}
              >
                <p className="max-w-xl">{faq.answer}</p>
              </div>
            </details>
          </OfferingsFaqAnalytics>
        ))}
      </div>
    </section>
  );
}
