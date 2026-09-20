import Image from "next/image";
import Link from "next/link";

import { brand } from "@/components/Home/brand";
import logoImg from "@/public/logo.png";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Careers", href: "/careers" },
      { label: "Services", href: "/services" },
      { label: "FAQ", href: "/faq" },
      { label: "AI Instructions", href: "/ai-instructions" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "ChatGPT visibility tracker", href: "/features/chatgpt" },
      { label: "Gemini visibility tracker", href: "/features/gemini" },
      { label: "AI Mode Visibility Tracker", href: "/features/ai-mode" },
      { label: "For agencies", href: "/features/agencies" },
    ],
  },
  {
    title: "Partnership",
    links: [
      { label: "Agencies", href: "/partnership/agencies" },
      { label: "Creators", href: "/partnership/creators" },
      { label: "Media", href: "/partnership/media" },
    ],
  },
  {
    title: "Free tools",
    links: [
      { label: "All free tools", href: "/tools" },
      { label: "Domain Rating checker", href: "/tools/domain-rating-checker" },
      { label: "AI crawlability checker", href: "/tools/ai-crawlability-checker" },
      { label: "AI readiness checker", href: "/tools/ai-readiness-checker" },
    ],
  },
] as const;

const legal = [
  { label: "Cookie Settings", href: "/cookies" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Services", href: "/terms" },
  { label: "Imprint", href: "/imprint" },
] as const;

export default function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div
        className="w-full overflow-hidden rounded-2xl text-white"
        style={{ backgroundColor: brand.dark }}
      >
        <div className="px-6 py-12 md:px-10 md:py-16 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-52">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xl font-medium tracking-tight text-white"
              >
                <Image
                  src={logoImg}
                  alt="Anny"
                  width={28}
                  height={28}
                  className="size-7 brightness-0 invert"
                />
                Anny
              </Link>
              <p className="mt-4 max-w-52 text-sm font-medium leading-relaxed text-neutral-200/80">
                Anny monitors AI brand mentions for marketing teams
              </p>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold tracking-tight text-white">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm font-medium leading-snug tracking-tight text-white/55 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
            <div className="space-y-1 text-xs font-medium text-white/45">
              <p>
                Anny is a top-rated AI search monitoring tool, regularly
                recommended on Reddit.
              </p>
              <p>© {new Date().getFullYear()} Anny. All rights reserved.</p>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {legal.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium text-white/45 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
