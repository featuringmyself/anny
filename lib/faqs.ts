export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What does Anny actually do?",
    answer:
      "Anny shows you if your company gets mentioned in AI answers when people ask AI assistants like ChatGPT, Claude, Gemini and more for recommendations. It shows you gaps and opportunities to improve your AI visibility. Think of it sort of like Ahrefs, but for AI answers.",
  },
  {
    question: "What is GEO (Generative Engine Optimization)?",
    answer:
      "GEO (Generative Engine Optimization) is the process of optimizing your content and strategy so AI platforms like ChatGPT, Claude, and Gemini mention your business when people ask for recommendations. Just like SEO helps you rank higher on Google, GEO helps you get recommended more often by AI/LLMs.",
  },
  {
    question: "What is a response in Anny?",
    answer:
      "Each time we generate an AI answer from any model (ChatGPT, Claude, Gemini, etc.), it counts as 1 response. All models use the same amount — 1 response per query, making it simple to track your usage.",
  },
  {
    question: "Do I need to install anything or change my website?",
    answer:
      "Nope! No code, no plugins, no website changes needed. Just enter your URL and start tracking.",
  },
  {
    question: "What's a good Visibility Score?",
    answer:
      "Here's how to interpret your Visibility Score:\n• 80-100%: Excellent — Your brand dominates AI responses.\n• 60-79%: Good — Strong presence with room for improvement.\n• 40-59%: Fair — Your brand appears regularly but not prominently.\n• 20-39%: Poor — Limited AI visibility.\n• 0-19%: Critical — Your brand rarely appears in AI responses.",
  },
];
