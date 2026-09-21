import { HOME_HERO_HEADLINE } from "@/components/Home/ai-models";
import { brand } from "@/components/Home/brand";
import RotatingModelName from "@/components/Home/rotating-model-name";

/**
 * Home H1: server-rendered meaning for SEO/AEO, decorative rotator for sight.
 *
 * Always two designed lines (stem+model, then subline). Fluid type keeps the
 * longest model name on one row on narrow viewports — no 3rd/4th wrap.
 */
export default function HomeHeroHeadline() {
  return (
    <h1
      id="home-hero-heading"
      className="mt-8 w-full max-w-3xl text-center text-[clamp(1.15rem,3.8vw+0.35rem,3.1rem)] leading-[1.12] font-bold tracking-tight"
      style={{ color: brand.heading }}
    >
      <span className="sr-only">{HOME_HERO_HEADLINE}</span>

      <span aria-hidden="true" className="block">
        <span className="inline-block whitespace-nowrap">
          Get cited in <RotatingModelName />
        </span>
        <span className="mt-1.5 block whitespace-nowrap text-zinc-500">
          then keep the mention.
        </span>
      </span>
    </h1>
  );
}
