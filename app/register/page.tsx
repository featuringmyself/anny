import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import RegisterSection from "@/components/pages/register/RegisterSection";

export const metadata: Metadata = {
  title: "Create account — Anny",
  description:
    "Create your Anny account with work email and company. Start tracking how ChatGPT, Gemini, and AI Mode mention your brand.",
};

const PLANS = new Set(["Starter", "Pro", "Advanced"]);

type RegisterPageProps = {
  searchParams: Promise<{ plan?: string | string[] }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const raw = Array.isArray(params.plan) ? params.plan[0] : params.plan;
  const plan = raw && PLANS.has(raw) ? raw : undefined;

  return (
    <main>
      <PatternStrip />
      <RegisterSection plan={plan} />
      <PatternStrip />
    </main>
  );
}
