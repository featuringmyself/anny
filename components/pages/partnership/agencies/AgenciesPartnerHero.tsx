import { Button } from "@/components/ui/button";

export default function AgenciesPartnerHero() {
  return (
    <section className="mx-auto mt-20 max-w-3xl px-6 pb-16 md:px-0">
      <span className="mb-4 flex items-center justify-center gap-2 text-[#2462ff]">
        Partnership · Agencies
      </span>
      <h1 className="text-center text-4xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
        Productize GEO for every client{" "}
        <span className="text-zinc-500">on one retainer</span>
      </h1>
      <p className="mt-4 text-center text-lg text-balance text-zinc-500">
        Give your roster AI visibility reporting that looks like your agency —
        not another SEO screenshot dump.
      </p>
      <div className="mt-6 flex justify-center">
        <Button
          className="p-4"
          size="lg"
          render={<a href="mailto:partners@anny.ai?subject=Agency%20partnership" />}
        >
          Talk agency partnerships
        </Button>
      </div>
    </section>
  );
}
