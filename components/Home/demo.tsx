import {
  ArrowUpRight,
  BarChart3,
  Box,
  CalendarDays,
  ChevronUp,
  Circle,
  CircleHelp,
  Download,
  Eye,
  House,
  Layers,
  Scan,
  Search,
  Settings,
  Smile,
  Tag,
  TrendingDown,
  Waves,
} from "lucide-react";

const brands = [
  { name: "Monday", color: "#f43f5e", logo: "/brand-logos/monday.png", visibility: "65%" },
  { name: "Salesforce", color: "#38a8e0", logo: "/brand-logos/salesforce.png", visibility: "62%" },
  { name: "Attio", color: "#27272a", logo: "/brand-logos/attio.svg", visibility: "47%" },
  { name: "Pipedrive", color: "#3d9b5f", logo: "/brand-logos/pipedrive.png", visibility: "41%" },
  { name: "Zero", color: "#18181b", logo: "/brand-logos/zero.svg", visibility: "28%" },
];

type Competitor = (typeof brands)[number] & {
  sentiment: string;
  position: string;
  visibilityDelta?: string;
  visibilityLoss?: string;
  sentimentDelta?: string;
  sentimentGain?: string;
  positionDelta?: string;
  positionGain?: string;
};

const competitors: Competitor[] = [
  { ...brands[0], sentiment: "86", position: "2.7" },
  {
    ...brands[1],
    sentiment: "62",
    position: "2.9",
    sentimentDelta: "0.2",
    positionDelta: "0.1",
  },
  { ...brands[2], sentiment: "89", position: "3.6", visibilityDelta: "0.3" },
  { ...brands[3], sentiment: "76", position: "3.9", visibilityLoss: "0.3" },
  {
    ...brands[4],
    sentiment: "88",
    position: "2.3",
    sentimentGain: "0.4",
    positionGain: "0.2",
  },
];

const domains = [
  { logo: "/brand-logos/reddit.png", domain: "reddit.com", type: "UGC", used: "32%", citations: "41%" },
  { logo: "/brand-logos/techradar.png", domain: "techradar.com", type: "Editorial", used: "43%", citations: "46%" },
  { logo: "/brand-logos/wikipedia.png", domain: "wikipedia.org", type: "Reference", used: "31%", citations: "40%" },
  { logo: "/brand-logos/youtube.png", domain: "youtube.com", type: "UGC", used: "39%", citations: "34%" },
  { logo: "/brand-logos/google.png", domain: "google.com", type: "Corporate", used: "39%", citations: "34%" },
];

function BrandLogo({
  src,
  alt,
  size = 16,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="shrink-0 rounded-[3px] object-contain"
    />
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center gap-2 rounded-md bg-[#f1f1f1] px-2.5 text-[11px] font-medium text-zinc-700">
      {children}
    </span>
  );
}

function Chart() {
  const lines = [
    { color: "#f43f5e", d: "M18 58 C76 58, 94 50, 145 42 S215 42, 254 51 S331 53, 390 48" },
    { color: "#38a8e0", d: "M18 43 C82 43, 104 35, 150 35 S211 46, 254 48 S330 45, 390 50" },
    { color: "#2463eb", d: "M18 70 C76 69, 102 54, 148 51 S215 54, 254 62 S331 61, 390 67" },
    { color: "#eab308", d: "M18 80 C75 78, 101 69, 148 68 S208 75, 254 78 S330 75, 390 79" },
    { color: "#35844e", d: "M18 94 C75 94, 104 83, 149 83 S214 88, 254 98 S329 93, 390 99" },
  ];

  return (
    <div className="relative h-[174px] overflow-hidden border-t border-zinc-200">
      <svg className="absolute inset-x-3 top-2 h-[136px] w-[calc(100%-24px)]" viewBox="0 0 408 126" preserveAspectRatio="none">
        {[28, 63, 98].map((y) => (
          <line key={y} x1="0" x2="408" y1={y} y2={y} stroke="#ececec" strokeWidth="1" />
        ))}
        <line x1="254" x2="254" y1="0" y2="126" stroke="#d8d8d8" strokeWidth="1" />
        {lines.map((line) => (
          <path key={line.color} d={line.d} fill="none" stroke={line.color} strokeWidth="1.35" />
        ))}
        {lines.map((line, index) => (
          <circle key={`${line.color}-dot`} cx="254" cy={[51, 48, 62, 78, 98][index]} r="2.5" fill="white" stroke={line.color} strokeWidth="1.2" />
        ))}
      </svg>

      <div className="absolute bottom-2 left-0 right-0 flex justify-around px-5 text-[9px] text-zinc-400">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>

      <div className="absolute right-3 top-5 w-[158px] rounded-lg bg-[#080808] px-3 py-2.5 text-white shadow-xl">
        <div className="mb-2 text-[10px] font-medium">April 2025</div>
        <div className="space-y-1">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center text-[8px]">
              <span className="mr-2 size-1.5 rounded-[1px]" style={{ backgroundColor: brand.color }} />
              <BrandLogo src={brand.logo} alt={brand.name} size={12} />
              <span className="ml-1.5 text-zinc-400">{brand.name}</span>
              <span className="ml-auto text-[9px]">{brand.visibility}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompetitorTable() {
  return (
    <section className="h-full overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="flex h-[54px] items-center justify-between px-3">
        <div>
          <h3 className="text-[11px] font-semibold text-zinc-700">Attio&apos;s competitors</h3>
          <p className="mt-0.5 text-[9px] text-zinc-400">Compare Attio with it&apos;s competitors</p>
        </div>
        <button aria-label="Open competitors" className="grid size-7 place-items-center rounded-md border border-zinc-200 text-zinc-600 shadow-sm">
          <ArrowUpRight size={13} />
        </button>
      </div>
      <div className="grid h-7 grid-cols-[24px_1.25fr_.78fr_.77fr_.7fr] border-y border-zinc-200 bg-[#fafafa] text-[8px] text-zinc-500">
        {["#", "Brand", "Visibility", "Sentiment", "Position"].map((label) => (
          <div key={label} className="flex items-center border-r border-zinc-200 px-2 last:border-r-0">
            {label}
          </div>
        ))}
      </div>
      {competitors.map((brand, index) => (
        <div key={brand.name} className="grid h-[28px] grid-cols-[24px_1.25fr_.78fr_.77fr_.7fr] border-b border-zinc-100 text-[9px] last:border-0">
          <div className="flex items-center border-r border-zinc-100 px-2 text-zinc-400">{index + 1}</div>
          <div className="flex items-center gap-2 border-r border-zinc-100 px-2 font-medium text-zinc-700">
            <BrandLogo src={brand.logo} alt={brand.name} size={12} />
            {brand.name}
          </div>
          <div className="flex items-center gap-1 border-r border-zinc-100 px-2 font-medium text-zinc-600">
            {brand.visibility}
            {brand.visibilityDelta && <span className="ml-auto text-emerald-500">↗ {brand.visibilityDelta}</span>}
            {brand.visibilityLoss && <span className="ml-auto text-rose-400">↘ {brand.visibilityLoss}</span>}
          </div>
          <div className="flex items-center gap-1 border-r border-zinc-100 px-2">
            <span className="h-3 w-0.5 rounded bg-emerald-500" />
            <span className="rounded border border-zinc-200 px-1 text-zinc-600">{brand.sentiment}</span>
            {brand.sentimentDelta && <span className="ml-auto text-rose-400">↘ {brand.sentimentDelta}</span>}
            {brand.sentimentGain && <span className="ml-auto text-emerald-500">↗ {brand.sentimentGain}</span>}
          </div>
          <div className="flex items-center gap-1 px-2">
            <span className="rounded border border-zinc-200 px-1 text-zinc-600"># {brand.position}</span>
            {brand.positionDelta && <span className="ml-auto text-rose-400">↘ {brand.positionDelta}</span>}
            {brand.positionGain && <span className="ml-auto text-emerald-500">↗ {brand.positionGain}</span>}
          </div>
        </div>
      ))}
    </section>
  );
}

function DomainTable() {
  const typeClasses: Record<string, string> = {
    UGC: "bg-blue-50 text-blue-500",
    Editorial: "bg-orange-50 text-orange-400",
    Reference: "bg-purple-50 text-purple-400",
    Corporate: "bg-zinc-100 text-zinc-400",
  };

  return (
    <section className="h-[194px] overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="flex h-[38px] items-center px-3">
        <span className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[10px] font-medium text-zinc-600 shadow-sm">Domains</span>
        <span className="px-2.5 py-1 text-[10px] text-zinc-500">URLs</span>
      </div>
      <div className="grid h-7 grid-cols-[27px_1.65fr_.7fr_.55fr_.7fr] border-y border-zinc-200 bg-[#fafafa] text-[8px] text-zinc-500">
        {["#", "Domain", "Type", "Used", "Avg. Citations"].map((label) => (
          <div key={label} className="flex items-center border-r border-zinc-200 px-2 last:border-r-0">
            {label}
          </div>
        ))}
      </div>
      {domains.map((domain, index) => (
        <div key={domain.domain} className="grid h-[31px] grid-cols-[27px_1.65fr_.7fr_.55fr_.7fr] border-b border-zinc-100 text-[10px]">
          <div className="flex items-center border-r border-zinc-100 px-2 text-zinc-400">{index + 1}</div>
          <div className="flex items-center gap-2 border-r border-zinc-100 px-2 text-zinc-600">
            <BrandLogo src={domain.logo} alt={domain.domain} size={12} />
            {domain.domain}
          </div>
          <div className="flex items-center border-r border-zinc-100 px-2">
            <span className={`rounded px-1.5 py-0.5 text-[8px] ${typeClasses[domain.type]}`}>{domain.type}</span>
          </div>
          <div className="flex items-center border-r border-zinc-100 px-2 text-zinc-600">{domain.used}</div>
          <div className="flex items-center px-2 text-zinc-600">{domain.citations}</div>
        </div>
      ))}
    </section>
  );
}

function DonutPanel() {
  return (
    <section className="relative h-[194px] rounded-xl border border-zinc-200 bg-white">
      <div className="flex items-start justify-between px-3 pt-3">
        <div>
          <h3 className="text-[11px] font-semibold text-zinc-700">Domains by Type</h3>
          <p className="mt-0.5 text-[9px] text-zinc-400">Most used domains categorized by type</p>
        </div>
        <button aria-label="Open domains by type" className="grid size-7 place-items-center rounded-md border border-zinc-200 text-zinc-600 shadow-sm">
          <ArrowUpRight size={13} />
        </button>
      </div>
      <div className="flex h-[130px] items-center justify-center gap-8">
        <div className="relative size-[88px]">
          <div
            className="size-full rounded-full"
            style={{
              background: "conic-gradient(#4c7ce5 0 22%, transparent 22% 24%, #765ad9 24% 42%, transparent 42% 44%, #b080df 44% 63%, transparent 63% 65%, #e4a2bc 65% 82%, transparent 82% 84%, #e5e5e5 84% 100%)",
            }}
          />
          <div className="absolute inset-[7px] grid place-items-center rounded-full bg-white text-center">
            <div>
              <div className="text-[15px] text-zinc-500">12%</div>
              <div className="text-[9px] text-blue-400">UGC</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-3 text-[8px]">
          {[
            ["UGC", "#5d82dc"],
            ["Editorial", "#7765d6"],
            ["Corporate", "#aa77d7"],
            ["Competitor", "#df98b7"],
            ["Others", "#e5e5e5"],
          ].map(([label, color]) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-zinc-500">
              <i className="size-2 rounded-[2px]" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Demo() {
  return (
    <section className="mx-auto mt-10 w-full max-w-[1200px] px-4 pb-20">
      <div className="relative aspect-[2/1] min-h-[500px] overflow-hidden rounded-xl border border-zinc-200 bg-[#f8f8f8] text-zinc-700 shadow-[0_18px_60px_rgba(0,0,0,0.07)]">
        <aside className="absolute inset-y-0 left-0 w-[145px] border-r border-zinc-200 bg-[#f7f7f7] p-3">
          <div className="flex h-7 items-center gap-2 text-[10px] font-semibold text-zinc-800">
            <BrandLogo src="/brand-logos/attio.svg" alt="Attio" size={22} />
            Attio&apos;s Dashboard
          </div>
          <div className="mt-3 flex h-7 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2 text-[9px] text-zinc-400">
            <Search size={12} />
            Quick Actions
          </div>
          <p className="mb-1 mt-3 text-[8px] text-zinc-400">Pages</p>
          <nav className="space-y-0.5 text-[10px]">
            {[
              [House, "Overview", true],
              [Scan, "Prompts", false],
              [Circle, "Sources", false],
              [Box, "Models", false],
              [Settings, "Settings", false],
            ].map(([Icon, label, active]) => {
              const NavIcon = Icon as typeof House;
              return (
                <div key={label as string} className={`flex h-7 items-center gap-2 rounded-md px-2 ${active ? "bg-[#e9e9e9] font-medium" : ""}`}>
                  <NavIcon size={13} strokeWidth={1.5} />
                  {label as string}
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="ml-[145px] min-w-0">
          <header className="flex h-10 items-center justify-between border-b border-zinc-200 px-2">
            <div className="flex gap-2">
              <Chip><BrandLogo src="/brand-logos/attio.svg" alt="Attio" size={14} /> Attio</Chip>
              <Chip><CalendarDays size={12} /> Last 7 days</Chip>
              <Chip><Tag size={12} /> All tags</Chip>
              <Chip><Layers size={12} /> All Models</Chip>
            </div>
            <div className="flex gap-2">
              <button aria-label="Help" className="grid size-7 place-items-center rounded-full bg-[#f1f1f1] text-zinc-500"><CircleHelp size={13} /></button>
              <button className="inline-flex h-7 items-center gap-2 rounded-md border border-zinc-200 bg-white px-2.5 text-[9px] text-zinc-500"><Download size={12} /> Export</button>
            </div>
          </header>

          <div className="flex h-9 items-center justify-between border-b border-zinc-200 px-3 text-[9px]">
            <span className="inline-flex items-center gap-1.5"><House size={12} /> Overview • Attio&apos;s Visibility trending up by 5.2% this month</span>
            <span className="flex items-center gap-2 text-zinc-400">
              Visibility: <b className="font-medium text-zinc-600">3/14</b> <TrendingDown size={10} className="text-rose-400" />
              • Sentiment: <b className="font-medium text-zinc-600">2/14</b> <ChevronUp size={10} className="text-emerald-500" />
              Position: <b className="font-medium text-zinc-600">5/14</b> <ChevronUp size={10} className="text-emerald-500" />
            </span>
          </div>

          <div className="grid grid-cols-[1.4fr_1fr] gap-1 p-1">
            <section className="h-[218px] overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <div className="flex h-[43px] items-center justify-between px-3">
                <div className="flex items-center gap-3 text-[9px] text-zinc-500">
                  <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 shadow-sm"><Eye size={12} /> Visibility</span>
                  <span className="inline-flex items-center gap-1"><Smile size={12} /> Sentiment</span>
                  <span className="inline-flex items-center gap-1"><Scan size={12} /> Position</span>
                </div>
                <div className="flex rounded-md bg-[#fafafa] p-1 text-zinc-500">
                  <span className="grid size-6 place-items-center rounded-md border border-zinc-200 bg-white shadow-sm"><Waves size={12} /></span>
                  <span className="grid size-6 place-items-center"><BarChart3 size={12} /></span>
                </div>
              </div>
              <Chart />
            </section>
            <CompetitorTable />
            <DomainTable />
            <DonutPanel />
          </div>
        </main>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#f8f8f8]/85 to-[#f8f8f8]" />
      </div>
    </section>
  );
}