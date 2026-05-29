import { GlassCard } from "@/components/layout/glass-card";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Terms of System Usage</h1>
      <GlassCard>
        <div className="space-y-4 text-sm text-slate-300">
          <p>
            Platform credentials remain the property of the issuing institution node. Users
            agree to abide by volunteer, ambassador, and candidate codes of conduct.
          </p>
          <p>
            Instructional materials downloaded from the ambassador toolkit are licensed for
            chapter delivery only and may not be resold or redistributed commercially.
          </p>
          <p>
            Enterprise partners acknowledge Wakalah bil-Ujrah fee structures as fixed service
            charges without interest-bearing components.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
