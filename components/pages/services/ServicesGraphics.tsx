const HEADING = "#0f1720";
const BODY = "#5c6b73";

const features = [
  {
    id: "benchmark",
    heading: "Benchmark Your Brand's Performance",
    subheading: "(Because Nobody Likes Coming in Last)",
    body: "See exactly where your brand stands. Anny provides real-time insights that benchmark your performance against industry averages and competitors, helping you make smarter, data-driven decisions to stay ahead.",
    video: {
      src: "/services/videos/benchmark.webm",
      width: 854,
      height: 480,
      label:
        "Competitor analysis dashboard showing users, industry average, and performance trends",
    },
    mediaFirst: true,
  },
  {
    id: "brand-visibility",
    heading: "Right Message, Right Place",
    subheading: "(Because Gut Feelings Aren't Always Right)",
    body: "Your content deserves to be seen where it matters most. Anny analyzes AI-generated search results to ensure your brand shows up in the right answers, at the right time. Think of us as your AI-powered GPS for marketing, PR, and content strategy.",
    video: {
      src: "/services/videos/brand-visibility.webm",
      width: 1080,
      height: 720,
      label:
        "Tablet mockup showing ChatGPT results for generative engine optimization courses",
    },
    mediaFirst: false,
  },
  {
    id: "sentiment",
    heading: "Perform Sentiment Analysis",
    subheading: "(Because Happy Customers = Happy Brand)",
    body: "AI answers shape perception. Anny tracks positive and negative mentions across AI platforms, giving you a clear snapshot of customer sentiment. We'll separate the love letters from the hate mail and help you turn insights into action.",
    video: {
      src: "/services/videos/sentiment.webm",
      width: 1080,
      height: 720,
      label:
        "Reputation management card with positive, neutral, and negative mention rings",
    },
    mediaFirst: true,
  },
  {
    id: "comparison",
    heading: "AI Platform Comparison",
    subheading: "(Because All AI Engines Are Not Created Equal)",
    body: "Not all AI platforms think alike and neither should your strategy. Anny delivers precise, platform-specific insights into your brand's visibility across ChatGPT, Google AI Overviews, Perplexity, Claude, Gemini, and beyond helping you win across every AI-driven discovery channel.",
    video: {
      src: "/services/videos/comparison.webm",
      width: 854,
      height: 480,
      label:
        "AI platform comparison dashboard with ChatGPT, Perplexity, and Google AIO scores",
    },
    mediaFirst: false,
  },
  {
    id: "open-source",
    heading: "The Open-Source Advantage",
    subheading: "(Because You Deserve Transparency in an AI-Driven World)",
    body: "AI shouldn't feel like a black box. That's why Anny is 100% open-source, giving you full transparency into how it works and the flexibility to customize it to your needs. No vendor lock-ins, no hidden limitations, just complete control, privacy, and a community-driven platform built for brands like yours.",
    video: {
      src: "/services/videos/open-source.webm",
      width: 854,
      height: 480,
      label:
        "Open-source stack visual with GitHub and Next.js on a green backdrop",
    },
    mediaFirst: true,
  },
  {
    id: "local-seo",
    heading: "The Local SEO & GEO Advantage",
    subheading: "(Because Your Brand Deserves to Be Found Where Decisions Happen)",
    body: "Your customers search locally, and AI now decides who gets found first. Anny helps your brand dominate region-based Local SEO and GEO, ensuring top visibility across ChatGPT, Google AI Overviews, Gemini, and Perplexity. Be discovered where decisions happen.",
    video: {
      src: "/services/videos/local-seo.webm",
      width: 1920,
      height: 1280,
      label:
        "Google local pack mockup showing a business profile ranked in position one",
    },
    mediaFirst: false,
  },
] as const;

export default function ServicesGraphics() {
  return (
    <section className="w-full" aria-label="Product capabilities">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:gap-20 sm:py-20 lg:gap-28 lg:py-28">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div
              className={
                feature.mediaFirst
                  ? "relative overflow-hidden rounded-2xl"
                  : "relative overflow-hidden rounded-2xl lg:order-2"
              }
            >
              <video
                className="h-auto w-full"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                width={feature.video.width}
                height={feature.video.height}
                aria-label={feature.video.label}
              >
                <source src={feature.video.src} type="video/webm" />
              </video>
            </div>

            <div
              className={
                feature.mediaFirst
                  ? "flex flex-col justify-center lg:pl-2"
                  : "flex flex-col justify-center lg:order-1 lg:pr-2"
              }
            >
              <h2
                id={`services-graphics-${feature.id}`}
                className="max-w-md text-3xl leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.75rem] md:leading-[1.15] text-pretty"
                style={{ color: HEADING }}
              >
                {feature.heading}
              </h2>

              <p
                className="mt-3 text-base font-medium sm:text-base"
                style={{ color: HEADING }}
              >
                {feature.subheading}
              </p>

              <p
                className="mt-3 max-w-md text-base leading-relaxed font-medium sm:text-[13px] sm:leading-relaxed"
                style={{ color: BODY }}
              >
                {feature.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
