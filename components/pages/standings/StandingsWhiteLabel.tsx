import { brand } from "@/components/Home/brand";

export default function StandingsWhiteLabel() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="standings-wl-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-10 md:grid-cols-2 md:items-center md:gap-10 md:py-20">
        <div>
          <p
            className="text-xs font-bold tracking-[0.1em] uppercase"
            style={{ color: brand.lime }}
          >
            Fully white-label
          </p>
          <h2
            id="standings-wl-heading"
            className="mt-2 text-[1.5rem] font-bold tracking-tight text-white sm:mt-3 sm:text-4xl"
          >
            Your brand on every page of the deliverable
          </h2>
          <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-neutral-200/90 sm:mt-4 sm:text-base">
            Logo, colors, and agency name on the PDF and share link. Clients
            never see another product on the report, and you keep the
            relationship on the invoice.
          </p>
        </div>

        <ul className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-1 lg:grid-cols-3">
          {[
            { label: "Reports", detail: "Your logo" },
            { label: "Share link", detail: "Your name" },
            { label: "Invoice", detail: "Yours only" },
          ].map((item) => (
            <li
              key={item.label}
              className="rounded-xl px-2.5 py-3 ring-1 ring-white/12 sm:px-4 sm:py-4"
              style={{ backgroundColor: "#0c242b" }}
            >
              <p className="text-[10px] font-semibold tracking-wide text-white/40 uppercase sm:text-[11px]">
                {item.label}
              </p>
              <p
                className="mt-0.5 text-sm font-bold sm:mt-1 sm:text-base"
                style={{ color: brand.lime }}
              >
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
