import Image from "next/image";
import Link from "next/link";

import logoImg from "@/public/logo.png";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Careers", href: "/careers" },
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
] as const;

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.227-8.451L1.502 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186 31.247 31.247 0 000 12.017c0 1.992.184 3.937.502 5.831a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136A31.247 31.247 0 0024 12.017a31.247 31.247 0 00-.502-5.831zM9.545 15.568V8.466l6.273 3.551-6.273 3.551z" />
    </svg>
  );
}

const socials = [
  { label: "x.com", href: "https://x.com", icon: <XIcon /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <LinkedInIcon /> },
  { label: "Youtube", href: "https://youtube.com", icon: <YoutubeIcon /> },
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
                alt=""
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
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-medium text-white">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
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
              Anny is a top-rated AI search monitoring tool — regularly
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
