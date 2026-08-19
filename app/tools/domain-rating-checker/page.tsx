import type { Metadata } from "next";
import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDomainRating, parseDomainParam } from "@/lib/domain-rating";

export const metadata: Metadata = {
  title: "Domain Rating Checker — Anny",
  description: "Check a domain’s Ahrefs Domain Rating.",
};

type DomainRatingCheckerPageProps = {
  searchParams: Promise<{ domain?: string | string[] }>;
};

export default async function DomainRatingCheckerPage({
  searchParams,
}: DomainRatingCheckerPageProps) {
  const domain = parseDomainParam((await searchParams).domain);
  const result = domain ? await getDomainRating(domain) : null;

  return (
    <div>
      <h1>Domain Rating Checker</h1>

      <Form action="" className="flex gap-2">
        <Input
          type="text"
          name="domain"
          placeholder="Enter a domain"
          defaultValue={domain}
        />
        <Button type="submit">Check</Button>
      </Form>

      {result && "error" in result ? <p>{result.error}</p> : null}
      {result && !("error" in result) ? (
        <p>
          Domain Rating: {result.domain_rating} · Ahrefs Rank:{" "}
          {result.ahrefs_rank}
        </p>
      ) : null}
    </div>
  );
}
