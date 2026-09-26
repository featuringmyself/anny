import Link from "next/link";

import { brand } from "@/components/Home/brand";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

/** One job: convert. One primary + one secondary CTA (Hick's Law). */
export default function HomeCta() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="home-cta-heading"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center sm:py-24">
        <h2
          id="home-cta-heading"
          className="text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl"
        >
          Ready to show up in AI answers?
        </h2>
        <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-neutral-200/90 sm:text-lg">
          Start with Monitoring or the Agent, or let our team run managed GEO
          for you.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="h-12 cursor-pointer rounded-lg border border-transparent px-6 text-base font-semibold text-[#11333c] hover:bg-white"
            style={{ backgroundColor: brand.lime }}
            render={<Link href="/register" />}
          >
            Get started
          </Button>
          <TalkToSalesButton
            size="lg"
            variant="outline"
            className="h-12 rounded-lg border-white/80 bg-transparent px-6 text-base font-semibold text-white hover:bg-white hover:text-[#11333c]"
            source="home-footer"
          >
            Talk to sales
          </TalkToSalesButton>
        </div>
      </div>
    </section>
  );
}
