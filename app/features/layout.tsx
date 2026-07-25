import FeaturePageLayout from "@/components/pages/features/FeaturePageLayout";

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FeaturePageLayout>{children}</FeaturePageLayout>;
}
