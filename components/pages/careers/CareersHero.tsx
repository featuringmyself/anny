import { Button } from "@/components/ui/button";

export default function CareersHero() {
  return (
    <section className="mx-auto mt-20 max-w-3xl px-6 pb-16 md:px-0">
      <span className="mb-4 flex items-center justify-center gap-2 text-[#2462ff]">
        Careers at Anny
      </span>
      <h1 className="text-center text-5xl font-medium tracking-tight text-balance md:text-6xl">
        Help brands get mentioned{" "}
        <span className="text-zinc-500">when people ask AI</span>
      </h1>
      <p className="mt-4 text-center text-lg text-balance text-zinc-500">
        We&apos;re building the analytics layer for generative engine
        optimization — small team, sharp product, remote-first.
      </p>
      <div className="mt-6 flex justify-center">
        <Button className="p-4" size="lg" render={<a href="#open-roles" />}>
          View open roles
        </Button>
      </div>
    </section>
  );
}
