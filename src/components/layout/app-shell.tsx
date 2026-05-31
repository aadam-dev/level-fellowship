"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { AccountRole } from "@prisma/client";
import { roleDashboardPath } from "@/lib/role-paths";
import { BrandLogo } from "@/components/layout/brand-logo";

type NavItem = { href: string; label: string };

const navByRole: Record<AccountRole, NavItem[]> = {
  candidate: [
    { href: "/candidate/dashboard", label: "Dashboard" },
    { href: "/events", label: "Events" },
  ],
  ambassador: [
    { href: "/ambassador/dashboard", label: "Chapter ops" },
    { href: "/ambassador/toolkit", label: "Toolkit" },
    { href: "/ambassador/scan", label: "Attendance" },
  ],
  enterprise: [
    { href: "/enterprise/dashboard", label: "Overview" },
    { href: "/enterprise/registry", label: "Registry" },
    { href: "/enterprise/billing", label: "Billing" },
  ],
  sys_admin: [
    { href: "/admin/dashboard", label: "Command center" },
    { href: "/admin/chapters", label: "Chapters" },
    { href: "/admin/vetting", label: "Vetting" },
    { href: "/admin/ledger", label: "Ledger" },
  ],
};

export function AppShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role: AccountRole;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const nav = navByRole[role];
  const displayName = session?.user?.displayName ?? session?.user?.email;
  const teamTitle = session?.user?.teamTitle;

  return (
    <div className="min-h-screen flex bg-[var(--bg-base)] page-bg">
      <aside className="hidden lg:flex w-56 flex-col border-r border-[var(--border-subtle)] glass-nav">
        <div className="p-5 border-b border-[var(--border-subtle)]">
          <BrandLogo height={32} />
          <p className="text-xs text-[var(--text-muted)] mt-1 capitalize">
            {role.replace("_", " ")}
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-[var(--accent-muted)] text-[var(--accent)] font-medium"
                  : "text-[var(--text-secondary)] hover:bg-white/60 hover:text-[var(--navy)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--navy)]"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 glass-nav flex items-center justify-between px-6">
          <div className="lg:hidden">
            <BrandLogo href={roleDashboardPath(role)} height={28} />
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-medium text-[var(--navy)]">{displayName}</p>
            {teamTitle && (
              <p className="text-xs text-[var(--text-muted)]">{teamTitle}</p>
            )}
          </div>
        </header>
        <div className="lg:hidden border-b border-[var(--border-subtle)] overflow-x-auto bg-white/50">
          <nav className="flex gap-1 p-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs whitespace-nowrap",
                  pathname.startsWith(item.href)
                    ? "bg-[var(--accent-muted)] text-[var(--accent)]"
                    : "text-[var(--text-muted)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-1 p-6 md:p-8 max-w-6xl w-full">{children}</div>
      </div>
    </div>
  );
}
