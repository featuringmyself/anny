import JsonLd from "@/components/JsonLd";
import AgenciesHero from "@/components/pages/features/agencies/AgenciesHero";
import AgenciesEconomics from "@/components/pages/features/agencies/AgenciesEconomics";
import AgenciesWorkspace from "@/components/pages/features/agencies/AgenciesWorkspace";
import AgenciesPitch from "@/components/pages/features/agencies/AgenciesPitch";
import AgenciesWhiteLabel from "@/components/pages/features/agencies/AgenciesWhiteLabel";
import AgenciesReporting from "@/components/pages/features/agencies/AgenciesReporting";
import AgenciesProgram from "@/components/pages/features/agencies/AgenciesProgram";
import AgenciesFaq, {
  faqs as agenciesFaqs,
} from "@/components/pages/features/agencies/AgenciesFaq";
import AgenciesCta from "@/components/pages/features/agencies/AgenciesCta";
import { faqJsonLd, pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Anny for Agencies — Resell AI Visibility on Agency Pricing";
const description =
  "Run AI search visibility for every client in one workspace. White-label reports, unlimited seats, pitch workspaces, and heavily discounted agency pricing — quoted by sales.";

export const metadata = pageMetadata({
  path: "/features/agencies",
  title,
  description,
});

export default function AgenciesFeaturePage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({ path: "/features/agencies", title, description })}
      />
      <JsonLd data={faqJsonLd(agenciesFaqs)} />
      <AgenciesHero />
      <AgenciesEconomics />
      <AgenciesWorkspace />
      <AgenciesPitch />
      <AgenciesWhiteLabel />
      <AgenciesReporting />
      <AgenciesProgram />
      <AgenciesFaq />
      <AgenciesCta />
    </>
  );
}
