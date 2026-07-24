import AiFlip from "@/components/Home/ai-flip";
import { Button } from "../ui/button";

const globeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-earth-icon lucide-earth"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>
)

export default function HomeHero() {
    return (
        <div className="mx-auto mt-20 max-w-3xl">
            <span className="text-[#2462ff] flex items-center gap-2 justify-center mb-4"><span className="size-5">{globeIcon}</span> Your customers are asking AI instead of Google</span>
            <h1 className="text-center text-6xl font-medium tracking-tight">
                AI search analytics <br />
                <span className="text-zinc-500">for marketing teams</span>
            </h1>
            <div className="mt-4 text-center text-lg text-balance text-zinc-500">
                See how often <AiFlip /> mentions your brand, which sources it cites,
                and what to do to get mentioned more.
            </div>
            <div className="flex justify-center mt-6">
                <Button className="p-4" size={"lg"}>Talk to sales</Button>
            </div>
        </div>


    );
}
