import type { AiModelId } from "./types";

export const MODEL_META: Record<
  AiModelId,
  { name: string; shortName: string; logo: string; accent: string }
> = {
  chatgpt: {
    name: "ChatGPT",
    shortName: "ChatGPT",
    logo: "/ai-logo/chatgptLogo.svg",
    accent: "#10A37F",
  },
  perplexity: {
    name: "Perplexity",
    shortName: "Perplexity",
    logo: "/ai-logo/perplexityLogo.svg",
    accent: "#20808D",
  },
  "ai-overview": {
    name: "Google AI Overview",
    shortName: "AI Overview",
    logo: "/trackModel/ai_overview-logo.svg",
    accent: "#4285F4",
  },
  gemini: {
    name: "Gemini",
    shortName: "Gemini",
    logo: "/ai-logo/geminiLogo.svg",
    accent: "#8E75B2",
  },
  claude: {
    name: "Claude",
    shortName: "Claude",
    logo: "/ai-logo/claudeLogo.svg",
    accent: "#D97757",
  },
  "ai-mode": {
    name: "Google AI Mode",
    shortName: "AI Mode",
    logo: "/trackModel/ai_mode-logo.svg",
    accent: "#1A73E8",
  },
  grok: {
    name: "Grok",
    shortName: "Grok",
    logo: "/ai-logo/grokLogo.svg",
    accent: "#1A1A1A",
  },
};
