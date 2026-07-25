import Image from "next/image";
import chatgptLogo from "@/public/trackModel/openai-logo.svg"
import claudeLogo from "@/public/trackModel/claude-logo.svg"
import geminiLogo from "@/public/trackModel/gemini-logo.svg"
import deepseekLogo from "@/public/trackModel/deepseek-logo.svg"
import grokLogo from "@/public/trackModel/grok-logo.svg"
import perplexityLogo from "@/public/trackModel/perplexity-logo.svg"
import googleLogo from "@/public/trackModel/ai_mode-logo.svg"
import aiOverviewLogo from "@/public/trackModel/ai_overview-logo.svg"

export default function TrackModelsThatMatter() {

    const modelData = [
        {
            name: "ChatGPT",
            logo: chatgptLogo,
        },
        {
            name: "Claude",
            logo: claudeLogo,
        },
        {
            name: "Gemini",
            logo: geminiLogo,
        },
        {
            name: "Deepseek",
            logo: deepseekLogo,
        },
        {
            name: "Grok",
            logo: grokLogo,
        },
        {
            name: "Perplexity",
            logo: perplexityLogo,
        },
        {
            name: "Google AI Overview",
            logo: googleLogo,
        },
        {
            name: "AI Mode",
            logo: aiOverviewLogo,
        },
    ]
    return (
        <div className="mt-14 flex w-full flex-col items-center justify-center">
            <h5 className="text-2xl font-medium">Track the models that matter</h5>
            <p className="mt-1 text-gray-500">Ammy tracks ChatGPT, Claude, Gemini, Deepseek, Grok, Perplexity, Google AI Overview and AI Mode for AI visibility</p>

            <div className="mt-8 grid w-full grid-cols-4 border-y">
                {modelData.map((item) => (
                    <div key={item.name} className="flex h-20 w-full items-center justify-center border-b border-r [&:nth-child(4n)]:border-r-0 [&:nth-last-child(-n+4)]:border-b-0">
                        <Image src={item.logo} alt={item.name} width={100} height={100} className="h-8 w-auto max-w-full object-contain" />
                    </div>
                ))}
            </div>
    </div>
  );
}