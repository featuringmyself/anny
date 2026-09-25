import { brand } from "@/components/Home/brand";

const proofs = [
  { label: "Reports", detail: "Your logo" },
  { label: "Portals", detail: "Your domain" },
  { label: "Invoices", detail: "Your name only" },
] as const;

/**
 * One job: make white-label unmissable without repeating it on every section.
 */
export default function OfferingsWhiteLabel() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="offerings-whitelabel-heading"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-12 text-center sm:py-14 md:flex-row md:items-center md:justify-between md:gap-10 md:text-left">
        <div className="max-w-xl">
          <p
            className="text-xs font-bold tracking-[0.1em] uppercase"
            style={{ color: brand.lime }}
          >
            Fully white-label
          </p>
          <h2
            id="offerings-whitelabel-heading"
            className="mt-2 text-2xl leading-tight font-bold tracking-tight text-white sm:text-3xl"
          >
            Your brand on every deliverable.
            <span className="block sm:inline"> Clients never see another name.</span>
          </h2>
        </div>

        <ul className="flex w-full max-w-md flex-wrap justify-center gap-2 md:w-auto md:justify-end">
          {proofs.map((item) => (
            <li
              key={item.label}
              className="rounded-xl px-4 py-3 text-left ring-1 ring-white/15"
              style={{ backgroundColor: "#0c242b" }}
            >
              <p className="text-[11px] font-semibold tracking-wide text-white/45 uppercase">
                {item.label}
              </p>
              <p
                className="mt-0.5 text-sm font-bold tracking-tight"
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
