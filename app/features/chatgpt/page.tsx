import JsonLd from "@/components/JsonLd";
import ChatGptCta from "@/components/pages/features/chatgpt/ChatGptCta";
import ChatGptDataToAction from "@/components/pages/features/chatgpt/ChatGptDataToAction";
import ChatGptFaq, {
  faqs,
} from "@/components/pages/features/chatgpt/ChatGptFaq";
import ChatGptHero from "@/components/pages/features/chatgpt/ChatGptHero";
import ChatGptTracks from "@/components/pages/features/chatgpt/ChatGptTracks";
import ChatGptWhyMatters from "@/components/pages/features/chatgpt/ChatGptWhyMatters";
import { faqJsonLd, pageMetadata, webpageJsonLd } from "@/lib/seo";
import { SITE_SCREENSHOT_URL } from "@/lib/site";

const title = "ChatGPT Visibility Tracker — Anny";
const description =
  "Anny lets you measure your brand's performance on ChatGPT — visibility, sentiment, citations, and tips on how to improve.";

export const metadata = pageMetadata({
  path: "/features/chatgpt",
  title,
  description,
  image: SITE_SCREENSHOT_URL,
});

export default function ChatGptFeaturePage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({
          path: "/features/chatgpt",
          title,
          description,
          image: SITE_SCREENSHOT_URL,
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <ChatGptHero />
      <ChatGptTracks />
      <ChatGptDataToAction />
      <ChatGptWhyMatters />
      <ChatGptFaq />
      <ChatGptCta />
    </>
  );
}
