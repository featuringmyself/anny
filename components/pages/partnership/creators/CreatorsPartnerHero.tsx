import { Button } from "@/components/ui/button";

export default function CreatorsPartnerHero() {
  return (
    <section className="mx-auto mt-20 max-w-3xl px-6 pb-16 md:px-0">
      <span className="mb-4 flex items-center justify-center gap-2 text-[#2462ff]">
        Partnership · Creators
      </span>
      <h1 className="text-center text-5xl font-medium tracking-tight text-balance md:text-6xl">
        Teach GEO.{" "}
        <span className="text-zinc-500">Earn when your audience tracks.</span>
      </h1>
      <p className="mt-4 text-center text-lg text-balance text-zinc-500">
        Affiliate payouts plus a ready content kit — demos, talking points, and
        visuals for newsletters, YouTube, and LinkedIn.
      </p>
      <div className="mt-6 flex justify-center">
        <Button
          className="p-4"
          size="lg"
          render={<a href="mailto:partners@anny.ai?subject=Creator%20affiliate" />}
        >
          Join the affiliate program
        </Button>
      </div>
    </section>
  );
}
