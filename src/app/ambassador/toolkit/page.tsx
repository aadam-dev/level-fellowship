import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isAmbassadorApproved } from "@/server/governance/ambassador-vetting";
import { GlassCard } from "@/components/layout/glass-card";

const TOOLKIT_FILES = [
  { name: "Uniform Slide Deck (2hr format)", path: "/toolkit/slides-deck.pdf" },
  { name: "Master Script", path: "/toolkit/master-script.pdf" },
  { name: "Lesson Plan — Semester 1", path: "/toolkit/lesson-plan-s1.pdf" },
  { name: "Grading Worksheet", path: "/toolkit/grading-worksheet.pdf" },
];

export default async function AmbassadorToolkitPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const approved = await isAmbassadorApproved(session.user.id);
  if (!approved) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <GlassCard title="Toolkit locked">
          <p className="text-slate-400 text-sm">
            Complete ambassador vetting to unlock instructional downloads.
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Ambassador Toolkit</h1>
      <div className="space-y-4">
        {TOOLKIT_FILES.map((file) => (
          <GlassCard key={file.path} title={file.name}>
            <a
              href={file.path}
              className="text-sm text-[var(--frost-blue)] hover:underline"
              download
            >
              Download →
            </a>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
