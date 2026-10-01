import { brand } from "@/components/Home/brand";
import { auditFixSurfaces } from "./content";

export default function AuditFixSurfaces() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.cream }}
      aria-labelledby="audit-fix-surfaces-heading"
    >
      <div className="mx-auto max-w-3xl px-6 pt-10 text-center sm:pt-16 md:pt-20">
        <h2
          id="audit-fix-surfaces-heading"
          className="text-[1.5rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
          style={{ color: brand.tertiary }}
        >
          Three surfaces. One invoice.
        </h2>
        <p
          className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed sm:mt-4 sm:text-lg"
          style={{ color: brand.body }}
        >
          AI recommendations are shaped by what models can crawl, what pages
          they can cite, and which third-party sources they already trust. The
          backlog covers all three.
        </p>
      </div>

      <ol className="mx-auto mt-8 grid max-w-5xl gap-3 px-6 pb-10 sm:mt-12 sm:grid-cols-3 sm:pb-16 md:pb-20">
        {auditFixSurfaces.map((surface, i) => (
          <li
            key={surface.title}
            className="rounded-2xl border bg-white p-5 text-left sm:p-6"
            style={{ borderColor: `${brand.ink}14` }}
          >
            <span
              className="text-xs font-bold tabular-nums"
              style={{ color: brand.tertiary }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-lg font-bold tracking-tight text-zinc-900">
              {surface.title}
            </h3>
            <p
              className="mt-2 text-sm font-medium leading-relaxed"
              style={{ color: brand.body }}
            >
              {surface.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
