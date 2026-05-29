import { createHash } from "crypto";

export function anonymizedCandidateHash(candidateId: string): string {
  const digest = createHash("sha256").update(candidateId).digest("hex").slice(0, 8);
  return `CAND-NODE-${digest.toUpperCase()}`;
}
