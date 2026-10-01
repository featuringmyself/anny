import { brand } from "@/components/Home/brand";
import { AI_MODELS_PHRASE } from "@/components/Home/ai-models";
import { auditFixPromise } from "./content";

export default function AuditFixProblem() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="audit-offer-problem-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-10 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
        <div>
          <h2
            id="audit-offer-problem-heading"
            className="text-[1.5rem] leading-[1.15] font-bold tracking-tight text-white sm:text-4xl"
          >
            Buyers ask AI who to trust. You are not on the shortlist.
          </h2>
          <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-neutral-200/90 sm:mt-5 sm:text-lg">
            Screenshots of a missing mention do not close the gap. A Dodox Audit
            shows why {AI_MODELS_PHRASE} route elsewhere, and what needs to
            change across the surfaces that actually move recommendations.
          </p>
        </div>

        <aside
          className="rounded-2xl p-4 ring-1 ring-white/10 sm:p-7"
          style={{ backgroundColor: "#0c242b" }}
        >
          <p className="text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">
            One package, three answers
          </p>
          <ul className="mt-3 space-y-3 sm:mt-5 sm:space-y-4">
            {auditFixPromise.map((item) => (
              <li key={item.title}>
                <p
                  className="text-sm font-bold"
                  style={{ color: brand.lime }}
                >
                  {item.title}
                </p>
                <p className="mt-0.5 text-sm font-medium leading-snug text-white/55 sm:mt-1 sm:leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
