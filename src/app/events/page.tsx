export const dynamic = "force-dynamic";

import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { EventsWorkshopSection } from "@/components/events/events-workshop-section";
import { getEventsPageData } from "@/lib/events-public";
import { pageIntros } from "@/content/site";
import { Button } from "@/components/ui/button";

export default async function EventsPage() {
  const data = await getEventsPageData();

  return (
    <>
      <PageHero
        label="Events"
        title={pageIntros.events.title}
        lede={pageIntros.events.lede}
        breadcrumb={{ href: "/" }}
        image="workshop"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <EventsWorkshopSection data={data} />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Campus members with accounts can sign in for the full curriculum track.
        </p>
        <Button asChild variant="outline" className="mt-4 justify-center">
          <Link href="/auth/login">Sign in to your workspace</Link>
        </Button>
      </section>
    </>
  );
}
