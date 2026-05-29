import Link from "next/link";
import { auth } from "@/auth";
import { roleDashboardPath } from "@/lib/rbac";

export async function SiteHeader() {
  const session = await auth();
  const dashPath = session?.user
    ? roleDashboardPath(session.user.accountRole)
    : null;

  return (
    <header className="border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--ice-white)]">
          Classroom<span className="text-[var(--frost-blue)]">→</span>Industry
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/events" className="text-slate-400 hover:text-white transition-colors">
            Events
          </Link>
          {dashPath ? (
            <Link href={dashPath} className="text-[var(--frost-blue)] hover:underline">
              Dashboard
            </Link>
          ) : (
            <Link href="/auth/login" className="text-slate-400 hover:text-white transition-colors">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
