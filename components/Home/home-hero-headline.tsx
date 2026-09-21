import { HOME_HERO_HEADLINE } from "@/components/Home/ai-models";
import { brand } from "@/components/Home/brand";
import RotatingModelName from "@/components/Home/rotating-model-name";

/**
 * Home H1: server-rendered meaning for SEO/AEO, decorative rotator for sight.
 *
 * The visible line is plain inline text (no flex) so the stem and model name
 * share one line box, one font size, and one baseline.
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
        <span className="mt-1.5 block text-zinc-500">
          then keep the mention.
        </span>
      </span>
    </h1>
  );
}
