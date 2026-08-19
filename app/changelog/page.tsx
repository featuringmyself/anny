import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import ChangelogHero from "@/components/pages/product/ChangelogHero";
import ChangelogTimeline from "@/components/pages/product/ChangelogTimeline";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Changelog — Anny";
const description =
  "Product updates from Anny: AI Mode tracking, competitor ladders, Gemini citations, Slack alerts, and agency workspaces.";

export const metadata = pageMetadata({
  path: "/changelog",
  title,
  description,
});

export default function ChangelogPage() {
  return (
    <main>
      <JsonLd
        data={webpageJsonLd({ path: "/changelog", title, description })}
      />
      <ChangelogHero />
      <PatternStrip />
      <ChangelogTimeline />
    </main>
  );
}
