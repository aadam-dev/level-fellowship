export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export default async function AdminChaptersPage() {
  const chapters = await prisma.chapter.findMany({
    orderBy: { universityName: "asc" },
    include: { _count: { select: { candidates: true, events: true } } },
  });

  return (
    <div>
      <p className="section-label">Chapters</p>
      <h1 className="headline text-3xl mt-2">Campus nodes</h1>

      <div className="mt-8 glass-panel overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/60 text-left text-[var(--text-muted)] text-xs uppercase">
            <tr>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Candidates</th>
              <th className="px-4 py-3">Events</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((ch) => (
              <tr key={ch.id} className="border-t border-[var(--border-subtle)]">
                <td className="px-4 py-3 font-medium">{ch.universityName}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{ch.societyType}</Badge>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{ch.regionNode}</td>
                <td className="px-4 py-3 tabular-nums">{ch._count.candidates}</td>
                <td className="px-4 py-3 tabular-nums">{ch._count.events}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
