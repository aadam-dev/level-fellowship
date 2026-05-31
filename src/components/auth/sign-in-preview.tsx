import Link from "next/link";
import { signInPreview } from "@/content/platform";
import { siteMeta } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Mail } from "lucide-react";

export function SignInPreview() {
  return (
    <div className="legal-panel w-full max-w-md p-8 space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
          Preview site
        </p>
        <h1 className="text-xl font-semibold text-[var(--navy)] mt-2">{signInPreview.title}</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          {signInPreview.lede}
        </p>
      </div>

      <ul className="space-y-3">
        {signInPreview.bullets.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-[var(--text-secondary)]">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            {item}
          </li>
        ))}
      </ul>

      <div className="btn-group pt-2">
        <Button asChild variant="accent" className="justify-center">
          <Link href="/events">
            <Calendar className="w-4 h-4" />
            {signInPreview.ctaEvents}
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-center">
          <Link href="/program">
            <BookOpen className="w-4 h-4" />
            {signInPreview.ctaProgram}
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-center">
          <Link href={`mailto:${siteMeta.contactEmail}`}>
            <Mail className="w-4 h-4" />
            {signInPreview.ctaContact}
          </Link>
        </Button>
      </div>
    </div>
  );
}
