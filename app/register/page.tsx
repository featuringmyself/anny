import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import RegisterSection from "@/components/pages/register/RegisterSection";
import { parseRegisterPlan } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Create account — Anny",
  description:
    "Create your Anny account with work email and company. Start tracking how ChatGPT, Gemini, and AI Mode mention your brand.",
};

type RegisterPageProps = {
  searchParams: Promise<{ plan?: string | string[] }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const plan = parseRegisterPlan(params.plan);

  return (
    <main>
      <PatternStrip />
      <RegisterSection plan={plan} />
      <PatternStrip />
    </main>
  );
}
