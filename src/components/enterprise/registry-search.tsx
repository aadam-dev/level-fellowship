"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type CandidateResult = {
  anonymized_candidate_hash: string;
  chapter_region_node: string;
  composite_curriculum_score: number;
  workbook_status: string;
  modules_passed: string[];
};

const inputClass =
  "bg-white/80 border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-sm text-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

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
      <div className="glass-panel p-6 flex flex-wrap gap-4 items-end">
        <input
          placeholder="Semester track"
          value={semesterTrack}
          onChange={(e) => setSemesterTrack(e.target.value)}
          className={`${inputClass} w-32`}
        />
        <input
          placeholder="Major (e.g. economics)"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className={`${inputClass} flex-1 min-w-[160px]`}
        />
        <input
          placeholder="Min score"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
          className={`${inputClass} w-24`}
        />
        <Button onClick={search} disabled={loading} variant="accent">
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>
      {placementMsg && <p className="text-sm text-[var(--success)]">{placementMsg}</p>}
      <div className="grid gap-4">
        {results.map((c) => (
          <div key={c.anonymized_candidate_hash} className="glass-panel p-6">
            <p className="font-mono text-sm text-[var(--text-muted)]">{c.anonymized_candidate_hash}</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {c.chapter_region_node}. Score {c.composite_curriculum_score}%. {c.workbook_status}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Modules: {c.modules_passed.join(", ")}
            </p>
            <button
              type="button"
              onClick={() => registerPlacement(c.anonymized_candidate_hash)}
              className="mt-3 text-sm text-[var(--accent)] hover:underline font-medium"
            >
              Register placement fee
            </button>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <p className="text-[var(--text-muted)] text-sm">No results. Adjust filters or run seed data.</p>
        )}
      </div>
    </div>
  );
}
