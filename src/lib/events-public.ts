import { listUpcomingEvents } from "@/server/events/attendance";
import { previewWorkshops } from "@/content/platform";
import { getPlatformMode } from "@/lib/platform-readiness";

export type PublicEvent = {
  key: string;
  numericId?: number;
  title: string;
  universityName: string;
  startsAt: string;
  description?: string;
  isOpenAccess: boolean;
};

export type EventsPageData = {
  mode: "live" | "interest";
  events: PublicEvent[];
};

export async function getEventsPageData(): Promise<EventsPageData> {
  const platformMode = await getPlatformMode();

  if (platformMode === "preview") {
    return {
      mode: "interest",
      events: previewWorkshops.map((e) => ({
        key: e.id,
        title: e.title,
        universityName: e.universityName,
        startsAt: e.startsAt,
        description: e.description,
        isOpenAccess: e.isOpenAccess,
      })),
    };
  }

  try {
    const rows = await listUpcomingEvents();
    if (rows.length === 0) {
      return {
        mode: "interest",
        events: previewWorkshops.map((e) => ({
          key: e.id,
          title: e.title,
          universityName: e.universityName,
          startsAt: e.startsAt,
          description: e.description,
          isOpenAccess: e.isOpenAccess,
        })),
      };
    }

    return {
      mode: "live",
      events: rows.map((e) => ({
        key: String(e.id),
        numericId: e.id,
        title: e.title,
        universityName: e.chapter.universityName,
        startsAt: e.startsAt.toISOString(),
        description: e.description ?? undefined,
        isOpenAccess: e.isOpenAccess,
      })),
    };
  } catch {
    return {
      mode: "interest",
      events: previewWorkshops.map((e) => ({
        key: e.id,
        title: e.title,
        universityName: e.universityName,
        startsAt: e.startsAt,
        description: e.description,
        isOpenAccess: e.isOpenAccess,
      })),
    };
  }
}
