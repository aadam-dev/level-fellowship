"use client";

import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="bento-card p-6 space-y-4 max-w-lg">
      <h2 className="text-lg font-semibold tracking-tight">Attendance check-in</h2>
      <input
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
        required
      />
      <input
        type="email"
        placeholder="Attendee email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
        required
      />
      <input
        placeholder="QR scan token (e.g. qr_scan_token_0001A)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
        required
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      {result && (
        <pre className="text-xs text-[var(--emerald)] bg-black/30 p-3 rounded overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-[var(--emerald)] text-white text-sm font-medium"
      >
        Confirm present
      </button>
    </form>
  );
}
