const DEV_EMAIL = "aadamsays@gmail.com";

function buildMailto() {
  const subject = encodeURIComponent("Website development inquiry");
  const body = encodeURIComponent(
    "Hi aadam,\n\nI found you through a site you built.\n\nI would like to discuss a project.\n\n",
  );
  return `mailto:${DEV_EMAIL}?subject=${subject}&body=${body}`;
}

export function PoweredByAadam() {
  return (
    <p className="text-xs text-[var(--text-muted)]">
      Powered by{" "}
      <a
        href={buildMailto()}
        className="font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] underline-offset-2 hover:underline"
      >
        aadam
      </a>
    </p>
  );
}
