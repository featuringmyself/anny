"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import logoImg from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/docs", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/careers", label: "Careers" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-medium tracking-tight"
        >
          <Image src={logoImg} alt="Anny" width={30} height={30} />
          <span>Anny</span>
        </Link>

        <div className="hidden items-center gap-12 text-sm font-medium text-zinc-500 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Button
            className="px-3"
            onClick={() => {
              router.push("/register");
            }}
          >
            Register
          </Button>
        </div>

        <Sheet
          open={open}
          onOpenChange={setOpen}
          onOpenChangeComplete={(sheetOpen) => {
            if (!sheetOpen) {
              router.push("/register");
            }
          }}
        >
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,20rem)] gap-0">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-muted hover:text-zinc-900"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <SheetFooter>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  router.push("/register");
                }}
              >
                Register
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
