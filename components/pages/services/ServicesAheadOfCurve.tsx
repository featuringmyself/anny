const HEADING = "#225864";
const BADGE_FG = "#93E85F";
const BODY = "#5c6b73";

export default function ServicesAheadOfCurve() {
  return (
    <section
      className="w-full bg-white rounded-2xl"
      aria-labelledby="services-ahead-heading"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center sm:py-24 lg:py-28">
        <span
          className="inline-flex items-center rounded-full border border-[#225864]/50 px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-[#225864] uppercase sm:text-xs"
        >
          Stay Ahead of the Curve
        </span>

        <h2
          id="services-ahead-heading"
          className="mt-8 max-w-5xl text-[1.65rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[3rem] md:leading-[2.9rem]"
          style={{ color: HEADING }}
        >
          <span className="block text-[#225864]">AI Visibility Agency Expertise + Tool</span>
          <span className="mt-1 block sm:mt-1.5">
            Intelligence ={" "}
            <span
              className="inline-block -translate-y-px rounded-lg px-2.5 py-1 -rotate-2 align-baseline sm:px-2.5 sm:py-2"
              style={{ backgroundColor: HEADING, color: BADGE_FG }}
            >
              Anny
            </span>
          </span>
        </h2>

        <div
          className="mt-10 max-w-4xl space-y-5 text-base leading-normal font-medium  sm:mt-12 sm:text-lg sm:leading-normal tracking-tight"
          style={{ color: BODY }}
        >
          <p>
            We began with a simple idea: growth shouldn&apos;t be complicated.
            Most businesses choose between hiring an agency for strategy or using
            a tool for data. With Anny, you don&apos;t have to. We bring
            together the expertise of an agency and the precision of AI
            technology, delivering smarter insights, stronger visibility, and a
            future-proof digital strategy in one place.
          </p>
          <p>
            While others focus only on Google optimization, we&apos;re already
            helping clients get referenced and recommended by AI search platforms
            like ChatGPT and Google AI Overview. The result? Businesses working
            with Anny grow 47% faster, not because we keep up with change, but
            because we stay ahead of it.
          </p>
        </div>
      </div>
    </section>
  );
}
