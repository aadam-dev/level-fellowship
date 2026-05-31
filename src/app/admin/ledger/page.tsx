export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export default async function AdminLedgerPage() {
  const entries = await prisma.revenueLedger.findMany({
    orderBy: { createdAt: "desc" },
    include: { payer: { select: { email: true, displayName: true } } },
  });

  return (
    <div>
      <p className="section-label">Ledger</p>
      <h1 className="headline text-3xl mt-2">Revenue transparency</h1>

      <div className="mt-8 glass-panel overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/60 text-left text-[var(--text-muted)] text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Payer</th>
              <th className="px-4 py-3">Framework</th>
              <th className="px-4 py-3">Protocol</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t border-[var(--border-subtle)]">
                <td className="px-4 py-3">
                  {e.payer.displayName ?? e.payer.email}
                </td>
                <td className="px-4 py-3 font-mono text-xs">{e.frameworkType}</td>
                <td className="px-4 py-3 font-mono text-xs">{e.shariahProtocol}</td>
                <td className="px-4 py-3 tabular-nums">${Number(e.amountUsd).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <Badge variant={e.paymentStatus === "cleared" ? "success" : "outline"}>
                    {e.paymentStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {entries.length === 0 && (
          <p className="p-6 text-sm text-[var(--text-muted)]">No ledger entries.</p>
        )}
      </div>
    </div>
  );
}
