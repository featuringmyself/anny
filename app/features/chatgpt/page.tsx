import type { Metadata } from "next";
import ChatGptHero from "@/components/pages/features/chatgpt/ChatGptHero";
import ChatGptMentionFeed from "@/components/pages/features/chatgpt/ChatGptMentionFeed";
import ChatGptSparkline from "@/components/pages/features/chatgpt/ChatGptSparkline";

export const metadata: Metadata = {
  title: "ChatGPT Visibility Tracking — Anny",
  description:
    "Track how often ChatGPT mentions your brand. Read full answers, sentiment, and daily visibility scores in one place.",
};

export default function ChatGptFeaturePage() {
  return (
    <>
      <ChatGptHero />
      <ChatGptMentionFeed />
      <ChatGptSparkline />
    </>
  );
}
