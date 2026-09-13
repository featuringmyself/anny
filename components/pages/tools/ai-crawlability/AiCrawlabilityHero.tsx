import { AiCrawlabilityForm } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityForm";
import { Eyebrow } from "@/components/pages/shared/eyebrow";
import { PageBreadcrumbs } from "@/components/pages/shared/PageBreadcrumbs";

export function AiCrawlabilityHero({
  defaultDomain,
  compact = false,
}: {
  defaultDomain: string;
  compact?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-zinc-200/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#f6f7f4]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] h-100 w-120 rounded-full bg-[#c5f247]/18 blur-[140px]" />
        <div className="absolute bottom-[-25%] left-[-12%] h-90 w-110 rounded-full bg-[#b6e4f6]/22 blur-[150px]" />
      </div>

      <div
        className={`relative mx-auto max-w-3xl px-6 ${
          compact ? "py-12 md:py-14" : "pt-16 pb-16 md:pt-24 md:pb-20"
        }`}
      >
        <PageBreadcrumbs
          className="mb-6"
          items={[
            { name: "Home", href: "/" },
            { name: "Tools", href: "/tools" },
            { name: "AI crawlability checker" },
          ]}
        />
        <Eyebrow className="text-sm font-medium">
          Free tool for marketing and SEO teams
        </Eyebrow>
        <h1
          className={`mt-3 font-medium tracking-tight text-balance text-zinc-900 ${
            compact
              ? "text-3xl md:text-4xl"
              : "text-4xl sm:text-5xl md:text-6xl"
          }`}
        >
          {compact
            ? "Check another domain"
            : "Check your AI crawlability"}
        </h1>
        {!compact ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 text-balance sm:text-lg">
            See whether ChatGPT, Claude, Perplexity, and other AI crawlers can
            access your site, and get clear fixes when they cannot.
          </p>
        ) : (
          <p className="mt-2 text-sm text-zinc-500">
            Run another domain or refine the current check.
          </p>
        )}

        <div className="mt-8">
          <AiCrawlabilityForm defaultDomain={defaultDomain} />
        </div>
      </div>
    </section>
  );
}
