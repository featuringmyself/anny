import Image from "next/image";

import allAiGraph from "@/public/metrics/allAIGraph.webp"
import aiSources from "@/public/metrics/aiSources.webp"
import aiCrawl from "@/public/metrics/aiCrawl.webp"
import searchQueries from "@/public/metrics/searchQueries.webp"
import aiVisibility from "@/public/metrics/aiVisibility.webp"
import brandMonitor from "@/public/metrics/brandMonitor.webp"

export default function Metric() {


    const metricData = [
        {
            title: "Track your AI Visibility",
            description: "One dashboard shows how often ChatGPT, Claude, Gemini, and Perplexity mention your brand. Tracked daily so you catch changes fast.",
            image: allAiGraph
        },
        {
            title: "Find the sources AI cites that don't mention you",
            description: "AI models pull from specific articles and websites when answering. See every source, who wrote it, and whether they mention your brand.",
            image: aiSources
        },
        {
            title: "See when AI crawl your site",
            description: "Track AI bots visiting your website in real-time. Know which pages they read and how often they come back so you know your content is being indexed.",
            image: aiCrawl
        },
        {
            title: "Discover the keywords AI actually searches",
            description: "When AI answers questions, it searches the web with specific queries. We capture those exact keywords so you can create content AI will find and cite.",
            image: searchQueries
        },
        {
            title: "Compare your AI visibility against competitors",
            description: "See which competitors AI mentions for your target queries. Track their visibility score alongside yours and spot the gaps.",
            image: aiVisibility
        },
        {
            title: "Read every word AI says about your brand",
            description: "Most businesses have no idea what AI says about them. Track every mention, read the full response, and understand the sentiment.",
            image: brandMonitor
        }
    ]
    return (
        <div>
            <div className="h-20 w-full border-y row-span-full row-start-1 hidden border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 md:col-start-3 md:block dark:[--pattern-fg:var(--color-white)]/10"></div>

            <div className="grid grid-cols-2">
                {metricData.map((item, index) => (
                    <div className={`flex h-full flex-col border-b ${index % 2 === 0 ? 'border-r' : ''}`} key={item.title}>
                        <div className="flex-1 p-10">
                            <h4 className="text-2xl font-medium">{item.title}</h4>
                            <p className="mt-2 max-w-[80%] text-sm text-gray-500">
                                {item.description}
                            </p>
                        </div>
                        <div className="relative aspect-16/10 w-full">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover object-top"
                                sizes="50vw"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}