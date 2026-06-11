"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";

const navLinks = [
  { href: "/program", label: "Program" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/impact", label: "Impact" },
  { href: "/events", label: "Events" },
  { href: "/governance/shariah", label: "Governance" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAppRoute =
    pathname?.startsWith("/candidate") ||
    pathname?.startsWith("/ambassador") ||
    pathname?.startsWith("/enterprise") ||
    pathname?.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAppRoute) return null;

  return (
    <header className={cn("sticky top-0 z-50 glass-nav", scrolled && "glass-nav-scrolled")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[4.25rem] flex items-center justify-between gap-4">
        <BrandLogo height={44} priority />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:transition-opacity",
                  active
                    ? "nav-link-active after:opacity-100 after:bg-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--navy)] after:opacity-0 hover:after:opacity-50 after:bg-[var(--accent)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" variant="accent">
            <Link href="/auth/login">Sign in</Link>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2.5 rounded-lg text-[var(--navy)] hover:bg-white/60 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-[var(--border-subtle)] px-4 sm:px-6 py-5 flex flex-col gap-3 bg-white/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm py-2 min-h-[44px] flex items-center",
                pathname === link.href
                  ? "text-[var(--accent)] font-semibold"
                  : "text-[var(--text-secondary)]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="accent" className="w-fit mt-2">
            <Link href="/auth/login" onClick={() => setOpen(false)}>
              Sign in
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
