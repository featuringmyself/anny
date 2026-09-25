import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import CareersHero from "@/components/pages/careers/CareersHero";
import CareersBoard from "@/components/pages/careers/CareersBoard";
import CareersCulture from "@/components/pages/careers/CareersCulture";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Careers · Dodox";
const description =
  "Join Dodox and help marketing teams measure AI search visibility across ChatGPT, Claude, Gemini, and more.";

export const metadata = pageMetadata({
  path: "/careers",
  title,
  description,
});

export default function CareersPage() {
  return (
    <main>
      <JsonLd data={webpageJsonLd({ path: "/careers", title, description })} />
      <CareersHero />
      <PatternStrip />
      <CareersBoard />
      <PatternStrip />
      <CareersCulture />
    </main>
  );
}
