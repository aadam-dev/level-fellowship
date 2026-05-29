"use client";

import { useState } from "react";

type EventItem = {
  id: number;
  title: string;
  startsAt: string;
  chapter: { universityName: string };
};

export function EventRegistrationForm({ events }: { events: EventItem[] }) {
  const [selectedId, setSelectedId] = useState(events[0]?.id ?? 0);
  const [email, setEmail] = useState("");
  const [enrollmentClass, setEnrollmentClass] = useState("non_student_aspirant");
  const [result, setResult] = useState<{ scan_token: string; qr_token: string } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: selectedId,
          email,
          enrollment_class: enrollmentClass,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Registration failed");
      setResult({ scan_token: data.scan_token, qr_token: data.qr_token });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="bento-card p-6 space-y-4">
        <h3 className="text-lg font-semibold tracking-tight text-[var(--emerald)]">
          Registration confirmed
        </h3>
        <p className="text-sm text-slate-400">Present this token at check-in:</p>
        <code className="block p-4 bg-black/30 rounded text-[var(--cyan-border)] text-sm break-all">
          {result.scan_token}
        </code>
        <p className="text-xs text-slate-500">QR payload stored securely for ambassador scan.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bento-card p-6 space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">Reserve your seat</h3>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(Number(e.target.value))}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
      >
        {events.map((ev) => (
          <option key={ev.id} value={ev.id}>
            {ev.title} — {ev.chapter.universityName}
          </option>
        ))}
      </select>
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
      />
      <select
        value={enrollmentClass}
        onChange={(e) => setEnrollmentClass(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
      >
        <option value="non_student_aspirant">Community / Professional</option>
        <option value="university_student">University Student</option>
      </select>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading || events.length === 0}
        className="w-full py-2 rounded-lg bg-[var(--frost-blue)] text-white text-sm font-medium disabled:opacity-50"
      >
        {loading ? "Registering…" : "Generate entry token"}
      </button>
    </form>
  );
}
