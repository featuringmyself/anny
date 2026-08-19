import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import RegisterSection from "@/components/pages/register/RegisterSection";
import { parseRegisterPlan } from "@/lib/plans";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Create account — Anny";
const description =
  "Create your Anny account with work email and company. Start tracking how ChatGPT, Gemini, and AI Mode mention your brand.";

export const metadata = pageMetadata({
  path: "/register",
  title,
  description,
});

type RegisterPageProps = {
  searchParams: Promise<{ plan?: string | string[] }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const plan = parseRegisterPlan(params.plan);

  return (
    <main>
      <JsonLd data={webpageJsonLd({ path: "/register", title, description })} />
      <PatternStrip />
      <RegisterSection plan={plan} />
      <PatternStrip />
    </main>
  );
}
