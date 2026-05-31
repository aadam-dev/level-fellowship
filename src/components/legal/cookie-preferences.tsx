"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function readPrefs() {
  if (typeof window === "undefined") {
    return { analytics: false, functional: true };
  }
  const stored = localStorage.getItem("cookie_prefs");
  if (!stored) return { analytics: false, functional: true };
  const prefs = JSON.parse(stored) as { analytics?: boolean; functional?: boolean };
  return {
    analytics: prefs.analytics ?? false,
    functional: prefs.functional ?? true,
  };
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[var(--border-subtle)] last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[var(--navy)]">{title}</p>
        <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative shrink-0 w-12 h-7 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
          checked ? "bg-[var(--accent)]" : "bg-[var(--border-strong)]",
          disabled && "opacity-60 cursor-not-allowed",
        )}
      >
        <span
          className={cn(
            "absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-5",
          )}
        />
      </button>
    </div>
  );
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
    <div className="legal-panel mt-8">
      <PreferenceRow
        title="Functional storage"
        description="Required for sign-in, session security, and core platform features."
        checked={functional}
        disabled
      />
      <PreferenceRow
        title="Analytics"
        description="Optional usage data to improve pages and chapter delivery. No advertising cookies."
        checked={analytics}
        onChange={(v) => {
          setAnalytics(v);
          setSaved(false);
        }}
      />

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-6">
        {saved && (
          <p className="text-sm text-[var(--success)] font-medium sm:mr-auto text-center sm:text-left">
            Preferences saved.
          </p>
        )}
        <Button onClick={save} variant="accent" size="lg" className="w-full sm:w-auto min-w-[200px]">
          Save preferences
        </Button>
      </div>
    </div>
  );
}
