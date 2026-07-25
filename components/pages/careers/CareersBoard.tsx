"use client";

import { motion, useReducedMotion } from "motion/react";

const roles = [
  {
    role: "Founding Engineer",
    location: "Remote",
    type: "Full-time",
  },
  {
    role: "Product Designer",
    location: "Remote / NYC",
    type: "Full-time",
  },
  {
    role: "Growth Marketing",
    location: "Remote",
    type: "Full-time",
  },
  {
    role: "Customer Success Lead",
    location: "Remote",
    type: "Full-time",
  },
] as const;

export default function CareersBoard() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="open-roles" className="border-y">
      <div className="hidden grid-cols-[1fr_auto_auto] border-b px-6 py-4 text-xs font-medium tracking-wide text-zinc-400 uppercase md:grid md:px-10">
        <span>Role</span>
        <span className="w-36 text-right md:w-48">Location</span>
        <span className="w-28 text-right md:w-36">Type</span>
      </div>
      <div className="border-b px-6 py-4 text-xs font-medium tracking-wide text-zinc-400 uppercase md:hidden">
        Open roles
      </div>
      <ul>
        {roles.map((item, index) => (
          <motion.li
            key={item.role}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="flex flex-col gap-1 border-b px-6 py-5 last:border-b-0 md:grid md:grid-cols-[1fr_auto_auto] md:items-center md:gap-0 md:px-10 md:py-6"
          >
            <span className="text-lg font-medium md:text-xl">{item.role}</span>
            <span className="text-sm text-zinc-500 md:w-48 md:text-right">
              <span className="md:hidden">{item.location} · {item.type}</span>
              <span className="hidden md:inline">{item.location}</span>
            </span>
            <span className="hidden w-28 text-right text-sm text-zinc-500 md:inline md:w-36">
              {item.type}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
