import { brand } from "@/components/Home/brand";

const audiences = [
  { label: "SEO agencies", line: "Bolt onto organic retainers" },
  { label: "Digital shops", line: "A GEO line item next to paid" },
  { label: "PR & comms", line: "Prove earned media in AI answers" },
  { label: "Growth boutiques", line: "Win pitches with gap charts" },
] as const;

export default function OfferingsAudience() {
  return (
    <section
      className="w-full rounded-2xl px-6 py-10 sm:py-12"
      style={{ backgroundColor: brand.cream }}
      aria-labelledby="offerings-audience-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="offerings-audience-heading"
          className="text-center text-sm font-semibold tracking-[0.06em] uppercase"
          style={{ color: brand.tertiary }}
        >
          Built for agencies that already own the roster
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {audiences.map((item) => (
            <li key={item.label} className="text-center">
              <p
                className="text-sm font-bold tracking-tight sm:text-base"
                style={{ color: brand.tertiary }}
              >
                {item.label}
              </p>
              <p
                className="mt-1 text-xs font-medium sm:text-sm"
                style={{ color: brand.body }}
              >
                {item.line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
