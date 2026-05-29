"use client";

import { useState } from "react";

function readPrefs() {
  if (typeof window === "undefined") {
    return { analytics: false, functional: true };
  }
  const stored = localStorage.getItem("cookie_prefs");
  if (!stored) return { analytics: false, functional: true };
  const prefs = JSON.parse(stored);
  return {
    analytics: prefs.analytics ?? false,
    functional: prefs.functional ?? true,
  };
}

export function CookiePreferences() {
  const [analytics, setAnalytics] = useState(() => readPrefs().analytics);
  const [functional] = useState(() => readPrefs().functional);
  const [saved, setSaved] = useState(false);

  function save() {
    localStorage.setItem(
      "cookie_prefs",
      JSON.stringify({ analytics, functional }),
    );
    setSaved(true);
  }

  return (
    <div className="bento-card p-6 space-y-4">
      <label className="flex items-center justify-between text-sm">
        <span>Functional cookies (required)</span>
        <input type="checkbox" checked={functional} disabled />
      </label>
      <label className="flex items-center justify-between text-sm">
        <span>Analytics cookies</span>
        <input
          type="checkbox"
          checked={analytics}
          onChange={(e) => setAnalytics(e.target.checked)}
        />
      </label>
      <button
        onClick={save}
        className="px-4 py-2 rounded-lg bg-[var(--frost-blue)] text-white text-sm"
      >
        Save preferences
      </button>
      {saved && <p className="text-sm text-[var(--emerald)]">Preferences saved.</p>}
    </div>
  );
}
