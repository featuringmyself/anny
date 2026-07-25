import PatternStrip from "@/components/PatternStrip";

type FeaturePageLayoutProps = {
  children: React.ReactNode;
};

/** Thin padding + pattern wrapper for feature routes. Heroes/demos stay page-specific. */
export default function FeaturePageLayout({ children }: FeaturePageLayoutProps) {
  return (
    <div className="pb-16 md:pb-24">
      <PatternStrip />
      {children}
    </div>
  );
}
