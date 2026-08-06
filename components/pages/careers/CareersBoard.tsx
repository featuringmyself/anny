"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { getListedRoles } from "@/components/pages/careers/roles";

export default function CareersBoard() {
  const reduceMotion = useReducedMotion();
  const roles = getListedRoles();

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
            key={item.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="border-b last:border-b-0"
          >
            <Link
              href={`/careers/${item.slug}`}
              className="group flex flex-col gap-1 px-6 py-5 md:grid md:grid-cols-[1fr_auto_auto] md:items-center md:gap-0 md:px-10 md:py-6"
            >
              <span className="text-lg font-medium group-hover:text-[#2462ff] md:text-xl">
                {item.role}
              </span>
              <span className="text-sm text-zinc-500 md:w-48 md:text-right">
                <span className="md:hidden">
                  {item.location} · {item.type}
                </span>
                <span className="hidden md:inline">{item.location}</span>
              </span>
              <span className="hidden w-28 text-right text-sm text-zinc-500 md:inline md:w-36">
                {item.type}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
