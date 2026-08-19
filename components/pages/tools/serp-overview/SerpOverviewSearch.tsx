import { SerpOverviewForm } from "@/components/pages/tools/serp-overview/SerpOverviewForm";
import { SerpOverviewResults } from "@/components/pages/tools/serp-overview/SerpOverviewResults";
import {
  parseCountryParam,
  parseKeywordParam,
} from "@/lib/serp-input";

type SerpSearchParams = Promise<{
  keyword?: string | string[];
  country?: string | string[];
}>;

export async function SerpOverviewSearchForm({
  searchParams,
}: {
  searchParams: SerpSearchParams;
}) {
  const params = await searchParams;

  return (
    <SerpOverviewForm
      defaultKeyword={parseKeywordParam(params.keyword)}
      defaultCountry={parseCountryParam(params.country)}
    />
  );
}

export async function SerpOverviewSearchResults({
  searchParams,
}: {
  searchParams: SerpSearchParams;
}) {
  const params = await searchParams;
  const keyword = parseKeywordParam(params.keyword);
  const country = parseCountryParam(params.country);

  return <SerpOverviewResults keyword={keyword} country={country} />;
}
