"use client";

import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ROLE_PATHS: Record<string, string> = {
  candidate: "/candidate/dashboard",
  ambassador: "/ambassador/dashboard",
  enterprise: "/enterprise/dashboard",
  sys_admin: "/ambassador/dashboard",
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }
    const session = await getSession();
    const role = session?.user?.accountRole;
    const path = callbackUrl ?? (role ? ROLE_PATHS[role] : "/");
    router.push(path);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bento-card p-8 w-full max-w-md space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight text-center">Sign in</h1>
      <p className="text-sm text-slate-400 text-center">
        Adaptive role routing to your dashboard
      </p>
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm"
      />
      {error && <p className="text-sm text-red-400 text-center">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-[var(--frost-blue)] text-white text-sm font-medium disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Continue"}
      </button>
    </form>
  );
}
