import { GlassCard } from "@/components/layout/glass-card";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 prose prose-invert">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Privacy & Security Architecture</h1>
      <GlassCard>
        <div className="space-y-4 text-sm text-slate-300">
          <p>
            Personal data is encrypted at rest using AES-256 field-level storage for sensitive
            attributes. Access is governed by role-based controls (candidate, ambassador,
            enterprise, sys_admin).
          </p>
          <p>
            Enterprise talent registry queries return anonymized hashes only — direct names,
            profile photos, and gender are excluded from search indexes.
          </p>
          <p>
            Authentication credentials use Argon2id password hashing. Session tokens are
            HTTP-only and scoped to platform domains.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
