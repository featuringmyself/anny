"use client";

import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

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
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/docs", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/careers", label: "Careers" },
] as const;

const TOP_REVEAL_PX = 8;
const DIRECTION_DELTA_PX = 8;

/** Hide on scroll down, reveal on scroll up. Respects prefers-reduced-motion. */
function useScrollHide() {
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);
  const frameRef = useRef(0);

  const applyScroll = useEffectEvent((y: number) => {
    const delta = y - lastYRef.current;
    lastYRef.current = y;

    let next = hiddenRef.current;
    if (y <= TOP_REVEAL_PX) next = false;
    else if (delta > DIRECTION_DELTA_PX) next = true;
    else if (delta < -DIRECTION_DELTA_PX) next = false;

    if (next === hiddenRef.current) return;
    hiddenRef.current = next;
    startTransition(() => setHidden(next));
  });

  const reveal = useEffectEvent(() => {
    if (!hiddenRef.current) return;
    hiddenRef.current = false;
    startTransition(() => setHidden(false));
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onScroll = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        applyScroll(window.scrollY);
      });
    };

    const syncMotionPreference = () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameRef.current);

      if (motionQuery.matches) {
        reveal();
        return;
      }

      lastYRef.current = window.scrollY;
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    syncMotionPreference();
    motionQuery.addEventListener("change", syncMotionPreference);

    return () => {
      motionQuery.removeEventListener("change", syncMotionPreference);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return hidden;
}

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrollHidden = useScrollHide();
  const hidden = scrollHidden && !open;

  return (
    <nav
      data-hidden={hidden ? "" : undefined}
      className={cn(
        "sticky top-0 z-50 border-b bg-background translate-y-0",
        "transition-transform duration-300 ease-out motion-reduce:transition-none",
        "data-hidden:-translate-y-full data-hidden:focus-within:translate-y-0",
      )}
    >
      <div className="flex items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-medium tracking-tight"
        >
          <Image
            src={logoImg}
            alt="Anny"
            width={30}
            height={30}
            preload
          />
          <span>Anny</span>
        </Link>

        <div className="hidden items-center gap-12 text-sm font-medium md:flex">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors hover:text-zinc-900",
                  active ? "text-zinc-900" : "text-zinc-500",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Button className="px-3" render={<Link href="/register" />}>
            Register
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
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
            <div className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted hover:text-zinc-900",
                          active ? "bg-muted text-zinc-900" : "text-zinc-700",
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                );
              })}
            </div>
            <SheetFooter>
              <Button
                className="w-full"
                size="lg"
                render={<Link href="/register" />}
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
