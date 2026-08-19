import { CATEGORY_META } from "@/components/pages/tools/ai-readiness/bands";

const items = (
  Object.entries(CATEGORY_META) as [
    keyof typeof CATEGORY_META,
    (typeof CATEGORY_META)[keyof typeof CATEGORY_META],
  ][]
).map(([id, meta]) => ({ id, ...meta }));

export function AiReadinessChecks() {
  return (
    <section className="border-b" aria-labelledby="ar-checks-heading">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2
          id="ar-checks-heading"
          className="text-3xl font-medium tracking-tight md:text-4xl"
        >
          What we scan
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Four buckets, scored from the homepage. Optional agent files never
          tank the number — they only add.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`border-b px-6 py-8 last:border-b-0 sm:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0 md:px-8 ${
              index >= 2 ? "sm:border-b-0" : ""
            }`}
          >
            <p className="text-[11px] font-medium tracking-wide text-[#2462ff] uppercase">
              0{index + 1}
            </p>
            <h3 className="mt-2 text-lg font-medium">{item.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {item.copy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
