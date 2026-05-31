"use client";

import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { roleDashboardPath } from "@/lib/role-paths";
import { Button } from "@/components/ui/button";
import { DemoAccountsHint } from "@/components/auth/demo-accounts-hint";
import { SignInPreview } from "@/components/auth/sign-in-preview";
import type { PlatformMode } from "@/lib/platform-readiness";

const inputClass =
  "w-full bg-white border border-[var(--border-strong)] rounded-lg px-4 py-3 text-sm text-[var(--navy)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent";

export function LoginForm({ platformMode }: { platformMode: PlatformMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  if (platformMode === "preview") {
    return <SignInPreview />;
  }

  return <LiveLoginForm callbackUrl={callbackUrl} />;
}

function LiveLoginForm({ callbackUrl }: { callbackUrl: string | null }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const health = await fetch("/api/health");
      const healthData = await health.json();
      if (!health.ok || !healthData.ok) {
        setError(
          "The platform database is not reachable right now. Try again later or register interest on the Events page.",
        );
        setLoading(false);
        return;
      }
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. If you are a reviewer, open demo accounts below.");
      setLoading(false);
      return;
    }

    const session = await getSession();
    const role = session?.user?.accountRole;
    const path = callbackUrl ?? (role ? roleDashboardPath(role) : "/");
    router.push(path);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <form onSubmit={handleSubmit} className="legal-panel p-8 space-y-5">
        <div>
          <h1 className="text-xl font-semibold text-[var(--navy)]">Sign in</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Campus, ambassador, and program lead workspaces.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[var(--navy)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-[var(--navy)]">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full justify-center" variant="accent">
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <DemoAccountsHint />
    </div>
  );
}
