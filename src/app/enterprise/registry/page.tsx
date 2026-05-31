import { RegistrySearch } from "@/components/enterprise/registry-search";

export default function EnterpriseRegistryPage() {
  return (
    <div>
      <p className="section-label">Registry</p>
      <h1 className="headline text-3xl mt-2">Anonymized talent index</h1>
      <p className="text-[var(--text-muted)] text-sm mt-2 max-w-xl">
        Merit-driven screening with no names, photos, or gender in results. Sort by performance
        metrics only.
      </p>
      <div className="mt-8">
        <RegistrySearch />
      </div>
    </div>
  );
}
