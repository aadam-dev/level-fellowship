import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";
import { legalMeta, legalNav } from "@/content/legal";
import { siteMeta } from "@/content/site";

type Section = { heading: string; paragraphs: string[] };

export function LegalPageLayout({
  title,
  lede,
  sections,
  currentPath,
  children,
}: {
  title: string;
  lede: string;
  sections: Section[];
  currentPath: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        label="Legal"
        title={title}
        lede={lede}
        breadcrumb={{ href: "/" }}
        showImage={false}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-6 border-b border-[var(--border-subtle)] text-sm text-[var(--text-muted)]">
          <p>
            <span className="font-medium text-[var(--navy)]">Last updated:</span> {legalMeta.lastUpdated}
          </p>
          <p>
            <span className="font-medium text-[var(--navy)]">Contact:</span>{" "}
            <a
              href={`mailto:${legalMeta.contactEmail}`}
              className="text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium"
            >
              {legalMeta.contactEmail}
            </a>
          </p>
        </div>

        <article className="legal-prose mt-10">
          {sections.map((section) => (
            <section key={section.heading} className="legal-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </section>
          ))}
          {children}
        </article>

        <footer className="mt-14 pt-8 border-t border-[var(--border-subtle)]">
          <p className="text-sm font-medium text-[var(--navy)] mb-4">Other legal documents</p>
          <div className="btn-group">
            {legalNav.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={currentPath === item.href ? "accent" : "outline"}
                size="default"
                className="justify-center"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <Button asChild variant="outline" size="default" className="justify-center">
              <Link href="/">Return home</Link>
            </Button>
          </div>
          <p className="mt-8 text-xs text-[var(--text-muted)] leading-relaxed">
            {siteMeta.brand} operates under the laws of {legalMeta.jurisdiction}. This page is provided
            for information and does not constitute legal advice.
          </p>
        </footer>
      </div>
    </>
  );
}
