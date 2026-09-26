export type AiModel = {
  name: string;
  logo: string;
  color: string;
};

export const AI_MODELS = [
  { name: "ChatGPT", logo: "/ai-logo/chatgptLogo.svg", color: "#000000" },
  { name: "Claude", logo: "/ai-logo/claudeLogo.svg", color: "#D97757" },
  { name: "Gemini", logo: "/ai-logo/geminiLogo.svg", color: "#3186FF" },
  { name: "Grok", logo: "/ai-logo/grokLogo.svg", color: "#000000" },
  { name: "Perplexity", logo: "/ai-logo/perplexityLogo.svg", color: "#22B8CD" },
] as const satisfies readonly AiModel[];

/** Natural-language list for accessible names and AEO. */
export const AI_MODELS_PHRASE =
  "ChatGPT, Claude, Gemini, Grok, and Perplexity";

export const HOME_HERO_HEADLINE =
  "Get cited in ChatGPT, Claude, Gemini, Grok, and Perplexity. Then keep the mention.";
