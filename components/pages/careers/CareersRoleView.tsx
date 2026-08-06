import CareersApplyForm from "@/components/pages/careers/CareersApplyForm";
import type { CareerRole } from "@/components/pages/careers/roles";
import PatternStrip from "@/components/PatternStrip";
import { Button } from "@/components/ui/button";

export default function CareersRoleView({ role }: { role: CareerRole }) {
  return (
    <article>
      <header className="border-b px-6 py-14 md:px-12 md:py-16">
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          {role.team}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight text-balance md:text-5xl">
          {role.role}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-500 text-balance">
          {role.summary}
        </p>
        <p className="mt-6 text-sm text-zinc-400">
          {role.location} · {role.type}
        </p>
        <div className="mt-8">
          <Button size="lg" className="px-5" render={<a href="#apply" />}>
            Apply for this role
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 border-b md:grid-cols-2">
        <div className="border-b p-8 md:border-r md:border-b-0 md:p-12">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            About the role
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-500">
            {role.about}
          </p>
        </div>
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            What you&apos;ll do
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-500">
            {role.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="border-b px-6 py-12 md:px-12 md:py-16">
        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
          Nice to have
        </h2>
        <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-500">
          {role.niceToHaves.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <PatternStrip />

      <section
        id="apply"
        className="grid grid-cols-1 border-b md:grid-cols-2"
      >
        <div className="border-b bg-zinc-50/80 p-8 md:border-r md:border-b-0 md:p-12">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            How we hire
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-500">
            Short intro call, a scoped work sample or walkthrough of something
            you&apos;ve shipped, then a conversation with the team. We move
            quickly and keep the process lightweight.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-500">
            Prefer email? Reach us at{" "}
            <a
              href="mailto:careers@dodoxhq.com"
              className="font-medium text-zinc-800 underline underline-offset-2 hover:text-[#2462ff]"
            >
              careers@dodoxhq.com
            </a>
            .
          </p>
        </div>
        <div className="p-8 md:p-12">
          <CareersApplyForm roleTitle={role.role} roleSlug={role.slug} />
        </div>
      </section>
    </article>
  );
}
