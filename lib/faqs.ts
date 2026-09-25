export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What does Dodox actually do?",
    answer:
      "Dodox is an SEO & GEO Agent with AI Monitoring. It tracks whether ChatGPT, Claude, Gemini, Perplexity and more mention your brand, then helps you ship the content and citation work that earns more recommendations. Think Ahrefs energy, built for AI answers.",
  },
  {
    question: "What is GEO (Generative Engine Optimization)?",
    answer:
      "GEO (Generative Engine Optimization) is the process of optimizing your content and strategy so AI platforms like ChatGPT, Claude, and Gemini mention your business when people ask for recommendations. Just like SEO helps you rank higher on Google, GEO helps you get recommended more often by AI/LLMs.",
  },
  {
    question: "Does the Agent include Monitoring?",
    answer:
      "Yes. The SEO & GEO Agent plan at $300/mo includes everything in AI Monitoring, plus the agent that ships SEO and GEO work. AI Monitoring alone is $150/mo if you only need tracking and alerts.",
  },
  {
    question: "Do I need to install anything or change my website?",
    answer:
      "Nope. No code, no plugins, no website changes required to start monitoring. Enter your URL and begin tracking. Managed services are optional if you want us to run the work for you.",
  },
  {
    question: "What's a good Visibility Score?",
    answer:
      "Here's how to interpret your Visibility Score:\n• 80-100%: Excellent, Your brand dominates AI responses.\n• 60-79%: Good, Strong presence with room for improvement.\n• 40-59%: Fair, Your brand appears regularly but not prominently.\n• 20-39%: Poor, Limited AI visibility.\n• 0-19%: Critical, Your brand rarely appears in AI responses.",
  },
];
