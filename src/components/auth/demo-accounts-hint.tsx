import { DEMO_ACCOUNTS, DEMO_PASSWORD } from "@/content/demo-accounts-public";

export function DemoAccountsHint() {
  return (
    <details className="legal-panel p-4 text-sm">
      <summary className="font-medium text-[var(--navy)] cursor-pointer">
        Reviewer demo accounts
      </summary>
      <p className="text-[var(--text-muted)] mt-3 text-xs leading-relaxed">
        Password for all demo users: <code className="text-[var(--navy)]">{DEMO_PASSWORD}</code>
      </p>
      <ul className="mt-3 space-y-2">
        {DEMO_ACCOUNTS.map((account) => (
          <li
            key={account.email}
            className="flex flex-col sm:flex-row sm:justify-between gap-0.5 text-xs text-[var(--text-secondary)]"
          >
            <span className="font-mono text-[var(--navy)]">{account.email}</span>
            <span className="capitalize text-[var(--text-muted)]">
              {account.role.replace("_", " ")}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}
