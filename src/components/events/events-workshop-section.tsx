"use client";

import { useMemo, useState } from "react";
import { Calendar, MapPin, CheckCircle2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { EventsPageData, PublicEvent } from "@/lib/events-public";
import { eventsPreview } from "@/content/platform";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full bg-white border border-[var(--border-strong)] rounded-lg px-4 py-3 text-sm text-[var(--navy)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

type SuccessState =
  | { kind: "interest"; reference: string; email: string }
  | { kind: "live"; scanToken: string; email: string };

function formatEventDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function EventsWorkshopSection({ data }: { data: EventsPageData }) {
  const [selectedKey, setSelectedKey] = useState(data.events[0]?.key ?? "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [attendeeType, setAttendeeType] = useState<"university_student" | "community">(
    "university_student",
  );
  const [university, setUniversity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [copied, setCopied] = useState(false);

  const selected = useMemo(
    () => data.events.find((e) => e.key === selectedKey),
    [data.events, selectedKey],
  );

  const isInterest = data.mode === "interest";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;

    setLoading(true);
    setError("");

    try {
      if (isInterest) {
        const res = await fetch("/api/v1/events/interest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_key: selected.key,
            event_title: selected.title,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: email.trim(),
            attendee_type: attendeeType,
            university: attendeeType === "university_student" ? university.trim() : undefined,
          }),
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Could not save your interest");
        setSuccess({
          kind: "interest",
          reference: body.reference,
          email: email.trim(),
        });
      } else {
        if (!selected.numericId) throw new Error("Invalid event");
        const res = await fetch("/api/v1/events/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_id: selected.numericId,
            email: email.trim(),
            enrollment_class:
              attendeeType === "university_student"
                ? "university_student"
                : "non_student_aspirant",
          }),
        });
        const body = await res.json();
        if (!res.ok) {
          throw new Error(body.error ?? "Registration failed");
        }
        setSuccess({
          kind: "live",
          scanToken: body.scan_token,
          email: email.trim(),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function copyToken(token: string) {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (success) {
    return (
      <SuccessPanel
        success={success}
        copied={copied}
        onCopy={copyToken}
        onReset={() => {
          setSuccess(null);
          setFirstName("");
          setLastName("");
          setEmail("");
          setUniversity("");
        }}
      />
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
      <div className="lg:col-span-2 space-y-4">
        <div>
          <p className="section-label mb-2">Upcoming</p>
          <h2 className="text-xl font-semibold text-[var(--navy)]">
            {isInterest ? eventsPreview.emptyTitle : "Open workshops"}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
            {isInterest ? eventsPreview.emptyBody : "Select a session, then complete the form."}
          </p>
        </div>

        {isInterest && (
          <Badge variant="outline" className="text-xs">
            Interest list only (live check-in opens later)
          </Badge>
        )}

        <ul className="space-y-3" role="listbox" aria-label="Workshops">
          {data.events.map((event) => (
            <EventCard
              key={event.key}
              event={event}
              selected={selectedKey === event.key}
              onSelect={() => setSelectedKey(event.key)}
            />
          ))}
        </ul>
      </div>

      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit} className="legal-panel p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[var(--navy)]">
              {isInterest ? eventsPreview.interestTitle : eventsPreview.liveTitle}
            </h2>
            {selected && (
              <p className="text-sm text-[var(--text-muted)] mt-1">{selected.title}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="First name" id="first_name" required>
              <input
                id="first_name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                autoComplete="given-name"
              />
            </Field>
            <Field label="Last name" id="last_name" required>
              <input
                id="last_name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                autoComplete="family-name"
              />
            </Field>
          </div>

          <Field label="Email" id="email" required>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              autoComplete="email"
            />
          </Field>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-[var(--navy)]">I am attending as</legend>
            <div className="grid sm:grid-cols-2 gap-3">
              <AttendeeOption
                id="type-student"
                checked={attendeeType === "university_student"}
                onChange={() => setAttendeeType("university_student")}
                title="University student"
                description="Currently enrolled at a UK university"
              />
              <AttendeeOption
                id="type-community"
                checked={attendeeType === "community"}
                onChange={() => setAttendeeType("community")}
                title="Community / professional"
                description="Graduate, professional, or guest"
              />
            </div>
          </fieldset>

          {attendeeType === "university_student" && (
            <Field label="University" id="university" required>
              <input
                id="university"
                required
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className={inputClass}
                placeholder="e.g. University of Manchester"
              />
            </Field>
          )}

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="accent"
            size="lg"
            disabled={loading || !selected}
            className="w-full justify-center"
          >
            {loading
              ? "Submitting…"
              : isInterest
                ? "Join the interest list"
                : "Confirm registration"}
          </Button>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isInterest
              ? "We will email you when this workshop is confirmed. No account is required."
              : "You will receive a check-in code to present at the door."}
          </p>
        </form>
      </div>
    </div>
  );
}

function EventCard({
  event,
  selected,
  onSelect,
}: {
  event: PublicEvent;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        role="option"
        aria-selected={selected}
        onClick={onSelect}
        className={cn(
          "w-full text-left legal-panel p-4 transition-colors border-2",
          selected
            ? "border-[var(--accent)] bg-[var(--accent-muted)]"
            : "border-transparent hover:border-[var(--border-strong)]",
        )}
      >
        <p className="font-semibold text-[var(--navy)] text-sm leading-snug">{event.title}</p>
        <div className="mt-3 space-y-1.5 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {formatEventDate(event.startsAt)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {event.universityName}
          </span>
        </div>
        {event.description && (
          <p className="mt-3 text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
            {event.description}
          </p>
        )}
        {event.isOpenAccess && (
          <Badge variant="accent" className="mt-3 text-[10px]">
            Open access
          </Badge>
        )}
      </button>
    </li>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-[var(--navy)]">
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </label>
      {children}
    </div>
  );
}

function AttendeeOption({
  id,
  checked,
  onChange,
  title,
  description,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description: string;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors",
        checked
          ? "border-[var(--accent)] bg-[var(--accent-muted)]"
          : "border-[var(--border-subtle)] bg-white hover:border-[var(--border-strong)]",
      )}
    >
      <input
        id={id}
        type="radio"
        name="attendee_type"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 accent-[var(--accent)]"
      />
      <span>
        <span className="block text-sm font-medium text-[var(--navy)]">{title}</span>
        <span className="block text-xs text-[var(--text-muted)] mt-0.5">{description}</span>
      </span>
    </label>
  );
}

function SuccessPanel({
  success,
  copied,
  onCopy,
  onReset,
}: {
  success: SuccessState;
  copied: boolean;
  onCopy: (token: string) => void;
  onReset: () => void;
}) {
  const isInterest = success.kind === "interest";

  return (
    <div className="max-w-2xl mx-auto legal-panel p-8 sm:p-10 text-center space-y-6">
      <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
        <CheckCircle2 className="w-6 h-6 text-[var(--success)]" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-[var(--navy)]">
          {isInterest ? eventsPreview.interestSuccessTitle : eventsPreview.liveSuccessTitle}
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          {isInterest ? eventsPreview.interestSuccessBody : eventsPreview.liveSuccessBody}
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2">Confirmation sent to {success.email}</p>
      </div>

      {isInterest ? (
        <p className="text-sm font-mono text-[var(--navy)] bg-[var(--bg-muted)] rounded-lg px-4 py-3">
          Reference: {success.reference}
        </p>
      ) : (
        <div className="text-left space-y-2">
          <p className="text-xs font-medium text-[var(--navy)]">Check-in code</p>
          <div className="flex gap-2">
            <code className="flex-1 p-4 bg-[var(--bg-muted)] border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--accent-deep)] break-all font-mono">
              {success.scanToken}
            </code>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => onCopy(success.scanToken)}
              aria-label="Copy check-in code"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}

      <Button type="button" variant="outline" onClick={onReset} className="justify-center">
        Register for another session
      </Button>
    </div>
  );
}
