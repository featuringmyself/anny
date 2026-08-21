import { Text, View } from "@react-pdf/renderer";

import { pdfStyles } from "./styles";

type PdfHeaderProps = {
  company: string;
  kind?: "visibility" | "readiness";
};

export function PdfHeader({ company, kind = "visibility" }: PdfHeaderProps) {
  const brand =
    kind === "readiness"
      ? "Anny · AI readiness audit"
      : "Anny · AI visibility audit";

  return (
    <View style={pdfStyles.header} fixed>
      <Text style={pdfStyles.headerBrand}>{brand}</Text>
      <Text style={pdfStyles.headerMeta}>{company}</Text>
    </View>
  );
}

type PdfFooterProps = {
  privateReport?: boolean;
};

export function PdfFooter({ privateReport }: PdfFooterProps) {
  return (
    <View style={pdfStyles.footer} fixed>
      <Text style={pdfStyles.footerText}>
        {privateReport
          ? "Private · prepared for outreach only · not for redistribution"
          : "Prepared by Anny · anny.dodoxhq.com"}
      </Text>
      <Text
        style={pdfStyles.footerText}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
      />
    </View>
  );
}
