import Link from "next/link";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

export default function AgenciesCta() {
  return (
    <section className="border-b bg-zinc-950 px-6 py-14 text-white md:px-12 md:py-20">
      <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
        Get a quote sized to your client list
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400 text-balance">
        Tell us how many clients you run and what you want to bill. We come back with the agency rate
        and a packaging plan you can take into your next pitch.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <TalkToSalesButton
          size="lg"
          className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
          source="agencies-footer-cta"
        >
          Get agency pricing
        </TalkToSalesButton>
        <Button
          size="lg"
          variant="outline"
          className="border-zinc-700 bg-transparent px-5 text-white hover:bg-zinc-900 hover:text-white"
          render={<Link href="/partnership/agencies" />}
        >
          Partner program
        </Button>
      </div>
    </section>
  );
}
