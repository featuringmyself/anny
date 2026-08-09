type FeaturePageLayoutProps = {
  children: React.ReactNode;
};

/** Thin padding wrapper for feature routes. Heroes/demos stay page-specific. */
export default function FeaturePageLayout({ children }: FeaturePageLayoutProps) {
  return <main className="pb-16 md:pb-24">{children}</main>;
}
