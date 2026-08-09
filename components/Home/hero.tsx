import AiFlip from "@/components/Home/ai-flip";
import { Eyebrow } from "@/components/pages/shared/eyebrow";
import { TalkToSalesButton } from "@/components/talk-to-sales";

const globeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-earth-icon lucide-earth"
  >
    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
    <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
    <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default function Hero() {
  return (
    <header className="mx-auto mt-14 max-w-3xl px-6 md:mt-20">
      <Eyebrow
        icon={globeIcon}
        className="mb-4 text-center text-sm text-balance sm:text-base"
      >
        Your customers are asking AI instead of Google
      </Eyebrow>
      <h1 className="text-center text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
        AI search analytics{" "}
        <span className="text-zinc-500">for marketing teams</span>
      </h1>
      <p className="mt-4 text-center text-base text-balance text-zinc-500 sm:text-lg">
        See how often <AiFlip /> mentions your brand, which sources it cites,
        and what to do to get mentioned more.
      </p>
      <div className="mt-6 flex justify-center">
        <TalkToSalesButton className="p-4" size="lg" source="home-hero" />
      </div>
    </header>
  );
}
