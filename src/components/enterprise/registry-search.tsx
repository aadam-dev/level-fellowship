"use client";

import { useState } from "react";

type CandidateResult = {
  anonymized_candidate_hash: string;
  chapter_region_node: string;
  composite_curriculum_score: number;
  workbook_status: string;
  modules_passed: string[];
};

export function RegistrySearch() {
  const [semesterTrack, setSemesterTrack] = useState("2");
  const [major, setMajor] = useState("");
  const [minScore, setMinScore] = useState("70");
  const [results, setResults] = useState<CandidateResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [placementMsg, setPlacementMsg] = useState("");

  async function search() {
    setLoading(true);
    const params = new URLSearchParams();
    if (semesterTrack) params.set("semester_track", semesterTrack);
    if (major) params.set("major", major);
    if (minScore) params.set("min_score", minScore);
    const res = await fetch(`/api/v1/registry/anonymous-search?${params}`);
    const data = await res.json();
    setResults(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function registerPlacement(hash: string) {
    const salary = prompt("Annualized base salary (USD) for Wakalah placement fee:");
    if (!salary) return;
    const res = await fetch("/api/v1/billing/placement-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        anonymized_candidate_hash: hash,
        annualized_base_salary_usd: parseFloat(salary),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setPlacementMsg(
        `Placement invoice created: $${data.placement_fee_usd} (${data.shariah_protocol})`,
      );
    } else {
      setPlacementMsg(data.error ?? "Placement failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="bento-card p-6 flex flex-wrap gap-4">
        <input
          placeholder="Semester track"
          value={semesterTrack}
          onChange={(e) => setSemesterTrack(e.target.value)}
          className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm w-32"
        />
        <input
          placeholder="Major (e.g. economics)"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm flex-1 min-w-[160px]"
        />
        <input
          placeholder="Min score"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
          className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm w-24"
        />
        <button
          onClick={search}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-[var(--frost-blue)] text-white text-sm"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
      {placementMsg && (
        <p className="text-sm text-[var(--emerald)]">{placementMsg}</p>
      )}
      <div className="grid gap-4">
        {results.map((c) => (
          <div key={c.anonymized_candidate_hash} className="bento-card p-6">
            <p className="font-mono text-[var(--cyan-border)]">{c.anonymized_candidate_hash}</p>
            <p className="text-sm text-slate-400 mt-1">
              {c.chapter_region_node} · Score {c.composite_curriculum_score}% ·{" "}
              {c.workbook_status}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Modules: {c.modules_passed.join(", ")}
            </p>
            <button
              type="button"
              onClick={() => registerPlacement(c.anonymized_candidate_hash)}
              className="mt-3 text-xs text-[var(--frost-blue)] hover:underline"
            >
              Register placement (Wakalah fee) →
            </button>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <p className="text-slate-500 text-sm">No results. Adjust filters or run seed data.</p>
        )}
      </div>
    </div>
  );
}
