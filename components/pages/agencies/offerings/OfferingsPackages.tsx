import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { brand } from "@/components/Home/brand";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

import standingImg from "@/public/metrics/allAIGraph.webp";
import competitiveImg from "@/public/metrics/aiSources.webp";
import retainerImg from "@/public/partnership/agencies/ws-client-management.webp";
import pitchImg from "@/public/partnership/agencies/feature-action-plans.webp";

export type PackageCard = {
  id: string;
  billing: string;
  name: string;
  blurb: string;
  image: StaticImageData;
  featured?: boolean;
};

export const packages: readonly PackageCard[] = [
  {
    id: "geo-standing",
    billing: "One-time",
    name: "GEO Standing Snapshot",
    blurb: "Where the client stands in AI answers today: score, gaps, PDF.",
    image: standingImg,
    featured: true,
  },
  {
    id: "competitive-sov",
    billing: "One-time",
    name: "Competitive SOV Audit",
    blurb: "Who AI names instead: prompts, citations, rivals.",
    image: competitiveImg,
  },
  {
    id: "visibility-retainer",
    billing: "Monthly",
    name: "Visibility Retainer Kit",
    blurb: "Always-on tracking + scorecards under your brand every week.",
    image: retainerImg,
    featured: true,
  },
  {
    id: "pitch-workspace",
    billing: "Per pitch",
    name: "Pitch Workspace",
    blurb: "Prospect gap chart before the meeting. Convert on signature.",
    image: pitchImg,
  },
] as const;

export default function OfferingsPackages() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      id="packages"
      aria-labelledby="offerings-packages-heading"
    >
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-20 lg:pt-24">
        <h2
          id="offerings-packages-heading"
          className="text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl"
        >
          Four packages. Clear jobs.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed text-neutral-200/90 sm:text-lg">
          Open with a snapshot. Grow into the retainer. Pitch with live data.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 px-6 pt-10 pb-16 sm:gap-5 sm:pb-20 md:grid-cols-2 lg:pt-12 lg:pb-24">
        {packages.map((pkg) => (
          <article
            key={pkg.id}
            id={pkg.id}
            className="relative flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border text-left"
            style={{
              backgroundColor: pkg.featured ? brand.cream : brand.peach,
              borderColor: brand.ink,
              outline: pkg.featured ? `2px solid ${brand.lime}` : undefined,
            }}
          >
            <div
              className="relative aspect-16/10 overflow-hidden"
              style={{ backgroundColor: brand.sticker }}
            >
              <Image
                src={pkg.image}
                alt=""
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <span
                className="text-[11px] font-bold tracking-wide uppercase"
                style={{ color: brand.tertiary }}
              >
                {pkg.billing}
              </span>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                {pkg.name}
              </h3>
              <p
                className="mt-2 text-[15px] font-medium leading-relaxed"
                style={{ color: brand.bodyStrong }}
              >
                {pkg.blurb}
              </p>

              <div className="mt-auto pt-6">
                {pkg.id === "geo-standing" ? (
                  <Button
                    size="lg"
                    className="h-11 w-full cursor-pointer rounded-lg border border-zinc-900 bg-brand px-5 text-sm font-semibold text-white hover:bg-emerald-50 hover:text-black"
                    render={<Link href="/standings" />}
                  >
                    See Dodox Snapshots
                  </Button>
                ) : (
                  <TalkToSalesButton
                    size="lg"
                    className="h-11 w-full cursor-pointer rounded-lg border-zinc-900 px-5 text-sm font-semibold hover:bg-zinc-900 hover:text-white"
                    variant="outline"
                    source={`agency-offerings-${pkg.id}`}
                  >
                    Package this
                  </TalkToSalesButton>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="pb-10 text-center text-sm font-medium text-white/50">
        Need the full platform tour?{" "}
        <Link
          href="/features/agencies"
          className="text-white underline underline-offset-2"
        >
          Agency platform
        </Link>
      </p>
    </section>
  );
}
