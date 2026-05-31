import Link from "next/link";
import { footerColumns, siteMeta } from "@/content/site";
import { BrandLogo } from "@/components/layout/brand-logo";
import { PoweredByAadam } from "@/components/layout/powered-by-aadam";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-surface mt-auto relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-12">
          <div className="max-w-xs">
            <BrandLogo height={44} />
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              {siteMeta.tagline}. {siteMeta.founded} for UK university chapters.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 flex-1 max-w-2xl">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-[var(--navy)] mb-4">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
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

        <div className="section-rule" />

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-2 text-sm text-[var(--text-muted)]">
            <p>
              © {year} {siteMeta.brand}. All rights reserved.
            </p>
            <p>{siteMeta.region}</p>
          </div>
          <PoweredByAadam />
        </div>
        <p className="mt-4 text-xs text-[var(--text-muted)] leading-relaxed max-w-2xl">
          Islamic finance career pathways for UK and European campuses. Governance disclosures for
          partners on the platform.
        </p>
      </div>
    </footer>
  );
}
