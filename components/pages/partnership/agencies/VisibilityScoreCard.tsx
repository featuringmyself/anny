const brands = [
  {
    rank: 1,
    name: "Intercom",
    url: "https://www.intercom.com",
    score: "42.4%",
    highlight: false,
    logo: (
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
        <rect width="24" height="24" rx="4" fill="#1A1A1A" />
        <path
          d="M6 11.5c0-1.2.9-2.2 2-2.2s2 1 2 2.2v3.3c0 1.2-.9 2.2-2 2.2s-2-1-2-2.2v-3.3Zm4.5 0c0-1.2.9-2.2 2-2.2s2 1 2 2.2v3.3c0 1.2-.9 2.2-2 2.2s-2-1-2-2.2v-3.3Zm4.5 0c0-1.2.9-2.2 2-2.2s2 1 2 2.2v3.3c0 1.2-.9 2.2-2 2.2s-2-1-2-2.2v-3.3Z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    rank: 2,
    name: "Zendesk",
    url: "https://www.zendesk.com",
    score: "41.7%",
    highlight: false,
    logo: (
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
        <rect width="24" height="24" rx="4" fill="#03363D" />
        <path
          d="M5.5 7.2 12 12l-6.5 4.8V7.2Zm13 0V16.8L12 12l6.5-4.8Z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    rank: 3,
    name: "Eesel AI",
    url: "https://www.eesel.ai",
    score: "29.2%",
    highlight: false,
    logo: (
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
        <rect width="24" height="24" rx="4" fill="#111" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fill="#fff"
          fontSize="13"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          e
        </text>
      </svg>
    ),
  },
  {
    rank: 4,
    name: "Ada CX",
    url: "https://www.ada.cx",
    score: "25.7%",
    highlight: false,
    logo: (
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
        <rect width="24" height="24" rx="4" fill="#0B0B0B" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fill="#fff"
          fontSize="12"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          A
        </text>
      </svg>
    ),
  },
  {
    rank: 5,
    name: "Ordemio",
    url: "https://www.ordemio.com",
    score: "15.3%",
    highlight: true,
    logo: (
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
        <rect width="24" height="24" rx="4" fill="#E8F0FF" />
        <path
          d="M5 16.5h14l-2.2-3.2H7.2L5 16.5Zm2.4-4.4h9.2L14.4 8.8H9.6l-2.2 3.3Zm2.3-4.5h4.6L12 5.2 9.7 7.6Z"
          fill="#2462ff"
        />
      </svg>
    ),
  },
] as const;

export default function VisibilityScoreCard() {
  return (
    <div
      role="img"
      aria-label="Visibility score rank leaderboard showing Ordemio highlighted at #5 with a 15.3% score among brands including Intercom, Zendesk, Eesel AI, and Ada CX"
      className="w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="px-5 pt-5 pb-4 md:px-6 md:pt-6">
        <p className="text-sm text-zinc-400">Visibility score rank</p>
        <p className="mt-1 text-4xl font-semibold tracking-tight text-zinc-900">
          #5
        </p>
      </div>

      <div className="px-2 pb-2 md:px-3 md:pb-3">
        <div className="grid grid-cols-[2rem_1fr_auto] gap-x-3 px-3 pb-2 text-xs font-medium text-zinc-400 md:px-4">
          <span>#</span>
          <span>Brand</span>
          <span className="text-right">Visibility Score</span>
        </div>
        <div className="mx-1 border-t border-zinc-100 md:mx-2" />

        <ul>
          {brands.map((brand) => (
            <li
              key={brand.name}
              className={`grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 border-b border-zinc-100 px-3 py-3 last:border-b-0 md:px-4 ${
                brand.highlight ? "rounded-lg bg-[#F3F0FF]" : ""
              }`}
            >
              <span className="text-sm text-zinc-600 tabular-nums">
                {brand.rank}
              </span>
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0" aria-hidden>
                  {brand.logo}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {brand.name}
                  </p>
                  <p className="truncate text-xs text-zinc-400">{brand.url}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-zinc-900 tabular-nums">
                {brand.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
