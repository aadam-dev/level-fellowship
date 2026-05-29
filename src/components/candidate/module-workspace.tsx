"use client";

import { useState } from "react";

export function ModuleWorkspace({
  moduleCode,
  contentUrl,
  workbookUrl,
  initialWorkbookSubmitted,
  initialExamScore,
}: {
  moduleCode: string;
  contentUrl: string | null;
  workbookUrl: string | null;
  initialWorkbookSubmitted: boolean;
  initialExamScore: number | null;
}) {
  const [workbookSubmitted, setWorkbookSubmitted] = useState(initialWorkbookSubmitted);
  const [examScore, setExamScore] = useState(initialExamScore?.toString() ?? "");
  const [assignment, setAssignment] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    const res = await fetch("/api/v1/candidate/modules/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module_code: moduleCode,
        workbook_submitted: workbookSubmitted,
        exam_score: examScore ? parseInt(examScore, 10) : null,
        assignment_notes: assignment,
      }),
    });
    if (res.ok) setSaved(true);
  }

  return (
    <div className="bento-card p-6 space-y-6">
      {contentUrl && (
        <a
          href={contentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--frost-blue)] hover:underline"
        >
          Open module content →
        </a>
      )}
      {workbookUrl && (
        <a
          href={workbookUrl}
          download
          className="block text-sm text-[var(--cyan-border)] hover:underline"
        >
          Download workbook PDF
        </a>
      )}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={workbookSubmitted}
          onChange={(e) => setWorkbookSubmitted(e.target.checked)}
        />
        Workbook submitted for verification
      </label>
      <div>
        <label className="text-sm text-slate-400 block mb-1">Exit exam score (0–100)</label>
        <input
          type="number"
          min={0}
          max={100}
          value={examScore}
          onChange={(e) => setExamScore(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
        />
      </div>
      <div>
        <label className="text-sm text-slate-400 block mb-1">Assignment notes</label>
        <textarea
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
          rows={4}
          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
        />
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 rounded-lg bg-[var(--frost-blue)] text-white text-sm"
      >
        Save progress
      </button>
      {saved && (
        <p className="text-sm text-[var(--emerald)]">Progress saved. Verified if score ≥ 70.</p>
      )}
    </div>
  );
}
