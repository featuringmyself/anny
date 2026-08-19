import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import CareersRoleView from "@/components/pages/careers/CareersRoleView";
import {
  getRoleBySlug,
  getRoleSlugs,
} from "@/components/pages/careers/roles";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getRoleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleBySlug(slug);

  if (!role) {
    return { title: `Careers — ${SITE_NAME}` };
  }

  return pageMetadata({
    path: `/careers/${slug}`,
    title: `${role.role} — Careers — ${SITE_NAME}`,
    description: role.summary,
  });
}

export default async function CareerRolePage({ params }: PageProps) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);

  if (!role) {
    notFound();
  }

  const title = `${role.role} — Careers — ${SITE_NAME}`;

  return (
    <main>
      <JsonLd
        data={webpageJsonLd({
          path: `/careers/${slug}`,
          title,
          description: role.summary,
        })}
      />
      <CareersRoleView role={role} />
    </main>
  );
}
