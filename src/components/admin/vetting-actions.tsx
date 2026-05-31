"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function VettingActions({
  vettingId,
  status,
}: {
  vettingId: number;
  status: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function update(next: "approved" | "rejected" | "interviewed") {
    setLoading(next);
    try {
      const res = await fetch(`/api/v1/admin/vetting/${vettingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scrutiny_status: next }),
      });
      if (!res.ok) throw new Error("Update failed");
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  if (status === "approved" || status === "rejected") {
    return <span className="text-xs font-mono text-[var(--text-muted)]">{status}</span>;
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="accent"
        disabled={!!loading}
        onClick={() => update("approved")}
      >
        Approve
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={!!loading}
        onClick={() => update("interviewed")}
      >
        Interview
      </Button>
      <Button
        size="sm"
        variant="ghost"
        disabled={!!loading}
        onClick={() => update("rejected")}
      >
        Reject
      </Button>
    </div>
  );
}
