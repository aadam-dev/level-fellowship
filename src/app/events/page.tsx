export const dynamic = "force-dynamic";

import { listUpcomingEvents } from "@/server/events/attendance";
import { BentoGrid } from "@/components/layout/bento-grid";
import { GlassCard } from "@/components/layout/glass-card";
import { EventRegistrationForm } from "@/components/events/event-registration-form";

export default async function EventsPage() {
  const events = await listUpcomingEvents();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Open-Access Events</h1>
      <p className="text-slate-400 mb-8 max-w-2xl">
        Browse upcoming campus workshops. Registration accepts university students and
        non-student aspirants — no account required.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        <BentoGrid className="lg:col-span-1">
          {events.length === 0 ? (
            <GlassCard>
              <p className="text-slate-400 text-sm">No upcoming events scheduled.</p>
            </GlassCard>
          ) : (
            events.map((ev) => (
              <GlassCard key={ev.id} title={ev.title} subtitle={ev.chapter.universityName}>
                <p className="text-sm text-slate-400">
                  {new Date(ev.startsAt).toLocaleString()}
                </p>
                {ev.description && (
                  <p className="text-sm text-slate-300 mt-2">{ev.description}</p>
                )}
              </GlassCard>
            ))
          )}
        </BentoGrid>
        <EventRegistrationForm
          events={events.map((e) => ({
            id: e.id,
            title: e.title,
            startsAt: e.startsAt.toISOString(),
            chapter: { universityName: e.chapter.universityName },
          }))}
        />
      </div>
    </div>
  );
}
