"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full bg-white/80 border border-[var(--border-subtle)] rounded-lg px-4 py-2.5 text-sm text-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

export function ScanForm() {
  const [eventId, setEventId] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/v1/chapters/events/attendance-checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        target_event_id: parseInt(eventId, 10),
        attendee_identifier_email: email,
        verification_method: token,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Check-in failed");
      return;
    }
    setResult(data);
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-4 max-w-lg">
      <h2 className="text-lg font-semibold text-[var(--navy)]">Attendance check-in</h2>
      <input
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className={inputClass}
        required
      />
      <input
        type="email"
        placeholder="Attendee email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        required
      />
      <input
        placeholder="QR scan token (e.g. qr_scan_token_0001A)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className={inputClass}
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result && (
        <pre className="text-xs text-[var(--success)] bg-slate-50 border border-[var(--border-subtle)] p-3 rounded-lg overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      <Button type="submit" variant="accent" className="w-full">
        Confirm present
      </Button>
    </form>
  );
}
