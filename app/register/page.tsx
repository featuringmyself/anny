import JsonLd from "@/components/JsonLd";
import RegisterSection from "@/components/pages/register/RegisterSection";
import { parseRegisterPlan } from "@/lib/plans";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Create account · Dodox";
const description =
  "Create your Dodox account with work email and company. Start tracking how ChatGPT, Gemini, and AI Mode mention your brand.";

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
    <main className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
      <JsonLd data={webpageJsonLd({ path: "/register", title, description })} />
      <RegisterSection plan={plan} />
    </main>
  );
}
