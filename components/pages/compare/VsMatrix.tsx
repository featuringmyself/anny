import { brand } from "@/components/Home/brand";

export type MatrixCell = "yes" | "partial" | "no" | string;

export type MatrixRow = {
  capability: string;
  dodox: MatrixCell;
  competitor: MatrixCell;
};

type VsMatrixProps = {
  competitor: string;
  rows: readonly MatrixRow[];
};

function Cell({ value }: { value: MatrixCell }) {
  if (value === "yes") {
    return (
      <span className="font-bold" style={{ color: brand.tertiary }}>
        Yes
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="font-semibold" style={{ color: brand.body }}>
        Partial
      </span>
    );
  }
  if (value === "no") {
    return <span className="font-medium text-zinc-400">No</span>;
  }
  return (
    <span className="text-sm font-medium" style={{ color: brand.bodyStrong }}>
      {value}
    </span>
  );
}

export default function VsMatrix({ competitor, rows }: VsMatrixProps) {
  return (
    <section
      className="w-full rounded-2xl bg-white"
      aria-labelledby="compare-matrix-heading"
    >
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-20">
        <h2
          id="compare-matrix-heading"
          className="text-[1.75rem] leading-tight font-bold tracking-tight sm:text-3xl"
          style={{ color: brand.tertiary }}
        >
          Capability matrix
        </h2>
        <p
          className="mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed sm:text-lg"
          style={{ color: brand.body }}
        >
          Side-by-side on GEO, citations, and model coverage.
        </p>
      </div>

      <div className="mx-auto max-w-5xl overflow-x-auto overscroll-x-contain px-4 pt-10 pb-16 sm:px-6 sm:pb-20">
        <div className="min-w-[36rem] overflow-hidden rounded-2xl border border-zinc-900/10">
          <div
            className="grid grid-cols-[1.4fr_1fr_1fr] px-4 py-4 text-[11px] font-bold tracking-[0.08em] uppercase md:px-6"
            style={{ backgroundColor: brand.cream, color: brand.tertiary }}
          >
            <span
              className="sticky left-0 pr-4"
              style={{ backgroundColor: brand.cream }}
            >
              Capability
            </span>
            <span className="text-center">Dodox</span>
            <span className="text-center">{competitor}</span>
          </div>
          <ul>
            {rows.map((row, index) => (
              <li
                key={row.capability}
                className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-t border-zinc-900/10 px-4 py-5 md:px-6"
                style={{
                  backgroundColor: index % 2 === 0 ? "#fff" : brand.sticker,
                }}
              >
                <span
                  className="sticky left-0 pr-4 text-sm font-bold tracking-tight text-zinc-900 sm:text-base"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : brand.sticker,
                  }}
                >
                  {row.capability}
                </span>
                <span className="text-center text-sm sm:text-base">
                  <Cell value={row.dodox} />
                </span>
                <span className="text-center text-sm sm:text-base">
                  <Cell value={row.competitor} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
