import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import { AiReadinessChecker } from "@/components/pages/tools/ai-readiness/AiReadinessChecker";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const path = "/tools/ai-readiness-checker";
const title = "Free AI Readiness Checker | Anny";
const description =
  "See how prepared your team is to use AI responsibly and effectively. Get a free AI readiness score and practical next steps in under three minutes.";

export const metadata: Metadata = pageMetadata({
  path,
  title,
  description,
});

export default function AiReadinessCheckerPage() {
  return (
    <main>
      <JsonLd data={webpageJsonLd({ path, title, description })} />
      <AiReadinessChecker />
    </main>
  );
}
