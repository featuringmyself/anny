import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";

import logoImg from "@/public/logo.png";
import { SITE_LINKEDIN_URL, SITE_X_URL } from "@/lib/site";

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
      { label: "Domain Rating checker", href: "/tools/domain-rating-checker" },
      { label: "AI readiness checker", href: "/tools/ai-readiness-checker" },
    ],
  },
] as const;

const socials = [
  { label: "x.com", href: SITE_X_URL, icon: <FaXTwitter className="size-3.5" aria-hidden /> },
  {
    label: "LinkedIn",
    href: SITE_LINKEDIN_URL,
    icon: <FaLinkedinIn className="size-3.5" aria-hidden />,
  },
  {
    label: "Youtube",
    href: "https://youtube.com",
    icon: <FaYoutube className="size-3.5" aria-hidden />,
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
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-8 py-16 md:px-12 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Brand */}
          <div className="shrink-0 lg:w-52">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-medium tracking-tight"
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
            <p className="mt-4 max-w-44 text-sm leading-snug text-zinc-400">
              AI search analytics for marketing teams
            </p>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-medium text-white">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300 leading-tighter tracking-tight"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* <div>
              <h3 className="text-sm font-medium text-white">Follow Us</h3>
              <ul className="mt-4 space-y-2.5">
                {socials.map((social) => (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      {social.icon}
                      {social.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-8 py-6 md:flex-row md:items-center md:justify-between md:px-12">
          <div className="space-y-1 text-xs text-zinc-500">
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
                className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
