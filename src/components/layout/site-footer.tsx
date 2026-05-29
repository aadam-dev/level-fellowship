import Link from "next/link";

const links = [
  { href: "/legal/privacy", label: "Privacy & Security" },
  { href: "/legal/terms", label: "Terms of Use" },
  { href: "/governance/shariah", label: "Shariah Compliance" },
  { href: "/legal/cookies", label: "Cookie Preferences" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 tracking-tight">
          From Classroom to Industry — Roots Academy Partnership Platform
        </p>
        <nav className="flex flex-wrap gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-[var(--frost-blue)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
