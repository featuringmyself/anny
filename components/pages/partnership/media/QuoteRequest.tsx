import { Button } from "@/components/ui/button";

export default function QuoteRequest() {
  return (
    <section id="quote-request" className="border-b">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b p-8 md:border-r md:border-b-0 md:p-12">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            Quote & mention requests
          </h2>
          <p className="mt-4 max-w-md text-lg leading-snug text-zinc-500 text-balance">
            Need an expert line on AI search, citation quality, or GEO? We
            respond same business day for deadline-driven pieces.
          </p>
        </div>
        <div className="flex flex-col justify-between bg-[#1a1a1a] p-8 text-white md:p-12">
          <ul className="space-y-4 text-sm text-zinc-300">
            <li className="border-b border-white/10 pb-4">
              Embargo-friendly briefings on visibility trends
            </li>
            <li className="border-b border-white/10 pb-4">
              On-record quotes for ChatGPT / Gemini / AI Mode stories
            </li>
            <li className="pb-1">
              Fact-check passes on Anny product claims
            </li>
          </ul>
          <div className="mt-10">
            <Button
              className="bg-white text-black hover:bg-white/90"
              size="lg"
              render={
                <a href="mailto:press@anny.ai?subject=Quote%20request" />
              }
            >
              Email press@anny.ai
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
