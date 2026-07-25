import { Button } from "@/components/ui/button";

export default function MediaPartnerHero() {
  return (
    <section className="mx-auto mt-20 max-w-3xl px-6 pb-16 md:px-0">
      <span className="mb-4 flex items-center justify-center gap-2 text-[#2462ff]">
        Partnership · Media
      </span>
      <h1 className="text-center text-5xl font-medium tracking-tight text-balance md:text-6xl">
        Press kit & expert quotes{" "}
        <span className="text-zinc-500">on AI search</span>
      </h1>
      <p className="mt-4 text-center text-lg text-balance text-zinc-500">
        Covering GEO, ChatGPT citations, or the shift from Google to AI answers?
        Grab assets or request a quote.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button className="p-4" size="lg" render={<a href="#press-kit" />}>
          Open press kit
        </Button>
        <Button
          variant="outline"
          className="p-4"
          size="lg"
          render={<a href="#quote-request" />}
        >
          Request a quote
        </Button>
      </div>
    </section>
  );
}
