import { HOME_HERO_HEADLINE } from "@/components/Home/ai-models";
import { brand } from "@/components/Home/brand";
import RotatingModelName from "@/components/Home/rotating-model-name";

/**
 * Home H1: server-rendered meaning for SEO/AEO, decorative rotator for sight.
 *
 * Mobile: three designed lines at real display size (stem / model / subline).
 * Desktop: stem + model on one line. Subline stays one row so it never
 * collapses into a 4th wrap under the body copy.
 */
export default function HomeHeroHeadline() {
  return (
    <h1
      id="home-hero-heading"
      className="mt-8 w-full max-w-3xl text-center text-3xl leading-[1.12] font-bold tracking-tight sm:text-4xl md:text-[3.1rem] md:leading-[1.08]"
      style={{ color: brand.heading }}
    >
      <span className="sr-only">{HOME_HERO_HEADLINE}</span>

      <span aria-hidden="true" className="block">
        <span className="block sm:inline">Get cited in </span>
        <RotatingModelName />
        <span className="mt-1.5 block whitespace-nowrap text-[0.8em] text-zinc-500 sm:text-[1em]">
          then keep the mention.
        </span>
      </span>
    </h1>
  );
}
