import { Button } from "@/components/ui/button";

export default function CareersCulture() {
  return (
    <section className="grid grid-cols-1 border-b md:grid-cols-2">
      <div className="border-b p-8 md:border-r md:border-b-0 md:p-12">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          How we work
        </h2>
        <p className="mt-4 max-w-md text-lg leading-snug text-zinc-500 text-balance">
          High ownership, async by default, and a bias toward shipping. We care
          about clarity over ceremony — and about making AI search measurable.
        </p>
      </div>
      <div className="flex flex-col justify-between bg-[#1a1a1a] p-8 text-white md:p-12">
        <div>
          <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
            Don&apos;t see a fit?
          </h3>
          <p className="mt-3 max-w-sm text-sm text-zinc-400 text-balance">
            Tell us what you&apos;d build at Anny. We hire for judgment and taste
            as much as for title.
          </p>
        </div>
        <div className="mt-8">
          <Button
            className="bg-white text-black hover:bg-white/90"
            size="lg"
            render={<a href="mailto:careers@anny.ai" />}
          >
            Email careers@anny.ai
          </Button>
        </div>
      </div>
    </section>
  );
}
