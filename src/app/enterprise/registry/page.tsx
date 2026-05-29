import { RegistrySearch } from "@/components/enterprise/registry-search";

export default function EnterpriseRegistryPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Anonymized Talent Registry</h1>
      <p className="text-slate-400 text-sm mb-8 max-w-2xl">
        Merit-driven screening — no names, photos, or gender in index results. Sort by
        performance metrics only.
      </p>
      <RegistrySearch />
    </div>
  );
}
