export const DR_BANDS = [
  {
    from: 0,
    to: 29,
    label: "New",
    copy: "A young or quiet site. Few other sites link to it yet.",
  },
  {
    from: 30,
    to: 49,
    label: "Growing",
    copy: "A real site with some links. Useful, but not a heavyweight.",
  },
  {
    from: 50,
    to: 69,
    label: "Solid",
    copy: "A healthy backlink profile. Typical of established brands.",
  },
  {
    from: 70,
    to: 89,
    label: "Strong",
    copy: "Hard to reach. These sites are widely linked and trusted.",
  },
  {
    from: 90,
    to: 100,
    label: "Top-tier",
    copy: "The strongest sites on the web — big publishers and platforms.",
  },
] as const;

export function bandForScore(score: number) {
  return (
    DR_BANDS.find((band) => score >= band.from && score <= band.to) ??
    DR_BANDS[0]
  );
}

export function formatDr(score: number) {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}
