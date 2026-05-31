import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isAmbassadorApproved } from "@/server/governance/ambassador-vetting";
import { GlassCard } from "@/components/layout/glass-card";

const TOOLKIT_FILES = [
  { name: "Uniform Slide Deck (2hr format)", path: "/toolkit/slides-deck.pdf" },
  { name: "Master Script", path: "/toolkit/master-script.pdf" },
  { name: "Lesson Plan, Semester 1", path: "/toolkit/lesson-plan-s1.pdf" },
  { name: "Grading Worksheet", path: "/toolkit/grading-worksheet.pdf" },
];

export default async function AmbassadorToolkitPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const approved = await isAmbassadorApproved(session.user.id);
  if (!approved) {
    return (
      <GlassCard title="Toolkit locked">
        <p className="text-sm text-[var(--text-muted)]">
          Complete ambassador vetting to unlock instructional downloads.
        </p>
      </GlassCard>
    );
  }

  return (
    <div>
      <p className="section-label">Toolkit</p>
      <h1 className="headline text-3xl mt-2 mb-8">Instructor assets</h1>
      <div className="space-y-4">
        {TOOLKIT_FILES.map((file) => (
          <GlassCard key={file.path} title={file.name}>
            <a
              href={file.path}
              className="text-sm text-[var(--accent)] hover:underline"
              download
            >
              Download file
            </a>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
