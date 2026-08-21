import { StyleSheet } from "@react-pdf/renderer";

export const ACCENT = "#2462ff";
export const INK = "#18181b";
export const MUTED = "#71717a";
export const FAINT = "#a1a1aa";
export const LINE = "#e4e4e7";
export const PAPER = "#F7F7F7";
export const WHITE = "#ffffff";
export const CRITICAL = "#b91c1c";

export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: "SpaceGrotesk",
    fontSize: 10,
    color: INK,
    backgroundColor: PAPER,
    paddingTop: 56,
    paddingBottom: 52,
    paddingHorizontal: 40,
  },
  header: {
    position: "absolute",
    top: 18,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBrand: {
    fontSize: 9,
    fontWeight: 600,
    color: ACCENT,
  },
  headerMeta: {
    fontSize: 8,
    color: FAINT,
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: LINE,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: FAINT,
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: 500,
    color: ACCENT,
    marginBottom: 8,
  },
  h1: {
    fontSize: 36,
    fontWeight: 500,
    letterSpacing: -0.8,
    lineHeight: 1.1,
  },
  h2: {
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  h3: {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  body: {
    fontSize: 10,
    lineHeight: 1.55,
    color: MUTED,
  },
  bodyInk: {
    fontSize: 10,
    lineHeight: 1.55,
    color: INK,
  },
  label: {
    fontSize: 7.5,
    fontWeight: 500,
    color: FAINT,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  card: {
    borderWidth: 1,
    borderColor: LINE,
    backgroundColor: WHITE,
    padding: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  badge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: LINE,
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 8,
    fontWeight: 500,
  },
  badgeCritical: {
    borderColor: "#fecaca",
    color: CRITICAL,
    backgroundColor: "#fef2f2",
  },
  badgeAccent: {
    borderColor: "#bfdbfe",
    color: ACCENT,
    backgroundColor: "#eff6ff",
  },
  screenshot: {
    width: "100%",
    maxHeight: 420,
    objectFit: "contain",
    borderWidth: 1,
    borderColor: LINE,
    backgroundColor: "#09090b",
  },
  divider: {
    height: 1,
    backgroundColor: LINE,
    marginVertical: 14,
  },
  barTrack: {
    height: 4,
    backgroundColor: LINE,
    flexGrow: 1,
  },
  barFill: {
    height: 4,
    backgroundColor: INK,
  },
  barFillAccent: {
    height: 4,
    backgroundColor: ACCENT,
  },
});
